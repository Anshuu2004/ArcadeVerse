# 🔐 Cryptic Wordle Hack

> **ArcadeVerse Level 3 Game Submission**  
> **Author:** Babin Bid ([@Babin123456](https://github.com/Babin123456))  
> **Event:** Nexus Spring Of Code – Winter Edition 2026 (`nsoc26`)  
> **Category:** Puzzle / Word Strategy  

---

## 🎮 Overview

Cryptic Wordle Hack is a cybersecurity-themed keyword decryption puzzle built with Vanilla JavaScript and CSS Grid. Players must analyze color feedback clues to deduce a secret 5-letter computer science or technology term in 6 tries.

---

## ⚡ Game Mechanics & Features

- **Tech Keyword Word Bank:** Curated dictionary of 5-letter tech terms (`CYBER`, `PIXEL`, `ASYNC`, `PROXY`, `STACK`, `QUEUE`, `CLOUD`, etc.).
- **Two-Pass Color Verification:** Correctly detects duplicate characters without false positive amber highlights (exact matches prioritized first).
- **Responsive Virtual Cyber Keyboard:** Real-time key state styling reflecting discovered letter hints (Green, Amber, Dark).
- **Smooth Flip & Shake Animations:** Custom CSS3 keyframe animations for letter entry, tile reveals, and input validation errors.
- **Decryption Analytics:** Persistent game statistics (Played, Win Rate %, Current Streak, Max Streak) stored in `localStorage`.
- **How to Play Modal:** Built-in rules and controls overlay for Project Admin review.

---

## 🕹️ Controls

| Action | Physical Keyboard | Virtual Cyber Keyboard |
| :--- | :--- | :--- |
| **Enter Letter** | <kbd>A</kbd>–<kbd>Z</kbd> | Tap letter button |
| **Delete Letter** | <kbd>Backspace</kbd> | Tap <kbd>⌫</kbd> |
| **Submit Keyword** | <kbd>Enter</kbd> | Tap <kbd>ENTER</kbd> |
| **View Analytics** | Click 📊 button | Tap 📊 |

---

## 🛠️ Tech Stack

- **HTML5 & CSS3:** Responsive grid layout, 3D flip card animations.
- **Vanilla JavaScript:** Two-pass matching algorithm, state persistence.
