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
    lucideIcon: "gamepad-2",
    description: "Classic retro pong arena with neon glow and dynamic canvas AI paddle physics.",
    author: "Debasmita Bose",
    github: "DebasmitaBose0",
    role: "Project Admin & Contributor",
    path: "games/gamesbydb/index.html",
    tags: ["Arcade", "Retro", "Paddle"],
    stars: 32,
    featured: true
  },
  {
    id: "flappy-jet_mistu7debnath",
    title: "Flappy Cyber Jet",
    category: "Arcade",
    lucideIcon: "rocket",
    description: "Pilot a futuristic cyber jet through neon obstacles, dodge collisions, and beat your high score.",
    author: "mistu7debnath",
    github: "mistu7debnath",
    role: "Contributor",
    path: "games/flappy-jet_mistu7debnath/index.html",
    tags: ["Arcade", "NSOC26"],
    stars: 18,
    featured: true
  },
  {
    id: "quantum-2048_babin",
    title: "Quantum 2048",
    category: "Puzzle",
    lucideIcon: "atom",
    description: "Slide and merge radioactive isotopes on a 4x4 containment grid to synthesize the 2048 singularity.",
    author: "Babin Bid",
    github: "Babin123456",
    role: "Arcade Developer",
    path: "games/quantum-2048_babin/index.html",
    tags: ["Puzzle", "Math", "Retro", "Synthesis"],
    stars: 28,
    featured: true
  }
];

const CONTRIBUTORS_REGISTRY = [
  {
    name: "Debasmita Bose",
    github: "DebasmitaBose0",
    avatarInitial: "D",
    role: "Project Admin & Lead (NSOC '26)",
    gamesCount: 2,
    mechanicsBonus: 2,
    platformPRs: 2,
    qualityPRs: 0,
    bonusPts: 0,
    contributions: ["Quantum Memory Matrix", "Cyber Neon Pong", "Arcade Core Engine"]
  },
  {
    name: "Babin Bid",
    github: "Babin123456",
    avatarInitial: "B",
    role: "Arcade Developer (NSOC '26)",
    gamesCount: 1,
    mechanicsBonus: 1,
    platformPRs: 2,
    qualityPRs: 1,
    bonusPts: 0,
    contributions: ["Quantum 2048"]
  },
  {
    name: "mistu7debnath",
    github: "mistu7debnath",
    avatarInitial: "M",
    role: "Contributor (NSOC '26)",
    gamesCount: 1,
    mechanicsBonus: 1,
    platformPRs: 0,
    qualityPRs: 0,
    bonusPts: 0,
    contributions: ["Flappy Cyber Jet"]
  }
];
