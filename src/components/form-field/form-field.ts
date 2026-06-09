import './form-field.css';
import { createLabel } from '../label/index.ts';

let fieldUid = 0;

/**
 * Generates a unique id for associating labels and messages with form controls.
 */
export function nextFieldId(prefix: string = 'fl-field'): string {
  fieldUid += 1;
  return `${prefix}-${fieldUid}`;
}

export interface FormFieldOptions {
  /**
   * The form control element to wrap (input wrapper, select wrapper, etc.).
   */
  control: HTMLElement;
  /**
   * Optional label text rendered above the control.
   */
  label?: string;
  /**
   * The id of the control the label points to. Also used to derive
   * the message element id (`${labelFor}-message`) for aria-describedby.
   */
  labelFor?: string;
  required?: boolean;
  disabled?: boolean;
  /**
   * Error message. Takes precedence over helperText and switches the field
   * into the error state.
   */
  error?: string;
  /**
   * Helper text displayed below the control when there is no error.
   */
  helperText?: string;
  className?: string;
}

/**
 * Wraps a form control with a label and a helper/error message.
 * Used internally by input, textarea, select and radio group components,
 * but can also be used to compose custom form fields.
 */
export function createFormField(options: FormFieldOptions): HTMLElement {
  const field = document.createElement('div');
  field.className = [
    'fl-field',
    options.error ? 'fl-field--error' : '',
    options.disabled ? 'fl-field--disabled' : '',
    options.className || ''
  ].filter(Boolean).join(' ');

  if (options.label) {
    field.appendChild(createLabel({
      text: options.label,
      htmlFor: options.labelFor,
      required: options.required,
      disabled: options.disabled
    }));
  }

  field.appendChild(options.control);

  const message = options.error || options.helperText;
  if (message) {
    const messageEl = document.createElement('p');
    messageEl.className = [
      'fl-field-message',
      options.error ? 'fl-field-message--error' : ''
    ].filter(Boolean).join(' ');
    if (options.labelFor) {
      messageEl.id = `${options.labelFor}-message`;
    }
    messageEl.textContent = message;
    field.appendChild(messageEl);
  }

  return field;
}
