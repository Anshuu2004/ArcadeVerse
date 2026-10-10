# 🌟 ArcadeVerse — Contribution & Contributor Hub (NSOC '26)

> ### 👑 **PROJECT ADMIN:** **Debasmita Bose** ([@DebasmitaBose0](https://github.com/DebasmitaBose0))  
> ### ❄️ **EVENT:** **NSOC (Winter Edition 2026)**  
> ### ⚡ **TECH STACK:** **100% Pure Vanilla HTML5 + CSS3 + Modern JavaScript (NO Python, NO Frameworks, NO Bundlers)**  

---

# 🎯 **OFFICIAL NSOC PROGRAM PILLARS & GUIDELINES**

ArcadeVerse is proudly built and maintained under the official ethos of **NSOC (Winter Edition 2026)**:

> ### 📌 **1. Submit your open source project for the program**
> ArcadeVerse is an open-source arcade gaming ecosystem crafted to offer an accessible, scalable, and conflict-free foundation where developers worldwide can build and showcase their creations.
>
> ### 📌 **2. Curate issues fit for contributors of all levels**
> From beginners writing their first HTML5 canvas loop or CSS animation to intermediate developers designing full game mechanics (puzzles, retro platformers, physics simulators), we curate well-documented issues and ready-to-claim specifications in our **Ideas Vault**.
>
> ### 📌 **3. Review PRs and mentor contributors through your codebase**
> Our maintainer team actively reviews Pull Requests, offers constructive code reviews, provides debugging guidance, and helps contributors refine their web engineering skills following clean vanilla standards.
>
> ### 📌 **4. Get meaningful contributions — and give someone their first real merge**
> Every contribution here is real, meaningful, and permanent. Whether it's your 100th open-source PR or your very first git merge, we celebrate your work in our live **Hall of Fame Leaderboard**!

---

# 🎖️ **CONTRIBUTOR TIERS, ROLES & HALL OF FAME BADGES**

Every contributor in ArcadeVerse earns official recognition titles displayed live on our **Hall of Fame & Leaderboard** based on their verified commits and contributions:

### 🏆 **1. Repository & Commit Milestones:**
| Tier Title | Commits Requirement | Description | Badge on Profile |
| :--- | :---: | :--- | :---: |
| **🚀 Project Contributor** | **5+ Commits** | Contributed initial verified pull requests, bug fixes, or minor features. | `🚀 Project Contributor` |
| **🌟 Novice Contributor** | **10+ Commits** | Consistent open-source contributions across the codebase. | `🌟 Novice Contributor` |
| **💎 Elite Contributor** | **20+ Commits** | Major architectural refinements, optimizations, and active reviews. | `💎 Elite Contributor` |
| **🏆 Master Contributor** | **50+ Commits** | Outstanding leadership and top-tier open-source impact. | `🏆 Master Contributor` |

---

### 🕹️ **2. Dedicated `games/` Folder Developer Tiers:**
Contributors who build, polish, and submit playable arcade games earn dedicated specialized titles:

| Developer Title | Requirement Criteria | Description | Badge on Profile |
| :--- | :---: | :--- | :---: |
| **🕹️ Arcade Developer** | **15+ Commits** (or 1 verified game) | Authored and polished a playable game in `games/game-name_contributor-name/`. | `🕹️ Arcade Developer` |
| **⚡ Hyper Game Developer** | **30+ Commits** (or 2+ verified games) | Authored multiple high-performance web arcade games with custom canvas/physics. | `⚡ Hyper Game Developer` |

