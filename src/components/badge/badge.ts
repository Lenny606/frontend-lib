import './badge.css';

export interface BadgeOptions {
  /**
   * The text of the badge.
   */
  label: string;
  /**
   * The design variant of the badge.
   * @default 'default'
   */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'outline';
  /**
   * The size of the badge.
   * @default 'default'
   */
  size?: 'default' | 'sm';
  /**
   * Renders a small status dot before the label.
   */
  dot?: boolean;
  /**
   * Raw HTML/SVG string for an icon placed before the label.
   */
  icon?: string;
  className?: string;
}

// Helper to parse HTML strings (e.g. SVG icons) into elements
function parseIcon(markup: string): HTMLElement | null {
  const template = document.createElement('template');
  template.innerHTML = markup.trim();
  const el = template.content.firstElementChild;
  if (el) {
    el.classList.add('fl-badge-icon');
  }
  return el as HTMLElement;
}

/**
 * Creates a glass-styled badge / pill for statuses, tags and counters.
 */
export function createBadge(options: BadgeOptions): HTMLElement {
  const variant = options.variant || 'default';
  const size = options.size || 'default';

  const badge = document.createElement('span');
  badge.className = [
    'fl-badge',
    `fl-badge--${variant}`,
    `fl-badge--${size}`,
    options.className || ''
  ].filter(Boolean).join(' ');

  if (options.dot) {
    const dot = document.createElement('span');
    dot.className = 'fl-badge-dot';
    badge.appendChild(dot);
  }

  if (options.icon) {
    const iconEl = parseIcon(options.icon);
    if (iconEl) badge.appendChild(iconEl);
  }

  const labelSpan = document.createElement('span');
  labelSpan.className = 'fl-badge-label';
  labelSpan.textContent = options.label;
  badge.appendChild(labelSpan);

  return badge;
}
