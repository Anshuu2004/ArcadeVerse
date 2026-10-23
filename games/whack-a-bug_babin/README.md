# 🐛 Whack-A-Bug Developer Panic

> **ArcadeVerse Level 3 Game Submission**  
> **Author:** Babin Bid ([@Babin123456](https://github.com/Babin123456))  
> **Event:** Nexus Spring Of Code – Winter Edition 2026 (`nsoc26`)  
> **Category:** Arcade / Reaction Reflex  

---

## 🎮 Overview

Whack-A-Bug Developer Panic is a fast-paced reaction arcade game where players defend a 3x3 production server rack against emerging code bugs before CPU temperatures overheat past critical 100°C limits.

---

## ⚡ Game Mechanics & Features

- **Emergent Server Hazards:** 4 distinct bug entities emerge randomly with customized lifespan and scoring values:
  - 🐛 **Syntax Error:** Standard bug (+10 Pts, -2°C)
  - 👾 **Memory Leak:** High-priority bug (+25 Pts, -4°C)
  - ⭐ **Golden Patch:** Rare optimization (+50 Pts, -10°C)
  - 🛡️ **Firewall Trap:** Penalty obstacle (+15°C overheat if struck)
- **Passive Thermal Pressure:** CPU temperature naturally escalates over time, requiring consistent whacking cadence.
- **Floating Point Feedback:** Visual floating damage/score indicators on each successful hit.
- **Local Best Persistence:** High scores are saved to browser `localStorage`.
- **How to Play Modal:** Built-in rules and controls overlay for Project Admin review.

---

## 🕹️ Controls

| Action | Control |
| :--- | :--- |
| **Whack Bug** | Click or Tap emerging bug in server rack slot |
| **Avoid** | Do NOT click Firewall shields 🛡️ |
| **Reboot Server** | Click or Tap "Deploy Hotfix" / "Reboot Server" |

---

## 🛠️ Tech Stack

- **HTML5 & CSS3:** Flexbox and Grid server rack presentation with thermal gauge bar.
- **Vanilla JavaScript:** Interval loop state machine, dynamic weighted randomization.
