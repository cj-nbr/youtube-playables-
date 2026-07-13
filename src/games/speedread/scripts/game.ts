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

// Speed Read — read a passage, then answer comprehension questions against a
// timer. Correct answers score points plus a speed bonus; wrong answers or
// timeouts cost a life. Highest score is saved.

interface Question {
  q: string;
  options: string[];
  answer: number;
}
interface Passage {
  text: string;
  questions: Question[];
}

const Q_TIME = 15;
const START_LIVES = 3;
const BASE_POINTS = 20;

const PASSAGES: Passage[] = [
  {
    text:
      "When a honeybee finds a rich patch of flowers, it returns to the hive and performs a looping movement called the waggle dance. The angle of the dance relative to the sun tells other bees which direction to fly, and the length of the waggle signals how far away the food is. In this way, a single scout can send hundreds of workers straight to a meal.",
    questions: [
      {
        q: "What does the waggle dance communicate?",
        options: ["Direction and distance to food", "The hive's temperature", "Approaching predators", "The age of the queen"],
        answer: 0,
      },
      {
        q: "The angle of the dance is measured relative to what?",
        options: ["The sun", "The moon", "The wind", "The flower's color"],
        answer: 0,
      },
      {
        q: "What does the length of the waggle indicate?",
        options: ["How far the food is", "How sweet the nectar is", "How many bees exist", "The time of day"],
        answer: 0,
      },
    ],
  },
  {
    text:
      "The Great Wall of China is not a single continuous structure but a network of walls built by different dynasties over many centuries. Contrary to a popular myth, it cannot be seen from space with the naked eye, since it is long but very narrow. Much of the wall standing today was built during the Ming dynasty, using brick and stone rather than earlier packed earth.",
    questions: [
      {
        q: "The Great Wall is best described as:",
        options: ["A network of walls from many dynasties", "A single wall built in one year", "A natural rock formation", "A modern tourist road"],
        answer: 0,
      },
      {
        q: "What myth does the passage correct?",
        options: ["That it is visible from space with the naked eye", "That it is made of gold", "That it was built by aliens", "That it is underwater"],
        answer: 0,
      },
      {
        q: "Most of today's standing wall was built during which dynasty?",
        options: ["Ming", "Han", "Tang", "Qin"],
        answer: 0,
      },
    ],
  },
  {
    text:
      "Plants make their own food through photosynthesis. Using energy from sunlight, they combine carbon dioxide from the air with water drawn up through their roots to produce sugar. Oxygen is released as a by-product, which is why forests and oceans are vital to the air we breathe. The green pigment chlorophyll captures the light that powers the whole process.",
    questions: [
      {
        q: "What powers photosynthesis?",
        options: ["Sunlight", "Soil minerals", "Moonlight", "Heat from the ground"],
        answer: 0,
      },
      {
        q: "What gas is released as a by-product?",
        options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
        answer: 0,
      },
      {
        q: "Which pigment captures the light?",
        options: ["Chlorophyll", "Hemoglobin", "Melanin", "Keratin"],
        answer: 0,
      },
    ],
  },
  {
    text:
      "A volcano forms where molten rock, called magma, rises toward the Earth's surface. When it erupts, the magma is known as lava. Some eruptions are gentle, with lava flowing slowly, while others are explosive, hurling ash and rock high into the sky. The ash can travel great distances on the wind, sometimes disrupting air travel thousands of miles away.",
    questions: [
      {
        q: "What is magma called once it erupts?",
        options: ["Lava", "Ash", "Pumice", "Basalt"],
        answer: 0,
      },
      {
        q: "Why can eruptions disrupt distant air travel?",
        options: ["Ash travels far on the wind", "Lava floods airports", "Magma blocks runways", "Smoke stops engines directly"],
        answer: 0,
      },
      {
        q: "Which describes a gentle eruption?",
        options: ["Lava flowing slowly", "Rock hurled into the sky", "A sudden explosion", "Thick ash clouds"],
        answer: 0,
      },
    ],
  },
  {
    text:
      "Sleep is far from a passive state. While you rest, your brain sorts through the day's events, moving important memories into long-term storage and discarding what it does not need. This is one reason a good night's sleep before an exam often helps more than staying up late to study. During deep sleep the body also repairs tissues and strengthens the immune system.",
    questions: [
      {
        q: "What does the brain do with memories during sleep?",
        options: ["Moves important ones to long-term storage", "Erases all of them", "Copies them to the eyes", "Sends them to the stomach"],
        answer: 0,
      },
      {
        q: "Before an exam, the passage suggests it is better to:",
        options: ["Sleep well", "Skip sleep entirely", "Study only while asleep", "Eat a large meal"],
        answer: 0,
      },
      {
        q: "What happens to the body during deep sleep?",
        options: ["Tissues are repaired", "Muscles shrink", "Bones dissolve", "Hair stops growing"],
        answer: 0,
      },
    ],
  },
  {
    text:
      "Around 1440, Johannes Gutenberg introduced a printing press that used movable metal type. Before this, books were copied by hand, making them rare and expensive. The press allowed identical copies to be produced quickly and cheaply, spreading ideas across Europe faster than ever before. Many historians see it as one of the most important inventions in human history.",
    questions: [
      {
        q: "What made Gutenberg's press revolutionary?",
        options: ["It produced identical copies quickly and cheaply", "It printed in full color", "It wrote by hand faster", "It used no ink at all"],
        answer: 0,
      },
      {
        q: "How were books made before the press?",
        options: ["Copied by hand", "Printed by machines", "Recorded on tape", "Carved into stone only"],
        answer: 0,
      },
      {
        q: "What was one major effect of the press?",
        options: ["Ideas spread faster across Europe", "Books became rarer", "Reading was banned", "Paper disappeared"],
        answer: 0,
      },
    ],
  },
  {
    text:
      "Tides are the daily rise and fall of the sea, caused mainly by the gravitational pull of the moon. As the Earth rotates, the moon's gravity tugs the oceans, creating a bulge of water that we experience as high tide. The sun also affects tides, and when the sun and moon line up, their combined pull produces especially high tides called spring tides.",
    questions: [
      {
        q: "What mainly causes ocean tides?",
        options: ["The moon's gravity", "Ocean currents", "Wind storms", "Earthquakes"],
        answer: 0,
      },
      {
        q: "What are spring tides?",
        options: ["Especially high tides when sun and moon align", "Tides that occur only in spring", "Tides caused by rivers", "The lowest tides of the year"],
        answer: 0,
      },
    ],
  },
];

