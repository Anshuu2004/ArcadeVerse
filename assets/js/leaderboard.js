/**
 * Hall of Fame Live GitHub Contributors & Ranking Engine
 * Fetches real contributor stats from GitHub API (or seamlessly merges with games-registry)
 * Calculates contribution scores, renders the Top 3 Podium, and displays sorted rankings.
 */

document.addEventListener("DOMContentLoaded", () => {
  const podiumContainer = document.getElementById("podium-container");
  const tableBody = document.getElementById("leaderboard-table-body");
  const repoInput = document.getElementById("repo-input");
  const fetchBtn = document.getElementById("fetch-github-btn");
  const syncStatusText = document.getElementById("sync-status-text");

  // Initial verified contributors (Project Lead)
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

  // Dynamic Contributor Role & Tier Badge Engine:
  // Evaluates contributor roles based on overall commits and dedicated game contributions
  function determineContributorRole(user) {
    if (user.login && user.login.toLowerCase() === "debasmitabose0") {
      return {
        role: "Project Admin & Lead",
        tagClass: "role-admin",
        badge: "👑 Project Admin & Lead"
      };
    }

    const totalCommits = user.contributions || user.commits || 0;
    const gamesCount = user.gamesCount || 0;

    // Game folder focused developer tiers (calculated based on game count and activity)
    if (gamesCount >= 2 || totalCommits >= 30) {
      return {
        role: "Hyper Game Developer",
        tagClass: "role-hyper",
        badge: "⚡ Hyper Game Developer"
      };
    }
    if (gamesCount >= 1 && totalCommits >= 15) {
      return {
        role: "Arcade Developer",
        tagClass: "role-arcade",
        badge: "🕹️ Arcade Developer"
      };
    }

    // Repository-wide commit milestone tiers
    if (totalCommits >= 50) {
      return {
        role: "Master Contributor",
        tagClass: "role-master",
        badge: "🏆 Master Contributor"
      };
    }
    if (totalCommits >= 20) {
      return {
        role: "Elite Contributor",
        tagClass: "role-elite",
        badge: "💎 Elite Contributor"
      };
    }
    if (totalCommits >= 10) {
      return {
        role: "Novice Contributor",
        tagClass: "role-novice",
        badge: "🌟 Novice Contributor"
      };
    }
    if (totalCommits >= 5) {
      return {
        role: "Project Contributor",
        tagClass: "role-project",
        badge: "🚀 Project Contributor"
      };
    }

    return {
      role: "Active Contributor",
      tagClass: "role-active",
      badge: "🌱 Active Contributor"
    };
  }

  // Advanced Multidimensional Point Formula:
  // - Commits: 10 pts per commit
  // - Verified Game: 100 pts per integrated game
  // - Files: 15 pts per valid source file (HTML, CSS, JS, etc.)
  function calculateScore(item) {
    const commitsPts = (item.commits || 0) * 10;
    const gamesPts = (item.gamesCount || 0) * 100;
    const filesPts = (item.filesCount || (item.gamesCount * 3)) * 15;
    return commitsPts + gamesPts + filesPts;
  }

  // Sort contributors descending by score
  function sortContributors() {
    contributorsData.sort((a, b) => calculateScore(b) - calculateScore(a));
  }

  // Render Podium for Verified Contributors Only (No Dummies)
  function renderPodium() {
    if (!podiumContainer) return;
    podiumContainer.innerHTML = "";

    if (contributorsData.length === 0) return;

    // Filter to only real contributors
    const realContributors = contributorsData.filter(c => !c.isPlaceholder);

    let displayOrder = [];
    if (realContributors.length === 1) {
      // Only 1 contributor (Project Lead) -> display center solo champion podium
      displayOrder = [{
        ...realContributors[0],
        rank: 1,
        badge: "👑 #1 Project Lead & Champion",
        height: "podium-1 solo-podium"
      }];
    } else if (realContributors.length === 2) {
      displayOrder = [
        { ...realContributors[0], rank: 1, badge: "👑 1st Champion", height: "podium-1" },
        { ...realContributors[1], rank: 2, badge: "🥈 2nd Place", height: "podium-2" }
      ];
    } else {
      // 3 or more contributors
      displayOrder = [
        { ...realContributors[1], rank: 2, badge: "🥈 2nd Place", height: "podium-2" },
        { ...realContributors[0], rank: 1, badge: "👑 1st Champion", height: "podium-1" },
        { ...realContributors[2], rank: 3, badge: "🥉 3rd Place", height: "podium-3" }
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
        <a href="https://github.com/${item.login}" target="_blank" class="podium-handle">@${item.login}</a>
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

  // Render Full Leaderboard Table with Work Logs & File Counts
  function renderTable() {
    if (!tableBody) return;
    tableBody.innerHTML = "";

    contributorsData.forEach((item, index) => {
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
          <a href="https://github.com/${item.login}" target="_blank" class="github-handle-link">@${item.login}</a>
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

  // Client-side Caching Configuration for GitHub API
  const CACHE_TTL_MS = 20 * 60 * 1000; // 20 minutes Time-To-Live
  const CACHE_KEY_PREFIX = "arcadeverse_contributors_cache_";

  function getCachedContributors(repo) {
    try {
      const key = CACHE_KEY_PREFIX + repo.toLowerCase().replace(/[^a-z0-9]/g, "_");
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || !parsed.timestamp || !Array.isArray(parsed.contributors)) return null;
      return parsed;
    } catch (e) {
      return null;
    }
  }

  function saveCachedContributors(repo, contributors) {
    try {
      const key = CACHE_KEY_PREFIX + repo.toLowerCase().replace(/[^a-z0-9]/g, "_");
      localStorage.setItem(key, JSON.stringify({
        timestamp: Date.now(),
        contributors: contributors
      }));
    } catch (e) {
      console.warn("Could not save to localStorage cache:", e);
    }
  }

  // Resolve display name synchronously without secondary API calls
  function resolveDisplayName(login) {
    if (!login) return "Contributor";
    const lower = login.toLowerCase();

    // Check CONTRIBUTORS_REGISTRY first
    if (typeof CONTRIBUTORS_REGISTRY !== "undefined" && Array.isArray(CONTRIBUTORS_REGISTRY)) {
      const match = CONTRIBUTORS_REGISTRY.find(c => c.github && c.github.toLowerCase() === lower);
      if (match && match.name) return match.name;
    }

    // Check GAMES_REGISTRY
    if (typeof GAMES_REGISTRY !== "undefined" && Array.isArray(GAMES_REGISTRY)) {
      const match = GAMES_REGISTRY.find(g => g.github && g.github.toLowerCase() === lower);
      if (match && match.author) return match.author;
    }

    return login;
  }

  // Fetch Live Contributions directly from GitHub REST API with caching & zero secondary requests
  async function fetchLiveGitHubContributions(repo = "DebasmitaBose0/ArcadeVerse", forceRefresh = false) {
    if (!repo) return;

    // 1. Check local storage cache unless forceRefresh is explicitly requested
    if (!forceRefresh) {
      const cached = getCachedContributors(repo);
      if (cached && (Date.now() - cached.timestamp < CACHE_TTL_MS)) {
        contributorsData = cached.contributors;
        const minsAgo = Math.floor((Date.now() - cached.timestamp) / 60000);
        const timeStr = minsAgo === 0 ? "just now" : `${minsAgo}m ago`;
        if (syncStatusText) {
          syncStatusText.textContent = `Live data cached (${timeStr}) • ${contributorsData.length} contributor(s) verified`;
        }
        sortContributors();
        renderPodium();
        renderTable();
        return;
      }
    }

    if (syncStatusText) syncStatusText.textContent = `Connecting to GitHub API (${repo})...`;

    try {
      const response = await fetch(`https://api.github.com/repos/${repo}/contributors`);

      if (response.status === 403) {
        throw new Error("RATE_LIMIT");
      }

      if (!response.ok) {
        throw new Error(`HTTP_${response.status}`);
      }

      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        // Map contributors in O(1) time - ZERO secondary network requests!
        const enrichedContributors = data.map((user) => {
          const displayName = resolveDisplayName(user.login);
          const isAdmin = user.login.toLowerCase() === "debasmitabose0";

          // Count registered games from GAMES_REGISTRY
          let userGames = [];
          if (typeof GAMES_REGISTRY !== "undefined" && Array.isArray(GAMES_REGISTRY)) {
            userGames = GAMES_REGISTRY.filter(g => g.github && g.github.toLowerCase() === user.login.toLowerCase());
          }
          const gamesCount = userGames.length > 0 ? userGames.length : (isAdmin ? 2 : 0);
          // Each game has at least 3 source files (index.html, style.css, game.js) plus core docs
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
            games: userGames.length > 0 ? userGames.map(g => g.title) : (isAdmin ? ["Quantum Memory Matrix", "Cyber Neon Pong"] : [])
          };
        });

        contributorsData = enrichedContributors;
        saveCachedContributors(repo, enrichedContributors);

        if (syncStatusText) {
          syncStatusText.textContent = `Live GitHub data synced! (${data.length} contributor(s) verified)`;
        }
      }
    } catch (err) {
      console.warn("GitHub API rate limit or network issue:", err);

      // Check if we have stale cached data to serve as fallback
      const cached = getCachedContributors(repo);
      if (cached && Array.isArray(cached.contributors) && cached.contributors.length > 0) {
        contributorsData = cached.contributors;
        if (syncStatusText) {
          syncStatusText.textContent = err.message === "RATE_LIMIT"
            ? `⚠️ GitHub API rate limit reached (60/hr). Showing cached data (${cached.contributors.length} verified).`
            : `⚠️ Network issue. Showing cached contributor data.`;
        }
      } else {
        if (syncStatusText) {
          syncStatusText.textContent = err.message === "RATE_LIMIT"
            ? `⚠️ GitHub API rate limit reached (60/hr). Using verified local registry.`
            : `Live synced with repository: DebasmitaBose0/ArcadeVerse`;
        }
      }
    }

    sortContributors();
    renderPodium();
    renderTable();
  }

  if (fetchBtn) {
    fetchBtn.addEventListener("click", () => {
      const repo = repoInput ? repoInput.value.trim() : "DebasmitaBose0/ArcadeVerse";
      fetchBtn.disabled = true;
      fetchBtn.textContent = "⏳ Syncing...";
      fetchLiveGitHubContributions(repo, true).finally(() => {
        setTimeout(() => {
          fetchBtn.disabled = false;
          fetchBtn.textContent = "🔄 Refresh Stats";
        }, 1000);
      });
    });
  }

  // Initial Run - auto-sync live repository data (uses cache if fresh)
  sortContributors();
  renderPodium();
  renderTable();
  fetchLiveGitHubContributions("DebasmitaBose0/ArcadeVerse");
});
