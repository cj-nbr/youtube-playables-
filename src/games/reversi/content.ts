import type { GameContent } from "../../../shared/types";

export const content: GameContent = {
  guide: [
    {
      heading: "Goal",
      body: "Surround and flip enemy discs so you have more of your color on the board than the opponent when the 8×8 grid fills up. Dark and light take turns placing one disc per turn. The player with the majority of discs at game end wins.",
    },
    {
      heading: "How to play",
      body: "Place a disc on any empty square where it forms a straight line (horizontal, vertical, or diagonal) between one of your existing discs and one or more enemy discs. All enemy discs in between flip to your color. If you cannot place a legal disc, your turn passes.",
    },
    {
      heading: "Flipping",
      body: "When you surround enemy discs on both ends of a straight line, they flip color instantly. This can create new flips in other directions, so one move may change the entire board. Predict these cascades to dominate the center early and trap opponent pieces near the edges.",
    },
    {
      heading: "Example",
      body: "The board has a dark disc at (3, 3), a light disc at (3, 4), and an empty (3, 5). If you place a dark disc at (3, 5), the light disc at (3, 4) is now sandwiched between two darks and flips dark. You may then find new vertical or diagonal flips from the newly darkened square.",
    },
  ],
  instructions: {
    objective:
      "Have more discs of your color than your opponent when the board fills. Flip pieces by sandwiching them in straight lines.",
    desktop:
      "Click an empty square that is legal — it must lie in a straight line between one of your existing discs and one or more enemy discs. The move is confirmed, discs flip, and the turn passes. The status bar shows your current disc count and your opponent's.",
    mobile:
      "Tap an empty square to place your disc, provided it completes a legal sandwich line. Flipped pieces change instantly. After your move, pass the device. The board highlights legal moves so you can tap quickly without inspecting every square.",
    winning:
      "You win when the final board contains more discs of your color than your opponent's. In rare cases the game ends in a tie if both sides have exactly 32 discs. High scores are saved locally so you can compare victories across matches.",
    losing:
      "You lose if your opponent ends with more discs than you. Avoid giving away corners early and plan moves that flip multiple directions at once, because small advantages compound rapidly in the midgame.",
    tips: [
      "Claim corners early; corner discs can never be flipped again.",
      "Build edge chains that run perpendicular to corners so the corner stays yours.",
      "Avoid placing pieces next to empty corners unless it gives you the corner itself.",
      "Search for moves that flip in two directions at once to maximize board swing.",
      "Play cautiously in the opening; aggressive early flips near corners can backfire.",
      "Track how many legal moves each side has to spot when the game is about to close.",
    ],
  },
  faqs: [
    {
      q: "How do you play Reversi?",
      a: "Place one disc of your color on an empty square such that it is flanked on a straight line by one of your existing discs and one or more enemy discs. All sandwiched enemy discs flip to your color. Players alternate until the board fills or no legal move remains.",
    },
    {
      q: "What is Othello?",
      a: "Othello is the commercial name for the same game as Reversi. The standard rules, board layout, and objectives are identical. If you know Othello, you already know Reversi.",
    },
    {
      q: "What are the basic rules of Reversi?",
      a: "The 8×8 board starts with four discs at the center: dark diagonally, light in the other diagonal. Players alternate placing one disc per turn. A disc must flip at least one enemy piece in a straight line. If you have no legal move, your turn passes. The game ends when neither player can move.",
    },
    {
      q: "How do disc flips work in Reversi?",
      a: "When a newly placed disc is on a straight line with one of your existing discs and one or more enemy discs in between, every enemy disc on that line flips to your color. This can happen horizontally, vertically, or diagonally and can cascade into multiple lines from a single move.",
    },
    {
      q: "What is a legal move in Reversi?",
      a: "An empty square is legal if, in any of the eight directions, there is a straight line containing one of your discs and at least one enemy disc. The new disc must be placed such that it sandwiches enemy discs between itself and your disc on both ends of that line.",
    },
    {
      q: "What happens if I cannot move?",
      a: "If you have no legal move, your turn is passed and your opponent plays again. If neither player has a legal move, the game ends and discs are counted. Passing can swing the game because your opponent gets consecutive turns.",
    },
    {
      q: "What is the best opening move in Reversi?",
      a: "The four center squares are already occupied at the start. Your first legal moves are the squares directly diagonally adjacent to the center: C3, F3, C6, and F6. C3 and F6 flip one disc each; F3 and C6 flip two discs each. Many players prefer F3 or C6 for an early edge.",
    },
    {
      q: "Why are corners important in Reversi?",
      a: "Corners are permanent. Once claimed, a corner disc can never be flipped because there is no diagonal straight line past it. Also, disc you place on the corner secures the edge to its left or right, making you powerfully stable. Losing a corner early is often fatal.",
    },
    {
      q: "Can you flip more than one disc per move?",
      a: "Yes. A single legal move can flip discs in several directions at once. For example, a carefully chosen move may flip one disc horizontally, two vertically, and one diagonally, giving you a large board swing in one turn.",
    },
    {
      q: "Does Reversi have a tie condition?",
      a: "Yes. If both players have the same number of discs when the game ends, the result is a tie. In practice this is rare, but it can happen on a balanced board with many stable disc clusters.",
    },
    {
      q: "Is Reversi a two-player game?",
      a: "Yes, this is a local two-player pass-and-play game. Take turns placing discs after handing the device to your opponent. There is no computer opponent in this version.",
    },
    {
      q: "Can you play Reversi on mobile?",
      a: "Yes. The layout is touch-friendly and legal squares are highlighted. Tap an empty highlighted square to place your disc. The board and controls stay responsive on phones and tablets.",
    },
    {
      q: "Is there a timer in Reversi?",
      a: "No. Players move at their own pace. There is no turn clock or match timer, so you can study the board and plan flips carefully. The focus is on strategy, not speed.",
    },
    {
      q: "What is the best strategy for Reversi beginners?",
      a: "Take corners when you can, avoid squares next to empty corners until the corner is yours, and prefer moves that flip in multiple directions. Build edge chains that connect to corners, and watch the parity of remaining legal moves in the endgame.",
    },
    {
      q: "Why do edge discs matter in Reversi?",
      a: "Edges can still be flipped, unlike corners. However, an edge that connects to your corner becomes nearly stable because any attempt to flip it must pass through your corner. Build edges outward from claimed corners to expand your territory safely.",
    },
    {
      q: "What is the disc parity rule?",
      a: "In the final turns, the player who cannot move loses another turn and lets the opponent place multiple discs. The number of remaining legal moves can predict which color ends ahead. Plan early endgame moves so your opponent runs out of options first.",
    },
    {
      q: "How does scoring work in Reversi?",
      a: "The game tracks your disc count and saves your highest total as a local best score. A typical strong game ends with 45 to 55 discs for the winner; a dominant game can exceed 60.",
    },
    {
      q: "What games are similar to Reversi?",
      a: "Fans of Reversi often enjoy Go for its territory mechanics, Chess for its flip-like sacrifices, and Hex for its line-completion victories. Any game that rewards balance between aggression and stability trains the same strategic muscles.",
    },
  ],
  blog: [
    {
      title: "Reversi — Rules, Tactics, and Winning Mindset",
      excerpt:
        "From opening flip patterns to endgame parity, learn how to dominate the board in Reversi.",
      headings: [
        "What Is Reversi",
        "The Opening Phase",
        "Midgame Positioning",
        "Endgame Parity",
        "Common Beginner Mistakes",
      ],
      body: [
        "Reversi, known commercially as Othello, is an abstract strategy game played on an 8×8 board. Each player places one disc per turn, flipping any enemy discs that lie on a straight line between the new disc and an existing piece of the same color. The player with more discs at the end wins.",
        "The opening matters. Start by choosing moves that flip in multiple directions. Corners are the most valuable squares on the board because a corner disc can never be flipped. Avoid giving your opponent corners by never placing a disc adjacent to an empty corner unless you plan to claim that corner immediately.",
        "Midgame is about building stable regions. After you hold a corner, extend outward along the edges connected to it. Stable discs are discs that cannot be flipped, and clusters of them create pressure on the opponent's remaining mobile pieces. Balance mobility with stability: too many stable pieces slows the game in your favor, too few invites chaos.",
        "In the endgame, move count parity decides games. When the board fills, the player who makes the final placement usually wins. Plan sequences that leave your opponent with fewer and fewer legal moves while you retain several options. Forcing passes is decisive.",
        "The biggest beginner mistake is chasing immediate flips without thinking about the resulting board shape. Always ask after every move whether you have closed a corner to your opponent or left an edge vulnerable. Slow, stable play almost always beats a frantic early rush.",
      ],
    },
    {
      title: "Advanced Flip Tactics for Reversi",
      excerpt:
        "Diagonal traps, edge walls, and stability theory explained with practical examples.",
      headings: [
        "Building Edge Walls",
        "Diagonal Traps",
        "Stability Theory Simplified",
        "When to Pass",
        "Reading Ahead",
      ],
      body: [
        "Once you own a corner, build an edge wall next to it. Place a line of your discs along the edge leading away from the corner. This cluster becomes nearly unflippable because any attack would have to pass through your corner or move through squares you already control.",
        "Diagonal traps are positions where the opponent must flip a disc into a pattern that lets you recapture multiple directions at once. Set them by placing discs one square off the main diagonal, so your opponent sees only one flip but your follow-up reveals a hidden multi-direction swing.",
        "Stability theory classifies discs by how difficult they are to flip. Corners are always stable, edge discs connected to corners are usually stable, and center discs are often unstable until late. As the game progresses, more discs become stable until the board locks. Use this mental map to plan your moves.",
        "Passes are terrible unless forced. If you must pass, your opponent gains consecutive turns and may steal corners or flip large clusters. Avoid running out of moves by keeping at least two legal options open near the edges and corners until the board is mostly filled.",
        "Read ahead by briefly simulating your move versus one or two reactions from your opponent. A single unfinished thought about the next two turns can reveal hidden flips or hanging corners. Do not solve the whole game; just verify that your candidate move does not gift a corner.",
      ],
    },
    {
      title: "Reversi and Abstract Strategy Games",
      excerpt:
        "Why Reversi is a gateway to deeper strategic thinking and how its concepts appear in Go, Chess, and Hex.",
      headings: [
        "Territory and Influence",
        "Micro to Macro Scale",
        "Flow in Reversi",
        "Transferable Tactical Skills",
        "Building a Practice Routine",
      ],
      body: [
        "Like Go, Reversi rewards territory. Each disc you place claims space and limits your opponent's options. Players who think in terms of regions rather than single flips tend to have more stable positions and fewer surprises in the endgame.",
        "Reversi is played on a small enough board that you can track the whole game state, yet large enough that simple strategies fail. This makes it a perfect training ground for the kind of global awareness you need in Chess or even in large strategy video games.",
        "Flow means the ability of your pieces to reach any square in a region. High-flow clusters on Reversi can sweep the board once stability sets in. Notice how a well-placed disc creates chains that touch every corner of the board and use those chains to channel your opponent into defensive mistakes.",
        "Flipping teaches sacrifice, tempo, and positional evaluation. A beautifully timed flip sets up a second flip that does even more damage, a pattern you also see in Chess combinations where a piece sacrifice opens a mating net. Reversi sharpens the same calculation muscles.",
        "A good practice routine is to review one finished match per day, identify the single worst move, and spend five minutes imagining a better alternative. Over weeks this habit turns blind flips into deliberate placement and steadily raises your win rate.",
      ],
    },
  ],
};
