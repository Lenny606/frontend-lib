import './input.css';
import { createFormField, nextFieldId } from '../form-field/index.ts';

export interface InputOptions {
  /**
   * Label text rendered above the input.
   */
  label?: string;
  /**
   * Native input type.
   * @default 'text'
   */
  type?: 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url' | 'date';
  placeholder?: string;
  /**
   * Initial value of the input.
   */
  value?: string;
  /**
   * The size of the input.
   * @default 'default'
   */
  size?: 'default' | 'sm' | 'lg';
  disabled?: boolean;
  required?: boolean;
  readonly?: boolean;
  /**
   * Error message. Switches the input into the error state.
   */
  error?: string;
  /**
   * Helper text displayed below the input when there is no error.
   */
  helperText?: string;
  name?: string;
  id?: string;
  className?: string;
  /**
   * Raw HTML/SVG string for an icon placed before the input text.
   */
  startIcon?: string;
  /**
   * Raw HTML/SVG string for an icon placed after the input text.
   */
  endIcon?: string;
  /**
   * Fired on every keystroke with the current value.
   */
  onInput?: (value: string, event: Event) => void;
  /**
   * Fired when the value is committed (blur / enter).
   */
  onChange?: (value: string, event: Event) => void;
}

// Helper to parse HTML strings (e.g. SVG icons) into elements
function parseIcon(markup: string): HTMLElement | null {
  const template = document.createElement('template');
  template.innerHTML = markup.trim();
  const el = template.content.firstElementChild;
  if (el) {
    el.classList.add('fl-input-icon');
  }
  return el as HTMLElement;
}

/**
 * Creates a glass-styled text input field with label, icons and validation message.
 */
export function createInput(options: InputOptions): HTMLElement {
  const size = options.size || 'default';
  const id = options.id || nextFieldId('fl-input');

  // Visual wrapper carrying the glass background, border and focus glow
  const wrapper = document.createElement('div');
  wrapper.className = [
    'fl-input-wrapper',
    `fl-input-wrapper--${size}`
  ].join(' ');

  const input = document.createElement('input');
  input.type = options.type || 'text';
  input.className = 'fl-input';
  input.id = id;
  if (options.name) input.name = options.name;
  if (options.placeholder) input.placeholder = options.placeholder;
  if (options.value) input.value = options.value;
  if (options.disabled) input.disabled = true;
  if (options.readonly) input.readOnly = true;
  if (options.required) input.required = true;
  if (options.error) input.setAttribute('aria-invalid', 'true');
  if (options.error || options.helperText) {
    input.setAttribute('aria-describedby', `${id}-message`);
  }

  if (options.startIcon) {
    const startIconEl = parseIcon(options.startIcon);
    if (startIconEl) wrapper.appendChild(startIconEl);
  }

  wrapper.appendChild(input);

  if (options.endIcon) {
    const endIconEl = parseIcon(options.endIcon);
    if (endIconEl) wrapper.appendChild(endIconEl);
  }

  // Event handlers
  input.addEventListener('input', (e) => {
    if (options.onInput) {
      options.onInput(input.value, e);
    }
  });
  input.addEventListener('change', (e) => {
    if (options.onChange) {
      options.onChange(input.value, e);
    }
  });

  return createFormField({
    control: wrapper,
    label: options.label,
    labelFor: id,
    required: options.required,
    disabled: options.disabled,
    error: options.error,
    helperText: options.helperText,
    className: options.className
  });
}
