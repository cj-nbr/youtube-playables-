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

// Chinese Checkers — 2-player race across a diamond-shaped star board.

const ROWS = 13;
const COLS = 13;

const HOME_1 = new Set<string>();
const HOME_2 = new Set<string>();
const CENTER = new Set<string>();

for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
    const key = `${r},${c}`;
    if (r <= 3) {
      const center = 6;
      const expectedByRow = r + 1;
      const dist = Math.abs(c - center);
      if (dist < expectedByRow) HOME_1.add(key);
    }
    if (r >= 9) {
      const center = 6;
      const expectedByRow = 12 - r + 1;
      const dist = Math.abs(c - center);
      if (dist < expectedByRow) HOME_2.add(key);
    }
    if (r >= 4 && r <= 8) {
      const maxSpread = 10 - Math.abs(r - 6) * 2;
      const dist = Math.abs(c - 6);
      if (dist <= maxSpread / 2 + 1) CENTER.add(key);
    }
  }
}

const PLAYABLE = new Set([...HOME_1, ...HOME_2, ...CENTER]);

let board: string[][];
let turn: 0 | 1;
let moves = 0;
let selected: { r: number; c: number } | null;
let gameOver: boolean;

function isPlayable(r: number, c: number): boolean {
  return PLAYABLE.has(`${r},${c}`);
}

function isNeighbor(r1: number, c1: number, r2: number, c2: number): boolean {
  const dr = Math.abs(r1 - r2);
  const dc = Math.abs(c1 - c2);
  if (r1 === r2) return dc === 2 || (dc === 1 && (r1 % 2 === 1 || c1 % 2 === 1));
  if (dr === 1) return dc === 1;
  return false;
}

function opposite(r1: number, c1: number, r2: number, c2: number): { r: number; c: number } | null {
  const tr = 2 * r2 - r1;
  const tc = 2 * c2 - c1;
  if (inBounds(tr, tc) && isPlayable(tr, tc)) return { r: tr, c: tc };
  return null;
}

function inBounds(r: number, c: number): boolean {
  return r >= 0 && r < ROWS && c >= 0 && c < COLS;
}

function initBoard(): string[][] {
  const b: string[][] = [];
  for (let r = 0; r < ROWS; r++) b[r] = Array.from({ length: COLS }, () => "");
  let i = 0;
  for (const k of HOME_1) {
    if (i >= 10) break;
    const [r, c] = k.split(",").map(Number);
    b[r][c] = "A";
    i++;
  }
  i = 0;
  for (const k of HOME_2) {
    if (i >= 10) break;
    const [r, c] = k.split(",").map(Number);
    b[r][c] = "B";
    i++;
  }
  return b;
}

function getSteps(r: number, c: number): { r: number; c: number }[] {
  const result: { r: number; c: number }[] = [];
  for (let dr = -1; dr <= 1; dr++)
    for (let dc = -2; dc <= 2; dc++) {
      if (dr === 0 && dc === 0) continue;
      if (Math.abs(dr) + Math.abs(dc) !== 1 && Math.abs(dr) + Math.abs(dc) !== 2) continue;
      const sr = r + dr;
      const sc = c + dc;
      if (inBounds(sr, sc) && isPlayable(sr, sc) && !board[sr][sc]) {
        if (Math.abs(dr) === 1 && Math.abs(dc) === 0) result.push({ r: sr, c: sc });
        else if (Math.abs(dr) === 0 && Math.abs(dc) === 1 || Math.abs(dc) === 2) {
          // horizontal step with distance 2 on same row needs a gap of 1 empty between
          if (dr === 0 && Math.abs(dc) === 2 && !board[r][c + Math.sign(dc)]) result.push({ r: sr, c: sc });
        } else if (Math.abs(dr) === 1 && Math.abs(dc) === 1) result.push({ r: sr, c: sc });
      }
    }
  return [];
}

