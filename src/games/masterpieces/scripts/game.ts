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

// Masterpieces — match target symmetrical patterns with colored blocks.

type Level = {
  gridSize: number;
  target: (string | null)[][];
  colors: string[];
  palette: string[];
  maxMoves: number;
};

const LEVELS: Level[] = [
  {
    gridSize: 3,
    colors: ["#ef4444", "#3b82f6", "#10b981"],
    palette: ["#ef4444", "#ef4444", "#3b82f6", "#3b82f6", "#10b981", "#10b981", null, null],
    maxMoves: 6,
    target: [
      [null, "#ef4444", null],
      [null, "#ef4444", null],
      [null, "#ef4444", null],
    ],
  },
  {
    gridSize: 4,
    colors: ["#ef4444", "#3b82f6", "#10b981", "#f59e0b"],
    palette: ["#ef4444", "#ef4444", "#3b82f6", "#3b82f6", "#10b981", "#10b981", "#f59e0b", "#f59e0b", null, null, null, null],
    maxMoves: 8,
    target: [
      [null, "#3b82f6", "#3b82f6", null],
      ["#ef4444", null, null, "#ef4444"],
      ["#10b981", null, null, "#10b981"],
      [null, "#3b82f6", "#3b82f6", null],
    ],
  },
  {
    gridSize: 5,
    colors: ["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"],
    palette: [
      "#ef4444", "#ef4444", "#ef4444", "#ef4444",
      "#3b82f6", "#3b82f6", "#3b82f6", "#3b82f6",
      "#10b981", "#10b981", "#10b981", "#10b981",
      "#f59e0b", "#f59e0b", "#f59e0b", "#f59e0b",
      "#8b5cf6", "#8b5cf6", "#8b5cf6", "#8b5cf6",
      null, null, null, null,
    ],
    maxMoves: 12,
    target: [
      [null, null, "#ef4444", null, null],
      [null, "#3b82f6", "#f59e0b", "#3b82f6", null],
      ["#8b5cf6", "#f59e0b", "#ef4444", "#f59e0b", "#8b5cf6"],
      [null, "#3b82f6", "#f59e0b", "#3b82f6", null],
      [null, null, "#ef4444", null, null],
    ],
  },
];

let currentLevel = 0;
let placed: (string | null)[][];
let usedMoves = 0;
let gameOver: boolean;

function loadLevel() {
  const lvl = LEVELS[currentLevel];
  placed = Array.from({ length: lvl.gridSize }, () =>
    Array.from({ length: lvl.gridSize }, () => null)
  );
  usedMoves = 0;
  gameOver = false;
  hideOverlay();
  draw();
  updateStatus();
}

