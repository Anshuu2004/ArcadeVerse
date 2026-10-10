/**
 * ArcadeVerse Core Application Engine
 * Handles rendering, real-time filtering, iframe launcher, fullscreen modal, and analytics count
 */

document.addEventListener("DOMContentLoaded", () => {
  const gamesGrid = document.getElementById("games-grid");
  const contributorsGrid = document.getElementById("contributors-grid");
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
  const modalWindow = document.querySelector(".modal-window");

  let currentCategory = "all";
  let searchQuery = "";

  // Update quick stats
  if (totalGamesCount) totalGamesCount.textContent = GAMES_REGISTRY.length;
  if (totalContributorsCount) totalContributorsCount.textContent = CONTRIBUTORS_REGISTRY.length;

  // Render Games
  function renderGames() {
    gamesGrid.innerHTML = "";

    const filtered = GAMES_REGISTRY.filter((game) => {
      const matchesCategory = currentCategory === "all" || game.category.toLowerCase() === currentCategory.toLowerCase();
      const matchesSearch = 
        game.title.toLowerCase().includes(searchQuery) ||
        game.description.toLowerCase().includes(searchQuery) ||
        game.author.toLowerCase().includes(searchQuery) ||
        game.tags.some(t => t.toLowerCase().includes(searchQuery));

      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      gamesGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: rgba(255,255,255,0.02); border-radius: 16px; border: 1px dashed rgba(255,255,255,0.1);">
          <p style="font-size: 2rem; margin-bottom: 0.5rem;">🔍</p>
          <h3 style="font-size: 1.2rem; color: #fff; margin-bottom: 0.5rem;">No games match your query</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem;">Be the pioneer to contribute a game under this genre for NSOC Winter '26!</p>
        </div>
      `;
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

      // Play button event
      const playBtn = card.querySelector(".btn-play-trigger");
      playBtn.addEventListener("click", () => openGameModal(game));

      // Entire card click (except links)
      card.addEventListener("click", (e) => {
        if (!e.target.closest("button") && !e.target.closest("a")) {
          openGameModal(game);
        }
      });

      gamesGrid.appendChild(card);
    });
  }

  // Render Contributors Hall of Fame
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

  // Open Game Modal Launcher
  function openGameModal(game) {
    modalGameTitle.textContent = game.title;
    modalGameBadge.textContent = game.category;
    modalGameAuthor.textContent = `Built by @${game.author}`;
    gameIframe.src = game.path;
    newTabBtn.href = game.path;

    gameModal.classList.add("active");
    gameModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // Prevent page scrolling while playing
  }

  // Close Game Modal
  function closeGameModal() {
    gameModal.classList.remove("active");
    gameModal.setAttribute("aria-hidden", "true");
    gameIframe.src = ""; // Stop audio & gameplay loop
    document.body.style.overflow = "auto";
    modalWindow.classList.remove("fullscreen");
  }

  // Modal event listeners
  closeModalBtn.addEventListener("click", closeGameModal);
  modalOverlay.addEventListener("click", closeGameModal);

  // Esc key closes modal
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && gameModal.classList.contains("active")) {
      closeGameModal();
    }
  });

  // Fullscreen toggle inside modal
  fullscreenBtn.addEventListener("click", () => {
    modalWindow.classList.toggle("fullscreen");
  });

  // Filter Search
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderGames();
  });

  // Category Pills
  categoryPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      categoryPills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      currentCategory = pill.getAttribute("data-category");
      renderGames();
    });
  });

  // Initial runs
  renderGames();
  renderContributors();
});
