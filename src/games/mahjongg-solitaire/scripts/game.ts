import {
  el,
  onReset,
  showOverlay,
  hideOverlay,
  sound,
  getGameArea,
  getHighScore,
  setHighScore,
  randInt,
  shuffle,
} from "../../../shared/utils";

interface Tile {
  id: number;
  type: number;
  layer: number;
  col: number;
  row: number;
  removed: boolean;
}

let tiles: Tile[] = [];
let selectedTile: number | null = null;
let score = 0;
let best = 0;
let timeLeft = 0;
let timerHandle: number | null = null;

const TILE_TYPES = 23;
const COLORS = [
  "#ef4444", "#f97316", "#f59e0b", "#84cc16", "#10b981", "#06b6d4",
  "#3b82f6", "#6366f1", "#8b5cf6", "#d946ef", "#f43f5e", "#14b8a6",
  "#eab308", "#22c55e", "#0ea5e9", "#a855f7", "#ec4899", "#64748b",
  "#fbbf24", "#34d399", "#60a5fa", "#c084fc", "#fb7185",
];

const LAYOUTS: { cols: number; rows: number }[][] = [
  [
    { cols: 8, rows: 6 },
    { cols: 6, rows: 4 },
    { cols: 4, rows: 2 },
    { cols: 2, rows: 1 },
  ],
];

function buildTiles() {
  const layout = LAYOUTS[0];
  tiles = [];
  let id = 0;
  for (let l = 0; l < layout.length; l++) {
    const { cols, rows } = layout[l];
    const offsetC = Math.floor((8 - cols) / 2);
    const offsetR = Math.floor((6 - rows) / 2);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        tiles.push({
          id: id++,
          type: id % TILE_TYPES,
          layer: l,
          col: offsetC + c,
          row: offsetR + r,
          removed: false,
        });
      }
    }
  }
  const pairs: { type: number; count: number }[] = [];
  for (let t = 0; t < TILE_TYPES; t++) pairs.push({ type: t, count: 0 });
  tiles.forEach((t) => pairs[t.type].count++);
  const types = tiles.map((t) => t.type);
  const shuffled = shuffle(types);
  tiles.forEach((t, i) => (t.type = shuffled[i]));
}

function isExposed(t: Tile): boolean {
  const above = tiles.find(
    (x) => !x.removed && x.layer === t.layer + 1 && x.col === t.col && x.row === t.row
  );
  if (above) return false;
  const left = tiles.find(
    (x) => !x.removed && x.layer === t.layer && x.row === t.row && x.col === t.col - 1
  );
  const right = tiles.find(
    (x) => !x.removed && x.layer === t.layer && x.row === t.row && x.col === t.col + 1
  );
  return !left || !right;
}

function tileAt(cx: number, cy: number, layer: number, col: number, row: number): Tile | null {
  const found = tiles.find(
    (t) => !t.removed && t.layer === layer && t.col === col && t.row === row
  );
  return found || null;
}

function draw() {
  const root = el("mahjongg-solitaire");
  if (!root) return;
  root.innerHTML = "";
  const area = getGameArea();
  const maxW = Math.min(480, area.w);
  const tileW = Math.max(28, Math.floor((maxW - 7 * 4) / 8));
  const tileH = Math.floor(tileW * 1.2);
  const layerStep = 8;

  root.style.position = "relative";
  root.style.width = 8 * (tileW + 4) + "px";
  root.style.height = layerStep * 4 + 6 * (tileH + layerStep) + "px";
  root.style.margin = "0 auto";

  const timerEl = document.createElement("div");
  timerEl.style.position = "absolute";
  timerEl.style.top = "-30px";
  timerEl.style.right = "0";
  timerEl.style.color = "#fff";
  timerEl.style.fontFamily = "ui-monospace, monospace";
  timerEl.style.fontSize = "14px";
  timerEl.textContent = `Time: ${Math.max(0, timeLeft)}s · Score: ${score}`;
  root.appendChild(timerEl);

  const sorted = [...tiles].filter((t) => !t.removed).sort((a, b) => b.layer - a.layer || b.row - a.row || b.col - a.col);
  for (const t of sorted) {
    const x = t.col * (tileW + 4);
    const y = 6 * (tileH + layerStep) + (5 - t.row) * (tileH + layerStep) - t.layer * layerStep;
    const rect = document.createElement("div");
    rect.dataset.id = String(t.id);
    rect.style.position = "absolute";
    rect.style.left = x + "px";
    rect.style.top = y + "px";
    rect.style.width = tileW + "px";
    rect.style.height = tileH + "px";
    rect.style.background = COLORS[t.type];
    rect.style.borderRadius = "5px";
    rect.style.boxShadow = t.layer === 0 ? "0 1px 0 rgba(0,0,0,0.25)" : `0 ${t.layer * layerStep / 2}px 0 rgba(0,0,0,0.35)`;
    rect.style.border = "1px solid rgba(0,0,0,0.2)";
    rect.style.display = "flex";
    rect.style.alignItems = "center";
    rect.style.justifyContent = "center";
    rect.style.color = "#fff";
    rect.style.fontFamily = "ui-monospace, monospace";
    rect.style.fontSize = tileW > 36 ? "16px" : "12px";
    rect.style.fontWeight = "700";
    rect.style.userSelect = "none";
    rect.style.cursor = isExposed(t) ? "pointer" : "default";
    rect.style.opacity = isExposed(t) ? "1" : "0.6";

    const sym = document.createElement("span");
    sym.textContent = String(t.type + 1);
    rect.appendChild(sym);

    rect.addEventListener("click", () => {
      if (!isExposed(t)) return;
      if (selectedTile === null) {
        selectedTile = t.id;
        rect.style.outline = "2px solid #fff";
        rect.style.outlineOffset = "2px";
      } else if (selectedTile === t.id) {
        selectedTile = null;
        draw();
      } else {
        const other = tiles.find((x) => x.id === selectedTile);
        if (other && other.type === t.type) {
          t.removed = true;
          other.removed = true;
          selectedTile = null;
          score += 10;
          sound.success();
          if (tiles.filter((x) => !x.removed).length === 0) {
            clearInterval(timerHandle!);
            best = setHighScore("mahjongg-solitaire", score);
            sound.win();
            showOverlay("You win!", `Score: ${score} · Best: ${best}`);
          }
        } else {
          sound.error();
          selectedTile = null;
        }
        draw();
      }
    });
    root.appendChild(rect);
  }
}

function tick() {
  timeLeft--;
  draw();
  if (timeLeft <= 0) {
    clearInterval(timerHandle!);
    const remaining = tiles.filter((t) => !t.removed).length;
    if (remaining > 0) {
      sound.error();
      showOverlay("Time up", `Tiles left: ${remaining}. Score: ${score}`);
    }
  }
}

function reset() {
  buildTiles();
  selectedTile = null;
  score = 0;
  timeLeft = 90;
  best = getHighScore("mahjongg-solitaire");
  if (timerHandle) clearInterval(timerHandle);
  timerHandle = window.setInterval(tick, 1000);
  hideOverlay();
  draw();
  const status = el("status");
  if (status) status.textContent = `Score: 0 · Best: ${best} · Time: 90s`;
}

export function initGame() {
  onReset(reset);
  reset();
}
