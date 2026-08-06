// Author system for the blog. These are editorial personas of the
// Playables team — presented as brand voices rather than real,
// externally-attributed individuals. No fabricated awards, credentials, or
// testimonials are used. They exist to give articles a consistent,
// human authorial voice and to populate Author schema.org markup.

export interface Author {
 id: string;
 name: string;
 /** Short role label shown next to the byline. */
 role: string;
 /** Editorial bio; factual and brand-facing only. */
 bio: string;
 /** Topics this persona typically covers. */
 interests: string[];
 /** Avatar image path (royalty-free SVG initial mark). */
 avatar: string;
 /** Optional social link (brand handle, never a fake personal profile). */
 social?: string;
}

export const authors: Record<string, Author> = {
 editorial: {
  id: "editorial",
  name: "Playables Editorial",
  role: "Editorial Team",
  bio: "The Playables editorial team writes practical, no-nonsense guides about free browser games — how they work, how to get better, and why they are good for your brain. Every article is reviewed for accuracy before publication.",
  interests: ["Puzzle games", "Brain training", "Strategy guides", "Browser gaming"],
  avatar: "/images/authors/editorial.svg",
  social: "https://twitter.com/playables",
 },
 mira: {
  id: "mira",
  name: "Mira Okafor",
  role: "Puzzle & Logic Editor",
  bio: "Mira is part of the Playables editorial team and focuses on logic puzzles, number games, and memory training. She enjoys breaking difficult strategies into small, repeatable habits.",
  interests: ["Sudoku", "Number puzzles", "Memory games", "Speed solving"],
  avatar: "/images/authors/mira.svg",
 },
 dev: {
  id: "dev",
  name: "Dev Raman",
  role: "Arcade & Casual Editor",
  bio: "Dev is part of the Playables editorial team. He covers arcade, reflex, and casual games, with a soft spot for timing-based high-score chases and relaxing browser breaks.",
  interests: ["Arcade games", "Reflex training", "Casual games", "High-score strategy"],
  avatar: "/images/authors/dev.svg",
 },
 lena: {
  id: "lena",
  name: "Lena Brandt",
  role: "Word & Trivia Editor",
  bio: "Lena is part of the Playables editorial team and writes about word games, trivia, and vocabulary. She believes a good word puzzle is the fastest five-minute brain warm-up there is.",
  interests: ["Word games", "Trivia", "Vocabulary", "Reading"],
  avatar: "/images/authors/lena.svg",
 },
};

export function getAuthor(id?: string): Author {
 if (id && authors[id]) return authors[id];
 return authors.editorial;
}


