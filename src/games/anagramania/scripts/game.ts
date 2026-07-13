import {
  el,
  onReset,
  showOverlay,
  hideOverlay,
  sound,
  shuffle,
  randInt,
  getHighScore,
  setHighScore,
} from "../../../shared/utils";

// Anagramania — rearrange scrambled letters into valid words. Longer words
// score more. Race the clock and beat your best score.

const ROUND_SECONDS = 120;

const BASE_WORDS = [
  "MASTER", "PLANET", "GARDEN", "SILENT", "ORANGE",
  "FRIEND", "CANDLE", "SIMPLE", "WINTER",
];

// Common words used to validate guesses. Any word that cannot be built from a
// round's letters is simply ignored, so this list only needs to be broad.
const DICTIONARY = new Set<string>([
  // MASTER / STREAM
  "are", "arm", "art", "ate", "ear", "eat", "era", "mar", "mat", "met", "ram",
  "rat", "sat", "sea", "set", "tar", "tea", "arms", "arts", "ears", "east",
  "eats", "mars", "mart", "mast", "mate", "mats", "meat", "meta", "rams",
  "rate", "rats", "ream", "seam", "sear", "seat", "star", "stem", "tame",
  "tars", "team", "tear", "teas", "term", "tram", "mater", "meats", "rates",
  "reams", "smart", "smear", "stare", "steam", "tames", "tears", "trams",
  "master", "stream",
  // PLANET
  "ale", "ant", "ape", "apt", "lap", "lea", "let", "nap", "net", "pal", "pan",
  "pat", "pea", "pen", "pet", "tan", "tap", "ten", "plan", "plane", "plant",
  "panel", "penal", "plate", "pleat", "petal", "lean", "lane", "neat", "plea",
  "tale", "teal", "leap", "pale", "peal", "pant", "lent", "pent", "nape",
  "pane", "planet",
  // GARDEN / DANGER
  "age", "and", "gad", "ran", "red", "dear", "dare", "drag", "dean", "dang",
  "gear", "grad", "near", "rage", "read", "rang", "rend", "gander", "danger",
  "garden", "ranged", "grande", "range", "anger",
  // SILENT / LISTEN
  "lie", "lit", "nil", "sin", "sit", "tie", "tin", "lens", "line", "lint",
  "list", "nest", "nets", "site", "slit", "tile", "ties", "tins", "isle",
  "lien", "lies", "nils", "snit", "lines", "inlet", "islet", "tiles",
  "listen", "silent", "tinsel", "enlist", "inlets",
  // ORANGE
  "ago", "ego", "nag", "nor", "oar", "one", "ore", "roe", "goer", "gone",
  "gore", "argon", "groan", "organ", "orange", "onager",
  // FRIEND / FINDER
  "den", "die", "fed", "fen", "fin", "fir", "rid", "fend", "find", "fine",
  "fire", "fried", "rein", "ride", "rife", "rind", "diner", "finer", "infer",
  "fined", "fired", "finder", "friend",
  // CANDLE
  "ace", "can", "cad", "lad", "led", "lend", "lace", "lead", "clan", "clad",
  "dale", "deal", "elan", "candle", "lanced", "clean", "lance", "laced",
  "caned", "decal", "laden",
  // SIMPLE
  "elm", "imp", "lip", "pie", "sip", "lime", "limp", "lips", "mile", "pies",
  "pile", "slim", "slip", "imps", "lisp", "limes", "miles", "piles", "slime",
  "impel", "limps", "simple",
  // WINTER
  "nit", "wet", "win", "wit", "wren", "went", "wine", "wire", "twin", "twine",
  "tine", "rent", "tire", "writ", "inter", "winter",
]);

interface Tile {
  ch: string;
  used: boolean;
}

let tiles: Tile[] = [];
let guess: number[] = []; // indices into tiles, in order
let found = new Set<string>();
let score = 0;
let best = 0;
let timeLeft = ROUND_SECONDS;
let timer: number | null = null;
let running = false;
let flash: "" | "ok" | "bad" = "";

