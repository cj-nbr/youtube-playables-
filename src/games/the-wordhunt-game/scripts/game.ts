import {
  el,
  onReset,
  showOverlay,
  hideOverlay,
  sound,
  registerPause,
  getCellSize,
  getGameArea,
  getHighScore,
  setHighScore,
  shuffle,
  randInt,
} from "../../../shared/utils";

// The WordHunt Game — find hidden words in a letter grid before time runs out.

const SIZE = 6;
const ROUND_TIME = 120;
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const TARGETS = [
  "STORM", "ROCK", "STONE", "PLANET", "FLAME", "RIVER", "GARDEN", "WINTER",
  "CASTLE", "BRIDGE", "FOREST", "SHADOW", "SPARK", "CRYSTAL", "THUNDER",
  "OCEAN", "MOUNTAIN", "VALLEY", "ANIMAL", "FLOWER", "PLANT", "LIGHT",
  "NIGHT", "SILVER", "BRONZE", "GOLD", "STAR", "MOON", "SUN", "WIND",
  "SNOW", "RAIN", "LEAF", "TREE", "SAND", "IRON", "FROST", "CLOUD",
];

interface Cell {
  r: number;
  c: number;
  letter: string;
  node: HTMLButtonElement;
}

let grid: Cell[][] = [];
let letters: string[][] = [];
let targets: string[] = [];
let found: Set<string> = new Set();
let score = 0;
let best = 0;
let timeLeft = 0;
let timer: number | null = null;
let path: Cell[] = [];
let selecting = false;
let running = false;
let paused = false;
let inputEl: HTMLInputElement | null = null;

function emptyGrid(): string[][] {
  return Array.from({ length: SIZE }, () => Array.from({ length: SIZE }, () => ""));
}

function tryPlace(word: string, board: string[][]): boolean {
  const dirs = [
    [0, 1], [1, 0], [1, 1], [1, -1], [0, -1], [-1, 0], [-1, -1], [-1, 1],
  ];
  for (let attempt = 0; attempt < 60; attempt++) {
    const r = randInt(0, SIZE - 1);
    const c = randInt(0, SIZE - 1);
    const [dr, dc] = shuffle(dirs)[0];
    const er = r + dr * (word.length - 1);
    const ec = c + dc * (word.length - 1);
    if (er < 0 || er >= SIZE || ec < 0 || ec >= SIZE) continue;
    let ok = true;
    for (let i = 0; i < word.length; i++) {
      const lr = r + dr * i;
      const lc = c + dc * i;
      const cur = board[lr][lc];
      if (cur && cur !== word[i]) {
        ok = false;
        break;
      }
    }
    if (!ok) continue;
    for (let i = 0; i < word.length; i++) {
      board[r + dr * i][c + dc * i] = word[i];
    }
    return true;
  }
  return false;
}

function generateBoard(): string[][] {
  const board = emptyGrid();
  const chosen = shuffle(TARGETS).slice(0, 14);
  targets = [];
  for (const w of chosen) {
    if (w.length <= SIZE && tryPlace(w, board)) targets.push(w);
  }
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (!board[r][c]) board[r][c] = ALPHABET[randInt(0, 25)];
    }
  }
  return board;
}

function buildGrid() {
  const root = el("the-wordhunt-game");
  if (!root) return;
  const area = getGameArea();
  const cell = Math.min(getCellSize({ cols: SIZE, rows: SIZE, area, max: 56 }), 54);
  root.innerHTML = "";

  const wrap = document.createElement("div");
  wrap.style.display = "flex";
  wrap.style.flexDirection = "column";
  wrap.style.alignItems = "center";
  wrap.style.gap = "10px";

  const gridEl = document.createElement("div");
  gridEl.style.display = "grid";
  gridEl.style.gridTemplateColumns = `repeat(${SIZE}, ${cell}px)`;
  gridEl.style.gridTemplateRows = `repeat(${SIZE}, ${cell}px)`;
  gridEl.style.gap = "4px";

  grid = [];
  for (let r = 0; r < SIZE; r++) {
    const rowArr: Cell[] = [];
    for (let c = 0; c < SIZE; c++) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = letters[r][c];
      btn.dataset.r = String(r);
      btn.dataset.c = String(c);
      btn.style.width = cell + "px";
      btn.style.height = cell + "px";
      btn.style.fontSize = Math.round(cell * 0.42) + "px";
      btn.style.fontWeight = "700";
      btn.style.borderRadius = "8px";
      btn.style.border = "1px solid rgba(255,255,255,.18)";
      btn.style.background = "rgba(255,255,255,.06)";
      btn.style.color = "#fff";
      btn.style.cursor = "pointer";
      btn.style.transition = "background .1s, color .1s, border-color .1s";
      btn.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        startSelect(r, c);
      });
      rowArr.push({ r, c, letter: letters[r][c], node: btn });
      gridEl.appendChild(btn);
    }
    grid.push(rowArr);
  }
  wrap.appendChild(gridEl);

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Or type a word and press Enter…";
  input.setAttribute("aria-label", "Type a word");
  input.style.width = SIZE * cell + 4 + "px";
  input.style.maxWidth = "100%";
  input.style.padding = "9px 12px";
  input.style.borderRadius = "10px";
  input.style.border = "1px solid rgba(255,255,255,.25)";
  input.style.background = "rgba(255,255,255,.06)";
  input.style.color = "#fff";
  input.style.fontSize = "15px";
  input.style.outline = "none";
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") submitTyped();
  });
  inputEl = input;
  wrap.appendChild(input);

  root.appendChild(wrap);
}

