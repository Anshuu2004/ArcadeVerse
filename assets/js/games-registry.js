/**
 * ArcadeVerse Games & Contributors Registry
 * NSOC Winter Edition 2026
 * 
 * Contributor Instructions:
 * To register your game here:
 * 1. Place your game inside `games/<your-game-name>/` (or `games/<game-name>-<your-name>/`)
 * 2. Add an entry to the `GAMES_REGISTRY` list below.
 * 3. Add your details to `CONTRIBUTORS_REGISTRY` and `CONTRIBUTORS.md`.
 *
 * Valid categories: Arcade | Puzzle | Action | Retro | Strategy | Rhythm
 */

const GAMES_REGISTRY = [
  {
    id: "memory-matrix",
    title: "Quantum Memory Matrix",
    category: "Puzzle",
    icon: "🧩",
    lucideIcon: "puzzle",
    description: "Cyberpunk card flipping memory matrix test. Match cyber glyphs under timed pressure.",
    author: "Debasmita Bose",
    github: "DebasmitaBose0",
    role: "Project Admin",
    path: "games/memory-matrix/index.html",
    tags: ["Cards", "Mind", "Timed"],
    stars: 24,
    featured: true
  },
  {
    id: "gamesbydb",
    title: "Cyber Neon Pong",
    category: "Arcade",
    icon: "🏓",
    lucideIcon: "gamepad-2",
    description: "Classic retro pong arena with neon glow and dynamic canvas AI paddle physics.",
    author: "Debasmita Bose",
    github: "DebasmitaBose0",
    role: "Project Admin & Contributor",
    path: "games/gamesbydb/index.html",
    tags: ["Arcade", "Retro", "Paddle"],
    stars: 32,
    featured: true
  }
];

const CONTRIBUTORS_REGISTRY = [
  {
    name: "Debasmita Bose",
    github: "DebasmitaBose0",
    avatarInitial: "D",
    role: "Project Admin (NSOC '26)",
    gamesCount: 2,
    mechanicsBonus: 2,
    platformPRs: 2,
    qualityPRs: 0,
    bonusPts: 0,
    contributions: ["Quantum Memory Matrix", "Cyber Neon Pong", "Arcade Core Engine"]
  }
];
