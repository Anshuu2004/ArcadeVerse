# 👾 Space Invaders 2026

> **ArcadeVerse Level 3 Game Submission**  
> **Author:** Babin Bid ([@Babin123456](https://github.com/Babin123456))  
> **Event:** Nexus Spring Of Code – Winter Edition 2026 (`nsoc26`)  
> **Category:** Action / Arcade Retro  

---

## 🎮 Overview

Space Invaders 2026 is an arcade planetary defense simulator built with HTML5 Canvas, Web Audio API sound synthesis, and Vanilla JavaScript. Players command an energy cannon to repel descending waves of pixel invaders while protecting defensive energy bunkers and targeting high-altitude mystery motherships.

---

## ⚡ Game Mechanics & Features

- **Multi-Row Alien Armada:** 4 rows of animated aliens (squids, crabs, octopuses) with individual point values and color schemes.
- **Dynamic Wave Acceleration:** Invader movement speeds up dynamically as the armada count dwindles and wave numbers climb.
- **Destructible Defense Bunkers:** 3 composite energy bunkers that deteriorate gradually as laser fire strikes from above or below.
- **High-Altitude Mystery UFO:** Occasional red mystery mothership cruising across the top stratosphere with 100-300 bonus points.
- **Audio Synthesizer Engine:** Zero-asset procedural sound effects generated directly via the browser Web Audio API (`AudioContext`).
- **3-Life Fleet Reserve:** Player maintains 3 defensive ships with a live HUD tracking waves, kills, and high score.
- **How to Play Modal:** Built-in rules and controls overlay for Project Admin review.

---

## 🕹️ Controls

| Action | Desktop Key | Mobile Controls |
| :--- | :--- | :--- |
| **Move Left** | <kbd>Left Arrow</kbd> / <kbd>A</kbd> | Tap ◀ button |
| **Move Right** | <kbd>Right Arrow</kbd> / <kbd>D</kbd> | Tap ▶ button |
| **Fire Cannon** | <kbd>Spacebar</kbd> | Tap FIRE button |
| **Start / Restart** | <kbd>Spacebar</kbd> / Click Button | Tap Screen / Button |
| **Rules & Guide** | Click "How to Play" | Tap "How to Play" |

---

## 🛠️ Tech Stack

- **HTML5 Canvas:** 60fps retro 2D arcade rendering.
- **Web Audio API:** Oscillator-driven procedural chiptune sound effects.
- **CSS3:** Responsive cyber HUD styling.
- **Vanilla JavaScript:** Clean collision detection and wave state machines.
