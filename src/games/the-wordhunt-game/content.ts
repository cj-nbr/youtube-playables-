import type { GameContent } from "../../shared/types";

export const content: GameContent = {
  guide: [
    {
      heading: "Goal",
      body: "Find as many hidden words as you can in the letter grid before the timer runs out. Words can run horizontally, vertically, or diagonally, and longer words are worth far more points than short ones.",
    },
    {
      heading: "How to play",
      body: "Drag across adjacent letters to trace a word, or type a word into the box and press Enter. If your traced or typed word matches one of the hidden words, it lights up green and scores points. Each letter used must touch the previous one, including diagonals.",
    },
    {
      heading: "Strategy",
      body: "Hunt for vowels first — every word needs at least one. Scan for common prefixes like 'ST', 'TR', and 'QU', then extend. Because scoring is squared by length, a single six-letter word can outrank three three-letter words, so chase the long ones.",
    },
    {
      heading: "Example",
      body: "You spot R-O-C-K sitting diagonally in the grid. You drag from R to K and release; it turns green and scores 160 points. Later you type 'STORM' and it is accepted because those letters trace a path elsewhere in the board.",
    },
  ],
  instructions: {
    objective:
      "Discover as many hidden words in the letter grid as possible within the time limit, scoring the most points by finding long words.",
    desktop:
      "Click and drag across neighbouring letters to spell a word, then release to submit. Letters may connect in any of the eight directions. Alternatively, type a word in the box and press Enter; the game checks whether it traces a valid path. Found words are marked and scored.",
    mobile:
      "Touch and drag your finger across adjacent letters to build a word, lifting to submit. The grid is responsive and the cells are large enough for comfortable touch play. You can also use the text box with the on-screen keyboard.",
    winning:
      "There is no single win state — your success is your final score. The game ends when the timer reaches zero. Finding every hidden word and maximising long-word bonuses gives the best possible result.",
    losing:
      "You do not 'lose' in the traditional sense, but the clock is the pressure. When time expires the round ends and your score is compared to your saved best. A low score simply means there is room to improve next round.",
    tips: [
      "Look for vowels first; every word contains at least one.",
      "Chase longer words — scoring squares with word length, so they pay off hugely.",
      "Drag in any of the eight directions, including diagonals and backwards.",
      "Use the text box to type a word you can visualise but struggle to trace.",
      "Scan for common starts like ST, TR, CL, and QU to extend quickly.",
      "Keep an eye on the timer and spend the last seconds on easy short words.",
    ],
  },
  faqs: [
    {
      q: "How do you play The WordHunt Game?",
      a: "You are given a grid of random letters and a time limit. Drag across adjacent letters — in any of eight directions — to spell a hidden word, then release. You can also type a word and press Enter. Every valid word you find scores points, with longer words worth much more.",
    },
    {
      q: "Can words go backwards or diagonally?",
      a: "Yes. Words may run horizontally, vertically, or diagonally, and they can be spelled forwards or backwards along those lines. The only rule is that each letter must touch the previous one, including diagonals.",
    },
    {
      q: "How is scoring calculated?",
      a: "Score is based on word length — roughly the square of the number of letters — so a six-letter word earns far more than two three-letter words. This rewards hunting for longer words over padding with short ones.",
    },
    {
      q: "Is there a time limit?",
      a: "Yes. Each round has a countdown timer, typically around two minutes. When it reaches zero the round ends and your score is final. The timer creates the core pressure that makes WordHunt exciting.",
    },
    {
      q: "Can I type words instead of dragging?",
      a: "Yes. There is a text box where you can type a word and press Enter. The game checks whether that word traces a valid adjacent path somewhere in the grid. It is a great fallback when a word is hard to drag accurately.",
    },
    {
      q: "How many words are hidden in the grid?",
      a: "Each grid hides a varied set of words of differing lengths. Some are short and easy, while a few long words are worth big bonuses. The exact count changes each round because the grid is regenerated every game.",
    },
    {
      q: "Does The WordHunt Game track a best score?",
      a: "Yes. Your highest score is saved locally in your browser and shown at the start of each round. Clearing your browser data or switching devices resets it, since the record is stored on your device.",
    },
    {
      q: "What is the best strategy for a high score?",
      a: "Prioritise long words, since scoring scales with length squared. Start from vowels, look for common prefixes, and sweep the grid in diagonals as well as rows and columns. Use the typed box to lock in words you can see but not easily trace.",
    },
    {
      q: "Is The WordHunt Game good for vocabulary?",
      a: "Yes. Actively searching for words strengthens spelling, pattern recognition, and vocabulary recall. The time pressure makes it a fun, intense brain workout that improves with regular play.",
    },
    {
      q: "Can kids play The WordHunt Game?",
      a: "Yes. The controls are simple drag or type, and the content is family-friendly. It is a great classroom or home activity that builds literacy skills while feeling like a game.",
    },
    {
      q: "Is The WordHunt Game free?",
      a: "Yes. It runs in the browser with no cost, no account, and no download. Open the page and start hunting immediately. Your score and best record stay private on your device.",
    },
    {
      q: "Can I play The WordHunt Game on mobile?",
      a: "Yes. The grid is responsive with large touch targets, and dragging across letters works with a finger. The typed box opens the on-screen keyboard for an alternative input method.",
    },
    {
      q: "What if I trace a word that is not hidden?",
      a: "If the traced word is not one of the hidden words, it is simply rejected and nothing scores. There is no penalty, so feel free to experiment. Only valid hidden words turn green and add points.",
    },
    {
      q: "Can the same letter cell be used twice in one word?",
      a: "No. A single traced word cannot reuse a cell; each step must move to a new adjacent letter. This keeps paths clean and matches standard word-search rules.",
    },
    {
      q: "How do I find diagonal words?",
      a: "Sweep the grid along diagonal lines just as you would rows and columns. Because the game accepts all eight directions, diagonal words are common and often among the longest, highest-scoring finds.",
    },
    {
      q: "Why are longer words worth so much more?",
      a: "Scoring scales with the square of word length, so a six-letter word can outscore several short ones combined. This design rewards deeper vocabulary and careful searching rather than quick, shallow finds.",
    },
    {
      q: "What happens when the timer ends?",
      a: "The round stops immediately, any in-progress selection is cleared, and your final score is shown against your best. You can start a fresh grid with the New game button to try for a higher score.",
    },
  ],
  blog: [
    {
      title: "The WordHunt Game — Complete Guide",
      excerpt:
        "Learn how to play The WordHunt Game, master its grid-search mechanics, and stack up long-word bonuses.",
      headings: [
        "What Is The WordHunt Game",
        "How the Grid Works",
        "Scoring by Length",
        "Tips for New Players",
        "Why It Builds Vocabulary",
      ],
      body: [
        "The WordHunt Game drops you into a grid of random letters with a ticking clock and a simple mission: find as many hidden words as you can. Words thread through the grid in any of eight directions, and your score grows with every valid find before time runs out.",
        "The grid is generated fresh each round by planting real words among filler letters. You discover them by dragging across adjacent cells or by typing a word into the box. Release or press Enter, and the game confirms whether your path spells a hidden word, lighting it up when it does.",
        "Scoring rewards length dramatically. Because points scale roughly with the square of a word's letter count, a single six-letter word can beat several short ones combined. This pushes you to scan for the big, satisfying finds rather than padding your total with easy pairs.",
        "New players improve by hunting vowels first, since every word needs one, and by sweeping diagonals as well as rows and columns. Use the typed box to capture words you can visualise but struggle to trace, and spend the final seconds grabbing quick short words to pad your score.",
        "Because every round forces active word retrieval, The WordHunt Game is a powerful vocabulary and spelling trainer. Regular play sharpens pattern recognition and recall, and the time pressure makes the workout genuinely thrilling. A few rounds a day builds real literacy gains.",
      ],
    },
    {
      title: "Grid-Sweeping Strategies That Find More Words",
      excerpt:
        "Practical scanning habits that surface hidden words other players miss.",
      headings: [
        "Start From the Vowels",
        "Sweep Every Diagonal",
        "Hunt Common Prefixes",
        "Use the Type Box",
        "Manage the Clock",
      ],
      body: [
        "Begin each scan at the vowels, because no English word exists without one. Anchor your eye on every A, E, I, O, and U, then look at the eight neighbours for a promising second letter. Vowel-first scanning finds words faster than random dragging.",
        "Most players only check rows and columns, so diagonals hide the longest, highest-scoring words. consciously sweep the grid along both diagonal directions; those paths are where the big bonuses usually live.",
        "Look for productive prefixes — ST, TR, CL, BR, QU, and SH — and extend them. Once you spot 'ST', your brain can quickly test 'STAR', 'STONE', 'STORM', and more, turning one anchor into several finds.",
        "When a word is obvious but awkward to drag, type it. The text box validates whether the word traces a real path, sparing you fiddly selections under time pressure. It is the fastest way to bank a word you already see.",
        "Keep one eye on the timer. In the final ten seconds, stop chasing long words and grab easy short ones to inflate your total. A calm clock-management habit reliably adds points to every round.",
      ],
    },
    {
      title: "Why Word Grids Are Brain Gold",
      excerpt:
        "The cognitive science behind why letter-grid games make you smarter.",
      headings: [
        "Active Recall in Action",
        "Pattern Recognition Gains",
        "Stress That Helps",
        "Spelling Made Fun",
        "A Daily Word Workout",
      ],
      body: [
        "Letter-grid games force active recall: you must pull words from memory rather than recognise them passively. This retrieval practice is one of the most reliable ways to strengthen vocabulary, and it feels like play rather than study.",
        "Constantly scanning for valid paths trains pattern recognition, the same skill behind fluent reading and fast mental maths. Over time your brain gets quicker at spotting letter combinations that form words, speeding up thinking overall.",
        "The gentle time pressure adds productive stress. A modest deadline focuses attention and triggers a small dopamine reward on each find, which reinforces the behaviour. The result is engaged, efficient practice without anxiety.",
        "Spelling improves because you build words letter by letter under your own control. Wrong paths simply fail, so you learn correct letter order through immediate feedback. That trial-and-error loop is exactly how durable spelling is formed.",
        "Make WordHunt a daily five-minute habit. Short, frequent rounds deliver the spaced repetition science favours, and tracking your best score keeps you coming back. Within weeks you will feel quicker, wider-ranging, and more confident with words.",
      ],
    },
  ],
};
