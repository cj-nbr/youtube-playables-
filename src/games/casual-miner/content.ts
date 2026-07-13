import type { GameContent } from "../../../shared/types";

export const content: GameContent = {
  guide: [
    {
      heading: "Objective",
      body: "Drive your minecart through a dug-out maze, scoop up every gem, and roll out through the exit before your dig fuel runs dry. Plan a tidy route so you never box yourself in with no way to reach the last gem.",
    },
    {
      heading: "How to play",
      body: "Your cart sits at the entrance. Tap or click any passage cell orthogonally adjacent to the cart to dig into it and move there. Passages are the lighter tunnels; dark rock walls block you. Roll over a gem to collect it, and reach the exit door once every gem is in your cart.",
    },
    {
      heading: "Strategy",
      body: "Think of the maze as a tree of tunnels. Visit gems on branch tips first, then work back toward the exit, so you never have to cross the same long tunnel twice. Re-tracing a tunnel wastes dig fuel, and fuel is exactly what ends your run if you waste too much of it.",
    },
    {
      heading: "Example",
      body: "Suppose a gem sits at the end of a side tunnel and the exit is back near the start. Dig to the gem first, then retrace that tunnel toward the exit rather than diving deeper. If instead you wander into a dead-end pocket far from the remaining gems, you may burn all your fuel getting back — that is how you trap yourself.",
    },
  ],
  instructions: {
    objective:
      "Collect every gem in the mine and reach the exit without running out of dig fuel.",
    desktop:
      "Use your mouse to click a tunnel cell directly above, below, left, or right of your cart to dig into it and move there. Click gems to collect them and the exit door to finish once all gems are gathered.",
    mobile:
      "Tap a tunnel cell orthogonally adjacent to your cart to dig in and move. Tap gems to collect them and the exit to finish once every gem is collected. The board is fully touch-friendly.",
    winning:
      "You win the moment your cart reaches the exit door after collecting every gem in the mine. Your remaining fuel becomes a bonus to your score.",
    losing:
      "You lose when your dig fuel hits zero before you have all gems and the exit. Wandering into dead-ends and re-digging the same tunnels burns fuel, so a wasteful route can trap you.",
    tips: [
      "Visit branch-tip gems first, then work back toward the exit.",
      "Avoid re-digging the same tunnel — it wastes fuel.",
      "Plan the whole route before your first move.",
      "Pause to study the maze when it looks complex.",
      "Leave the exit for last, after every gem is collected.",
      "A short detour is cheaper than a long backtrack.",
    ],
  },
  faqs: [
    {
      q: "How do you play Casual Miner?",
      a: "Your minecart starts at the entrance of a dug maze. Click or tap an adjacent tunnel cell to dig into it and move there. Collect every gem by rolling over it, then reach the exit door. Each move spends one unit of dig fuel.",
    },
    {
      q: "What are the rules of Casual Miner?",
      a: "Move only into orthogonally adjacent tunnel cells, never through rock walls. Collect all gems, then reach the exit. Every move consumes dig fuel. Run out of fuel before finishing and the run ends.",
    },
    {
      q: "What is dig fuel?",
      a: "Dig fuel is your movement budget. Each time you move the cart into a new cell, one unit of fuel is spent. Re-tracing a tunnel costs again, so an efficient route finishes with fuel to spare, which becomes a score bonus.",
    },
    {
      q: "How is Casual Miner scored?",
      a: "Your score is based on gems collected and the fuel you have left when you reach the exit — leftover fuel is a bonus. Your best score is saved locally in your browser so you can try to beat it.",
    },
    {
      q: "How do you avoid trapping yourself?",
      a: "Plan a route that visits dead-end gems first and ends at the exit, so you never have to cross a long tunnel twice. Wasted backtracking burns fuel, and fuel is what ends the run if you overuse it.",
    },
    {
      q: "Are all gems always reachable?",
      a: "Yes. The mine is generated as a connected maze, so every gem and the exit can be reached from the start. Losing is always a result of inefficient routing that burns fuel, not of an impossible layout.",
    },
    {
      q: "Can I move backward?",
      a: "Yes. You can dig back into any tunnel cell you came from. Backtracking is sometimes necessary, but it costs fuel just like any other move, so use it sparingly.",
    },
    {
      q: "What is the exit?",
      a: "The exit is the door at the far end of the mine, marked with a distinct icon. You may pass through it at any time, but you only win if every gem has already been collected.",
    },
    {
      q: "Can I play Casual Miner on mobile?",
      a: "Yes. The maze is responsive and works with touch. Tap an adjacent tunnel cell to move, tap gems to collect them, and tap the exit to finish. Controls mirror the desktop version.",
    },
    {
      q: "Is Casual Miner timed?",
      a: "No clock is involved. The pressure comes from your finite dig fuel, not a countdown, so you can pause and plan your route calmly.",
    },
    {
      q: "Is there a pause feature?",
      a: "Yes. Use the Pause button to freeze the mine and study your route, then Resume. Pausing is ideal when you want to map the most fuel-efficient path.",
    },
    {
      q: "How do I save my best score?",
      a: "Your best score is stored automatically in your browser's local storage when you finish. It is shown on the status line each game. Clearing browser data resets it.",
    },
    {
      q: "Is Casual Miner good for kids?",
      a: "Yes. It teaches planning, spatial reasoning, and resource management with no time pressure or violent content. Kids enjoy the gem-collecting goal while learning to think a few moves ahead.",
    },
    {
      q: "What is the best strategy for Casual Miner?",
      a: "Treat the maze like a tree. Grab gems on branch tips first, then travel back toward the exit along shared tunnels. Minimizing repeated tunnels keeps your fuel high and your score bonus large.",
    },
    {
      q: "Is Casual Miner free to play?",
      a: "Yes. It runs in your browser with no cost, no account, and no download. Open the page and start mining immediately. Your best score stays private on your device.",
    },
  ],
  blog: [
    {
      title: "The Complete Casual Miner Guide",
      excerpt:
        "Learn to navigate the mine, collect every gem, and escape before your dig fuel runs out.",
      headings: [
        "What Is Casual Miner",
        "Core Rules and Setup",
        "Understanding Dig Fuel",
        "Scoring and Bonuses",
        "Getting Better Over Time",
      ],
      body: [
        "Casual Miner is a calm route-planning puzzle set in a dug-out mine. Your cart starts at the entrance, and your goal is to collect every gem scattered through the tunnels and then roll out through the exit door. The twist is that every move costs dig fuel.",
        "The setup is a connected maze of light tunnels carved through dark rock. Your cart can only move into an orthogonally adjacent tunnel cell — rock walls are impassable. Gems sit on tunnel cells, and the exit is a door at the far end of the mine.",
        "Dig fuel is your movement budget. Each step into a new cell spends one unit, and re-digging a tunnel you already cleared spends again. Because the maze is a tree of tunnels, wasted backtracking is the fastest way to burn fuel and end your run.",
        "Scoring rewards efficiency. You earn points for gems collected and a bonus for the fuel you have left when you reach the exit. A tidy route that visits each tunnel once leaves fuel in the tank and pushes your score higher.",
        "Improvement is about foresight. Before moving, picture the whole tree of tunnels and decide an order that hits branch-tip gems first and ends at the exit. With practice you will instinctively minimize repeated tunnels and bank big fuel bonuses.",
      ],
    },
    {
      title: "Beginner Strategies for Casual Miner",
      excerpt:
        "Simple routing habits that help new miners finish with fuel to spare.",
      headings: [
        "Visit Branch Tips First",
        "End at the Exit",
        "Minimize Backtracking",
        "Pause and Map",
        "Spend Fuel on Purpose",
      ],
      body: [
        "New miners lose by diving deep, then realizing a gem sits at the tip of a side tunnel they skipped. Always clear the furthest gems — the ones at dead ends — before moving on, so you never have to return down a long tunnel.",
        "Leave the exit for last. You can roll through it anytime, but it only counts once every gem is collected. Planning to arrive at the exit as the final step keeps your route linear and efficient.",
        "Backtracking is the silent fuel drain. Every repeated tunnel costs again, so choose an order where shared tunnels are traveled once on the way to several gems. A little planning saves more fuel than any quick reflex.",
        "Use Pause to study the maze before committing. Because there is no clock, you can map the most fuel-efficient path calmly. Players who plan first consistently finish with more fuel than those who dig impulsively.",
        "Spend fuel on purpose. Ask, before each move, whether it brings you closer to an uncollected gem or the exit. If a move is just exploring, reconsider — exploration is the most common cause of a trapped, fuel-empty cart.",
      ],
    },
    {
      title: "Advanced Tactics and Common Mistakes in Casual Miner",
      excerpt:
        "Sharpen your routing and avoid the errors that strand experienced miners.",
      headings: [
        "Thinking in Trees",
        "The Trap of Dead-Ends",
        "Common Mistakes to Avoid",
        "Fuel Bonus Math",
        "Chasing a New Best",
      ],
      body: [
        "Strong miners model the mine as a tree. Each fork splits into branches that must all be visited, so the optimal route touches every branch tip and returns along shared trunks. Internalizing the tree shape makes the efficient path obvious at a glance.",
        "The classic trap is committing to a deep dead-end pocket while gems remain on a distant branch. To escape, you must retrace the entire pocket, burning fuel. Always check whether a branch holds uncollected gems before diving in.",
        "Even confident players slip by re-digging a long trunk they already cleared. The fix is discipline: commit to a visitation order and stick to it. A written or mental checklist of gems prevents the expensive 'oh, I missed that one' backtrack.",
        "The fuel bonus rewards restraint. Because leftover fuel converts to score, finishing with fuel to spare beats finishing fast. When two routes collect the same gems, always pick the one with fewer total moves.",
        "Chasing a new best changes your priorities. Once you know your record, optimize for the fuel bonus rather than mere completion. A clean, minimal-route run is what separates a good score from a great one.",
      ],
    },
  ],
};
