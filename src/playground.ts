import { createButton, createCheckbox } from './index';

// 1. Icon Definitions (SVG Strings)
const ICONS = {
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="fl-btn-icon"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>`,
  arrow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="fl-btn-icon"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="fl-btn-icon"><path d="M20 6 9 17l-5-5"></path></svg>`
};

// 2. Customizer Element Selectors - Button
const previewContainer = document.getElementById('button-preview');
const labelInput = document.getElementById('btn-label-input') as HTMLInputElement;
const variantSelect = document.getElementById('btn-variant-select') as HTMLSelectElement;
const sizeSelect = document.getElementById('btn-size-select') as HTMLSelectElement;
const tagSelect = document.getElementById('btn-tag-select') as HTMLSelectElement;
const hrefGroup = document.getElementById('href-group') as HTMLDivElement;
const hrefInput = document.getElementById('btn-href-input') as HTMLInputElement;
const disabledCheck = document.getElementById('btn-disabled-check') as HTMLInputElement;
const loadingCheck = document.getElementById('btn-loading-check') as HTMLInputElement;
const startIconSelect = document.getElementById('btn-start-icon-select') as HTMLSelectElement;
const endIconSelect = document.getElementById('btn-end-icon-select') as HTMLSelectElement;
const classInput = document.getElementById('btn-class-input') as HTMLInputElement;

// Customizer Element Selectors - Checkbox
const checkboxPreviewContainer = document.getElementById('checkbox-preview');
const chkLabelInput = document.getElementById('chk-label-input') as HTMLInputElement;
const chkCheckedInput = document.getElementById('chk-checked-input') as HTMLInputElement;
const chkDisabledInput = document.getElementById('chk-disabled-input') as HTMLInputElement;
const chkClassInput = document.getElementById('chk-class-input') as HTMLInputElement;

// Log & Console Selectors
const consoleLogs = document.getElementById('console-logs');
const clearConsoleBtn = document.getElementById('clear-console');

// Helper to log actions
function logEvent(message: string) {
  if (!consoleLogs) return;
  const time = new Date().toLocaleTimeString();
  const entry = document.createElement('div');
  entry.className = 'console-log-entry';
  entry.innerHTML = `<span class="time">[${time}]</span>${message}`;
  consoleLogs.appendChild(entry);
  consoleLogs.scrollTop = consoleLogs.scrollHeight;
}

// 3. Render Customizer Button
let currentButton: HTMLElement | null = null;

function renderCustomizerButton() {
  if (!previewContainer) return;

  // Toggle href visibility based on tag
  const isLinkTag = tagSelect && tagSelect.value === 'a';
  if (hrefGroup) {
    hrefGroup.style.display = isLinkTag ? 'flex' : 'none';
  }

  // Clear previous element
  if (currentButton && previewContainer.contains(currentButton)) {
    previewContainer.removeChild(currentButton);
  }

  const label = labelInput ? labelInput.value : 'Button';
  const variant = (variantSelect ? variantSelect.value : 'primary') as any;
  const size = (sizeSelect ? sizeSelect.value : 'default') as any;
  const tag = (tagSelect ? tagSelect.value : 'button') as any;
  const href = hrefInput ? hrefInput.value : '';
  const disabled = disabledCheck ? disabledCheck.checked : false;
  const loading = loadingCheck ? loadingCheck.checked : false;
  const className = classInput ? classInput.value : '';

  // Get icons
  const startIcon = startIconSelect && startIconSelect.value !== 'none' 
    ? (ICONS as any)[startIconSelect.value] 
    : undefined;
    
  const endIcon = endIconSelect && endIconSelect.value !== 'none' 
    ? (ICONS as any)[endIconSelect.value] 
    : undefined;

  // Instantiate component
  currentButton = createButton({
    label,
    variant,
    size,
    tag,
    href,
    disabled,
    loading,
    startIcon,
    endIcon,
    className,
    onClick: (e) => {
      logEvent(`Kliknuto na customizer tlačítko: "${label}" | tag: ${tag} | variant: ${variant}`);
      console.log('Button click event:', e);
    }
  });

  previewContainer.appendChild(currentButton);
}

// 4. Render Customizer Checkbox
let currentCheckbox: HTMLElement | null = null;

function renderCustomizerCheckbox() {
  if (!checkboxPreviewContainer) return;

  // Clear previous element
  if (currentCheckbox && checkboxPreviewContainer.contains(currentCheckbox)) {
    checkboxPreviewContainer.removeChild(currentCheckbox);
  }

  const label = chkLabelInput ? chkLabelInput.value : 'Checkbox';
  const checked = chkCheckedInput ? chkCheckedInput.checked : false;
  const disabled = chkDisabledInput ? chkDisabledInput.checked : false;
  const className = chkClassInput ? chkClassInput.value : '';

  // Instantiate component
  currentCheckbox = createCheckbox({
    label,
    checked,
    disabled,
    className,
    onChange: (isChecked) => {
      logEvent(`Změna stavu checkboxu "${label}" na: ${isChecked}`);
    }
  });

  checkboxPreviewContainer.appendChild(currentCheckbox);
}

// Wire up customizer listeners - Button
[labelInput, hrefInput, classInput].forEach(input => {
  if (input) input.addEventListener('input', renderCustomizerButton);
});

[variantSelect, sizeSelect, tagSelect, startIconSelect, endIconSelect].forEach(select => {
  if (select) select.addEventListener('change', renderCustomizerButton);
});

