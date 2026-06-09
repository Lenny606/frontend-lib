import './button.css';

export interface ButtonOptions {
  label: string;
  onClick?: (event: MouseEvent) => void;
  className?: string;
}

/**
 * Creates a premium styled button element.
 */
export function createButton(options: ButtonOptions): HTMLButtonElement {
  const button = document.createElement('button');
  button.className = `fl-btn ${options.className || ''}`.trim();
  button.textContent = options.label;

  if (options.onClick) {
    button.addEventListener('click', options.onClick);
  }

  return button;
}
