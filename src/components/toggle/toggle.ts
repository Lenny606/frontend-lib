import './toggle.css';

export interface ToggleOptions {
  /**
   * The text label of the toggle. Optional for icon-less standalone switches.
   */
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  /**
   * The size of the toggle.
   * @default 'default'
   */
  size?: 'default' | 'sm';
  onChange?: (checked: boolean) => void;
  name?: string;
  id?: string;
  value?: string;
  /**
   * Accessible text for screen readers when no visible label is provided.
   */
  ariaLabel?: string;
  className?: string;
}

/**
 * Creates a glass-styled toggle switch backed by a native checkbox input.
 */
export function createToggle(options: ToggleOptions): HTMLElement {
  const size = options.size || 'default';

  const container = document.createElement('label');
  container.className = [
    'fl-toggle-container',
    `fl-toggle--${size}`,
    options.disabled ? 'fl-toggle--disabled' : '',
    options.className || ''
  ].filter(Boolean).join(' ');

  // Native input (visually hidden, keeps accessibility and form behaviour)
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.className = 'fl-toggle-input';
  input.setAttribute('role', 'switch');
  if (options.name) input.name = options.name;
  if (options.id) input.id = options.id;
  if (options.value) input.value = options.value;
  if (options.checked) input.checked = true;
  if (options.disabled) input.disabled = true;
  if (options.ariaLabel && !options.label) {
    input.setAttribute('aria-label', options.ariaLabel);
  }

  // Track with sliding thumb
  const track = document.createElement('span');
  track.className = 'fl-toggle-track';
  const thumb = document.createElement('span');
  thumb.className = 'fl-toggle-thumb';
  track.appendChild(thumb);

  container.appendChild(input);
  container.appendChild(track);

  if (options.label) {
    const labelSpan = document.createElement('span');
    labelSpan.className = 'fl-toggle-label';
    labelSpan.textContent = options.label;
    container.appendChild(labelSpan);
  }

  // Event handler
  input.addEventListener('change', () => {
    if (options.onChange) {
      options.onChange(input.checked);
    }
  });

  return container;
}
