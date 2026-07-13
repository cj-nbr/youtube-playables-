import {
  el,
  onReset,
  showOverlay,
  hideOverlay,
  sound,
  getGameArea,
  getHighScore,
  setHighScore,
  randInt,
  clamp,
} from "../../../shared/utils";

const BOARD_ID = "snakris";
const COLS = 10;
const ROWS = 20;
const EMPTY = 0;

const SHAPES: number[][][] = [
  [[1, 1, 1, 1]],
  [[1, 1], [1, 1]],
  [[0, 1, 0], [1, 1, 1]],
  [[0, 0, 1], [1, 1, 1]],
  [[1, 0, 0], [1, 1, 1]],
  [[1, 1, 0], [0, 1, 1]],
  [[0, 1, 1], [1, 1, 0]],
];

const COLORS = [
  "transparent",
  "#00d4aa",
  "#4d7cff",
  "#b347e0",
  "#ff8c42",
  "#ffd166",
  "#ff5e7a",
  "#45e6b0",
];

const POINTS = { 1: 100, 2: 300, 3: 500, 4: 800 };

let board: number[][];
let current: { shape: number[][]; r: number; c: number } | null;
let nextShape: number[][];
let score = 0;
let level = 1;
let lines = 0;
let best = 0;
let gameOverFlag = false;
let dropTimer: number | null = null;
let paused = false;
let lockDelay = 0;

function emptyBoard() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(EMPTY));
}

function randomShape() {
  return SHAPES[randInt(0, SHAPES.length - 1)];
}

function collides(shape: number[][], r: number, c: number) {
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (!shape[y][x]) continue;
      const nr = r + y;
      const nc = c + x;
      if (nc < 0 || nc >= COLS || nr >= ROWS) return true;
      if (nr < 0) continue;
      if (board[nr][nc] !== EMPTY) return true;
    }
  }
  return false;
}

function rotateMatrix(shape: number[][]) {
  const rows = shape.length;
  const cols = shape[0].length;
  const out: number[][] = Array.from({ length: cols }, () => Array(rows).fill(0));
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      out[x][rows - 1 - y] = shape[y][x];
    }
  }
  return out;
}

function merge() {
  if (!current) return;
  for (let y = 0; y < current.shape.length; y++) {
    for (let x = 0; x < current.shape[y].length; x++) {
      if (!current.shape[y][x]) continue;
      const r = current.r + y;
      const c = current.c + x;
      if (r >= 0 && r < ROWS && c >= 0 && c < COLS) {
        board[r][c] = current.shape[y][x];
      }
    }
  }
}

function clearLines() {
  let cleared = 0;
  for (let r = ROWS - 1; r >= 0; r--) {
    if (board[r].every((c) => c !== EMPTY)) {
      board.splice(r, 1);
      board.unshift(Array(COLS).fill(EMPTY));
      cleared++;
      r++;
    }
  }
  if (cleared > 0) {
    score += (POINTS[cleared as keyof typeof POINTS] || 800) * level;
    lines += cleared;
    const newLevel = Math.floor(lines / 10) + 1;
    if (newLevel > level) {
      level = newLevel;
      sound.success();
    } else {
      sound.success();
    }
    restartDropTimer();
  }
}

function spawn() {
  current = { shape: nextShape, r: 0, c: Math.floor((COLS - nextShape[0].length) / 2) };
  nextShape = randomShape();
  if (collides(current.shape, current.r, current.c)) {
    gameOver();
  }
}

function hardDrop() {
  if (!current) return;
  while (!collides(current.shape, current.r + 1, current.c)) {
    current.r++;
    score += 2;
  }
  merge();
  clearLines();
  spawn();
  draw();
}

function softDrop() {
  if (!current) return;
  current.r++;
  if (collides(current.shape, current.r, current.c)) {
    current.r--;
    merge();
    clearLines();
    spawn();
  }
  score += 1;
  draw();
}

function moveHorizontal(dir: number) {
  if (!current) return;
  const nc = current.c + dir;
  if (!collides(current.shape, current.r, nc)) {
    current.c = nc;
    draw();
  }
}

function rotatePiece() {
  if (!current) return;
  const rotated = rotateMatrix(current.shape);
  const kicks = [0, 1, -1, 2, -2];
  for (const k of kicks) {
    if (!collides(rotated, current.r, current.c + k)) {
      current.shape = rotated;
      current.c += k;
      draw();
      return;
    }
  }
}

function getDropInterval() {
  return Math.max(100, 1000 - (level - 1) * 80);
}

function restartDropTimer() {
  if (dropTimer !== null) window.clearInterval(dropTimer);
  dropTimer = window.setInterval(() => {
    if (paused || gameOverFlag || !current) return;
    if (!collides(current.shape, current.r + 1, current.c)) {
      current.r++;
    } else {
      merge();
      clearLines();
      spawn();
    }
    draw();
  }, getDropInterval());
}

