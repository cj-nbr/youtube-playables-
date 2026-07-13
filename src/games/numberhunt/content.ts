import type { GameContent } from "../../../shared/types";

export const content: GameContent = {
  guide: [
    {
      heading: "Objective",
      body: "A target number is shown at the top. Scan the grid of digits and tap every cell that displays that number before the timer runs out. Clear all the targets across several rounds to win; let the clock hit zero and the hunt ends.",
    },
    {
      heading: "How to play",
      body: "Each round names one target digit. Tap any cell showing that digit to circle it. Every matching cell must be found — the counter tells you how many remain. When the last one is circled, a new target appears. Work through all the rounds before time expires.",
    },
    {
      heading: "Strategy",
      body: "Read in rows or columns rather than bouncing around, so you do not skip a match. The grid is dense, so train your eyes to spot the target shape, not read every number. Wrong taps cost you precious seconds, so only tap when you are sure.",
    },
    {
      heading: "Example",
      body: "If the target is 7 and the counter reads '3 left', there are exactly three 7s hidden among the distractors. Tap each 7 to circle it. Tapping a 3 or a 9 by mistake shaves time off the clock, so confirm the digit before you commit.",
    },
  ],
  instructions: {
    objective:
      "Find and circle every instance of the target number hidden in a grid of distractors before the timer runs out.",
    desktop:
      "Use your mouse to click any cell that shows the target digit. Each correct tap circles it and lowers the remaining count. When all matches are found, a new target appears. Wrong clicks cost time, so click carefully.",
    mobile:
      "Tap any cell showing the target digit to circle it. Each correct tap lowers the remaining count, and a new target appears when the last is found. Tap carefully — wrong taps subtract time. Fully touch-friendly.",
    winning:
      "You win when you clear every target across all the rounds before the timer reaches zero. Your score is the number of numbers you circled plus round bonuses.",
    losing:
      "You lose if the countdown reaches zero before you finish all the rounds. Wrong taps also drain the clock, so accuracy matters as much as speed.",
    tips: [
      "Scan in straight rows or columns to avoid missing a match.",
      "Only tap when you are certain of the digit.",
      "Watch the 'remaining' counter to know how many are left.",
      "Train your eyes on the target's shape, not each number.",
      "Stay calm — panic tapping wastes seconds.",
      "Finish early rounds fast to bank time for later ones.",
    ],
  },
  faqs: [
    {
      q: "How do you play NumberHunt?",
      a: "A target digit is shown and you must tap every cell in the grid that displays it before the timer runs out. When all matches are circled, a new target appears. Clear all the rounds to win.",
    },
    {
      q: "What are the rules of NumberHunt?",
      a: "Each round names one target number. Click or tap every cell showing that number. Wrong taps subtract time. Survive all rounds before the clock hits zero to win; let it expire and the hunt ends.",
    },
    {
      q: "How is NumberHunt scored?",
      a: "You earn points for each number you circle correctly, plus a bonus for completing each round. Your best total is saved locally in your browser so you can try to beat it next time.",
    },
    {
      q: "What happens if I tap the wrong number?",
      a: "A wrong tap plays an error sound and subtracts a couple of seconds from the clock. It does not end the game, but it eats into your time, so only tap when you are confident.",
    },
    {
      q: "How many rounds are there?",
      a: "A full game runs through several rounds, each with a fresh target digit and a fresh grid of distractors. The exact number of rounds is shown in the round counter at the top of the board.",
    },
    {
      q: "Is NumberHunt timed?",
      a: "Yes. A single countdown spans the whole hunt. Every round draws from the same clock, so finishing early rounds quickly gives you more time for the harder, denser later rounds.",
    },
    {
      q: "How do I know how many matches remain?",
      a: "A 'remaining' counter shows exactly how many instances of the current target are still hidden in the grid. When it reaches zero, the round is complete and the next target appears.",
    },
    {
      q: "Can I play NumberHunt on mobile?",
      a: "Yes. The grid is responsive and works with touch. Tap a matching cell to circle it and tap carefully to avoid time penalties. The controls match the desktop version.",
    },
    {
      q: "What is the best strategy for NumberHunt?",
      a: "Scan methodically in rows or columns so you never skip a match, and only tap when sure of the digit. Training your eyes on the target's visual shape, rather than reading every number, is the fastest way to improve.",
    },
    {
      q: "Why do wrong taps cost time?",
      a: "The penalty keeps the game honest: speed without accuracy is not rewarded. It forces you to confirm each digit, which is the real skill the game tests — quick, reliable visual discrimination.",
    },
    {
      q: "Is NumberHunt good for kids?",
      a: "Yes. It builds number recognition and visual scanning skills with no violence. The time pressure is mild and the wrong-tap penalty is small, making it suitable for older children with some practice.",
    },
    {
      q: "Does my best score save between sessions?",
      a: "Yes. Your best score is stored locally in your browser, so it persists when you return. Clearing browser data or switching devices resets it, since the score lives on your device.",
    },
    {
      q: "Is there a pause feature?",
      a: "Yes. Use the Pause button to freeze the timer and the grid, then Resume to continue. Pausing is handy when you want to steady your eyes before a dense round.",
    },
    {
      q: "How does the game get harder?",
      a: "Later rounds tend to hide more instances of the target among a denser field of distractors, so each match is harder to spot before the shared clock runs low. The core rule never changes.",
    },
    {
      q: "Is NumberHunt free to play?",
      a: "Yes. It runs in your browser with no cost, no account, and no download. Open the page and start hunting immediately. Your best score stays private on your device.",
    },
    {
      q: "What skills does NumberHunt improve?",
      a: "It sharpens visual scanning, number discrimination, and focused attention under mild time pressure. Short sessions make a good brain warm-up or a quick concentration exercise.",
    },
  ],
  blog: [
    {
      title: "The Complete NumberHunt Guide",
      excerpt:
        "Learn to spot hidden target numbers fast and beat the clock in NumberHunt.",
      headings: [
        "What Is NumberHunt",
        "Core Rules and Setup",
        "Reading the Grid",
        "Scoring and the Clock",
        "Getting Better Over Time",
      ],
      body: [
        "NumberHunt is a visual search game. A target digit is announced, and your job is to find and circle every cell showing that digit in a grid crowded with distractors. A single countdown spans the whole hunt, so speed and accuracy both matter.",
        "Each round names one target number and fills the grid with decoys. You tap every matching cell; the remaining counter drops with each correct find. When it hits zero, a new target appears. Clear all the rounds before the clock expires to win.",
        "Reading the grid efficiently is the core skill. Bouncing randomly causes you to skip matches and re-scan the same area. Instead, sweep in steady rows or columns so your eyes cover every cell exactly once and nothing hides in the gaps.",
        "Scoring rewards both volume and pace. Each circled number scores points, and finishing a round adds a bonus. Wrong taps subtract seconds, so the clock is as much a scorekeeper as a deadline. Your best total is saved locally.",
        "Improvement comes from calm, systematic scanning. Train your eyes on the target's shape rather than reading each number individually, resist panic tapping, and the later, denser rounds become manageable. Practice turns a frantic search into a smooth sweep.",
      ],
    },
    {
      title: "Beginner Strategies for NumberHunt",
      excerpt:
        "Simple scanning habits that help new players find matches without wasting time.",
      headings: [
        "Sweep in Rows",
        "Tap Only When Sure",
        "Watch the Remaining Counter",
        "Bank Time Early",
        "Stay Calm Under Pressure",
      ],
      body: [
        "New players lose time by clicking randomly and re-checking cells they already scanned. Sweep the grid in straight rows from left to right, top to bottom. A fixed path means every cell is seen once and no match slips through.",
        "Only tap when you are certain of the digit. A wrong tap costs seconds, and those seconds are often the difference between winning and watching the clock hit zero. Confirm the shape before you commit the click.",
        "Keep one eye on the remaining counter. Knowing how many matches are left tells you whether to speed up or keep hunting carefully, and it confirms you have not missed one when the round ends.",
        "Finish the early rounds quickly. Because one clock spans the whole hunt, banking time on easy rounds gives you a cushion for the denser, trickier later rounds. Do not dawdle on the simple targets.",
        "Panic is the enemy. When the clock dips low, slow your tapping rather than speeding it up — careful sweeps find matches faster than frantic, error-prone clicking. Steady eyes beat a shaky cursor.",
      ],
    },
    {
      title: "Advanced Tactics and Common Mistakes in NumberHunt",
      excerpt:
        "Sharpen your visual search and avoid the errors that drain the clock.",
      headings: [
        "Shape Over Reading",
        "Avoiding the Skip",
        "Common Mistakes to Avoid",
        "Managing the Shared Clock",
        "Chasing a New Best",
      ],
      body: [
        "Strong players stop 'reading' numbers and start recognizing shapes. The digit 7 has a distinct top stroke and diagonal; the digit 3 has its twin curves. Training your peripheral vision on these shapes lets you spot targets without focusing each cell.",
        "The most common miss is skipping a match at a row boundary. Reinforce your sweep with a consistent turn at the end of each row, and glance back one cell when you start the next row to catch anything at the seam.",
        "Even confident players waste time by tapping uncertain cells. The penalty for a wrong tap is small per hit but compounds across a game. Discipline — tap only confirmed matches — is what separates a clean run from a timed-out one.",
        "Treat the shared clock as a budget. If a round is taking long, accept a slightly faster, less careful sweep to protect time for later rounds. Balancing pace against accuracy round by round is the real strategy.",
        "Chasing a new best rewards consistency over heroics. Once you know your record, aim to clear every round with time to spare rather than racing the early ones. A steady, accurate sweep produces the highest, most repeatable scores.",
      ],
    },
  ],
};
