import {
  el,
  onReset,
  showOverlay,
  hideOverlay,
  sound,
  getGameArea,
  getHighScore,
  setHighScore,
  shuffle,
  randInt,
  clamp,
  colorDistance,
} from "../../../shared/utils";

  const BOARD_ID = "match-the-feel-board";
const ROUND_SECONDS = 90;
const BASE_SCORE = 100;
const TIME_BONUS_MAX = 50;
const PENALTY = 25;

const SHAPES = ["circle", "square", "triangle", "diamond", "star", "heart"];

const PALETTE_COLORS: { r: number; g: number; b: number }[] = [
  { r: 220, g: 60, b: 60 },
  { r: 60, g: 180, b: 75 },
  { r: 60, g: 120, b: 220 },
  { r: 220, g: 160, b: 40 },
  { r: 180, g: 60, b: 220 },
  { r: 40, g: 200, b: 200 },
];

let targets: { shape: string; colorIndex: number; filled: boolean }[];
let palette: { shape: string; colorIndex: number; el: HTMLElement }[];
let combo = 0;
let score = 0;
let best = 0;
let timeLeft = ROUND_SECONDS;
let timerHandle: number | null = null;
let dragging: { shape: string; colorIndex: number; ghost: HTMLElement } | null = null;

function hex(c: { r: number; g: number; b: number }) {
  return (
    "#" +
    [c.r, c.g, c.b]
      .map((x) => clamp(Math.round(x), 0, 255).toString(16).padStart(2, "0"))
      .join("")
  );
}

function createRound() {
  const area = getGameArea();
  const maxTargets = clamp(Math.floor(area.w / 80), 3, 6);
  const numTargets = maxTargets;
  const shuffled = shuffle(
    SHAPES.map((s, i) => ({ shape: s, colorIndex: i }))
  );
  const chosen = shuffled.slice(0, numTargets);
  const extra = shuffle(
    SHAPES.map((s, i) => ({ shape: s, colorIndex: i }))
  ).filter((x) => !chosen.some((c) => c.shape === x.shape && c.colorIndex === x.colorIndex));
  const paletteItems = shuffle([...chosen, ...extra.slice(0, numTargets)]);

  targets = chosen.map((t) => ({ ...t, filled: false }));
  palette = paletteItems.map((p) => ({ ...p, el: null as unknown as HTMLElement }));
  combo = 0;
  score = 0;
  timeLeft = ROUND_SECONDS;
}

