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

const WORDS = [
  { w: "APPLE", c: "Fruit", d: "Common red or green fruit" },
  { w: "BREAD", c: "Food", d: "Baked flour staple" },
  { w: "CHAIR", c: "Furniture", d: "You sit on it" },
  { w: "DREAM", c: "Sleep", d: "What you do at night" },
  { w: "EAGLE", c: "Animal", d: "Majestic bird of prey" },
  { w: "FLAME", c: "Fire", d: "Hot glowing gas" },
  { w: "GRAPE", c: "Fruit", d: "Small purple or green cluster" },
  { w: "HOUSE", c: "Building", d: "Where you live" },
  { w: "IMAGE", c: "Photo", d: "A picture or likeness" },
  { w: "JUICE", c: "Drink", d: "Fruit liquid" },
  { w: "KNIFE", c: "Tool", d: "Sharp cutting utensil" },
  { w: "LEMON", c: "Fruit", d: "Yellow sour fruit" },
  { w: "MANGO", c: "Fruit", d: "Tropical stone fruit" },
  { w: "NIGHT", c: "Time", d: "Dark hours after sunset" },
  { w: "OCEAN", c: "Water", d: "Vast salty sea" },
  { w: "PIANO", c: "Music", d: "Black and white keys" },
  { w: "QUEEN", c: "Royalty", d: "Female monarch" },
  { w: "RIVER", c: "Water", d: "Flowing fresh water" },
  { w: "STONE", c: "Rock", d: "Hard natural mineral" },
  { w: "TIGER", c: "Animal", d: "Striped big cat" },
  { w: "UNITY", c: "Concept", d: "State of being one" },
  { w: "VIVID", c: "Adjective", d: "Bright and intense" },
  { w: "WHALE", c: "Animal", d: "Largest sea mammal" },
  { w: "ZEBRA", c: "Animal", d: "Black and white stripes" },
];

type Dir = "across" | "down";
type Cell = { row: number; col: number; letter: string; answer: string; number: number };

const SIZE = 5;
let grid: (Cell | null)[][];
let across: { n: number; word: string; clue: string; cells: { r: number; c: number }[] }[];
let down: { n: number; word: string; clue: string; cells: { r: number; c: number }[] }[];
let selected: { r: number; c: number; dir: Dir } | null;
let timerStart: number;
let timerInterval: number | null;

function buildPuzzle() {
  const pool = WORDS.filter((x) => x.w.length === SIZE);
  shuffle(pool);
  const chosen: typeof WORDS = [];
  across = [];
  down = [];
  grid = Array.from({ length: SIZE }, () => Array(SIZE).fill(null));

  let aIdx = 0;
  outer: for (const item of pool) {
    if (chosen.length >= SIZE) break;
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c <= SIZE - item.w.length; c++) {
        if (canPlaceAcross(item.w, r, c, chosen)) {
          placeAcross(item, r, c, aIdx + 1);
          chosen.push(item);
          aIdx++;
          continue outer;
        }
      }
    }
  }

  let dIdx = 0;
  outer: for (const item of pool) {
    if (down.length >= SIZE - 1) break;
    for (let c = 0; c < SIZE; c++) {
      for (let r = 0; r <= SIZE - item.w.length; r++) {
        if (canPlaceDown(item.w, r, c, chosen)) {
          placeDown(item, r, c, dIdx + aIdx + 1);
          chosen.push(item);
          dIdx++;
          continue outer;
        }
      }
    }
  }
}

function canPlaceAcross(word: string, r: number, c: number, placed: typeof WORDS): boolean {
  if (c + word.length > SIZE) return false;
  if (c > 0 && grid[r][c - 1]) return false;
  if (c + word.length < SIZE && grid[r][c + word.length]) return false;
  for (let i = 0; i < word.length; i++) {
    if (grid[r][c + i]) {
      if (grid[r][c + i]!.answer !== word[i]) return false;
    } else {
      if (r > 0 && grid[r - 1][c + i]) return false;
      if (r < SIZE - 1 && grid[r + 1][c + i]) return false;
    }
  }
  return true;
}

