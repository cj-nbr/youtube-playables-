// Shared TypeScript types for the YouTube Playables platform.
// These describe the shape of per-game metadata and content used across
// the registry, GameShell, SEO component, and listing pages.

export interface Faq {
  q: string;
  a: string;
}

export interface BlogArticle {
  title: string;
  excerpt: string;
  /** Ordered section headings used to build the article outline. */
  headings: string[];
  /** One entry per paragraph / step. Rendered in order after headings. */
  body: string[];
}

export interface GuideItem {
  heading: string;
  body: string;
}

export interface GameInstructions {
  objective: string;
  desktop: string;
  mobile: string;
  winning: string;
  losing: string;
  tips: string[];
}

export interface SeoMeta {
  /** Primary keyword phrases for the <meta name="keywords"> tag. */
  keywords: string[];
}

export interface GameContent {
  guide: GuideItem[];
  instructions: GameInstructions;
  faqs: Faq[];
  blog: BlogArticle[];
}

export interface GameMeta {
  /** URL slug and folder name, e.g. "arrow-game". */
  id: string;
  /** Display title, e.g. "Tic Tac Toe". */
  title: string;
  /** One-line description for cards and meta description. */
  description: string;
  genre: string[];
  /** ISO date the game was published — used for "New" badges. */
  releasedAt: string;
  /** 0-100 popularity score used for Popular / Trending ordering. */
  popularity: number;
  /** Extra SEO keywords beyond the title/description. */
  seo: SeoMeta;
  content: GameContent;
}
