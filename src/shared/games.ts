import type { GameMeta } from "./types";
import { SITE_URL } from "./config";

import { content as arrowContent } from "../games/arrow-game/content";
import { content as stackTowerContent } from "../games/stack-tower/content";
import { content as colorMatchContent } from "../games/color-match/content";
import { content as blockBlastContent } from "../games/block-blast/content";
import { content as numberSlideContent } from "../games/number-slide/content";
import { content as memoryFlipContent } from "../games/memory-flip/content";
import { content as chessContent } from "../games/chess/content";
import { content as dotsAndBoxesContent } from "../games/dots-and-boxes/content";
import { content as draggerContent } from "../games/dragger/content";
import { content as counterfeitContent } from "../games/counterfeit/content";
import { content as coloredLinesContent } from "../games/colored-lines/content";
import { content as game2048Content } from "../games/2048/content";
import { content as threetownContent } from "../games/threetown/content";
import { content as symmetrisContent } from "../games/symmetris/content";
import { content as casualMinerContent } from "../games/casual-miner/content";
import { content as matchTheFeelContent } from "../games/match-the-feel/content";
import { content as ooozeContent } from "../games/oooze/content";
import { content as shipfindContent } from "../games/shipfind/content";
import { content as rotateContent } from "../games/rotate/content";
import { content as snakrisContent } from "../games/snakris/content";
import { content as guessTheColorsContent } from "../games/guess-the-colors/content";
import { content as rotate2Content } from "../games/rotate2/content";
import { content as chineseCheckersContent } from "../games/chinese-checkers/content";
import { content as masterpiecesContent } from "../games/masterpieces/content";
import { content as mastercardsContent } from "../games/mastercards/content";
import { content as sudokuContent } from "../games/sudoku/content";
import { content as reversiContent } from "../games/reversi/content";
import { content as mastermindContent } from "../games/mastermind/content";
import { content as numberhuntContent } from "../games/numberhunt/content";
import { content as minesweeperContent } from "../games/minesweeper/content";
import { content as mahjonggSolitaireContent } from "../games/mahjongg-solitaire/content";
import { content as freecellContent } from "../games/freecell/content";
import { content as whatWasThereContent } from "../games/what-was-there/content";
import { content as theImageQuizContent } from "../games/the-image-quiz/content";
import { content as trivianutContent } from "../games/trivianut/content";
import { content as memocolyContent } from "../games/memocoly/content";
import { content as checkersContent } from "../games/checkers/content";
import { content as lettermazeContent } from "../games/lettermaze/content";
import { content as anagramaniaContent } from "../games/anagramania/content";
import { content as guessThePlaceContent } from "../games/guess-the-place/content";
import { content as letteramaContent } from "../games/letterama/content";
import { content as squarewordsContent } from "../games/squarewords/content";
import { content as whatWordContent } from "../games/what-word/content";
import { content as spelliceContent } from "../games/spellice/content";
import { content as theWordhuntGameContent } from "../games/the-wordhunt-game/content";
import { content as speedtypeContent } from "../games/speedtype/content";
import { content as speedreadContent } from "../games/speedread/content";
import { content as solitaireContent } from "../games/solitaire/content";
import { content as jigsawContent } from "../games/jigsaw/content";
import { content as wordWipeContent } from "../games/word-wipe/content";
import { content as mahjonggDimensionsContent } from "../games/mahjongg-dimensions/content";
import { content as crosswordContent } from "../games/crossword/content";

