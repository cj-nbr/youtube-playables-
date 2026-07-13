import type { GameContent } from "../../../../../shared/types";

export const content: GameContent = {
  guide: [
    {
      heading: "Goal",
      body: "Clear the board of all letter tiles by finding and selecting hidden words. Words can run horizontally, vertically, or diagonally in any direction. Find them all before time runs out to win.",
    },
    {
      heading: "How to play",
      body: "Scan the letter grid for words from the provided list. Click or tap the first letter, then drag or tap through subsequent letters to highlight the full word. If the word is valid, it is removed from the list and highlighted on the board. Continue until every word is found.",
    },
    {
      heading: "Strategy",
      body: "Start with longer words because they are easiest to spot and remove the most letters from the board. Search row by row for common prefixes, then check columns and diagonals. Cross off found words mentally to avoid redundant searching.",
    },
    {
      heading: "Example",
      body: "The word STARS runs diagonally from top-left to bottom-right. Click S, drag down-right through T, A, R, S, and release. The word is validated, crossed off the list, and those letters stay highlighted so you do not search them again.",
    },
  ],
  instructions: {
    objective:
      "Find all hidden words in the letter grid before the timer expires.",
    desktop:
      "Click and drag across letters to select a word, or click the first and last letters in order. Valid words are confirmed automatically. The word list updates as you find matches.",
    mobile:
      "Tap the first letter and slide your finger through the rest of the word, or tap letters in sequence. The touch interface is responsive and sized for phone screens.",
    winning:
      "You win when every word in the list is found and removed from the grid. A completion overlay shows your remaining time and invites you to play again.",
    losing:
      "You lose when the countdown timer reaches zero. The overlay reveals any words you missed and shows the full solution so you can study the grid.",
    tips: [
      "Find long words first because they remove the most clutter.",
      "Search systematically: rows, then columns, then diagonals.",
      "Look for common prefixes like RE, UN, IN, and DIS to speed up scanning.",
      "Cross off found words on the list so you do not waste time checking them again.",
      "Check backward diagonals — words can run in any direction, including reverse.",
    ],
  },
  faqs: [
    {
      q: "How do you play Letterama?",
      a: "Find hidden words in a letter grid by clicking or dragging through letters. Words can go horizontally, vertically, or diagonally in any direction. Clear the word list to win before time runs out.",
    },
    {
      q: "What directions can words go in Letterama?",
      a: "Words can run horizontally, vertically, or diagonally in any direction, including backward. A word might read left to right, right to left, top to bottom, bottom to top, or along any diagonal. Always check reverse directions.",
    },
    {
      q: "How many words are in each Letterama puzzle?",
      a: "Each puzzle contains a curated set of words chosen to fit neatly into the grid without excessive overlap. The exact count varies, but every puzzle is designed to be completable within the time limit with careful searching.",
    },
    {
      q: "What is the best way to find words fast?",
      a: "Start with the longest words because they are easiest to spot and clear the most letters. Then scan rows for common prefixes, check columns for vertical matches, and finish with diagonals. Systematic searching beats random clicking.",
    },
    {
      q: "Does Letterama have a timer?",
      a: "Yes. Each puzzle has a countdown timer that adds mild urgency without feeling rushed. Skilled searchers usually finish with time to spare. Use the timer as a focus aid rather than a source of stress.",
    },
    {
      q: "Can you play Letterama on mobile?",
      a: "Yes. Tap and slide through letters to select words. The grid and word list are responsive and sized for comfortable mobile play. No app install is required.",
    },
    {
      q: "Is Letterama free?",
      a: "Yes. It runs entirely in your browser with no cost, no account, and no download. Open the page and start searching. Your progress stays private on your device.",
    },
    {
      q: "What skills does Letterama improve?",
      a: "It sharpens visual scanning, pattern recognition, spelling, and vocabulary. Regularly searching grids trains your eyes to spot letter sequences faster, which helps with reading comprehension and proofreading.",
    },
    {
      q: "What if I cannot find a word?",
      a: "Take a short break and return with fresh eyes. If you are truly stuck, the timer running out reveals the remaining words so you can learn the layout for next time. Practice improves your scanning speed over sessions.",
    },
    {
      q: "Are the words always common English words?",
      a: "Yes. The word list uses standard vocabulary so the puzzle feels fair and educational. Obscure or technical terms are avoided so players of all backgrounds can enjoy the search.",
    },
    {
      q: "What games are similar to Letterama?",
      a: "Word Search, Boggle, and crosswords all train similar word-spotting and vocabulary skills. Any letter-grid puzzle exercises visual scanning and spelling in a satisfying format.",
    },
    {
      q: "Is Letterama suitable for kids?",
      a: "Yes. The word-search format is familiar and educational, and the timer is gentle enough to avoid frustration. It builds spelling, vocabulary, and attention to detail in a fun, low-pressure way.",
    },
    {
      q: "How can I get better at Letterama?",
      a: "Practice scanning in a consistent order every time: rows first, columns second, diagonals third. Learn common word prefixes and endings so you can spot partial matches instantly. The more you play, the faster your eyes will move.",
    },
    {
      q: "Does Letterama track high scores?",
      a: "This version tracks your best completion time per puzzle. Try to beat your own record on repeat plays, and use the remaining-time display as motivation to search more efficiently.",
    },
    {
      q: "Why is Letterama relaxing?",
      a: "The steady search rhythm and familiar word-finding loop are naturally calming. There is no violent feedback, no punishing timer, and no complex rules to remember. It is a quiet, focused activity that lets you zone in on letters and forget the world for a few minutes.",
    },
  ],
  blog: [
    {
      title: "Letterama — Complete Guide",
      excerpt:
        "Become a word-search expert with grid-scanning tactics, prefix tricks, and speed secrets.",
      headings: [
        "What Is Letterama",
        "How the Grid Works",
        "Scanning Strategies",
        "Using Prefixes",
        "Relaxed Focus",
      ],
      body: [
        "Letterama is a word-search puzzle played on a letter grid. A list of hidden words is placed horizontally, vertically, or diagonally in any direction, including backward. Your job is to find every word before the timer runs out. The result is a satisfying mix of spelling practice and visual hunt.",
        "The grid is generated so that words intersect and share letters naturally, making the puzzle feel organic rather than forced. No word is placed in isolation; overlaps mean that finding one word often reveals the starting letter of another. Learning to read these intersections is the key to fast solving.",
        "The most efficient scanning strategy is systematic. Work row by row from top to bottom, left to right, hunting for the first letters of your word list. Then switch to columns, and finish with diagonals. A fixed order prevents you from skipping areas or re-searching the same spots.",
        "Common prefixes are your best friends. Words often begin with RE, UN, IN, DIS, PRE, or OUT. When you spot one of these clusters, check the surrounding letters against your remaining word list. Prefix scanning turns a random hunt into a directed search and dramatically cuts solve time.",
        "Letterama is relaxing because it has no fail state beyond the timer and no penalty for pausing to think. The gentle countdown keeps you focused without anxiety, and the satisfaction of crossing off each word provides a steady stream of small wins. It is an ideal way to unwind while still engaging the mind.",
      ],
    },
    {
      title: "Word Search Speed Secrets",
      excerpt:
        "Learn the scanning patterns and prefix tricks that turn slow finders into fast solvers.",
      headings: [
        "The Rows-First Rule",
        "Column and Diagonal Passes",
        "Reading Intersections",
        "Backward and Diagonal Words",
        "Practice Drills",
      ],
      body: [
        "The rows-first rule is simple but powerful. Scan the top row from left to right, checking each letter against your word list. Move down one row and repeat. This disciplined pass ensures you cover every horizontal possibility before moving on, and it prevents the common mistake of missing words hidden in plain sight.",
        "After rows, do columns from left to right, top to bottom. Then sweep the two main diagonals. Diagonal words are the easiest to overlook because most people read horizontally, so give them a dedicated pass. A three-pass system — rows, columns, diagonals — covers almost every possibility in order.",
        "Intersections are gold. When two words share a letter, finding the first word often reveals the second. Train yourself to pause whenever you complete a word and check the letters around it for the start of another. These micro-pauses save more time than they cost.",
        "Backward words feel tricky but are manageable once you expect them. Read each row both left-to-right and right-to-left, or simply scan for word endings like E, S, T, and D. If you see a cluster that looks like a word in reverse, verify it quickly. Anticipating reverse words removes the surprise factor.",
        "Practice drills build speed. Set a timer for one minute and try to find as many words as possible in a familiar grid. Repeat daily and track your count. The goal is not just to finish puzzles but to train your eyes to move faster and your brain to recognize patterns instantly.",
      ],
    },
    {
      title: "Why Word Searches Are Good for Your Brain",
      excerpt:
        "Explore the cognitive benefits of regular word-search puzzles and how they sharpen your mind.",
      headings: [
        "Visual Scanning",
        "Vocabulary Building",
        "Pattern Recognition",
        "Low-Stress Concentration",
        "Daily Brain Habits",
      ],
      body: [
        "Word searches train visual scanning by forcing your eyes to move systematically across a dense grid. This skill transfers directly to reading, proofreading, and data review. The more you practice scanning for letter sequences, the faster and more accurate your visual searches become in real-world tasks.",
        "Vocabulary building happens naturally because you encounter words in context. Seeing a word embedded in a grid reinforces its spelling, and finding it again on another puzzle cements the pattern. Regular exposure to varied word lists expands your active vocabulary without feeling like study.",
        "Pattern recognition improves as your brain learns to spot common letter clusters, prefixes, and endings. This ability to quickly classify visual information is useful in coding, design, and everyday problem solving. The grid format turns abstract pattern matching into a concrete, satisfying game.",
        "Like Letterama itself, word searches offer low-stress concentration. There is no timer panic, no penalty for pausing, and no complex rules to juggle. You can zone in on letters and let your mind wander productively, making it an ideal break between demanding tasks.",
        "A short daily word-search session builds durable cognitive gains. Five to ten minutes is enough to keep your scanning skills sharp and your vocabulary growing. Over weeks you will notice faster word recognition, cleaner proofreading, and a calmer, more focused mindset.",
      ],
    },
  ],
};
