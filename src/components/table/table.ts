import './table.css';
import { createSkeleton } from '../skeleton/index.ts';

const SORT_SVG = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="m7 15 5 5 5-5"></path>
    <path d="m7 9 5-5 5 5"></path>
  </svg>
`;

const SORT_ASC_SVG = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="m18 15-6-6-6 6"></path>
  </svg>
`;

const SORT_DESC_SVG = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="m6 9 6 6 6-6"></path>
  </svg>
`;

export interface TableColumn<T = Record<string, any>> {
  /**
   * Key of the row property displayed in this column.
   */
  key: string;
  /**
   * Column header text.
   */
  label: string;
  /**
   * Allow sorting by this column (click on the header).
   */
  sortable?: boolean;
  /**
   * Cell text alignment.
   * @default 'left'
   */
  align?: 'left' | 'center' | 'right';
  /**
   * Fixed column width (any CSS length).
   */
  width?: string;
  /**
   * Custom cell renderer. Receives the whole row and returns
   * text or an element (e.g. a Badge or Avatar).
   */
  render?: (row: T) => string | HTMLElement;
}

export interface TableOptions<T = Record<string, any>> {
  /**
   * Column definitions in display order.
   */
  columns: TableColumn<T>[];
  /**
   * Row data objects.
   */
  data: T[];
  /**
   * Alternate row background striping.
   */
  striped?: boolean;
  /**
   * Tighter cell paddings.
   */
  compact?: boolean;
  /**
   * Highlight rows on hover.
   * @default true
   */
  hoverable?: boolean;
  /**
   * Message shown when there are no rows.
   * @default 'Žádná data k zobrazení'
   */
  emptyMessage?: string;
  /**
   * Render skeleton placeholder rows instead of data.
   */
  loading?: boolean;
  /**
   * Number of skeleton rows shown while loading.
   * @default 4
   */
  loadingRows?: number;
  /**
   * Event callback triggered when a row is clicked.
   */
  onRowClick?: (row: T, index: number) => void;
  /**
   * Event callback triggered after the sort changes.
   */
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  /**
   * Custom CSS class name to append to the wrapper.
   */
  className?: string;
}

export interface TableInstance<T = Record<string, any>> {
  /**
   * Scrollable wrapper element containing the table.
   */
  element: HTMLDivElement;
  /**
   * Replace the row data and re-render.
   */
  setData(rows: T[]): void;
  /**
   * Toggle the skeleton loading state.
   */
  setLoading(loading: boolean): void;
  /**
   * Removes the element from the DOM.
   */
  destroy(): void;
}

function compareValues(a: any, b: any): number {
  if (a === b) return 0;
  if (a === null || a === undefined) return -1;
  if (b === null || b === undefined) return 1;
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  }
  return String(a).localeCompare(String(b), 'cs', { numeric: true });
}

export function createTable<T extends Record<string, any>>(options: TableOptions<T>): TableInstance<T> {
  let data = options.data.slice();
  let loading = !!options.loading;
  let sortKey: string | null = null;
  let sortDirection: 'asc' | 'desc' = 'asc';

  const hoverable = options.hoverable !== false;
  const loadingRows = options.loadingRows || 4;

  const wrapper = document.createElement('div');
  wrapper.className = [
    'fl-table-wrapper',
    options.striped ? 'fl-table-wrapper--striped' : '',
    options.compact ? 'fl-table-wrapper--compact' : '',
    hoverable ? 'fl-table-wrapper--hoverable' : '',
    options.className || ''
  ].filter(Boolean).join(' ');

  const table = document.createElement('table');
  table.className = 'fl-table';
  wrapper.appendChild(table);

  function sortedData(): T[] {
    if (!sortKey) return data;
    const key = sortKey;
    const sorted = data.slice().sort((a, b) => compareValues(a[key], b[key]));
    return sortDirection === 'asc' ? sorted : sorted.reverse();
  }

  function renderHead() {
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');

    options.columns.forEach(column => {
      const th = document.createElement('th');
      th.className = `fl-table-th fl-table-cell--${column.align || 'left'}`;
      th.scope = 'col';
      if (column.width) {
        th.style.width = column.width;
      }

      if (column.sortable) {
        const sortBtn = document.createElement('button');
        sortBtn.type = 'button';
        sortBtn.className = 'fl-table-sort';

        const labelSpan = document.createElement('span');
        labelSpan.textContent = column.label;
        sortBtn.appendChild(labelSpan);

        const iconSpan = document.createElement('span');
        iconSpan.className = 'fl-table-sort-icon';
        if (sortKey === column.key) {
          iconSpan.innerHTML = sortDirection === 'asc' ? SORT_ASC_SVG : SORT_DESC_SVG;
          iconSpan.classList.add('fl-table-sort-icon--active');
          th.setAttribute('aria-sort', sortDirection === 'asc' ? 'ascending' : 'descending');
        } else {
          iconSpan.innerHTML = SORT_SVG;
        }
        sortBtn.appendChild(iconSpan);

        sortBtn.addEventListener('click', () => {
          if (sortKey === column.key) {
            sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
          } else {
            sortKey = column.key;
            sortDirection = 'asc';
          }
          render();
          if (options.onSort) {
            options.onSort(column.key, sortDirection);
          }
        });

        th.appendChild(sortBtn);
      } else {
        th.textContent = column.label;
      }

      tr.appendChild(th);
    });

    thead.appendChild(tr);
    table.appendChild(thead);
  }

  function renderBody() {
    const tbody = document.createElement('tbody');

    if (loading) {
      for (let i = 0; i < loadingRows; i++) {
        const tr = document.createElement('tr');
        tr.className = 'fl-table-row fl-table-row--loading';
        options.columns.forEach((_column, columnIndex) => {
          const td = document.createElement('td');
          td.className = 'fl-table-td';
          // Vary skeleton widths so the placeholder looks organic
          const width = columnIndex === 0 ? '70%' : `${55 + ((i + columnIndex) % 3) * 15}%`;
          td.appendChild(createSkeleton({ variant: 'text', width }));
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      }
      table.appendChild(tbody);
      return;
    }

    const rows = sortedData();

    if (rows.length === 0) {
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.className = 'fl-table-empty';
      td.colSpan = options.columns.length;
      td.textContent = options.emptyMessage || 'Žádná data k zobrazení';
      tr.appendChild(td);
      tbody.appendChild(tr);
      table.appendChild(tbody);
      return;
    }

    rows.forEach((row, index) => {
      const tr = document.createElement('tr');
      tr.className = 'fl-table-row';

      if (options.onRowClick) {
        tr.classList.add('fl-table-row--clickable');
        tr.tabIndex = 0;
        tr.addEventListener('click', () => {
          options.onRowClick!(row, index);
        });
        tr.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            options.onRowClick!(row, index);
          }
        });
      }

      options.columns.forEach(column => {
        const td = document.createElement('td');
        td.className = `fl-table-td fl-table-cell--${column.align || 'left'}`;

        if (column.render) {
          const content = column.render(row);
          if (typeof content === 'string') {
            td.textContent = content;
          } else {
            td.appendChild(content);
          }
        } else {
          const value = row[column.key];
          td.textContent = value === null || value === undefined ? '' : String(value);
        }

        tr.appendChild(td);
      });

      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
  }

  function render() {
    table.innerHTML = '';
    renderHead();
    renderBody();
  }

  render();

  return {
    element: wrapper,
    setData(rows) {
      data = rows.slice();
      loading = false;
      render();
    },
    setLoading(value) {
      loading = value;
      render();
    },
    destroy() {
      wrapper.remove();
    }
  };
}
