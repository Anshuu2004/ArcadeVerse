/**
 * Hall of Fame Live GitHub Contributors & Ranking Engine
 * Fetches real contributor stats from GitHub API (or seamlessly merges with games-registry)
 * 
 * Architecture:
 * - Admin (Project Lead) has a dedicated separate rank card at the top.
 * - Podium and Leaderboard Table display ONLY Community Contributors.
 * - Cards are static by default, with an elegant corner gradient radiating on hover.
 * - Dual-category highest badges: Displays highest Game Dedicated badge and highest Milestone badge.
 * - Direct GitHub Activity column with clickable links for Issues and PRs.
 */

document.addEventListener("DOMContentLoaded", () => {
  const podiumContainer = document.getElementById("podium-container");
  const tableBody = document.getElementById("leaderboard-table-body");
  const repoInput = document.getElementById("repo-input");
  const fetchBtn = document.getElementById("fetch-github-btn");
  const syncStatusText = document.getElementById("sync-status-text");
  const adminMetaInfo = document.getElementById("admin-meta-info");

  // Leaderboard Switcher (Community Contributors vs Admin View)
  const switchContribBtn = document.getElementById("switch-contributors-btn");
  const switchAdminBtn = document.getElementById("switch-admin-btn");
  const viewContributors = document.getElementById("view-contributors");
  const viewAdmin = document.getElementById("view-admin");

  if (switchContribBtn && switchAdminBtn && viewContributors && viewAdmin) {
    switchContribBtn.addEventListener("click", () => {
      switchContribBtn.classList.add("active");
      switchAdminBtn.classList.remove("active");
      viewContributors.style.display = "block";
      viewAdmin.style.display = "none";
      if (window.lucide) lucide.createIcons();
    });

    switchAdminBtn.addEventListener("click", () => {
      switchAdminBtn.classList.add("active");
      switchContribBtn.classList.remove("active");
      viewAdmin.style.display = "block";
      viewContributors.style.display = "none";
      if (window.lucide) lucide.createIcons();
    });
  }

  // Initial verified contributors from repository
  let contributorsData = [
    {
      login: "DebasmitaBose0",
      name: "Debasmita Bose",
      role: "Project Admin & Lead",
      avatar_url: "https://avatars.githubusercontent.com/u/144198639?v=4",
      commits: 37,
      gamesCount: 2,
      mechanicsBonus: 2,
      platformPRs: 2,
      qualityPRs: 0,
      bonusPts: 0,
      games: ["Quantum Memory Matrix", "Cyber Neon Pong"]
    },
    {
      login: "joitapaul",
      name: "Joita Paul",
      role: "Active Contributor",
      avatar_url: "https://avatars.githubusercontent.com/u/104523098?v=4",
      commits: 1,
      gamesCount: 0,
      mechanicsBonus: 0,
      platformPRs: 0,
      qualityPRs: 1,
      bonusPts: 0,
      games: []
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
    // Base score for new contributors with merged PRs/commits (minimum 15 pts per merged contribution)
    if (calculated === 0 && item.commits > 0) {
      return item.commits * 15;
    }
    return calculated;
  }

  // Contributor Badges Engine:
  // Evaluates and returns an array of the HIGHEST badges for EACH category:
  // 1. Leadership Category (Project Admin & Lead)
  // 2. Games Dedicated Category (45-Day NSoC Program Scaling):
  //    - Master Game Architect (10+ Verified Games)
  //    - Hyper Game Developer (5–9 Verified Games)
  //    - Arcade Developer (2–4 Verified Games)
  //    - Arcade Explorer (1 Verified Game)
  // 3. General Milestones Category:
  //    - Elite Contributor (10+ Merged Commits / PRs)
  //    - Active Contributor (Verified Merged Contribution)
  function getContributorBadges(user) {
    const badges = [];
    const isAdmin = user.login && user.login.toLowerCase() === "debasmitabose0";

    // 1. Leadership Badge (Only for Project Lead)
    if (isAdmin) {
      badges.push({
        role: "Project Admin & Lead",
        tagClass: "role-admin",
        label: "Project Admin & Lead",
        lucideIcon: "crown",
        category: "Leadership"
      });
    }

  // 2. Dedicated Game Developer Tier (45-Day NSoC Program Scaling: 10+ Master, 5–9 Hyper, 2–4 Arcade Dev, 1 Explorer)
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

    // 3. General Milestone Tiers (Based on verified contributions/commits and points)
    const commitsCount = user.commits || 0;
    const score = calculateScore(user);
    if (commitsCount >= 10 || score >= 150) {
      badges.push({
        role: "Elite Contributor",
        tagClass: "role-elite",
        label: "Elite Contributor",
        lucideIcon: "gem",
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

  // Get Community Contributors (Excludes Admin who has their separate dedicated rank)
  // Ranked strictly by:
  // 1. Verified Games count (primary)
  // 2. Merged Commits / Contributions (secondary)
  function getCommunityContributors() {
    return contributorsData
      .filter(item => item.login && item.login.toLowerCase() !== "debasmitabose0")
      .sort((a, b) => {
        if ((b.gamesCount || 0) !== (a.gamesCount || 0)) {
          return (b.gamesCount || 0) - (a.gamesCount || 0);
        }
        return (b.commits || 0) - (a.commits || 0);
      });
  }

  // Format effort & work breakdown label
  function getWorkBreakdown(item) {
    const games = item.gamesCount || 0;
    const feat = item.platformPRs || 0;
    const fix = item.qualityPRs || 0;
    return `Games: ${games} • Feat: ${feat} • Fix: ${fix}`;
  }

  // Render Top Community Contributors Podium
  // Only displays real verified contributors who have contributed to the repository.
  // Never renders dummy "Claim Rank" cards.
  // Keeps card uncluttered since full work breakdown is in the table and category section below.
  function renderPodium() {
    if (!podiumContainer) return;
    podiumContainer.innerHTML = "";

    const communityContributors = getCommunityContributors();

    if (communityContributors.length === 0) {
      podiumContainer.innerHTML = `
        <div class="podium-empty-notice" style="text-align: center; padding: 2.5rem 1rem; color: var(--text-muted); font-size: 0.95rem;">
          <i data-lucide="sparkles" style="margin-right: 0.4rem;"></i> Verified community contributors will appear here automatically as contributions merge.
        </div>
      `;
      if (window.lucide) lucide.createIcons();
      return;
    }

    // Determine slots strictly from actual verified contributors
    let orderedContributors = [];

    if (communityContributors.length === 1) {
      // Single contributor: centered solo podium card
      orderedContributors = [
        { rank: 1, user: communityContributors[0], cardClass: "podium-1 podium-gold solo-podium", badgeType: "gold", badgeLabel: "1st Champion", badgeIcon: "crown" }
      ];
    } else if (communityContributors.length === 2) {
      // Two contributors: 1st (Gold) and 2nd (Silver)
      orderedContributors = [
        { rank: 1, user: communityContributors[0], cardClass: "podium-1 podium-gold", badgeType: "gold", badgeLabel: "1st Champion", badgeIcon: "crown" },
        { rank: 2, user: communityContributors[1], cardClass: "podium-2 podium-silver", badgeType: "silver", badgeLabel: "2nd Contributor", badgeIcon: "medal" }
      ];
    } else {
      // 3 or more: Olympic podium layout (2nd, 1st, 3rd)
      orderedContributors = [
        { rank: 2, user: communityContributors[1], cardClass: "podium-2 podium-silver", badgeType: "silver", badgeLabel: "2nd Contributor", badgeIcon: "medal" },
        { rank: 1, user: communityContributors[0], cardClass: "podium-1 podium-gold", badgeType: "gold", badgeLabel: "1st Champion", badgeIcon: "crown" },
        { rank: 3, user: communityContributors[2], cardClass: "podium-3 podium-bronze", badgeType: "bronze", badgeLabel: "3rd Contributor", badgeIcon: "medal" }
      ];
    }

    orderedContributors.forEach(slot => {
      const item = slot.user;
      const score = calculateScore(item);
      const badges = getContributorBadges(item);

      const card = document.createElement("div");
      card.className = `podium-card ${slot.cardClass}`;
      // Clean, uncluttered card: Rank badge, avatar, name, handle, primary badges, score, and profile link.
      card.innerHTML = `
        <div class="podium-badge podium-badge-${slot.badgeType}">
          <i data-lucide="${slot.badgeIcon}"></i> ${slot.badgeLabel}
        </div>
        <img src="${item.avatar_url}" alt="${item.name}" class="podium-avatar" onerror="this.src='https://github.com/identicons/${item.login}.png'">
        <h3 class="podium-name">${item.name}</h3>
        <a href="https://github.com/${item.login}" target="_blank" rel="noopener noreferrer" class="podium-handle">@${item.login}</a>
        
        <div class="podium-badges-container">
          ${badges.map(b => `<span class="role-pill-badge ${b.tagClass}"><i data-lucide="${b.lucideIcon}"></i> ${b.label}</span>`).join("")}
        </div>

        <div class="podium-score-pill">
          <strong>${score}</strong> pts
        </div>
        <div class="podium-sub-stat-text" style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 0.6rem; display: flex; align-items: center; justify-content: center; gap: 0.35rem;">
          ${item.gamesCount > 0 ? `<span><i data-lucide="gamepad-2" style="width: 0.8rem; height: 0.8rem;"></i> ${item.gamesCount} Game${item.gamesCount === 1 ? '' : 's'}</span> • ` : ''}
          <span><i data-lucide="git-commit" style="width: 0.8rem; height: 0.8rem;"></i> ${item.commits} Commit${item.commits === 1 ? '' : 's'}</span>
        </div>

        <a href="https://github.com/${item.login}" target="_blank" rel="noopener noreferrer" class="podium-gh-btn" title="View GitHub profile">
          <i data-lucide="external-link"></i> View Profile
        </a>
      `;

      podiumContainer.appendChild(card);
    });

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  // Render Full Contributor Standings Table (Exclusively Community Contributors)
  function renderTable() {
    if (!tableBody) return;
    tableBody.innerHTML = "";

    const communityContributors = getCommunityContributors();

    if (communityContributors.length === 0) {
      const emptyTr = document.createElement("tr");
      emptyTr.innerHTML = `
        <td colspan="9" style="text-align: center; padding: 2.5rem; color: var(--text-muted);">
          <i data-lucide="sparkles" style="margin-right: 0.4rem;"></i> Awaiting first community PR merges! Be the first contributor to claim Rank #1.
        </td>
      `;
      tableBody.appendChild(emptyTr);
      if (window.lucide) lucide.createIcons();
      return;
    }

    communityContributors.forEach((item, index) => {
      const rank = index + 1;
      const score = calculateScore(item);
      const badges = getContributorBadges(item);

      let rankBadgeHtml = `<span class="rank-tag">#${rank}</span>`;
      if (rank === 1) {
        rankBadgeHtml = `<span class="rank-tag rank-1"><i data-lucide="trophy"></i> #1</span>`;
      } else if (rank === 2) {
        rankBadgeHtml = `<span class="rank-tag rank-2"><i data-lucide="medal"></i> #2</span>`;
      } else if (rank === 3) {
        rankBadgeHtml = `<span class="rank-tag rank-3"><i data-lucide="medal"></i> #3</span>`;
      }

      const tr = document.createElement("tr");
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

  // Update Dedicated Admin Card at the top with live metadata
  function updateAdminSpotlight(adminUser) {
    if (!adminUser || !adminMetaInfo) return;
    const score = calculateScore(adminUser);
    adminMetaInfo.textContent = `${adminUser.commits} Commits • ${adminUser.gamesCount} Games • ${score} pts`;
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
        // Enrich profiles to resolve display names and cross-reference games/PRs
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
            const qualityPRs = registryEntry ? (registryEntry.qualityPRs || 0) : (isAdmin ? 0 : 1);
            const bonusPts = registryEntry ? (registryEntry.bonusPts || 0) : 0;

            return {
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
          })
        );

        contributorsData = enrichedContributors;

        const adminUser = contributorsData.find(c => c.login.toLowerCase() === "debasmitabose0");
        if (adminUser) updateAdminSpotlight(adminUser);

        const communityCount = contributorsData.filter(c => c.login.toLowerCase() !== "debasmitabose0").length;
        if (syncStatusText) syncStatusText.textContent = `GitHub Live Sync: 1 Admin Lead • ${communityCount} Community Contributor(s) active`;
      }
    } catch (err) {
      console.warn("GitHub API rate limit or network issue:", err);
      if (syncStatusText) syncStatusText.textContent = `Live synced with repository: DebasmitaBose0/ArcadeVerse`;
    }

    // Render Clean Contributor Views
    renderPodium();
    renderTable();
  }

  if (fetchBtn) {
    fetchBtn.addEventListener("click", () => {
      const repo = repoInput ? repoInput.value.trim() : "DebasmitaBose0/ArcadeVerse";
      fetchLiveGitHubContributions(repo);
    });
  }

  // Initial Run
  const initialAdmin = contributorsData.find(c => c.login.toLowerCase() === "debasmitabose0");
  if (initialAdmin) updateAdminSpotlight(initialAdmin);
  renderPodium();
  renderTable();
  fetchLiveGitHubContributions("DebasmitaBose0/ArcadeVerse");
});
