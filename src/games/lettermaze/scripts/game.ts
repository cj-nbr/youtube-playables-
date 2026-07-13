import {
  el,
  onReset,
  showOverlay,
  hideOverlay,
  sound,
  getGameArea,
  clamp,
  randInt,
  getHighScore,
  setHighScore,
} from "../../../shared/utils";

// Letter Maze — navigate a generated maze and collect glowing tiles in order
// to spell target words. Score is the number of words spelled before time runs
// out. Best word count is saved locally.

const COLS = 7;
const ROWS = 7;
const ROUND_SECONDS = 90;

const WORDS = [
  "MAZE", "WORD", "GAME", "PLAY", "STAR", "MOON", "CODE", "JUMP",
  "QUEST", "LIGHT", "BRAVE", "SWIFT", "CROWN", "SPARK", "DREAM",
  "PIXEL", "LEVEL", "SCORE", "MAGIC", "TRAIL", "BLOCK", "GHOST",
  "RIVER", "STONE", "FLAME", "CLOUD", "GRASS", "BEACH", "PLANT",
];

// Each cell stores its four walls. true = wall present (blocked).
interface Cell {
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
  letter: string;
}

let grid: Cell[][];
let px = 0;
let py = 0;
let word = "";
let progress = 0; // index of next needed letter
let score = 0;
let best = 0;
let timeLeft = ROUND_SECONDS;
let timer: number | null = null;
let running = false;

function idx(x: number, y: number) {
  return y * COLS + x;
}

function makeMaze(): Cell[][] {
  // Start with all walls up.
  const g: Cell[][] = [];
  for (let y = 0; y < ROWS; y++) {
    const row: Cell[] = [];
    for (let x = 0; x < COLS; x++) {
      row.push({ top: true, right: true, bottom: true, left: true, letter: "" });
    }
    g.push(row);
  }

  // Recursive backtracker (iterative) to carve a perfect maze.
  const visited = new Set<number>();
  const stack: [number, number][] = [];
  let cx = 0;
  let cy = 0;
  visited.add(idx(cx, cy));
  stack.push([cx, cy]);

  while (stack.length) {
    [cx, cy] = stack[stack.length - 1];
    const neighbors: [number, number, string][] = [];
    if (cy > 0 && !visited.has(idx(cx, cy - 1))) neighbors.push([cx, cy - 1, "top"]);
    if (cx < COLS - 1 && !visited.has(idx(cx + 1, cy))) neighbors.push([cx + 1, cy, "right"]);
    if (cy < ROWS - 1 && !visited.has(idx(cx, cy + 1))) neighbors.push([cx, cy + 1, "bottom"]);
    if (cx > 0 && !visited.has(idx(cx - 1, cy))) neighbors.push([cx - 1, cy, "left"]);

    if (!neighbors.length) {
      stack.pop();
      continue;
    }

    const [nx, ny, dir] = neighbors[randInt(0, neighbors.length - 1)];
    // Knock down the wall between current and chosen neighbor.
    if (dir === "top") {
      g[cy][cx].top = false;
      g[ny][nx].bottom = false;
    } else if (dir === "right") {
      g[cy][cx].right = false;
      g[ny][nx].left = false;
    } else if (dir === "bottom") {
      g[cy][cx].bottom = false;
      g[ny][nx].top = false;
    } else {
      g[cy][cx].left = false;
      g[ny][nx].right = false;
    }
    visited.add(idx(nx, ny));
    stack.push([nx, ny]);
  }

  return g;
}

function fillLetters() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      grid[y][x].letter = alphabet[randInt(0, alphabet.length - 1)];
    }
  }
  // Guarantee every letter of the word appears at least once, on non-start cells.
  const unique = Array.from(new Set(word.split("")));
  const spots: [number, number][] = [];
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (!(x === px && y === py)) spots.push([x, y]);
    }
  }
  // Shuffle spots.
  for (let i = spots.length - 1; i > 0; i--) {
    const j = randInt(0, i);
    [spots[i], spots[j]] = [spots[j], spots[i]];
  }
  unique.forEach((ch, i) => {
    const [sx, sy] = spots[i % spots.length];
    grid[sy][sx].letter = ch;
  });
}

