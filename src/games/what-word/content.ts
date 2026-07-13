import type { GameContent } from "../../../shared/types";

export const content: GameContent = {
  guide: [
    {
      heading: "Goal",
      body: "Guess the hidden five-letter word in six tries or fewer. After every guess the tiles change color to tell you how close you are, and you use that feedback to zero in on the answer. Solve it in as few guesses as possible to set your best score.",
    },
    {
      heading: "How to play",
      body: "Type any valid five-letter word and press Enter. Green means the letter is correct and in the right spot, yellow means the letter is in the word but somewhere else, and gray means the letter is not in the word at all. Repeat until you solve it.",
    },
    {
      heading: "Strategy",
      body: "Open with a word rich in common vowels and consonants to reveal as much as possible. Use each result to eliminate letters and lock in confirmed positions. Never waste a guess on a letter you already know is gray, and reuse greens in their known spots.",
    },
    {
      heading: "Example",
      body: "If you guess CRANE and the C and N turn yellow while the rest are gray, you know C and N are in the word but not in those positions. Your next guess should place C and N elsewhere and introduce five brand-new letters to test.",
    },
  ],
  instructions: {
    objective:
      "Identify the secret five-letter word within six guesses, using the color feedback after each guess to narrow down the answer.",
    desktop:
      "Type a five-letter word using your keyboard and press Enter to submit. Use Backspace to delete a letter. The on-screen keyboard also updates with colors so you can track which letters are confirmed, present, or ruled out.",
    mobile:
      "Tap the on-screen keyboard to enter a five-letter word, then tap Enter to submit and the backspace key to delete. Tile and key colors update after each guess to guide you. The layout is sized for comfortable thumb typing.",
    winning:
      "You win by guessing the exact hidden word before running out of tries. The fewer guesses you use, the better your score, and your best (lowest) number of guesses is saved.",
    losing:
      "If you use all six guesses without finding the word, the round ends and the answer is revealed. Start a new game to try a fresh word with your six tries reset.",
    tips: [
      "Start with a word full of common letters like A, E, R, S, and T.",
      "Lock confirmed green letters into place and build around them.",
      "Reposition yellow letters instead of guessing them in the same spot.",
      "Avoid reusing gray letters — they only waste a precious guess.",
      "Use your second guess to test five entirely new letters when possible.",
      "When several answers fit, choose the guess that eliminates the most options.",
    ],
  },
  faqs: [
    {
      q: "How do you play What Word?",
      a: "Guess the hidden five-letter word in six tries. Type a word and press Enter, then read the colors: green means right letter and right spot, yellow means right letter wrong spot, and gray means the letter is not in the word. Use the clues to solve it.",
    },
    {
      q: "What do the colors mean?",
      a: "Green marks a letter that is correct and in the correct position. Yellow marks a letter that appears in the word but in a different position. Gray marks a letter that is not in the word at all. These three colors are your only clues to the answer.",
    },
    {
      q: "How many guesses do I get?",
      a: "You get six guesses per game. Each guess must be a valid five-letter word. The challenge is to gather enough information from the color feedback to identify the exact word before your sixth attempt runs out.",
    },
    {
      q: "What is a good starting word?",
      a: "Strong openers use common letters and a good spread of vowels, such as CRANE, SLATE, or AUDIO paired with a consonant-heavy second guess. The goal of the first word is to reveal as many useful letters as possible, not to guess the answer outright.",
    },
    {
      q: "Why was my guess rejected?",
      a: "A guess is rejected if it is not exactly five letters or is not in the game's word list. Try another common five-letter word. This rule keeps every guess meaningful and prevents random letter strings from wasting your attempts.",
    },
    {
      q: "How is my score calculated?",
      a: "Your score is the number of guesses you used to solve the word, and fewer is better. Your best game — the lowest number of guesses in a win — is saved so you always have a personal record to chase.",
    },
    {
      q: "Does my best score save?",
      a: "Yes. Your fewest-guesses win is stored locally in your browser and shown so you can try to beat it. Clearing your browser data or switching devices resets it, because the record is kept on your device rather than a server.",
    },
    {
      q: "Can a letter appear twice?",
      a: "Yes. Some answers contain repeated letters, which is why the color logic counts letters carefully. If you guess two of a letter but the answer has only one, only one of yours will be colored and the extra will show as gray.",
    },
    {
      q: "What happens with duplicate letters in my guess?",
      a: "The game colors duplicates based on how many times the letter actually appears in the answer. Correct-position matches are marked first, then remaining copies are marked yellow only up to the count in the answer; any extras turn gray.",
    },
    {
      q: "Is there a new word every game?",
      a: "Yes. Each new game selects a fresh secret word at random from the word list, so you can replay as many times as you like. There is no daily limit here — start a new game whenever you want another challenge.",
    },
    {
      q: "Can I play What Word on mobile?",
      a: "Absolutely. A full on-screen keyboard with Enter and Backspace is built in, and the tiles scale to your screen. It runs in any modern mobile browser with no download or account, and it works in both portrait and landscape.",
    },
    {
      q: "What is the best overall strategy?",
      a: "Open with a letter-rich word, then use each result to eliminate and confirm letters. Keep greens fixed, move yellows to new spots, and never reuse grays. When multiple words fit, pick the guess that rules out the most remaining possibilities.",
    },
    {
      q: "Should I guess the answer early if I think I know it?",
      a: "If you are confident, go for it — a fast solve gives the best score. But if several words still fit, it is often smarter to spend a guess testing new letters that split the possibilities, then solve with certainty on the next try.",
    },
    {
      q: "What skills does What Word build?",
      a: "It sharpens vocabulary, logical deduction, and pattern recognition. Each guess is a small experiment, and interpreting the feedback trains you to reason from evidence, a skill that transfers well beyond word games.",
    },
    {
      q: "Is What Word suitable for kids?",
      a: "Yes. It is a friendly, non-violent puzzle that reinforces spelling and deductive reasoning. Younger players can treat it as spelling practice, while the six-guess limit and scoring give older players a satisfying logic challenge.",
    },
    {
      q: "What games are similar to What Word?",
      a: "It is inspired by the classic hidden-word deduction format popularized by Wordle and older games like Mastermind and Bulls and Cows. If you enjoy guessing with colored feedback and logical elimination, you will feel right at home.",
    },
    {
      q: "Do I keep the on-screen keyboard colors between guesses?",
      a: "Yes. The keyboard remembers the best-known status of every letter you have tried, coloring keys green, yellow, or gray. This running summary helps you avoid reusing ruled-out letters and quickly see which letters remain untested.",
    },
    {
      q: "Is What Word free to play?",
      a: "Yes. It runs entirely in your browser at no cost, with no account and no installation. Open the page and start guessing immediately, and your best score stays private on your own device.",
    },
  ],
  blog: [
    {
      title: "What Word — Complete Guide",
      excerpt:
        "Learn the rules, master the color feedback, and start solving five-letter words with confidence.",
      headings: [
        "What Is What Word",
        "Reading the Colors",
        "Handling Tricky Duplicates",
        "Scoring and Best Games",
        "Your First Solve",
      ],
      body: [
        "What Word is a five-letter word deduction game. A secret word is chosen, and you have six guesses to find it. After each guess, the tiles change color to reveal how close you are, turning every attempt into a logical experiment that narrows down the answer.",
        "The color system is everything. Green means a letter is correct and in the right position, yellow means the letter is in the word but in a different spot, and gray means the letter is not in the word at all. Reading these three signals accurately is the core skill of the game.",
        "Duplicate letters are the trickiest part. If your guess contains two of a letter but the answer has only one, the game colors only one of them and leaves the extra gray. Understanding this counting rule prevents confusion and helps you interpret feedback correctly.",
        "Scoring rewards efficiency: your result is the number of guesses used, and fewer is better. Your best game, the lowest guess count on a win, is saved locally so you always have a record to beat. Chasing two- and three-guess solves becomes addictive.",
        "For your first solve, open with a letter-rich word like CRANE or SLATE, then use the feedback to confirm greens and relocate yellows while discarding grays. Within a couple of informed guesses the possibilities collapse and the answer usually reveals itself.",
      ],
    },
    {
      title: "Optimal Guessing Strategy",
      excerpt:
        "From starting words to endgame decisions, a practical framework for solving in fewer tries.",
      headings: [
        "Choose a Strong Opener",
        "Maximize Information",
        "Manage Confirmed Letters",
        "Split the Possibilities",
        "Know When to Commit",
      ],
      body: [
        "A strong opener sets the tone. Pick a word with several common letters and a healthy mix of vowels, such as CRANE, SLATE, or ROATE. The aim is not to guess the answer immediately but to light up as many green and yellow tiles as possible to guide the next move.",
        "Every guess should maximize information. Early on, favor words that test five fresh letters rather than reusing what you already know. The more of the alphabet you rule in or out quickly, the faster the field of possible answers shrinks to something manageable.",
        "Once you have confirmed letters, manage them carefully. Keep greens locked in their positions and move yellows to untested spots. Resist the temptation to replay a gray letter, since it can never contribute and effectively wastes an entire guess.",
        "In the midgame, think about splitting the possibilities. If several candidate words remain, choose a guess whose feedback will distinguish between them most decisively. Sometimes the best guess is a word you know is wrong, because it eliminates the most options.",
        "Finally, know when to commit. If the evidence points clearly to one word, guess it and bank a fast score. If uncertainty remains and you still have guesses to spare, take one more informative shot before committing to the solve.",
      ],
    },
    {
      title: "The Logic Behind Word Deduction Games",
      excerpt:
        "Why colored-feedback puzzles are such a satisfying and effective mental workout.",
      headings: [
        "Deduction as a Game",
        "Feedback and Inference",
        "Balancing Risk and Reward",
        "A Vocabulary Workout",
        "Building a Daily Habit",
      ],
      body: [
        "Word deduction games belong to a long tradition of code-breaking puzzles, from Bulls and Cows to Mastermind. What Word applies that same elegant loop — guess, observe feedback, refine — to language, which is why it feels both intellectual and playful at once.",
        "The heart of the game is inference. Each colored tile is a piece of evidence, and your job is to combine those pieces into a conclusion. This is deductive reasoning in miniature, and practicing it sharpens your ability to draw sound conclusions from partial information.",
        "Good play also involves balancing risk and reward. Guessing the answer early is tempting but risky when options remain; spending a guess to gather information is safer but costs a try. Weighing these choices trains the same judgment you use in real decisions.",
        "On top of the logic, What Word is a genuine vocabulary workout. Recalling and testing five-letter words strengthens word retrieval and spelling, and you will often rediscover words you rarely use. Over time your active vocabulary and pattern recognition both improve.",
        "As with any brain game, short daily sessions beat occasional marathons. A quick solve or two each day keeps your deduction skills sharp, steadily lowers your best guess count, and turns a couple of minutes into a rewarding mental habit.",
      ],
    },
  ],
};
