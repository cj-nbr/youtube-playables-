import type { GameContent } from "../../../shared/types";

export const content: GameContent = {
  guide: [
    {
      heading: "Goal",
      body: "Touch and drag the colored connector blocks to build paths between matching colored endpoints. Every path must connect two squares of the same color without crossing another path or overlapping any existing line. When all endpoints are paired, the puzzle is solved.",
    },
    {
      heading: "How to play",
      body: "Click and drag from one colored square toward another square of the same color. The path follows your finger or cursor and bends around obstacles. Release to lock the path in place. If the path crosses itself or another color, it turns red and snaps back so you can try again.",
    },
    {
      heading: "Strategy",
      body: "Start with colors that have only one clear route. Work from the edges inward, because border squares are the easiest to connect with straight or shallow curves. Avoid filling the center too early; blocked middle cells often force detours that break other colors.",
    },
    {
      heading: "Example",
      body: "A red endpoint at the top-left corner and another at the bottom-right can often be linked with a single diagonal sweep if the middle is empty. If a blue path already runs horizontally through row three, the red path must bend around it below or above, costing extra segments. Plan long connections first to keep small gaps for tighter colors.",
    },
  ],
  instructions: {
    objective:
      "Connect every pair of matching colored squares with non-intersecting paths.",
    desktop:
      "Click a colored square and drag toward a matching square. Release to confirm. Right-click or press Escape to cancel an in-progress path. Click a placed path to remove it and retry.",
    mobile:
      "Touch a colored square and drag toward its matching partner. The path preview follows your finger; lift to place. Tap an existing path to delete it. Swipe quickly near endpoints for shorter selections.",
    winning:
      "You win the moment every colored endpoint has an unbroken connection to its partner and no two paths cross. The game checks this after each placement and celebrates with a win overlay and your move count.",
    losing:
      "There is no lose state. The board rejects invalid paths automatically, so you can never make a permanent mistake. The only metric is how few placements you used to solve the puzzle.",
    tips: [
      "Solve long-range pairs first, especially colors on opposite edges.",
      "Keep the center open until the end; it is your most valuable flexible space.",
      "Watch for dead ends created by early paths and reroute before locking.",
      "Use the undo or tap-to-remove feature rather than guessing blindly.",
      "Colors with fewer free tiles around them are usually the easiest to place.",
      "Practice one puzzle type at a time to recognize common turning patterns.",
    ],
  },
  faqs: [
    {
      q: "How do you play Dragger?",
      a: "Drag from one colored square to another matching square. The path must not cross itself or another color. Complete all pairs to solve the puzzle. Invalid paths are rejected automatically.",
    },
    {
      q: "What happens if two paths cross?",
      a: "Crossed paths are not allowed. The game highlights the conflict and the newer path retracts so you can redraw it. This ensures the final board stays clean and solvable.",
    },
    {
      q: "Can I undo a placed path?",
      a: "Yes. Click or tap any placed path segment to remove it, then redraw the connection. On desktop you can also press Escape while dragging to cancel before releasing.",
    },
    {
      q: "Does Dragger have a timer?",
      a: "No. Dragger is a calm, untimed puzzle. You can take as long as you need to plan each connection. The only tracked stat is your placement count.",
    },
    {
      q: "What is the best strategy for Dragger?",
      a: "Connect the longest distances first, especially colors anchored to opposite edges. Leave flexible space in the middle for later tight turns. Plan routes mentally before dragging to reduce trial and error.",
    },
    {
      q: "Are the puzzles randomly generated?",
      a: "Yes. Every new game shuffles the endpoint positions and obstacle layout, so no two puzzles are exactly alike. Difficulty scales gradually as you solve more puzzles.",
    },
    {
      q: "Can Dragger paths go diagonally?",
      a: "Paths move in orthogonal and diagonal directions depending on the grid, but they must stay on the playable tiles. Sharp turns are allowed at any tile boundary.",
    },
    {
      q: "Why does my path sometimes snap back?",
      a: "The path snaps back when it intersects another path, crosses outside the grid, or tries to reuse an occupied endpoint. These rules keep the puzzle fair and solvable.",
    },
    {
      q: "Is Dragger suitable for kids?",
      a: "Yes. The drag mechanic is intuitive, there is no timer, and wrong moves are never punished. It teaches planning, spatial reasoning, and patience.",
    },
    {
      q: "What devices work best for Dragger?",
      a: "Any device with a touchscreen or mouse works well. Large screens make it easier to see long routes, while phones turn every commute into a quick puzzle session.",
    },
    {
      q: "How many colors are on the board?",
      a: "The number of color pairs increases with difficulty. Early puzzles use four pairs, while advanced layouts feature eight or more on larger boards.",
    },
    {
      q: "Can I play Dragger offline?",
      a: "Yes. Once the page loads, the game runs entirely in your browser using local assets and generated puzzles. No internet connection is required afterward.",
    },
    {
      q: "Is Dragger free to play?",
      a: "Yes. Dragger is completely free, with no downloads, no accounts, and no in-app purchases. Open the page and start dragging.",
    },
    {
      q: "What makes Dragger different from other flow games?",
      a: "Dragger emphasizes smooth dragging with instant path preview, dynamic obstacle generation, and a calm no-timer experience. It is designed for longer, thoughtful sessions rather than speed runs.",
    },
    {
      q: "What games are similar to Dragger?",
      a: "Fans of Dragger often enjoy Flow Free, Number Link, and other path-connection puzzles. Any game that rewards careful route planning and spatial thinking is a good match.",
    },
  ],
  blog: [
    {
      title: "How to Solve Dragger Puzzles Faster",
      excerpt:
        "Practical techniques to cut down on trial and error and finish connection puzzles in fewer moves.",
      headings: [
        "Start From the Edges",
        "Reserve the Center",
        "Plan Before You Drag",
        "Use Undo Liberally",
        "Practice Corner Cases",
      ],
      body: [
        "Edge squares are the easiest to connect because they have fewer neighbors and usually allow straight or short diagonal runs. Identify colors that start or end on the border first, then lock those paths before anyone else needs the same space.",
        "The center of the board is the most contested area. If you fill it carelessly, you block long-range connections that need to pass through. Keep at least one wide corridor open in the middle until all border and edge pairs are solved.",
        "Before dragging, trace the intended route with your eyes. Visualize where the line will turn and whether it will cross another color. A five-second mental preview often saves twenty seconds of dragging and undoing.",
        "Undo is your best friend in Dragger. If a path looks awkward, remove it immediately and try another angle. The game never penalizes undo, so use it as often as needed to maintain a clean board.",
        "Corner squares are common stumbling blocks. A color trapped in a corner has limited exits, so solve those pairs early. If you leave them for last, a single misplaced path can make the corner unreachable.",
      ],
    },
    {
      title: "The Psychology Behind Path Puzzles",
      excerpt:
        "Why connection games like Dragger are so satisfying and how they train spatial reasoning.",
      headings: [
        "Spatial Reasoning",
        "Planning and Foresight",
        "Flow State",
        "Progressive Difficulty",
        "Transfer to Real Life",
      ],
      body: [
        "Path puzzles directly exercise spatial reasoning, the ability to visualize and manipulate objects in your mind. Connecting colored squares while avoiding obstacles is essentially a miniature version of route planning, a skill used in navigation, architecture, and engineering.",
        "Every Dragger move requires a small amount of foresight. You must predict how one path will affect the space available for others. That predictive thinking strengthens the prefrontal cortex, the brain region responsible for planning and decision-making.",
        "Because Dragger has no timer, it is easy to enter a flow state, where focus sharpens and time seems to slow. Flow is one of the most rewarding mental states, and puzzle games are one of the quickest ways to reach it on a busy day.",
        "Good puzzle games scale difficulty smoothly. Dragger starts with small boards and few colors, then gradually adds obstacles and additional pairs. That progression keeps the game challenging without becoming overwhelming.",
        "Spatial skills from games like Dragger transfer to real-world tasks such as reading maps, packing boxes efficiently, and visualizing furniture layouts. The more you practice routing in games, the more natural spatial planning becomes offline.",
      ],
    },
    {
      title: "5 Tips to Improve Your Dragger Score",
      excerpt:
        "From beginner to advanced, these habits will help you solve puzzles faster and more cleanly.",
      headings: [
        "Use Symmetry",
        "Group by Difficulty",
        "Limit Path Length",
        "Watch the Preview",
        "Stay Flexible",
      ],
      body: [
        "Many Dragger boards are built with hidden symmetry. If you notice a color pair mirrors another pair across the center, use that symmetry to guide your route. Symmetrical placements are often the most efficient.",
        "Some colors are inherently easier to place because of their shape or endpoint distance. Solve those first to clear mental space and simplify the remaining puzzle.",
        "Shorter paths leave more room for everyone else. Whenever two routes are possible, choose the one with fewer segments unless the longer path unlocks a critical area.",
        "The live path preview shows exactly where the line will land. Watch it closely as you drag; a small adjustment early prevents a big detour later.",
        "If you get stuck, step back and reassess rather than forcing a path. Sometimes removing an early placement opens a completely new solution for the whole board.",
      ],
    },
  ],
};
