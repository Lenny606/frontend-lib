import './spinner.css';

export interface SpinnerOptions {
  /**
   * Sizing of the spinner.
   * Can be 'sm', 'md', 'lg', or a custom CSS size string (e.g. '24px', '3rem').
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | string;
  /**
   * Color theme of the spinner.
   * Can be 'current', 'primary', or a custom CSS color string (e.g. '#3b82f6', 'rgba(...)').
   * @default 'current'
   */
  color?: 'current' | 'primary' | string;
  /**
   * Custom CSS class name to append to the spinner container.
   */
  className?: string;
}

/**
 * Creates a standalone, highly customizable, and accessible Spinner component.
 */
export function createSpinner(options: SpinnerOptions = {}): HTMLElement {
  const size = options.size || 'md';
  const color = options.color || 'current';

  // Container wrapper
  const container = document.createElement('span');
  container.className = ['fl-spinner-container', options.className || ''].filter(Boolean).join(' ');
  container.setAttribute('role', 'status');
  container.setAttribute('aria-live', 'polite');

  // SVG spinner element
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  
  // Set SVG class names
  const classes = ['fl-spinner'];
  
  // Size mapping
  if (size === 'sm' || size === 'md' || size === 'lg') {
    classes.push(`fl-spinner--${size}`);
  } else {
    // Custom inline size
    svg.style.width = size;
    svg.style.height = size;
  }

  // Color mapping
  if (color === 'current' || color === 'primary') {
    classes.push(`fl-spinner--${color}`);
  } else {
    // Custom inline color
    svg.style.color = color;
  }

  svg.setAttribute('class', classes.join(' '));

  // Circle background
  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('cx', '12');
  circle.setAttribute('cy', '12');
  circle.setAttribute('r', '10');
  circle.setAttribute('stroke', 'currentColor');
  circle.setAttribute('stroke-width', '4');
  circle.setAttribute('stroke-linecap', 'round');
  circle.setAttribute('stroke-dasharray', '31.4 31.4');
  circle.setAttribute('opacity', '0.25');
  svg.appendChild(circle);

  // Path arc
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M12 2C6.47715 2 2 6.47715 2 12C2 13.5 2.5 15 3.5 16');
  path.setAttribute('stroke', 'currentColor');
  path.setAttribute('stroke-width', '4');
  path.setAttribute('stroke-linecap', 'round');
  svg.appendChild(path);

  container.appendChild(svg);

  // Accessible screen reader fallback text
  const srText = document.createElement('span');
  srText.className = 'fl-sr-only';
  srText.textContent = 'Načítání...';
  container.appendChild(srText);

  return container;
}
