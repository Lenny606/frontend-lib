import { createButton } from './index';

const previewContainer = document.getElementById('button-preview');
const labelInput = document.getElementById('btn-label-input') as HTMLInputElement;
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

// Render the button
let currentButton: HTMLButtonElement | null = null;

function renderButton() {
  if (!previewContainer) return;

  // Clear previous button
  if (currentButton && previewContainer.contains(currentButton)) {
    previewContainer.removeChild(currentButton);
  }

  const label = labelInput ? labelInput.value : 'Button';

  // Instantiate component from library
  currentButton = createButton({
    label,
    onClick: (e) => {
      logEvent(`Kliknuto na tlačítko: "${label}"`);
      console.log('Button click event:', e);
    }
  });

  previewContainer.appendChild(currentButton);
}

// Event Listeners
if (labelInput) {
  labelInput.addEventListener('input', () => {
    renderButton();
  });
}

if (clearConsoleBtn && consoleLogs) {
  clearConsoleBtn.addEventListener('click', () => {
    consoleLogs.innerHTML = '';
    logEvent('Log vyčištěn.');
  });
}

// Initial render
renderButton();
logEvent('Tlačítko naimportováno z knihovny.');
