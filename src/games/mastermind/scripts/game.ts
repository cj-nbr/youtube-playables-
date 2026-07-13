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
} from "../../../shared/utils";

// Mastermind — crack a 4-color secret code.

const CODE_LENGTH = 4;
const COLORS = ["red", "blue", "green", "yellow", "orange", "purple"];
const MAX_GUESSES = 10;

let secret: string[];
let guesses: string[][];
let feedback: { black: number; white: number }[];
let currentGuess: string[];
let turn = 0;
let gameOver = false;
let gameWon = false;

function getCellSizeLocal() {
  const area = getGameArea();
  const size = Math.min(area.w, area.h) / (MAX_GUESSES + 2);
  return Math.max(24, Math.min(size - 4, 48));
}

function createSecret() {
  secret = Array.from({ length: CODE_LENGTH }, () => COLORS[Math.floor(Math.random() * COLORS.length)]);
}

function resetState() {
  guesses = [];
  feedback = [];
  currentGuess = [];
  turn = 0;
  gameOver = false;
  gameWon = false;
}

function draw() {
  const gameEl = el("mastermind");
  if (!gameEl) return;
  gameEl.innerHTML = "";
  const CELL = getCellSizeLocal();
  const GAP = 6;
  gameEl.style.width = CODE_LENGTH * (CELL + GAP) + 160 + "px";
  gameEl.style.height = (MAX_GUESSES + 1) * (CELL + GAP) + "px";
  gameEl.style.position = "relative";

  for (let t = 0; t < MAX_GUESSES; t++) {
    const guess = guesses[t] || [];
    const fb = feedback[t];

    const rowY = t * (CELL + GAP);

    for (let i = 0; i < CODE_LENGTH; i++) {
      const slot = document.createElement("div");
      slot.className = "absolute flex items-center justify-center rounded-lg border-2 border-white/20 text-xs font-bold";
      slot.style.left = i * (CELL + GAP) + "px";
      slot.style.top = rowY + "px";
      slot.style.width = CELL + "px";
      slot.style.height = CELL + "px";

      if (guess[i]) {
        slot.style.background = guess[i];
        slot.style.color = "#fff";
        slot.style.borderColor = "rgba(255,255,255,.4)";
        slot.textContent = "";
      } else if (t === turn) {
        slot.style.background = "rgba(255,255,255,.06)";
        slot.textContent = "+";
        slot.style.cursor = "pointer";
        slot.addEventListener("click", () => {
          if (gameOver) return;
          const colorIdx = (currentGuess.length) % COLORS.length;
          currentGuess.push(COLORS[colorIdx]);
          sound.click();
          draw();
        });
      } else {
        slot.style.background = "rgba(255,255,255,.04)";
      }

      gameEl.appendChild(slot);
    }

    if (fb) {
      const pegX = CODE_LENGTH * (CELL + GAP) + 8;
      const pegSize = CELL / 4;
      for (let p = 0; p < fb.black; p++) {
        const peg = document.createElement("div");
        peg.className = "absolute rounded-full";
        peg.style.left = pegX + (p % 2) * (pegSize + 2) + "px";
        peg.style.top = rowY + Math.floor(p / 2) * (pegSize + 2) + "px";
        peg.style.width = pegSize + "px";
        peg.style.height = pegSize + "px";
        peg.style.background = "#fff";
        gameEl.appendChild(peg);
      }
      for (let p = 0; p < fb.white; p++) {
        const peg = document.createElement("div");
        peg.className = "absolute rounded-full";
        peg.style.left = pegX + 8 + (p % 2) * (pegSize + 2) + "px";
        peg.style.top = rowY + Math.floor(p / 2) * (pegSize + 2) + "px";
        peg.style.width = pegSize + "px";
        peg.style.height = pegSize + "px";
        peg.style.background = "#888";
        gameEl.appendChild(peg);
      }
    }

    if (t === turn && !gameOver) {
      const submitBtn = document.createElement("button");
      submitBtn.className = "absolute h-8 rounded bg-white/10 px-3 text-xs font-bold text-white hover:bg-white/20";
      submitBtn.style.left = (CODE_LENGTH + 2) * (CELL + GAP) + "px";
      submitBtn.style.top = rowY + "px";
      submitBtn.textContent = "GO";
      submitBtn.addEventListener("click", submitGuess);
      gameEl.appendChild(submitBtn);

      const clearBtn = document.createElement("button");
      clearBtn.className = "absolute h-8 rounded bg-white/10 px-3 text-xs font-bold text-white hover:bg-white/20";
      clearBtn.style.left = (CODE_LENGTH + 3) * (CELL + GAP) + "px";
      clearBtn.style.top = rowY + "px";
      clearBtn.textContent = "CLR";
      clearBtn.addEventListener("click", () => {
        currentGuess = [];
        draw();
      });
      gameEl.appendChild(clearBtn);
    }
  }

  const colorPalette = document.createElement("div");
  colorPalette.className = "absolute bottom-0 left-0 flex gap-1";
  for (const color of COLORS) {
    const swatch = document.createElement("button");
    swatch.className = "h-6 w-6 rounded-full border-2 border-white/30 hover:scale-110 transition-transform";
    swatch.style.background = color;
    swatch.addEventListener("click", () => {
      if (gameOver) return;
      currentGuess.push(color);
      sound.click();
      draw();
    });
    colorPalette.appendChild(swatch);
  }
  gameEl.appendChild(colorPalette);

  const status = el("status");
  if (status) status.textContent = `Guess: ${turn}/${MAX_GUESSES}`;
}

function submitGuess() {
  if (currentGuess.length !== CODE_LENGTH || gameOver) return;
  sound.click();

  const guess = [...currentGuess];
  guesses.push(guess);
  currentGuess = [];

  let black = 0;
  let white = 0;
  const secretCopy = [...secret];
  const guessCopy = [...guess];

  for (let i = 0; i < CODE_LENGTH; i++) {
    if (guessCopy[i] === secretCopy[i]) {
      black++;
      secretCopy[i] = "";
      guessCopy[i] = "";
    }
  }

  for (let i = 0; i < CODE_LENGTH; i++) {
    if (guessCopy[i] === "") continue;
    const idx = secretCopy.indexOf(guessCopy[i]);
    if (idx >= 0) {
      white++;
      secretCopy[idx] = "";
    }
  }

  feedback.push({ black, white });
  turn++;

  if (black === CODE_LENGTH) {
    gameWon = true;
    gameOver = true;
    const status = el("status");
    if (status) status.textContent = `Win! ${turn} guesses`;
    sound.win();
    showOverlay("You Win!", `Cracked the code in ${turn} guesses!`);
    return;
  }

  if (turn >= MAX_GUESSES) {
    gameOver = true;
    const status = el("status");
    if (status) status.textContent = `Game Over! Code: ${secret.join(" ")}`;
    sound.error();
    showOverlay("Game Over", `The code was: ${secret.join(" ")}`);
    return;
  }

  draw();
}

function reset() {
  createSecret();
  resetState();
  draw();
  const status = el("status");
  if (status) status.textContent = `Guess: 0/${MAX_GUESSES}`;
  hideOverlay();
}

export function initGame() {
  onReset(reset);
  reset();
}
