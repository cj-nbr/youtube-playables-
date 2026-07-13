import type { GameContent } from "../../../shared/types";

export const content: GameContent = {
  guide: [
    {
      heading: "Goal",
      body: "Remove every tile from the board by matching pairs of identical, exposed tiles. An exposed tile has no tile directly above it and is free on its left or right side. Clear all tiles before time runs out to win.",
    },
    {
      heading: "How to play",
      body: "Click any exposed Mahjong tile to select it, then click a matching exposed tile to remove both as a pair. Tiles are arranged in stacked layers, so only top-layer tiles and tiles with an open side are playable. Plan ahead to avoid trapping tiles under blocking pieces.",
    },
    {
      heading: "Strategy",
      body: "Always match the most exposed pairs first, especially tiles on the outer edges and corners. Leave matching pairs that block other tiles for last. Watch the timer and prioritize quick wins if time is short.",
    },
    {
      heading: "Example",
      body: "A Circle tile on the second layer is exposed because the tile above it was already removed, and its right side is open. You can match it with another exposed Circle. After matching, tiles beneath previously blocked pieces may become exposed on the next turn.",
    },
  ],
  instructions: {
    objective:
      "Match and remove every tile from the multi-layered Mahjong board before the countdown timer reaches zero.",
    desktop:
      "Click one exposed tile to select it, then click another matching exposed tile to remove the pair. A tile is exposed if it is not covered by another tile and has at least one open left or right edge. You can also click the same tile twice to deselect it.",
    mobile:
      "Tap an exposed tile to select it, then tap a matching exposed tile. The board scrolls and fits within your screen, and tiles are large enough for accurate tapping. A brief visual confirmation shows each matched pair before the tiles disappear.",
    winning:
      "Win by clearing the entire board before the timer hits zero. Every matched pair earns points, with bonus points for quick matches and combos.",
    losing:
      "Lose when the timer reaches zero with any tiles remaining on the board. There is no penalty for choosing a new shuffle; simply restart and try a different matching order.",
    tips: [
      "Free exposed tiles on all four sides first — they are the safest matches.",
      "Remove tiles that block other tiles before they become trapped.",
      "Keep an eye on the timer in the top-right and speed up when it drops below thirty seconds.",
      "Match identical tiles in the same layer before removing deeper tiles.",
      "If two matching tiles block different pieces, remove the one that unblocks the most other tiles.",
      "Plan three moves ahead when possible; a greedy remove-first habit often leaves blocked tiles.",
      "Shuffle only when truly stuck — reshuffling costs valuable seconds.",
    ],
  },
  faqs: [
    {
      q: "What is Mahjongg Solitaire?",
      a: "Mahjongg Solitaire is a tile-matching puzzle game where you remove pairs of identical exposed tiles from a multi-layered board. It uses traditional Mahjong tile designs but plays as a relaxing single-player logic game instead of a four-player table game.",
    },
    {
      q: "When is a tile considered exposed and matchable?",
      a: "A tile is exposed if nothing rests directly on top of it, and at least one of its left or right long edges is free of another tile. If a tile is covered or sandwiched tightly between two neighbors on both sides, it cannot be selected until its blockers are removed.",
    },
    {
      q: "Can I match any two identical tiles?",
      a: "No. Both tiles must be fully exposed at the time you click them. A tile under another tile or completely blocked on both sides cannot be used even if an identical match exists somewhere else.",
    },
    {
      q: "Is there a timer in Mahjongg Solitaire?",
      a: "Yes. Most Mahjongg Solitaire runs include a countdown timer that adds urgency. You win by clearing the board before time expires. Faster matches and combos earn higher scores, so efficiency matters as much as accuracy.",
    },
    {
      q: "What happens if I get stuck?",
      a: "A shuffle button lets you rearrange the remaining tiles when no exposed pairs remain. This costs time from the timer, so use it only when necessary. Strategic play reduces how often you need to shuffle.",
    },
    {
      q: "How do I score points?",
      a: "You earn points for each matched pair. Bonus points are awarded for faster matches and consecutive pairs of the same type. Clearing the board quickly yields the highest possible score.",
    },
    {
      q: "Are all boards solvable?",
      a: "The classic turtle and fortress layouts are solvable, but a randomly generated board can occasionally trap tiles. If the board truly becomes unsolvable, use the shuffle tool or start a new layout.",
    },
    {
      q: "Can I play on mobile?",
      a: "Yes. The board is touch-optimized with large tap targets. Tiles that are exposed glow slightly to help you see valid moves on a smaller screen. The timer is clearly visible at the top.",
    },
    {
      q: "How many layers are in a typical board?",
      a: "Classic layouts have four to five layers. The bottom layer includes a sealed base, the middle layers form the bulk of playable tiles, and the top layer exposes the easiest initial matches. New tiles become exposed as upper layers clear away.",
    },
    {
      q: "What do the Mahjong tiles represent?",
      a: "Traditional Mahjong tiles include Bamboo, Characters, Circles, Winds, Dragons, and Flowers. Each suit has specific numbered tiles and honor tiles. Matching identical tiles is the core mechanic regardless of the suit.",
    },
    {
      q: "What is a 'match three' or 'three-tile rule'?",
      a: "Some Mahjongg variants require matching three identical tiles at once, but standard Mahjongg Solitaire uses pairs. Two identical exposed tiles are removed in a single click.",
    },
    {
      q: "Is there an undo button?",
      a: "No undo button is provided, so match carefully. A brief matching animation gives you a moment to correct a misclick if you catch it immediately.",
    },
    {
      q: "Why do some layouts look impossible?",
      a: "Some intentionally dense layouts such as the Turtle or Fortress are designed to feel impossible at first glance but are solvable with patience. The exposed edge and corner tiles are your gateway to revealing deeper layers.",
    },
    {
      q: "How is Mahjongg Solitaire different from Mahjong?",
      a: "Traditional Mahjong is a four-player betting game with complex tile drawing and melding rules. Mahjongg Solitaire is a single-player matching game with no betting, no discards, and no hands. They share the same tile aesthetic but play nothing alike.",
    },
    {
      q: "Can I change the background or tiles?",
      a: "The current version uses the classic bone-and-bamboo Mahjong tiles on a neutral background. Future updates may add alternate tile sets, but the core matching mechanics remain the same regardless of visual theme.",
    },
  ],
  blog: [
    {
      title: "Mahjongg Solitaire Strategy Guide",
      excerpt:
        "Learn to read layered boards, prioritize exposed pairs, and beat the timer with smarter match orders.",
      headings: [
        "Reading the Layers",
        "Exposed-Edge First",
        "Trapping Prevention",
        "Timer Management",
        "When to Shuffle",
      ],
      body: [
        "Mahjongg Solitaire boards are built in horizontal layers, each offset like a tight stack of plates. The bottom layer sits on a solid base, and each upper layer hides tiles below. Understanding which tiles are truly exposed — not covered and with a free side — is the first skill every player needs.",
        "Always match tiles on the outer edges and corners first. These tiles have two or three free sides and never trap anything beneath them. By clearing perimeter tiles methodically, you open up the inner layers without blocking your own future moves.",
        "Trapping happens when you remove a tile that was the only way to expose a deeper piece. For example, a middle-layer tile might be the sole support for an upper-layer tile, and removing it too early can leave a tile permanently unreachable. Check the dependency tree before every match.",
        "The timer is a fixed resource. Early matches are cheap in time but valuable in progress. As the countdown drops below thirty seconds, shift your strategy from deep-planning to rapid safe matches. Grab obvious pairs and leave complex puzzles for a slower pace.",
        "Shuffling is your emergency brake, not a strategy. It costs time and temporarily scrambles your mental map. Use it only when no legal moves remain for at least thirty seconds and no other choice exists.",
      ],
    },
    {
      title: "Why Mahjongg Solitaire Is Addictive",
      excerpt:
        "The simple matching mechanic hides deep psychological hooks that keep players returning.",
      headings: [
        "The Satisfaction of a Clean Board",
        "Progressive Unlocking",
        "Low Stakes, High Reward",
        "The One-More-Game Effect",
        "Mindful Play",
      ],
      body: [
        "Clearing a dense board tile by tile produces a strong sense of closure. Each matched pair simplifies the layout, and the final empty table triggers a clear visual reward. This progress loop is one of the most satisfying patterns in casual game design.",
        "Layered boards create natural progressive unlocking. You cannot rush the board because deeper tiles demand patience. This pacing prevents burnout while still giving the feeling of constant forward motion. Every cleared layer feels like unlocking the next zone.",
        "Mahjongg Solitaire has no penalty for playing slowly, no visible ranking against strangers, and no forced social features. You can play for two minutes or two hours. The low pressure makes it safe to pick up during busy days and hard to put down during quiet ones.",
        "The one-more-game effect thrives in Mahjongg Solitaire because the next shuffle always looks different. That tiny curiosity — maybe this board is the perfect one — drives repeated play without feeling manipulative. The game promises fairness and delivers it.",
        "Because the matching mechanic is simple but layered, Mahjongg Solitaire occupies a mindful middle ground. You are focused enough to forget stressors but relaxed enough to notice them less over time. It is a mental refresh rather than an escape.",
      ],
    },
    {
      title: "The Origins of Mahjongg Tile Games",
      excerpt:
        "Explore how an ancient Chinese card game became a worldwide digital puzzle phenomenon.",
      headings: [
        "Ancient Chinese Roots",
        "The McCoy Standardization",
        "Digital Adaptations",
        "Solitaire Separation",
        "Global Appeal",
      ],
      body: [
        "Mahjong was invented in China during the Qing Dynasty, likely adapted from earlier Ming-era card games. The tile-based form emerged in the mid-nineteenth century and spread rapidly through Shanghai and Ningbo. Traditional Mahjong is a four-player gambling game with elaborate rules for drawing, discarding, and forming melds.",
        "In the 1920s, Joseph Park Babcock standardized Mahjong rules for Western audiences in his book Rules of Mahjong. His simplification made the game accessibly exotic for American parlors, and the bone-and-bamboo tiles became iconic. The distinctive clack of shuffling tiles remains the game's signature sound.",
        "Digital Mahjong adaptations began appearing in arcades and early PCs in the 1980s. The shift from a four-player social game to a single-player matching puzzle was natural because the tile aesthetic already communicated elegant matching. Early solitaire versions leaned into relaxation rather than competition.",
        "Mahjongg Solitaire formally divorced from the traditional game in the 1980s when programmers created the layered matching variant. Unlike table Mahjong, solitaire Mahjong has no petals, no melds, no discards, and no betting. It keeps the beautiful tiles while replacing complex rules with pure spatial reasoning.",
        "Today Mahjongg Solitaire is one of the most popular casual genres globally. Variants appear on every platform, from web browsers to mobile app stores. Its universal appeal comes from the tiles themselves — even players who have never seen a physical Mahjong set recognize the elegant, inviting design.",
      ],
    },
  ],
};
