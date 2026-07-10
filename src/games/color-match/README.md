# Color Match

A fast color-mixing puzzle game for the YouTube Playables platform. Reproduce the
target color by adjusting R/G/B sliders, then submit (or skip) within the 30-second
timer. Score combines color accuracy (Euclidean RGB distance) with a speed bonus
across 10 rounds — highest cumulative total wins.

## Folder layout

- `content.ts` — GameContent (guide, instructions, FAQs, blog articles) per `shared/types.ts`.
- `README.md` — this file.
- `blog/complete-guide.md` — long-form SEO article.
- `assets/`, `images/`, `audio/`, `scripts/`, `styles/`, `levels/`, `seo/`, `components/` — placeholders.

## How it works

1. A target swatch appears at the top of the screen.
2. Drag the R, G, B sliders (0–255) to mix your own color.
3. Click **Submit** to lock in your guess, or **Skip** to pass.
4. Round ends at 0s, on submit, or on skip. Accuracy + time bonus = round score.
5. After 10 rounds, your cumulative score is your final result.

## SEO content

`content.ts` exports a `GameContent` object consumed by the registry, GameShell,
and SEO components. It includes 4 guide items, full instructions, 18 FAQs, and
3 blog articles. See `blog/complete-guide.md` for the published article version.
