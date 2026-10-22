# 🌟 ArcadeVerse — Contribution & Contributor Hub (Nexus Spring Of Code – Winter Edition 2026)

> ### 👑 **PROJECT ADMIN:** **Debasmita Bose** ([@DebasmitaBose0](https://github.com/DebasmitaBose0))
> ### ❄️ **EVENT:** **Nexus Spring Of Code – Winter Edition 2026**
> ### ⚡ **TECH STACK:** **100% Pure Vanilla HTML5 + CSS3 + Modern JavaScript (NO Python, NO Frameworks, NO Bundlers)**

---

# 🎯 **ABOUT ARCADEVERSE**

ArcadeVerse is an open-source arcade gaming ecosystem crafted to offer an accessible, scalable, and conflict-free foundation where developers worldwide can build and showcase their creations.

- From beginners writing their first HTML5 canvas loop to intermediate developers building full game mechanics, every skill level has a place here.
- Our maintainer team actively reviews Pull Requests, offers constructive code reviews, and helps contributors refine their web engineering skills.
- Every contribution here is **real, meaningful, and permanent** — celebrated on our live **Hall of Fame Leaderboard**!

---

# 🎖️ **OFFICIAL CONTRIBUTOR RECOGNITION & HALL OF FAME BADGES**

ArcadeVerse features a **Balanced 2-Track Contributor Recognition System** scaled specifically for the 45-day **Nexus Spring Of Code – Winter Edition 2026** timeline. Badges are computed dynamically and showcased live on our [Hall of Fame & Leaderboard](leaderboard.html).

### 🕹️ **Track 1: Dedicated Game Creators Track** `(in the 'games' folder)`

| Tier Title | Points Required | Description |
| :--- | :---: | :--- |
| **🌱 Active Contributor** | **First Merged PR (3–5 pts)** | Getting started — first verified contribution |
| **🚀 Project Contributor** | **10+ Points** | Verified PRs, bug fixes, UI components, or first game |
| **🌟 Novice Contributor** | **25+ Points** | Consistent contributions across the codebase |
| **💎 Elite Contributor** | **50+ Points** | Major features, multiple games, and active reviews |
| **🏆 Master Contributor** | **100+ Points** | Outstanding leadership and top-tier open-source impact |

> 💡 Points are earned via merged PRs labelled `level1` (3 pts), `level2` (5 pts), or `level3` (10 pts) by the Project Admin. Each verified game integrated into `games/` counts as a Level 3 contribution (10 pts).

### 💻 **Track 2: Platform & Core Engineering Track** `(except the 'games' folder, in the codebase modification)`

| Developer Title | Requirement | Description |
| :--- | :---: | :--- |
| **🕹️ Arcade Explorer** | 1 verified game | Authored and polished their first playable game in `games/game-name_contributor-name/` |
| **🎮 Arcade Developer** | 2–4 verified games | Authored multiple polished games across arcade categories |
| **⚡ Hyper Game Developer** | 5–9 verified games | Authored diverse, high-performance web arcade games |
| **👑 Master Game Architect** | 10+ verified games | Master arcade author with top-tier game mechanics |

