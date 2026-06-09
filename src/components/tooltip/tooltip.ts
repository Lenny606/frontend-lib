import './tooltip.css';

let tooltipUid = 0;

export interface TooltipOptions {
  /**
   * The element the tooltip is attached to. It gets wrapped and linked
   * via aria-describedby.
   */
  target: HTMLElement;
  /**
   * The text content of the tooltip bubble.
   */
  content: string;
  /**
   * Placement of the bubble relative to the target.
   * @default 'top'
   */
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

/**
 * Wraps a target element with a tooltip bubble shown on hover and keyboard focus.
 * Returns the wrapper element to insert into the DOM.
 */
export function createTooltip(options: TooltipOptions): HTMLElement {
  const position = options.position || 'top';
  tooltipUid += 1;
  const id = `fl-tooltip-${tooltipUid}`;

  const wrapper = document.createElement('span');
  wrapper.className = [
    'fl-tooltip-wrapper',
    options.className || ''
  ].filter(Boolean).join(' ');

  const bubble = document.createElement('div');
  bubble.className = `fl-tooltip fl-tooltip--${position}`;
  bubble.id = id;
  bubble.setAttribute('role', 'tooltip');
  bubble.textContent = options.content;

  options.target.setAttribute('aria-describedby', id);

  wrapper.appendChild(options.target);
  wrapper.appendChild(bubble);

  return wrapper;
}
