import {
  el,
  onReset,
  showOverlay,
  hideOverlay,
  sound,
  getHighScore,
  setHighScore,
  shuffle,
} from "../../../shared/utils";

// The Image Quiz — identify a zoomed-in / cropped object from 4 choices.

interface QuizItem {
  emoji: string;
  clue: string;
  answer: string;
  options: string[];
}

const POOL: QuizItem[] = [
  { emoji: "🍎", clue: "A crisp red fruit often paired with peanut butter.", answer: "Apple", options: ["Apple", "Tomato", "Peach", "Cherry"] },
  { emoji: "🍊", clue: "A round citrus fruit you peel rather than bite.", answer: "Orange", options: ["Orange", "Lemon", "Peach", "Plum"] },
  { emoji: "🐼", clue: "A black-and-white bear that loves bamboo.", answer: "Panda", options: ["Panda", "Penguin", "Skunk", "Zebra"] },
  { emoji: "🦋", clue: "A colourful insect with four powdery wings.", answer: "Butterfly", options: ["Butterfly", "Bee", "Moth", "Dragonfly"] },
  { emoji: "🌵", clue: "A spiky desert plant that stores water.", answer: "Cactus", options: ["Cactus", "Pineapple", "Fern", "Aloe"] },
  { emoji: "🍄", clue: "A fungi often pictured with red cap and white dots.", answer: "Mushroom", options: ["Mushroom", "Strawberry", "Apple", "Tomato"] },
  { emoji: "🐝", clue: "A striped insect that makes honey.", answer: "Bee", options: ["Bee", "Wasp", "Fly", "Beetle"] },
  { emoji: "🍓", clue: "A red berry with tiny seeds on the outside.", answer: "Strawberry", options: ["Strawberry", "Raspberry", "Cherry", "Tomato"] },
  { emoji: "🥕", clue: "An orange root vegetable rabbits enjoy.", answer: "Carrot", options: ["Carrot", "Banana", "Corn", "Chili"] },
  { emoji: "🐧", clue: "A tuxedo-coloured bird that cannot fly but swims.", answer: "Penguin", options: ["Penguin", "Owl", "Duck", "Puffin"] },
  { emoji: "🌻", clue: "A tall flower with a big yellow face that follows the sun.", answer: "Sunflower", options: ["Sunflower", "Daisy", "Rose", "Tulip"] },
  { emoji: "🐙", clue: "A sea creature with eight arms.", answer: "Octopus", options: ["Octopus", "Squid", "Crab", "Starfish"] },
  { emoji: "🍋", clue: "A sour yellow fruit used in lemonade.", answer: "Lemon", options: ["Lemon", "Lime", "Banana", "Orange"] },
  { emoji: "🐞", clue: "A small red beetle with black spots.", answer: "Ladybug", options: ["Ladybug", "Beetle", "Ant", "Spider"] },
  { emoji: "🍌", clue: "A yellow fruit you peel from the top.", answer: "Banana", options: ["Banana", "Mango", "Papaya", "Corn"] },
  { emoji: "🐢", clue: "A slow reptile that carries its home on its back.", answer: "Turtle", options: ["Turtle", "Snail", "Frog", "Lizard"] },
  { emoji: "🌶️", clue: "A thin, hot pepper that adds spice.", answer: "Chili Pepper", options: ["Chili Pepper", "Carrot", "Radish", "Bean"] },
  { emoji: "🐬", clue: "A smart, smiling marine mammal, not a fish.", answer: "Dolphin", options: ["Dolphin", "Shark", "Whale", "Seal"] },
  { emoji: "🍇", clue: "A cluster of small purple or green fruits.", answer: "Grapes", options: ["Grapes", "Blueberries", "Peas", "Olives"] },
  { emoji: "🦔", clue: "A small animal covered in protective spines.", answer: "Hedgehog", options: ["Hedgehog", "Porcupine", "Mouse", "Armadillo"] },
];

const ROUNDS = 10;
const ROUND_TIME = 12;

let queue: QuizItem[];
let round = 0;
let score = 0;
let streak = 0;
let best = 0;
let timeLeft = 0;
let timer: number | null = null;
let locked = false;

function pickQueue(): QuizItem[] {
  const chosen = shuffle(POOL).slice(0, ROUNDS);
  return chosen.map((q) => ({ ...q, options: shuffle(q.options) }));
}

