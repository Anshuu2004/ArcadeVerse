# 🌟 ArcadeVerse — Contribution & Contributor Hub (Nexus Spring Of Code – Winter Edition 2026)

> - 👑 **Project Admin:** **Debasmita Bose** ([@DebasmitaBose0](https://github.com/DebasmitaBose0))
> - ❄️ **Event:** **Nexus Spring Of Code – Winter Edition 2026**
> - ⚡ **Tech Stack:** **100% Pure Vanilla HTML5 + CSS3 + Modern JavaScript (NO Python, NO Frameworks, NO Bundlers)**

---

## 🎯 About ArcadeVerse

ArcadeVerse is an open-source arcade gaming ecosystem crafted to offer an accessible, scalable, and conflict-free foundation where developers worldwide can build and showcase their creations.

- From beginners writing their first HTML5 canvas loop to intermediate developers building full game mechanics, every skill level has a place here.
- Our maintainer team actively reviews Pull Requests, offers constructive code reviews, and helps contributors refine their web engineering skills.
- Every contribution here is **real, meaningful, and permanent** — celebrated on our live **Hall of Fame Leaderboard**!

---

## 🎖️ Official Contributor Recognition & Hall of Fame Badges

ArcadeVerse features a **Balanced 2-Track Contributor Recognition System** scaled specifically for the 45-day **Nexus Spring Of Code – Winter Edition 2026** timeline. Badges are computed dynamically and showcased live on our [Hall of Fame & Leaderboard](leaderboard.html).

### 🕹️ Track 1: Dedicated Game Creators Track `(in the 'games' folder)`

| Developer Title | Requirement | Description |
| :--- | :---: | :--- |
| **🕹️ Arcade Explorer** | **1–3 verified games** | Authored and integrated their first playable game in `games/game-name_contributor-name/` |
| **🎮 Arcade Developer** | **4–7 verified games** | Authored multiple polished games across arcade categories |
| **⚡ Hyper Game Developer** | **8–14 verified games** | Authored diverse, high-performance web arcade games |
| **👑 Master Game Architect** | **15+ verified games** | Master arcade author with top-tier game mechanics |

### 💻 Track 2: Platform & Universal Engineering Track `(Codebase & Core Modifications)`

| Tier Title | In-App Points Required | Description |
| :--- | :---: | :--- |
| **🌱 Active Contributor** | **15–99 Points** | Getting started — first verified bug fix, touch control, or documentation PR |
| **⚡ Platform Contributor** | **100–249 Points** | Consistent contributions — UI portals, search/filter engines, or game integration |
| **💎 Elite Contributor** | **250–749 Points** | Major platform features, multiple games, and active commit development |
| **🛡️ Master Core Architect** | **750+ Points** | Outstanding architectural leadership, core platform engines, and top-tier impact |

> 👑 **Project Lead & Architect:** **Debasmita Bose** ([@DebasmitaBose0](https://github.com/DebasmitaBose0)) holds the permanent Project Lead status.
>
> 🔄 **Live Leaderboard Caching & Sync:** Leaderboard rankings are calculated dynamically using verified GitHub commits, games count, and files added. To prevent GitHub API rate limits, responses are cached in `localStorage` with a 30-minute TTL.

---

## 💰 Dual Point Systems: NSoC Points vs. In-App Arcade Points

To keep contributions rewarding and transparent, ArcadeVerse utilizes two distinct, complementary point systems that must not be confused:

### 1. 🏛️ Official Nexus Spring Of Code (NSoC '26) Program Points

These are the official program points recorded on the central NSoC evaluation sheet. They are awarded strictly via GitHub PR **Level labels** assigned by the Project Admin upon merging:

| PR Label | NSoC Points | Scope & Type of Work |
| :--- | :---: | :--- |
| `level1` | **3 points** | Documentation, README/guide updates, typo corrections, minor cosmetic fixes |
| `level2` | **5 points** | Frontend UI enhancements, responsive styling, navigation, component layouts |
| `level3` | **10 points** | Verified playable games in the `'games' folder`, complex game physics, core architecture |

> [!IMPORTANT]
>
> - The **`nsoc26` label is mandatory** on every PR.
> - **Level labels are assigned exclusively by Project Admins** based on the verified complexity and impact of the merged code.
> - A minor patch will not be upgraded to Level 2 or Level 3.

### 2. ⚡ In-App Gamified Arcade Points (Live Application Scoring)

These points power the real-time [Hall of Fame Leaderboard](leaderboard.html) rankings and dynamically synthesize your rank badges. This universal formula scores all types of contributions:

$$\mathbf{Arcade\ Score} = (\text{Games} \times 100) + (\text{Mechanics} \times 25) + (\text{Features} \times 50) + (\text{Fixes} \times 25) + (\mathbf{Commits} \times \mathbf{5})$$

- 🎮 **Verified Standalone Game:** `+100 pts` base per playable game integrated in `games/`
- ⚡ **Mechanics & Physics Bonus:** `+25 pts` for custom Canvas rendering, 60fps loops, sound FX, physics, or touch controls
- 🚀 **Platform Feature PR:** `+50 pts` per merged feature/UI PR (portals, dev tools, engines, navigation)
- 🛠️ **Quality & Bug Fix PR:** `+25 pts` per merged bug fix, responsive styling, or documentation enhancement
- 📦 **Merged Git Commits:** `+5 pts` per verified commit (rewards sustained, iterative code development)

---

## 🚀 Step-by-Step: Your First Merged PR

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

## ⚠️ Critical: Strict Folder Naming & Directory Rules

> [!CAUTION]
>
> **🚨 1. GAME CREATION FILE & ICON REQUIREMENTS (MOST IMPORTANT)**
>
> When any contributor creates a game folder under `games/<game-name_contributor-name>/` and uploads their game:
> - **Only HTML, CSS, and JS files are allowed:** No other files except `index.html`, `style.css`, `game.js`, and an optional `README.md` are required or permitted. Do NOT include binaries, images, audio files, zip archives, or heavy external assets.
> - **Use Icons ONLY (NO Emojis):** Instead of emojis, **only SVG or Lucide icons must be used** across your game interface, buttons, and status displays. Emojis render inconsistently across operating systems and are strictly prohibited.
>
> ---
>
> **🚨 2. DO NOT TOUCH `index.html` OR ROOT MAIN CODEBASE FILES (MERGE CONFLICT PREVENTION)**
>
> **Contributors must NEVER edit or modify `index.html` (or other shared root files like `ideas.html`, `leaderboard.html`) in their Pull Requests!**
> - When multiple contributors edit `index.html` simultaneously to link their games or script tags, severe merge conflicts occur on every PR.
> - **Zero need to touch `index.html`:** Keep your entire contribution strictly within your dedicated folder (`games/<game-name_contributor-name>/` or `<feature-name>-<your-name>/`).
> - **Admin handles integration:** After your game or feature passes verification and code review, the **Project Admin (Debasmita Bose) will personally link and redirect your game inside `index.html`**.
> - Any PR that modifies `index.html` unnecessarily will be requested to revert changes to `index.html` before merge.
>
> ---
>
> **🚨 3. NO FILES IN ROOT / HOME DIRECTORY**
>
> **Do NOT create, add, or dump loose files directly in the repository root / home directory.**
> Any PR that introduces files directly in the root directory will be **rejected immediately**.
>
> ---
>
> **🚨 4. ALL SITE CHANGES, UI IMPROVEMENTS, ENHANCEMENTS & BUG FIXES**
>
> For **ANY** type of contribution — including feature enhancements, bug fixes, UI/UX improvements, or any modifications across the site:
>
> - You **MUST** create a dedicated folder under `ArcadeVerse/` following this format:
>
>   ```text
>   <folder-name>-<your-name>/
>   ```
>
> - Keep all your respective assets, components, stylesheets, scripts, and documentation inside that dedicated folder.
> - **Example:** `navbar-redesign-rohit/`, `leaderboard-ui-sneha/`, `dark-mode-toggle-arjun/`
>
> ---
>
> **🚨 5. GAME SUBMISSIONS: `games/game-name_contributor-name/`**
>
> Every game submission **MUST** be placed inside a dedicated subfolder in `games/` following this exact syntax:
>
> ```text
> games/game-name_contributor-name/
> ```
>
> **Examples:**
>
> - ✅ `games/cyber-pong_rohit/`
> - ✅ `games/quantum-2048_sneha/`
> - ✅ `games/flappy-jet_arjun/`
> - ❌ `games/pong/` *(ambiguous & collision-prone — will NOT be accepted)*
> - ❌ `games/my-game/` *(will NOT be accepted)*
>
> 💡 **Review Requirement for Project Admin (PA):**
> Every game must include a built-in **"How to Play / Controls & Rules"** screen or modal so the Project Admin can easily test, verify, and grade game mechanics during PR reviews.
>
> **Pull Requests not following these folder conventions will be closed and asked to reorganize.**

---

## 💻 How to Run This Project Locally

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

## 📂 Directory Architecture

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
    ├── memory-matrix_debasmita/         # Starter puzzle game by Project Lead
    ├── cyber-neon-pong_debasmita/       # Starter canvas pong by Project Lead
    ├── flappy-jet_mistu7debnath/        # Cyber jet game by community
    ├── quantum-2048_babin/              # Synthesis puzzle by community
    └── <game-name_contributor-name>/    # 🚀 YOUR ISOLATED GAME FOLDER
        ├── index.html
        ├── style.css
        └── game.js
```

---

## 📋 How to Contribute: Step-by-Step Workflow

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

Inside your folder, create **ONLY** these files (no other file formats, binaries, or assets permitted):

- `index.html` (Use SVG or Lucide icons only — **NO emojis**)
- `style.css`
- `game.js`
- `README.md` (Optional: technical architecture & overview)

> ⚠️ **STRICT FILE & ICON RESTRICTIONS:**
> - **No other files allowed:** Do NOT include extra asset files (PNG/JPG images, MP3 audio, zip archives, or subfolders). Only `index.html`, `style.css`, and `game.js` are required.
> - **Icons Only (NO Emojis):** Instead of emojis, use clean SVG or Lucide icons throughout your UI, HUD, and buttons. Emojis are strictly disallowed.

> 🎮 **MANDATORY IN-GAME GUIDELINES & CONTROLS:**
> Every submitted game **MUST provide clear, visible in-game "How to Play / Game Guidelines"** (via a modal, start screen overlay, or instructions drawer).
> This allows the **Project Admin (PA)** and community players to immediately understand:
>
> 1. **Controls:** Keyboard keys (e.g. WASD / Arrow keys / Spacebar), mouse clicks, or touch swipe gestures.
> 2. **Game Objective & Rules:** What the player needs to accomplish to win or survive.
> 3. **Scoring System:** How points/combos are earned and recorded.
> 4. **Restart & Pause Controls:** How to restart or pause the game.
>
> *Submissions without clear in-game instructions or controls documentation will be asked to add them before approval.*
>
> 🧪 **Tip:** No external CDNs or frameworks. Pure Vanilla HTML/CSS/JS only!

### 📌 STEP 4: REGISTER IN `assets/js/games-registry.js`
> 💡 **Quick Tip:** Use our interactive **[Pre-Flight Validator Tool](submission-validator-babin/validator.html)** to automatically test your folder syntax and generate a valid JSON snippet!

Add your entry to the `GAMES_REGISTRY` array:

```javascript
{
  id: "game-name_your-username",
  title: "Your Game Title",
  category: "Arcade", // Valid: Arcade | Puzzle | Action | Retro | Strategy | Rhythm
  lucideIcon: "gamepad-2", // Valid Lucide icon name (e.g. gamepad-2, puzzle, rocket, atom)
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

Add or update your contributor entry in `CONTRIBUTORS_REGISTRY` in `assets/js/games-registry.js` with your name, GitHub handle, and game.

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

## 👤 Contributor Responsibilities

- Read this contributing guide **before** you start coding.
- **Wait for assignment** before you start working on an issue.
- **Target 5-Day Submission Timeline:** Submit your Pull Request within **5 days (120 hours)** of getting assigned. In accordance with official NSoC rules, after **7 days** of total inactivity without a PR, the issue will be automatically unassigned and reassigned to another contributor waiting in line.
- **Always use a separate branch:** Create a dedicated branch for every issue. Never push or PR directly from `main`.
- Keep PRs **small, focused, and linked** to a single issue.
- Respond to review feedback **promptly**.
- Be **respectful and professional** with admins and fellow contributors.
- You may work on **2 or more issues** — there is no upper limit.

---

## 🚫 Rules — What is Not Allowed

> [!CAUTION]
> The following are **strictly prohibited** and will result in PR rejection or disqualification:
>
> - ❌ **Modifying `index.html` or root core files** — contributors must NOT edit `index.html`, `ideas.html`, or `leaderboard.html`. The Project Admin will personally link/redirect verified games upon merging.
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

## 📜 Community Health, Code of Conduct & Security

ArcadeVerse is committed to providing a safe, welcoming, and inclusive community for all contributors:

- **Code of Conduct:** All participants must abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Harassment, disrespect, plagiarism, or manipulative behavior will lead to disqualification.
- **Security Policy:** Review our [Security Policy](SECURITY.md) for vulnerability reporting guidelines and client-side web security best practices.
- **License Agreement:** All contributions are subject to the permissive open-source terms of the [MIT License](LICENSE).

---

## ⚖️ Enforcement

> [!WARNING]
>
> - **First violation** (spam, low quality, improper practices): your points are normalized and deducted.
> - **Repeat violation:** direct disqualification with no further warning. Severe violations may lead to a permanent ban.
> - **Cheating** (self-controlled project manipulation, fake contributions, manipulating activity): **immediate permanent ban**. No warnings, no second chances, no appeals once evidence is verified.
> - **Report violations** with proper proof — verified reports may be rewarded with **Grace Points**.

---

## ✅ Quick Checklist — Before You Open a PR

Before submitting, make sure every box is checked:

- [ ] The issue was officially assigned to me
- [ ] I am submitting this PR **within the 5-day target window** (and well before the 7-day NSoC inactivity limit)
- [ ] I created and worked on a **separate branch** (not `main`)
- [ ] I have read this contributing guide and the [Code of Conduct](CODE_OF_CONDUCT.md)
- [ ] My change is meaningful, tested, and written by me (100% Vanilla JS/HTML/CSS)
- [ ] **No files were created directly in the home/root directory**
- [ ] **I have NOT modified `index.html` or other root files** (Project Admin will link verified games directly)
- [ ] All site updates, enhancements, or bug fixes are organized inside `<folder-name>-<your-name>/`
- [ ] Games are strictly inside `games/game-name_contributor-name/` *(for game submissions)*
- [ ] Game contains **ONLY** `index.html`, `style.css`, and `game.js` (no extraneous assets, binaries, or image/audio dumps)
- [ ] Used **icons only (SVG / Lucide)** in the game UI — **NO emojis**
- [ ] Entry added to `assets/js/games-registry.js` *(for game submissions)*
- [ ] The PR says `Closes #issue-number` with a short summary
- [ ] The PR includes the `nsoc26` tag
- [ ] I am not submitting multiple PRs at once

---

Happy Coding & Welcome to **Nexus Spring Of Code – Winter Edition 2026**! 🎉
