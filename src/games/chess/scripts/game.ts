import {
  el,
  onReset,
  showOverlay,
  hideOverlay,
  sound,
} from "../../../shared/utils";

// Chess — two-player, pass-and-play. Full legal-move generation with
// check / checkmate / stalemate detection. Castling and en passant are not
// implemented in this lightweight version (documented in the README/FAQ).

const SIZE = 8;
type Board = (string | null)[][];

let board: Board;
let selected: { r: number; c: number } | null;
let turn: "w" | "b";
let gameOver: boolean;

const START = ["r", "n", "b", "q", "k", "b", "n", "r"];
const PIECES: Record<string, string> = {
  p: "♟", r: "♜", n: "♞", b: "♝", q: "♛", k: "♚",
  P: "♙", R: "♖", N: "♘", B: "♗", Q: "♕", K: "♔",
};
const SQUARES = ["#b7965e", "#8c6d3e"];

function inBounds(r: number, c: number) {
  return r >= 0 && r < SIZE && c >= 0 && c < SIZE;
}

function isUpper(p: string | null) {
  return p !== null && p === p.toUpperCase();
}

function isEmptyOrEnemy(board: Board, r: number, c: number, isWhite: boolean) {
  if (!inBounds(r, c)) return false;
  const t = board[r][c];
  return !t || isUpper(t) !== isWhite;
}

function initBoard(): Board {
  const b: Board = [];
  for (let r = 0; r < SIZE; r++) {
    b[r] = [];
    for (let c = 0; c < SIZE; c++) {
      if (r === 0) b[r][c] = START[c];
      else if (r === 1) b[r][c] = "p";
      else if (r === 6) b[r][c] = "P";
      else if (r === 7) b[r][c] = START[c].toUpperCase();
      else b[r][c] = null;
    }
  }
  return b;
}

function findKing(board: Board, white: boolean): { r: number; c: number } | null {
  const k = white ? "K" : "k";
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++) if (board[r][c] === k) return { r, c };
  return null;
}

function isSquareAttacked(board: Board, r: number, c: number, byWhite: boolean): boolean {
  // Pawns
  const dir = byWhite ? 1 : -1;
  for (const dc of [-1, 1]) {
    const pr = r + dir;
    const pc = c + dc;
    if (inBounds(pr, pc)) {
      const t = board[pr][pc];
      if (t && isUpper(t) === byWhite && t.toUpperCase() === "P") return true;
    }
  }
  // Knights
  for (const [dr, dc] of [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]]) {
    const nr = r + dr, nc = c + dc;
    if (inBounds(nr, nc)) {
      const t = board[nr][nc];
      if (t && isUpper(t) === byWhite && t.toUpperCase() === "N") return true;
    }
  }
  // King
  for (let dr = -1; dr <= 1; dr++)
    for (let dc = -1; dc <= 1; dc++) {
      if (!dr && !dc) continue;
      const nr = r + dr, nc = c + dc;
      if (inBounds(nr, nc)) {
        const t = board[nr][nc];
        if (t && isUpper(t) === byWhite && t.toUpperCase() === "K") return true;
      }
    }
  // Sliding: bishop/queen diagonals, rook/queen straight
  const lines: [number, number, string[]][] = [
    [-1, -1, ["B", "Q"]], [-1, 1, ["B", "Q"]], [1, -1, ["B", "Q"]], [1, 1, ["B", "Q"]],
    [-1, 0, ["R", "Q"]], [1, 0, ["R", "Q"]], [0, -1, ["R", "Q"]], [0, 1, ["R", "Q"]],
  ];
  for (const [dr, dc, kinds] of lines) {
    for (let step = 1; step < SIZE; step++) {
      const nr = r + dr * step, nc = c + dc * step;
      if (!inBounds(nr, nc)) break;
      const t = board[nr][nc];
      if (t) {
        if (isUpper(t) === byWhite && kinds.includes(t.toUpperCase())) return true;
        break;
      }
    }
  }
  return false;
}

function isInCheck(board: Board, white: boolean): boolean {
  const k = findKing(board, white);
  return k ? isSquareAttacked(board, k.r, k.c, !white) : true;
}

function pseudoMoves(board: Board, r: number, c: number): [number, number][] {
  const p = board[r][c];
  if (!p) return [];
  const isWhite = isUpper(p);
  const moves: [number, number][] = [];
  const type = p.toUpperCase();

  if (type === "P") {
    const dir = isWhite ? -1 : 1;
    const startRow = isWhite ? 6 : 1;
    if (inBounds(r + dir, c) && !board[r + dir][c]) {
      moves.push([r + dir, c]);
      if (r === startRow && !board[r + 2 * dir][c]) moves.push([r + 2 * dir, c]);
    }
    for (const dc of [-1, 1]) {
      const nr = r + dir, nc = c + dc;
      if (inBounds(nr, nc) && board[nr][nc] && isUpper(board[nr][nc]) !== isWhite)
        moves.push([nr, nc]);
    }
  } else if (type === "N") {
    for (const [dr, dc] of [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]]) {
      const nr = r + dr, nc = c + dc;
      if (isEmptyOrEnemy(board, nr, nc, isWhite)) moves.push([nr, nc]);
    }
  } else if (type === "K") {
    for (let dr = -1; dr <= 1; dr++)
      for (let dc = -1; dc <= 1; dc++) {
        if (dr || dc) {
          const nr = r + dr, nc = c + dc;
          if (isEmptyOrEnemy(board, nr, nc, isWhite)) moves.push([nr, nc]);
        }
      }
  } else {
    const dirs =
      type === "B"
        ? [[-1, -1], [-1, 1], [1, -1], [1, 1]]
        : type === "R"
          ? [[-1, 0], [1, 0], [0, -1], [0, 1]]
          : [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    for (const [dr, dc] of dirs) {
      for (let step = 1; step < SIZE; step++) {
        const nr = r + dr * step, nc = c + dc * step;
        if (!inBounds(nr, nc)) break;
        if (!board[nr][nc]) moves.push([nr, nc]);
        else {
          if (isUpper(board[nr][nc]) !== isWhite) moves.push([nr, nc]);
          break;
        }
      }
    }
  }
  return moves;
}

