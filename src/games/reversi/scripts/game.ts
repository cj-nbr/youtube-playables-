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
} from "../../../shared/utils";

// Reversi — 8x8 flips, two-player pass-and-play.

const SIZE = 8;
let board: (string | null)[][];
let turn: "g" | "w";
let gameOver: boolean;
let moves = 0;

function inBounds(r: number, c: number): boolean {
  return r >= 0 && r < SIZE && c >= 0 && c < SIZE;
}

function initBoard(): (string | null)[][] {
  const b: (string | null)[][] = [];
  for (let r = 0; r < SIZE; r++) {
    b[r] = Array.from({ length: SIZE }, () => null);
  }
  b[3][3] = "w";
  b[3][4] = "g";
  b[4][3] = "g";
  b[4][4] = "w";
  return b;
}

function count(color: "g" | "w"): number {
  let n = 0;
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++) if (board[r][c] === color) n++;
  return n;
}

function isValidMove(r: number, c: number): boolean {
  if (board[r][c]) return false;
  const dirs: [number, number][] = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1],
  ];
  for (const [dr, dc] of dirs) {
    let nr = r + dr;
    let nc = c + dc;
    let sawOpponent = false;
    while (inBounds(nr, nc)) {
      const v = board[nr][nc];
      if (!v) break;
      if (v === turn) {
        if (sawOpponent) return true;
        break;
      }
      sawOpponent = true;
      nr += dr;
      nc += dc;
    }
  }
  return false;
}

function getFlips(r: number, c: number): [number, number][] {
  const flips: [number, number][] = [];
  const dirs: [number, number][] = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1],
  ];
  for (const [dr, dc] of dirs) {
    let nr = r + dr;
    let nc = c + dc;
    const line: [number, number][] = [];
    while (inBounds(nr, nc)) {
      const v = board[nr][nc];
      if (!v) break;
      if (v === turn) {
        flips.push(...line);
        break;
      }
      line.push([nr, nc]);
      nr += dr;
      nc += dc;
    }
  }
  return flips;
}

function draw() {
  const boardEl = el("reversi-board");
  if (!boardEl) return;
  boardEl.innerHTML = "";
  const area = getGameArea();
  const cellSize = getCellSize({ cols: 8, rows: 8, max: 65, min: 40, area });

  const grid = document.createElement("div");
  grid.style.display = "grid";
  grid.style.gridTemplateColumns = `repeat(8, ${cellSize}px)`;
  grid.style.width = 8 * cellSize + "px";

  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const sq = document.createElement("div");
      sq.style.width = cellSize + "px";
      sq.style.height = cellSize + "px";
      sq.style.background = (r + c) % 2 === 0 ? "#3b5e3b" : "#4a7c4f";
      sq.style.border = "1px solid rgba(0,0,0,0.25)";
      sq.style.display = "flex";
      sq.style.alignItems = "center";
      sq.style.justifyContent = "center";
      sq.style.cursor = isValidMove(r, c) ? "pointer" : "default";

      const v = board[r][c];
      if (v === "g" || v === "w") {
        const disc = document.createElement("div");
        disc.style.width = cellSize * 0.82 + "px";
        disc.style.height = cellSize * 0.82 + "px";
        disc.style.borderRadius = "50%";
        disc.style.background = v === "g" ? "#1e8e5c" : "#f2f2f2";
        disc.style.boxShadow = "0 2px 6px rgba(0,0,0,0.35)";
        if (v === "w") {
          disc.style.border = "3px solid #dcdcdc";
        } else {
          disc.style.border = "3px solid #10b981";
        }
        sq.appendChild(disc);
      } else if (!v && isValidMove(r, c)) {
        const dot = document.createElement("div");
        dot.style.width = cellSize * 0.15 + "px";
        dot.style.height = cellSize * 0.15 + "px";
        dot.style.borderRadius = "50%";
        dot.style.background = "rgba(255,255,255,0.35)";
        sq.appendChild(dot);
      }

      sq.addEventListener("click", () => handleClick(r, c));
      grid.appendChild(sq);
    }
  }
  boardEl.appendChild(grid);
}

function handleClick(r: number, c: number) {
  sound.click();
  if (gameOver) return;
  if (!isValidMove(r, c)) return;

  const flips = getFlips(r, c);
  if (flips.length === 0) return;

  board[r][c] = turn;
  for (const [fr, fc] of flips) board[fr][fc] = turn;
  moves++;
  sound.success();
  turn = turn === "g" ? "w" : "g";

  const green = count("g");
  const white = count("w");
  const status = el("status");
  if (status) status.textContent = `Green ${green} · White ${white}`;

  if (!hasLegalMove(turn)) {
    const other = turn === "g" ? "w" : "g";
    if (!hasLegalMove(other)) {
      endGame();
      return;
    }
    sound.error();
    if (status) status.textContent = `${turn === "g" ? "Green" : "White"} has no moves — pass.`;
    turn = other;
  }

  draw();
}

function hasLegalMove(color: "g" | "w"): boolean {
  const orig = turn;
  turn = color;
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++)
      if (isValidMove(r, c)) {
        turn = orig;
        return true;
      }
  turn = orig;
  return false;
}

function endGame() {
  gameOver = true;
  const green = count("g");
  const white = count("w");
  let title = "";
  if (green > white) title = "Green wins!";
  else if (white > green) title = "White wins!";
  else title = "Draw!";
  const best = setHighScore("reversi", green, false);
  const status = el("status");
  if (status) status.textContent = `${title} Score: ${green} · Best: ${best}`;
  sound.win();
  showOverlay(title, `Green ${green} · White ${white}. Best: ${best}.`);
}

function reset() {
  board = initBoard();
  turn = "g";
  gameOver = false;
  moves = 0;
  hideOverlay();
  const status = el("status");
  if (status) status.textContent = "Green to move";
  draw();
}

export function initGame() {
  onReset(reset);
  reset();
}
