import https from "https";
import fs from "fs";
import path from "path";
import sharp from "sharp";

const PUBLIC = path.resolve("public");
const GAMES_DIR = path.join(PUBLIC, "images", "games");
const VIDEOS_DIR = path.join(PUBLIC, "videos", "games");

interface GameImageSpec {
  id: string;
  title: string;
  prompt: string;
}

const games: GameImageSpec[] = [
  { id: "arrow-game", title: "Tic Tac Toe", prompt: "tic tac toe game board X O classic strategy minimal flat design illustration vibrant colors" },
  { id: "stack-tower", title: "Stack Tower", prompt: "stack tower blocks game colorful blocks stacking high arcade style illustration" },
  { id: "color-match", title: "Color Match", prompt: "color matching game RGB sliders colorful palette abstract vibrant modern illustration" },
  { id: "block-blast", title: "Block Blast", prompt: "block blast puzzle game colorful exploding blocks arcade style vibrant illustration" },
  { id: "number-slide", title: "Number Slide", prompt: "sliding number puzzle 15 puzzle game tiles numbers brain teaser illustration" },
  { id: "memory-flip", title: "Memory Flip", prompt: "memory card flip game matching pairs emoji cards colorful fun illustration" },
  { id: "chess", title: "Chess", prompt: "chess board game elegant wooden pieces strategy classic board game photorealistic" },
  { id: "dots-and-boxes", title: "Dots and Boxes", prompt: "dots and boxes grid game pencil lines squares classic paper strategy game" },
  { id: "dragger", title: "Dragger", prompt: "puzzle connection game colorful nodes lines paths abstract modern illustration" },
  { id: "counterfeit", title: "Counterfeit", prompt: "spot the fake banknotes money detective investigation magnifying glass illustration" },
  { id: "colored-lines", title: "Colored Lines", prompt: "colored lines flow puzzle game connecting dots grid colorful abstract modern" },
  { id: "2048", title: "2048", prompt: "2048 sliding puzzle game numbered tiles merging numbers minimalist modern design" },
  { id: "threetown", title: "Threetown", prompt: "branching maze path puzzle tri-split adventure colorful isometric illustration" },
  { id: "symmetris", title: "Symmetris", prompt: "symmetry puzzle game mirror drawing patterns geometric abstract colorful modern art" },
  { id: "casual-miner", title: "Casual Miner", prompt: "mining game digging tunnels collecting gems underground pixel art style" },
  { id: "match-the-feel", title: "Match the Feel", prompt: "emoji matching color drag game fast pace colorful fun arcade style illustration" },
  { id: "oooze", title: "Oooze", prompt: "blob growing game absorbing particles colorful cells abstract organic fluid art" },
  { id: "shipfind", title: "Shipfind", prompt: "battleship naval strategy game grid ocean ships radar military theme illustration" },
  { id: "rotate", title: "Rotate", prompt: "pipe rotation puzzle game grid connecting pipes colorful mechanical engineering illustration" },
  { id: "snakris", title: "Snakris", prompt: "falling blocks stack puzzle tetris-like arcade game colorful neon retro style" },
  { id: "guess-the-colors", title: "Guess the Colors", prompt: "stroop test color word game brain challenge colorful text psychology experiment" },
  { id: "rotate2", title: "Rotate²", prompt: "advanced rotation symmetry puzzle grid spinning pieces geometric modern abstract" },
  { id: "chinese-checkers", title: "Chinese Checkers", prompt: "chinese checkers star board marbles jumping strategy classic board game colorful" },
  { id: "masterpieces", title: "Masterpieces", prompt: "symmetrical pattern block puzzle grid colorful geometric art minimalist modern" },
  { id: "mastercards", title: "Mastercards", prompt: "memory card matching game themed pairs cards flip challenge colorful fun" },
  { id: "sudoku", title: "Sudoku", prompt: "sudoku number puzzle 9x9 grid logic brain teaser pencil paper classic clean" },
  { id: "reversi", title: "Reversi", prompt: "reversi othello disc flip strategy board game black white circular classic" },
  { id: "mastermind", title: "Mastermind", prompt: "mastermind code breaker color pegs logic deduction puzzle game colorful classic" },
  { id: "numberhunt", title: "NumberHunt", prompt: "hidden numbers search game grid find circle numbers timed challenge brain teaser" },
  { id: "minesweeper", title: "Minesweeper", prompt: "minesweeper classic grid puzzle mine flags numbers retro computer game nostalgic" },
  { id: "mahjongg-solitaire", title: "Mahjongg Solitaire", prompt: "mahjongg solitaire tile matching stacked tiles chinese classic elegant zen illustration" },
  { id: "freecell", title: "Freecell", prompt: "freecell solitaire card game tableau foundations classic patience playing cards elegant" },
  { id: "what-was-there", title: "What Was There?", prompt: "visual memory observation game scene recall detective investigation mystery illustration" },
  { id: "the-image-quiz", title: "The Image Quiz", prompt: "image quiz picture guessing zoomed cropped photos multiple choice fun trivia" },
  { id: "trivianut", title: "TriviaNut", prompt: "trivia quiz game categories knowledge fast paced colorful fun modern illustration" },
  { id: "memocoly", title: "Memocoly", prompt: "memory sequence pattern game highlighted cells simon says brain training colorful" },
  { id: "checkers", title: "Checkers", prompt: "checkers draughts board game 8x8 red black pieces capture jump classic strategy" },
  { id: "lettermaze", title: "Lettermaze", prompt: "letter maze typing directional commands collecting letters puzzle adventure colorful" },
  { id: "anagramania", title: "Anagramania", prompt: "anagram word scramble rearrange letters spelling game colorful typography fun" },
  { id: "guess-the-place", title: "Guess the Place!", prompt: "geography quiz landmark city photo identification world travel exploration illustration" },
  { id: "letterama", title: "Letterama", prompt: "word search letter grid hidden words horizontal vertical diagonal puzzle colorful" },
  { id: "squarewords", title: "SquareWords", prompt: "word square palindrome puzzle rows columns same backwards typography elegant modern" },
  { id: "what-word", title: "What Word?", prompt: "wordle 5 letter word guessing color feedback green yellow gray modern minimal" },
  { id: "spellice", title: "Spellice", prompt: "typing falling words freeze eliminate speed spelling game colorful arcade neon" },
  { id: "the-wordhunt-game", title: "The WordHunt Game", prompt: "word hunt letter grid find words timed challenge brain training colorful letters" },
  { id: "speedtype", title: "SpeedType", prompt: "speed typing falling words reflex challenge keyboard colorful arcade neon style" },
  { id: "speedread", title: "SpeedRead", prompt: "speed reading comprehension passages text fast brain training education colorful" },
  { id: "solitaire", title: "Solitaire", prompt: "klondike solitaire card game tableau foundations draw pile classic patience elegant" },
  { id: "jigsaw", title: "Jigsaw", prompt: "jigsaw puzzle sliding tiles reassemble image colorful fun brain teaser illustration" },
  { id: "word-wipe", title: "Word Wipe", prompt: "word wipe connect adjacent letters swipe dynamic board colorful word game" },
  { id: "mahjongg-dimensions", title: "Mahjongg Dimensions", prompt: "3d mahjongg stacked layers dimensional tile matching zen elegant colorful tiles" },
  { id: "crossword", title: "Crossword", prompt: "crossword puzzle 5x5 grid clues words check reveal pencil paper classic clean" },
];

function downloadImage(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        https.get(res.headers.location, (res2) => {
          res2.pipe(file);
          file.on("finish", () => { file.close(); resolve(); });
        }).on("error", reject);
      } else if (res.statusCode === 200) {
        res.pipe(file);
        file.on("finish", () => { file.close(); resolve(); });
      } else {
        file.close();
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
    }).on("error", reject);
  });
}

async function processGame(game: GameImageSpec) {
  const gameDir = path.join(GAMES_DIR, game.id);
  const rawPath = path.join(gameDir, "cover-raw.jpg");
  const coverPath = path.join(gameDir, "cover.webp");
  const thumbPath = path.join(gameDir, "thumbnail.webp");

  console.log(`Processing: ${game.title}`);

  const prompt = encodeURIComponent(game.prompt);
  const imageUrl = `https://image.pollinations.ai/prompt/${prompt}?width=800&height=600&nologo=true&model=flux&seed=${game.id.length}`;

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
  for (const game of games) {
    await processGame(game);
  }
  console.log("\nAll done!");
}

main();
