import {
  el,
  onReset,
  showOverlay,
  hideOverlay,
  sound,
  registerPause,
  getGameArea,
  getHighScore,
  setHighScore,
  shuffle,
  randInt,
} from "../../../shared/utils";

// Spellice — type falling words before they reach the bottom.

const WORDS = [
  "ICE", "SNOW", "FROST", "COLD", "WIND", "STORM", "GLACIER", "BLIZZARD",
  "WINTER", "FREEZE", "CHILL", "POLAR", "AVALANCHE", "CRYSTAL", "ICICLE",
  "TUNDRA", "SLEET", "HAIL", "FROZEN", "PENGUIN", "IGLOO", "SNOWSTORM",
  "DRIFT", "FROSTY", "NORTH", "ARCTIC", "SNOWFLake", "SPARKLE", "WHITE",
  "BREEZE", "MIRROR", "SILENT", "SHIVER", "BRR", "COAT", "MITTEN", "SCARF",
  "BOOTS", "HEARTH", "EMBER", "LANTERN", "PUZZLE", "RIDDLE", "WORD", "SPELL",
  "QUICK", "BRAVE", "SILVER", "DIAMOND", "FLOWER", "RIVER", "MOUNTAIN",
];

const MAX_LIVES = 3;
const BASE_SPEED = 38; // px per second at start
const BASE_SPAWN = 1800; // ms between spawns at start

interface FallingWord {
  text: string;
  x: number;
  y: number;
  speed: number;
  node: HTMLSpanElement;
  dead: boolean;
}

let playfield: HTMLDivElement | null;
let inputEl: HTMLInputElement | null;
let fieldW = 0;
let fieldH = 0;
let words: FallingWord[] = [];
let lives = MAX_LIVES;
let score = 0;
let best = 0;
let streak = 0;
let rafId: number | null = null;
let lastTs = 0;
let spawnTimer: number | null = null;
let running = false;
let paused = false;

function speedForScore(): number {
  return BASE_SPEED + Math.min(120, score / 30);
}
function spawnInterval(): number {
  return Math.max(700, BASE_SPAWN - score / 4);
}

function layout() {
  const area = getGameArea();
  const root = el("spellice");
  if (!root) return;
  root.style.position = "relative";
  root.style.width = Math.min(360, area.w) + "px";
  root.style.height = Math.max(300, area.h) + "px";
  root.style.display = "flex";
  root.style.flexDirection = "column";

  playfield = el("spellice-field") as HTMLDivElement;
  if (playfield) {
    playfield.style.position = "relative";
    playfield.style.flex = "1";
    playfield.style.overflow = "hidden";
    playfield.style.borderRadius = "12px";
    playfield.style.background = "rgba(255,255,255,.04)";
    playfield.style.border = "1px solid rgba(255,255,255,.12)";
    fieldW = playfield.clientWidth || Math.min(360, area.w);
    fieldH = playfield.clientHeight || Math.max(200, area.h - 64);
  }
}

function spawnWord() {
  if (!playfield || !running || paused) return;
  const text = shuffle(WORDS)[0];
  const node = document.createElement("span");
  node.textContent = text;
  node.style.position = "absolute";
  node.style.left = "0px";
  node.style.top = "0px";
  node.style.padding = "4px 10px";
  node.style.borderRadius = "999px";
  node.style.fontSize = "18px";
  node.style.fontWeight = "600";
  node.style.color = "#fff";
  node.style.background = "rgba(255,255,255,.08)";
  node.style.border = "1px solid rgba(255,255,255,.2)";
  node.style.whiteSpace = "nowrap";
  node.style.transition = "color .1s, background .1s, border-color .1s";
  playfield.appendChild(node);

  const wWidth = node.offsetWidth;
  const x = Math.max(0, randInt(0, Math.max(0, fieldW - wWidth)));
  node.style.left = x + "px";
  const word: FallingWord = {
    text,
    x,
    y: 0,
    speed: speedForScore() * (0.85 + Math.random() * 0.4),
    node,
    dead: false,
  };
  words.push(word);
}

function clearWord(word: FallingWord) {
  word.dead = true;
  word.node.remove();
  words = words.filter((w) => w !== word);
}

