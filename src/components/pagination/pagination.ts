import './pagination.css';

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

export interface PaginationOptions {
  /**
   * Total number of pages.
   */
  totalPages: number;
  /**
   * Initially active page (1-based).
   * @default 1
   */
  page?: number;
  /**
   * How many page buttons are shown on each side
   * of the active page before collapsing into '…'.
   * @default 1
   */
  siblingCount?: number;
  /**
   * Compact size variant.
   * @default 'default'
   */
  size?: 'sm' | 'default';
  /**
   * Disable all interaction.
   */
  disabled?: boolean;
  /**
   * Event callback triggered when the user changes the page.
   */
  onChange?: (page: number) => void;
  /**
   * Accessible name of the navigation landmark.
   * @default 'Stránkování'
   */
  ariaLabel?: string;
  /**
   * Custom CSS class name to append to the nav element.
   */
  className?: string;
}

export interface PaginationInstance {
  /**
   * The root <nav> element.
   */
  element: HTMLElement;
  /**
   * Currently active page (1-based).
   */
  getPage(): number;
  /**
   * Programmatically switch the page without firing onChange.
   */
  setPage(page: number): void;
  /**
   * Removes the element from the DOM.
   */
  destroy(): void;
}

/**
 * Builds the visible page sequence, using null as the '…' placeholder.
 * Always keeps the first and last page visible.
 */
function getPageSequence(current: number, total: number, siblingCount: number): Array<number | null> {
  // First + last + current + siblings on both sides + both ellipses
  const maxVisible = siblingCount * 2 + 5;
  if (total <= maxVisible) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(current - siblingCount, 1);
  const rightSibling = Math.min(current + siblingCount, total);
  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < total - 1;

  const sequence: Array<number | null> = [1];

  if (showLeftEllipsis) {
    sequence.push(null);
  } else {
    for (let i = 2; i < leftSibling; i++) sequence.push(i);
  }

  for (let i = Math.max(leftSibling, 2); i <= Math.min(rightSibling, total - 1); i++) {
    sequence.push(i);
  }

  if (showRightEllipsis) {
    sequence.push(null);
  } else {
    for (let i = rightSibling + 1; i < total; i++) sequence.push(i);
  }

  sequence.push(total);
  return sequence;
}

export function createPagination(options: PaginationOptions): PaginationInstance {
  const totalPages = Math.max(1, options.totalPages);
  const siblingCount = options.siblingCount !== undefined ? options.siblingCount : 1;
  let currentPage = Math.min(Math.max(options.page || 1, 1), totalPages);

  const nav = document.createElement('nav');
  nav.className = [
    'fl-pagination',
    options.size === 'sm' ? 'fl-pagination--sm' : '',
    options.disabled ? 'fl-pagination--disabled' : '',
    options.className || ''
  ].filter(Boolean).join(' ');
  nav.setAttribute('aria-label', options.ariaLabel || 'Stránkování');

  function select(page: number) {
    if (page < 1 || page > totalPages || page === currentPage) return;
    currentPage = page;
    render();
    if (options.onChange) {
      options.onChange(page);
    }
  }

  function render() {
    nav.innerHTML = '';

    const prevBtn = document.createElement('button');
    prevBtn.type = 'button';
    prevBtn.className = 'fl-pagination-btn fl-pagination-nav';
    prevBtn.setAttribute('aria-label', 'Předchozí stránka');
    prevBtn.innerHTML = PREV_SVG;
    prevBtn.disabled = options.disabled || currentPage === 1;
    prevBtn.addEventListener('click', () => {
      select(currentPage - 1);
    });
    nav.appendChild(prevBtn);

    getPageSequence(currentPage, totalPages, siblingCount).forEach(page => {
      if (page === null) {
        const ellipsis = document.createElement('span');
        ellipsis.className = 'fl-pagination-ellipsis';
        ellipsis.setAttribute('aria-hidden', 'true');
        ellipsis.textContent = '…';
        nav.appendChild(ellipsis);
        return;
      }

      const pageBtn = document.createElement('button');
      pageBtn.type = 'button';
      pageBtn.className = [
        'fl-pagination-btn fl-pagination-page',
        page === currentPage ? 'fl-pagination-page--active' : ''
      ].filter(Boolean).join(' ');
      pageBtn.textContent = String(page);
      pageBtn.setAttribute('aria-label', `Stránka ${page}`);
      pageBtn.disabled = !!options.disabled;

      if (page === currentPage) {
        pageBtn.setAttribute('aria-current', 'page');
      }

      pageBtn.addEventListener('click', () => {
        select(page);
      });
      nav.appendChild(pageBtn);
    });

    const nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'fl-pagination-btn fl-pagination-nav';
    nextBtn.setAttribute('aria-label', 'Následující stránka');
    nextBtn.innerHTML = NEXT_SVG;
    nextBtn.disabled = options.disabled || currentPage === totalPages;
    nextBtn.addEventListener('click', () => {
      select(currentPage + 1);
    });
    nav.appendChild(nextBtn);
  }

  render();

  return {
    element: nav,
    getPage() {
      return currentPage;
    },
    setPage(page) {
      currentPage = Math.min(Math.max(page, 1), totalPages);
      render();
    },
    destroy() {
      nav.remove();
    }
  };
}