[disabledCheck, loadingCheck].forEach(check => {
  if (check) check.addEventListener('change', renderCustomizerButton);
});

// Wire up customizer listeners - Checkbox
[chkLabelInput, chkClassInput].forEach(input => {
  if (input) input.addEventListener('input', renderCustomizerCheckbox);
});

[chkCheckedInput, chkDisabledInput].forEach(check => {
  if (check) check.addEventListener('change', renderCustomizerCheckbox);
});

if (clearConsoleBtn && consoleLogs) {
  clearConsoleBtn.addEventListener('click', () => {
    consoleLogs.innerHTML = '';
    logEvent('Log vyčištěn.');
  });
}

// 5. Render Presets Gallery (Static Cases)
function renderPresets() {
  // Sizing Presets
  const sizesContainer = document.getElementById('preset-sizes');
  if (sizesContainer) {
    sizesContainer.appendChild(createButton({
      label: 'Small',
      size: 'sm',
      onClick: () => logEvent('Kliknuto na preset: Velikost SM')
    }));
    sizesContainer.appendChild(createButton({
      label: 'Default',
      size: 'default',
      onClick: () => logEvent('Kliknuto na preset: Velikost Default')
    }));
    sizesContainer.appendChild(createButton({
      label: 'Large',
      size: 'lg',
      onClick: () => logEvent('Kliknuto na preset: Velikost LG')
    }));
    sizesContainer.appendChild(createButton({
      label: 'Search Icon',
      size: 'icon',
      startIcon: ICONS.search,
      onClick: () => logEvent('Kliknuto na preset: Velikost Icon (Search)')
    }));
  }

  // Icon Presets
  const iconsContainer = document.getElementById('preset-icons');
  if (iconsContainer) {
    iconsContainer.appendChild(createButton({
      label: 'Vyhledat',
      startIcon: ICONS.search,
      onClick: () => logEvent('Kliknuto na preset: Start Icon (Search)')
    }));
    iconsContainer.appendChild(createButton({
      label: 'Pokračovat',
      variant: 'secondary',
      endIcon: ICONS.arrow,
      onClick: () => logEvent('Kliknuto na preset: End Icon (Arrow)')
    }));
    iconsContainer.appendChild(createButton({
      label: 'Dokončit',
      variant: 'outline',
      startIcon: ICONS.check,
      onClick: () => logEvent('Kliknuto na preset: Start Icon (Check)')
    }));
  }

  // State & tag Presets
  const statesContainer = document.getElementById('preset-states');
  if (statesContainer) {
    statesContainer.appendChild(createButton({
      label: 'Načítání...',
      loading: true,
      onClick: () => logEvent('Kliknuto na preset: Loading (nemělo by se logovat!)')
    }));
    statesContainer.appendChild(createButton({
      label: 'Zakázáno',
      variant: 'outline',
      disabled: true,
      onClick: () => logEvent('Kliknuto na preset: Disabled (nemělo by se logovat!)')
    }));
    statesContainer.appendChild(createButton({
      label: 'Otevřít Google',
      variant: 'link',
      tag: 'a',
      href: 'https://google.com',
      onClick: (e) => {
        e.preventDefault(); // Prevents actual navigation for testing
        logEvent('Kliknuto na link preset (navigace zrušena přes preventDefault)');
      }
    }));
  }

  // Checkbox Presets
  const checkboxesContainer = document.getElementById('preset-checkboxes');
  if (checkboxesContainer) {
    checkboxesContainer.appendChild(createCheckbox({
      label: 'Výchozí neaktivní',
      onChange: (val) => logEvent(`Změna stavu preset checkboxu (výchozí): ${val}`)
    }));
    
    checkboxesContainer.appendChild(createCheckbox({
      label: 'Předvolený',
      checked: true,
      onChange: (val) => logEvent(`Změna stavu preset checkboxu (předvolený): ${val}`)
    }));

    checkboxesContainer.appendChild(createCheckbox({
      label: 'Deaktivovaný',
      disabled: true,
      onChange: (val) => logEvent(`Změna stavu preset checkboxu (deaktivovaný): ${val}`)
    }));

    checkboxesContainer.appendChild(createCheckbox({
      label: 'Deaktivovaný & vybraný',
      disabled: true,
      checked: true,
      onChange: (val) => logEvent(`Změna stavu preset checkboxu (deaktivovaný & vybraný): ${val}`)
    }));
  }
}

// Initial setup
renderCustomizerButton();
renderCustomizerCheckbox();
renderPresets();
logEvent('Playground plně spuštěn.');

// 6. Tabs switching logic
const tabTriggers = document.querySelectorAll('.tab-trigger');
const buttonContents = document.querySelectorAll('.tab-content-buttons');
const checkboxContents = document.querySelectorAll('.tab-content-checkboxes');

tabTriggers.forEach(trigger => {
  trigger.addEventListener('click', () => {
    // Remove active class from all tabs
    tabTriggers.forEach(t => t.classList.remove('active'));
    // Add active class to clicked tab
    trigger.classList.add('active');
    
    const tab = trigger.getAttribute('data-tab');
    logEvent(`Přepnuto na záložku: ${tab === 'buttons' ? 'Button' : 'Checkbox'}`);
    
    if (tab === 'buttons') {
      buttonContents.forEach(el => el.classList.remove('tab-hidden'));
      checkboxContents.forEach(el => el.classList.add('tab-hidden'));
    } else {
      buttonContents.forEach(el => el.classList.add('tab-hidden'));
      checkboxContents.forEach(el => el.classList.remove('tab-hidden'));
    }
  });
});
