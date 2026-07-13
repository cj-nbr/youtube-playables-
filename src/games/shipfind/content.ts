import type { GameContent } from "../../../shared/types";

export const content: GameContent = {
  guide: [
    {
      heading: "Goal",
      body: "Sink all five of your opponent's ships before they sink yours. Place your fleet carefully, then take turns firing at coordinates on a 10 by 10 grid. The first player to eliminate every enemy ship wins the match.",
    },
    {
      heading: "Setup",
      body: "At the start of each game, both players secretly place five ships on their 10 by 10 grid. Ships vary in length from two to five squares. They can be placed horizontally or vertically but may not overlap or touch each other. Once both fleets are positioned, the battle begins.",
    },
    {
      heading: "Taking turns",
      body: "Players alternate calling out grid coordinates such as B4 or J7. If the coordinate contains an enemy ship, it is a hit and that square is marked. If it is open water, it is a miss. After each shot, the turn passes to the other player. The game continues until one fleet is completely destroyed.",
    },
    {
      heading: "Strategy",
      body: "Spread your ships across the board to avoid clustered destruction. During attack, use a checkerboard pattern to hunt efficiently and mark misses so you do not waste shots. Once you score a hit, probe adjacent squares to sink the ship quickly rather than scattering shots randomly.",
    },
  ],
  instructions: {
    objective:
      "Place five ships on your grid and sink all five enemy ships before the opponent sinks yours.",
    desktop:
      "Use your mouse to drag ships onto your grid during setup. Click a ship to rotate it between horizontal and vertical. During battle, click a coordinate on the enemy grid to fire. The turn indicator shows whose move it is.",
    mobile:
      "Drag ships with your finger to place them on your grid. Tap a ship to rotate it before placement. Tap enemy grid coordinates to fire. The interface is sized for touch and works on any modern phone or tablet.",
    winning:
      "You win when every square of every enemy ship has been hit. The game announces your victory, shows the total number of shots fired, and saves your best score if you beat your previous record.",
    losing:
      "You lose when every square of your own fleet has been hit. The game announces the opponent's victory and lets you start a new match immediately. There is no penalty beyond the loss.",
    tips: [
      "Place a ship in the center and another near a corner to confuse the opponent's search pattern.",
      "Use a checkerboard firing pattern early to maximize the chance of a hit without wasting shots.",
      "Once you hit a ship, fire adjacent squares systematically instead of guessing random coordinates.",
      "Keep your largest ship away from the edges where it is easier to corner.",
      "Rotate ships during setup to break up straight-line clusters that are easy to find.",
      "Watch the opponent's misses and avoid repeating them on your own grid.",
    ],
  },
  faqs: [
    {
      q: "How do you play Shipfind?",
      a: "Shipfind is a two-player Battleship-style game played on a 10 by 10 grid. Each player secretly places five ships, then takes turns firing at coordinates on the enemy grid. Hits are marked, misses are recorded, and the first player to sink all five enemy ships wins.",
    },
    {
      q: "What are the rules of Shipfind?",
      a: "Place five ships of lengths two through five on your grid without overlap or touching. Ships can be horizontal or vertical. Players alternate firing at coordinates. Hits and misses are marked on both grids. The game ends when one player has no ships remaining.",
    },
    {
      q: "How many ships are in Shipfind?",
      a: "There are five ships: one of length five, one of length four, one of length three, and two of length two. Together they occupy seventeen squares on the 10 by 10 grid.",
    },
    {
      q: "Can ships be placed diagonally?",
      a: "No. Ships may only be placed horizontally or vertically. Diagonal placement is not allowed, which keeps the game fair and the search patterns predictable.",
    },
    {
      q: "What is the best starting strategy in Shipfind?",
      a: "Place ships away from the edges and avoid clustering them in straight lines. Spread the fleet across different regions of the board so a single lucky shot cannot chain-hit multiple ships. A mixed placement makes you harder to predict.",
    },
    {
      q: "How do I hunt for enemy ships efficiently?",
      a: "Use a checkerboard firing pattern early on. Only fire at every other square so you maximize coverage while minimizing wasted shots. Once you score a hit, probe the four adjacent squares to determine the ship's orientation and length.",
    },
    {
      q: "Can I play Shipfind against the computer?",
      a: "Yes. The game includes a computer opponent that places its fleet randomly and fires with basic hunting logic. It is suitable for quick solo matches and for practicing before playing a friend.",
    },
    {
      q: "Does Shipfind work on mobile?",
      a: "Yes. Ship placement and firing are both touch-friendly. Drag ships to position them, tap to rotate, and tap enemy coordinates to fire. The layout adapts to phone and tablet screens.",
    },
    {
      q: "What happens when a ship is sunk?",
      a: "When every square of a ship has been hit, it is marked as sunk and announced. Sunk ships are highlighted on both grids so both players can see the damage. Sinking a ship does not end the game; only sinking the entire fleet does.",
    },
    {
      q: "Is there a timer in Shipfind?",
      a: "No. Shipfind has no timer, so you can take as long as you need to plan each shot. This makes it ideal for relaxed play and for carefully considering placement and strategy.",
    },
    {
      q: "How does scoring work in Shipfind?",
      a: "Your score is based on the number of shots fired. Fewer shots to sink the entire enemy fleet means a better score. The game saves your best result and displays it each round for comparison.",
    },
    {
      q: "Can two people play Shipfind on the same device?",
      a: "Yes. Pass and play is fully supported. After placing your fleet, hand the device to your opponent so they can place theirs and begin firing. The turn indicator keeps both players honest.",
    },
    {
      q: "What is a good score in Shipfind?",
      a: "Expert players can sink an entire fleet in under forty shots. A score below fifty is very good, while above eighty suggests the search pattern needs refinement. Practice the checkerboard method to lower your shot count.",
    },
    {
      q: "Are ship placements randomized?",
      a: "The computer opponent places its fleet randomly each round. Human players place their own ships during setup. Because placements differ every game, no two matches are identical.",
    },
    {
      q: "Is Shipfind free to play?",
      a: "Yes. Shipfind runs in the browser with no downloads, no accounts, and no cost. Open the page, place your ships, and start playing immediately.",
    },
    {
      q: "What makes Shipfind different from classic Battleship?",
      a: "Shipfind keeps the classic grid-and-coordinate feel but adds a clean drag-and-drop setup, touch support, and automatic score tracking. The checkerboard hunting hint and adaptive computer opponent make it friendlier for new players while remaining strategic for veterans.",
    },
  ],
  blog: [
    {
      title: "Become a Shipfind Expert in Ten Minutes",
      excerpt:
        "Learn placement tactics, hunting patterns, and finishing moves that will lower your shot count fast.",
      headings: [
        "Smart Ship Placement",
        "The Checkerboard Hunt",
        "Sinking Ships Fast",
        "Avoiding Common Mistakes",
        "Tracking Your Progress",
      ],
      body: [
        "The first five moves of Shipfind are decided during setup, not during battle. Place your five-ship along an edge but offset it by one square so it is not fully exposed. Keep your three-ship and two-ships scattered in the remaining open zones, and leave a buffer of at least one empty square between every ship. Clustered fleets are easy prey.",
        "When attacking the computer or an unknown human board, fire at every other square in a checkerboard pattern. This guarantees that no matter where a ship is placed, you will hit it within a few shots. After a hit, switch to a local search around that square to determine the ship's length and orientation.",
        "Once you score a hit, do not stop at one square. Fire the adjacent squares in sequence: up, down, left, right. If the second shot is also a hit, you now know the ship is horizontal or vertical, and you can fire along that line until it sinks. This method turns a lucky hit into a guaranteed sink.",
        "The most common mistake is firing randomly after a miss. Random shots waste turns and lengthen your final score. Always maintain a mental or visual record of misses so you never repeat them. The board is small enough that disciplined tracking makes a huge difference.",
        "Your best score is saved automatically and shown before each match. Treat it as a benchmark and try to beat it every time. Over a few sessions, the checkerboard method and disciplined placement will lower your average shot count by twenty or more.",
      ],
    },
    {
      title: "The History of Battleship and Shipfind",
      excerpt:
        "From pencil-and-paper strategy to browser-native naval warfare, trace the evolution of a classic game.",
      headings: [
        "Origins in Pencil and Paper",
        "The Milton Bradley Board Game",
        "Digital Adaptations",
        "Browser-Native Evolution",
        "Why It Still Works",
      ],
      body: [
        "Battleship began as a simple pencil-and-paper game played by two people who called out coordinates and marked hits with dots. The earliest known version appeared around the 1930s, and it spread through naval officers and civilians alike because it required only paper and a pen.",
        "In 1967, Milton Bradley released the first plastic board game version, complete with plastic ships and red-and-white pegs. That edition standardized the 10 by 10 grid and the fleet of five ships, rules that Shipfind follows closely. The board game became a global phenomenon and remains in production today.",
        "Digital versions appeared on mainframes and calculators in the 1970s, then migrated to personal computers in the 1980s. Early computer versions added simple artificial intelligence and random ship placement, removing the need for a second human player. These features paved the way for solo browser games like Shipfind.",
        "Shipfind takes the classic formula and removes friction. Drag-and-drop placement, automatic miss tracking, and local high-score saving mean you can start a match in seconds without sorting through plastic pieces or pegs. The game preserves the original tension of hidden fleets while adding modern convenience.",
        "Battleship endures because it balances luck and strategy in a short, repeatable package. Every match is different because ship placements are randomized, yet skilled placement and disciplined firing consistently outperform random play. That combination of simplicity and depth is rare, and it is why Shipfind remains compelling decades after the original.",
      ],
    },
    {
      title: "Psychology of Naval Strategy Games",
      excerpt:
        "Explore how hidden-information games like Shipfind train deduction, patience, and risk assessment.",
      headings: [
        "Hidden Information and Deduction",
        "Patience and Delayed Reward",
        "Risk Assessment Under Uncertainty",
        "Social Dynamics in Pass and Play",
        "Cognitive Benefits",
      ],
      body: [
        "Shipfind is a hidden-information game, meaning each player knows something the other does not: the location of their own fleet. This asymmetry forces you to think in terms of probabilities rather than certainties, training a mode of reasoning that is useful in real-world decision-making from investing to troubleshooting.",
        "Because there is no timer, Shipfind rewards patience. A patient player who tracks misses and probes hits methodically will almost always outperform a player who fires randomly in search of quick hits. Delayed gratification is a skill that generalizes far beyond board games.",
        "Risk assessment is central to every shot. Firing at an unexplored square has a low chance of success, but probing a suspected ship location has a much higher expected value. Skilled players learn to switch between exploration and exploitation depending on how much information they have.",
        "In pass-and-play mode, Shipfind becomes a social test of honesty and observation. Since both players share one screen, you must trust the opponent to look away during setup and respect the turn order during battle. These small social contracts build sportsmanship and fair-play habits.",
        "Studies of strategy games show that regular play improves deductive reasoning, spatial memory, and impulse control. Shipfind exercises all three: you deduce ship locations from limited data, remember which squares have been tested, and resist the urge to fire randomly when patience would pay off more.",
      ],
    },
  ],
};
