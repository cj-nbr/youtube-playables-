import {
  el,
  onReset,
  showOverlay,
  hideOverlay,
  sound,
  getHighScore,
  setHighScore,
} from "../../../shared/utils";

// Symmetris — draw the missing mirror half. A random figure is shown on the
// left half of a grid; the player fills the right half so it mirrors the left
// across the vertical center axis. Correct fills turn green, wrong fills turn
// red and count as errors. Complete figures to build a streak; too many
// errors ends the run.

const GRID = 6;
const MID = GRID / 2;
const MAX_ERRORS = 6;

let leftFilled: boolean[][];
let rightFilled: boolean[][];
let errors = 0;
let solved = 0;
let over = false;

function generateFigure() {
  leftFilled = Array.from({ length: GRID }, () => Array(GRID).fill(false));
  rightFilled = Array.from({ length: GRID }, () => Array(GRID).fill(false));

  // Randomly fill left-half cells to form a shape (density ~35-50%).
  const density = 0.32 + Math.random() * 0.18;
  for (let r = 0; r < GRID; r++) {
    for (let c = 0; c < MID; c++) {
      if (Math.random() < density) leftFilled[r][c] = true;
    }
  }
  // Ensure at least a few cells so the figure is non-trivial.
  const count = leftFilled.flat().filter(Boolean).length;
  if (count < 3) leftFilled[GRID - 1][0] = leftFilled[0][MID - 1] = true;
}

/** Target: right cell (r,c) should be filled iff its mirror partner is. */
function targetFilled(r: number, c: number): boolean {
  return leftFilled[r][GRID - 1 - c];
}

function isComplete(): boolean {
  for (let r = 0; r < GRID; r++) {
    for (let c = MID; c < GRID; c++) {
      if (rightFilled[r][c] !== targetFilled(r, c)) return false;
    }
  }
  return true;
}

function getCellSizeLocal(): number {
  const area = (window as any).__getGameArea?.() ?? { w: 320, h: 400 };
  const size = Math.min(area.w, area.h) / GRID;
  return Math.max(28, Math.min(size, 56));
}

function draw() {
  const gameEl = el("symmetris");
  if (!gameEl) return;
  const CELL = getCellSizeLocal();
  const GAP = 3;
  gameEl.style.width = GRID * (CELL + GAP) - GAP + "px";
  gameEl.style.height = GRID * (CELL + GAP) - GAP + "px";
  gameEl.style.position = "relative";
  gameEl.innerHTML = "";

  for (let r = 0; r < GRID; r++) {
    for (let c = 0; c < GRID; c++) {
      const d = document.createElement("div");
      d.className = "absolute rounded-md transition-colors";
      d.style.left = c * (CELL + GAP) + "px";
      d.style.top = r * (CELL + GAP) + "px";
      d.style.width = CELL + "px";
      d.style.height = CELL + "px";

      if (c < MID) {
        // Left half: fixed original pattern.
        d.style.background = leftFilled[r][c]
          ? "rgba(0,223,216,.85)"
          : "rgba(255,255,255,.05)";
        d.style.border = leftFilled[r][c]
          ? "1px solid rgba(0,223,216,1)"
          : "1px solid rgba(255,255,255,.1)";
      } else {
        // Right half: player-drawn mirror.
        const filled = rightFilled[r][c];
        const correct = filled === targetFilled(r, c);
        if (filled && correct) {
          d.style.background = "rgba(34,197,94,.85)";
          d.style.border = "1px solid rgba(34,197,94,1)";
        } else if (filled && !correct) {
          d.style.background = "rgba(239,68,68,.8)";
          d.style.border = "1px solid rgba(239,68,68,1)";
        } else {
          d.style.background = "rgba(255,255,255,.05)";
          d.style.border = "1px solid rgba(255,255,255,.1)";
        }
        d.style.cursor = "pointer";
        d.addEventListener("click", () => toggle(r, c));
      }

      // Center axis marker.
      if (c === MID - 1 || c === MID) {
        d.style.boxShadow = "inset 2px 0 0 rgba(255,255,255,.25)";
      }
      gameEl.appendChild(d);
    }
  }
}

function toggle(r: number, c: number) {
  sound.click();
  if (over || c < MID) return;

  const wasFilled = rightFilled[r][c];
  rightFilled[r][c] = !wasFilled;

  if (!wasFilled) {
    // Just filled this cell.
    if (targetFilled(r, c)) {
      sound.success();
    } else {
      errors++;
      sound.error();
    }
  }

  const status = el("status");
  if (errors >= MAX_ERRORS) {
    over = true;
    const best = setHighScore("symmetris", solved);
    if (status)
      status.textContent = `Game Over · Figures: ${solved} · Best: ${best}`;
    showOverlay(
      "Too many errors!",
      `You completed ${solved} figure${solved === 1 ? "" : "s"} before the symmetry broke. Best: ${best}.`
    );
    return;
  }

  if (isComplete()) {
    solved++;
    sound.win();
    if (status) status.textContent = `Figures: ${solved} · Errors: ${errors}`;
    generateFigure();
    draw();
    return;
  }

  if (status) status.textContent = `Figures: ${solved} · Errors: ${errors}/${MAX_ERRORS}`;
  draw();
}

function reset() {
  errors = 0;
  solved = 0;
  over = false;
  generateFigure();
  const best = getHighScore("symmetris");
  const status = el("status");
  if (status) status.textContent = `Figures: 0 · Errors: 0/${MAX_ERRORS} · Best: ${best}`;
  hideOverlay();
  draw();
}

export function initGame() {
  onReset(reset);
  reset();
}
