import {
  el,
  onReset,
  showOverlay,
  hideOverlay,
  sound,
  getHighScore,
  setHighScore,
} from "../../../shared/utils";

const COLS = 6;
const ROWS = 6;
const COLORS = ["#ff4d4d", "#4dff4d", "#4d4dff", "#ffcc00"];

let grid: (string | null)[][];
let paths: { r1: number; c1: number; r2: number; c2: number; color: string }[];
let nodes: { r: number; c: number; color: string }[];
let dragging: boolean;
let dragColor: string | null;
let dragStart: { r: number; c: number } | null;
let moves = 0;
let best = 0;

function createBoard() {
  grid = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
  nodes = [];
  paths = [];
  dragging = false;
  dragColor = null;
  dragStart = null;
  const used = new Set<string>();
  for (let i = 0; i < COLORS.length; i++) {
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
    nodes.push({ r: r1, c: c1, color: COLORS[i] }, { r: r2, c: c2, color: COLORS[i] });
    grid[r1][c1] = COLORS[i];
    grid[r2][c2] = COLORS[i];
  }
}

function draw() {
  const container = el("colored-lines-board");
  if (!container) return;
  container.innerHTML = "";
  const size = Math.min((container.clientWidth || 400) / COLS, (container.clientHeight || 400) / ROWS);
  container.style.width = COLS * size + "px";
  container.style.height = ROWS * size + "px";
  container.style.position = "relative";

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const sq = document.createElement("div");
      sq.style.position = "absolute";
      sq.style.left = c * size + "px";
      sq.style.top = r * size + "px";
      sq.style.width = size + "px";
      sq.style.height = size + "px";
      sq.style.background = "#1a1a1a";
      sq.style.border = "1px solid #2a2a2a";
      sq.dataset.r = String(r);
      sq.dataset.c = String(c);

      const node = nodes.find((n) => n.r === r && n.c === c && !isPaired(n));
      if (node) {
        sq.style.background = node.color;
        sq.style.boxShadow = `0 0 0 3px ${node.color}66`;
        sq.style.cursor = "pointer";
      }

      const path = paths.find((p) => isOnCell(r, c, p));
      if (path && !node) {
        sq.style.background = path.color + "55";
      }

      sq.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        const target = e.target as HTMLElement;
        const er = Number(target.dataset.r);
        const ec = Number(target.dataset.c);
        handleStart(er, ec);
      });
      sq.addEventListener("pointerenter", (e) => {
        if (dragging) handleMove(e);
      });
      container.addEventListener("pointerup", handleEnd);
      container.addEventListener("pointerleave", handleEnd);

      container.appendChild(sq);
    }
  }
}

function isPaired(n: { r: number; c: number }) {
  return paths.some((p) => (p.r1 === n.r && p.c1 === n.c) || (p.r2 === n.r && p.c2 === n.c));
}

function isOnCell(r: number, c: number, p: { r1: number; c1: number; r2: number; c2: number }) {
  if (p.r1 === p.r2) return r === p.r1 && c >= Math.min(p.c1, p.c2) && c <= Math.max(p.c1, p.c2);
  if (p.c1 === p.c2) return c === p.c1 && r >= Math.min(p.r1, p.r2) && r <= Math.max(p.r1, p.r2);
  return false;
}

function handleStart(r: number, c: number) {
  const node = nodes.find((n) => n.r === r && n.c === c && !isPaired(n));
  if (!node) return;
  dragging = true;
  dragColor = node.color;
  dragStart = { r, c };
}

function handleMove(_e: Event) {
  if (!dragging || !dragStart || !dragColor) return;
}

function handleEnd(e: PointerEvent) {
  if (!dragging || !dragStart) return;
  const target = (e.target as HTMLElement) || document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
  if (!target) { dragging = false; return; }
  const r = Number(target.dataset.r);
  const c = Number(target.dataset.c);
  const node = nodes.find((n) => n.r === r && n.c === c && n.color === dragColor && !isPaired(n));
  if (node && (r !== dragStart!.r || c !== dragStart!.c)) {
    const other = nodes.find((n) => n.color === dragColor && !isPaired(n) && (n.r !== r || n.c !== c));
    if (other) {
      const intersects = paths.some((p) => {
        if (p.color === dragColor) return false;
        const minR = Math.min(p.r1, p.r2), maxR = Math.max(p.r1, p.r2);
        const minC = Math.min(p.c1, p.c2), maxC = Math.max(p.c1, p.c2);
        if (p.r1 === p.r2) {
          if (r !== other.r || other.c < minC || other.c > maxC) return false;
          return true;
        }
        if (p.c1 === p.c2) {
          if (c !== other.c || other.r < minR || other.r > maxR) return false;
          return true;
        }
        return false;
      });
      if (!intersects) {
        paths = paths.filter((p) => p.color !== dragColor);
        paths.push({ r1: dragStart!.r, c1: dragStart!.c, r2: other.r, c2: other.c, color: dragColor });
        moves++;
        sound.success();
        draw();
      }
    }
  }
  dragging = false;
  dragColor = null;
  dragStart = null;
}

function reset() {
  moves = 0;
  best = getHighScore("colored-lines");
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
