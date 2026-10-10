/**
 * Submit Game & Automated PR Generator Logic
 */

document.addEventListener("DOMContentLoaded", () => {
  const genGithub = document.getElementById("gen-github");
  const genName = document.getElementById("gen-name");
  const genTitle = document.getElementById("gen-title");
  const genCategory = document.getElementById("gen-category");
  const genIcon = document.getElementById("gen-icon");
  const genDesc = document.getElementById("gen-desc");
  const generateSnippetBtn = document.getElementById("generate-snippet-btn");
  const snippetCodeDisplay = document.getElementById("snippet-code-display");
  const copySnippetBtn = document.getElementById("copy-snippet-btn");

  // Check if user came from "Claim Idea" in ideas.html
  const claimed = localStorage.getItem("claimed_idea");
  if (claimed) {
    try {
      const idea = JSON.parse(claimed);
      if (genTitle) genTitle.value = idea.title;
      if (genCategory) genCategory.value = idea.category.split(" ")[0];
      if (genIcon) genIcon.value = idea.icon;
      if (genDesc) genDesc.value = idea.description;
      localStorage.removeItem("claimed_idea");
    } catch (e) {}
  }

  function generateSnippet() {
    const github = genGithub.value.trim() || "contributor-username";
    const name = genName.value.trim() || "Your Name";
    const title = genTitle.value.trim() || "Cosmic Defender";
    const cat = genCategory.value;
    const icon = genIcon.value.trim() || "🎮";
    const desc = genDesc.value.trim() || "Clean arcade game created with HTML5, CSS and JS.";
    
    const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const snippet = `// ==========================================
// 1. ADD THIS TO assets/js/games-registry.js (inside GAMES_REGISTRY array):
// ==========================================
{
  id: "${id}-${github}",
  title: "${title}",
  category: "${cat}",
  icon: "${icon}",
  description: "${desc}",
  author: "${name}",
  github: "${github}",
  role: "Contributor",
  path: "games/${id}-${github}/index.html",
  tags: ["${cat}", "NSOC26"]
}

// ==========================================
// 2. ADD THIS ROW TO CONTRIBUTORS TABLE IN CONTRIBUTING.md:
// ==========================================
| * | ${name} | [@${github}](https://github.com/${github}) | ${title} | \`games/${id}-${github}/\` |

// ==========================================
// 3. TERMINAL GIT PUSH COMMANDS:
// ==========================================
git checkout -b game/${id}-${github}
git add .
git commit -m "feat(game): add ${title} by @${github}"
git push origin game/${id}-${github}`;

    snippetCodeDisplay.textContent = snippet;
  }

  if (generateSnippetBtn) generateSnippetBtn.addEventListener("click", generateSnippet);

  if (copySnippetBtn) {
    copySnippetBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(snippetCodeDisplay.textContent).then(() => {
        copySnippetBtn.textContent = "✅ Copied!";
        setTimeout(() => copySnippetBtn.textContent = "📋 Copy Code", 2000);
      });
    });
  }

  // Initial trigger
  generateSnippet();
});