let score = 0;
let lives = START_LIVES;
let best = 0;
let passageIdx = 0;
let phase: "read" | "question" | "feedback" | "idle" = "idle";
let qIdx = 0;
let timeLeft = 0;
let answered = false;
let picked = -1;
let timer: number | null = null;

function passage(): Passage {
  return PASSAGES[passageIdx];
}

function readTime(): number {
  const words = passage().text.trim().split(/\s+/).length;
  return Math.max(12, Math.min(30, Math.round(words / 2.6)));
}

function startTimer() {
  if (timer !== null) clearInterval(timer);
  timer = window.setInterval(tick, 1000);
}

function stopTimer() {
  if (timer !== null) {
    clearInterval(timer);
    timer = null;
  }
}

function tick() {
  if (phase === "read") {
    timeLeft--;
    if (timeLeft <= 0) {
      startQuestions();
      return;
    }
    draw();
  } else if (phase === "question") {
    timeLeft--;
    if (timeLeft <= 0) {
      resolve(-1);
      return;
    }
    draw();
  }
}

function startPassage(idx: number) {
  passageIdx = idx;
  phase = "read";
  timeLeft = readTime();
  qIdx = 0;
  answered = false;
  picked = -1;
  draw();
  startTimer();
}

function startQuestions() {
  phase = "question";
  qIdx = 0;
  beginQuestion();
}

function beginQuestion() {
  phase = "question";
  timeLeft = Q_TIME;
  answered = false;
  picked = -1;
  draw();
}

function resolve(choice: number) {
  if (answered) return;
  answered = true;
  picked = choice;
  const q = passage().questions[qIdx];
  const correct = choice === q.answer;
  phase = "feedback";

  if (correct) {
    const bonus = Math.max(0, timeLeft) * 2;
    const gained = BASE_POINTS + bonus;
    score += gained;
    best = setHighScore("speedread", score);
    sound.success();
    setStatus(`+${gained}!  Score: ${score} · Lives: ${lives}`);
  } else {
    lives--;
    sound.error();
    setStatus(`Wrong! Score: ${score} · Lives: ${lives}`);
  }
  draw();

  window.setTimeout(() => {
    if (lives <= 0) {
      gameOver();
      return;
    }
    qIdx++;
    if (qIdx < passage().questions.length) {
      beginQuestion();
    } else {
      // Next passage (avoid immediate repeat when possible).
      let next = randInt(0, PASSAGES.length - 1);
      if (PASSAGES.length > 1) {
        while (next === passageIdx) next = randInt(0, PASSAGES.length - 1);
      }
      sound.win();
      startPassage(next);
    }
  }, 1000);
}

function answer(choice: number) {
  if (phase !== "question" || answered) return;
  resolve(choice);
}

function gameOver() {
  stopTimer();
  phase = "idle";
  best = setHighScore("speedread", score);
  showOverlay("Out of lives", `Final score: ${score}. Best: ${best}.`);
}