export const games: GameMeta[] = [
  {
    id: "arrow-game",
    title: "Tic Tac Toe",
    description:
      "Play the timeless 3×3 showdown. Place X or O, line up three, and out-think your opponent in this classic strategy game.",
    genre: ["Puzzle", "Strategy", "2 Player"],
    releasedAt: "2024-09-01",
    popularity: 92,
    seo: {
      keywords: [
        "tic tac toe",
        "tic-tac-toe online",
        "play tic tac toe free",
        "noughts and crosses",
        "XO game",
        "two player puzzle game",
      ],
    },
    content: arrowContent,
  },
  {
    id: "stack-tower",
    title: "Stack Tower",
    description:
      "Drop blocks and build the tallest tower you can. Time your taps, keep the overlap tight, and chase a new high score.",
    genre: ["Arcade", "Puzzle", "Casual"],
    releasedAt: "2024-10-12",
    popularity: 78,
    seo: {
      keywords: [
        "stack tower",
        "stacking game online",
        "tower block game",
        "timing game",
        "reflex arcade game",
        "high score stacker",
      ],
    },
    content: stackTowerContent,
  },
  {
    id: "color-match",
    title: "Color Match",
    description:
      "Match the target color by tuning RGB sliders before the clock runs out. A fast, relaxing test of color perception.",
    genre: ["Puzzle", "Casual", "Color"],
    releasedAt: "2024-11-03",
    popularity: 71,
    seo: {
      keywords: [
        "color match game",
        "colour matching game",
        "rgb color game",
        "color perception test",
        "color puzzle online",
        "matching game free",
      ],
    },
    content: colorMatchContent,
  },
  {
    id: "block-blast",
    title: "Block Blast",
    description:
      "Clear clusters of same-colored blocks and trigger big combos. Bigger groups score exponentially more — plan your clears.",
    genre: ["Puzzle", "Strategy", "Match"],
    releasedAt: "2024-11-20",
    popularity: 84,
    seo: {
      keywords: [
        "block blast",
        "block puzzle game",
        "match same color blocks",
        "blast blocks online",
        "combo puzzle game",
        "free block game",
      ],
    },
    content: blockBlastContent,
  },
  {
    id: "number-slide",
    title: "Number Slide",
    description:
      "Solve the classic 15-puzzle. Slide the numbered tiles into perfect order using the single empty space.",
    genre: ["Puzzle", "Strategy", "Brain"],
    releasedAt: "2024-12-05",
    popularity: 66,
    seo: {
      keywords: [
        "number slide",
        "15 puzzle",
        "sliding puzzle",
        "number puzzle game",
        "slide tiles game",
        "brain teaser online",
      ],
    },
    content: numberSlideContent,
  },
  {
    id: "memory-flip",
    title: "Memory Flip",
    description:
      "Flip cards, remember positions, and match every pair. A calm memory challenge with emoji symbols and a best-score tracker.",
    genre: ["Puzzle", "Casual", "Memory"],
    releasedAt: "2025-01-18",
    popularity: 73,
    seo: {
      keywords: [
        "memory flip",
        "memory matching game",
        "card matching game",
        "concentration game",
        "pair matching online",
        "memory game free",
      ],
    },
    content: memoryFlipContent,
  },
  {
    id: "chess",
    title: "Chess",
    description:
      "Play the full game of chess in your browser. Select pieces, see legal moves, and checkmate your opponent on a clean board.",
    genre: ["Strategy", "Board", "2 Player"],
    releasedAt: "2025-02-09",
    popularity: 88,
    seo: {
      keywords: [
        "play chess online",
        "free chess game",
        "chess vs friend",
        "browser chess",
        "learn chess rules",
        "chess strategy game",
      ],
    },
    content: chessContent,
  },
  {
    id: "dots-and-boxes",
    title: "Dots and Boxes",
    description:
      "Draw lines, complete squares, and claim the board. Chain your captures to dominate this two-player strategy classic.",
    genre: ["Strategy", "Puzzle", "2 Player"],
    releasedAt: "2025-03-02",
    popularity: 69,
    seo: {
      keywords: [
        "dots and boxes",
        "dots and boxes online",
        "squares game",
        "two player strategy game",
        "pen and paper game",
        "free dots game",
      ],
    },
    content: dotsAndBoxesContent,
  },
  {
    id: "dragger",
    title: "Dragger",
    description:
      "Drag connector blocks to build non-crossing paths between matching colored nodes.",
    genre: ["Puzzle"],
    releasedAt: "2025-04-01",
    popularity: 85,
    seo: {
      keywords: [
        "dragger game",
        "drag puzzle",
        "connection game",
        "line puzzle",
        "browser puzzle",
        "free dragger",
      ],
    },
    content: draggerContent,
  },
  {
    id: "counterfeit",
    title: "Counterfeit",
    description:
      "Spot the fake banknote among real ones using subtle visual clues and careful observation.",
    genre: ["Puzzle"],
    releasedAt: "2025-04-02",
    popularity: 72,
    seo: {
      keywords: [
        "counterfeit game",
        "spot the fake",
        "money game",
        "banknote game",
        "detective puzzle",
        "visual observation",
      ],
    },
    content: counterfeitContent,
  },
  {
    id: "colored-lines",
    title: "Colored Lines",
    description:
      "Draw non-intersecting colored lines connecting matching dots on a grid. Fill every dot to win.",
    genre: ["Puzzle"],
    releasedAt: "2025-04-03",
    popularity: 88,
    seo: {
      keywords: [
        "colored lines game",
        "flow game",
        "connect dots",
        "line puzzle",
        "color puzzle",
        "free online puzzle",
      ],
    },
    content: coloredLinesContent,
  },
  {
    id: "2048",
    title: "2048",
    description:
      "Merge matching numbered tiles to reach 2048 in this classic sliding puzzle.",
    genre: ["Puzzle"],
    releasedAt: "2025-04-04",
    popularity: 95,
    seo: {
      keywords: [
        "2048 game",
        "2048 online",
        "sliding puzzle",
        "number merge game",
        "2048 puzzle",
        "free 2048",
      ],
    },
    content: game2048Content,
  },
  {
    id: "threetown",
    title: "Threetown",
    description:
      "Navigate branching paths and collect coins in this tri-split maze adventure.",
    genre: ["Puzzle"],
    releasedAt: "2025-04-05",
    popularity: 62,
    seo: {
      keywords: [
        "threetown game",
        "branching maze",
        "coin collect",
        "path puzzle",
        "browser puzzle",
        "free threetown",
      ],
    },
    content: threetownContent,
  },
  {
    id: "symmetris",
    title: "Symmetris",
    description:
      "Complete symmetrical figures by drawing the missing mirrored half.",
    genre: ["Puzzle"],
    releasedAt: "2025-04-06",
    popularity: 70,
    seo: {
      keywords: [
        "symmetris game",
        "symmetry puzzle",
        "mirror drawing",
        "pattern game",
        "browser puzzle",
        "free symmetris",
      ],
    },
    content: symmetrisContent,
  },
  {
    id: "casual-miner",
    title: "Casual Miner",
    description:
      "Dig tunnels and collect gems while managing fuel in a relaxing mine run.",
    genre: ["Puzzle"],
    releasedAt: "2025-04-07",
    popularity: 68,
    seo: {
      keywords: [
        "casual miner game",
        "mine game",
        "gem collect",
        "tunnel puzzle",
        "casual puzzle",
        "free browser game",
      ],
    },
    content: casualMinerContent,
  },
  {
    id: "match-the-feel",
    title: "Match the Feel",
    description:
      "Drag emoji tiles to matching color zones as fast as possible for the highest score.",
    genre: ["Arcade"],
    releasedAt: "2025-04-08",
    popularity: 74,
    seo: {
      keywords: [
        "match the feel game",
        "color match game",
        "drag game",
        "emoji game",
        "speed game",
        "free match game",
      ],
    },
    content: matchTheFeelContent,
  },
  {
    id: "oooze",
    title: "Oooze",
    description:
      "Grow your blob by absorbing smaller particles while avoiding larger cells.",
    genre: ["Arcade"],
    releasedAt: "2025-04-09",
    popularity: 65,
    seo: {
      keywords: [
        "oooze game",
        "blob game",
        "grow game",
        "particle game",
        "arcade game",
        "free oooze",
      ],
    },
    content: ooozeContent,
  },
  {
    id: "shipfind",
    title: "Shipfind",
    description:
      "Locate and sink the enemy fleet by guessing grid coordinates in this naval strategy game.",
    genre: ["Strategy"],
    releasedAt: "2025-04-10",
    popularity: 82,
    seo: {
      keywords: [
        "shipfind game",
        "battleship game",
        "naval game",
        "strategy game",
        "grid game",
        "free shipfind",
      ],
    },
    content: shipfindContent,
  },
  {
    id: "rotate",
    title: "Rotate",
    description:
      "Spin grid sections to connect pipes from source to destination in this rotation puzzle.",
    genre: ["Puzzle"],
    releasedAt: "2025-04-11",
    popularity: 90,
    seo: {
      keywords: [
        "rotate game",
        "pipe puzzle",
        "rotation game",
        "grid puzzle",
        "connect game",
        "free rotate",
      ],
    },
    content: rotateContent,
  },
  {
    id: "snakris",
    title: "Snakris",
    description:
      "Stack falling blocks, clear full rows, and chase a high score in this arcade puzzle.",
    genre: ["Arcade"],
    releasedAt: "2025-04-12",
    popularity: 83,
    seo: {
      keywords: [
        "snakris game",
        "block stack game",
        "falling block puzzle",
        "tetris-like game",
        "arcade game",
        "free snakris",
      ],
    },
    content: snakrisContent,
  },
  {
    id: "guess-the-colors",
    title: "Guess the Colors",
    description:
      "Type the ink color of displayed words, not the word itself, in this Stroop test challenge.",
    genre: ["Puzzle"],
    releasedAt: "2025-04-13",
    popularity: 76,
    seo: {
      keywords: [
        "guess the colors game",
        "stroop test",
        "color game",
        "word game",
        "reaction game",
        "free guess game",
      ],
    },
    content: guessTheColorsContent,
  },
  {
    id: "rotate2",
    title: "Rotate²",
    description:
      "Advanced rotation puzzle where spinning grid pieces must align into symmetrical completion.",
    genre: ["Puzzle"],
    releasedAt: "2025-04-14",
    popularity: 78,
    seo: {
      keywords: [
        "rotate2 game",
        "rotation puzzle",
        "symmetry game",
        "grid game",
        "pattern game",
        "free rotate2",
      ],
    },
    content: rotate2Content,
  },
  {
    id: "chinese-checkers",
    title: "Chinese Checkers",
    description:
      "Race marbles across a star board by jumping over other pieces to the opposite triangle.",
    genre: ["Board"],
    releasedAt: "2025-04-15",
    popularity: 81,
    seo: {
      keywords: [
        "chinese checkers game",
        "marble game",
        "star board game",
        "strategy game",
        "board game",
        "free chinese checkers",
      ],
    },
    content: chineseCheckersContent,
  },
  {
    id: "masterpieces",
    title: "Masterpieces",
    description:
      "Place colored blocks to match target symmetrical patterns on a grid.",
    genre: ["Puzzle"],
    releasedAt: "2025-04-16",
    popularity: 67,
    seo: {
      keywords: [
        "masterpieces game",
        "pattern puzzle",
        "block puzzle",
        "symmetry game",
        "browser puzzle",
        "free masterpieces",
      ],
    },
    content: masterpiecesContent,
  },
  {
    id: "mastercards",
    title: "Mastercards",
    description:
      "Match pairs of themed memory cards with the fewest possible moves.",
    genre: ["Memory"],
    releasedAt: "2025-04-17",
    popularity: 71,
    seo: {
      keywords: [
        "mastercards game",
        "memory card game",
        "card matching",
        "pair game",
        "free mastercards",
        "browser memory game",
      ],
    },
    content: mastercardsContent,
  },
  {
    id: "sudoku",
    title: "Sudoku",
    description:
      "Fill the 9x9 grid so every row, column, and 3x3 box contains digits 1-9 exactly once.",
    genre: ["Puzzle"],
    releasedAt: "2025-04-18",
    popularity: 94,
    seo: {
      keywords: [
        "sudoku game",
        "sudoku online",
        "number puzzle",
        "logic puzzle",
        "9x9 puzzle",
        "free sudoku",
      ],
    },
    content: sudokuContent,
  },
  {
    id: "reversi",
    title: "Reversi",
    description:
      "Flip enemy discs by sandwiching them between your pieces along straight or diagonal lines.",
    genre: ["Board"],
    releasedAt: "2025-04-19",
    popularity: 79,
    seo: {
      keywords: [
        "reversi game",
        "othello game",
        "disc flip game",
        "strategy game",
        "two player game",
        "free reversi",
      ],
    },
    content: reversiContent,
  },
  {
    id: "mastermind",
    title: "Mastermind",
    description:
      "Crack a 4-color secret code using logic and position feedback after every guess.",
    genre: ["Puzzle"],
    releasedAt: "2025-04-20",
    popularity: 77,
    seo: {
      keywords: [
        "mastermind game",
        "code breaker game",
        "logic puzzle",
        "color game",
        "deduction game",
        "free mastermind",
      ],
    },
    content: mastermindContent,
  },
  {
    id: "numberhunt",
    title: "NumberHunt",
    description:
      "Find and circle target numbers hidden in a grid against the clock.",
    genre: ["Puzzle"],
    releasedAt: "2025-04-21",
    popularity: 69,
    seo: {
      keywords: [
        "numberhunt game",
        "hidden numbers",
        "search game",
        "number game",
        "timed puzzle",
        "free numberhunt",
      ],
    },
    content: numberhuntContent,
  },
  {
    id: "minesweeper",
    title: "Minesweeper",
    description:
      "Reveal safe cells, flag mines, and clear the board without exploding.",
    genre: ["Puzzle"],
    releasedAt: "2025-04-22",
    popularity: 91,
    seo: {
      keywords: [
        "minesweeper game",
        "classic minesweeper",
        "mine game",
        "grid puzzle",
        "logic game",
        "free minesweeper",
      ],
    },
    content: minesweeperContent,
  },
  {
    id: "mahjongg-solitaire",
    title: "Mahjongg Solitaire",
    description:
      "Match identical exposed mahjong tiles to clear the stacked board before time runs out.",
    genre: ["Puzzle"],
    releasedAt: "2025-04-23",
    popularity: 86,
    seo: {
      keywords: [
        "mahjongg solitaire game",
        "mahjongg game",
        "tile matching game",
        "solitaire puzzle",
        "free mahjongg",
      ],
    },
    content: mahjonggSolitaireContent,
  },
  {
    id: "freecell",
    title: "Freecell",
    description:
      "Move all cards to foundation piles using four free cells strategically.",
    genre: ["Card"],
    releasedAt: "2025-04-24",
    popularity: 80,
    seo: {
      keywords: [
        "freecell game",
        "freecell solitaire",
        "card game",
        "patience game",
        "browser card game",
        "free freecell",
      ],
    },
    content: freecellContent,
  },
  {
    id: "what-was-there",
    title: "What Was There?",
    description:
      "View a scene briefly then answer detailed questions about what you saw.",
    genre: ["Memory"],
    releasedAt: "2025-04-25",
    popularity: 64,
    seo: {
      keywords: [
        "what was there game",
        "visual memory game",
        "observation game",
        "memory quiz",
        "scene recall",
        "free memory game",
      ],
    },
    content: whatWasThereContent,
  },
  {
    id: "the-image-quiz",
    title: "The Image Quiz",
    description:
      "Identify zoomed-in or cropped images from multiple choice options.",
    genre: ["Quiz"],
    releasedAt: "2025-04-26",
    popularity: 73,
    seo: {
      keywords: [
        "the image quiz game",
        "picture quiz game",
        "visual quiz",
        "image guessing game",
        "trivia game",
        "free image quiz",
      ],
    },
    content: theImageQuizContent,
  },
  {
    id: "trivianut",
    title: "TriviaNut",
    description:
      "Answer fast-paced trivia questions across categories with streak bonuses.",
    genre: ["Quiz"],
    releasedAt: "2025-04-27",
    popularity: 84,
    seo: {
      keywords: [
        "trivianut game",
        "trivia game",
        "quiz game",
        "knowledge game",
        "browser quiz",
        "free trivianut",
      ],
    },
    content: trivianutContent,
  },
  {
    id: "memocoly",
    title: "Memocoly",
    description:
      "Watch a pattern of highlighted cells and repeat it from memory as it grows.",
    genre: ["Memory"],
    releasedAt: "2025-04-28",
    popularity: 66,
    seo: {
      keywords: [
        "memocoly game",
        "memory sequence game",
        "pattern memory",
        "brain game",
        "memory trainer",
        "free memocoly",
      ],
    },
    content: memocolyContent,
  },
  {
    id: "checkers",
    title: "Checkers",
    description:
      "Classic 8x8 checkers with capture jumps, king promotion, and two-player play.",
    genre: ["Board"],
    releasedAt: "2025-04-29",
    popularity: 89,
    seo: {
      keywords: [
        "checkers game",
        "draughts game",
        "board game",
        "two player game",
        "classic checkers",
        "free checkers",
      ],
    },
    content: checkersContent,
  },
  {
    id: "lettermaze",
    title: "Lettermaze",
    description:
      "Navigate a maze by typing directional commands and collecting letters along the way.",
    genre: ["Puzzle"],
    releasedAt: "2025-04-30",
    popularity: 61,
    seo: {
      keywords: [
        "lettermaze game",
        "maze game",
        "word maze",
        "direction game",
        "puzzle game",
        "free lettermaze",
      ],
    },
    content: lettermazeContent,
  },
  {
    id: "anagramania",
    title: "Anagramania",
    description:
      "Rearrange scrambled letters into valid words; longer words score higher.",
    genre: ["Word"],
    releasedAt: "2025-05-01",
    popularity: 75,
    seo: {
      keywords: [
        "anagramania game",
        "anagram game",
        "word scramble",
        "word game",
        "spelling game",
        "free anagramania",
      ],
    },
    content: anagramaniaContent,
  },
  {
    id: "guess-the-place",
    title: "Guess the Place!",
    description:
      "Identify cities and landmarks from photos in this geography quiz game.",
    genre: ["Quiz"],
    releasedAt: "2025-05-02",
    popularity: 87,
    seo: {
      keywords: [
        "guess the place game",
        "geography game",
        "landmark quiz",
        "place guessing game",
        "world quiz",
        "free geography game",
      ],
    },
    content: guessThePlaceContent,
  },
  {
    id: "letterama",
    title: "Letterama",
    description:
      "Find hidden words in letter grids that run horizontally, vertically, and diagonally.",
    genre: ["Word"],
    releasedAt: "2025-05-03",
    popularity: 70,
    seo: {
      keywords: [
        "letterama game",
        "word search game",
        "letter grid",
        "hidden words",
        "puzzle game",
        "free letterama",
      ],
    },
    content: letteramaContent,
  },
  {
    id: "squarewords",
    title: "SquareWords",
    description:
      "Build a word square where every row and column reads the same forwards and backwards.",
    genre: ["Word"],
    releasedAt: "2025-05-04",
    popularity: 63,
    seo: {
      keywords: [
        "squarewords game",
        "word square",
        "palindrome puzzle",
        "word game",
        "browser puzzle",
        "free squarewords",
      ],
    },
    content: squarewordsContent,
  },
  {
    id: "what-word",
    title: "What Word?",
    description:
      "Guess the hidden 5-letter word in 6 tries with color-coded feedback.",
    genre: ["Word"],
    releasedAt: "2025-05-05",
    popularity: 93,
    seo: {
      keywords: [
        "what word game",
        "wordle game",
        "5 letter word game",
        "word puzzle",
        "guessing game",
        "free word game",
      ],
    },
    content: whatWordContent,
  },
  {
    id: "spellice",
    title: "Spellice",
    description:
      "Type falling words before they hit the bottom to freeze and eliminate them.",
    genre: ["Word"],
    releasedAt: "2025-05-06",
    popularity: 77,
    seo: {
      keywords: [
        "spellice game",
        "typing game",
        "word typing",
        "falling words",
        "speed typing",
        "free spellice",
      ],
    },
    content: spelliceContent,
  },
  {
    id: "the-wordhunt-game",
    title: "The WordHunt Game",
    description:
      "Find as many words as possible in a letter grid within a time limit.",
    genre: ["Word"],
    releasedAt: "2025-05-07",
    popularity: 80,
    seo: {
      keywords: [
        "the wordhunt game",
        "word hunt game",
        "letter grid",
        "word search",
        "timed puzzle",
        "free wordhunt",
      ],
    },
    content: theWordhuntGameContent,
  },
  {
    id: "speedtype",
    title: "SpeedType",
    description:
      "Type falling words before they reach the bottom; speed and difficulty increase over time.",
    genre: ["Typing"],
    releasedAt: "2025-05-08",
    popularity: 82,
    seo: {
      keywords: [
        "speedtype game",
        "speed typing game",
        "typing game",
        "word typing",
        "reflex game",
        "free speedtype",
      ],
    },
    content: speedtypeContent,
  },
  {
    id: "speedread",
    title: "SpeedRead",
    description:
      "Read passages quickly and answer comprehension questions under time pressure.",
    genre: ["Education"],
    releasedAt: "2025-05-09",
    popularity: 58,
    seo: {
      keywords: [
        "speedread game",
        "speed reading game",
        "reading comprehension",
        "education game",
        "brain game",
        "free speedread",
      ],
    },
    content: speedreadContent,
  },
  {
    id: "solitaire",
    title: "Solitaire",
    description:
      "Classic Klondike solitaire with tableau columns, foundations, and a draw pile.",
    genre: ["Card"],
    releasedAt: "2025-05-10",
    popularity: 92,
    seo: {
      keywords: [
        "solitaire game",
        "klondike solitaire",
        "card game",
        "patience game",
        "classic solitaire",
        "free solitaire",
      ],
    },
    content: solitaireContent,
  },
  {
    id: "jigsaw",
    title: "Jigsaw",
    description:
      "Slide tiles to reassemble an image; fewer moves means a better score.",
    genre: ["Puzzle"],
    releasedAt: "2025-05-11",
    popularity: 85,
    seo: {
      keywords: [
        "jigsaw puzzle game",
        "sliding puzzle",
        "image puzzle",
        "tile puzzle",
        "browser puzzle",
        "free jigsaw",
      ],
    },
    content: jigsawContent,
  },
  {
    id: "word-wipe",
    title: "Word Wipe",
    description:
      "Swipe or type to connect adjacent letters and form words on a dynamic board.",
    genre: ["Word"],
    releasedAt: "2025-05-12",
    popularity: 81,
    seo: {
      keywords: [
        "word wipe game",
        "word connect game",
        "letter game",
        "word puzzle",
        "swipe game",
        "free word wipe",
      ],
    },
    content: wordWipeContent,
  },
  {
    id: "mahjongg-dimensions",
    title: "Mahjongg Dimensions",
    description:
      "3D-style mahjongg with stacked layers; match exposed pairs to clear deeper tiles.",
    genre: ["Puzzle"],
    releasedAt: "2025-05-13",
    popularity: 86,
    seo: {
      keywords: [
        "mahjongg dimensions game",
        "3d mahjongg game",
        "tile matching game",
        "layered puzzle",
        "free mahjongg",
      ],
    },
    content: mahjonggDimensionsContent,
  },
  {
    id: "crossword",
    title: "Crossword",
    description:
      "Fill a 5x5 grid by solving short clues; check and reveal letters as needed.",
    genre: ["Puzzle"],
    releasedAt: "2025-05-14",
    popularity: 88,
    seo: {
      keywords: [
        "crossword game",
        "crossword puzzle",
        "word puzzle",
        "clue game",
        "browser crossword",
        "free crossword",
      ],
    },
    content: crosswordContent,
  },
];

