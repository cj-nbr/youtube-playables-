import {
  el,
  onReset,
  showOverlay,
  hideOverlay,
  sound,
  getGameArea,
  getHighScore,
  setHighScore,
  shuffle,
  randInt,
} from "../../../shared/utils";

const BOARD_ID = "rotate";

const TILE_TYPES: Record<number, number[]> = {
  0: [0, 0, 0, 0],
  1: [1, 1, 0, 0],
  2: [0, 1, 1, 0],
  3: [1, 0, 0, 1],
  4: [0, 1, 0, 1],
  5: [1, 1, 1, 0],
  6: [1, 1, 0, 1],
  7: [1, 0, 1, 1],
  8: [0, 1, 1, 1],
  9: [1, 1, 1, 1],
};

const LEVELS = [
  { cols: 3, rows: 3, types: [1, 2, 3, 4, 1, 0, 3, 2, 1] },
  { cols: 3, rows: 3, types: [5, 1, 2, 3, 4, 1, 2, 3, 1] },
  { cols: 4, rows: 3, types: [1, 2, 3, 4, 5, 1, 6, 3, 2, 1, 4, 3] },
  { cols: 4, rows: 4, types: [7, 1, 2, 3, 4, 5, 1, 2, 3, 4, 1, 2, 6, 3, 2, 1] },
  { cols: 5, rows: 4, types: [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 1, 2, 3, 4, 1, 7, 3, 2, 1] },
];

let grid: number[][];
let rotations: number[][];
let levelIdx = 0;
let moves = 0;
let best = 0;
let source = { r: 0, c: 0 };
let dest = { r: 0, c: 0 };

function loadLevel() {
  const lvl = LEVELS[levelIdx % LEVELS.length];
  grid = [];
  rotations = [];
  let idx = 0;
  for (let r = 0; r < lvl.rows; r++) {
    grid[r] = [];
    rotations[r] = [];
    for (let c = 0; c < lvl.cols; c++) {
      grid[r][c] = lvl.types[idx];
      rotations[r][c] = 0;
      idx++;
    }
  }
  source = { r: 0, c: Math.floor(lvl.cols / 2) };
  dest = { r: lvl.rows - 1, c: Math.floor(lvl.cols / 2) };
  grid[source.r][source.c] = 4;
  grid[dest.r][dest.c] = 4;
  moves = 0;
}

function getConnections(type: number, rot: number): number[] {
  const base = TILE_TYPES[type];
  const out: number[] = [0, 0, 0, 0];
  for (let i = 0; i < 4; i++) {
    out[i] = base[(i + rot) % 4];
  }
  return out;
}

