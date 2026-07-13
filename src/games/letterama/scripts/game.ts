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

// Letterama — find hidden words in a letter grid.

const WORDS = ["STAR", "MOON", "SUN", "PLANET", "SPACE", "ORBIT", "COMET", "GALAXY"];
const GRID_SIZE = 8;

let grid: string[][];
let words: string[];
let found: Set<string>;
let selected: { r: number; c: number }[];
let timer = 0;
let timerInterval: ReturnType<typeof setInterval> | null = null;
let gameOver = false;

function createGrid() {
  grid = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(""));
  words = shuffle([...WORDS]).slice(0, 6);
  found = new Set();
  selected = [];
  gameOver = false;
  timer = 0;
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = null;

  for (const word of words) {
    let placed = false;
    let attempts = 0;
    while (!placed && attempts < 200) {
      const dirs = [
        [0, 1], [1, 0], [1, 1], [0, -1], [-1, 0], [-1, -1], [1, -1], [-1, 1],
      ];
      const [dr, dc] = dirs[Math.floor(Math.random() * dirs.length)];
      const r = Math.floor(Math.random() * GRID_SIZE);
      const c = Math.floor(Math.random() * GRID_SIZE);
      if (canPlace(word, r, c, dr, dc)) {
        for (let i = 0; i < word.length; i++) {
          grid[r + i * dr][c + i * dc] = word[i];
        }
        placed = true;
      }
      attempts++;
    }
  }

  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (grid[r][c] === "") {
        grid[r][c] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      }
    }
  }
}

function canPlace(word: string, r: number, c: number, dr: number, dc: number): boolean {
  for (let i = 0; i < word.length; i++) {
    const nr = r + i * dr;
    const nc = c + i * dc;
    if (nr < 0 || nr >= GRID_SIZE || nc < 0 || nc >= GRID_SIZE) return false;
    if (grid[nr][nc] !== "" && grid[nr][nc] !== word[i]) return false;
  }
  return true;
}

function startTimer() {
  if (timerInterval) return;
  timerInterval = setInterval(() => {
    timer++;
    const status = el("status");
    if (status) status.textContent = `Time: ${timer}s · Found: ${found.size}/${words.length}`;
  }, 1000);
}

function getCellSizeLocal() {
  const area = getGameArea();
  const size = Math.min(area.w, area.h) / GRID_SIZE;
  return Math.max(28, Math.min(size - 2, 48));
}

function draw() {
  const gameEl = el("letterama-grid");
  if (!gameEl) return;
  gameEl.innerHTML = "";
  const CELL = getCellSizeLocal();
  const GAP = 2;
  gameEl.style.width = GRID_SIZE * (CELL + GAP) - GAP + "px";
  gameEl.style.height = GRID_SIZE * (CELL + GAP) - GAP + "px";
  gameEl.style.position = "relative";

  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      const cell = document.createElement("button");
      cell.className = "absolute flex items-center justify-center rounded border border-white/10 font-bold transition-colors";
      cell.style.left = c * (CELL + GAP) + "px";
      cell.style.top = r * (CELL + GAP) + "px";
      cell.style.width = CELL + "px";
      cell.style.height = CELL + "px";
      cell.style.background = selected.some((s) => s.r === r && s.c === c) ? "rgba(0,223,216,.3)" : "rgba(255,255,255,.06)";
      cell.style.color = "#fff";
      cell.style.fontSize = CELL < 32 ? "0.7rem" : "0.9rem";
      cell.textContent = grid[r][c];
      cell.addEventListener("click", () => handleCellClick(r, c));
      gameEl.appendChild(cell);
    }
  }

  const wordList = el("word-list");
  if (wordList) {
    wordList.innerHTML = "";
    for (const word of words) {
      const span = document.createElement("span");
      span.className = found.has(word) ? "line-through text-mute" : "text-white";
      span.textContent = word;
      wordList.appendChild(span);
      wordList.appendChild(document.createTextNode(" "));
    }
  }

  const status = el("status");
  if (status) status.textContent = `Time: ${timer}s · Found: ${found.size}/${words.length}`;
}

function handleCellClick(r: number, c: number) {
  if (gameOver) return;
  sound.click();
  const idx = selected.findIndex((s) => s.r === r && s.c === c);
  if (idx >= 0) {
    selected = selected.slice(0, idx);
  } else {
    selected.push({ r, c });
  }
  draw();

  const word = selected.map((s) => grid[s.r][s.c]).join("");
  const reversed = selected.reverse().map((s) => grid[s.r][s.c]).join("");
  selected = selected.reverse();

  for (const w of words) {
    if (!found.has(w) && (word === w || reversed === w)) {
      found.add(w);
      sound.success();
      selected = [];
      draw();
      if (found.size === words.length) {
        gameOver = true;
        if (timerInterval) clearInterval(timerInterval);
        const status = el("status");
        if (status) status.textContent = `Win! Time: ${timer}s`;
        showOverlay("You Win!", `All words found in ${timer} seconds!`);
      }
      return;
    }
  }
}

function reset() {
  createGrid();
  draw();
  const status = el("status");
  if (status) status.textContent = `Words: ${words.length} · Time: 0s`;
  hideOverlay();
  startTimer();
}

export function initGame() {
  onReset(reset);
  reset();
}
