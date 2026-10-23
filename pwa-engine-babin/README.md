# Progressive Web App (PWA) & Offline Shell

Enables offline gameplay, background static asset caching, and native installation support for ArcadeVerse.

## Features
- **Offline Shell**: Precaches platform layout and core JS/CSS assets via Service Worker (`sw.js`).
- **Network-First Revalidation**: Transparently serves cached versions when offline while silently refreshing in the background when connected.
- **Install Banner Integration**: Captures browser `beforeinstallprompt` to present a customized, non-intrusive install action.
- **Isolated Workspace**: All PWA logic is enclosed inside `pwa-engine-babin/`.
