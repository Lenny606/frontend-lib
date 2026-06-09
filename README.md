# Frontend Component Library Skeleton

Tento projekt slouží jako moderní a lehká základní kostra pro tvorbu a publikaci vlastní knihovny frontendových komponent v TypeScriptu na **NPM Registry**.

K sestavení a balení se používá **Vite** v knihovním režimu (library mode) společně s **TypeScriptem** a pluginem `vite-plugin-dts` pro automatické generování typových deklarací (`.d.ts`). Výstupem sestavení jsou dva formáty (ES Modules a CommonJS) a sdružený soubor stylů.

---

## 🚀 Rychlý start pro vývoj

### 1. Instalace závislostí
```bash
npm install
```

### 2. Sestavení knihovny (Build)
Sestaví knihovnu do složky `dist/`. Vygeneruje typy (`.d.ts`), ESM bundle (`.js`), CommonJS bundle (`.cjs`) a CSS styly (`style.css`).
```bash
npm run build
```

---

## 📦 Publikace na NPM Registry

Pro úspěšné publikování vaší knihovny na NPM postupujte podle následujících kroků:

### 1. Příprava účtu na NPM
Pokud ještě nemáte účet, zaregistrujte se na [npmjs.com](https://www.npmjs.com/).
> [!IMPORTANT]
> Pro publikování doporučujeme v nastavení účtu aktivovat **dvoufaktorové ověření (2FA)**. NPM jej dnes u většiny operací vyžaduje.

### 2. Nastavení jména a verze v `package.json`
Otevřete `package.json` a zkontrolujte či upravte tato pole:
- **`name`**: Název `"frontend-lib"` je velmi pravděpodobně na NPM obsazený. Změňte jej na unikátní (např. `"moje-super-knihovna"`) nebo použijte scoped název se svým uživatelským jménem: `"@moje-uzivatelske-jmeno/frontend-lib"`.
- **`version`**: Nastavte výchozí verzi, např. `"0.1.0"`.

> [!NOTE]
> Pole `"files": ["dist"]` v `package.json` zaručuje, že se nahraje pouze sestavený kód ze složky `dist` (žádné zdrojové soubory, konfigurace ani testy).

### 3. Přihlášení do NPM
V terminálu (ve vašem WSL prostředí) spusťte:
```bash
npm login
```
Pokud vám příkaz ve WSL selže s chybou `Set the BROWSER environment variable`, máte dvě možnosti:

1. **Použít textové přihlášení (Legacy):**
   Tento příkaz vás vyzve k zadání uživatelského jména, hesla a 2FA kódu přímo v terminálu bez otevírání prohlížeče:
   ```bash
   npm login --auth-type=legacy
   ```
2. **Přihlášení bez automatického otevírání prohlížeče:**
   Příkaz vygeneruje odkaz, který ručně zkopírujete do prohlížeče ve Windows, přihlásíte se a terminál na dokončení počká:
   ```bash
   npm login --no-browser
   ```

### 4. Lokální otestování sestavení a balíčku
Před odesláním na NPM ověřte, že build proběhne v pořádku:
```bash
npm run build
```
Pokud si chcete balíček vyzkoušet lokálně v jiném projektu bez nahrávání na internet, vytvořte instalační `.tgz` archiv:
```bash
npm pack
```
Tento archiv pak můžete nainstalovat v jiném projektu pomocí `npm install /cesta/k/balicku.tgz`.

### 5. Publikování na NPM
Jakmile je vše připraveno, odešlete balíček.

> [!IMPORTANT]
> Váš balíček `@thomas666/frontend-lib` je **scoped** (začíná na `@`). Pro bezplatné publikování musíte **vždy** přidat příznak `--access public`. V opačném případě NPM nahlásí chybu 403 Forbidden (pokud nemáte placený tarif).

- **Příkaz pro scoped balíček:**
  ```bash
  npm publish --access public
  ```
- **Pokud máte na NPM účtu aktivní dvoufaktorové ověření (2FA):**
  CLI by vás mělo vyzvat k zadání 2FA kódu. Pokud se tak nestane a příkaz selže s chybou `Two-factor authentication... is required`, předejte kód z mobilu přímo v příkazu pomocí `--otp`:
  ```bash
  npm publish --access public --otp=123456
  ```
  *(kde `123456` nahradíte aktuálním 6místným kódem z vaší autentizační aplikace)*

> [!TIP]
> Skript `"prepublishOnly": "npm run build"` v `package.json` zajistí, že se před každou publikací automaticky spustí nový build a vygenerují se čerstvé soubory.

### 6. Aktualizace a správa verzí (SemVer)
Při každém dalším vydání musíte navýšit verzi v `package.json`. K tomu slouží tyto příkazy:
- **Patch (opravy chyb):** `npm version patch` (např. `0.1.0` -> `0.1.1`)
- **Minor (nové funkce bez breaking changes):** `npm version minor` (např. `0.1.0` -> `0.2.0`)
- **Major (breaking changes):** `npm version major` (např. `0.1.0` -> `1.0.0`)

Po navýšení verze stačí opět spustit `npm publish`.

---

## 🛠️ Použití knihovny v aplikaci

Jakmile je knihovna publikována, v cílové aplikaci ji nainstalujete standardně:
```bash
npm install @thomas666/frontend-lib
```

Následně ji importujete včetně jejích stylů:

```typescript
import { createButton } from '@thomas666/frontend-lib';
import '@thomas666/frontend-lib/dist/style.css'; // Načtení stylů knihovny

const button = createButton({
  label: 'Klikni na mě',
  onClick: () => console.log('Ahoj z knihovny!')
});

document.body.appendChild(button);
```
