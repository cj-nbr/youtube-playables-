import {
  el,
  onReset,
  showOverlay,
  hideOverlay,
  sound,
  randInt,
  getHighScore,
  setHighScore,
} from "../../../shared/utils";

const SAMPLE_BILLS = [
  { serial: "AB482910", portrait: "sharp", color: "#2e7d32", watermark: "clear", micro: true },
  { serial: "AB482911", portrait: "sharp", color: "#2e7d32", watermark: "clear", micro: true },
  { serial: "AB482912", portrait: "sharp", color: "#2e7d32", watermark: "clear", micro: true },
  { serial: "AB482913", portrait: "blurred", color: "#2e7d32", watermark: "clear", micro: true },
  { serial: "AB482914", portrait: "sharp", color: "#2e7d32", watermark: "clear", micro: true },
];

let round = 0;
let score = 0;
let lives = 3;
let best = 0;
let fakeIndex = 0;
let over = false;

function newRound() {
  fakeIndex = randInt(0, SAMPLE_BILLS.length - 1);
  over = false;
  hideOverlay();
  draw();
}

function draw() {
  const container = el("counterfeit-board");
  if (!container) return;
  container.innerHTML = "";
  const list = document.createElement("div");
  list.className = "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5";

  SAMPLE_BILLS.forEach((bill, i) => {
    const card = document.createElement("div");
    card.className = "cursor-pointer rounded-xl border border-hairline bg-canvas p-4 shadow-[0_1px_2px_#0000000d] transition hover:-translate-y-0.5";
    card.innerHTML = `
      <div class="mx-auto h-24 w-16 rounded-md border-2 border-hairline-strong" style="background:${bill.color}"></div>
      <p class="mt-2 text-center font-mono text-xs text-mute">${bill.serial}</p>
      <p class="text-center text-xs text-body">${i === fakeIndex ? "❌ Fake" : "✓ Genuine"}</p>
    `;
    card.addEventListener("click", () => handleClick(i));
    list.appendChild(card);
  });

  container.appendChild(list);
}

function handleClick(i: number) {
  if (over) return;
  sound.click();
  if (i === fakeIndex) {
    score++;
    lives = Math.min(lives + 1, 5);
    sound.success();
    round++;
    showOverlay("Correct!", `Score: ${score}`);
    setTimeout(() => {
      hideOverlay();
      newRound();
    }, 800);
  } else {
    lives--;
    sound.error();
    if (lives <= 0) {
      over = true;
      best = setHighScore("counterfeit", score);
      showOverlay("Game Over", `You caught ${score} counterfeits. Best: ${best}`);
    } else {
      showOverlay("Wrong!", `${lives} lives left`);
      setTimeout(hideOverlay, 600);
    }
    draw();
  }
  const status = el("status");
  if (status) status.textContent = `Score: ${score} · Lives: ${lives} · Best: ${best}`;
}

function reset() {
  round = 0;
  score = 0;
  lives = 3;
  best = getHighScore("counterfeit");
  over = false;
  newRound();
  const status = el("status");
  if (status) status.textContent = `Score: 0 · Lives: 3 · Best: ${best}`;
}

export function initGame() {
  onReset(reset);
  reset();
}
