import type { GameContent } from "../../../../../shared/types";

export const content: GameContent = {
  guide: [
    {
      heading: "Objective",
      body: "Claim the most squares on the board by completing their fourth side. The grid is 4×4 dots, which forms a 3×3 arrangement of nine small boxes. Whoever paints more boxes in their color by the time every box is claimed wins the match.",
    },
    {
      heading: "How to play",
      body: "Players take turns drawing a single line between two adjacent dots by clicking the empty segment. When your line completes the fourth side of a box, you claim it in your color and immediately take another turn. If your line does not close a box, play passes to your opponent.",
    },
    {
      heading: "Strategy",
      body: "Avoid drawing the third side of any box, because that hands your opponent a free line to claim it. Think in chains: a single move can close several boxes in a row when they are already boxed in. Force your opponent to open the first box of each chain so the chain falls to you.",
    },
    {
      heading: "Example",
      body: "The 4×4 dot grid makes 3×3 = 9 boxes. When three sides of a box are already drawn, adding the last open side paints that box your color and grants a bonus turn. String several nearly complete boxes together and one clever move can sweep the whole chain at once.",
    },
  ],
  instructions: {
    objective:
      "Complete the fourth side of more boxes than your opponent on the 3×3 box grid. When every box is claimed, the player with the most boxes wins.",
    desktop:
      "Use your mouse to click any empty line segment between two adjacent dots. Completing a box claims it in your color and gives you another turn; otherwise play passes. Click New game to reset the board.",
    mobile:
      "Tap any empty line between two adjacent dots to draw it. Closing the fourth side of a box claims it and earns an extra turn; if not, the other player goes. Tap New game after the board fills to play again.",
    winning:
      "You win by claiming more squares than your opponent once all nine boxes are filled. Chaining several box completions in a single turn is the fastest route to a decisive lead.",
    losing:
      "You lose if your opponent claims more squares than you when the board is full. Careless third sides that gift free boxes are the most common cause of a loss.",
    tips: [
      "Avoid drawing the third side of a box; it lets your opponent claim it for free.",
      "Set up long chains of boxes so one turn can close many at once.",
      "Try to control the longest chain, which usually decides the winner.",
      "Sacrifice a small chain early to win the biggest chain later.",
      "Count the remaining boxes and chains to plan who is forced to open next.",
      "Use the double-cross: leave the last two boxes of a chain closed to keep your opponent opening chains for you.",
    ],
  },
  faqs: [
    {
      q: "How do you play Dots and Boxes?",
      a: "Two players take turns drawing one line between two adjacent dots. When your line completes the fourth side of a box, you claim it and take another turn. If it does not close a box, play passes. The player with the most boxes at the end wins.",
    },
    {
      q: "What are the rules of Dots and Boxes?",
      a: "On each turn a player draws a single line segment connecting two neighboring dots. Completing a box earns that box plus a bonus turn. If no box is completed, the turn passes. The game ends when every box is claimed and the highest box count wins.",
    },
    {
      q: "How are squares claimed in Dots and Boxes?",
      a: "A square is claimed when a player draws its fourth and final side. The box is immediately filled with that player's color to show ownership. Each closed box counts as one point toward that player's total score at the end of the game.",
    },
    {
      q: "Do you get an extra turn in Dots and Boxes?",
      a: "Yes. Every time your line completes a box you take another turn right away. This lets you close several boxes in a row within one turn. You keep going until you draw a line that does not complete any box, then play passes.",
    },
    {
      q: "How big is the grid in this Dots and Boxes game?",
      a: "This version uses a 4×4 grid of dots, which creates a 3×3 layout of nine small boxes. It is a compact board that plays quickly while still rewarding chain planning and the double-cross strategy that make the game deep.",
    },
    {
      q: "How do you win at Dots and Boxes?",
      a: "Claim more boxes than your opponent by the time all nine are taken. The key is controlling long chains: force your opponent to open each chain so you can sweep it, and avoid drawing third sides that give boxes away for free.",
    },
    {
      q: "What is the chain strategy in Dots and Boxes?",
      a: "A chain is a run of boxes that can be claimed in sequence with consecutive moves. Whoever is forced to open a chain usually loses it. Skilled players count chains and maneuver so their opponent must open the long ones first.",
    },
    {
      q: "What is the double-cross strategy?",
      a: "The double-cross means declining the last two boxes of a chain. Instead of taking them, you draw a line that leaves both closed for your opponent, forcing them to open the next chain. It sacrifices two boxes to keep control of the board.",
    },
    {
      q: "Who goes first in Dots and Boxes?",
      a: "Player one takes the first turn, then players alternate whenever a move fails to complete a box. Going first is a small advantage on some boards, but chain control and the double-cross matter far more than move order.",
    },
    {
      q: "Is Dots and Boxes a two-player game?",
      a: "Yes, this is a two-player, pass-and-play game on a single device. Two people share the same screen and take turns drawing lines. There is no AI opponent in this version; both players are human sitting at the same board.",
    },
    {
      q: "How is Dots and Boxes scored?",
      a: "Each completed box is worth one point to the player who drew its final side. With nine boxes on this grid, a total of nine points is available. The player holding five or more boxes when the board fills wins the game.",
    },
    {
      q: "Can there be a tie in Dots and Boxes?",
      a: "A tie needs an even number of boxes split equally. On this 3×3 board there are nine boxes, an odd number, so one player always ends with more. That means every game produces a clear winner rather than a draw.",
    },
    {
      q: "Is Dots and Boxes hard to learn?",
      a: "The basic rules take under a minute to learn, so beginners can play instantly. Mastery is harder because winning relies on chain counting, parity, and the double-cross. This gentle learning curve is why the game appeals to all ages.",
    },
    {
      q: "How do you play Dots and Boxes on mobile?",
      a: "On a phone or tablet, tap the empty line between two dots to draw it. Completing a box claims it and gives another turn, so keep tapping. Pass the device between players and tap New game to start a fresh board.",
    },
    {
      q: "Who invented Dots and Boxes?",
      a: "The game was first described by the French mathematician Édouard Lucas in 1889, where he called it la pipopipette. It has since become a worldwide pencil-and-paper classic played by children and studied by mathematicians alike.",
    },
    {
      q: "Is Dots and Boxes educational?",
      a: "Yes. It teaches planning, counting, and consequence thinking as players learn to avoid giving boxes away. The advanced chain and parity ideas connect to combinatorial game theory, making it a favorite teaching example in mathematics classes.",
    },
    {
      q: "What games are similar to Dots and Boxes?",
      a: "It sits alongside other pencil-and-paper strategy games like Tic Tac Toe, Nim, Sprouts, and Hex. All are quick to learn and reward planning ahead. Dots and Boxes stands out for its chain control and sacrifice tactics.",
    },
    {
      q: "Is this Dots and Boxes game accessible?",
      a: "The game uses large clickable line segments and clear color fills to show box ownership, making moves easy to see and tap. It works in any modern browser on desktop and mobile without installation or sign-in.",
    },
    {
      q: "Why does completing a box give another turn?",
      a: "The bonus turn rewards you for closing boxes and creates the chain dynamic that gives the game its depth. Without it, the game would be far simpler. The extra turn is what lets one clever move sweep an entire chain.",
    },
    {
      q: "What is the biggest beginner mistake in Dots and Boxes?",
      a: "Grabbing every box you can as soon as it is available. Taking short chains greedily often forces you to open a long chain for your opponent next. Learning to sacrifice a few boxes with the double-cross is the biggest leap in skill.",
    },
  ],
  blog: [
    {
      title: "Dots and Boxes — Complete Guide",
      excerpt:
        "Learn the rules, scoring, and flow of Dots and Boxes, the classic pencil-and-paper game of claiming squares.",
      headings: [
        "What Is Dots and Boxes",
        "The Board and Setup",
        "How Turns and Extra Moves Work",
        "How the Game Ends",
        "Why It Stays Fun",
      ],
      body: [
        "Dots and Boxes is a two-player strategy game played on a grid of dots. Players take turns connecting adjacent dots with single line segments, and the goal is simple to state but tricky to master: claim more boxes than your opponent by completing their fourth sides. This version uses a 4×4 dot grid, forming a 3×3 layout of nine boxes.",
        "Setting up is effortless. The board is just an array of dots with no lines drawn between them. Player one moves first, and the two players alternate. Because the board starts empty, the opening moves feel safe, but every line you draw slowly shapes the chains that will decide the endgame.",
        "The rule that makes the game special is the bonus turn. Whenever your line completes the fourth side of a box, you claim that box in your color and immediately move again. That means a well-timed move can close several boxes in a row. If your line does not complete a box, your turn ends and play passes to your opponent.",
        "The game ends when every box has been claimed. Since this board has nine boxes, an odd number, there is always a clear winner: the player holding five or more boxes. Each box is worth one point, and the running colors on the board make it easy to see who is ahead at a glance.",
        "What keeps Dots and Boxes fun is the tension between grabbing boxes now and keeping control for later. Early on it looks like a harmless doodling game, but experienced players know that chains, parity, and sacrifice decide the result. That blend of instant accessibility and hidden depth is why it has endured for well over a century.",
      ],
    },
    {
      title: "Beginner Strategy to Win at Dots and Boxes",
      excerpt:
        "Simple habits that stop you from giving away boxes and help new players win their first matches.",
      headings: [
        "Do Not Draw the Third Side",
        "Recognize Safe Moves",
        "Think in Chains",
        "Let Your Opponent Open First",
        "Practice Counting Boxes",
      ],
      body: [
        "The single most important beginner lesson is to avoid drawing the third side of any box. When a box has two sides, adding a third leaves it one line from completion, and your opponent will happily draw that fourth side to claim it for free. Scan every box before you move to make sure you are not setting one up for the other player.",
        "A safe move is a line that leaves no box with three sides. Early in the game there are many safe moves, so spend them wisely. As the board fills, safe moves run out, and eventually someone must be the first to draw a third side. Managing when that happens is the heart of beginner strategy.",
        "Start thinking of the board as a collection of chains rather than single boxes. A chain is a run of boxes that can be claimed one after another because they share open sides. Whoever is forced to open a chain usually gives it entirely to their opponent, so the length and number of chains matter more than any one box.",
        "Because opening a chain is costly, your aim is to make your opponent do it first. Play all your safe moves, then force the other player into a position where their only options open a chain for you. This idea, called controlling the parity of the game, is what separates players who win from players who simply react.",
        "Finally, get in the habit of counting. Count the boxes you have, the boxes still open, and the length of each chain. With a little practice you will start to see, several moves ahead, who will be forced to open the big chain. That foresight is the difference between guessing and playing with a plan.",
      ],
    },
    {
      title: "Advanced Chain Strategy and Common Mistakes",
      excerpt:
        "Master the double-cross, chain parity, and the errors that cost skilled players their winning positions.",
      headings: [
        "Understanding Chain Control",
        "The Double-Cross Technique",
        "Parity and Who Opens First",
        "Sacrificing to Win Big",
        "Mistakes That Lose Games",
      ],
      body: [
        "At a high level, Dots and Boxes is a battle for chain control. The player who forces their opponent to open the long chains almost always wins. Once the safe moves are gone, the game becomes a sequence of forced openings, and the player who planned the chain structure earlier reaps the rewards in the endgame.",
        "The signature advanced tactic is the double-cross. Instead of greedily taking every box in a chain, you take all but the last two, then draw a line that hands those two boxes to your opponent. In return, your opponent is forced to open the next chain for you. Sacrificing two boxes to keep control is often worth far more than the boxes given up.",
        "Parity is the mathematical backbone of the game. On many boards the number of starting dots and long chains determines which player should be forced to open first if both play perfectly. Counting chains and understanding this parity lets strong players steer the game toward a winning structure long before the boxes are actually claimed.",
        "Sacrifice is a skill, not a mistake, when done deliberately. Giving away a short two-box chain early can force your opponent to open the decisive long chain later. The best players constantly weigh the boxes they surrender now against the larger chains they will capture in return, turning apparent generosity into a winning plan.",
        "The most common advanced mistakes are greed and miscounting. Taking every available box without using the double-cross often surrenders control and hands the opponent the last big chain. Miscounting chain length or parity leads to opening a chain you could have avoided. Discipline, careful counting, and patience are what convert a good position into a win.",
      ],
    },
  ],
};


