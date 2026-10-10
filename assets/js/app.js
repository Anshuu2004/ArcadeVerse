/**
 * ArcadeVerse Core Application Engine
 * Includes:
 * 1. Games catalog with "Add More Games" interactive card
 * 2. In-Browser Live Game Sandbox
 * 3. Idea Roulette / Claim Vault (20+ ideas for contributors)
 * 4. Automated PR Snippet Generator
 * 5. Fullscreen Launcher Modal
 */

document.addEventListener("DOMContentLoaded", () => {
  // DOM References
  const gamesGrid = document.getElementById("games-grid");
  const contributorsGrid = document.getElementById("contributors-grid");
  const totalGamesCount = document.getElementById("total-games-count");
  const totalContributorsCount = document.getElementById("total-contributors-count");
  const searchInput = document.getElementById("game-search-input");
  const categoryPills = document.querySelectorAll(".category-pills .pill");

  // Modals
  const gameModal = document.getElementById("game-modal");
  const modalOverlay = document.getElementById("modal-overlay");
  const closeModalBtn = document.getElementById("close-modal-btn");
  const modalGameTitle = document.getElementById("modal-game-title");
  const modalGameBadge = document.getElementById("modal-game-badge");
  const modalGameAuthor = document.getElementById("modal-game-author");
  const gameIframe = document.getElementById("game-iframe");
  const fullscreenBtn = document.getElementById("fullscreen-btn");
  const newTabBtn = document.getElementById("new-tab-btn");
  const modalWindow = document.querySelector(".modal-window");

  // Submit Guide Modal
  const submitGuideModal = document.getElementById("submit-guide-modal");
  const submitModalOverlay = document.getElementById("submit-modal-overlay");
  const closeSubmitModalBtn = document.getElementById("close-submit-modal-btn");
  const headerAddGameBtn = document.getElementById("header-add-game-btn");
  const heroSubmitTrigger = document.getElementById("hero-submit-trigger");
  const scrollToPrGenBtn = document.getElementById("scroll-to-pr-gen-btn");

  let currentCategory = "all";
  let searchQuery = "";

  // 1. Update Stats
  if (totalGamesCount) totalGamesCount.textContent = GAMES_REGISTRY.length;
  if (totalContributorsCount) totalContributorsCount.textContent = CONTRIBUTORS_REGISTRY.length;

  // 2. Render Games + "Add More Games" Card
  function renderGames() {
    gamesGrid.innerHTML = "";

    const filtered = GAMES_REGISTRY.filter((game) => {
      const matchesCategory = currentCategory === "all" || game.category.toLowerCase() === currentCategory.toLowerCase();
      const matchesSearch = 
        game.title.toLowerCase().includes(searchQuery) ||
        game.description.toLowerCase().includes(searchQuery) ||
        game.author.toLowerCase().includes(searchQuery) ||
        (game.tags && game.tags.some(t => t.toLowerCase().includes(searchQuery)));

      return matchesCategory && matchesSearch;
    });

    filtered.forEach((game) => {
      const card = document.createElement("div");
      card.className = "game-card";
      card.innerHTML = `
        <div class="game-card-preview">
          <span class="game-category-tag">${game.category}</span>
          <div class="game-icon">${game.icon}</div>
        </div>
        <div class="game-card-body">
          <h3 class="game-card-title">${game.title}</h3>
          <p class="game-card-desc">${game.description}</p>
          <div class="game-card-footer">
            <div class="contributor-meta">
              <div class="contributor-avatar">${game.author.charAt(0).toUpperCase()}</div>
              <div class="contributor-name">
                Dev: <strong>${game.author}</strong>
              </div>
            </div>
            <button class="btn-play-trigger" data-id="${game.id}">Play Now ▶</button>
          </div>
        </div>
      `;

      // Play button event
      const playBtn = card.querySelector(".btn-play-trigger");
      playBtn.addEventListener("click", () => openGameModal(game));

      card.addEventListener("click", (e) => {
        if (!e.target.closest("button") && !e.target.closest("a")) {
          openGameModal(game);
        }
      });

      gamesGrid.appendChild(card);
    });

    // ALWAYS APPEND "ADD MORE GAMES" CONTRIBUTOR CALLOUT CARD
    const addCard = document.createElement("div");
    addCard.className = "add-game-card";
    addCard.innerHTML = `
      <div class="add-game-icon">➕</div>
      <h3>Add Your Game Here</h3>
      <p>Have an awesome game idea? Build it with pure HTML, CSS, JS and get featured in the Arcade Catalog!</p>
      <button class="btn btn-secondary btn-sm">Submit via GitHub PR</button>
    `;
    addCard.addEventListener("click", () => openSubmitModal());
    gamesGrid.appendChild(addCard);
  }

  // 3. Render Contributors Hall of Fame
  function renderContributors() {
    contributorsGrid.innerHTML = "";
    CONTRIBUTORS_REGISTRY.forEach((contrib) => {
      const box = document.createElement("div");
      box.className = "contributor-box";
      box.innerHTML = `
        <div class="contributor-avatar-lg">${contrib.avatarInitial}</div>
        <div class="contributor-details">
          <h4>${contrib.name}</h4>
          <div class="contributor-role">${contrib.role}</div>
          <div class="contributor-games-list">
            🕹️ ${contrib.contributions.join(", ")}
          </div>
        </div>
      `;
      contributorsGrid.appendChild(box);
    });
  }

  // 4. Modal Handlers
  function openGameModal(game) {
    modalGameTitle.textContent = game.title;
    modalGameBadge.textContent = game.category;
    modalGameAuthor.textContent = `Built by @${game.author}`;
    gameIframe.src = game.path;
    newTabBtn.href = game.path;

    gameModal.classList.add("active");
    gameModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeGameModal() {
    gameModal.classList.remove("active");
    gameModal.setAttribute("aria-hidden", "true");
    gameIframe.src = "";
    document.body.style.overflow = "auto";
    modalWindow.classList.remove("fullscreen");
  }

  closeModalBtn.addEventListener("click", closeGameModal);
  modalOverlay.addEventListener("click", closeGameModal);

  fullscreenBtn.addEventListener("click", () => {
    modalWindow.classList.toggle("fullscreen");
  });

  // Submit Modal Handlers
  function openSubmitModal() {
    submitGuideModal.classList.add("active");
    submitGuideModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeSubmitModal() {
    submitGuideModal.classList.remove("active");
    submitGuideModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "auto";
  }

  if (headerAddGameBtn) headerAddGameBtn.addEventListener("click", openSubmitModal);
  if (heroSubmitTrigger) heroSubmitTrigger.addEventListener("click", openSubmitModal);
  if (closeSubmitModalBtn) closeSubmitModalBtn.addEventListener("click", closeSubmitModal);
  if (submitModalOverlay) submitModalOverlay.addEventListener("click", closeSubmitModal);

  if (scrollToPrGenBtn) {
    scrollToPrGenBtn.addEventListener("click", () => {
      closeSubmitModal();
      document.getElementById("code-generator").scrollIntoView({ behavior: "smooth" });
    });
  }

  // Filter Search
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderGames();
  });

  categoryPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      categoryPills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      currentCategory = pill.getAttribute("data-category");
      renderGames();
    });
  });

  // 5. INNOVATIVE FEATURE 1: IDEA ROULETTE (20+ curated ideas for contributors)
  const IDEA_VAULT = [
    {
      title: "Flappy Cyber Jet",
      category: "Action",
      icon: "🚀",
      description: "Infinite side-scrolling obstacle avoider. Control vertical thrust with spacebar or touch taps.",
      tags: ["Canvas API", "Gravity Physics", "High Score"]
    },
    {
      title: "Quantum 2048",
      category: "Puzzle",
      icon: "🔢",
      description: "Slide and merge radioactive isotopes to reach the 2048 element threshold.",
      tags: ["Matrix 4x4", "Keyboard Events", "Animations"]
    },
    {
      title: "Neon Cyber Pong (PvP / AI)",
      category: "Retro",
      icon: "🏓",
      description: "Dual-paddle glowing pong with adjustable AI bot difficulty and 2-player local mode.",
      tags: ["Collision Physics", "Bot AI", "Sound Effects"]
    },
    {
      title: "Space Invaders 2026",
      category: "Action / Retro",
      icon: "🛸",
      description: "Defend Earth from descending pixel aliens with cannon lasers and defensive shield bunkers.",
      tags: ["Canvas Sprite Sheets", "Bullet Queues", "Waves"]
    },
    {
      title: "Cyber Tower Stacker",
      category: "Arcade",
      icon: "🏢",
      description: "Stack swinging holographic blocks with perfect timing. Misalignments trim the block size!",
      tags: ["Timing Reflex", "Precision Slicing", "Score Multipliers"]
    },
    {
      title: "Whack-A-Bug Developer",
      category: "Arcade",
      icon: "🐛",
      description: "Whack random bugs emerging from server racks before production servers crash!",
      tags: ["DOM Timers", "Reflex Test", "Audio Effects"]
    },
    {
      title: "Cryptic Wordle Hack",
      category: "Puzzle",
      icon: "🔤",
      description: "Guess the 5-letter cybersecurity term in 6 tries with green/yellow clue indicators.",
      tags: ["String Validation", "Keyboard GUI", "State Machine"]
    },
    {
      title: "Astro Infinite Jumper",
      category: "Arcade",
      icon: "🦘",
      description: "Bounce an astronaut continuously upward on floating platforms and avoid black holes.",
      tags: ["Camera Tracking", "Jump Physics", "Procedural Platforms"]
    },
    {
      title: "Quantum Minesweeper",
      category: "Puzzle",
      icon: "💣",
      description: "Cyber mine detection grid. Flag danger tiles and calculate surrounding hazard numbers.",
      tags: ["Flood Fill Algo", "Right-click Handling", "Custom Themes"]
    },
    {
      title: "Synth-Wave Simon Says",
      category: "Retro",
      icon: "🎹",
      description: "Listen and watch sequence pads light up. Repeat the exact audio-visual pattern.",
      tags: ["Web Audio API", "Sequence Queue", "Memory Training"]
    }
  ];

  let currentIdeaIndex = 0;
  const ideaTitle = document.getElementById("idea-title");
  const ideaCategory = document.getElementById("idea-category");
  const ideaIcon = document.getElementById("idea-icon");
  const ideaDescription = document.getElementById("idea-description");
  const ideaTechTags = document.getElementById("idea-tech-tags");
  const rollIdeaBtn = document.getElementById("roll-idea-btn");
  const claimIdeaBtn = document.getElementById("claim-idea-btn");
  const ideaCardDisplay = document.getElementById("idea-card-display");

  function displayIdea(index) {
    const item = IDEA_VAULT[index];
    ideaTitle.textContent = item.title;
    ideaCategory.textContent = item.category;
    ideaIcon.textContent = item.icon;
    ideaDescription.textContent = item.description;
    
    ideaTechTags.innerHTML = item.tags.map(t => `<span>${t}</span>`).join("");
    
    ideaCardDisplay.classList.add("anim-spin");
    setTimeout(() => ideaCardDisplay.classList.remove("anim-spin"), 400);
  }

  if (rollIdeaBtn) {
    rollIdeaBtn.addEventListener("click", () => {
      let nextIndex = Math.floor(Math.random() * IDEA_VAULT.length);
      while (nextIndex === currentIdeaIndex) {
        nextIndex = Math.floor(Math.random() * IDEA_VAULT.length);
      }
      currentIdeaIndex = nextIndex;
      displayIdea(currentIdeaIndex);
    });
  }

  if (claimIdeaBtn) {
    claimIdeaBtn.addEventListener("click", () => {
      const item = IDEA_VAULT[currentIdeaIndex];
      // Pre-fill the PR generator form
      document.getElementById("gen-title").value = item.title;
      document.getElementById("gen-category").value = item.category.split(" ")[0];
      document.getElementById("gen-icon").value = item.icon;
      document.getElementById("gen-desc").value = item.description;

      document.getElementById("code-generator").scrollIntoView({ behavior: "smooth" });
      generateSnippet();
    });
  }

  // 6. INNOVATIVE FEATURE 2: IN-BROWSER LIVE GAME SANDBOX
  const tabButtons = document.querySelectorAll(".editor-tabs .tab-btn");
  const editorPanes = document.querySelectorAll(".editor-pane");
  const runSandboxBtn = document.getElementById("run-sandbox-btn");
  const sandboxFrame = document.getElementById("sandbox-preview-frame");
  const htmlCode = document.getElementById("sandbox-html-code");
  const cssCode = document.getElementById("sandbox-css-code");
  const jsCode = document.getElementById("sandbox-js-code");

  tabButtons.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabButtons.forEach(t => t.classList.remove("active"));
      editorPanes.forEach(p => p.classList.remove("active"));

      tab.classList.add("active");
      const targetId = `pane-${tab.getAttribute("data-tab")}`;
      document.getElementById(targetId).classList.add("active");
    });
  });

  function executeSandbox() {
    const combinedSource = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          ${cssCode.value}
        </style>
      </head>
      <body>
        ${htmlCode.value}
        <script>
          try {
            ${jsCode.value}
          } catch(err) {
            console.error(err);
          }
        <\/script>
      </body>
      </html>
    `;
    sandboxFrame.srcdoc = combinedSource;
  }

  if (runSandboxBtn) {
    runSandboxBtn.addEventListener("click", executeSandbox);
    // Initial run
    executeSandbox();
  }

  // 7. INNOVATIVE FEATURE 3: PR HELPER & SNIPPET GENERATOR
  const genGithub = document.getElementById("gen-github");
  const genName = document.getElementById("gen-name");
  const genTitle = document.getElementById("gen-title");
  const genCategory = document.getElementById("gen-category");
  const genIcon = document.getElementById("gen-icon");
  const genDesc = document.getElementById("gen-desc");
  const generateSnippetBtn = document.getElementById("generate-snippet-btn");
  const snippetCodeDisplay = document.getElementById("snippet-code-display");
  const copySnippetBtn = document.getElementById("copy-snippet-btn");

  function generateSnippet() {
    const github = genGithub.value.trim() || "contributor-handle";
    const name = genName.value.trim() || "Your Name";
    const title = genTitle.value.trim() || "Cosmic Blaster";
    const cat = genCategory.value;
    const icon = genIcon.value.trim() || "🎮";
    const desc = genDesc.value.trim() || "Exciting mini arcade game created with HTML5, CSS and JS.";
    
    // Slugify id
    const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const snippet = `// 1. Add this object to GAMES_REGISTRY in assets/js/games-registry.js:
{
  id: "${id}-${github}",
  title: "${title}",
  category: "${cat}",
  icon: "${icon}",
  description: "${desc}",
  author: "${name}",
  github: "${github}",
  role: "Contributor",
  path: "games/${id}-${github}/index.html",
  tags: ["${cat}", "NSOC26"]
}

// 2. Add your entry to the Hall of Fame table in CONTRIBUTING.md:
| * | ${name} | [@${github}](https://github.com/${github}) | ${title} | \`games/${id}-${github}/\` |`;

    snippetCodeDisplay.textContent = snippet;
  }

  if (generateSnippetBtn) generateSnippetBtn.addEventListener("click", generateSnippet);

  if (copySnippetBtn) {
    copySnippetBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(snippetCodeDisplay.textContent).then(() => {
        copySnippetBtn.textContent = "✅ Copied!";
        setTimeout(() => copySnippetBtn.textContent = "📋 Copy Code", 2000);
      });
    });
  }

  // Navbar Squeeze Effect on Scroll
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }, { passive: true });

  // Initial render
  renderGames();
  renderContributors();
});
