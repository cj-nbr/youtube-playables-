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
} from "../../../shared/utils";

// Block Blast — click a connected group of 2+ same-colored blocks to clear it.
// Score = groupSize². Gravity drops blocks; empty columns shift left.

const COLS = 10;
const ROWS = 12;
const COLORS = ["#ff4444", "#44ff44", "#4488ff", "#ffcc00", "#ff66ff", "#00ffff"];

let grid: (number | null)[][];
let score = 0;
let best = 0;
let animating = false;
let over = false;

function getCellSizeLocal() {
  const area = getGameArea();
  const cell = Math.min(area.w / COLS, area.h / ROWS);
  return Math.max(20, Math.min(cell, 34));
}

function draw() {
  const boardEl = el("block-blast");
  if (!boardEl) return;
  boardEl.innerHTML = "";
  const CELL = getCellSizeLocal();
  const totalW = COLS * CELL;
  const totalH = ROWS * CELL;
  boardEl.style.width = totalW + "px";
  boardEl.style.height = totalH + "px";
  boardEl.style.position = "relative";
  boardEl.style.left = "50%";
  boardEl.style.top = "50%";
  boardEl.style.transform = "translate(-50%, -50%)";

  for (let c = 0; c < COLS; c++) {
    for (let r = 0; r < ROWS; r++) {
      const colorIdx = grid[c][r];
      if (colorIdx === null) continue;
      const cell = document.createElement("div");
      cell.className = "absolute rounded border-2 border-white/10";
      cell.style.left = c * CELL + "px";
      cell.style.bottom = r * CELL + "px";
      cell.style.width = CELL - 1 + "px";
      cell.style.height = CELL - 1 + "px";
      cell.style.background = COLORS[colorIdx];
      cell.style.boxShadow =
        "inset 0 -2px 4px rgba(0,0,0,.3), inset 0 2px 4px rgba(255,255,255,.1)";
      cell.style.transition = "transform .15s ease, opacity .15s ease";
      cell.dataset.c = String(c);
      cell.dataset.r = String(r);
      cell.addEventListener("click", () => handleClick(c, r));
      boardEl.appendChild(cell);
    }
  }
  const status = el("status");
  if (status) status.textContent = `Score: ${score}  ·  Best: ${best}`;
}

function createGrid() {
  // A fresh random color per cell — `Array(n).fill(x)` would reuse one value
  // for the whole row, producing solid colored bands instead of a scramble.
  grid = Array.from({ length: COLS }, () =>
    Array.from({ length: ROWS }, () => Math.floor(Math.random() * COLORS.length))
  );
}

function applyGravity() {
  for (let c = 0; c < COLS; c++) {
    let writeRow = 0;
    for (let r = 0; r < ROWS; r++) {
      if (grid[c][r] !== null) {
        if (writeRow !== r) {
          grid[c][writeRow] = grid[c][r];
          grid[c][r] = null;
        }
        writeRow++;
      }
    }
  }
}

function shiftColumns() {
  let writeCol = 0;
  for (let c = 0; c < COLS; c++) {
    if (grid[c][0] !== null) {
      if (writeCol !== c) {
        grid[writeCol] = grid[c];
        grid[c] = Array(ROWS).fill(null);
      }
      writeCol++;
    }
  }
}

async function handleClick(c: number, r: number) {
  if (animating || over) return;
  sound.click();
  const group = getGroup(c, r);
  if (group.length < 2) return;

  animating = true;
  group.forEach(([gc, gr]) => {
    const cell = document.querySelector<HTMLElement>(
      `[data-c="${gc}"][data-r="${gr}"]`
    );
    if (cell) {
      cell.style.transform = "scale(0)";
      cell.style.opacity = "0";
    }
  });
  await new Promise((res) => setTimeout(res, 150));

  group.forEach(([gc, gr]) => (grid[gc][gr] = null));
  score += group.length * group.length;
  applyGravity();
  shiftColumns();
  draw();
  animating = false;

  if (!hasMoves()) {
    over = true;
    best = setHighScore("block-blast", score);
    sound.win();
    showOverlay("No moves left!", `Final Score: ${score} · Best: ${best}`);
  }
}

function getGroup(c: number, r: number): [number, number][] {
  const color = grid[c][r];
  if (grid[c][r] === null) return [];
  const visited = new Set<string>();
  const stack: [number, number][] = [[c, r]];
  const group: [number, number][] = [];
  while (stack.length) {
    const [cc, rr] = stack.pop()!;
    const key = cc + "," + rr;
    if (visited.has(key)) continue;
    if (cc < 0 || cc >= COLS || rr < 0 || rr >= ROWS) continue;
    if (grid[cc][rr] !== color) continue;
    visited.add(key);
    group.push([cc, rr]);
    stack.push([cc + 1, rr], [cc - 1, rr], [cc, rr + 1], [cc, rr - 1]);
  }
  return group;
}

function hasMoves(): boolean {
  for (let c = 0; c < COLS; c++) {
    for (let r = 0; r < ROWS; r++) {
      if (grid[c][r] !== null && getGroup(c, r).length >= 2) return true;
    }
  }
  return false;
}

function reset() {
  over = false;
  animating = false;
  score = 0;
  best = getHighScore("block-blast");
  createGrid();
  // Guarantee at least one valid move exists at start.
  if (!hasMoves()) return reset();
  draw();
  hideOverlay();
}

export function initGame() {
  onReset(reset);
  reset();
}
