import {
  el,
  onReset,
  showOverlay,
  hideOverlay,
  sound,
} from "../../../shared/utils";

// Dots and Boxes — two-player. Draw a line to close squares; closing one grants
// another turn. Most squares wins.

const N = 4;
const GAP = 70;
const START = 36;
const SIZE = START * 2 + (N - 1) * GAP;

let hLines: (number | null)[][];
let vLines: (number | null)[][];
let boxes: (number | null)[][];
let current: number;
let scores: { 1: number; 2: number };
let gameOver: boolean;

const color = (p: number) => (p === 1 ? "#19a0ff" : "#ff4d4d");

function init() {
  hLines = Array.from({ length: N }, () => Array(N - 1).fill(null));
  vLines = Array.from({ length: N - 1 }, () => Array(N).fill(null));
  boxes = Array.from({ length: N - 1 }, () => Array(N - 1).fill(null));
  current = 1;
  scores = { 1: 0, 2: 0 };
  gameOver = false;
  const turnEl = el("turn");
  if (turnEl) turnEl.textContent = "Player 1's turn";
  const p1 = el("p1-score");
  const p2 = el("p2-score");
  if (p1) p1.textContent = "P1: 0";
  if (p2) p2.textContent = "P2: 0";
  const status = el("status");
  if (status) status.textContent = "";
  hideOverlay();
  draw();
}

function draw() {
  const gameEl = el("dots");
  if (!gameEl) return;
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", String(SIZE));
  svg.setAttribute("height", String(SIZE));
  svg.setAttribute("viewBox", `0 0 ${SIZE} ${SIZE}`);
  svg.style.maxWidth = "100%";
  svg.style.height = "auto";

  for (let r = 0; r < N - 1; r++) {
    for (let c = 0; c < N - 1; c++) {
      if (boxes[r][c]) {
        const rect = document.createElementNS(svgNS, "rect");
        rect.setAttribute("x", String(START + c * GAP + 6));
        rect.setAttribute("y", String(START + r * GAP + 6));
        rect.setAttribute("width", String(GAP - 12));
        rect.setAttribute("height", String(GAP - 12));
        rect.setAttribute("rx", "4");
        rect.setAttribute("fill", color(boxes[r][c]!));
        rect.setAttribute("opacity", "0.35");
        svg.appendChild(rect);
        const t = document.createElementNS(svgNS, "text");
        t.setAttribute("x", String(START + c * GAP + GAP / 2));
        t.setAttribute("y", String(START + r * GAP + GAP / 2 + 6));
        t.setAttribute("text-anchor", "middle");
        t.setAttribute("font-size", "18");
        t.setAttribute("font-family", "monospace");
        t.setAttribute("fill", color(boxes[r][c]!));
        t.textContent = "P" + boxes[r][c];
        svg.appendChild(t);
      }
    }
  }

  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const dot = document.createElementNS(svgNS, "circle");
      dot.setAttribute("cx", String(START + c * GAP));
      dot.setAttribute("cy", String(START + r * GAP));
      dot.setAttribute("r", "4");
      dot.setAttribute("fill", "#ffffff");
      svg.appendChild(dot);
    }
  }

  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N - 1; c++) {
      const taken = hLines[r][c];
      const x1 = START + c * GAP, x2 = START + (c + 1) * GAP, y = START + r * GAP;
      const line = document.createElementNS(svgNS, "line");
      line.setAttribute("x1", String(x1));
      line.setAttribute("y1", String(y));
      line.setAttribute("x2", String(x2));
      line.setAttribute("y2", String(y));
      line.setAttribute("stroke", taken ? color(taken) : "rgba(255,255,255,0.25)");
      line.setAttribute("stroke-width", taken ? "4" : "2");
      svg.appendChild(line);
      if (!taken) {
        const hit = document.createElementNS(svgNS, "rect");
        hit.setAttribute("x", String(x1));
        hit.setAttribute("y", String(y - 10));
        hit.setAttribute("width", String(GAP));
        hit.setAttribute("height", "20");
        hit.setAttribute("fill", "transparent");
        hit.style.cursor = "pointer";
        hit.addEventListener("click", () => claimH(r, c));
        svg.appendChild(hit);
      }
    }
  }

  for (let c = 0; c < N; c++) {
    for (let r = 0; r < N - 1; r++) {
      const taken = vLines[r][c];
      const x = START + c * GAP, y1 = START + r * GAP, y2 = START + (r + 1) * GAP;
      const line = document.createElementNS(svgNS, "line");
      line.setAttribute("x1", String(x));
      line.setAttribute("y1", String(y1));
      line.setAttribute("x2", String(x));
      line.setAttribute("y2", String(y2));
      line.setAttribute("stroke", taken ? color(taken) : "rgba(255,255,255,0.25)");
      line.setAttribute("stroke-width", taken ? "4" : "2");
      svg.appendChild(line);
      if (!taken) {
        const hit = document.createElementNS(svgNS, "rect");
        hit.setAttribute("x", String(x - 10));
        hit.setAttribute("y", String(y1));
        hit.setAttribute("width", "20");
        hit.setAttribute("height", String(GAP));
        hit.setAttribute("fill", "transparent");
        hit.style.cursor = "pointer";
        hit.addEventListener("click", () => claimV(r, c));
        svg.appendChild(hit);
      }
    }
  }

  gameEl.innerHTML = "";
  gameEl.appendChild(svg);
}

