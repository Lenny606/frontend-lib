import {
  createButton,
  createCheckbox,
  createInput,
  createTextarea,
  createSelect,
  createRadioGroup,
  createCard,
  createLink,
  createToggle,
  createBadge,
  createTooltip,
  showToast,
  createModal,
  createAvatar
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

// Customizer Element Selectors - Card
const cardPreviewContainer = document.getElementById('card-preview');
const cardTitleInput = document.getElementById('card-title-input') as HTMLInputElement;
const cardSubtitleInput = document.getElementById('card-subtitle-input') as HTMLInputElement;
const cardContentInput = document.getElementById('card-content-input') as HTMLInputElement;
const cardVariantSelect = document.getElementById('card-variant-select') as HTMLSelectElement;
const cardImageCheck = document.getElementById('card-image-check') as HTMLInputElement;
const cardHoverableCheck = document.getElementById('card-hoverable-check') as HTMLInputElement;
const cardClickableCheck = document.getElementById('card-clickable-check') as HTMLInputElement;
const cardFooterCheck = document.getElementById('card-footer-check') as HTMLInputElement;
const cardClassInput = document.getElementById('card-class-input') as HTMLInputElement;

// Demo image for cards (inline SVG gradient, works offline)
const DEMO_IMAGE = `data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="160">' +
  '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
  '<stop offset="0" stop-color="#6366f1"/><stop offset="1" stop-color="#a855f7"/>' +
  '</linearGradient></defs><rect width="400" height="160" fill="url(#g)"/></svg>'
)}`;

// Customizer Element Selectors - Link
const linkPreviewContainer = document.getElementById('link-preview');
const lnkLabelInput = document.getElementById('lnk-label-input') as HTMLInputElement;
const lnkHrefInput = document.getElementById('lnk-href-input') as HTMLInputElement;
const lnkVariantSelect = document.getElementById('lnk-variant-select') as HTMLSelectElement;
const lnkUnderlineSelect = document.getElementById('lnk-underline-select') as HTMLSelectElement;
const lnkExternalCheck = document.getElementById('lnk-external-check') as HTMLInputElement;
const lnkDisabledCheck = document.getElementById('lnk-disabled-check') as HTMLInputElement;
const lnkStartIconSelect = document.getElementById('lnk-start-icon-select') as HTMLSelectElement;
const lnkClassInput = document.getElementById('lnk-class-input') as HTMLInputElement;

// Customizer Element Selectors - Toggle
const togglePreviewContainer = document.getElementById('toggle-preview');
const tglLabelInput = document.getElementById('tgl-label-input') as HTMLInputElement;
const tglSizeSelect = document.getElementById('tgl-size-select') as HTMLSelectElement;
const tglCheckedCheck = document.getElementById('tgl-checked-check') as HTMLInputElement;
const tglDisabledCheck = document.getElementById('tgl-disabled-check') as HTMLInputElement;
const tglClassInput = document.getElementById('tgl-class-input') as HTMLInputElement;

// Customizer Element Selectors - Toast
const toastPreviewContainer = document.getElementById('toast-preview');
const tstTitleInput = document.getElementById('tst-title-input') as HTMLInputElement;
const tstMessageInput = document.getElementById('tst-message-input') as HTMLInputElement;
const tstVariantSelect = document.getElementById('tst-variant-select') as HTMLSelectElement;
const tstPositionSelect = document.getElementById('tst-position-select') as HTMLSelectElement;
const tstDurationInput = document.getElementById('tst-duration-input') as HTMLInputElement;
const tstClosableCheck = document.getElementById('tst-closable-check') as HTMLInputElement;

// Customizer Element Selectors - Modal
const modalPreviewContainer = document.getElementById('modal-preview');
const mdlTitleInput = document.getElementById('mdl-title-input') as HTMLInputElement;
const mdlSizeSelect = document.getElementById('mdl-size-select') as HTMLSelectElement;
const mdlContentInput = document.getElementById('mdl-content-input') as HTMLInputElement;
const mdlClosableCheck = document.getElementById('mdl-closable-check') as HTMLInputElement;
const mdlBackdropCheck = document.getElementById('mdl-backdrop-check') as HTMLInputElement;
const mdlFooterCheck = document.getElementById('mdl-footer-check') as HTMLInputElement;

// Customizer Element Selectors - Avatar
const avatarPreviewContainer = document.getElementById('avatar-preview');
const avSrcInput = document.getElementById('av-src-input') as HTMLInputElement;
const avFallbackInput = document.getElementById('av-fallback-input') as HTMLInputElement;
const avSizeSelect = document.getElementById('av-size-select') as HTMLSelectElement;
const avShapeSelect = document.getElementById('av-shape-select') as HTMLSelectElement;
const avStatusSelect = document.getElementById('av-status-select') as HTMLSelectElement;
const avAltInput = document.getElementById('av-alt-input') as HTMLInputElement;
const avClassInput = document.getElementById('av-class-input') as HTMLInputElement;

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

// 4c. Render Customizer Card
let currentCard: HTMLElement | null = null;

function renderCustomizerCard() {
  if (!cardPreviewContainer) return;

  // Clear previous element
  if (currentCard && cardPreviewContainer.contains(currentCard)) {
    cardPreviewContainer.removeChild(currentCard);
  }

  const title = cardTitleInput ? cardTitleInput.value : 'Karta';
  const subtitle = cardSubtitleInput ? cardSubtitleInput.value : '';
  const content = cardContentInput ? cardContentInput.value : '';
  const variant = (cardVariantSelect ? cardVariantSelect.value : 'default') as any;
  const withImage = cardImageCheck ? cardImageCheck.checked : false;
  const hoverable = cardHoverableCheck ? cardHoverableCheck.checked : false;
  const clickable = cardClickableCheck ? cardClickableCheck.checked : false;
  const withFooter = cardFooterCheck ? cardFooterCheck.checked : false;
  const className = cardClassInput ? cardClassInput.value : '';

  const footer = withFooter
    ? [
        createButton({
          label: 'Zrušit',
          variant: 'ghost',
          size: 'sm',
          onClick: (e) => {
            e.stopPropagation();
            logEvent('Kliknuto na footer tlačítko karty: Zrušit');
          }
        }),
        createButton({
          label: 'Pokračovat',
          size: 'sm',
          endIcon: ICONS.arrow,
          onClick: (e) => {
            e.stopPropagation();
            logEvent('Kliknuto na footer tlačítko karty: Pokračovat');
          }
        })
      ]
    : undefined;

  // Instantiate component
  currentCard = createCard({
    title: title || undefined,
    subtitle: subtitle || undefined,
    content: content || undefined,
    variant,
    image: withImage ? DEMO_IMAGE : undefined,
    imageAlt: withImage ? 'Ukázkový gradient' : undefined,
    hoverable,
    footer,
    className,
    onClick: clickable
      ? () => logEvent(`Kliknuto na customizer kartu: "${title}" | variant: ${variant}`)
      : undefined
  });

  cardPreviewContainer.appendChild(currentCard);
}

// 4d. Render Customizer Link
let currentLink: HTMLElement | null = null;

function renderCustomizerLink() {
  if (!linkPreviewContainer) return;

  // Clear previous element
  if (currentLink && linkPreviewContainer.contains(currentLink)) {
    linkPreviewContainer.removeChild(currentLink);
  }

  const label = lnkLabelInput ? lnkLabelInput.value : 'Odkaz';
  const href = lnkHrefInput ? lnkHrefInput.value : '#';
  const variant = (lnkVariantSelect ? lnkVariantSelect.value : 'default') as any;
  const underline = (lnkUnderlineSelect ? lnkUnderlineSelect.value : 'hover') as any;
  const external = lnkExternalCheck ? lnkExternalCheck.checked : false;
  const disabled = lnkDisabledCheck ? lnkDisabledCheck.checked : false;
  const className = lnkClassInput ? lnkClassInput.value : '';

  const startIcon = lnkStartIconSelect && lnkStartIconSelect.value !== 'none'
    ? (ICONS as any)[lnkStartIconSelect.value]
    : undefined;

  // Instantiate component
  currentLink = createLink({
    label,
    href,
    variant,
    underline,
    external,
    disabled,
    startIcon,
    className,
    onClick: (e) => {
      // External links may navigate (new tab); internal ones are blocked for testing
      if (!external) e.preventDefault();
      logEvent(`Kliknuto na customizer odkaz: "${label}" | variant: ${variant} | external: ${external}`);
    }
  });

  linkPreviewContainer.appendChild(currentLink);
}

// 4e. Render Customizer Toggle
let currentToggle: HTMLElement | null = null;

function renderCustomizerToggle() {
  if (!togglePreviewContainer) return;

  // Clear previous element
  if (currentToggle && togglePreviewContainer.contains(currentToggle)) {
    togglePreviewContainer.removeChild(currentToggle);
  }

  const label = tglLabelInput ? tglLabelInput.value : 'Toggle';
  const size = (tglSizeSelect ? tglSizeSelect.value : 'default') as any;
  const checked = tglCheckedCheck ? tglCheckedCheck.checked : false;
  const disabled = tglDisabledCheck ? tglDisabledCheck.checked : false;
  const className = tglClassInput ? tglClassInput.value : '';

  // Instantiate component
  currentToggle = createToggle({
    label,
    size,
    checked,
    disabled,
    className,
    onChange: (isChecked) => {
      logEvent(`Změna stavu customizer toggle "${label}" na: ${isChecked}`);
    }
  });

  togglePreviewContainer.appendChild(currentToggle);
}

// 4f. Toast Customizer (trigger button fires a live toast)
function setupToastCustomizer() {
  if (!toastPreviewContainer) return;

  toastPreviewContainer.appendChild(createButton({
    label: 'Zobrazit Toast',
    endIcon: ICONS.arrow,
    onClick: () => {
      const title = tstTitleInput ? tstTitleInput.value : '';
      const message = tstMessageInput ? tstMessageInput.value : 'Toast zpráva';
      const variant = (tstVariantSelect ? tstVariantSelect.value : 'info') as any;
      const position = (tstPositionSelect ? tstPositionSelect.value : 'top-right') as any;
      const duration = tstDurationInput ? Number(tstDurationInput.value) : 4000;
      const closable = tstClosableCheck ? tstClosableCheck.checked : true;

      showToast({
        title: title || undefined,
        message,
        variant,
        position,
        duration,
        closable,
        onClose: () => logEvent(`Toast "${title || message}" zavřen.`)
      });
      logEvent(`Zobrazen toast: variant ${variant} | pozice ${position} | duration ${duration}ms`);
    }
  }));
}

// 4g. Modal Customizer (trigger button opens a live modal)
function setupModalCustomizer() {
  if (!modalPreviewContainer) return;

  modalPreviewContainer.appendChild(createButton({
    label: 'Otevřít Modal',
    endIcon: ICONS.arrow,
    onClick: () => {
      const title = mdlTitleInput ? mdlTitleInput.value : 'Modal';
      const size = (mdlSizeSelect ? mdlSizeSelect.value : 'default') as any;
      const content = mdlContentInput ? mdlContentInput.value : '';
      const closable = mdlClosableCheck ? mdlClosableCheck.checked : true;
      const closeOnBackdrop = mdlBackdropCheck ? mdlBackdropCheck.checked : true;
      const withFooter = mdlFooterCheck ? mdlFooterCheck.checked : true;

      // Fresh modal per open; destroyed after close so options stay live
      const modal = createModal({
        title: title || undefined,
        content: content || undefined,
        size,
        closable,
        closeOnBackdrop,
        footer: withFooter
          ? [
              createButton({
                label: 'Zrušit',
                variant: 'ghost',
                onClick: () => {
                  logEvent('Kliknuto na modal tlačítko: Zrušit');
                  modal.close();
                }
              }),
              createButton({
                label: 'Potvrdit',
                startIcon: ICONS.check,
                onClick: () => {
                  logEvent('Kliknuto na modal tlačítko: Potvrdit');
                  modal.close();
                }
              })
            ]
          : undefined,
        onClose: () => {
          logEvent(`Modal "${title}" zavřen.`);
          // Wait for the exit transition before removing from the DOM
          setTimeout(() => modal.destroy(), 400);
        }
      });

      modal.open();
      logEvent(`Otevřen modal: "${title}" | size: ${size} | backdrop dismiss: ${closeOnBackdrop}`);
    }
  }));
}

// 4h. Avatar Customizer
function renderCustomizerAvatar() {
  if (!avatarPreviewContainer) return;
  avatarPreviewContainer.innerHTML = '';

  const src = avSrcInput ? avSrcInput.value.trim() : '';
  const fallback = avFallbackInput ? avFallbackInput.value.trim() : '';
  const size = (avSizeSelect ? avSizeSelect.value : 'md') as any;
  const shape = (avShapeSelect ? avShapeSelect.value : 'circle') as any;
  const statusVal = avStatusSelect ? avStatusSelect.value : 'none';
  const status = statusVal === 'none' ? undefined : (statusVal as any);
  const alt = avAltInput ? avAltInput.value.trim() : '';
  const className = avClassInput ? avClassInput.value.trim() : '';

  const avatar = createAvatar({
    src: src || undefined,
    fallback: fallback || undefined,
    size,
    shape,
    status,
    alt: alt || undefined,
    className: className || undefined
  });

  avatarPreviewContainer.appendChild(avatar);
}

function setupAvatarCustomizer() {
  if (!avatarPreviewContainer) return;

  // Initial render
  renderCustomizerAvatar();

  // Wire up listeners
  [avSrcInput, avFallbackInput, avAltInput, avClassInput].forEach(input => {
    if (input) input.addEventListener('input', () => {
      renderCustomizerAvatar();
    });
  });

  [avSizeSelect, avShapeSelect, avStatusSelect].forEach(select => {
    if (select) select.addEventListener('change', () => {
      renderCustomizerAvatar();
      logEvent(`Avatar customizer: Změna výběru -> ${select.id}: ${select.value}`);
    });
  });
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

// Wire up customizer listeners - Card
[cardTitleInput, cardSubtitleInput, cardContentInput, cardClassInput].forEach(input => {
  if (input) input.addEventListener('input', renderCustomizerCard);
});

if (cardVariantSelect) cardVariantSelect.addEventListener('change', renderCustomizerCard);

[cardImageCheck, cardHoverableCheck, cardClickableCheck, cardFooterCheck].forEach(check => {
  if (check) check.addEventListener('change', renderCustomizerCard);
});

// Wire up customizer listeners - Link
[lnkLabelInput, lnkHrefInput, lnkClassInput].forEach(input => {
  if (input) input.addEventListener('input', renderCustomizerLink);
});

[lnkVariantSelect, lnkUnderlineSelect, lnkStartIconSelect].forEach(select => {
  if (select) select.addEventListener('change', renderCustomizerLink);
});

[lnkExternalCheck, lnkDisabledCheck].forEach(check => {
  if (check) check.addEventListener('change', renderCustomizerLink);
});

// Wire up customizer listeners - Toggle
[tglLabelInput, tglClassInput].forEach(input => {
  if (input) input.addEventListener('input', renderCustomizerToggle);
});

if (tglSizeSelect) tglSizeSelect.addEventListener('change', renderCustomizerToggle);

[tglCheckedCheck, tglDisabledCheck].forEach(check => {
  if (check) check.addEventListener('change', renderCustomizerToggle);
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

  // Card: Variant Presets
  const cardVariantsContainer = document.getElementById('preset-card-variants');
  if (cardVariantsContainer) {
    cardVariantsContainer.appendChild(createCard({
      title: 'Default Glass',
      subtitle: 'Výchozí skleněný vzhled',
      content: 'Standardní karta s glassmorphism pozadím a jemným stínem.'
    }));

    cardVariantsContainer.appendChild(createCard({
      title: 'Primary Glass',
      subtitle: 'Fialový nádech',
      variant: 'primary',
      content: 'Zvýrazněná karta ladící s primary tlačítky.'
    }));

    cardVariantsContainer.appendChild(createCard({
      title: 'Outline',
      subtitle: 'Pouze ohraničení',
      variant: 'outline',
      content: 'Transparentní karta s indigo rámečkem.'
    }));
  }

  // Card: Composition Presets
  const cardCompositionContainer = document.getElementById('preset-card-composition');
  if (cardCompositionContainer) {
    cardCompositionContainer.appendChild(createCard({
      title: 'Karta s obrázkem',
      subtitle: 'Image + footer akce',
      image: DEMO_IMAGE,
      imageAlt: 'Ukázkový gradient',
      content: 'Obrázek nahoře, obsah uprostřed a akční tlačítka v patičce.',
      footer: [
        createButton({
          label: 'Detail',
          variant: 'outline',
          size: 'sm',
          onClick: () => logEvent('Kliknuto na footer preset karty: Detail')
        }),
        createButton({
          label: 'Koupit',
          size: 'sm',
          onClick: () => logEvent('Kliknuto na footer preset karty: Koupit')
        })
      ]
    }));

    cardCompositionContainer.appendChild(createCard({
      title: 'Klikací karta',
      subtitle: 'Celá karta je interaktivní',
      content: 'Má role="button", reaguje na Enter i mezerník a po najetí se zvedne.',
      onClick: () => logEvent('Kliknuto na preset: Klikací karta')
    }));

    // Card composed with form components inside
    const newsletterInput = createInput({
      label: 'Váš e-mail',
      type: 'email',
      placeholder: 'jan@example.com',
      size: 'sm'
    });
    cardCompositionContainer.appendChild(createCard({
      title: 'Newsletter',
      subtitle: 'Karta složená z dalších komponent',
      content: [newsletterInput],
      footer: createButton({
        label: 'Odebírat',
        size: 'sm',
        endIcon: ICONS.arrow,
        onClick: () => logEvent('Kliknuto na preset kartu: Odebírat newsletter')
      })
    }));
  }

  // Link: Variant Presets
  const linkVariantsContainer = document.getElementById('preset-link-variants');
  if (linkVariantsContainer) {
    linkVariantsContainer.appendChild(createLink({
      label: 'Default odkaz',
      href: '#',
      onClick: (e) => {
        e.preventDefault();
        logEvent('Kliknuto na preset odkaz: Default');
      }
    }));

    linkVariantsContainer.appendChild(createLink({
      label: 'Muted odkaz',
      href: '#',
      variant: 'muted',
      onClick: (e) => {
        e.preventDefault();
        logEvent('Kliknuto na preset odkaz: Muted');
      }
    }));

    linkVariantsContainer.appendChild(createLink({
      label: 'Standalone CTA',
      href: '#',
      variant: 'standalone',
      underline: 'none',
      startIcon: ICONS.arrow,
      onClick: (e) => {
        e.preventDefault();
        logEvent('Kliknuto na preset odkaz: Standalone');
      }
    }));
  }

  // Link: State & Icon Presets
  const linkStatesContainer = document.getElementById('preset-link-states');
  if (linkStatesContainer) {
    linkStatesContainer.appendChild(createLink({
      label: 'Externí odkaz (Google)',
      href: 'https://google.com',
      external: true,
      onClick: () => logEvent('Kliknuto na preset odkaz: External (otevírá nový panel)')
    }));

    linkStatesContainer.appendChild(createLink({
      label: 'Vždy podtržený',
      href: '#',
      underline: 'always',
      onClick: (e) => {
        e.preventDefault();
        logEvent('Kliknuto na preset odkaz: Underline always');
      }
    }));

    linkStatesContainer.appendChild(createLink({
      label: 'Deaktivovaný odkaz',
      href: 'https://google.com',
      disabled: true,
      onClick: () => logEvent('Kliknuto na preset odkaz: Disabled (nemělo by se logovat!)')
    }));
  }

  // Link: Inline usage inside text
  const linkInlineContainer = document.getElementById('preset-link-inline');
  if (linkInlineContainer) {
    const paragraph = document.createElement('p');
    paragraph.style.margin = '0';
    paragraph.style.fontSize = '0.9rem';
    paragraph.style.lineHeight = '1.7';
    paragraph.append('Odesláním formuláře souhlasíte s ');
    paragraph.appendChild(createLink({
      label: 'obchodními podmínkami',
      href: '#',
      underline: 'always',
      onClick: (e) => {
        e.preventDefault();
        logEvent('Kliknuto na inline odkaz: Obchodní podmínky');
      }
    }));
    paragraph.append(' a berete na vědomí ');
    paragraph.appendChild(createLink({
      label: 'zásady ochrany osobních údajů',
      href: '#',
      variant: 'muted',
      underline: 'always',
      onClick: (e) => {
        e.preventDefault();
        logEvent('Kliknuto na inline odkaz: Zásady ochrany osobních údajů');
      }
    }));
    paragraph.append('.');
    linkInlineContainer.appendChild(paragraph);
  }

  // Toggle Presets
  const togglesContainer = document.getElementById('preset-toggles');
  if (togglesContainer) {
    togglesContainer.appendChild(createToggle({
      label: 'Výchozí vypnutý',
      onChange: (val) => logEvent(`Změna stavu preset toggle (výchozí): ${val}`)
    }));

    togglesContainer.appendChild(createToggle({
      label: 'Předvolený',
      checked: true,
      onChange: (val) => logEvent(`Změna stavu preset toggle (předvolený): ${val}`)
    }));

    togglesContainer.appendChild(createToggle({
      label: 'Malý (sm)',
      size: 'sm',
      onChange: (val) => logEvent(`Změna stavu preset toggle (sm): ${val}`)
    }));

    togglesContainer.appendChild(createToggle({
      label: 'Deaktivovaný',
      disabled: true,
      checked: true,
      onChange: (val) => logEvent(`Změna stavu preset toggle (deaktivovaný): ${val}`)
    }));
  }

  // Badge Presets
  const badgesContainer = document.getElementById('preset-badges');
  if (badgesContainer) {
    badgesContainer.appendChild(createBadge({ label: 'Default' }));
    badgesContainer.appendChild(createBadge({ label: 'Primary', variant: 'primary' }));
    badgesContainer.appendChild(createBadge({ label: 'Online', variant: 'success', dot: true }));
    badgesContainer.appendChild(createBadge({ label: 'Beta', variant: 'warning' }));
    badgesContainer.appendChild(createBadge({ label: 'Deprecated', variant: 'error' }));
    badgesContainer.appendChild(createBadge({ label: 'Outline', variant: 'outline' }));
    badgesContainer.appendChild(createBadge({ label: 'Ověřeno', variant: 'success', size: 'sm', icon: ICONS.check }));
  }

  // Tooltip Presets (each wraps a button)
  const tooltipsContainer = document.getElementById('preset-tooltips');
  if (tooltipsContainer) {
    const positions: Array<'top' | 'bottom' | 'left' | 'right'> = ['top', 'bottom', 'left', 'right'];
    positions.forEach(position => {
      tooltipsContainer.appendChild(createTooltip({
        target: createButton({
          label: position,
          variant: 'secondary',
          size: 'sm',
          onClick: () => logEvent(`Kliknuto na tlačítko s tooltipem (${position})`)
        }),
        content: `Tooltip umístěný ${position}. Funguje i přes klávesnici (Tab).`,
        position
      }));
    });
  }

  // Toast Presets (trigger buttons)
  const toastsContainer = document.getElementById('preset-toasts');
  if (toastsContainer) {
    const toastPresets: Array<{ variant: 'info' | 'success' | 'warning' | 'error'; title: string; message: string }> = [
      { variant: 'info', title: 'Informace', message: 'K dispozici je nová verze knihovny.' },
      { variant: 'success', title: 'Hotovo', message: 'Komponenta byla úspěšně vytvořena.' },
      { variant: 'warning', title: 'Pozor', message: 'Blížíte se limitu úložiště.' },
      { variant: 'error', title: 'Chyba', message: 'Spojení se serverem se nezdařilo.' }
    ];

    toastPresets.forEach(preset => {
      toastsContainer.appendChild(createButton({
        label: preset.variant,
        variant: 'outline',
        size: 'sm',
        onClick: () => {
          showToast(preset);
          logEvent(`Zobrazen preset toast: ${preset.variant}`);
        }
      }));
    });
  }

  // Modal Presets
  const modalsContainer = document.getElementById('preset-modals');
  if (modalsContainer) {
    // 1. Confirmation dialog
    const confirmModal = createModal({
      title: 'Smazat položku?',
      size: 'sm',
      content: 'Položka bude trvale odstraněna. Tuto akci nelze vzít zpět.',
      footer: [
        createButton({
          label: 'Zrušit',
          variant: 'ghost',
          onClick: () => confirmModal.close()
        }),
        createButton({
          label: 'Smazat',
          onClick: () => {
            confirmModal.close();
            showToast({ variant: 'success', title: 'Smazáno', message: 'Položka byla odstraněna.' });
            logEvent('Preset modal (confirm): potvrzeno smazání');
          }
        })
      ],
      onClose: () => logEvent('Preset modal (confirm) zavřen.')
    });

    modalsContainer.appendChild(createButton({
      label: 'Confirm Dialog',
      variant: 'outline',
      size: 'sm',
      onClick: () => confirmModal.open()
    }));

    // 2. Modal composed of form components
    const formModal = createModal({
      title: 'Pozvat člena týmu',
      content: [
        createInput({
          label: 'E-mail',
          type: 'email',
          placeholder: 'kolega@example.com',
          required: true
        }),
        createSelect({
          label: 'Role',
          placeholder: 'Vyberte roli…',
          options: [
            { value: 'viewer', label: 'Čtenář' },
            { value: 'editor', label: 'Editor' },
            { value: 'admin', label: 'Administrátor' }
          ]
        })
      ],
      footer: createButton({
        label: 'Odeslat pozvánku',
        endIcon: ICONS.arrow,
        onClick: () => {
          formModal.close();
          showToast({ variant: 'info', title: 'Pozvánka', message: 'Pozvánka byla odeslána.' });
          logEvent('Preset modal (form): pozvánka odeslána');
        }
      }),
      onClose: () => logEvent('Preset modal (form) zavřen.')
    });

    modalsContainer.appendChild(createButton({
      label: 'Form Modal',
      variant: 'outline',
      size: 'sm',
      onClick: () => formModal.open()
    }));

    // 3. Strict modal: no backdrop dismiss, must use the buttons
    const strictModal = createModal({
      title: 'Souhlas s podmínkami',
      closable: false,
      closeOnBackdrop: false,
      content: 'Toto okno nelze zavřít kliknutím mimo něj — vyžaduje explicitní volbu.',
      footer: [
        createButton({
          label: 'Nesouhlasím',
          variant: 'ghost',
          onClick: () => {
            strictModal.close();
            logEvent('Preset modal (strict): nesouhlas');
          }
        }),
        createButton({
          label: 'Souhlasím',
          startIcon: ICONS.check,
          onClick: () => {
            strictModal.close();
            logEvent('Preset modal (strict): souhlas');
          }
        })
      ],
      onClose: () => logEvent('Preset modal (strict) zavřen.')
    });

    modalsContainer.appendChild(createButton({
      label: 'Strict Modal',
      variant: 'outline',
      size: 'sm',
      onClick: () => strictModal.open()
    }));
  }

  // Avatar Presets
  const avSizesContainer = document.getElementById('preset-avatar-sizes');
  if (avSizesContainer) {
    const unsplashPics = [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    ];

    const sizes: Array<'xs' | 'sm' | 'md' | 'lg' | 'xl'> = ['xs', 'sm', 'md', 'lg', 'xl'];
    sizes.forEach((size, idx) => {
      avSizesContainer.appendChild(createAvatar({
        size,
        src: unsplashPics[idx],
        alt: `Uživatel velikost ${size}`,
        shape: 'circle'
      }));
    });
  }

  const avStatusesContainer = document.getElementById('preset-avatar-statuses');
  if (avStatusesContainer) {
    const presencePics = [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
    ];

    const presenceStatuses: Array<'online' | 'offline' | 'idle' | 'dnd'> = ['online', 'offline', 'idle', 'dnd'];
    
    // Circle variants
    presenceStatuses.forEach((status, idx) => {
      avStatusesContainer.appendChild(createAvatar({
        size: 'lg',
        src: presencePics[idx],
        shape: 'circle',
        status
      }));
    });

    // Square variants
    presenceStatuses.forEach((status, idx) => {
      avStatusesContainer.appendChild(createAvatar({
        size: 'lg',
        src: presencePics[(idx + 2) % presencePics.length],
        shape: 'square',
        status
      }));
    });
  }

  const avFallbacksContainer = document.getElementById('preset-avatar-fallbacks');
  if (avFallbacksContainer) {
    // 1. Circle with initials
    avFallbacksContainer.appendChild(createAvatar({
      size: 'lg',
      fallback: 'JD',
      shape: 'circle'
    }));

    // 2. Square with initials
    avFallbacksContainer.appendChild(createAvatar({
      size: 'lg',
      fallback: 'AB',
      shape: 'square'
    }));

    // 3. Fallback recovery (bad URL)
    avFallbacksContainer.appendChild(createAvatar({
      size: 'lg',
      src: 'https://invalid-url.example/broken.jpg',
      fallback: 'ER',
      shape: 'circle'
    }));

    // 4. Default SVG placeholder circle
    avFallbacksContainer.appendChild(createAvatar({
      size: 'lg',
      shape: 'circle'
    }));

    // 5. Default SVG placeholder square
    avFallbacksContainer.appendChild(createAvatar({
      size: 'lg',
      shape: 'square'
    }));
  }
}

// Initial setup
renderCustomizerButton();
renderCustomizerCheckbox();
renderCustomizerInput();
renderCustomizerCard();
renderCustomizerLink();
renderCustomizerToggle();
setupToastCustomizer();
setupModalCustomizer();
setupAvatarCustomizer();
renderPresets();
logEvent('Playground plně spuštěn.');

// 6. Tabs switching logic
const TAB_NAMES = ['buttons', 'checkboxes', 'forms', 'cards', 'links', 'elements', 'modals', 'avatars'];
const TAB_LABELS: Record<string, string> = {
  buttons: 'Button',
  checkboxes: 'Checkbox',
  forms: 'Form Components',
  cards: 'Card',
  links: 'Link',
  elements: 'UI Elements',
  modals: 'Modal',
  avatars: 'Avatar'
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
