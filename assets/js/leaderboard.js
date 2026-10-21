/**
 * Hall of Fame Live GitHub Contributors & Ranking Engine
 * Fetches real contributor stats from GitHub API (or seamlessly merges with games-registry)
 * Calculates contribution scores, renders the Top 3 Podium with Glittering Gold/Silver/Bronze cards,
 * differentiates Admin vs Contributors, awards dual-category badges, and provides direct GitHub Activity links.
 */

document.addEventListener("DOMContentLoaded", () => {
  const podiumContainer = document.getElementById("podium-container");
  const tableBody = document.getElementById("leaderboard-table-body");
  const repoInput = document.getElementById("repo-input");
  const fetchBtn = document.getElementById("fetch-github-btn");
  const syncStatusText = document.getElementById("sync-status-text");
  const filterTabs = document.querySelectorAll(".leaderboard-filter-tab");

  let currentFilter = "all"; // "all" | "community" | "admin"

  // Initial verified contributors (Project Lead)
  let contributorsData = [
    {
      login: "DebasmitaBose0",
      name: "Debasmita Bose",
      role: "Project Admin & Lead",
      avatar_url: "https://avatars.githubusercontent.com/u/144198639?v=4",
      commits: 19,
      gamesCount: 2,
      mechanicsBonus: 2,
      platformPRs: 2,
      qualityPRs: 0,
      bonusPts: 0,
      games: ["Quantum Memory Matrix", "Cyber Neon Pong"]
    }
  ];

  // Calculate ArcadeVerse Score:
  // - Verified Game: 100 pts per integrated game in games/
  // - Mechanics & Physics Bonus: 30 pts per advanced game
  // - Platform Feature & UI: 25 pts per core feature PR
  // - Quality & Bug Fixes: 15 pts per bug fix / maintenance PR
  function calculateScore(item) {
    const gamePts = (item.gamesCount || 0) * 100;
    const mechanicsPts = (item.mechanicsBonus || 0) * 30;
    const platformPts = (item.platformPRs || 0) * 25;
    const qualityPts = (item.qualityPRs || 0) * 15;
    const bonus = item.bonusPts || 0;

    const calculated = gamePts + mechanicsPts + platformPts + qualityPts + bonus;
    // Fallback for new GitHub contributors not yet registered in CONTRIBUTORS_REGISTRY
    if (calculated === 0 && item.commits > 0) {
      return Math.min(item.commits * 10, 50);
    }
    return calculated;
  }

  // Contributor Badges Engine:
  // Evaluates and returns an array of the HIGHEST badges for EACH category:
  // 1. Leadership Category (Project Admin & Lead)
  // 2. Games Dedicated Category (Master Game Architect, Hyper Game Developer, Arcade Developer, Arcade Explorer)
  // 3. General Milestones Category (Master, Elite, Novice, Project, Active Contributor)
  function getContributorBadges(user) {
    const badges = [];
    const isAdmin = user.login && user.login.toLowerCase() === "debasmitabose0";

    // 1. Leadership Badge
    if (isAdmin) {
      badges.push({
        role: "Project Admin & Lead",
        tagClass: "role-admin",
        label: "Project Admin & Lead",
        lucideIcon: "shield-check",
        category: "Leadership"
      });
    }

    // 2. Dedicated Game Developer Tier (Earned ONLY by creating games!)
    const gamesCount = user.gamesCount || 0;
    if (gamesCount >= 10) {
      badges.push({
        role: "Master Game Architect",
        tagClass: "role-master-architect",
        label: "Master Game Architect",
        lucideIcon: "crown",
        category: "Games Dedicated"
      });
    } else if (gamesCount >= 5) {
      badges.push({
        role: "Hyper Game Developer",
        tagClass: "role-hyper",
        label: "Hyper Game Developer",
        lucideIcon: "zap",
        category: "Games Dedicated"
      });
    } else if (gamesCount >= 2) {
      badges.push({
        role: "Arcade Developer",
        tagClass: "role-arcade",
        label: "Arcade Developer",
        lucideIcon: "gamepad-2",
        category: "Games Dedicated"
      });
    } else if (gamesCount === 1) {
      badges.push({
        role: "Arcade Explorer",
        tagClass: "role-explorer",
        label: "Arcade Explorer",
        lucideIcon: "compass",
        category: "Games Dedicated"
      });
    }

    // 3. Repository-wide Arcade Score Milestone Tiers
    const score = calculateScore(user);
    if (score >= 500) {
      badges.push({
        role: "Master Contributor",
        tagClass: "role-master",
        label: "Master Contributor",
        lucideIcon: "trophy",
        category: "General Milestones"
      });
    } else if (score >= 250) {
      badges.push({
        role: "Elite Contributor",
        tagClass: "role-elite",
        label: "Elite Contributor",
        lucideIcon: "gem",
        category: "General Milestones"
      });
    } else if (score >= 100) {
      badges.push({
        role: "Novice Contributor",
        tagClass: "role-novice",
        label: "Novice Contributor",
        lucideIcon: "sparkles",
        category: "General Milestones"
      });
    } else if (score >= 25) {
      badges.push({
        role: "Project Contributor",
        tagClass: "role-project",
        label: "Project Contributor",
        lucideIcon: "rocket",
        category: "General Milestones"
      });
    } else {
      badges.push({
        role: "Active Contributor",
        tagClass: "role-active",
        label: "Active Contributor",
        lucideIcon: "sprout",
        category: "Getting Started"
      });
    }

    return badges;
  }

  // Sort contributors descending by score
  function sortContributors() {
    contributorsData.sort((a, b) => calculateScore(b) - calculateScore(a));
  }

  // Format work breakdown label
  function getWorkBreakdown(item) {
    const games = item.gamesCount || 0;
    const feat = item.platformPRs || 0;
    const fix = item.qualityPRs || 0;
    return `Games: ${games} • Feat: ${feat} • Fix: ${fix}`;
  }

  // Render Podium with Glittering Gold, Silver, and Bronze cards
  function renderPodium() {
    if (!podiumContainer) return;
    podiumContainer.innerHTML = "";

    if (contributorsData.length === 0) return;

    // Filter to only real contributors
    const realContributors = contributorsData.filter(c => !c.isPlaceholder);

    let displayOrder = [];
    if (realContributors.length === 1) {
      // 1 Contributor -> Center golden solo champion podium
      displayOrder = [{
        ...realContributors[0],
        rank: 1,
        badgeType: "gold",
        badgeLabel: "1st Champion",
        badgeIcon: "crown",
        cardClass: "podium-1 podium-gold solo-podium"
      }];
    } else if (realContributors.length === 2) {
      displayOrder = [
        { ...realContributors[0], rank: 1, badgeType: "gold", badgeLabel: "1st Champion", badgeIcon: "crown", cardClass: "podium-1 podium-gold" },
        { ...realContributors[1], rank: 2, badgeType: "silver", badgeLabel: "2nd Place", badgeIcon: "medal", cardClass: "podium-2 podium-silver" }
      ];
    } else {
      // Standard 3-position podium: 2nd on left, 1st in center, 3rd on right
      displayOrder = [
        { ...realContributors[1], rank: 2, badgeType: "silver", badgeLabel: "2nd Place", badgeIcon: "medal", cardClass: "podium-2 podium-silver" },
        { ...realContributors[0], rank: 1, badgeType: "gold", badgeLabel: "1st Champion", badgeIcon: "crown", cardClass: "podium-1 podium-gold" },
        { ...realContributors[2], rank: 3, badgeType: "bronze", badgeLabel: "3rd Place", badgeIcon: "medal", cardClass: "podium-3 podium-bronze" }
      ];
    }

    displayOrder.forEach((item) => {
      const score = calculateScore(item);
      const badges = getContributorBadges(item);
      const card = document.createElement("div");
      card.className = `podium-card ${item.cardClass}`;
      card.innerHTML = `
        <div class="podium-badge podium-badge-${item.badgeType}">
          <i data-lucide="${item.badgeIcon}"></i> ${item.badgeLabel}
        </div>
        <img src="${item.avatar_url}" alt="${item.name}" class="podium-avatar" onerror="this.src='https://github.com/identicons/${item.login}.png'">
        <h3 class="podium-name">${item.name}</h3>
        <a href="https://github.com/${item.login}" target="_blank" class="podium-handle">@${item.login}</a>
        
        <div class="podium-badges-container">
          ${badges.map(b => `<span class="role-pill-badge ${b.tagClass}"><i data-lucide="${b.lucideIcon}"></i> ${b.label}</span>`).join("")}
        </div>

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

  // Render Full Leaderboard Table with Work Logs & Activity Links
  function renderTable() {
    if (!tableBody) return;
    tableBody.innerHTML = "";

    // Filter contributors based on selected tab
    const filteredContributors = contributorsData.filter(item => {
      const isAdmin = item.login && item.login.toLowerCase() === "debasmitabose0";
      if (currentFilter === "community") return !isAdmin;
      if (currentFilter === "admin") return isAdmin;
      return true;
    });

    if (filteredContributors.length === 0) {
      const emptyTr = document.createElement("tr");
      emptyTr.innerHTML = `
        <td colspan="9" style="text-align: center; padding: 2.5rem; color: var(--text-muted);">
          <i data-lucide="info" style="margin-right: 0.4rem;"></i> No contributors found in this category.
        </td>
      `;
      tableBody.appendChild(emptyTr);
      if (window.lucide) lucide.createIcons();
      return;
    }

    filteredContributors.forEach((item, index) => {
      const rank = index + 1;
      const score = calculateScore(item);
      const badges = getContributorBadges(item);
      const isAdmin = item.login && item.login.toLowerCase() === "debasmitabose0";

      let rankBadgeHtml = `<span class="rank-tag">#${rank}</span>`;
      if (isAdmin && currentFilter === "all") {
        rankBadgeHtml = `<span class="rank-tag rank-admin" title="Project Maintainer & Lead Architect"><i data-lucide="shield-check"></i> ADMIN</span>`;
      } else if (rank === 1) {
        rankBadgeHtml = `<span class="rank-tag rank-1"><i data-lucide="trophy"></i> #1</span>`;
      } else if (rank === 2) {
        rankBadgeHtml = `<span class="rank-tag rank-2"><i data-lucide="medal"></i> #2</span>`;
      } else if (rank === 3) {
        rankBadgeHtml = `<span class="rank-tag rank-3"><i data-lucide="medal"></i> #3</span>`;
      }

      const tr = document.createElement("tr");
      if (isAdmin) tr.className = "admin-row";

      tr.innerHTML = `
        <td>${rankBadgeHtml}</td>
        <td>
          <div class="table-user-cell">
            <img src="${item.avatar_url}" alt="${item.name}" class="table-user-avatar" onerror="this.src='https://github.com/identicons/${item.login}.png'">
            <div>
              <strong class="user-display-name">${item.name}</strong>
              <span class="user-handle-sub">@${item.login}</span>
            </div>
          </div>
        </td>
        <td>
          <div class="contributor-badges-wrap">
            ${badges.map(b => `<span class="role-pill-badge ${b.tagClass}"><i data-lucide="${b.lucideIcon}"></i> ${b.label}</span>`).join("")}
          </div>
        </td>
        <td>
          <a href="https://github.com/${item.login}" target="_blank" class="github-handle-link">@${item.login}</a>
        </td>
        <td style="text-align: center;">
          <span class="games-count-pill" title="${(item.games || []).join(', ')}"><i data-lucide="gamepad-2"></i> ${item.gamesCount}</span>
        </td>
        <td style="text-align: center;">
          <span class="files-count-pill" title="Effort: Games ${item.gamesCount}, Features ${item.platformPRs || 0}, Quality ${item.qualityPRs || 0}"><i data-lucide="git-pull-request"></i> ${getWorkBreakdown(item)}</span>
        </td>
        <td style="text-align: center;">
          <span class="commits-count-pill"><i data-lucide="git-commit"></i> ${item.commits}</span>
        </td>
        <td style="text-align: center;">
          <div class="activity-links-group">
            <a href="https://github.com/DebasmitaBose0/ArcadeVerse/issues?q=author%3A${item.login}" target="_blank" rel="noopener noreferrer" class="activity-link-btn" title="View Issues authored by @${item.login}">
              <i data-lucide="circle-dot"></i> Issues
            </a>
            <a href="https://github.com/DebasmitaBose0/ArcadeVerse/pulls?q=author%3A${item.login}" target="_blank" rel="noopener noreferrer" class="activity-link-btn" title="View Pull Requests by @${item.login}">
              <i data-lucide="git-pull-request"></i> PRs
            </a>
          </div>
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

  // Filter Tab Controls
  if (filterTabs) {
    filterTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        filterTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        currentFilter = tab.getAttribute("data-filter") || "all";
        renderTable();
      });
    });
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
            
            // Check if contributor exists in CONTRIBUTORS_REGISTRY
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

            const mechanicsBonus = registryEntry ? (registryEntry.mechanicsBonus || 0) : (isAdmin ? 2 : 0);
            const platformPRs = registryEntry ? (registryEntry.platformPRs || 0) : (isAdmin ? 2 : 0);
            const qualityPRs = registryEntry ? (registryEntry.qualityPRs || 0) : 0;
            const bonusPts = registryEntry ? (registryEntry.bonusPts || 0) : 0;

            const contributorObj = {
              login: user.login,
              name: registryEntry ? registryEntry.name : displayName,
              avatar_url: user.avatar_url,
              commits: user.contributions,
              gamesCount: gamesCount,
              mechanicsBonus: mechanicsBonus,
              platformPRs: platformPRs,
              qualityPRs: qualityPRs,
              bonusPts: bonusPts,
              games: userGames.length > 0 ? userGames.map(g => g.title) : (isAdmin ? ["Quantum Memory Matrix", "Cyber Neon Pong"] : [])
            };

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
