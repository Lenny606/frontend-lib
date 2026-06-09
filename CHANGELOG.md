# Changelog

Všechny významné změny v tomto projektu budou zaznamenány v tomto souboru.

Formát je založen na [Keep a Changelog](https://keepachangelog.com/cs/1.0.0/)
a tento projekt dodržuje [Sémantické verzování](https://semver.org/lang/cs/).

## [Unreleased]

### Opraveno
- Odstraněna nepoužívaná závislost `string-format-helpers` z `package.json`.

## [0.1.1] - 2026-06-09

### Přidáno
- Implementace a integrace komponent **Accordion** a **Tabs** do interaktivního playgroundu.
- Implementace komponent **Modal** a **Avatar** s ukázkami v playgroundu.
- Implementace komponent **Toggle**, **Badge**, **Tooltip** a **Toast** s playground integrací.
- Implementace komponent **Card** a **Link** s efektem Glass Fluid a integrací do playgroundu.
- Přidány formulářové komponenty: **Label**, **Input**, **Textarea**, **Select** a obalovací prvek **FormField**.
- Rozšíření návodu k publikaci v `README.md` a přejmenování projektu na scoped balíček `@thomas666/frontend-lib`.

## [0.1.0] - 2026-06-09

### Přidáno
- První verze knihovny frontendových komponent s Glass Fluid designem.
- Implementace komponenty **Button** s bohatou podporou variant, velikostí, tagů a ikon.
- Implementace komponenty **Checkbox** s plným provázáním stavů a stylováním.
- Interaktivní vývojový playground (komponenta Gallery a Customizer pro živé testování).
- Konfigurace sestavení pomocí Vite (ES/CJS formáty) a automatické generování TypeScript definic (`vite-plugin-dts`).
