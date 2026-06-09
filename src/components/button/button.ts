import './button.css';

export interface ButtonOptions {
  label: string;
  onClick?: (event: MouseEvent) => void;
  className?: string;
  /**
   * The design variant of the button.
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'outline';
}

/**
 * Creates a premium styled button element with Glass Fluid theme support.
 */
export function createButton(options: ButtonOptions): HTMLButtonElement {
  const button = document.createElement('button');
  const variant = options.variant || 'primary';
  
  // Combine base class, variant class, and any user-provided classes
  button.className = `fl-btn fl-btn--${variant} ${options.className || ''}`.trim();
  button.textContent = options.label;

  if (options.onClick) {
    button.addEventListener('click', options.onClick);
  }

  return button;
}
