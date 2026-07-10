# Dots and Boxes (`dots-and-boxes`)

A local two-player Dots and Boxes game for the YouTube Playables platform. Players
take turns drawing lines on a 4×4 dot grid (3×3 = 9 boxes); completing a box claims
it and grants another turn. Whoever claims the most boxes wins.

## Folder structure

```
dots-and-boxes/
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

Then open the local preview URL and navigate to the Dots and Boxes game route.

## Controls

- **Desktop:** Click an empty line between two adjacent dots. Click "New game" to reset.
- **Mobile:** Tap an empty line between two adjacent dots. Tap "New game" to reset.

## Rules

- The board is a 4×4 grid of dots forming 3×3 = 9 boxes.
- Players alternate drawing one line segment per turn.
- Completing the fourth side of a box claims it and grants another turn.
- If a move does not complete a box, play passes to the other player.
- The game ends when all boxes are claimed; the highest box count wins.

## Implementation notes

- Content lives in `content.ts` and satisfies the `GameContent` interface from
  `../../shared/types` (guide, instructions, faqs, blog).
- Article copy in `blog/complete-guide.md` mirrors the first blog entry in `content.ts`.
- Placeholder folders (assets, images, audio, scripts, styles, levels, seo,
  components) are kept via `.gitkeep` so the structure is committed empty.
- This is a local two-player, pass-and-play implementation; no AI opponent.
