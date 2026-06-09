import './progress.css';

export interface ProgressOptions {
  /**
   * The current value. If undefined or null, the progress bar is indeterminate.
   */
  value?: number;
  /**
   * The maximum value.
   * @default 100
   */
  max?: number;
  /**
   * Color variant.
   * @default 'primary'
   */
  variant?: 'primary' | 'success' | 'warning' | 'error';
  /**
   * Whether to display a percentage or custom text label.
   * @default false
   */
  showLabel?: boolean;
  /**
   * Function to format the display text of the label.
   */
  formatLabel?: (value: number | undefined, max: number) => string;
  /**
   * Custom CSS class name to append.
   */
  className?: string;
}

export interface ProgressInstance {
  /**
   * Root container element.
   */
  element: HTMLElement;
  /**
   * Native HTMLProgressElement reference.
   */
  progressElement: HTMLProgressElement;
  /**
   * Programmatic updater for progress values. Pass undefined/null for indeterminate mode.
   */
  setValue(value: number | undefined | null): void;
  /**
   * Gets the current numeric progress value, or undefined if indeterminate.
   */
  getValue(): number | undefined;
  /**
   * Programmatic updater for the maximum limit.
   */
  setMax(max: number): void;
  /**
   * Destroys the component and removes it from the document.
   */
  destroy(): void;
}

export function createProgress(options: ProgressOptions = {}): ProgressInstance {
  const max = options.max ?? 100;
  const variant = options.variant || 'primary';
  const showLabel = options.showLabel ?? false;

  const wrapper = document.createElement('div');
  wrapper.className = ['fl-progress-container', options.className || ''].filter(Boolean).join(' ');

  // Create native progress element
  const progress = document.createElement('progress');
  progress.className = `fl-progress fl-progress--${variant}`;
  progress.max = max;
  
  if (options.value !== undefined && options.value !== null) {
    progress.value = options.value;
  }

  // Label UI setup
  let labelSpan: HTMLSpanElement | null = null;

  if (showLabel) {
    const infoDiv = document.createElement('div');
    infoDiv.className = 'fl-progress-info';

    labelSpan = document.createElement('span');
    labelSpan.className = 'fl-progress-label';
    labelSpan.textContent = getLabelText(
      options.value !== undefined && options.value !== null ? options.value : undefined,
      max
    );

    infoDiv.appendChild(labelSpan);
    wrapper.appendChild(infoDiv);
  }

  wrapper.appendChild(progress);

  function getLabelText(val: number | undefined, mx: number): string {
    if (options.formatLabel) {
      return options.formatLabel(val, mx);
    }
    if (val === undefined) {
      return 'Načítání...';
    }
    const pct = Math.round((val / mx) * 100);
    return `${pct}%`;
  }

  function updateLabel() {
    if (labelSpan) {
      const val = progress.hasAttribute('value') ? progress.value : undefined;
      labelSpan.textContent = getLabelText(val, progress.max);
    }
  }

  return {
    element: wrapper,
    progressElement: progress,
    setValue(val: number | undefined | null) {
      if (val === undefined || val === null) {
        progress.removeAttribute('value');
      } else {
        progress.value = val;
      }
      updateLabel();
    },
    getValue() {
      return progress.hasAttribute('value') ? progress.value : undefined;
    },
    setMax(mx: number) {
      progress.max = mx;
      updateLabel();
    },
    destroy() {
      wrapper.remove();
    }
  };
}
