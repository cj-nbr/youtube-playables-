import {
  el,
  onReset,
  showOverlay,
  hideOverlay,
  sound,
  randInt,
  getGameArea,
  clamp,
  getHighScore,
  setHighScore,
} from "../../../shared/utils";

// What Word — guess the hidden five-letter word in six tries. Tiles color
// green (right spot), yellow (wrong spot), gray (absent). Best (fewest) guesses
// on a win is saved.

const ROWS = 6;
const LEN = 5;

const WORDS = [
  "about", "above", "abuse", "actor", "acute", "admit", "adopt", "adult",
  "after", "again", "agent", "agree", "ahead", "alarm", "album", "alert",
  "alike", "alive", "allow", "alone", "along", "aloud", "apart", "apple",
  "apply", "arena", "argue", "arise", "array", "aside", "asset", "audio",
  "audit", "avoid", "award", "aware", "badly", "baker", "basic", "beach",
  "began", "begin", "being", "below", "bench", "birth", "black", "blame",
  "blank", "blast", "blend", "bless", "blind", "block", "blood", "board",
  "boost", "booth", "bound", "brain", "brand", "brave", "bread", "break",
  "breed", "brick", "brief", "bring", "broad", "broke", "brown", "brush",
  "build", "built", "buyer", "cabin", "cable", "candy", "cargo", "carry",
  "catch", "cause", "chain", "chair", "chaos", "charm", "chart", "chase",
  "cheap", "check", "chess", "chest", "chief", "child", "chill", "china",
  "chose", "civil", "claim", "class", "clean", "clear", "click", "cliff",
  "climb", "clock", "close", "cloth", "cloud", "coach", "coast", "could",
  "count", "court", "cover", "crack", "craft", "crash", "cream", "crime",
  "cross", "crowd", "crown", "crude", "curve", "cycle", "daily", "dairy",
  "dance", "death", "delay", "depth", "doubt", "dozen", "draft", "drama",
  "drank", "dream", "dress", "dried", "drink", "drive", "drove", "eager",
  "early", "earth", "eight", "elite", "empty", "enemy", "enjoy", "enter",
  "entry", "equal", "error", "event", "every", "exact", "exist", "extra",
  "faith", "false", "fault", "favor", "feast", "fever", "fiber", "field",
  "fifth", "fifty", "fight", "final", "first", "fixed", "flame", "flash",
  "fleet", "flesh", "float", "flood", "floor", "flour", "fluid", "focus",
  "force", "forth", "forty", "forum", "found", "frame", "frank", "fraud",
  "fresh", "front", "frost", "fruit", "fully", "funny", "giant", "given",
  "glass", "globe", "glory", "grace", "grade", "grain", "grand", "grant",
  "grape", "graph", "grass", "grave", "great", "green", "greet", "grief",
  "gross", "group", "grown", "guard", "guess", "guest", "guide", "happy",
  "harsh", "heart", "heavy", "hello", "hence", "horse", "hotel", "house",
  "human", "ideal", "image", "index", "inner", "input", "issue", "joint",
  "judge", "juice", "known", "label", "labor", "large", "laser", "later",
  "laugh", "layer", "learn", "lease", "least", "leave", "legal", "lemon",
  "level", "light", "limit", "local", "logic", "loose", "lucky", "lunch",
  "magic", "major", "maker", "march", "match", "maybe", "mayor", "meant",
  "medal", "media", "metal", "meter", "might", "minor", "mixed", "model",
  "money", "month", "moral", "motor", "mount", "mouse", "mouth", "movie",
  "music", "needs", "nerve", "never", "newly", "night", "noble", "noise",
  "north", "noted", "novel", "nurse", "ocean", "offer", "often", "onion",
  "order", "other", "ought", "outer", "owner", "paint", "panel", "paper",
  "party", "peace", "phase", "phone", "photo", "piano", "piece", "pilot",
  "pitch", "place", "plain", "plane", "plant", "plate", "point", "pound",
  "power", "press", "price", "pride", "prime", "print", "prize", "proof",
  "proud", "prove", "queen", "quest", "quick", "quiet", "quite", "radio",
  "raise", "range", "rapid", "ratio", "reach", "ready", "realm", "rebel",
  "refer", "relax", "reply", "rider", "ridge", "right", "rigid", "rival",
  "river", "roman", "rough", "round", "route", "royal", "rural", "scale",
  "scene", "scope", "score", "sense", "serve", "seven", "shade", "shall",
  "shape", "share", "sharp", "sheep", "sheet", "shelf", "shell", "shift",
  "shine", "shirt", "shock", "shoot", "shore", "short", "shown", "sight",
  "silly", "since", "sixth", "sixty", "skill", "sleep", "slice", "slide",
  "small", "smart", "smile", "smoke", "snake", "solid", "solve", "sorry",
  "sound", "south", "space", "spare", "speak", "speed", "spend", "spent",
  "spice", "spine", "split", "spoke", "sport", "spray", "staff", "stage",
  "stair", "stand", "start", "state", "steam", "steel", "steep", "stern",
  "stick", "still", "stock", "stone", "stood", "store", "storm", "story",
  "strip", "study", "stuff", "style", "sugar", "suite", "super", "sweet",
  "swift", "swing", "sword", "table", "taken", "taste", "teach", "teeth",
  "thank", "theft", "their", "theme", "there", "these", "thick", "thief",
  "thing", "think", "third", "those", "three", "threw", "throw", "tiger",
  "tight", "timer", "tired", "title", "toast", "today", "token", "tooth",
  "topic", "total", "touch", "tough", "tower", "toxic", "trace", "track",
  "trade", "trail", "train", "treat", "trend", "trial", "tribe", "trick",
  "tried", "truck", "truly", "trust", "truth", "twice", "twist", "ultra",
  "uncle", "under", "union", "unite", "unity", "until", "upper", "upset",
  "urban", "usage", "usual", "valid", "value", "video", "virus", "visit",
  "vital", "vocal", "voice", "waste", "watch", "water", "wheel", "where",
  "which", "while", "white", "whole", "whose", "woman", "world", "worry",
  "worse", "worst", "worth", "would", "wound", "write", "wrong", "wrote",
  "young", "youth",
];

