import './alert.css';

// Variant icons (SVG strings)
const VARIANT_ICONS: Record<string, string> = {
  info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>`,
  success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>`,
  warning: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>`,
  error: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m15 9-6 6"></path><path d="m9 9 6 6"></path></svg>`
};

const CLOSE_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>`;

export interface AlertOptions {
  /**
   * Main message of the alert. Accepts plain text or an element
   * for rich content (links, formatting).
   */
  message: string | HTMLElement;
  /**
   * Optional bold heading above the message.
   */
  title?: string;
  /**
   * Color and icon variant.
   * @default 'info'
   */
  variant?: 'info' | 'success' | 'warning' | 'error';
  /**
   * Custom icon HTML markup string replacing the variant icon.
   */
  icon?: string;
  /**
   * Hide the variant icon completely.
   */
  hideIcon?: boolean;
  /**
   * Show a close button that removes the alert from the DOM.
   */
  dismissible?: boolean;
  /**
   * Event callback triggered after the alert is dismissed.
   */
  onDismiss?: () => void;
  /**
   * Custom CSS class name to append to the alert.
   */
  className?: string;
}

export function createAlert(options: AlertOptions): HTMLDivElement {
  const variant = options.variant || 'info';

  const alert = document.createElement('div');
  alert.className = [
    'fl-alert',
    `fl-alert--${variant}`,
    options.className || ''
  ].filter(Boolean).join(' ');
  // Errors and warnings should interrupt screen readers, informative variants should not
  alert.setAttribute('role', variant === 'error' || variant === 'warning' ? 'alert' : 'status');

  if (!options.hideIcon) {
    const iconSpan = document.createElement('span');
    iconSpan.className = 'fl-alert-icon';
    iconSpan.innerHTML = options.icon || VARIANT_ICONS[variant];
    alert.appendChild(iconSpan);
  }

  const body = document.createElement('div');
  body.className = 'fl-alert-body';

  if (options.title) {
    const titleDiv = document.createElement('div');
    titleDiv.className = 'fl-alert-title';
    titleDiv.textContent = options.title;
    body.appendChild(titleDiv);
  }

  const messageDiv = document.createElement('div');
  messageDiv.className = 'fl-alert-message';
  if (typeof options.message === 'string') {
    messageDiv.textContent = options.message;
  } else {
    messageDiv.appendChild(options.message);
  }
  body.appendChild(messageDiv);

  alert.appendChild(body);

  if (options.dismissible) {
    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'fl-alert-close';
    closeBtn.setAttribute('aria-label', 'Zavřít upozornění');
    closeBtn.innerHTML = CLOSE_SVG;
    closeBtn.addEventListener('click', () => {
      alert.classList.add('fl-alert--closing');
      window.setTimeout(() => {
        alert.remove();
        if (options.onDismiss) {
          options.onDismiss();
        }
      }, 250);
    });
    alert.appendChild(closeBtn);
  }

  return alert;
}
