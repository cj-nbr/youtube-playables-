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
type Card = { suit: Suit; rank: number; faceUp: boolean };

const SUITS: Suit[] = [0, 1, 2, 3];
const SUIT_SYM = ["♣", "♦", "♥", "♠"];
const SUIT_COLOR = ["#1a1a1a", "#d63b3b", "#d63b3b", "#1a1a1a"];

let tableau: Card[][] = [];
let waste: Card[] = [];
let stock: Card[] = [];
let foundations: Card[][] = [[], [], [], []];
let selected: { pile: "tableau" | "waste" | "foundation"; col: number } | null = null;
let moves = 0;
let best = 0;

function createDeck(): Card[] {
  const deck: Card[] = [];
  for (const s of SUITS) {
    for (let r = 1; r <= 13; r++) {
      deck.push({ suit: s, rank: r, faceUp: false });
    }
  }
  return shuffle(deck);
}

function deal() {
  const deck = createDeck();
  tableau = [[], [], [], [], [], [], []];
  waste = [];
  foundations = [[], [], [], []];
  selected = null;
  let idx = 0;
  for (let c = 0; c < 7; c++) {
    for (let r = 0; r <= c; r++) {
      tableau[c].push(deck[idx++]);
    }
    tableau[c][tableau[c].length - 1].faceUp = true;
  }
  stock = deck.slice(idx);
  moves = 0;
  best = getHighScore("solitaire");
}

function topCard(pile: Card[]) {
  return pile.length > 0 ? pile[pile.length - 1] : null;
}

function canPlaceOnTableau(card: Card, col: number): boolean {
  const target = topCard(tableau[col]);
  if (!target) return card.rank === 13;
  if (!target.faceUp) return false;
  if (target.rank !== card.rank + 1) return false;
  return (
    (target.suit === 0 || target.suit === 3) !==
    (card.suit === 0 || card.suit === 3)
  );
}

function canPlaceOnFoundation(card: Card, f: number): boolean {
  const target = topCard(foundations[f]);
  if (!target) return card.rank === 1;
  return target.suit === card.suit && target.rank === card.rank - 1;
}

function tryMove(targetType: "tableau" | "foundation", targetCol: number) {
  if (!selected) return;
  let card: Card;
  if (selected.pile === "tableau") {
    const pile = tableau[selected.col];
    card = topCard(pile)!;
    if (!card) return;
  } else if (selected.pile === "waste") {
    if (waste.length === 0) return;
    card = topCard(waste)!;
  } else {
    return;
  }

  if (targetType === "tableau") {
    if (!canPlaceOnTableau(card, targetCol)) {
      sound.error();
      return;
    }
    if (selected.pile === "tableau") {
      if (selected.col === targetCol) return;
      const moving = tableau[selected.col].slice(tableau[selected.col].indexOf(card));
      tableau[targetCol].push(...moving);
      const src = tableau[selected.col];
      src.splice(src.indexOf(card));
      if (src.length > 0 && !src[src.length - 1].faceUp) src[src.length - 1].faceUp = true;
    } else {
      const c = waste.pop()!;
      tableau[targetCol].push(c);
    }
  } else if (targetType === "foundation") {
    if (!canPlaceOnFoundation(card, targetCol)) {
      sound.error();
      return;
    }
    if (selected.pile === "tableau") {
      tableau[selected.col].pop();
    } else {
      waste.pop();
    }
    foundations[targetCol].push(card);
  }

  sound.success();
  moves++;
  selected = null;
  checkWin();
  draw();
}

function drawCardFromStock() {
  if (stock.length === 0) {
    if (waste.length === 0) return;
    stock = waste.reverse();
    waste = [];
    stock.forEach((c) => (c.faceUp = false));
  }
  const c = stock.pop()!;
  c.faceUp = true;
  waste.push(c);
  sound.click();
  draw();
}

