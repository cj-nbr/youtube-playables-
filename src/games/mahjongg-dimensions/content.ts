import type { GameContent } from "../../../shared/types";

export const content: GameContent = {
  guide: [
    {
      heading: "Goal",
      body: "Clear all tiles from stacked 3D-style layers by matching identical exposed pairs. Each layer sits above the next, so only top-layer tiles and tiles with a free left or right side can be matched. Deeper layers reveal themselves as upper layers vanish.",
    },
    {
      heading: "How to play",
      body: "Click any exposed tile to select it, then click another matching exposed tile to remove both. Tiles are arranged in multiple stacked layers with subtle shadowing to suggest depth. As you remove top tiles, lower tiles become exposed and eligible for matching.",
    },
    {
      heading: "Strategy",
      body: "Focus on the upper layers first to open the board quickly. Because matching any top tile exposes deeper tiles, your goal is to thin the upper deck as fast as possible without trapping lower pieces. Prioritize corner and edge tiles of each layer.",
    },
    {
      heading: "Example",
      body: "A Dragon tile on the second layer is fully exposed after its covering tile is removed and its left edge is free. Match it with an identical Dragon on a different column. After both vanish, the tile that was sitting beneath the second-layer Dragon may now be playable.",
    },
  ],
  instructions: {
    objective:
      "Remove every tile from the multi-layered 3D-style board by matching exposed identical pairs before the timer expires.",
    desktop:
      "Click an exposed tile to select it, then click an identical exposed tile to remove the pair. A tile is exposed when nothing sits directly on top of it and at least one long side is free. The subtle layered shadows help you see which tiles are on top.",
    mobile:
      "Tap to select and tap again to match. The 3D-style layer shading is visible on mobile screens, and the timer is always accessible at the top. Tiles are sized for accurate taps even on smaller displays.",
    winning:
      "Win by clearing the entire board before the countdown timer reaches zero. Higher scores come from faster matches and large consecutive combos of the same tile type.",
    losing:
      "Lose if any tiles remain when the timer runs out. There is no penalty for restarting — simply choose a new shuffle and apply a different matching order.",
    tips: [
      "Clear top-layer corners first; they are always exposed and unlocking them opens deeper edges.",
      "Match identical tiles before removing tiles that cover different types.",
      "Keep the timer visible and plan quick matches when time drops below twenty seconds.",
      "Avoid removing a tile that is the only bridge between an upper tile and its support below.",
      "Use the shuffle button only when no exposed pair exists for an extended period.",
      "Look for tile types that appear exactly twice — matching them early reduces clutter.",
      "Think in layers: each layer is a small puzzle inside the larger board.",
    ],
  },
  faqs: [
    {
      q: "What is the difference between Mahjongg Solitaire and Mahjongg Dimensions?",
      a: "Mahjongg Solitaire uses a standard 2D layered layout. Mahjongg Dimensions adds a stronger 3D visual style with layered tiles and shadow effects, sometimes with more tiles and steeper time pressure. The core matching rules are identical.",
    },
    {
      q: "Is Mahjongg Dimensions the same as the classic Microsoft game?",
      a: "It draws strong inspiration from the classic layered tile genre. This version uses the same exposed-pair mechanics but with a modern visual polish, dynamic time limits, and responsive layout. It is not affiliated with Microsoft's original product but respects its design language.",
    },
    {
      q: "Do layers have different numbers of tiles?",
      a: "Yes. The bottom layer is the largest, middle layers form the body of the board, and the top layer is the sparsest. This taper makes the first few minutes fast-paced while the middle game becomes more deliberate.",
    },
    {
      q: "How do the layered shadows help me play?",
      a: "Shadows indicate relative height. A tile with a darker shadow cast across it is covered by a tile above it. Tiles with clean highlights and no shadow are on top. Use the shading to quickly identify which layer a tile belongs to.",
    },
    {
      q: "Can I play Mahjongg Dimensions offline?",
      a: "Yes. Once loaded, the game runs locally in your browser with no server dependency. You can play offline and your progress stays on your device.",
    },
    {
      q: "What is the best strategy for fast clears?",
      a: "Remove corners and exposed edges of every layer first. This opens new tiles on multiple sides at once. Avoid deep interior tiles until the perimeter is thoroughly cleared.",
    },
    {
      q: "Why does the timer feel faster in Dimensions?",
      a: "The layered board contains more tiles than typical Solitaire layouts, so the countdown is calibrated for a higher density of matches. Faster play keeps the urgency fair rather than punishing.",
    },
    {
      q: "Are there bonus rounds or power-ups?",
      a: "No power-ups or bonus rounds are included. The challenge is purely mechanical: match pairs, clear layers, and beat the clock. The satisfaction comes from steady progress rather than random boosts.",
    },
    {
      q: "Do tiles ever respawn?",
      a: "No. Once a pair is matched and removed, those tiles are gone permanently. Plan accordingly and do not waste matches on tiles that block potential pairs beneath them.",
    },
    {
      q: "What tile types are used?",
      a: "The game uses a mix of numbers, suits, dragons, winds, and flowers rendered in the classic Mahjong tile style. Every match requires two identical tiles; mixed suits do not combine.",
    },
    {
      q: "Is there a difficulty selector?",
      a: "The current version uses one balanced difficulty with a moderate countdown timer. Future updates may add easy, medium, and hard presets with different tile counts and time limits.",
    },
    {
      q: "Can I use keyboard shortcuts?",
      a: "No keyboard shortcuts are implemented because the game is mouse and touch-first. However, you can reset the board at any time with the restart button if the layout becomes unmanageable.",
    },
    {
      q: "Why did I get a board with no exposed pairs at the start?",
      a: "A very rare shuffle may technically start with all top-layer tiles blocked. If this happens, simply click shuffle immediately. The shuffle reuses remaining tiles into a new exposed-pair-friendly layout.",
    },
    {
      q: "Is Mahjongg Dimensions suitable for kids?",
      a: "Yes, with adult supervision for younger children. The matching rules are simple to learn, the tiles are colorful, and there is no violence or text-heavy interface. It improves visual memory and spatial awareness.",
    },
    {
      q: "How does Mahjongg Dimensions compare to other tile matchers?",
      a: "Compared to flat-match games like Bejeweled or Candy Crush, Mahjongg Dimensions keeps the spatial depth that makes classic Mahjong unique. You must read the board in three dimensions rather than scanning a flat grid, which adds a satisfying spatial puzzle layer.",
    },
  ],
  blog: [
    {
      title: "Mastering Mahjongg Dimensions",
      excerpt:
        "How to read layers, spot exposed pairs, and clear the deepest tiles before time runs out.",
      headings: [
        "Understanding 3D Layouts",
        "Visual Cues and Shadows",
        "Layer-by-Layer Play",
        "Deeper Tile Awareness",
        "Pacing Against the Clock",
      ],
      body: [
        "Mahjongg Dimensions boards look dense because they are. Each layer adds hidden tiles that only appear after the layer above is thinned or cleared. The best players do not try to clear the whole board at once — they treat each layer as a micro-puzzle with its own exit conditions.",
        "Use the layered shadows as your primary navigation tool. A tile with a shadow across its top is covered; a tile with clean edges is exposed. Learning to read shading at a glance saves you from clicking blocked tiles and wasting time on impossible moves.",
        "Play layer by layer rather than jumping between depths. Pick one layer, clear its exposed perimeter, then let newly exposed tiles draw you deeper. This methodical approach prevents you from spreading your attention too thin across five or six active layers at once.",
        "Deeper tiles are easy to forget because they are invisible until the right moment. Mentally note which tile types you expect to appear soon so you are ready to match them the instant they become exposed. Preparation beats reaction.",
        "The timer in Dimensions is tuned for weighted boards, so early conservation is better than late panic. Match fast, safe pairs in the first two minutes to thin the upper deck, then slow down and think carefully as the board thins and deeper tiles become critical.",
      ],
    },
    {
      title: "The Psychology of Tile Matching",
      excerpt:
        "Why identical-tile matching games are so compelling and how to play mindfully.",
      headings: [
        "Pattern Recognition Reward",
        "The Calm of Certainty",
        "Flow State in Layers",
        "Avoiding Burnout",
        "Healthy Limits",
      ],
      body: [
        "Matching identical tiles taps directly into the brain's pattern recognition reward system. Each time you spot a pair, your brain gets a small hit of satisfaction. This positive reinforcement loop is so effective that tile-matching games remain popular decades after their invention.",
        "Unlike real-time action games, Mahjongg Dimensions gives you certainty: two identical exposed tiles always make a valid move. There is no hidden penalty, no surprise enemy, and no fail state until the timer. That predictability makes the game calming even while it demands focus.",
        "Dense layered boards are ideal for flow state because they offer clear, small goals and immediate feedback. Each match simplifies the board visibly, and the next exposed tile is always waiting. This loop — action, feedback, small reward — is the foundation of sustained engagement.",
        "Burnout happens when you keep playing after fatigue sets in. Recognize when your match speed drops or you start clicking wildly. Take a one-minute break, stretch, and return. A fresh mind spots exposed tiles much faster than a tired one.",
        "Play mindfully instead of mindlessly. Use Mahjongg Dimensions as a deliberate mental break rather than background noise. Even five minutes of focused tile matching sharpens visual scanning and working memory more than an hour of unfocused clicking.",
      ],
    },
    {
      title: "Designing Better Tile Matchers",
      excerpt:
        "A look at what makes tile-layouts fun, fair, and visually satisfying.",
      headings: [
        "Balance in Tile Distribution",
        "Fairness in Exposures",
        "Visual Feedback Loops",
        "Accessibility in Design",
        "The Future of Tile Games",
      ],
      body: [
        "Great tile layouts distribute identical tiles evenly across layers and columns. If all copies of one tile cluster on one side of the board, players spend ages hunting. Balanced distributions create natural flow and make every area of the board worth scanning.",
        "A well-designed initial shuffle guarantees at least a few immediate matches while still blocking deeper tiles underneath. This 'easy start, hard finish' curve keeps new players engaged without spoiling the puzzle for veterans.",
        "Visual feedback — tile color, glow, shadow, and removal animation — tells the player whether their move was valid and what changed. Responsive feedback prevents frustration and keeps the game feeling polished even on simple mechanics.",
        "Accessibility demands high contrast, large tap targets, and clear labels. Tile matchers excel here because the core mechanic is visual but the rules are minimal. Adding optional high-contrast tile sets benefits color-blind players without changing gameplay.",
        "The future of tile matchers likely includes 3D and AR layers, procedural generation of infinite boards, and adaptive timers that match player skill. The core appeal — clear, calm, satisfying matching — will stay the same because it works at a deep level.",
      ],
    },
  ],
};
