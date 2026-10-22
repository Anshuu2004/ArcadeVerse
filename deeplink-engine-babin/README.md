# Deep Link & Social Sharing Router

An isolated client-side routing module for ArcadeVerse allowing direct game launches, ideas vault linking, and instant social link sharing.

## Features
- **Query Parameter Routing**: Supports `?game=<game-id>` to highlight and auto-open modals on landing.
- **Ideas Blueprint Deep Links**: Supports `?idea=<idea-id>` to navigate and spotlight specific game concepts.
- **Native Web Share & Clipboard Fallback**: Automatically invokes the native OS share drawer on mobile devices, falling back to a glassmorphic clipboard toast on desktop.
- **Non-destructive Isolation**: Follows strict `*-babin/` workspace separation guidelines.
