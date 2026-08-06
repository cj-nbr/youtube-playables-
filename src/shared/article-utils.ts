// Small, dependency-free helpers for rendering BlogPost content:
// - slugify: turn a heading into a URL-safe anchor.
// - injectHeadingIds: add id="" to <h2>/<h3> so a TOC can link to them.
// - extractToc: build the [text, id] table of contents from HTML.
// Authors should write plain <h2> and <h3> (no attributes) so this works.

export function slugify(text: string): string {
 return text
  .toLowerCase()
  .replace(/<[^>]+>/g, "")
  .replace(/[^\w\s-]/g, "")
  .trim()
  .replace(/\s+/g, "-")
  .replace(/-+/g, "-")
  .replace(/^-|-$/g, "");
}

const HEADING_RE = /<h([23])([^>]*)>(.*?)<\/h\1>/gi;

export interface TocEntry {
 level: number;
 text: string;
 id: string;
}

export function extractToc(html: string): TocEntry[] {
 const out: TocEntry[] = [];
 let m: RegExpExecArray | null;
 HEADING_RE.lastIndex = 0;
 const seen = new Map<string, number>();
 while ((m = HEADING_RE.exec(html))) {
  const level = Number(m[1]);
  const text = m[3].replace(/<[^>]+>/g, "").trim();
  let id = slugify(text);
  if (!id) continue;
  if (seen.has(id)) {
   const n = seen.get(id)! + 1;
   seen.set(id, n);
   id = `${id}-${n}`;
  } else {
   seen.set(id, 1);
  }
  out.push({ level, text, id });
 }
 return out;
}

export function injectHeadingIds(html: string): string {
 const seen = new Map<string, number>();
 return html.replace(HEADING_RE, (full, lvl, attrs, inner) => {
  const text = inner.replace(/<[^>]+>/g, "").trim();
  let id = slugify(text);
  if (!id) id = "section";
  if (seen.has(id)) {
   const n = seen.get(id)! + 1;
   seen.set(id, n);
   id = `${id}-${n}`;
  } else {
   seen.set(id, 1);
  }
  return `<h${lvl} id="${id}"${attrs}>${inner}</h${lvl}>`;
 });
}

export function estimateReadingTime(html: string): number {
 const words = html
  .replace(/<[^>]+>/g, " ")
  .replace(/&[a-z]+;/gi, " ")
  .split(/\s+/)
  .filter(Boolean).length;
 return Math.max(1, Math.round(words / 220));
}

