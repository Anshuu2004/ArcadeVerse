/**
 * Developer Sandbox Page Engine
 * Features:
 * - Tab switching (HTML/CSS/JS)
 * - Template selector (Simple Target vs Canvas 2D Game loop)
 * - Instant iframe runner
 */

document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".editor-tabs .tab-btn");
  const editorPanes = document.querySelectorAll(".editor-pane");
  const runSandboxBtn = document.getElementById("run-sandbox-btn");
  const loadTemplateBtn = document.getElementById("load-template-btn");
  const sandboxFrame = document.getElementById("sandbox-preview-frame");
  const htmlCode = document.getElementById("sandbox-html-code");
  const cssCode = document.getElementById("sandbox-css-code");
  const jsCode = document.getElementById("sandbox-js-code");

  tabButtons.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabButtons.forEach(t => t.classList.remove("active"));
      editorPanes.forEach(p => p.classList.remove("active"));

      tab.classList.add("active");
      const targetId = `pane-${tab.getAttribute("data-tab")}`;
      document.getElementById(targetId).classList.add("active");
    });
  });

  function executeSandbox() {
    const combinedSource = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          ${cssCode.value}
        </style>
      </head>
      <body>
        ${htmlCode.value}
        <script>
          try {
            ${jsCode.value}
          } catch(err) {
            console.error("Sandbox Execution Error:", err);
          }
        <\/script>
      </body>
      </html>
    `;
    sandboxFrame.srcdoc = combinedSource;
  }

  // Canvas Game Template
  if (loadTemplateBtn) {
    loadTemplateBtn.addEventListener("click", () => {
      htmlCode.value = `<div class="game-wrapper">
  <h3>🎮 HTML5 Canvas Dodge Game</h3>
  <canvas id="myCanvas" width="400" height="300"></canvas>
  <p>Move mouse over canvas to dodge obstacles!</p>
</div>`;

      cssCode.value = `body {
  background: #0c0e14;
  color: #fff;
  font-family: sans-serif;
  text-align: center;
  padding: 15px;
}
canvas {
  background: #151a28;
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 8px;
  display: block;
  margin: 10px auto;
}`;

      jsCode.value = `const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
let player = { x: 200, y: 250, size: 16 };
let enemies = [{ x: 50, y: 0, speed: 2 }, { x: 250, y: -80, speed: 3 }];

canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  player.x = e.clientX - rect.left;
});

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw Player
  ctx.fillStyle = '#3b82f6';
  ctx.fillRect(player.x - player.size/2, player.y, player.size, player.size);
  
  // Draw & update enemies
  ctx.fillStyle = '#f43f5e';
  enemies.forEach(en => {
    en.y += en.speed;
    if (en.y > canvas.height) { en.y = -20; en.x = Math.random() * canvas.width; }
    ctx.fillRect(en.x, en.y, 14, 14);
  });
  
  requestAnimationFrame(gameLoop);
}
gameLoop();`;

      executeSandbox();
    });
  }

  if (runSandboxBtn) runSandboxBtn.addEventListener("click", executeSandbox);

  // Initial execution
  executeSandbox();
});
