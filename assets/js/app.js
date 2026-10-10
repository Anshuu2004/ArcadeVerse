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
  const modalWindow = document.querySelector(".modal-window");

  let currentCategory = "all";
  let searchQuery = "";

  // Update Stats
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

      const playBtn = card.querySelector(".btn-play-trigger");
      playBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        openGameModal(game);
      });

      card.addEventListener("click", () => openGameModal(game));
      gamesGrid.appendChild(card);
    });

    // Add More Games Card -> Links directly to submit.html
    const addCard = document.createElement("a");
    addCard.href = "submit.html";
    addCard.className = "add-game-card";
    addCard.style.textDecoration = "none";
    addCard.innerHTML = `
      <div class="add-game-icon">➕</div>
      <h3>Add Your Game Here</h3>
      <p>Have an awesome game idea? Build it with pure HTML, CSS, JS and get featured in the Arcade Catalog!</p>
      <span class="btn btn-secondary btn-sm">Submit via GitHub PR</span>
    `;
    gamesGrid.appendChild(addCard);
  }

  // Modal Handlers
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

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && gameModal.classList.contains("active")) {
      closeGameModal();
    }
  });

  fullscreenBtn.addEventListener("click", () => {
    modalWindow.classList.toggle("fullscreen");
  });

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
