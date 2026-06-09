import './card.css';

export interface CardOptions {
  /**
   * Heading text of the card.
   */
  title?: string;
  /**
   * Muted subtitle rendered under the title.
   */
  subtitle?: string;
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
   * URL of an image displayed at the top of the card.
   */
  image?: string;
  /**
   * Alt text for the image.
   */
  imageAlt?: string;
  /**
   * The design variant of the card.
   * @default 'default'
   */
  variant?: 'default' | 'primary' | 'outline';
  /**
   * Whether the card lifts and glows on hover.
   */
  hoverable?: boolean;
  /**
   * Click handler. When provided, the card becomes interactive
   * (role="button", focusable, Enter/Space activation).
   */
  onClick?: (event: MouseEvent | KeyboardEvent) => void;
  className?: string;
}

// Normalizes single element / array into an array
function toElements(value: HTMLElement | HTMLElement[]): HTMLElement[] {
  return Array.isArray(value) ? value : [value];
}

/**
 * Creates a glass-styled card with optional image, header, body and footer.
 */
export function createCard(options: CardOptions): HTMLElement {
  const variant = options.variant || 'default';
  const isClickable = !!options.onClick;

  const card = document.createElement('div');
  card.className = [
    'fl-card',
    `fl-card--${variant}`,
    options.hoverable || isClickable ? 'fl-card--hoverable' : '',
    isClickable ? 'fl-card--clickable' : '',
    options.className || ''
  ].filter(Boolean).join(' ');

  // 1. Image
  if (options.image) {
    const img = document.createElement('img');
    img.className = 'fl-card-image';
    img.src = options.image;
    img.alt = options.imageAlt || '';
    card.appendChild(img);
  }

  // 2. Header (title + subtitle)
  if (options.title || options.subtitle) {
    const header = document.createElement('div');
    header.className = 'fl-card-header';

    if (options.title) {
      const title = document.createElement('h3');
      title.className = 'fl-card-title';
      title.textContent = options.title;
      header.appendChild(title);
    }

    if (options.subtitle) {
      const subtitle = document.createElement('p');
      subtitle.className = 'fl-card-subtitle';
      subtitle.textContent = options.subtitle;
      header.appendChild(subtitle);
    }

    card.appendChild(header);
  }

  // 3. Body content
  if (options.content) {
    const body = document.createElement('div');
    body.className = 'fl-card-body';

    if (typeof options.content === 'string') {
      const paragraph = document.createElement('p');
      paragraph.className = 'fl-card-text';
      paragraph.textContent = options.content;
      body.appendChild(paragraph);
    } else {
      toElements(options.content).forEach(el => body.appendChild(el));
    }

    card.appendChild(body);
  }

  // 4. Footer (actions)
  if (options.footer) {
    const footer = document.createElement('div');
    footer.className = 'fl-card-footer';
    toElements(options.footer).forEach(el => footer.appendChild(el));
    card.appendChild(footer);
  }

  // Interactive card behaviour
  if (isClickable) {
    card.setAttribute('role', 'button');
    card.tabIndex = 0;

    card.addEventListener('click', (e) => {
      options.onClick!(e as MouseEvent);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        options.onClick!(e);
      }
    });
  }

  return card;
}