function newWord() {
  word = WORDS[randInt(0, WORDS.length - 1)];
  progress = 0;
  px = 0;
  py = 0;
  grid = makeMaze();
  fillLetters();
  draw();
}

function neededLetter(): string {
  return word[progress] ?? "";
}

function cellSize() {
  const area = getGameArea();
  // Reserve vertical space for the word display and the direction pad.
  const usableH = Math.max(120, area.h - 150);
  const size = Math.min(area.w / COLS, usableH / ROWS);
  return clamp(size, 30, 52);
}

function draw() {
  const root = el("lettermaze");
  if (!root) return;
  root.innerHTML = "";
  root.style.display = "flex";
  root.style.flexDirection = "column";
  root.style.alignItems = "center";
  root.style.gap = "12px";

  // Word tracker.
  const track = document.createElement("div");
  track.style.display = "flex";
  track.style.gap = "6px";
  track.style.flexWrap = "wrap";
  track.style.justifyContent = "center";
  for (let i = 0; i < word.length; i++) {
    const slot = document.createElement("span");
    slot.textContent = word[i];
    slot.style.display = "inline-flex";
    slot.style.alignItems = "center";
    slot.style.justifyContent = "center";
    slot.style.width = "26px";
    slot.style.height = "30px";
    slot.style.borderRadius = "6px";
    slot.style.fontWeight = "700";
    slot.style.fontSize = "15px";
    if (i < progress) {
      slot.style.background = "#00dfd8";
      slot.style.color = "#04212b";
    } else if (i === progress) {
      slot.style.background = "rgba(0,223,216,.18)";
      slot.style.color = "#fff";
      slot.style.boxShadow = "0 0 0 2px #00dfd8";
    } else {
      slot.style.background = "rgba(255,255,255,.08)";
      slot.style.color = "rgba(255,255,255,.7)";
    }
    track.appendChild(slot);
  }
  root.appendChild(track);

  // Maze board.
  const CELL = cellSize();
  const board = document.createElement("div");
  board.style.position = "relative";
  board.style.width = COLS * CELL + "px";
  board.style.height = ROWS * CELL + "px";
  board.style.background = "rgba(255,255,255,.04)";
  board.style.borderRadius = "8px";

  const need = neededLetter();
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const c = grid[y][x];
      const cell = document.createElement("div");
      cell.style.position = "absolute";
      cell.style.left = x * CELL + "px";
      cell.style.top = y * CELL + "px";
      cell.style.width = CELL + "px";
      cell.style.height = CELL + "px";
      cell.style.display = "flex";
      cell.style.alignItems = "center";
      cell.style.justifyContent = "center";
      cell.style.fontSize = Math.round(CELL * 0.4) + "px";
      cell.style.fontWeight = "700";
      cell.style.boxSizing = "border-box";
      cell.style.color = "rgba(255,255,255,.55)";
      const wall = "2px solid rgba(255,255,255,.28)";
      if (c.top) cell.style.borderTop = wall;
      if (c.right) cell.style.borderRight = wall;
      if (c.bottom) cell.style.borderBottom = wall;
      if (c.left) cell.style.borderLeft = wall;

      const isGlow = c.letter === need && need !== "";
      if (isGlow) {
        cell.style.color = "#04212b";
        cell.style.background = "#ffd34e";
        cell.style.borderRadius = "4px";
      }
      cell.textContent = c.letter;

      if (x === px && y === py) {
        const dot = document.createElement("div");
        dot.style.position = "absolute";
        dot.style.inset = "18%";
        dot.style.borderRadius = "50%";
        dot.style.background = "#00dfd8";
        dot.style.boxShadow = "0 0 10px rgba(0,223,216,.8)";
        cell.appendChild(dot);
      }
      board.appendChild(cell);
    }
  }
  root.appendChild(board);

  // Direction pad.
  const pad = document.createElement("div");
  pad.style.display = "grid";
  pad.style.gridTemplateColumns = "repeat(3, 44px)";
  pad.style.gridTemplateRows = "repeat(2, 44px)";
  pad.style.gap = "6px";
  pad.style.justifyContent = "center";
  const mkBtn = (label: string, dx: number, dy: number, col: string, row: string) => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = label;
    b.style.gridColumn = col;
    b.style.gridRow = row;
    b.style.borderRadius = "8px";
    b.style.border = "1px solid rgba(255,255,255,.2)";
    b.style.background = "rgba(255,255,255,.1)";
    b.style.color = "#fff";
    b.style.fontSize = "18px";
    b.style.cursor = "pointer";
    b.addEventListener("click", () => move(dx, dy));
    return b;
  };
  pad.appendChild(mkBtn("↑", 0, -1, "2", "1"));
  pad.appendChild(mkBtn("←", -1, 0, "1", "2"));
  pad.appendChild(mkBtn("↓", 0, 1, "2", "2"));
  pad.appendChild(mkBtn("→", 1, 0, "3", "2"));
  root.appendChild(pad);
}

