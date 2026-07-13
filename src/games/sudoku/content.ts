import type { GameContent } from "../../shared/types";

export const content: GameContent = {
  guide: [
    {
      heading: "Goal",
      body: "Fill every empty cell of the 9×9 grid with a digit from 1 to 9. Each row, each column, and each of the nine 3×3 boxes must contain every digit exactly once. You start with a handful of clues already placed, and your job is to deduce the rest.",
    },
    {
      heading: "How to play",
      body: "Select any empty cell, then tap a number on the keypad to write it in. Switch the Notes toggle to pencil in small candidate digits instead of committing a value. Tap a filled cell again to select it, and use the eraser to clear mistakes.",
    },
    {
      heading: "Hints & highlighting",
      body: "The board highlights the row, column, and 3×3 box of your selected cell, plus every other cell containing the same number. This makes conflicts obvious and helps you spot where a digit can or cannot go.",
    },
    {
      heading: "Winning the puzzle",
      body: "You win the moment the entire grid is correctly filled. A wrong entry costs a life, and three mistakes end the run. Finishing with a clean board and a fast time earns your highest score.",
    },
  ],
  instructions: {
    objective:
      "Complete the 9×9 grid so that every row, column, and 3×3 box holds the digits 1 through 9 exactly once, with no mistakes.",
    desktop:
      "Click a cell to select it, then click a number on the on-screen keypad to place it. Toggle Notes to mark pencil candidates in a cell. Use the Erase control to remove an entry. Arrow keys move the selection and number keys 1-9 fill the active cell. Press N to toggle notes mode.",
    mobile:
      "Tap a cell to select it, then tap a digit on the keypad to enter it. Activate Notes to pencil candidates, and use the eraser button to clear a cell. The whole board scales to your screen and is fully touch-friendly.",
    winning:
      "You win when every cell is filled and matches a valid solution. Your score rewards a fast finish and a flawless board, and your best score is saved locally on your device.",
    losing:
      "You lose if you make three incorrect placements. Each wrong digit removes one of your three lives and auto-clears the cell. Run out of lives and the puzzle ends in a game over.",
    tips: [
      "Scan for rows, columns, or boxes that are only missing one digit and fill those first.",
      "Use Notes to track every possible candidate before you commit a number.",
      "Focus on the most-constrained regions — a box with many clues narrows your options fastest.",
      "Watch the highlighted duplicates; the board flags any conflicting digit immediately.",
      "Start with obvious singles, then mark candidates to unlock the harder cells step by step.",
      "If stuck, clear a crowded cell and re-derive its value from the remaining candidates.",
    ],
  },
  faqs: [
    {
      q: "How do you play Sudoku?",
      a: "Select an empty cell and enter a digit 1-9 so that no row, column, or 3×3 box repeats a number. Use the given clues to deduce the rest. You win when the whole grid is filled correctly.",
    },
    {
      q: "What are the rules of Sudoku?",
      a: "Each of the nine rows, nine columns, and nine 3×3 boxes must contain the digits 1 through 9 exactly once. The puzzle starts with some cells pre-filled as clues, and you complete the remaining empty cells under those constraints.",
    },
    {
      q: "How does the scoring work in this Sudoku?",
      a: "Your score is based on how quickly you solve the puzzle and how few mistakes you make. A fast, flawless finish scores highest. Your best result is saved locally so you can chase a personal record.",
    },
    {
      q: "What happens when I make a mistake?",
      a: "A wrong placement costs one of your three lives and the cell is cleared so you can try again. Make three mistakes and the run ends in a game over.",
    },
    {
      q: "How do notes work?",
      a: "Notes let you pencil in small candidate digits inside a cell without committing to them. They are perfect for tracking possibilities while you reason through the harder parts of the grid.",
    },
    {
      q: "Is the puzzle always solvable?",
      a: "Yes. Every board is generated from a complete, valid solution and then reduced, keeping a unique logically deducible answer. You never face a puzzle with no correct completion.",
    },
    {
      q: "Can I play Sudoku on mobile?",
      a: "Absolutely. The board and keypad are fully responsive and touch-optimized. Tap a cell, then tap a digit, exactly as you would with a mouse on desktop.",
    },
    {
      q: "What is the best Sudoku strategy for beginners?",
      a: "Start with the easiest singles: look for rows, columns, or boxes missing only one digit. Fill those, then use the constraints they create to solve neighboring regions step by step.",
    },
    {
      q: "What is the hidden singles technique?",
      a: "A hidden single is a digit that can go in only one cell within a row, column, or box even though that cell has other candidates. Spotting hidden singles is one of the fastest ways to make progress.",
    },
    {
      q: "How is this different from classic paper Sudoku?",
      a: "The board auto-highlights related cells and duplicate numbers, and it tracks lives, timer, and score for you. The logic is identical, but the digital version removes bookkeeping so you can focus on solving.",
    },
    {
      q: "Does my best score save between visits?",
      a: "Yes. Your highest score is stored in your browser's local storage, so it persists when you return. Clearing your browser data resets it, since the score lives on your device rather than a server.",
    },
    {
      q: "Is there a time limit?",
      a: "There is no hard timer that fails you, but a faster finish earns a higher score. You can play at a relaxed pace and still complete the puzzle; speed simply boosts your rating.",
    },
    {
      q: "How many difficulty levels are there?",
      a: "Each new game produces a fresh puzzle with a different clue layout. Because scoring rewards speed and accuracy, every board becomes its own challenge to beat.",
    },
    {
      q: "Can I undo a move?",
      a: "Use the Erase control to clear the selected cell at any time. You can also re-select a filled cell and overwrite it with a new value, so correcting your work is quick and easy.",
    },
    {
      q: "Are the clues generated or hand-made?",
      a: "They are generated procedurally from a fully solved grid, then reduced while preserving a unique solution. This guarantees a fair, always-solvable puzzle every time you start a new game.",
    },
    {
      q: "Is Sudoku good for your brain?",
      a: "Yes. Sudoku exercises logical reasoning, concentration, and working memory. Regular short sessions can sharpen focus and provide a relaxing mental workout without time pressure.",
    },
    {
      q: "Why do some cells highlight when I type?",
      a: "The board shows the active cell's row, column, and 3×3 box, plus every matching digit, so you can immediately see conflicts and plan placements. It is a visual aid, not a hint answer.",
    },
    {
      q: "Is this Sudoku free to play?",
      a: "Yes. It runs entirely in your browser with no account, no download, and no cost. Open the page and start solving right away.",
    },
  ],
  blog: [
    {
      title: "Sudoku — The Complete Beginner Guide",
      excerpt:
        "Learn the rules of Sudoku, how the grid is structured, and the core techniques that turn a blank board into a solved one.",
      headings: [
        "What Is Sudoku",
        "How the Grid Works",
        "The Most Basic Technique",
        "Using Notes to Track Candidates",
        "Why It Is So Addictive",
      ],
      body: [
        "Sudoku is a logic puzzle built on a 9×9 grid divided into nine 3×3 boxes. The goal is simple to state but satisfying to achieve: place the digits 1 through 9 so that every row, column, and box contains each digit exactly once.",
        "The grid uses three overlapping constraints. A single cell belongs to one row, one column, and one 3×3 box at the same time, which means placing a digit removes that option from all three regions. Understanding this triple constraint is the key to every solving technique.",
        "The easiest move is the naked single: a cell where only one digit can possibly fit because every other value already appears in its row, column, or box. Scanning for these openings gives you a confident first foothold on almost any board.",
        "Notes let you pencil in every candidate a cell could still hold. As you fill other cells, you erase candidates, and a crowded cell often collapses into a single remaining possibility. Notes turn guesswork into a systematic process.",
        "Sudoku is addictive because it offers a steady stream of small wins. Each placed digit confirms your reasoning and opens the next step, producing a satisfying loop of observation, deduction, and progress.",
      ],
    },
    {
      title: "Intermediate Sudoku Strategies That Win Games",
      excerpt:
        "Move beyond singles with hidden singles, pointing pairs, and box-line reduction to crack tougher puzzles faster.",
      headings: [
        "Finding Hidden Singles",
        "Pointing Pairs and Triples",
        "Box-Line Reduction",
        "Claiming and Locking",
        "Building Solving Speed",
      ],
      body: [
        "A hidden single appears when a digit can fit in only one cell of a region even though that cell has several candidates. Sweeping each row, column, and box for the last available home of a digit reveals many hidden singles.",
        "Pointing pairs occur when a candidate appears in only two cells of a box and both sit in the same row or column. That candidate can then be eliminated from the rest of that row or column outside the box.",
        "Box-line reduction is the mirror image: when a candidate lives in only one row or column of a box, you can remove it from the rest of that line inside other boxes. These two ideas together clear huge swaths of uncertainty.",
        "Claiming and locking describe how a strong placement in one region restricts its neighbors. Whenever you lock a candidate into a line segment, propagate that restriction outward before moving on.",
        "Speed comes from habit. Work region by region, keep notes tidy, and always re-scan after each placement. The fastest solvers are not luckier; they simply apply the same checks in a disciplined order.",
      ],
    },
    {
      title: "The Brain Science Behind Sudoku",
      excerpt:
        "Why a daily Sudoku session can sharpen memory, reduce stress, and train the logical circuits you use everywhere.",
      headings: [
        "A Workout for Working Memory",
        "Pattern Recognition at Play",
        "Calm Focus and Stress Relief",
        "A Low-Stakes Challenge",
        "Make It a Daily Habit",
      ],
      body: [
        "Sudoku constantly engages working memory, the system you use to hold and manipulate information in the moment. Tracking candidates and constraints exercises that system much like repetitions strengthen a muscle.",
        "Solving trains pattern recognition. Over time your brain learns to spot singles, pairs, and reductions almost instantly, a transferable skill that helps with coding, planning, and problem solving in daily life.",
        "Because the puzzle is self-paced and has no fail state beyond its own lives system here, it creates calm, focused attention. That meditative concentration can lower stress while still keeping the mind engaged.",
        "The challenge is low-stakes: a wrong digit costs a life but invites another attempt, so mistakes become feedback rather than failure. This safe-to-fail framing keeps learning enjoyable and persistent.",
        "A short daily session beats a rare marathon. Consistent practice builds durable reasoning gains and steadily improves both your speed and your best score, turning a quick break into real cognitive training.",
      ],
    },
  ],
};