function wordScore(len: number): number {
  const table: Record<number, number> = { 3: 100, 4: 300, 5: 600, 6: 1000, 7: 1400 };
  return table[len] ?? (len >= 8 ? 1800 : 50);
}

function canBuild(word: string, letters: string[]): boolean {
  const pool = [...letters];
  for (const ch of word.toUpperCase()) {
    const i = pool.indexOf(ch);
    if (i === -1) return false;
    pool.splice(i, 1);
  }
  return true;
}

function newRound() {
  let base = BASE_WORDS[randInt(0, BASE_WORDS.length - 1)];
  tiles = shuffle(base.split("")).map((ch) => ({ ch, used: false }));
  guess = [];
  found = new Set();
  draw();
}

function currentWord(): string {
  return guess.map((i) => tiles[i].ch).join("");
}

function submit() {
  const word = currentWord().toLowerCase();
  if (word.length < 3) {
    flashState("bad");
    sound.error();
    return;
  }
  if (found.has(word)) {
    flashState("bad");
    sound.error();
    setStatusMsg("Already found");
    return;
  }
  if (!DICTIONARY.has(word)) {
    flashState("bad");
    sound.error();
    setStatusMsg("Not a valid word");
    return;
  }
  found.add(word);
  const gained = wordScore(word.length);
  score += gained;
  best = setHighScore("anagramania", score);
  flashState("ok");
  sound.success();
  setStatusMsg(`+${gained} for ${word.toUpperCase()}`);
  clearGuess();
}

function flashState(kind: "ok" | "bad") {
  flash = kind;
  draw();
  window.setTimeout(() => {
    flash = "";
    draw();
  }, 250);
}

function clearGuess() {
  guess.forEach((i) => (tiles[i].used = false));
  guess = [];
  draw();
}

function addTile(i: number) {
  if (!running || tiles[i].used) return;
  tiles[i].used = true;
  guess.push(i);
  sound.click();
  draw();
}

function removeAt(pos: number) {
  if (!running) return;
  const i = guess[pos];
  if (i === undefined) return;
  tiles[i].used = false;
  guess.splice(pos, 1);
  sound.click();
  draw();
}

function shuffleTiles() {
  if (!running) return;
  const order = shuffle(tiles.map((_, i) => i));
  const remap = new Map<number, number>();
  const next: Tile[] = order.map((oldIdx, newIdx) => {
    remap.set(oldIdx, newIdx);
    return tiles[oldIdx];
  });
  guess = guess.map((i) => remap.get(i)!);
  tiles = next;
  sound.click();
  draw();
}

function setStatusMsg(msg: string) {
  const status = el("status");
  if (status) status.textContent = `${msg} · Score: ${score} · Best: ${best} · ${timeLeft}s`;
}

function updateStatus() {
  const status = el("status");
  if (status) status.textContent = `Score: ${score} · Best: ${best} · Time: ${timeLeft}s`;
}

