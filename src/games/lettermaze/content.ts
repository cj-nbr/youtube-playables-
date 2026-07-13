import type { GameContent } from "../../../shared/types";

export const content: GameContent = {
  guide: [
    {
      heading: "Goal",
      body: "Steer your explorer through a letter-filled maze and gather the tiles that spell the target word shown above the board. Each finished word adds to your score, and a new word and freshly generated maze appear immediately. Spell as many words as you can before the timer reaches zero.",
    },
    {
      heading: "How to play",
      body: "Move one cell at a time using the arrow keys, the WASD keys, or the on-screen direction pad. Walls block movement, so you must find an open path. The next letter you need glows on the board; step onto any glowing cell to collect it and advance to the following letter in the word.",
    },
    {
      heading: "Strategy",
      body: "Read the whole word first, then plan a route that visits its letters in order without backtracking through dead ends. Because letters are collected only in sequence, ignore glowing tiles that are far away when a closer copy of the same letter exists. Keep the clock in mind and favor short, efficient loops.",
    },
    {
      heading: "Example",
      body: "If the target word is MAZE, the board first highlights every M. Walk to the nearest M to collect it, then the A tiles light up, then Z, then E. Reaching the final E completes MAZE, banks the points, and drops you into a brand-new maze with a new word to chase.",
    },
  ],
  instructions: {
    objective:
      "Navigate the maze and collect glowing letter tiles in order to spell each target word, completing as many words as possible before the timer runs out.",
    desktop:
      "Use the arrow keys or WASD to move your explorer one cell in any open direction. Walls stop movement. Step onto a highlighted cell to collect the current needed letter; when the word is complete a new maze loads automatically.",
    mobile:
      "Tap the on-screen direction pad below the maze to move up, down, left, or right. Swipes and taps are fully touch-friendly. Land on a glowing tile to collect the next letter, and keep moving to finish the word before time expires.",
    winning:
      "There is no fixed finish line — the goal is a high score. Every word you spell before the timer ends increases your total, and your best score is saved so you can keep beating it.",
    losing:
      "The round ends when the countdown timer reaches zero. Any partially spelled word does not count, so try to complete whole words rather than leaving them unfinished when time is short.",
    tips: [
      "Scan for the closest copy of the letter you currently need instead of the first one you notice.",
      "Plan two or three letters ahead so you never walk into a dead end at the wrong moment.",
      "Corners and edges often hide useful tiles — do not ignore the outer ring of the maze.",
      "Short words spelled quickly can out-score one long word you never finish.",
      "Use the direction pad rhythmically on mobile to avoid overshooting a junction.",
      "Keep half an eye on the timer and commit to a route rather than wandering.",
    ],
  },
  faqs: [
    {
      q: "How do you play Letter Maze?",
      a: "Move your explorer through the maze using the arrow keys, WASD, or the on-screen pad, and step onto the glowing tiles that spell the target word. Collect the letters in order to complete each word, then a new maze appears. Finish as many words as you can before the timer runs out.",
    },
    {
      q: "What are the rules of Letter Maze?",
      a: "You collect a word's letters strictly in sequence. Only the currently needed letter is highlighted, and you must reach one of those tiles to advance. Walls block movement, and the game ends when the countdown timer hits zero. Each completed word adds to your score.",
    },
    {
      q: "How do I move in the maze?",
      a: "On desktop, use the arrow keys or the W, A, S, and D keys to move one cell up, left, down, or right. On mobile or tablet, tap the direction pad shown beneath the board. Movement is blocked by walls, so you can only travel along open corridors.",
    },
    {
      q: "Why can't I walk through some walls?",
      a: "The board is a true maze, so solid walls separate many cells. If a direction does not respond, a wall is in the way and you must find another route. Reading the corridors before you move helps you avoid dead ends and wasted seconds.",
    },
    {
      q: "How does letter collection work?",
      a: "The word is spelled one letter at a time. The tiles matching your current needed letter glow, and stepping onto any of them collects that letter and moves you to the next one. You never have to collect letters in a specific location — only in the correct order.",
    },
    {
      q: "What happens when I finish a word?",
      a: "Completing a word plays a success sound, adds a point to your score, and instantly generates a brand-new maze with a fresh target word and your explorer back at the start. The timer keeps running, so momentum matters between words.",
    },
    {
      q: "Is there a timer in Letter Maze?",
      a: "Yes. Each round is a countdown, and your objective is to spell as many words as possible before it reaches zero. The remaining time is shown in the status line so you can pace yourself and decide whether to chase a long word or several short ones.",
    },
    {
      q: "How is my score calculated?",
      a: "Your score is simply the number of complete words you spell during a round. Longer words take more moves but count the same as short ones, so efficient routing and quick decisions are the real keys to a high total.",
    },
    {
      q: "Does my best score save?",
      a: "Yes. Your highest word count is stored locally in your browser and displayed each round, so you always know the number to beat. Clearing your browser data or switching devices resets it because the score lives on your device, not a server.",
    },
    {
      q: "Can I play Letter Maze on mobile?",
      a: "Absolutely. The maze scales to your screen and includes a large, touch-friendly direction pad beneath the board. No app or install is required — it runs in any modern mobile browser and works well in both portrait and landscape.",
    },
    {
      q: "What is the best strategy for a high score?",
      a: "Plan routes that gather letters in order with minimal backtracking, always aiming for the closest matching tile. Balance ambition with the clock: several quick short words can beat one slow long one. Learning to read corridors at a glance saves precious seconds.",
    },
    {
      q: "Are the mazes always different?",
      a: "Yes. Every word generates a freshly randomized maze and letter layout, so no two rounds play the same. This keeps the challenge fresh and rewards genuine navigation skill rather than memorizing a fixed board.",
    },
    {
      q: "What if I collect the wrong letter?",
      a: "You cannot collect a wrong letter — only tiles matching the current needed letter are active. Stepping on other tiles simply moves you without penalty, so you are free to walk across the board to reach the glowing letters you need.",
    },
    {
      q: "Is Letter Maze good for kids?",
      a: "Yes. It combines spelling, planning, and simple navigation in a friendly, low-pressure package with no violence. Children practice recognizing letters and thinking a few steps ahead, making it a fun learning game as well as an arcade challenge.",
    },
    {
      q: "What skills does Letter Maze build?",
      a: "It sharpens spatial reasoning, route planning, spelling, and quick decision-making under a gentle time limit. Because you must sequence letters while navigating walls, it exercises both language and problem-solving parts of your thinking at once.",
    },
    {
      q: "Can I pause the game?",
      a: "The round is built around a live countdown, so the fairest approach is to finish a run and start fresh with the New game button. Each new round resets the timer, the maze, and the current word so you always begin on equal footing.",
    },
    {
      q: "Why is only one letter highlighted at a time?",
      a: "Highlighting a single letter keeps the puzzle focused: you always know exactly what to look for next. It turns each word into a short sequence of clear sub-goals, which makes routing decisions cleaner and the game easy to pick up.",
    },
    {
      q: "Is Letter Maze free to play?",
      a: "Yes. Letter Maze runs entirely in your browser at no cost, with no account and no download. Open the page and start navigating immediately. Your best score stays private on your own device.",
    },
    {
      q: "What games are similar to Letter Maze?",
      a: "It blends classic maze navigation with word games like Boggle and word searches. If you enjoy pathfinding puzzles, spelling challenges, or arcade collectors where you gather items along a route, Letter Maze sits right at that crossroads.",
    },
  ],
  blog: [
    {
      title: "Letter Maze — Complete Guide",
      excerpt:
        "Everything you need to start spelling words on the move, from controls to scoring and your first high-score run.",
      headings: [
        "What Is Letter Maze",
        "Controls and Movement",
        "How Words Are Collected",
        "Scoring and the Timer",
        "Your First Winning Run",
      ],
      body: [
        "Letter Maze is a fast, browser-native puzzle that fuses classic maze navigation with word building. Each round drops your explorer into a freshly generated grid where every cell shows a letter and solid walls carve out winding corridors. Above the board sits a target word, and your job is to travel the maze to spell it.",
        "Movement is simple and responsive. On desktop you use the arrow keys or WASD to step one cell at a time, while on mobile a large direction pad appears beneath the board. Walls block movement, so part of the challenge is spotting an open path before you commit to a direction.",
        "Words are collected in strict order. The game highlights every tile matching the letter you currently need; walk onto any one of them and you advance to the next letter. This means you are never hunting for a single hidden square — you are choosing the most efficient of several glowing options as you weave through the maze.",
        "Scoring rewards completed words, and a countdown timer keeps the pressure on. Each finished word adds a point and instantly generates a new maze and word, with your explorer returned to the start. Your best word count is saved locally so every session gives you a clear number to beat.",
        "For your first strong run, read the whole word before moving, aim for the nearest copy of each needed letter, and avoid backtracking into dead ends. Do not be afraid to abandon a long word if the clock is low — several quick short words often out-score one ambitious attempt you cannot finish.",
      ],
    },
    {
      title: "Maze Navigation Tips for Faster Spelling",
      excerpt:
        "Practical techniques to read corridors quickly, plan routes, and shave seconds off every word.",
      headings: [
        "Read the Maze First",
        "Plan Letters in Order",
        "Choose the Nearest Tile",
        "Avoid the Dead-End Trap",
        "Build a Movement Rhythm",
      ],
      body: [
        "The single biggest speed gain comes from reading the maze before you move. Take a heartbeat to trace the open corridors around your explorer and toward the glowing tiles. A short pause to plan almost always beats a flurry of moves that end in a wall.",
        "Because letters must be gathered in sequence, plan your route letter by letter. Look at the current highlighted letter, pick your target tile, then glance ahead to where the next letter is likely to send you. Chaining these mini-goals keeps your path smooth and purposeful.",
        "When several tiles share the letter you need, always choose the closest reachable one. Distance in a maze is measured in corridors, not straight lines, so the nearest-looking tile is not always the fastest. Favor the option with a clear, unobstructed path.",
        "Dead ends are the biggest time thieves. If a corridor narrows toward a single tile with no exit, make sure that tile is the one you actually need before entering. Otherwise you will spend extra moves reversing out, and those seconds add up fast across a round.",
        "Finally, develop a steady movement rhythm, especially on the touch pad. Tapping in controlled beats prevents overshooting junctions and lets you react to walls in time. Smooth, deliberate movement almost always beats frantic tapping when you are chasing a high score.",
      ],
    },
    {
      title: "The Brain Benefits of Word-Maze Games",
      excerpt:
        "Why combining navigation with spelling makes Letter Maze a genuine workout for your mind.",
      headings: [
        "A Dual-Task Challenge",
        "Training Spatial Reasoning",
        "Reinforcing Spelling",
        "Decision-Making Under Time",
        "Making It a Daily Habit",
      ],
      body: [
        "Letter Maze asks your brain to do two things at once: navigate a spatial puzzle and construct a word. This dual-task demand is what makes it more engaging than either a plain maze or a plain word game. Juggling both skills strengthens your ability to switch focus quickly.",
        "Navigating corridors and planning routes exercises spatial reasoning, the mental system you use to picture and move through space. Repeatedly reading a maze and predicting paths sharpens this skill, which carries over to everyday tasks like navigation and visual planning.",
        "Spelling each target word letter by letter reinforces word recognition and sequencing. Seeing the whole word, then locating its letters in order, blends reading with active recall. Over many rounds this can make familiar words feel even more automatic.",
        "The countdown adds decision-making under mild time pressure. You constantly weigh whether to chase a distant letter, take a safer route, or abandon a word for a quicker one. Practicing these fast trade-offs builds confidence in making good choices when the clock is ticking.",
        "As with any brain game, short and regular sessions beat rare marathons. A few focused rounds a day keep the challenge enjoyable, steadily improve your best score, and give your mind a pleasant, low-stress workout that blends language and spatial thinking.",
      ],
    },
  ],
};
