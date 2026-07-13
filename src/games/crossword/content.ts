import type { GameContent } from "../../../shared/types";

export const content: GameContent = {
  guide: [
    {
      heading: "Goal",
      body: "Fill the crossword grid with correct words by solving the given clues. Click or tap any white square to start typing, and use the arrow keys or on-screen buttons to navigate between cells. Complete every across and down word to finish the puzzle.",
    },
    {
      heading: "How to play",
      body: "Read the clue list for Across and Down. Click the clue to highlight its corresponding squares on the grid. Type letters to fill the highlighted cells one by one. Press Tab or click the arrow buttons to switch between across and down words. Click Reveal to see the answer for a single word or the entire puzzle.",
    },
    {
      heading: "Navigation",
      body: "Click any white square to select it. Use the arrow keys to move up, down, left, or right between cells. Press Tab to jump to the next word in the current direction. Press Shift plus Tab to jump to the previous word. The selected word is highlighted so you always know where you are typing.",
    },
    {
      heading: "Checking answers",
      body: "Click the Check button to compare your current entries against the correct letters. Correct letters turn green, while incorrect letters turn red. Checking does not reveal the answer; it only highlights errors so you can fix them yourself. Use Reveal only when you are truly stuck.",
    },
  ],
  instructions: {
    objective:
      "Solve all across and down clues and fill every letter in the grid correctly to complete the crossword puzzle.",
    desktop:
      "Click any white square to select it and start typing. Use arrow keys to navigate between cells. Press Tab to switch between across and down words. Click Check to highlight errors in green and red. Click Reveal to show the answer for a single word or the whole puzzle.",
    mobile:
      "Tap any white square to select it and bring up the on-screen keyboard. Tap clues to highlight their squares. Use the arrow buttons on the keyboard to navigate. Check and Reveal buttons are always visible at the top of the screen.",
    winning:
      "You win when every letter in the grid matches the correct answer. The game detects this automatically and shows a congratulations message along with your solve time and best time.",
    losing:
      "There is no lose state. You can use Reveal as many times as needed. The only tracked metric is your solve time, and the only penalty for using Reveal is that it does not improve your personal best time.",
    tips: [
      "Solve the shortest clues first; they are usually the easiest and they unlock letters for longer words.",
      "Read both across and down clues at the same intersection to cross-check letters.",
      "Pay attention to the number of squares in a word; the length often narrows down the possibilities quickly.",
      "Use Reveal sparingly if you want a better best-time record.",
      "Click a clue to jump directly to its starting square instead of hunting for it manually.",
      "Check your work periodically rather than waiting until the end; early errors compound.",
    ],
  },
  faqs: [
    {
      q: "How do you play Crossword?",
      a: "Read the Across and Down clues, then click or tap the matching squares on the grid and type the letters. Use Tab to switch between words, Check to highlight errors, and Reveal to show answers. The puzzle is complete when every letter is correct.",
    },
    {
      q: "What are the rules of Crossword?",
      a: "Every white square must contain a letter. Black squares separate words and cannot be filled. Clues are numbered and grouped by Across and Down. Letters must match at every intersection. You may use Reveal and Check as often as needed.",
    },
    {
      q: "Can I use Reveal during the puzzle?",
      a: "Yes. The Reveal button shows the correct letters for the currently selected word or for the entire grid. Using Reveal does not end the game, but it does prevent you from earning a personal best time if you rely on it heavily.",
    },
    {
      q: "How does the Check button work?",
      a: "Check compares every letter you have typed against the correct answer. Correct letters turn green, incorrect letters turn red, and empty cells stay white. Check does not fill in missing letters; it only highlights errors so you can fix them yourself.",
    },
    {
      q: "What is the best way to start a crossword?",
      a: "Start with the shortest clues, because short words have fewer possible answers and they unlock intersecting letters for longer words. Fill in the easy wins first, then use those letters to crack the harder clues.",
    },
    {
      q: "Can I play Crossword on mobile?",
      a: "Yes. Tap any cell to select it, then use the on-screen keyboard to type. The layout is responsive and works on phones and tablets. Arrow buttons let you navigate without a physical keyboard.",
    },
    {
      q: "Is there a timer in Crossword?",
      a: "Yes. A timer starts when you make your first letter entry and stops when the puzzle is complete. Your best time is saved locally and shown before each new puzzle. Using Reveal does not stop the timer, so be mindful if you are chasing a fast record.",
    },
    {
      q: "What happens when I complete the puzzle?",
      a: "When every letter matches the correct answer, the game shows a congratulations message, your total solve time, and whether you beat your previous best. You can then start a new puzzle with a fresh grid and new clues.",
    },
    {
      q: "Are the puzzles randomly generated?",
      a: "Each puzzle is assembled from a curated word list and designed to have a unique solution with no ambiguous intersections. The grids and clues are generated fresh every time, so no two puzzles are identical.",
    },
    {
      q: "Can I skip a clue?",
      a: "Yes. You can fill words in any order. Click any clue to jump directly to its starting square, or click any white square on the grid to select the word it belongs to. There is no required sequence.",
    },
    {
      q: "Why do some clues have numbers?",
      a: "Numbers correspond to the starting square of each word. Across and Down words that share the same starting square have the same number. The numbering runs left to right, top to bottom, following standard crossword convention.",
    },
    {
      q: "What should I do if I am stuck on a clue?",
      a: "First, fill in the letters you already know from intersecting words. If that is not enough, click Reveal for that specific word to see the answer. You can also use Check to confirm which letters in the word are correct without revealing the full answer.",
    },
    {
      q: "Is Crossword free to play?",
      a: "Yes. Crossword runs in the browser with no downloads, no accounts, and no cost. Open the page, read the clues, and start typing. Your best times and progress are saved locally on your device.",
    },
    {
      q: "How can I solve crosswords faster?",
      a: "Memorize common short words, learn crossword conventions such as abbreviations and wordplay, and always check intersecting letters before committing to an answer. Practice with easier puzzles first to build confidence before tackling harder grids.",
    },
    {
      q: "Does Crossword work offline?",
      a: "Yes. Once the page has loaded, the game runs entirely in your browser. Scores and best times are saved locally, so you can play without an internet connection until you refresh or close the tab.",
    },
    {
      q: "What makes a good crossword clue?",
      a: "A good clue is concise, accurate, and has only one answer that fits the grid. It may use wordplay such as anagrams, homophones, or hidden words, but it never tricks the solver with unfair ambiguity. The best clues make you smile when you finally see the answer.",
    },
  ],
  blog: [
    {
      title: "How to Solve Crosswords Faster",
      excerpt:
        "Master the techniques that experienced solvers use to breeze through clues and shave minutes off their best time.",
      headings: [
        "Start with the Shortest Clues",
        "Use Intersecting Letters",
        "Learn Common Crossword Words",
        "Spot Wordplay Signals",
        "Practice Daily",
      ],
      body: [
        "The fastest solvers always begin with the shortest clues. A three-letter word has very few possible answers, and solving it early unlocks intersecting letters for longer words. Fill in all the easy wins first before you tackle the harder clues; the letters you place will often make the difficult ones obvious.",
        "Intersecting letters are your best friend. When two words cross, a single correct letter confirms or rejects multiple candidate answers at once. If a Down clue could be APPLE or APPLY, and the Across clue already has a P in the shared square, you know instantly which word fits. Always check both directions before committing.",
        "Crossword constructors rely on a shared vocabulary of common short words. Words like ERA, ORE, ELI, and ERE appear frequently because they fit many grids. Learning this core list lets you recognize answers instantly instead of working through every possibility.",
        "Clues often contain hidden signals. Words like maybe, perhaps, or about suggest a homophone or approximation. Indicators such as essentially, roughly, or in a way point to wordplay. Spotting these hints turns a vague clue into a precise answer.",
        "Daily practice is the fastest path to speed. Even five minutes a day builds pattern recognition and confidence. Track your best time and try to beat it by a few seconds each session. Over weeks, you will find yourself solving puzzles that once felt impossible in record time.",
      ],
    },
    {
      title: "The History of the Crossword Puzzle",
      excerpt:
        "From newspaper columns to browser-native grids, trace the evolution of one of the world's most popular puzzles.",
      headings: [
        "Arthur Wynne and the First Crossword",
        "Newspaper Golden Age",
        "The Cryptic Tradition",
        "Digital Crosswords",
        "Why Crosswords Endure",
      ],
      body: [
        "The first crossword puzzle appeared on December 21, 1913, in the New York World. Created by Liverpool-born journalist Arthur Wynne, it was a diamond-shaped grid with no black squares and a set of simple clues. Wynne called it a word-cross puzzle, but the name quickly evolved to crossword.",
        "By the 1920s, crosswords had become a national obsession in the United States. The New York Times launched its own crossword in 1942, elevating the puzzle from entertainment to a respected daily ritual. Newspapers across the world followed, and the crossword became a staple of breakfast reading.",
        "Cryptic crosswords developed in Britain during the 1920s and 1930s, introducing a stricter set of wordplay rules. Clues combine definitions with anagrams, hidden words, and reversals, making them a favorite among language lovers. The cryptic tradition remains strong in the UK, Australia, and Commonwealth nations.",
        "Browser-native crosswords like this one remove the need for a newspaper or a dedicated app. They load instantly, adapt to any screen size, and save progress automatically. The digital format also enables new features such as checking, revealing, and timer tracking that paper puzzles cannot provide.",
        "Crosswords endure because they balance accessibility with depth. A beginner can solve an easy puzzle in minutes, while an expert can spend an hour on a challenging grid. That range, combined with the satisfaction of cracking a clever clue, keeps players returning day after day.",
      ],
    },
    {
      title: "Cognitive Benefits of Daily Crossword Solving",
      excerpt:
        "Research shows that regular crossword practice can sharpen vocabulary, delay cognitive decline, and improve mood.",
      headings: [
        "Vocabulary Expansion",
        "Working Memory",
        "Delaying Cognitive Decline",
        "Mood and Stress Relief",
        "Social Connection",
      ],
      body: [
        "Crossword solving is one of the most effective vocabulary builders available. Every clue introduces a new word, a new definition, or a new usage of a familiar word. Over months, your active vocabulary expands significantly, which improves writing, reading comprehension, and verbal communication.",
        "Solving a crossword requires holding multiple clues, partial answers, and intersecting letters in mind simultaneously. This working memory workout strengthens the brain's ability to manage complex information, a skill that transfers to problem-solving at work and in daily life.",
        "Observational studies suggest that regular mental exercises such as crosswords are associated with delayed onset of cognitive decline. While puzzles are not a cure, they keep the brain active and engaged, which is one of the most recommended strategies for maintaining sharpness into older age.",
        "Completing a puzzle releases a small but genuine sense of accomplishment. This positive feedback loop reduces stress and improves mood, especially when the puzzle is challenging but fair. Many players use crosswords as a morning ritual to start the day with a clear, focused mind.",
        "Crosswords also connect people. Solving a puzzle with a friend or family member turns a solitary activity into a social one, sparking conversation and shared discovery. Online communities discuss clues, share tips, and celebrate difficult solves, building connection around a common love of words.",
      ],
    },
  ],
};
