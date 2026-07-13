import {
  el,
  onReset,
  showOverlay,
  hideOverlay,
  sound,
  getGameArea,
  getHighScore,
  setHighScore,
} from "../../../shared/utils";

// Rotate2 — spin 2x2 sections of a 6x6 pattern grid to match the target.

const N = 6;
const BS = 2; // block size
const BLOCKS = N / BS; // 3
const SCRAMBLE = 14;
const MOVE_LIMIT = 26;

const PIECES = [
  { hex: "#ef4444", shape: "circle", name: "red circle" },
  { hex: "#3b82f6", shape: "square", name: "blue square" },
  { hex: "#22c55e", shape: "triangle", name: "green triangle" },
  { hex: "#eab308", shape: "diamond", name: "yellow diamond" },
];

let target: number[][] = [];
let current: number[][] = [];
let moves = 0;
let best = 0;
let finished = false;

function styleBlock(): void {
  const root = el("rotate2-board");
  if (!root || root.dataset.styled) return;
  const style = document.createElement("style");
  style.textContent = `
    .r2-wrap { width:100%; max-width:380px; margin:0 auto; display:flex; flex-direction:column; gap:12px; align-items:center; }
    .r2-grid { display:grid; grid-template-columns:repeat(6,1fr); gap:3px; background:rgba(255,255,255,.18); padding:3px; border-radius:10px; }
    .r2-cell { aspect-ratio:1/1; display:flex; align-items:center; justify-content:center; border-radius:7px; background:rgba(0,0,0,.25); }
    .r2-shape { width:64%; height:64%; }
    .r2-circle { border-radius:50%; }
    .r2-square { border-radius:7px; }
    .r2-triangle { width:0; height:0; border-left:18px solid transparent; border-right:18px solid transparent; }
    .r2-diamond { border-radius:5px; transform:rotate(45deg); }
    .r2-section { cursor:pointer; transition:transform .12s; }
    .r2-section:hover { outline:2px solid rgba(159,231,255,.7); outline-offset:-2px; border-radius:7px; }
    .r2-meta { width:100%; display:flex; justify-content:space-between; font-size:13px; font-family:monospace; color:#cbd5e1; }
    .r2-hint { font-size:13px; color:#9fe7ff; text-align:center; }
  `;
  document.head.appendChild(style);
  root.dataset.styled = "1";
}

function makeShape(pieceIdx: number): HTMLElement {
  const p = PIECES[pieceIdx];
  const s = document.createElement("div");
  s.className = "r2-shape r2-" + p.shape;
  if (p.shape === "triangle") {
    s.style.borderBottom = "34px solid " + p.hex;
  } else if (p.shape === "diamond") {
    s.style.width = "56%";
    s.style.height = "56%";
    s.style.background = p.hex;
  } else {
    s.style.background = p.hex;
  }
  return s;
}

function generateTarget(): void {
  target = [];
  for (let r = 0; r < N; r++) {
    const row: number[] = [];
    for (let c = 0; c < N; c++) {
      row.push(Math.floor(Math.random() * PIECES.length));
    }
    target.push(row);
  }
}

function rotateBlock(grid: number[][], bi: number, bj: number): void {
  const r0 = bi * BS;
  const c0 = bj * BS;
  const a = grid[r0][c0];
  const b = grid[r0][c0 + 1];
  const c = grid[r0 + 1][c0];
  const d = grid[r0 + 1][c0 + 1];
  grid[r0][c0] = c;
  grid[r0][c0 + 1] = a;
  grid[r0 + 1][c0] = d;
  grid[r0 + 1][c0 + 1] = b;
}

function scramble(): void {
  current = target.map((row) => [...row]);
  const ops: [number, number][] = [];
  let guard = 0;
  while (ops.length < SCRAMBLE && guard++ < 200) {
    const bi = Math.floor(Math.random() * BLOCKS);
    const bj = Math.floor(Math.random() * BLOCKS);
    ops.push([bi, bj]);
    rotateBlock(current, bi, bj);
  }
  if (gridsEqual(current, target)) scramble();
}

function gridsEqual(a: number[][], b: number[][]): boolean {
  for (let r = 0; r < N; r++)
    for (let c = 0; c < N; c++) if (a[r][c] !== b[r][c]) return false;
  return true;
}

function cellSize(): number {
  const area = getGameArea();
  const size = area.w / N;
  return Math.max(30, Math.min(size, 56));
}

function draw(): void {
  const root = el("rotate2-board");
  if (!root) return;
  styleBlock();
  root.innerHTML = "";
  const wrap = document.createElement("div");
  wrap.className = "r2-wrap";

  const meta = document.createElement("div");
  meta.className = "r2-meta";
  meta.innerHTML = `<span>Moves: ${moves}/${MOVE_LIMIT}</span><span>Best: ${best}</span>`;
  wrap.appendChild(meta);

  const hint = document.createElement("div");
  hint.className = "r2-hint";
  hint.textContent = "Click a 2×2 section to rotate it clockwise.";
  wrap.appendChild(hint);

  const SZ = cellSize();
  const grid = document.createElement("div");
  grid.className = "r2-grid";
  grid.style.width = SZ * N + 8 + "px";

  for (let bi = 0; bi < BLOCKS; bi++) {
    for (let bj = 0; bj < BLOCKS; bj++) {
      const section = document.createElement("div");
      section.style.display = "grid";
      section.style.gridTemplateColumns = "1fr 1fr";
      section.style.gap = "3px";
      section.className = "r2-section";
      const r0 = bi * BS;
      const c0 = bj * BS;
      for (let dr = 0; dr < BS; dr++) {
        for (let dc = 0; dc < BS; dc++) {
          const cell = document.createElement("div");
          cell.className = "r2-cell";
          cell.style.width = SZ + "px";
          cell.style.height = SZ + "px";
          cell.appendChild(makeShape(current[r0 + dr][c0 + dc]));
          section.appendChild(cell);
        }
      }
      section.addEventListener("click", () => spin(bi, bj));
      grid.appendChild(section);
    }
  }
  wrap.appendChild(grid);
  root.appendChild(wrap);
}

function spin(bi: number, bj: number): void {
  if (finished) return;
  sound.click();
  rotateBlock(current, bi, bj);
  moves++;
  if (gridsEqual(current, target)) {
    finished = true;
    best = setHighScore("rotate2", moves, true);
    sound.win();
    showOverlay("Solved!", `Pattern aligned in ${moves} spins. Best: ${best}.`);
    draw();
    return;
  }
  if (moves >= MOVE_LIMIT) {
    finished = true;
    best = setHighScore("rotate2", moves, true);
    sound.error();
    showOverlay("Out of moves", `The pattern was not solved in ${MOVE_LIMIT} spins. Best: ${best}.`);
    draw();
    return;
  }
  draw();
}

function reset(): void {
  finished = false;
  moves = 0;
  best = getHighScore("rotate2");
  generateTarget();
  scramble();
  hideOverlay();
  draw();
}

export function initGame(): void {
  onReset(reset);
  reset();
}
