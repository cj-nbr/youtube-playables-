import type { GameContent } from "../../../shared/types";

export const content: GameContent = {
  guide: [
    {
      heading: "Goal",
      body: "Fill the 5×5 grid so that every row and every column spells a real word. A few letters are placed for you as anchors, and short clues describe the five hidden words. Complete the whole grid correctly to solve the puzzle and record your fastest time.",
    },
    {
      heading: "How to play",
      body: "Click or tap an empty square to select it, then type a letter. The selection advances automatically so you can fill quickly. Use the clues beneath the grid to work out each word. When every square is filled, the puzzle is checked and correct squares are confirmed.",
    },
    {
      heading: "Strategy",
      body: "Start with the clues you are most confident about and use the pre-filled letters as constraints. Because each square belongs to both a row word and a column word, a single confident letter narrows two words at once. Cross-check intersections whenever you are unsure.",
    },
    {
      heading: "Example",
      body: "If a row clue reads \"A bed on a ship\" you can pencil in BERTH. The B now becomes the first letter of the first column word too, so its clue must start with B. Following these crossings turns a few known letters into a fully solved grid.",
    },
  ],
  instructions: {
    objective:
      "Complete the 5×5 grid so that all five rows and all five columns form valid words, matching the given clues, in the fastest time you can.",
    desktop:
      "Click a square to select it and type a letter to fill it. Use arrow keys to move between squares and Backspace to clear one. Pre-filled letters are locked. Press Check, or simply fill the last square, to verify your solution.",
    mobile:
      "Tap a square to select it, then tap letters on your device keyboard to fill it. Locked squares cannot be changed. Tap Check to verify your grid, or complete the final square and the puzzle checks itself automatically.",
    winning:
      "You win when every square is filled correctly so that all rows and columns spell their intended words. Your completion time is recorded, and your fastest solve is saved as your best score.",
    losing:
      "There is no fail state or timer limit — you cannot lose. If your grid is filled but incorrect, the wrong squares are highlighted so you can fix them and try again at your own pace.",
    tips: [
      "Begin with the clue you are most sure of to anchor the grid.",
      "Use every pre-filled letter as a hard constraint on both its row and column.",
      "Solve at intersections — one letter helps two words at the same time.",
      "If a word almost fits, check its crossing letters before committing.",
      "Common word endings like -ER, -TE, and -LE can reveal a whole column.",
      "When stuck, fill in your best guesses and use Check to see which letters are right.",
    ],
  },
  faqs: [
    {
      q: "How do you play Square Words?",
      a: "Fill a 5×5 grid so that each row and each column spells a valid word. Click or tap a square, type a letter, and use the clues below the grid to work out the words. Some letters are given to start you off. Complete the grid correctly to solve it.",
    },
    {
      q: "What are the rules of Square Words?",
      a: "Every one of the five rows and five columns must form a real word that matches its clue. Pre-filled squares are fixed and cannot be changed. You solve the puzzle when all squares are filled correctly, and your best solve time is saved.",
    },
    {
      q: "Why are some letters already filled in?",
      a: "The pre-filled letters are anchors that guarantee the puzzle has a clear path to the solution. They act as constraints on both the row and the column they sit in, giving you a foothold to reason out the surrounding words from the clues.",
    },
    {
      q: "Do the rows and columns use the same words?",
      a: "These puzzles use symmetric word squares, so each row word also appears as the matching column word. That means the clue for the first row is the same as the clue for the first column, which makes cross-checking your answers especially powerful.",
    },
    {
      q: "How do I enter letters?",
      a: "Click or tap a square to select it, then type a letter on your keyboard. The selection moves forward automatically so you can fill squares in a flow. Use Backspace to clear a square and arrow keys to move around the grid.",
    },
    {
      q: "How does the Check feature work?",
      a: "Press Check to verify your current grid. Correct letters are confirmed and any incorrect squares are highlighted so you know exactly what to fix. The puzzle also checks itself automatically the moment every square is filled.",
    },
    {
      q: "Is there a timer?",
      a: "A timer runs while you solve, but it never ends the game — it simply measures how long your solve takes. Your fastest completion is stored as your best score, giving speed-solvers a target while keeping the puzzle stress-free for everyone else.",
    },
    {
      q: "Can I lose Square Words?",
      a: "No. There is no fail state and no time limit. If your grid is wrong, the incorrect squares are flagged and you can keep adjusting until everything fits. The only thing at stake is your completion time.",
    },
    {
      q: "Does my best time save?",
      a: "Yes. Your fastest solve is stored locally in your browser and shown so you can try to beat it. Clearing your browser data or switching devices resets it, because the record is kept on your device rather than on a server.",
    },
    {
      q: "What is the best strategy?",
      a: "Start from the clue you are most confident about, then use its letters as constraints for the crossing words. Because each square serves a row and a column, solving intersections cascades quickly. Lean on the pre-filled anchors and common word endings.",
    },
    {
      q: "Can I play Square Words on mobile?",
      a: "Yes. The grid and controls are touch-friendly, so you can tap squares and type on your device keyboard. It runs in any modern mobile browser with no download or account required, and it adapts to portrait and landscape screens.",
    },
    {
      q: "What is a word square?",
      a: "A word square is a grid where the same set of words can be read across each row and down each column. The classic five-letter example is HEART, EMBER, ABUSE, RESIN, TREND. Square Words turns these elegant structures into interactive puzzles.",
    },
    {
      q: "Are the puzzles different each time?",
      a: "Yes. The game draws from a set of hand-picked word squares and randomizes which letters are pre-filled, so replaying delivers fresh challenges. Learning to read the crossings, rather than memorizing answers, is what makes you faster.",
    },
    {
      q: "What skills does Square Words build?",
      a: "It sharpens vocabulary, deductive reasoning, and pattern recognition. Because every letter is constrained in two directions, you practice logical cross-checking much like a crossword, while also expanding your feel for common English word shapes.",
    },
    {
      q: "Is Square Words good for kids?",
      a: "Yes. It is a calm, non-violent puzzle that reinforces spelling and logical thinking. Younger solvers can lean heavily on the pre-filled anchors and clues, while older players enjoy racing the clock for a faster best time.",
    },
    {
      q: "What if a word fits the letters but not the clue?",
      a: "Every solution word matches its clue, so if a word fits the letters but not the clue, its crossing letters are likely leading you astray. Re-check the intersecting words; usually one shared letter needs to change to satisfy both directions.",
    },
    {
      q: "What games are similar to Square Words?",
      a: "It sits between crosswords, word squares, and fill-in puzzles. If you enjoy mini crosswords, Waffle, or classic word boxes where letters must satisfy two directions at once, Square Words will feel immediately familiar and rewarding.",
    },
    {
      q: "Is Square Words free to play?",
      a: "Yes. It runs entirely in your browser at no cost, with no account and no installation. Open the page and start solving immediately, and your best time stays private on your own device.",
    },
  ],
  blog: [
    {
      title: "Square Words — Complete Guide",
      excerpt:
        "Understand word squares, learn the controls, and pick up a solving order that gets you to a solution fast.",
      headings: [
        "What Is Square Words",
        "How the Grid Works",
        "Entering and Checking Answers",
        "A Reliable Solving Order",
        "Chasing a Faster Time",
      ],
      body: [
        "Square Words is a compact logic-and-vocabulary puzzle built on the elegant idea of a word square: a 5×5 grid in which every row and every column spells a valid word. A handful of letters are given as anchors, and five short clues point you toward the hidden words.",
        "Because these puzzles are symmetric, the word in each row is mirrored by the matching column word, so a single letter you place always constrains two directions at once. This crossing structure is the heart of the game and the key to solving efficiently rather than by guesswork.",
        "Entering answers is simple: click or tap a square, type a letter, and the selection advances so you can fill in a flow. Locked anchor letters cannot be changed. Press Check to confirm your progress and flag mistakes, or just fill the final square to trigger an automatic check.",
        "A dependable solving order starts with the clue you know best. Place that word, then look at where its letters intersect the crossing words and use the clues to confirm them. Each confirmed letter tightens the remaining words until the grid resolves almost on its own.",
        "Once you can solve the puzzles comfortably, start chasing a faster time. Your quickest completion is saved as your best score, so learning to recognize common word shapes and reading the crossings at a glance becomes a satisfying way to shave off seconds.",
      ],
    },
    {
      title: "Solving Word Squares Like a Pro",
      excerpt:
        "Cross-checking, constraint thinking, and pattern spotting that turn a blank grid into a quick solve.",
      headings: [
        "Think in Constraints",
        "Solve at the Intersections",
        "Exploit Common Endings",
        "Trust the Anchors",
        "Verify Before You Commit",
      ],
      body: [
        "Expert solvers treat every square as a constraint problem. A letter is only correct if it works for both its row word and its column word. Holding both directions in mind at once, rather than solving rows in isolation, is the mindset that separates fast solves from slow ones.",
        "The fastest progress comes from intersections. When two partially known words cross, the shared square often has only one letter that satisfies both. Hunting for these forced squares lets you place letters with certainty and avoids the trial and error that eats up time.",
        "Common word endings are a powerful shortcut. Suffixes like -ER, -LE, -TE, and -ED appear constantly, so recognizing them in a column can reveal several letters at once. Training your eye to spot these patterns makes whole sections of the grid fall into place.",
        "Never underestimate the pre-filled anchors. They are placed to make the solution reachable, so build outward from them first. An anchor at a busy intersection is especially valuable because it immediately constrains both of the words that pass through it.",
        "Finally, verify before you commit to a tricky letter. If a word fits its own clue but its crossing letters look wrong, pause and re-examine the intersection. A quick mental check prevents the frustrating cascade of errors that comes from forcing a single bad guess.",
      ],
    },
    {
      title: "The History and Appeal of Word Squares",
      excerpt:
        "From ancient inscriptions to modern browser puzzles, why grids of interlocking words endure.",
      headings: [
        "An Ancient Puzzle Form",
        "The Elegance of Symmetry",
        "Why They Feel Satisfying",
        "A Gentle Brain Workout",
        "Bringing Them to Your Browser",
      ],
      body: [
        "Word squares are one of the oldest known word puzzles. The famous Latin Sator square, arranged so it reads the same across and down, dates back to Roman times and shows how long people have delighted in letters that interlock in multiple directions.",
        "Their appeal lies in symmetry. A well-formed word square is a small marvel of structure, where five words weave together so tightly that changing one letter ripples through the whole grid. That interlocking elegance is exactly what makes solving them feel like assembling a tiny machine.",
        "Completing a word square is deeply satisfying because the solution is self-confirming. When the last letter clicks into place and every row and column reads as a word, you get immediate, unambiguous proof that you were right, a reward that keeps puzzlers coming back.",
        "As a brain exercise, word squares blend vocabulary with logical deduction. You retrieve words from memory while simultaneously testing them against constraints, giving both your language and reasoning skills a gentle, enjoyable workout without any stressful time pressure.",
        "Square Words brings this classic form to the browser with clean controls, helpful anchors, and a best-time tracker. It preserves the timeless satisfaction of interlocking words while adding modern conveniences like instant checking and endless, freshly randomized challenges.",
      ],
    },
  ],
};
