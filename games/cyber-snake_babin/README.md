# 🐍 Cyber Snake Matrix

> **ArcadeVerse Level 3 Game Submission**  
> **Author:** Babin Bid ([@Babin123456](https://github.com/Babin123456))  
> **Event:** Nexus Spring Of Code – Winter Edition 2026 (`nsoc26`)  
> **Category:** Retro / Arcade Classic  

---

## 🎮 Overview

Cyber Snake Matrix is a cyberpunk re-engineering of the legendary Nokia arcade classic. Featuring a 20x20 neon containment grid, wrapping edge portal physics, procedural golden powerup drops, and progressive velocity scaling, it delivers fluid, nostalgic gameplay.

---

## ⚡ Game Mechanics & Features

- **Boundary Portal Wrap:** Passing through the perimeter walls warps the snake to the opposing coordinate rather than terminating the run.
- **Dynamic Chromatic Progression:** The cyber snake body segments glow with an evolving hue gradient (`hsl(160 + index * 5, ...)`).
- **Dual Energy Types:**
  - 💎 **Cyan Energy Bit:** +10 Pts, +1 length increment
  - ⭐ **Golden Quantum Bit:** +50 Pts bonus, high-value limited-time spawn
- **Progressive Velocity Scaling:** Snake tick interval speeds up dynamically every 30 points scored.
- **On-Screen Tactile D-Pad:** Mobile touch controls ensuring seamless gameplay on phones and tablets.
- **Local Best Persistence:** High score records persist automatically across browser reloads via `localStorage`.
- **How to Play Modal:** Built-in rules and controls overlay for Project Admin review.

---

## 🕹️ Controls

| Direction | Keyboard Keys | Mobile Touch |
| :--- | :--- | :--- |
| **Move Up** | <kbd>W</kbd> / <kbd>▲</kbd> | Tap ▲ D-Pad |
| **Move Down** | <kbd>S</kbd> / <kbd>▼</kbd> | Tap ▼ D-Pad |
| **Move Left** | <kbd>A</kbd> / <kbd>◀</kbd> | Tap ◀ D-Pad |
| **Move Right** | <kbd>D</kbd> / <kbd>▶</kbd> | Tap ▶ D-Pad |
| **Start / Restart** | <kbd>Spacebar</kbd> / Click Button | Tap Screen / Button |

---

## 🛠️ Tech Stack

- **HTML5 Canvas:** 60fps 2D rendering with dynamic shadow glows.
- **CSS3:** Cyberpunk glassmorphic HUD styling with responsive canvas containment.
- **Vanilla JavaScript:** 2D grid matrix mechanics, queue state management.
