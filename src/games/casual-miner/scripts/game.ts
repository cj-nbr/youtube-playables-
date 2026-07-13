import {
  el,
  onReset,
  showOverlay,
  hideOverlay,
  sound,
  getHighScore,
  setHighScore,
} from "../../../shared/utils";

// Casual Miner — drive a minecart through a dug maze, collect every gem, then
// reach the exit. Each move spends one unit of dig fuel, so an inefficient
// route that re-digs tunnels can trap you with no fuel left. Mazes are perfect
// (fully connected) so every gem is always reachable; losing is purely a matter
// of wasteful routing. Fuel is sized from the optimal collection route plus a
// small buffer, guaranteeing a solvable run.

const GRID = 9; // odd -> classic maze dimensions
const BUFFER = 4;

type CellState = "wall" | "tunnel" | "gem" | "exit" | "start";

let grid: CellState[][];
let pos: { r: number; c: number };
let gemsLeft = 0;
let fuel = 0;
let maxFuel = 0;
let over = false;

function inBounds(r: number, c: number) {
  return r >= 0 && r < GRID && c >= 0 && c < GRID;
}

function neighbors(r: number, c: number) {
  return [
    { r: r - 1, c },
    { r: r + 1, c },
    { r, c: c - 1 },
    { r, c: c + 1 },
  ].filter((n) => inBounds(n.r, n.c));
}

