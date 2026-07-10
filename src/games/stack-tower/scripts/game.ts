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

// Stack Tower — drop sliding blocks, keep the overlap as wide as possible.
// Speed ramps with score; the game ends when a dropped block has no overlap.

let W = 360;
let BH = 22;
let H = 480;
let stack: { x: number; w: number }[];
let moving: { x: number; w: number; dir: number; speed: number } | null = null;
let score = 0;
let best = 0;
let over = false;
let paused = false;
let raf: number | null = null;

function measure() {
  const container = el("stack-container");
  if (!container) return;
  const rect = container.getBoundingClientRect();
  W = Math.max(120, rect.width || 360);
  H = Math.max(200, rect.height || 480);
  BH = Math.max(16, Math.min(30, Math.floor(H / 18)));
}

function init() {
  measure();
  best = getHighScore("stack-tower");
  stack = [{ x: 0, w: W }];
  score = 0;
  over = false;
  paused = false;
  const status = el("status");
  if (status) status.textContent = `Score: 0  ·  Best: ${best}`;
  spawnMoving();
  draw();
}

function randX(maxWidth: number) {
  return Math.random() * (W - maxWidth);
}

function spawnMoving() {
  const below = stack[stack.length - 1];
  const w = Math.max(40, below.w * (0.7 + Math.random() * 0.3));
  moving = {
    x: randX(w),
    w,
    dir: Math.random() < 0.5 ? -1 : 1,
    speed: 2.0 + score * 0.08,
  };
}

function drop() {
  sound.click();
  if (over || paused || !moving) return;
  const below = stack[stack.length - 1];
  const left = Math.max(moving.x, below.x);
  const right = Math.min(moving.x + moving.w, below.x + below.w);
  const overlap = right - left;

  if (overlap <= 0) {
    over = true;
    best = setHighScore("stack-tower", score);
    sound.error();
    const status = el("status");
    if (status) status.textContent = `Game Over · Score: ${score} · Best: ${best}`;
    showOverlay("Game Over!", `You stacked ${score} block${score === 1 ? "" : "s"}. Best: ${best}.`);
    return;
  }

  stack.push({ x: left, w: overlap });
  score++;
  sound.click();
  const status = el("status");
  if (status) status.textContent = `Score: ${score}  ·  Best: ${best}`;

  spawnMoving();
  draw();
}

function draw() {
  const container = el("stack-container");
  if (!container) return;
  container.innerHTML = "";
  const inner = document.createElement("div");
  inner.style.position = "relative";
  inner.style.width = W + "px";
  inner.style.height = (stack.length + 1) * BH + "px";

  const totalH = stack.length * BH;
  const offset = Math.max(0, totalH - H);
  inner.style.transform = `translateY(${-offset}px)`;

  stack.forEach((b, i) => {
    const d = document.createElement("div");
    d.style.position = "absolute";
    d.style.left = b.x + "px";
    d.style.bottom = i * BH + "px";
    d.style.width = b.w + "px";
    d.style.height = BH + "px";
    d.style.background = `hsl(${(i * 35) % 360}, 75%, 55%)`;
    d.style.border = "1px solid rgba(0,0,0,.2)";
    d.style.borderRadius = "2px";
    inner.appendChild(d);
  });

  if (moving && !over) {
    const d = document.createElement("div");
    d.style.position = "absolute";
    d.style.left = moving.x + "px";
    d.style.bottom = stack.length * BH + "px";
    d.style.width = moving.w + "px";
    d.style.height = BH + "px";
    d.style.background = "rgba(255,255,255,.9)";
    d.style.border = "1px solid rgba(0,0,0,.25)";
    d.style.borderRadius = "2px";
    inner.appendChild(d);
  }

  container.appendChild(inner);
}

function animate() {
  if (!over && !paused && moving) {
    moving.x += moving.dir * moving.speed;
    if (moving.x <= 0) {
      moving.x = 0;
      moving.dir = 1;
    }
    if (moving.x >= W - moving.w) {
      moving.x = W - moving.w;
      moving.dir = -1;
    }
    draw();
  }
  raf = requestAnimationFrame(animate);
}

function pause() {
  paused = true;
}
function resume() {
  paused = false;
}

export function initGame() {
  const container = el("stack-container");
  const resetBtn = el("reset-btn");

  resetBtn?.addEventListener("click", () => {
    if (raf) cancelAnimationFrame(raf);
    init();
    animate();
  });
  container?.addEventListener("pointerup", drop);

  registerPause(pause, resume);
  onReset(() => {
    if (raf) cancelAnimationFrame(raf);
    init();
    animate();
  });

  init();
  animate();
}
