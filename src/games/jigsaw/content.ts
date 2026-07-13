import type { GameContent } from "../../../shared/types";

export const content: GameContent = {
  guide: [
    {
      heading: "Goal",
      body: "Reassemble a scrambled image by sliding numbered or blank tiles into the single empty space. Arrange the pieces in the correct order so the original picture is fully restored.",
    },
    {
      heading: "How to play",
      body: "Click or tap any tile adjacent to the empty space to slide it into that space. The empty space moves opposite the direction you click. Continue sliding tiles until every piece sits in its target position and the image is complete.",
    },
    {
      heading: "Strategy",
      body: "Solve the puzzle row by row, starting with the top-left corner. Place the first row and first column in their final positions, then focus on the remaining 2x2 or 3x3 subgrid. Avoid breaking completed rows once they are in place.",
    },
    {
      heading: "Example",
      body: "If the empty space is at the bottom-right and you click the tile above it, that tile slides down and the empty space moves up. If you then click the tile to the left of the empty space, it slides right. Each click shifts exactly one tile.",
    },
  ],
  instructions: {
    objective:
      "Slide all tiles into their correct positions to restore the original image. Fewer moves and a faster time earn a higher score.",
    desktop:
      "Click any tile that borders the empty space to move it. You may also use arrow keys if focus is on the board. The game counts both moves and elapsed time, displaying them in real time at the top of the board.",
    mobile:
      "Tap tiles adjacent to the empty space to slide them. The board fits your screen and the image scales automatically. A short vibration or animation confirms each slide so you feel the response immediately.",
    winning:
      "Win when all tiles are in their correct positions and the complete image is visible. Your final time and move count are saved as a best score if they beat your previous record.",
    losing:
      "Not applicable. Jigsaw puzzles have no time limit and no losing condition. You can restart at any time if the scramble feels too messy, but every solvable state can be finished with patience.",
    tips: [
      "Solve the top row first, placing each tile in its final position without disturbing it again.",
      "Then solve the left column, again locking tiles in place as you go.",
      "Use the finished rows and columns as anchors for the center subgrid.",
      "Focus on one tile at a time rather than trying to remember the whole image.",
      "Look at the reference image in the corner if you forget where a piece belongs.",
      "Keep the empty space near the area you are currently working on to reduce travel distance.",
      "If you make a mistake, do not panic — just slide the displaced tiles back into position.",
    ],
  },
  faqs: [
    {
      q: "How do I solve the 15-puzzle?",
      a: "The standard approach is row-by-row solving. Place the top row tiles in order, then the left column, then work inward. For the final 2x2 or 3x3 section, use known algorithms or simply rotate the remaining tiles until they click into place.",
    },
    {
      q: "Is the empty space really necessary?",
      a: "Yes. The empty space is the only mechanic that makes a sliding puzzle solvable. Without it, there would be no way to shift tiles. The position of the empty space also determines how many moves are needed for a given shuffle.",
    },
    {
      q: "Why can't I slide a tile that is not next to the empty space?",
      a: "Sliding puzzles are defined by the adjacency rule. Only tiles touching the empty space can move. This constraint creates the puzzle structure. Allowing any tile to jump would eliminate the challenge entirely.",
    },
    {
      q: "Are all jigsaw puzzles solvable?",
      a: "Not every random shuffle is solvable. About half of all shuffles produce unsolvable states depending on the grid size. If you suspect your puzzle is stuck, look for a simple inversion count or use the restart button to generate a guaranteed solvable scramble.",
    },
    {
      q: "What is the best grid size?",
      a: "Beginners enjoy 3x3 or 4x4 grids, which are solvable in a few minutes. Advanced players challenge themselves with 5x5 or 6x6 grids. This version uses a 4x4 grid as the default, with the option to increase difficulty.",
    },
    {
      q: "Can the game show me the solution?",
      a: "No auto-solve feature is included. The satisfaction comes from figuring it out yourself. However, you can restart at any time if you become hopelessly scrambled.",
    },
    {
      q: "Is there a timer?",
      a: "Yes. The timer runs from the moment you make your first move. Faster times earn better scores, but there is no penalty for thinking before you start sliding.",
    },
    {
      q: "What does the reference image do?",
      a: "The reference image shows the original picture so you can see where each tile belongs. It is visible in a corner of the board throughout the game and can be toggled on or off depending on your preference.",
    },
    {
      q: "Can I use arrow keys to play?",
      a: "Yes. When the game board has focus, arrow keys move the empty space in the corresponding direction. This keyboard control is useful for precise control on large grids.",
    },
    {
      q: "How is the best score calculated?",
      a: "The best score favors fewer moves and faster times. The game stores your best completion in local browser storage so you can track improvement across sessions.",
    },
    {
      q: "What image is used in the puzzle?",
      a: "This version uses a procedurally generated colorful pattern that scales cleanly at any tile size. Future versions may add photographic options, but the geometric pattern ensures every tile remains readable.",
    },
    {
      q: "Is this the same as the 15-puzzle game?",
      a: "Yes, conceptually. The classic 15-puzzle uses a 4x4 grid with 15 numbered tiles and one empty space. This version replaces numbers with image pieces so the goal is to restore a picture rather than arrange digits.",
    },
    {
      q: "Can children play this?",
      a: "Absolutely. Sliding puzzles are excellent for spatial reasoning, planning, and fine motor skills. The colorful image and simple tap controls make it accessible to children as young as four with mild guidance.",
    },
    {
      q: "Does the image change between games?",
      a: "The current version uses one carefully designed geometric pattern that tiles clearly at any resolution. Future updates may unlock multiple images as rewards for faster times.",
    },
    {
      q: "Why does the board feel hard to solve randomly?",
      a: "Random shuffles of a sliding puzzle often produce unsolvable states because not every permutation is reachable through legal sliding moves. The game automatically generates solvable scramble states so you never waste time on impossible boards.",
    },
  ],
  blog: [
    {
      title: "Sliding Puzzle Tips and Tricks",
      excerpt:
        "From 3x3 to 6x6, learn the systematic approach to solving any sliding tile puzzle fast.",
      headings: [
        "The Anchor Row Method",
        "Column Anchoring",
        "The 2x2 Endgame",
        "Efficiency Over Speed",
        "Practice Makes Perfect",
      ],
      body: [
        "The anchor row method is the backbone of every reliable sliding puzzle solution. Solve the top row completely first, moving each tile into its final position and then never touching it again. The row becomes a fixed anchor that simplifies the rest of the board.",
        "Next, solve the leftmost column in the same way. Place each tile in its vertical target and leave it alone. By the time you have the top row and left column locked, the difficult center puzzle shrinks to a smaller subgrid that is much easier to manage.",
        "The 2x2 endgame is easier than it looks. With two rows and two columns remaining, simply rotate the three tiles into place using the empty space. There are only a handful of recognizable configurations, and practice makes each one automatic.",
        "New players obsess over speed while ignoring efficiency. A 4x4 puzzle solved in 120 moves is decent, but the same puzzle solved in 60 moves is excellent. Move with intention, avoid unnecessary back-and-forth, and trust your memory of the reference image.",
        "Practice different grid sizes to internalize the row and column patterns. A 3x3 grid teaches the 2x2 endgame. A 5x5 grid teaches how to maintain anchors while the interior grows. Cross-size practice builds instincts that make every puzzle feel easier over time.",
      ],
    },
    {
      title: "The Science of Sliding Puzzles",
      excerpt:
        "How group theory explains why some sliding puzzles are solvable and others are not.",
      headings: [
        "Inversions and Parity",
        "The Blank Row Factor",
        "Group Theory Insights",
        "Computational Checking",
        "Why It Matters",
      ],
      body: [
        "Sliding puzzle solvability is governed by inversions and row parity. An inversion is any pair of tiles where a higher-numbered tile appears before a lower-numbered tile when reading the board in row-major order. For a puzzle with the empty space on an even row from the bottom, an even number of inversions means the puzzle is solvable.",
        "If the empty space is on an odd row from the bottom, the rule flips: an odd number of inversions is required for solvability. These parity rules come directly from the alternating group of permutations and explain exactly why half of all random shuffles are impossible.",
        "Group theory classifies sliding puzzles as instances of the alternating group. Every legal sequence of moves is an even permutation, which is why unreachable states always have the wrong parity. This elegant mathematical explanation has been known since the 1870s.",
        "Modern code can check solvability in milliseconds by counting inversions and computing the blank row. The current implementation auto-generates solvable scramble states so players never encounter impossible boards, but the underlying math remains the same.",
        "Understanding solvability makes sliding puzzles more interesting because it turns a guessing game into a logical system. Instead of wondering why a board feels dead, you can diagnose parity issues and appreciate the mathematical beauty hiding inside a simple tile slide.",
      ],
    },
    {
      title: "From Sam Loyd to Smartphone",
      excerpt:
        "The surprising history of the world's most famous sliding puzzle.",
      headings: [
        "Sam Loyd's Hoax",
        "The Real Origins",
        "Digital Renaissance",
        "Cognitive Benefits",
        "Modern Variations",
      ],
      body: [
        "Sam Loyd popularized the 15-puzzle in 1880 by offering a thousand-dollar prize for solving it with the 14 and 15 tiles swapped. It was a hoax — Loyd knew that configuration was mathematically impossible. Yet the publicity made the puzzle an international sensation.",
        "The puzzle itself predates Loyd. A simpler 4x4 design appeared in patent form decades earlier, and similar sliding mechanisms existed in ancient Chinese games. Loyd's genius was marketing, not invention: he sold millions of puzzle versions and turned a simple logic toy into a cultural phenomenon.",
        "Digital screens revived sliding puzzles in the 1990s and 2000s. The ease of click-to-slide replaced the physical jostling of tiles, and image-based variants replaced numbers with photos. Smartphones made the form ultra-portable, and casual app stores flooded with variations of the classic design.",
        "Sliding puzzles train working memory, spatial rotation, and planning. Research shows they improve mental rotation skills — the ability to visualize objects from different angles — which transfers to real-world tasks like reading maps and assembling furniture.",
        "Modern variations include circular paths, 3D polyhedra, gravity-based slides, and even multiplayer race modes. Despite all the innovation, the core mechanic — move one tile, reveal new options — remains unchanged because it is already perfect.",
      ],
    },
  ],
};