function getJumps(r: number, c: number): { land: { r: number; c: number }; mid: { r: number; c: number } }[] {
  const result: { land: { r: number; c: number }; mid: { r: number; c: number } }[] = [];
  for (let dr = -2; dr <= 2; dr += 2)
    for (let dc = -2; dc <= 2; dc += 2) {
      if (Math.abs(dr) + Math.abs(dc) !== 4) continue;
      const mr = r + dr / 2;
      const mc = c + dc / 2;
      const lr = r + dr;
      const lc = c + dc;
      if (inBounds(mr, mc) && inBounds(lr, lc) && isPlayable(lr, lc)) {
        if (board[mr][mc] && board[mr][mc] !== "A" && board[mr][mc] !== "B" && !board[lr][lc]) {
          // Actually marbles are A or B. Jump over opponent.
          if (board[mr][mc] !== board[r][c]) {
            result.push({ land: { r: lr, c: lc }, mid: { r: mr, c: mc } });
          }
        }
      }
    }
  // diagonal jumps over one step
  for (let dr = -1; dr <= 1; dr += 2)
    for (let dc = -1; dc <= 1; dc += 2) {
      const mr = r + dr;
      const mc = c + dc;
      const lr = r + 2 * dr;
      const lc = c + 2 * dc;
      if (inBounds(mr, mc) && inBounds(lr, lc) && isPlayable(lr, lc)) {
        if (board[mr][mc] && board[mr][mc] !== board[r][c] && !board[lr][lc]) {
          result.push({ land: { r: lr, c: lc }, mid: { r: mr, c: mc } });
        }
      }
    }
  return result;
}

function hasAnyJumpFor(color: string): boolean {
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++)
      if (board[r][c] === color && getJumps(r, c).length > 0) return true;
  return false;
}

function draw() {
  const boardEl = el("chinese-checkers-board");
  if (!boardEl) return;
  boardEl.innerHTML = "";
  const area = getGameArea();
  const cellSize = Math.min(getCellSize({ cols: COLS, rows: ROWS, max: 50, min: 28, area }), 48);
  const gap = 2;

  const grid = document.createElement("div");
  grid.style.display = "grid";
  grid.style.gridTemplateColumns = `repeat(${COLS}, ${cellSize}px)`;
  grid.style.width = COLS * (cellSize + gap) - gap + "px";

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const sq = document.createElement("div");
      if (!isPlayable(r, c)) {
        sq.style.width = cellSize + "px";
        sq.style.height = cellSize + "px";
        sq.style.background = "transparent";
        grid.appendChild(sq);
        continue;
      }

      sq.style.width = cellSize + "px";
      sq.style.height = cellSize + "px";
      sq.style.background = "#1e3a5f";
      sq.style.borderRadius = "50%";
      sq.style.display = "flex";
      sq.style.alignItems = "center";
      sq.style.justifyContent = "center";
      sq.dataset.r = String(r);
      sq.dataset.c = String(c);

      const v = board[r][c];
      if (v === "A" || v === "B") {
        const marble = document.createElement("div");
        marble.style.width = cellSize * 0.68 + "px";
        marble.style.height = cellSize * 0.68 + "px";
        marble.style.borderRadius = "50%";
        marble.style.background = v === "A" ? "#f59e0b" : "#8b5cf6";
        marble.style.boxShadow = "0 1px 3px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3)";
        if (selected && selected.r === r && selected.c === c) {
          marble.style.outline = "3px solid #00dfd8";
          marble.style.outlineOffset = "-3px";
        }
        sq.appendChild(marble);
      } else if (selected) {
        const jumps = getJumps(selected.r, selected.c);
        const steps = getSteps(selected.r, selected.c);
        const isJump = jumps.some((j) => j.land.r === r && j.land.c === c);
        const isStep = steps.some((s) => s.r === r && s.c === c);
        if (isJump || isStep) {
          sq.style.background = "rgba(0,223,216,0.25)";
        }
      }

      sq.addEventListener("click", () => handleClick(r, c));
      grid.appendChild(sq);
    }
  }
  boardEl.appendChild(grid);
}

function handleClick(r: number, c: number) {
  sound.click();
  if (gameOver) return;

  if (selected) {
    const jumps = getJumps(selected.r, selected.c);
    const steps = getSteps(selected.r, selected.c);
    const destJump = jumps.find((j) => j.land.r === r && j.land.c === c);
    if (destJump) {
      board[destJump.mid.r][destJump.mid.c] = "";
      board[r][c] = board[selected.r][selected.c];
      board[selected.r][selected.c] = "";
      moves++;
      sound.success();
      selected = { r, c };
      draw();
      return;
    }
    const destStep = steps.find((s) => s.r === r && s.c === c);
    if (destStep) {
      board[r][c] = board[selected.r][selected.c];
      board[selected.r][selected.c] = "";
      moves++;
      sound.click();
      selected = null;
      turn = turn === 0 ? 1 : 0;
      draw();
      return;
    }
  }

  if (board[r][c] === (turn === 0 ? "A" : "B")) {
    selected = { r, c };
    draw();
  } else {
    selected = null;
    draw();
  }
}

function reset() {
  board = initBoard();
  selected = null;
  turn = 0;
  gameOver = false;
  moves = 0;
  hideOverlay();
  const status = el("status");
  if (status) status.textContent = "Orange to move · Steps or jumps across";
  draw();
}

export function initGame() {
  onReset(reset);
  reset();
}