function draw() {
  const gameEl = el(BOARD_ID);
  if (!gameEl) return;
  gameEl.innerHTML = "";
  const area = getGameArea();
  const maxW = Math.min(area.w, 500);
  const lvl = LEVELS[levelIdx % LEVELS.length];
  const gap = 4;
  const cellSize = Math.floor((maxW - gap * (lvl.cols + 1)) / lvl.cols);
  const boardW = lvl.cols * cellSize + (lvl.cols - 1) * gap;
  gameEl.style.width = boardW + "px";
  gameEl.style.margin = "0 auto";

  const info = document.createElement("div");
  info.className = "font-mono text-xs text-white/70 text-center mb-2";
  info.textContent = `Level ${levelIdx + 1}  Moves: ${moves}  Best: ${best}`;
  gameEl.appendChild(info);

  const gridWrap = document.createElement("div");
  gridWrap.style.display = "grid";
  gridWrap.style.gridTemplateColumns = `repeat(${lvl.cols}, ${cellSize}px)`;
  gridWrap.style.gap = gap + "px";

  for (let r = 0; r < lvl.rows; r++) {
    for (let c = 0; c < lvl.cols; c++) {
      const cell = document.createElement("div");
      cell.style.width = cellSize + "px";
      cell.style.height = cellSize + "px";
      cell.style.borderRadius = "8px";
      cell.style.background = "rgba(255,255,255,.06)";
      cell.style.border = "2px solid rgba(255,255,255,.15)";
      cell.style.display = "flex";
      cell.style.alignItems = "center";
      cell.style.justifyContent = "center";
      cell.style.cursor = "pointer";

      const type = grid[r][c];
      const rot = rotations[r][c];
      const conn = getConnections(type, rot);
      const isSrc = r === source.r && c === source.c;
      const isDst = r === dest.r && c === dest.c;

      if (isSrc || isDst) {
        cell.style.background = isSrc ? "rgba(80,200,120,.25)" : "rgba(200,160,60,.25)";
        cell.style.borderColor = isSrc ? "rgba(80,200,120,.6)" : "rgba(200,160,60,.6)";
      }

      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", String(cellSize * 0.85));
      svg.setAttribute("height", String(cellSize * 0.85));
      svg.setAttribute("viewBox", "0 0 100 100");

      const mid = 50;
      const half = 50;
      const strokeW = 14;

      function pipePath(from: string, to: string) {
        const coords: Record<string, [number, number]> = {
          top: [mid, 0],
          right: [100, mid],
          bottom: [mid, 100],
          left: [0, mid],
        };
        const a = coords[from];
        const b = coords[to];
        const d = `M ${a[0]} ${a[1]} L ${b[0]} ${b[1]}`;
        const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
        p.setAttribute("d", d);
        p.setAttribute("stroke", isSrc || isDst ? "rgba(255,255,255,.85)" : "rgba(255,255,255,.55)");
        p.setAttribute("stroke-width", String(strokeW));
        p.setAttribute("stroke-linecap", "round");
        p.setAttribute("fill", "none");
        return p;
      }

      if (conn[0]) svg.appendChild(pipePath("top", "center"));
      if (conn[1]) svg.appendChild(pipePath("right", "center"));
      if (conn[2]) svg.appendChild(pipePath("bottom", "center"));
      if (conn[3]) svg.appendChild(pipePath("left", "center"));

      if (isSrc) {
        const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        dot.setAttribute("cx", "50");
        dot.setAttribute("cy", "50");
        dot.setAttribute("r", "12");
        dot.setAttribute("fill", "rgba(80,200,120,.9)");
        svg.appendChild(dot);
      }
      if (isDst) {
        const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        dot.setAttribute("cx", "50");
        dot.setAttribute("cy", "50");
        dot.setAttribute("r", "10");
        dot.setAttribute("fill", "rgba(200,160,60,.9)");
        svg.appendChild(dot);
      }

      cell.appendChild(svg);
      cell.addEventListener("click", () => rotateTile(r, c));
      gridWrap.appendChild(cell);
    }
  }
  gameEl.appendChild(gridWrap);

  const hint = document.createElement("div");
  hint.className = "font-mono text-xs text-white/60 text-center mt-2";
  hint.textContent = "Click a tile to rotate it. Connect the green source to the gold destination.";
  gameEl.appendChild(hint);

  checkWin();
}

function rotateTile(r: number, c: number) {
  sound.click();
  rotations[r][c] = (rotations[r][c] + 1) % 4;
  moves++;
  draw();
}

function checkWin() {
  const visited: boolean[][] = Array.from({ length: LEVELS[levelIdx % LEVELS.length].rows }, () =>
    Array.from({ length: LEVELS[levelIdx % LEVELS.length].cols }, () => false)
  );
  const lvl = LEVELS[levelIdx % LEVELS.length];

  function dfs(r: number, c: number): boolean {
    if (r < 0 || r >= lvl.rows || c < 0 || c >= lvl.cols) return false;
    if (visited[r][c]) return false;
    visited[r][c] = true;
    if (r === dest.r && c === dest.c) return true;
    const conn = getConnections(grid[r][c], rotations[r][c]);
    const dirs = [
      { dr: -1, dc: 0, from: 0, to: 2 },
      { dr: 0, dc: 1, from: 1, to: 3 },
      { dr: 1, dc: 0, from: 2, to: 0 },
      { dr: 0, dc: -1, from: 3, to: 1 },
    ];
    for (const d of dirs) {
      const nr = r + d.dr;
      const nc = c + d.dc;
      if (nr < 0 || nr >= lvl.rows || nc < 0 || nc >= lvl.cols) continue;
      const nConn = getConnections(grid[nr][nc], rotations[nr][nc]);
      if (conn[d.from] && nConn[d.to]) {
        if (dfs(nr, nc)) return true;
      }
    }
    return false;
  }

  if (dfs(source.r, source.c)) {
    sound.win();
    best = setHighScore("rotate", moves, true);
    showOverlay("Pipe Connected!", `Solved in ${moves} moves. Best: ${best}.`);
  }
}

function reset() {
  levelIdx = 0;
  best = getHighScore("rotate");
  loadLevel();
  draw();
  const status = el("status");
  if (status) status.textContent = `Level 1  Moves: 0  Best: ${best}`;
  hideOverlay();
}

export function initGame() {
  onReset(reset);
  reset();
}
