import './label.css';

export interface LabelOptions {
  /**
   * The text content of the label.
   */
  text: string;
  /**
   * The id of the form control this label is associated with.
   */
  htmlFor?: string;
  /**
   * Whether to display a required indicator (*) after the text.
   */
  required?: boolean;
  /**
   * Whether the associated control is disabled (renders the label muted).
   */
  disabled?: boolean;
  className?: string;
}

/**
 * Creates a styled form label, optionally with a required indicator.
 */
export function createLabel(options: LabelOptions): HTMLLabelElement {
  const label = document.createElement('label');
  label.className = [
    'fl-label',
    options.disabled ? 'fl-label--disabled' : '',
    options.className || ''
  ].filter(Boolean).join(' ');

  if (options.htmlFor) {
    label.htmlFor = options.htmlFor;
  }

  const text = document.createElement('span');
  text.className = 'fl-label-text';
  text.textContent = options.text;
  label.appendChild(text);

  if (options.required) {
    const indicator = document.createElement('span');
    indicator.className = 'fl-label-required';
    indicator.textContent = '*';
    indicator.setAttribute('aria-hidden', 'true');
    label.appendChild(indicator);
  }

  return label;
}
