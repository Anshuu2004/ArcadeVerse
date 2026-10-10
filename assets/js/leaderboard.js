/**
 * Hall of Fame Leaderboard Logic
 */

document.addEventListener("DOMContentLoaded", () => {
  const contributorsGrid = document.getElementById("contributors-grid");

  if (contributorsGrid && typeof CONTRIBUTORS_REGISTRY !== "undefined") {
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
            🕹️ Verified Contributions: <strong>${contrib.contributions.join(", ")}</strong>
          </div>
        </div>
      `;
      contributorsGrid.appendChild(box);
    });
  }
});
