import './skeleton.css';

export interface SkeletonOptions {
  /**
   * Shape variant of the skeleton.
   * @default 'text'
   */
  variant?: 'text' | 'rect' | 'circle';
  /**
   * Width of the skeleton placeholder (e.g., '100%', '48px', '8rem').
   * If undefined, CSS defaults are used.
   */
  width?: string;
  /**
   * Height of the skeleton placeholder (e.g., '200px', '1.2em').
   * If undefined, CSS defaults are used.
   */
  height?: string;
  /**
   * Whether to run the shimmer pulsing animation.
   * @default true
   */
  animate?: boolean;
  /**
   * Custom CSS class name to append.
   */
  className?: string;
}

/**
 * Creates a premium, customizable pulsing/shimmering Skeleton placeholder.
 */
export function createSkeleton(options: SkeletonOptions = {}): HTMLElement {
  const variant = options.variant || 'text';
  const animate = options.animate !== false;

  const skeleton = document.createElement('div');
  skeleton.className = [
    'fl-skeleton',
    `fl-skeleton--${variant}`,
    animate ? 'fl-skeleton--animate' : '',
    options.className || ''
  ].filter(Boolean).join(' ');

  // Apply custom size styles if specified
  if (options.width) {
    skeleton.style.width = options.width;
  }
  
  if (options.height) {
    skeleton.style.height = options.height;
  } else if (variant === 'circle' && options.width) {
    // For circles, default height to width if only width is provided
    skeleton.style.height = options.width;
  }

  // Accessibility
  skeleton.setAttribute('aria-hidden', 'true');

  return skeleton;
}
