import './radio.css';
import { createFormField, nextFieldId } from '../form-field/index.ts';

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupOptions {
  /**
   * Label text rendered above the group.
   */
  label?: string;
  /**
   * Shared name of the native radio inputs (required for grouping and forms).
   */
  name: string;
  /**
   * The list of radio options.
   */
  options: RadioOption[];
  /**
   * Pre-selected value. Must match one of the option values.
   */
  value?: string;
  /**
   * Layout direction of the options.
   * @default 'vertical'
   */
  direction?: 'vertical' | 'horizontal';
  /**
   * Disables the whole group.
   */
  disabled?: boolean;
  required?: boolean;
  /**
   * Error message. Switches the group into the error state.
   */
  error?: string;
  /**
   * Helper text displayed below the group when there is no error.
   */
  helperText?: string;
  className?: string;
  onChange?: (value: string) => void;
}

/**
 * Creates a glass-styled radio group with label and validation message.
 */
export function createRadioGroup(options: RadioGroupOptions): HTMLElement {
  const groupId = nextFieldId('fl-radio-group');
  const direction = options.direction || 'vertical';

  const group = document.createElement('div');
  group.className = [
    'fl-radio-group',
    `fl-radio-group--${direction}`
  ].join(' ');
  group.setAttribute('role', 'radiogroup');
  if (options.label) {
    group.setAttribute('aria-label', options.label);
  }

  options.options.forEach((item) => {
    const isDisabled = !!(options.disabled || item.disabled);

    const container = document.createElement('label');
    container.className = [
      'fl-radio-container',
      isDisabled ? 'fl-radio--disabled' : ''
    ].filter(Boolean).join(' ');

    // Native input (visually hidden, keeps accessibility and form behaviour)
    const input = document.createElement('input');
    input.type = 'radio';
    input.className = 'fl-radio-input';
    input.name = options.name;
    input.value = item.value;
    if (options.value === item.value) input.checked = true;
    if (isDisabled) input.disabled = true;
    if (options.required) input.required = true;

    // Custom circular indicator with inner dot
    const indicator = document.createElement('span');
    indicator.className = 'fl-radio-indicator';
    const dot = document.createElement('span');
    dot.className = 'fl-radio-dot';
    indicator.appendChild(dot);

    const labelSpan = document.createElement('span');
    labelSpan.className = 'fl-radio-label';
    labelSpan.textContent = item.label;

    container.appendChild(input);
    container.appendChild(indicator);
    container.appendChild(labelSpan);

    input.addEventListener('change', () => {
      if (input.checked && options.onChange) {
        options.onChange(input.value);
      }
    });

    group.appendChild(container);
  });

  return createFormField({
    control: group,
    label: options.label,
    labelFor: groupId,
    required: options.required,
    disabled: options.disabled,
    error: options.error,
    helperText: options.helperText,
    className: options.className
  });
}
