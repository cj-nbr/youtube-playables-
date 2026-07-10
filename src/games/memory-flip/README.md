# Memory Flip

A calm, single-player matching game. Flip cards on a 4×4 grid to find all 8 emoji pairs in as few moves as possible.

## Overview

- **Grid:** 4×4 (16 cards)
- **Pairs:** 8 emoji symbol pairs (e.g. 🐶, 🐱, 🌟, 🍎, ⚽, 🌈, 🎵, 🚀)
- **Goal:** Match every pair with the fewest moves
- **Timer:** None — relaxing, self-paced play
- **Best score:** Fewest moves, saved locally in the browser

## How to play

1. Click or tap any face-down card to flip it.
2. Reveal a second card to compare the two symbols.
3. A match stays face up; a mismatch flips both back after a moment.
4. Clear the whole board to win and record your best move count.

## Strategy

Start from the center cards, memorize in chunks, flip unknowns in a steady order, and use elimination: when you know a card's match, flip them together to save a move. A perfect game is 8 moves.

## Project layout

- `content.ts` — SEO guide, instructions, FAQs, and blog articles
- `blog/` — markdown article versions
- `assets/`, `images/`, `audio/`, `scripts/`, `styles/`, `levels/`, `seo/`, `components/` — resource placeholders

See `content.ts` for full guide, FAQ, and blog content.
