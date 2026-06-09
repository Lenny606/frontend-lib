import './button.css';

export interface ButtonOptions {
  /**
   * The text label of the button. Optional if an icon-only button is needed.
   */
  label?: string;
  onClick?: (event: MouseEvent) => void;
  className?: string;
  /**
   * The design variant of the button.
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  /**
   * The size of the button.
   * @default 'default'
   */
  size?: 'default' | 'sm' | 'lg' | 'icon';
  /**
   * Whether the button is disabled.
   */
  disabled?: boolean;
  /**
   * Whether the button is in a loading state. Displays a spinner and disables interaction.
   */
  loading?: boolean;
  /**
   * Native HTML button type. Only used when tag is 'button'.
   * @default 'button'
   */
  type?: 'button' | 'submit' | 'reset';
  /**
   * Which HTML element tag to render.
   * @default 'button'
   */
  tag?: 'button' | 'a';
  /**
   * Link URL. Only used when tag is 'a'.
   */
  href?: string;
  /**
   * Raw HTML/SVG string for an icon placed before the label.
   */
  startIcon?: string;
  /**
   * Raw HTML/SVG string for an icon placed after the label.
   */
  endIcon?: string;
  /**
   * Accessible text for screen readers.
   */
  ariaLabel?: string;
}

// Helper to parse HTML strings (e.g. SVG icons) into elements
function parseIcon(markup: string): HTMLElement | null {
  const template = document.createElement('template');
  template.innerHTML = markup.trim();
  const el = template.content.firstElementChild;
  if (el) {
    el.classList.add('fl-btn-icon');
  }
  return el as HTMLElement;
}

// Spinner SVG markup
const SPINNER_SVG = `
  <svg class="fl-spinner" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-dasharray="31.4 31.4" opacity="0.25"></circle>
    <path d="M12 2C6.47715 2 2 6.47715 2 12C2 13.5 2.5 15 3.5 16" stroke="currentColor" stroke-width="4" stroke-linecap="round"></path>
  </svg>
`;

/**
 * Creates a highly configurable, accessible, and premium styled button element.
 */
export function createButton(options: ButtonOptions): HTMLElement {
  const tag = options.tag || 'button';
  const element = document.createElement(tag);
  
  const variant = options.variant || 'primary';
  const size = options.size || 'default';
  const isDisabled = !!(options.disabled || options.loading);
  
  // Set class names
  element.className = [
    'fl-btn',
    `fl-btn--${variant}`,
    `fl-btn--${size}`,
    options.loading ? 'fl-btn--loading' : '',
    isDisabled ? 'fl-btn--disabled' : '',
    options.className || ''
  ].filter(Boolean).join(' ');

  // Add click handler (only if not disabled)
  if (options.onClick) {
    element.addEventListener('click', (e) => {
      if (isDisabled) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      options.onClick!(e as MouseEvent);
    });
  }

  // Handle Tag specific attributes
  if (tag === 'button') {
    const btn = element as HTMLButtonElement;
    btn.type = options.type || 'button';
    if (isDisabled) {
      btn.disabled = true;
    }
  } else if (tag === 'a') {
    const anchor = element as HTMLAnchorElement;
    if (options.href && !isDisabled) {
      anchor.href = options.href;
    }
    // Anchor tags should be focusable/accessible even if disabled
    anchor.setAttribute('role', 'button');
    if (isDisabled) {
      anchor.setAttribute('aria-disabled', 'true');
      anchor.removeAttribute('href'); // Removes link interaction
    }
  }

  // Accessible Label
  if (options.ariaLabel) {
    element.setAttribute('aria-label', options.ariaLabel);
  } else if (size === 'icon' && options.label) {
    element.setAttribute('aria-label', options.label);
  }

  // Render Inner Content
  const container = document.createElement('span');
  container.className = 'fl-btn-content';

  // 1. Loading Spinner
  if (options.loading) {
    const spinner = parseIcon(SPINNER_SVG);
    if (spinner) container.appendChild(spinner);
  }

  // 2. Start Icon (only if not loading, to avoid overcrowding)
  if (options.startIcon && !options.loading) {
    const startIconEl = parseIcon(options.startIcon);
    if (startIconEl) container.appendChild(startIconEl);
  }

  // 3. Label (if provided and size is not "icon")
  if (options.label && size !== 'icon') {
    const labelSpan = document.createElement('span');
    labelSpan.className = 'fl-btn-label';
    labelSpan.textContent = options.label;
    container.appendChild(labelSpan);
  } else if (size === 'icon' && !options.ariaLabel && options.label) {
    // Fallback screen-reader text for icon buttons
    const srSpan = document.createElement('span');
    srSpan.className = 'fl-sr-only';
    srSpan.textContent = options.label;
    element.appendChild(srSpan);
  }

  // 4. End Icon
  if (options.endIcon) {
    const endIconEl = parseIcon(options.endIcon);
    if (endIconEl) container.appendChild(endIconEl);
  }

  element.appendChild(container);
  return element;
}
