/**
 * ArcadeVerse Home Hub Engine
 * Handles live games catalog, in-app modal launcher, and category/search filtering
 */

document.addEventListener("DOMContentLoaded", () => {
  const gamesGrid = document.getElementById("games-grid");
  const totalGamesCount = document.getElementById("total-games-count");
  const totalContributorsCount = document.getElementById("total-contributors-count");
  const searchInput = document.getElementById("game-search-input");
  const categoryPills = document.querySelectorAll(".category-pills .pill");

  // Modal elements
  const gameModal = document.getElementById("game-modal");
  const modalOverlay = document.getElementById("modal-overlay");
  const closeModalBtn = document.getElementById("close-modal-btn");
  const modalGameTitle = document.getElementById("modal-game-title");
  const modalGameBadge = document.getElementById("modal-game-badge");
  const modalGameAuthor = document.getElementById("modal-game-author");
  const gameIframe = document.getElementById("game-iframe");
  const fullscreenBtn = document.getElementById("fullscreen-btn");
  const newTabBtn = document.getElementById("new-tab-btn");
  const reloadBtn = document.getElementById("reload-btn");
  const modalWindow = document.querySelector(".modal-window");
  const sortSelect = document.getElementById("catalog-sort-select");

  let currentCategory = "all";
  let searchQuery = "";
  let currentSort = "featured";
  let lastFocusedElement = null;

  // Update Stats
  if (totalGamesCount) totalGamesCount.textContent = GAMES_REGISTRY.length;
  if (totalContributorsCount) totalContributorsCount.textContent = CONTRIBUTORS_REGISTRY.length;

  // Render Games
  function renderGames() {
    gamesGrid.innerHTML = "";

    let filtered = GAMES_REGISTRY.filter((game) => {
      const matchesCategory = currentCategory === "all" || game.category.toLowerCase() === currentCategory.toLowerCase();
      const matchesSearch = 
        game.title.toLowerCase().includes(searchQuery) ||
        game.description.toLowerCase().includes(searchQuery) ||
        game.author.toLowerCase().includes(searchQuery) ||
        (game.tags && game.tags.some(t => t.toLowerCase().includes(searchQuery)));

      return matchesCategory && matchesSearch;
    });

    // Apply Sorting
    filtered.sort((a, b) => {
      if (currentSort === "az") {
        return a.title.localeCompare(b.title);
      } else if (currentSort === "stars") {
        return (b.stars || 0) - (a.stars || 0);
      } else {
        // "featured": featured games first, then by stars
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return (b.stars || 0) - (a.stars || 0);
      }
    });

    // Handle Empty State
    if (filtered.length === 0) {
      const emptyCard = document.createElement("div");
      emptyCard.className = "catalog-empty-state";
      emptyCard.innerHTML = `
        <div class="empty-state-icon">🕹️</div>
        <h3 class="empty-state-title">No games found in "${currentCategory !== "all" ? currentCategory : searchQuery}"</h3>
        <p class="empty-state-desc">
          Be the pioneer contributor! Build the first game for this category under <code>games/&lt;game-name&gt;_&lt;your-name&gt;/</code> and claim your spot on the leaderboard.
        </p>
        <div class="empty-state-actions">
          <a href="https://github.com/DebasmitaBose0/ArcadeVerse/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
            <span>🚀 Build a Game for This Category</span>
          </a>
          <button class="btn btn-secondary btn-sm" id="reset-filter-btn">
            <span>🔄 Clear Filters</span>
          </button>
        </div>
      `;

      emptyCard.querySelector("#reset-filter-btn").addEventListener("click", () => {
        searchQuery = "";
        currentCategory = "all";
        if (searchInput) searchInput.value = "";
        categoryPills.forEach((p) => p.classList.remove("active"));
        const allPill = document.querySelector('.category-pills .pill[data-category="all"]');
        if (allPill) allPill.classList.add("active");
        renderGames();
      });

      gamesGrid.appendChild(emptyCard);
      return;
    }

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

      const playBtn = card.querySelector(".btn-play-trigger");
      playBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        openGameModal(game, playBtn);
      });

      card.addEventListener("click", () => openGameModal(game, card));
      gamesGrid.appendChild(card);
    });
  }

  // Modal Handlers
  function openGameModal(game, triggerElement = null) {
    lastFocusedElement = triggerElement || document.activeElement;
    modalGameTitle.textContent = game.title;
    modalGameBadge.textContent = game.category;
    modalGameAuthor.textContent = `Built by @${game.author}`;
    gameIframe.src = game.path;
    newTabBtn.href = game.path;

    gameModal.classList.add("active");
    gameModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    closeModalBtn.focus();
  }

  function closeGameModal() {
    gameModal.classList.remove("active");
    gameModal.setAttribute("aria-hidden", "true");
    gameIframe.src = "";
    document.body.style.overflow = "auto";
    modalWindow.classList.remove("fullscreen");
    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  }

  closeModalBtn.addEventListener("click", closeGameModal);
  modalOverlay.addEventListener("click", closeGameModal);

  if (reloadBtn) {
    reloadBtn.addEventListener("click", () => {
      if (gameIframe.src) {
        const currentSrc = gameIframe.src;
        gameIframe.src = "";
        setTimeout(() => {
          gameIframe.src = currentSrc;
        }, 50);
      }
    });
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && gameModal.classList.contains("active")) {
      closeGameModal();
    }
  });

  fullscreenBtn.addEventListener("click", () => {
    modalWindow.classList.toggle("fullscreen");
  });

  // Sort Selector Change
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      currentSort = e.target.value;
      renderGames();
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
});