const WORD_SET = new Set(WORDS);
const KEY_ROWS = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

type State = "correct" | "present" | "absent";

let answer = "";
let guesses: string[] = [];
let current = "";
let over = false;
let won = false;
let best = 0;
const keyState: Record<string, State> = {};

function evaluate(guess: string): State[] {
  const res: State[] = Array(LEN).fill("absent");
  const ans = answer.split("");
  const counts: Record<string, number> = {};
  for (const ch of ans) counts[ch] = (counts[ch] || 0) + 1;

  // First pass: correct positions.
  for (let i = 0; i < LEN; i++) {
    if (guess[i] === ans[i]) {
      res[i] = "correct";
      counts[guess[i]]--;
    }
  }
  // Second pass: present elsewhere.
  for (let i = 0; i < LEN; i++) {
    if (res[i] === "correct") continue;
    const ch = guess[i];
    if (counts[ch] > 0) {
      res[i] = "present";
      counts[ch]--;
    }
  }
  return res;
}

function rank(s: State): number {
  return s === "correct" ? 3 : s === "present" ? 2 : 1;
}

function updateKeyState(guess: string, states: State[]) {
  for (let i = 0; i < LEN; i++) {
    const ch = guess[i].toUpperCase();
    const cur = keyState[ch];
    if (!cur || rank(states[i]) > rank(cur)) keyState[ch] = states[i];
  }
}

function colorFor(s: State): { bg: string; fg: string } {
  if (s === "correct") return { bg: "#00c07a", fg: "#04212b" };
  if (s === "present") return { bg: "#e6b800", fg: "#04212b" };
  return { bg: "rgba(255,255,255,.12)", fg: "#fff" };
}

function tileSize() {
  const area = getGameArea();
  const usableH = Math.max(160, area.h - 190);
  const size = Math.min((area.w - 24) / LEN, usableH / ROWS);
  return clamp(size, 34, 54);
}

