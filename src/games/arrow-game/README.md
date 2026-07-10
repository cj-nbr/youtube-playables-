# Tic Tac Toe (`arrow-game`)

A local two-player Tic Tac Toe game for the YouTube Playables platform. Players take
turns on a 3×3 grid; X goes first, and the first to get three in a row wins.

## Folder structure

```
arrow-game/
├── content.ts        # SEO + guide/instructions/faqs/blog content (GameContent)
├── README.md         # This file
├── blog/
│   └── complete-guide.md
├── assets/           # Static assets (placeholder)
├── images/           # Image assets (placeholder)
├── audio/            # Audio assets (placeholder)
├── scripts/          # Game logic scripts (placeholder)
├── styles/           # Stylesheets (placeholder)
├── levels/           # Level data (placeholder)
├── seo/              # SEO assets (placeholder)
└── components/       # UI components (placeholder)
```

## How to run

From the project root:

```
npm install
astro dev --background
```

Then open the local preview URL and navigate to the Tic Tac Toe game route.

## Controls

- **Desktop:** Click an empty square to place your mark. Click "New game" to reset.
- **Mobile:** Tap an empty square to place your mark. Tap "New game" to reset.

## Rules

- The board is a 3×3 grid with nine squares.
- X always moves first; players alternate turns.
- A player wins by completing three of their marks in a row, column, or diagonal.
- If all squares fill with no winner, the game is a draw.
- Press "New game" after a win or draw to play again.

## Implementation notes

- Content lives in `content.ts` and satisfies the `GameContent` interface from
  `../../shared/types` (guide, instructions, faqs, blog).
- Article copy in `blog/complete-guide.md` mirrors the first blog entry in `content.ts`.
- Placeholder folders (assets, images, audio, scripts, styles, levels, seo,
  components) are kept via `.gitkeep` so the structure is committed empty.
- This is a local two-player implementation; no AI opponent or network sync.
