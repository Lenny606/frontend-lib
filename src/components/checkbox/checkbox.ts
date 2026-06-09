import './checkbox.css';

export interface CheckboxOptions {
  label: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  name?: string;
  id?: string;
  value?: string;
  className?: string;
}

export function createCheckbox(options: CheckboxOptions): HTMLElement {
  const container = document.createElement('label');
  const customClass = options.className || '';
  const disabledClass = options.disabled ? 'fl-checkbox--disabled' : '';
  container.className = `fl-checkbox-container ${disabledClass} ${customClass}`.trim();

  // Create native input
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.className = 'fl-checkbox-input';
  if (options.name) input.name = options.name;
  if (options.id) input.id = options.id;
  if (options.value) input.value = options.value;
  if (options.checked) input.checked = true;
  if (options.disabled) input.disabled = true;

  // Custom indicator box
  const indicator = document.createElement('span');
  indicator.className = 'fl-checkbox-indicator';

  // Checkmark SVG inside the indicator
  const checkSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  checkSvg.setAttribute('viewBox', '0 0 24 24');
  checkSvg.setAttribute('fill', 'none');
  checkSvg.setAttribute('stroke', 'currentColor');
  checkSvg.setAttribute('stroke-width', '4');
  checkSvg.setAttribute('stroke-linecap', 'round');
  checkSvg.setAttribute('stroke-linejoin', 'round');
  checkSvg.setAttribute('class', 'fl-checkbox-check');
  checkSvg.innerHTML = '<polyline points="20 6 9 17 4 12"></polyline>';
  indicator.appendChild(checkSvg);

  // Label text span
  const labelSpan = document.createElement('span');
  labelSpan.className = 'fl-checkbox-label';
  labelSpan.textContent = options.label;

  // Assemble
  container.appendChild(input);
  container.appendChild(indicator);
  container.appendChild(labelSpan);

  // Event handler
  input.addEventListener('change', () => {
    if (options.onChange) {
      options.onChange(input.checked);
    }
  });

  return container;
}