export function getGame(id: string): GameMeta {
  const game = games.find((g) => g.id === id);
  if (!game) throw new Error(`Unknown game: ${id}`);
  return game;
}

export function gameUrl(id: string): string {
  return `/${id}`;
}

export function canonicalUrl(id: string): string {
  return `${SITE_URL}/${id}`;
}

/** Games suggested on a given game's page (excludes itself). */
export function relatedGames(id: string, count = 4): GameMeta[] {
  const current = getGame(id);
  const others = games.filter((g) => g.id !== id);
  // Prefer games that share a genre, then fall back to popularity.
  const scored = others.map((g) => {
    const shared = g.genre.filter((x) => current.genre.includes(x)).length;
    return { g, score: shared * 100 + g.popularity };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, count).map((s) => s.g);
}

export function popularGames(count = 4): GameMeta[] {
  return [...games].sort((a, b) => b.popularity - a.popularity).slice(0, count);
}

export function trendingGames(count = 4): GameMeta[] {
  return [...games]
    .sort(
      (a, b) =>
        new Date(b.releasedAt).getTime() - new Date(a.releasedAt).getTime()
    )
    .slice(0, count);
}

export function newGames(count = 3): GameMeta[] {
  return [...games]
    .sort(
      (a, b) =>
        new Date(b.releasedAt).getTime() - new Date(a.releasedAt).getTime()
    )
    .slice(0, count);
}
