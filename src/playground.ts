import {
  createButton,
  createCheckbox,
  createInput,
  createTextarea,
  createSelect,
  createRadioGroup
} from './index';

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

// Customizer Element Selectors - Input
const inputPreviewContainer = document.getElementById('input-preview');
const inpLabelInput = document.getElementById('inp-label-input') as HTMLInputElement;
const inpTypeSelect = document.getElementById('inp-type-select') as HTMLSelectElement;
const inpPlaceholderInput = document.getElementById('inp-placeholder-input') as HTMLInputElement;
const inpSizeSelect = document.getElementById('inp-size-select') as HTMLSelectElement;
const inpStartIconSelect = document.getElementById('inp-start-icon-select') as HTMLSelectElement;
const inpDisabledCheck = document.getElementById('inp-disabled-check') as HTMLInputElement;
const inpRequiredCheck = document.getElementById('inp-required-check') as HTMLInputElement;
const inpReadonlyCheck = document.getElementById('inp-readonly-check') as HTMLInputElement;
const inpHelperInput = document.getElementById('inp-helper-input') as HTMLInputElement;
const inpErrorInput = document.getElementById('inp-error-input') as HTMLInputElement;
const inpClassInput = document.getElementById('inp-class-input') as HTMLInputElement;

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

// 4b. Render Customizer Input
let currentInput: HTMLElement | null = null;

