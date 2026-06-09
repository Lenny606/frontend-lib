import './tabs.css';

export interface TabItem {
  /**
   * Unique identifier for the tab.
   */
  id: string;
  /**
   * Text label displayed on the tab button.
   */
  label: string;
  /**
   * The content panel's content. Can be a string, an HTMLElement, or an array of HTMLElements.
   */
  content: string | HTMLElement | HTMLElement[];
  /**
   * Whether the tab button is disabled.
   */
  disabled?: boolean;
}

export interface TabsOptions {
  /**
   * Array of tab items defining the labels and panels.
   */
  items: TabItem[];
  /**
   * The ID of the tab that should be active initially.
   * Defaults to the ID of the first non-disabled item.
   */
  defaultTabId?: string;
  /**
   * Visual variant style of the tabs.
   * @default 'glass'
   */
  variant?: 'glass' | 'pills' | 'underline';
  /**
   * Layout orientation of the component.
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Sizing of the triggers.
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Callback fired when the active tab changes.
   */
  onTabChange?: (tabId: string) => void;
  /**
   * Additional custom CSS classes.
   */
  className?: string;
}

// Helper to normalize content to an array of HTMLElements
function toElements(value: string | HTMLElement | HTMLElement[]): HTMLElement[] {
  if (typeof value === 'string') {
    const p = document.createElement('p');
    p.textContent = value;
    return [p];
  }
  return Array.isArray(value) ? value : [value];
}

/**
 * Creates a premium, accessible Tabs component with support for multiple layouts, styles and arrow key navigation.
 */
export function createTabs(options: TabsOptions): HTMLElement {
  const items = options.items || [];
  const variant = options.variant || 'glass';
  const orientation = options.orientation || 'horizontal';
  const size = options.size || 'md';

  // Generate a unique component ID prefix to avoid element ID conflicts
  const componentUniqueId = 'fl-tabs-' + Math.random().toString(36).substring(2, 9);

  // Determine initial active tab
  let activeTabId = options.defaultTabId;
  if (!activeTabId || !items.some(item => item.id === activeTabId && !item.disabled)) {
    const firstNonDisabled = items.find(item => !item.disabled);
    activeTabId = firstNonDisabled ? firstNonDisabled.id : (items[0]?.id || '');
  }

  // 1. Root Container
  const root = document.createElement('div');
  root.className = [
    'fl-tabs',
    `fl-tabs--${variant}`,
    `fl-tabs--${orientation}`,
    `fl-tabs--${size}`,
    options.className || ''
  ].filter(Boolean).join(' ');

  // 2. Tab List (triggers navigation wrapper)
  const tabList = document.createElement('div');
  tabList.className = 'fl-tabs-list';
  tabList.setAttribute('role', 'tablist');
  tabList.setAttribute('aria-orientation', orientation);
  root.appendChild(tabList);

  // 3. Tab Panels Container
  const panelsContainer = document.createElement('div');
  panelsContainer.className = 'fl-tabs-content';
  root.appendChild(panelsContainer);

  const triggersMap = new Map<string, HTMLButtonElement>();
  const panelsMap = new Map<string, HTMLElement>();

  // Function to switch tabs
  const switchTab = (targetId: string, focusTrigger = false) => {
    const targetItem = items.find(item => item.id === targetId);
    if (!targetItem || targetItem.disabled) return;

    activeTabId = targetId;

    // Toggle active state on all buttons and panels
    items.forEach(item => {
      const btn = triggersMap.get(item.id);
      const panel = panelsMap.get(item.id);

      if (btn && panel) {
        const isActive = item.id === targetId;
        
        // Button updates
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
        btn.tabIndex = isActive ? 0 : -1;
        
        // Panel updates
        panel.classList.toggle('fl-tabs-panel--active', isActive);
        
        if (isActive && focusTrigger) {
          btn.focus();
        }
      }
    });

    if (options.onTabChange) {
      options.onTabChange(targetId);
    }
  };

  // Build Triggers and Panels
  items.forEach(item => {
    const triggerId = `${componentUniqueId}-trigger-${item.id}`;
    const panelId = `${componentUniqueId}-panel-${item.id}`;

    // A. Tab Trigger Button
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'fl-tabs-trigger';
    btn.id = triggerId;
    btn.textContent = item.label;
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-controls', panelId);
    btn.setAttribute('aria-selected', item.id === activeTabId ? 'true' : 'false');
    btn.tabIndex = item.id === activeTabId ? 0 : -1;

    if (item.disabled) {
      btn.disabled = true;
      btn.setAttribute('aria-disabled', 'true');
    } else {
      btn.addEventListener('click', () => {
        switchTab(item.id);
      });
    }

    tabList.appendChild(btn);
    triggersMap.set(item.id, btn);

    // B. Tab Panel
    const panel = document.createElement('div');
    panel.className = 'fl-tabs-panel';
    panel.id = panelId;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', triggerId);
    
    if (item.id === activeTabId) {
      panel.classList.add('fl-tabs-panel--active');
    }

    toElements(item.content).forEach(el => panel.appendChild(el));
    panelsContainer.appendChild(panel);
    panelsMap.set(item.id, panel);
  });

  // 4. Keyboard Navigation (Arrow Keys, Home, End)
  const getEnabledItems = () => items.filter(item => !item.disabled);

  tabList.addEventListener('keydown', (e: KeyboardEvent) => {
    const enabled = getEnabledItems();
    if (enabled.length <= 1) return;

    const currentIdx = enabled.findIndex(item => item.id === activeTabId);
    if (currentIdx === -1) return;

    let targetIdx = -1;
    const isHorizontal = orientation === 'horizontal';

    switch (e.key) {
      case 'ArrowRight':
        if (isHorizontal) {
          targetIdx = (currentIdx + 1) % enabled.length;
        }
        break;
      case 'ArrowLeft':
        if (isHorizontal) {
          targetIdx = (currentIdx - 1 + enabled.length) % enabled.length;
        }
        break;
      case 'ArrowDown':
        if (!isHorizontal) {
          targetIdx = (currentIdx + 1) % enabled.length;
        }
        break;
      case 'ArrowUp':
        if (!isHorizontal) {
          targetIdx = (currentIdx - 1 + enabled.length) % enabled.length;
        }
        break;
      case 'Home':
        targetIdx = 0;
        break;
      case 'End':
        targetIdx = enabled.length - 1;
        break;
      default:
        return; // Don't interrupt other key actions
    }

    if (targetIdx !== -1) {
      e.preventDefault();
      switchTab(enabled[targetIdx].id, true);
    }
  });

  return root;
}