function render() {
  const gameEl = el(BOARD_ID);
  if (!gameEl) return;
  gameEl.innerHTML = "";
  const area = getGameArea();
  const w = Math.min(area.w, 520);
  gameEl.style.width = w + "px";
  gameEl.style.margin = "0 auto";

  const topRow = document.createElement("div");
  topRow.style.display = "flex";
  topRow.style.justifyContent = "space-between";
  topRow.style.alignItems = "center";
  topRow.style.marginBottom = "8px";
  topRow.style.padding = "0 4px";

  const scoreEl = document.createElement("div");
  scoreEl.className = "font-mono text-sm text-white/80";
  scoreEl.textContent = `Score: ${score}  Best: ${best}`;
  topRow.appendChild(scoreEl);

  const timerEl = document.createElement("div");
  timerEl.className = "font-mono text-sm text-white/80";
  timerEl.textContent = `Time: ${timeLeft}s`;
  topRow.appendChild(timerEl);

  const comboEl = document.createElement("div");
  comboEl.className = "font-mono text-sm text-white/80";
  comboEl.textContent = combo > 1 ? `Combo x${combo}` : "";
  topRow.appendChild(comboEl);

  gameEl.appendChild(topRow);

  const targetRow = document.createElement("div");
  targetRow.style.display = "flex";
  targetRow.style.flexWrap = "wrap";
  targetRow.style.gap = "8px";
  targetRow.style.justifyContent = "center";
  targetRow.style.marginBottom = "12px";

  const cellSize = Math.min((w - 24) / targets.length - 8, 70);

  targets.forEach((t, idx) => {
    const cell = document.createElement("div");
    cell.style.width = cellSize + "px";
    cell.style.height = cellSize + "px";
    cell.style.borderRadius = "12px";
    cell.style.border = t.filled ? "2px solid rgba(255,255,255,.1)" : "2px dashed rgba(255,255,255,.35)";
    cell.style.background = t.filled ? "rgba(255,255,255,.06)" : "rgba(255,255,255,.03)";
    cell.style.display = "flex";
    cell.style.alignItems = "center";
    cell.style.justifyContent = "center";
    cell.style.position = "relative";

    const shapeSvg = makeShape(t.shape, cellSize * 0.55, PALETTE_COLORS[t.colorIndex]);
    cell.appendChild(shapeSvg);

    if (!t.filled) {
      cell.style.cursor = "pointer";
      cell.dataset.targetIndex = String(idx);
      cell.addEventListener("dragover", (e) => {
        e.preventDefault();
        cell.style.borderColor = "rgba(255,255,255,.8)";
      });
      cell.addEventListener("dragleave", () => {
        cell.style.borderColor = t.filled ? "rgba(255,255,255,.1)" : "rgba(255,255,255,.35)";
      });
      cell.addEventListener("drop", (e) => {
        e.preventDefault();
        cell.style.borderColor = t.filled ? "rgba(255,255,255,.1)" : "rgba(255,255,255,.35)";
        const data = (e as DragEvent).dataTransfer?.getData("application/json");
        if (!data) return;
        const item = JSON.parse(data);
        if (item.shape === t.shape && item.colorIndex === t.colorIndex) {
          t.filled = true;
          combo++;
          const timeBonus = Math.round(
            (TIME_BONUS_MAX * timeLeft) / ROUND_SECONDS
          );
          const gained = (BASE_SCORE + timeBonus) * Math.min(combo, 4);
          score += gained;
          sound.success();
          palette = palette.filter((p) => p.shape !== item.shape || p.colorIndex !== item.colorIndex);
          const remaining = targets.filter((x) => !x.filled).length;
          if (remaining === 0) {
            nextRound();
          } else {
            render();
          }
        } else {
          combo = 0;
          score = Math.max(0, score - PENALTY);
          sound.error();
          render();
        }
      });
    }
    targetRow.appendChild(cell);
  });

  gameEl.appendChild(targetRow);

  const palRow = document.createElement("div");
  palRow.style.display = "flex";
  palRow.style.flexWrap = "wrap";
  palRow.style.gap = "10px";
  palRow.style.justifyContent = "center";

  palette.forEach((p) => {
    const btn = document.createElement("div");
    btn.style.width = cellSize + "px";
    btn.style.height = cellSize + "px";
    btn.style.borderRadius = "12px";
    btn.style.background = "rgba(255,255,255,.08)";
    btn.style.border = "2px solid rgba(255,255,255,.15)";
    btn.style.display = "flex";
    btn.style.alignItems = "center";
    btn.style.justifyContent = "center";
    btn.style.cursor = "grab";
    btn.draggable = true;

    const svg = makeShape(p.shape, cellSize * 0.55, PALETTE_COLORS[p.colorIndex]);
    btn.appendChild(svg);

    btn.addEventListener("dragstart", (e) => {
      const ev = e as DragEvent;
      ev.dataTransfer?.setData(
        "application/json",
        JSON.stringify({ shape: p.shape, colorIndex: p.colorIndex })
      );
      sound.click();
    });

    btn.addEventListener("touchstart", (e) => {
      dragging = { shape: p.shape, colorIndex: p.colorIndex, ghost: btn.cloneNode(true) as HTMLElement };
      (dragging.ghost as HTMLElement).style.position = "fixed";
      (dragging.ghost as HTMLElement).style.zIndex = "9999";
      (dragging.ghost as HTMLElement).style.opacity = "0.8";
      (dragging.ghost as HTMLElement).style.pointerEvents = "none";
      document.body.appendChild(dragging.ghost);
      moveGhost(e);
      sound.click();
    });

    btn.addEventListener("touchmove", (e) => {
      if (!dragging) return;
      moveGhost(e);
    });

    btn.addEventListener("touchend", (e) => {
      if (!dragging) return;
      const touch = (e as TouchEvent).changedTouches[0];
      const elBelow = document.elementFromPoint(touch.clientX, touch.clientY);
      const targetCell = elBelow?.closest('[data-target-index]') as HTMLElement | null;
      if (targetCell) {
        const idx = Number(targetCell.dataset.targetIndex);
        const t = targets[idx];
        if (t && !t.filled && dragging.shape === t.shape && dragging.colorIndex === t.colorIndex) {
          t.filled = true;
          combo++;
          const timeBonus = Math.round((TIME_BONUS_MAX * timeLeft) / ROUND_SECONDS);
          const gained = (BASE_SCORE + timeBonus) * Math.min(combo, 4);
          score += gained;
          sound.success();
          palette = palette.filter((p) => p.shape !== dragging.shape || p.colorIndex !== dragging.colorIndex);
          const remaining = targets.filter((x) => !x.filled).length;
          if (remaining === 0) {
            nextRound();
            dragging.ghost.remove();
            dragging = null;
            return;
          }
        } else if (t && !t.filled) {
          combo = 0;
          score = Math.max(0, score - PENALTY);
          sound.error();
        }
      }
      dragging.ghost.remove();
      dragging = null;
      render();
    });

    palRow.appendChild(btn);
  });

  gameEl.appendChild(palRow);
}

