/**
 * Hall of Fame Live GitHub Contributors & Ranking Engine
 * Fetches real contributor stats from GitHub API (or seamlessly merges with games-registry)
 * Features:
 * - 15-minute TTL localStorage caching to eliminate GitHub API 403 Rate Limits
 * - Real-time Contributor & Game Search Filtering
 * - Tier Filter Pills (All, Arcade Devs, Milestone Contributors)
 * - Platform Metrics Summary Calculations (Points, Games, Devs)
 * - Dedicated Project Admin Spotlight Subsection (excluded from community rankings)
 */

document.addEventListener("DOMContentLoaded", () => {
  const podiumContainer = document.getElementById("podium-container");
  const tableBody = document.getElementById("leaderboard-table-body");
  const repoInput = document.getElementById("repo-input");
  const fetchBtn = document.getElementById("fetch-github-btn");
  const syncStatusText = document.getElementById("sync-status-text");
  const searchInput = document.getElementById("contributor-search-input");
  const tierPills = document.querySelectorAll("#leaderboard-tier-pills .pill");

  const metricTotalPoints = document.getElementById("metric-total-points");
  const metricTotalGames = document.getElementById("metric-total-games");
  const metricTotalContributors = document.getElementById("metric-total-contributors");

  const CACHE_KEY = "arcadeverse_leaderboard_cache_v1";
  const CACHE_TTL = 15 * 60 * 1000; // 15 minutes TTL

  let searchQuery = "";
  let currentTier = "all";

  // Default verified base roster
  let contributorsData = [
    {
      login: "DebasmitaBose0",
      name: "Debasmita Bose",
      role: "Project Admin & Lead",
      avatar_url: "https://avatars.githubusercontent.com/u/144198639?v=4",
      commits: 19,
      gamesCount: 2,
      games: ["Quantum Memory Matrix", "Cyber Neon Pong"]
    }
  ];

  // Dynamic Contributor Role & Tier Badge Engine
  function determineContributorRole(user) {
    if (user.login && user.login.toLowerCase() === "debasmitabose0") {
      return {
        role: "Project Admin & Lead",
        tagClass: "role-admin",
        badge: "👑 Project Admin & Lead",
        category: "admin"
      };
    }

    const totalCommits = user.contributions || user.commits || 0;
    const gamesCount = user.gamesCount || 0;

    if (gamesCount >= 2 || totalCommits >= 30) {
      return {
        role: "Hyper Game Developer",
        tagClass: "role-hyper",
        badge: "⚡ Hyper Game Developer",
        category: "arcade"
      };
    }
    if (gamesCount >= 1 && totalCommits >= 15) {
      return {
        role: "Arcade Developer",
        tagClass: "role-arcade",
        badge: "🕹️ Arcade Developer",
        category: "arcade"
      };
    }
    if (totalCommits >= 50) {
      return {
        role: "Master Contributor",
        tagClass: "role-master",
        badge: "🏆 Master Contributor",
        category: "milestone"
      };
    }
    if (totalCommits >= 20) {
      return {
        role: "Elite Contributor",
        tagClass: "role-elite",
        badge: "💎 Elite Contributor",
        category: "milestone"
      };
    }
    if (totalCommits >= 10) {
      return {
        role: "Novice Contributor",
        tagClass: "role-novice",
        badge: "🌟 Novice Contributor",
        category: "milestone"
      };
    }
    if (totalCommits >= 5) {
      return {
        role: "Project Contributor",
        tagClass: "role-project",
        badge: "🚀 Project Contributor",
        category: "milestone"
      };
    }

    return {
      role: "Active Contributor",
      tagClass: "role-active",
      badge: "🌱 Active Contributor",
      category: "active"
    };
  }

  // Multidimensional Point Formula
  function calculateScore(item) {
    const commitsPts = (item.commits || 0) * 10;
    const gamesPts = (item.gamesCount || 0) * 100;
    const filesPts = (item.filesCount || (item.gamesCount * 3)) * 15;
    return commitsPts + gamesPts + filesPts;
  }

  function sortContributors() {
    contributorsData.sort((a, b) => calculateScore(b) - calculateScore(a));
  }

  // Helper to update dedicated Admin Spotlight UI
  function updateAdminSpotlight(adminData) {
    if (!adminData) return;
    const adminScore = calculateScore(adminData);
    const scoreEl = document.getElementById("admin-score");
    const gamesEl = document.getElementById("admin-games");
    const filesEl = document.getElementById("admin-files");
    const commitsEl = document.getElementById("admin-commits");
    const avatarEl = document.getElementById("admin-avatar");
    const nameEl = document.getElementById("admin-name");
    const handleEl = document.getElementById("admin-handle");

    if (scoreEl) scoreEl.textContent = `${adminScore} pts`;
    if (gamesEl) gamesEl.textContent = `${adminData.gamesCount || 2} Games`;
    if (filesEl) filesEl.textContent = `${adminData.filesCount || 12} Files`;
    if (commitsEl) commitsEl.textContent = `${adminData.commits || 19} Commits`;
    if (avatarEl && adminData.avatar_url) avatarEl.src = adminData.avatar_url;
    if (nameEl && adminData.name) nameEl.textContent = adminData.name;
    if (handleEl && adminData.login) {
      handleEl.textContent = `@${adminData.login}`;
      handleEl.href = `https://github.com/${adminData.login}`;
    }
  }

  function updateMetricsSummary() {
    let totalPoints = 0;
    let totalGames = 0;

    contributorsData.forEach((item) => {
      totalPoints += calculateScore(item);
      totalGames += (item.gamesCount || 0);
    });

    if (metricTotalPoints) metricTotalPoints.textContent = `${totalPoints}+`;
    if (metricTotalGames) metricTotalGames.textContent = totalGames;
    if (metricTotalContributors) metricTotalContributors.textContent = contributorsData.length;
  }

  // Render Podium for Community Contributors Only
  function renderPodium() {
    if (!podiumContainer) return;
    podiumContainer.innerHTML = "";

    const communityContributors = contributorsData.filter(
      c => c.login && c.login.toLowerCase() !== "debasmitabose0" && !c.isPlaceholder
    );

    if (communityContributors.length === 0) {
      podiumContainer.innerHTML = `
        <div class="podium-empty-notice" style="text-align: center; padding: 2rem; background: rgba(255, 255, 255, 0.02); border: 1px dashed var(--border-subtle); border-radius: var(--radius-lg); width: 100%; max-width: 600px; margin: 0 auto;">
          <div style="font-size: 2.2rem; margin-bottom: 0.5rem;">🌟</div>
          <h4 style="color: #fff; margin-bottom: 0.3rem;">Community Podium Awaiting Champions!</h4>
          <p style="color: var(--text-muted); font-size: 0.85rem; margin: 0;">Submit verified games, bug fixes, or UI features to earn your official place on the Hall of Fame podium.</p>
        </div>
      `;
      return;
    }

    let displayOrder = [];
    if (communityContributors.length === 1) {
      displayOrder = [{
        ...communityContributors[0],
        rank: 1,
        badge: "👑 1st Champion",
        height: "podium-1 solo-podium"
      }];
    } else if (communityContributors.length === 2) {
      displayOrder = [
        { ...communityContributors[0], rank: 1, badge: "👑 1st Champion", height: "podium-1" },
        { ...communityContributors[1], rank: 2, badge: "🥈 2nd Place", height: "podium-2" }
      ];
    } else {
      displayOrder = [
        { ...communityContributors[1], rank: 2, badge: "🥈 2nd Place", height: "podium-2" },
        { ...communityContributors[0], rank: 1, badge: "👑 1st Champion", height: "podium-1" },
        { ...communityContributors[2], rank: 3, badge: "🥉 3rd Place", height: "podium-3" }
      ];
    }

    displayOrder.forEach((item) => {
      const score = calculateScore(item);
      const filesCount = item.filesCount || (item.gamesCount * 3);
      const roleMeta = determineContributorRole(item);
      const card = document.createElement("div");
      card.className = `podium-card ${item.height}`;
      card.innerHTML = `
        <div class="podium-badge">${item.badge}</div>
        <img src="${item.avatar_url}" alt="${item.name}" class="podium-avatar" onerror="this.src='https://github.com/identicons/${item.login}.png'">
        <h3 class="podium-name">${item.name}</h3>
        <span class="role-pill-badge ${roleMeta.tagClass}">${roleMeta.badge}</span>
        <a href="https://github.com/${item.login}" target="_blank" rel="noopener noreferrer" class="podium-handle">@${item.login}</a>
        <div class="podium-score-pill">
          <strong>${score}</strong> pts
        </div>
        <div class="podium-meta-tags">
          <span class="meta-badge">🎮 ${item.gamesCount} Game(s)</span>
          <span class="meta-badge">📁 ${filesCount} Files</span>
          <span class="meta-badge">💻 ${item.commits} Commits</span>
        </div>
      `;
      podiumContainer.appendChild(card);
    });
  }

  // Render Full Leaderboard Table (Community Contributors Only)
  function renderTable() {
    if (!tableBody) return;
    tableBody.innerHTML = "";

    // Exclude Admin from community leaderboard table
    const communityOnly = contributorsData.filter(
      c => c.login && c.login.toLowerCase() !== "debasmitabose0"
    );

    const filtered = communityOnly.filter((item) => {
      const roleMeta = determineContributorRole(item);
      const matchesSearch = 
        item.name.toLowerCase().includes(searchQuery) ||
        item.login.toLowerCase().includes(searchQuery) ||
        (item.games && item.games.some(g => g.toLowerCase().includes(searchQuery)));

      let matchesTier = true;
      if (currentTier === "admin") matchesTier = roleMeta.category === "admin";
      else if (currentTier === "arcade") matchesTier = roleMeta.category === "arcade";
      else if (currentTier === "milestone") matchesTier = roleMeta.category === "milestone";

      return matchesSearch && matchesTier;
    });

    if (filtered.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 2.5rem; color: var(--text-muted);">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">🔍</div>
            <strong>No community contributors found matching "${searchQuery}"</strong>
            <p style="font-size: 0.85rem; margin-top: 0.3rem;">Try clearing your search query or switching tier filters.</p>
          </td>
        </tr>
      `;
      return;
    }

    filtered.forEach((item, index) => {
      const rank = index + 1;
      const score = calculateScore(item);
      const filesCount = item.filesCount || (item.gamesCount * 3);
      const roleMeta = determineContributorRole(item);

      let rankBadge = `#${rank}`;
      if (rank === 1) rankBadge = "🥇 #1";
      else if (rank === 2) rankBadge = "🥈 #2";
      else if (rank === 3) rankBadge = "🥉 #3";

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><span class="rank-tag rank-${rank}">${rankBadge}</span></td>
        <td>
          <div class="table-user-cell">
            <img src="${item.avatar_url}" alt="${item.name}" class="table-user-avatar" onerror="this.src='https://github.com/identicons/${item.login}.png'">
            <div>
              <strong class="user-display-name">${item.name}</strong>
              <div class="user-role-label">
                <span class="role-pill-badge ${roleMeta.tagClass}">${roleMeta.badge}</span>
              </div>
            </div>
          </div>
        </td>
        <td>
          <a href="https://github.com/${item.login}" target="_blank" rel="noopener noreferrer" class="github-handle-link">@${item.login}</a>
        </td>
        <td style="text-align: center;">
          <span class="games-count-pill" title="${(item.games || []).join(', ')}">🎮 ${item.gamesCount}</span>
        </td>
        <td style="text-align: center;">
          <span class="files-count-pill" title="Source files committed">📁 ${filesCount} files</span>
        </td>
        <td style="text-align: center;">
          <span class="commits-count-pill">💻 ${item.commits}</span>
        </td>
        <td style="text-align: right;">
          <strong class="score-highlight">${score} pts</strong>
        </td>
      `;
      tableBody.appendChild(tr);
    });
  }

  // Live GitHub Contributions with LocalStorage TTL Cache
  async function fetchLiveGitHubContributions(repo = "DebasmitaBose0/ArcadeVerse", forceRefresh = false) {
    if (!repo) return;

    // Check LocalStorage Cache first
    if (!forceRefresh) {
      try {
        const cachedRaw = localStorage.getItem(`${CACHE_KEY}_${repo}`);
        if (cachedRaw) {
          const cached = JSON.parse(cachedRaw);
          const isFresh = (Date.now() - cached.timestamp) < CACHE_TTL;
          if (isFresh && Array.isArray(cached.data) && cached.data.length > 0) {
            contributorsData = cached.data;
            const adminItem = contributorsData.find(c => c.login && c.login.toLowerCase() === "debasmitabose0");
            if (adminItem) updateAdminSpotlight(adminItem);

            sortContributors();
            updateMetricsSummary();
            renderPodium();
            renderTable();
            if (syncStatusText) {
              const minutesAgo = Math.floor((Date.now() - cached.timestamp) / 60000);
              syncStatusText.textContent = `Cached GitHub data (${minutesAgo}m ago • ${contributorsData.length} contributors)`;
            }
            return;
          }
        }
      } catch (e) {
        console.warn("Could not read from cache:", e);
      }
    }

    if (syncStatusText) syncStatusText.textContent = `Connecting to GitHub API (${repo})...`;

    try {
      const response = await fetch(`https://api.github.com/repos/${repo}/contributors`);
      if (!response.ok) {
        throw new Error(`GitHub returned status: ${response.status}`);
      }
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        const enrichedContributors = await Promise.all(
          data.map(async (user) => {
            let displayName = user.login;
            try {
              const userRes = await fetch(`https://api.github.com/users/${user.login}`);
              if (userRes.ok) {
                const userData = await userRes.json();
                if (userData.name) displayName = userData.name;
              }
            } catch (e) {
              console.warn("Could not fetch user details for", user.login);
            }

            const isAdmin = user.login.toLowerCase() === "debasmitabose0";
            let userGames = [];
            if (typeof GAMES_REGISTRY !== "undefined" && Array.isArray(GAMES_REGISTRY)) {
              userGames = GAMES_REGISTRY.filter(g => g.github && g.github.toLowerCase() === user.login.toLowerCase());
            }
            const gamesCount = userGames.length > 0 ? userGames.length : (isAdmin ? 2 : 1);
            const filesCount = isAdmin ? (gamesCount * 3 + 6) : (gamesCount * 3);

            const roleMeta = determineContributorRole({
              login: user.login,
              contributions: user.contributions,
              gamesCount: gamesCount
            });

            return {
              login: user.login,
              name: displayName,
              role: roleMeta.role,
              roleClass: roleMeta.tagClass,
              avatar_url: user.avatar_url,
              commits: user.contributions,
              gamesCount: gamesCount,
              filesCount: filesCount,
              games: userGames.length > 0 ? userGames.map(g => g.title) : ["Quantum Memory Matrix", "Cyber Neon Pong"]
            };
          })
        );

        contributorsData = enrichedContributors;
        const adminItem = contributorsData.find(c => c.login && c.login.toLowerCase() === "debasmitabose0");
        if (adminItem) updateAdminSpotlight(adminItem);

        // Save fresh data to LocalStorage Cache
        try {
          localStorage.setItem(`${CACHE_KEY}_${repo}`, JSON.stringify({
            timestamp: Date.now(),
            data: contributorsData
          }));
        } catch (e) {
          console.warn("Could not write to localStorage cache:", e);
        }

        if (syncStatusText) {
          syncStatusText.textContent = `Live GitHub data synced! (${data.length} contributor(s) verified)`;
        }
      }
    } catch (err) {
      console.warn("GitHub API notice:", err.message);
      if (syncStatusText) {
        syncStatusText.textContent = `Offline/Cached state: ${repo} (Rate limit safe)`;
      }
    }

    sortContributors();
    updateMetricsSummary();
    renderPodium();
    renderTable();
  }

  // Filter Search
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderTable();
    });
  }

  // Tier Filter Pills
  tierPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      tierPills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      currentTier = pill.getAttribute("data-tier");
      renderTable();
    });
  });

  if (fetchBtn) {
    fetchBtn.addEventListener("click", () => {
      const repo = repoInput ? repoInput.value.trim() : "DebasmitaBose0/ArcadeVerse";
      fetchLiveGitHubContributions(repo, true);
    });
  }

  // Initial Run
  updateAdminSpotlight(contributorsData[0]);
  sortContributors();
  updateMetricsSummary();
  renderPodium();
  renderTable();
  fetchLiveGitHubContributions("DebasmitaBose0/ArcadeVerse", false);
});
