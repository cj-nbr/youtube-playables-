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

// Checkers — 8x8, two-player, mandatory jumps, king promotion.

const SIZE = 8;
let board: (string | null)[][];
let selected: { r: number; c: number } | null;
let turn: "r" | "b";
let gameOver: boolean;
let moves = 0;
let captures = 0;

function inBounds(r: number, c: number): boolean {
  return r >= 0 && r < SIZE && c >= 0 && c < SIZE;
}

function isDark(r: number, c: number): boolean {
  return (r + c) % 2 === 1;
}

function isUpperSide(p: string): boolean {
  return p === p.toUpperCase();
}

function pieceColor(p: string): "r" | "b" | null {
  if (!p) return null;
  return isUpperSide(p) ? "r" : "b";
}

function isKing(p: string): boolean {
  if (!p) return false;
  return p === p.toUpperCase() && p !== p.toLowerCase();
}

function initBoard(): (string | null)[][] {
  const b: (string | null)[][] = [];
  for (let r = 0; r < SIZE; r++) {
    b[r] = [];
    for (let c = 0; c < SIZE; c++) {
      if (r < 3 && isDark(r, c)) b[r][c] = "b";
      else if (r > 4 && isDark(r, c)) b[r][c] = "r";
      else b[r][c] = null;
    }
  }
  return b;
}

function getMovesFor(r: number, c: number): [number, number][] {
  const p = board[r][c];
  if (!p) return [];
  const color = pieceColor(p)!;
  const king = isKing(p);
  const dirs: [number, number][] = [];
  if (king || (!king && color === "b")) dirs.push([1, -1], [1, 1]);
  if (king || (!king && color === "r")) dirs.push([-1, -1], [-1, 1]);
  const result: [number, number][] = [];
  for (const [dr, dc] of dirs) {
    const nr = r + dr;
    const nc = c + dc;
    if (inBounds(nr, nc) && isDark(nr, nc) && !board[nr][nc]) {
      result.push([nr, nc]);
    }
  }
  return result;
}

function getJumpsFor(r: number, c: number): [number, number, number, number][] {
  const p = board[r][c];
  if (!p) return [];
  const color = pieceColor(p)!;
  const king = isKing(p);
  const dirs: [number, number][] = [];
  if (king || (!king && color === "b")) dirs.push([1, -1], [1, 1]);
  if (king || (!king && color === "r")) dirs.push([-1, -1], [-1, 1]);
  const result: [number, number, number, number][] = [];
  for (const [dr, dc] of dirs) {
    const mr = r + dr;
    const mc = c + dc;
    const jr = r + 2 * dr;
    const jc = c + 2 * dc;
    if (inBounds(mr, mc) && inBounds(jr, jc) && isDark(jr, jc)) {
      const mid = board[mr][mc];
      if (mid && pieceColor(mid) !== color && !board[jr][jc]) {
        result.push([jr, jc, mr, mc]);
      }
    }
  }
  return result;
}

function anyJumpFor(color: "r" | "b"): boolean {
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++) {
      const p = board[r][c];
      if (p && pieceColor(p) === color) {
        if (getJumpsFor(r, c).length > 0) return true;
      }
    }
  return false;
}

function draw() {
  const boardEl = el("checkers-board");
  if (!boardEl) return;
  boardEl.innerHTML = "";
  const area = getGameArea();
  const cellSize = getCellSize({ cols: 8, rows: 8, max: 70, min: 40, area });

  const wrapper = document.createElement("div");
  wrapper.style.display = "grid";
  wrapper.style.gridTemplateColumns = `repeat(8, ${cellSize}px)`;
  wrapper.style.width = 8 * cellSize + "px";

  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const sq = document.createElement("div");
      sq.style.width = cellSize + "px";
      sq.style.height = cellSize + "px";
      sq.dataset.r = String(r);
      sq.dataset.c = String(c);
      const dark = isDark(r, c);
      sq.style.background = dark ? "#3a2f28" : "#7a6e63";
      sq.style.border = "1px solid rgba(0,0,0,0.3)";
      sq.style.display = "flex";
      sq.style.alignItems = "center";
      sq.style.justifyContent = "center";
      sq.style.position = "relative";

      const p = board[r][c];
      if (p) {
        const piece = document.createElement("div");
        piece.style.width = cellSize * 0.75 + "px";
        piece.style.height = cellSize * 0.75 + "px";
        piece.style.borderRadius = "50%";
        piece.style.background = pieceColor(p) === "r" ? "#d14a4a" : "#2d2d2d";
        piece.style.border = "3px solid rgba(255,255,255,0.25)";
        piece.style.boxShadow = "0 2px 4px rgba(0,0,0,0.35)";
        if (isKing(p)) {
          const crown = document.createElement("div");
          crown.textContent = "👑";
          crown.style.fontSize = (cellSize * 0.35) + "px";
          crown.style.position = "absolute";
          crown.style.top = "50%";
          crown.style.left = "50%";
          crown.style.transform = "translate(-50%, -50%)";
          sq.appendChild(crown);
        }
        sq.appendChild(piece);
      }

      if (selected && selected.r === r && selected.c === c) {
        sq.style.boxShadow = "inset 0 0 0 3px #00dfd8";
      }

      sq.addEventListener("click", () => handleClick(r, c));
      wrapper.appendChild(sq);
    }
  }
  boardEl.appendChild(wrapper);
}

