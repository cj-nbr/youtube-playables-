import {
  el,
  onReset,
  showOverlay,
  hideOverlay,
  sound,
  shuffle,
  getHighScore,
  setHighScore,
} from "../../../shared/utils";

// TriviaNut — multiple-choice trivia across categories with streak bonuses.

interface Question {
  q: string;
  options: string[];
  answer: number;
  category: string;
}

const BANK: Question[] = [
  { q: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], answer: 1, category: "Science" },
  { q: "What gas do plants absorb from the air for photosynthesis?", options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"], answer: 2, category: "Science" },
  { q: "How many bones are in the adult human body?", options: ["201", "206", "212", "198"], answer: 1, category: "Science" },
  { q: "What is the chemical symbol for gold?", options: ["Go", "Gd", "Au", "Ag"], answer: 2, category: "Science" },
  { q: "Which organ pumps blood through the human body?", options: ["Liver", "Brain", "Heart", "Kidney"], answer: 2, category: "Science" },
  { q: "In what year did the first Moon landing occur?", options: ["1965", "1969", "1972", "1958"], answer: 1, category: "History" },
  { q: "Who was the first President of the United States?", options: ["Lincoln", "Washington", "Jefferson", "Adams"], answer: 1, category: "History" },
  { q: "The Great Wall is located in which country?", options: ["Japan", "India", "China", "Korea"], answer: 2, category: "History" },
  { q: "Which ancient civilization built the pyramids of Giza?", options: ["Romans", "Greeks", "Egyptians", "Persians"], answer: 2, category: "History" },
  { q: "What year did World War II end?", options: ["1942", "1945", "1939", "1950"], answer: 1, category: "History" },
  { q: "What is the capital of France?", options: ["London", "Berlin", "Paris", "Rome"], answer: 2, category: "Geography" },
  { q: "Which is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: 3, category: "Geography" },
  { q: "Mount Everest lies on the border of Nepal and which country?", options: ["China", "India", "Bhutan", "Pakistan"], answer: 0, category: "Geography" },
  { q: "Which continent is the Sahara Desert in?", options: ["Asia", "Africa", "Australia", "South America"], answer: 1, category: "Geography" },
  { q: "What is the longest river in the world?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], answer: 1, category: "Geography" },
  { q: "How many players are on a soccer team on the field?", options: ["9", "10", "11", "12"], answer: 2, category: "Sports" },
  { q: "In which sport would you perform a slam dunk?", options: ["Tennis", "Basketball", "Golf", "Cricket"], answer: 1, category: "Sports" },
  { q: "How often are the Summer Olympics held?", options: ["Every 2 years", "Every 3 years", "Every 4 years", "Every 5 years"], answer: 2, category: "Sports" },
  { q: "Which country won the first FIFA World Cup in 1930?", options: ["Brazil", "Uruguay", "Italy", "Argentina"], answer: 1, category: "Sports" },
  { q: "What piece moves in an L-shape in chess?", options: ["Bishop", "Knight", "Rook", "Queen"], answer: 1, category: "Sports" },
  { q: "Who painted the Mona Lisa?", options: ["Van Gogh", "Da Vinci", "Picasso", "Monet"], answer: 1, category: "Entertainment" },
  { q: "Which band released the album 'Abbey Road'?", options: ["The Beatles", "Queen", "The Rolling Stones", "U2"], answer: 0, category: "Entertainment" },
  { q: "What is the highest-grossing film franchise mentioned here?", options: ["Harry Potter", "Marvel Cinematic Universe", "Star Wars", "James Bond"], answer: 1, category: "Entertainment" },
  { q: "Which streaming platform created 'Stranger Things'?", options: ["HBO", "Netflix", "Disney+", "Amazon"], answer: 1, category: "Entertainment" },
  { q: "How many strings does a standard guitar have?", options: ["4", "5", "6", "7"], answer: 2, category: "Entertainment" },
  { q: "What is the square root of 64?", options: ["6", "7", "8", "9"], answer: 2, category: "General" },
  { q: "How many colors are in a standard rainbow?", options: ["5", "6", "7", "8"], answer: 2, category: "General" },
  { q: "Which language has the most native speakers?", options: ["English", "Spanish", "Mandarin Chinese", "Hindi"], answer: 2, category: "General" },
  { q: "What is the freezing point of water in Celsius?", options: ["0", "32", "100", "-10"], answer: 0, category: "General" },
  { q: "How many continents are there on Earth?", options: ["5", "6", "7", "8"], answer: 2, category: "General" },
];

const TOTAL = 15;
const TIME_LIMIT = 12;

let queue: Question[] = [];
let index = 0;
let lives = 3;
let streak = 0;
let score = 0;
let best = 0;
let finished = false;
let timeLeft = 0;
let timer: number | null = null;

function styleBlock(): void {
  const root = el("trivianut-board");
  if (!root || root.dataset.styled) return;
  const style = document.createElement("style");
  style.textContent = `
    .tn-card { width:100%; max-width:440px; margin:0 auto; display:flex; flex-direction:column; gap:12px; align-items:center; }
    .tn-meta { width:100%; display:flex; justify-content:space-between; font-size:13px; font-family:monospace; color:#cbd5e1; }
    .tn-bar { width:100%; height:8px; border-radius:6px; background:rgba(255,255,255,.12); overflow:hidden; }
    .tn-bar > div { height:100%; background:linear-gradient(90deg,#34d399,#fbbf24,#f87171); transition:width .1s linear; }
    .tn-cat { font-size:12px; letter-spacing:.08em; text-transform:uppercase; color:#9fe7ff; }
    .tn-q { font-size:18px; font-weight:700; color:#fff; text-align:center; min-height:48px; }
    .tn-opts { width:100%; display:grid; grid-template-columns:1fr 1fr; gap:10px; }
    .tn-opt { padding:14px 10px; border-radius:12px; border:1px solid rgba(255,255,255,.2); background:rgba(255,255,255,.06); color:#fff; font-weight:600; cursor:pointer; transition:transform .08s, background .12s; }
    .tn-opt:hover { background:rgba(255,255,255,.14); }
    .tn-opt.correct { background:rgba(52,211,153,.55) !important; }
    .tn-opt.wrong { background:rgba(248,113,113,.55) !important; }
    .tn-progress { width:100%; height:6px; border-radius:6px; background:rgba(255,255,255,.1); }
    .tn-progress > div { height:100%; background:#9fe7ff; border-radius:6px; }
  `;
  document.head.appendChild(style);
  root.dataset.styled = "1";
}

function drawQuestion(): void {
  const root = el("trivianut-board");
  if (!root) return;
  styleBlock();
  const q = queue[index];
  root.innerHTML = "";

  const card = document.createElement("div");
  card.className = "tn-card";

  const meta = document.createElement("div");
  meta.className = "tn-meta";
  meta.innerHTML = `<span>Score: ${score}</span><span>Lives: ${"♥".repeat(lives)}${"·".repeat(Math.max(0, 3 - lives))}</span><span>Streak: ${streak}</span>`;
  card.appendChild(meta);

  const bar = document.createElement("div");
  bar.className = "tn-bar";
  const fill = document.createElement("div");
  fill.id = "tn-time";
  fill.style.width = "100%";
  bar.appendChild(fill);
  card.appendChild(bar);

  const prog = document.createElement("div");
  prog.className = "tn-progress";
  const pf = document.createElement("div");
  pf.style.width = ((index) / TOTAL) * 100 + "%";
  prog.appendChild(pf);
  card.appendChild(prog);

  const cat = document.createElement("div");
  cat.className = "tn-cat";
  cat.textContent = `Question ${index + 1}/${TOTAL} · ${q.category}`;
  card.appendChild(cat);

  const qt = document.createElement("div");
  qt.className = "tn-q";
  qt.textContent = q.q;
  card.appendChild(qt);

  const opts = document.createElement("div");
  opts.className = "tn-opts";
  q.options.forEach((opt, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "tn-opt";
    b.textContent = opt;
    b.addEventListener("click", () => answer(i, b));
    opts.appendChild(b);
  });
  card.appendChild(opts);

  root.appendChild(card);
  startTimer();
}

function startTimer(): void {
  stopTimer();
  timeLeft = TIME_LIMIT;
  timer = window.setInterval(() => {
    timeLeft -= 0.1;
    const pct = Math.max(0, (timeLeft / TIME_LIMIT) * 100);
    const t = el("tn-time");
    if (t) t.style.width = pct + "%";
    if (timeLeft <= 0) {
      stopTimer();
      timeout();
    }
  }, 100);
}

function stopTimer(): void {
  if (timer !== null) {
    clearInterval(timer);
    timer = null;
  }
}

function answer(choice: number, btn: HTMLButtonElement): void {
  if (finished) return;
  stopTimer();
  const q = queue[index];
  const buttons = btn.parentElement?.querySelectorAll(".tn-opt") ?? [];
  buttons.forEach((b) => ((b as HTMLButtonElement).disabled = true));
  if (choice === q.answer) {
    sound.success();
    btn.classList.add("correct");
    streak++;
    const speed = Math.max(0, timeLeft / TIME_LIMIT);
    const gained = 100 * streak + Math.round(speed * 60);
    score += gained;
    setTimeout(nextQuestion, 700);
  } else {
    sound.error();
    btn.classList.add("wrong");
    (buttons[q.answer] as HTMLButtonElement)?.classList.add("correct");
    streak = 0;
    lives--;
    setTimeout(() => {
      if (lives <= 0) endGame(false);
      else nextQuestion();
    }, 800);
  }
}

function timeout(): void {
  if (finished) return;
  const q = queue[index];
  const buttons = el("trivianut-board")?.querySelectorAll(".tn-opt") ?? [];
  buttons.forEach((b) => ((b as HTMLButtonElement).disabled = true));
  (buttons[q.answer] as HTMLButtonElement)?.classList.add("correct");
  streak = 0;
  lives--;
  sound.error();
  setTimeout(() => {
    if (lives <= 0) endGame(false);
    else nextQuestion();
  }, 800);
}

function nextQuestion(): void {
  index++;
  if (index >= TOTAL) {
    endGame(true);
    return;
  }
  drawQuestion();
}

function endGame(won: boolean): void {
  finished = true;
  stopTimer();
  best = setHighScore("trivianut", score);
  if (won) {
    sound.win();
    showOverlay("Quiz complete!", `You cleared all ${TOTAL} questions. Score ${score} · Best ${best}.`);
  } else {
    showOverlay("Game over", `You ran out of lives. Score ${score} · Best ${best}.`);
  }
}

function reset(): void {
  finished = false;
  lives = 3;
  streak = 0;
  score = 0;
  index = 0;
  best = getHighScore("trivianut");
  const pool = shuffle(BANK).slice(0, TOTAL);
  queue = pool.length < TOTAL ? [...pool, ...shuffle(BANK)].slice(0, TOTAL) : pool;
  hideOverlay();
  drawQuestion();
}

export function initGame(): void {
  onReset(reset);
  reset();
}
