# Chess (`chess`)

A lightweight two-player chess game for the YouTube Playables platform. Played on a
standard 8×8 board, players alternate White and Black, moving pieces to checkmate the
opponent's king.

## Folder structure

```
chess/
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

Then open the local preview URL and navigate to the Chess game route.

## Controls

- **Desktop:** Click a piece to select it; click a highlighted square to move.
- **Mobile:** Tap a piece to select it; tap a highlighted square to move.

## Rules

- The board is a standard 8×8 grid with 16 pieces per side.
- White moves first; turns alternate between White and Black.
- Pieces move as in standard chess: pawn, knight, bishop, rook, queen, king.
- A king in check with no legal escape is checkmated; the game ends.
- Stalemate (no legal move while not in check) ends the game as a draw.
- Click or tap a piece to see its legal moves highlighted.

## Not implemented

This is a lightweight edition. The following standard rules are intentionally omitted:

- **Castling** is not available; the king moves only one square at a time.
- **En passant** pawn captures are not available.
- **Pawn promotion** is not available in this version.

## Implementation notes

- Content lives in `content.ts` and satisfies the `GameContent` interface from
  `../../shared/types` (guide, instructions, faqs, blog).
- Article copy in `blog/complete-guide.md` mirrors the first blog entry in `content.ts`.
- Placeholder folders (assets, images, audio, scripts, styles, levels, seo,
  components) are kept via `.gitkeep` so the structure is committed empty.
- This is a local two-player **pass-and-play** implementation; there is no AI
  opponent and no network sync.
