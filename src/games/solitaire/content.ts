import type { GameContent } from "../../../shared/types";

export const content: GameContent = {
  guide: [
    {
      heading: "Goal",
      body: "Clear the entire tableau by moving every card into one of four foundation piles, one per suit, built from Ace up to King. Stock and waste give you new options when you run out of moves.",
    },
    {
      heading: "How to play",
      body: "Click a card to select it, then click a valid destination to move it. Build tableau columns downward in alternating red and black. Build foundations upward starting with the Ace of each suit. Draw from the stock when no moves remain.",
    },
    {
      heading: "Strategy",
      body: "Reveal face-down cards early by moving visible cards onto them. Keep foundations moving whenever possible. Empty tableau columns are powerful — use them to stack long alternating sequences.",
    },
    {
      heading: "Example",
      body: "If the foundation already has the Ace and Two of Hearts, you can move the Three of Hearts there. If a tableau column ends with a red Seven, you can place a black Six on top, then a red Five, and so on.",
    },
  ],
  instructions: {
    objective:
      "Move all 52 cards into the four foundation piles, one suit per pile, from Ace through King.",
    desktop:
      "Click a card to select it, then click a valid destination. Valid tableau moves place a card on a column whose top card is one rank higher and the opposite color. Valid foundation moves place a card on a pile one rank higher of the same suit. Click the stock to draw one or three cards depending on difficulty.",
    mobile:
      "Tap a card to select it, then tap a destination. The same rules apply as desktop: alternate colors in the tableau, build up by suit in foundations. The board is fully touch-friendly and resizes to fit your screen.",
    winning:
      "You win when all four foundation piles contain all 13 cards of each suit (Ace through King). Your score reflects the number of moves and how much time you used.",
    losing:
      "You lose only if you decide to give up — the game does not time out. However, if no legal moves exist and the stock is empty, the game is stuck. Use the reset button to start fresh.",
    tips: [
      "Always move Aces and Deuces to the foundation as soon as they become available.",
      "Empty tableau columns create valuable space for stacking long sequences.",
      "Reveal face-down tableau cards early — they are the key to unlocking hidden moves.",
      "Build foundations evenly across suits rather than piling up a single suit.",
      "Draw from the stock sparingly; cycles through the waste pile do not refill the stock.",
      "Plan longer tableau sequences before committing — a wrong move can trap cards.",
      "Use the reset button when you are truly stuck rather than forcing a bad move.",
    ],
  },
  faqs: [
    {
      q: "What are the rules of Klondike Solitaire?",
      a: "Klondike uses a standard 52-card deck. You deal seven tableau columns with 1 to 7 cards, only the top card face up. You have a stock pile that feeds a waste pile, and four empty foundation slots. Tableau piles build down in alternating color. Foundations build up by suit starting from Ace. The goal is to move all cards to the foundations.",
    },
    {
      q: "How do you win at Solitaire?",
      a: "Win by moving every card into the four foundation piles, one per suit, in order from Ace to King. The game is won when all 52 cards sit in the foundations. Speed and efficiency earn you a higher score.",
    },
    {
      q: "Can you move multiple cards at once?",
      a: "Yes. If you have a valid sequence in a tableau column — descending rank with alternating colors — you can move the whole stack onto a new column, provided the new column's top card continues the sequence.",
    },
    {
      q: "What happens when the stock runs out?",
      a: "When the stock is empty, you may turn the waste pile over and reuse it as a new stock when rules allow. In this implementation, the stock refills from the waste once when depleted, giving you access to previously drawn cards.",
    },
    {
      q: "Why are empty tableau columns important?",
      a: "Empty columns accept any King or sequence starting with a King. They act as powerful staging areas that let you reorganize long stacks and reveal more face-down cards.",
    },
    {
      q: "Can I play with one or three cards drawn at a time?",
      a: "This version uses a single-card draw for the most playable balance. One-card draw gives you more control and higher winning odds, while three-card draw increases challenge and strategy depth.",
    },
    {
      q: "Is Solitaire always winnable?",
      a: "Not every deal is winnable. Skilled players estimate that roughly 20 to 30 percent of Klondike deals are mathematically solvable, depending on draw rules and play style. Use the reset button to try a new shuffle when stuck.",
    },
    {
      q: "What does 'alternating color' mean?",
      a: "Red and black alternate in every tableau pile. A red Seven can accept a black Six on top, which can accept a red Five, and so on. Diamonds and Hearts are red; Clubs and Spades are black.",
    },
    {
      q: "Do Aces have to go to foundations immediately?",
      a: "No, but moving Aces to foundations early is almost always the best move. Foundations only grow upward, so an Ace at the bottom of a tableau has nowhere to go.",
    },
    {
      q: "How is scoring calculated?",
      a: "Points are awarded for cards moved to foundations and for revealing face-down tableau cards. Moving cards back out of foundations costs points, so avoid unnecessary reordering once a card is home.",
    },
    {
      q: "Can I undo moves?",
      a: "This version does not include an undo button. Plan carefully and use the reset button if the board becomes unsolvable due to poor play.",
    },
    {
      q: "Is there a timer?",
      a: "No. The game tracks time for informational scoring but does not penalize you for thinking. Take your time to evaluate options and build sequences deliberately.",
    },
    {
      q: "What is the difference between Klondike and other Solitaire games?",
      a: "Klondike is the most familiar Solitaire variant, often called just 'Solitaire.' Other variants like Spider, FreeCell, and Pyramid use different layouts and rules. Klondike is defined by seven tableau columns and four single-card foundations.",
    },
    {
      q: "Can I play Solitaire offline?",
      a: "Yes. Once the page is loaded, the game runs entirely in your browser with no server required. You can refresh or close the tab and return anytime to play again.",
    },
    {
      q: "Why did my game get stuck?",
      a: "A deal becomes stuck when no legal moves exist and no cards remain in the stock. This usually means either an unlucky shuffle or an earlier suboptimal move forced a dead end. Simply reset to start a new deal.",
    },
  ],
  blog: [
    {
      title: "Klondike Solitaire — Complete Rules and Strategy Guide",
      excerpt:
        "Master the classic Klondike deal with step-by-step tactics, tableau management, and foundation tips.",
      headings: [
        "The Classic Klondike Setup",
        "Tableau and Foundation Basics",
        "First-Move Priorities",
        "Building Long Sequences",
        "When to Draw from the Stock",
      ],
      body: [
        "Klondike Solitaire is the default Solitaire experience for millions of players. A standard deck is shuffled and dealt into seven tableau columns, the first with one card, the seventh with seven. Only the top card of each column is face up. A separate stock pile and waste pile feed you new cards, while four empty foundation slots wait for each suit's Ace.",
        "The core rules are simple but powerful. Tableau columns build downward by alternating red and black, so a red Seven can accept a black Six. Foundations build upward by suit, starting from Ace. When the stock is exhausted and no moves remain, the deal is over. Your job is to move every card to the foundations before the board locks.",
        "The best first move is always to locate and play any Aces or Deuces straight to the foundations. Opening a foundation slot early turns the Ace into a long-term anchor and immediately unblocks any cards stacked above it in the tableau. Never delay an obvious foundation play for a smaller gain.",
        "Long tableau sequences are your most flexible tool. Try to create alternating color stacks so you can move them as units to other columns. Empty columns are especially valuable because any King can fill them, instantly revealing a face-down card underneath and giving you fresh options.",
        "Draw from the stock only when no tableau or foundation moves exist. Each pass through the stock refreshes your options, but cycling through the waste without a plan merely delays meaningful decisions. Be selective, and always check for hidden face-down cards before drawing.",
      ],
    },
    {
      title: "How to Increase Your Solitaire Win Rate",
      excerpt:
        "Practical habits that turn near-unwinnable deals into victorious finishes more often.",
      headings: [
        "Reveal Before You Build",
        "Balance Your Foundations",
        "Keep Empty Columns in Reserve",
        "Avoid Premature Sequence Building",
        "Reset Gently, Not Frustrated",
      ],
      body: [
        "The single habit that separates advanced players from beginners is revealing face-down cards before anything else. Every face-down card turned over is a new piece of information that can unlock a winning path. Move visible cards off columns to expose hidden cards rather than casually building foundations.",
        "Build foundations in balance across all four suits. If you pile up Hearts while Clubs and Diamonds stall, you narrow your options for later moves. A perfectly distributed foundation set keeps tableau columns more fluid and prevents color lockups.",
        "Empty columns are more valuable than any single long sequence. Try to keep at least one empty slot open whenever possible by sacrificing a small sequence now for a bigger reorganization later. Kings love empty columns, and a well-placed King can reveal a buried card instantly.",
        "Beginners often build long sequences in one column just because they can. Resist this urge. Untetable sequences become fragile — if the card below them gets trapped, the whole stack is lost. Build only what you can move again if conditions change.",
        "If a deal becomes truly stuck, reset without frustration. A bad shuffle is not a failure of skill. Treat every new deal as a blank board and apply your best opening habits from the first click. Consistent habits beat lucky guesses in the long run.",
      ],
    },
    {
      title: "The History and Math Behind Klondike",
      excerpt:
        "Discover where Klondike came from, why it became the default Solitaire, and what probability says about winning odds.",
      headings: [
        "Origins in the Klondike Gold Rush",
        "From Percy to Microsoft",
        "Mathematics of the Deal",
        "Solvable vs Unsolvable Deals",
        "Why We Keep Playing",
      ],
      body: [
        "Klondike Solitaire was named after the Klondike region of Canada during the gold rush era of the late 1800s. The game likely originated as a pastime for prospectors waiting in remote camps, and its name evokes the rugged luck and strategy of the chase. Early rules were informal, varying from camp to camp, until publishers began standardizing them in the twentieth century.",
        "Solitaire became a global phenomenon after Microsoft included a digital version with every copy of Windows 3.0 in 1990. The implementation by Wes Cherry, later refined by Microsoft designer Susan Kare, turned Solitaire into one of the most-played computer games in history. It introduced a generation to card games and set the template for casual digital gaming.",
        "Mathematicians and computer scientists have analyzed Klondike's state space extensively. With 52! possible shuffles, the game tree is astronomically large. Early estimates suggested only a fraction of deals are solvable, though more recent algorithmic approaches show that optimal play can solve a surprisingly high percentage of hands when draw rules are favorable.",
        "The difference between solvable and unsolvable deals often comes down to card placement and draw count. One-card draw variants are easier to solve because players can cycle through the waste repeatedly. Three-card draw locks choices behind randomness, making many deals impossible even with perfect strategy.",
        "We keep playing Klondike because it blends luck, skill, and pacing in a way that feels rewarding even on losing deals. The familiar rules create a comforting loop, while the search for the perfect sequence and foundation build engages the mind. It is simple enough for a break but deep enough to study for a lifetime.",
      ],
    },
  ],
};
