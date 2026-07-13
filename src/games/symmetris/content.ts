import type { GameContent } from "../../../shared/types";

export const content: GameContent = {
  guide: [
    {
      heading: "Objective",
      body: "A shape is shown on the left half of the grid. Your job is to draw its mirror image on the right half so the whole figure is symmetric across the vertical center line. Fill every missing cell correctly and the figure is complete.",
    },
    {
      heading: "How to play",
      body: "The left side is fixed and shows the original pattern. Tap or click cells on the right side to fill them in. Each right-side cell should mirror the matching left-side cell — the one directly opposite it across the center axis. Fill a cell that has a partner on the left and it lights up green; fill one with no partner and it turns red.",
    },
    {
      heading: "Strategy",
      body: "Work row by row. For every filled cell on the left, find its opposite partner on the right and fill that one. Imagine folding the grid down the center line: whatever is on the left should print onto the right. Completing symmetry one row at a time prevents stray marks.",
    },
    {
      heading: "Example",
      body: "If the bottom-left cell on the left half is filled, its mirror is the bottom-right cell, so fill that. If the cell just left of center is filled, its partner is the cell just right of center. Mis-filling a cell with no left-side partner costs an error, so always check the opposite side first.",
    },
  ],
  instructions: {
    objective:
      "Complete symmetric figures by drawing the missing mirror half on the right side of the grid.",
    desktop:
      "Use your mouse to click cells on the right half of the grid. Each click fills or clears that cell. Fill the cells that mirror the left-side pattern. Correct cells turn green, incorrect ones turn red.",
    mobile:
      "Tap cells on the right half of the grid to fill or clear them. Tap the cells that mirror the left-side pattern. Filled-correct cells turn green; wrong cells turn red. The board is fully touch-friendly.",
    winning:
      "You win a figure the moment the right half exactly mirrors the left half across the center axis. Chains of figures raise your score, and completing them without hitting the error limit extends the run.",
    losing:
      "You lose if you make too many errors — that is, filling cells on the right that have no matching partner on the left. Watch the error counter and double-check the opposite side before filling.",
    tips: [
      "Always check the opposite cell on the left before filling the right.",
      "Work row by row to keep the symmetry organized.",
      "Imagine folding the grid down the center line.",
      "Clear a wrong (red) cell immediately to keep the picture clean.",
      "Correct green cells stay put, so build on them confidently.",
      "Start from the corners; they have the clearest partners.",
    ],
  },
  faqs: [
    {
      q: "How do you play Symmetris?",
      a: "A pattern appears on the left half of a grid. You recreate its mirror on the right half by tapping cells. When the right side exactly matches the left side across the center axis, the figure is complete and you score.",
    },
    {
      q: "What are the rules of Symmetris?",
      a: "Fill right-side cells so each mirrors its left-side partner across the vertical center line. Correct fills turn green; fills with no partner turn red and count as errors. Complete the figure to score, and avoid exceeding the error limit.",
    },
    {
      q: "What does symmetry mean here?",
      a: "Symmetry means the left and right halves are mirror images. The center line is the axis: the cell just left of it mirrors the cell just right of it, the far-left cell mirrors the far-right cell, and so on for every row.",
    },
    {
      q: "How is Symmetris scored?",
      a: "You score points for each figure you complete, and a longer streak of completed figures builds a bigger total. Your best streak is saved locally in your browser so you can try to beat it on the next run.",
    },
    {
      q: "What counts as an error?",
      a: "An error is filling a right-side cell that has no matching partner on the left side — that is, a cell that should stay empty in the mirror. Each wrong fill nudges the error counter up, and too many errors end the run.",
    },
    {
      q: "How many errors can I make?",
      a: "The error limit is shown during play. It is generous enough to forgive a couple of slips but tight enough that careless filling will end the run. Clearing a red cell does not add another error, so fix mistakes quickly.",
    },
    {
      q: "Is Symmetris timed?",
      a: "No, there is no countdown. The challenge is spatial reasoning and careful mirroring, not speed. You can take your time to study the left pattern and plan the right half.",
    },
    {
      q: "Can I play Symmetris on mobile?",
      a: "Yes. The grid is responsive and works with touch. Tap a right-side cell to fill or clear it. The controls are identical to desktop, just tap instead of click.",
    },
    {
      q: "Why are some cells red?",
      a: "Red cells are fills that break the symmetry — they have no partner on the left side. Treat red as a warning: either clear that cell or, if you think it belongs, recheck the opposite side of the grid.",
    },
    {
      q: "What is the best strategy for Symmetris?",
      a: "Scan each left-side filled cell, then fill its mirror on the right. Move row by row so you never skip a partner. Verifying the opposite side before each tap keeps your error count at zero.",
    },
    {
      q: "Is Symmetris good for kids?",
      a: "Very much so. It builds visual symmetry awareness and careful observation with no time pressure or violence. Kids learn the concept of mirror images while enjoying a calm puzzle.",
    },
    {
      q: "Does my best score save between sessions?",
      a: "Yes. Your best figure streak is stored locally in your browser, so it persists when you return. Clearing browser data or switching devices resets it, since the score lives on your device.",
    },
    {
      q: "Can I undo a fill?",
      a: "Yes. Clicking or tapping a filled cell again clears it. Clearing a correct green cell is free, and clearing a wrong red cell simply removes the error visually without adding a new one.",
    },
    {
      q: "How does the game get harder?",
      a: "As you complete figures, the patterns become denser and more intricate, with more cells to mirror and trickier shapes. The core rule never changes, so the difficulty grows smoothly.",
    },
    {
      q: "Is Symmetris free to play?",
      a: "Yes. It runs in your browser with no cost, no account, and no download. Open the page and start mirroring immediately. Your best streak stays private on your device.",
    },
    {
      q: "What skills does Symmetris improve?",
      a: "It strengthens visual-spatial reasoning, pattern recognition, and symmetry perception. Because it is low-stress, it also serves as a calming mental exercise between tasks.",
    },
  ],
  blog: [
    {
      title: "The Complete Symmetris Guide",
      excerpt:
        "Master mirror symmetry puzzles by learning to draw the missing half with confidence.",
      headings: [
        "What Is Symmetris",
        "Core Rules and Setup",
        "Reading the Mirror Axis",
        "Scoring and Streaks",
        "Getting Better Over Time",
      ],
      body: [
        "Symmetris is a calm spatial puzzle about mirror symmetry. A shape appears on the left half of a grid, and your task is to recreate its mirror image on the right half. When the two sides match across the center line, the figure is complete.",
        "Setup is minimal. The grid is split by a vertical axis down the middle. The left side shows the original pattern of filled cells; the right side begins empty. You fill right-side cells, and each one should mirror its opposite partner on the left.",
        "The mirror axis is the key idea. For any cell on the right, its partner is the cell on the left at the same row and the same distance from the center. Far-right mirrors far-left, and the cells flanking the axis mirror each other. Keeping this mental map makes filling intuitive.",
        "Scoring rewards streaks. Each completed figure adds to your total, and chaining figures without hitting the error limit grows your score and your saved best. A few careless red fills will end the run, so accuracy matters more than speed.",
        "Improvement comes from method. Verify the opposite side before each tap, work row by row, and clear mistakes the moment you spot them. Over a few run-throughs the mirror logic clicks and you start filling entire figures almost automatically.",
      ],
    },
    {
      title: "Beginner Strategies for Symmetris",
      excerpt:
        "Simple habits that help new players mirror shapes accurately and avoid errors.",
      headings: [
        "Check the Opposite Side First",
        "Work Row by Row",
        "Use the Green Confirmation",
        "Fix Red Cells Fast",
        "Build a Steady Rhythm",
      ],
      body: [
        "The single biggest beginner mistake is filling a right-side cell without checking its left partner. Make it a rule: before any tap, look at the opposite cell. If it is filled, fill the right one; if it is empty, leave the right one alone.",
        "Tackle the grid row by row rather than jumping around. A row-at-a-time approach guarantees you never skip a partner and makes it obvious when the two halves line up. It also makes red mistakes rare because your eye stays in one band.",
        "Trust the color feedback. A correct fill turns green immediately, confirming you read the mirror correctly. Use those green cells as anchors and build outward from them, which keeps your confidence high and your error count low.",
        "When a cell turns red, clear it right away. A lingering red cell is both a visual distraction and a reminder of a misread partner. Removing it costs nothing and keeps the picture clean for the next decision.",
        "A steady rhythm beats frantic tapping. Because there is no timer, slow down, verify, fill, confirm green, repeat. Players who build this calm cadence complete far more figures before the error limit catches them.",
      ],
    },
    {
      title: "Advanced Tactics and Common Mistakes in Symmetris",
      excerpt:
        "Sharpen your mirroring and avoid the errors that end long streaks.",
      headings: [
        "Reading Dense Patterns",
        "Avoiding the Edge Trap",
        "Common Mistakes to Avoid",
        "Recovering From a Slip",
        "Chasing a New Best",
      ],
      body: [
        "As figures get denser, scan the whole left side before touching the right. Identify clusters and isolated cells, then mirror them as groups. Grouping reduces the chance of missing a single cell buried in a busy row.",
        "Watch the edges. The far-left and far-right cells are the easiest to misjudge because they feel 'outside' the pattern. Always pair the extreme left cell with the extreme right cell explicitly, since these are the most common omission points.",
        "Even strong players slip by filling a cell that merely looks like its partner. The fix is discipline: the rule is positional, not visual similarity. Match by row and distance from center, not by how the shape 'feels'.",
        "If you make a wrong fill, do not panic. Clear the red cell and recheck the opposite row. One error is harmless; the danger is a cascade of careless taps after the first mistake. Reset your rhythm and continue.",
        "Chasing a new best changes your play. Once you know your record, prioritize zero-error figures over speed. A clean, methodical run beats a fast one that ends on the error limit every time.",
      ],
    },
  ],
};