> 👑 **Project Lead & Architect:** **Debasmita Bose** ([@DebasmitaBose0](https://github.com/DebasmitaBose0)) holds the permanent Project Lead status.

---

# 🚫 **STRICT CONTRIBUTOR CODE OF CONDUCT & GROUNDS FOR PR REJECTION**

> [!CAUTION]
> ### 🚨 **ZERO TOLERANCE POLICY — VIOLATIONS WILL RESULT IN IMMEDIATE PR CANCELLATION**
> To preserve the security, academic integrity, and quality of NSOC (Winter Edition 2026), all contributors **must strictly comply** with the following rules. Failure or refusal to adhere to these terms **will lead to immediate Pull Request closure, disqualification from the leaderboard, and potential reporting to NSOC coordinators**:
>
> 1. **❌ NO Non-Compliant Directory Paths:** Any contribution placed outside `games/game-name_contributor-name/` (or attempting to edit another contributor's game directory) will be **immediately closed**.
> 2. **❌ NO Plagiarism, AI Hallucinations or Stolen Code:** Copying whole copyrighted projects or submitting unverified, broken AI dump code without manual testing is prohibited. Submissions must run smoothly in Vanilla JS.
> 3. **❌ NO Malicious Payloads, Telemetry, or Heavy Bundlers:** Injecting cryptominers, malicious iframes, unauthorized tracking scripts, node_modules, webpack builds, or minified unreadable binaries will result in a **permanent ban from the repo**.
> 4. **❌ NO Spam or Meaningless Micro-Commits:** Padding commit numbers with empty whitespace edits, punctuation changes in readmes, or fake typo fixes to game the point system will lead to **point resets and PR rejection**.
> 5. **❌ NO Framework Fatigue / Heavy Dependencies:** React, Vue, Angular, jQuery, or Python backends are **NOT allowed**. Pure Vanilla HTML5, CSS3, and JavaScript are strictly enforced.
> 6. **📜 Acceptance of Open Source License:** All contributions are submitted under the terms of the project's [MIT License](LICENSE). You must grant full perpetual open-source rights to the community.

---

# ⚠️ **CRITICAL REQUIREMENT: STRICT FOLDER NAMING CONVENTION**

> [!CAUTION]
> ### 🚨 **MANDATORY FOLDER NOTATION: `games/game-name_contributor-name/`**
> To eliminate any ambiguity, prevent collisions between similar games, and ensure accurate tracking in our **Live Leaderboard & Hall of Fame**, every contributor **MUST STRICTLY** submit their contribution inside a folder following this exact syntax:
> 
> ```text
> games/game-name_contributor-name/
> ```
> 
> ### 💡 **Examples:**
> - ✅ `games/cyber-pong_rohit/`
> - ✅ `games/quantum-2048_sneha/`
> - ✅ `games/flappy-jet_arjun/`
> - ❌ `games/pong/` *(Will NOT be accepted — ambiguous & collision prone)*
> - ❌ `games/my-game/` *(Will NOT be accepted)*
> 
> **Pull Requests not following the `game-name_contributor-name` notation will NOT be accepted and will be asked to rename.**

---

# 💻 **HOW TO RUN THIS PROJECT LOCALLY**

This project is built **purely on native web technologies (HTML, CSS, JS)**. There is **no backend, no Python app, and no heavy dependencies** needed!

---

## 🚀 **METHOD 1: INSTANT BROWSER LAUNCH (NO SERVER NEEDED)**

Directly open `index.html` in your default browser using your terminal:

### 🔹 **Windows (PowerShell / Command Prompt):**
```powershell
start chrome "$PWD\index.html"
```
*(Alternative default browser: `start index.html`)*

### 🔹 **macOS:**
```bash
open index.html
```

### 🔹 **Linux:**
```bash
xdg-open index.html
```

---

## ⚡ **METHOD 2: VS CODE LIVE SERVER EXTENSION**
If you are developing in VS Code:
1. Open the project folder in **VS Code**.
2. Right-click on **`index.html`**.
3. Click **"Open with Live Server"**.

---

## 🌐 **METHOD 3: NODE STATIC WEB SERVER (OPTIONAL)**
If you already have Node installed and want auto-reload:
```bash
npx -y live-server --port=5500
```
👉 Open: **`http://localhost:5500`**

---

# 📂 **DIRECTORY ARCHITECTURE & ISOLATION**

To prevent **merge conflicts** when dozens of contributors work at the same time, every game lives in its own isolated subfolder:

```text
ArcadeVerse/
│
├── index.html                           # 🎮 Central Arcade Station (Games Catalog, Ideas, Hall of Fame)
├── CONTRIBUTING.md                      # 📖 Full Contributor Guide & NSOC Guidelines
├── README.md                            # 🌟 Project Overview & NSOC Badges
├── LICENSE                              # 📜 Open Source MIT License & Terms
├── leaderboard.html                     # 🏆 Live Hall of Fame Leaderboard & Point Engine
├── ideas.html                           # 💡 Ideas Vault (Reference Concepts)
│
├── assets/
│   ├── css/style.css                    # Theme Stylesheet
│   └── js/
│       ├── app.js                       # Platform Engine & Filter Logic
│       ├── ideas.js                     # Idea Vault Roulette Engine
│       ├── leaderboard.js               # Live GitHub API Sync Engine
│       └── games-registry.js            # Registry where your game gets listed
│
└── games/                               # 🕹️ ALL COMMUNITY GAMES LIVE HERE
    ├── memory-matrix/                   # Starter game by Project Lead
    └── <game-name_contributor-name>/    # 🚀 YOUR ISOLATED GAME FOLDER (STRICT NOTATION)
        ├── index.html
        ├── style.css
        └── game.js
```

---

# 🚀 **HOW TO CONTRIBUTE: STEP-BY-STEP WORKFLOW**

---

### 📌 **STEP 1: FORK & CLONE**
Fork the repository on GitHub, then run in your terminal:
```bash
git clone https://github.com/<your-username>/ArcadeVerse.git
cd ArcadeVerse
git remote add upstream https://github.com/DebasmitaBose0/ArcadeVerse.git
```

---

### 📌 **STEP 2: CREATE A FEATURE BRANCH**
**Never push directly to `main`!** Create a dedicated branch matching your game notation:
```bash
git checkout -b game/game-name_contributor-name
```

---

### 📌 **STEP 3: CREATE YOUR GAME FOLDER**
Create your game's directory inside `games/` strictly following the notation:
```bash
mkdir games/game-name_contributor-name
```

Inside your folder, create pure web files:
- `index.html`
- `style.css`
- `game.js`

> 🧪 **Tip:** No external CDNs or heavy frameworks. Pure Vanilla HTML/CSS/JS only!

---

### 📌 **STEP 4: REGISTER IN `assets/js/games-registry.js`**
Open `assets/js/games-registry.js` and add your entry directly to the `GAMES_REGISTRY` array:

```javascript
{
  id: "game-name_contributor-name",
  title: "Your Game Title",
  category: "Arcade", // Arcade | Retro | Puzzle | Action
  icon: "🕹️",
  description: "A fast-paced neon arcade game where you dodge obstacles.",
  author: "Your Name",
  github: "your-github-username",
  role: "Contributor",
  path: "games/game-name_contributor-name/index.html",
  tags: ["Arcade", "NSOC26"]
}
```

---

### 📌 **STEP 5: ADD YOUR NAME TO THE CONTRIBUTORS TABLE**
Add your row to the table in this file below!

---

### 📌 **STEP 6: COMMIT, PUSH & OPEN PULL REQUEST**
```bash
git add .
git commit -m "feat(game): add <game-name> by @<your-username>"
git push origin game/game-name_contributor-name
```
Now go to GitHub and click **"Compare & Pull Request"** targeting the **`main`** branch!

---

# 🏆 **COMMUNITY CONTRIBUTORS HALL OF FAME**

All merged contributors are permanently honored below and synced in [leaderboard.html](leaderboard.html):

| # | Contributor Name | GitHub Handle | Game / Component Name | Strict Folder Path |
| :---: | :--- | :--- | :--- | :--- |
| 👑 | **Debasmita Bose (Project Admin)** | [@DebasmitaBose0](https://github.com/DebasmitaBose0) | **Quantum Memory Matrix & ArcadeCore** | `games/memory-matrix/` |
| 1 | *Your Name Here* | *@your-github* | *Your Game Title* | `games/game-name_contributor-name/` |

---

# 💡 **GAME IDEAS READY TO CLAIM (PURE HTML, CSS & JS)**

Visit the **Ideas Vault** on [ideas.html](ideas.html) or claim any of these concepts:
- 🚀 **Flappy Cyber Jet** (`games/flappy-jet_contributor/`)
- 🔢 **Quantum 2048** (`games/quantum-2048_contributor/`)
- 🏓 **Neon Cyber Pong (PvP / AI)** (`games/cyber-pong_contributor/`)
- 🏢 **Cyber Tower Stacker** (`games/tower-stacker_contributor/`)
- 🛸 **Space Invaders 2026** (`games/space-invaders_contributor/`)
- 🐛 **Whack-A-Bug Developer** (`games/whack-bug_contributor/`)
- 🔤 **Cryptic Wordle Hack** (`games/wordle-hack_contributor/`)
- 🦘 **Astro Infinite Jumper** (`games/astro-jumper_contributor/`)
- 💣 **Quantum Minesweeper** (`games/minesweeper_contributor/`)
- 🎹 **Synth-Wave Simon Says** (`games/simon-says_contributor/`)

Happy Coding & Welcome to NSOC '26! 🎉
