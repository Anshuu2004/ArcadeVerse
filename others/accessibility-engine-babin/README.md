# ♿ ArcadeVerse Accessibility & Focus Management Engine

> **ArcadeVerse Level 2 Platform Enhancement**  
> **Author:** Babin Bid ([@Babin123456](https://github.com/Babin123456))  
> **Event:** Nexus Spring Of Code – Winter Edition 2026 (`nsoc26`)  
> **Folder Isolation:** `accessibility-engine-babin/`  

---

## 🎮 Overview

The Accessibility & Focus Management Engine upgrades ArcadeVerse to align with WCAG 2.1 AA international accessibility standards. It guarantees full keyboard-only navigability, focus trapping within modal launchers, high-visibility focus indicators, and screen-reader polite live region announcements.

---

## ⚡ Key Features

- **Skip to Main Content Anchor:** Injects an accessible skip-link bypassing repeated header navigation for assistive technology.
- **Strict Modal Focus Trapping:** Cycles Tab and Shift+Tab focus strictly within open game modals, preventing background keystroke leaks.
- **Card Grid Arrow Navigation:** Supports <kbd>ArrowLeft</kbd>, <kbd>ArrowRight</kbd>, <kbd>ArrowUp</kbd>, <kbd>ArrowDown</kbd> directional navigation across game catalog cards.
- **ARIA Live Announcements:** Dynamic Polite region announcing filtered result counts and search updates to screen readers.
- **High-Contrast Neon Focus Indicators:** Guarantees `focus-visible` styling compliant with contrast standards.