function canMove(dx: number, dy: number): boolean {
  const c = grid[py][px];
  if (dx === 1) return !c.right;
  if (dx === -1) return !c.left;
  if (dy === 1) return !c.bottom;
  if (dy === -1) return !c.top;
  return false;
}

function move(dx: number, dy: number) {
  if (!running) return;
  if (!canMove(dx, dy)) {
    sound.error();
    return;
  }
  px = clamp(px + dx, 0, COLS - 1);
  py = clamp(py + dy, 0, ROWS - 1);
  sound.click();

  const c = grid[py][px];
  if (c.letter === neededLetter()) {
    progress++;
    if (progress >= word.length) {
      score++;
      best = setHighScore("lettermaze", score);
      sound.win();
      updateStatus();
      newWord();
      return;
    }
    sound.success();
  }
  updateStatus();
  draw();
}

function updateStatus() {
  const status = el("status");
  if (status) {
    status.textContent = `Time: ${timeLeft}s · Words: ${score} · Best: ${best}`;
  }
}

function tick() {
  timeLeft--;
  if (timeLeft <= 0) {
    timeLeft = 0;
    updateStatus();
    endRound();
    return;
  }
  updateStatus();
}

function endRound() {
  running = false;
  if (timer !== null) {
    clearInterval(timer);
    timer = null;
  }
  best = setHighScore("lettermaze", score);
  showOverlay(
    "Time's up!",
    `You spelled ${score} word${score === 1 ? "" : "s"}. Best: ${best}.`
  );
}

function onKey(e: KeyboardEvent) {
  const k = e.key.toLowerCase();
  if (k === "arrowup" || k === "w") { e.preventDefault(); move(0, -1); }
  else if (k === "arrowdown" || k === "s") { e.preventDefault(); move(0, 1); }
  else if (k === "arrowleft" || k === "a") { e.preventDefault(); move(-1, 0); }
  else if (k === "arrowright" || k === "d") { e.preventDefault(); move(1, 0); }
}

function reset() {
  if (timer !== null) {
    clearInterval(timer);
    timer = null;
  }
  score = 0;
  timeLeft = ROUND_SECONDS;
  best = getHighScore("lettermaze");
  running = true;
  newWord();
  updateStatus();
  hideOverlay();
  timer = window.setInterval(tick, 1000);
}

export function initGame() {
  onReset(reset);
  document.removeEventListener("keydown", onKey);
  document.addEventListener("keydown", onKey);
  reset();
}
