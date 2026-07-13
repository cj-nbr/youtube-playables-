import type { GameContent } from "../../../shared/types";

export const content: GameContent = {
  guide: [
    {
      heading: "Goal",
      body: "Capture every enemy piece or block your opponent so they cannot move. A standard checkers match starts with 12 pieces per side on an 8×8 board. When all of your opponent's pieces are gone, or when they have no legal moves, you win the game.",
    },
    {
      heading: "How to play",
      body: "Select one of your dark pieces and click a diagonal forward square to move it. If an enemy piece sits one diagonal ahead and the square beyond it is empty, you must jump over it, capturing that piece. If a jump is available anywhere on the board, you are required to take it.",
    },
    {
      heading: "Kings",
      body: "When a piece reaches the far side of the board it is crowned king and can now move and capture diagonally both forward and backward. The king gains a visual crown and becomes much more powerful, because it controls both directions where a regular piece only moves forward.",
    },
    {
      heading: "Example",
      body: "A dark piece on row 2, column 3 can step to row 3, column 2 or row 3, column 4. If a light piece sits at row 3, column 2 and row 4, column 1 is empty, the dark piece jumps forward-left, removes the light piece, and may stop there or continue jumping if another capture is available.",
    },
  ],
  instructions: {
    objective:
      "Capture all opponent pieces or leave them with no legal moves. Red captures Black pieces by diagonal jumps; Black captures Red on its turn.",
    desktop:
      "Click a piece of your color to select it; valid destination squares are highlighted. Click a highlighted square to move or jump. If multiple jumps are possible in the same turn, the game prompts you to continue jumping. Pass the device to your opponent after each full turn.",
    mobile:
      "Tap one of your pieces to select it; legal squares light up. Tap a highlighted square to move or jump. Multi-jumps also continue automatically within the same turn. After your turn, pass the device to the other player.",
    winning:
      "You win when every enemy piece has been captured, or when the opponent has zero legal moves despite still having pieces on the board. The scoreboard shows your total captures and your opponent's remaining pieces.",
    losing:
      "You lose when the opponent captures all your pieces, or when you have no legal move left on your turn. Always watch for forced jump sequences and keep enough pieces behind to block your opponent.",
    tips: [
      "Always take a jump when one is available; checks are mandatory in modern play.",
      "Control the center of the board to keep more open diagonal routes for future jumps.",
      "Trade pieces when you are ahead so your numerical advantage grows.",
      "Build a back rank of pieces to protect your kings and make jumps risky for your opponent.",
      "Crown your pieces as fast as possible; kings backward movement is a huge advantage.",
      "Plan two jumps ahead when you can chain captures into enemy territory.",
    ],
  },
  faqs: [
    {
      q: "How do you play Checkers?",
      a: "Select one of your pieces and click or tap a diagonal forward square to move it. Jump over an adjacent enemy piece to capture it and remove it from the board. Crown pieces that reach the far side to make them kings. Take turns with an opponent until one side has no pieces or no legal moves.",
    },
    {
      q: "What are the basic rules of Checkers?",
      a: "The board is 8×8. Each side starts with 12 pieces on the dark squares of the first three rows. Pieces move diagonally forward one square, or jump diagonally forward over an enemy piece onto an empty square beyond it. Jumps are mandatory. Kings that reach the opposite end may now also move backward.",
    },
    {
      q: "How do captures work in Checkers?",
      a: "A capture happens when a piece leaps diagonally over an adjacent enemy piece onto the empty square beyond it. The jumped piece is removed immediately. If any jump is available on your turn, you must take it. Multiple captures in one turn are allowed when they continue diagonally.",
    },
    {
      q: "What is a king in Checkers?",
      a: "A piece becomes a king when it reaches the opposite end of the board. Kings can move and capture diagonally both forward and backward, where normal pieces only move forward. A crowned king gains a visual indicator and dramatically increases your mobility.",
    },
    {
      q: "Are jumps mandatory in Checkers?",
      a: "Yes. If a jump is available anywhere on the board, you must take it. If multiple jumps are available, you may choose which one to use. This rule prevents players from avoiding captures and keeps the game aggressive.",
    },
    {
      q: "How do you win at Checkers?",
      a: "You win by capturing every enemy piece, or by leaving the opponent with zero legal moves. In tournament play, a draw can also be declared if neither side can force a win, but in this casual version the game ends when one player has no legal moves left.",
    },
    {
      q: "What is a multi-capture in Checkers?",
      a: "A multi-capture happens when a jump lands on a square where another jump is immediately available and the piece must continue jumping. Each jump removes one enemy piece, and the turn ends when no further jumps remain from the current position.",
    },
    {
      q: "Can kings move backward in Checkers?",
      a: "Yes. Crowned kings move and capture diagonally both forward and backward, giving them much wider control of the board. That is why it is important to crown pieces early and protect the ones that do.",
    },
    {
      q: "Is Checkers a two-player game?",
      a: "Yes. This version is a local two-player game played on the same device. Take turns clicking or tapping moves after handing the device to your opponent. There is no solo or computer mode here.",
    },
    {
      q: "How does the scoring work in Checkers?",
      a: "Each captured enemy piece counts toward your score. The in-game tracker shows captures for Red and Black so you can compare progress across the match. A perfect game ends with a score of 12 captures and zero losses.",
    },
    {
      q: "What happens if I have no legal moves?",
      a: "If it is your turn and you have no legal moves, you lose. This happens when all your pieces are blocked or eliminated. Plan jumps and retreats carefully to avoid getting trapped early.",
    },
    {
      q: "Does Checkers have a timer?",
      a: "No. This Checkers game does not impose a turn timer or match clock. Take as long as you need to plan your jumps and coordinate your pieces. The focus is on strategy, not speed.",
    },
    {
      q: "Can you play Checkers on mobile?",
      a: "Yes. The board is fully responsive, with large tap targets for pieces and destination squares. Tap a piece to select it, then tap a highlighted square to complete your move or jump. Pass the device to your opponent after each turn.",
    },
    {
      q: "Is Checkers suitable for kids?",
      a: "Yes. The rules are simple enough for younger players to learn, yet the game still rewards planning and foresight. The visual highlights make legal moves obvious, and the mandatory jump rule teaches strategic thinking through repeated play.",
    },
    {
      q: "What are the best opening strategies in Checkers?",
      a: "Move your front-row pieces forward to claim diagonal routes early. Avoid leaving pieces isolated on the edges, since edge pieces have fewer capture options. Trade pieces when you have the advantage, and aim to crown a king as your first priority.",
    },
    {
      q: "Why do some pieces have crowns?",
      a: "A crown marks a piece that has reached the opposite end of the board and become a king. Crown pieces gain backward movement and can move in both diagonal directions, making them the backbone of a winning endgame.",
    },
    {
      q: "Does Checkers have a draw condition?",
      a: "In this simplified browser version, the game ends when one player has no pieces or no legal moves. Formal tournament rule repetitions are not tracked here. Focus on making jumps and forcing tight positions rather than repetition.",
    },
    {
      q: "How can I improve at Checkers?",
      a: "Study mandatory jumps, practice chaining multi-captures, and learn to sacrifice a piece when it opens a larger jump sequence. Review which remaining pieces control the most diagonal lines, and always count how many enemy pieces are still on the board.",
    },
    {
      q: "What is the difference between Checkers and Chess?",
      a: "Checkers has no hierarchy of pieces other than kings, uses only diagonal movement, and ends sooner because captures are frequent. Chess has distinct piece types, castling, check, and checkmate. Both are excellent strategy games but Checkers is simpler to learn.",
    },
    {
      q: "Are there different checkers variants?",
      a: "Yes. International draughts uses 10×10 boards, Canadian checkers is also 12×12, and some regions allow men to capture both forward and backward. This version follows standard US 8×8 rules where men capture forward only and kings gain backward motion.",
    },
  ],
  blog: [
    {
      title: "Checkers — Complete Strategy Guide",
      excerpt:
        "Master the classic 8×8 board game with jumps, kings, and forced captures. Learn rules, tactics, and winning strategies.",
      headings: [
        "What Is Checkers",
        "Board Setup and Piece Movement",
        "Jumps, Kings, and Multi-Captures",
        "Winning and Losing",
        "How to Get Good Fast",
      ],
      body: [
        "Checkers is a two-player strategy game played on an 8×8 board. Each side begins with 12 pieces arranged on the dark squares of the first three rows. The goal is to capture every enemy piece or leave your opponent without a legal move. Simple to learn, deep to master.",
        "Pieces move only diagonally forward on the dark squares. Regular pieces cannot move backward, but they can jump diagonally forward over an adjacent enemy piece to land on the empty square beyond it, removing the enemy piece from the board. A turn ends after a single step or after all required jumps are completed.",
        "When a piece reaches the opposite end of the board, it is crowned king. Kings can move and capture in any diagonal direction, making them far more mobile. Multi-captures occur when a jump lands on a square where another jump is available; the piece must continue jumping until no more captures remain.",
        "The game ends when one player has no pieces left, or when that player has no legal moves despite still having pieces on the board. In tournament play a draw can be declared through repetition, but in this version the match stops as soon as a player is stuck.",
        "New players improve fastest by memorizing that jumps are mandatory and always looking for chains. Control the center early, trade when you are ahead, and protect your back rank. Crown a king as soon as it is safe, then use that king to attack both forward and backward.",
      ],
    },
    {
      title: "Mastering Jumps and Multi-Captures",
      excerpt:
        "Forced captures, multi-jump chains, and back-rank defense are the cornerstones of checkers mastery.",
      headings: [
        "Why Jumps Are Mandatory",
        "Reading the Board for Chains",
        "King Advantage",
        "Defensive Piece Chains",
        "Common Tactical Traps",
      ],
      body: [
        "Jumps are mandatory in American checkers, meaning if you have any capture available anywhere on the board you must take it. This rule prevents passive play and forces you to engage your opponent directly. Always scan the entire board before moving to make sure you are not missing a jump.",
        "Multi-captures are where games are won or lost. When you start a jump chain, look beyond the first capture to the square it lands on and ask whether another enemy piece sits diagonally beyond it. Chaining three or four captures in one turn often decides the match because it removes more pieces than your opponent can respond to.",
        "Kings change everything. A crowned king can attack and retreat in either diagonal direction, so a sequence of kings on the board creates dense capture webs your opponent cannot avoid. Aim to crown at least one king before the opponent does, and never leave an enemy king on an open diagonal if you can block it.",
        "Defensive piece chains are pieces stacked along the same diagonal such that jumping one would expose the next. Create these near your king or home row so your opponent must choose between two dangerous captures rather than a free win.",
        "Beginners often trap themselves by moving pieces too close to the edge early. Edge pieces have only one or two diagonal directions, which makes them easy to block. Avoid stacking along the rim, and always keep at least one piece between your lines and the center so you maintain escape routes.",
      ],
    },
    {
      title: "Checkers vs. Other Board Games",
      excerpt:
        "How checkers compares to chess, Go, and backgammon, and why it remains a great first strategy game.",
      headings: [
        "Simplicity Meets Depth",
        "Skill Transfer Between Games",
        "Perfect for Casual Play",
        "Educational Benefits",
        "Modern Checkers and Esports",
      ],
      body: [
        "Checkers sits at the sweet spot between simple rules and deep tactics. Unlike chess, there are no piece hierarchies beyond kings, so new players can focus entirely on captures and board geometry. Unlike Go, the small 8×8 board means each piece is valuable and every mistake is immediately visible, making the feedback loop fast.",
        "Skills learned in checkers directly benefit chess and backgammon. Pattern recognition, forced-line reading, and the habit of scanning for mandatory captures translate into finding checks, pinned pieces, and cube decisions elsewhere. Many tournament players start on checkers because it teaches cause and effect so clearly.",
        "Because a checkers match usually lasts under twenty minutes, it works well for casual travel play, classroom moments, and quick breaks between work or study. The rules are stable enough that a single set of physical pieces or a digital board serves for years of practice.",
        "Research shows that playing abstract strategy games like checkers improves working memory, logical reasoning, and planning skills in children and adults alike. The mandatory jump rule trains attention to detail, while multi-capture chains demand the kind of foresight that benefits math and science problem solving.",
        "Checkers has a vibrant competitive scene, especially international draughts on 10×10 boards. Computer programs have solved the 8×8 endgame tables, which means modern players study known positions to squeeze out tiny advantages. Even at a casual level, knowing those positions helps you avoid losing a won game.",
      ],
    },
  ],
};
