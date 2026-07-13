import type { GameContent } from "../../../shared/types";

export const content: GameContent = {
  guide: [
    {
      heading: "Goal",
      body: "Type each falling word before it reaches the bottom of the screen. Correct typing freezes the word and awards points. Mistypes slow you down, and words that hit the bottom cost a life. Survive as long as possible and chase a high score.",
    },
    {
      heading: "How to play",
      body: "Words drop from the top of the play area at steadily increasing speed. Type the word exactly and press Enter or Space to confirm. The word vanishes and you earn points based on its length and your current speed multiplier. Misspelled words or words that reach the bottom reduce your lives.",
    },
    {
      heading: "Strategy",
      body: "Focus on the longest words first because they drop faster and descend farther. Keep your eyes near the bottom of the field to give yourself more reaction time. Use the preview line to see which words are coming next and plan your typing rhythm.",
    },
    {
      heading: "Example",
      body: "A five-letter word such as APPLE drops at moderate speed. Type it quickly and press Space to finish it. A longer word like ELEPHANT earns more points but descends faster, so it demands earlier attention. A missed word that hits the bottom disappears along with one life.",
    },
  ],
  instructions: {
    objective:
      "Type every falling word before it reaches the bottom of the screen. Survive as long as possible and beat your high score.",
    desktop:
      "Type the word and press Enter or Space to confirm. Backspace corrects mistakes. The text field stays focused automatically so you never have to click back into the game.",
    mobile:
      "Use the on-screen keyboard to type each word. Press the large Submit button to confirm. The layout is optimized for fast thumb typing on phones and tablets.",
    winning:
      "There is no final level. Your score grows as long as you keep typing. The game ends when all lives are lost.",
    losing:
      "You lose a life every time a word hits the bottom. Mistyping does not immediately end the game, but it wastes precious time. When all lives are gone, the game stops and shows your final score.",
    tips: [
      "Keep your eyes on the bottom of the screen for maximum reaction time.",
      "Use peripheral vision to track upcoming words while typing the current one.",
      "Prioritize longer words because they reward more points and drop faster.",
      "Do not backspace excessively; correct only the last two characters and finish.",
      "Build rhythm by typing one word per beat instead of hunting for the keyboard.",
      "Pause briefly when the speed jumps to a new multiplier to catch your breath.",
    ],
  },
  faqs: [
    {
      q: "How do you play SpeedType?",
      a: "Words fall from the top. Type each word exactly and press Space or Enter to confirm. Correct words give points and extra time. Words that reach the bottom cost a life. The game ends when lives run out.",
    },
    {
      q: "Is there a timer?",
      a: "Yes. A countdown timer ticks constantly and extends slightly with each correct word. You can also pause the game from the control bar if you need a break.",
    },
    {
      q: "Does difficulty increase?",
      a: "Yes. Words fall faster and become longer as your score rises. New word categories unlock at higher levels, including compound words and proper nouns.",
    },
    {
      q: "Can I play on mobile?",
      a: "Yes. A large on-screen keyboard and submit button make it playable on phones and tablets without a physical keyboard.",
    },
    {
      q: "What happens if I misspell a word?",
      a: "Mistyped text does not score until corrected. If the word reaches the bottom before you fix it, you lose a life. Partial credit is not given.",
    },
    {
      q: "Is there a high score?",
      a: "Yes. Your highest score is stored locally and displayed before each new game. Try to beat your record by improving accuracy and reaction time.",
    },
    {
      q: "Does SpeedType improve typing speed?",
      a: "Yes. Regular play builds muscle memory and rhythm. Many players see faster real-world typing within a few weeks of short daily sessions.",
    },
    {
      q: "Are the words English?",
      a: "Yes. The word list uses American English spelling. Proper nouns and compound words are introduced at higher levels.",
    },
    {
      q: "Can I pause the game?",
      a: "Yes. Click or tap the Pause button to temporarily stop the falling words and timer. Press Resume to continue from where you left off.",
    },
    {
      q: "What keyboard shortcuts are available?",
      a: "Enter and Space confirm words. Escape pauses the game. Backspace corrects errors. The game keeps the input focused so you never have to click away.",
    },
    {
      q: "Is SpeedType free?",
      a: "Yes. It runs in the browser with no downloads, no accounts, and no cost. Open the page and start typing immediately.",
    },
    {
      q: "How many words are in the library?",
      a: "The base library contains hundreds of common words, and more are added in updates. The game picks words dynamically so no two runs feel identical.",
    },
    {
      q: "What is the best way to build speed?",
      a: "Practice daily for ten to fifteen minutes. Focus on accuracy first, then gradually increase speed. Use peripheral vision to track the next word while finishing the current one.",
    },
    {
      q: "Is the game accessible?",
      a: "High-contrast text, adjustable speed hints, and optional keyboard-only navigation make it accessible for a wide range of players. Screen-reader support is limited due to the fast-paced format.",
    },
    {
      q: "What if a word hits the bottom?",
      a: "The word disappears and you lose one life. The game tracks how many words survived versus how many fell. Try to maintain a high survival rate to extend your run.",
    },
  ],
  blog: [
    {
      title: "How to Improve Typing Speed With Games",
      excerpt:
        "Turn quick typing practice into a daily habit with these proven techniques.",
      headings: [
        "Start Slow and Accurate",
        "Learn Touch Typing Basics",
        "Use Games for Drills",
        "Track Your Progress",
        "Stay Consistent",
      ],
      body: [
        "Speed built on mistakes is useless. Begin by typing slowly and ensuring every keystroke is correct. Muscle memory forms from repeated correct motions, so accuracy first prevents bad habits.",
        "Touch typing means using all ten fingers without looking at the keyboard. Home-row positioning places your fingers on ASDF and JKL; from there, every key has a dedicated finger. SpeedType rewards this posture because it keeps your eyes on the falling words.",
        "Games condense typing drills into short, addictive sessions. Instead of boring exercises, you get unpredictable word shapes and time pressure that mimic real typing tasks. Play five minutes daily and compare your words-per-minute across weeks.",
        "Track your best score in SpeedType and celebrate improvements. Even a ten-point gain means your fingers are adapting. Write down your best runs to see trends and identify when fatigue slows you down.",
        "Consistency outperforms marathons. Ten focused minutes every day build stronger habits than one long weekly session. Pair SpeedType with a calm typing app for warm-ups and you will see steady gains.",
      ],
    },
    {
      title: "Why Typing Games Are Effective",
      excerpt:
        "The science behind how games build real-world typing skills faster than drills alone.",
      headings: [
        "Flow and Engagement",
        "Adaptive Challenge",
        "Immediate Feedback",
        "Cognitive Flexibility",
        "Habit Formation",
      ],
      body: [
        "When typing feels like a game, you enter flow. Flow is the optimal learning state: attention is sharp, motivation is high, and time distorts. A well-designed typing game keeps you in that zone longer than static drills.",
        "Good games adapt to your skill. If words fall too slowly you stop improving; if they fall too fast you get frustrated. SpeedType scales with your score to keep challenge proportional to ability.",
        "Instant feedback is critical for motor learning. Every word tells you whether your keystroke sequence was correct or not. That tight correction loop is what turns conscious typing into automatic muscle memory.",
        "Typing under time pressure trains cognitive flexibility: you switch between planning the next word and correcting errors. That dual-task ability transfers to writing emails, coding, and real-time communication.",
        "Games trigger dopamine release when you beat a score or clear a streak. That reward loop makes you want to play again, turning typing practice into a habit rather than a chore.",
      ],
    },
    {
      title: "From Beginner to Typing Pro",
      excerpt:
        "A structured path to faster, more accurate typing using SpeedType and complementary exercises.",
      headings: [
        "Home-Row Foundation",
        "Accuracy Milestones",
        "Speed Targets",
        "Advanced Drills",
        "Real-World Application",
      ],
      body: [
        "Before racing for speed, cement the home row. Position your fingers on ASDFGHJKL and return to it after every keystroke. SpeedType works best when you keep your hands anchored and use all fingers evenly.",
        "Set accuracy milestones. Aim for 95% accuracy for a full week before chasing speed. Once errors drop, speed naturally increases because you spend less time correcting mistakes.",
        "Typing speed is measured in words per minute, or WPM. Beginners type around thirty WPM; intermediate typists reach fifty to sixty; advanced players exceed eighty. Use SpeedType to find your baseline and add five WPM per month.",
        "Advanced drills include pangram practice: typing sentences that contain every letter of the alphabet. Pangrams expose weak keys. Combine them with SpeedType to balance speed and all-finger coverage.",
        "Finally, apply typing practice to real tasks. Write emails, chat, and code with intention. The goal is not just to type fast in a game, but to communicate more efficiently in everyday life.",
      ],
    },
  ],
};
