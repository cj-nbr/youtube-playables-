import {
  el,
  onReset,
  showOverlay,
  hideOverlay,
  sound,
  getHighScore,
  setHighScore,
  shuffle,
  randInt,
} from "../../../shared/utils";

const BOARD_ID = "shipfind";
const SIZE = 10;

type Cell = { ship: number | null; hit: boolean; miss: boolean };
type Ship = { id: number; length: number; hits: number; sunk: boolean };

const SHIPS = [5, 4, 3, 2, 2];

let playerBoard: Cell[][] = [];
let enemyBoard: Cell[][] = [];
let playerShips: Ship[] = [];
let enemyShips: Ship[] = [];
let phase: "setup" | "player" | "enemy" | "over" = "setup";
let shots = 0;
let best = 0;
let placingLength = 0;
let placingH = true;
let selectedShipIdx = 0;

function emptyBoard(): Cell[][] {
  return Array.from({ length: SIZE }, () =>
    Array.from({ length: SIZE }, () => ({ ship: null, hit: false, miss: false }))
  );
}

function placeShip(board: Cell[][], length: number): boolean {
  const h = randInt(0, 1) === 0;
  const r = randInt(0, SIZE - 1);
  const c = randInt(0, SIZE - 1);
  for (let attempt = 0; attempt < 200; attempt++) {
    const row = randInt(0, SIZE - 1);
    const col = randInt(0, SIZE - 1);
    const dir = randInt(0, 1) === 0;
    let ok = true;
    for (let i = 0; i < length; i++) {
      const rr = dir ? row + i : row;
      const cc = dir ? col : col + i;
      if (rr >= SIZE || cc >= SIZE || board[rr][cc].ship !== null) {
        ok = false;
        break;
      }
    }
    if (ok) {
      const id = Date.now() + Math.random();
      for (let i = 0; i < length; i++) {
        const rr = dir ? row + i : row;
        const cc = dir ? col : col + i;
        board[rr][cc].ship = id;
      }
      return true;
    }
  }
  return false;
}

function setupBoards() {
  playerBoard = emptyBoard();
  enemyBoard = emptyBoard();
  playerShips = [];
  enemyShips = [];
  SHIPS.forEach((len) => {
    if (placeShip(playerBoard, len)) {
      playerShips.push({ id: playerBoard.flat().find((c) => c.ship !== null && !playerShips.some(s => s.id === c.ship))?.ship ?? Date.now() + Math.random(), length: len, hits: 0, sunk: false });
    }
    if (placeShip(enemyBoard, len)) {
      enemyShips.push({ id: enemyBoard.flat().find((c) => c.ship !== null && !enemyShips.some(s => s.id === c.ship))?.ship ?? Date.now() + Math.random(), length: len, hits: 0, sunk: false });
    }
  });
  playerShips.forEach((s, i) => {
    const cell = playerBoard.flat().find((c) => c.ship === s.id);
    if (cell) s.id = cell.ship as number;
  });
  enemyShips.forEach((s, i) => {
    const cell = enemyBoard.flat().find((c) => c.ship === s.id);
    if (cell) s.id = cell.ship as number;
  });
}

