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
  "#b91c1c", "#c2410c", "#a16207", "#4d7c0f", "#059669", "#0e7490",
  "#1d4ed8", "#4338ca", "#7e22ce", "#be185d", "#0f766e", "#ca8a04",
  "#16a34a", "#0284c7", "#6d28d9", "#db2777", "#475569", "#ea580c",
  "#65a30d", "#0891b2", "#2563eb", "#9333ea", "#e11d48",
];

const LAYOUTS: { cols: number; rows: number }[][] = [
  [
    { cols: 9, rows: 7 },
    { cols: 7, rows: 5 },
    { cols: 5, rows: 3 },
    { cols: 3, rows: 2 },
    { cols: 1, rows: 1 },
  ],
];

function buildTiles() {
  const layout = LAYOUTS[0];
  tiles = [];
  let id = 0;
  for (let l = 0; l < layout.length; l++) {
    const { cols, rows } = layout[l];
    const offsetC = Math.floor((9 - cols) / 2);
    const offsetR = Math.floor((7 - rows) / 2);
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

function draw() {
  const root = el("mahjongg-dimensions");
  if (!root) return;
  root.innerHTML = "";
  const area = getGameArea();
  const maxW = Math.min(480, area.w);
  const cols = 9;
  const tileW = Math.max(24, Math.floor((maxW - (cols - 1) * 4) / cols));
  const tileH = Math.floor(tileW * 1.25);
  const layerStep = 10;

  root.style.position = "relative";
  root.style.width = cols * (tileW + 4) + "px";
  root.style.height = layerStep * 5 + 7 * (tileH + layerStep) + "px";
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
    const y = 7 * (tileH + layerStep) + (6 - t.row) * (tileH + layerStep) - t.layer * layerStep;
    const rect = document.createElement("div");
    rect.dataset.id = String(t.id);
    rect.style.position = "absolute";
    rect.style.left = x + "px";
    rect.style.top = y + "px";
    rect.style.width = tileW + "px";
    rect.style.height = tileH + "px";
    rect.style.background = `linear-gradient(135deg, ${COLORS[t.type]}, ${COLORS[t.type]}dd)`;
    rect.style.borderRadius = "6px";
    rect.style.boxShadow = t.layer === 0
      ? "0 1px 0 rgba(0,0,0,0.35)"
      : `0 ${t.layer * layerStep / 2 + 4}px ${t.layer * layerStep / 2}px rgba(0,0,0,0.45)`;
    rect.style.border = "1px solid rgba(255,255,255,0.15)";
    rect.style.display = "flex";
    rect.style.alignItems = "center";
    rect.style.justifyContent = "center";
    rect.style.color = "#fff";
    rect.style.fontFamily = "ui-monospace, monospace";
    rect.style.fontSize = tileW > 32 ? "16px" : "10px";
    rect.style.fontWeight = "700";
    rect.style.userSelect = "none";
    rect.style.cursor = isExposed(t) ? "pointer" : "default";
    rect.style.opacity = isExposed(t) ? "1" : "0.5";

    const sym = document.createElement("span");
    sym.textContent = String(t.type + 1);
    rect.appendChild(sym);

    rect.addEventListener("click", () => {
      if (!isExposed(t)) return;
      if (selectedTile === null) {
        selectedTile = t.id;
        rect.style.outline = "2px solid #fff";
        rect.style.outlineOffset = "3px";
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
            best = setHighScore("mahjongg-dimensions", score);
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
  timeLeft = 100;
  best = getHighScore("mahjongg-dimensions");
  if (timerHandle) clearInterval(timerHandle);
  timerHandle = window.setInterval(tick, 1000);
  hideOverlay();
  draw();
  const status = el("status");
  if (status) status.textContent = `Score: 0 · Best: ${best} · Time: 100s`;
}

export function initGame() {
  onReset(reset);
  reset();
}
