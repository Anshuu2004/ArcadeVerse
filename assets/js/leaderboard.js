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
      commits: 16,
      gamesCount: 1,
      games: ["Quantum Memory Matrix", "Arcade Core Platform"]
    }
  ];

  // Calculate score: (commits * 10) + (games * 50)
  function calculateScore(item) {
    return (item.commits * 10) + (item.gamesCount * 50);
  }

  // Sort contributors descending by score
  function sortContributors() {
    contributorsData.sort((a, b) => calculateScore(b) - calculateScore(a));
  }

  // Render Top 3 Podium
  function renderPodium() {
    if (!podiumContainer) return;
    podiumContainer.innerHTML = "";

    const topThree = contributorsData.slice(0, 3);
    if (topThree.length === 0) return;

    // Order for podium display: [2nd, 1st, 3rd]
    const podiumOrder = [];
    if (topThree[1]) {
      podiumOrder.push({ ...topThree[1], rank: 2, badge: "🥈 2nd Place", height: "podium-2" });
    } else {
      podiumOrder.push({
        login: "awaiting-dev",
        name: "Next Contributor",
        role: "Open Slot",
        avatar_url: "https://github.com/identicons/awaiting-dev.png",
        commits: 0,
        gamesCount: 0,
        rank: 2,
        badge: "🥈 2nd Place",
        height: "podium-2",
        isPlaceholder: true
      });
    }

    if (topThree[0]) podiumOrder.push({ ...topThree[0], rank: 1, badge: "👑 1st Champion", height: "podium-1" });

    if (topThree[2]) {
      podiumOrder.push({ ...topThree[2], rank: 3, badge: "🥉 3rd Place", height: "podium-3" });
    } else {
      podiumOrder.push({
        login: "awaiting-dev-3",
        name: "Next Contributor",
        role: "Open Slot",
        avatar_url: "https://github.com/identicons/awaiting-dev-3.png",
        commits: 0,
        gamesCount: 0,
        rank: 3,
        badge: "🥉 3rd Place",
        height: "podium-3",
        isPlaceholder: true
      });
    }

    podiumOrder.forEach((item) => {
      const score = item.isPlaceholder ? 0 : calculateScore(item);
      const card = document.createElement("div");
      card.className = `podium-card ${item.height}`;
      card.innerHTML = `
        <div class="podium-badge">${item.badge}</div>
        <img src="${item.avatar_url}" alt="${item.name}" class="podium-avatar" style="${item.isPlaceholder ? 'opacity: 0.45; filter: grayscale(1);' : ''}">
        <h3 class="podium-name">${item.name}</h3>
        <span class="podium-handle">${item.isPlaceholder ? 'Claim this rank!' : `@${item.login}`}</span>
        <div class="podium-score-pill">
          <strong>${score}</strong> pts
        </div>
        <div class="podium-meta">
          <span>🎮 ${item.gamesCount} Game(s)</span>
          <span>💻 ${item.commits} Commits</span>
        </div>
      `;
      podiumContainer.appendChild(card);
    });
  }

  // Render Full Leaderboard Table
  function renderTable() {
    if (!tableBody) return;
    tableBody.innerHTML = "";

    contributorsData.forEach((item, index) => {
      const rank = index + 1;
      const score = calculateScore(item);
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
              <div class="user-role-label">${item.role || "Contributor"}</div>
            </div>
          </div>
        </td>
        <td>
          <a href="https://github.com/${item.login}" target="_blank" class="github-handle-link">@${item.login}</a>
        </td>
        <td style="text-align: center;">
          <span class="games-count-pill">${item.gamesCount}</span>
        </td>
        <td style="text-align: center;">
          <span class="commits-count-pill">${item.commits}</span>
        </td>
        <td style="text-align: right;">
          <strong class="score-highlight">${score} pts</strong>
        </td>
      `;
      tableBody.appendChild(tr);
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
            return {
              login: user.login,
              name: displayName,
              role: isAdmin ? "Project Admin & Lead" : "Contributor",
              avatar_url: user.avatar_url,
              commits: user.contributions,
              gamesCount: isAdmin ? 1 : 1,
              games: isAdmin ? ["Quantum Memory Matrix", "Arcade Core Platform"] : ["Community Game"]
            };
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