function handleClick(r: number, c: number) {
  sound.click();
  if (gameOver) return;

  const jumps = anyJumpFor(turn);

  if (selected) {
    const jumpsFor = getJumpsFor(selected.r, selected.c);
    const dest = jumpsFor.find(([jr, jc]) => jr === r && jc === c);
    if (dest) {
      board[r][c] = board[selected.r][selected.c];
      board[selected.r][selected.c] = null;
      board[dest[2]][dest[3]] = null;
      captures++;
      sound.success();
      promote(r, c);
      selected = null;
      draw();
      const remaining = countPieces(turn === "r" ? "b" : "r");
      if (remaining === 0) {
        endGame(turn === "r" ? "Red" : "Black");
        return;
      }
      turn = turn === "r" ? "b" : "r";
      const status = el("status");
      if (status) status.textContent = `${turn === "r" ? "Red" : "Black"} to move · Captures: ${captures}`;
      draw();
      return;
    }

    const movesFor = getMovesFor(selected.r, selected.c);
    const valid = movesFor.find(([mr, mc]) => mr === r && mc === c);
    if (valid && !jumps) {
      board[r][c] = board[selected.r][selected.c];
      board[selected.r][selected.c] = null;
      sound.click();
      promote(r, c);
      selected = null;
      turn = turn === "r" ? "b" : "r";
      draw();
      const remaining = countPieces(turn === "r" ? "b" : "r");
      if (remaining === 0) {
        endGame(turn === "r" ? "Red" : "Black");
        return;
      }
      const st = el("status");
      if (st) st.textContent = `${turn === "r" ? "Red" : "Black"} to move · Captures: ${captures}`;
      draw();
      return;
    }

    if (jumps && !dest) {
      const val = jumpsFor.find(([jr, jc]) => jr === r && jc === c);
      if (!val) {
        selected = null;
        draw();
        return;
      }
    }
  }

  const p = board[r][c];
  if (!p || pieceColor(p) !== turn) {
    selected = null;
    draw();
    return;
  }

  if (jumps) {
    const jp = getJumpsFor(r, c);
    if (jp.length === 0) {
      selected = null;
      draw();
      return;
    }
  }

  selected = { r, c };
  draw();
}

function promote(r: number, c: number) {
  const p = board[r][c];
  if (!p) return;
  const color = pieceColor(p);
  if (color === "b" && r === SIZE - 1 && !isKing(p)) {
    board[r][c] = "B";
    sound.success();
  } else if (color === "r" && r === 0 && !isKing(p)) {
    board[r][c] = "R";
    sound.success();
  }
}

function countPieces(color: "r" | "b"): number {
  let count = 0;
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++) {
      const p = board[r][c];
      if (p && pieceColor(p) === color) count++;
    }
  return count;
}

function endGame(winner: string) {
  gameOver = true;
  const best = setHighScore("checkers", captures, false);
  const status = el("status");
  if (status) status.textContent = `${winner} wins! Captures: ${captures} · Best: ${best}`;
  sound.win();
  showOverlay(`${winner} wins!`, `Captures: ${captures}. Best score: ${best}.`);
}

function reset() {
  board = initBoard();
  selected = null;
  turn = "b";
  gameOver = false;
  moves = 0;
  captures = 0;
  hideOverlay();
  const status = el("status");
  if (status) status.textContent = "Black to move – Click a piece";
  draw();
}

export function initGame() {
  onReset(reset);
  reset();
}
