import type { GameContent } from "../../shared/types";

export const content: GameContent = {
  guide: [
    {
      heading: "Goal",
      body: "The board is a 6×6 grid of colored shapes split into nine 2×2 sections. Spin the sections until the whole pattern matches the target arrangement. Fewer spins means a better score.",
    },
    {
      heading: "How to play",
      body: "Click any 2×2 section to rotate its four tiles clockwise by 90 degrees. Each click is one move. Plan which sections to spin and in what order to rebuild the symmetric target design as efficiently as possible.",
    },
    {
      heading: "Symmetry & alignment",
      body: "A solved board shows every color-and-shape tile sitting in its correct, symmetric position. The target is always reachable, because the scramble is built purely from section rotations you can reverse.",
    },
    {
      heading: "Winning the puzzle",
      body: "You win the moment the board matches the target. Your score is the number of spins you used, so solving in fewer moves beats your previous best. Running out of moves before solving ends the run.",
    },
  ],
  instructions: {
    objective:
      "Rotate the 2×2 sections of a 6×6 grid of colored shapes until the pattern exactly matches the target arrangement, using as few spins as possible.",
    desktop:
      "Click a section to rotate its four tiles clockwise. Click again to keep rotating. Watch the move counter and try to solve before the move limit runs out. The board is fully mouse-driven and needs no keyboard.",
    mobile:
      "Tap a section to spin its four tiles. Each tap rotates 90 degrees clockwise. The grid scales to your screen and every section is a large, touch-friendly target.",
    winning:
      "You win when the current board is identical to the target pattern. Your spin count is recorded and your fewest-spins result is saved as your best score.",
    losing:
      "You lose if you use all your allowed moves without matching the target. Each spin counts, so inefficient rotations can run you out of moves before the pattern completes.",
    tips: [
      "Rotate one section at a time and recheck the whole board after each spin.",
      "Work from corners inward; corner sections affect fewer neighbors.",
      "Remember that four clicks on a section returns it to the start.",
      "Try to place the most distinctive tile first to anchor a section.",
      "Count your remaining moves and avoid aimless spinning late in the game.",
      "Visualize the target's symmetry to predict where each tile belongs.",
    ],
  },
  faqs: [
    {
      q: "How do you play Rotate2?",
      a: "Click any 2×2 section of the 6×6 grid to rotate its four tiles clockwise. Keep spinning sections until the whole pattern matches the target arrangement shown at the start.",
    },
    {
      q: "What is the goal of Rotate2?",
      a: "Recreate the target pattern by rotating sections. Each section turns independently, and your challenge is to find the shortest sequence of rotations that solves the board.",
    },
    {
      q: "How many moves do I get?",
      a: "The board is scrambled with a fixed number of random section rotations, and you are given a generous move allowance above that. Solve within the allowance to win; run out and the run ends.",
    },
    {
      q: "Is the puzzle always solvable?",
      a: "Yes. The scramble is produced only by section rotations, which are fully reversible, so the target can always be reached again by spinning the same sections back.",
    },
    {
      q: "How is the score calculated?",
      a: "Your score is the number of spins you use to solve the board. Fewer spins is better, and your lowest result is saved as your personal best for the game.",
    },
    {
      q: "What do the colorful tiles represent?",
      a: "Each tile pairs a color with a shape, so a solved board aligns both color and form into the symmetric target. Matching both makes the completion visually obvious.",
    },
    {
      q: "Can I rotate a section the other way?",
      a: "Each click rotates a section 90 degrees clockwise. To go counterclockwise, simply click three more times; four clicks return a section to its original orientation.",
    },
    {
      q: "Does the target stay the same?",
      a: "No. A new game generates a fresh target and a fresh scramble, so every round presents a different arrangement to reconstruct.",
    },
    {
      q: "What happens if I run out of moves?",
      a: "If your spins reach the limit before the board matches the target, the run ends in a loss. Manage your remaining moves carefully to avoid wasted rotations.",
    },
    {
      q: "Can I play on mobile?",
      a: "Yes. The grid and sections are fully touch-friendly and scale to your phone. Tap a section to spin it; large targets make precise tapping easy.",
    },
    {
      q: "Does my best score save?",
      a: "Yes. Your fewest-spins result is stored locally in your browser and persists between visits. Clearing your browser data resets it, since the score lives on your device.",
    },
    {
      q: "Is there a time limit?",
      a: "There is no clock, only a move limit. You can think carefully about each rotation, but each spin still counts toward your total, so efficiency matters more than speed.",
    },
    {
      q: "What strategy works best?",
      a: "Solve one section at a time, starting with corners, and recheck the board after every spin. Anchoring the most distinctive tile first helps you place the rest of a section quickly.",
    },
    {
      q: "Why is it called a rotation puzzle?",
      a: "Because the only action is rotating groups of tiles. Rather than swapping or sliding individual pieces, you spin whole sections, which creates a distinctive spatial challenge.",
    },
    {
      q: "Is Rotate2 good for spatial reasoning?",
      a: "Yes. Mentally tracking how a 90-degree rotation moves each tile strengthens spatial visualization, a skill useful for puzzles, design, and everyday problem solving.",
    },
    {
      q: "Is Rotate2 free to play?",
      a: "Yes. It runs in your browser with no account, no download, and no cost. Open the page and start spinning sections right away.",
    },
    {
      q: "Can two people play together?",
      a: "The single-player version tracks your best spin count, but you can pass the device and compete with a friend to solve the same board in the fewest rotations.",
    },
  ],
  blog: [
    {
      title: "Rotate2 — Master the Spin Puzzle",
      excerpt:
        "Learn how section rotation works and the mindset that solves Rotate2 in the fewest spins.",
      headings: [
        "How Rotation Works",
        "Reading the Target",
        "A Simple Solving Order",
        "Counting Your Moves",
        "Beating Your Best",
      ],
      body: [
        "Rotate2 splits a 6×6 grid into nine 2×2 sections. Clicking a section rotates its four tiles 90 degrees clockwise. Understanding that each click is a clean quarter-turn is the foundation of every solution.",
        "Before spinning, study the target and notice its symmetry. Because the scramble only ever rotates sections, the target is always reachable, and its balanced layout gives you visual checkpoints as you work.",
        "A reliable order is corners first, then edges, then the center. Corner sections touch fewer neighbors, so placing them early avoids disturbing work you have already done in adjacent sections.",
        "Every click is a move, and you have a finite allowance. Avoid spinning a section just to 'see what happens'; instead decide the destination of a tile, then rotate exactly the needed number of times.",
        "Your best score is your lowest spin count, so the goal is efficiency, not speed. Replaying boards and trimming wasted rotations is the fastest route to a new personal record.",
      ],
    },
    {
      title: "Spatial Reasoning and Why It Matters",
      excerpt:
        "Why mentally rotating shapes builds a transferable skill you use far beyond games.",
      headings: [
        "Mental Rotation",
        "Visualizing the Quarter-Turn",
        "From Game to Real Life",
        "A Calm, Thoughtful Challenge",
        "Practice Makes It Automatic",
      ],
      body: [
        "Rotate2 exercises mental rotation, the ability to picture an object turning in space. Each section you spin asks your brain to predict where its four tiles will land, training that skill directly.",
        "Good players learn to visualize a quarter-turn instantly: the top-left tile moves to top-right, and so on. Practicing this prediction strengthens the same networks used for reading maps and assembling objects.",
        "Strong spatial reasoning helps with everyday tasks like packing a car, following directions, and understanding diagrams. Games that require rotation are a playful, low-pressure way to build it.",
        "Because there is no clock, Rotate2 rewards thoughtful planning over reflexes. That calm pacing makes it a good brain break that still engages deep visual processing.",
        "With repetition, predicting rotations becomes automatic, and you solve boards faster and with fewer moves. The improvement is tangible as your saved best score drops round after round.",
      ],
    },
    {
      title: "Designing Puzzles With Reversible Moves",
      excerpt:
        "A peek at why Rotate2's scramble guarantees a solvable, fair challenge every time.",
      headings: [
        "Built From Solutions",
        "Why It Stays Solvable",
        "The Move Allowance",
        "Symmetry as a Check",
        "Endless Fresh Boards",
      ],
      body: [
        "Rotate2 never invents an unsolvable board. It starts from a finished target and applies random section rotations, so the scramble is literally a solution played in reverse.",
        "Because rotations are their own inverses, any scrambled board can always be returned to the target by repeating the same spins. This guarantee keeps every round fair and completable.",
        "The move allowance sits comfortably above the minimum needed, leaving room for exploration without removing the challenge. Efficient players still beat the allowance by a wide margin.",
        "The target's symmetry acts as a built-in verification: when colors and shapes align into the balanced design, you know the board is solved at a glance.",
        "Each new game randomizes both target and scramble, so no two boards are alike. That variety keeps the rotation challenge engaging across many sessions.",
      ],
    },
  ],
};