function draw() {
  const root = el("anagramania");
  if (!root) return;
  root.innerHTML = "";
  root.style.display = "flex";
  root.style.flexDirection = "column";
  root.style.alignItems = "center";
  root.style.gap = "14px";

  // Guess row.
  const guessRow = document.createElement("div");
  guessRow.style.display = "flex";
  guessRow.style.gap = "6px";
  guessRow.style.minHeight = "52px";
  guessRow.style.alignItems = "center";
  guessRow.style.padding = "6px 10px";
  guessRow.style.borderRadius = "10px";
  guessRow.style.minWidth = "220px";
  guessRow.style.justifyContent = "center";
  guessRow.style.background =
    flash === "ok"
      ? "rgba(0,223,216,.25)"
      : flash === "bad"
        ? "rgba(255,90,90,.22)"
        : "rgba(255,255,255,.06)";
  if (guess.length === 0) {
    const hint = document.createElement("span");
    hint.textContent = "Tap letters to build a word";
    hint.style.color = "rgba(255,255,255,.5)";
    hint.style.fontSize = "13px";
    guessRow.appendChild(hint);
  } else {
    guess.forEach((i, pos) => {
      const t = document.createElement("button");
      t.type = "button";
      t.textContent = tiles[i].ch;
      t.style.width = "38px";
      t.style.height = "44px";
      t.style.borderRadius = "8px";
      t.style.fontSize = "20px";
      t.style.fontWeight = "700";
      t.style.border = "none";
      t.style.cursor = "pointer";
      t.style.background = "#00dfd8";
      t.style.color = "#04212b";
      t.addEventListener("click", () => removeAt(pos));
      guessRow.appendChild(t);
    });
  }
  root.appendChild(guessRow);

  // Tile rack.
  const rack = document.createElement("div");
  rack.style.display = "flex";
  rack.style.gap = "8px";
  rack.style.flexWrap = "wrap";
  rack.style.justifyContent = "center";
  tiles.forEach((t, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = t.ch;
    b.style.width = "46px";
    b.style.height = "52px";
    b.style.borderRadius = "10px";
    b.style.fontSize = "22px";
    b.style.fontWeight = "700";
    b.style.cursor = t.used ? "default" : "pointer";
    b.style.border = "1px solid rgba(255,255,255,.18)";
    b.style.background = t.used ? "rgba(255,255,255,.04)" : "rgba(255,255,255,.14)";
    b.style.color = t.used ? "rgba(255,255,255,.25)" : "#fff";
    b.disabled = t.used;
    b.addEventListener("click", () => addTile(i));
    rack.appendChild(b);
  });
  root.appendChild(rack);

  // Buttons.
  const btns = document.createElement("div");
  btns.style.display = "flex";
  btns.style.gap = "8px";
  const mk = (label: string, fn: () => void, primary = false) => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = label;
    b.style.height = "40px";
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
  btns.appendChild(mk("Enter", submit, true));
  btns.appendChild(mk("Clear", clearGuess));
  btns.appendChild(mk("Shuffle", shuffleTiles));
  root.appendChild(btns);

  // Found words.
  const foundWrap = document.createElement("div");
  foundWrap.style.display = "flex";
  foundWrap.style.gap = "6px";
  foundWrap.style.flexWrap = "wrap";
  foundWrap.style.justifyContent = "center";
  foundWrap.style.maxWidth = "320px";
  Array.from(found)
    .sort((a, b) => b.length - a.length || a.localeCompare(b))
    .forEach((w) => {
      const chip = document.createElement("span");
      chip.textContent = w.toUpperCase();
      chip.style.fontSize = "12px";
      chip.style.padding = "3px 8px";
      chip.style.borderRadius = "999px";
      chip.style.background = "rgba(0,223,216,.15)";
      chip.style.color = "#8ff5f0";
      foundWrap.appendChild(chip);
    });
  root.appendChild(foundWrap);
}

function tick() {
  timeLeft--;
  if (timeLeft <= 0) {
    timeLeft = 0;
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
  best = setHighScore("anagramania", score);
  sound.win();
  showOverlay(
    "Time's up!",
    `You scored ${score} point${score === 1 ? "" : "s"} with ${found.size} word${found.size === 1 ? "" : "s"}. Best: ${best}.`
  );
}

function onKey(e: KeyboardEvent) {
  if (!running) return;
  const k = e.key;
  if (k === "Enter") {
    e.preventDefault();
    submit();
  } else if (k === "Backspace") {
    e.preventDefault();
    removeAt(guess.length - 1);
  } else if (/^[a-zA-Z]$/.test(k)) {
    const ch = k.toUpperCase();
    const i = tiles.findIndex((t) => !t.used && t.ch === ch);
    if (i !== -1) addTile(i);
  }
}

function reset() {
  if (timer !== null) {
    clearInterval(timer);
    timer = null;
  }
  score = 0;
  timeLeft = ROUND_SECONDS;
  best = getHighScore("anagramania");
  running = true;
  flash = "";
  newRound();
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
