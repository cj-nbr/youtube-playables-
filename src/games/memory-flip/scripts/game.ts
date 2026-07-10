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

// Memory Flip — flip two cards per turn, match all 8 pairs in fewest moves.

const PAIRS = 8;
const GRID_W = 4;
const GRID_H = 4;
const SYMBOLS = ["🐶", "🐱", "🦊", "🐰", "🐹", "🐼", "🦁", "🐵"];

let cards: { symbol: string; revealed: boolean; matched: boolean }[];
let first: number | null;
let second: number | null;
let lock: boolean;
let moves = 0;
let best = 0;

function getCellSizeLocal() {
  const area = getGameArea();
  const gap = 4;
  const cellSize = Math.min(area.w, area.h) / GRID_W;
  return Math.max(40, Math.min(cellSize - gap, 70));
}

function createCards() {
  const shuffled = shuffle([...SYMBOLS, ...SYMBOLS]);
  cards = shuffled.map((symbol) => ({ symbol, revealed: false, matched: false }));
}

function draw() {
  const gameEl = el("memory-flip");
  if (!gameEl) return;
  gameEl.innerHTML = "";
  const CELL = getCellSizeLocal();
  const GAP = 4;
  gameEl.style.width = GRID_W * (CELL + GAP) - GAP + "px";
  gameEl.style.height = GRID_H * (CELL + GAP) - GAP + "px";
  gameEl.style.position = "relative";

  for (let i = 0; i < cards.length; i++) {
    const c = i % GRID_W;
    const r = Math.floor(i / GRID_W);
    const card = document.createElement("button");
    card.className =
      "absolute rounded-lg border-2 border-white/20 text-2xl transition-all duration-150";
    card.style.left = c * (CELL + GAP) + "px";
    card.style.top = r * (CELL + GAP) + "px";
    card.style.width = CELL + "px";
    card.style.height = CELL + "px";
    const faceUp = cards[i].revealed || cards[i].matched;
    card.style.background = faceUp ? "rgba(255,255,255,.1)" : "rgba(255,255,255,.06)";
    card.style.color = faceUp ? "#fff" : "transparent";
    card.style.boxShadow = cards[i].matched
      ? "0 0 0 2px #00dfd8"
      : "0 2px 4px rgba(0,0,0,.2)";
    card.textContent = faceUp ? cards[i].symbol : "?";
    card.setAttribute(
      "aria-label",
      cards[i].matched ? `Matched ${cards[i].symbol}` : `Card ${i + 1}`
    );
    if (!cards[i].matched) card.addEventListener("click", () => flip(i));
    gameEl.appendChild(card);
  }
}

function flip(idx: number) {
  sound.click();
  if (lock || cards[idx].revealed || cards[idx].matched) return;
  cards[idx].revealed = true;
  sound.click();
  draw();

  if (first === null) {
    first = idx;
  } else {
    second = idx;
    lock = true;
    moves++;
    if (cards[first].symbol === cards[second].symbol) {
      cards[first].matched = true;
      cards[second].matched = true;
      first = second = null;
      lock = false;
      sound.success();
      const remaining = cards.filter((c) => !c.matched).length;
      if (remaining === 0) {
        best = setHighScore("memory-flip", moves, true);
        const status = el("status");
        if (status) status.textContent = `Complete! Moves: ${moves} · Best: ${best}`;
        sound.win();
        showOverlay("You win!", `All pairs matched in ${moves} move${moves === 1 ? "" : "s"}. Best: ${best}.`);
      } else {
        const status = el("status");
        if (status) status.textContent = `Moves: ${moves}`;
      }
    } else {
      setTimeout(() => {
        cards[first!].revealed = false;
        cards[second!].revealed = false;
        first = second = null;
        lock = false;
        const status = el("status");
        if (status) status.textContent = `Moves: ${moves}`;
        draw();
      }, 800);
    }
  }
}

function reset() {
  moves = 0;
  first = second = null;
  lock = false;
  best = getHighScore("memory-flip");
  createCards();
  draw();
  const status = el("status");
  if (status) status.textContent = `Moves: 0 · Best: ${best}`;
  hideOverlay();
}

export function initGame() {
  onReset(reset);
  reset();
}