function draw() {
  const root = el("what-word");
  if (!root) return;
  root.innerHTML = "";
  root.style.display = "flex";
  root.style.flexDirection = "column";
  root.style.alignItems = "center";
  root.style.gap = "14px";

  const TILE = tileSize();
  const board = document.createElement("div");
  board.style.display = "grid";
  board.style.gridTemplateRows = `repeat(${ROWS}, ${TILE}px)`;
  board.style.gap = "5px";

  for (let r = 0; r < ROWS; r++) {
    const row = document.createElement("div");
    row.style.display = "grid";
    row.style.gridTemplateColumns = `repeat(${LEN}, ${TILE}px)`;
    row.style.gap = "5px";

    const submitted = guesses[r];
    const states = submitted ? evaluate(submitted) : null;
    const text = submitted ?? (r === guesses.length ? current : "");

    for (let c = 0; c < LEN; c++) {
      const tile = document.createElement("div");
      tile.style.width = TILE + "px";
      tile.style.height = TILE + "px";
      tile.style.display = "flex";
      tile.style.alignItems = "center";
      tile.style.justifyContent = "center";
      tile.style.borderRadius = "6px";
      tile.style.fontSize = Math.round(TILE * 0.5) + "px";
      tile.style.fontWeight = "700";
      tile.style.textTransform = "uppercase";
      const ch = text[c] ?? "";
      tile.textContent = ch;
      if (states) {
        const col = colorFor(states[c]);
        tile.style.background = col.bg;
        tile.style.color = col.fg;
      } else {
        tile.style.background = "rgba(255,255,255,.06)";
        tile.style.color = "#fff";
        tile.style.border = ch ? "1px solid rgba(255,255,255,.45)" : "1px solid rgba(255,255,255,.15)";
      }
      row.appendChild(tile);
    }
    board.appendChild(row);
  }
  root.appendChild(board);

  // On-screen keyboard.
  const kb = document.createElement("div");
  kb.style.display = "flex";
  kb.style.flexDirection = "column";
  kb.style.gap = "5px";
  kb.style.alignItems = "center";

  KEY_ROWS.forEach((line, idx) => {
    const krow = document.createElement("div");
    krow.style.display = "flex";
    krow.style.gap = "4px";
    krow.style.justifyContent = "center";
    if (idx === 2) krow.prepend(makeKey("ENTER", () => submit(), 1.5));
    line.split("").forEach((ch) => krow.appendChild(makeKey(ch, () => typeCh(ch))));
    if (idx === 2) krow.appendChild(makeKey("⌫", () => backspace(), 1.5));
    kb.appendChild(krow);
  });
  root.appendChild(kb);
}

function makeKey(label: string, fn: () => void, widthMul = 1): HTMLButtonElement {
  const b = document.createElement("button");
  b.type = "button";
  b.textContent = label;
  b.style.height = "42px";
  b.style.minWidth = 28 * widthMul + "px";
  b.style.padding = "0 6px";
  b.style.borderRadius = "6px";
  b.style.fontSize = "13px";
  b.style.fontWeight = "600";
  b.style.cursor = "pointer";
  b.style.border = "none";
  const s = keyState[label];
  if (s) {
    const col = colorFor(s);
    b.style.background = col.bg;
    b.style.color = col.fg;
  } else {
    b.style.background = "rgba(255,255,255,.16)";
    b.style.color = "#fff";
  }
  b.addEventListener("click", fn);
  return b;
}

function typeCh(ch: string) {
  if (over) return;
  if (current.length < LEN) {
    current += ch.toLowerCase();
    sound.click();
    draw();
  }
}

function backspace() {
  if (over) return;
  if (current.length > 0) {
    current = current.slice(0, -1);
    sound.click();
    draw();
  }
}

function submit() {
  if (over) return;
  if (current.length !== LEN) {
    sound.error();
    setStatus("Not enough letters");
    return;
  }
  if (!WORD_SET.has(current)) {
    sound.error();
    setStatus("Not in word list");
    return;
  }
  const states = evaluate(current);
  updateKeyState(current, states);
  guesses.push(current);
  const guess = current;
  current = "";

  if (guess === answer) {
    won = true;
    over = true;
    best = setHighScore("what-word", guesses.length, true);
    sound.win();
    draw();
    setStatus(`Solved in ${guesses.length}! Best: ${best}`);
    showOverlay("You got it!", `Solved in ${guesses.length} guess${guesses.length === 1 ? "" : "es"}. Best: ${best}.`);
    return;
  }

  if (guesses.length >= ROWS) {
    over = true;
    sound.error();
    draw();
    setStatus(`The word was ${answer.toUpperCase()}`);
    showOverlay("Out of tries", `The word was ${answer.toUpperCase()}. Try another!`);
    return;
  }

  sound.success();
  draw();
  setStatus(`Guess ${guesses.length + 1} of ${ROWS}`);
}

function setStatus(msg: string) {
  const status = el("status");
  if (status) status.textContent = `${msg}${best ? " · Best: " + best : ""}`;
}

function onKey(e: KeyboardEvent) {
  if (over) return;
  const k = e.key;
  if (k === "Enter") {
    e.preventDefault();
    submit();
  } else if (k === "Backspace") {
    e.preventDefault();
    backspace();
  } else if (/^[a-zA-Z]$/.test(k)) {
    typeCh(k);
  }
}

function reset() {
  answer = WORDS[randInt(0, WORDS.length - 1)];
  guesses = [];
  current = "";
  over = false;
  won = false;
  best = getHighScore("what-word");
  for (const k of Object.keys(keyState)) delete keyState[k];
  draw();
  setStatus(`Guess 1 of ${ROWS}`);
  hideOverlay();
}

export function initGame() {
  onReset(reset);
  document.removeEventListener("keydown", onKey);
  document.addEventListener("keydown", onKey);
  reset();
}