// Carve a perfect maze via randomized DFS (recursive backtracker).
function carve() {
  grid = Array.from({ length: GRID }, () =>
    Array<CellState>(GRID).fill("wall")
  );
  const start = { r: 1, c: 1 };
  grid[start.r][start.c] = "start";
  const visited = new Set<string>();
  visited.add(`${start.r},${start.c}`);

  const stack: { r: number; c: number }[] = [start];
  while (stack.length) {
    const cur = stack[stack.length - 1];
    const dirs = shuffle([
      { r: -2, c: 0 },
      { r: 2, c: 0 },
      { r: 0, c: -2 },
      { r: 0, c: 2 },
    ]);
    let moved = false;
    for (const d of dirs) {
      const nr = cur.r + d.r;
      const nc = cur.c + d.c;
      if (nr > 0 && nr < GRID - 1 && nc > 0 && nc < GRID - 1 && !visited.has(`${nr},${nc}`)) {
        grid[cur.r + d.r / 2][cur.c + d.c / 2] = "tunnel";
        grid[nr][nc] = "tunnel";
        visited.add(`${nr},${nc}`);
        stack.push({ r: nr, c: nc });
        moved = true;
        break;
      }
    }
    if (!moved) stack.pop();
  }
  return start;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function bfsDist(start: { r: number; c: number }) {
  const dist: number[][] = Array.from({ length: GRID }, () =>
    Array(GRID).fill(-1)
  );
  dist[start.r][start.c] = 0;
  const q = [start];
  while (q.length) {
    const cur = q.shift()!;
    for (const n of neighbors(cur.r, cur.c)) {
      if (grid[n.r][n.c] !== "wall" && dist[n.r][n.c] === -1) {
        dist[n.r][n.c] = dist[cur.r][cur.c] + 1;
        q.push(n);
      }
    }
  }
  return dist;
}

function placeGemsAndExit(start: { r: number; c: number }) {
  const dist = bfsDist(start);
  // Candidate tunnel cells (exclude start).
  const cells: { r: number; c: number; d: number }[] = [];
  for (let r = 0; r < GRID; r++) {
    for (let c = 0; c < GRID; c++) {
      if (grid[r][c] === "tunnel" && dist[r][c] > 0) {
        cells.push({ r, c, d: dist[r][c] });
      }
    }
  }
  // Exit = farthest tunnel cell.
  cells.sort((a, b) => b.d - a.d);
  const exitCell = cells.shift()!;
  grid[exitCell.r][exitCell.c] = "exit";

  // Gems = a few mid-distance tunnels.
  const gemCount = 4 + Math.floor(Math.random() * 2);
  const pool = shuffle(cells).slice(0, gemCount);
  for (const g of pool) grid[g.r][g.c] = "gem";
  gemsLeft = pool.length;
}

// Compute optimal collection-route length (Steiner tree on the passage tree)
// to size the fuel budget. Returns 2*E - dist(start, exit) + BUFFER.
function computeFuel(start: { r: number; c: number }) {
  const dist = bfsDist(start);
  const required: string[] = [`${start.r},${start.c}`];
  const gemCells: { r: number; c: number }[] = [];
  for (let r = 0; r < GRID; r++) {
    for (let c = 0; c < GRID; c++) {
      if (grid[r][c] === "gem" || grid[r][c] === "exit") {
        required.push(`${r},${c}`);
        if (grid[r][c] === "gem") gemCells.push({ r, c });
      }
    }
  }

  // Build parent tree from BFS.
  const parent: Record<string, string | null> = {};
  const childMap: Record<string, string[]> = {};
  const visited = new Set<string>([`${start.r},${start.c}`]);
  const q = [start];
  while (q.length) {
    const cur = q.shift()!;
    const key = `${cur.r},${cur.c}`;
    for (const n of neighbors(cur.r, cur.c)) {
      const nk = `${n.r},${n.c}`;
      if (grid[n.r][n.c] !== "wall" && !visited.has(nk)) {
        visited.add(nk);
        parent[nk] = key;
        (childMap[key] ||= []).push(nk);
        q.push(n);
      }
    }
  }

  const reqSet = new Set(required);
  const total = reqSet.size;
  const subCount: Record<string, number> = {};
  const countSub = (key: string): number => {
    if (subCount[key] !== undefined) return subCount[key];
    let cnt = reqSet.has(key) ? 1 : 0;
    for (const ch of childMap[key] || []) cnt += countSub(ch);
    subCount[key] = cnt;
    return cnt;
  };
  countSub(`${start.r},${start.c}`);

  let edges = 0;
  for (const key of Object.keys(subCount)) {
    if (parent[key] === undefined) continue;
    if (subCount[key] > 0 && subCount[key] < total) edges++;
  }

  // Exit node for distance.
  let exitKey = "";
  for (let r = 0; r < GRID; r++)
    for (let c = 0; c < GRID; c++) if (grid[r][c] === "exit") exitKey = `${r},${c}`;
  const exitDist = dist[Number(exitKey.split(",")[0])][Number(exitKey.split(",")[1])];

  return 2 * edges - exitDist + BUFFER;
}

function getCellSizeLocal(): number {
  const area = (window as any).__getGameArea?.() ?? { w: 320, h: 400 };
  const size = Math.min(area.w, area.h) / GRID;
  return Math.max(22, Math.min(size, 44));
}

function draw() {
  const gameEl = el("casual-miner");
  if (!gameEl) return;
  const CELL = getCellSizeLocal();
  const GAP = 2;
  gameEl.style.width = GRID * (CELL + GAP) - GAP + "px";
  gameEl.style.height = GRID * (CELL + GAP) - GAP + "px";
  gameEl.style.position = "relative";
  gameEl.innerHTML = "";

  const movable = neighbors(pos.r, pos.c).filter(
    (n) => grid[n.r][n.c] !== "wall"
  );

  for (let r = 0; r < GRID; r++) {
    for (let c = 0; c < GRID; c++) {
      const cell = grid[r][c];
      const d = document.createElement("div");
      d.className = "absolute flex items-center justify-center rounded-sm text-sm select-none";
      d.style.left = c * (CELL + GAP) + "px";
      d.style.top = r * (CELL + GAP) + "px";
      d.style.width = CELL + "px";
      d.style.height = CELL + "px";

      const isCart = pos.r === r && pos.c === c;
      const canMove = movable.some((m) => m.r === r && m.c === c);

      if (cell === "wall") {
        d.style.background = "rgba(255,255,255,.06)";
        d.style.border = "1px solid rgba(0,0,0,.3)";
      } else if (isCart) {
        d.style.background = "rgba(255,214,0,.9)";
        d.style.color = "#1a1a1a";
        d.textContent = "🛒";
        d.style.boxShadow = "0 0 0 2px rgba(255,214,0,.6)";
      } else {
        d.style.background = "rgba(255,255,255,.1)";
        d.style.border = "1px solid rgba(255,255,255,.15)";
        if (cell === "gem") d.textContent = "💎";
        else if (cell === "exit") d.textContent = "🚪";
        else if (cell === "start") d.textContent = "⛏";
      }

      if (canMove) {
        d.style.cursor = "pointer";
        d.style.outline = "2px solid rgba(0,223,216,.7)";
        d.style.outlineOffset = "1px";
        d.addEventListener("click", () => move(r, c));
      }
      gameEl.appendChild(d);
    }
  }
}

function move(r: number, c: number) {
  sound.click();
  if (over) return;
  if (grid[r][c] === "wall") return;

  pos = { r, c };
  fuel--;

  if (grid[r][c] === "gem") {
    grid[r][c] = "tunnel";
    gemsLeft--;
    sound.success();
  } else {
    sound.click();
  }

  if (gemsLeft === 0 && grid[r][c] === "exit") {
    over = true;
    const bonus = fuel * 5;
    const best = setHighScore("casual-miner", bonus);
    sound.win();
    const status = el("status");
    if (status)
      status.textContent = `You escaped! Fuel bonus: ${bonus} · Best: ${best}`;
    showOverlay(
      "Mine cleared!",
      `All gems collected with ${fuel} fuel to spare. Bonus: ${bonus}. Best: ${best}.`
    );
    return;
  }

  if (fuel <= 0) {
    over = true;
    const best = setHighScore("casual-miner", 0);
    sound.error();
    const status = el("status");
    if (status)
      status.textContent = `Out of fuel · Gems left: ${gemsLeft} · Best: ${best}`;
    showOverlay(
      "Out of dig fuel!",
      `You trapped yourself with ${gemsLeft} gem${gemsLeft === 1 ? "" : "s"} still in the mine. Best bonus: ${best}.`
    );
    return;
  }

  const status = el("status");
  if (status) status.textContent = `Gems left: ${gemsLeft} · Fuel: ${fuel}/${maxFuel}`;
  draw();
}

function reset() {
  over = false;
  const start = carve();
  placeGemsAndExit(start);
  pos = { ...start };
  grid[start.r][start.c] = "start";
  maxFuel = computeFuel(start);
  fuel = maxFuel;
  const best = getHighScore("casual-miner");
  const status = el("status");
  if (status)
    status.textContent = `Gems left: ${gemsLeft} · Fuel: ${fuel}/${maxFuel} · Best: ${best}`;
  hideOverlay();
  draw();
}

export function initGame() {
  onReset(reset);
  reset();
}
