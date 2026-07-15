import https from "https";
import fs from "fs";
import path from "path";
import sharp from "sharp";

const PUBLIC = path.resolve("public");
const GAMES_DIR = path.join(PUBLIC, "images", "games");

interface GameImageSpec {
  id: string;
  title: string;
  prompt: string;
}

const remainingGames: GameImageSpec[] = [
  { id: "masterpieces", title: "Masterpieces", prompt: "symmetrical pattern block puzzle grid colorful geometric art minimalist modern" },
  { id: "mastercards", title: "Mastercards", prompt: "memory card matching game themed pairs cards flip challenge colorful fun" },
  { id: "sudoku", title: "Sudoku", prompt: "sudoku number puzzle 9x9 grid logic brain teaser pencil paper classic clean" },
  { id: "letterama", title: "Letterama", prompt: "word search letter grid hidden words puzzle colorful letters" },
  { id: "crossword", title: "Crossword", prompt: "crossword puzzle grid clues words check reveal pencil paper classic clean" },
  { id: "jigsaw", title: "Jigsaw", prompt: "jigsaw puzzle sliding tiles reassemble image colorful fun brain teaser" },
  { id: "mahjongg-dimensions", title: "Mahjongg Dimensions", prompt: "3d mahjongg stacked layers dimensional tile matching zen elegant colorful" },
  { id: "solitaire", title: "Solitaire", prompt: "klondike solitaire card game tableau foundations draw pile classic patience elegant" },
  { id: "speedread", title: "SpeedRead", prompt: "speed reading comprehension passages text fast brain training education colorful" },
  { id: "speedtype", title: "SpeedType", prompt: "speed typing falling words reflex challenge keyboard colorful arcade neon" },
  { id: "spellice", title: "Spellice", prompt: "typing falling words freeze eliminate speed spelling game colorful arcade neon" },
  { id: "squarewords", title: "SquareWords", prompt: "word square palindrome puzzle rows columns same backwards typography elegant" },
  { id: "the-wordhunt-game", title: "The WordHunt Game", prompt: "word hunt letter grid find words timed challenge brain training colorful letters" },
  { id: "what-word", title: "What Word?", prompt: "wordle 5 letter word guessing color feedback green yellow gray modern minimal" },
  { id: "word-wipe", title: "Word Wipe", prompt: "word wipe connect adjacent letters swipe dynamic board colorful word game" },
];

function downloadImage(url: string, dest: string, retries = 3): Promise<void> {
  return new Promise((resolve, reject) => {
    const attempt = () => {
      const file = fs.createWriteStream(dest);
      https.get(url, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          https.get(res.headers.location!, (res2) => {
            res2.pipe(file);
            file.on("finish", () => { file.close(); resolve(); });
          }).on("error", (e) => { file.close(); reject(e); });
        } else if (res.statusCode === 200) {
          res.pipe(file);
          file.on("finish", () => { file.close(); resolve(); });
        } else {
          file.close();
          if (retries > 0) {
            setTimeout(() => attempt(), 2000);
          } else {
            reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          }
        }
      }).on("error", (e) => { file.close(); if (retries > 0) setTimeout(() => attempt(), 2000); else reject(e); });
    };
    attempt();
  });
}

async function processGame(game: GameImageSpec) {
  const gameDir = path.join(GAMES_DIR, game.id);
  const rawPath = path.join(gameDir, "cover-raw.jpg");
  const coverPath = path.join(gameDir, "cover.webp");
  const thumbPath = path.join(gameDir, "thumbnail.webp");

  console.log(`Processing: ${game.title}`);

  const prompt = encodeURIComponent(game.prompt);
  const imageUrl = `https://image.pollinations.ai/prompt/${prompt}?width=800&height=600&nologo=true&model=flux&seed=${game.id.length * 7}`;

  try {
    await downloadImage(imageUrl, rawPath);
    console.log(`  Downloaded raw for ${game.title}`);

    const image = sharp(rawPath);
    const meta = await image.metadata();

    await image.webp({ quality: 85 }).toFile(coverPath);
    console.log(`  Created cover.webp (${meta.width}x${meta.height})`);

    await sharp(rawPath)
      .resize(400, 300, { fit: "cover" })
      .webp({ quality: 80 })
      .toFile(thumbPath);
    console.log(`  Created thumbnail.webp`);

    fs.unlinkSync(rawPath);
  } catch (err) {
    console.error(`  Failed for ${game.title}:`, err);
  }
}

async function main() {
  for (const game of remainingGames) {
    await processGame(game);
  }
  console.log("\nAll done!");
}

main();
