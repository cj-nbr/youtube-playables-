import { SITE_URL, SITE_NAME } from "./config";
import { games, gameUrl } from "./games";
import type { BlogPost } from "./blog-types";

// --- Seed posts (original six; kept verbatim, extended with optional SEO fields) ---
const seedPosts: BlogPost[] = [
  {
    slug: "best-brain-games-for-adults",
    title: "Best Brain Games for Adults",
    description:
      "Discover the best brain games for adults that improve memory, focus, and cognitive fitness — all free and browser-based.",
    date: "2026-07-11",
    updatedAt: "2026-07-12",
    category: "Brain Training",
    tags: ["brain games", "memory games", "cognitive games", "puzzle games"],
    authorId: "editorial",
    cover: "/images/articles/default-cover.svg",
    primaryKeyword: "best brain games for adults",
    secondaryKeywords: ["brain training games for adults", "games for the brain", "free brain games"],
    lsiKeywords: ["memory", "focus", "cognitive reserve", "working memory"],
    content: `
      <h2>Why brain games matter for adults</h2>
      <p>Brain games for adults are more than entertainment. Regular mental exercise can help maintain cognitive reserve, improve working memory, and support better decision-making. Unlike passive scrolling, browser-based brain games ask you to solve problems, remember patterns, and react quickly — all in short, focused sessions.</p>
      <p>If you search for <strong>games for the brain</strong> or <strong>brain training games for adults</strong>, you’ll find dozens of apps. The best options are free, instant to play, and progressively challenging. That’s exactly what the <a href="/memory-flip">Memory Flip</a> and <a href="/chess">Chess</a> pages offer.</p>
      <h2>What makes a good brain game?</h2>
      <ul>
        <li><strong>Memory load:</strong> The game should require holding information in mind — for example, matching pairs or tracking piece positions.</li>
        <li><strong>Speed and pressure:</strong> Gentle timers or increasing pace train processing speed without causing stress.</li>
        <li><strong>Progressive difficulty:</strong> The challenge should grow with you so you never plateau.</li>
        <li><strong>Clear feedback:</strong> You should know when you improved and where you struggled.</li>
      </ul>
      <h2>Top picks from this site</h2>
      <p><a href="/memory-flip">Memory Flip</a> trains short-term recall with emoji pairs. <a href="/number-slide">Number Slide</a> sharpens spatial reasoning and planning. <a href="/chess">Chess</a> builds long-term strategy and pattern recognition. <a href="/color-match">Color Match</a> challenges perception and speed. Each runs instantly in your browser — no download, no account.</p>
      <h2>How to build a daily brain routine</h2>
      <p>Start with 10 minutes a day. Rotate between a memory game, a logic puzzle, and a strategy game. Track your best scores in <a href="/memory-flip">Memory Flip</a> or your fastest solve in <a href="/number-slide">Number Slide</a>. Consistency matters more than marathon sessions.</p>
      <div class="cta-box">
        <h3>Put it to the test</h3>
        <p>Open a memory or logic game and play one focused round right now — no sign-up required.</p>
        <a href="/memory-flip" class="btn btn-primary h-11 px-8 text-sm">Play Memory Flip</a>
      </div>
      <h2>Sources &amp; references</h2>
      <ul>
        <li>Background on cognitive training from peer-reviewed overviews (search "cognitive training working memory meta-analysis").</li>
        <li>Game descriptions and rules from this site’s own game pages.</li>
      </ul>
    `,
    faqs: [
      { q: "Are brain games actually effective?", a: "Research suggests brain games can improve specific skills like working memory and processing speed, especially when played regularly. They are most effective as part of a broader routine that includes sleep, exercise, and learning new real-world skills." },
      { q: "How long should I play brain games each day?", a: "10–20 minutes daily is enough for most people. Short, focused sessions tend to be more beneficial than long, unfocused ones." },
      { q: "Do brain games prevent dementia?", a: "Brain games alone do not prevent dementia, but they can support cognitive health alongside a healthy lifestyle, social interaction, and physical activity." },
      { q: "What are the best free brain games for adults?", a: "Free browser-based options like Memory Flip, Number Slide, Chess, and Color Match are excellent starting points." },
    ],
  },
  {
    slug: "best-free-online-games",
    title: "Best Free Online Games",
    description:
      "A curated list of the best free online games you can play instantly in your browser — no downloads, no accounts required.",
    date: "2026-07-10",
    updatedAt: "2026-07-12",
    category: "Online Games",
    tags: ["free online games", "browser games", "HTML5 games", "casual games"],
    authorId: "dev",
    cover: "/images/articles/default-cover.svg",
    primaryKeyword: "best free online games",
    secondaryKeywords: ["play free games online", "free games no download", "browser games"],
    lsiKeywords: ["instant play", "no sign up", "HTML5", "casual"],
    content: `
      <h2>What makes a great free online game?</h2>
      <p>The best free online games load fast, respect your time, and work on any device. They should be fun whether you have five minutes or an hour. On this site, every title is free, browser-native, and built with HTML5 — so there’s nothing to install.</p>
      <h2>Top genres to try</h2>
      <ul>
        <li><strong>Puzzle games:</strong> <a href="/number-slide">Number Slide</a>, <a href="/color-match">Color Match</a>, and <a href="/block-blast">Block Blast</a> test logic and perception.</li>
        <li><strong>Arcade games:</strong> <a href="/stack-tower">Stack Tower</a> rewards timing and precision.</li>
        <li><strong>Strategy games:</strong> <a href="/chess">Chess</a> and <a href="/dots-and-boxes">Dots and Boxes</a> are perfect for two-player sessions.</li>
        <li><strong>Memory games:</strong> <a href="/memory-flip">Memory Flip</a> is quick, casual, and surprisingly addictive.</li>
      </ul>
      <h2>Why browser games?</h2>
      <p>Browser games remove friction. No store, no installer, no updates. Open a tab, pick a game, and play. They’re ideal for quick breaks, classroom downtime, or when you’re on a shared computer. If you’re looking for <strong>play free games online without downloading</strong>, start with the <a href="/playables">full library</a>.</p>
      <div class="cta-box">
        <h3>Ready to play?</h3>
        <p>Jump straight into the full library of free browser games.</p>
        <a href="/playables" class="btn btn-primary h-11 px-8 text-sm">Browse all games</a>
      </div>
      <h2>Sources &amp; references</h2>
      <ul>
        <li>HTML5 game technology overview (MDN Web Docs, "Introduction to game development").</li>
        <li>Game list and descriptions from this site’s game pages.</li>
      </ul>
    `,
    faqs: [
      { q: "Are free online games safe?", a: "Yes — the games on this site run entirely in your browser and don’t collect personal data. Always check permissions if you install anything locally, but browser-native play is safer by design." },
      { q: "Do I need an account?", a: "No. Every game here is playable without signing up. Accounts are optional and only used to sync high scores or recently played titles." },
      { q: "What are the best free online games for kids?", a: "Start with Memory Flip, Color Match, and Dots and Boxes. They’re simple, visual, and appropriate for all ages." },
    ],
  },
  {
    slug: "free-browser-games-without-downloading",
    title: "Free Browser Games Without Downloading",
    description:
      "Play instant HTML5 games directly in your browser — no installs, no updates, no waiting. Just open and play.",
    date: "2026-07-09",
    updatedAt: "2026-07-12",
    category: "Browser Games",
    tags: ["browser games", "HTML5 games", "instant games", "no download games"],
    authorId: "dev",
    cover: "/images/articles/default-cover.svg",
    primaryKeyword: "free browser games without downloading",
    secondaryKeywords: ["no download games", "instant browser games", "play games without installing"],
    lsiKeywords: ["HTML5", "web games", "cross-platform", "zero install"],
    content: `
      <h2>What are HTML5 browser games?</h2>
      <p>HTML5 games run inside your browser using standard web technologies. There’s no plugin, no installer, and no app store. They start instantly, update automatically, and work on phones, tablets, and desktops. If you want <strong>free browser games without downloading</strong>, HTML5 is the answer.</p>
      <h2>Advantages over downloaded games</h2>
      <ul>
        <li><strong>Zero install:</strong> No disk space, no permissions, no background updates.</li>
        <li><strong>Cross-platform:</strong> One link works on Windows, Mac, Android, and iOS.</li>
        <li><strong>Always current:</strong> The latest version is served every time you play.</li>
        <li><strong>Low friction:</strong> Share a link with a friend and they’re playing in seconds.</li>
      </ul>
      <h2>Popular genres for browser play</h2>
      <p>Puzzle and arcade games dominate browser play because they’re easy to pick up. <a href="/stack-tower">Stack Tower</a> is a great reflex game. <a href="/arrow-game">Tic Tac Toe</a> is perfect for quick two-player matches. <a href="/block-blast">Block Blast</a> offers longer combo-driven sessions. All of them are HTML5 and load in under a second.</p>
      <div class="cta-box">
        <h3>Try a no-download game now</h3>
        <p>No install, no waiting — just play.</p>
        <a href="/stack-tower" class="btn btn-primary h-11 px-8 text-sm">Play Stack Tower</a>
      </div>
      <h2>Sources &amp; references</h2>
      <ul>
        <li>MDN Web Docs on HTML5 and Canvas for game development.</li>
        <li>This site’s game pages for genre descriptions.</li>
      </ul>
    `,
    faqs: [
      { q: "Do browser games work offline?", a: "Most HTML5 games need an initial load from the internet. Once loaded, some can continue offline depending on your browser’s cache settings, but you should not rely on offline play unless the game explicitly supports it." },
      { q: "Are browser games safe?", a: "Browser-native games are generally safer than downloaded executables because they run in a sandboxed environment. Stick to reputable sites and avoid granting unnecessary permissions." },
      { q: "What devices work best?", a: "Any device with a modern browser works. Touchscreens are ideal for games like Stack Tower and Color Match, while keyboard and mouse work well for Chess and Number Slide." },
    ],
  },
  {
    slug: "brain-training-games-that-improve-memory",
    title: "Brain Training Games That Improve Memory",
    description:
      "Explore the best brain training games designed to boost memory, recall, and mental clarity — free to play online.",
    date: "2026-07-08",
    updatedAt: "2026-07-12",
    category: "Memory",
    tags: ["memory games", "brain training", "cognitive games", "concentration games"],
    authorId: "mira",
    cover: "/images/articles/default-cover.svg",
    primaryKeyword: "brain training games that improve memory",
    secondaryKeywords: ["memory improvement games", "memory recall games", "free memory games"],
    lsiKeywords: ["working memory", "visual recall", "spatial memory", "retrieval"],
    content: `
      <h2>How memory games train your brain</h2>
      <p>Memory games force you to encode, store, and retrieve information quickly. That cycle — seeing a pattern, holding it in mind, then recalling it — mirrors the cognitive loop used in real-world tasks like remembering names, directions, or study material.</p>
      <p><a href="/memory-flip">Memory Flip</a> is a straightforward example. You see cards, flip two, and try to match pairs. The game quietly trains visual memory, spatial recall, and pattern recognition. Over time, players usually need fewer moves to clear the board.</p>
      <h2>What to look for in a memory trainer</h2>
      <ul>
        <li><strong>Progressive difficulty:</strong> More cards, shorter view times, or faster pace.</li>
        <li><strong>Score tracking:</strong> Best-move counters give you a measurable target.</li>
        <li><strong>Low pressure:</strong> The best memory games are calm — no punishing timers that break focus.</li>
      </ul>
      <h2>Pairing memory with other brain training</h2>
      <p>Memory is one pillar. Combine it with spatial puzzles like <a href="/number-slide">Number Slide</a> and strategy games like <a href="/chess">Chess</a> for broader cognitive fitness. Variety matters because the brain adapts fastest when challenged in multiple ways.</p>
      <div class="cta-box">
        <h3>Train your memory now</h3>
        <p>One short round is enough to feel the difference.</p>
        <a href="/memory-flip" class="btn btn-primary h-11 px-8 text-sm">Play Memory Flip</a>
      </div>
      <h2>Sources &amp; references</h2>
      <ul>
        <li>Peer-reviewed literature on working-memory training (search "working memory training transfer").</li>
        <li>Game mechanics from this site’s Memory Flip page.</li>
      </ul>
    `,
    faqs: [
      { q: "Do memory games actually improve recall?", a: "Yes. Studies show that targeted memory practice improves performance on similar tasks. The gains are task-specific but can transfer to everyday recall with consistent practice." },
      { q: "How often should I play memory games?", a: "Short daily sessions — 10 to 15 minutes — are more effective than long weekly marathons. Consistency trains the brain’s retrieval pathways more reliably." },
      { q: "Are there memory games for students?", a: "Absolutely. Memory Flip is appropriate for all ages and helps with focus and recall that translate directly to study habits." },
    ],
  },
  {
    slug: "benefits-of-playing-brain-games",
    title: "Benefits of Playing Brain Games",
    description:
      "From sharper memory to better focus, brain games offer real cognitive and emotional benefits — here is what the science says.",
    date: "2026-07-07",
    updatedAt: "2026-07-12",
    category: "Brain Training",
    tags: ["brain exercise games", "educational games", "cognitive games", "thinking games"],
    authorId: "editorial",
    cover: "/images/articles/default-cover.svg",
    primaryKeyword: "benefits of playing brain games",
    secondaryKeywords: ["why play brain games", "cognitive benefits of games", "mental benefits of puzzles"],
    lsiKeywords: ["focus", "stress relief", "social", "habit"],
    content: `
      <h2>Cognitive benefits</h2>
      <p>Regular brain training can strengthen working memory, improve reaction time, and sharpen pattern recognition. Puzzle games like <a href="/number-slide">Number Slide</a> and <a href="/block-blast">Block Blast</a> demand planning and spatial reasoning — skills that transfer to everyday problem-solving.</p>
      <h2>Emotional and stress relief</h2>
      <p>Casual games provide low-stakes challenge. A few minutes of <a href="/color-match">Color Match</a> or <a href="/stack-tower">Stack Tower</a> can shift your mood without the frustration of a high-pressure task. That makes them useful for stress relief and mental resets during the day.</p>
      <h2>Social connection</h2>
      <p>Two-player games like <a href="/chess">Chess</a> and <a href="/dots-and-boxes">Dots and Boxes</a> create shared experiences. Even short matches build routine, conversation, and friendly competition — all of which support long-term brain health.</p>
      <h2>Accessibility and habit formation</h2>
      <p>Because browser games require no install, they remove the friction that often kills good habits. Open a tab, play for ten minutes, close it. That simplicity is a feature, not a limitation.</p>
      <div class="cta-box">
        <h3>Feel the benefits yourself</h3>
        <p>Pick one game and play a single short session today.</p>
        <a href="/playables" class="btn btn-primary h-11 px-8 text-sm">Explore the library</a>
      </div>
      <h2>Sources &amp; references</h2>
      <ul>
        <li>Reviews on cognitive and emotional effects of casual game play.</li>
        <li>Game descriptions from this site.</li>
      </ul>
    `,
    faqs: [
      { q: "How do brain games help the brain?", a: "They exercise neural pathways involved in memory, attention, and executive function. The key is variety and consistency — rotate between different game types to challenge multiple skills." },
      { q: "Are there any side effects?", a: "Brain games are generally safe. The main side effect is improved focus — unless you play right before bed, in which case the blue light and mental arousal may interfere with sleep." },
      { q: "What is the best age to start brain training?", a: "Brain training benefits people at almost any age, but the earlier you build the habit, the more you protect long-term cognitive reserve. Games on this site are appropriate for teens and adults." },
    ],
  },
  {
    slug: "color-matching-games-explained",
    title: "Color Matching Games Explained",
    description:
      "Why color matching games are more than fun — they train perception, speed, and attention. Learn how they work and how to get better.",
    date: "2026-07-06",
    updatedAt: "2026-07-12",
    category: "Color Games",
    tags: ["color matching games", "pattern games", "reaction games", "perception games"],
    authorId: "dev",
    cover: "/images/games/color-match/cover.webp",
    primaryKeyword: "color matching games explained",
    secondaryKeywords: ["how color matching games work", "color perception training", "rgb matching game"],
    lsiKeywords: ["hue", "saturation", "perception", "reaction time"],
    gameId: "color-match",
    content: `
      <h2>What is a color matching game?</h2>
      <p>A color matching game asks you to reproduce or identify colors under time pressure. <a href="/color-match">Color Match</a> gives you a target swatch, three RGB sliders, and thirty seconds. The closer your mix, the higher your score. That simple loop trains color perception, fine motor control, and rapid decision-making.</p>
      <h2>Cognitive skills trained</h2>
      <ul>
        <li><strong>Color perception:</strong> Distinguishing subtle hue and brightness differences.</li>
        <li><strong>Speed-accuracy tradeoff:</strong> Balancing quick submissions against precise tuning.</li>
        <li><strong>Working memory:</strong> Holding the target color in mind while adjusting sliders.</li>
      </ul>
      <h2>Tips and tricks</h2>
      <p>Start by matching the dominant channel — usually the brightest RGB value. Then fine-tune the other two. Watch the hex readout: it updates in real time and can be faster than judging by eye. If you’re within a few seconds of the timer, submit anyway; the time bonus often outweighs a small accuracy gain.</p>
      <h2>Who are color games for?</h2>
      <p>Anyone who wants a fast, low-pressure mental workout. They’re especially useful for designers, artists, and students who work with color daily. <a href="/color-match">Play Color Match</a> to test your perception in under a minute per round.</p>
      <div class="cta-box">
        <h3>Test your eye</h3>
        <p>See how close you can get to the target color.</p>
        <a href="/color-match" class="btn btn-primary h-11 px-8 text-sm">Play Color Match</a>
      </div>
      <h2>Sources &amp; references</h2>
      <ul>
        <li>Color theory basics (MDN, "Color and brightness").</li>
        <li>Game rules from this site’s Color Match page.</li>
      </ul>
    `,
    faqs: [
      { q: "Are color matching games good for the brain?", a: "Yes. They train visual discrimination, attention to detail, and rapid feedback processing — all useful cognitive skills." },
      { q: "Can color games help with color blindness?", a: "Color games can help people practice distinguishing colors, but they are not a treatment for color vision deficiency. If you have color blindness, use games with shape or text cues alongside color." },
      { q: "What is the best strategy for Color Match?", a: "Match the dominant channel first, then refine the secondary values. Use the hex readout as a precision guide, and submit before time runs out to keep the time bonus." },
    ],
  },
];

