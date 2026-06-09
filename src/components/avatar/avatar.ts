import './avatar.css';

export interface AvatarOptions {
  /**
   * The URL of the avatar image.
   */
  src?: string;
  /**
   * Alt text describing the avatar image.
   */
  alt?: string;
  /**
   * Fallback text (e.g. initials like "JN") shown when the image is loading or fails to load.
   * Will be trimmed to a maximum of 2 characters and capitalized.
   */
  fallback?: string;
  /**
   * Sizing of the avatar element.
   * @default 'md'
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Shape variant.
   * @default 'circle'
   */
  shape?: 'circle' | 'square';
  /**
   * Status dot overlay indicating user presence.
   */
  status?: 'online' | 'offline' | 'idle' | 'dnd';
  /**
   * Additional custom CSS classes.
   */
  className?: string;
}

/**
 * Creates a premium glassmorphic Avatar component with image loading, fallbacks, and status indicators.
 */
export function createAvatar(options: AvatarOptions): HTMLElement {
  const size = options.size || 'md';
  const shape = options.shape || 'circle';

  // Base container
  const avatar = document.createElement('div');
  avatar.className = [
    'fl-avatar',
    `fl-avatar--${size}`,
    `fl-avatar--${shape}`,
    options.className || ''
  ].filter(Boolean).join(' ');

  // Accessibility
  avatar.setAttribute('role', 'img');
  avatar.setAttribute('aria-label', options.alt || options.fallback || 'Uživatel');

  // Fallback / Placeholder element
  const fallbackEl = document.createElement('span');
  fallbackEl.className = 'fl-avatar-fallback';

  if (options.fallback) {
    fallbackEl.textContent = options.fallback.trim().substring(0, 2).toUpperCase();
  } else {
    // Default SVG user icon
    fallbackEl.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="fl-avatar-placeholder-icon" aria-hidden="true">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    `;
  }
  avatar.appendChild(fallbackEl);

  // User Image element (if src provided)
  if (options.src) {
    const img = document.createElement('img');
    img.className = 'fl-avatar-img';
    img.src = options.src;
    img.alt = options.alt || '';
    img.draggable = false;

    // Smooth load fade-in
    img.addEventListener('load', () => {
      img.classList.add('fl-avatar-img--loaded');
      fallbackEl.style.opacity = '0';
      setTimeout(() => {
        fallbackEl.style.display = 'none';
      }, 250);
    });

    // Image load failure fallback
    img.addEventListener('error', () => {
      img.style.display = 'none';
      fallbackEl.style.display = 'flex';
      fallbackEl.style.opacity = '1';
    });

    avatar.appendChild(img);
  }

  // Status Indicator Dot (if status provided)
  if (options.status) {
    const statusEl = document.createElement('span');
    statusEl.className = `fl-avatar-status fl-avatar-status--${options.status}`;
    avatar.appendChild(statusEl);
  }

  return avatar;
}
