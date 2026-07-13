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

// Oooze — an agar-style arena. Steer your blob toward the pointer, absorb food
// and smaller cells to grow, and avoid any cell larger than you. Reach the
// target size to dominate. Touching a bigger cell ends the run. Rendered on a
// canvas for smooth real-time movement.

interface Blob {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  hue: number;
}

const START_R = 14;
const TARGET_R = 46;
const FOOD_COUNT = 45;
const ENEMY_COUNT = 9;

let canvas: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;
let W = 320;
let H = 400;

let player: Blob;
let foods: Blob[] = [];
let enemies: Blob[] = [];
let target = { x: 0, y: 0 };
let score = 0;
let over = false;
let paused = false;
let raf: number | null = null;
let started = false;
// Grace period (ms) after the player first moves during which a bigger cell
// cannot absorb them — gives the player time to react at the start.
let graceUntil = 0;
const GRACE_MS = 5000;

function rand(a: number, b: number) {
  return a + Math.random() * (b - a);
}

function dist(a: Blob, b: Blob) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function makeBlob(r: number, hue: number): Blob {
  return { x: rand(r, W - r), y: rand(r, H - r), r, vx: 0, vy: 0, hue };
}

function spawnFood() {
  foods.push({ x: rand(6, W - 6), y: rand(6, H - 6), r: rand(3, 4.5), vx: 0, vy: 0, hue: rand(40, 200) });
}

function spawnEnemy() {
  // Mix of smaller (prey) and larger (hunters) than the player's start.
  const r = rand(START_R * 0.6, START_R * 2.1);
  const e = makeBlob(r, rand(0, 360));
  enemies.push(e);
}

function measure() {
  const container = el("oooze");
  if (!container) return;
  const rect = container.getBoundingClientRect();
  W = Math.max(200, rect.width || 320);
  H = Math.max(260, rect.height || 400);
}

function buildCanvas() {
  const container = el("oooze");
  if (!container) return;
  container.innerHTML = "";
  measure();
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  c.style.width = "100%";
  c.style.height = "100%";
  c.style.borderRadius = "12px";
  c.style.background = "radial-gradient(circle at 50% 40%, #15233a, #0b1220)";
  c.style.display = "block";
  c.style.touchAction = "none";
  container.appendChild(c);
  canvas = c;
  ctx = c.getContext("2d");

  const updateTarget = (clientX: number, clientY: number) => {
    const rect = c.getBoundingClientRect();
    target.x = ((clientX - rect.left) / rect.width) * W;
    target.y = ((clientY - rect.top) / rect.height) * H;
  };
  c.addEventListener("pointermove", (e) => updateTarget(e.clientX, e.clientY));
  c.addEventListener("pointerdown", (e) => {
    sound.click();
    started = true;
    graceUntil = performance.now() + GRACE_MS;
    updateTarget(e.clientX, e.clientY);
  });
}

function reset() {
  over = false;
  paused = false;
  started = false;
  graceUntil = 0;
  score = 0;
  if (raf) cancelAnimationFrame(raf);
  buildCanvas();
  if (!canvas) return;
  player = { x: W / 2, y: H / 2, r: START_R, vx: 0, vy: 0, hue: 150 };
  target = { x: W / 2, y: H / 2 - 40 };
  foods = [];
  for (let i = 0; i < FOOD_COUNT; i++) spawnFood();
  enemies = [];
  for (let i = 0; i < ENEMY_COUNT; i++) spawnEnemy();
  const best = getHighScore("oooze");
  const status = el("status");
  if (status)
    status.textContent = `Size: ${Math.round(player.r)} / ${TARGET_R} · Best: ${best}`;
  hideOverlay();
  loop();
}