function draw() {
  const gameEl = el(BOARD_ID);
  if (!gameEl) return;
  gameEl.innerHTML = "";

  const area = getGameArea();
  const maxW = Math.min(area.w, 420);
  const maxH = Math.min(area.h - 120, 560);
  const cellW = Math.floor(maxW / COLS);
  const cellH = Math.floor(maxH / ROWS);
  const cellSize = Math.min(cellW, cellH, 32);
  const boardW = COLS * cellSize;
  const boardH = ROWS * cellSize;
  gameEl.style.width = boardW + "px";
  gameEl.style.height = boardH + "px";
  gameEl.style.position = "relative";

  const canvas = document.createElement("canvas");
  canvas.width = boardW;
  canvas.height = boardH;
  canvas.style.borderRadius = "8px";
  canvas.style.background = "rgba(0,0,0,.3)";
  const ctx = canvas.getContext("2d")!;

  ctx.strokeStyle = "rgba(255,255,255,.06)";
  ctx.lineWidth = 1;
  for (let r = 0; r <= ROWS; r++) {
    ctx.beginPath();
    ctx.moveTo(0, r * cellSize);
    ctx.lineTo(boardW, r * cellSize);
    ctx.stroke();
  }
  for (let c = 0; c <= COLS; c++) {
    ctx.beginPath();
    ctx.moveTo(c * cellSize, 0);
    ctx.lineTo(c * cellSize, boardH);
    ctx.stroke();
  }

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (board[r][c] !== EMPTY) {
        drawCell(ctx, c, r, cellSize, board[r][c]);
      }
    }
  }

  if (current) {
    const ghost = { ...current, r: current.r };
    while (!collides(current.shape, ghost.r + 1, ghost.c)) ghost.r++;
    for (let y = 0; y < current.shape.length; y++) {
      for (let x = 0; x < current.shape[y].length; x++) {
        if (!current.shape[y][x]) continue;
        const gr = ghost.r + y;
        const gc = ghost.c + x;
        if (gr < 0 || gr >= ROWS || gc < 0 || gc >= COLS) continue;
        ctx.fillStyle = "rgba(255,255,255,.08)";
        ctx.fillRect(gc * cellSize + 2, gr * cellSize + 2, cellSize - 4, cellSize - 4);
      }
    }
    for (let y = 0; y < current.shape.length; y++) {
      for (let x = 0; x < current.shape[y].length; x++) {
        if (!current.shape[y][x]) continue;
        const dr = current.r + y;
        const dc = current.c + x;
        if (dr < 0 || dr >= ROWS || dc < 0 || dc >= COLS) continue;
        drawCell(ctx, dc, dr, cellSize, current.shape[y][x]);
      }
    }
  }

  gameEl.appendChild(canvas);

  const info = document.createElement("div");
  info.className = "flex items-center justify-between mt-2 px-1";
  info.innerHTML = `<span class="font-mono text-xs text-white/80">Score: ${score}  Level: ${level}  Best: ${best}</span><span class="font-mono text-xs text-white/80">Lines: ${lines}</span>`;
  gameEl.appendChild(info);

  const preview = document.createElement("div");
  preview.className = "mt-2 flex items-center gap-3";
  const prevLabel = document.createElement("span");
  prevLabel.className = "font-mono text-xs text-white/60";
  prevLabel.textContent = "Next:";
  preview.appendChild(prevLabel);
  const prevCanvas = document.createElement("canvas");
  const ps = 20;
  prevCanvas.width = nextShape[0].length * ps;
  prevCanvas.height = nextShape.length * ps;
  prevCanvas.style.background = "rgba(255,255,255,.05)";
  prevCanvas.style.borderRadius = "4px";
  const pctx = prevCanvas.getContext("2d")!;
  for (let y = 0; y < nextShape.length; y++) {
    for (let x = 0; x < nextShape[y].length; x++) {
      if (nextShape[y][x]) {
        pctx.fillStyle = COLORS[nextShape[y][x]];
        pctx.fillRect(x * ps + 1, y * ps + 1, ps - 2, ps - 2);
      }
    }
  }
  preview.appendChild(prevCanvas);
  gameEl.appendChild(preview);

  if (gameOverFlag) {
    const overlay = document.createElement("div");
    overlay.className = "absolute inset-0 flex items-center justify-center bg-black/60 rounded-lg";
    overlay.innerHTML = `<div class="text-center"><div class="text-xl font-semibold text-white">Game Over</div><div class="mt-2 font-mono text-sm text-white/80">Score: ${score}</div><button id="snakris-retry" class="mt-3 h-9 rounded-md bg-white/10 px-4 text-sm text-white hover:bg-white/20">Play again</button></div>`;
    gameEl.appendChild(overlay);
    overlay.querySelector("#snakris-retry")?.addEventListener("click", reset);
  }
}

function drawCell(ctx: CanvasRenderingContext2D, c: number, r: number, size: number, colorIdx: number) {
  const x = c * size;
  const y = r * size;
  ctx.fillStyle = COLORS[colorIdx];
  ctx.fillRect(x + 2, y + 2, size - 4, size - 4);
  ctx.fillStyle = "rgba(255,255,255,.15)";
  ctx.fillRect(x + 2, y + 2, size - 4, (size - 4) / 2);
}

function gameOver() {
  gameOverFlag = true;
  stopTimer();
  best = setHighScore("snakris", score);
  sound.win();
  showOverlay("Game Over", `Score: ${score}  Best: ${best}`);
  draw();
}

function stopTimer() {
  if (dropTimer !== null) {
    window.clearInterval(dropTimer);
    dropTimer = null;
  }
}

function reset() {
  stopTimer();
  board = emptyBoard();
  score = 0;
  level = 1;
  lines = 0;
  gameOverFlag = false;
  nextShape = randomShape();
  spawn();
  best = getHighScore("snakris");
  restartDropTimer();
  draw();
  const status = el("status");
  if (status) status.textContent = `Score: 0  Level: 1  Best: ${best}`;
  hideOverlay();
}

export function initGame() {
  onReset(reset);

  document.addEventListener("keydown", (e) => {
    if (gameOverFlag) return;
    if (e.key === "ArrowLeft") { e.preventDefault(); moveHorizontal(-1); }
    else if (e.key === "ArrowRight") { e.preventDefault(); moveHorizontal(1); }
    else if (e.key === "ArrowDown") { e.preventDefault(); softDrop(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); rotatePiece(); }
    else if (e.key === " ") { e.preventDefault(); hardDrop(); }
    else if (e.key === "p" || e.key === "P") { paused = !paused; }
  });

  reset();
}
