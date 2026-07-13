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
  randInt,
} from "../../../shared/utils";

// Word Wipe — connect adjacent letters to find and clear all hidden words.

const SIZE = 7;
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const TARGETS = [
  "PLANET", "STORM", "ROCKET", "FLAME", "RIVER", "GARDEN", "CASTLE",
  "BRIDGE", "FOREST", "SHADOW", "SPARK", "CRYSTAL", "OCEAN", "VALLEY",
  "FLOWER", "LIGHT", "SILVER", "BRONZE", "GOLD", "STAR", "MOON", "WIND",
  "SNOW", "RAIN", "LEAF", "TREE", "IRON", "FROST", "CLOUD", "STONE",
];

interface Cell {
  r: number;
  c: number;
  node: HTMLButtonElement;
}

let grid: Cell[][] = [];
let letters: string[][] = [];
let targets: string[] = [];
let found: Set<string> = new Set();
let score = 0;
let best = 0;
let path: Cell[] = [];
let selecting = false;
let inputEl: HTMLInputElement | null = null;

function emptyGrid(): string[][] {
  return Array.from({ length: SIZE }, () => Array.from({ length: SIZE }, () => ""));
}

function tryPlace(word: string, board: string[][], allowOverwrite: boolean): boolean {
  const dirs = shuffle([
    [0, 1], [1, 0], [1, 1], [1, -1], [0, -1], [-1, 0], [-1, -1], [-1, 1],
  ]);
  for (let attempt = 0; attempt < 80; attempt++) {
    const r = randInt(0, SIZE - 1);
    const c = randInt(0, SIZE - 1);
    const [dr, dc] = dirs[0];
    const er = r + dr * (word.length - 1);
    const ec = c + dc * (word.length - 1);
    if (er < 0 || er >= SIZE || ec < 0 || ec >= SIZE) continue;
    let ok = true;
    for (let i = 0; i < word.length; i++) {
      const lr = r + dr * i;
      const lc = c + dc * i;
      const cur = board[lr][lc];
      if (cur && cur !== word[i] && !allowOverwrite) {
        ok = false;
        break;
      }
    }
    if (!ok) continue;
    for (let i = 0; i < word.length; i++) board[r + dr * i][c + dc * i] = word[i];
    return true;
  }
  return false;
}

function canTrace(word: string): boolean {
  const N = word.length;
  const visited: boolean[][] = Array.from({ length: SIZE }, () =>
    Array.from({ length: SIZE }, () => false)
  );
  const dfs = (r: number, c: number, idx: number): boolean => {
    if (idx === N) return true;
    if (r < 0 || c < 0 || r >= SIZE || c >= SIZE) return false;
    if (visited[r][c]) return false;
    if (letters[r][c] !== word[idx]) return false;
    visited[r][c] = true;
    const dirs = [
      [0, 1], [1, 0], [0, -1], [-1, 0],
      [1, 1], [1, -1], [-1, 1], [-1, -1],
    ];
    for (const [dr, dc] of dirs) {
      if (dfs(r + dr, c + dc, idx + 1)) return true;
    }
    visited[r][c] = false;
    return false;
  };
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++)
      if (letters[r][c] === word[0] && dfs(r, c, 0)) return true;
  return false;
}

function generateBoard(): string[][] {
  const board = emptyGrid();
  const chosen = shuffle(TARGETS).slice(0, 9);
  targets = [];
  for (const w of chosen) {
    if (w.length <= SIZE && tryPlace(w, board, false)) targets.push(w);
  }
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++)
      if (!board[r][c]) board[r][c] = ALPHABET[randInt(0, 25)];
  return board;
}

function applyGravity() {
  for (let c = 0; c < SIZE; c++) {
    const col: string[] = [];
    for (let r = 0; r < SIZE; r++) if (letters[r][c]) col.push(letters[r][c]);
    while (col.length < SIZE) col.unshift(ALPHABET[randInt(0, 25)]);
    for (let r = 0; r < SIZE; r++) letters[r][c] = col[r];
  }
}

function reconcile() {
  for (let pass = 0; pass < 24; pass++) {
    let changed = false;
    for (const w of targets) {
      if (found.has(w)) continue;
      if (!canTrace(w)) {
        tryPlace(w, letters, true);
        changed = true;
      }
    }
    if (!changed) break;
  }
}

