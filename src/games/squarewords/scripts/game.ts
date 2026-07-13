import {
  el,
  onReset,
  showOverlay,
  hideOverlay,
  sound,
  randInt,
  shuffle,
  getGameArea,
  clamp,
  getHighScore,
  setHighScore,
} from "../../../shared/utils";

// Square Words — fill a 5x5 grid so every row and column spells a word. These
// are symmetric word squares, so each row word equals its matching column word,
// and one clue serves both directions. Fastest solve is saved.

const N = 5;

interface Puzzle {
  words: string[]; // 5 rows; symmetric so columns match
  clues: string[]; // one per word (serves row + column)
}

const PUZZLES: Puzzle[] = [
  {
    words: ["ABOUT", "BERTH", "ORATE", "UTTER", "THERE"],
    clues: [
      "Approximately; concerning",
      "A sleeping bunk on a ship or train",
      "To speak formally in public",
      "To say aloud; complete or total",
      "At or in that place",
    ],
  },
  {
    words: ["ALBUM", "LEASE", "BANAL", "USAGE", "MELEE"],
    clues: [
      "A collection of songs or photos",
      "A rental contract",
      "Boringly ordinary; unoriginal",
      "The way something is used",
      "A confused, chaotic fight",
    ],
  },
  {
    words: ["NOMAD", "OBESE", "MERIT", "ASIDE", "DETER"],
    clues: [
      "A wanderer with no fixed home",
      "Extremely overweight",
      "To deserve; worthiness",
      "To one side; a whispered remark",
      "To discourage or prevent",
    ],
  },
  {
    words: ["ACUTE", "CANON", "UNITE", "TOTEM", "ENEMY"],
    clues: [
      "Sharp; an angle under 90 degrees",
      "An accepted body of works or rules",
      "To join together",
      "An emblematic carved pole",
      "A hostile opponent",
    ],
  },
  {
    words: ["BLARE", "LAPEL", "APPLE", "RELIC", "ELECT"],
    clues: [
      "To sound loudly",
      "The folded collar of a jacket",
      "A common orchard fruit",
      "An object surviving from the past",
      "To choose by voting",
    ],
  },
  {
    words: ["PORCH", "OPERA", "RECUR", "CRUDE", "HAREM"],
    clues: [
      "A covered entrance to a house",
      "A sung dramatic performance",
      "To happen again",
      "Rough and unrefined",
      "Private household quarters",
    ],
  },
  {
    words: ["MUSIC", "ULTRA", "STEAD", "IRATE", "CADET"],
    clues: [
      "Organized sound and melody",
      "Extreme; beyond the usual",
      "The place of another (in one's ___)",
      "Very angry",
      "A trainee in a military school",
    ],
  },
  {
    words: ["BUGLE", "USUAL", "GUARD", "LARGE", "ELDER"],
    clues: [
      "A brass horn used for calls",
      "Customary; ordinary",
      "To protect or watch over",
      "Big in size",
      "An older, respected person",
    ],
  },
];

let puzzle: Puzzle;
let solution: string[][]; // solution[r][c]
let entries: string[][]; // player letters
let locked: boolean[][];
let checked: ("" | "ok" | "bad")[][];
let sel: [number, number] = [0, 0];
let seconds = 0;
let best = 0;
let timer: number | null = null;
let solved = false;
let lastIndex = 0;

function newPuzzle() {
  lastIndex = randInt(0, PUZZLES.length - 1);
  puzzle = PUZZLES[lastIndex];
  solution = puzzle.words.map((w) => w.split(""));
  entries = Array.from({ length: N }, () => Array(N).fill(""));
  locked = Array.from({ length: N }, () => Array(N).fill(false));
  checked = Array.from({ length: N }, () => Array(N).fill(""));

  // Lock ~9 random cells as anchors.
  const cells: [number, number][] = [];
  for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) cells.push([r, c]);
  const anchors = shuffle(cells).slice(0, 9);
  anchors.forEach(([r, c]) => {
    locked[r][c] = true;
    entries[r][c] = solution[r][c];
  });

  // Select first editable cell.
  outer: for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (!locked[r][c]) {
        sel = [r, c];
        break outer;
      }
    }
  }
  solved = false;
  draw();
}