function cellAt(r: number, c: number): Cell | null {
  if (r < 0 || c < 0 || r >= SIZE || c >= SIZE) return null;
  return grid[r][c];
}

function adjacent(a: Cell, b: Cell): boolean {
  const dr = Math.abs(a.r - b.r);
  const dc = Math.abs(a.c - b.c);
  return (dr <= 1 && dc <= 1) && !(dr === 0 && dc === 0);
}

function startSelect(r: number, c: number) {
  if (!running || paused) return;
  sound.click();
  selecting = true;
  path = [cellAt(r, c)!];
  paintPath();
  const move = (e: PointerEvent) => onMove(e);
  const up = () => {
    document.removeEventListener("pointermove", move);
    document.removeEventListener("pointerup", up);
    endSelect();
  };
  document.addEventListener("pointermove", move);
  document.addEventListener("pointerup", up);
}

function onMove(e: PointerEvent) {
  if (!selecting) return;
  const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
  const r = target?.dataset?.r;
  const c = target?.dataset?.c;
  if (r === undefined || c === undefined) return;
  const cell = cellAt(Number(r), Number(c));
  if (!cell) return;
  const last = path[path.length - 1];
  if (cell === last) return;
  if (path.includes(cell)) return;
  if (!adjacent(last, cell)) return;
  path.push(cell);
  paintPath();
}

function paintPath() {
  for (const row of grid) for (const cell of row) cell.node.style.background = "rgba(255,255,255,.06)";
  for (const cell of path) {
    cell.node.style.background = "rgba(103,232,249,.35)";
    cell.node.style.borderColor = "#67e8f9";
  }
}

function endSelect() {
  if (!selecting) return;
  selecting = false;
  const word = path.map((c) => c.letter).join("");
  path = [];
  evaluate(word);
  paintPath();
  inputEl?.focus();
}

function submitTyped() {
  if (!inputEl) return;
  const word = inputEl.value.trim().toUpperCase();
  inputEl.value = "";
  if (word.length < 3) return;
  evaluate(word);
  inputEl?.focus();
}

function evaluate(word: string) {
  if (found.has(word)) {
    sound.error();
    flashStatus(`Already found ${word}`);
    return;
  }
  if (targets.includes(word)) {
    found.add(word);
    const gained = word.length * word.length * 5;
    score += gained;
    sound.success();
    markFound(word);
    flashStatus(`+${gained} for ${word}!`);
    updateStatus();
    if (found.size === targets.length) finish(true);
  } else {
    sound.error();
    flashStatus(`"${word}" is not a hidden word`);
    updateStatus();
  }
}

function markFound(word: string) {
  const list = el("wh-found");
  if (!list) return;
  const chip = document.createElement("span");
  chip.textContent = word;
  chip.style.padding = "3px 9px";
  chip.style.borderRadius = "999px";
  chip.style.fontSize = "12px";
  chip.style.fontWeight = "600";
  chip.style.background = "rgba(16,185,129,.25)";
  chip.style.border = "1px solid rgba(16,185,129,.6)";
  chip.style.color = "#d1fae5";
  list.appendChild(chip);
}

function flashStatus(msg: string) {
  const s = el("wh-flash");
  if (s) s.textContent = msg;
}

function updateStatus() {
  const sc = el("status");
  if (sc)
    sc.textContent = `Score: ${score} · Best: ${best} · Found ${found.size}/${targets.length} · ${Math.ceil(timeLeft)}s`;
}

function tick() {
  timeLeft -= 1;
  updateStatus();
  if (timeLeft <= 0) {
    finish(false);
    return;
  }
  timer = window.setTimeout(tick, 1000);
}

function finish(allFound: boolean) {
  running = false;
  if (timer !== null) clearTimeout(timer);
  timer = null;
  best = setHighScore("the-wordhunt-game", score);
  sound.win();
  const msg = allFound
    ? `You found all ${targets.length} words! Score: ${score}. Best: ${best}.`
    : `Time's up! Found ${found.size}/${targets.length} words. Score: ${score}. Best: ${best}.`;
  showOverlay(allFound ? "Perfect hunt!" : "Time's up", msg);
}

function pauseGame() {
  if (!running || paused) return;
  paused = true;
  if (timer !== null) clearTimeout(timer);
  timer = null;
}
function resumeGame() {
  if (!running || !paused) return;
  paused = false;
  timer = window.setTimeout(tick, 1000);
}

function reset() {
  if (timer !== null) clearTimeout(timer);
  timer = null;
  letters = generateBoard();
  found = new Set();
  score = 0;
  best = getHighScore("the-wordhunt-game");
  timeLeft = ROUND_TIME;
  running = true;
  paused = false;
  selecting = false;
  path = [];
  hideOverlay();
  buildGrid();
  const root = el("the-wordhunt-game");
  const info = document.createElement("div");
  info.id = "wh-found";
  info.style.display = "flex";
  info.style.flexWrap = "wrap";
  info.style.gap = "6px";
  info.style.justifyContent = "center";
  info.style.maxWidth = "340px";
  info.style.marginTop = "10px";
  root?.appendChild(info);
  const flash = document.createElement("p");
  flash.id = "wh-flash";
  flash.style.minHeight = "1.1rem";
  flash.style.marginTop = "6px";
  flash.style.fontSize = "12px";
  flash.style.color = "rgba(255,255,255,.7)";
  flash.style.textAlign = "center";
  root?.appendChild(flash);
  updateStatus();
  inputEl?.focus();
  timer = window.setTimeout(tick, 1000);
}

export function initGame() {
  onReset(reset);
  registerPause(pauseGame, resumeGame);
  reset();
}