function step() {
  if (over || paused) return;
  // Don't simulate until the player starts moving — otherwise a bigger cell
  // could absorb the stationary player before they even interact.
  if (!started) return;

  // Player drifts toward target.
  const dx = target.x - player.x;
  const dy = target.y - player.y;
  const d = Math.hypot(dx, dy) || 1;
  const speed = Math.max(1.2, 4.2 - player.r / 22);
  player.vx = (dx / d) * speed;
  player.vy = (dy / d) * speed;
  player.x += player.vx;
  player.y += player.vy;
  clampToArena(player);

  // Food collisions.
  for (let i = foods.length - 1; i >= 0; i--) {
    const f = foods[i];
    if (dist(player, f) < player.r) {
      player.r += 0.4;
      foods.splice(i, 1);
      spawnFood();
    }
  }

  // Enemy AI + collisions.
  for (let i = enemies.length - 1; i >= 0; i--) {
    const e = enemies[i];
    const dd = dist(player, e);
    const toward = Math.atan2(player.y - e.y, player.x - e.x);
    const espeed = Math.max(0.8, 3.4 - e.r / 26);
    if (e.r < player.r * 0.9) {
      // Flee from player.
      e.vx = -Math.cos(toward) * espeed;
      e.vy = -Math.sin(toward) * espeed;
    } else if (e.r > player.r * 1.1) {
      // Chase player.
      e.vx = Math.cos(toward) * espeed;
      e.vy = Math.sin(toward) * espeed;
    } else {
      // Wander.
      e.vx += rand(-0.3, 0.3);
      e.vy += rand(-0.3, 0.3);
      const m = Math.hypot(e.vx, e.vy) || 1;
      e.vx = (e.vx / m) * espeed;
      e.vy = (e.vy / m) * espeed;
    }
    e.x += e.vx;
    e.y += e.vy;
    clampToArena(e);

    if (dd < player.r + e.r * 0.6) {
      if (player.r > e.r * 1.1) {
        // Player eats enemy.
        player.r += e.r * 0.45;
        score += Math.round(e.r);
        sound.success();
        enemies.splice(i, 1);
        spawnEnemy();
      } else if (e.r > player.r * 1.1) {
        // Enemy eats player.
        if (performance.now() < graceUntil) {
          // Grace period: shove the hunter away instead of dying.
          const ang = Math.atan2(e.y - player.y, e.x - player.x);
          const push = player.r + e.r + 6;
          e.x += Math.cos(ang) * push;
          e.y += Math.sin(ang) * push;
          clampToArena(e);
        } else {
          die();
          return;
        }
      }
    }
  }

  // Win check.
  if (player.r >= TARGET_R) {
    winGame();
    return;
  }

  const status = el("status");
  if (status)
    status.textContent = `Size: ${Math.round(player.r)} / ${TARGET_R} · Score: ${score}`;
}

function clampToArena(b: Blob) {
  if (b.x < b.r) b.x = b.r;
  if (b.x > W - b.r) b.x = W - b.r;
  if (b.y < b.r) b.y = b.r;
  if (b.y > H - b.r) b.y = H - b.r;
}

function drawBlob(b: Blob, label?: string) {
  if (!ctx) return;
  ctx.beginPath();
  ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
  ctx.fillStyle = `hsl(${b.hue}, 70%, 55%)`;
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = `hsl(${b.hue}, 80%, 70%)`;
  ctx.stroke();
  // Eyes.
  const ex = b.r * 0.32;
  const ey = -b.r * 0.18;
  for (const s of [-1, 1]) {
    ctx.beginPath();
    ctx.arc(b.x + s * ex, b.y + ey, Math.max(1.5, b.r * 0.12), 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
  }
  if (label) {
    ctx.fillStyle = "rgba(255,255,255,.9)";
    ctx.font = `${Math.max(10, b.r * 0.5)}px sans-serif`;
    ctx.textAlign = "center";
    ctx.fillText(label, b.x, b.y + b.r + 12);
  }
}

function draw() {
  if (!ctx || !canvas) return;
  ctx.clearRect(0, 0, W, H);
  for (const f of foods) {
    ctx.beginPath();
    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${f.hue}, 80%, 65%)`;
    ctx.fill();
  }
  for (const e of enemies) drawBlob(e);
  drawBlob(player);
  if (!started) {
    ctx.fillStyle = "rgba(255,255,255,.8)";
    ctx.font = "14px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Move your cursor / finger to start", W / 2, H / 2);
  }
}

function loop() {
  if (over) return;
  if (!paused) step();
  draw();
  raf = requestAnimationFrame(loop);
}

function die() {
  over = true;
  if (raf) cancelAnimationFrame(raf);
  const best = setHighScore("oooze", score);
  sound.error();
  const status = el("status");
  if (status) status.textContent = `Eaten! Score: ${score} · Best: ${best}`;
  showOverlay("Swallowed!", `A bigger cell absorbed you at size ${Math.round(player.r)}. Score: ${score}. Best: ${best}.`);
}

function winGame() {
  over = true;
  if (raf) cancelAnimationFrame(raf);
  const finalScore = score + Math.round(player.r * 5);
  const best = setHighScore("oooze", finalScore);
  sound.win();
  const status = el("status");
  if (status) status.textContent = `You dominate! Score: ${finalScore} · Best: ${best}`;
  showOverlay("You dominate!", `Your blob reached the target size. Score: ${finalScore}. Best: ${best}.`);
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
