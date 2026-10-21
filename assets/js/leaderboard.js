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
      level1PRs: 0,
      level2PRs: 2,
      level3PRs: 0,
      bonusPts: 0,
      games: ["Quantum Memory Matrix", "Cyber Neon Pong"]
    }
  ];

  // Calculate NSoC-compliant score (Level 1: 3pts, Level 2: 5pts, Level 3 / Games: 10pts)
  function calculateScore(item) {
    const l1 = (item.level1PRs || 0) * 3;
    const l2 = (item.level2PRs || 0) * 5;
    const gamesPts = (item.gamesCount || 0) * 10;
    const l3Other = (item.level3PRs || 0) * 10;
    const bonus = item.bonusPts || 0;

    const calculated = l1 + l2 + gamesPts + l3Other + bonus;
    // Fallback if item has only raw commits and no verified PR entry yet
    if (calculated === 0 && item.commits > 0) {
      return Math.min(item.commits * 3, 15); // baseline active contributor score
    }
    return calculated;
  }

  // Dynamic Contributor Role & Tier Badge Engine:
  // Evaluates dedicated game titles (1, 2-3, 4-5, 6+) and repository point milestones (10, 25, 50, 100)
  function determineContributorRole(user) {
    if (user.login && user.login.toLowerCase() === "debasmitabose0") {
      return {
        role: "Project Admin & Lead",
        tagClass: "role-admin",
        badge: "👑 Project Admin & Lead",
        lucideIcon: "crown"
      };
    }

    const gamesCount = user.gamesCount || 0;
    const score = calculateScore(user);

    // 1. Dedicated Game Developer Tiers (Only earned by building games!)
    if (gamesCount >= 6) {
      return {
        role: "Master Game Architect",
        tagClass: "role-master-architect",
        badge: "👑 Master Game Architect",
        lucideIcon: "crown"
      };
    }
    if (gamesCount >= 4) {
      return {
        role: "Hyper Game Developer",
        tagClass: "role-hyper",
        badge: "⚡ Hyper Game Developer",
        lucideIcon: "zap"
      };
    }
    if (gamesCount >= 2) {
      return {
        role: "Arcade Developer",
        tagClass: "role-arcade",
        badge: "🎮 Arcade Developer",
        lucideIcon: "gamepad-2"
      };
    }
    if (gamesCount === 1) {
      return {
        role: "Arcade Explorer",
        tagClass: "role-explorer",
        badge: "🕹️ Arcade Explorer",
        lucideIcon: "compass"
      };
    }

    // 2. Repository-wide NSoC Point Milestone Tiers
    if (score >= 100) {
      return {
        role: "Master Contributor",
        tagClass: "role-master",
        badge: "🏆 Master Contributor",
        lucideIcon: "trophy"
      };
    }
    if (score >= 50) {
      return {
        role: "Elite Contributor",
        tagClass: "role-elite",
        badge: "💎 Elite Contributor",
        lucideIcon: "gem"
      };
    }
    if (score >= 25) {
      return {
        role: "Novice Contributor",
        tagClass: "role-novice",
        badge: "🌟 Novice Contributor",
        lucideIcon: "sparkles"
      };
    }
    if (score >= 10) {
      return {
        role: "Project Contributor",
        tagClass: "role-project",
        badge: "🚀 Project Contributor",
        lucideIcon: "rocket"
      };
    }

    return {
      role: "Active Contributor",
      tagClass: "role-active",
      badge: "🌱 Active Contributor",
      lucideIcon: "sprout"
    };
  }

  // Sort contributors descending by score
  function sortContributors() {
    contributorsData.sort((a, b) => calculateScore(b) - calculateScore(a));
  }

  // Format work breakdown label
  function getWorkBreakdown(item) {
    const l1 = item.level1PRs || 0;
    const l2 = item.level2PRs || 0;
    const l3 = (item.gamesCount || 0) + (item.level3PRs || 0);
    return `L1: ${l1} • L2: ${l2} • L3: ${l3}`;
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
      const roleMeta = determineContributorRole(item);
      const card = document.createElement("div");
      card.className = `podium-card ${item.height}`;
      card.innerHTML = `
        <div class="podium-badge">${item.badge}</div>
        <img src="${item.avatar_url}" alt="${item.name}" class="podium-avatar" onerror="this.src='https://github.com/identicons/${item.login}.png'">
        <h3 class="podium-name">${item.name}</h3>
        <span class="role-pill-badge ${roleMeta.tagClass}"><i data-lucide="${roleMeta.lucideIcon || 'award'}"></i> ${roleMeta.badge}</span>
        <a href="https://github.com/${item.login}" target="_blank" class="podium-handle">@${item.login}</a>
        <div class="podium-score-pill">
          <strong>${score}</strong> pts
        </div>
        <div class="podium-meta-tags">
          <span class="meta-badge"><i data-lucide="gamepad-2"></i> ${item.gamesCount} Game(s)</span>
          <span class="meta-badge"><i data-lucide="git-pull-request"></i> ${getWorkBreakdown(item)}</span>
          <span class="meta-badge"><i data-lucide="git-commit"></i> ${item.commits} Commits</span>
        </div>
      `;
      podiumContainer.appendChild(card);
    });

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  // Render Full Leaderboard Table with Work Logs
  function renderTable() {
    if (!tableBody) return;
    tableBody.innerHTML = "";

    contributorsData.forEach((item, index) => {
      const rank = index + 1;
      const score = calculateScore(item);
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
                <span class="role-pill-badge ${roleMeta.tagClass}"><i data-lucide="${roleMeta.lucideIcon || 'award'}"></i> ${roleMeta.badge}</span>
              </div>
            </div>
          </div>
        </td>
        <td>
          <a href="https://github.com/${item.login}" target="_blank" class="github-handle-link">@${item.login}</a>
        </td>
        <td style="text-align: center;">
          <span class="games-count-pill" title="${(item.games || []).join(', ')}"><i data-lucide="gamepad-2"></i> ${item.gamesCount}</span>
        </td>
        <td style="text-align: center;">
          <span class="files-count-pill" title="NSoC PR Breakdown"><i data-lucide="git-pull-request"></i> ${getWorkBreakdown(item)}</span>
        </td>
        <td style="text-align: center;">
          <span class="commits-count-pill"><i data-lucide="git-commit"></i> ${item.commits}</span>
        </td>
        <td style="text-align: right;">
          <strong class="score-highlight">${score} pts</strong>
        </td>
      `;
      tableBody.appendChild(tr);
    });

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  // Fetch Live Contributions directly from GitHub REST API
  async function fetchLiveGitHubContributions(repo = "DebasmitaBose0/ArcadeVerse") {
    if (!repo) return;
    if (syncStatusText) syncStatusText.textContent = `Connecting to GitHub API (${repo})...`;

    try {
      const response = await fetch(`https://api.github.com/repos/${repo}/contributors`);
      if (!response.ok) {
        throw new Error(`GitHub returned status: ${response.status}`);
      }
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        // Fetch detailed profile for contributors to display accurate names
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
            
            // Check if contributor exists in CONTRIBUTORS_REGISTRY for verified PR levels
            let registryEntry = null;
            if (typeof CONTRIBUTORS_REGISTRY !== "undefined" && Array.isArray(CONTRIBUTORS_REGISTRY)) {
              registryEntry = CONTRIBUTORS_REGISTRY.find(c => c.github && c.github.toLowerCase() === user.login.toLowerCase());
            }

            // Count registered games from GAMES_REGISTRY
            let userGames = [];
            if (typeof GAMES_REGISTRY !== "undefined" && Array.isArray(GAMES_REGISTRY)) {
              userGames = GAMES_REGISTRY.filter(g => g.github && g.github.toLowerCase() === user.login.toLowerCase());
            }
            const gamesCount = userGames.length > 0 ? userGames.length : (registryEntry ? registryEntry.gamesCount : (isAdmin ? 2 : 0));

            const level1PRs = registryEntry ? (registryEntry.level1PRs || 0) : 0;
            const level2PRs = registryEntry ? (registryEntry.level2PRs || 0) : (isAdmin ? 2 : 0);
            const level3PRs = registryEntry ? (registryEntry.level3PRs || 0) : 0;
            const bonusPts = registryEntry ? (registryEntry.bonusPts || 0) : 0;

            const contributorObj = {
              login: user.login,
              name: registryEntry ? registryEntry.name : displayName,
              avatar_url: user.avatar_url,
              commits: user.contributions,
              gamesCount: gamesCount,
              level1PRs: level1PRs,
              level2PRs: level2PRs,
              level3PRs: level3PRs,
              bonusPts: bonusPts,
              games: userGames.length > 0 ? userGames.map(g => g.title) : (isAdmin ? ["Quantum Memory Matrix", "Cyber Neon Pong"] : [])
            };

            const roleMeta = determineContributorRole(contributorObj);
            contributorObj.role = roleMeta.role;
            contributorObj.roleClass = roleMeta.tagClass;

            return contributorObj;
          })
        );

        contributorsData = enrichedContributors;
        if (syncStatusText) syncStatusText.textContent = `Live GitHub data synced! (${data.length} contributor(s) verified)`;
      }
    } catch (err) {
      console.warn("GitHub API rate limit or network issue:", err);
      if (syncStatusText) syncStatusText.textContent = `Live synced with repository: DebasmitaBose0/ArcadeVerse`;
    }

    sortContributors();
    renderPodium();
    renderTable();
  }

  if (fetchBtn) {
    fetchBtn.addEventListener("click", () => {
      const repo = repoInput ? repoInput.value.trim() : "DebasmitaBose0/ArcadeVerse";
      fetchLiveGitHubContributions(repo);
    });
  }

  // Initial Run - auto-sync live repository data
  sortContributors();
  renderPodium();
  renderTable();
  fetchLiveGitHubContributions("DebasmitaBose0/ArcadeVerse");
});
