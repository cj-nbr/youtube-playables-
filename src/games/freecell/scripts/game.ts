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
} from "../../../shared/utils";

type Suit = 0 | 1 | 2 | 3;
type Card = { suit: Suit; rank: number };

const SUIT_SYM = ["♣", "♦", "♥", "♠"];
const SUIT_COLOR = ["#1a1a1a", "#d63b3b", "#d63b3b", "#1a1a1a"];

let columns: Card[][] = [];
let freeCells: (Card | null)[] = [null, null, null, null];
let foundations: Card[][] = [[], [], [], []];
let selected: { type: "column" | "freecell" | "foundation"; index: number; cardIndex?: number } | null = null;
let moves = 0;
let best = 0;

function createDeck(): Card[] {
  const deck: Card[] = [];
  for (const s of [0, 1, 2, 3] as Suit[]) {
    for (let r = 1; r <= 13; r++) {
      deck.push({ suit: s, rank: r });
    }
  }
  return shuffle(deck);
}

function deal() {
  const deck = createDeck();
  columns = [[], [], [], [], [], [], [], []];
  freeCells = [null, null, null, null];
  foundations = [[], [], [], []];
  selected = null;
  let idx = 0;
  for (let c = 0; c < 8; c++) {
    const count = c < 6 ? 7 : 6;
    for (let r = 0; r < count; r++) {
      columns[c].push(deck[idx++]);
    }
  }
  moves = 0;
  best = getHighScore("freecell");
}

function emptyFreeCells() {
  return freeCells.filter((c) => c === null).length;
}

function emptyColumns() {
  return columns.filter((c) => c.length === 0).length;
}

function canMoveStack(fromCol: number, fromIdx: number, toCol: number): boolean {
  const stack = columns[fromCol].slice(fromIdx);
  const top = stack[0];
  const needed = toCol !== -1 && columns[toCol].length === 0 ? stack.length - 1 : stack.length;
  return emptyFreeCells() + emptyColumns() >= needed;
}

function validStack(fromCol: number, fromIdx: number): boolean {
  const stack = columns[fromCol].slice(fromIdx);
  for (let i = 0; i < stack.length - 1; i++) {
    const a = stack[i];
    const b = stack[i + 1];
    if (a.rank !== b.rank + 1) return false;
    if ((a.suit === 0 || a.suit === 3) === (b.suit === 0 || b.suit === 3)) return false;
  }
  return true;
}

function tryMove(targetType: "column" | "freecell" | "foundation", targetIndex: number) {
  if (!selected) return;
  let card: Card;
  let stack: Card[] = [];
  let srcCol: number | null = null;
  let srcIdx: number | null = null;

  if (selected.type === "column") {
    srcCol = selected.index;
    srcIdx = selected.cardIndex ?? columns[selected.index].length - 1;
    stack = columns[selected.index].slice(srcIdx);
    if (stack.length === 0) return;
    card = stack[0];
  } else if (selected.type === "freecell") {
    if (freeCells[selected.index] === null) return;
    card = freeCells[selected.index]!;
    stack = [card];
  } else {
    return;
  }

  if (targetType === "column") {
    if (!canMoveStack(srcCol ?? -1, srcIdx ?? 0, targetIndex)) {
      sound.error();
      return;
    }
    const targetTop = columns[targetIndex].length > 0 ? columns[targetIndex][columns[targetIndex].length - 1] : null;
    if (targetTop) {
      if (targetTop.rank !== card.rank + 1) { sound.error(); return; }
      if ((targetTop.suit === 0 || targetTop.suit === 3) === (card.suit === 0 || card.suit === 3)) { sound.error(); return; }
    }
    if (selected.type === "column") {
      columns[targetIndex].push(...stack);
      columns[selected.index].splice(selected.cardIndex ?? columns[selected.index].length, stack.length);
    } else {
      freeCells[selected.index] = null;
      columns[targetIndex].push(card);
    }
  } else if (targetType === "freecell") {
    if (freeCells[targetIndex] !== null) { sound.error(); return; }
    if (selected.type === "column") {
      freeCells[targetIndex] = card;
      columns[selected.index].splice(selected.cardIndex ?? columns[selected.index].length, 1);
    } else {
      const tmp = freeCells[selected.index];
      freeCells[selected.index] = freeCells[targetIndex];
      freeCells[targetIndex] = tmp;
    }
  } else if (targetType === "foundation") {
    const targetTop = foundations[targetIndex].length > 0 ? foundations[targetIndex][foundations[targetIndex].length - 1] : null;
    if (!targetTop) {
      if (card.rank !== 1) { sound.error(); return; }
    } else {
      if (targetTop.suit !== card.suit || targetTop.rank !== card.rank - 1) { sound.error(); return; }
    }
    if (selected.type === "column") {
      foundations[targetIndex].push(card);
      columns[selected.index].splice(selected.cardIndex ?? columns[selected.index].length, 1);
    } else {
      foundations[targetIndex].push(card);
      freeCells[selected.index] = null;
    }
  }

  sound.success();
  moves++;
  selected = null;
  checkWin();
  draw();
}

