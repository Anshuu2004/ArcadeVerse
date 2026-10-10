# 👾 **ArcadeVerse — The Ultimate Open-Source Web Arcade Platform**
### ❄️ **NSOC (Winter Edition 2026) Official Flagship Gaming Project**

[![NSOC Winter 2026](https://img.shields.io/badge/NSOC-Winter%202026-blueviolet?style=for-the-badge&logo=github)](https://github.com)
[![Tech Stack](https://img.shields.io/badge/Tech-100%25%20HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-00f2fe?style=for-the-badge&logo=javascript)](https://github.com)
[![Open Source](https://img.shields.io/badge/PRs-Welcome-ff007f?style=for-the-badge)](CONTRIBUTING.md)
[![License](https://img.shields.io/badge/License-MIT-00e676?style=for-the-badge)](LICENSE)

---

> ## 👑 **PROJECT ADMINISTRATION & LEADERSHIP**
> - **Project Admin:** **Debasmita** ([@debasmita-admin](https://github.com))
> - **Program:** **National Summer/Winter Open Source Contest (NSOC '26)**
> - **Tech Stack:** **100% Pure HTML, CSS, & Vanilla JavaScript** (No Python, No Node backend, No Frameworks, No Bundlers)
> - **Primary Objective:** Build a frictionless, community-driven web arcade where contributors can showcase their mini-games without git conflicts!

---

# ⚡ **KEY HIGHLIGHTS & ARCHITECTURE**

- 🚀 **100% Native Web Standards:** Pure HTML5, CSS3, & Modern Vanilla JS. Runs instantly in any web browser without any installation!
- 📁 **Isolated Directory Pattern (`games/<your-game>/`):** Every participant works inside their own isolated folder. **Zero Git merge conflicts!**
- 👥 **Duplicate Game Support:** Multiple contributors can build their own variations of classic games (e.g. `games/snake-(your-name)/`).
- 🧪 **Built-in Live Game Sandbox:** Test HTML/CSS/JS game code live in the browser before pushing PRs!
- 🎲 **Interactive Idea Roulette:** 20+ ready-to-claim game concepts with tech tags for participants.
- ⚡ **Automated PR Snippet Generator:** One-click code generation for `games-registry.js` and contributor registration.
- 🏆 **Community Hall of Fame:** Every merged contributor gets featured dynamically on the main dashboard and documentation!

---

# 💻 **HOW TO RUN THIS PROJECT LOCALLY**

This project has **no Python application and no backend dependencies**. You can run it instantly using any of the following web methods:

---

### 🔹 **METHOD 1: INSTANT BROWSER LAUNCH (RECOMMENDED)**
Run this single command in your terminal to open the platform in your browser immediately:

- **Windows (PowerShell / Command Prompt):**
  ```powershell
  start chrome "$PWD\index.html"
  ```
  *(Alternative default browser: `start index.html`)*
- **macOS:**
  ```bash
  open index.html
  ```
- **Linux:**
  ```bash
  xdg-open index.html
  ```

---

### 🔹 **METHOD 2: VS CODE LIVE SERVER**
1. Open the project in **VS Code**.
2. Right-click on **`index.html`**.
3. Select **"Open with Live Server"**.

---

### 🔹 **METHOD 3: DOUBLE-CLICK `index.html`**
Simply open your project folder in File Explorer and **double-click `index.html`**! It opens right away in Chrome, Edge, Brave, or Firefox.

---

# 🕹️ **STARTER REFERENCE GAME INCLUDED**

- 🧩 **Quantum Memory Matrix** (`games/memory-matrix/`):
  - Pure HTML, CSS & Vanilla JS 3D card flip puzzle.
  - Serves as the clean reference template for all upcoming contributor games!

---

# 🚀 **HOW TO CONTRIBUTE (STEP-BY-STEP QUICK GUIDE)**

Detailed instructions are available in [CONTRIBUTING.md](CONTRIBUTING.md):

1. **Fork & Clone:**
   ```bash
   git clone https://github.com/<your-username>/NSOC.git
   cd NSOC
   ```
2. **Create Feature Branch:**
   ```bash
   git checkout -b game/my-awesome-game
   ```
3. **Add Your Game:**
   Create your folder inside `games/<game-name>/` (or `games/<game-name>-<your-name>/`) with `index.html`, `style.css`, and `game.js`.
4. **Register:**
   Add your entry into `assets/js/games-registry.js` and add your name to the **Hall of Fame** table in [CONTRIBUTING.md](CONTRIBUTING.md).
5. **Push & Open PR:**
   ```bash
   git add .
   git commit -m "feat(game): add <game-name> by @<your-username>"
   git push origin game/my-awesome-game
   ```

---

# 💡 **TOP GAME IDEAS WAITING TO BE BUILT (PURE HTML, CSS, JS)**

Contributors can claim any of these concepts directly:
- 🚀 **Flappy Cyber Jet** (`games/flappy-cyber/`)
- 🔢 **Quantum 2048** (`games/quantum-2048/`)
- 🏓 **Neon Cyber Pong (PvP / AI)** (`games/neon-pong/`)
- 🏢 **Cyber Tower Stacker** (`games/cyber-stacker/`)
- 🛸 **Space Invaders 2026** (`games/galaxy-invaders/`)
- 🐛 **Whack-A-Bug Developer** (`games/whack-a-bug/`)
- 🔤 **Cryptic Wordle Hack** (`games/cryptic-words/`)
- 🦘 **Astro Infinite Jumper** (`games/astro-jump/`)
- 💣 **Quantum Minesweeper** (`games/quantum-minesweeper/`)
- 🎹 **Synth-Wave Simon Says** (`games/synth-says/`)

---

# 🏆 **HALL OF FAME & CONTRIBUTORS**

Check out the full list of authors and contributors in [CONTRIBUTING.md#community-contributors-hall-of-fame](CONTRIBUTING.md#community-contributors-hall-of-fame).

---

# 📄 **LICENSE**
This project is open-source under the [MIT License](LICENSE).  
Maintained with ❤️ by **Debasmita** for **NSOC Winter Edition 2026**.
