import type { GameContent } from "../../../../../shared/types";

export const content: GameContent = {
  guide: [
    {
      heading: "Goal",
      body: "Deduce a hidden 4-color secret code in as few guesses as possible. After each attempt the game gives feedback on correct colors and positions. Use logic to narrow down the possibilities and crack the code.",
    },
    {
      heading: "How to play",
      body: "Choose four colors from the available palette and submit your guess. The feedback shows how many colors are correct and in the right position, and how many are correct but in the wrong position. Eliminate impossible combinations with each round until only the secret code remains.",
    },
    {
      heading: "Strategy",
      body: "Start with two colors to split the board and learn which colors exist in the code. Once you know the color set, focus on position by moving one color at a time. Track every clue carefully; a single missed feedback detail can send you down the wrong path.",
    },
    {
      heading: "Example",
      body: "Secret code is red-blue-green-yellow. You guess red-red-red-red and get one black peg, meaning red is in the code but not necessarily in the first slot. Next guess places red in slot two to test its true position. Each clue eliminates half the remaining possibilities if used well.",
    },
  ],
  instructions: {
    objective:
      "Identify the exact 4-color secret code using the fewest possible guesses.",
    desktop:
      "Click colors to fill the four guess slots, then submit. Feedback pegs appear after each guess: black means correct color and position, white means correct color but wrong position. Use the clues to refine your next attempt.",
    mobile:
      "Tap colors to build your guess, then tap submit to see feedback. The interface is sized for touch and clearly separates guess slots from feedback pegs. Flag colors you have already used to avoid confusion.",
    winning:
      "You win by guessing the secret code exactly. The overlay shows how many guesses you used and invites you to play again with a new hidden code.",
    losing:
      "You lose only if you run out of guesses before cracking the code. The overlay reveals the secret and lets you restart immediately. Most games are won well before the limit with careful deduction.",
    tips: [
      "Start with a two-color test to learn which colors are present.",
      "Change only one color per guess so you know which change produced new feedback.",
      "Track eliminated colors and positions in your head or on scratch paper.",
      "A black peg means stop changing that position; a white peg means the color is present elsewhere.",
      "Use process of elimination to turn white pegs into black pegs over time.",
    ],
  },
  faqs: [
    {
      q: "How do you play Mastermind?",
      a: "Guess a hidden 4-color code. After each guess you receive black and white pegs: black means correct color and position, white means correct color but wrong position. Use the clues to deduce the secret and win.",
    },
    {
      q: "What do black and white pegs mean?",
      a: "A black peg means one of your guessed colors is correct and in the exact right position. A white peg means a guessed color is in the code but placed in the wrong slot. The order of pegs does not correspond to the order of your guess.",
    },
    {
      q: "How many colors are in Mastermind?",
      a: "The secret code uses four colors chosen from a palette of six. Colors may repeat in the code, so you cannot assume each color appears only once. Testing for duplicates is part of the deduction.",
    },
    {
      q: "What is the best starting strategy?",
      a: "Begin with two colors to discover which ones are in the code. A guess like red-red-blue-blue tells you exactly how many of those two colors exist. From there, introduce new colors one at a time and track positions carefully.",
    },
    {
      q: "How many guesses do you get?",
      a: "This version allows ten guesses, which is enough for systematic deduction. Skilled players usually crack the code in six or fewer guesses. If you run out, the secret is revealed and you can try again.",
    },
    {
      q: "Can colors repeat in the secret code?",
      a: "Yes. The secret code is four positions long drawn from six colors, and duplicates are allowed. A code might be red-red-red-red or blue-green-blue-yellow. Always consider the possibility of repeats when interpreting feedback.",
    },
    {
      q: "What is a good Mastermind score?",
      a: "Solving in four or five guesses is excellent. Six guesses is solid, and seven is respectable. Focus on consistent deduction rather than rushing, and your average will improve quickly.",
    },
    {
      q: "Is Mastermind a game of luck?",
      a: "No. Mastermind is pure logic. The secret is random, but every clue reduces the solution space. Skilled deduction almost always finds the code within the allowed guesses. Luck plays no meaningful role after the first feedback.",
    },
    {
      q: "Can you play Mastermind on mobile?",
      a: "Yes. Tap colors to build your guess and submit with a single tap. The touch layout is clean and responsive, with clear feedback pegs after each round. No app install is needed.",
    },
    {
      q: "Is Mastermind free?",
      a: "Yes. This browser version is free to play with no account, no download, and no cost. Open the page, start guessing, and your best score stays private on your device.",
    },
    {
      q: "What games are similar to Mastermind?",
      a: "Code-breaker puzzles, Wordle, and logic deduction games share the same guess-and-feedback loop. Any game that asks you to reverse-engineer a hidden pattern trains similar analytical thinking.",
    },
    {
      q: "Why is Mastermind good for the brain?",
      a: "It trains deductive reasoning, hypothesis testing, and systematic elimination. Each guess is a mini-experiment that updates your mental model of the secret. Regular play strengthens logical thinking and patience with ambiguous information.",
    },
    {
      q: "How do you handle duplicate colors?",
      a: "If you suspect duplicates, test them deliberately. Guess three of one color and one of another to count exactly how many of each are present. Once you know the counts, assign positions one at a time.",
    },
    {
      q: "What should I do if I get stuck?",
      a: "Review all previous guesses and feedback. List which colors are confirmed present, which positions are confirmed wrong, and which remain unknown. Often a clear inventory reveals the next move without needing a lucky guess.",
    },
    {
      q: "Is Mastermind suitable for kids?",
      a: "Yes, with guidance for younger players. The color and logic combination is intuitive, and the feedback loop teaches systematic thinking. It is a fun, educational puzzle that rewards careful observation over speed.",
    },
  ],
  blog: [
    {
      title: "Mastermind — Complete Guide",
      excerpt:
        "Learn deduction tactics, feedback interpretation, and how to crack codes fast.",
      headings: [
        "What Is Mastermind",
        "Reading the Pegs",
        "The Opening Guess",
        "Midgame Deduction",
        "Endgame Precision",
      ],
      body: [
        "Mastermind is a classic code-breaking puzzle. A hidden four-color secret is generated each round, and your job is to identify it by submitting guesses. After each attempt the game awards black and white pegs as clues. Black means a color is correct and in the right position; white means a color is correct but in the wrong position.",
        "Reading the pegs correctly is essential. Count black pegs first to lock in confirmed positions, then use white pegs to track colors that are present but misplaced. Never change a confirmed black position unless you have overwhelming evidence, because doing so wastes a guess and adds confusion.",
        "The opening guess should maximize information. Many players start with two pairs, such as red-red-blue-blue, to learn how many of those two colors appear in the code. Others prefer four distinct colors to get a broad overview. Both work; choose the style that feels more natural to your thinking.",
        "Midgame deduction is where Mastermind becomes satisfying. Once you know which colors are present, test their positions one at a time. Move a color to a new slot and observe whether the black count changes. A rising black count means the move was correct; a falling count means the original slot was right.",
        "Endgame precision matters when only a few positions remain uncertain. List the remaining possibilities, eliminate the impossible, and make your final guess with confidence. A calm, methodical finish is far more reliable than a rushed last attempt.",
      ],
    },
    {
      title: "Advanced Deduction Tactics",
      excerpt:
        "Use these expert techniques to crack codes in fewer guesses and think faster.",
      headings: [
        "Color Partitioning",
        "The Swap Test",
        "Elimination Tables",
        "Handling Duplicates",
        "Speed vs Accuracy",
      ],
      body: [
        "Color partitioning means dividing the palette into groups and testing each group separately. For example, guess red-red-blue-blue to test the red-blue partition, then green-green-yellow-yellow for the green-yellow partition. Within a few rounds you know exactly which colors are present and how many of each.",
        "The swap test is a midgame power move. If you suspect a color is in the wrong slot, swap it with another known color and submit. If the black count stays the same, both colors are misplaced. If it rises, you found an improvement. Swaps reveal position information faster than random reshuffles.",
        "Elimination tables are simple but effective. Draw a 4x6 grid in your head or on paper: rows are positions, columns are colors. Cross out colors that feedback proves absent from a position. When a row has only one remaining color, that position is solved.",
        "Duplicates add complexity but are manageable. When feedback suggests a color appears twice, test it deliberately by placing two copies in a guess. Track how many duplicates you have by comparing black and white counts across rounds. The math usually forces a unique solution.",
        "Speed is tempting but accuracy is more important. A slow, correct deduction beats a fast wrong guess every time. Once you internalize the core patterns, your natural speed will increase without sacrificing precision. Focus on clean thinking rather than beating the clock.",
      ],
    },
    {
      title: "Mastermind and Logical Thinking",
      excerpt:
        "Discover how code-breaking puzzles strengthen deduction, patience, and analytical skills.",
      headings: [
        "Hypothesis Testing",
        "Systematic Elimination",
        "Patience and Ambiguity",
        "Transferable Skills",
        "Making It a Habit",
      ],
      body: [
        "Mastermind is a masterclass in hypothesis testing. Every guess is a controlled experiment: you predict an outcome, observe the result, and update your model. This scientific loop strengthens your ability to reason under uncertainty, a skill that applies to debugging code, diagnosing problems, and making decisions with incomplete data.",
        "Systematic elimination is the engine of the game. By crossing off impossible combinations one by one, you shrink the solution space until only the truth remains. This habit of methodical reduction fights the common tendency to jump to conclusions, encouraging instead a patient, evidence-based approach.",
        "Ambiguity is inherent in Mastermind because early feedback is vague. Learning to tolerate that uncertainty without guessing randomly builds emotional resilience and intellectual patience. The best players sit comfortably with incomplete information and let the clues accumulate before acting.",
        "The skills practiced in Mastermind transfer widely. Deductive reasoning helps in mathematics and science; hypothesis testing helps in engineering and medicine; systematic elimination helps in law and logistics. Even daily tasks like troubleshooting a broken device benefit from the same structured thinking.",
        "To build a habit, play one round each morning as a warm-up for your analytical muscles. Treat it like a puzzle newspaper crossword: short, focused, and mentally stimulating. Over weeks you will notice sharper logic, faster deduction, and a calmer attitude toward complex problems.",
      ],
    },
  ],
};