function cellSize() {
  const area = getGameArea();
  const usableH = Math.max(150, area.h - 220);
  const size = Math.min(area.w / N, usableH / N);
  return clamp(size, 40, 62);
}

function draw() {
  const root = el("squarewords");
  if (!root) return;
  root.innerHTML = "";
  root.style.display = "flex";
  root.style.flexDirection = "column";
  root.style.alignItems = "center";
  root.style.gap = "14px";

  const CELL = cellSize();
  const grid = document.createElement("div");
  grid.style.display = "grid";
  grid.style.gridTemplateColumns = `repeat(${N}, ${CELL}px)`;
  grid.style.gridTemplateRows = `repeat(${N}, ${CELL}px)`;
  grid.style.gap = "4px";

  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const cell = document.createElement("button");
      cell.type = "button";
      cell.textContent = entries[r][c];
      cell.style.width = CELL + "px";
      cell.style.height = CELL + "px";
      cell.style.borderRadius = "8px";
      cell.style.fontSize = Math.round(CELL * 0.42) + "px";
      cell.style.fontWeight = "700";
      cell.style.cursor = locked[r][c] ? "default" : "pointer";
      cell.style.border = "1px solid rgba(255,255,255,.14)";
      const isSel = sel[0] === r && sel[1] === c;

      let bg = "rgba(255,255,255,.1)";
      let color = "#fff";
      if (locked[r][c]) {
        bg = "rgba(255,255,255,.04)";
        color = "rgba(255,255,255,.55)";
      }
      if (checked[r][c] === "ok") {
        bg = "#00dfd8";
        color = "#04212b";
      } else if (checked[r][c] === "bad") {
        bg = "rgba(255,90,90,.35)";
        color = "#fff";
      }
      cell.style.background = bg;
      cell.style.color = color;
      if (isSel && !solved) cell.style.boxShadow = "0 0 0 3px #ffd34e";

      cell.addEventListener("click", () => {
        if (locked[r][c] || solved) return;
        sel = [r, c];
        sound.click();
        draw();
      });
      grid.appendChild(cell);
    }
  }
  root.appendChild(grid);

  // Buttons row.
  const btns = document.createElement("div");
  btns.style.display = "flex";
  btns.style.gap = "8px";
  const mk = (label: string, fn: () => void, primary = false) => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = label;
    b.style.height = "38px";
    b.style.padding = "0 16px";
    b.style.borderRadius = "8px";
    b.style.fontSize = "14px";
    b.style.fontWeight = "600";
    b.style.cursor = "pointer";
    b.style.border = "1px solid rgba(255,255,255,.2)";
    b.style.background = primary ? "#00dfd8" : "rgba(255,255,255,.1)";
    b.style.color = primary ? "#04212b" : "#fff";
    b.addEventListener("click", fn);
    return b;
  };
  btns.appendChild(mk("Check", check, true));
  btns.appendChild(mk("Clear", clearEntries));
  root.appendChild(btns);

  // Clues.
  const clues = document.createElement("div");
  clues.style.display = "flex";
  clues.style.flexDirection = "column";
  clues.style.gap = "4px";
  clues.style.maxWidth = "340px";
  clues.style.textAlign = "left";
  clues.style.fontSize = "12px";
  clues.style.color = "rgba(255,255,255,.75)";
  const title = document.createElement("div");
  title.textContent = "Clues (each word reads across a row and down its column)";
  title.style.color = "rgba(255,255,255,.55)";
  title.style.marginBottom = "2px";
  clues.appendChild(title);
  puzzle.clues.forEach((clue, i) => {
    const row = document.createElement("div");
    row.textContent = `${i + 1}. ${clue}`;
    clues.appendChild(row);
  });
  root.appendChild(clues);
}

function editableCells(): [number, number][] {
  const out: [number, number][] = [];
  for (let r = 0; r < N; r++)
    for (let c = 0; c < N; c++) if (!locked[r][c]) out.push([r, c]);
  return out;
}

function advance() {
  const [r, c] = sel;
  let nr = r;
  let nc = c + 1;
  while (nr < N) {
    if (nc >= N) {
      nc = 0;
      nr++;
    }
    if (nr < N && !locked[nr][nc]) {
      sel = [nr, nc];
      return;
    }
    nc++;
  }
}