function draw() {
  const boardEl = el("masterpieces-board");
  if (!boardEl) return;
  boardEl.innerHTML = "";
  const lvl = LEVELS[currentLevel];
  const area = getGameArea();
  const cellSize = getCellSize({ cols: lvl.gridSize, rows: lvl.gridSize, max: 64, min: 40, area });
  const gap = 3;

  const wrapper = document.createElement("div");
  wrapper.style.display = "flex";
  wrapper.style.flexDirection = "column";
  wrapper.style.alignItems = "center";
  wrapper.style.gap = gap + "px";

  const targetDiv = document.createElement("div");
  targetDiv.style.display = "grid";
  targetDiv.style.gridTemplateColumns = `repeat(${lvl.gridSize}, ${cellSize}px)`;
  targetDiv.style.gap = gap + "px";
  targetDiv.id = "masterpieces-target";
  for (let r = 0; r < lvl.gridSize; r++) {
    for (let c = 0; c < lvl.gridSize; c++) {
      const sq = document.createElement("div");
      sq.style.width = cellSize + "px";
      sq.style.height = cellSize + "px";
      sq.style.background = "rgba(0,0,0,0.5)";
      sq.style.border = "2px solid rgba(255,255,255,0.15)";
      sq.style.borderRadius = "6px";
      const color = lvl.target[r][c];
      if (color) {
        sq.style.background = color;
        sq.style.boxShadow = "inset 0 0 0 2px rgba(255,255,255,0.35)";
      }
      targetDiv.appendChild(sq);
    }
  }

  const gridDiv = document.createElement("div");
  gridDiv.id = "mp-grid";
  gridDiv.style.display = "grid";
  gridDiv.style.gridTemplateColumns = `repeat(${lvl.gridSize}, ${cellSize}px)`;
  gridDiv.style.gap = gap + "px";

  for (let r = 0; r < lvl.gridSize; r++) {
    for (let c = 0; c < lvl.gridSize; c++) {
      const sq = document.createElement("div");
      sq.style.width = cellSize + "px";
      sq.style.height = cellSize + "px";
      sq.style.background = "rgba(255,255,255,0.05)";
      sq.style.border = "2px solid rgba(255,255,255,0.1)";
      sq.style.borderRadius = "6px";
      sq.style.cursor = "pointer";
      const color = placed[r][c];
      if (color) {
        sq.style.background = color;
        sq.style.boxShadow = "inset 0 0 0 2px rgba(255,255,255,0.3)";
        sq.addEventListener("click", () => {
          placed[r][c] = null;
          usedMoves++;
          sound.click();
          draw();
          updateStatus();
        });
      } else {
        sq.style.background = "rgba(255,255,255,0.05)";
        sq.addEventListener("click", () => {
          const palette = el("mp-palette");
          if (!palette) return;
          const active = palette.querySelector("button[aria-pressed='true']") as HTMLButtonElement | null;
          if (!active) return;
          const color = active.dataset.color as string;
          if (!lvl.palette.includes(color)) return;
          placed[r][c] = color;
          usedMoves++;
          sound.click();
          draw();
          updateStatus();
        });
      }
      gridDiv.appendChild(sq);
    }
  }

  const palette = document.createElement("div");
  palette.id = "mp-palette";
  palette.style.display = "flex";
  palette.style.flexWrap = "wrap";
  palette.style.gap = "8px";
  palette.style.justifyContent = "center";

  const paletteCounts: Record<string, number> = {};
  for (const color of lvl.palette) {
    if (!color) continue;
    paletteCounts[color] = (paletteCounts[color] || 0) + 1;
  }
  for (const [color, count] of Object.entries(paletteCounts)) {
    const btn = document.createElement("button");
    btn.dataset.color = color;
    btn.style.width = cellSize * 0.7 + "px";
    btn.style.height = cellSize * 0.7 + "px";
    btn.style.borderRadius = "8px";
    btn.style.background = color;
    btn.style.border = "2px solid rgba(255,255,255,0.3)";
    btn.style.boxShadow = "0 2px 4px rgba(0,0,0,0.3)";
    btn.style.cursor = "pointer";
    btn.setAttribute("aria-pressed", "false");
    btn.setAttribute("aria-label", `Color ${color}`);
    btn.title = `Available: ${count}`;
    palette.appendChild(btn);
  }

  wrapper.appendChild(targetDiv);
  wrapper.appendChild(gridDiv);
  wrapper.appendChild(palette);
  boardEl.appendChild(wrapper);
}

function updateStatus() {
  const lvl = LEVELS[currentLevel];
  const remaining = lvl.maxMoves - usedMoves;
  const correct = placed.flat().filter((c, i) => {
    const r = Math.floor(i / lvl.gridSize);
    const cIdx = i % lvl.gridSize;
    return lvl.target[r][cIdx] === c;
  }).length;
  const total = lvl.gridSize * lvl.gridSize;
  const status = el("status");
  if (status) status.textContent = `Level ${lvl.id} · Matches: ${correct}/${total} · Moves left: ${remaining}`;
  checkWin();
}

function checkWin() {
  const lvl = LEVELS[currentLevel];
  const correct = placed.flat().filter((c, i) => {
    const r = Math.floor(i / lvl.gridSize);
    const cIdx = i % lvl.gridSize;
    return lvl.target[r][cIdx] === c;
  }).length;
  const total = lvl.gridSize * lvl.gridSize;
  if (correct === total) {
    gameOver = true;
    const score = (lvl.maxMoves - usedMoves) * 100 + lvl.id * 50;
    const best = setHighScore("masterpieces", score, false);
    sound.win();
    const status = el("status");
    if (status) status.textContent = `Level ${lvl.id} complete · Moves: ${usedMoves} · Best: ${best}`;
    showOverlay("Pattern complete!", `You solved level ${lvl.id} in ${usedMoves} moves. Best: ${best}.`);
  } else if (usedMoves >= lvl.maxMoves) {
    gameOver = true;
    sound.error();
    showOverlay("Out of moves", `You used all ${lvl.maxMoves} moves. Try again!`);
  }
}

function reset() {
  currentLevel = 0;
  loadLevel();
}

export function initGame() {
  onReset(reset);
  reset();
}
