import type { GameContent } from "../../../shared/types";

export const content: GameContent = {
  guide: [
    {
      heading: "Objective",
      body: "Checkmate the opponent's king. A king is in checkmate when it is under attack (in check) and has no legal move that removes the threat. The first player to deliver checkmate wins the game. If neither side can force a win, the game may end in a draw.",
    },
    {
      heading: "How to play",
      body: "Click a piece to select it; the board highlights every square it can legally move to. Click one of those highlighted squares to move. Turns alternate between White and Black automatically. The game ends when checkmate, stalemate, or another draw condition is detected.",
    },
    {
      heading: "Piece rules",
      body: "Pawns move one square forward (two on their first move) and capture diagonally. Knights move in an L-shape and can jump over pieces. Bishops move any distance along diagonals. Rooks move any distance along ranks and files. Queens combine bishop and rook movement. Kings move one square in any direction. Note: castling and en passant are NOT available in this lightweight version.",
    },
    {
      heading: "Example",
      body: "A White pawn on e2 can advance to e3 or e4 on its first move. A Black pawn on e7 can capture diagonally onto d6 or f6 if an enemy piece sits there. A rook on a1 controls the entire a-file and the first rank, making it a powerful piece for open lines.",
    },
  ],
  instructions: {
    objective:
      "Checkmate the opponent's king. You win when the enemy king is in check and has no legal escape.",
    desktop:
      "Use your mouse to click a piece to select it; valid move squares are highlighted. Click a highlighted square to move. Turns alternate White and Black. This is a local two-player pass-and-play game, so hand the device to your opponent after each move.",
    mobile:
      "Tap a piece to select it; legal destination squares are highlighted. Tap a highlighted square to move. Turns alternate automatically between White and Black. Pass the device to the other player after each move in this two-player pass-and-play version.",
    winning:
      "You win the moment you checkmate your opponent's king — when it is under attack and cannot move, capture the attacker, or block the threat.",
    losing:
      "You lose if your own king is checkmated, meaning it is in check with no legal move available. Play carefully to keep escape squares open.",
    tips: [
      "Control the center (e4, d4, e5, d5) with pawns and pieces early.",
      "Develop your knights and bishops before moving the queen or rooks.",
      "Keep your king safe; trade pieces to reduce attacking threats.",
      "Think one or two moves ahead and watch for your opponent's threats.",
      "Use the highlighted move squares to spot legal captures and escapes.",
      "Learn to recognize check versus checkmate so you never miss a win or a loss.",
    ],
  },
  faqs: [
    {
      q: "How do you play Chess?",
      a: "Click a piece to select it; every legal destination square is highlighted. Click a highlighted square to move. Turns alternate White then Black until one side is checkmated or the game is drawn. This version is a local two-player game played on the same device.",
    },
    {
      q: "What are the basic rules of Chess?",
      a: "Each side starts with 16 pieces and aims to checkmate the enemy king. Pieces move in distinct patterns, turns alternate, and you may never leave your own king in check. The game ends in checkmate, stalemate, or another draw. Castling and en passant are not included here.",
    },
    {
      q: "How does the pawn move in Chess?",
      a: "A pawn moves one square straight forward. On its very first move it may advance two squares. Pawns capture diagonally rather than forward, and they cannot move backward. Promotion is not part of this lightweight version.",
    },
    {
      q: "How does the knight move in Chess?",
      a: "The knight moves in an L-shape: two squares in one direction, then one square perpendicular. It is the only piece that can jump over others. Knights are strongest near the center, where they can reach up to eight squares.",
    },
    {
      q: "How does the bishop move in Chess?",
      a: "A bishop slides any number of squares along diagonals. Because it stays on one color, each side's two bishops cover opposite-colored squares. Bishops are powerful on open diagonals once pawns have moved out of the way.",
    },
    {
      q: "How does the rook move in Chess?",
      a: "A rook moves any distance along ranks (rows) and files (columns). Rooks are strong on open lines and in the endgame. Two rooks on the same rank or file can easily trap an enemy king along that line.",
    },
    {
      q: "How does the queen move in Chess?",
      a: "The queen combines the rook and bishop: it moves any number of squares in any straight or diagonal direction. As the most powerful piece, it should be developed carefully so it is not lost to a cheap capture early on.",
    },
    {
      q: "How does the king move in Chess?",
      a: "The king moves one square in any direction. It may never move into check. Protecting the king is the top priority, since losing it to checkmate ends the game. In this version castling to shelter the king is not available.",
    },
    {
      q: "How do you move pieces in this Chess game?",
      a: "Select a piece with a click or tap; the board lights up its legal squares. Choose a highlighted square to complete the move. Illegal squares stay unmarked, so you always see your real options before committing.",
    },
    {
      q: "What does check mean in Chess?",
      a: "Check means a king is under immediate attack by an enemy piece. The player in check must respond on their turn by moving the king, capturing the attacker, or blocking the threat. Failing to remove check is not a legal move.",
    },
    {
      q: "What is checkmate in Chess?",
      a: "Checkmate is a position where the king is in check and cannot escape: no legal king move, no capture of the attacker, and no block works. The player who delivers checkmate wins. The game ends the instant checkmate appears on the board.",
    },
    {
      q: "What is stalemate in Chess?",
      a: "Stalemate occurs when the side to move has no legal move but is not in check. The game ends as a draw. Unlike checkmate, stalemate is not a loss; forcing it is a useful defensive escape when you are behind.",
    },
    {
      q: "Who moves first in Chess?",
      a: "White always moves first, then players alternate. The first-move advantage is small but real, so many openings begin with a central pawn advance like e4 or d4 to claim space and develop quickly.",
    },
    {
      q: "Is this Chess game against a computer?",
      a: "No. This is a two-player local game played on the same device. One person plays White, the other plays Black, and you pass the device (or take turns at the same screen) after each move. There is no AI opponent.",
    },
    {
      q: "Does this Chess version have castling?",
      a: "No. Castling is not implemented in this lightweight version. The king moves only one square at a time, and rooks cannot jump to the king's side in a single move. Play the king out manually if you need to tuck it into safety.",
    },
    {
      q: "Does en passant work in this Chess game?",
      a: "No. En passant pawn captures are not available here. Pawns capture only the diagonally adjacent squares in the normal way. This keeps the ruleset simple for a quick, accessible casual match.",
    },
    {
      q: "How do you win at Chess?",
      a: "You win by checkmating the opponent's king so it cannot escape capture. Build threats, win material, and coordinate your pieces toward the enemy king. A single careless move can turn a winning position into a loss.",
    },
    {
      q: "What are good opening tips for beginners?",
      a: "Control the center with e4 or d4, develop knights and bishops early, castle your king to safety, and connect your rooks. Avoid moving the queen out too soon, and try not to move the same piece repeatedly in the opening.",
    },
    {
      q: "How do the move highlights help in this Chess game?",
      a: "After you select a piece, the game shows only squares you can legally reach, including captures. This removes guesswork, helps beginners learn piece movement, and prevents illegal moves like leaving your king in check.",
    },
    {
      q: "Is there a difficulty setting in this Chess game?",
      a: "No single-player difficulty exists because there is no AI. Difficulty comes from your human opponent. The pass-and-play format lets players of any skill level face each other on equal terms using the standard ruleset.",
    },
    {
      q: "Can you play this Chess game on mobile?",
      a: "Yes. The board is touch-friendly: tap a piece to select it and tap a highlighted square to move. Turn the device or pass it to your opponent after each move. It runs in any modern mobile browser without an app.",
    },
    {
      q: "Is this Chess game accessible?",
      a: "Selection and move highlights make legal moves visible at a glance, helping new and visually assisted players. Large tap targets suit touch screens. For full screen-reader play, pair the clear board layout with descriptive assistance from a helper.",
    },
    {
      q: "What is chess notation and why learn it?",
      a: "Algebraic notation labels files a-h and ranks 1-8, so a move like Nf3 names the piece and destination. Learning it lets you read books, study games, and record your own matches. Even basics help you follow strategies discussed online.",
    },
    {
      q: "What are the benefits of learning Chess?",
      a: "Chess builds planning, pattern recognition, patience, and strategic thinking. It teaches you to anticipate consequences and learn from mistakes. These skills transfer to problem solving, schoolwork, and everyday decision making.",
    },
    {
      q: "What games are similar to Chess?",
      a: "Fans of Chess often enjoy Checkers, Shogi, Xiangqi (Chinese Chess), Go, and abstract strategy games like Stratego. Many digital puzzle games borrow chess-like piece movement and turn-based tactical thinking as well.",
    },
  ],
  blog: [
    {
      title: "Chess — Complete Beginner Guide",
      excerpt:
        "Learn how to play chess from scratch: the goal, the board, how pieces move, and how a game ends with checkmate.",
      headings: [
        "What Is Chess",
        "The Board and the Goal",
        "How a Turn Works",
        "Check, Checkmate, and Stalemate",
        "Getting Started as a Beginner",
      ],
      body: [
        "Chess is a two-player strategy game played on an 8×8 board of alternating light and dark squares. Each player begins with 16 pieces: one king, one queen, two rooks, two bishops, two knights, and eight pawns. The goal is simple to state yet hard to master: checkmate the opponent's king.",
        "A king is in checkmate when it is under attack and has no legal way to escape, capture the attacker, or block the threat. Checkmate ends the game immediately and the attacker wins. By contrast, stalemate — having no legal move while not in check — ends the game as a draw.",
        "In this lightweight version, play is local and pass-and-play: you and a friend share the same device. White always moves first, then turns alternate automatically. Click or tap a piece to select it and the board highlights every square it may legally move to. Tap a highlighted square to complete the move.",
        "Pieces move in distinct ways. Pawns step forward one square, or two on their first move, and capture diagonally. Knights hop in an L-shape. Bishops glide along diagonals, rooks along ranks and files, and the queen combines both. The king moves one square in any direction but may never move into check.",
        "Note that castling and en passant are not implemented in this version, so the king moves only one square at a time and pawns capture only diagonally adjacent squares. This keeps the rules approachable while preserving the core challenge of checkmate.",
        "Beginners should focus on a few habits: control the center, develop knights and bishops early, keep the king safe, and always look for your opponent's threats. With those basics, you can enjoy a full game and start recognizing the patterns that lead to checkmate.",
      ],
    },
    {
      title: "How Each Piece Moves",
      excerpt:
        "A clear breakdown of every chess piece's movement, from the humble pawn to the powerful queen.",
      headings: [
        "The Pawn",
        "The Knight",
        "The Bishop and Rook",
        "The Queen",
        "The King",
      ],
      body: [
        "The pawn is the most numerous piece and the trickiest. It moves one square straight forward, or two squares on its very first move. It captures diagonally rather than forward, and it can never move backward. In this version pawns do not promote and cannot perform en passant.",
        "The knight moves in an L: two squares in one direction and then one square to the side. It is unique because it can jump over other pieces, making it valuable in crowded positions. From the center a knight can reach eight squares; near the edge it reaches fewer.",
        "The bishop slides any distance along diagonals, so each of your two bishops controls squares of a single color. The rook moves any distance along ranks and files, dominating open lines. Together they cover the whole board in straight and diagonal directions.",
        "The queen combines the bishop and the rook, moving any number of squares in any straight or diagonal line. It is the most powerful piece on the board, so bring it into play only after your weaker pieces are developed and the center is safer.",
        "The king moves one square in any direction and may never move into check. Protecting it is the central concern of the whole game, because checkmate ends the match. Remember that castling is not available in this version, so plan the king's safety move by move.",
      ],
    },
    {
      title: "Winning Strategies & Common Mistakes",
      excerpt:
        "Practical tactics to win more chess games and the beginner errors that hand away the advantage.",
      headings: [
        "Control the Center",
        "Develop Before Attacking",
        "Keep Your King Safe",
        "Common Beginner Mistakes",
        "Practice With the Highlights",
      ],
      body: [
        "Controlling the center squares (e4, d4, e5, d5) gives your pieces the most reach and flexibility. Open with a central pawn such as e4 or d4, then bring out knights and bishops toward the middle so they influence the key squares early.",
        "Develop your pieces before launching an attack. Move a few pawns, develop both knights and bishops, and connect your rooks by clearing the back rank. Avoid moving the queen out too early, where it can be chased around and lose you time and tempo.",
        "King safety wins games. Although castling is not available in this version, you should still keep your king shielded by pawns and avoid exposing it on open lines. Trade off your opponent's attacking pieces when you can to reduce the threats against your monarch.",
        "The most common beginner mistakes are grabbing free pawns while leaving the king in check, moving the same piece repeatedly in the opening, and failing to notice an opponent's threat. Slow down, scan the whole board, and ask what your opponent's last move threatened.",
        "Use the move highlights to your advantage. They show every legal destination, including captures and escapes, so you can spot tactics you might otherwise miss. Regularly reviewing these options trains your eye to find checkmate patterns and avoid stalemate blunders.",
      ],
    },
  ],
};
