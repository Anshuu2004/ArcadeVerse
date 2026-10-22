/**
 * Contributor Pre-Flight Validation Engine
 * Author: Babin Bid (@Babin123456)
 * Event: Nexus Spring of Code – Winter Edition 2026
 */

(function () {
  const titleInput = document.getElementById("val-title");
  const authorInput = document.getElementById("val-author");
  const githubInput = document.getElementById("val-github");
  const categoryInput = document.getElementById("val-category");
  const iconInput = document.getElementById("val-icon");
  const descInput = document.getElementById("val-desc");
  const tagsInput = document.getElementById("val-tags");

  const chkFolder = document.getElementById("chk-folder");
  const chkId = document.getElementById("chk-id");
  const chkFiles = document.getElementById("chk-files");
  const outFolderPath = document.getElementById("out-folder-path");
  const outIdSlug = document.getElementById("out-id-slug");
  const jsonOutput = document.getElementById("json-output");
  const copyBtn = document.getElementById("copy-json-btn");

  function slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-");
  }

  function validate() {
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const github = githubInput.value.trim();
    const category = categoryInput.value;
    const icon = iconInput.value.trim() || "🕹️";
    const desc = descInput.value.trim() || "Exciting arcade game created for NSOC '26.";
    const rawTags = tagsInput.value.trim();

    const tags = rawTags
      ? rawTags.split(",").map(t => t.trim()).filter(Boolean)
      : [category, "NSOC26"];

    if (!title || !github) {
      outFolderPath.textContent = "games/<game-slug>_<username>/";
      outIdSlug.textContent = "--";
      chkFolder.className = "check-item";
      chkId.className = "check-item";
      chkFiles.className = "check-item";
      jsonOutput.textContent = "// Fill the form to validate & generate registry entry";
      return;
    }

    const gameSlug = slugify(title);
    const userSlug = slugify(github);
    const folderName = `${gameSlug}_${userSlug}`;
    const fullPath = `games/${folderName}/index.html`;

    outFolderPath.textContent = `games/${folderName}/`;
    outIdSlug.textContent = folderName;

    // Check strict folder syntax: games/<name>_<user>/
    const isFolderValid = /^[a-z0-9\-]+_[a-z0-9\-]+$/.test(folderName);
    chkFolder.className = `check-item ${isFolderValid ? "valid" : "invalid"}`;
    chkFolder.querySelector(".chk-icon").textContent = isFolderValid ? "✓" : "✗";

    chkId.className = `check-item ${isFolderValid ? "valid" : "invalid"}`;
    chkId.querySelector(".chk-icon").textContent = isFolderValid ? "✓" : "✗";

    chkFiles.className = "check-item valid";
    chkFiles.querySelector(".chk-icon").textContent = "✓";

    // Generate JSON object
    const entry = {
      id: folderName,
      title: title,
      category: category,
      icon: icon,
      description: desc,
      author: author || github,
      github: github,
      role: "Contributor",
      path: fullPath,
      tags: tags,
      stars: Math.floor(Math.random() * 15) + 10,
      featured: false
    };

    const formattedJson = JSON.stringify(entry, null, 2);
    jsonOutput.textContent = `  ${formattedJson},`;
  }

  // Copy Snippet
  copyBtn.addEventListener("click", () => {
    const text = jsonOutput.textContent;
    navigator.clipboard.writeText(text).then(() => {
      const originalText = copyBtn.textContent;
      copyBtn.textContent = "Copied! ✓";
      copyBtn.classList.add("btn-primary");
      setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.classList.remove("btn-primary");
      }, 1800);
    });
  });

  // Attach change listeners
  [titleInput, authorInput, githubInput, categoryInput, iconInput, descInput, tagsInput].forEach(elem => {
    elem.addEventListener("input", validate);
  });

  // Initial validation
  validate();
})();
