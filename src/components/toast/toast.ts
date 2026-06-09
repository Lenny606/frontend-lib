import './toast.css';

export interface ToastOptions {
  /**
   * The main message of the toast.
   */
  message: string;
  /**
   * Optional bold title rendered above the message.
   */
  title?: string;
  /**
   * The design variant of the toast.
   * @default 'info'
   */
  variant?: 'info' | 'success' | 'warning' | 'error';
  /**
   * Auto-dismiss timeout in milliseconds. Use 0 to keep the toast
   * until it is closed manually.
   * @default 4000
   */
  duration?: number;
  /**
   * Corner of the viewport where the toast appears.
   * @default 'top-right'
   */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  /**
   * Whether to show a close button.
   * @default true
   */
  closable?: boolean;
  /**
   * Called after the toast is removed from the DOM.
   */
  onClose?: () => void;
  className?: string;
}

// Variant icons (SVG strings)
const VARIANT_ICONS: Record<string, string> = {
  info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>`,
  success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>`,
  warning: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>`,
  error: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m15 9-6 6"></path><path d="m9 9 6 6"></path></svg>`
};

const CLOSE_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>`;

// One container per viewport corner, created lazily and shared by all toasts
function getToastContainer(position: string): HTMLElement {
  const containerClass = `fl-toast-container--${position}`;
  let container = document.querySelector<HTMLElement>(`.${containerClass}`);
  if (!container) {
    container = document.createElement('div');
    container.className = `fl-toast-container ${containerClass}`;
    document.body.appendChild(container);
  }
  return container;
}

/**
 * Shows a glass-styled toast notification in a corner of the viewport.
 * Returns the toast element; it removes itself after `duration` ms.
 */
export function showToast(options: ToastOptions): HTMLElement {
  const variant = options.variant || 'info';
  const position = options.position || 'top-right';
  const duration = options.duration === undefined ? 4000 : options.duration;
  const closable = options.closable !== false;

  const container = getToastContainer(position);

  const toast = document.createElement('div');
  toast.className = [
    'fl-toast',
    `fl-toast--${variant}`,
    options.className || ''
  ].filter(Boolean).join(' ');
  toast.setAttribute('role', variant === 'error' ? 'alert' : 'status');
  toast.setAttribute('aria-live', variant === 'error' ? 'assertive' : 'polite');

  // Variant icon
  const iconTemplate = document.createElement('template');
  iconTemplate.innerHTML = VARIANT_ICONS[variant].trim();
  const icon = iconTemplate.content.firstElementChild as HTMLElement;
  icon.classList.add('fl-toast-icon');
  toast.appendChild(icon);

  // Title + message
  const body = document.createElement('div');
  body.className = 'fl-toast-body';

  if (options.title) {
    const title = document.createElement('div');
    title.className = 'fl-toast-title';
    title.textContent = options.title;
    body.appendChild(title);
  }

  const message = document.createElement('div');
  message.className = 'fl-toast-message';
  message.textContent = options.message;
  body.appendChild(message);

  toast.appendChild(body);

  let dismissTimer: ReturnType<typeof setTimeout> | undefined;
  let closed = false;

  function close() {
    if (closed) return;
    closed = true;
    if (dismissTimer) clearTimeout(dismissTimer);
    toast.classList.add('fl-toast--closing');
    // Remove after the exit transition finishes
    setTimeout(() => {
      toast.remove();
      if (options.onClose) {
        options.onClose();
      }
    }, 350);
  }

  // Close button
  if (closable) {
    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'fl-toast-close';
    closeBtn.setAttribute('aria-label', 'Zavřít notifikaci');
    closeBtn.innerHTML = CLOSE_SVG;
    closeBtn.addEventListener('click', close);
    toast.appendChild(closeBtn);
  }

  container.appendChild(toast);

  if (duration > 0) {
    dismissTimer = setTimeout(close, duration);
  }

  return toast;
}
