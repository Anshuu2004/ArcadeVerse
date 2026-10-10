/**
 * Galaxy Brick Breaker - Pure Canvas & Physics
 */

const canvas = document.getElementById("breakoutCanvas");
const ctx = canvas.getContext("2d");
const scoreVal = document.getElementById("score-val");
const livesVal = document.getElementById("lives-val");
const overlay = document.getElementById("game-overlay");
const overlayTitle = document.getElementById("overlay-title");
const overlayMsg = document.getElementById("overlay-msg");
const startBtn = document.getElementById("start-btn");

let ballRadius = 6;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 3;
let dy = -3;

let paddleHeight = 10;
let paddleWidth = 85;
let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

let brickRowCount = 5;
let brickColumnCount = 7;
let brickWidth = 56;
let brickHeight = 16;
let brickPadding = 8;
let brickOffsetTop = 35;
let brickOffsetLeft = 20;

let score = 0;
let lives = 3;
let isPlaying = false;
let animFrameId = null;

const colors = ["#ff007f", "#8a4bff", "#00f2fe", "#00e676", "#ffaa00"];

let bricks = [];
function initBricks() {
  bricks = [];
  for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
      bricks[c][r] = { x: 0, y: 0, status: 1, color: colors[r] };
    }
  }
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
document.addEventListener("mousemove", mouseMoveHandler);

function keyDownHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") rightPressed = true;
  else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = true;
}

function keyUpHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") rightPressed = false;
  else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = false;
}

function mouseMoveHandler(e) {
  const rect = canvas.getBoundingClientRect();
  const relativeX = e.clientX - rect.left;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

function collisionDetection() {
  let activeBricks = 0;
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const b = bricks[c][r];
      if (b.status === 1) {
        activeBricks++;
        if (
          x > b.x &&
          x < b.x + brickWidth &&
          y > b.y &&
          y < b.y + brickHeight
        ) {
          dy = -dy;
          b.status = 0;
          score += 15;
          scoreVal.textContent = score;
        }
      }
    }
  }

  if (activeBricks === 0) {
    winGame();
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff";
  ctx.shadowColor = "#00f2fe";
  ctx.shadowBlur = 10;
  ctx.fill();
  ctx.closePath();
  ctx.shadowBlur = 0;
}

function drawPaddle() {
  ctx.beginPath();
  ctx.roundRect(paddleX, canvas.height - paddleHeight - 8, paddleWidth, paddleHeight, 5);
  ctx.fillStyle = "#00f2fe";
  ctx.shadowColor = "#00f2fe";
  ctx.shadowBlur = 12;
  ctx.fill();
  ctx.closePath();
  ctx.shadowBlur = 0;
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status === 1) {
        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.roundRect(brickX, brickY, brickWidth, brickHeight, 3);
        ctx.fillStyle = bricks[c][r].color;
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function draw() {
  if (!isPlaying) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  collisionDetection();

  // Wall bounce left/right
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  // Wall bounce ceiling
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - paddleHeight - 10) {
    // Check paddle bounce
    if (x > paddleX && x < paddleX + paddleWidth) {
      // Angle modifier based on where it hits paddle
      const hitSpot = (x - (paddleX + paddleWidth / 2)) / (paddleWidth / 2);
      dx = hitSpot * 4.5;
      dy = -Math.abs(dy);
    } else if (y + dy > canvas.height - ballRadius) {
      lives--;
      livesVal.textContent = lives;
      if (!lives) {
        gameOver();
        return;
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 3;
        dy = -3;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 6;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 6;
  }

  x += dx;
  y += dy;

  animFrameId = requestAnimationFrame(draw);
}

function startGame() {
  score = 0;
  lives = 3;
  scoreVal.textContent = score;
  livesVal.textContent = lives;
  x = canvas.width / 2;
  y = canvas.height - 30;
  dx = 3;
  dy = -3;
  initBricks();
  overlay.classList.add("hidden");
  isPlaying = true;
  cancelAnimationFrame(animFrameId);
  draw();
}

function gameOver() {
  isPlaying = false;
  overlayTitle.textContent = "HULL BREACH!";
  overlayMsg.textContent = `All lives lost. Final Score: ${score} points.`;
  startBtn.textContent = "RETRY MISSION";
  overlay.classList.remove("hidden");
}

function winGame() {
  isPlaying = false;
  overlayTitle.textContent = "VICTORY ACHIEVED!";
  overlayMsg.textContent = `Outstanding pilot! Cosmic grid cleared with ${score} pts!`;
  startBtn.textContent = "PLAY AGAIN";
  overlay.classList.remove("hidden");
}

startBtn.addEventListener("click", startGame);

// Initial setup
initBricks();
ctx.clearRect(0, 0, canvas.width, canvas.height);
drawBricks();
drawBall();
drawPaddle();