function renderLetters() {
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++) grid[r][c].node.textContent = letters[r][c];
}

function buildGrid() {
  const root = el("word-wipe");
  if (!root) return;
  const area = getGameArea();
  const cell = Math.min(getCellSize({ cols: SIZE, rows: SIZE, area, max: 46 }), 44);
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
      rowArr.push({ r, c, node: btn });
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
  return dr <= 1 && dc <= 1 && !(dr === 0 && dc === 0);
}

function startSelect(r: number, c: number) {
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
  if (cell === last || path.includes(cell) || !adjacent(last, cell)) return;
  path.push(cell);
  paintPath();
}

function paintPath() {
  for (const row of grid)
    for (const cell of row) {
      cell.node.style.background = "rgba(255,255,255,.06)";
      cell.node.style.borderColor = "rgba(255,255,255,.18)";
    }
  for (const cell of path) {
    cell.node.style.background = "rgba(103,232,249,.35)";
    cell.node.style.borderColor = "#67e8f9";
  }
}

function endSelect() {
  if (!selecting) return;
  selecting = false;
  const word = path.map((c) => letters[c.r][c.c]).join("");
  path = [];
  paintPath();
  evaluate(word);
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
    flash(`Already cleared ${word}`);
    return;
  }
  if (targets.includes(word) && canTrace(word)) {
    found.add(word);
    const gained = word.length * word.length * 5;
    score += gained;
    sound.success();
    flash(`+${gained} for ${word}!`);
    clearWordTiles(word);
    applyGravity();
    reconcile();
    renderLetters();
    markFound(word);
    updateStatus();
    if (found.size === targets.length) finish();
  } else {
    sound.error();
    flash(`"${word}" is not a hidden word`);
    updateStatus();
  }
}

function clearWordTiles(word: string) {
  // find one valid path and clear those exact tiles
  const visited: boolean[][] = Array.from({ length: SIZE }, () =>
    Array.from({ length: SIZE }, () => false)
  );
  let toClear: [number, number][] = [];
  const dfs = (r: number, c: number, idx: number, acc: [number, number][]): boolean => {
    if (idx === word.length) {
      toClear = acc;
      return true;
    }
    if (r < 0 || c < 0 || r >= SIZE || c >= SIZE) return false;
    if (visited[r][c] || letters[r][c] !== word[idx]) return false;
    visited[r][c] = true;
    const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]];
    for (const [dr, dc] of dirs) {
      if (dfs(r + dr, c + dc, idx + 1, [...acc, [r, c]])) return true;
    }
    visited[r][c] = false;
    return false;
  };
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++)
      if (letters[r][c] === word[0] && dfs(r, c, 0, [])) break;
  for (const [r, c] of toClear) letters[r][c] = "";
}

function markFound(word: string) {
  const list = el("ww-found");
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

function flash(msg: string) {
  const s = el("ww-flash");
  if (s) s.textContent = msg;
}

function updateStatus() {
  const sc = el("status");
  if (sc) sc.textContent = `Score: ${score} · Best: ${best} · Cleared ${found.size}/${targets.length}`;
}

function finish() {
  best = setHighScore("word-wipe", score);
  sound.win();
  showOverlay("Board cleared!", `You wiped every word with a score of ${score}. Best: ${best}.`);
}

function reset() {
  letters = generateBoard();
  found = new Set();
  score = 0;
  best = getHighScore("word-wipe");
  selecting = false;
  path = [];
  hideOverlay();
  buildGrid();
  const root = el("word-wipe");
  const info = document.createElement("div");
  info.id = "ww-found";
  info.style.display = "flex";
  info.style.flexWrap = "wrap";
  info.style.gap = "6px";
  info.style.justifyContent = "center";
  info.style.maxWidth = "340px";
  info.style.marginTop = "10px";
  root?.appendChild(info);
  const flashEl = document.createElement("p");
  flashEl.id = "ww-flash";
  flashEl.style.minHeight = "1.1rem";
  flashEl.style.marginTop = "6px";
  flashEl.style.fontSize = "12px";
  flashEl.style.color = "rgba(255,255,255,.7)";
  flashEl.style.textAlign = "center";
  root?.appendChild(flashEl);
  updateStatus();
  inputEl?.focus();
}

export function initGame() {
  onReset(reset);
  reset();
}
