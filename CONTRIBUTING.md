# 🤝 ArcadeVerse Contribution Guidelines (NSOC '26)

Welcome to **ArcadeVerse**! As part of **NSOC Winter Edition 2026**, this project is built to invite developers of all skill levels to contribute engaging mini-games built with pure **HTML5, CSS3, and JavaScript**.

---

## 👑 Project Administration
- **Project Admin**: Debasmita (@debasmita-admin)
- **Event**: NSOC (Winter Edition 2026)
- **Tech Stack Constraint**: Pure Vanilla Web (HTML, CSS, JS). No heavyweight JS frameworks (React, Angular, Vue) or bundlers needed!

---

## 💻 How to Run the Project Locally

Because ArcadeVerse is built with zero heavyweight dependencies, you do not need to install `npm` packages or configure complex build tools. You can launch and test the platform locally using any of the following methods:

### Method 1: Using Python's Built-in HTTP Server (Recommended)
If you have Python installed, open your terminal inside the project root directory and run:

**Python 3:**
```bash
python -m http.server 8000
```

**Python 2 (if applicable):**
```bash
python -m SimpleHTTPServer 8000
```
Then open your browser and navigate to:
👉 `http://localhost:8000`

---

### Method 2: Using Node.js `npx serve` or `live-server`
If you have Node.js installed, you can launch a local static server instantly without installing global dependencies:

```bash
# Using npx serve:
npx -y serve .

# Or using live-server (auto-reloads on file changes):
npx -y live-server --port=5500
```
Then visit the URL displayed in your terminal (usually `http://localhost:3000` or `http://localhost:5500`).

---

### Method 3: Using VS Code Live Server Extension
1. Install the **Live Server** extension (by Ritwick Dey) in VS Code.
2. Right-click on `index.html`.
3. Select **"Open with Live Server"**.

---

### Method 4: Direct Browser Launch
You can also directly double-click the `index.html` file or run:
- **Windows (Command Prompt / PowerShell):**
  ```powershell
  start index.html
  ```
- **macOS:**
  ```bash
  open index.html
  ```
- **Linux:**
  ```bash
  xdg-open index.html
  ```

---

## 📂 Architecture & Directory Isolation
To guarantee **zero merge conflicts** and enable simultaneous contributions from hundreds of developers:
```text
ArcadeVerse/
│
├── index.html                 # Main Arcade Hub (Sandbox, Ideas, PR Generator)
├── CONTRIBUTING.md            # Contributor & Run Guidelines
├── CONTRIBUTORS.md            # Contributor directory & Hall of Fame
├── README.md                  # Project overview & NSOC details
│
├── assets/
│   ├── css/style.css          # Main hub styling
│   └── js/
│       ├── app.js             # Hub launcher engine & sandbox engine
│       └── games-registry.js  # Registry where your game gets listed
│
└── games/                     # 🎮 ALL COMMUNITY GAMES LIVE HERE
    ├── memory-matrix/         # Reference starter game
    └── <your-game-folder>/    # YOUR NEW GAME FOLDER
        ├── index.html
        ├── style.css
        └── game.js
```

---

## 🚀 How to Contribute: Step-by-Step

### Step 1: Fork & Clone
1. Fork the repository to your own GitHub account.
2. Clone your fork locally:
   ```bash
   git clone https://github.com/<your-username>/NSOC.git
   cd NSOC
   ```
3. Set the upstream remote:
   ```bash
   git remote add upstream https://github.com/debasmita-admin/NSOC.git
   ```

### Step 2: Create a Feature Branch
Always create an isolated branch for your game or enhancement:
```bash
git checkout -b game/my-awesome-game
```

### Step 3: Build Your Game
1. Create a dedicated folder inside `games/`:
   ```bash
   mkdir games/<my-awesome-game>
   ```
   > ⚠️ **Important Multi-Contributor Rule**:
   > If someone already built a game of that category (e.g. `snake`), you can still build your version! Simply append your handle or unique variation name:
   > - `games/snake-rahul/`
   > - `games/snake-3d-anita/`
   > - `games/pong-alex/`

2. Inside your folder, include:
   - `index.html`
   - `style.css`
   - `game.js`
   - Any local assets in an `assets/` subfolder inside your game directory.

> 💡 **Tip**: You can test your HTML, CSS, and JS code in real-time using the **Live Game Tester Sandbox** section on the ArcadeVerse homepage!

### Step 4: Register in `assets/js/games-registry.js`
Open `assets/js/games-registry.js` or use our homepage **Automated PR Generator** to add your game entry:
```javascript
{
  id: "my-awesome-game",
  title: "My Awesome Game",
  category: "Arcade", // Arcade | Retro | Puzzle | Action
  icon: "🕹️",
  description: "A fun fast-paced arcade game where you dodge obstacles.",
  author: "YourName",
  github: "your-github-username",
  role: "Contributor",
  path: "games/my-awesome-game/index.html",
  tags: ["Casual", "Fast", "Neon"]
}
```

### Step 5: Sign `CONTRIBUTORS.md`
Add your details to the table in [CONTRIBUTORS.md](file:///c:/Users/Debasmita/Desktop/NSOC/CONTRIBUTORS.md).

### Step 6: Commit and Push
```bash
git add .
git commit -m "feat(game): add <my-awesome-game> by @<your-username>"
git push origin game/my-awesome-game
```

### Step 7: Open a Pull Request (PR)
- Go to the original repository.
- Click **New Pull Request**.
- Base branch: `main` ⬅ Compare branch: `game/my-awesome-game`.
- Provide a short screenshot or description in the PR template.
- Our project admin **Debasmita** will review and merge!

---

## 💡 Ideas for New Games
Looking for game concepts? Visit the **Idea Roulette & Vault** on the homepage or pick one from below:
- **Flappy Cyber Jet** (`games/flappy-cyber/`)
- **Quantum 2048** (`games/quantum-2048/`)
- **Neon Cyber Pong (PvP / AI)** (`games/neon-pong/`)
- **Cyber Tower Stacker** (`games/cyber-stacker/`)
- **Space Invaders 2026** (`games/galaxy-invaders/`)
- **Whack-A-Bug Developer** (`games/whack-a-bug/`)
- **Cryptic Wordle Hack** (`games/cryptic-words/`)
- **Astro Infinite Jumper** (`games/astro-jump/`)
- **Quantum Minesweeper** (`games/quantum-minesweeper/`)
- **Synth-Wave Simon Says** (`games/synth-says/`)

Happy Coding & Welcome to NSOC '26! 🎉
