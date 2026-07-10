# Number Slide (`number-slide`)

A relaxing 4×4 sliding tile puzzle (the classic 15-puzzle) for the YouTube
Playables platform. Slide tiles adjacent to the empty space to arrange numbers
1-15 in ascending order with the blank in the bottom-right corner. Move count is
tracked and every generated board is solvable.

## Folder structure

```
number-slide/
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

Then open the local preview URL and navigate to the Number Slide game route.

## Controls

- **Desktop:** Click a tile adjacent to the empty space to slide it. Arrow keys
  also slide the neighboring tile in the pressed direction.
- **Mobile:** Tap a tile adjacent to the empty space to slide it.

## Rules

- The board is a 4×4 grid with tiles numbered 1 through 15 and one empty space.
- Only a tile orthogonally adjacent to the empty space can move into it.
- Goal: order tiles 1-15 ascending (left to right, top to bottom) with the
  empty space in the bottom-right corner.
- There is no timer or fail state; the move counter tracks solve efficiency.
- Boards are generated solvable, so a solution always exists.

## Implementation notes

- Content lives in `content.ts` and satisfies the `GameContent` interface from
  `../../shared/types` (guide, instructions, faqs, blog).
- Article copy in `blog/complete-guide.md` mirrors the first blog entry in `content.ts`.
- Placeholder folders (assets, images, audio, scripts, styles, levels, seo,
  components) are kept via `.gitkeep` so the structure is committed empty.
