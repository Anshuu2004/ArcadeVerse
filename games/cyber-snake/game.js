/**
 * Cyber Snake Neo - Logic & Canvas Engine
 */

const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");
const currentScoreEl = document.getElementById("current-score");
const highScoreEl = document.getElementById("high-score");
const overlay = document.getElementById("game-overlay");
const overlayTitle = document.getElementById("overlay-title");
const overlayMsg = document.getElementById("overlay-msg");
const startBtn = document.getElementById("start-btn");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [];
let food = { x: 15, y: 15 };
let dx = 0;
let dy = 0;
let nextDx = 0;
let nextDy = 0;
let score = 0;
let highScore = localStorage.getItem("cybersnake_high") || 0;
let gameInterval = null;
let isRunning = false;
let gameSpeed = 100;

highScoreEl.textContent = highScore;

function initGame() {
  snake = [
    { x: 10, y: 10 },
    { x: 10, y: 11 },
    { x: 10, y: 12 }
  ];
  dx = 0;
  dy = -1;
  nextDx = 0;
  nextDy = -1;
  score = 0;
  currentScoreEl.textContent = score;
  gameSpeed = 110;
  spawnFood();
}

function spawnFood() {
  let valid = false;
  while (!valid) {
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);
    valid = !snake.some(segment => segment.x === food.x && segment.y === food.y);
  }
}

function startGame() {
  initGame();
  overlay.classList.add("hidden");
  isRunning = true;
  clearInterval(gameInterval);
  gameInterval = setInterval(gameLoop, gameSpeed);
}

function gameOver() {
  isRunning = false;
  clearInterval(gameInterval);
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("cybersnake_high", highScore);
    highScoreEl.textContent = highScore;
  }
  overlayTitle.textContent = "SYSTEM CRASHED!";
  overlayMsg.textContent = `Score: ${score} pts. Neural link broken.`;
  startBtn.textContent = "REBOOT / PLAY AGAIN";
  overlay.classList.remove("hidden");
}

function gameLoop() {
  update();
  draw();
}

function update() {
  dx = nextDx;
  dy = nextDy;

  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  // Wall collisions
  if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
    return gameOver();
  }

  // Self collisions
  for (let i = 0; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return gameOver();
    }
  }

  snake.unshift(head);

  // Check food collision
  if (head.x === food.x && head.y === food.y) {
    score += 10;
    currentScoreEl.textContent = score;
    spawnFood();
    // Accelerate slightly
    if (score % 50 === 0 && gameSpeed > 60) {
      gameSpeed -= 8;
      clearInterval(gameInterval);
      gameInterval = setInterval(gameLoop, gameSpeed);
    }
  } else {
    snake.pop();
  }
}

function draw() {
  // Clear canvas
  ctx.fillStyle = "#040509";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw Grid lines subtle
  ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
  ctx.lineWidth = 1;
  for (let i = 0; i < canvas.width; i += gridSize) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(canvas.width, i);
    ctx.stroke();
  }

  // Draw Food (Glowing Orb)
  ctx.shadowColor = "#ff007f";
  ctx.shadowBlur = 15;
  ctx.fillStyle = "#ff007f";
  ctx.beginPath();
  ctx.arc(
    food.x * gridSize + gridSize / 2,
    food.y * gridSize + gridSize / 2,
    gridSize / 2.6,
    0,
    Math.PI * 2
  );
  ctx.fill();

  // Draw Snake
  snake.forEach((segment, index) => {
    if (index === 0) {
      // Head
      ctx.fillStyle = "#00f2fe";
      ctx.shadowColor = "#00f2fe";
      ctx.shadowBlur = 14;
    } else {
      // Body gradient
      ctx.fillStyle = "#8a4bff";
      ctx.shadowColor = "#8a4bff";
      ctx.shadowBlur = 8;
    }

    const padding = 2;
    ctx.fillRect(
      segment.x * gridSize + padding,
      segment.y * gridSize + padding,
      gridSize - padding * 2,
      gridSize - padding * 2
    );
  });

  // Reset shadow
  ctx.shadowBlur = 0;
}

// Controls
function changeDirection(newDx, newDy) {
  if (!isRunning) return;
  // Disallow 180-degree immediate reversal
  if (newDx !== 0 && dx === -newDx) return;
  if (newDy !== 0 && dy === -newDy) return;

  nextDx = newDx;
  nextDy = newDy;
}

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
    case "w":
    case "W":
      changeDirection(0, -1);
      e.preventDefault();
      break;
    case "ArrowDown":
    case "s":
    case "S":
      changeDirection(0, 1);
      e.preventDefault();
      break;
    case "ArrowLeft":
    case "a":
    case "A":
      changeDirection(-1, 0);
      e.preventDefault();
      break;
    case "ArrowRight":
    case "d":
    case "D":
      changeDirection(1, 0);
      e.preventDefault();
      break;
  }
});

// Mobile button listeners
document.getElementById("ctrl-up").addEventListener("click", () => changeDirection(0, -1));
document.getElementById("ctrl-down").addEventListener("click", () => changeDirection(0, 1));
document.getElementById("ctrl-left").addEventListener("click", () => changeDirection(-1, 0));
document.getElementById("ctrl-right").addEventListener("click", () => changeDirection(1, 0));

startBtn.addEventListener("click", startGame);

// Initial empty draw
initGame();
draw();
