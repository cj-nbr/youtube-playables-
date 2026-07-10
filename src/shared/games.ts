import type { GameMeta } from "./types";
import { SITE_URL } from "./config";

import { content as arrowContent } from "../games/arrow-game/content";
import { content as stackTowerContent } from "../games/stack-tower/content";
import { content as colorMatchContent } from "../games/color-match/content";
import { content as blockBlastContent } from "../games/block-blast/content";
import { content as numberSlideContent } from "../games/number-slide/content";
import { content as memoryFlipContent } from "../games/memory-flip/content";
import { content as chessContent } from "../games/chess/content";
import { content as dotsAndBoxesContent } from "../games/dots-and-boxes/content";

export const games: GameMeta[] = [
  {
    id: "arrow-game",
    title: "Tic Tac Toe",
    description:
      "Play the timeless 3×3 showdown. Place X or O, line up three, and out-think your opponent in this classic strategy game.",
    genre: ["Puzzle", "Strategy", "2 Player"],
    releasedAt: "2024-09-01",
    popularity: 92,
    seo: {
      keywords: [
        "tic tac toe",
        "tic-tac-toe online",
        "play tic tac toe free",
        "noughts and crosses",
        "XO game",
        "two player puzzle game",
      ],
    },
    content: arrowContent,
  },
  {
    id: "stack-tower",
    title: "Stack Tower",
    description:
      "Drop blocks and build the tallest tower you can. Time your taps, keep the overlap tight, and chase a new high score.",
    genre: ["Arcade", "Puzzle", "Casual"],
    releasedAt: "2024-10-12",
    popularity: 78,
    seo: {
      keywords: [
        "stack tower",
        "stacking game online",
        "tower block game",
        "timing game",
        "reflex arcade game",
        "high score stacker",
      ],
    },
    content: stackTowerContent,
  },
  {
    id: "color-match",
    title: "Color Match",
    description:
      "Match the target color by tuning RGB sliders before the clock runs out. A fast, relaxing test of color perception.",
    genre: ["Puzzle", "Casual", "Color"],
    releasedAt: "2024-11-03",
    popularity: 71,
    seo: {
      keywords: [
        "color match game",
        "colour matching game",
        "rgb color game",
        "color perception test",
        "color puzzle online",
        "matching game free",
      ],
    },
    content: colorMatchContent,
  },
  {
    id: "block-blast",
    title: "Block Blast",
    description:
      "Clear clusters of same-colored blocks and trigger big combos. Bigger groups score exponentially more — plan your clears.",
    genre: ["Puzzle", "Strategy", "Match"],
    releasedAt: "2024-11-20",
    popularity: 84,
    seo: {
      keywords: [
        "block blast",
        "block puzzle game",
        "match same color blocks",
        "blast blocks online",
        "combo puzzle game",
        "free block game",
      ],
    },
    content: blockBlastContent,
  },
  {
    id: "number-slide",
    title: "Number Slide",
    description:
      "Solve the classic 15-puzzle. Slide the numbered tiles into perfect order using the single empty space.",
    genre: ["Puzzle", "Strategy", "Brain"],
    releasedAt: "2024-12-05",
    popularity: 66,
    seo: {
      keywords: [
        "number slide",
        "15 puzzle",
        "sliding puzzle",
        "number puzzle game",
        "slide tiles game",
        "brain teaser online",
      ],
    },
    content: numberSlideContent,
  },
  {
    id: "memory-flip",
    title: "Memory Flip",
    description:
      "Flip cards, remember positions, and match every pair. A calm memory challenge with emoji symbols and a best-score tracker.",
    genre: ["Puzzle", "Casual", "Memory"],
    releasedAt: "2025-01-18",
    popularity: 73,
    seo: {
      keywords: [
        "memory flip",
        "memory matching game",
        "card matching game",
        "concentration game",
        "pair matching online",
        "memory game free",
      ],
    },
    content: memoryFlipContent,
  },
  {
    id: "chess",
    title: "Chess",
    description:
      "Play the full game of chess in your browser. Select pieces, see legal moves, and checkmate your opponent on a clean board.",
    genre: ["Strategy", "Board", "2 Player"],
    releasedAt: "2025-02-09",
    popularity: 88,
    seo: {
      keywords: [
        "play chess online",
        "free chess game",
        "chess vs friend",
        "browser chess",
        "learn chess rules",
        "chess strategy game",
      ],
    },
    content: chessContent,
  },
  {
    id: "dots-and-boxes",
    title: "Dots and Boxes",
    description:
      "Draw lines, complete squares, and claim the board. Chain your captures to dominate this two-player strategy classic.",
    genre: ["Strategy", "Puzzle", "2 Player"],
    releasedAt: "2025-03-02",
    popularity: 69,
    seo: {
      keywords: [
        "dots and boxes",
        "dots and boxes online",
        "squares game",
        "two player strategy game",
        "pen and paper game",
        "free dots game",
      ],
    },
    content: dotsAndBoxesContent,
  },
];

export function getGame(id: string): GameMeta {
  const game = games.find((g) => g.id === id);
  if (!game) throw new Error(`Unknown game: ${id}`);
  return game;
}

export function gameUrl(id: string): string {
  return `/${id}`;
}

export function canonicalUrl(id: string): string {
  return `${SITE_URL}/${id}`;
}

/** Games suggested on a given game's page (excludes itself). */
export function relatedGames(id: string, count = 4): GameMeta[] {
  const current = getGame(id);
  const others = games.filter((g) => g.id !== id);
  // Prefer games that share a genre, then fall back to popularity.
  const scored = others.map((g) => {
    const shared = g.genre.filter((x) => current.genre.includes(x)).length;
    return { g, score: shared * 100 + g.popularity };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, count).map((s) => s.g);
}

export function popularGames(count = 4): GameMeta[] {
  return [...games].sort((a, b) => b.popularity - a.popularity).slice(0, count);
}

export function trendingGames(count = 4): GameMeta[] {
  return [...games]
    .sort(
      (a, b) =>
        new Date(b.releasedAt).getTime() - new Date(a.releasedAt).getTime()
    )
    .slice(0, count);
}

export function newGames(count = 3): GameMeta[] {
  return [...games]
    .sort(
      (a, b) =>
        new Date(b.releasedAt).getTime() - new Date(a.releasedAt).getTime()
    )
    .slice(0, count);
}