function setStatus(msg: string) {
  const status = el("status");
  if (status) status.textContent = msg;
}

function livesText(): string {
  return "♥".repeat(Math.max(0, lives)) + "♡".repeat(Math.max(0, START_LIVES - lives));
}

function draw() {
  const root = el("speedread");
  if (!root) return;
  root.innerHTML = "";
  root.style.display = "flex";
  root.style.flexDirection = "column";
  root.style.gap = "12px";
  root.style.width = "100%";
  root.style.textAlign = "left";

  // Header bar.
  const bar = document.createElement("div");
  bar.style.display = "flex";
  bar.style.justifyContent = "space-between";
  bar.style.alignItems = "center";
  bar.style.fontSize = "13px";
  bar.style.color = "rgba(255,255,255,.8)";
  const left = document.createElement("span");
  left.textContent = `Score ${score}`;
  const mid = document.createElement("span");
  mid.textContent = livesText();
  mid.style.color = "#ff6b6b";
  const right = document.createElement("span");
  right.textContent = `⏱ ${Math.max(0, timeLeft)}s`;
  bar.appendChild(left);
  bar.appendChild(mid);
  bar.appendChild(right);
  root.appendChild(bar);

  // Timer bar.
  const total = phase === "read" ? readTime() : Q_TIME;
  const track = document.createElement("div");
  track.style.height = "6px";
  track.style.borderRadius = "999px";
  track.style.background = "rgba(255,255,255,.12)";
  track.style.overflow = "hidden";
  const fill = document.createElement("div");
  fill.style.height = "100%";
  fill.style.width = `${(Math.max(0, timeLeft) / total) * 100}%`;
  fill.style.background = phase === "read" ? "#00dfd8" : "#ffd34e";
  fill.style.transition = "width .3s linear";
  track.appendChild(fill);
  root.appendChild(track);

  if (phase === "read") {
    const label = document.createElement("div");
    label.textContent = "Read carefully…";
    label.style.fontSize = "12px";
    label.style.color = "rgba(255,255,255,.55)";
    root.appendChild(label);

    const p = document.createElement("p");
    p.textContent = passage().text;
    p.style.fontSize = "15px";
    p.style.lineHeight = "1.55";
    p.style.color = "#fff";
    root.appendChild(p);

    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = "Start questions →";
    styleBtn(btn, true);
    btn.addEventListener("click", () => {
      sound.click();
      startQuestions();
    });
    root.appendChild(btn);
  } else {
    const q = passage().questions[qIdx];
    const prog = document.createElement("div");
    prog.textContent = `Question ${qIdx + 1} of ${passage().questions.length}`;
    prog.style.fontSize = "12px";
    prog.style.color = "rgba(255,255,255,.55)";
    root.appendChild(prog);

    const qEl = document.createElement("p");
    qEl.textContent = q.q;
    qEl.style.fontSize = "16px";
    qEl.style.fontWeight = "600";
    qEl.style.color = "#fff";
    qEl.style.lineHeight = "1.4";
    root.appendChild(qEl);

    const opts = document.createElement("div");
    opts.style.display = "flex";
    opts.style.flexDirection = "column";
    opts.style.gap = "8px";
    q.options.forEach((opt, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = opt;
      b.style.textAlign = "left";
      b.style.padding = "12px 14px";
      b.style.borderRadius = "10px";
      b.style.fontSize = "14px";
      b.style.cursor = "pointer";
      b.style.border = "1px solid rgba(255,255,255,.18)";
      b.style.background = "rgba(255,255,255,.08)";
      b.style.color = "#fff";
      if (phase === "feedback") {
        if (i === q.answer) {
          b.style.background = "#00c07a";
          b.style.color = "#04212b";
        } else if (i === picked) {
          b.style.background = "rgba(255,90,90,.4)";
        }
      }
      b.addEventListener("click", () => answer(i));
      opts.appendChild(b);
    });
    root.appendChild(opts);
  }
}

function styleBtn(b: HTMLButtonElement, primary: boolean) {
  b.style.height = "44px";
  b.style.borderRadius = "10px";
  b.style.fontSize = "15px";
  b.style.fontWeight = "600";
  b.style.cursor = "pointer";
  b.style.border = "none";
  b.style.marginTop = "4px";
  b.style.background = primary ? "#00dfd8" : "rgba(255,255,255,.1)";
  b.style.color = primary ? "#04212b" : "#fff";
}

function reset() {
  stopTimer();
  score = 0;
  lives = START_LIVES;
  best = getHighScore("speedread");
  hideOverlay();
  setStatus(`Score 0 · Lives: ${lives} · Best: ${best}`);
  startPassage(randInt(0, PASSAGES.length - 1));
}

export function initGame() {
  onReset(reset);
  reset();
}
