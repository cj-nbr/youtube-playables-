import type { GameContent } from "../../../shared/types";

export const content: GameContent = {
  guide: [
    {
      heading: "Objective",
      body: "Climb from the bottom of a branching grid to the top, choosing one of three forks at every step. Scoop up coins along the way for points and reach the summit before the path runs out. The further you climb and the more coins you grab, the higher your score.",
    },
    {
      heading: "How to play",
      body: "Your cart starts at the bottom. At each level the trail splits into up to three branches — left, center, and right. Tap or click the next cell you want to enter. Coins sit on some cells; obstacles (rocks and spikes) sit on others. Stepping onto a coin collects it, and stepping onto an obstacle ends the run.",
    },
    {
      heading: "Strategy",
      body: "Always scan all three branches before committing. A coin is worth grabbing only if the branch beyond it keeps leading upward. Learn to read the grid two moves ahead: the best fork is the one that both collects a coin and leaves safe branches above it. Higher levels pack in more obstacles, so discipline matters more than greed.",
    },
    {
      heading: "Example",
      body: "Suppose the center branch has a coin but the two cells above it are both obstacles. Taking it grabs a coin but strands you — game over. Instead, take the left branch with no coin but two clear cells above it, keeping your climb alive. Survival beats a single coin when the summit is worth the most points.",
    },
  ],
  instructions: {
    objective:
      "Climb to the top of a three-way branching grid, collecting coins and avoiding obstacles, to maximize your score.",
    desktop:
      "Use your mouse to click one of the highlighted cells in the row directly above your cart. Each click moves you one step up and reveals the next set of branches. Click coins to collect them and avoid clicking obstacles.",
    mobile:
      "Tap one of the glowing cells in the row above your cart to move there. Each tap advances you one level up the grid. Tap coins to bank them and never tap an obstacle cell.",
    winning:
      "You win the moment your cart reaches the top row of the grid. Your final score is your coins plus a climb bonus for how far you got, and a new best is saved.",
    losing:
      "You lose if you step onto an obstacle cell. Because every path splits into three, a wrong fork can strand you, so choose carefully — one bad move ends the run.",
    tips: [
      "Look at all three branches before moving, not just the nearest coin.",
      "Prioritize a clear path upward over a single coin if the branch dead-ends.",
      "Collect coins early; they are safer to grab before the grid gets dense.",
      "On higher levels, assume obstacles cluster — plan two moves ahead.",
      "Keep calm; you can always pause and resume to study the forks.",
      "Bank a coin only when the cells above it stay open.",
    ],
  },
  faqs: [
    {
      q: "How do you play ThreeTown?",
      a: "Your cart begins at the bottom of a tall grid. At each step the path splits into up to three branches in the row above. You click or tap one of those branches to move there. Collect coins for points and avoid obstacles that end the run. Reach the top to win.",
    },
    {
      q: "What are the rules of ThreeTown?",
      a: "Move one row upward per turn by choosing among the available branches. Coins add to your score, obstacles end the game instantly, and reaching the top row wins. Each level adds more obstacles, so the climb gets harder the further you go.",
    },
    {
      q: "Why is it called ThreeTown?",
      a: "Every junction on the climb splits into three possible directions — a left fork, a center fork, and a right fork. The 'town' is the little settlement you are building toward at the summit as you stack up coins on the way up.",
    },
    {
      q: "How is the score calculated in ThreeTown?",
      a: "Your score is the number of coins you collect plus a climb bonus for how many rows you ascended. Reaching the top adds a summit bonus on top. Your best score is saved locally in your browser for next time.",
    },
    {
      q: "What is the best strategy for ThreeTown?",
      a: "Read all three branches before moving and look two rows ahead. Choose the fork that keeps a clear upward path, even if it skips a coin. Surviving to the summit is worth far more than a single coin on a dead-end branch.",
    },
    {
      q: "Are the obstacles always avoidable?",
      a: "Yes. The grid is generated so there is always at least one safe branch at every step. That means a loss is always the result of a choice you made, not bad luck — which is what makes planning rewarding.",
    },
    {
      q: "How do levels work in ThreeTown?",
      a: "Levels increase the density of obstacles as you climb higher. Early rows are sparse and forgiving; later rows demand careful reading of the forks. Your progress within a single run is the climb itself, and each run is a fresh randomly generated grid.",
    },
    {
      q: "Can I play ThreeTown on mobile?",
      a: "Yes. The grid is fully responsive and works with touch. Tap a glowing cell in the row above your cart to move there. The controls are the same as on desktop, just tap instead of click.",
    },
    {
      q: "Is ThreeTown timed?",
      a: "No, there is no countdown clock. The pressure comes from the branching choices and the obstacle density, not from speed. You can take your time to study the forks before each move.",
    },
    {
      q: "What happens if I get stranded?",
      a: "If every branch above you is an obstacle, any move ends the run — but the grid is generated to prevent this, so you should always have at least one safe option. Pick it and keep climbing.",
    },
    {
      q: "How do I save my best score?",
      a: "Your best score is stored automatically in your browser's local storage when you finish a run. It is shown on the status line each game so you can try to beat it. Clearing browser data resets it.",
    },
    {
      q: "Is there a pause feature in ThreeTown?",
      a: "Yes. Use the Pause button to freeze the game and study the board, then Resume to continue. Pausing is handy when you want to plan several forks ahead without pressure.",
    },
    {
      q: "What is the climb bonus?",
      a: "The climb bonus rewards how far up the grid you reached. Even if you do not make it to the very top, climbing many rows earns points, so a long safe run is valuable even without many coins.",
    },
    {
      q: "Can kids play ThreeTown?",
      a: "Absolutely. The rules are simple — pick a branch, grab coins, dodge rocks — and there is no violence or time pressure. It gently teaches planning ahead and reading options, which is great for younger players.",
    },
    {
      q: "Is ThreeTown free to play?",
      a: "Yes. It runs in your browser with no cost, no account, and no download. Open the page and start climbing immediately. Your best score stays private on your own device.",
    },
    {
      q: "Why does my cart sometimes have only two branches?",
      a: "Near the left or right edge of the grid, a fork that would step outside the board is simply not offered. You will see one, two, or three branches depending on where your cart is and what is open above it.",
    },
  ],
  blog: [
    {
      title: "The Complete ThreeTown Guide",
      excerpt:
        "Learn how to climb the branching grid, collect coins, and dodge obstacles like a pro.",
      headings: [
        "What Is ThreeTown",
        "Core Rules and Setup",
        "Reading the Three Forks",
        "Scoring and the Climb Bonus",
        "Getting Better Over Time",
      ],
      body: [
        "ThreeTown is a calm-yet-tense climbing puzzle. Your cart starts at the bottom of a tall grid, and the only way forward is up. At every step the trail splits into up to three branches, and you must pick one. Coins reward greed; obstacles punish carelessness. The mix is what makes each run a small puzzle.",
        "The setup is simple. The grid is generated fresh each run with a guaranteed safe path from bottom to top, so a loss is always your choice, never bad luck. Coins are scattered on open cells, obstacles sit on others, and the summit is the top row. One wrong tap onto a rock and the climb ends.",
        "Reading the forks is the heart of the game. Before committing, look at all the branches offered and then peek at the row above them. A coin is only worth taking if the path beyond it continues upward. The best players treat each fork as a two-move decision rather than a one-move grab.",
        "Scoring rewards both collection and survival. Every coin adds points, and every row you climb adds a climb bonus. Reaching the summit layers on a summit bonus. Your best total is saved locally, giving you a clear target to chase on the next run.",
        "Improvement comes from patience. Resist the urge to chase every coin, keep a clear route upward in mind, and use Pause to study dense sections. Over a few runs you will start to read the grid instinctively and reach the top with a fat coin total.",
      ],
    },
    {
      title: "Beginner Strategies to Win at ThreeTown",
      excerpt:
        "Simple, repeatable habits that help new climbers avoid obstacles and bank more coins.",
      headings: [
        "Scan All Three Branches",
        "Value the Path Over the Coin",
        "Bank Early Coins",
        "Plan Two Moves Ahead",
        "Use Pause to Think",
      ],
      body: [
        "New players lose by grabbing the nearest shiny coin without checking what lies beyond. The fastest improvement is to always scan every offered branch before moving. Sometimes the coinless fork is the only one that keeps you alive, and that is the one to take.",
        "Learn to value a clear upward path more than a single coin. A coin on a dead-end branch is a trap: it looks good but strands you. The summit bonus is large, so protecting your climb almost always beats a handful of early coins.",
        "When a coin sits on a branch that clearly continues upward, take it early. Early rows are sparse, so coins there are usually safe. Banking them early builds your score before the grid gets dense and choices get brutal.",
        "Start thinking two moves ahead. After you pick a branch, imagine the next row and which of its forks would be safe. This small habit prevents the most common beginner mistake: climbing into a corner with no safe exit.",
        "Do not be afraid to pause. The Pause button freezes the board so you can study the forks without pressure. Use it whenever the obstacle density spikes, then resume with a clear plan.",
      ],
    },
    {
      title: "Advanced Tactics and Common Mistakes in ThreeTown",
      excerpt:
        "Push toward summit runs and avoid the errors that cost experienced climbers their streaks.",
      headings: [
        "Mapping the Whole Climb",
        "Reading Obstacle Clusters",
        "Common Mistakes to Avoid",
        "Risk Management",
        "Chasing a New Best",
      ],
      body: [
        "At higher levels, the grid becomes a maze of obstacles rather than a gentle staircase. Strong players mentally map the whole climb, identifying a continuous safe corridor and only stepping off it for coins that clearly reconnect.",
        "Obstacles tend to cluster. When you see a wall of rocks on one side, expect the safe corridor to hug the opposite edge. Reading these clusters lets you pre-commit to a side early instead of stalling in the middle where forks close off.",
        "Even confident players make avoidable errors. The biggest is greed near the top: a coin two rows below the summit that strands you is never worth it. The second is panic-tapping when the board looks busy — slow down and the safe fork is usually visible.",
        "Risk management is about expected value. A coin behind a narrow safe corridor is worth more than a coin on a branch that only has a coin-fifty chance of continuing. Quantify the path, not just the prize, and your runs get longer.",
        "Chasing a new best changes how you play. Once you know your record, you can afford to play safer to secure it, or push riskier to smash it. Either way, treat each run as practice for the climb you actually care about.",
      ],
    },
  ],
};
