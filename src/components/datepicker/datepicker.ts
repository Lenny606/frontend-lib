import './datepicker.css';

let datepickerUid = 0;

const CALENDAR_SVG = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
    <line x1="16" x2="16" y1="2" y2="6"></line>
    <line x1="8" x2="8" y1="2" y2="6"></line>
    <line x1="3" x2="21" y1="10" y2="10"></line>
  </svg>
`;

const PREV_SVG = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="m15 18-6-6 6-6"></path>
  </svg>
`;

const NEXT_SVG = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="m9 18 6-6-6-6"></path>
  </svg>
`;

export interface DatepickerOptions {
  /**
   * Initially selected date. Accepts a Date object
   * or an ISO string ('YYYY-MM-DD').
   */
  value?: Date | string;
  /**
   * Text shown in the trigger when no date is selected.
   * @default 'Vyberte datum'
   */
  placeholder?: string;
  /**
   * Earliest selectable date (inclusive).
   */
  min?: Date | string;
  /**
   * Latest selectable date (inclusive).
   */
  max?: Date | string;
  /**
   * BCP 47 locale used for month, weekday and date formatting.
   * @default 'cs-CZ'
   */
  locale?: string;
  /**
   * First day of the week: 0 = Sunday, 1 = Monday.
   * @default 1
   */
  firstDayOfWeek?: 0 | 1;
  /**
   * Trigger field size matching the Input component heights.
   * @default 'default'
   */
  size?: 'sm' | 'default' | 'lg';
  /**
   * Disable the whole picker.
   */
  disabled?: boolean;
  /**
   * Show a clear button in the calendar footer.
   */
  clearable?: boolean;
  /**
   * Event callback triggered when the selection changes.
   * Receives the selected Date or null after clearing.
   */
  onChange?: (date: Date | null) => void;
  /**
   * Custom CSS class name to append to the root element.
   */
  className?: string;
}

export interface DatepickerInstance {
  /**
   * The root element containing the trigger field.
   */
  element: HTMLDivElement;
  /**
   * Currently selected date or null.
   */
  getValue(): Date | null;
  /**
   * Programmatically set (or clear with null) the selection.
   */
  setValue(value: Date | string | null): void;
  /**
   * Programmatic open trigger.
   */
  open(): void;
  /**
   * Programmatic close trigger.
   */
  close(): void;
  /**
   * Whether the calendar is currently visible.
   */
  isOpen(): boolean;
  /**
   * Cleanup the elements from the DOM and dismantle listeners.
   */
  destroy(): void;
}

/** Normalizes a Date or ISO string to local midnight. */
function toDate(value: Date | string): Date {
  if (value instanceof Date) {
    return new Date(value.getFullYear(), value.getMonth(), value.getDate());
  }
  const parts = value.split('-').map(Number);
  return new Date(parts[0], (parts[1] || 1) - 1, parts[2] || 1);
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate();
}

export function createDatepicker(options: DatepickerOptions): DatepickerInstance {
  datepickerUid += 1;
  const calendarId = `fl-datepicker-${datepickerUid}`;
  const locale = options.locale || 'cs-CZ';
  const firstDayOfWeek = options.firstDayOfWeek !== undefined ? options.firstDayOfWeek : 1;
  const placeholder = options.placeholder || 'Vyberte datum';
  const size = options.size || 'default';

  const minDate = options.min ? toDate(options.min) : null;
  const maxDate = options.max ? toDate(options.max) : null;

  let selected: Date | null = options.value ? toDate(options.value) : null;

  const today = toDate(new Date());
  let viewYear = (selected || today).getFullYear();
  let viewMonth = (selected || today).getMonth();

  const displayFormat = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'numeric', year: 'numeric' });
  const monthFormat = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' });
  const dayLabelFormat = new Intl.DateTimeFormat(locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const weekdayFormat = new Intl.DateTimeFormat(locale, { weekday: 'short' });

  // 1. Trigger field
  const root = document.createElement('div');
  root.className = [
    'fl-datepicker',
    `fl-datepicker--${size}`,
    options.disabled ? 'fl-datepicker--disabled' : '',
    options.className || ''
  ].filter(Boolean).join(' ');

  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'fl-datepicker-trigger';
  trigger.setAttribute('popovertarget', calendarId);
  trigger.setAttribute('aria-haspopup', 'dialog');

  if (options.disabled) {
    trigger.disabled = true;
  }

  const iconSpan = document.createElement('span');
  iconSpan.className = 'fl-datepicker-icon';
  iconSpan.innerHTML = CALENDAR_SVG;
  trigger.appendChild(iconSpan);

  const valueSpan = document.createElement('span');
  valueSpan.className = 'fl-datepicker-value';
  trigger.appendChild(valueSpan);

  root.appendChild(trigger);

  function updateTrigger() {
    if (selected) {
      valueSpan.textContent = displayFormat.format(selected);
      valueSpan.classList.remove('fl-datepicker-value--placeholder');
    } else {
      valueSpan.textContent = placeholder;
      valueSpan.classList.add('fl-datepicker-value--placeholder');
    }
  }

  updateTrigger();

  // 2. Calendar popover
  const calendar = document.createElement('div');
  calendar.id = calendarId;
  calendar.setAttribute('popover', 'auto');
  calendar.setAttribute('role', 'dialog');
  calendar.setAttribute('aria-label', 'Kalendář');
  calendar.className = 'fl-datepicker-calendar';
  document.body.appendChild(calendar);

  function isDisabledDay(date: Date): boolean {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  }

  function selectDate(date: Date) {
    selected = date;
    viewYear = date.getFullYear();
    viewMonth = date.getMonth();
    updateTrigger();
    calendar.hidePopover();
    if (options.onChange) {
      options.onChange(date);
    }
  }

  function renderCalendar() {
    calendar.innerHTML = '';

    // Header: month navigation
    const header = document.createElement('div');
    header.className = 'fl-datepicker-header';

    const prevBtn = document.createElement('button');
    prevBtn.type = 'button';
    prevBtn.className = 'fl-datepicker-nav';
    prevBtn.setAttribute('aria-label', 'Předchozí měsíc');
    prevBtn.innerHTML = PREV_SVG;
    prevBtn.addEventListener('click', () => {
      viewMonth -= 1;
      if (viewMonth < 0) {
        viewMonth = 11;
        viewYear -= 1;
      }
      renderCalendar();
    });

    const monthLabel = document.createElement('span');
    monthLabel.className = 'fl-datepicker-month';
    monthLabel.setAttribute('aria-live', 'polite');
    monthLabel.textContent = monthFormat.format(new Date(viewYear, viewMonth, 1));

    const nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'fl-datepicker-nav';
    nextBtn.setAttribute('aria-label', 'Následující měsíc');
    nextBtn.innerHTML = NEXT_SVG;
    nextBtn.addEventListener('click', () => {
      viewMonth += 1;
      if (viewMonth > 11) {
        viewMonth = 0;
        viewYear += 1;
      }
      renderCalendar();
    });

    header.appendChild(prevBtn);
    header.appendChild(monthLabel);
    header.appendChild(nextBtn);
    calendar.appendChild(header);

    // Weekday names row (2024-01-01 was a Monday, used as a reference week)
    const weekdays = document.createElement('div');
    weekdays.className = 'fl-datepicker-grid fl-datepicker-weekdays';
    for (let i = 0; i < 7; i++) {
      const dayIndex = (firstDayOfWeek + i) % 7;
      const refDate = new Date(2024, 0, dayIndex === 0 ? 7 : dayIndex);
      const cell = document.createElement('span');
      cell.className = 'fl-datepicker-weekday';
      cell.textContent = weekdayFormat.format(refDate);
      weekdays.appendChild(cell);
    }
    calendar.appendChild(weekdays);

    // Day grid: 6 weeks including the surrounding months
    const grid = document.createElement('div');
    grid.className = 'fl-datepicker-grid';

    const firstOfMonth = new Date(viewYear, viewMonth, 1);
    const offset = (firstOfMonth.getDay() - firstDayOfWeek + 7) % 7;
    const start = new Date(viewYear, viewMonth, 1 - offset);

    for (let i = 0; i < 42; i++) {
      const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
      const dayBtn = document.createElement('button');
      dayBtn.type = 'button';
      dayBtn.className = [
        'fl-datepicker-day',
        date.getMonth() !== viewMonth ? 'fl-datepicker-day--outside' : '',
        isSameDay(date, today) ? 'fl-datepicker-day--today' : '',
        selected && isSameDay(date, selected) ? 'fl-datepicker-day--selected' : ''
      ].filter(Boolean).join(' ');
      dayBtn.textContent = String(date.getDate());
      dayBtn.setAttribute('aria-label', dayLabelFormat.format(date));

      if (isSameDay(date, today)) {
        dayBtn.setAttribute('aria-current', 'date');
      }
      if (selected && isSameDay(date, selected)) {
        dayBtn.setAttribute('aria-pressed', 'true');
      }

      if (isDisabledDay(date)) {
        dayBtn.disabled = true;
      } else {
        dayBtn.addEventListener('click', () => {
          selectDate(date);
        });
      }

      grid.appendChild(dayBtn);
    }
    calendar.appendChild(grid);

    // Footer actions
    const footer = document.createElement('div');
    footer.className = 'fl-datepicker-footer';

    const todayBtn = document.createElement('button');
    todayBtn.type = 'button';
    todayBtn.className = 'fl-datepicker-action';
    todayBtn.textContent = 'Dnes';
    if (isDisabledDay(today)) {
      todayBtn.disabled = true;
    } else {
      todayBtn.addEventListener('click', () => {
        selectDate(today);
      });
    }
    footer.appendChild(todayBtn);

    if (options.clearable) {
      const clearBtn = document.createElement('button');
      clearBtn.type = 'button';
      clearBtn.className = 'fl-datepicker-action fl-datepicker-action--clear';
      clearBtn.textContent = 'Vymazat';
      clearBtn.addEventListener('click', () => {
        selected = null;
        updateTrigger();
        calendar.hidePopover();
        if (options.onChange) {
          options.onChange(null);
        }
      });
      footer.appendChild(clearBtn);
    }

    calendar.appendChild(footer);
  }

  // 3. Positioning: CSS Anchor Positioning with a JS bounds fallback
  const supportsAnchor = (typeof CSS !== 'undefined' && CSS.supports && (
    CSS.supports('anchor-name', '--a') ||
    CSS.supports('position-anchor', '--a')
  ));

  if (supportsAnchor) {
    const anchorName = `--fl-datepicker-anchor-${datepickerUid}`;
    trigger.style.setProperty('anchor-name', anchorName);
    calendar.style.setProperty('position-anchor', anchorName);
    calendar.style.top = `anchor(${anchorName} bottom)`;
    calendar.style.left = `anchor(${anchorName} left)`;
  }

  function updatePosition() {
    if (supportsAnchor) return;

    const triggerRect = trigger.getBoundingClientRect();

    calendar.style.position = 'fixed';
    calendar.style.margin = '0';
    calendar.style.top = '0';
    calendar.style.left = '0';

    const calendarRect = calendar.getBoundingClientRect();
    let top = triggerRect.bottom;
    let left = triggerRect.left;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (left < 4) left = 4;
    if (left + calendarRect.width > viewportWidth - 4) {
      left = viewportWidth - calendarRect.width - 4;
    }

    // Flip above the trigger when there is no room below
    if (top + calendarRect.height > viewportHeight - 4) {
      if (triggerRect.top - calendarRect.height > 4) {
        top = triggerRect.top - calendarRect.height;
      } else {
        top = viewportHeight - calendarRect.height - 4;
      }
    }

    calendar.style.top = `${top}px`;
    calendar.style.left = `${left}px`;
  }

  const beforeToggleHandler = (e: any) => {
    if (e.newState === 'open') {
      // Re-render so the view follows the current selection
      viewYear = (selected || today).getFullYear();
      viewMonth = (selected || today).getMonth();
      renderCalendar();
      requestAnimationFrame(() => {
        updatePosition();
      });
    }
  };

  calendar.addEventListener('beforetoggle', beforeToggleHandler);

  const onLayoutChange = () => {
    if (calendar.matches(':popover-open')) {
      updatePosition();
    }
  };

  window.addEventListener('resize', onLayoutChange);
  window.addEventListener('scroll', onLayoutChange, { capture: true, passive: true });

  renderCalendar();

  return {
    element: root,
    getValue() {
      return selected;
    },
    setValue(value) {
      selected = value === null ? null : toDate(value);
      if (selected) {
        viewYear = selected.getFullYear();
        viewMonth = selected.getMonth();
      }
      updateTrigger();
      renderCalendar();
    },
    open() {
      if (!calendar.matches(':popover-open')) {
        calendar.showPopover();
      }
    },
    close() {
      if (calendar.matches(':popover-open')) {
        calendar.hidePopover();
      }
    },
    isOpen() {
      return calendar.matches(':popover-open');
    },
    destroy() {
      if (calendar.matches(':popover-open')) {
        calendar.hidePopover();
      }
      calendar.removeEventListener('beforetoggle', beforeToggleHandler);
      window.removeEventListener('resize', onLayoutChange);
      window.removeEventListener('scroll', onLayoutChange, { capture: true });
      calendar.remove();
      root.remove();
    }
  };
}
