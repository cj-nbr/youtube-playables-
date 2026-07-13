import type { GameContent } from "../../../shared/types";

export const content: GameContent = {
  guide: [
    {
      heading: "Goal",
      body: "Fill the grid with colored blocks to match the target symmetrical pattern exactly. Each puzzle gives you a limited palette of blocks and a tight move budget. Match the pattern with the fewest moves to earn the best score and unlock increasingly complex layouts.",
    },
    {
      heading: "How to play",
      body: "Study the target pattern at the top of the board. It is always symmetrical, so solve one half and mirror it across the axis. Select from your inventory of blocks, choose a clear empty cell, and place it. Some blocks can be rotated before placement to fit the pattern.",
    },
    {
      heading: "Symmetry advantage",
      body: "Because the target is guaranteed to be mirror-symmetric, you can cut your workload in half. Fill the central row or column first, then work outward from the axis. Once one half matches, the other half must match automatically if you use the same sequence of mirrored placements.",
    },
    {
      heading: "Example",
      body: "In a 5×5 puzzle the target has a red center, blue arms along the vertical axis, and green corners. Your inventory offers five red, four blue, and four green blocks. Place red in the center, then mirror blue on the vertical axis rows above and below, then mirror green to the left and right corners. Finish in three well-chosen moves.",
    },
  ],
  instructions: {
    objective:
      "Place colored blocks from your inventory onto the grid to recreate the target symmetrical pattern. Best scores go to players who finish with the fewest moves and zero wrong placements.",
    desktop:
      "Click a block in your inventory, then click an empty grid cell to place it. Click a placed block to remove it. Right-click or double-click to rotate blocks that support rotation. The target pattern always mirrors itself along one axis, so use that to reduce your workload.",
    mobile:
      "Tap a block in your palette, then tap an empty grid cell to place it. Tap a placed block to remove it. Use the rotation button for blocks that support it. The layout gives clear color contrast so you can match the target even on smaller screens.",
    winning:
      "You win when your placed blocks exactly match the target pattern and every cell is filled. Your score combines remaining blocks, unused moves, and time to give a three-part performance rating. Best scores persist locally.",
    losing:
      "You lose if you run out of moves before the pattern is complete, or if you place so many wrong blocks that the move budget expires. Rotate and remove freely, but count each removal as a spent move.",
    tips: [
      "Study the target before touching any block; a thirty-second scan avoids most mistakes.",
      "Solve the center line first, because symmetry is strongest there.",
      "Build one half and mirror it mentally before placing the second half.",
      "Use rotation only when necessary; fixed blocks are cheaper to place.",
      "Remove blocks early when you see a mistake instead of layering more.",
      "Keep one reserve block of each color until the final fill so you never guess.",
    ],
  },
  faqs: [
    {
      q: "How do you play Masterpieces?",
      a: "You are given a target symmetrical pattern and a palette of colored blocks. Place blocks onto the grid to recreate the pattern exactly. Rotate blocks when needed, remove wrong placements, and finish within your move budget to earn the best score.",
    },
    {
      q: "What is a symmetrical pattern?",
      a: "A symmetrical pattern mirrors itself across at least one axis — usually vertical, horizontal, or both. That means half of the puzzle is a perfect reflection of the other half. Use that symmetry to solve faster by working from the center outward.",
    },
    {
      q: "How does rotation work?",
      a: "Some blocks are marked as rotatable. Click or tap a rotatable block in your palette, then click the rotate control to turn it 90 degrees before placing it. Once placed, rotation is no longer possible without removing the block, which costs a move.",
    },
    {
      q: "What happens if I run out of moves?",
      a: "If your move budget reaches zero before the pattern matches exactly, the level ends and you earn a score based on your accuracy. You can restart the level to try a different strategy or faster placement sequence.",
    },
    {
      q: "How is scoring calculated?",
      a: "Scoring combines three factors: how many cells are correct, how many moves remain unused, and how quickly you finish. A perfect run with the full budget intact and all cells matched gives the highest possible score, which is tracked as your local best.",
    },
    {
      q: "Do I need artistic skill to play Masterpieces?",
      a: "Not at all. The game is a logic puzzle, not a drawing tool. You match colors to predefined cells, and the symmetry hints remove guesswork. Pattern recognition and spatial planning are more useful than artistic talent.",
    },
    {
      q: "Is there a timer in Masterpieces?",
      a: "Yes, each level runs on a limited move budget rather than a countdown timer. You are not rushed by a clock, but you are encouraged to place blocks efficiently so you finish with moves remaining for a better score.",
    },
    {
      q: "Can I play Masterpieces on mobile?",
      a: "Yes. The board and palette are touch-friendly with large tap targets. Tap a block, then tap a cell to place it. Rotation is handled by a dedicated button so small-screen play feels natural.",
    },
    {
      q: "What difficulty levels exist?",
      a: "Puzzles range from 3×3 grids for beginners to 7×7 grids for experts. Early levels use only four colors and no rotation; later levels introduce more colors, mixed rotations, and tighter move budgets.",
    },
    {
      q: "Why does symmetry matter?",
      a: "Symmetry cuts the effective problem size in half. If the target mirrors across its center, solving the right half automatically defines the left half. Experienced players use this to reduce their move count and earn higher scores.",
    },
    {
      q: "Can I undo a placement?",
      a: "Yes. Click or tap a placed block to remove it and return it to your palette. This costs one move, so use undo sparingly and plan placements carefully to avoid wasting your budget.",
    },
    {
      q: "Is Masterpieces good for kids?",
      a: "Yes. The rules are simple, the color palettes are bright, and the symmetry concept teaches early geometry and pattern recognition. Children can start on small grids and work up to larger symmetrical puzzles as their planning skills grow.",
    },
    {
      q: "What if I cannot see the mirror axis?",
      a: "The target pattern is always clearly symmetrical across one axis. If you are unsure which axis to use, look for the row or column where colors repeat in reverse order. That is your mirror line. Center blocks lie exactly on the axis and never move.",
    },
    {
      q: "How does the best score system work?",
      a: "Your best score for each level is saved locally. Try to beat it by improving your accuracy and reducing moves. The scoreboard only tracks your own progress, not other players.",
    },
    {
      q: "What is a perfect run in Masterpieces?",
      a: "A perfect run places every block correctly on the first try, uses fewer than half of the available moves, and leaves the full compliment of unused blocks in your palette. Reaching this earns the maximum reward and five stars on the level summary.",
    },
    {
      q: "What games are similar to Masterpieces?",
      a: "Fans of Masterpieces often enjoy nonogram puzzles, color-matching games, and Tetris for their spatial logic. The symmetries and block planning also echo classic jigsaw puzzles and origami instructions.",
    },
  ],
  blog: [
    {
      title: "Masterpieces — How Symmetry Powers Puzzle Design",
      excerpt:
        "Why mirrored patterns make great puzzles and how to exploit symmetry for faster solves.",
      headings: [
        "Symmetry in Nature and Games",
        "The Puzzle Design Advantage",
        "Solving From the Center Out",
        "Common Symmetry Mistakes",
        "Design Your Own Symmetrical Pattern",
      ],
      body: [
        "Symmetry is everywhere: butterfly wings, snowflakes, architecture, and even the human face. Games use symmetry because the brain finds mirrored repetition satisfying and easy to process. In Masterpieces, symmetry is not decoration — it is the central mechanic that lets you solve puzzles faster and more confidently.",
        "When a puzzle designer uses symmetry, they can hide half the solution. The player sees the whole pattern but only needs to consciously reconstruct half. Masters automatically notice this and apply it, treating the puzzle as two smaller problems instead of one large one. That reduces fatigue and fewer losses from careless placement.",
        "The fastest solving method is almost always center-out. Start with blocks on the mirror axis because those cells are unique anchors. Once the center row or column is locked, mirror every subsequent placement to the opposite side. You will finish in fewer moves and build confidence as the pattern reveals itself.",
        "A common mistake is to treat symmetry as a style choice rather than a tool. Beginners fill one corner completely before realizing the other corner should mirror it. Instead, build both corners simultaneously or alternate between sides. This keeps your mental load low and prevents a long backtrack.",
        "Try designing a small symmetrical pattern yourself: choose a size like 5×5, color the center, then choose a few cells on the right and copy them to the left. Ask a friend to recreate it and watch how quickly they notice the symmetry. That experiment reveals exactly why the game feels so natural to play.",
      ],
    },
    {
      title: "Block Placement Strategies",
      excerpt:
        "Reduce wasted moves with smarter palette management and rotation timing in Masterpieces.",
      headings: [
        "Inventory Management",
        "Rotation Timing",
        "Removal vs Adjustment",
        "Endgame Efficiency",
        "Practice Exercises",
      ],
      body: [
        "Treat your block inventory like a budget. Every block you remove costs a move, so try to place blocks correctly the first time by scanning the target from the axis outward. Reserve one block of each color as a buffer; that way you never run out mid-pattern and never have to guess.",
        "Rotate only when the pattern demands it. A block that already matches its target cell without rotation is a free win. If you rotate prematurely you may accidentally force a later block into a non-rotatable orientation. Check each target cell before rotating, then rotate once and confirm orientation.",
        "Removal is expensive, so before you click a wrong block, check whether you can cover it with a new block instead. If the cell is surrounded by correct blocks, removing might let you rebuild; if the cell is isolated, removing is often cheaper than layering mistakes. Learn to read the cost of backtracking.",
        "Endgame efficiency matters most when you have only a handful of cells left. At that stage, do not blindly place the first block you see. Match the remaining empty cells to whatever blocks you have left, placing color first and rotation second. This habit shaves off moves and maximizes your score.",
        "Practice exercises include solving the same 5×5 puzzle three times: once center-out, once top-left corner-first, and once by placing all fixed blocks before any rotatable ones. Compare how many moves each strategy takes. Over time you will find the order that feels most natural.",
      ],
    },
    {
      title: "Pattern Matching and Brain Training",
      excerpt:
        "How symmetrical pattern matching strengthens your memory, planning, and visual-spatial reasoning.",
      headings: [
        "Visual-Spatial Reasoning",
        "Planning and Sequence Memory",
        "Stress-Free Focus",
        "Transferable Learning",
        "Daily Practice Routine",
      ],
      body: [
        "Pattern matching relies on visual-spatial reasoning, the ability to rotate, flip, and compare shapes in your mind. Masterpieces trains this skill by requiring you to hold the target pattern in memory while you place blocks from a separate palette. Over time, players report faster recognition of symmetry in everyday objects.",
        "Planning is equally exercised. You must sequence placements so that later blocks have the correct environment. This trains your working memory and teaches the brain to simulate several steps ahead — a skill that transfers directly to math, chess, and programming logic puzzles.",
        "Because there is no countdown timer, Masterpieces is a calm brain exercise. You can pause, step away, and return without penalty. The move budget provides gentle pressure without stress, making it ideal for family play or as a quiet break during a busy day.",
        "Skill transfer is measurable. Studies of block puzzles show improvements in mental rotation scores, reaction time for pattern completion, and flexibility when rules change. Those same abilities help with driving, map reading, and even understanding architectural diagrams.",
        "Build a daily routine: play one 5×5 puzzle in the morning and one 7×7 puzzle before bed. Track your best score and aim to lower your move count by one every three days. Consistent micro-practice beats marathon sessions, and you will notice measurable improvement within weeks.",
      ],
    },
  ],
};
