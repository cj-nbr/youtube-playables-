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

// Memocoly — watch a pattern of cells, then repeat it from memory.

const SIZE = 3;
const ROUND_DELAY = 600;
const REPLAY_DELAY = 400;

let cells: boolean[];
let sequence: number[];
let playerIndex = 0;
let round = 0;
let best = 0;
let showing = false;
let gameOver = false;

function getCellSizeLocal() {
  const area = getGameArea();
  const size = Math.min(area.w, area.h) / SIZE;
  return Math.max(40, Math.min(size - 8, 80));
}

function createCells() {
  cells = Array.from({ length: SIZE * SIZE }, () => false);
}

function draw() {
  const gameEl = el("memocoly");
  if (!gameEl) return;
  gameEl.innerHTML = "";
  const CELL = getCellSizeLocal();
  const GAP = 8;
  gameEl.style.width = SIZE * (CELL + GAP) - GAP + "px";
  gameEl.style.height = SIZE * (CELL + GAP) - GAP + "px";
  gameEl.style.position = "relative";

  for (let i = 0; i < cells.length; i++) {
    const c = i % SIZE;
    const r = Math.floor(i / SIZE);
    const cell = document.createElement("button");
    cell.className = "absolute flex items-center justify-center rounded-xl border-2 border-white/20 text-xl font-bold transition-all duration-150";
    cell.style.left = c * (CELL + GAP) + "px";
    cell.style.top = r * (CELL + GAP) + "px";
    cell.style.width = CELL + "px";
    cell.style.height = CELL + "px";

    if (cells[i]) {
      cell.style.background = "#00dfd8";
      cell.style.color = "#000";
      cell.style.boxShadow = "0 0 20px rgba(0,223,216,.4)";
      cell.textContent = "★";
    } else {
      cell.style.background = "rgba(255,255,255,.06)";
      cell.style.color = "transparent";
      cell.textContent = "·";
    }

    cell.addEventListener("click", () => handleTap(i));
    gameEl.appendChild(cell);
  }

  const status = el("status");
  if (status) status.textContent = `Round: ${round} · Best: ${best}`;
}

function playSequence() {
  showing = true;
  createCells();
  draw();
  sequence.forEach((idx, i) => {
    setTimeout(() => {
      cells[idx] = true;
      draw();
      setTimeout(() => {
        cells[idx] = false;
        draw();
        if (i === sequence.length - 1) {
          setTimeout(() => {
            showing = false;
            playerIndex = 0;
          }, REPLAY_DELAY);
        }
      }, ROUND_DELAY);
    }, i * (ROUND_DELAY + 100));
  });
}

function nextRound() {
  round++;
  sequence.push(Math.floor(Math.random() * cells.length));
  playSequence();
}

function handleTap(idx: number) {
  if (showing || gameOver) return;
  sound.click();
  cells[idx] = true;
  draw();
  setTimeout(() => {
    cells[idx] = false;
    draw();
  }, 150);

  if (sequence[playerIndex] === idx) {
    playerIndex++;
    if (playerIndex === sequence.length) {
      sound.success();
      best = setHighScore("memocoly", round);
      const status = el("status");
      if (status) status.textContent = `Round ${round} complete! · Best: ${best}`;
      setTimeout(nextRound, 1000);
    }
  } else {
    sound.error();
    gameOver = true;
    best = setHighScore("memocoly", round, true);
    const status = el("status");
    if (status) status.textContent = `Game Over! Round: ${round} · Best: ${best}`;
    showOverlay("Game Over", `You reached round ${round}. Best: ${best}.`);
  }
}

function reset() {
  round = 0;
  sequence = [];
  playerIndex = 0;
  gameOver = false;
  best = getHighScore("memocoly");
  createCells();
  draw();
  const status = el("status");
  if (status) status.textContent = `Round: 0 · Best: ${best}`;
  hideOverlay();
  setTimeout(nextRound, 500);
}

export function initGame() {
  onReset(reset);
  reset();
}