function type(letter: string) {
  if (solved) return;
  const [r, c] = sel;
  if (locked[r][c]) return;
  entries[r][c] = letter.toUpperCase();
  checked[r][c] = "";
  sound.click();
  advance();
  draw();
  autoCheck();
}

function backspace() {
  if (solved) return;
  const [r, c] = sel;
  if (!locked[r][c] && entries[r][c]) {
    entries[r][c] = "";
    checked[r][c] = "";
  } else {
    // move to previous editable
    let nr = r;
    let nc = c - 1;
    while (nr >= 0) {
      if (nc < 0) {
        nc = N - 1;
        nr--;
      }
      if (nr >= 0 && !locked[nr][nc]) {
        sel = [nr, nc];
        entries[nr][nc] = "";
        checked[nr][nc] = "";
        break;
      }
      nc--;
    }
  }
  sound.click();
  draw();
}

function moveSel(dr: number, dc: number) {
  let [r, c] = sel;
  for (let step = 0; step < N * N; step++) {
    r = clamp(r + dr, 0, N - 1);
    c = clamp(c + dc, 0, N - 1);
    if (!locked[r][c]) {
      sel = [r, c];
      break;
    }
    if ((dr === 0 && (c === 0 || c === N - 1)) || (dc === 0 && (r === 0 || r === N - 1))) break;
  }
  draw();
}

function allFilled(): boolean {
  for (let r = 0; r < N; r++)
    for (let c = 0; c < N; c++) if (!entries[r][c]) return false;
  return true;
}

function isCorrect(): boolean {
  for (let r = 0; r < N; r++)
    for (let c = 0; c < N; c++) if (entries[r][c] !== solution[r][c]) return false;
  return true;
}

function autoCheck() {
  if (allFilled()) check();
}

function check() {
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (locked[r][c]) {
        checked[r][c] = "";
      } else if (!entries[r][c]) {
        checked[r][c] = "";
      } else {
        checked[r][c] = entries[r][c] === solution[r][c] ? "ok" : "bad";
      }
    }
  }
  if (isCorrect()) {
    win();
  } else {
    sound.error();
    draw();
  }
}

function win() {
  solved = true;
  if (timer !== null) {
    clearInterval(timer);
    timer = null;
  }
  best = setHighScore("squarewords", seconds, true);
  sound.win();
  draw();
  const status = el("status");
  if (status) status.textContent = `Solved in ${seconds}s · Best: ${best}s`;
  showOverlay("Solved!", `You completed the grid in ${seconds}s. Best: ${best}s.`);
}

function clearEntries() {
  if (solved) return;
  for (let r = 0; r < N; r++)
    for (let c = 0; c < N; c++)
      if (!locked[r][c]) {
        entries[r][c] = "";
        checked[r][c] = "";
      }
  sound.click();
  draw();
}

function tick() {
  if (solved) return;
  seconds++;
  const status = el("status");
  if (status) status.textContent = `Time: ${seconds}s · Best: ${best === 0 ? "—" : best + "s"}`;
}

function onKey(e: KeyboardEvent) {
  if (solved) return;
  const k = e.key;
  if (/^[a-zA-Z]$/.test(k)) {
    e.preventDefault();
    type(k);
  } else if (k === "Backspace") {
    e.preventDefault();
    backspace();
  } else if (k === "ArrowUp") {
    e.preventDefault();
    moveSel(-1, 0);
  } else if (k === "ArrowDown") {
    e.preventDefault();
    moveSel(1, 0);
  } else if (k === "ArrowLeft") {
    e.preventDefault();
    moveSel(0, -1);
  } else if (k === "ArrowRight") {
    e.preventDefault();
    moveSel(0, 1);
  }
}

function reset() {
  if (timer !== null) {
    clearInterval(timer);
    timer = null;
  }
  seconds = 0;
  best = getHighScore("squarewords");
  newPuzzle();
  hideOverlay();
  const status = el("status");
  if (status) status.textContent = `Time: 0s · Best: ${best === 0 ? "—" : best + "s"}`;
  timer = window.setInterval(tick, 1000);
}

export function initGame() {
  onReset(reset);
  document.removeEventListener("keydown", onKey);
  document.addEventListener("keydown", onKey);
  reset();
}