function legalMovesFrom(board: Board, r: number, c: number): [number, number][] {
  const p = board[r][c];
  if (!p) return [];
  const isWhite = isUpper(p);
  return pseudoMoves(board, r, c).filter(([nr, nc]) => {
    const nb: Board = board.map((row) => [...row]);
    nb[nr][nc] = p;
    nb[r][c] = null;
    return !isInCheck(nb, isWhite);
  });
}

function allLegalMoves(board: Board, white: boolean): number {
  let count = 0;
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++) {
      const p = board[r][c];
      if (p && isUpper(p) === white) count += legalMovesFrom(board, r, c).length;
    }
  return count;
}

function draw() {
  const boardEl = el("chess-board");
  if (!boardEl) return;
  boardEl.innerHTML = "";
  const validMoves =
    selected && !gameOver ? legalMovesFrom(board, selected.r, selected.c) : [];
  const inCheck = isInCheck(board, turn === "w");

  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const sq = document.createElement("div");
      sq.className = "relative cursor-pointer";
      sq.dataset.r = String(r);
      sq.dataset.c = String(c);
      sq.style.background = SQUARES[(r + c) % 2];
      sq.addEventListener("click", () => handleClick(r, c));

      const p = board[r][c];
      if (p) {
        const isWhite = isUpper(p);
        const span = document.createElement("span");
        span.className = "absolute inset-0 flex items-center justify-center text-2xl sm:text-3xl select-none";
        span.style.color = isWhite ? "#f7f7f7" : "#101010";
        span.style.textShadow = isWhite
          ? "0 1px 2px rgba(0,0,0,.6)"
          : "0 1px 1px rgba(255,255,255,.4)";
        span.textContent = PIECES[p];
        sq.appendChild(span);
      }

      const isKing = p === (turn === "w" ? "K" : "k");
      if (selected && selected.r === r && selected.c === c) {
        sq.style.outline = "3px solid #00ffd8";
        sq.style.outlineOffset = "-3px";
        sq.style.background = "rgba(0,255,216,0.18)";
      } else if (validMoves.some((m) => m[0] === r && m[1] === c)) {
        sq.style.background = "rgba(0,255,216,0.22)";
        const dot = document.createElement("div");
        dot.style.cssText =
          "position:absolute;top:50%;left:50%;width:12px;height:12px;background:#00ffd8;border-radius:50%;transform:translate(-50%,-50%)";
        sq.appendChild(dot);
      } else if (isKing && inCheck) {
        sq.style.boxShadow = "inset 0 0 0 3px #ff3b3b";
      }

      boardEl.appendChild(sq);
    }
  }
}

function handleClick(r: number, c: number) {
  sound.click();
  if (gameOver) return;

  if (!selected) {
    const p = board[r][c];
    if (p && isUpper(p) === (turn === "w")) {
      selected = { r, c };
      draw();
    }
    return;
  }

  const validMoves = legalMovesFrom(board, selected.r, selected.c);
  const move = validMoves.find((m) => m[0] === r && m[1] === c);

  if (move) {
    const moving = board[selected.r][selected.c]!;
    board[r][c] = moving;
    board[selected.r][selected.c] = null;
    // Promotion to queen on the last rank.
    if (moving.toUpperCase() === "P" && (r === 0 || r === SIZE - 1)) {
      board[r][c] = turn === "w" ? "Q" : "q";
    }
    sound.click();
    selected = null;
    turn = turn === "w" ? "b" : "w";

    const inCheckNow = isInCheck(board, turn === "w");
    const movesLeft = allLegalMoves(board, turn === "w");

    if (movesLeft === 0) {
      gameOver = true;
      const winner = inCheckNow ? (turn === "w" ? "Black" : "White") : null;
      if (winner) {
        sound.win();
        showOverlay(`${winner} wins by checkmate!`, "Reset to play another match.");
      } else {
        sound.win();
        showOverlay("Stalemate — draw.", "No legal moves and not in check.");
      }
      draw();
      return;
    }

    const status = el("status");
    if (status)
      status.textContent = `${turn === "w" ? "White" : "Black"} to move${inCheckNow ? " — check!" : ""}`;
    draw();
  } else if (board[r][c] && isUpper(board[r][c]) === (turn === "w")) {
    selected = { r, c };
    draw();
  } else {
    selected = null;
    draw();
  }
}

function reset() {
  board = initBoard();
  selected = null;
  turn = "w";
  gameOver = false;
  hideOverlay();
  const status = el("status");
  if (status) status.textContent = "White to move";
  draw();
}

export function initGame() {
  onReset(reset);
  reset();
}
