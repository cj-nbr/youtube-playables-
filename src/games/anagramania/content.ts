import type { GameContent } from "../../../shared/types";

export const content: GameContent = {
  guide: [
    {
      heading: "Goal",
      body: "You are given a jumbled set of letters. Rearrange them to form as many valid words as you can before the timer runs out. Longer words are worth far more points, so a single seven-letter find can outweigh a handful of short ones. Chase the highest score you can.",
    },
    {
      heading: "How to play",
      body: "Build a word by clicking the letter tiles in order, or by typing on your keyboard. Press Enter to submit. If the word is valid and new, it is added to your found list and scored. Use Clear to start over and Shuffle to rearrange the tiles for a fresh perspective.",
    },
    {
      heading: "Strategy",
      body: "Start by spotting common short words to bank quick points, then look for longer combinations hiding in the same letters. Prefixes and suffixes such as re-, un-, -ed, -er, and -ing unlock extra finds. Shuffling the tiles often reveals words your eyes glossed over.",
    },
    {
      heading: "Example",
      body: "Given the letters M, A, S, T, E, R you can find AT, RAT, RATE, MATE, TEAM, STEAM, and finally MASTER or STREAM using all six letters. The six-letter word scores the most, so it is worth hunting for the big word once you have collected the easy ones.",
    },
  ],
  instructions: {
    objective:
      "Form as many valid words as possible from the scrambled letters before time expires, prioritizing longer words for a higher score.",
    desktop:
      "Type letters on your keyboard to build a word, or click the on-screen tiles in order. Press Enter to submit, Backspace to delete the last letter, and use the Clear and Shuffle buttons to reset your guess or rearrange the tiles.",
    mobile:
      "Tap the letter tiles in order to spell a word, then tap Enter to submit. Tap a placed letter or the Clear button to remove letters, and tap Shuffle to rearrange the tiles. Everything is sized for comfortable thumb tapping.",
    winning:
      "There is no fixed finish — the aim is a high score. Every valid word adds points based on its length, and your best score is saved so you always have a target to beat.",
    losing:
      "The round ends when the countdown reaches zero. Words in progress that were never submitted do not count, so submit each word as soon as you find it rather than saving it for later.",
    tips: [
      "Bank easy three- and four-letter words first, then hunt for the big finds.",
      "Try common prefixes and suffixes like re-, un-, -ed, -er, and -ing.",
      "Shuffle the tiles whenever you feel stuck — a new arrangement sparks ideas.",
      "Look for the word that uses every tile; it is worth the most points.",
      "Do not fixate on one long word while the clock drains — keep submitting shorter ones.",
      "Plurals and simple verb forms are quick ways to double up on a word you already found.",
    ],
  },
  faqs: [
    {
      q: "How do you play Anagramania?",
      a: "You are shown a scrambled set of letters. Build words from those letters by clicking the tiles or typing, then press Enter to submit. Valid, unseen words are added to your list and scored. Find as many as you can, favoring longer words, before the timer runs out.",
    },
    {
      q: "What are the rules of Anagramania?",
      a: "Each word must be spelled using only the available letters, using each tile no more than the number of times it appears. Words must be at least three letters long and cannot be repeated. Points scale with word length, and the round ends when the countdown hits zero.",
    },
    {
      q: "How is scoring calculated?",
      a: "Longer words score dramatically more than short ones. A three-letter word earns a small amount, while five, six, and seven-letter words earn escalating bonuses. This rewards hunting for the biggest word you can build rather than only collecting easy short finds.",
    },
    {
      q: "How do I submit a word?",
      a: "Build the word by clicking tiles in order or typing on your keyboard, then press Enter or tap the Enter button. If the word is valid and new, it is accepted with a success sound; if not, you will hear an error tone and can adjust your guess.",
    },
    {
      q: "What does the Shuffle button do?",
      a: "Shuffle rearranges the on-screen tiles into a new random order without changing which letters are available. Seeing the letters in a fresh layout often helps you spot words you missed, and it never costs you points or time beyond the moment.",
    },
    {
      q: "Why was my word rejected?",
      a: "A word is rejected if it is too short, uses a letter you do not have, is not in the game's dictionary, or has already been found. Try a different arrangement, a shorter word, or add a common suffix to reach a valid entry.",
    },
    {
      q: "Can I reuse the same letter twice?",
      a: "Only if that letter appears more than once in the tile set. Each tile can be used once per word, so if there is a single A you cannot build a word needing two A's. Check the available tiles before committing to a long word.",
    },
    {
      q: "Is there a timer?",
      a: "Yes. Each round is a countdown, and your goal is to score as much as possible before it ends. The remaining time appears in the status line, so keep an eye on it and submit words promptly rather than leaving them half-built.",
    },
    {
      q: "Does my best score save?",
      a: "Yes. Your highest score is stored locally in your browser and shown each round so you always know the number to beat. Clearing browser data or switching devices resets it, since the score is kept on your device rather than a server.",
    },
    {
      q: "What is the best strategy for a high score?",
      a: "Sweep up short words quickly for guaranteed points, then dig for longer combinations using prefixes and suffixes. Always look for the word that uses every tile, since it is worth the most. Shuffle when stuck and keep submitting rather than overthinking one big word.",
    },
    {
      q: "Can I play Anagramania on mobile?",
      a: "Absolutely. The tiles and buttons are sized for touch, so you can tap to build words, submit, clear, and shuffle with your thumbs. It runs in any modern mobile browser with no download or account required.",
    },
    {
      q: "How long are the words I can make?",
      a: "Words range from three letters up to the full length of the tile set, which is typically six or seven letters. The longest possible word uses every available tile and is the single most valuable find in each round.",
    },
    {
      q: "What skills does Anagramania build?",
      a: "It strengthens vocabulary, spelling, pattern recognition, and mental flexibility. Rearranging letters under time pressure trains your brain to see multiple possibilities quickly, a skill that carries over to crosswords, Scrabble, and everyday word recall.",
    },
    {
      q: "Are prefixes and suffixes helpful?",
      a: "Very. Adding re-, un-, or de- to the front, or -ed, -er, -ing, and -s to the back, can turn a short word into a longer, higher-scoring one. Training yourself to test these affixes is one of the fastest ways to raise your score.",
    },
    {
      q: "Is Anagramania suitable for kids?",
      a: "Yes. It is a friendly, non-violent word game that reinforces spelling and vocabulary. Younger players can focus on finding short words, while the length-based scoring gives older players and adults a satisfying challenge to master.",
    },
    {
      q: "What games are similar to Anagramania?",
      a: "It draws on classics like Scrabble, Boggle, Text Twist, and newspaper anagram puzzles. If you enjoy unscrambling letters, building high-scoring words, or racing a clock to find hidden words, Anagramania will feel right at home.",
    },
    {
      q: "Do plurals and verb forms count?",
      a: "Yes, as long as they are in the game's dictionary and can be spelled from the available tiles. Adding an S for a plural or -ED for a past tense is a reliable way to bank extra words from letters you have already used.",
    },
    {
      q: "Is Anagramania free to play?",
      a: "Yes. It runs entirely in your browser at no cost, with no account and no installation. Open the page and start unscrambling immediately, and your best score stays private on your own device.",
    },
    {
      q: "Why should I shuffle if I am stuck?",
      a: "Your brain latches onto the current visual arrangement of letters, which can hide obvious words. Shuffling breaks that pattern and presents the same letters fresh, frequently revealing words that were invisible a moment earlier. It is a free, powerful tool.",
    },
  ],
  blog: [
    {
      title: "Anagramania — Complete Guide",
      excerpt:
        "Learn the rules, controls, and scoring so you can start unscrambling letters and racking up points right away.",
      headings: [
        "What Is Anagramania",
        "How to Build Words",
        "Understanding the Scoring",
        "Managing the Clock",
        "Your First High Score",
      ],
      body: [
        "Anagramania is a fast-paced word game where you are handed a jumble of letters and challenged to form as many valid words as possible before time runs out. It blends the vocabulary test of Scrabble with the frantic energy of a timed puzzle, all in your browser with nothing to install.",
        "Building a word is intuitive. Click the letter tiles in the order you want, or simply type on your keyboard, then press Enter to submit. Backspace removes the last letter, Clear wipes your current attempt, and Shuffle rearranges the tiles so you can view the same letters from a fresh angle.",
        "Scoring is where strategy enters. Longer words are worth far more than short ones, so while three and four-letter words provide a steady trickle of points, a six or seven-letter word can transform your total. The single highest-value find is always the word that uses every available tile.",
        "Because a countdown governs each round, time management matters as much as vocabulary. The trick is to submit words the moment you spot them rather than hoarding a big word you are still assembling. Steady submissions keep your score climbing even during a dry spell.",
        "For your first strong run, sweep up the obvious short words first to build a cushion, then hunt for longer combinations using prefixes and suffixes. Shuffle whenever you stall, keep an eye on the clock, and always take a moment to search for the full-length word before time expires.",
      ],
    },
    {
      title: "Anagram-Solving Techniques That Work",
      excerpt:
        "Proven methods to see hidden words faster, from affix testing to consonant clustering.",
      headings: [
        "Test Common Affixes",
        "Group Consonants and Vowels",
        "Look for Word Families",
        "Use Shuffle Deliberately",
        "Practice Pattern Recognition",
      ],
      body: [
        "The most reliable technique is testing common affixes. Mentally attach prefixes like re-, un-, and de-, and suffixes like -ed, -er, -ing, and -s to short words you have already found. These small additions frequently unlock longer, higher-scoring words from the exact same letters.",
        "Separating your letters into consonants and vowels helps your brain assemble pronounceable chunks. Pair a vowel with nearby consonants to form syllables, then combine syllables into words. This structured approach beats staring at the whole jumble hoping a word jumps out.",
        "Word families are a shortcut to multiple finds. Once you spot a base like RATE, related words such as RATES, RATED, and TEAR may share the same letters. Chasing a family lets you convert one insight into several scored words in quick succession.",
        "Use the Shuffle button as a genuine tool, not a last resort. Because your mind fixes on the current arrangement, reshuffling presents the letters fresh and often reveals words hidden in plain sight. A quick shuffle whenever you stall keeps ideas flowing.",
        "Above all, pattern recognition improves with practice. The more rounds you play, the faster you will recognize common letter combinations and word shapes. Regular short sessions train your eye to see words almost instantly, which is the real secret to a soaring score.",
      ],
    },
    {
      title: "Why Word Games Sharpen Your Mind",
      excerpt:
        "The cognitive benefits of games like Anagramania and how to make them part of a healthy routine.",
      headings: [
        "Vocabulary and Recall",
        "Mental Flexibility",
        "Focus Under Pressure",
        "A Low-Stress Workout",
        "Building a Daily Habit",
      ],
      body: [
        "Word games are a proven way to expand and reinforce vocabulary. Repeatedly retrieving words from a set of letters strengthens the neural pathways behind recall, making it easier to summon the right word when you need it in conversation or writing.",
        "Anagramania in particular trains mental flexibility. Because there are usually many possible words hiding in the same tiles, you practice generating multiple options and switching between them quickly. This kind of divergent thinking is valuable well beyond the game.",
        "Playing against a clock also builds focus under pressure. You learn to concentrate, filter distractions, and make quick decisions about which word to submit. Over time this trains a calmer, more efficient way of working through problems when time is limited.",
        "Despite the timer, word games remain a low-stress mental workout. There is no punishment beyond a lower score, so you can push yourself without real consequences. That combination of challenge and safety makes them an ideal way to give your brain a break that still engages it.",
        "To get the most from Anagramania, play short sessions regularly rather than occasional long ones. A few rounds a day keep your vocabulary sharp, steadily raise your best score, and turn casual play into a genuinely beneficial daily habit for your mind.",
      ],
    },
  ],
};
