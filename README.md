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

### 1. Nastavení jména a verze v `package.json`
Upravte `"name"` na název vašeho balíčku (např. `"@muj-profil/moje-knihovna"` pro scoped balíček nebo `"moje-knihovna"`). Nastavte výchozí verzi, např. `"1.0.0"`.

### 2. Přihlášení do NPM
Pokud ještě nejste přihlášeni ve svém CLI:
```bash
npm login
```
*Zadejte své uživatelské jméno, heslo, e-mail a jednorázový kód (2FA), pokud ho máte aktivovaný.*

### 3. Kontrola zabalených souborů (Dry-run)
Před samotným nahráním si můžete ověřit, jaké soubory se skutečně odešlou na NPM (zahrnuta je pouze složka `dist` podle konfigurace `"files"` v `package.json`):
```bash
npm pack --dry-run
```

### 4. Publikování balíčku
*   **Pro veřejný standardní balíček:**
    ```bash
    npm publish
    ```
*   **Pro veřejný scoped balíček** (začínající na `@`):
    NPM standardně publikuje scoped balíčky jako privátní. Chcete-li ho publikovat zdarma jako veřejný, musíte přidat parametr `--access public`:
    ```bash
    npm publish --access public
    ```

---

## 🛠️ Použití knihovny v aplikaci

Jakmile je knihovna publikována, v cílové aplikaci ji nainstalujete standardně:
```bash
npm install frontend-lib
```

Následně ji importujete včetně jejích stylů:

```typescript
import { createButton } from 'frontend-lib';
import 'frontend-lib/dist/style.css'; // Načtení stylů knihovny

const button = createButton({
  label: 'Klikni na mě',
  onClick: () => console.log('Ahoj z knihovny!')
});

document.body.appendChild(button);
```
