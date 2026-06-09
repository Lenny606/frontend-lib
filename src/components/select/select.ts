import './select.css';
import { createFormField, nextFieldId } from '../form-field/index.ts';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectOptions {
  /**
   * Label text rendered above the select.
   */
  label?: string;
  /**
   * The list of selectable options.
   */
  options: SelectOption[];
  /**
   * Pre-selected value. Must match one of the option values.
   */
  value?: string;
  /**
   * Placeholder text shown as a disabled first option when no value is selected.
   */
  placeholder?: string;
  /**
   * The size of the select.
   * @default 'default'
   */
  size?: 'default' | 'sm' | 'lg';
  disabled?: boolean;
  required?: boolean;
  /**
   * Error message. Switches the select into the error state.
   */
  error?: string;
  /**
   * Helper text displayed below the select when there is no error.
   */
  helperText?: string;
  name?: string;
  id?: string;
  className?: string;
  onChange?: (value: string, event: Event) => void;
}

// Chevron SVG markup for the dropdown indicator
const CHEVRON_SVG = `
  <svg class="fl-select-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="m6 9 6 6 6-6"></path>
  </svg>
`;

/**
 * Creates a glass-styled select (dropdown) field with label and validation message.
 */
export function createSelect(options: SelectOptions): HTMLElement {
  const size = options.size || 'default';
  const id = options.id || nextFieldId('fl-select');

  // Visual wrapper carrying the glass background and the chevron icon
  const wrapper = document.createElement('div');
  wrapper.className = [
    'fl-select-wrapper',
    `fl-select-wrapper--${size}`
  ].join(' ');

  const select = document.createElement('select');
  select.className = 'fl-select';
  select.id = id;
  if (options.name) select.name = options.name;
  if (options.disabled) select.disabled = true;
  if (options.required) select.required = true;
  if (options.error) select.setAttribute('aria-invalid', 'true');
  if (options.error || options.helperText) {
    select.setAttribute('aria-describedby', `${id}-message`);
  }

  // Placeholder rendered as a disabled, hidden first option
  if (options.placeholder) {
    const placeholderOption = document.createElement('option');
    placeholderOption.value = '';
    placeholderOption.textContent = options.placeholder;
    placeholderOption.disabled = true;
    placeholderOption.selected = !options.value;
    placeholderOption.hidden = true;
    select.appendChild(placeholderOption);
  }

  options.options.forEach((item) => {
    const optionEl = document.createElement('option');
    optionEl.value = item.value;
    optionEl.textContent = item.label;
    if (item.disabled) optionEl.disabled = true;
    if (options.value === item.value) optionEl.selected = true;
    select.appendChild(optionEl);
  });

  wrapper.appendChild(select);

  const template = document.createElement('template');
  template.innerHTML = CHEVRON_SVG.trim();
  wrapper.appendChild(template.content.firstElementChild as HTMLElement);

  // Event handler
  select.addEventListener('change', (e) => {
    if (options.onChange) {
      options.onChange(select.value, e);
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
