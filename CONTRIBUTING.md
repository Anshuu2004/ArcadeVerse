# 🌟 ArcadeVerse — Contribution & Contributor Hub (NSOC '26)

> ### 👑 **PROJECT ADMIN:** **Debasmita** ([@debasmita-admin](https://github.com))  
> ### ❄️ **EVENT:** **NSOC (Winter Edition 2026)**  
> ### ⚡ **TECH STACK:** **100% Pure Vanilla HTML5 + CSS3 + Modern JavaScript (NO Python, NO Frameworks, NO Bundlers)**  

---

# 💻 **HOW TO RUN THIS PROJECT LOCALLY**

This project is built **purely on native web technologies (HTML, CSS, JS)**. There is **no backend, no Python app, and no heavy dependencies** needed!

---

## 🚀 **METHOD 1: INSTANT BROWSER LAUNCH (NO SERVER NEEDED)**

Directly open `index.html` in your default browser using your terminal:

### 🔹 **Windows (PowerShell / Command Prompt):**
```powershell
start index.html
```

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
├── index.html                 # 🎮 Central Arcade Station (Sandbox, Ideas, PR Generator)
├── CONTRIBUTING.md            # 📖 Full Contributor Guide, Run Commands & Hall of Fame
├── README.md                  # 🌟 Project Overview & NSOC Badges
│
├── assets/
│   ├── css/style.css          # Cyberpunk Theme Stylesheet
│   └── js/
│       ├── app.js             # Platform Engine & Sandbox Logic
│       └── games-registry.js  # Registry where your game gets listed
│
└── games/                     # 🕹️ ALL COMMUNITY GAMES LIVE HERE
    ├── memory-matrix/         # Reference starter game (HTML/CSS/JS)
    └── <your-game-folder>/    # 🚀 YOUR NEW GAME FOLDER GOES HERE!
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
git clone https://github.com/<your-username>/NSOC.git
cd NSOC
git remote add upstream https://github.com/debasmita-admin/NSOC.git
```

---

### 📌 **STEP 2: CREATE A FEATURE BRANCH**
**Never push directly to `main`!** Create a dedicated branch:
```bash
git checkout -b game/my-awesome-game
```

---

### 📌 **STEP 3: CREATE YOUR GAME FOLDER**
Create your game's directory inside `games/`:
```bash
mkdir games/<my-awesome-game>
```

> ### ⚠️ **CRITICAL RULE FOR MULTIPLE CONTRIBUTORS BUILDING THE SAME GAME:**
> If another contributor has already created a game of the same category (e.g. `snake` or `pong`), you are still **100% WELCOME** to create your own unique version!  
> **Just append your name/handle to the folder name:**
> - `games/snake-rahul/`
> - `games/snake-anita/`
> - `games/pong-alex/`
> *This ensures zero git conflicts and gives everyone full credit!*

Inside your game folder, create pure web files:
- `index.html`
- `style.css`
- `game.js`

> 🧪 **Pro-Tip:** You can test your code live using the **In-Browser Sandbox** on the ArcadeVerse homepage before committing!

---

### 📌 **STEP 4: REGISTER IN `assets/js/games-registry.js`**
Open `assets/js/games-registry.js` (or use the **PR Snippet Generator** on the homepage) and add your entry:

```javascript
{
  id: "my-awesome-game",
  title: "My Awesome Game",
  category: "Arcade", // Arcade | Retro | Puzzle | Action
  icon: "🕹️",
  description: "A fast-paced neon arcade game where you dodge energy obstacles.",
  author: "YourName",
  github: "your-github-username",
  role: "Contributor",
  path: "games/my-awesome-game/index.html",
  tags: ["Arcade", "NSOC26"]
}
```

---

### 📌 **STEP 5: ADD YOUR NAME TO THE HALL OF FAME TABLE**
Scroll down to the **🏆 COMMUNITY CONTRIBUTORS HALL OF FAME** table below and add your row!

---

### 📌 **STEP 6: COMMIT, PUSH & OPEN PULL REQUEST**
```bash
git add .
git commit -m "feat(game): add <my-awesome-game> by @<your-username>"
git push origin game/my-awesome-game
```
Now go to the repository on GitHub and click **"Compare & Pull Request"** targeting the **`main`** branch!

---

# 🏆 **COMMUNITY CONTRIBUTORS HALL OF FAME**

All merged contributors are permanently honored below:

| # | Contributor Name | GitHub Handle | Game / Component Name | Folder Path |
| :---: | :--- | :--- | :--- | :--- |
| 👑 | **Debasmita (Project Admin)** | [@debasmita-admin](https://github.com) | **Quantum Memory Matrix & ArcadeCore** | `games/memory-matrix/` |
| 1 | *Your Name Here* | *@your-github* | *Your Game Title* | `games/<your-game>/` |

---

# 💡 **GAME IDEAS READY TO CLAIM (PURE HTML, CSS & JS)**

Need inspiration? Visit the **Idea Roulette** on the ArcadeVerse homepage or claim any of these concepts:
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

Happy Coding & Welcome to NSOC '26! 🎉