function boxesAround(r: number, c: number): [number, number][] {
  const res: [number, number][] = [];
  if (r > 0) res.push([r - 1, c]);
  if (r < N - 1) res.push([r, c]);
  return res;
}
function boxesAroundV(r: number, c: number): [number, number][] {
  const res: [number, number][] = [];
  if (c > 0) res.push([r, c - 1]);
  if (c < N - 1) res.push([r, c]);
  return res;
}

function isComplete(bR: number, bC: number) {
  return (
    hLines[bR][bC] &&
    hLines[bR + 1][bC] &&
    vLines[bR][bC] &&
    vLines[bR][bC + 1]
  );
}

function claimH(r: number, c: number) {
  sound.click();
  if (gameOver || hLines[r][c]) return;
  hLines[r][c] = current;
  finishTurn(boxesAround(r, c));
}
function claimV(r: number, c: number) {
  sound.click();
  if (gameOver || vLines[r][c]) return;
  vLines[r][c] = current;
  finishTurn(boxesAroundV(r, c));
}

function finishTurn(adjacent: [number, number][]) {
  let scored = false;
  for (const [bR, bC] of adjacent) {
    if (!boxes[bR][bC] && isComplete(bR, bC)) {
      boxes[bR][bC] = current;
      scores[current]++;
      scored = true;
    }
  }
  sound.click();
  const p1 = el("p1-score");
  const p2 = el("p2-score");
  if (p1) p1.textContent = "P1: " + scores[1];
  if (p2) p2.textContent = "P2: " + scores[2];

  if (scores[1] + scores[2] === (N - 1) * (N - 1)) {
    gameOver = true;
    const winner =
      scores[1] === scores[2]
        ? "Draw!"
        : scores[1] > scores[2]
          ? "Player 1 wins!"
          : "Player 2 wins!";
    sound.win();
    const status = el("status");
    if (status) status.textContent = winner + `  (${scores[1]}-${scores[2]})`;
    showOverlay(winner, `Final score — Player 1: ${scores[1]} · Player 2: ${scores[2]}.`);
    return;
  }

  if (!scored) current = current === 1 ? 2 : 1;
  const turnEl = el("turn");
  if (turnEl) turnEl.textContent = "Player " + current + "'s turn";
  draw();
}

export function initGame() {
  onReset(init);
  init();
}
