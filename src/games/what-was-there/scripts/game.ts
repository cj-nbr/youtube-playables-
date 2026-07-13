import {
  el,
  onReset,
  showOverlay,
  hideOverlay,
  sound,
  randInt,
  shuffle,
  getHighScore,
  setHighScore,
} from "../../../shared/utils";

// What Was There — study a scene, then answer questions about visual details.

const COLORS = ["Red", "Blue", "Green", "Yellow"];
const SHAPES = ["circle", "square", "triangle"];
const HEX: Record<string, string> = {
  Red: "#ef4444",
  Blue: "#3b82f6",
  Green: "#22c55e",
  Yellow: "#eab308",
};
const SHAPE_WORD: Record<string, string> = {
  circle: "circle",
  square: "square",
  triangle: "triangle",
};

type Tile = { color: string; shape: string };
type Question = { text: string; options: string[]; answer: number };

const GRID = 4;
const ROUNDS = 5;
const PER_ROUND = 3;
const STUDY = 4500;

let scene: Tile[] = [];
let questions: Question[] = [];
let round = 0;
let qi = 0;
let correct = 0;
let best = 0;
let finished = false;
let studyTimer: number | null = null;
let feedbackTimer: number | null = null;

function styleBlock(): void {
  const root = el("whatwasthere-board");
  if (!root || root.dataset.styled) return;
  const style = document.createElement("style");
  style.textContent = `
    .wwt-wrap { width:100%; max-width:420px; margin:0 auto; display:flex; flex-direction:column; gap:14px; align-items:center; }
    .wwt-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:6px; width:100%; }
    .wwt-cell { aspect-ratio:1/1; display:flex; align-items:center; justify-content:center; border-radius:10px; background:rgba(255,255,255,.06); }
    .wwt-shape { width:62%; height:62%; }
    .wwt-circle { border-radius:50%; }
    .wwt-square { border-radius:6px; }
    .wwt-triangle { width:0; height:0; border-left:26px solid transparent; border-right:26px solid transparent; }
    .wwt-meta { width:100%; display:flex; justify-content:space-between; font-size:13px; font-family:monospace; color:#cbd5e1; }
    .wwt-q { font-size:17px; font-weight:700; color:#fff; text-align:center; min-height:44px; }
    .wwt-opts { width:100%; display:grid; grid-template-columns:1fr 1fr; gap:10px; }
    .wwt-opt { padding:14px 8px; border-radius:12px; border:1px solid rgba(255,255,255,.2); background:rgba(255,255,255,.06); color:#fff; font-weight:600; cursor:pointer; }
    .wwt-opt:hover { background:rgba(255,255,255,.14); }
    .wwt-opt.correct { background:rgba(52,211,153,.55) !important; }
    .wwt-opt.wrong { background:rgba(248,113,113,.55) !important; }
    .wwt-note { font-size:14px; color:#9fe7ff; text-align:center; }
    .wwt-count { font-size:13px; font-family:monospace; color:#cbd5e1; }
  `;
  document.head.appendChild(style);
  root.dataset.styled = "1";
}

function makeShape(shape: string, color: string): HTMLElement {
  const s = document.createElement("div");
  s.className = "wwt-shape wwt-" + shape;
  if (shape === "triangle") {
    s.style.borderBottom = "46px solid " + color;
  } else {
    s.style.background = color;
  }
  return s;
}

function buildScene(): void {
  scene = [];
  for (let i = 0; i < GRID * GRID; i++) {
    scene.push({
      color: COLORS[randInt(0, COLORS.length - 1)],
      shape: SHAPES[randInt(0, SHAPES.length - 1)],
    });
  }
}

function buildQuestions(): void {
  questions = [];
  const gens = [genCount, genColorAt, genShapeAt];
  for (let i = 0; i < PER_ROUND; i++) {
    const g = gens[randInt(0, gens.length - 1)];
    questions.push(g());
  }
}

function genCount(): Question {
  const color = COLORS[randInt(0, COLORS.length - 1)];
  const shape = SHAPES[randInt(0, SHAPES.length - 1)];
  const count = scene.filter((t) => t.color === color && t.shape === shape).length;
  const set = new Set<number>([count]);
  let guard = 0;
  while (set.size < 4 && guard++ < 50) {
    const v = randInt(0, GRID * GRID);
    if (v !== count) set.add(v);
  }
  const options = shuffle([...set]);
  return {
    text: `How many ${color} ${SHAPE_WORD[shape]}s were in the grid?`,
    options,
    answer: options.indexOf(count),
  };
}

function genColorAt(): Question {
  const idx = randInt(0, scene.length - 1);
  const cell = scene[idx];
  const r = Math.floor(idx / GRID);
  const c = idx % GRID;
  const options = shuffle([...COLORS]);
  return {
    text: `What color was the ${SHAPE_WORD[cell.shape]} in row ${r + 1}, column ${c + 1}?`,
    options,
    answer: options.indexOf(cell.color),
  };
}