function canPlaceDown(word: string, r: number, c: number, placed: typeof WORDS): boolean {
  if (r + word.length > SIZE) return false;
  if (r > 0 && grid[r - 1][c]) return false;
  if (r + word.length < SIZE && grid[r + word.length][c]) return false;
  for (let i = 0; i < word.length; i++) {
    if (grid[r + i][c]) {
      if (grid[r + i][c]!.answer !== word[i]) return false;
    } else {
      if (c > 0 && grid[r + i][c - 1]) return false;
      if (c < SIZE - 1 && grid[r + i][c + 1]) return false;
    }
  }
  return true;
}

function placeAcross(item: typeof WORDS[0], r: number, c: number, n: number) {
  const cells: { r: number; c: number }[] = [];
  for (let i = 0; i < item.w.length; i++) {
    const cell: Cell = { row: r, col: c + i, letter: "", answer: item.w[i], number: i === 0 ? n : 0 };
    if (i === 0) cell.number = n;
    grid[r][c + i] = cell;
    cells.push({ r, c: c + i });
  }
  across.push({ n, word: item.w, clue: item.c + ": " + item.d, cells });
}

function placeDown(item: typeof WORDS[0], r: number, c: number, n: number) {
  const cells: { r: number; c: number }[] = [];
  for (let i = 0; i < item.w.length; i++) {
    const cell: Cell = { row: r + i, col: c, letter: "", answer: item.w[i], number: i === 0 ? n : 0 };
    if (i === 0) cell.number = n;
    grid[r + i][c] = cell;
    cells.push({ r: r + i, c });
  }
  down.push({ n, word: item.w, clue: item.c + ": " + item.d, cells });
}

function draw() {
  const board = el("crossword-board");
  if (!board) return;
  board.innerHTML = "";
  const clueList = el("crossword-clues");
  if (!clueList) return;
  clueList.innerHTML = "";

  const clues = document.createElement("div");
  const acrossHeader = document.createElement("h4");
  acrossHeader.textContent = "Across";
  clues.appendChild(acrossHeader);
  const acrossList = document.createElement("ul");
  acrossList.className = "list-disc pl-5 text-sm text-body space-y-1";
  across.forEach((x) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong class=\"text-ink\">${x.n}.</strong> ${x.clue}`;
    acrossList.appendChild(li);
  });
  clues.appendChild(acrossList);
  clues.appendChild(document.createElement("br"));

  const downHeader = document.createElement("h4");
  downHeader.textContent = "Down";
  clues.appendChild(downHeader);
  const downList = document.createElement("ul");
  downList.className = "list-disc pl-5 text-sm text-body space-y-1";
  down.forEach((x) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong class=\"text-ink\">${x.n}.</strong> ${x.clue}`;
    downList.appendChild(li);
  });
  clues.appendChild(downList);
  clueList.appendChild(clues);

  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const cell = grid[r][c];
      const sq = document.createElement("div");
      sq.className = "relative flex items-center justify-center border border-hairline bg-canvas text-sm font-mono text-ink";
      if (!cell) {
        sq.className += " bg-ink";
      } else {
        sq.dataset.r = String(r);
        sq.dataset.c = String(c);
        if (cell.number) {
          const num = document.createElement("span");
          num.className = "absolute left-1 top-1 text-[10px] leading-none text-mute";
          num.textContent = String(cell.number);
          sq.appendChild(num);
        }
        const input = document.createElement("input");
        input.maxLength = 1;
        input.value = cell.letter;
        input.className = "w-full bg-transparent text-center outline-none";
        input.setAttribute("aria-label", `Row ${r + 1}, Column ${c + 1}`);
        input.addEventListener("input", (e) => {
          const val = (e.target as HTMLInputElement).value.toUpperCase();
          cell.letter = val;
          (e.target as HTMLInputElement).value = val;
          sound.click();
          if (val && c + 1 < SIZE && grid[r][c + 1]) selectAt(r, c + 1, selected?.dir || "across");
          draw();
        });
        input.addEventListener("keydown", (e) => {
          const key = (e as KeyboardEvent).key;
          if (key === "ArrowRight" && c + 1 < SIZE) { e.preventDefault(); selectAt(r, c + 1, selected?.dir || "across"); }
          else if (key === "ArrowLeft" && c - 1 >= 0) { e.preventDefault(); selectAt(r, c - 1, selected?.dir || "across"); }
          else if (key === "ArrowDown" && r + 1 < SIZE) { e.preventDefault(); selectAt(r + 1, c, selected?.dir || "down"); }
          else if (key === "ArrowUp" && r - 1 >= 0) { e.preventDefault(); selectAt(r - 1, c, selected?.dir || "down"); }
          else if (key === "Tab") { e.preventDefault(); selectAt(r, c + 1, "across"); }
          else if (key === "Backspace" && !cell.letter && c - 1 >= 0) {
            e.preventDefault();
            (grid[r][c - 1]!).letter = "";
            selectAt(r, c - 1, selected?.dir || "across");
            draw();
          }
        });
        sq.addEventListener("click", () => selectAt(r, c, selected?.dir === "across" ? "down" : "across"));
        sq.appendChild(input);
        if (selected && selected.r === r && selected.c === c) {
          sq.classList.add("ring-2", "ring-link");
        }
      }
      board.appendChild(sq);
    }
  }
}