> 👑 **Project Lead & Architect:** **Debasmita Bose** ([@DebasmitaBose0](https://github.com/DebasmitaBose0)) holds the permanent Project Lead status and is featured in a dedicated Maintainer Spotlight.

---

# 💰 **DUAL POINT SYSTEMS: NSOC POINTS VS. IN-APP ARCADE POINTS**

To keep contributions rewarding and transparent, ArcadeVerse utilizes two distinct, complementary point systems:

### 1. 🏛️ **Official Nexus Spring Of Code (NSoC '26) Program Points**
These are the official program points recorded on the central NSoC evaluation sheet. They are awarded strictly via GitHub PR **Level labels** assigned by the Project Admin upon merging:

| PR Label | NSoC Points | Scope & Type of Work |
| :--- | :---: | :--- |
| `level1` | **3 points** | Documentation, README/guide updates, typo corrections, minor cosmetic fixes |
| `level2` | **5 points** | Frontend UI enhancements, responsive styling, navigation, component layouts |
| `level3` | **10 points** | Verified playable games in the `'games' folder`, complex game physics, core architecture |

> [!IMPORTANT]
> - The **`nsoc26` label is mandatory** on every PR.
> - **Level labels are assigned exclusively by Project Admins** based on the verified complexity and impact of the merged code.
> - A minor 10–20 line patch will not be upgraded to Level 2 or Level 3.

### 2. ⚡ **In-App Gamified Arcade Points (Live Application Scoring)**
These points power the real-time [Hall of Fame Leaderboard](leaderboard.html) rankings and dynamically synthesize your rank badges:
- **Verified Playable Game:** `+100 pts` base per conflict-free game integrated into the `'games' folder`.
- **Mechanics & Physics Bonus:** `+30 pts` for custom Canvas rendering, 60fps game loops, AI opponents, sound FX, or particle engines.
- **Platform Feature & UI Work:** `+25 pts` per merged core feature PR (except the 'games' folder, in codebase modifications).
- **Quality & Bug Fixes:** `+15 pts` baseline per merged bug fix, mobile touch control fix, or CSS enhancement.

---

# 🚀 **STEP-BY-STEP: YOUR FIRST MERGED PR**

1. **Create an issue.** Find a bug or pick an open issue, raise it, and **wait for assignment**.
2. **Issue Assignment & Submission Timeline (5-Day Target / 7-Day Auto-Unassign):**
   - **Target Deadline (5 Days):** Once an issue is assigned to you, you should submit your Pull Request within **5 days (120 hours)**. If there is no progress or PR submitted by day 5, a warning/check-in will be issued.
   - **Official NSoC Inactivity Policy (7 Days):** As per official NSoC rules, if an assigned contributor remains inactive with no PR submitted after **7 days**, the issue will automatically be unassigned and reassigned to another contributor waiting in line.
3. **Fork and clone.** Fork the repo, clone it, and add the upstream remote.
4. **Create a separate branch.** Never work directly on `main`! Create a dedicated branch per issue — e.g. `fix/issue-123` or `feat/game-name`.
5. **Code and commit.** Follow this guide, keep changes inside your dedicated folder, test thoroughly, and write clear commit messages.
6. **Open the PR.** Push, open a PR within the 5-day window, add `Closes #123` and a short summary. Include `nsoc26`.
7. **Review and merge.** Address feedback promptly. The Project Admin merges, adds labels, and your points hit the leaderboard.

**Quick commands:**
```bash
git checkout -b fix/issue-123
git commit -m "Fix #123: <short description>"
git push origin fix/issue-123
```

**Flow:** Find Issue → Wait for Assignment → Fork & Clone → Create Separate Branch → Code (Submit within 5 Days) → Test → Commit → Push → Open PR → Review → Merge ✅

---

# ⚠️ **CRITICAL: STRICT FOLDER NAMING & DIRECTORY RULES**

> [!CAUTION]
> ### 🚨 **1. NO FILES IN ROOT / HOME DIRECTORY**
> **Do NOT create, add, or dump loose files directly in the repository root / home directory.**
> Any PR that introduces files directly in the root directory will be **rejected immediately**.
>
> ---
>
> ### 🚨 **2. ALL SITE CHANGES, UI IMPROVEMENTS, ENHANCEMENTS & BUG FIXES**
> For **ANY** type of contribution — including feature enhancements, bug fixes, UI/UX improvements, or any modifications across the site:
> - You **MUST** create a dedicated folder under `ArcadeVerse/` following this format:
>   ```text
>   <folder-name>-<your-name>/
>   ```
> - Keep all your respective assets, components, stylesheets, scripts, and documentation inside that dedicated folder.
> - **Example:** `navbar-redesign-rohit/`, `leaderboard-ui-sneha/`, `dark-mode-toggle-arjun/`
>
> ---
>
> ### 🚨 **3. GAME SUBMISSIONS: `games/game-name_contributor-name/`**
> Every game submission **MUST** be placed inside a dedicated subfolder in `games/` following this exact syntax:
>
> ```text
> games/game-name_contributor-name/
> ```
>
> **Examples:**
> - ✅ `games/cyber-pong_rohit/`
> - ✅ `games/quantum-2048_sneha/`
> - ✅ `games/flappy-jet_arjun/`
> - ❌ `games/pong/` *(ambiguous & collision-prone — will NOT be accepted)*
> - ❌ `games/my-game/` *(will NOT be accepted)*
>
> **Pull Requests not following these folder conventions will be closed and asked to reorganize.**

---

# 💻 **HOW TO RUN THIS PROJECT LOCALLY**

This project is **100% native web tech** — no backend, no Python app, no heavy dependencies!

### 🔹 Method 1: Instant Browser Launch (Recommended)

**Windows:**
```powershell
start chrome "$PWD\index.html"
```
**macOS:**
```bash
open index.html
```
**Linux:**
```bash
xdg-open index.html
```

### 🔹 Method 2: VS Code Live Server
1. Open the project folder in **VS Code**
2. Right-click `index.html` → **"Open with Live Server"**

### 🔹 Method 3: Node Static Server (Optional)
```bash
npx -y live-server --port=5500
```
Open: `http://localhost:5500`

---

# 📂 **DIRECTORY ARCHITECTURE**

```text
ArcadeVerse/
│
├── index.html                           # 🎮 Central Arcade Station
├── CONTRIBUTING.md                      # 📖 This Guide
├── README.md                            # 🌟 Project Overview
├── LICENSE                              # 📜 MIT License
├── leaderboard.html                     # 🏆 Live Hall of Fame Leaderboard
├── ideas.html                           # 💡 Ideas Vault
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
    └── <game-name_contributor-name>/    # 🚀 YOUR ISOLATED GAME FOLDER
        ├── index.html
        ├── style.css
        └── game.js
```

---

# 📋 **HOW TO CONTRIBUTE: STEP-BY-STEP WORKFLOW**

### 📌 STEP 1: FORK & CLONE
```bash
git clone https://github.com/<your-username>/ArcadeVerse.git
cd ArcadeVerse
git remote add upstream https://github.com/DebasmitaBose0/ArcadeVerse.git
```

### 📌 STEP 2: CREATE A FEATURE BRANCH
**Never push directly to `main`!**
```bash
git checkout -b game/game-name_your-username
```

### 📌 STEP 3: CREATE YOUR GAME FOLDER
```bash
mkdir games/game-name_your-username
```
Inside your folder, create:
- `index.html`
- `style.css`
- `game.js`

> 🧪 **Tip:** No external CDNs or frameworks. Pure Vanilla HTML/CSS/JS only!

### 📌 STEP 4: REGISTER IN `assets/js/games-registry.js`
Add your entry to the `GAMES_REGISTRY` array:
```javascript
{
  id: "game-name_your-username",
  title: "Your Game Title",
  category: "Arcade", // Valid: Arcade | Puzzle | Action | Retro | Strategy | Rhythm
  icon: "🕹️",
  difficulty: "Beginner", // Beginner | Intermediate | Advanced
  releaseDate: "2026-10-21",
  description: "Short description of your game.",
  author: "Your Name",
  github: "your-github-username",
  role: "Contributor",
  path: "games/game-name_your-username/index.html",
  tags: ["Arcade", "NSOC26"],
  stars: 10,
  featured: false
}
```

### 📌 STEP 5: ADD YOUR NAME TO THE CONTRIBUTORS TABLE
Add your row to the Hall of Fame table below!

### 📌 STEP 6: COMMIT, PUSH & OPEN PULL REQUEST
```bash
git add .
git commit -m "feat(game): add <game-name> by @<your-username>"
git push origin game/game-name_your-username
```
Go to GitHub → click **"Compare & Pull Request"** targeting `main`.
- Add `Closes #<issue-number>` in the PR description
- Add the `nsoc26` label — **mandatory!**

---

# 👤 **CONTRIBUTOR RESPONSIBILITIES**

- Read this contributing guide **before** you start coding.
- **Wait for assignment** before you start working on an issue.
- **Target 5-Day Submission Timeline:** Submit your Pull Request within **5 days (120 hours)** of getting assigned. In accordance with official NSoC rules, after **7 days** of total inactivity without a PR, the issue will be automatically unassigned and reassigned to another contributor waiting in line.
- **Always use a separate branch:** Create a dedicated branch for every issue. Never push or PR directly from `main`.
- Keep PRs **small, focused, and linked** to a single issue.
- Respond to review feedback **promptly**.
- Be **respectful and professional** with admins and fellow contributors.
- You may work on **2 or more issues** — there is no upper limit.

---

# 🚫 **RULES — WHAT IS NOT ALLOWED**

> [!CAUTION]
> The following are **strictly prohibited** and will result in PR rejection or disqualification:
>
> - ❌ **Loose files in the home/root directory** — creating or dumping any files directly in the root directory
> - ❌ **Non-compliant folder paths** — all enhancements/UI/bug fixes must be inside `<folder-name>-<your-name>/` (and game submissions inside `games/<game-name>_<contributor-name>/` within the `'games' folder`)
> - ❌ **Exceeding the 7-day inactivity threshold** without opening a PR or communicating progress
> - ❌ **Working directly on the `main` branch** — contributions must come from a separate feature/fix branch
> - ❌ **Fake PRs** or meaningless contributions
> - ❌ **Bulk PRs** submitted all at once
> - ❌ **AI-generated spam** — unverified, broken AI dump code without manual testing
> - ❌ **PRs without an assigned issue** — these will be closed immediately
> - ❌ **Frameworks or heavy dependencies** — React, Vue, Angular, jQuery, Python backends are NOT allowed
> - ❌ **Malicious code** — cryptominers, tracking scripts, harmful iframes, or unescaped XSS injections
> - ❌ **Tiny changes presented as bigger work** — a 10–20 line edit will not be accepted as Level 2/3
> - ❌ **Multiple PRs from one shared branch** for the same issue

---

# 📜 **COMMUNITY HEALTH, CODE OF CONDUCT & SECURITY**

ArcadeVerse is committed to providing a safe, welcoming, and inclusive community for all contributors:
- **Code of Conduct:** All participants must abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Harassment, disrespect, plagiarism, or manipulative behavior will lead to disqualification.
- **Security Policy:** Review our [Security Policy](SECURITY.md) for vulnerability reporting guidelines and client-side web security best practices.
- **License Agreement:** All contributions are subject to the permissive open-source terms of the [MIT License](LICENSE).

---

# ⚖️ **ENFORCEMENT**

> [!WARNING]
> - **First violation** (spam, low quality, improper practices): your points are normalized and deducted.
> - **Repeat violation:** direct disqualification with no further warning. Severe violations may lead to a permanent ban.
> - **Cheating** (self-controlled project manipulation, fake contributions, manipulating activity): **immediate permanent ban**. No warnings, no second chances, no appeals once evidence is verified.
> - **Report violations** with proper proof — verified reports may be rewarded with **Grace Points**.

---

# ✅ **QUICK CHECKLIST — BEFORE YOU OPEN A PR**

Before submitting, make sure every box is checked:

- [ ] The issue was officially assigned to me
- [ ] I am submitting this PR **within the 5-day target window** (and well before the 7-day NSoC inactivity limit)
- [ ] I created and worked on a **separate branch** (not `main`)
- [ ] I have read this contributing guide and the [Code of Conduct](CODE_OF_CONDUCT.md)
- [ ] My change is meaningful, tested, and written by me (100% Vanilla JS/HTML/CSS)
- [ ] **No files were created directly in the home/root directory**
- [ ] All site updates, enhancements, or bug fixes are organized inside `<folder-name>-<your-name>/`
- [ ] Games are strictly inside `games/game-name_contributor-name/` *(for game submissions)*
- [ ] Entry added to `assets/js/games-registry.js` *(for game submissions)*
- [ ] The PR says `Closes #issue-number` with a short summary
- [ ] The PR includes the `nsoc26` tag
- [ ] I am not submitting multiple PRs at once

---

# 🏆 **COMMUNITY CONTRIBUTORS HALL OF FAME**

All merged contributors are permanently honored below and synced in [leaderboard.html](leaderboard.html):

| # | Contributor Name | GitHub Handle | Game / Component Name | Strict Folder Path |
| :---: | :--- | :--- | :--- | :--- |
| 👑 | **Debasmita Bose (Project Admin)** | [@DebasmitaBose0](https://github.com/DebasmitaBose0) | **Quantum Memory Matrix & Cyber Neon Pong** | `games/memory-matrix/`, `games/gamesbydb/` |
| 1 | **Babin Bid** | [@Babin123456](https://github.com/Babin123456) | **Quantum 2048** | `games/quantum-2048_babin/` |
| 2 | *Your Name Here* | *@your-github* | *Your Game Title* | `games/game-name_contributor-name/` |

---

# 💡 **GAME IDEAS READY TO CLAIM**

Visit the **[Ideas Vault](ideas.html)** or claim any of these concepts:
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

Happy Coding & Welcome to **Nexus Spring Of Code – Winter Edition 2026**! 🎉
