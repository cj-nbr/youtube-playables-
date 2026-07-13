import {
  el,
  onReset,
  showOverlay,
  hideOverlay,
  sound,
  getHighScore,
  setHighScore,
} from "../../../shared/utils";

// ThreeTown — climb a branching grid. At each step the trail splits into up
// to three forks (left, center, right) in the row above. Grab coins, dodge
// obstacles, and reach the top to advance. A wrong fork that lands on a rock
// ends the run. The grid is generated with a guaranteed safe path so losses
// are always a matter of choice, not luck.

const COLS = 5;
let ROWS = 10;
const COIN_VALUE = 10;

type CellType = "empty" | "coin" | "rock";
interface Cell {
  type: CellType;
  r: number;
  c: number;
}

let grid: Cell[][];
let player: { r: number; c: number };
let level = 1;
let totalScore = 0;
let runCoins = 0;
let over = false;

function obstacleChance(): number {
  // Higher rows (further up) and higher levels are denser with rocks.
  return Math.min(0.55, 0.18 + level * 0.04);
}

function generateGrid() {
  grid = [];
  const safePath: number[] = [];
  let col = Math.floor(Math.random() * COLS);
  for (let r = ROWS - 1; r >= 0; r--) {
    safePath[r] = col;
    const options = [col - 1, col, col + 1].filter((c) => c >= 0 && c < COLS);
    col = options[Math.floor(Math.random() * options.length)];
  }

  for (let r = 0; r < ROWS; r++) {
    grid[r] = [];
    for (let c = 0; c < COLS; c++) {
      const onPath = safePath[r] === c;
      let type: CellType = "empty";
      if (!onPath && Math.random() < obstacleChance()) {
        type = "rock";
      } else if (Math.random() < 0.16) {
        type = "coin";
      }
      grid[r][c] = { type, r, c };
    }
    // Guarantee the safe-path cell is never a rock.
    grid[r][safePath[r]].type =
      grid[r][safePath[r]].type === "rock" ? "empty" : grid[r][safePath[r]].type;
  }
}

function validNext(): Cell[] {
  if (over) return [];
  const { r, c } = player;
  if (r === 0) return [];
  const next = r - 1;
  return [c - 1, c, c + 1]
    .filter((cc) => cc >= 0 && cc < COLS)
    .map((cc) => grid[next][cc]);
}

function getCellSizeLocal(): number {
  // Reuse the board area via getGameArea for sizing.
  const area = (window as any).__getGameArea?.() ?? { w: 320, h: 400 };
  const size = Math.min(area.w / COLS, area.h / ROWS);
  return Math.max(20, Math.min(size, 56));
}

function draw() {
  const gameEl = el("threetown");
  if (!gameEl) return;
  const CELL = getCellSizeLocal();
  const GAP = 3;
  gameEl.style.width = COLS * (CELL + GAP) - GAP + "px";
  gameEl.style.height = ROWS * (CELL + GAP) - GAP + "px";
  gameEl.style.position = "relative";
  gameEl.innerHTML = "";

  const next = validNext();

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = grid[r][c];
      const d = document.createElement("div");
      d.className = "absolute flex items-center justify-center rounded-md text-lg sm:text-xl select-none";
      d.style.left = c * (CELL + GAP) + "px";
      d.style.top = (ROWS - 1 - r) * (CELL + GAP) + "px";
      d.style.width = CELL + "px";
      d.style.height = CELL + "px";

      const isPlayer = player.r === r && player.c === c;
      const isNext = next.some((n) => n.r === r && n.c === c);

      if (isPlayer) {
        d.style.background = "rgba(255,214,0,.9)";
        d.style.color = "#1a1a1a";
        d.textContent = "🛒";
        d.style.boxShadow = "0 0 0 2px rgba(255,214,0,.6)";
      } else if (cell.type === "rock") {
        d.style.background = "rgba(255,255,255,.05)";
        d.style.border = "1px solid rgba(255,255,255,.12)";
        d.textContent = "🪨";
      } else if (cell.type === "coin") {
        d.style.background = "rgba(255,214,0,.14)";
        d.style.border = "1px solid rgba(255,214,0,.35)";
        d.textContent = "🪙";
      } else {
        d.style.background = "rgba(255,255,255,.04)";
        d.style.border = "1px solid rgba(255,255,255,.1)";
      }

      if (isNext) {
        d.style.cursor = "pointer";
        d.style.outline = "2px solid rgba(0,223,216,.8)";
        d.style.outlineOffset = "1px";
        d.addEventListener("click", () => moveTo(cell));
      }
      gameEl.appendChild(d);
    }
  }
}

function moveTo(cell: Cell) {
  sound.click();
  if (over) return;
  player = { r: cell.r, c: cell.c };

  if (cell.type === "rock") {
    over = true;
    totalScore += runCoins * COIN_VALUE;
    const best = setHighScore("threetown", totalScore);
    sound.error();
    const status = el("status");
    if (status)
      status.textContent = `Game Over · Score: ${totalScore} · Best: ${best}`;
    showOverlay(
      "Ouch! A rock.",
      `You reached level ${level} with ${runCoins} coin${runCoins === 1 ? "" : "s"}. Total score ${totalScore}. Best: ${best}.`
    );
    return;
  }

  if (cell.type === "coin") {
    runCoins++;
    sound.success();
  } else {
    sound.click();
  }

  if (player.r === 0) {
    // Reached the summit — clear the level and climb again, harder.
    totalScore += runCoins * COIN_VALUE + 50 + level * 10;
    level++;
    ROWS = Math.min(14, ROWS + 1);
    sound.win();
    const status = el("status");
    if (status)
      status.textContent = `Level ${level} · Score: ${totalScore} · Coins this run: ${runCoins}`;
    runCoins = 0;
    newRun(false);
    return;
  }

  const status = el("status");
  if (status)
    status.textContent = `Level ${level} · Score: ${totalScore + runCoins * COIN_VALUE} · Coins: ${runCoins}`;
  draw();
}

function newRun(announce = true) {
  over = false;
  runCoins = 0;
  generateGrid();
  player = { r: ROWS - 1, c: Math.floor(Math.random() * COLS) };
  // Keep the start cell clear.
  grid[ROWS - 1][player.c].type = "empty";
  const best = getHighScore("threetown");
  const status = el("status");
  if (status)
    status.textContent = `Level ${level} · Score: ${totalScore} · Best: ${best}`;
  if (announce) hideOverlay();
  draw();
}

function reset() {
  level = 1;
  totalScore = 0;
  ROWS = 10;
  newRun(true);
}

export function initGame() {
  onReset(reset);
  reset();
}