function selectAt(r: number, c: number, dir: Dir) {
  if (!grid[r][c]) return;
  selected = { r, c, dir };
  draw();
}

function checkAnswers() {
  let correct = 0;
  let total = 0;
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const cell = grid[r][c];
      if (cell) {
        total++;
        if (cell.letter === cell.answer) correct++;
      }
    }
  }
  if (correct === total) {
    const elapsed = Math.floor((Date.now() - timerStart) / 1000);
    const best = getHighScore("crossword");
    const newBest = setHighScore("crossword", elapsed, true);
    showOverlay("Congratulations!", `Solved in ${elapsed}s${newBest < best || best === 0 ? " — New best!" : ""}`);
    sound.win();
  } else {
    showOverlay("Not quite", `${correct}/${total} letters correct. Keep trying!`);
    sound.error();
  }
}

function revealWord() {
  if (!selected) return;
  const word = findWordAt(selected.r, selected.c);
  if (!word) return;
  word.cells.forEach(({ r, c }) => { if (grid[r][c]) grid[r][c]!.letter = grid[r][c]!.answer; });
  sound.click();
  draw();
}

function findWordAt(r: number, c: number): { word: string; cells: { r: number; c: number }[] } | null {
  for (const w of [...across]) {
    if (w.cells.some((p) => p.r === r && p.c === c)) return { word: w.word, cells: w.cells };
  }
  for (const w of [...down]) {
    if (w.cells.some((p) => p.r === r && p.c === c)) return { word: w.word, cells: w.cells };
  }
  return null;
}

function reset() {
  timerStart = Date.now();
  if (timerInterval) clearInterval(timerInterval);
  buildPuzzle();
  selected = null;
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (grid[r][c]) grid[r][c]!.letter = "";
    }
  }
  hideOverlay();
  draw();
  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const status = el("status");
  if (!status) return;
  const elapsed = Math.floor((Date.now() - timerStart) / 1000);
  const m = Math.floor(elapsed / 60);
  const s = elapsed % 60;
  status.textContent = `Time: ${m}:${s.toString().padStart(2, "0")}  |  Best: ${getHighScore("crossword")}s`;
}

export function initGame() {
  onReset(() => {
    if (timerInterval) clearInterval(timerInterval);
    reset();
  });
  el("crossword-check")?.addEventListener("click", checkAnswers);
  el("crossword-reveal")?.addEventListener("click", revealWord);
  reset();
}
