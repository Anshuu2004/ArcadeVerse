# 🤝 ArcadeVerse Contribution Guidelines (NSOC '26)

Welcome to **ArcadeVerse**! As part of **NSOC Winter Edition 2026**, this project is built to invite developers of all skill levels to contribute engaging mini-games built with pure **HTML5, CSS3, and JavaScript**.

---

## 👑 Project Administration
- **Project Admin**: Debasmita (@debasmita-admin)
- **Event**: NSOC (Winter Edition 2026)
- **Tech Stack Constraint**: Pure Vanilla Web (HTML, CSS, JS). No heavyweight JS frameworks (React, Angular, Vue) or bundlers needed!

---

## 📂 Architecture & Directory Isolation
To guarantee **zero merge conflicts** and enable simultaneous contributions from hundreds of developers:
```text
ArcadeVerse/
│
├── index.html                 # Main Arcade Hub
├── CONTRIBUTING.md            # You are here!
├── CONTRIBUTORS.md            # Contributor directory & Hall of Fame registry
│
├── assets/
│   ├── css/style.css          # Main hub styling
│   └── js/
│       ├── app.js             # Hub launcher engine & filter
│       └── games-registry.js  # Registry where your game gets listed
│
└── games/                     # 🎮 ALL COMMUNITY GAMES LIVE HERE
    ├── cyber-snake/           # Example game 1
    ├── galaxy-brick-breaker/  # Example game 2
    ├── memory-matrix/         # Example game 3
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
Always create an isolated branch for your game or bug fix:
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
   > - `games/tetris-neon/`

2. Inside your folder, include:
   - `index.html`
   - `style.css`
   - `game.js` (or inline if small)
   - Any local assets/images/audio in an `assets/` subfolder inside your game folder.

### Step 4: Register in `assets/js/games-registry.js`
Open `assets/js/games-registry.js` and append your game configuration to `GAMES_REGISTRY`:
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
Looking for game concepts? Here are some top choices that are easy to build with HTML5 Canvas / DOM:
- **Flappy Bird Clone** (`flappy-cyber`)
- **2048 Game** (`quantum-2048`)
- **Pong (PvP or vs AI)** (`neon-pong`)
- **Tower Blocks / Stacker** (`cyber-stacker`)
- **Space Invaders** (`galaxy-invaders`)
- **Whack-a-Mole** (`whack-a-bug`)
- **Wordle / Word Guessing** (`cryptic-words`)
- **Doodle Jump / Infinite Jumper** (`astro-jump`)
- **Minesweeper** (`quantum-minesweeper`)
- **Simon Says / Audio Sequence** (`synth-says`)

Happy Coding & Welcome to NSOC '26! 🎉
