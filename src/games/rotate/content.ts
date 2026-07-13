import type { GameContent } from "../../../shared/types";

export const content: GameContent = {
  guide: [
    {
      heading: "Goal",
      body: "Rotate groups of connected tiles until every pipe in the network carries water from the source on the left to the destination on the right. All paths must be complete and unbroken for the level to clear.",
    },
    {
      heading: "How to play",
      body: "Each level shows a grid of square tiles, each containing a section of pipe. Click any tile to rotate it ninety degrees clockwise. Some tiles have pipes that connect top to bottom, left to right, or form corners. Arrange them so that a continuous channel runs from the source to the destination.",
    },
    {
      heading: "Rules",
      body: "Tiles can only be rotated, never moved or replaced. Every tile must have at least one connection to its neighbor; isolated pipes with no open end do not count as part of a valid solution. Once all paths are connected from source to destination, the level clears automatically.",
    },
    {
      heading: "Example",
      body: "A 3 by 3 grid has a source on the left middle and a destination on the right middle. The center tile is a corner pipe. By rotating the top-center tile to face down and the bottom-center tile to face up, you link the source to the destination through the center corner. The level then clears.",
    },
  ],
  instructions: {
    objective:
      "Rotate tiles to connect the water source to the destination with an unbroken path through the entire network.",
    desktop:
      "Click any tile to rotate it clockwise by ninety degrees. Right-click a tile to rotate it counter-clockwise. The source and destination are always visible at fixed positions. Watch the flowing water animation to confirm your path is complete.",
    mobile:
      "Tap any tile to rotate it clockwise. Double-tap a tile to rotate it counter-clockwise. The board is touch-optimized with large tap targets. Swipe or pinch does nothing; simple taps are all you need.",
    winning:
      "You win when a continuous pipe path connects the source to the destination and all required intermediate tiles are linked. The level advances automatically and your move count is saved as a best score.",
    losing:
      "There is no lose state. You can rotate tiles indefinitely until you find a solution. The only penalty is a higher move count, which affects your personal best score.",
    tips: [
      "Start from the source and work outward, making sure each tile you rotate has an open connection to the growing path.",
      "Work backwards from the destination when the forward path is blocked.",
      "Count the number of turns in a straight line to avoid creating dead ends.",
      "Use the counter-clockwise rotate if a tile is one turn away from the correct orientation.",
      "Pipes that connect opposite sides are easiest to place early.",
      "Do not rotate tiles that are already correct; extra spins only inflate your move count.",
    ],
  },
  faqs: [
    {
      q: "How do you play Rotate?",
      a: "Click or tap tiles to rotate them until the pipes form an unbroken path from the source on the left to the destination on the right. The level clears automatically when every connection is complete.",
    },
    {
      q: "What are the rules of Rotate?",
      a: "Tiles can only be rotated, never moved. Every tile in the network must connect properly to its neighbors. The source and destination are fixed. You win when a continuous water channel connects them. There is no timer or fail state.",
    },
    {
      q: "Is there a timer in Rotate?",
      a: "No. Rotate has no countdown and no time pressure. You can take as long as you need to think about each rotation. The only tracked metric is the number of moves you used to solve the puzzle.",
    },
    {
      q: "Can I undo a rotation?",
      a: "Yes. Clicking or tapping a tile rotates it again in the same direction, so you can always undo by rotating further. For quick counter-clockwise correction, use right-click on desktop or double-tap on mobile.",
    },
    {
      q: "What is the best strategy for Rotate?",
      a: "Work outward from the source and the destination simultaneously. Once a tile is correctly aligned, leave it alone to avoid wasting moves. Look for straight-through tiles and corners early, because they anchor the path.",
    },
    {
      q: "Does Rotate get harder over time?",
      a: "Yes. Early levels use small grids with simple straight and corner pipes. Later levels introduce larger grids, T-junctions, and cross tiles that require more careful planning. The difficulty curve is gradual and fair.",
    },
    {
      q: "What is a good score in Rotate?",
      a: "A good score is any solution that uses fewer moves than your previous best. The game saves your best move count per level and shows it at the start of each round. Lower move counts mean a more efficient solution.",
    },
    {
      q: "Can I play Rotate on mobile?",
      a: "Yes. The board is fully responsive and every tile is a large touch target. Tap to rotate clockwise, double-tap to rotate counter-clockwise. The layout adapts to phones, tablets, and desktop screens.",
    },
    {
      q: "Why do some tiles have multiple pipe connections?",
      a: "T-junctions and cross tiles increase the puzzle complexity. They allow multiple paths through the network and require you to decide which route leads to the destination. Learning to read these tiles quickly is key to faster solves.",
    },
    {
      q: "What happens if I make a dead end?",
      a: "Dead ends are not failures; they are part of the puzzle. If a path leads nowhere, simply rotate additional tiles until the network opens up again. There is no penalty except a higher move count.",
    },
    {
      q: "Is Rotate free to play?",
      a: "Yes. Rotate runs entirely in the browser with no download, no account, and no cost. Open the page and start rotating tiles immediately. Your progress and best scores are saved locally.",
    },
    {
      q: "How can I improve my Rotate time?",
      a: "Practice recognizing common pipe patterns and memorize which rotations are needed for each tile type. Start each level by identifying straight tiles and corners that are already close to their correct orientation, then fill in the connecting pieces.",
    },
    {
      q: "Does Rotate have different difficulty modes?",
      a: "The game uses a single progressive difficulty curve. Early levels are simple and tutorial-like, while later levels introduce more tiles, larger grids, and more complex pipe types. There is no separate easy or hard mode.",
    },
    {
      q: "What is the maximum grid size in Rotate?",
      a: "The largest grids reach five by five tiles. These late-game puzzles require careful planning across multiple paths and are satisfying to solve in under thirty moves.",
    },
    {
      q: "Are the puzzles randomly generated?",
      a: "Yes. Each new game generates a fresh set of levels with randomized but solvable pipe layouts. Because the puzzles are generated algorithmically, no two play sessions are identical.",
    },
    {
      q: "Can I skip a level if I get stuck?",
      a: "No. Rotate does not include a skip button, because every puzzle is solvable with patience. If you are stuck, try working backward from the destination or take a short break and return with fresh eyes.",
    },
  ],
  blog: [
    {
      title: "Mastering Pipe Rotation Puzzles",
      excerpt:
        "Learn systematic solving methods, visual shortcuts, and move-saving techniques for Rotate.",
      headings: [
        "The Source-Out Method",
        "Reading Tiles at a Glance",
        "Avoiding Rotational Waste",
        "Backward Solving",
        "Building Speed Gradually",
      ],
      body: [
        "The most reliable method for Rotate is the source-out technique. Start by identifying the source tile and rotate any neighbor until it connects. Then expand outward tile by tile, always maintaining a live connection to the source. This guarantees that every rotation you make is part of the eventual solution.",
        "Experienced players learn to read tile types instantly. A straight pipe needs zero or two rotations, a corner needs one or three, a T-junction needs two or four, and a cross needs zero or two. Recognizing these patterns reduces the mental load and lets you focus on placement rather than counting rotations.",
        "Every unnecessary rotation inflates your move count. Before clicking, ask whether the tile is already in its correct orientation. If it is, leave it. If it is one step away, click it once or use counter-clockwise rotation for a precise fix. Discipline here is what separates efficient solvers from casual ones.",
        "When the forward path is blocked, switch to backward solving. Identify the destination tile, rotate its neighbors until they connect to it, and work back toward the source. Meeting in the middle often reveals the correct configuration faster than pushing forward in one direction.",
        "Speed comes naturally after pattern recognition. Do not rush early levels; instead, build accurate instincts by solving puzzles carefully. After a dozen levels, you will find yourself recognizing solutions in seconds rather than minutes. Consistent practice beats brute-force clicking every time.",
      ],
    },
    {
      title: "Why Pipe Puzzles Are Great for Your Brain",
      excerpt:
        "Discover the cognitive benefits of rotation puzzles and why they are a favorite among educators and neuroscientists.",
      headings: [
        "Spatial Reasoning",
        "Sequential Planning",
        "Attention to Detail",
        "Problem-Solving Confidence",
        "A Low-Stress Workout",
      ],
      body: [
        "Pipe rotation puzzles train spatial reasoning, the ability to mentally rotate and manipulate objects in space. When you rotate a tile and visualize how its pipes connect to the neighbors, you are exercising the same brain region used for reading maps, assembling furniture, and navigating real environments.",
        "Solving a level requires sequential planning: you must decide which tile to rotate next and anticipate how that change affects the rest of the network. This forward-thinking habit strengthens executive function, the set of mental skills responsible for planning, prioritizing, and completing multi-step tasks.",
        "Attention to detail is critical. A single tile placed one rotation away from correct can block an entire path. Training yourself to catch small errors before they cascade builds mindfulness and precision that transfer to work, study, and everyday life.",
        "Each cleared level provides a small but genuine sense of accomplishment. Repeated success builds problem-solving confidence, which reduces anxiety when facing complex tasks. The gentle difficulty curve ensures that every player experiences enough wins to stay motivated.",
        "Unlike timed arcade games, Rotate is a low-stress puzzle that you can pause or abandon without penalty. It is an ideal mental break during a workday or study session because it engages the mind without draining emotional energy. Many players find it helps them reset and refocus.",
      ],
    },
    {
      title: "From Maze to Pipe: A Brief History of Connection Puzzles",
      excerpt:
        "Trace the lineage of Rotate from ancient mazes and plumbing simulations to modern browser games.",
      headings: [
        "Ancient Maze Traditions",
        "Plumbing Simulations in the 1980s",
        "The Rise of Connection Games",
        "Browser-Native Pipes",
        "Why the Genre Endures",
      ],
      body: [
        "The urge to solve mazes is ancient. Maze-like patterns have been found in Greek pottery, Roman floors, and Celtic knotwork, all reflecting a deep human fascination with finding a single path through complexity. Pipe rotation puzzles are a direct descendant of that tradition, replacing walls with pipes and walls with water flow.",
        "In the 1980s, games like Pipe Mania introduced the idea of connecting pipes under time pressure. Players laid pipe segments on a grid and watched liquid flow, aiming to create a path long enough to avoid a spill. The genre proved popular because it combined spatial reasoning with a clear visual goal.",
        "The connection-puzzle genre expanded across platforms in the 1990s and 2000s, appearing in handheld consoles, PC puzzle collections, and eventually smartphones. Developers experimented with electricity, train tracks, and sewer systems, but the core mechanic remained the same: connect point A to point B with limited, rotatable pieces.",
        "Rotate strips the genre down to its essence. There is no liquid simulation, no timer, and no decorative theme. Only tiles, pipes, source, and destination matter. This minimalism makes it fast to load, easy to learn, and satisfying to master in short sessions.",
        "Connection puzzles endure because they offer a perfect balance of simplicity and depth. The rules are explainable in one sentence, yet solutions require genuine thought. That combination makes Rotate accessible to children and challenging to adults, which is rare and valuable in game design.",
      ],
    },
  ],
};
