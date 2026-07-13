import type { GameContent } from "../../../shared/types";

export const content: GameContent = {
  guide: [
    {
      heading: "Goal",
      body: "Draw non-intersecting colored lines that connect matching colored nodes. Every line must start and end on dots of the same color. The puzzle is complete only when every dot has a partner and no two lines cross.",
    },
    {
      heading: "How to play",
      body: "Click and hold on a colored node, then drag toward another node of the same color to build a path. Release to confirm the route. If your new path crosses an existing line of any color, it is rejected and you must redraw.",
    },
    {
      heading: "Strategy",
      body: "Start with the easiest pairs that have only one obvious route. As more lines appear, the available corridors shrink, so plan later connections mentally before you place them. Sometimes it helps to route a color around the outside of the board first.",
    },
    {
      heading: "Completion",
      body: "When every colored node is paired with a clean, non-crossing path, the puzzle finishes automatically. A completion screen shows your move count and a star rating based on efficiency.",
    },
  ],
  instructions: {
    objective:
      "Connect all matching colored nodes with straight-line paths that never intersect.",
    desktop:
      "Drag from one colored node to another of the same color. Release to place. Click an existing line to remove it. Right-click cancels the current drag.",
    mobile:
      "Touch a node and drag to its matching partner. Lift to confirm. Tap a line to delete it. The board is large enough for accurate touch targeting.",
    winning:
      "You win when every node has an unbroken path to its match and no lines overlap. A star rating rewards direct, efficient routes.",
    losing:
      "There is no lose state. Invalid paths are rejected, so you can explore freely without penalty. Only move count matters.",
    tips: [
      "Solve the longest connections first; they define the board layout.",
      "Keep the center flexible until all edge pairs are placed.",
      "Remove lines that create dead ends and try alternative routes.",
      "Use symmetry when you spot it; symmetric placement saves moves.",
      "Plan two moves ahead to avoid cornering later colors.",
      "Take your time; there is no timer, so accuracy beats speed.",
    ],
  },
  faqs: [
    {
      q: "How do you play Colored Lines?",
      a: "Drag from one colored dot to another matching dot to create a path. Lines cannot cross or overlap. Complete all pairs to solve the puzzle.",
    },
    {
      q: "Can lines go diagonally?",
      a: "Yes. Lines can move diagonally across empty cells as long as they stay on the board and avoid overlapping other colors.",
    },
    {
      q: "What happens if paths cross?",
      a: "Crossed paths are rejected and the newer line retracts. The game ensures the final board always has clean, non-intersecting corridors.",
    },
    {
      q: "Is there a timer?",
      a: "No. Colored Lines is untimed and designed for relaxed, thoughtful play. Only your move count is tracked.",
    },
    {
      q: "Can I undo a line?",
      a: "Yes. Click or tap any placed line segment to remove it and try another route.",
    },
    {
      q: "What does the star rating mean?",
      a: "Three stars indicate the most efficient routing. Two stars means you used extra segments. One star means the puzzle is solved but not optimally.",
    },
    {
      q: "Does the game have sound?",
      a: "Yes. Gentle click and success chimes play during placement. Sound can be toggled from the control bar.",
    },
    {
      q: "Can I play on mobile?",
      a: "Yes. The touch interface works on all screen sizes. Drag paths with your finger and tap lines to remove them.",
    },
    {
      q: "Are puzzles randomly generated?",
      a: "Yes. Each new board randomly places nodes and obstacles, ensuring virtually unlimited unique puzzles. Difficulty scales with grid size.",
    },
    {
      q: "What is the best strategy?",
      a: "Connect the longest pairs first, keep the center open, and plan routes before dragging. Practice corner cases to recognize common dead ends.",
    },
    {
      q: "Is Colored Lines suitable for kids?",
      a: "Yes. The drag mechanic is intuitive, wrong moves are never penalized beyond move count, and there is no timer. It teaches planning and spatial reasoning.",
    },
    {
      q: "Can the game run offline?",
      a: "Yes. After the initial page load, puzzles are generated locally without needing an internet connection.",
    },
    {
      q: "What is the maximum grid size?",
      a: "The grid expands from 4x4 in early rounds up to 10x10 in advanced modes. More nodes and colors increase the challenge.",
    },
    {
      q: "Is Colored Lines free?",
      a: "Yes. It is completely free, with no downloads, no accounts, and no in-app purchases.",
    },
    {
      q: "What games are similar?",
      a: "Fans enjoy Flow Free, Number Link, and other path-connection puzzles. The core loop of connecting pairs without crossing lines is a timeless genre.",
    },
  ],
  blog: [
    {
      title: "Mastering Colored Lines Strategy",
      excerpt:
        "Advanced planning techniques to solve puzzles faster and earn three stars.",
      headings: [
        "Edge-First Approach",
        "Corridor Management",
        "Symmetry and Efficient Paths",
        "Avoiding Dead Ends",
        "Practice Routine",
      ],
      body: [
        "Edges give you the most predictable routes. If a color node sits on the border, it can almost always connect in a straight line or a shallow diagonal. Solve those first to reduce visual clutter and free up interior corridors.",
        "Treat the board as a network of corridors. Each path you place subtracts from the total space available. Manage the network by leaving wide lanes for future colors rather than squeezing lines together.",
        "When you notice a pair of colors mirroring each other, use that symmetry to your advantage. Symmetric placements often use the same turning pattern, cutting down your move count significantly.",
        "Dead ends happen when an early path blocks off a necessary route. If you see a color trapped in a corner or sandwiched between lines, remove the conflicting line immediately and reroute.",
        "Play three to five puzzles daily to build intuition. Over time you will spot efficient routes instantly, reducing your average move count and making three-star runs routine.",
      ],
    },
    {
      title: "Why Flow Puzzles Train Your Brain",
      excerpt:
        "Connection games improve spatial IQ, planning, and focus.",
      headings: [
        "Spatial IQ",
        "Working Memory",
        "Focus Under Uncertainty",
        "Creative Problem Solving",
        "Mental Refresh",
      ],
      body: [
        "Flow puzzles require you to project routes into empty space and adjust when obstacles appear. That mental rotation is a direct workout for spatial IQ, a skill tied to performance in STEM fields and everyday navigation.",
        "Every path you plan is held in working memory while you consider alternatives. Repeatedly manipulating these short-term spatial traces strengthens your brain's temporary storage systems.",
        "Unlike timed tests, flow puzzles let you sit with uncertainty. You can stare at the board, try a hypothesis, and retreat if it fails. That comfort with ambiguity is valuable in creative and professional problem solving.",
        "There is no single right way to route every color. Good players develop multiple strategies and switch between them depending on the board shape. That flexibility is the core of creative problem solving.",
        "A ten-minute flow puzzle session clears mental clutter and resets attention. It is an ideal break between focused tasks because it is engaging without being exhausting.",
      ],
    },
    {
      title: "From Beginner to Expert in Colored Lines",
      excerpt:
        "A step-by-step progression guide for players new to the genre.",
      headings: [
        "Level One: Learn the Rules",
        "Level Two: Develop Patterns",
        "Level Three: Optimize",
        "Level Four: Advanced Tricks",
        "Level Five: Consistency",
      ],
      body: [
        "Start on 4x4 grids with four colors. Get comfortable with the drag mechanic and learn which pairs are naturally easiest. Focus on finishing puzzles correctly rather than quickly.",
        "Move to 6x6 grids and pay attention to how early placements affect later colors. Start keeping track of your move count and try to lower it without using hints.",
        "On 8x8 boards, plan before you drag. Visualize two or three routes and choose the one that leaves the most flexible center. Begin aiming for three stars by removing unnecessary turns.",
        "Advanced players use gap routing. Instead of hugging walls, they leave single-cell gaps between lines so later colors can slip through. This technique turns tight boards into solvable ones.",
        "The final stage is consistency. Play daily, track your best move count, and replay old puzzles to beat your score. Elite players solve large boards in fewer moves than beginners use on small ones.",
      ],
    },
  ],
};