function renderCustomizerInput() {
  if (!inputPreviewContainer) return;

  // Clear previous element
  if (currentInput && inputPreviewContainer.contains(currentInput)) {
    inputPreviewContainer.removeChild(currentInput);
  }

  const label = inpLabelInput ? inpLabelInput.value : 'Input';
  const type = (inpTypeSelect ? inpTypeSelect.value : 'text') as any;
  const placeholder = inpPlaceholderInput ? inpPlaceholderInput.value : '';
  const size = (inpSizeSelect ? inpSizeSelect.value : 'default') as any;
  const disabled = inpDisabledCheck ? inpDisabledCheck.checked : false;
  const required = inpRequiredCheck ? inpRequiredCheck.checked : false;
  const readonly = inpReadonlyCheck ? inpReadonlyCheck.checked : false;
  const helperText = inpHelperInput ? inpHelperInput.value : '';
  const error = inpErrorInput ? inpErrorInput.value : '';
  const className = inpClassInput ? inpClassInput.value : '';

  const startIcon = inpStartIconSelect && inpStartIconSelect.value !== 'none'
    ? (ICONS as any)[inpStartIconSelect.value]
    : undefined;

  // Instantiate component
  currentInput = createInput({
    label,
    type,
    placeholder,
    size,
    disabled,
    required,
    readonly,
    helperText: helperText || undefined,
    error: error || undefined,
    startIcon,
    className,
    onChange: (value) => {
      logEvent(`Změna hodnoty customizer inputu "${label}" na: "${value}"`);
    }
  });

  inputPreviewContainer.appendChild(currentInput);
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

// Wire up customizer listeners - Input
[inpLabelInput, inpPlaceholderInput, inpHelperInput, inpErrorInput, inpClassInput].forEach(input => {
  if (input) input.addEventListener('input', renderCustomizerInput);
});

[inpTypeSelect, inpSizeSelect, inpStartIconSelect].forEach(select => {
  if (select) select.addEventListener('change', renderCustomizerInput);
});

[inpDisabledCheck, inpRequiredCheck, inpReadonlyCheck].forEach(check => {
  if (check) check.addEventListener('change', renderCustomizerInput);
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
  // Form: Input Presets
  const inputsContainer = document.getElementById('preset-inputs');
  if (inputsContainer) {
    inputsContainer.appendChild(createInput({
      label: 'Hledat',
      type: 'search',
      placeholder: 'Hledat komponenty…',
      startIcon: ICONS.search,
      onChange: (value) => logEvent(`Preset input (search): "${value}"`)
    }));

    inputsContainer.appendChild(createInput({
      label: 'Heslo',
      type: 'password',
      value: '123',
      required: true,
      error: 'Heslo musí mít alespoň 8 znaků.',
      onChange: (value) => logEvent(`Preset input (heslo): délka ${value.length}`)
    }));

    inputsContainer.appendChild(createInput({
      label: 'Deaktivovaný',
      value: 'Hodnotu nelze upravit',
      disabled: true
    }));

    inputsContainer.appendChild(createInput({
      label: 'Malý input (sm)',
      size: 'sm',
      placeholder: 'Kompaktní velikost',
      helperText: 'Velikosti sm / default / lg odpovídají tlačítkům.'
    }));
  }

  // Form: Select & Textarea Presets
  const selectsContainer = document.getElementById('preset-selects');
  if (selectsContainer) {
    selectsContainer.appendChild(createSelect({
      label: 'Země',
      placeholder: 'Vyberte zemi…',
      options: [
        { value: 'cz', label: 'Česká republika' },
        { value: 'sk', label: 'Slovensko' },
        { value: 'pl', label: 'Polsko' },
        { value: 'de', label: 'Německo', disabled: true }
      ],
      helperText: 'Položka „Německo“ je deaktivovaná.',
      onChange: (value) => logEvent(`Preset select (země): "${value}"`)
    }));

    selectsContainer.appendChild(createTextarea({
      label: 'Zpráva',
      placeholder: 'Napište nám, co vás zajímá…',
      rows: 3,
      maxLength: 200,
      helperText: 'Maximálně 200 znaků.',
      onChange: (value) => logEvent(`Preset textarea: ${value.length} znaků`)
    }));
  }

  // Form: Radio Presets
  const radiosContainer = document.getElementById('preset-radios');
  if (radiosContainer) {
    radiosContainer.appendChild(createRadioGroup({
      label: 'Tarif',
      name: 'preset-plan',
      value: 'pro',
      options: [
        { value: 'free', label: 'Free' },
        { value: 'pro', label: 'Pro' },
        { value: 'enterprise', label: 'Enterprise', disabled: true }
      ],
      helperText: 'Vertikální layout, „Enterprise“ deaktivovaný.',
      onChange: (value) => logEvent(`Preset radio (tarif): "${value}"`)
    }));

    radiosContainer.appendChild(createRadioGroup({
      label: 'Preferovaný kontakt',
      name: 'preset-contact',
      direction: 'horizontal',
      value: 'email',
      options: [
        { value: 'email', label: 'E-mail' },
        { value: 'phone', label: 'Telefon' },
        { value: 'sms', label: 'SMS' }
      ],
      onChange: (value) => logEvent(`Preset radio (kontakt): "${value}"`)
    }));
  }

  // Form: Complete form demo combining all components
  const formContainer = document.getElementById('preset-form');
  if (formContainer) {
    const form = document.createElement('form');
    form.className = 'demo-form';
    form.noValidate = true;

    form.appendChild(createInput({
      label: 'Jméno a příjmení',
      name: 'fullName',
      placeholder: 'Jan Novák',
      required: true
    }));

    form.appendChild(createInput({
      label: 'E-mail',
      type: 'email',
      name: 'email',
      placeholder: 'jan@example.com',
      required: true,
      helperText: 'Nikdy nebudeme sdílet váš e-mail.'
    }));

    form.appendChild(createSelect({
      label: 'Země',
      name: 'country',
      placeholder: 'Vyberte zemi…',
      options: [
        { value: 'cz', label: 'Česká republika' },
        { value: 'sk', label: 'Slovensko' },
        { value: 'pl', label: 'Polsko' }
      ]
    }));

    form.appendChild(createRadioGroup({
      label: 'Preferovaný kontakt',
      name: 'contact',
      direction: 'horizontal',
      value: 'email',
      options: [
        { value: 'email', label: 'E-mail' },
        { value: 'phone', label: 'Telefon' }
      ]
    }));

    form.appendChild(createTextarea({
      label: 'Zpráva',
      name: 'message',
      placeholder: 'Vaše zpráva…',
      rows: 3
    }));

    form.appendChild(createCheckbox({
      label: 'Souhlasím s obchodními podmínkami',
      name: 'terms',
      value: 'yes'
    }));

    const submitButton = createButton({
      label: 'Odeslat formulář',
      type: 'submit',
      className: 'demo-form-submit'
    });
    form.appendChild(submitButton);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const entries = Array.from(data.entries())
        .map(([key, value]) => `${key}="${value}"`)
        .join(', ');
      logEvent(`Formulář odeslán: ${entries || '(prázdný)'}`);
    });

    formContainer.appendChild(form);
  }
}

// Initial setup
renderCustomizerButton();
renderCustomizerCheckbox();
renderCustomizerInput();
renderPresets();
logEvent('Playground plně spuštěn.');

// 6. Tabs switching logic
const TAB_NAMES = ['buttons', 'checkboxes', 'forms'];
const TAB_LABELS: Record<string, string> = {
  buttons: 'Button',
  checkboxes: 'Checkbox',
  forms: 'Form Components'
};
const tabTriggers = document.querySelectorAll('.tab-trigger');

tabTriggers.forEach(trigger => {
  trigger.addEventListener('click', () => {
    // Remove active class from all tabs
    tabTriggers.forEach(t => t.classList.remove('active'));
    // Add active class to clicked tab
    trigger.classList.add('active');

    const tab = trigger.getAttribute('data-tab');
    logEvent(`Přepnuto na záložku: ${TAB_LABELS[tab || ''] || tab}`);

    TAB_NAMES.forEach(name => {
      document.querySelectorAll(`.tab-content-${name}`).forEach(el => {
        el.classList.toggle('tab-hidden', name !== tab);
      });
    });
  });
});
