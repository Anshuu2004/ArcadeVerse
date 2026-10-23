# ⚓ Tactical Fleet Commander

> **ArcadeVerse Level 3 Game Submission**  
> **Author:** Babin Bid ([@Babin123456](https://github.com/Babin123456))  
> **Event:** Nexus Spring Of Code – Winter Edition 2026 (`nsoc26`)  
> **Category:** Strategy / Naval Radar Command  

---

## 🎮 Overview

Tactical Fleet Commander is a turn-based tactical naval warfare game inspired by battleship radar operations. Players target concealed hostile warships across a 7x7 radar coordinate grid while managing coastal base health against retaliatory missile strikes.

---

## ⚡ Game Mechanics & Features

- **Procedural Ship Allocation:** Automatically places 4 naval vessels (Aircraft Carrier: 4, Battleship: 3, Cruiser: 2, Submarine: 2) in valid horizontal or vertical non-overlapping coordinates.
- **Dynamic Sonar Sweep Intelligence:** Allows players to deploy a tactical 2x2 sonar ping once per battle to reveal submerged contacts.
- **Enemy Counter-Bombardment:** Each missile launch prompts enemy coastal retaliation, deteriorating home base integrity (-10% to -15% HP).
- **Real-Time Combat Telemetry:** Interactive battle log, ship casualty tracker, and base integrity HUD.
- **How to Play Modal:** Built-in rules and controls overlay for Project Admin review.

---

## 🕹️ Controls

| Action | Control |
| :--- | :--- |
| **Launch Missile Strike** | Click or Tap any radar grid cell |
| **Activate Sonar Scan** | Click "Sonar Scan" button, then click 2x2 sector |
| **View Tactical Rules** | Click "How to Play" |

---

## 🛠️ Tech Stack

- **HTML5 & CSS3:** Cyber radar HUD presentation, animated pulse sonar borders.
- **Vanilla JavaScript:** 2D matrix fleet tracking, procedural collision verification.
