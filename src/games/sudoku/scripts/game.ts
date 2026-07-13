import {
  el,
  onReset,
  showOverlay,
  hideOverlay,
  sound,
  getHighScore,
  setHighScore,
  shuffle,
} from "../../../shared/utils";

// Sudoku — fill a 9x9 grid so every row, column, and 3x3 box holds 1-9 once.

type Grid = number[][];

let solution: Grid = [];
let puzzle: Grid = [];
let given: boolean[][] = [];
let notes: Set<number>[][] = [];
let selected: { r: number; c: number } | null = null;
let notesMode = false;
let lives = 3;
let mistakes = 0;
let startTime = 0;
let finished = false;
let best = 0;

function emptyGrid(): Grid {
  return Array.from({ length: 9 }, () => Array(9).fill(0));
}

function canPlace(g: Grid, r: number, c: number, n: number): boolean {
  for (let i = 0; i < 9; i++) {
    if (g[r][i] === n) return false;
    if (g[i][c] === n) return false;
  }
  const br = Math.floor(r / 3) * 3;
  const bc = Math.floor(c / 3) * 3;
  for (let dr = 0; dr < 3; dr++) {
    for (let dc = 0; dc < 3; dc++) {
      if (g[br + dr][bc + dc] === n) return false;
    }
  }
  return true;
}

