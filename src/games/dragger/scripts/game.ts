import {
  el,
  onReset,
  showOverlay,
  hideOverlay,
  sound,
  randInt,
  getHighScore,
  setHighScore,
} from "../../../shared/utils";

const COLS = 6;
const ROWS = 6;
const GAP = 2;
const COLORS = [
  "#ff4d4d", "#4dff4d", "#4d4dff", "#ffcc00",
  "#ff66cc", "#66ccff", "#ff9933", "#99ff33"
];

let board: (string | null)[][];
let paths: { r1: number; c1: number; r2: number; c2: number; color: string }[];
let endpoints: { r: number; c: number; color: string; paired: boolean }[];
let dragging: boolean;
let dragColor: string | null;
let dragStart: { r: number; c: number } | null;
let moves = 0;
let best = 0;
let solved = false;

function createBoard() {
  board = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
  endpoints = [];
  paths = [];
  dragColor = null;
  dragStart = null;
  dragging = false;
  solved = false;

  const pairs = 4;
  const used = new Set<string>();
  for (let i = 0; i < pairs; i++) {
    let r1, c1, r2, c2;
    do {
      r1 = randInt(0, ROWS - 1);
      c1 = randInt(0, COLS - 1);
      r2 = randInt(0, ROWS - 1);
      c2 = randInt(0, COLS - 1);
    } while (
      (r1 === r2 && c1 === c2) ||
      used.has(`${r1},${c1}`) ||
      used.has(`${r2},${c2}`)
    );
    used.add(`${r1},${c1}`);
    used.add(`${r2},${c2}`);
    const color = COLORS[i];
    endpoints.push(
      { r: r1, c: c1, color, paired: false },
      { r: r2, c: c2, color, paired: false }
    );
    board[r1][c1] = color;
    board[r2][c2] = color;
  }
}

function draw() {
  const container = el("dragger-board");
  if (!container) return;
  container.innerHTML = "";

  const cellSize = Math.min(
    (container.clientWidth || 360) / COLS,
    (container.clientHeight || 360) / ROWS
  );
  const size = Math.max(24, cellSize - GAP);

  container.style.width = COLS * size + (COLS - 1) * GAP + "px";
  container.style.height = ROWS * size + (ROWS - 1) * GAP + "px";
  container.style.position = "relative";

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const sq = document.createElement("div");
      sq.style.position = "absolute";
      sq.style.left = c * (size + GAP) + "px";
      sq.style.top = r * (size + GAP) + "px";
      sq.style.width = size + "px";
      sq.style.height = size + "px";
      sq.style.background = "#262630";
      sq.style.borderRadius = "4px";
      sq.dataset.r = String(r);
      sq.dataset.c = String(c);

      const ep = endpoints.find((e) => e.r === r && e.c === c && !e.paired);
      if (ep) {
        sq.style.background = ep.color;
        sq.style.boxShadow = `0 0 0 2px ${ep.color}44`;
        sq.style.cursor = "pointer";
      }

      const path = paths.find((p) => isOnPath(r, c, p));
      if (path && !ep) {
        sq.style.background = path.color + "66";
      }

      sq.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        const target = e.target as HTMLElement;
        const er = Number(target.dataset.r);
        const ec = Number(target.dataset.c);
        handleStart(er, ec);
      });
      sq.addEventListener("pointerenter", (e) => {
        if (dragging) {
          const target = e.target as HTMLElement;
          const er = Number(target.dataset.r);
          const ec = Number(target.dataset.c);
          handleMove(er, ec);
        }
      });
      container.addEventListener("pointerup", handleEnd);
      container.addEventListener("pointerleave", handleEnd);

      container.appendChild(sq);
    }
  }
}

function isOnPath(r: number, c: number, p: { r1: number; c1: number; r2: number; c2: number }): boolean {
  const minR = Math.min(p.r1, p.r2);
  const maxR = Math.max(p.r1, p.r2);
  const minC = Math.min(p.c1, p.c2);
  const maxC = Math.max(p.c1, p.c2);
  if (p.r1 === p.r2) return r === p.r1 && c >= minC && c <= maxC;
  if (p.c1 === p.c2) return c === p.c1 && r >= minR && r <= maxR;
  return false;
}

function handleStart(r: number, c: number) {
  const ep = endpoints.find((e) => e.r === r && e.c === c && !e.paired);
  if (!ep) return;
  dragging = true;
  dragColor = ep.color;
  dragStart = { r, c };
}

function handleMove(r: number, c: number) {
  if (!dragging || !dragStart || !dragColor) return;
}

function handleEnd(e: PointerEvent) {
  if (!dragging || !dragStart) return;
  const target = (e.target as HTMLElement) || document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
  if (!target) { dragging = false; return; }
  const r = Number(target.dataset.r);
  const c = Number(target.dataset.c);
  const ep = endpoints.find((e2) => e2.r === r && e2.c === c && e2.color === dragColor && !e2.paired);
  if (ep && (r !== dragStart!.r || c !== dragStart!.c)) {
    const other = endpoints.find((e2) => e2.color === dragColor && !e2.paired && (e2.r !== r || e2.c !== c));
    if (other) {
      const intersects = paths.some((p) => {
        if (p.color === dragColor) return false;
        const minR1 = Math.min(p.r1, p.r2), maxR1 = Math.max(p.r1, p.r2);
        const minC1 = Math.min(p.c1, p.c2), maxC1 = Math.max(p.c1, p.c2);
        if (p.r1 === p.r2) {
          if (r !== other.r) return false;
          return c >= minC1 && c <= maxC1 && other.c >= minC1 && other.c <= maxC1;
        }
        if (p.c1 === p.c2) {
          if (c !== other.c) return false;
          return r >= minR1 && r <= maxR1 && other.r >= minR1 && other.r <= maxR1;
        }
        return false;
      });
      if (!intersects) {
        paths = paths.filter((p) => p.color !== dragColor);
        paths.push({ r1: dragStart!.r, c1: dragStart!.c, r2: other.r, c2: other.c, color: dragColor });
        ep.paired = true;
        other.paired = true;
        moves++;
        sound.success();
        checkWin();
        draw();
      }
    }
  }
  dragging = false;
  dragColor = null;
  dragStart = null;
}

function checkWin() {
  if (endpoints.every((e) => e.paired)) {
    solved = true;
    best = setHighScore("dragger", moves, true);
    showOverlay("Solved!", `You connected all paths in ${moves} moves${moves <= best && best > 0 ? " — New best!" : ""}.`);
    sound.win();
  }
}

function reset() {
  moves = 0;
  best = getHighScore("dragger");
  createBoard();
  hideOverlay();
  const status = el("status");
  if (status) status.textContent = `Moves: 0 · Best: ${best}`;
  draw();
}

export function initGame() {
  onReset(reset);
  reset();
}
