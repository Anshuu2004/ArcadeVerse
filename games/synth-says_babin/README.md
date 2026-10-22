# 🎛️ Synth-Wave Simon Says

> **ArcadeVerse Level 3 Game Submission**  
> **Author:** Babin Bid ([@Babin123456](https://github.com/Babin123456))  
> **Event:** Nexus Spring Of Code – Winter Edition 2026 (`nsoc26`)  
> **Category:** Retro / Audio-Visual Memory  

---

## 🎮 Overview

Synth-Wave Simon Says is an audio-visual memory challenge powered by the browser's native Web Audio API. Four retro synthesizer pads generate authentic harmonic tones (C4, E4, G4, C5). Players must observe the randomized sequence of musical notes and flashing neon pads, then reproduce the pattern accurately under progressive speed acceleration.

---

## ⚡ Game Mechanics & Features

- **Procedural Synthesizer Tones:** Uses `AudioContext` triangle and sine oscillators to create warm retro synth sounds on demand without external audio files.
- **Dynamic Speed Acceleration:** Sequence playback intervals accelerate progressively as the pattern expands, testing working memory and reflex.
- **Dual Input Architecture:** Supports both mouse/touch taps on the circular quadrant wheel and keyboard shortcut mapping (`Q/W/A/S` or `1/2/3/4` or Arrow Keys).
- **Persistent High-Score Tracking:** High scores save automatically to browser `localStorage`.
- **Built-in How-to-Play Modal:** Comprehensive controls overlay designed for Project Admin evaluation.

---

## 🕹️ Controls

| Pad Quadrant | Keyboard Shortcut | Touch / Mouse |
| :--- | :--- | :--- |
| **Top-Left (Cyan)** | <kbd>Q</kbd> / <kbd>1</kbd> / <kbd>▲</kbd> | Tap Pad 1 |
| **Top-Right (Pink)** | <kbd>W</kbd> / <kbd>2</kbd> / <kbd>▶</kbd> | Tap Pad 2 |
| **Bottom-Left (Yellow)** | <kbd>A</kbd> / <kbd>3</kbd> / <kbd>◀</kbd> | Tap Pad 3 |
| **Bottom-Right (Purple)** | <kbd>S</kbd> / <kbd>4</kbd> / <kbd>▼</kbd> | Tap Pad 4 |
| **Start / Reset** | Click Central "PLAY" Button | Tap "PLAY" |

---

## 🛠️ Tech Stack

- **Web Audio API:** Oscillator-driven synthesizer audio.
- **CSS3:** Synthwave neon glow effects, responsive circular quadrant layout.
- **Vanilla JavaScript:** Event loop, sequence queue state machine.
