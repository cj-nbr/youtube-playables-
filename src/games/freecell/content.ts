import type { GameContent } from "../../../shared/types";

export const content: GameContent = {
  guide: [
    {
      heading: "Goal",
      body: "Clear all 52 cards by moving them to four foundation piles, one per suit, built up in order. Use eight tableau columns and four free cells to organize and unlock sequences.",
    },
    {
      heading: "How to play",
      body: "Move cards among the eight tableau columns, which build down in alternating colors. Use the four free cells as temporary holding spots. When a column cannot be unblocked, draw from the stock. Transfer completed sequences to foundations once unlocked.",
    },
    {
      heading: "Strategy",
      body: "Free cells multiply your movement options. Try to empty tableau columns early so you can move long sequences. Before drawing from the stock, scan for moves that free new cards. Prioritize Kings when clearing columns.",
    },
    {
      heading: "Example",
      body: "With two empty free cells, you can move a four-card alternating sequence. Imagine a red Queen and black Jack on a column; free two cells, park the Queen and Jack there, then move the entire remaining stack onto the freed space.",
    },
  ],
  instructions: {
    objective:
      "Transfer all 52 cards to the four foundation piles, each building up from Ace to King by suit.",
    desktop:
      "Click a card to select it, then click a destination. Tableau columns build down in alternating color. Free cells hold single cards temporarily. Foundations build up by suit starting with the Ace. Use the stock to draw when no other moves exist.",
    mobile:
      "Tap to select a card, tap again to place it. The compact layout fits mobile screens with touch-optimized targets. Double-tap a card to auto-move it to the foundation when the move is obvious.",
    winning:
      "You win when all four foundations hold all thirteen cards of each suit. The game tracks move count and time so you can compare runs.",
    losing:
      "Free Cell is theoretically solvable from every starting deal, so losses are planning errors rather than bad luck. If the board looks impossible, carefully re-examine the tableau — a hidden sequence may be waiting.",
    tips: [
      "Plan free cell usage before moving a long sequence; count how many empty cells you need.",
      "Empty tableau columns are the most valuable board state in FreeCell — build toward them.",
      "Always move Aces to foundations the instant they are available.",
      "Never leave a card trapped below a higher card of the same color — reorder immediately.",
      "Use the stock only after exhausting every tableau and foundation move.",
      "Sweep low cards to foundations in a balanced order across suits.",
      "If you have four empty free cells, you may temporarily park an entire column to unblock another.",
    ],
  },
  faqs: [
    {
      q: "What makes FreeCell different from Solitaire?",
      a: "Free Cell uses eight columns instead of seven, provides four free cells as temporary buffers, and has no stock or waste piles. Every card is visible at the start, making it a pure logic puzzle where every deal is winnable with perfect play.",
    },
    {
      q: "Is FreeCell always solvable?",
      a: "Yes. Unlike Klondike, every standard FreeCell deal is mathematically solvable. If you think you are stuck, you have overlooked a sequence. Taking a break and returning with fresh eyes often reveals the winning path.",
    },
    {
      q: "What are the four free cells for?",
      a: "Free cells are temporary single-card slots. You can place one card in each free cell to clear columns. For example, moving two cards into two free cells lets you slide a longer sequence elsewhere. They are essential tools for complex rearrangements.",
    },
    {
      q: "How many tableau columns are there?",
      a: "There are eight tableau columns. Six columns receive seven cards each, and two columns receive six cards each, for a total of 52 cards. All cards are dealt face up except in classic Microsoft implementations where only the top card of each column shows.",
    },
    {
      q: "Can you stack any cards in the tableau?",
      a: "In the tableau, you may place a card of the opposite color and exactly one rank lower onto any column. For example, a black Ten accepts a red Nine. Sequences in a column automatically follow this rule.",
    },
    {
      q: "What does 'building down' mean?",
      a: "Building down means placing a lower-rank card on top of a higher-rank card. The rank decrements by one each step, and colors alternate. A Queen accepts a Jack of the opposite color, and so on down to the Ace.",
    },
    {
      q: "How do you move a long sequence?",
      a: "To move N cards as a group, you need N free cells available in theory, but in practice you can move N-1 cards if the target column is empty. With two empty free cells you can shift a three-card sequence, and with four empty cells you can shift very long stacks.",
    },
    {
      q: "Do you draw cards from a stock in FreeCell?",
      a: "No stock and no waste — every card is dealt face up into the eight tableau columns at the start. Because the full state is visible, the game is purely a matter of finding the right order of operations.",
    },
    {
      q: "Are all FreeCell deals solvable?",
      a: "Almost every deal is solvable. The only exceptions are pathological or variant rule sets. In standard FreeCell, mathematical analysis confirms that every deal produced by a perfect shuffle has a solution. If you lose, it is almost certainly a missed opportunity.",
    },
    {
      q: "What is FreeCell's origin?",
      a: "Free Cell was created by Paul Alfille in 1968 for the PLATO computer network. It later became famous as the bundled game with Windows 3.1 in 1992, where 32,000 numbered deals made it a legendary obsession for puzzle fans.",
    },
    {
      q: "How many free cells are available?",
      a: "Four free cells are always available in the top-left corner of the board. They start empty and may hold one card each. You may freely move cards into and out of free cells as your plan requires.",
    },
    {
      q: "Can you move a card from a free cell to a tableau pile?",
      a: "Yes. You may move any card from a free cell to a tableau column provided it follows the alternating-color, descending-rank rule. Free cells are staging areas, not endpoints.",
    },
    {
      q: "What is the best first move in FreeCell?",
      a: "Move any available Aces and Deuces directly to foundations. Then scan for columns that can be emptied — an empty column is worth more than a half-complete foundation. Finally, look for any two-card sequences that can be combined immediately.",
    },
    {
      q: "Is FreeCell good for children?",
      a: "Yes. Because every card is visible and the rules are consistent, FreeCell is an excellent logic trainer for children who can read numbers and recognize suits. It teaches planning, sequencing, and working-memory skills without any hidden randomness.",
    },
    {
      q: "Does FreeCell require an internet connection?",
      a: "No. Once loaded, the game runs entirely in your browser. All shuffling and state management happen locally, so you can play anywhere without network access.",
    },
  ],
  blog: [
    {
      title: "FreeCell Strategy — Solve Every Deal",
      excerpt:
        "Learn the systematic approach FreeCell experts use to untangle even the hardest deals.",
      headings: [
        "Scan Before You Touch",
        "Free Cells Are For Kings",
        "The Foundation-First Rule",
        "Empty Columns Multiply Power",
        "Common Beginner Mistakes",
      ],
      body: [
        "Before making your first move, scan the entire tableau for Aces, Deuces, and immediate sequences. Many players rush to the first available move without seeing an obvious foundation play on the opposite side of the board. Taking ten seconds to review every column pays off repeatedly.",
        "Free cells exist to extract Kings and open columns. Always prioritize freeing a King when you see a clear path, because an empty column can receive any King or any sequence starting with a King. Without an empty column, your long sequences have nowhere to go.",
        "Move Aces and Deuces to foundations as soon as they appear. Foundations never interfere with tableau builds, so early foundation moves only clarify your position. The sooner a suit starts in the foundation, the sooner you can park low cards there and reduce tableau congestion.",
        "Empty columns are the most powerful board state in FreeCell. One empty column lets you move a single long sequence; two empty columns multiply your options exponentially. Plan toward emptiness even if it means temporarily breaking a small sequence.",
        "Beginners often build sequences recklessly, stacking cards on top of each other without a clear plan. This traps cards under sequences that may need to move again. Build only what you can justify with a visible follow-up move, and favor revealing face-down cards over speculative stacks.",
      ],
    },
    {
      title: "The Math and History of FreeCell",
      excerpt:
        "From PLATO terminals to Windows desktops, FreeCell has a surprisingly rich legacy.",
      headings: [
        "Paul Alfille's PLATO Creation",
        "The Windows 3.1 Breakthrough",
        "32,000 Numbered Deals",
        "Solvability and Algorithms",
        "Why FreeCell Endures",
      ],
      body: [
        "Free Cell was invented by Paul Alfille in 1968 while he was a medical student. He implemented it on the PLATO computer network at the University of Illinois, choosing the game because its rules lent themselves to a visual layout on early vector-graphics terminals. Alfille's version used a frog metaphor in some early skins, but the card theme quickly won out.",
        "The game exploded in popularity when Microsoft programmer Jim Horne ported it to Windows 3.1 in 1992. Microsoft numbered 32,000 deals with the format FreeCell #XXXXX, and players around the world obsessed over especially difficult deals like #11982, which was later proven solvable after months of effort.",
        "These numbered deals turned Free Cell into an early internet phenomenon. Usenet groups and bulletin boards filled with strategies for hard numbers. The determinism of a numbered deal — same shuffle every time — let players share solutions and compare methods in ways that random shuffles never could.",
        "Mathematical analysis confirmed that all 32,000 Microsoft deals are solvable. Later research looked at generalization, showing that with perfect information and no draw limits, FreeCell belongs to the class of well-posed mechanical puzzles. This guarantees that every game you play has a solution waiting to be found.",
        "FreeCell endures because it offers pure skill-based gameplay. No hidden cards, no random draws, no time pressure. Just a known starting position and a set of logical moves. Solving a deal feels earned, and the moment of discovery when a trapped column finally unlocks is one of the most satisfying experiences in casual gaming.",
      ],
    },
    {
      title: "Advanced FreeCell Techniques",
      excerpt:
        "Move beyond beginner habits and start using intermediate-to-advanced techniques that solve deals faster.",
      headings: [
        "N-Sequence Moving",
        "Color Control in Tableaus",
        "The Vacant Column Prize",
        "Foundation Chaining",
        "When to Stop and Restart",
      ],
      body: [
        "An N-sequence move lets you slide N cards at once, but the number of empty cells required is smaller than beginners think. In practice, you can move N cards using only N-1 empty cells if the target column is already empty. This means that with just one empty free cell and one empty column, you can relocate a lengthy stack and completely reorganize the board.",
        "Color control means deliberately arranging tableau columns so that opposing colors alternate down each stack. Good color control keeps sequences flexible and prevents color blocks, where a column ends with only cards of a single suit and color that cannot combine with anything else.",
        "Vacant columns are worth more than any other resource in FreeCell. Some deals require two or three empty columns to create enough maneuvering room. Before you start moving casual sequences, build a mental roadmap showing where each column must end and work toward emptying them.",
        "Foundation chaining is the habit of flushing an entire suit to the foundation as soon as possible. Once you have placed the Ace through Seven of Hearts, the remaining Hearts are effectively freed because every later Heart can slot directly onto the foundation. Chaining turns a congested suit into an automatic stream.",
        "Sometimes the best move is to stop and mentally restart. If you have made twenty moves and the board feels harder than before, you may have created artifacts that hide the real solution. Notice which columns got worse, undo your recent moves if possible, or reset and apply a cleaner plan from scratch.",
      ],
    },
  ],
};
