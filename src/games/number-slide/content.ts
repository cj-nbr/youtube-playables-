import type { GameContent } from "../../../../../shared/types";

export const content: GameContent = {
  guide: [
    {
      heading: "Goal",
      body: "Arrange the tiles 1 through 15 in ascending order, reading left to right and top to bottom, with the empty space ending in the bottom-right corner. The empty space is what lets you slide tiles around, so treat it as your free move that shuffles everything else into place.",
    },
    {
      heading: "How to play",
      body: "Click or tap a tile that sits directly next to the empty space and it slides into that gap, leaving a new empty space behind it. You can only move tiles orthogonally (up, down, left, right) next to the blank; diagonal moves are not allowed. Plan ahead — random moves will scramble the board more than they solve it.",
    },
    {
      heading: "Strategy",
      body: "Solve the board row by row, left to right, from the top down. Once a row or column is correct, avoid disturbing it. A useful trick is to keep the empty tile parked in the bottom-right area; this gives you room to rotate tiles and makes the transition between finished rows much smoother.",
    },
    {
      heading: "Example",
      body: "If tile 5 is sitting directly beside the empty square, click tile 5 and it slides into the gap. Work systematically: solve the top row (tiles 1-4) first, then the second row, then the third, and finally place 13-15 with the blank in the corner. Small, deliberate moves beat frantic clicking every time.",
    },
  ],
  instructions: {
    objective:
      "Rearrange the 4×4 grid so the numbered tiles read 1 through 15 in ascending order and the empty space sits in the bottom-right corner. Every slide must use the empty space to swap an adjacent tile into it.",
    desktop:
      "Use the mouse to click any tile that is orthogonally adjacent to the empty space. The clicked tile slides into the empty square. You can also use the arrow keys to slide the tile next to the blank in the pressed direction. Only adjacent tiles move; diagonal moves are not allowed.",
    mobile:
      "Tap any tile that sits directly next to the empty space and it slides into the gap. There is no dragging — a single tap on an adjacent tile performs the move. Plan your taps so you never accidentally break a row you have already solved.",
    winning:
      "You win when tiles 1 through 15 are in ascending order across the grid and the empty space is in the bottom-right corner. The game records your move count, so an ideal solve is the fewest moves possible rather than simply reaching the solved state.",
    losing:
      "Not applicable — Number Slide is a relaxing, no-pressure puzzle with no timer or fail state. There is no way to lose; the only challenge is solving the board in as few moves as you can. Take your time and undo mentally if a move feels wrong.",
    tips: [
      "Solve the top row first (tiles 1-4), then move down row by row rather than jumping around the board.",
      "Keep the empty tile in a bottom corner while working on upper rows so you don't accidentally disturb solved tiles.",
      "Never slide a completed row or column out of place; protect solved sections and work only in the unsolved area.",
      "Practice the 'rotate three tiles' trick: cycle three tiles around the blank to reposition one without undoing the rest.",
      "Count your moves and try to beat your previous best; a lower move total is the real measure of a clean solve.",
      "If you get stuck, backtrack a few moves instead of scrambling — reversing recent slides is almost always faster than guessing.",
    ],
  },
  faqs: [
    {
      q: "How do you play Number Slide?",
      a: "Click or tap any tile next to the empty square and it slides into the gap. Your goal is to order tiles 1-15 with the blank in the bottom-right. Only tiles adjacent to the empty space can move, and you solve it by sliding tiles one step at a time.",
    },
    {
      q: "What is the 15-puzzle?",
      a: "The 15-puzzle is a 4×4 sliding tile game with fifteen numbered tiles and one empty space. Invented in the 1870s, it became a worldwide craze. Number Slide is a modern, relaxed version of that classic sliding puzzle played on a grid.",
    },
    {
      q: "Is every Number Slide board solvable?",
      a: "Yes. The boards are generated so they are always solvable. Randomly shuffling tiles by sliding the blank guarantees a reachable solution, so you will never be given an impossible configuration when you start a game.",
    },
    {
      q: "Why are some 15-puzzle configurations impossible?",
      a: "Half of all random tile arrangements are unsolvable because of a parity rule: the number of inversions plus the blank's row from the bottom must be even. Our generator only produces solvable boards, so you never face an impossible one.",
    },
    {
      q: "How do I solve the 15-puzzle?",
      a: "Solve it row by row from the top. Place tiles 1-4 across the first row, then 5-8, then 9-12, and finally arrange 13-15 with the blank in the corner. Keep the blank in the unsolved region to avoid disturbing finished rows.",
    },
    {
      q: "What is the best strategy for Number Slide?",
      a: "Work top row first, then each row below, keeping the empty space in the bottom-right area. Protect solved rows from accidental moves and use the three-tile rotation trick to reposition single tiles. Systematic play beats random sliding.",
    },
    {
      q: "How does sliding a tile work?",
      a: "Only a tile orthogonally adjacent to the empty space can move. Clicking or tapping it swaps it with the blank, which then moves to where the tile was. Diagonal moves are not allowed, and you can't move a tile that isn't touching the gap.",
    },
    {
      q: "What does the move counter track?",
      a: "The move counter records every slide you make, one count per tile moved. It lets you measure efficiency, since a clean solve uses fewer moves. There is no penalty for many moves, but fewer moves means a better solve.",
    },
    {
      q: "How difficult is Number Slide?",
      a: "Difficulty is gentle but grows with practice. Beginners can solve the top rows quickly; the last two rows require more planning. Because there is no timer, you can think freely, making it relaxing yet mentally engaging.",
    },
    {
      q: "What is the history of the 15-puzzle?",
      a: "The 15-puzzle was popularized in 1880 by sam Loyd, though it was likely invented earlier by Noyes Chapman. Loyd offered a prize for an unsolvable version that was, in fact, impossible, which fueled its global popularity as a puzzle craze.",
    },
    {
      q: "Is there a world record for the 15-puzzle?",
      a: "Yes. Speedcubers solve the physical 15-puzzle competitively, with world-class times under 20 seconds for a specific starting configuration. In Number Slide the 'record' is your own fewest moves, since boards vary each game.",
    },
    {
      q: "Do you need a timer in Number Slide?",
      a: "No. Number Slide is untimed and pressure-free. You can solve at your own pace and focus on minimizing moves rather than racing the clock, which makes it a calm puzzle suited to casual play.",
    },
    {
      q: "Tips for beginners?",
      a: "Start by placing tile 1 in the top-left, then build the top row across. Keep the blank below your working area, and don't worry about speed. Solving row by row with patience is the fastest way to learn the puzzle.",
    },
    {
      q: "Can I play Number Slide on mobile?",
      a: "Yes. Number Slide is touch-friendly: just tap any tile next to the empty space and it slides in. No dragging or keyboard is needed, so it plays naturally on phones and tablets with a single finger.",
    },
    {
      q: "Is Number Slide accessible?",
      a: "The game uses large, clearly numbered tiles and simple tap or click input, which works with common assistive setups. High-contrast numbers and straightforward controls make it approachable for many players.",
    },
    {
      q: "What games are similar to Number Slide?",
      a: "Similar puzzles include the 8-puzzle (3×3 version), Klotski, Rush Hour, and other sliding block games. Any puzzle where you rearrange pieces within a constrained grid shares the same spatial reasoning appeal.",
    },
    {
      q: "Can I undo a move?",
      a: "You can reverse a slide by moving the same tile back into the blank, since every move is reversible. There is no dedicated undo button described here, but stepping a tile back returns the board to its previous state.",
    },
    {
      q: "Why does the blank matter so much?",
      a: "The empty space is the only way tiles move; it is effectively your single free slot. Managing where the blank travels lets you cycle tiles into position without disturbing solved areas, which is the heart of any good solving method.",
    },
    {
      q: "How many moves does a typical solve take?",
      a: "A random but solvable 15-puzzle can need anywhere from a few dozen to over eighty moves for a clean solve. With practice and a row-by-row method, most players settle into efficient patterns well below the worst case.",
    },
    {
      q: "Is there a guaranteed solving method?",
      a: "Yes. The human 'row-by-row' method always works: solve the top row and left column, then treat the remaining 3×3 (or 2×2) as a smaller puzzle. It is slower than optimal algorithms but never fails and is easy to learn.",
    },
  ],
  blog: [
    {
      title: "Number Slide — Complete Guide",
      excerpt:
        "Everything you need to know about Number Slide: what the 15-puzzle is, how sliding works, and the step-by-step method that turns a scrambled grid into a clean solve.",
      headings: [
        "What is Number Slide",
        "How sliding works",
        "The row-by-row method",
        "Managing the empty space",
        "Keeping your solve efficient",
      ],
      body: [
        "Number Slide is a modern, relaxing take on the classic 15-puzzle. You face a 4×4 grid filled with numbered tiles 1 through 15 and a single empty space. Your task is to slide tiles until they read 1 to 15 in order, left to right and top to bottom, with the blank in the bottom-right corner.",
        "Sliding is simple but constrained. Only a tile that sits directly next to the empty space can move, and it swaps places with the blank. There is no dragging pieces across the board; every move is a single orthogonal step into the gap. Diagonal moves are not allowed, which is what gives the puzzle its structure.",
        "The most reliable way to solve it is the row-by-row method. Start with the top row: place tile 1 in the top-left, then 2, 3, and 4 across. Once the top row is locked, move to the second row, then the third. The bottom-right two tiles are handled last, with the blank parked in the corner.",
        "Managing the empty space is the real skill. Keep the blank in the region you are still solving, ideally near the bottom-right, so you never accidentally slide a finished tile out of place. When you need to nudge one tile without undoing others, rotate three tiles around the blank in a small cycle.",
        "Efficiency comes from planning. Count your moves and try to beat your previous best rather than racing a clock, since Number Slide is untimed. A clean solve means fewer slides, so think a move ahead, protect solved rows, and backtrack deliberately when you get stuck instead of scrambling the board.",
      ],
    },
    {
      title: "Beginner's Method to Solve the 15-Puzzle",
      excerpt:
        "New to sliding puzzles? This beginner-friendly walkthrough teaches the row-by-row technique that reliably solves Number Slide without guesswork.",
      headings: [
        "Start with tile 1",
        "Build the top row",
        "Work down the board",
        "Finish the last tiles",
      ],
      body: [
        "If you have never solved a 15-puzzle, the row-by-row method is the easiest to learn and it never fails. Begin by finding tile 1 and sliding it into the top-left corner. You may need to move several other tiles first, but always keep your eye on getting tile 1 home.",
        "With tile 1 placed, find tile 2 and slide it next to tile 1, then tile 3, and finally tile 4 to complete the top row. Once a tile is in its correct spot, avoid moving it again. Keeping the blank below the row you are building prevents you from disturbing finished tiles.",
        "Repeat the process for the second and third rows, always left to right. As the board fills, you have less room to maneuver, so move the blank carefully within the unsolved area. If a tile you need is trapped, rotate it around the empty space with neighboring tiles until it can drop into place.",
        "The final two rows are the trickiest. Solve tiles 13 and 14 in the third row, then position 9, 10, and 11 in the second column before handling 15 and the blank. With practice this becomes routine, and you will finish scrambled boards confidently without random clicking.",
      ],
    },
    {
      title: "Advanced Techniques & Common Mistakes",
      excerpt:
        "Once you can solve Number Slide reliably, refine your play. Learn the three-tile rotation, corner tactics, and the mistakes that waste dozens of moves.",
      headings: [
        "The three-tile rotation",
        "Protecting solved rows",
        "Corner and last-tile traps",
        "Mistakes that cost moves",
      ],
      body: [
        "The three-tile rotation is the key advanced move. When you need to shift a single tile without disturbing the rest, cycle three tiles around the blank in a loop. This lets you reposition one piece at a time and is far more precise than sliding tiles back and forth hoping for progress.",
        "A common error is breaking a row you already solved. Once the top rows are correct, route the blank around them rather than through them. If you must pass the blank over a finished tile, restore that tile immediately before moving on, so solved sections stay intact.",
        "The last two tiles often trap beginners. Avoid the mistake of placing 15 too early, which can make the final blank land in the wrong corner. Solve the third row's 13 and 14 first, keep the blank mobile in the bottom-right, and only commit 15 when the path is clear.",
        "The biggest move-wasters are panic sliding and failing to plan. Random clicks scramble more than they fix, and ignoring the blank's position leads to long detours. Think one move ahead, count your slides, and backtrack intentionally; a calm, systematic solve is almost always the shortest one.",
      ],
    },
  ],
};