function draw() {
  const root = el("freecell");
  if (!root) return;
  root.innerHTML = "";
  const area = getGameArea();
  const totalW = Math.min(520, area.w);
  const gap = 5;
  const colW = Math.max(40, Math.floor((totalW - gap * 15) / 12));
  const cardH = Math.floor(colW * 1.35);
  const freeW = Math.floor(colW * 0.85);

  root.style.display = "flex";
  root.style.flexDirection = "column";
  root.style.gap = gap + "px";

  const topRow = document.createElement("div");
  topRow.style.display = "flex";
  topRow.style.gap = gap + "px";
  topRow.style.justifyContent = "space-between";

  const freeDiv = document.createElement("div");
  freeDiv.style.display = "flex";
  freeDiv.style.gap = gap + "px";
  for (let i = 0; i < 4; i++) {
    const slot = document.createElement("div");
    slot.style.width = freeW + "px";
    slot.style.height = cardH + "px";
    slot.style.border = "2px dashed rgba(255,255,255,0.2)";
    slot.style.borderRadius = "6px";
    if (freeCells[i]) renderCard(slot, freeCells[i], freeW, cardH, true);
    slot.addEventListener("click", () => {
      if (freeCells[i]) { selected = { type: "freecell", index: i }; }
      else if (selected && selected.type !== "foundation") { tryMove("freecell", i); }
      draw();
    });
    freeDiv.appendChild(slot);
  }

  const foundDiv = document.createElement("div");
  foundDiv.style.display = "flex";
  foundDiv.style.gap = gap + "px";
  for (let i = 0; i < 4; i++) {
    const slot = document.createElement("div");
    slot.style.width = freeW + "px";
    slot.style.height = cardH + "px";
    slot.style.border = "2px dashed rgba(255,255,255,0.2)";
    slot.style.borderRadius = "6px";
    if (foundations[i].length > 0) renderCard(slot, topCard(foundations[i])!, freeW, cardH, true);
    slot.addEventListener("click", () => {
      if (selected && selected.type !== "foundation") tryMove("foundation", i);
    });
    foundDiv.appendChild(slot);
  }

  topRow.appendChild(freeDiv);
  topRow.appendChild(foundDiv);
  root.appendChild(topRow);

  const grid = document.createElement("div");
  grid.style.display = "flex";
  grid.style.gap = gap + "px";
  grid.style.flex = "1";
  for (let c = 0; c < 8; c++) {
    const col = document.createElement("div");
    col.style.width = colW + "px";
    col.style.position = "relative";
    col.style.flex = "1";
    for (let r = 0; r < columns[c].length; r++) {
      const cardWrap = document.createElement("div");
      cardWrap.style.position = "absolute";
      cardWrap.style.top = r * 22 + "px";
      cardWrap.style.left = "0";
      renderCard(cardWrap, columns[c][r], colW, 26, false);
      const idx = r;
      cardWrap.addEventListener("click", () => {
        const cand = validStack(c, idx);
        if (selected && selected.type === "column" && selected.index === c && selected.cardIndex === idx && cand) {
          selected = null;
        } else if (selected) {
          tryMove("column", c);
        } else if (cand) {
          selected = { type: "column", index: c, cardIndex: idx };
        }
        draw();
      });
      col.appendChild(cardWrap);
    }
    grid.appendChild(col);
  }
  root.appendChild(grid);

  const status = el("status");
  if (status) status.textContent = `Moves: ${moves} · Best: ${best}`;
}

function topCard(pile: Card[]) {
  return pile.length > 0 ? pile[pile.length - 1] : null;
}

function renderCard(container: HTMLElement, card: Card, w: number, h: number, full: boolean) {
  const isRed = card.suit === 1 || card.suit === 2;
  const bg = isRed ? "#fff5f5" : "#f8f8f8";
  container.style.width = w + "px";
  container.style.height = h + "px";
  container.style.background = bg;
  container.style.borderRadius = full ? "6px" : "4px";
  container.style.boxShadow = "0 1px 2px rgba(0,0,0,0.15)";
  container.style.border = "1px solid rgba(0,0,0,0.08)";
  container.style.display = "flex";
  container.style.alignItems = "center";
  container.style.justifyContent = "center";
  container.style.color = SUIT_COLOR[card.suit];
  container.style.fontFamily = "ui-monospace, monospace";
  container.style.fontWeight = "700";
  container.style.fontSize = full ? "14px" : "11px";
  container.style.lineHeight = "1";
  container.style.position = full ? "relative" : "";
  const rank = card.rank === 1 ? "A" : card.rank <= 10 ? String(card.rank) : card.rank === 11 ? "J" : card.rank === 12 ? "Q" : "K";
  container.textContent = rank + SUIT_SYM[card.suit];
}

function checkWin() {
  const total = foundations.reduce((s, f) => s + f.length, 0);
  if (total === 52) {
    best = setHighScore("freecell", moves, true);
    sound.win();
    showOverlay("You win!", `Cleared in ${moves} moves. Best: ${best}.`);
    const status = el("status");
    if (status) status.textContent = `Complete! Moves: ${moves} · Best: ${best}`;
  }
}

function reset() {
  deal();
  draw();
  const status = el("status");
  if (status) status.textContent = `Moves: 0 · Best: ${best}`;
  hideOverlay();
}

export function initGame() {
  onReset(reset);
  reset();
}
