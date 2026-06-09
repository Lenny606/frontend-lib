import './accordion.css';

let accordionUid = 0;

export interface AccordionItem {
  /**
   * Heading text shown in the clickable summary row.
   */
  title: string;
  /**
   * Panel content. A plain string is rendered as a paragraph;
   * elements are appended as-is.
   */
  content: string | HTMLElement | HTMLElement[];
  /**
   * Whether the item starts expanded.
   */
  open?: boolean;
  /**
   * Whether the item cannot be toggled.
   */
  disabled?: boolean;
  /**
   * Raw HTML/SVG string for an icon placed before the title.
   */
  icon?: string;
}

export interface AccordionOptions {
  /**
   * The list of collapsible sections.
   */
  items: AccordionItem[];
  /**
   * Only one item can be open at a time. Uses the native exclusive
   * disclosure behaviour (<details> with a shared name attribute).
   * @default false
   */
  exclusive?: boolean;
  /**
   * The design variant: separate glass panels, or one joined container
   * with dividers.
   * @default 'separated'
   */
  variant?: 'separated' | 'joined';
  className?: string;
  /**
   * Fired when an item is expanded or collapsed.
   */
  onToggle?: (index: number, open: boolean) => void;
}

// Chevron SVG markup for the expand indicator
const CHEVRON_SVG = `
  <svg class="fl-accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="m6 9 6 6 6-6"></path>
  </svg>
`;

// Helper to parse HTML strings (e.g. SVG icons) into elements
function parseIcon(markup: string): HTMLElement | null {
  const template = document.createElement('template');
  template.innerHTML = markup.trim();
  const el = template.content.firstElementChild;
  if (el) {
    el.classList.add('fl-accordion-icon');
  }
  return el as HTMLElement;
}

// Normalizes single element / array into an array
function toElements(value: HTMLElement | HTMLElement[]): HTMLElement[] {
  return Array.isArray(value) ? value : [value];
}

/**
 * Creates a glass-styled accordion built on native <details>/<summary>
 * elements: content stays findable via Ctrl+F, and the exclusive mode
 * uses the browser's own disclosure grouping — no custom toggle JS.
 */
export function createAccordion(options: AccordionOptions): HTMLElement {
  const variant = options.variant || 'separated';
  accordionUid += 1;
  const groupName = `fl-accordion-${accordionUid}`;

  const accordion = document.createElement('div');
  accordion.className = [
    'fl-accordion',
    `fl-accordion--${variant}`,
    options.className || ''
  ].filter(Boolean).join(' ');

  options.items.forEach((item, index) => {
    const details = document.createElement('details');
    details.className = [
      'fl-accordion-item',
      item.disabled ? 'fl-accordion-item--disabled' : ''
    ].filter(Boolean).join(' ');
    if (item.open && !item.disabled) details.open = true;

    // Shared name creates a native exclusive disclosure group
    if (options.exclusive) {
      details.setAttribute('name', groupName);
    }

    const summary = document.createElement('summary');
    summary.className = 'fl-accordion-summary';

    if (item.icon) {
      const iconEl = parseIcon(item.icon);
      if (iconEl) summary.appendChild(iconEl);
    }

    const title = document.createElement('span');
    title.className = 'fl-accordion-title';
    title.textContent = item.title;
    summary.appendChild(title);

    const chevronTemplate = document.createElement('template');
    chevronTemplate.innerHTML = CHEVRON_SVG.trim();
    summary.appendChild(chevronTemplate.content.firstElementChild as HTMLElement);

    if (item.disabled) {
      summary.setAttribute('aria-disabled', 'true');
      summary.tabIndex = -1;
      summary.addEventListener('click', (e) => {
        e.preventDefault();
      });
    }

    details.appendChild(summary);

    // Panel content
    const panel = document.createElement('div');
    panel.className = 'fl-accordion-content';

    if (typeof item.content === 'string') {
      const paragraph = document.createElement('p');
      paragraph.className = 'fl-accordion-text';
      paragraph.textContent = item.content;
      panel.appendChild(paragraph);
    } else {
      toElements(item.content).forEach(el => panel.appendChild(el));
    }

    details.appendChild(panel);

    // Native toggle event fires on open and close (incl. exclusive auto-close)
    details.addEventListener('toggle', () => {
      if (options.onToggle) {
        options.onToggle(index, details.open);
      }
    });

    accordion.appendChild(details);
  });

  return accordion;
}
