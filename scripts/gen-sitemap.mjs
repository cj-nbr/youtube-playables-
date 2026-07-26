// Regenerates public/sitemap.xml from the built dist/ output.
// Run AFTER `npm run build`. It scans dist for game pages (top-level
// directories) and blog posts (dist/blog/<slug>) and emits a single
// sitemap.xml. This keeps the sitemap in sync no matter how many
// articles are added via the globbed src/shared/articles/*.ts files.
//
//   node scripts/gen-sitemap.mjs
//
import { readdirSync, statSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const dist = join(root, "dist");
const site = "https://youtubeplayables.caloriecalculatorfree.com";
const today = new Date().toISOString().slice(0, 10);

const nonGame = new Set([
  "blog", "playables", "about", "contact", "privacy", "terms",
  "changelog", "support", "login", "signup", "profile", "404",
  "500", "_astro", "images", "fonts", ".well-known",
]);

const isDir = (p) => { try { return statSync(p).isDirectory(); } catch { return false; } };

const urls = [];
urls.push({ loc: `${site}/`, priority: 1.0 });
urls.push({ loc: `${site}/playables`, priority: 0.9 });
urls.push({ loc: `${site}/blog`, priority: 0.8 });

const staticPages = {
  about: 0.7, contact: 0.7, privacy: 0.5, terms: 0.5, changelog: 0.4, support: 0.4,
};
for (const [p, prio] of Object.entries(staticPages)) {
  urls.push({ loc: `${site}/${p}`, priority: prio });
}

if (isDir(dist)) {
  for (const d of readdirSync(dist)) {
    if (nonGame.has(d) || !isDir(join(dist, d))) continue;
    urls.push({ loc: `${site}/${d}`, priority: 0.8 });
  }
  const blogDir = join(dist, "blog");
  if (isDir(blogDir)) {
    for (const d of readdirSync(blogDir)) {
      if (!isDir(join(blogDir, d))) continue;
      urls.push({ loc: `${site}/blog/${d}`, priority: 0.7 });
    }
  }
}

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls
    .map(
      (u) =>
        `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${u.priority}</priority>\n  </url>`
    )
    .join("\n") +
  `\n</urlset>\n`;

writeFileSync(join(root, "public", "sitemap.xml"), xml);
console.log(`Wrote ${urls.length} URLs to public/sitemap.xml`);
