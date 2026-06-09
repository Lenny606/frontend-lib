import './textarea.css';
import { createFormField, nextFieldId } from '../form-field/index.ts';

export interface TextareaOptions {
  /**
   * Label text rendered above the textarea.
   */
  label?: string;
  placeholder?: string;
  /**
   * Initial value of the textarea.
   */
  value?: string;
  /**
   * Number of visible text rows.
   * @default 4
   */
  rows?: number;
  /**
   * Resize behaviour of the textarea.
   * @default 'vertical'
   */
  resize?: 'none' | 'vertical' | 'both';
  disabled?: boolean;
  required?: boolean;
  readonly?: boolean;
  /**
   * Maximum number of characters.
   */
  maxLength?: number;
  /**
   * Error message. Switches the textarea into the error state.
   */
  error?: string;
  /**
   * Helper text displayed below the textarea when there is no error.
   */
  helperText?: string;
  name?: string;
  id?: string;
  className?: string;
  /**
   * Fired on every keystroke with the current value.
   */
  onInput?: (value: string, event: Event) => void;
  /**
   * Fired when the value is committed (blur).
   */
  onChange?: (value: string, event: Event) => void;
}

/**
 * Creates a glass-styled multiline textarea field with label and validation message.
 */
export function createTextarea(options: TextareaOptions): HTMLElement {
  const id = options.id || nextFieldId('fl-textarea');

  const textarea = document.createElement('textarea');
  textarea.className = [
    'fl-textarea',
    `fl-textarea--resize-${options.resize || 'vertical'}`
  ].join(' ');
  textarea.id = id;
  textarea.rows = options.rows || 4;
  if (options.name) textarea.name = options.name;
  if (options.placeholder) textarea.placeholder = options.placeholder;
  if (options.value) textarea.value = options.value;
  if (options.disabled) textarea.disabled = true;
  if (options.readonly) textarea.readOnly = true;
  if (options.required) textarea.required = true;
  if (options.maxLength) textarea.maxLength = options.maxLength;
  if (options.error) textarea.setAttribute('aria-invalid', 'true');
  if (options.error || options.helperText) {
    textarea.setAttribute('aria-describedby', `${id}-message`);
  }

  // Event handlers
  textarea.addEventListener('input', (e) => {
    if (options.onInput) {
      options.onInput(textarea.value, e);
    }
  });
  textarea.addEventListener('change', (e) => {
    if (options.onChange) {
      options.onChange(textarea.value, e);
    }
  });

  return createFormField({
    control: textarea,
    label: options.label,
    labelFor: id,
    required: options.required,
    disabled: options.disabled,
    error: options.error,
    helperText: options.helperText,
    className: options.className
  });
}
