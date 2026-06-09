import './modal.css';

let modalUid = 0;

export interface ModalOptions {
  /**
   * Heading text of the modal.
   */
  title?: string;
  /**
   * Body content. A plain string is rendered as a paragraph;
   * elements are appended as-is.
   */
  content?: string | HTMLElement | HTMLElement[];
  /**
   * Footer elements, typically action buttons.
   */
  footer?: HTMLElement | HTMLElement[];
  /**
   * The size (max-width) of the modal.
   * @default 'default'
   */
  size?: 'sm' | 'default' | 'lg';
  /**
   * Whether to show a close (X) button in the header.
   * @default true
   */
  closable?: boolean;
  /**
   * Close the modal by clicking the backdrop (light dismiss).
   * The Esc key always works (native dialog behaviour).
   * @default true
   */
  closeOnBackdrop?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  className?: string;
}

export interface ModalInstance {
  /**
   * The underlying native dialog element.
   */
  element: HTMLDialogElement;
  open(): void;
  close(): void;
  isOpen(): boolean;
  /**
   * Removes the dialog from the DOM.
   */
  destroy(): void;
}

const CLOSE_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>`;

// Normalizes single element / array into an array
function toElements(value: HTMLElement | HTMLElement[]): HTMLElement[] {
  return Array.isArray(value) ? value : [value];
}

/**
 * Creates a glass-styled modal window built on the native <dialog> element
 * (top layer, focus trap and Esc handling come for free). Returns an
 * instance with open/close/destroy controls.
 */
export function createModal(options: ModalOptions): ModalInstance {
  const size = options.size || 'default';
  const closable = options.closable !== false;
  const closeOnBackdrop = options.closeOnBackdrop !== false;
  modalUid += 1;
  const titleId = `fl-modal-title-${modalUid}`;

  const dialog = document.createElement('dialog');
  dialog.className = [
    'fl-modal',
    `fl-modal--${size}`,
    options.className || ''
  ].filter(Boolean).join(' ');

  // Light dismiss: declarative where supported, click-coordinates fallback below
  if (closeOnBackdrop) {
    dialog.setAttribute('closedby', 'any');
  }

  // 1. Header (title + close button)
  if (options.title || closable) {
    const header = document.createElement('div');
    header.className = 'fl-modal-header';

    if (options.title) {
      const title = document.createElement('h2');
      title.className = 'fl-modal-title';
      title.id = titleId;
      title.textContent = options.title;
      header.appendChild(title);
      dialog.setAttribute('aria-labelledby', titleId);
    }

    if (closable) {
      const closeBtn = document.createElement('button');
      closeBtn.type = 'button';
      closeBtn.className = 'fl-modal-close';
      closeBtn.setAttribute('aria-label', 'Zavřít okno');
      closeBtn.innerHTML = CLOSE_SVG;
      closeBtn.addEventListener('click', () => dialog.close());
      header.appendChild(closeBtn);
    }

    dialog.appendChild(header);
  }

  // 2. Body content
  if (options.content) {
    const body = document.createElement('div');
    body.className = 'fl-modal-body';

    if (typeof options.content === 'string') {
      const paragraph = document.createElement('p');
      paragraph.className = 'fl-modal-text';
      paragraph.textContent = options.content;
      body.appendChild(paragraph);
    } else {
      toElements(options.content).forEach(el => body.appendChild(el));
    }

    dialog.appendChild(body);
  }

  // 3. Footer (actions)
  if (options.footer) {
    const footer = document.createElement('div');
    footer.className = 'fl-modal-footer';
    toElements(options.footer).forEach(el => footer.appendChild(el));
    dialog.appendChild(footer);
  }

  // Light-dismiss fallback for browsers without closedby support (e.g. Safari):
  // a backdrop click targets the dialog itself, outside its content box
  if (closeOnBackdrop && !('closedBy' in HTMLDialogElement.prototype)) {
    dialog.addEventListener('click', (event) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const isInsideContent =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;
      if (!isInsideContent) {
        dialog.close();
      }
    });
  }

  dialog.addEventListener('close', () => {
    if (options.onClose) {
      options.onClose();
    }
  });

  document.body.appendChild(dialog);

  return {
    element: dialog,
    open() {
      if (!dialog.open) {
        dialog.showModal();
        if (options.onOpen) {
          options.onOpen();
        }
      }
    },
    close() {
      dialog.close();
    },
    isOpen() {
      return dialog.open;
    },
    destroy() {
      if (dialog.open) dialog.close();
      dialog.remove();
    }
  };
}