function draw() {
  const root = el("solitaire");
  if (!root) return;
  root.innerHTML = "";
  const area = getGameArea();
  const totalW = Math.min(480, area.w);
  const gap = 6;
  const cardW = Math.max(36, Math.floor((totalW - gap * 8) / 13));
  const cardH = Math.floor(cardW * 1.4);

  root.style.display = "flex";
  root.style.flexDirection = "column";
  root.style.gap = gap + "px";

  const topRow = document.createElement("div");
  topRow.style.display = "flex";
  topRow.style.gap = gap + "px";
  topRow.style.justifyContent = "space-between";

  const foundationsDiv = document.createElement("div");
  foundationsDiv.style.display = "flex";
  foundationsDiv.style.gap = gap + "px";
  for (let i = 0; i < 4; i++) {
    const slot = document.createElement("div");
    slot.style.width = cardW + "px";
    slot.style.height = cardH + "px";
    slot.style.border = "2px dashed rgba(255,255,255,0.2)";
    slot.style.borderRadius = "6px";
    slot.dataset.foundation = String(i);
    if (foundations[i].length > 0) {
      renderCard(slot, topCard(foundations[i])!, cardW, cardH, true);
    }
    slot.addEventListener("click", () => {
      if (selected && selected.pile !== "foundation") tryMove("foundation", i);
    });
    foundationsDiv.appendChild(slot);
  }

  const stockWaste = document.createElement("div");
  stockWaste.style.display = "flex";
  stockWaste.style.gap = gap + "px";

  const stockDiv = document.createElement("div");
  stockDiv.style.width = cardW + "px";
  stockDiv.style.height = cardH + "px";
  stockDiv.style.border = "2px solid rgba(255,255,255,0.2)";
  stockDiv.style.borderRadius = "6px";
  stockDiv.style.display = "flex";
  stockDiv.style.alignItems = "center";
  stockDiv.style.justifyContent = "center";
  stockDiv.style.color = "rgba(255,255,255,0.6)";
  stockDiv.style.fontSize = "12px";
  stockDiv.textContent = stock.length > 0 ? `Stock\n${stock.length}` : "Recycle";
  stockDiv.addEventListener("click", drawCardFromStock);
  stockWaste.appendChild(stockDiv);

  const wasteDiv = document.createElement("div");
  wasteDiv.style.width = cardW + "px";
  wasteDiv.style.height = cardH + "px";
  wasteDiv.style.position = "relative";
  if (waste.length > 0) {
    renderCard(wasteDiv, topCard(waste)!, cardW, cardH, true);
  }
  wasteDiv.addEventListener("click", () => {
    if (waste.length > 0) {
      selected = { pile: "waste", col: 0 };
      draw();
    }
  });
  stockWaste.appendChild(wasteDiv);

  topRow.appendChild(foundationsDiv);
  topRow.appendChild(stockWaste);
  root.appendChild(topRow);

  const tableauDiv = document.createElement("div");
  tableauDiv.style.display = "flex";
  tableauDiv.style.gap = gap + "px";
  tableauDiv.style.flex = "1";
  for (let c = 0; c < 7; c++) {
    const col = document.createElement("div");
    col.style.width = cardW + "px";
    col.style.position = "relative";
    col.style.flex = "1";
    for (let r = 0; r < tableau[c].length; r++) {
      const cardWrap = document.createElement("div");
      cardWrap.style.position = "absolute";
      cardWrap.style.top = r * 18 + "px";
      cardWrap.style.left = "0";
      if (tableau[c][r].faceUp) {
        renderCard(cardWrap, tableau[c][r], cardW, 28, false);
      } else {
        cardWrap.style.width = cardW + "px";
        cardWrap.style.height = "22px";
        cardWrap.style.background = "linear-gradient(135deg,#3b4a5a,#2a3544)";
        cardWrap.style.border = "1px solid rgba(255,255,255,0.08)";
        cardWrap.style.borderRadius = "4px";
      }
      cardWrap.addEventListener("click", () => {
        const card = tableau[c][r];
        if (!card.faceUp) {
          sound.error();
          return;
        }
        if (selected && selected.pile === "tableau" && selected.col === c && tableau[c].indexOf(card) === tableau[c].length - 1) {
          selected = null;
        } else if (
          selected &&
          (selected.pile === "waste" || selected.pile === "foundation" || selected.col !== c)
        ) {
          tryMove("tableau", c);
        } else {
          selected = { pile: "tableau", col: c };
        }
        draw();
      });
      col.appendChild(cardWrap);
    }
    tableauDiv.appendChild(col);
  }
  root.appendChild(tableauDiv);

  const status = el("status");
  if (status) status.textContent = `Moves: ${moves} · Best: ${best}`;
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
  container.style.lineHeight = "1";
  container.style.position = full ? "relative" : "";
  const rank =
    card.rank === 1 ? "A" : card.rank <= 10 ? String(card.rank) : card.rank === 11 ? "J" : card.rank === 12 ? "Q" : "K";
  container.textContent = rank + SUIT_SYM[card.suit];
}

function checkWin() {
  const total = foundations.reduce((s, f) => s + f.length, 0);
  if (total === 52) {
    best = setHighScore("solitaire", moves, true);
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
