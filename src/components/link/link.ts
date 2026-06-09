import './link.css';

export interface LinkOptions {
  /**
   * The text of the link.
   */
  label: string;
  /**
   * Link URL.
   */
  href: string;
  /**
   * The design variant of the link.
   * @default 'default'
   */
  variant?: 'default' | 'muted' | 'standalone';
  /**
   * Underline behaviour.
   * @default 'hover'
   */
  underline?: 'always' | 'hover' | 'none';
  /**
   * Opens the link in a new tab (target="_blank" + rel="noopener noreferrer")
   * and appends an external-link icon.
   */
  external?: boolean;
  /**
   * Whether the link is disabled (removes href, keeps it focusable for AT).
   */
  disabled?: boolean;
  /**
   * Raw HTML/SVG string for an icon placed before the label.
   */
  startIcon?: string;
  /**
   * Accessible text for screen readers.
   */
  ariaLabel?: string;
  className?: string;
  onClick?: (event: MouseEvent) => void;
}

// Helper to parse HTML strings (e.g. SVG icons) into elements
function parseIcon(markup: string): HTMLElement | null {
  const template = document.createElement('template');
  template.innerHTML = markup.trim();
  const el = template.content.firstElementChild;
  if (el) {
    el.classList.add('fl-link-icon');
  }
  return el as HTMLElement;
}

// External-link arrow SVG markup
const EXTERNAL_SVG = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M15 3h6v6"></path>
    <path d="M10 14 21 3"></path>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
  </svg>
`;

/**
 * Creates a styled text link with underline control, external mode and icons.
 */
export function createLink(options: LinkOptions): HTMLAnchorElement {
  const variant = options.variant || 'default';
  const underline = options.underline || 'hover';

  const link = document.createElement('a');
  link.className = [
    'fl-link',
    `fl-link--${variant}`,
    `fl-link--underline-${underline}`,
    options.disabled ? 'fl-link--disabled' : '',
    options.className || ''
  ].filter(Boolean).join(' ');

  if (options.disabled) {
    link.setAttribute('aria-disabled', 'true');
  } else {
    link.href = options.href;
    if (options.external) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
  }

  if (options.ariaLabel) {
    link.setAttribute('aria-label', options.ariaLabel);
  }

  // 1. Start Icon
  if (options.startIcon) {
    const startIconEl = parseIcon(options.startIcon);
    if (startIconEl) link.appendChild(startIconEl);
  }

  // 2. Label
  const labelSpan = document.createElement('span');
  labelSpan.className = 'fl-link-label';
  labelSpan.textContent = options.label;
  link.appendChild(labelSpan);

  // 3. External indicator icon
  if (options.external) {
    const externalIcon = parseIcon(EXTERNAL_SVG);
    if (externalIcon) {
      externalIcon.classList.add('fl-link-external');
      link.appendChild(externalIcon);
    }
  }

  // Click handler (blocked when disabled)
  link.addEventListener('click', (e) => {
    if (options.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (options.onClick) {
      options.onClick(e as MouseEvent);
    }
  });

  return link;
}
