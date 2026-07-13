import type { GameContent } from "../../shared/types";

export const content: GameContent = {
  guide: [
    {
      heading: "Goal",
      body: "Identify the famous landmark, city, or country shown in each round. You score points for every correct guess and build a streak for fast, confident answers. There are 10 rounds per quiz, and the round timer rewards quick thinking.",
    },
    {
      heading: "How to play",
      body: "Each round shows a landmark card with a vivid illustration and a short visual clue. Four answer buttons appear below it. Tap or click the option you believe is correct. A correct pick plays a success tone and adds to your score; a wrong pick shows the right answer before moving on.",
    },
    {
      heading: "Strategy",
      body: "Read the clue carefully before locking in an answer — the hint often narrows the options to two. Use the process of elimination on the four choices, and lean on geography you already know: continents, languages, and famous skylines are the fastest tells.",
    },
    {
      heading: "Example",
      body: "A round shows a tilted tower and the clue 'This Italian city is famous for its leaning bell tower.' The options are Rome, Pisa, Venice, and Florence. You tap Pisa, the card turns green, and your score climbs by the round's time bonus.",
    },
  ],
  instructions: {
    objective:
      "Correctly identify the city or country behind each landmark across 10 rounds and finish with the highest possible score.",
    desktop:
      "Use your mouse to click the answer button you think is correct. Each round shows a landmark illustration with a clue and four choices. A correct answer scores points plus a speed bonus; a wrong answer reveals the right one. The quiz auto-advances to the next round.",
    mobile:
      "Tap the answer button you believe is correct. Large touch targets make it easy to play with one thumb. The round timer keeps ticking, so tap confidently. The layout is fully responsive and works in any mobile browser.",
    winning:
      "There is no single fail state — every round counts toward your total. You 'win' the quiz by finishing all 10 rounds with a strong score, and your best total is saved locally so you can chase a new personal record.",
    losing:
      "You cannot truly lose, but wrong answers cost you points and the round timer punishes slow guesses. Run out of time on a question and it counts as incorrect. The challenge is maximising your score, not simply surviving.",
    tips: [
      "Scan the four options before reading the clue — sometimes one is obviously wrong and easy to eliminate.",
      "Watch the round timer; answering fast adds a generous speed bonus to your score.",
      "Anchor on continents first, then narrow down by language and famous landmarks.",
      "When unsure, pick the most iconic city associated with the visible landmark.",
      "Build a streak: consecutive correct answers multiply your points.",
      "Replay often — repeated quizzes build real-world geography recall.",
    ],
  },
  faqs: [
    {
      q: "How do you play Guess the Place?",
      a: "Each round shows a landmark illustration with a short clue and four answer choices. Click or tap the city or country you think is correct. Correct answers score points and a speed bonus; wrong answers reveal the right one. After 10 rounds your total is shown and your best is saved.",
    },
    {
      q: "What kinds of questions are in Guess the Place?",
      a: "Questions cover world-famous landmarks, capital cities, countries, and iconic skylines. Examples include the Eiffel Tower, the Great Wall, the Pyramids of Giza, and the canals of Venice. Each is paired with a clue to keep it fair and fun.",
    },
    {
      q: "How is the score calculated?",
      a: "You earn base points for each correct answer plus a speed bonus that shrinks as the round timer counts down. A correct-streak multiplier rewards consecutive right answers. Your final score is the sum across all 10 rounds.",
    },
    {
      q: "Is there a time limit?",
      a: "Yes. Each round has a short countdown. Answering before it runs out grants a speed bonus, while letting it expire marks the round incorrect. The timer keeps the quiz snappy and rewards quick recall.",
    },
    {
      q: "How many rounds are there?",
      a: "Each quiz is 10 rounds long. Questions are drawn from a large pool and shuffled, so no two playthroughs feel identical. You can replay as many times as you like to improve your best score.",
    },
    {
      q: "Does Guess the Place track a best score?",
      a: "Yes. Your highest total score is stored locally in your browser and shown at the start of every quiz. Clearing your browser data or switching devices resets it, since the record lives on your device rather than a server.",
    },
    {
      q: "Is Guess the Place good for learning geography?",
      a: "Absolutely. Repeated play strengthens recall of capitals, countries, and landmarks through active retrieval. The clues reinforce context, and the spaced repetition of replaying builds durable real-world knowledge.",
    },
    {
      q: "Can kids play Guess the Place?",
      a: "Yes. The illustrations are friendly, the controls are simple taps, and there is no violence or complex reading. It is a great classroom or family quiz that sneaks in geography practice while feeling like a game.",
    },
    {
      q: "Is Guess the Place free?",
      a: "Yes. It runs in the browser with no cost, no account, and no download. Open the page and start the quiz immediately. Your score and best record stay private on your own device.",
    },
    {
      q: "Can I play Guess the Place on mobile?",
      a: "Yes. The board is fully responsive with large touch targets, so it plays naturally on phones and tablets. No app install is required — just open the page in any modern mobile browser.",
    },
    {
      q: "What happens if I answer wrong?",
      a: "A wrong answer plays an error tone, marks the round incorrect, and reveals the correct city or country so you learn from it. You then move on to the next round. Wrong answers simply lower your total and break your streak.",
    },
    {
      q: "What is the speed bonus?",
      a: "The speed bonus is extra points awarded for answering quickly. It starts high when the round opens and ticks down with the timer. Fast, confident guesses therefore score far more than slow ones.",
    },
    {
      q: "How do I build a streak?",
      a: "Answer consecutive rounds correctly without a miss. Each consecutive correct answer raises a multiplier that boosts your points. A single wrong answer or timeout resets the streak back to its base value.",
    },
    {
      q: "Are the landmarks real places?",
      a: "Yes. Every landmark, city, and country in the quiz refers to a real-world location. The illustrations are stylised representations rather than photographs, but the geography behind each question is accurate.",
    },
    {
      q: "Why does the quiz reveal the answer after a wrong guess?",
      a: "Revealing the correct answer turns every mistake into a learning moment. Active feedback right after a wrong guess is one of the most effective ways to lock the fact into memory, so you are more likely to know it next time.",
    },
    {
      q: "How can I improve my score quickly?",
      a: "Focus on speed and accuracy: eliminate obvious wrong options first, then commit. Practice the capitals of the most-visited countries, and replay daily. Over a week your streaks will lengthen and your best score will climb.",
    },
    {
      q: "Does the game need an internet connection for images?",
      a: "No external image files are loaded. Landmarks are drawn with lightweight, self-contained illustrations, so the quiz works offline once the page is open and never stalls on a slow network.",
    },
  ],
  blog: [
    {
      title: "Guess the Place — Complete Guide",
      excerpt:
        "Learn how to play Guess the Place, master its landmark quiz format, and chase your best geography score.",
      headings: [
        "What Is Guess the Place",
        "How the Quiz Works",
        "Scoring and the Speed Bonus",
        "Tips for New Players",
        "Why It Builds Geography Skills",
      ],
      body: [
        "Guess the Place is a fast-paced geography quiz where every round shows a famous landmark illustration with a short clue and four answer choices. Your job is to identify the correct city or country before the round timer runs out. Ten rounds make up a quiz, and your total score is the goal to beat.",
        "The rules are simple. A card displays a stylised landmark and a hint, then four buttons offer possible answers. Click or tap your choice: a correct answer scores points and a speed bonus, while a wrong answer reveals the right location so you learn from it. The quiz then advances automatically to the next round.",
        "Scoring rewards both knowledge and quickness. Each correct answer grants base points plus a speed bonus that shrinks with the timer, and a consecutive-correct streak applies a multiplier. Your best total is saved locally, giving you a personal record to chase on every replay.",
        "New players improve fast with a few habits. Eliminate obvious wrong options first, anchor on the continent, then narrow by language and famous sights. Answer confidently and quickly to bank the speed bonus, and protect your streak by avoiding careless misses.",
        "Because every question requires active recall, Guess the Place doubles as a geography trainer. Repeated play strengthens memory of capitals, countries, and landmarks, and the reveal-after-miss feedback turns errors into durable learning. A few minutes a day noticeably sharpens your world knowledge.",
      ],
    },
    {
      title: "Geography Shortcuts That Win Quizzes",
      excerpt:
        "Simple mental shortcuts that help you place any landmark on the map in seconds.",
      headings: [
        "Start With the Continent",
        "Listen for Language",
        "Lean on Iconic Skylines",
        "Use the Process of Elimination",
        "Practice With Themed Sets",
      ],
      body: [
        "The fastest way to narrow a geography question is to lock the continent first. Once you know whether a landmark sits in Europe, Asia, the Americas, Africa, or Oceania, you have already cut the answer pool dramatically and can reason from there.",
        "Language is a powerful tell. Spotting Cyrillic, Arabic, or Asian scripts in a clue, or hearing a Romance-language sound in a city name, points you toward specific regions. Even a single borrowed word in the clue can eliminate half the options.",
        "Iconic skylines and structures are the easiest patterns to memorise. The Eiffel Tower, the Colosseum, the Sydney Opera House, and the Pyramids are visual anchors that immediately suggest a country. Build a mental album of ten such icons and most quizzes become easy.",
        "When the answer is not obvious, fall back on elimination. Cross out the options you know are wrong, then choose the most plausible remaining city. Even a 50/50 guess beats freezing, and the reveal afterward still teaches you the correct fact.",
        "Train in themed batches — a week of European capitals, then a week of Asian wonders. Focused repetition builds stronger neural links than scattered practice. Pair it with Guess the Place replays and your streak lengths will grow week over week.",
      ],
    },
    {
      title: "Turn Trivia Night Into Travel Knowledge",
      excerpt:
        "How a two-minute daily quiz quietly builds the kind of geography confidence that impresses.",
      headings: [
        "Two Minutes a Day",
        "Active Recall Beats Reading",
        "Learn From Your Misses",
        "Track a Visible Streak",
        "Make It a Family Habit",
      ],
      body: [
        "You do not need long study sessions to get better at geography. A two-minute quiz like Guess the Place, played daily, delivers the spaced repetition that research shows is ideal for long-term memory. Short and frequent wins over occasional marathons.",
        "Quizzes force active recall — pulling facts from memory rather than re-reading them. This is far more effective than passively scrolling a list of capitals. Each round you retrieve a location, strengthening that memory path for next time.",
        "The reveal-after-miss design is the secret sauce. When you get a question wrong, the correct answer appears immediately in context, which is exactly when your brain is primed to absorb it. Misses become the most valuable moments of the quiz.",
        "Watching your best score and streak climb is motivating in a way abstract 'learning' is not. A visible number turns practice into a game you want to win, and that intrinsic drive keeps you coming back without any external pressure.",
        "Play with family or a classroom and the quiz becomes social. Comparing streaks and debating a tricky landmark sparks curiosity and conversation. It is a low-effort, high-reward habit that quietly makes everyone a little more worldly.",
      ],
    },
  ],
};
