import type { GameContent } from "../../../../../shared/types";

export const content: GameContent = {
  guide: [
    {
      heading: "Goal",
      body: "Clear the board by removing groups of 2 or more orthogonally adjacent blocks of the same color. Each cleared group scores groupSize squared, so bigger groups are dramatically better. The game ends when no group of 2+ same-colored blocks remains, and your final score is the sum of every group you removed.",
    },
    {
      heading: "How to play",
      body: "Click any block that belongs to a connected group (orthogonal only — up, down, left, right) of 2 or more same-colored blocks. The entire group disappears at once. Blocks above fall down to fill the gaps, and any column that becomes fully empty shifts left so no holes remain on the sides.",
    },
    {
      heading: "Strategy",
      body: "Larger groups score far more because of the square rule (3²=9, 5²=25, 10²=100). Clear from the bottom first to set up cascades, and avoid stranding single blocks of a unique color — a singleton can never be cleared and kills your endgame. Plan a few moves ahead to keep columns mergeable.",
    },
    {
      heading: "Example",
      body: "A 4-block red group clears for 16 points. When those blocks vanish, blocks above drop and a previously separated 5-block blue group may snap together and clear for +25. Triggering that chain reaction — group after group — is how you rack up the biggest scores on a single board.",
    },
  ],

  instructions: {
    objective:
      "Clear as much of the 10×12 board as possible by removing connected groups of 2 or more same-colored blocks, maximizing your total score before no valid moves remain.",
    desktop:
      "Use your mouse to click any block that is part of a connected orthogonal group of 2 or more same-colored blocks. The whole group vanishes instantly, blocks above fall down under gravity, and fully empty columns collapse to the left. Watch the live score counter climb as each group clears.",
    mobile:
      "Tap any block belonging to a connected group of 2 or more same-colored blocks to clear it. The group disappears, blocks drop, and empty columns slide left. The touch controls are the same as desktop — just tap the group you want to remove.",
    winning:
      "There is no traditional win screen: success is the highest score you can reach before the board has no remaining group of 2+ same-colored blocks. The goal is to maximize points through smart, large, well-timed clears.",
    losing:
      "The game ends when no group of 2 or more same-colored orthogonally adjacent blocks is left on the board. Singletons and isolated pairs you failed to set up will remain, marking the end of that playthrough.",
    tips: [
      "Build big groups before clearing — a group of 10 scores 100 points while ten isolated pairs would score only 40 total, so size wins.",
      "Clear from the bottom first so blocks above fall and reconnect into new, larger groups rather than scattering.",
      "Avoid leaving singletons: a single block of a color with no neighbor of that color can never be cleared and limits your score.",
      "Set up cascades by clearing a small group that lets bigger groups above merge once gravity pulls them together.",
      "Plan the column shifts — emptying a full column moves everything left, so aim to consolidate rather than fragment the board.",
      "Think a few moves ahead: sometimes skipping the obvious small clear preserves a color for a bigger combination later.",
    ],
  },

  faqs: [
    {
      q: "How do you play Block Blast?",
      a: "Click or tap any block that is part of a connected group of 2 or more same-colored blocks (orthogonal only). The whole group clears, blocks fall, and empty columns shift left. Keep clearing until no groups of 2+ remain.",
    },
    {
      q: "What is the scoring formula?",
      a: "You score the square of the number of blocks you clear in one group. A group of n blocks is worth n² points. So a 3-block group gives 9, a 5-block group 25, and a 10-block group 100 points.",
    },
    {
      q: "Why do bigger groups score more?",
      a: "Scoring uses groupSize squared, so points grow quadratically, not linearly. Clearing one 10-block group (100 pts) beats clearing five 2-block groups (20 pts). Size is the single biggest factor in a high score.",
    },
    {
      q: "How does gravity work after a clear?",
      a: "When a group vanishes, every block above the gap falls straight down to fill the empty space, preserving column order. Nothing moves sideways from gravity alone — only the vertical drop happens automatically.",
    },
    {
      q: "When do columns shift left?",
      a: "After gravity, any column that has become completely empty is removed and the columns to its right slide left to close the gap. This keeps the board compact with no empty columns on the sides.",
    },
    {
      q: "What ends the game?",
      a: "The game ends when there is no longer any orthogonally connected group of 2 or more same-colored blocks left on the board. Whatever singletons remain are un-clearable, and your final score is locked in.",
    },
    {
      q: "What is the best strategy to score high?",
      a: "Grow groups before clearing, clear from the bottom to trigger cascades, and avoid leaving singletons. Plan a couple of moves ahead and let gravity merge colors into bigger groups for squared-point payoffs.",
    },
    {
      q: "How is Block Blast different from match-3 games?",
      a: "Match-3 games require you to swap tiles to line up exactly three. Block Blast needs no swaps — you click whole connected groups of any size and they clear, with gravity plus leftward column collapse.",
    },
    {
      q: "Is Block Blast endless?",
      a: "No. Each board is finite (10×12), and play ends once no group of 2+ same-colored blocks exists. Your run is a single board you try to maximize, not an infinite stream of levels.",
    },
    {
      q: "How many colors are used?",
      a: "The board uses a small set of distinct block colors (typically four to six) so that adjacent same-colored groups form regularly. Fewer colors mean more frequent large groups and higher scoring potential.",
    },
    {
      q: "Can I play Block Blast on mobile?",
      a: "Yes. The game is touch-friendly: simply tap any block in a valid group to clear it. The board, gravity, and scoring behave identically to the desktop version, so it plays well on phones and tablets.",
    },
    {
      q: "What are the best tips for beginners?",
      a: "Start by spotting the largest group and clearing it, clear from the bottom to cause drops, and never strand a single block. Keep colors together so gravity can reconnect them into bigger, higher-scoring groups.",
    },
    {
      q: "What games are similar to Block Blast?",
      a: "It is in the same family as SameGame, Clickomania, and Tetris-attachment puzzles. Any game about removing connected same-colored clusters with gravity and collapse shares Block Blast's core loop.",
    },
    {
      q: "Is there a difficulty setting?",
      a: "Difficulty comes from the board's random color layout rather than selectable levels. Some boards naturally allow huge cascades; others force careful planning to avoid early singletons. Each new board is a fresh puzzle.",
    },
    {
      q: "Is Block Blast accessible?",
      a: "The game relies on color and click/tap input. Because groups are identified by color, players with color vision deficiency may find it harder; high-contrast palettes and clear block borders help, and only a single click is required per move.",
    },
    {
      q: "Can a single block ever be cleared?",
      a: "No. Only groups of 2 or more orthogonally connected same-colored blocks can be removed. A block with no matching neighbor is a singleton and will remain on the board until the game ends.",
    },
    {
      q: "Does clearing cause chain reactions?",
      a: "Yes. After a clear, gravity and column collapse can bring same-colored blocks together, forming new groups you can immediately clear. Chaining these cascades is the key to very high scores.",
    },
    {
      q: "What does the score counter show?",
      a: "The score counter shows your running total — the sum of every group you have cleared, each worth its size squared. It updates instantly after every move so you can see the impact of each clear.",
    },
    {
      q: "How big is the board?",
      a: "The board is 10 columns wide and 12 rows tall, giving 120 blocks to work with. That size is large enough for big cascades but small enough to plan a few moves ahead comfortably.",
    },
    {
      q: "Where can I learn advanced strategies?",
      a: "Our complete guide and advanced combos article cover building big groups, engineering cascades, and planning column shifts. The core idea is always the same: maximize group size and let gravity do the work.",
    },
  ],

  blog: [
    {
      title: "Block Blast — Complete Guide",
      excerpt:
        "Learn everything about Block Blast: the rules, the groupSize-squared scoring, gravity and column collapse, and the strategies that turn a small board into a high-score run.",
      headings: [
        "How Block Blast works",
        "Understanding the scoring system",
        "Gravity and column collapse",
        "What ends the game",
        "Core strategies for high scores",
      ],
      body: [
        "Block Blast is a satisfying color-clearing puzzle played on a 10×12 grid of colored blocks. Your only action is to click or tap any block that is part of a connected group of 2 or more same-colored blocks. The entire group disappears at once, and the board reshapes itself with gravity and column collapse.",
        "Scoring is the heart of the game: each group you clear is worth its size squared. A 2-block group earns 4 points, a 3-block group 9, a 5-block group 25, and a 10-block group a hefty 100. Because the reward grows quadratically, one large clear is worth far more than many tiny ones, and that single fact drives every good strategy.",
        "After a group clears, blocks above the gap fall straight down to fill it. Then any column that has become completely empty is removed and the columns to its right slide left, keeping the board compact. These two rules — vertical gravity and leftward collapse — are what create cascades and new groups.",
        "The game ends when no group of 2 or more same-colored orthogonally adjacent blocks remains. Any leftover singletons are permanent, so your final score is simply the sum of every group you managed to remove before the board stalled out.",
        "To score high, grow groups before clearing them, clear from the bottom so drops reconnect colors, and avoid stranding single blocks. Plan a move or two ahead, let gravity merge colors for you, and you will consistently turn modest boards into big, squared-point runs.",
      ],
    },
    {
      title: "Beginner Strategy: Build Big Groups",
      excerpt:
        "New to Block Blast? Discover why group size beats speed, how to grow clusters before clearing, and simple habits that immediately boost your score.",
      headings: [
        "Why size matters more than speed",
        "Grow before you clear",
        "Clear from the bottom",
        "Avoid singletons",
      ],
      body: [
        "When you first play Block Blast it is tempting to click the nearest pair and watch it pop. But because scoring is groupSize squared, a single 6-block group (36 points) beats three separate 2-block groups (12 points) combined. The fastest way to improve is to stop thinking in pairs and start thinking in clusters.",
        "Before you clear a group, look for a way to make it bigger. Sometimes leaving a color alone for a turn lets gravity drop a matching block into place, turning a 3 into a 5. Patience pays off: a few extra blocks can more than double a group's value.",
        "Clearing from the bottom is the second habit to build. When lower blocks vanish, everything above falls, and falling blocks frequently land next to same-colored neighbors. Bottom-up play manufactures the big groups that top-down play scatters.",
        "Finally, watch for singletons — a block whose color has no neighbor. Singletons can never be cleared, so whenever you can, clear in a way that keeps colors grouped rather than isolating one. Fewer singletons means a longer, higher-scoring game.",
      ],
    },
    {
      title: "Advanced Combos & Cascades",
      excerpt:
        "Take your Block Blast play to the next level with engineered cascades, planned column shifts, and the multi-move thinking that produces massive scores.",
      headings: [
        "Engineering cascades",
        "Planning column shifts",
        "Multi-move thinking",
        "When to delay a clear",
        "Measuring success",
      ],
      body: [
        "Once you master basic group building, the real skill is setting up cascades. A cascade happens when one clear causes gravity and column collapse to form a brand-new group you can immediately clear, which in turn triggers another. Chain several and a single opening move can wipe huge sections of the board.",
        "Column collapse is your secret weapon. When you empty an entire column, everything to its right shifts left, rearranging the whole right side of the board. Smart players deliberately empty columns to drag distant same-colored blocks next to each other, manufacturing groups that were impossible a moment earlier.",
        "Advanced play means thinking two or three moves ahead. Ask not just 'what does this clear score?' but 'what board does it leave?' A modest 4-block clear that sets up a 9-block clear next turn is better than a 6-block clear that strands everything around it.",
        "Sometimes the best move is no move at all on a tempting pair. Delaying a clear lets you first remove a blocker elsewhere, after which a much larger group becomes available. Resist the urge to pop the obvious small group when patience sets up something bigger.",
        "Measure your success by average points per clear and by how few singletons remain at the end. As those numbers improve, your totals climb steadily. The players at the top are not faster — they simply set up bigger, better-connected groups and let cascades do the rest.",
      ],
    },
  ],
};


