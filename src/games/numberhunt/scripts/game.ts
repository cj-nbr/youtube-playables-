import {
  el,
  onReset,
  showOverlay,
  hideOverlay,
  sound,
  registerPause,
  getHighScore,
  setHighScore,
} from "../../../shared/utils";

// NumberHunt — spot and circle every instance of a target digit hidden in a
// grid of distractors before the shared countdown expires. Clear several rounds
// to win. Wrong taps drain the clock, so accuracy matters as much as speed.

const COLS = 8;
const ROWS = 8;
const TOTAL_ROUNDS = 6;
const MAX_TIME = 60;

type Cell = { value: number; found: boolean };

let grid: Cell[][];
let round = 0;
let target = 0;
let remaining = 0;
let score = 0;
let timeLeft = MAX_TIME;
let over = false;
let paused = false;
let timer: number | null = null;

let rootEl: HTMLElement | null = null;
let targetEl: HTMLElement | null = null;
let roundEl: HTMLElement | null = null;
let timeEl: HTMLElement | null = null;
let remainEl: HTMLElement | null = null;
let gridEl: HTMLElement | null = null;

function getCellSizeLocal(): number {
  const area = (window as any).__getGameArea?.() ?? { w: 320, h: 400 };
  const size = Math.min(area.w / COLS, (area.h - 70) / ROWS);
  return Math.max(24, Math.min(size, 52));
}

function newRound() {
  round++;
  target = Math.floor(Math.random() * 10);
  const instances = 4 + Math.floor(Math.random() * 4); // 4..7
  grid = [];
  for (let r = 0; r < ROWS; r++) {
    grid[r] = [];
    for (let c = 0; c < COLS; c++) {
      grid[r][c] = { value: -1, found: false };
    }
  }
  // Place target instances at unique cells.
  const positions: number[] = [];
  const total = COLS * ROWS;
  while (positions.length < instances) {
    const p = Math.floor(Math.random() * total);
    if (!positions.includes(p)) positions.push(p);
  }
  for (const p of positions) {
    grid[Math.floor(p / COLS)][p % COLS] = { value: target, found: false };
  }
  // Fill distractors, never equal to the target.
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (grid[r][c].value === -1) {
        let v = Math.floor(Math.random() * 10);
        if (v === target) v = (v + 1) % 10;
        grid[r][c] = { value: v, found: false };
      }
    }
  }
  remaining = instances;
  updateHeader();
  drawGrid();
}

function updateHeader() {
  if (targetEl) targetEl.textContent = String(target);
  if (roundEl) roundEl.textContent = `Round ${Math.min(round, TOTAL_ROUNDS)}/${TOTAL_ROUNDS}`;
  if (remainEl) remainEl.textContent = `Left: ${remaining}`;
  if (timeEl) timeEl.textContent = `⏱ ${timeLeft}s`;
}

function drawGrid() {
  if (!gridEl) return;
  const CELL = getCellSizeLocal();
  const GAP = 3;
  gridEl.style.width = COLS * (CELL + GAP) - GAP + "px";
  gridEl.style.height = ROWS * (CELL + GAP) - GAP + "px";
  gridEl.style.position = "relative";
  gridEl.innerHTML = "";

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = grid[r][c];
      const d = document.createElement("button");
      d.className =
        "absolute flex items-center justify-center rounded-md border text-lg font-bold sm:text-xl select-none transition-colors";
      d.style.left = c * (CELL + GAP) + "px";
      d.style.top = r * (CELL + GAP) + "px";
      d.style.width = CELL + "px";
      d.style.height = CELL + "px";
      d.textContent = String(cell.value);
      d.setAttribute("aria-label", `Number ${cell.value}`);

      if (cell.found) {
        d.style.background = "rgba(34,197,94,.85)";
        d.style.border = "2px solid rgba(34,197,94,1)";
        d.style.color = "#06281a";
        d.style.textDecoration = "line-through";
      } else {
        d.style.background = "rgba(255,255,255,.08)";
        d.style.border = "1px solid rgba(255,255,255,.18)";
        d.style.color = "#fff";
        d.addEventListener("click", () => tap(r, c));
      }
      gridEl.appendChild(d);
    }
  }
}

function tap(r: number, c: number) {
  sound.click();
  if (over || paused) return;
  const cell = grid[r][c];
  if (cell.found) return;

  if (cell.value === target) {
    cell.found = true;
    remaining--;
    score += 10;
    sound.success();
    if (remaining === 0) {
      score += 25;
      sound.win();
      if (round >= TOTAL_ROUNDS) {
        win();
        return;
      }
      newRound();
    } else {
      updateHeader();
      drawGrid();
    }
  } else {
    timeLeft = Math.max(0, timeLeft - 2);
    sound.error();
    updateHeader();
    if (timeLeft <= 0) endGame();
  }
}

function tick() {
  if (over || paused) return;
  timeLeft--;
  if (timeEl) timeEl.textContent = `⏱ ${timeLeft}s`;
  if (timeLeft <= 0) endGame();
}

function win() {
  over = true;
  stopTimer();
  const best = setHighScore("numberhunt", score);
  sound.win();
  const status = el("status");
  if (status) status.textContent = `You win! Score: ${score} · Best: ${best}`;
  showOverlay("Hunt complete!", `You cleared all ${TOTAL_ROUNDS} rounds. Score: ${score}. Best: ${best}.`);
}

function endGame() {
  over = true;
  stopTimer();
  const best = setHighScore("numberhunt", score);
  sound.error();
  const status = el("status");
  if (status) status.textContent = `Time's up · Score: ${score} · Best: ${best}`;
  showOverlay("Time's up!", `You scored ${score} across ${round} round${round === 1 ? "" : "s"}. Best: ${best}.`);
}

function stopTimer() {
  if (timer !== null) {
    clearInterval(timer);
    timer = null;
  }
}

function buildShell() {
  rootEl = el("numberhunt");
  if (!rootEl) return;
  rootEl.innerHTML = "";
  rootEl.style.position = "relative";
  rootEl.style.width = "100%";

  const header = document.createElement("div");
  header.className =
    "mb-3 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-white/5 px-3 py-2 text-sm";
  header.innerHTML = `
    <div class="flex items-center gap-2">
      <span class="font-mono text-mute">Target</span>
      <span id="nh-target" class="flex h-8 w-8 items-center justify-center rounded-md bg-link text-lg font-bold text-white">?</span>
    </div>
    <span id="nh-round" class="font-mono text-mute">Round 1/${TOTAL_ROUNDS}</span>
    <span id="nh-remain" class="font-mono text-mute">Left: 0</span>
    <span id="nh-time" class="font-mono text-mute">⏱ ${MAX_TIME}s</span>`;
  rootEl.appendChild(header);

  targetEl = header.querySelector("#nh-target");
  roundEl = header.querySelector("#nh-round");
  remainEl = header.querySelector("#nh-remain");
  timeEl = header.querySelector("#nh-time");

  gridEl = document.createElement("div");
  rootEl.appendChild(gridEl);
}

function reset() {
  over = false;
  paused = false;
  round = 0;
  score = 0;
  timeLeft = MAX_TIME;
  stopTimer();
  buildShell();
  const best = getHighScore("numberhunt");
  const status = el("status");
  if (status) status.textContent = `Find the target numbers · Best: ${best}`;
  hideOverlay();
  newRound();
  timer = window.setInterval(tick, 1000);
}

function pause() {
  paused = true;
}
function resume() {
  paused = false;
}

export function initGame() {
  registerPause(pause, resume);
  onReset(reset);
  reset();
}
