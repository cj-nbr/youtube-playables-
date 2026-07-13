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

// Minesweeper — reveal safe cells, flag mines, clear the board.

const SIZE = 10;
const MINE_COUNT = 12;

let grid: number[][];
let revealed: boolean[][];
let flagged: boolean[][];
let gameOver = false;
let gameWon = false;
let firstClick = true;
let timer = 0;
let timerInterval: ReturnType<typeof setInterval> | null = null;

function getCellSizeLocal() {
  const area = getGameArea();
  const size = Math.min(area.w, area.h) / SIZE;
  return Math.max(24, Math.min(size - 2, 40));
}

function createBoard() {
  grid = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
  revealed = Array.from({ length: SIZE }, () => Array(SIZE).fill(false));
  flagged = Array.from({ length: SIZE }, () => Array(SIZE).fill(false));
  gameOver = false;
  gameWon = false;
  firstClick = true;
  timer = 0;
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = null;
}

function placeMines(safeR: number, safeC: number) {
  const safe = new Set();
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      const nr = safeR + dr;
      const nc = safeC + dc;
      if (nr >= 0 && nr < SIZE && nc >= 0 && nc < SIZE) {
        safe.add(nr * SIZE + nc);
      }
    }
  }

  const positions: number[] = [];
  for (let i = 0; i < SIZE * SIZE; i++) {
    if (!safe.has(i)) positions.push(i);
  }
  const mines = shuffle(positions).slice(0, MINE_COUNT);
  for (const pos of mines) {
    const r = Math.floor(pos / SIZE);
    const c = pos % SIZE;
    grid[r][c] = -1;
  }

  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (grid[r][c] === -1) continue;
      let count = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < SIZE && nc >= 0 && nc < SIZE && grid[nr][nc] === -1) {
            count++;
          }
        }
      }
      grid[r][c] = count;
    }
  }
}

function startTimer() {
  if (timerInterval) return;
  timerInterval = setInterval(() => {
    timer++;
    const status = el("status");
    if (status) status.textContent = `Time: ${timer}s · Flags: ${countFlags()}/${MINE_COUNT}`;
  }, 1000);
}

function countFlags(): number {
  let count = 0;
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (flagged[r][c]) count++;
    }
  }
  return count;
}

function reveal(r: number, c: number) {
  if (r < 0 || r >= SIZE || c < 0 || c >= SIZE) return;
  if (revealed[r][c] || flagged[r][c]) return;

  revealed[r][c] = true;

  if (grid[r][c] === -1) {
    gameOver = true;
    draw();
    const status = el("status");
    if (status) status.textContent = `Game Over! Time: ${timer}s`;
    sound.error();
    showOverlay("Game Over", "You hit a mine! Better luck next time.");
    if (timerInterval) clearInterval(timerInterval);
    return;
  }

  if (grid[r][c] === 0) {
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr !== 0 || dc !== 0) reveal(r + dr, c + dc);
      }
    }
  }

  sound.click();
  checkWin();
}

function chord(r: number, c: number) {
  if (!revealed[r][c] || grid[r][c] <= 0) return;
  let flagCount = 0;
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < SIZE && nc >= 0 && nc < SIZE && flagged[nr][nc]) {
        flagCount++;
      }
    }
  }
  if (flagCount === grid[r][c]) {
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < SIZE && nc >= 0 && nc < SIZE && !revealed[nr][nc] && !flagged[nr][nc]) {
          reveal(nr, nc);
        }
      }
    }
  }
}

function checkWin() {
  let safeRevealed = 0;
  const totalSafe = SIZE * SIZE - MINE_COUNT;
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (revealed[r][c] && grid[r][c] !== -1) safeRevealed++;
    }
  }
  if (safeRevealed === totalSafe) {
    gameWon = true;
    gameOver = true;
    const status = el("status");
    if (status) status.textContent = `Win! Time: ${timer}s`;
    sound.win();
    showOverlay("You Win!", `Cleared in ${timer} seconds!`);
    if (timerInterval) clearInterval(timerInterval);
  }
}

function draw() {
  const gameEl = el("minesweeper");
  if (!gameEl) return;
  gameEl.innerHTML = "";
  const CELL = getCellSizeLocal();
  const GAP = 1;
  gameEl.style.width = SIZE * (CELL + GAP) - GAP + "px";
  gameEl.style.height = SIZE * (CELL + GAP) - GAP + "px";
  gameEl.style.position = "relative";

  const numColors: Record<number, string> = {
    1: "#1976d2",
    2: "#388e3c",
    3: "#d32f2f",
    4: "#7b1fa2",
    5: "#ff5722",
    6: "#0097a7",
    7: "#424242",
    8: "#9e9e9e",
  };

  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const cell = document.createElement("button");
      cell.className = "absolute flex items-center justify-center rounded border border-white/10 text-xs font-bold transition-colors";
      cell.style.left = c * (CELL + GAP) + "px";
      cell.style.top = r * (CELL + GAP) + "px";
      cell.style.width = CELL + "px";
      cell.style.height = CELL + "px";

      if (revealed[r][c]) {
        if (grid[r][c] === -1) {
          cell.style.background = "#f44336";
          cell.style.color = "#fff";
          cell.textContent = "💣";
        } else if (grid[r][c] > 0) {
          cell.style.background = "rgba(255,255,255,.12)";
          cell.style.color = numColors[grid[r][c]] || "#fff";
          cell.textContent = String(grid[r][c]);
        } else {
          cell.style.background = "rgba(255,255,255,.06)";
          cell.textContent = "";
        }
      } else if (flagged[r][c]) {
        cell.style.background = "rgba(255,193,7,.25)";
        cell.style.color = "#ffc107";
        cell.textContent = "🚩";
      } else {
        cell.style.background = "rgba(255,255,255,.04)";
        cell.textContent = "";
      }

      cell.addEventListener("click", (e) => {
        if (gameOver) return;
        if (e.button === 2 || (e as MouseEvent).button === 2) return;
        if (firstClick) {
          firstClick = false;
          placeMines(r, c);
          startTimer();
        }
        if (flagged[r][c]) return;
        reveal(r, c);
        draw();
      });

      cell.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        if (gameOver || firstClick) return;
        flagged[r][c] = !flagged[r][c];
        sound.click();
        draw();
      });

      cell.addEventListener("dblclick", () => {
        if (gameOver) return;
        chord(r, c);
        draw();
      });

      gameEl.appendChild(cell);
    }
  }
}

function reset() {
  createBoard();
  draw();
  const status = el("status");
  if (status) status.textContent = `Mines: ${MINE_COUNT} · Flags: 0`;
  hideOverlay();
}

export function initGame() {
  onReset(reset);
  reset();
}
