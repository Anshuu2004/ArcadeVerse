# 👾 ArcadeVerse — The Ultimate Open-Source Web Arcade Platform
### ❄️ NSOC (National Summer/Winter Open Source Contest) Winter Edition 2026 Flagship Project

![ArcadeVerse Banner](https://img.shields.io/badge/NSOC-Winter%202026-blueviolet?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Tech-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-00f2fe?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-ff007f?style=for-the-badge)

Welcome to **ArcadeVerse**, a high-voltage, modular web arcade platform created and administered by **Debasmita** for **NSOC Winter Edition 2026**.

The goal of this project is to provide open-source contributors with a frictionless, fun, and highly collaborative environment where anyone can contribute their own mini-games using **pure HTML, CSS, and JavaScript** without worrying about complex build tools, external package installations, or merge conflicts.

---

## 🌟 Key Highlights

- ⚡ **Zero Heavyweight Tech Stacks**: Pure Vanilla HTML5, CSS3, and JavaScript Canvas/DOM. No Node bundles, React, or Webpack dependencies needed to run or contribute.
- 🎮 **Universal Arcade Launcher**: Click on any game card to launch it directly inside the Arcade Modal, switch to Fullscreen, or open in a standalone tab!
- 🗂️ **Isolated Modular Architecture**: Every game gets its own isolated directory inside `games/`, ensuring contributors never overwrite each other's work.
- 👥 **Duplicate Game Support**: Multiple contributors can create their own versions of classic games (e.g. `games/snake-(contributor-name)/`).
- 🏆 **Dynamic Hall of Fame**: Every game and contributor is showcased dynamically on the main dashboard and documented in `CONTRIBUTORS.md`.
- 🔍 **Live Search & Category Filter**: Filter games by Retro, Arcade, Puzzle, Action, or search by contributor name.

---

## 🕹️ Included Starter Games

1. **Cyber Snake Neo** (`games/cyber-snake/`):
   - Cyberpunk neon snake game with particle speed accelerations, score tracking, local storage high scores, and touch controls.
2. **Galaxy Brick Breaker** (`games/galaxy-brick-breaker/`):
   - Sci-Fi paddle & ball physics breaker with multi-row energy shields, mouse + arrow control, and progressive stages.
3. **Quantum Memory Matrix** (`games/memory-matrix/`):
   - 3D CSS flip-card memory decryption puzzle with move counters, pair matching, and a live timer.

---

## 🚀 How to Run Locally

Because this project is built entirely on native web standards:

1. Clone or download this repository:
   ```bash
   git clone https://github.com/<your-username>/NSOC.git
   cd NSOC
   ```
2. Simply double click `index.html` or open it with **Live Server** in VS Code!
3. That's it! No `npm install`, no build commands needed.

---

## 🤝 How to Contribute (NSOC Participants)

Please read our detailed [CONTRIBUTING.md](file:///c:/Users/Debasmita/Desktop/NSOC/CONTRIBUTING.md) for full branch, fork, and PR guidelines.

Quick recap:
1. **Fork** the repo & checkout a new branch: `git checkout -b feature/my-game`.
2. Build your game inside `games/<game-name>/` (or `games/<game-name>-<your-name>/`).
3. Add your game entry in `assets/js/games-registry.js`.
4. Sign your entry in `CONTRIBUTORS.md`.
5. Open a Pull Request targeting the `main` branch!

---

## 👑 Project Administration & Mentorship
- **Project Admin**: Debasmita
- **Role**: Lead Architect & Maintainer for NSOC 2026
- **Status**: Actively reviewing issues and merging contributor Pull Requests!

---

## 📄 License
This project is open-source under the [MIT License](LICENSE).
