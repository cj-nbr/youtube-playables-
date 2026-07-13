import {
  el,
  onReset,
  showOverlay,
  hideOverlay,
  sound,
  getCellSize,
  getGameArea,
  getHighScore,
  setHighScore,
  shuffle,
} from "../../../shared/utils";

// 2048 — 4×4 merge puzzle. Merge matching numbers to reach 2048.

const SIZE = 4;
const WIN_VALUE = 2048;

let grid: number[][];
let score = 0;
let best = 0;
let over = false;
let won = false;

function getCellSizeLocal() {
  const area = getGameArea();
  const size = Math.min(area.w, area.h) / SIZE;
  return Math.max(40, Math.min(size - 8, 80));
}

function createGrid() {
  grid = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
  spawnTile();
  spawnTile();
}

function spawnTile() {
  const empty: { r: number; c: number }[] = [];
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (grid[r][c] === 0) empty.push({ r, c });
    }
  }
  if (empty.length === 0) return;
  const { r, c } = empty[Math.floor(Math.random() * empty.length)];
  grid[r][c] = Math.random() < 0.1 ? 4 : 2;
}

function draw() {
  const gameEl = el("game-2048");
  if (!gameEl) return;
  gameEl.innerHTML = "";
  const CELL = getCellSizeLocal();
  const GAP = 8;
  gameEl.style.width = SIZE * (CELL + GAP) - GAP + "px";
  gameEl.style.height = SIZE * (CELL + GAP) - GAP + "px";
  gameEl.style.position = "relative";

  const colors: Record<number, string> = {
    2: "#eee4da",
    4: "#ede0c8",
    8: "#f2b179",
    16: "#f59563",
    32: "#f67c5f",
    64: "#f65e3b",
    128: "#edcf72",
    256: "#edcc61",
    512: "#edc850",
    1024: "#edc53f",
    2048: "#edc22e",
  };

  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const val = grid[r][c];
      const tile = document.createElement("div");
      tile.className = "absolute flex items-center justify-center rounded-xl font-bold transition-all duration-150";
      tile.style.left = c * (CELL + GAP) + "px";
      tile.style.top = r * (CELL + GAP) + "px";
      tile.style.width = CELL + "px";
      tile.style.height = CELL + "px";
      tile.style.background = val === 0 ? "rgba(255,255,255,.08)" : (colors[val] || "#3c3a32");
      tile.style.color = val <= 4 ? "#776e65" : "#fff";
      tile.style.fontSize = CELL < 50 ? "1rem" : "1.5rem";
      tile.textContent = val === 0 ? "" : String(val);
      gameEl.appendChild(tile);
    }
  }

  const status = el("status");
  if (status) status.textContent = `Score: ${score} · Best: ${best}`;
}

function canMove(): boolean {
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (grid[r][c] === 0) return true;
      if (c < SIZE - 1 && grid[r][c] === grid[r][c + 1]) return true;
      if (r < SIZE - 1 && grid[r][c] === grid[r + 1][c]) return true;
    }
  }
  return false;
}

function slideRow(row: number[]): number[] {
  const filtered = row.filter((v) => v !== 0);
  const result: number[] = [];
  let points = 0;
  for (let i = 0; i < filtered.length; i++) {
    if (i + 1 < filtered.length && filtered[i] === filtered[i + 1]) {
      const merged = filtered[i] * 2;
      result.push(merged);
      points += merged;
      i++;
    } else {
      result.push(filtered[i]);
    }
  }
  while (result.length < SIZE) result.push(0);
  score += points;
  return result;
}

function move(direction: string): boolean {
  let moved = false;
  const oldGrid = JSON.stringify(grid);

  if (direction === "left") {
    for (let r = 0; r < SIZE; r++) {
      grid[r] = slideRow(grid[r]);
    }
  } else if (direction === "right") {
    for (let r = 0; r < SIZE; r++) {
      grid[r] = slideRow([...grid[r]].reverse()).reverse();
    }
  } else if (direction === "up") {
    for (let c = 0; c < SIZE; c++) {
      const col = grid.map((row) => row[c]);
      const newCol = slideRow(col);
      for (let r = 0; r < SIZE; r++) grid[r][c] = newCol[r];
    }
  } else if (direction === "down") {
    for (let c = 0; c < SIZE; c++) {
      const col = grid.map((row) => row[c]).reverse();
      const newCol = slideRow(col);
      const finalCol = newCol.reverse();
      for (let r = 0; r < SIZE; r++) grid[r][c] = finalCol[r];
    }
  }

  if (JSON.stringify(grid) !== oldGrid) {
    spawnTile();
    draw();
    sound.success();
    checkStatus();
    return true;
  }
  return false;
}

function checkStatus() {
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (grid[r][c] >= WIN_VALUE && !won) {
        won = true;
        best = setHighScore("2048", score);
        sound.win();
        showOverlay("You win!", `You reached ${WIN_VALUE}! Score: ${score}. Best: ${best}.`);
        return;
      }
    }
  }
  if (!canMove()) {
    over = true;
    best = setHighScore("2048", score);
    const status = el("status");
    if (status) status.textContent = `Game Over! Score: ${score} · Best: ${best}`;
    showOverlay("Game Over", `No moves left. Score: ${score}. Best: ${best}.`);
  }
}

function handleKey(e: KeyboardEvent) {
  if (over || won) return;
  const map: Record<string, string> = {
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right",
    w: "up",
    s: "down",
    a: "left",
    d: "right",
  };
  const dir = map[e.key];
  if (dir) {
    e.preventDefault();
    move(dir);
  }
}

let touchStartX = 0;
let touchStartY = 0;

function handleTouchStart(e: TouchEvent) {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
}

function handleTouchEnd(e: TouchEvent) {
  if (over || won) return;
  const dx = e.changedTouches[0].clientX - touchStartX;
  const dy = e.changedTouches[0].clientY - touchStartY;
  const absDx = Math.abs(dx);
  const absDy = Math.abs(dy);
  if (Math.max(absDx, absDy) < 20) return;
  if (absDx > absDy) {
    move(dx > 0 ? "right" : "left");
  } else {
    move(dy > 0 ? "down" : "up");
  }
}

function reset() {
  score = 0;
  over = false;
  won = false;
  best = getHighScore("2048");
  createGrid();
  draw();
  const status = el("status");
  if (status) status.textContent = `Score: 0 · Best: ${best}`;
  hideOverlay();
}

export function initGame() {
  const gameEl = el("game-2048");
  if (!gameEl) return;
  gameEl.addEventListener("keydown", handleKey);
  gameEl.addEventListener("touchstart", handleTouchStart, { passive: true });
  gameEl.addEventListener("touchend", handleTouchEnd);
  onReset(reset);
  reset();
}