function renderCard(item: QuizItem) {
  const gameEl = el("the-image-quiz");
  if (!gameEl) return;
  gameEl.innerHTML = "";

  const card = document.createElement("div");
  card.className =
    "mx-auto w-full max-w-[360px] rounded-2xl border border-white/15 bg-white/5 p-5 text-white";
  card.innerHTML = `
    <p class="text-center font-mono text-xs uppercase tracking-widest text-white/60">Round ${round + 1} / ${ROUNDS}</p>
    <div class="mt-3 flex items-center justify-center">
      <div class="flex h-32 w-32 items-center justify-center rounded-full bg-white/10 text-[72px] leading-none" aria-hidden="true">${item.emoji}</div>
    </div>
    <p class="mt-3 text-center text-sm leading-6 text-white/85">${item.clue}</p>
    <div id="tiq-timer" class="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
      <div id="tiq-bar" class="h-full w-full bg-fuchsia-300 transition-[width] duration-200"></div>
    </div>
    <div id="tiq-opts" class="mt-4 grid grid-cols-1 gap-2"></div>
    <p id="tiq-status" class="mt-3 text-center text-xs text-white/70"></p>
  `;
  gameEl.appendChild(card);

  const opts = el("tiq-opts");
  item.options.forEach((opt) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className =
      "rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-left text-sm font-medium transition hover:bg-white/15";
    b.textContent = opt;
    b.addEventListener("click", () => choose(opt, item, b));
    opts?.appendChild(b);
  });

  const sc = el("status");
  if (sc) sc.textContent = `Score: ${score} · Best: ${best} · Streak: ${streak}`;
}

function choose(opt: string, item: QuizItem, btn: HTMLButtonElement) {
  if (locked) return;
  locked = true;
  sound.click();
  stopTimer();

  const correct = opt === item.answer;
  const buttons = btn.parentElement?.querySelectorAll("button");
  buttons?.forEach((b) => {
    (b as HTMLButtonElement).disabled = true;
    if ((b as HTMLButtonElement).textContent === item.answer) {
      b.classList.add("bg-emerald-500/40", "border-emerald-300");
    }
  });

  if (correct) {
    btn.classList.add("bg-emerald-500/40", "border-emerald-300");
    streak++;
    const bonus = Math.max(0, Math.round(timeLeft)) * 5;
    const gained = 100 + bonus + (streak - 1) * 10;
    score += gained;
    sound.success();
    const st = el("tiq-status");
    if (st) st.textContent = `Correct! +${gained}`;
  } else {
    btn.classList.add("bg-rose-500/40", "border-rose-300");
    streak = 0;
    sound.error();
    const st = el("tiq-status");
    if (st) st.textContent = `Wrong — it was ${item.answer}.`;
  }

  const sc = el("status");
  if (sc) sc.textContent = `Score: ${score} · Best: ${best} · Streak: ${streak}`;
  setTimeout(nextRound, 1100);
}

function nextRound() {
  round++;
  if (round >= ROUNDS) {
    finish();
    return;
  }
  locked = false;
  renderCard(queue[round]);
  startTimer();
}

function startTimer() {
  timeLeft = ROUND_TIME;
  const bar = el("tiq-bar");
  const tick = () => {
    timeLeft -= 0.1;
    if (bar) bar.style.width = `${Math.max(0, (timeLeft / ROUND_TIME) * 100)}%`;
    if (timeLeft <= 0) {
      stopTimer();
      timeoutRound();
      return;
    }
    timer = window.setTimeout(tick, 100);
  };
  timer = window.setTimeout(tick, 100);
}

function stopTimer() {
  if (timer !== null) {
    clearTimeout(timer);
    timer = null;
  }
}

function timeoutRound() {
  if (locked) return;
  locked = true;
  const item = queue[round];
  const buttons = el("tiq-opts")?.querySelectorAll("button");
  buttons?.forEach((b) => {
    (b as HTMLButtonElement).disabled = true;
    if ((b as HTMLButtonElement).textContent === item.answer) {
      b.classList.add("bg-emerald-500/40", "border-emerald-300");
    }
  });
  streak = 0;
  sound.error();
  const st = el("tiq-status");
  if (st) st.textContent = `Time up — it was ${item.answer}.`;
  const sc = el("status");
  if (sc) sc.textContent = `Score: ${score} · Best: ${best} · Streak: ${streak}`;
  setTimeout(nextRound, 1100);
}

function finish() {
  best = setHighScore("the-image-quiz", score);
  sound.win();
  showOverlay("Quiz complete!", `You scored ${score} points. Best: ${best}.`);
}

function reset() {
  stopTimer();
  round = 0;
  score = 0;
  streak = 0;
  locked = false;
  best = getHighScore("the-image-quiz");
  queue = pickQueue();
  hideOverlay();
  renderCard(queue[0]);
  startTimer();
}

export function initGame() {
  onReset(reset);
  reset();
}
