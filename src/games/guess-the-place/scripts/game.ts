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

// Guess the Place — identify the landmark's city or country from 4 choices.

interface Landmark {
  name: string;
  emoji: string;
  clue: string;
  answer: string;
  options: string[];
}

const POOL: Landmark[] = [
  { name: "Eiffel Tower", emoji: "🗼", clue: "This city is home to a famous iron lattice tower completed in 1889.", answer: "Paris", options: ["Paris", "Rome", "London", "Berlin"] },
  { name: "Great Wall", emoji: "🏯", clue: "A vast wall stretching across the north of this country to defend against raids.", answer: "China", options: ["China", "India", "Japan", "Mongolia"] },
  { name: "Pyramids of Giza", emoji: "🔺", clue: "Ancient triangular tombs stand on the outskirts of this North African capital.", answer: "Cairo", options: ["Cairo", "Athens", "Istanbul", "Baghdad"] },
  { name: "Leaning Tower", emoji: "🏛️", clue: "A bell tower in this Italian city famously tilts to one side.", answer: "Pisa", options: ["Pisa", "Venice", "Florence", "Milan"] },
  { name: "Statue of Liberty", emoji: "🗽", clue: "A gift from France that welcomes visitors to this harbour city.", answer: "New York", options: ["New York", "Washington", "Boston", "Los Angeles"] },
  { name: "Colosseum", emoji: "🏟️", clue: "An ancient amphitheatre in the heart of this Mediterranean capital.", answer: "Rome", options: ["Rome", "Madrid", "Lisbon", "Athens"] },
  { name: "Sydney Opera House", emoji: "🎭", clue: "Sail-like shells on a harbour in this Australian city.", answer: "Sydney", options: ["Sydney", "Melbourne", "Auckland", "Perth"] },
  { name: "Christ the Redeemer", emoji: "✝️", clue: "A mountaintop statue overlooking this Brazilian city.", answer: "Rio de Janeiro", options: ["Rio de Janeiro", "São Paulo", "Lima", "Buenos Aires"] },
  { name: "Big Ben", emoji: "🕰️", clue: "A famous clock tower beside the Thames in this capital.", answer: "London", options: ["London", "Dublin", "Paris", "Edinburgh"] },
  { name: "Taj Mahal", emoji: "🕌", clue: "A white marble mausoleum in this Indian city of Agra's neighbour.", answer: "India", options: ["India", "Pakistan", "Bangladesh", "Nepal"] },
  { name: "Mount Fuji", emoji: "🗻", clue: "An iconic snow-capped peak in this East Asian country.", answer: "Japan", options: ["Japan", "South Korea", "China", "Taiwan"] },
  { name: "Canals of Venice", emoji: "🚤", clue: "A city of waterways and gondolas in northern Italy.", answer: "Venice", options: ["Venice", "Amsterdam", "Bruges", "Stockholm"] },
  { name: "Machu Picchu", emoji: "⛰️", clue: "Inca ruins high in the Andes of this South American country.", answer: "Peru", options: ["Peru", "Bolivia", "Ecuador", "Chile"] },
  { name: "Sagrada Família", emoji: "⛪", clue: "A towering basilica still under construction in this Spanish city.", answer: "Barcelona", options: ["Barcelona", "Madrid", "Seville", "Valencia"] },
  { name: "Brandenburg Gate", emoji: "🚪", clue: "A neoclassical gate in the capital of Germany.", answer: "Berlin", options: ["Berlin", "Munich", "Vienna", "Prague"] },
  { name: "Table Mountain", emoji: "🏔️", clue: "A flat-topped mountain above this South African port city.", answer: "Cape Town", options: ["Cape Town", "Johannesburg", "Nairobi", "Cairo"] },
  { name: "Red Square", emoji: "🟥", clue: "A famous square fronted by colourful domes in this Russian capital.", answer: "Moscow", options: ["Moscow", "Kyiv", "Warsaw", "Minsk"] },
  { name: "Blue Mosque", emoji: "🕌", clue: "A six-minaret mosque in the largest city of Turkey.", answer: "Istanbul", options: ["Istanbul", "Ankara", "Cairo", "Tehran"] },
  { name: "Hollywood", emoji: "🎬", clue: "The hillside sign above this California film city.", answer: "Los Angeles", options: ["Los Angeles", "San Francisco", "Las Vegas", "San Diego"] },
  { name: "Acropolis", emoji: "🏛️", clue: "Ancient hilltop temples above this Greek capital.", answer: "Athens", options: ["Athens", "Rome", "Cairo", "Istanbul"] },
];

const ROUNDS = 10;
const ROUND_TIME = 12;

let queue: Landmark[];
let round = 0;
let score = 0;
let streak = 0;
let best = 0;
let timeLeft = 0;
let timer: number | null = null;
let locked = false;

function pickQueue(): Landmark[] {
  const chosen = shuffle(POOL).slice(0, ROUNDS);
  return chosen.map((q) => ({ ...q, options: shuffle(q.options) }));
}

function renderCard(item: Landmark) {
  const gameEl = el("guess-the-place");
  if (!gameEl) return;
  gameEl.innerHTML = "";

  const card = document.createElement("div");
  card.className =
    "mx-auto w-full max-w-[360px] rounded-2xl border border-white/15 bg-white/5 p-5 text-white";
  card.innerHTML = `
    <div class="flex items-center justify-center text-6xl" aria-hidden="true">${item.emoji}</div>
    <p class="mt-3 text-center font-mono text-xs uppercase tracking-widest text-white/60">Round ${round + 1} / ${ROUNDS}</p>
    <p class="mt-1 text-center text-sm leading-6 text-white/85">${item.clue}</p>
    <div id="gtp-timer" class="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
      <div id="gtp-bar" class="h-full w-full bg-teal-300 transition-[width] duration-200"></div>
    </div>
    <div id="gtp-opts" class="mt-4 grid grid-cols-1 gap-2"></div>
    <p id="gtp-status" class="mt-3 text-center text-xs text-white/70"></p>
  `;
  gameEl.appendChild(card);

  const opts = el("gtp-opts");
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

function choose(opt: string, item: Landmark, btn: HTMLButtonElement) {
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
    const st = el("gtp-status");
    if (st) st.textContent = `Correct! +${gained}`;
  } else {
    btn.classList.add("bg-rose-500/40", "border-rose-300");
    streak = 0;
    sound.error();
    const st = el("gtp-status");
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
  const bar = el("gtp-bar");
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
  const buttons = el("gtp-opts")?.querySelectorAll("button");
  buttons?.forEach((b) => {
    (b as HTMLButtonElement).disabled = true;
    if ((b as HTMLButtonElement).textContent === item.answer) {
      b.classList.add("bg-emerald-500/40", "border-emerald-300");
    }
  });
  streak = 0;
  sound.error();
  const st = el("gtp-status");
  if (st) st.textContent = `Time up — it was ${item.answer}.`;
  const sc = el("status");
  if (sc) sc.textContent = `Score: ${score} · Best: ${best} · Streak: ${streak}`;
  setTimeout(nextRound, 1100);
}

function finish() {
  best = setHighScore("guess-the-place", score);
  sound.win();
  showOverlay("Quiz complete!", `You scored ${score} points. Best: ${best}.`);
}

function reset() {
  stopTimer();
  round = 0;
  score = 0;
  streak = 0;
  locked = false;
  best = getHighScore("guess-the-place");
  queue = pickQueue();
  hideOverlay();
  renderCard(queue[0]);
  startTimer();
}

export function initGame() {
  onReset(reset);
  reset();
}