function tick(ts: number) {
  if (!running || paused) return;
  if (!lastTs) lastTs = ts;
  const dt = Math.min(0.05, (ts - lastTs) / 1000);
  lastTs = ts;

  for (const w of words) {
    if (w.dead) continue;
    w.y += w.speed * dt;
    w.node.style.top = w.y + "px";
    if (w.y + w.node.offsetHeight >= fieldH) {
      // landed
      clearWord(w);
      loseLife();
      if (lives <= 0) return;
    }
  }
  rafId = requestAnimationFrame(tick);
}

function loseLife() {
  lives--;
  streak = 0;
  sound.error();
  const sc = el("status");
  if (sc) sc.textContent = `Score: ${score} · Best: ${best} · Lives: ${"♥".repeat(lives)}${"·".repeat(MAX_LIVES - lives)}`;
  if (lives <= 0) gameOver();
}

function onInput() {
  if (!inputEl) return;
  const val = inputEl.value.trim().toLowerCase();
  for (const w of words) {
    if (w.dead) continue;
    const match = val.length > 0 && w.text.toLowerCase().startsWith(val);
    w.node.style.color = match ? "#67e8f9" : "#fff";
    w.node.style.background = match ? "rgba(103,232,249,.18)" : "rgba(255,255,255,.08)";
    w.node.style.borderColor = match ? "#67e8f9" : "rgba(255,255,255,.2)";
  }
}

function onSubmit() {
  if (!inputEl) return;
  const val = inputEl.value.trim().toLowerCase();
  if (!val) return;
  const target = words.find((w) => !w.dead && w.text.toLowerCase() === val);
  if (target) {
    const gained = target.text.length * 10 + streak * 5;
    score += gained;
    streak++;
    clearWord(target);
    sound.success();
    inputEl.value = "";
    onInput();
    const sc = el("status");
    if (sc) sc.textContent = `Score: ${score} · Best: ${best} · Streak: ${streak}`;
  } else {
    sound.error();
    inputEl.value = "";
    onInput();
  }
}

function startSpawner() {
  spawnTimer = window.setTimeout(function loop() {
    if (!running || paused) return;
    spawnWord();
    spawnTimer = window.setTimeout(loop, spawnInterval());
  }, spawnInterval());
}

function startLoop() {
  lastTs = 0;
  rafId = requestAnimationFrame(tick);
  startSpawner();
}

function stopLoop() {
  if (rafId !== null) cancelAnimationFrame(rafId);
  rafId = null;
  if (spawnTimer !== null) clearTimeout(spawnTimer);
  spawnTimer = null;
}

function gameOver() {
  running = false;
  stopLoop();
  best = setHighScore("spellice", score);
  sound.win();
  showOverlay("Game over", `You scored ${score} points. Best: ${best}.`);
}

function pauseGame() {
  if (!running) return;
  paused = true;
  stopLoop();
}
function resumeGame() {
  if (!running || !paused) return;
  paused = false;
  startLoop();
}

function build() {
  const root = el("spellice");
  if (!root) return;
  root.innerHTML = "";
  const field = document.createElement("div");
  field.id = "spellice-field";
  root.appendChild(field);

  const row = document.createElement("div");
  row.style.marginTop = "10px";
  row.style.display = "flex";
  row.style.gap = "8px";
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Type a falling word…";
  input.setAttribute("aria-label", "Type the falling word");
  input.style.flex = "1";
  input.style.padding = "10px 12px";
  input.style.borderRadius = "10px";
  input.style.border = "1px solid rgba(255,255,255,.25)";
  input.style.background = "rgba(255,255,255,.06)";
  input.style.color = "#fff";
  input.style.fontSize = "16px";
  input.style.outline = "none";
  input.addEventListener("input", onInput);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") onSubmit();
  });
  row.appendChild(input);
  root.appendChild(row);
  inputEl = input;
}

function reset() {
  stopLoop();
  build();
  layout();
  words = [];
  lives = MAX_LIVES;
  score = 0;
  streak = 0;
  best = getHighScore("spellice");
  running = true;
  paused = false;
  hideOverlay();
  const sc = el("status");
  if (sc) sc.textContent = `Score: 0 · Best: ${best} · Lives: ${"♥".repeat(lives)}`;
  inputEl?.focus();
  spawnWord();
  startLoop();
}

export function initGame() {
  onReset(reset);
  registerPause(pauseGame, resumeGame);
  reset();
}