function fillGrid(g: Grid): boolean {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (g[r][c] === 0) {
        const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        for (const n of nums) {
          if (canPlace(g, r, c, n)) {
            g[r][c] = n;
            if (fillGrid(g)) return true;
            g[r][c] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function countSolutions(g: Grid, limit = 2): number {
  let count = 0;
  const rec = () => {
    if (count >= limit) return;
    let r = -1;
    let c = -1;
    for (let rr = 0; rr < 9 && r === -1; rr++) {
      for (let cc = 0; cc < 9; cc++) {
        if (g[rr][cc] === 0) {
          r = rr;
          c = cc;
          break;
        }
      }
    }
    if (r === -1) {
      count++;
      return;
    }
    for (let n = 1; n <= 9; n++) {
      if (canPlace(g, r, c, n)) {
        g[r][c] = n;
        rec();
        g[r][c] = 0;
        if (count >= limit) return;
      }
    }
  };
  rec();
  return count;
}

function generatePuzzle(): void {
  solution = emptyGrid();
  fillGrid(solution);
  puzzle = solution.map((row) => [...row]);
  const indices = shuffle(Array.from({ length: 81 }, (_, i) => i));
  let removed = 0;
  const targetRemove = 50;
  for (const idx of indices) {
    if (removed >= targetRemove) break;
    const r = Math.floor(idx / 9);
    const c = idx % 9;
    const backup = puzzle[r][c];
    puzzle[r][c] = 0;
    const copy = puzzle.map((row) => [...row]);
    if (countSolutions(copy, 2) !== 1) {
      puzzle[r][c] = backup;
    } else {
      removed++;
    }
  }
  given = puzzle.map((row) => row.map((v) => v !== 0));
  notes = Array.from({ length: 9 }, () =>
    Array.from({ length: 9 }, () => new Set<number>())
  );
}

function cellSize(): number {
  const area = getGameArea();
  const size = Math.min(area.w, area.h * 1.4) / 9;
  return Math.max(28, Math.min(size, 42));
}

function styleBlock(): void {
  const gameEl = el("sudoku-board");
  if (!gameEl || gameEl.dataset.styled) return;
  const style = document.createElement("style");
  style.textContent = `
    .sudoku-grid { display:grid; grid-template-columns:repeat(9,1fr); gap:0; border:2px solid rgba(255,255,255,.5); border-radius:8px; overflow:hidden; }
    .sudoku-cell { aspect-ratio:1/1; display:flex; align-items:center; justify-content:center; position:relative; border:1px solid rgba(255,255,255,.12); font-weight:700; cursor:pointer; user-select:none; background:rgba(255,255,255,.04); transition:background .12s; }
    .sudoku-cell.given { background:rgba(255,255,255,.10); color:#fff; }
    .sudoku-cell.empty { color:#9fe7ff; }
    .sudoku-cell.sel { background:rgba(120,200,255,.32); }
    .sudoku-cell.hl { background:rgba(120,200,255,.14); }
    .sudoku-cell.same { background:rgba(255,210,120,.22); }
    .sudoku-cell.bad { background:rgba(255,90,90,.45) !important; }
    .sudoku-cell.br { border-right:2px solid rgba(255,255,255,.5); }
    .sudoku-cell.bb { border-bottom:2px solid rgba(255,255,255,.5); }
    .sudoku-notes { display:grid; grid-template-columns:repeat(3,1fr); grid-template-rows:repeat(3,1fr); width:100%; height:100%; font-size:.42em; font-weight:600; color:rgba(255,255,255,.55); }
    .sudoku-note { display:flex; align-items:center; justify-content:center; }
    .sudoku-pad { display:grid; grid-template-columns:repeat(5,1fr); gap:6px; }
    .sudoku-key { height:40px; border-radius:8px; border:1px solid rgba(255,255,255,.2); background:rgba(255,255,255,.07); color:#fff; font-weight:700; cursor:pointer; }
    .sudoku-key:hover { background:rgba(255,255,255,.15); }
    .sudoku-key.active { background:rgba(120,200,255,.4); }
  `;
  document.head.appendChild(style);
  gameEl.dataset.styled = "1";
}

function draw(): void {
  const gameEl = el("sudoku-board");
  if (!gameEl) return;
  styleBlock();
  const SZ = cellSize();
  const selVal = selected ? puzzle[selected.r][selected.c] : 0;
  gameEl.innerHTML = "";

  const grid = document.createElement("div");
  grid.className = "sudoku-grid";
  grid.style.width = SZ * 9 + "px";
  grid.style.height = SZ * 9 + "px";
  grid.style.fontSize = SZ * 0.5 + "px";

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const cell = document.createElement("button");
      cell.type = "button";
      cell.className = "sudoku-cell";
      if ((c + 1) % 3 === 0 && c !== 8) cell.classList.add("br");
      if ((r + 1) % 3 === 0 && r !== 8) cell.classList.add("bb");
      const v = puzzle[r][c];
      if (given[r][c]) {
        cell.classList.add("given");
        cell.textContent = String(v);
      } else if (v !== 0) {
        cell.classList.add("empty");
        cell.textContent = String(v);
      } else {
        const ns = notes[r][c];
        if (ns.size) {
          const wrap = document.createElement("div");
          wrap.className = "sudoku-notes";
          for (let n = 1; n <= 9; n++) {
            const span = document.createElement("span");
            span.className = "sudoku-note";
            span.textContent = ns.has(n) ? String(n) : "";
            wrap.appendChild(span);
          }
          cell.appendChild(wrap);
        }
      }
      if (selected) {
        if (selected.r === r && selected.c === c) cell.classList.add("sel");
        else if (selected.r === r || selected.c === c) cell.classList.add("hl");
        else if (
          Math.floor(selected.r / 3) === Math.floor(r / 3) &&
          Math.floor(selected.c / 3) === Math.floor(c / 3)
        )
          cell.classList.add("hl");
        if (selVal !== 0 && v === selVal) cell.classList.add("same");
      }
      cell.addEventListener("click", () => selectCell(r, c));
      grid.appendChild(cell);
    }
  }
  gameEl.appendChild(grid);

  const pad = document.createElement("div");
  pad.className = "sudoku-pad";
  pad.style.width = SZ * 9 + "px";
  pad.style.marginTop = "12px";
  for (let n = 1; n <= 9; n++) {
    const key = document.createElement("button");
    key.type = "button";
    key.className = "sudoku-key";
    key.textContent = String(n);
    key.addEventListener("click", () => enterNumber(n));
    pad.appendChild(key);
  }
  const erase = document.createElement("button");
  erase.type = "button";
  erase.className = "sudoku-key";
  erase.textContent = "⌫";
  erase.addEventListener("click", eraseCell);
  pad.appendChild(erase);
  gameEl.appendChild(pad);

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "sudoku-key";
  toggle.style.marginTop = "8px";
  toggle.style.width = SZ * 9 + "px";
  toggle.style.gridColumn = "span 5";
  toggle.textContent = notesMode ? "Notes: ON" : "Notes: OFF";
  if (notesMode) toggle.classList.add("active");
  toggle.addEventListener("click", () => {
    notesMode = !notesMode;
    sound.click();
    draw();
  });
  pad.appendChild(toggle);

  updateStatus();
}

function selectCell(r: number, c: number): void {
  if (finished) return;
  sound.click();
  selected = { r, c };
  draw();
}

function enterNumber(n: number): void {
  if (finished || !selected) return;
  const { r, c } = selected;
  if (given[r][c]) return;
  sound.click();
  if (notesMode) {
    if (puzzle[r][c] === 0) {
      const set = notes[r][c];
      if (set.has(n)) set.delete(n);
      else set.add(n);
      draw();
    }
    return;
  }
  if (puzzle[r][c] === n) return;
  if (n === solution[r][c]) {
    puzzle[r][c] = n;
    notes[r][c].clear();
    sound.success();
    draw();
    checkWin();
  } else {
    mistakes++;
    lives--;
    sound.error();
    const cell = el("sudoku-board")?.querySelectorAll(".sudoku-cell")[
      r * 9 + c
    ] as HTMLElement | undefined;
    if (cell) {
      cell.classList.add("bad");
      setTimeout(() => draw(), 350);
    } else {
      draw();
    }
    if (lives <= 0) endGame(false);
    else updateStatus();
  }
}

function eraseCell(): void {
  if (finished || !selected) return;
  const { r, c } = selected;
  if (given[r][c] || puzzle[r][c] === 0) return;
  sound.click();
  puzzle[r][c] = 0;
  notes[r][c].clear();
  draw();
}

function checkWin(): void {
  for (let r = 0; r < 9; r++)
    for (let c = 0; c < 9; c++) if (puzzle[r][c] !== solution[r][c]) return;
  endGame(true);
}

function elapsedSec(): number {
  return Math.floor((Date.now() - startTime) / 1000);
}

function computeScore(): number {
  const time = elapsedSec();
  return Math.max(0, 1000 - time * 4 - mistakes * 150);
}

function updateStatus(): void {
  const status = el("status");
  if (!status) return;
  const time = elapsedSec();
  status.textContent = `Lives: ${"♥".repeat(lives)}${"·".repeat(Math.max(0, 3 - lives))}  ·  Mistakes: ${mistakes}  ·  Time: ${time}s  ·  Best: ${best}`;
}

function endGame(won: boolean): void {
  finished = true;
  const score = computeScore();
  if (won) {
    best = setHighScore("sudoku", score);
    sound.win();
    showOverlay("Solved!", `Flawless logic. Score ${score} · Best ${best}.`);
  } else {
    sound.error();
    showOverlay("Game over", `Three mistakes. Final score ${score} · Best ${best}.`);
  }
  updateStatus();
}

function reset(): void {
  finished = false;
  lives = 3;
  mistakes = 0;
  selected = null;
  notesMode = false;
  startTime = Date.now();
  best = getHighScore("sudoku");
  generatePuzzle();
  hideOverlay();
  draw();
}

export function initGame(): void {
  onReset(reset);
  document.addEventListener("keydown", (e) => {
    if (finished || !el("sudoku-board")) return;
    if (e.key >= "1" && e.key <= "9") {
      enterNumber(parseInt(e.key, 10));
    } else if (e.key === "Backspace" || e.key === "Delete") {
      eraseCell();
    } else if (e.key === "n" || e.key === "N") {
      notesMode = !notesMode;
      draw();
    } else if (e.key.startsWith("Arrow") && selected) {
      e.preventDefault();
      let { r, c } = selected;
      if (e.key === "ArrowUp") r = (r + 8) % 9;
      if (e.key === "ArrowDown") r = (r + 1) % 9;
      if (e.key === "ArrowLeft") c = (c + 8) % 9;
      if (e.key === "ArrowRight") c = (c + 1) % 9;
      selectCell(r, c);
    }
  });
  reset();
}
