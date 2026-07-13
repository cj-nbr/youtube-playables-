import type { GameContent } from "../../../shared/types";

export const content: GameContent = {
  guide: [
    {
      heading: "Goal",
      body: "Move all ten of your marbles from your home triangle to the opposite triangle on the star-shaped board. You can step one space or jump over adjacent marbles, and you win when every start location in your home triangle is empty.",
    },
    {
      heading: "How to play",
      body: "Click one of your marbles to select it, then click a legal destination. A step moves to any adjacent empty hole. A jump hops over exactly one neighboring marble and lands on the empty hole directly beyond it. After a jump, you may continue jumping with the same marble as long as more jumps remain.",
    },
    {
      heading: "Jumps and chains",
      body: "Single jumps remove an opponent or neutral marble temporarily from the path, but in Chinese Checkers you do not capture or remove pieces. A jump simply clears the space between you and the destination. Chain jumps in the same turn to cross the board quickly.",
    },
    {
      heading: "Example",
      body: "A marble at row 10, column 8 has an adjacent marble at row 10, column 9 and an empty space at row 10, column 10. It can jump right once. From row 10, column 10, if another marble sits at column 11 and space beyond is empty, it can continue jumping to column 12, advancing much faster than a single step.",
    },
  ],
  instructions: {
    objective:
      "Move all ten marbles from your home triangle to the opposite triangle before your opponent. Steps and jumps both count as moves; long chains help.",
    desktop:
      "Click a marble to select it, then click a legal destination. Legal moves light up around the selected marble. Continue jumping within the same turn to build chain sequences. Pass the device to your opponent after your full turn ends.",
    mobile:
      "Tap a marble to select it; playable destinations highlight. Tap a highlighted hole to step or jump. If more jumps are available, continue tapping to chain them before passing the device.",
    winning:
      "You win when every hole in the opposing triangle is filled with one of your marbles. The game tracks your progress and awards the best score based on total moves used.",
    losing:
      "You lose if your opponent completely fills the opposite triangle before you do. Plan ahead and use long chains to cross the board quickly, because the opponent is doing the same on the far side.",
    tips: [
      "Keep marbles near the center for the shortest route across.",
      "Use multi-jump chains to cross the board in a single turn.",
      "Build a courteous highway of moves that lets future marbles jump quickly.",
      "Do not block your own path with unneeded pieces in the center.",
      "Jumps do not remove pieces, so do not use them to attack; use them to leap.",
      "Track the number of moves left versus your opponent's home fill progress.",
    ],
  },
  faqs: [
    {
      q: "How do you play Chinese Checkers?",
      a: "Move ten marbles from your starting triangle across the star-shaped board to the opposite triangle. You may step to any adjacent empty hole or jump over any adjacent marble to land on the empty hole beyond it. You may chain jumps in one turn. The first player to fill the destination triangle wins.",
    },
    {
      q: "What is the star-shaped board?",
      a: "Chinese Checkers is played on a star-shaped board made of a central hexagon with six triangular arms radiating from each corner. In this two-player version, the home and destination triangles are opposite each other across the star.",
    },
    {
      q: "How many players can play Chinese Checkers?",
      a: "The classic game supports up to six players, each occupying one of the six triangular arms. This version is set up for two players facing each other on opposite arms, making it easy for pass-and-play on a single device.",
    },
    {
      q: "What is a jump in Chinese Checkers?",
      a: "A jump lands over exactly one neighboring marble into the empty hole directly beyond it. The jumped marble stays on the board: you are leaping, not capturing. You may chain multiple jumps in the same turn to travel across large distances.",
    },
    {
      q: "Can you chain jumps in Chinese Checkers?",
      a: "Yes. After completing a jump, if another jump is possible from your new position, you may continue jumping with the same marble. Chains can cross the board and are the fastest way to advance your marbles toward the goal.",
    },
    {
      q: "What happens if no jumps remain?",
      a: "Your turn ends naturally when no further jumps are available from your current position and the marble cannot step to an adjacent empty hole. You then pass the device to your opponent.",
    },
    {
      q: "How does the win condition work?",
      a: "You win when every hole in the opposite triangle is filled with one of your marbles. The game does not require you to move all ten marbles at once; simply ensure that each destination hole is occupied by the end of your turn.",
    },
    {
      q: "Are there captures in Chinese Checkers?",
      a: "No. Marbles are not removed from the board. Jumps only move you over other marbles to advance faster. Because pieces stay, the game is more about clever routing than elimination, and blocking your opponent is tricky.",
    },
    {
      q: "How do you block in Chinese Checkers?",
      a: "Blocking is difficult because opponents can jump over your pieces. However, you can slow someone down by filling critical jumping lanes near their home base or by occupying routes they must use in chains. Dense clusters near the center also create congestion that forces longer routes.",
    },
    {
      q: "What is the best opening strategy?",
      a: "Advance one or two front marbles slightly to open jumping paths, but keep most marbles grouped in your home triangle until you find a clear line across. Concentrating too many marbles in the center early can block your own jumps, so move gradually.",
    },
    {
      q: "How long does a Chinese Checkers game last?",
      a: "Casual games usually take between five and fifteen minutes, depending on how many chain jumps you use. Because the board is open and jumps are high-speed, experienced players can finish faster than beginners.",
    },
    {
      q: "Is there a timer?",
      a: "No timer is imposed in this version. You and your opponent can take as long as you need to plan chains and routes. The goal is to play smart and efficient, not fast.",
    },
    {
      q: "Can you play Chinese Checkers on mobile?",
      a: "Yes. The board is touch-friendly. Tap a marble to select it and tap a highlighted destination to step or jump. Chain jumps are handled within the same selection, so you never need to tap more than necessary.",
    },
    {
      q: "Is Chinese Checkers strategy-heavy or luck-based?",
      a: "It is almost entirely strategy. There are no dice and no hidden information. Success depends on route planning, multi-jump chains, and understanding which marbles must move before others. That said, a short jump early can occasionally surprise an unprepared opponent.",
    },
    {
      q: "What are the origins of Chinese Checkers?",
      a: "Despite its name, Chinese Checkers was invented in Germany in the early 1890s and marketed in the United States as a game from the Orient. It has no direct connection to traditional Chinese board games and was simply a hop-based race game on a star-shaped board.",
    },
    {
      q: "How do you recover from a bad position in Chinese Checkers?",
      a: "If your opponent is ahead, look for a shortcut chain that leaps multiple clusters at once. Sometimes sacrificing a marble to the center opens a jump lane that lets another marble sprint ahead on the next turn. Look for congestion points your opponent cannot avoid and thread a path through them.",
    },
  ],
  blog: [
    {
      title: "Chinese Checkers — Starboard Strategy",
      excerpt:
        "Plan hop routes, master chain jumps, and race your marbles across the star-shaped board.",
      headings: [
        "Board Layout",
        "Steps vs Jumps",
        "Chain Jump Tactics",
        "Opening Philosophy",
        "Endgame Fills",
      ],
      body: [
        "Chinese Checkers is played on a star-shaped board with six triangular arms and a central hexagon, giving the surface a total of 121 playable holes. In this two-player variant, each player races from one triangle to the opposite one with ten colored marbles. The beauty of the game is that jamming your opponent is nearly impossible because every marble can be jumped over.",
        "A step moves a marble one space to any adjacent empty hole. A jump launches over exactly one adjacent marble into the empty hole beyond it. You do not capture anything; you simply leap past. This means the board never empties, and blocking becomes an art of intentional congestion rather than elimination.",
        "Chain jumps are the defining mechanic. From a jump landing, if another jump is available you must continue with the same marble until no more jumps remain. Long chains can cross the board in a single turn, turning a middling position into a lead in seconds. Always scan for multi-jump sequences before stepping.",
        "Beginners often spread their marbles too early. An opening that sends one or two front marbles across to test the opponent is valuable, but sending too many creates self-traffic in the center. Keep most of your home triangle intact until you can see a clear jump path across.",
        "In the endgame, focus on the remaining destination holes. Your score counts the total moves needed to fill them, so minimizing extra steps is the only way to secure a high score. Filling the farthest holes first prevents the opponent from gaining a psychological advantage even if you are close behind.",
      ],
    },
    {
      title: "Mastering Jump Chains",
      excerpt:
        "Learn to read the board for multi-jump sequences and use them to dominate the race.",
      headings: [
        "Pattern Recognition",
        "Building a Highway",
        "Jumping Out of Congestion",
        "Avoiding Waste Moves",
        "Practice Drills",
      ],
      body: [
        "Pattern recognition is your best tool. Look for rows, diagonals, and zig-zags formed by neutral marbles at regular intervals. Each is a potential rung in a jump ladder. The more ladders you can spot in advance, the faster you can move marbles across the board.",
        "A highway is a repeating jump sequence that uses the same marbles as stepping stones for multiple of your pieces. Build one near the center early by placing marbles at intervals that let later marbles leap four or five spaces in one chain turn. Your opponent cannot remove the stones, so the highway remains reliable.",
        "Congestion is temporary, but only if you know how to escape it. If the center fills with marbles from both sides, abandon the direct route and look for a diagonal jump path that circles around the cluster. One or two clever jumps can bypass a jam that would cost many steps to push through.",
        "Waste moves are steps that leave a marble without jumping options. Before stepping, ask whether the destination opens a chain. If not, consider moving a different marble or waiting for a jump opportunity. Efficient players avoid filler moves because every wasted step lengthens their total move count.",
        "Practice by replaying the same opening jump sequence until you can find chains in under three seconds. Over time you build a mental library of jump skeletons that you can apply in any position. The skill transfers directly to faster decision-making in other board and puzzle games.",
      ],
    },
    {
      title: "Why Chinese Checkers Is Great for Families",
      excerpt:
        "Flexible rules, bright pieces, and simple turn structure make Chinese Checkers a classic for all ages.",
      headings: [
        "Simple Rules, Infinite Variety",
        "Family-Friendly Competition",
        "Learning Part of the Fun",
        "Digital or Physical Play",
        "Building Positive Habits",
      ],
      body: [
        "Chinese Checkers has fewer than ten rules but supports games from two to six players of any age. Children grasp the step and jump concept immediately, while adults can still enjoy planning long chains that end in surprise wins. The star board is visually clear and the colored marbles are easy to track.",
        "Because there is no elimination, no player is ever out of the game. Younger siblings and grandparents can all move marbles simultaneously, and the first-to-fill finish means the tension stays high until the final triangle is full. That inclusive design is why it remains a living-room staple.",
        "Parents can turn play into learning by asking children to count jumps or estimate distances before moving. Spatial awareness, planning, and turn-taking all develop naturally through repeated games. The game rewards patience, so even a slow child eventually outpaces a hasty adult through better chain reading.",
        "This digital version reproduces the classic board on any screen. Physical sets use wooden boards and plastic marbles, while this browser version runs on phones, tablets, and desktops. Both formats preserve the same mechanics and social interaction of the original.",
        "Playing Chinese Checkers at the dinner table or on a screen builds healthy habits: taking turns, handling wins and losses gracefully, and finding joy in quiet strategy. In a world of fast-paced video games, it offers a refreshing pause that still exercises the mind.",
      ],
    },
  ],
};
