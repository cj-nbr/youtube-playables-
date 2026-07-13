import type { GameContent } from "../../../shared/types";

export const content: GameContent = {
  guide: [
    {
      heading: "Goal",
      body: "Stack falling blocks to clear full rows and earn points. Each cleared row disappears and all blocks above fall down. The game ends when the stack reaches the top of the board and no new piece can spawn.",
    },
    {
      heading: "How to play",
      body: "Seven different tetromino shapes fall one at a time. Move them left and right, rotate them, and drop them into gaps. When a horizontal row is completely filled with blocks, it vanishes and you score points. Clearing four rows at once with a long straight piece is called a Tetris and gives the highest bonus.",
    },
    {
      heading: "Controls",
      body: "Use the arrow keys to move and rotate pieces. Left and right arrows shift horizontally. Up arrow rotates. Down arrow soft-drops the piece faster. Space bar hard-drops the piece instantly into its final position. P pauses the game.",
    },
    {
      heading: "Levels and speed",
      body: "The game starts at level one with a moderate falling speed. Every 1,000 points raises the level and makes pieces fall faster. Surviving to level ten is a significant milestone, and the speed curve keeps the challenge fresh without being impossible.",
    },
  ],
  instructions: {
    objective:
      "Clear as many rows as possible and chase a high score by building combos and surviving to higher levels.",
    desktop:
      "Left and right arrow keys move the current piece. Up arrow rotates it. Down arrow soft-drops. Space bar hard-drops instantly. P pauses the game. The piece preview shows the next block to help you plan ahead.",
    mobile:
      "Use the on-screen control buttons. Left and right arrows move the piece, the rotate button spins it, down soft-drops, and the drop button hard-drops. All buttons are large and easy to tap during fast play.",
    winning:
      "There is no fixed win condition. Victory is personal: beat your previous high score or reach a milestone like 15,000 points or level ten. The game saves your best score automatically.",
    losing:
      "The game ends when a newly spawned piece immediately collides with the stack because the stack has reached the top. Your final score is displayed and saved if it is your best.",
    tips: [
      "Keep the center of the board flat and avoid building tall spikes on one side.",
      "Use the piece preview to plan two moves ahead.",
      "Build flat surfaces so you always have room to slide pieces into gaps.",
      "Save hard drops for emergency situations when the stack is rising fast.",
      "Clear four rows at once when possible for the biggest score boost.",
      "Never leave single-square gaps; they are almost impossible to fill later.",
    ],
  },
  faqs: [
    {
      q: "How do you play Snakris?",
      a: "Snakris is a falling-block puzzle game. Pieces of various shapes fall from the top. Move, rotate, and drop them to fill complete rows. Full rows disappear and award points. The game speeds up as your score rises, and it ends when the stack reaches the top.",
    },
    {
      q: "What are the rules of Snakris?",
      a: "Pieces fall automatically. You control their position and rotation. Complete rows vanish and award points. Four rows cleared at once give the highest bonus. The game ends when pieces stack to the top and no new piece can spawn.",
    },
    {
      q: "How does scoring work in Snakris?",
      a: "One row scores 100 points, two rows score 300, three rows score 500, and four rows score 800. Level speed increases every 1,000 points. Hard drops add a small bonus based on drop distance.",
    },
    {
      q: "What is the piece preview?",
      a: "The piece preview shows the next block that will fall after the current one. Use it to plan rotations and placements ahead of time so you are never surprised by an awkward shape.",
    },
    {
      q: "Can I pause Snakris?",
      a: "Yes. Press the P key on desktop or tap the pause button on mobile. The game freezes instantly and resumes when you unpause, with no penalty to your score or progress.",
    },
    {
      q: "What is a Tetris?",
      a: "A Tetris is the act of clearing four rows at once with a long I-shaped piece. It is the highest-scoring single move in the game and often turns a losing position into a winning one. Achieving a Tetris requires careful preparation of the board.",
    },
    {
      q: "How do I increase the level?",
      a: "The level increases automatically as your score crosses every 1,000-point threshold. Each new level makes pieces fall faster, raising the stakes and rewarding quicker reactions.",
    },
    {
      q: "Why does the game speed up?",
      a: "Increasing speed is the core difficulty curve. Early levels let you think and plan; later levels test reflexes and instinct. Faster play also means more rows per minute, which naturally pushes your score higher.",
    },
    {
      q: "What is a good score in Snakris?",
      a: "A score of 5,000 is solid for a beginner. Reaching 15,000 is very good, and 30,000 or more is expert territory. High scores depend on combo clears and surviving to higher levels.",
    },
    {
      q: "Can I play Snakris on mobile?",
      a: "Yes. Touch controls are displayed on screen and are sized for comfortable play. The layout adjusts to any modern phone or tablet browser with no download required.",
    },
    {
      q: "Is Snakris free to play?",
      a: "Yes. It runs in the browser with no cost, no account, and no download. Your best score is saved locally on your device.",
    },
    {
      q: "How can I get better at Snakris?",
      a: "Practice keeping flat surfaces, plan with the preview, and never leave one-square gaps. Focus on clearing rows rather than chasing single Tetrises, because consistent small clears build a safer, higher-scoring board.",
    },
    {
      q: "What happens when I reach the top?",
      a: "If a new piece spawns and immediately collides with the stack, the game ends. Your final score is shown, and if it is your best, it is saved. You can start a new game immediately.",
    },
    {
      q: "Are the pieces randomized?",
      a: "Yes. Every piece is selected randomly from the seven tetromino shapes. No pattern is predictable, so every game requires genuine on-the-fly adaptation.",
    },
    {
      q: "Why is it called Snakris?",
      a: "The name blends snake and Tetris, referencing the way pieces snake downward in a tight, interlocking stack. It captures the feeling of building a tall, winding structure that you must keep under control.",
    },
  ],
  blog: [
    {
      title: "How to Chain Combos and Build High Scores",
      excerpt:
        "Learn the techniques top players use to clear rows efficiently and survive to higher levels.",
      headings: [
        "The Flat Surface Rule",
        "Using the Piece Preview",
        "When to Tetris",
        "Stack Management",
        "Practice Routine",
      ],
      body: [
        "The single most important habit in Snakris is keeping flat surfaces. A flat stack gives every piece a place to land and lets you slide pieces sideways to fill gaps. Tall spikes on one side of the board create unavoidable holes and shorten your game. Always try to keep the top of your stack level.",
        "The piece preview is not just a convenience; it is a planning tool. When you see the next piece, mentally slot it into your current stack before it arrives. If the current piece fits a specific gap and the next piece is a long straight, you can prepare a Tetris setup one move in advance.",
        "A Tetris is powerful but risky. Only attempt it when the bottom four rows are mostly clear and you have a long straight piece in hand. If the rows are uneven, a Tetris attempt can leave single gaps that end your game. Use it deliberately, not impulsively.",
        "Stack management means thinking ten moves ahead rather than ten seconds ahead. After every drop, ask yourself whether your current stack can accept the next three pieces. If the answer is no, clear rows now instead of waiting for the perfect setup.",
        "A five-minute daily practice session beats an hour-long marathon once a week. Short, frequent play builds consistent pattern recognition and lets you recover from mistakes without frustration. Track your best score and try to improve it by just one level each session.",
      ],
    },
    {
      title: "The Tetris Effect and Why Falling-Block Games Addict",
      excerpt:
        "Explore the psychology behind why falling-block games are so engaging and how to play them in a healthy way.",
      headings: [
        "Flow State in Puzzle Games",
        "The Tetris Effect",
        "Variable Reward Schedules",
        "Healthy Play Habits",
        "Cognitive Benefits",
      ],
      body: [
        "Falling-block games like Snakris create flow states because the difficulty scales exactly with your skill. When the game speeds up, you must react faster, which keeps your mind fully engaged. This balance of challenge and ability is the core recipe for flow, the psychological state where time seems to disappear and performance peaks.",
        "The Tetris effect is a well-documented phenomenon where players continue to see falling shapes even after they stop playing. It happens because the brain has been trained to recognize and organize patterns rapidly. Most players experience it as a harmless mental afterimage that fades within minutes.",
        "Variable reward schedules are a key part of the appeal. You never know whether the next piece will be a helpful long straight or an awkward Z-shape. This uncertainty triggers dopamine responses that keep you engaged, similar to the mechanics used in many popular games. Awareness of this effect helps you play intentionally rather than compulsively.",
        "Healthy play means setting a timer or a score target and stopping when you reach it. Because Snakris has no fail state and no daily login bonus, there is no external pressure to keep going. Play for fun, not obligation, and take breaks when your hands or eyes feel tired.",
        "Regular falling-block play improves processing speed, spatial working memory, and rapid decision-making. The brain practices predicting where shapes will land and how to clear rows efficiently. These skills generalize to tasks that require quick visual analysis under time pressure.",
      ],
    },
    {
      title: "Snakris vs. Classic Tetris: What Changed",
      excerpt:
        "Compare the modern browser version to the original 1984 classic and see what the evolution means for players.",
      headings: [
        "Original Tetris Design",
        "Modern Enhancements",
        "Rule Simplifications",
        "Browser-Native Access",
        "Which Should You Play",
      ],
      body: [
        "Classic Tetris was created by Alexey Pajitnov in 1984 on an Electronika 60 computer. It used a simple grid, seven tetromino shapes, and a hard drop that appeared in later versions. The original game had no level select, no hold piece, and no online scoreboards. Its charm was raw simplicity.",
        "Modern versions like Snakris add a piece preview, smooth animations, and responsive touch controls. The preview lets you plan ahead, the animations make falling and clearing rows feel satisfying, and the touch interface opens the game to phones and tablets. These enhancements do not change the core puzzle; they simply remove friction.",
        "Some modern variants add hold pieces, ghost pieces, and cascading clears. Snakris keeps the classic rules: no hold, no ghost piece, and no extra mechanics beyond rotation and dropping. This restraint respects the original design and keeps the learning curve gentle for new players.",
        "Because Snakris runs in the browser, it removes every barrier to play. No cartridge, no console, no download, and no account. Open the page and start clearing rows. This accessibility is the biggest difference from the 1984 original, which required access to a Soviet-era computer lab.",
        "If you love the raw challenge of the original, Snakris will feel familiar and fair. If you want a modern take with cleaner controls and mobile support, Snakris delivers that without adding unnecessary complexity. Either way, the core loop of stacking, clearing, and chasing a high score remains timeless.",
      ],
    },
  ],
};