function genShapeAt(): Question {
  const idx = randInt(0, scene.length - 1);
  const cell = scene[idx];
  const r = Math.floor(idx / GRID);
  const c = idx % GRID;
  const pool = shuffle([...SHAPES, "diamond"]);
  return {
    text: `Which shape was in row ${r + 1}, column ${c + 1}?`,
    options: pool,
    answer: pool.indexOf(cell.shape),
  };
}

function renderShapeInto(parent: HTMLElement, t: Tile): void {
  parent.appendChild(makeShape(t.shape, HEX[t.color]));
}

function showStudy(): void {
  const root = el("whatwasthere-board");
  if (!root) return;
  styleBlock();
  root.innerHTML = "";
  const wrap = document.createElement("div");
  wrap.className = "wwt-wrap";

  const meta = document.createElement("div");
  meta.className = "wwt-meta";
  meta.innerHTML = `<span>Round ${round + 1}/${ROUNDS}</span><span>Score: ${correct}</span>`;
  wrap.appendChild(meta);

  const note = document.createElement("div");
  note.className = "wwt-note";
  note.textContent = "Memorize the grid!";
  wrap.appendChild(note);

  const grid = document.createElement("div");
  grid.className = "wwt-grid";
  scene.forEach((t) => {
    const cell = document.createElement("div");
    cell.className = "wwt-cell";
    renderShapeInto(cell, t);
    grid.appendChild(cell);
  });
  wrap.appendChild(grid);

  const count = document.createElement("div");
  count.className = "wwt-count";
  let left = STUDY / 1000;
  count.textContent = `Study time: ${left}s`;
  wrap.appendChild(count);

  root.appendChild(wrap);
  studyTimer = window.setInterval(() => {
    left -= 0.1;
    count.textContent = `Study time: ${Math.max(0, left).toFixed(1)}s`;
    if (left <= 0) {
      clearInterval(studyTimer!);
      studyTimer = null;
      showQuiz();
    }
  }, 100);
}

function showQuiz(): void {
  const root = el("whatwasthere-board");
  if (!root) return;
  root.innerHTML = "";
  const wrap = document.createElement("div");
  wrap.className = "wwt-wrap";

  const meta = document.createElement("div");
  meta.className = "wwt-meta";
  meta.innerHTML = `<span>Round ${round + 1}/${ROUNDS} · Q ${qi + 1}/${PER_ROUND}</span><span>Score: ${correct}</span>`;
  wrap.appendChild(meta);

  const q = questions[qi];
  const qt = document.createElement("div");
  qt.className = "wwt-q";
  qt.textContent = q.text;
  wrap.appendChild(qt);

  const opts = document.createElement("div");
  opts.className = "wwt-opts";
  q.options.forEach((opt, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "wwt-opt";
    b.textContent = opt;
    b.addEventListener("click", () => answer(i, b));
    opts.appendChild(b);
  });
  wrap.appendChild(opts);
  root.appendChild(wrap);
}

function answer(choice: number, btn: HTMLButtonElement): void {
  if (finished) return;
  const q = questions[qi];
  const buttons = btn.parentElement?.querySelectorAll(".wwt-opt") ?? [];
  buttons.forEach((b) => ((b as HTMLButtonElement).disabled = true));
  if (choice === q.answer) {
    correct++;
    sound.success();
    btn.classList.add("correct");
  } else {
    sound.error();
    btn.classList.add("wrong");
    (buttons[q.answer] as HTMLButtonElement)?.classList.add("correct");
  }
  feedbackTimer = window.setTimeout(() => {
    qi++;
    if (qi >= PER_ROUND) {
      round++;
      qi = 0;
      if (round >= ROUNDS) {
        endGame();
        return;
      }
      prepareRound();
    } else {
      showQuiz();
    }
  }, 850);
}

function prepareRound(): void {
  buildScene();
  buildQuestions();
  showStudy();
}

function endGame(): void {
  finished = true;
  const total = ROUNDS * PER_ROUND;
  const threshold = Math.ceil(total * 0.6);
  const passed = correct >= threshold;
  best = setHighScore("whatwasthere", correct);
  if (passed) {
    sound.win();
    showOverlay("Great memory!", `You scored ${correct}/${total}. Needed ${threshold}. Best ${best}.`);
  } else {
    sound.error();
    showOverlay("So close!", `You scored ${correct}/${total}. Needed ${threshold} to win. Best ${best}.`);
  }
}

function clearTimers(): void {
  if (studyTimer !== null) {
    clearInterval(studyTimer);
    studyTimer = null;
  }
  if (feedbackTimer !== null) {
    clearTimeout(feedbackTimer);
    feedbackTimer = null;
  }
}

function reset(): void {
  clearTimers();
  finished = false;
  round = 0;
  qi = 0;
  correct = 0;
  best = getHighScore("whatwasthere");
  hideOverlay();
  prepareRound();
}

export function initGame(): void {
  onReset(reset);
  reset();
}
