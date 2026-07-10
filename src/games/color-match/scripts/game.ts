import {
  el,
  onReset,
  showOverlay,
  hideOverlay,
  sound,
  registerPause,
  rgbToHex,
  colorDistance,
  randomColor,
  getHighScore,
  setHighScore,
} from "../../../shared/utils";

// Color Match — reproduce the target RGB color before the timer runs out.
// Score rewards accuracy (Euclidean RGB distance) plus a speed bonus.

const MAX_ROUNDS = 10;
const ROUND_TIME = 30;

let target = { r: 0, g: 0, b: 0 };
let score = 0;
let best = 0;
let round = 1;
let timeLeft = ROUND_TIME;
let timerId: number | null = null;
let paused = false;
let started = false;

function updateMix() {
  const rSlider = el<HTMLInputElement>("r-slider");
  const gSlider = el<HTMLInputElement>("g-slider");
  const bSlider = el<HTMLInputElement>("b-slider");
  const r = Number(rSlider?.value);
  const g = Number(gSlider?.value);
  const b = Number(bSlider?.value);
  el("r-val")!.textContent = String(r);
  el("g-val")!.textContent = String(g);
  el("b-val")!.textContent = String(b);
  const hex = rgbToHex(r, g, b);
  const mix = el("mix-swatch");
  if (mix) mix.style.background = hex;
  const mixHex = el("mix-hex");
  if (mixHex) mixHex.textContent = hex;
}

function newRound() {
  if (round > MAX_ROUNDS) return endGame();
  const roundEl = el("round");
  if (roundEl) roundEl.textContent = `${round}/${MAX_ROUNDS}`;
  target = randomColor();
  const hex = rgbToHex(target.r, target.g, target.b);
  const tgt = el("target-swatch");
  if (tgt) tgt.style.background = hex;
  const tHex = el("target-hex");
  if (tHex) tHex.textContent = hex;

  const rSlider = el<HTMLInputElement>("r-slider");
  const gSlider = el<HTMLInputElement>("g-slider");
  const bSlider = el<HTMLInputElement>("b-slider");
  if (rSlider && gSlider && bSlider) {
    rSlider.value = "128";
    gSlider.value = "128";
    bSlider.value = "128";
  }
  updateMix();

  timeLeft = ROUND_TIME;
  const timer = el("timer");
  if (timer) timer.textContent = String(timeLeft);
  startTimer();
}

function startTimer() {
  if (timerId) clearInterval(timerId);
  timerId = setInterval(() => {
    if (paused) return;
    timeLeft--;
    const timer = el("timer");
    if (timer) timer.textContent = String(timeLeft);
    if (timeLeft <= 0) {
      clearInterval(timerId!);
      submitRound(false);
    }
  }, 1000);
}

function submitRound(timeBonus = true) {
  clearInterval(timerId!);
  const r = Number(el<HTMLInputElement>("r-slider")!.value);
  const g = Number(el<HTMLInputElement>("g-slider")!.value);
  const b = Number(el<HTMLInputElement>("b-slider")!.value);
  const dist = colorDistance(target, { r, g, b });
  const maxDist = Math.sqrt(3 * 255 * 255);
  const accuracy = Math.max(0, 1 - dist / maxDist);
  let pts = Math.round(accuracy * 1000);
  if (timeBonus) pts += Math.round(timeLeft * 5);
  score += pts;
  el("score")!.textContent = String(score);
  el("round")!.textContent = `${round}/${MAX_ROUNDS}`;
  sound.click();
  round++;
  if (round > MAX_ROUNDS) endGame();
  else newRound();
}

function endGame() {
  best = setHighScore("color-match", score);
  const submitBtn = el<HTMLButtonElement>("submit-btn");
  const skipBtn = el<HTMLButtonElement>("skip-btn");
  if (submitBtn) submitBtn.disabled = true;
  if (skipBtn) skipBtn.disabled = true;
  sound.win();
  showOverlay("Game Over!", `Final Score: ${score} · Best: ${best}`);
}

function skipRound() {
  clearInterval(timerId!);
  round++;
  if (round > MAX_ROUNDS) endGame();
  else newRound();
}

function reset() {
  score = 0;
  round = 1;
  best = getHighScore("color-match");
  const submitBtn = el<HTMLButtonElement>("submit-btn");
  const skipBtn = el<HTMLButtonElement>("skip-btn");
  if (submitBtn) submitBtn.disabled = false;
  if (skipBtn) skipBtn.disabled = false;
  el("score")!.textContent = "0";
  el("round")!.textContent = `1/${MAX_ROUNDS}`;
  const status = el("status");
  if (status) status.textContent = `Best: ${best}`;
  hideOverlay();
  paused = false;
  newRound();
}

export function initGame() {
  const rSlider = el<HTMLInputElement>("r-slider");
  const gSlider = el<HTMLInputElement>("g-slider");
  const bSlider = el<HTMLInputElement>("b-slider");
  [rSlider, gSlider, bSlider].forEach((s) =>
    s?.addEventListener("input", updateMix)
  );
  el("submit-btn")?.addEventListener("click", () => submitRound(true));
  el("skip-btn")?.addEventListener("click", skipRound);

  registerPause(
    () => {
      paused = true;
    },
    () => {
      paused = false;
    }
  );
  onReset(reset);

  reset();
}
