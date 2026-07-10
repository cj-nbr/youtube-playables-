# Stack Tower

A one-tap timing game where you drop moving blocks onto a growing tower. Overhanging parts are cut off and each new block takes the width of its overlap with the block below. The run ends when a drop has zero overlap.

## Folder structure

```
stack-tower/
  content.ts        # Guide, instructions, FAQs, and blog articles (GameContent)
  README.md         # This file
  blog/
    complete-guide.md
  assets/  images/  audio/  scripts/  styles/  levels/  seo/  components/
```

## Controls

- Desktop: click the left mouse button anywhere to drop the block.
- Mobile: tap anywhere on the screen to drop the block.

No dragging or holding is required; each block is placed with a single click or tap.

## Rules

1. A block slides left and right at the top of the play area.
2. Click or tap to drop it instantly onto the stack below.
3. Overhanging parts are removed; the new block's width equals the overlap.
4. Speed increases with each level.
5. The game ends when a dropped block has no overlap with the block beneath it.

## Implementation notes

- `content.ts` exports `content` typed as `GameContent` from `../../shared/types`.
- Score is the number of blocks placed (endless play, beat your high score).
- Assets, scripts, styles, levels, seo, and components are reserved placeholders.