function draw() {
  const gameEl = el(BOARD_ID);
  if (!gameEl) return;
  gameEl.innerHTML = "";
  const area = getGameArea();
  const maxW = Math.min(area.w, 600);
  const gap = 2;
  const cellSize = Math.floor((maxW - gap * (SIZE + 1)) / (SIZE * 2 + 1));
  const boardW = SIZE * cellSize + (SIZE - 1) * gap;

  const wrap = document.createElement("div");
  wrap.style.display = "flex";
  wrap.style.flexWrap = "wrap";
  wrap.style.gap = "16px";
  wrap.style.justifyContent = "center";

  function makeBoard(label: string, board: Cell[][], clickable: boolean, isPlayer: boolean) {
    const col = document.createElement("div");
    col.style.display = "flex";
    col.style.flexDirection = "column";
    col.style.alignItems = "center";

    const title = document.createElement("div");
    title.className = "font-mono text-xs text-white/70 mb-1";
    title.textContent = label;
    col.appendChild(title);

    const grid = document.createElement("div");
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = `repeat(${SIZE}, ${cellSize}px)`;
    grid.style.gap = gap + "px";

    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        const cell = document.createElement("div");
        cell.style.width = cellSize + "px";
        cell.style.height = cellSize + "px";
        cell.style.borderRadius = "4px";
        cell.style.background = "rgba(255,255,255,.06)";
        cell.style.border = "1px solid rgba(255,255,255,.12)";

        const b = board[r][c];
        if (b.hit) {
          cell.style.background = "rgba(255,80,80,.35)";
          cell.innerHTML = `<svg width="${cellSize * 0.5}" height="${cellSize * 0.5}" viewBox="0 0 24 24"><path d="M12 2 L22 22 L2 22 Z" fill="rgba(255,120,120,.7)"/></svg>`;
        } else if (b.miss) {
          cell.style.background = "rgba(255,255,255,.03)";
          cell.innerHTML = `<svg width="${cellSize * 0.25}" height="${cellSize * 0.25}" viewBox="0 0 24 24"><circle cx="12" cy="12" r="6" fill="rgba(255,255,255,.3)"/></svg>`;
        } else if (isPlayer && b.ship !== null) {
          cell.style.background = "rgba(80,160,255,.2)";
          cell.innerHTML = `<svg width="${cellSize * 0.5}" height="${cellSize * 0.5}" viewBox="0 0 24 24"><rect x="4" y="8" width="16" height="8" rx="2" fill="rgba(120,180,255,.6)"/></svg>`;
        }

        if (clickable && phase === "player" && !b.hit && !b.miss) {
          cell.style.cursor = "pointer";
          cell.addEventListener("click", () => fire(r, c));
        }

        grid.appendChild(cell);
      }
    }
    col.appendChild(grid);
    return col;
  }

  wrap.appendChild(makeBoard("Your fleet", playerBoard, false, true));
  wrap.appendChild(makeBoard("Enemy waters", enemyBoard, true, false));

  const info = document.createElement("div");
  info.style.width = "100%";
  info.style.textAlign = "center";

  const turnInfo = document.createElement("div");
  turnInfo.className = "font-mono text-xs text-white/70 mt-2";
  if (phase === "setup") {
    turnInfo.textContent = "Place your ships on the left board, then press Start Battle.";
  } else if (phase === "player") {
    turnInfo.textContent = "Your turn — click a cell on the right board to fire.";
  } else if (phase === "enemy") {
    turnInfo.textContent = "Enemy is firing...";
  } else if (phase === "over") {
    turnInfo.textContent = "";
  }
  info.appendChild(turnInfo);

  const startBtn = document.createElement("button");
  startBtn.className = "mt-2 h-9 rounded-md bg-white/10 px-4 text-sm text-white hover:bg-white/20";
  startBtn.textContent = phase === "setup" ? "Start Battle" : "New Game";
  startBtn.addEventListener("click", reset);
  info.appendChild(startBtn);

  gameEl.appendChild(wrap);
  gameEl.appendChild(info);
}

function fire(row: number, col: number) {
  if (phase !== "player") return;
  const cell = enemyBoard[row][col];
  if (cell.hit || cell.miss) return;

  sound.click();
  shots++;
  if (cell.ship !== null) {
    cell.hit = true;
    sound.success();
    const ship = enemyShips.find((s) => s.id === cell.ship);
    if (ship) {
      ship.hits++;
      if (ship.hits >= ship.length) ship.sunk = true;
      if (enemyShips.every((s) => s.sunk)) {
        phase = "over";
        best = setHighScore("shipfind", shots, true);
        showOverlay("Victory", `You sank the fleet in ${shots} shots. Best: ${best}.`);
        draw();
        return;
      }
    }
  } else {
    cell.miss = true;
    sound.error();
  }
  draw();
  phase = "enemy";
  setTimeout(enemyTurn, 500);
}

function enemyTurn() {
  if (phase !== "enemy") return;
  let row: number, col: number;
  let tries = 0;
  do {
    row = randInt(0, SIZE - 1);
    col = randInt(0, SIZE - 1);
    tries++;
  } while ((playerBoard[row][col].hit || playerBoard[row][col].miss) && tries < 500);

  const cell = playerBoard[row][col];
  if (cell.ship !== null) {
    cell.hit = true;
    sound.error();
    const ship = playerShips.find((s) => s.id === cell.ship);
    if (ship) {
      ship.hits++;
      if (ship.hits >= ship.length) ship.sunk = true;
      if (playerShips.every((s) => s.sunk)) {
        phase = "over";
        showOverlay("Defeat", `Your fleet was sunk in ${shots} shots.`);
        draw();
        return;
      }
    }
  } else {
    cell.miss = true;
    sound.click();
  }
  draw();
  if (phase === "enemy") {
    phase = "player";
    const status = el("status");
    if (status) status.textContent = `Shots fired: ${shots}`;
  }
}

function reset() {
  shots = 0;
  phase = "setup";
  best = getHighScore("shipfind");
  setupBoards();
  phase = "player";
  draw();
  const status = el("status");
  if (status) status.textContent = `Shots: 0  Best: ${best}`;
  hideOverlay();
}

export function initGame() {
  onReset(reset);
  reset();
}
