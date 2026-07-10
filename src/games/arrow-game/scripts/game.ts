import { el, onReset, showOverlay, hideOverlay, sound } from "../../../shared/utils";

// Tic Tac Toe — 3×3, two local players, X moves first.
// Status is reported through the shared #status element; wins/draws use the
// shared game-over overlay so "Play again" triggers a clean reset.

const WIN_PATTERNS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

let board: (string | null)[];
let current: string;
let over: boolean;

function init() {
  board = Array(9).fill(null);
  current = "X";
  over = false;
  const status = el("status");
  if (status) status.textContent = "X's turn";
  render();
}

function render() {
  const cells = document.querySelectorAll<HTMLButtonElement>(".ttt-cell");
  cells.forEach((cell) => {
    const i = Number(cell.dataset.i);
    cell.textContent = board[i] ?? "";
    cell.setAttribute(
      "aria-label",
      `Cell ${i + 1}${board[i] ? ", " + board[i] : ", empty"}`
    );
    cell.disabled = over || board[i] !== null;
  });
}

function checkWin(player: string): number[] | null {
  for (const combo of WIN_PATTERNS) {
    if (combo.every((i) => board[i] === player)) return combo;
  }
  return null;
}

function handleClick(e: Event) {
  sound.click();
  const target = e.currentTarget as HTMLButtonElement;
  const i = Number(target.dataset.i);
  if (over || board[i]) return;

  board[i] = current;
  sound.click();

  const win = checkWin(current);
  if (win) {
    over = true;
    sound.win();
    render();
    showOverlay(`${current} wins!`, "Three in a row. Hit play again for a rematch.");
    return;
  }
  if (board.every((c) => c !== null)) {
    over = true;
    render();
    showOverlay("Draw!", "The board is full. No winner this time.");
    return;
  }
  current = current === "X" ? "O" : "X";
  const status = el("status");
  if (status) status.textContent = `${current}'s turn`;
  render();
}

export function initGame() {
  const cells = document.querySelectorAll<HTMLButtonElement>(".ttt-cell");
  cells.forEach((c) => c.addEventListener("click", handleClick));
  onReset(init);
  init();
}
