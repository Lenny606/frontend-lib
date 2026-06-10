import './breadcrumbs.css';
import { createDropdown } from '../dropdown/index.ts';
import type { DropdownInstance, DropdownItem } from '../dropdown/index.ts';

const CHEVRON_SVG = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="m9 18 6-6-6-6"></path>
  </svg>
`;

const ELLIPSIS_SVG = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="1"></circle>
    <circle cx="19" cy="12" r="1"></circle>
    <circle cx="5" cy="12" r="1"></circle>
  </svg>
`;

export interface BreadcrumbItem {
  /**
   * Visible text of the breadcrumb level.
   */
  label: string;
  /**
   * Navigation target. When omitted the item renders as a button
   * and relies solely on the onClick callback.
   */
  href?: string;
  /**
   * Optional icon HTML markup string (e.g. SVG) shown before the label.
   */
  icon?: string;
  /**
   * Event callback triggered when the item is activated.
   */
  onClick?: (e: MouseEvent) => void;
}

export interface BreadcrumbsOptions {
  /**
   * Ordered path items from the root to the current page.
   * The last item is rendered as the current page (aria-current).
   */
  items: BreadcrumbItem[];
  /**
   * Visual separator between items.
   * @default 'chevron'
   */
  separator?: 'chevron' | 'slash' | 'dot';
  /**
   * Maximum number of items rendered inline. When the path is longer,
   * the middle items collapse into an ellipsis dropdown menu
   * (first item and the trailing items stay visible).
   */
  maxItems?: number;
  /**
   * Accessible name of the navigation landmark.
   * @default 'Drobečková navigace'
   */
  ariaLabel?: string;
  /**
   * Custom CSS class name to append to the nav element.
   */
  className?: string;
}

export interface BreadcrumbsInstance {
  /**
   * The root <nav> element.
   */
  element: HTMLElement;
  /**
   * Removes the element from the DOM and cleans up the
   * ellipsis dropdown menu when present.
   */
  destroy(): void;
}

function createSeparator(separator: 'chevron' | 'slash' | 'dot'): HTMLSpanElement {
  const span = document.createElement('span');
  span.className = `fl-breadcrumbs-separator fl-breadcrumbs-separator--${separator}`;
  span.setAttribute('aria-hidden', 'true');

  if (separator === 'chevron') {
    span.innerHTML = CHEVRON_SVG;
  } else if (separator === 'slash') {
    span.textContent = '/';
  } else {
    span.textContent = '•';
  }

  return span;
}

function createCrumbLink(item: BreadcrumbItem): HTMLElement {
  let crumb: HTMLAnchorElement | HTMLButtonElement;

  if (item.href) {
    crumb = document.createElement('a');
    crumb.href = item.href;
  } else {
    crumb = document.createElement('button');
    crumb.type = 'button';
  }

  crumb.className = 'fl-breadcrumbs-link';

  if (item.icon) {
    const iconSpan = document.createElement('span');
    iconSpan.className = 'fl-breadcrumbs-icon';
    iconSpan.innerHTML = item.icon;
    crumb.appendChild(iconSpan);
  }

  const textSpan = document.createElement('span');
  textSpan.textContent = item.label;
  crumb.appendChild(textSpan);

  if (item.onClick) {
    crumb.addEventListener('click', (e) => {
      item.onClick!(e as MouseEvent);
    });
  }

  return crumb;
}

export function createBreadcrumbs(options: BreadcrumbsOptions): BreadcrumbsInstance {
  const separator = options.separator || 'chevron';
  const items = options.items;

  const nav = document.createElement('nav');
  nav.className = ['fl-breadcrumbs', options.className || ''].filter(Boolean).join(' ');
  nav.setAttribute('aria-label', options.ariaLabel || 'Drobečková navigace');

  const list = document.createElement('ol');
  list.className = 'fl-breadcrumbs-list';
  nav.appendChild(list);

  let dropdown: DropdownInstance | null = null;

  // Split the path into visible items and a collapsed middle section
  let visibleHead: BreadcrumbItem[] = items;
  let collapsed: BreadcrumbItem[] = [];
  let visibleTail: BreadcrumbItem[] = [];

  if (options.maxItems && options.maxItems >= 2 && items.length > options.maxItems) {
    visibleHead = items.slice(0, 1);
    collapsed = items.slice(1, items.length - (options.maxItems - 1));
    visibleTail = items.slice(items.length - (options.maxItems - 1));
  }

  function appendItem(item: BreadcrumbItem, isLast: boolean) {
    const li = document.createElement('li');
    li.className = 'fl-breadcrumbs-item';

    if (isLast) {
      const current = document.createElement('span');
      current.className = 'fl-breadcrumbs-current';
      current.setAttribute('aria-current', 'page');

      if (item.icon) {
        const iconSpan = document.createElement('span');
        iconSpan.className = 'fl-breadcrumbs-icon';
        iconSpan.innerHTML = item.icon;
        current.appendChild(iconSpan);
      }

      const textSpan = document.createElement('span');
      textSpan.textContent = item.label;
      current.appendChild(textSpan);
      li.appendChild(current);
    } else {
      li.appendChild(createCrumbLink(item));
      li.appendChild(createSeparator(separator));
    }

    list.appendChild(li);
  }

  visibleHead.forEach((item, index) => {
    const isLast = collapsed.length === 0 && index === visibleHead.length - 1;
    appendItem(item, isLast);
  });

  if (collapsed.length > 0) {
    const li = document.createElement('li');
    li.className = 'fl-breadcrumbs-item';

    const ellipsisBtn = document.createElement('button');
    ellipsisBtn.type = 'button';
    ellipsisBtn.className = 'fl-breadcrumbs-ellipsis';
    ellipsisBtn.setAttribute('aria-label', 'Zobrazit skryté položky');
    ellipsisBtn.innerHTML = ELLIPSIS_SVG;

    li.appendChild(ellipsisBtn);
    li.appendChild(createSeparator(separator));
    list.appendChild(li);

    const dropdownItems: DropdownItem[] = collapsed.map(item => ({
      label: item.label,
      icon: item.icon,
      onClick: (e: MouseEvent) => {
        if (item.onClick) {
          item.onClick(e);
        }
        if (item.href) {
          window.location.href = item.href;
        }
      }
    }));

    dropdown = createDropdown({
      trigger: ellipsisBtn,
      items: dropdownItems,
      placement: 'bottom-start',
      className: 'fl-breadcrumbs-dropdown'
    });

    visibleTail.forEach((item, index) => {
      appendItem(item, index === visibleTail.length - 1);
    });
  }

  return {
    element: nav,
    destroy() {
      if (dropdown) {
        dropdown.destroy();
        dropdown = null;
      }
      nav.remove();
    }
  };
}
