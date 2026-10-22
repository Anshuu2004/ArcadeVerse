# 🎵 Neon Beat Runner

> **ArcadeVerse Level 3 Game Submission**  
> **Author:** Babin Bid ([@Babin123456](https://github.com/Babin123456))  
> **Event:** Nexus Spring Of Code – Winter Edition 2026 (`nsoc26`)  
> **Category:** Rhythm / Beat Precision  

---

## 🎮 Overview

Neon Beat Runner is a 4-lane procedural rhythm arcade game built with HTML5 Canvas, Web Audio harmonic synthesis, and Vanilla JavaScript. Players must synchronize inputs with falling neon pulses as they cross the lower judgment line to rack up combo streaks and multipliers.

---

## ⚡ Game Mechanics & Features

- **4-Lane Rhythmic Progression:** Dedicated musical note frequencies corresponding to chords across 4 descending highway tracks (Lanes 1 to 4).
- **Procedural Web Audio Harmonics:** Audio notes generated on the fly via `AudioContext` triangle oscillators for zero network latency or audio loading delays.
- **Precision Judgment Windows:** Millisecond alignment detection classifying strikes into *PERFECT!* (+100 pts), *GOOD* (+50 pts), or *MISS* (combo breaker).
- **Combo Multipliers:** Sustaining long uninterrupted streaks unlocks 2x and 4x score multiplier tiers.
- **Dual Control Interfaces:** Physical keyboard keys (`D / F / J / K` or `1 / 2 / 3 / 4`) and mobile-responsive tactile touch pads.
- **Local Best Persistence:** High scores are saved to browser `localStorage`.
- **How to Play Modal:** Built-in rules and controls overlay for Project Admin review.

---

## 🕹️ Controls

| Lane Track | Desktop Key | Touch Button |
| :--- | :--- | :--- |
| **Lane 1 (Cyan)** | <kbd>D</kbd> / <kbd>1</kbd> | Tap Lane D |
| **Lane 2 (Pink)** | <kbd>F</kbd> / <kbd>2</kbd> | Tap Lane F |
| **Lane 3 (Yellow)** | <kbd>J</kbd> / <kbd>3</kbd> | Tap Lane J |
| **Lane 4 (Purple)** | <kbd>K</kbd> / <kbd>4</kbd> | Tap Lane K |
| **Start / Restart** | <kbd>Spacebar</kbd> / Click Button | Tap Screen / Button |

---

## 🛠️ Tech Stack

- **HTML5 Canvas:** 60fps hardware-accelerated 2D rhythm stage.
- **Web Audio API:** Oscillator-driven musical feedback.
- **Vanilla JavaScript:** Frame update loop, precision timing math.
