/**
 * Ideas Vault Page Engine
 * Features:
 * - Curated game concept specifications for community inspiration
 * - Reference-only blueprints (zero click actions / no claim buttons)
 * - Category filter and live keyword search
 * - Pure Lucide Icons (zero raw emojis)
 */

const IDEA_VAULT = [
  {
    id: "space-invaders",
    title: "Space Invaders 2026",
    category: "Action",
    lucideIcon: "crosshair",
    difficulty: "Intermediate",
    description: "Classic arcade space defense. Control your cannon with arrow keys and blast descending alien waves.",
    tags: ["Sprite Animation", "Bullet Queues", "Wave Scaling"],
    features: ["Multi-stage alien formations", "Destructible shield bunkers", "Mystery mothership spawn"]
  },
  {
    id: "flappy-cyber",
    title: "Flappy Cyber Jet",
    category: "Action",
    lucideIcon: "rocket",
    difficulty: "Beginner",
    description: "Endless side-scrolling obstacle avoider. Control vertical thrusters with spacebar or screen taps.",
    tags: ["HTML5 Canvas", "Gravity Physics", "High Score LocalStorage"],
    features: ["Procedural pipe obstacles", "Score multiplier zones", "Particle smoke trail"]
  },
  {
    id: "quantum-2048",
    title: "Quantum 2048",
    category: "Puzzle",
    lucideIcon: "hash",
    difficulty: "Intermediate",
    description: "Slide and fuse elements on a 4x4 grid to unlock the ultimate quantum 2048 molecule.",
    tags: ["CSS Grid", "Matrix Slide Logic", "Smooth Transitions"],
    features: ["Keyboard arrow controls", "Undo last move feature", "Best score record"]
  },
  {
    id: "neon-pong",
    title: "Cyber Pong (PvP & AI)",
    category: "Retro",
    lucideIcon: "gamepad-2",
    difficulty: "Beginner",
    description: "Dual-paddle glowing pong with adjustable computer AI bot difficulty and 2-player local mode.",
    tags: ["Canvas 2D", "Collision Physics", "Bot AI Logic"],
    features: ["1P vs AI or 2P Local mode", "Velocity curve calculations", "Retro hit audio effects"]
  },
  {
    id: "cyber-stacker",
    title: "Cyber Tower Stacker",
    category: "Arcade",
    lucideIcon: "layers",
    difficulty: "Beginner",
    description: "Stack swinging blocks with precision timing. Unaligned edges are sliced off as the tower grows!",
    tags: ["Timing Reflex", "Precision Slicing", "Canvas"],
    features: ["Color gradient height effects", "Combo streak sounds", "Game over collapse animation"]
  },
  {
    id: "whack-a-bug",
    title: "Whack-A-Bug Developer",
    category: "Arcade",
    lucideIcon: "bug",
    difficulty: "Beginner",
    description: "Whack unexpected production bugs emerging from server racks before CPU temperature reaches 100°C!",
    tags: ["DOM Events", "Timer Intervals", "Audio Cues"],
    features: ["Different bug point values", "Golden bug power-ups", "Penalty on clicking server firewalls"]
  },
  {
    id: "cryptic-wordle",
    title: "Cryptic Wordle Hack",
    category: "Puzzle",
    lucideIcon: "type",
    difficulty: "Intermediate",
    description: "Guess the secret 5-letter tech keyword in 6 tries with green and amber feedback clues.",
    tags: ["String Algorithms", "Virtual Keyboard GUI", "State Machine"],
    features: ["Tech glossary word bank", "Shake animation on invalid word", "Statistics tracker"]
  },
  {
    id: "astro-jump",
    title: "Astro Infinite Jumper",
    category: "Arcade",
    lucideIcon: "arrow-up-circle",
    difficulty: "Intermediate",
    description: "Bounce continuously upward across floating space platforms, collecting jetpacks and dodging black holes.",
    tags: ["Vertical Camera Scroll", "Jump Velocity", "Procedural Platforms"],
    features: ["Spring & rocket boosters", "Moving and fragile platforms", "Altitude tracker"]
  },
  {
    id: "quantum-minesweeper",
    title: "Quantum Minesweeper",
    category: "Puzzle",
    lucideIcon: "bomb",
    difficulty: "Intermediate",
    description: "Classic minefield sweeper with modern flat aesthetic. Flag danger tiles and calculate risk tiles.",
    tags: ["Recursive Flood Fill", "Right-Click Handling", "Grid Engine"],
    features: ["Custom board sizes (9x9, 16x16)", "First click never a mine", "Timer & flag counter"]
  },
  {
    id: "synth-says",
    title: "Synth-Wave Simon Says",
    category: "Retro",
    lucideIcon: "music",
    difficulty: "Beginner",
    description: "Watch and listen to synthesizer sound sequences, then repeat the exact musical pattern under timer.",
    tags: ["Web Audio API", "Array Queues", "Memory Challenge"],
    features: ["Synthesizer tone generation", "High score memory", "Speed acceleration per round"]
  },
  {
    id: "tactical-battleship",
    title: "Tactical Fleet Commander",
    category: "Strategy",
    lucideIcon: "anchor",
    difficulty: "Intermediate",
    description: "Command a grid-based naval fleet. Plan radar strikes and strategically sink hidden enemy carrier units.",
    tags: ["2D Grid Arrays", "Fog of War", "AI Turn Engine"],
    features: ["Turn-based AI targeting", "Radar sweep bonus", "Fleet status health dashboard"]
  },
  {
    id: "neon-rhythm-runner",
    title: "Neon Beat Runner",
    category: "Rhythm",
    lucideIcon: "music-2",
    difficulty: "Intermediate",
    description: "Sync key presses with descending neon pulses synchronized to procedural web audio tempos.",
    tags: ["Web Audio Clock", "Beat Timing", "Combo Multiplier"],
    features: ["Dynamic BPM scaling", "Perfect/Good/Miss score ratings", "Combo streak visual aura"]
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const ideaTitle = document.getElementById("idea-title");
  const ideaCategory = document.getElementById("idea-category");
  const ideaIcon = document.getElementById("idea-icon");
  const ideaDescription = document.getElementById("idea-description");
  const ideaTechTags = document.getElementById("idea-tech-tags");
  const catalogGrid = document.getElementById("ideas-catalog-grid");
  const searchInput = document.getElementById("ideas-search-input");
  const categoryPills = document.querySelectorAll("#ideas-category-pills .pill");

  let currentCategory = "all";
  let searchQuery = "";

  function displayRouletteIdea(index = 0) {
    const item = IDEA_VAULT[index];
    if (!item) return;
    if (ideaTitle) ideaTitle.textContent = item.title;
    if (ideaCategory) ideaCategory.textContent = `${item.category} • ${item.difficulty}`;
    if (ideaIcon) ideaIcon.innerHTML = `<i data-lucide="${item.lucideIcon || 'gamepad-2'}"></i>`;
    if (ideaDescription) ideaDescription.textContent = item.description;
    if (ideaTechTags) ideaTechTags.innerHTML = item.tags.map(t => `<span>${t}</span>`).join("");
    if (window.lucide) {
      lucide.createIcons();
    }
  }

  // Render full catalog as reference blueprints (without buttons or click actions)
  function renderCatalog() {
    if (!catalogGrid) return;
    catalogGrid.innerHTML = "";

    const filtered = IDEA_VAULT.filter((idea) => {
      const matchesCategory = currentCategory === "all" || idea.category.toLowerCase() === currentCategory.toLowerCase();
      const matchesSearch = 
        idea.title.toLowerCase().includes(searchQuery) ||
        idea.description.toLowerCase().includes(searchQuery) ||
        idea.tags.some(t => t.toLowerCase().includes(searchQuery));
      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      catalogGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; background: var(--bg-surface); border: 1px dashed var(--border-medium); border-radius: var(--radius-lg);">
          <div style="font-size: 2.2rem; color: var(--accent-cyan); margin-bottom: 0.8rem;"><i data-lucide="search-x"></i></div>
          <h3 style="color: #fff; margin-bottom: 0.5rem;">No Game Ideas Match Your Search</h3>
          <p style="color: var(--text-secondary); max-width: 480px; margin: 0 auto 1.2rem;">Try searching for different keywords or clear the active category filter.</p>
        </div>
      `;
      if (window.lucide) lucide.createIcons();
      return;
    }

    filtered.forEach((idea) => {
      const card = document.createElement("div");
      card.className = "idea-catalog-card";
      const iconName = idea.lucideIcon || "gamepad-2";
      card.innerHTML = `
        <div class="idea-cat-header">
          <span class="idea-icon-sm"><i data-lucide="${iconName}"></i></span>
          <span class="difficulty-badge ${idea.difficulty.toLowerCase()}">${idea.difficulty}</span>
        </div>
        <h3>${idea.title}</h3>
        <p class="idea-desc-text">${idea.description}</p>
        <div class="idea-tags-list">
          ${idea.tags.map(t => `<span>${t}</span>`).join("")}
        </div>
        <div class="idea-features-box">
          <strong>Key Features (Reference Blueprint):</strong>
          <ul>
            ${idea.features.map(f => `<li>${f}</li>`).join("")}
          </ul>
        </div>
        <div class="reference-blueprint-badge">
          <i data-lucide="bookmark"></i> Reference Blueprint (Read-Only)
        </div>
      `;

      catalogGrid.appendChild(card);
    });

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  // Filter Search
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderCatalog();
    });
  }

  // Category Pills
  if (categoryPills) {
    categoryPills.forEach((pill) => {
      pill.addEventListener("click", () => {
        categoryPills.forEach((p) => p.classList.remove("active"));
        pill.classList.add("active");
        currentCategory = pill.getAttribute("data-category");
        renderCatalog();
      });
    });
  }

  // Initial render
  displayRouletteIdea(0);
  renderCatalog();
});
