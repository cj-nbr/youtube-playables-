import {
  el,
  onReset,
  showOverlay,
  hideOverlay,
  sound,
  getGameArea,
  getHighScore,
  setHighScore,
  randInt,
} from "../../../shared/utils";

type Tile = { r: number; c: number; correctR: number; correctC: number };

let tiles: (Tile | null)[][] = [];
let blankR = 0;
let blankC = 0;
let size = 4;
let moves = 0;
let timerStart = 0;
let timerHandle: number | null = null;
let best = 0;
let cachedImg: HTMLCanvasElement | null = null;

function generateImage(): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  const s = 512;
  canvas.width = s;
  canvas.height = s;
  const ctx = canvas.getContext("2d")!;
  const g1 = ctx.createLinearGradient(0, 0, s, s);
  g1.addColorStop(0, "#ff6b6b");
  g1.addColorStop(0.5, "#feca57");
  g1.addColorStop(1, "#48dbfb");
  ctx.fillStyle = g1;
  ctx.fillRect(0, 0, s, s);

  const g2 = ctx.createRadialGradient(s * 0.3, s * 0.3, s * 0.05, s * 0.5, s * 0.5, s * 0.7);
  g2.addColorStop(0, "rgba(255,255,255,0.4)");
  g2.addColorStop(1, "rgba(0,0,0,0.1)");
  ctx.fillStyle = g2;
  ctx.fillRect(0, 0, s, s);

  for (let i = 0; i < 8; i++) {
    ctx.beginPath();
    ctx.arc(randInt(40, s - 40), randInt(40, s - 40), randInt(30, 90), 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${randInt(10, 30) / 100})`;
    ctx.fill();
  }

  for (let i = 0; i < 40; i++) {
    ctx.fillStyle = `rgba(0,0,0,${randInt(5, 20) / 100})`;
    const w = randInt(40, 120);
    const h = randInt(4, 12);
    ctx.fillRect(randInt(0, s - w), randInt(0, s - h), w, h);
  }

  return canvas;
}

function getImageDataURL(): string {
  if (!cachedImg) cachedImg = generateImage();
  return cachedImg.toDataURL();
}

function buildBoard() {
  const grid: (Tile | null)[][] = [];
  for (let r = 0; r < size; r++) {
    grid[r] = [];
    for (let c = 0; c < size; c++) {
      if (r === size - 1 && c === size - 1) {
        grid[r][c] = null;
        blankR = r;
        blankC = c;
      } else {
        grid[r][c] = { r, c, correctR: r, correctC: c };
      }
    }
  }
  return grid;
}

function isSolved() {
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const t = tiles[r][c];
      if (r === size - 1 && c === size - 1) {
        if (t !== null) return false;
      } else {
        if (!t || t.correctR !== r || t.correctC !== c) return false;
      }
    }
  }
  return true;
}

function shuffleBoard() {
  tiles = buildBoard();
  const totalMoves = randInt(60, 120);
  let pr = blankR;
  let pc = blankC;
  for (let i = 0; i < totalMoves; i++) {
    const neighbors: { r: number; c: number }[] = [];
    if (pr > 0) neighbors.push({ r: pr - 1, c: pc });
    if (pr < size - 1) neighbors.push({ r: pr + 1, c: pc });
    if (pc > 0) neighbors.push({ r: pr, c: pc - 1 });
    if (pc < size - 1) neighbors.push({ r: pr, c: pc + 1 });
    const pick = neighbors[randInt(0, neighbors.length - 1)];
    tiles[pr][pc] = tiles[pick.r][pick.c];
    tiles[pick.r][pick.c] = null;
    pr = pick.r;
    pc = pick.c;
  }
  blankR = pr;
  blankC = pc;
  moves = 0;
  timerStart = Date.now();
}

function draw() {
  const root = el("jigsaw");
  if (!root) return;
  root.innerHTML = "";
  const area = getGameArea();
  const maxW = Math.min(420, area.w);
  const padding = 120;
  const tilePx = Math.max(50, Math.floor((maxW - padding) / size));
  const gap = 3;

  const imgURL = getImageDataURL();
  const imgSize = 512;
  const tileImgSize = imgSize / size;

  root.style.display = "flex";
  root.style.flexDirection = "row";
  root.style.alignItems = "center";
  root.style.justifyContent = "center";
  root.style.gap = "16px";
  root.style.flexWrap = "wrap";

  const board = document.createElement("div");
  board.style.display = "grid";
  board.style.gridTemplateColumns = `repeat(${size}, ${tilePx}px)`;
  board.style.gridTemplateRows = `repeat(${size}, ${tilePx}px)`;
  board.style.gap = gap + "px";

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const slot = document.createElement("div");
      slot.style.width = tilePx + "px";
      slot.style.height = tilePx + "px";
      slot.style.background = "#1a1a1a";
      slot.style.borderRadius = "4px";
      slot.style.overflow = "hidden";
      slot.style.position = "relative";

      const t = tiles[r][c];
      if (t) {
        const pctX = (t.correctC / size) * 100;
        const pctY = (t.correctR / size) * 100;
        const pctS = 100 / size;
        slot.style.backgroundImage = `url(${imgURL})`;
        slot.style.backgroundSize = `${size * 100}% ${size * 100}%`;
        slot.style.backgroundPosition = `${pctX}% ${pctY}%`;
        slot.addEventListener("click", () => onTileClick(r, c));
      } else {
        slot.style.background = "#111";
        slot.style.border = "2px dashed #333";
      }
      board.appendChild(slot);
    }
  }
  root.appendChild(board);

  const sidebar = document.createElement("div");
  sidebar.style.display = "flex";
  sidebar.style.flexDirection = "column";
  sidebar.style.gap = "10px";

  const refCanvas = document.createElement("canvas");
  refCanvas.width = 120;
  refCanvas.height = 120;
  const ctx = refCanvas.getContext("2d")!;
  const cached = cachedImg || generateImage();
  ctx.drawImage(cached, 0, 0, imgSize, imgSize, 0, 0, 120, 120);
  refCanvas.style.borderRadius = "8px";
  refCanvas.style.border = "2px solid rgba(255,255,255,0.1)";
  sidebar.appendChild(refCanvas);

  const label = document.createElement("div");
  label.style.color = "#fff";
  label.style.fontFamily = "ui-monospace, monospace";
  label.style.fontSize = "13px";
  const elapsed = Math.max(0, Math.floor((Date.now() - timerStart) / 1000));
  label.textContent = `Moves: ${moves} · Time: ${elapsed}s · Best: ${best}`;
  sidebar.appendChild(label);

  root.appendChild(sidebar);

  const status = el("status");
  if (status) status.textContent = `Moves: ${moves} · Best: ${best}`;
}

function onTileClick(r: number, c: number) {
  if (Math.abs(r - blankR) + Math.abs(c - blankC) !== 1) return;
  tiles[blankR][blankC] = tiles[r][c];
  tiles[r][c] = null;
  blankR = r;
  blankC = c;
  moves++;
  sound.click();
  draw();
  if (isSolved()) {
    const elapsed = Math.floor((Date.now() - timerStart) / 1000);
    const scoreValue = Math.max(1000 - elapsed * 5 - moves * 2, 100);
    best = setHighScore("jigsaw", scoreValue);
    sound.win();
    showOverlay("Puzzle solved!", `Moves: ${moves} · Time: ${elapsed}s · Score: ${scoreValue} · Best: ${best}`);
  }
}

function reset() {
  size = 4;
  shuffleBoard();
  cachedImg = generateImage();
  hideOverlay();
  draw();
  if (timerHandle) clearInterval(timerHandle);
  timerHandle = window.setInterval(() => {
    const status = el("status");
    const elapsed = Math.max(0, Math.floor((Date.now() - timerStart) / 1000));
    if (status) status.textContent = `Moves: ${moves} · Time: ${elapsed}s · Best: ${best}`;
  }, 500);
  const htmlStatus = el("status");
  if (htmlStatus) htmlStatus.textContent = `Moves: 0 · Best: ${best}`;
}

export function initGame() {
  onReset(reset);
  reset();
}
