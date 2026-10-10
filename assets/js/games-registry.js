/**
 * ArcadeVerse Games & Contributors Registry
 * NSOC Winter Edition 2026
 * 
 * Contributor Instructions:
 * To register your game here:
 * 1. Ensure your game folder is placed inside `games/<your-game-name>/`
 * 2. Add an object to the `GAMES_REGISTRY` list below.
 * 3. Update the `CONTRIBUTORS_REGISTRY` with your github profile.
 */

const GAMES_REGISTRY = [
  {
    id: "cyber-snake",
    title: "Cyber Snake Neo",
    category: "Retro",
    icon: "🐍",
    description: "Classic retro snake revived with neon cyber aesthetics, velocity multipliers, and power-up glow treats.",
    author: "Debasmita",
    github: "debasmita-admin",
    role: "Project Admin",
    path: "games/cyber-snake/index.html",
    tags: ["Classic", "Canvas", "Neon"]
  },
  {
    id: "galaxy-brick-breaker",
    title: "Galaxy Brick Breaker",
    category: "Arcade",
    icon: "🚀",
    description: "Futuristic cosmic paddle & ball game with multi-hit shields, particle bursts, and progressive speed stages.",
    author: "Debasmita",
    github: "debasmita-admin",
    role: "Project Admin",
    path: "games/galaxy-brick-breaker/index.html",
    tags: ["Paddle", "Physics", "Sci-Fi"]
  },
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
    tags: ["Cards", "Mind", "Timed"]
  }
];

const CONTRIBUTORS_REGISTRY = [
  {
    name: "Debasmita",
    github: "debasmita-admin",
    avatarInitial: "D",
    role: "Project Admin (NSOC '26)",
    contributions: ["Cyber Snake Neo", "Galaxy Brick Breaker", "Quantum Memory Matrix", "Arcade Core Platform"]
  }
];
