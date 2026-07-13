import {
  el,
  onReset,
  showOverlay,
  hideOverlay,
  sound,
  randInt,
  getHighScore,
  setHighScore,
} from "../../../shared/utils";

const WORDS = [
  "APPLE","BRAVE","CLOUD","DANCE","EAGLE","FLAME","GRAPE","HOUSE","IMAGE","JUICE",
  "KNIFE","LEMON","MANGO","NIGHT","OCEAN","PIANO","QUEEN","RIVER","STONE","TIGER",
  "UNITY","VIVID","WHALE","ZEBRA","BRAIN","CANDY","DREAM","EARTH","FROST","GLOBE",
  "HONEY","IVORY","JELLY","KAYAK","LUNAR","MAGIC","NOVEL","OLIVE","PEARL","QUILT",
  "ROBIN","SALAD","TRAIN","ULTRA","VAPOR","WALTZ","XENON","YACHT","ZESTY","CLOCK",
];

let score = 0;
let best = 0;
let lives = 3;
let level = 1;
let speed = 1.2;
let drops: { word: string; y: number; x: number; el: HTMLElement }[];
let raf: number | null;
let nextTimer: number | null;

function spawnWord() {
  const word = WORDS[randInt(0, WORDS.length - 1)];
  const x = randInt(0, 10);
  const wordEl = document.createElement("div");
  wordEl.className = "absolute font-mono text-sm text-white drop-shadow-md";
  wordEl.style.left = x * 40 + 16 + "px";
  wordEl.style.top = "0px";
  wordEl.textContent = word;
  const board = el("speedtype-board");
  if (board) board.appendChild(wordEl);
  drops.push({ word, y: 0, x, el: wordEl });
}

function update() {
  const board = el("speedtype-board");
  if (!board) return;
  const height = board.clientHeight || 400;
  drops.forEach((d) => {
    d.y += speed * 0.4;
    d.el.style.top = d.y + "px";
  });
  drops = drops.filter((d) => {
    if (d.y > height) {
      d.el.remove();
      lives--;
      sound.error();
      showOverlay("Missed!", `A word reached the bottom. Lives: ${lives}`);
      setTimeout(hideOverlay, 700);
      return false;
    }
    return true;
  });
  if (lives <= 0) {
    endGame();
    return;
  }
  score += 1;
  if (score % 50 === 0) { level++; speed += 0.2; }
  const status = el("status");
  if (status) status.textContent = `Score: ${score} · Level: ${level} · Best: ${best}`;
  raf = requestAnimationFrame(update);
}

function endGame() {
  if (raf) cancelAnimationFrame(raf);
  if (nextTimer) clearInterval(nextTimer);
  best = setHighScore("speedtype", score);
  showOverlay("Game Over", `Score: ${score} · Best: ${best}`);
  sound.win();
}

function reset() {
  score = 0;
  lives = 3;
  level = 1;
  speed = 1.2;
  best = getHighScore("speedtype");
  drops = [];
  const board = el("speedtype-board");
  if (board) board.innerHTML = "";
  hideOverlay();
  const status = el("status");
  if (status) status.textContent = `Score: 0 · Level: 1 · Best: ${best}`;
  if (raf) cancelAnimationFrame(raf);
  raf = requestAnimationFrame(update);
  if (nextTimer) clearInterval(nextTimer);
  nextTimer = window.setInterval(spawnWord, 2200);
  spawnWord();
}

export function initGame() {
  const input = el("speedtype-input") as HTMLInputElement | null;
  input?.addEventListener("input", () => {
    const val = input.value.trim().toUpperCase();
    const match = drops.find((d) => d.word === val);
    if (match) {
      match.el.remove();
      drops = drops.filter((d) => d.word !== val);
      input.value = "";
      score += 20;
      sound.success();
    }
  });

  onReset(() => {
    if (raf) cancelAnimationFrame(raf);
    if (nextTimer) clearInterval(nextTimer);
    reset();
  });

  reset();
}