// --- Glob all article topic files dropped under src/shared/articles/ ---
// Each file must `export const posts: BlogPost[] = [...]`. This lets new
// articles be added by creating a file — no edits to this registry needed.
const articleModules = import.meta.glob<{ posts: BlogPost[] }>(
  "./articles/*.ts",
  { eager: true }
);

const globbedPosts: BlogPost[] = Object.values(articleModules).flatMap(
  (mod) => mod.posts ?? []
);

function dedupeBySlug(posts: BlogPost[]): BlogPost[] {
  const seen = new Set<string>();
  const out: BlogPost[] = [];
  for (const p of posts) {
    if (seen.has(p.slug)) continue;
    seen.add(p.slug);
    out.push(p);
  }
  return out;
}

// Normalize every post so the render layer can never crash on a missing
// required field (tags / faqs are required by the type but a few article
// files omit faqs). Defaults keep the build green and the page renders.
function normalizePost(p: BlogPost): BlogPost {
  return {
    ...p,
    tags: Array.isArray(p.tags) ? p.tags : [],
    faqs: Array.isArray(p.faqs) ? p.faqs : [],
    content: typeof p.content === "string" ? p.content : "",
  };
}

export const blogPosts: BlogPost[] = dedupeBySlug([
  ...seedPosts,
  ...globbedPosts,
]).map(normalizePost);

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function recentBlogPosts(count = 3): BlogPost[] {
  return [...blogPosts]
    .sort((a, b) => (b.updatedAt ?? b.date).localeCompare(a.updatedAt ?? a.date))
    .slice(0, count);
}

export function blogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((p) => p.category === category);
}

export function allCategories(): { name: string; count: number }[] {
  const map = new Map<string, number>();
  for (const p of blogPosts) map.set(p.category, (map.get(p.category) ?? 0) + 1);
  return [...map.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

/** Posts in the same category, excluding the given slug. */
export function relatedPosts(slug: string, count = 3): BlogPost[] {
  const current = getBlogPost(slug);
  if (!current) return recentBlogPosts(count);
  return blogPosts
    .filter((p) => p.slug !== slug && p.category === current.category)
    .slice(0, count);
}

/** All game ids referenced by posts (for sitemap / internal-link checks). */
export function postsByGame(gameId: string): BlogPost[] {
  return blogPosts.filter((p) => p.gameId === gameId);
}
