import './dropdown.css';

let dropdownUid = 0;

export interface DropdownItem {
  /**
   * Type of the item. 'item' is a standard clickable menu link,
   * 'divider' renders a separator line.
   * @default 'item'
   */
  type?: 'item' | 'divider';
  /**
   * Item text label.
   */
  label?: string;
  /**
   * Optional icon HTML markup string (e.g. SVG path).
   */
  icon?: string;
  /**
   * Disable the item interaction.
   */
  disabled?: boolean;
  /**
   * Event callback triggered upon selection.
   */
  onClick?: (e: MouseEvent) => void;
  /**
   * Custom CSS class name to append to the item.
   */
  className?: string;
}

export interface DropdownOptions {
  /**
   * The element (like a button, image, avatar, or link) that toggles the menu.
   */
  trigger: HTMLElement;
  /**
   * Array of dropdown list options and dividers.
   */
  items: DropdownItem[];
  /**
   * Menu position alignment relative to the trigger element.
   * @default 'bottom-start'
   */
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  /**
   * Custom class name to append to the dropdown popover menu.
   */
  className?: string;
}

export interface DropdownInstance {
  /**
   * The popover wrapper menu element.
   */
  element: HTMLDivElement;
  /**
   * Programmatic open trigger.
   */
  open(): void;
  /**
   * Programmatic close trigger.
   */
  close(): void;
  /**
   * Whether the menu is currently visible.
   */
  isOpen(): boolean;
  /**
   * Cleanup the element from the DOM and dismantle listeners.
   */
  destroy(): void;
}

