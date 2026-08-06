// Shared type for long-form SEO articles used by the /blog system.
// Backward compatible with the original six seed posts (all new fields optional).
// New articles are stored as one .ts file per topic under src/shared/articles/
// and globbed automatically by src/shared/blog.ts — no central array edits needed.

export interface FaqItem {
 q: string;
 a: string;
}

export interface BlogPost {
 /** URL slug, e.g. "tic-tac-toe-beginner-guide". Used at /blog/<slug>. */
 slug: string;
 /** SEO title (H1 + <title>). */
 title: string;
 /** Meta description (155-160 chars ideal). */
 description: string;
 /** ISO publish date (YYYY-MM-DD). */
 date: string;
 /** Optional last-modified date; defaults to date when omitted. */
 updatedAt?: string;
 /** Top-level category used for filtering and breadcrumbs. */
 category: string;
 /** Thematic tags used for internal-linking and related-post matching. */
 tags: string[];
 /** Body as semantic HTML (h2/h3/p/ul/li/table/blockquote/figure/a). */
 content: string;

 /** Frequently asked questions rendered as FAQ accordion + FAQPage schema. */
 faqs: FaqItem[];

 /* ---- Optional SEO / editorial enhancements (safe to omit) ---- */

 /** Editorial author id (see src/shared/authors.ts). */
 authorId?: string;
 /** Featured image path, e.g. "/images/games/chess/cover.webp". */
 cover?: string;
 /** One primary keyword phrase the article targets. */
 primaryKeyword?: string;
 /** Secondary keyword phrases. */
 secondaryKeywords?: string[];
 /** LSI / semantically related terms. */
 lsiKeywords?: string[];
 /** Related game id for internal linking + CTAs (e.g. "chess"). */
 gameId?: string;
 /** Short standfirst shown on cards; falls back to description. */
 excerpt?: string;
 /** Estimated reading time in minutes (computed if omitted). */
 readingTime?: number;
}