function moveGhost(e: TouchEvent) {
  if (!dragging) return;
  const touch = e.touches[0];
  dragging.ghost.style.left = touch.clientX - 30 + "px";
  dragging.ghost.style.top = touch.clientY - 30 + "px";
}

function makeShape(shape: string, size: number, c: { r: number; g: number; b: number }) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", String(size));
  svg.setAttribute("height", String(size));
  svg.setAttribute("viewBox", "0 0 100 100");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  const fill = hex(c);
  let d = "";
  switch (shape) {
    case "circle":
      d = "M50 15 A35 35 0 1 1 50 85 A35 35 0 1 1 50 15 Z";
      break;
    case "square":
      d = "M15 15 L85 15 L85 85 L15 85 Z";
      break;
    case "triangle":
      d = "M50 10 L90 90 L10 90 Z";
      break;
    case "diamond":
      d = "M50 10 L90 50 L50 90 L10 50 Z";
      break;
    case "star":
      d = "M50 10 L61 40 L95 40 L67 58 L79 90 L50 70 L21 90 L33 58 L5 40 L39 40 Z";
      break;
    case "heart":
      d = "M50 85 C20 60 5 40 5 25 A20 20 0 0 1 50 25 A20 20 0 0 1 95 25 C95 40 80 60 50 85 Z";
      break;
  }
  path.setAttribute("d", d);
  path.setAttribute("fill", fill);
  path.setAttribute("stroke", "rgba(255,255,255,.25)");
  path.setAttribute("stroke-width", "3");
  svg.appendChild(path);
  return svg;
}

function nextRound() {
  sound.win();
  const total = score;
  best = setHighScore("match-the-feel", total);
  showOverlay(
    "Round Complete",
    `Score: ${total}  Best: ${best}`
  );
  stopTimer();
}

function startTimer() {
  stopTimer();
  timerHandle = window.setInterval(() => {
    timeLeft--;
    const status = el("status");
    if (status) status.textContent = `Score: ${score}  Time: ${timeLeft}s  Best: ${best}`;
    if (timeLeft <= 0) {
      stopTimer();
      best = setHighScore("match-the-feel", score);
      showOverlay("Time's Up", `Final Score: ${score}  Best: ${best}`);
    }
  }, 1000);
}

function stopTimer() {
  if (timerHandle !== null) {
    window.clearInterval(timerHandle);
    timerHandle = null;
  }
}

function reset() {
  stopTimer();
  best = getHighScore("match-the-feel");
  createRound();
  render();
  startTimer();
  const status = el("status");
  if (status) status.textContent = `Score: 0  Time: ${ROUND_SECONDS}s  Best: ${best}`;
  hideOverlay();
}

export function initGame() {
  onReset(reset);
  reset();
}