export function createDropdown(options: DropdownOptions): DropdownInstance {
  dropdownUid += 1;
  const dropdownId = `fl-dropdown-${dropdownUid}`;
  const placement = options.placement || 'bottom-start';
  const trigger = options.trigger;

  // 1. Create the Popover container
  const menu = document.createElement('div');
  menu.id = dropdownId;
  menu.setAttribute('popover', 'auto');
  menu.className = ['fl-dropdown-menu', options.className || ''].filter(Boolean).join(' ');

  // 2. Generate items list
  options.items.forEach(item => {
    if (item.type === 'divider') {
      const divider = document.createElement('hr');
      divider.className = 'fl-dropdown-divider';
      menu.appendChild(divider);
      return;
    }

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = ['fl-dropdown-item', item.className || ''].filter(Boolean).join(' ');
    
    if (item.disabled) {
      btn.disabled = true;
    }

    // Append Icon
    if (item.icon) {
      const iconSpan = document.createElement('span');
      iconSpan.className = 'fl-dropdown-item-icon';
      iconSpan.innerHTML = item.icon;
      btn.appendChild(iconSpan);
    }

    // Append Text Label
    const textSpan = document.createElement('span');
    textSpan.textContent = item.label || '';
    btn.appendChild(textSpan);

    // Event binding
    btn.addEventListener('click', (e) => {
      if (item.disabled) return;
      if (item.onClick) {
        item.onClick(e);
      }
      // Hide menu after selection
      menu.hidePopover();
    });

    menu.appendChild(btn);
  });

  document.body.appendChild(menu);

  // 3. Setup Trigger connections
  const isButton = trigger.tagName === 'BUTTON' || trigger.getAttribute('role') === 'button';
  let manualToggleHandler: ((e: MouseEvent) => void) | null = null;

  if (isButton) {
    trigger.setAttribute('popovertarget', dropdownId);
  } else {
    // Non-button trigger fallback: toggle popover programmatically
    manualToggleHandler = (e: MouseEvent) => {
      e.stopPropagation();
      try {
        if (menu.matches(':popover-open')) {
          menu.hidePopover();
        } else {
          menu.showPopover();
        }
      } catch (err) {
        // Popover API toggle failure fallback
      }
    };
    trigger.addEventListener('click', manualToggleHandler);
  }

  // 4. Setup CSS Anchor Positioning or JS bounds positioning fallback
  // Check if browser supports modern CSS Anchor Positioning natively
  const supportsAnchor = (typeof CSS !== 'undefined' && CSS.supports && (
    CSS.supports('anchor-name', '--a') || 
    CSS.supports('position-anchor', '--a')
  ));

  if (supportsAnchor) {
    const anchorName = `--fl-anchor-${dropdownUid}`;
    trigger.style.setProperty('anchor-name', anchorName);
    menu.style.setProperty('position-anchor', anchorName);

    if (placement === 'bottom-start') {
      menu.style.top = `anchor(${anchorName} bottom)`;
      menu.style.left = `anchor(${anchorName} left)`;
    } else if (placement === 'bottom-end') {
      menu.style.top = `anchor(${anchorName} bottom)`;
      menu.style.left = `calc(anchor(${anchorName} right) - anchor-size(self width))`;
    } else if (placement === 'top-start') {
      menu.style.bottom = `anchor(${anchorName} top)`;
      menu.style.left = `anchor(${anchorName} left)`;
      menu.style.top = 'auto';
    } else if (placement === 'top-end') {
      menu.style.bottom = `anchor(${anchorName} top)`;
      menu.style.left = `calc(anchor(${anchorName} right) - anchor-size(self width))`;
      menu.style.top = 'auto';
    }
  }

  // Fallback Dynamic Positioning Calculation
  function updatePosition() {
    if (supportsAnchor) return;

    const triggerRect = trigger.getBoundingClientRect();
    
    // Reset properties to avoid affecting layout size
    menu.style.position = 'fixed';
    menu.style.margin = '0';
    menu.style.top = '0';
    menu.style.left = '0';
    menu.style.bottom = 'auto';
    menu.style.right = 'auto';

    const menuRect = menu.getBoundingClientRect();
    let top = 0;
    let left = 0;

    if (placement === 'bottom-start') {
      top = triggerRect.bottom;
      left = triggerRect.left;
    } else if (placement === 'bottom-end') {
      top = triggerRect.bottom;
      left = triggerRect.right - menuRect.width;
    } else if (placement === 'top-start') {
      top = triggerRect.top - menuRect.height;
      left = triggerRect.left;
    } else if (placement === 'top-end') {
      top = triggerRect.top - menuRect.height;
      left = triggerRect.right - menuRect.width;
    }

    // Screen bounds check
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (left < 4) left = 4;
    if (left + menuRect.width > viewportWidth - 4) {
      left = viewportWidth - menuRect.width - 4;
    }

    // Flip vertical alignment if it overflows viewport
    if (top < 4) {
      if (placement.startsWith('top') && triggerRect.bottom + menuRect.height < viewportHeight - 4) {
        top = triggerRect.bottom;
      } else {
        top = 4;
      }
    } else if (top + menuRect.height > viewportHeight - 4) {
      if (placement.startsWith('bottom') && triggerRect.top - menuRect.height > 4) {
        top = triggerRect.top - menuRect.height;
      } else {
        top = viewportHeight - menuRect.height - 4;
      }
    }

    menu.style.top = `${top}px`;
    menu.style.left = `${left}px`;
  }

  // Trigger positioning recalculations on beforetoggle and layout events
  const beforeToggleHandler = (e: any) => {
    if (e.newState === 'open') {
      requestAnimationFrame(() => {
        updatePosition();
      });
    }
  };
  
  menu.addEventListener('beforetoggle', beforeToggleHandler);

  const onLayoutChange = () => {
    if (menu.matches(':popover-open')) {
      updatePosition();
    }
  };
  
  window.addEventListener('resize', onLayoutChange);
  window.addEventListener('scroll', onLayoutChange, { capture: true, passive: true });

  return {
    element: menu,
    open() {
      if (!menu.matches(':popover-open')) {
        menu.showPopover();
      }
    },
    close() {
      if (menu.matches(':popover-open')) {
        menu.hidePopover();
      }
    },
    isOpen() {
      return menu.matches(':popover-open');
    },
    destroy() {
      if (menu.matches(':popover-open')) {
        menu.hidePopover();
      }
      menu.removeEventListener('beforetoggle', beforeToggleHandler);
      window.removeEventListener('resize', onLayoutChange);
      window.removeEventListener('scroll', onLayoutChange, { capture: true });
      if (manualToggleHandler) {
        trigger.removeEventListener('click', manualToggleHandler);
      }
      if (isButton) {
        trigger.removeAttribute('popovertarget');
      }
      menu.remove();
    }
  };
}
