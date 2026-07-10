# Block Blast

A 10×12 color-clearing puzzle. Click or tap any block that is part of a connected
group of 2+ same-colored blocks to clear the whole group. Blocks fall under gravity
and empty columns collapse to the left. Score = groupSize².

## Folder layout

- `content.ts` — SEO/content (guide, instructions, FAQs, blog) for the GameShell and listing pages.
- `blog/complete-guide.md` — long-form markdown article.
- `assets/`, `images/`, `audio/`, `scripts/`, `styles/`, `levels/`, `seo/`, `components/` — placeholders.

## Content interface

Conforms to `GameContent` in `src/shared/types.ts`:
`guide: GuideItem[]`, `instructions: GameInstructions`, `faqs: Faq[]`, `blog: BlogArticle[]`.

## Rules summary

1. Groups are orthogonally connected (up/down/left/right) blocks of the same color.
2. Only groups of size 2+ can be cleared; singletons are permanent.
3. After a clear: blocks above fall, then fully-empty columns shift left.
4. Scoring: each cleared group is worth `n²` points (n = group size).
5. The game ends when no group of 2+ same-colored blocks remains.

## Content maintenance

- Add FAQs in `content.ts` under `faqs` as `{ q, a }` objects (aim for 150–300 chars).
- Add or edit blog outlines in `content.ts` under `blog`; mirror long-form pieces in `blog/`.
- Keep all copy accurate to the rules above; match the style of other game content files.
