/**
 * ArcadeVerse Games & Contributors Registry
 * NSOC Winter Edition 2026
 * 
 * Contributor Instructions:
 * To register your game here:
 * 1. Place your game inside `games/<your-game-name>/` (or `games/<game-name>-<your-name>/`)
 * 2. Add an entry to the `GAMES_REGISTRY` list below.
 * 3. Add your details to `CONTRIBUTORS_REGISTRY` and `CONTRIBUTORS.md`.
 */

const GAMES_REGISTRY = [
  {
    id: "memory-matrix",
    title: "Quantum Memory Matrix",
    category: "Puzzle",
    icon: "🧩",
    description: "Cyberpunk card flipping memory matrix test. Match cyber glyphs under timed pressure.",
    author: "Debasmita",
    github: "debasmita-admin",
    role: "Project Admin",
    path: "games/memory-matrix/index.html",
    tags: ["Cards", "Mind", "Timed"],
    stars: 24,
    featured: true
  }
];

const CONTRIBUTORS_REGISTRY = [
  {
    name: "Debasmita",
    github: "debasmita-admin",
    avatarInitial: "D",
    role: "Project Admin (NSOC '26)",
    contributions: ["Quantum Memory Matrix", "Arcade Core Engine & Contributor Sandbox"]
  }
];
