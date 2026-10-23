# 🏢 Cyber Tower Stacker

> **ArcadeVerse Level 3 Game Submission**  
> **Author:** Babin Bid ([@Babin123456](https://github.com/Babin123456))  
> **Event:** Nexus Spring Of Code – Winter Edition 2026 (`nsoc26`)  
> **Category:** Arcade / Timing Reflex  

---

## 🎮 Overview

Cyber Tower Stacker is a high-speed precision slicing arcade game inspired by classic block stacking mechanics and modern cyberpunk aesthetics. Players must time each drop perfectly to build a neon tower into the stratosphere. Overhanging segments are dynamically sliced off and fall away as debris with rotational physics.

---

## ⚡ Game Mechanics & Features

- **Precision Slicing Physics:** Overhanging slab segments are calculated dynamically on impact; overlapping sections remain while debris fragments tumble with rotational velocity and gravity.
- **Combo Multiplier Engine:** Aligning blocks within a 4px tolerance triggers a *PERFECT!* alignment bonus, awards combo multipliers, and restores a portion of lost slab width.
- **Vertical Camera Scrolling:** As the tower altitude rises above 180px, the viewport automatically glides downward to maintain focus on the active construction tier.
- **Dynamic Chromatic Progression:** Block hues dynamically cycle along a synthwave rainbow gradient (`hsl(180 + layer * 9, ...)`).
- **Audio-Visual Feedback:** Spark particle bursts and edge highlights provide immediate, satisfying tactile feedback.
- **Local Best Persistence:** High score records persist automatically across browser sessions using `localStorage`.
- **How to Play Modal:** Built-in controls and rules overlay for Project Admin review.

---

## 🕹️ Controls

| Action | Desktop Key | Mobile / Touch |
| :--- | :--- | :--- |
| **Drop Slab** | <kbd>Spacebar</kbd> / <kbd>Enter</kbd> | Tap Canvas |
| **Start / Restart** | <kbd>Spacebar</kbd> / Click Button | Tap Screen / Button |
| **How to Play** | Click "How to Play" | Tap "How to Play" |

---

## 🛠️ Tech Stack

- **HTML5 Canvas:** 60fps hardware-accelerated 2D rendering.
- **CSS3:** Cyberpunk glassmorphic HUD styling with responsive canvas containment.
- **Vanilla JavaScript:** Zero external dependencies, pure physics calculations.
