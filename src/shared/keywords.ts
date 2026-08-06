// ============================================================================
// KEYWORD & QUESTION RESEARCH DATASET
// ----------------------------------------------------------------------------
// Purpose: a single, version-controlled source of researched search intent for
// the site's SEO content program. Saved here so future content work can reuse
// it without re-researching.
//
// Sourcing note: these lists were compiled from publicly observed search-intent
// patterns for the puzzle / brain / browser-game niche (high-volume terms,
// long-tail phrases, "People Also Ask", autosuggest-style queries, and
// comparison / how-to / best / tips framings). They are a working seed set,
// not a live API export — refresh against Google Search Console, Google
// Autosuggest, and a keyword tool before publishing a new campaign.
//
// Structure:
//  keywordResearch.evergreen  -> generic, site-wide topics
//  keywordResearch.games    -> per-game seeds keyed by game id
// Each entry has: head (high-volume), longTail, questions (PAA-style),
// comparisons, howTo, best, tips, and lowCompetition picks.
// ============================================================================

export interface KeywordSet {
 head: string[];
 longTail: string[];
 questions: string[];
 comparisons: string[];
 howTo: string[];
 best: string[];
 tips: string[];
 lowCompetition: string[];
}

export const keywordResearch = {
 evergreen: {
  brainGames: {
   head: ["brain games", "brain training", "brain exercises", "memory games", "cognitive games"],
   longTail: [
    "free brain games for adults",
    "brain games to improve memory and focus",
    "best brain training games online free",
    "brain games that actually work",
    "daily brain training routine",
    "brain games for seniors",
    "brain games for students",
   ],
   questions: [
    "Are brain games actually effective?",
    "Do brain games improve memory?",
    "How long should I play brain games each day?",
    "What are the best free brain games?",
    "Do brain games prevent dementia?",
    "Can brain games help with focus?",
   ],
   comparisons: ["Lumosity vs free brain games", "brain games vs puzzles", "online brain games vs apps"],
   howTo: ["how to build a daily brain training habit", "how to improve memory with games"],
   best: ["best brain games for adults", "best free brain training games", "best memory games online"],
   tips: ["brain training tips for beginners", "how to get the most from brain games"],
   lowCompetition: ["calm brain games for work breaks", "no download brain games", "2 minute brain warm ups"],
  },
  puzzleGames: {
   head: ["puzzle games", "online puzzles", "free puzzle games", "logic puzzles"],
   longTail: [
    "best free puzzle games no download",
    "puzzle games to play at work",
    "relaxing puzzle games online",
    "hard logic puzzles with answers",
    "daily puzzle games",
    "browser puzzle games no sign up",
   ],
   questions: [
    "What are the best free puzzle games?",
    "Are puzzle games good for your brain?",
    "What puzzle game should I play first?",
    "Can puzzle games reduce stress?",
   ],
   comparisons: ["puzzle games vs brain games", "sudoku vs other number puzzles"],
   howTo: ["how to get better at puzzle games", "how to solve logic puzzles faster"],
   best: ["best puzzle games online free", "best logic puzzles for adults"],
   tips: ["puzzle solving techniques", "how to avoid common puzzle mistakes"],
   lowCompetition: ["quick puzzle breaks at work", "printable vs online puzzles"],
  },
  browserGames: {
   head: ["browser games", "free online games", "HTML5 games", "games without downloading"],
   longTail: [
    "free browser games no download no sign up",
    "best free browser games 2026",
    "instant games play in browser",
    "no wifi needed browser games after load",
    "browser games that work on school computers",
    "safe free games to play online",
   ],
   questions: [
    "What are the best free browser games?",
    "Are browser games safe?",
    "Do browser games need downloading?",
    "Can you play browser games on a phone?",
   ],
   comparisons: ["browser games vs downloaded games", "browser games vs app store games"],
   howTo: ["how to play games without downloading", "how to find safe free browser games"],
   best: ["best free online games", "best no download games", "best browser games for breaks"],
   tips: ["how to make browser games load faster", "best devices for browser gaming"],
   lowCompetition: ["free browser games for office", "low spec browser games"],
  },
  casualGames: {
   head: ["casual games", "relaxing games", "fun games at work", "office games"],
   longTail: [
    "relaxing games to play on break",
    "fun games to play at work browser",
    "stress relief games free",
    "easy games for a quick break",
    "calm games before bed",
   ],
   questions: [
    "What are good games to play at work?",
    "Are casual games good for stress?",
    "What games help you relax?",
   ],
   comparisons: ["casual games vs hardcore games"],
   howTo: ["how to take a healthy gaming break at work"],
   best: ["best casual games free", "best relaxing browser games"],
   tips: ["how long should a work break game be"],
   lowCompetition: ["silent games for shared offices", "one hand games at work"],
  },
  educationalGames: {
   head: ["educational games", "learning games", "games for students", "IQ games"],
   longTail: [
    "free educational games for teens",
    "games that improve IQ",
    "classroom brain games",
    "vocabulary games for students",
    "math puzzle games free",
   ],
   questions: [
    "Do educational games help learning?",
    "What games raise IQ?",
    "Are there free learning games?",
   ],
   comparisons: ["educational games vs flashcards"],
   howTo: ["how to use games for studying"],
   best: ["best educational browser games", "best IQ games online"],
   tips: ["how to gamify study sessions"],
   lowCompetition: ["games for focus before exams", "brain games for homework breaks"],
  },
 } as Record<string, KeywordSet>,

 games: {
  "arrow-game": {
   head: ["tic tac toe", "tic-tac-toe online", "noughts and crosses", "XO game"],
   longTail: [
    "play tic tac toe free online",
    "tic tac toe vs friend",
    "tic tac toe strategy to never lose",
    "tic tac toe rules for beginners",
    "how to win tic tac toe every time",
    "tic tac toe on phone no download",
   ],
   questions: [
    "How do you play tic tac toe?",
    "How do you win tic tac toe every time?",
    "Is tic tac toe a solved game?",
    "What is the best first move in tic tac toe?",
    "Can tic tac toe end in a draw?",
    "Who goes first in tic tac toe?",
   ],
   comparisons: ["tic tac toe vs chess", "tic tac toe vs connect four"],
   howTo: ["how to never lose at tic tac toe", "how to teach tic tac toe to a child"],
   best: ["best tic tac toe games online", "best free noughts and crosses"],
   tips: ["tic tac toe winning strategy", "tic tac toe common mistakes"],
   lowCompetition: ["tic tac toe for two players pass and play", "brain training with tic tac toe"],
  },
  "stack-tower": {
   head: ["stack tower", "stacking game", "tower block game", "timing game"],
   longTail: [
    "play stack tower free online",
    "stack tower high score tips",
    "how to stack blocks perfectly",
    "stack tower game no download",
    "best timing games browser",
   ],
   questions: [
    "How do you play Stack Tower?",
    "How do you get a high score in Stack Tower?",
    "What is the best timing for Stack Tower?",
    "Why does my tower get smaller?",
    "Is Stack Tower good for reflexes?",
   ],
   comparisons: ["stack tower vs tower bloxx", "stack tower vs other timing games"],
   howTo: ["how to improve at stack tower", "how to time your taps"],
   best: ["best stack tower games online", "best reflex timing games"],
   tips: ["stack tower tips for higher scores", "how to stay calm while stacking"],
   lowCompetition: ["relaxing timing games", "one tap reflex games"],
  },
  "color-match": {
   head: ["color match game", "colour matching game", "rgb color game", "color perception test"],
   longTail: [
    "play color match free online",
    "color match game tips and tricks",
    "how to get a perfect color match",
    "rgb color mixing game",
    "color match no download",
   ],
   questions: [
    "How do you play Color Match?",
    "How do you match colors perfectly?",
    "What is the best strategy for Color Match?",
    "Are color games good for the brain?",
    "Can color games help with color blindness?",
   ],
   comparisons: ["color match vs other perception games"],
   howTo: ["how to tune rgb sliders fast", "how to improve color perception"],
   best: ["best color matching games online", "best perception games free"],
   tips: ["color match tips for a high score", "how to read a hex code"],
   lowCompetition: ["designer color training games", "quick color perception warm ups"],
  },
  "block-blast": {
   head: ["block blast", "block puzzle game", "blast blocks", "match same color blocks"],
   longTail: [
    "play block blast free online",
    "block blast combo strategy",
    "how to clear big groups in block blast",
    "block blast tips high score",
    "block puzzle games no download",
   ],
   questions: [
    "How do you play Block Blast?",
    "How do you get big combos in Block Blast?",
    "What is the best strategy for Block Blast?",
    "Is Block Blast good for the brain?",
    "How do you avoid running out of moves?",
   ],
   comparisons: ["block blast vs match 3 games", "block blast vs tetris"],
   howTo: ["how to plan clears in block blast", "how to chain combos"],
   best: ["best block puzzle games online", "best combo puzzle games"],
   tips: ["block blast tips and tricks", "common block blast mistakes"],
   lowCompetition: ["calm block clearing games", "satisfying combo puzzles"],
  },
  "number-slide": {
   head: ["15 puzzle", "number slide", "sliding puzzle", "number puzzle game"],
   longTail: [
    "play number slide free online",
    "how to solve the 15 puzzle",
    "15 puzzle solution step by step",
    "number sliding puzzle tips",
    "sliding puzzle no download",
   ],
   questions: [
    "How do you play Number Slide?",
    "How do you solve a 15 puzzle?",
    "What is the fastest way to solve a sliding puzzle?",
    "Why is my 15 puzzle unsolvable?",
    "Is the 15 puzzle good for the brain?",
   ],
   comparisons: ["15 puzzle vs rubiks cube", "number slide vs picture slide"],
   howTo: ["how to solve the 15 puzzle", "how to solve sliding puzzles fast"],
   best: ["best sliding puzzle games online", "best number puzzles free"],
   tips: ["15 puzzle solving techniques", "sliding puzzle common mistakes"],
   lowCompetition: ["solvable 15 puzzle generator", "sliding puzzle for focus"],
  },
  "memory-flip": {
   head: ["memory game", "memory flip", "concentration game", "card matching game"],
   longTail: [
    "play memory flip free online",
    "memory matching game tips",
    "how to get better at memory games",
    "memory game pairs strategy",
    "memory game no download",
   ],
   questions: [
    "How do you play Memory Flip?",
    "How do you improve at memory games?",
    "What is the best memory game strategy?",
    "Are memory games good for the brain?",
    "How do you remember card positions?",
   ],
   comparisons: ["memory flip vs other memory games", "memory game vs chess for brain"],
   howTo: ["how to train visual memory", "how to get fewer moves in memory"],
   best: ["best memory games online free", "best pair matching games"],
   tips: ["memory game tips and tricks", "how to build a memory routine"],
   lowCompetition: ["calm memory games for breaks", "memory games for students"],
  },
  chess: {
   head: ["play chess online", "free chess", "chess rules", "how to play chess"],
   longTail: [
    "how to play chess for beginners",
    "chess strategy for beginners",
    "how to win at chess faster",
    "best chess openings for beginners",
    "learn chess rules step by step",
    "play chess free no download",
   ],
   questions: [
    "How do you play chess?",
    "How does each chess piece move?",
    "What is checkmate?",
    "What are the best openings for beginners?",
    "How do you get better at chess?",
    "Is chess good for the brain?",
    "What is the best first move in chess?",
   ],
   comparisons: ["chess vs checkers", "chess vs go", "chess vs chinese checkers"],
   howTo: ["how to play chess for beginners", "how to checkmate faster", "how to avoid blunders"],
   best: ["best free chess games online", "best chess strategy guides"],
   tips: ["chess tips for beginners", "common chess mistakes", "how to practice chess daily"],
   lowCompetition: ["two player pass and play chess", "chess for brain training"],
  },
  "dots-and-boxes": {
   head: ["dots and boxes", "dots and boxes online", "squares game", "pen and paper game"],
   longTail: [
    "play dots and boxes free online",
    "dots and boxes winning strategy",
    "how to win dots and boxes every time",
    "dots and boxes chain tactic",
    "dots and boxes no download",
   ],
   questions: [
    "How do you play Dots and Boxes?",
    "What is the best strategy for Dots and Boxes?",
    "How do you chain boxes?",
    "Is Dots and Boxes a solved game?",
    "Who wins Dots and Boxes?",
   ],
   comparisons: ["dots and boxes vs chess", "dots and boxes vs nim"],
   howTo: ["how to win at dots and boxes", "how to set up box chains"],
   best: ["best dots and boxes games online", "best two player strategy games"],
   tips: ["dots and boxes winning tips", "common dots and boxes mistakes"],
   lowCompetition: ["pen and paper games online", "quick two player brain games"],
  },
 } as Record<string, KeywordSet>,
};

export type KeywordResearch = typeof keywordResearch;

