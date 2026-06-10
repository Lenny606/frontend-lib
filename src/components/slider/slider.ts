import './slider.css';

export interface SliderOptions {
  /**
   * Minimum value.
   * @default 0
   */
  min?: number;
  /**
   * Maximum value.
   * @default 100
   */
  max?: number;
  /**
   * Step increment.
   * @default 1
   */
  step?: number;
  /**
   * Initial value. Defaults to the minimum.
   */
  value?: number;
  /**
   * Show the current value next to the track.
   */
  showValue?: boolean;
  /**
   * Suffix appended to the displayed value (e.g. '%', ' px').
   */
  unit?: string;
  /**
   * Disable the slider.
   */
  disabled?: boolean;
  /**
   * Accessible name of the slider input.
   */
  ariaLabel?: string;
  /**
   * Event callback fired continuously while dragging.
   */
  onInput?: (value: number) => void;
  /**
   * Event callback fired when the value is committed.
   */
  onChange?: (value: number) => void;
  /**
   * Custom CSS class name to append to the wrapper.
   */
  className?: string;
}

export function createSlider(options: SliderOptions = {}): HTMLDivElement {
  const min = options.min !== undefined ? options.min : 0;
  const max = options.max !== undefined ? options.max : 100;
  const value = options.value !== undefined ? options.value : min;

  const wrapper = document.createElement('div');
  wrapper.className = [
    'fl-slider',
    options.disabled ? 'fl-slider--disabled' : '',
    options.className || ''
  ].filter(Boolean).join(' ');

  const input = document.createElement('input');
  input.type = 'range';
  input.className = 'fl-slider-input';
  input.min = String(min);
  input.max = String(max);
  input.step = String(options.step !== undefined ? options.step : 1);
  input.value = String(value);

  if (options.disabled) {
    input.disabled = true;
  }
  if (options.ariaLabel) {
    input.setAttribute('aria-label', options.ariaLabel);
  }

  let valueSpan: HTMLSpanElement | null = null;
  if (options.showValue) {
    valueSpan = document.createElement('span');
    valueSpan.className = 'fl-slider-value';
  }

  function updateVisual() {
    const current = parseFloat(input.value);
    const percent = max === min ? 0 : ((current - min) / (max - min)) * 100;
    input.style.setProperty('--fl-slider-fill', `${percent}%`);
    if (valueSpan) {
      valueSpan.textContent = `${current}${options.unit || ''}`;
    }
  }

  updateVisual();

  input.addEventListener('input', () => {
    updateVisual();
    if (options.onInput) {
      options.onInput(parseFloat(input.value));
    }
  });

  input.addEventListener('change', () => {
    if (options.onChange) {
      options.onChange(parseFloat(input.value));
    }
  });

  wrapper.appendChild(input);
  if (valueSpan) {
    wrapper.appendChild(valueSpan);
  }

  return wrapper;
}
