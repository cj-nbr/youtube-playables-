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

const COLORS = [
  { name: "red", hex: "#ff4d4d", key: "r" },
  { name: "blue", hex: "#4d4dff", key: "b" },
  { name: "green", hex: "#4dff4d", key: "g" },
  { name: "yellow", hex: "#ffcc00", key: "y" },
  { name: "orange", hex: "#ff9933", key: "o" },
  { name: "purple", hex: "#cc66ff", key: "p" },
];

const WORD_LIST = ["RED", "BLUE", "GREEN", "YELLOW", "ORANGE", "PURPLE", "PINK", "CYAN"];

let score = 0;
let best = 0;
let combo = 0;
let timeLeft = 30;
let timerInterval: number | null;
let currentWord = "";
let currentColor = "";
let gameOver = false;

function nextWord() {
  const word = WORD_LIST[randInt(0, WORD_LIST.length - 1)];
  const color = COLORS[randInt(0, COLORS.length - 1)];
  currentWord = word;
  currentColor = color.name;
  const wordEl = el("guess-word");
  if (wordEl) {
    wordEl.textContent = word;
    wordEl.style.color = color.hex;
  }
}

function chooseColor(name: string) {
  if (gameOver) return;
  sound.click();
  if (name === currentColor) {
    score += 10 + combo * 2;
    combo++;
    timeLeft = Math.min(timeLeft + 2, 30);
    sound.success();
    nextWord();
  } else {
    combo = 0;
    timeLeft = Math.max(timeLeft - 5, 0);
    sound.error();
    if (timeLeft <= 0) endGame();
  }
  updateUI();
}

function endGame() {
  gameOver = true;
  best = setHighScore("guess-the-colors", score);
  showOverlay("Time\u2019s up!", `Score: ${score} · Best: ${best}`);
  sound.win();
  if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
  updateUI();
}

function updateUI() {
  const scoreEl = el("guess-score");
  const comboEl = el("guess-combo");
  if (scoreEl) scoreEl.textContent = `Score: ${score}`;
  if (comboEl) comboEl.textContent = `Combo: x${combo}`;
}

function reset() {
  score = 0;
  combo = 0;
  timeLeft = 30;
  gameOver = false;
  best = getHighScore("guess-the-colors");
  hideOverlay();
  nextWord();
  updateUI();
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = window.setInterval(() => {
    if (gameOver) return;
    timeLeft--;
    const timerEl = el("guess-timer");
    if (timerEl) timerEl.textContent = `Time: ${timeLeft}s`;
    if (timeLeft <= 0) endGame();
  }, 1000);
}

export function initGame() {
  const buttons = document.querySelectorAll<HTMLButtonElement>("[data-color]");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const color = btn.dataset.color;
      if (color) chooseColor(color);
    });
  });

  window.addEventListener("keydown", (e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    const match = COLORS.find((c) => c.key === key);
    if (match) chooseColor(match.name);
  });

  onReset(() => {
    if (timerInterval) clearInterval(timerInterval);
    reset();
  });

  reset();
}
