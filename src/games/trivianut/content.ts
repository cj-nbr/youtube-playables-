import type { GameContent } from "../../shared/types";

export const content: GameContent = {
  guide: [
    {
      heading: "Goal",
      body: "Answer multiple-choice questions across a rotating set of categories. Build a correct-answer streak to multiply your score, and beat the clock for a speed bonus. Survive all the questions to win the round.",
    },
    {
      heading: "How to play",
      body: "Read the question and pick one of the four answers before the timer bar runs out. A correct pick adds points, grows your streak, and loads the next question. A wrong pick or a timeout costs a life and resets your streak.",
    },
    {
      heading: "Streaks & bonuses",
      body: "Every consecutive correct answer raises your streak multiplier, so early momentum pays off dramatically. Answering quickly adds a speed bonus on top of the streak, rewarding both accuracy and fast thinking.",
    },
    {
      heading: "Surviving the round",
      body: "You begin with three lives. Lose all three and the round ends in a game over. Clear the full set of questions with at least one life remaining to claim a win and bank your high score.",
    },
  ],
  instructions: {
    objective:
      "Answer as many multiple-choice trivia questions as you can, chaining correct answers for streak multipliers and beating the timer for speed bonuses, without losing all three lives.",
    desktop:
      "Click an answer with your mouse to lock it in. Watch the timer bar at the top; answering faster earns more points. Use the on-screen progress to track lives, streak, and score. A new question appears automatically after each answer.",
    mobile:
      "Tap an answer to select it. The timer bar counts down and faster answers score higher. The interface is fully touch-friendly and sized for phones, so you can play comfortably on the go.",
    winning:
      "You win when you clear the full question set with at least one life left. Your final score, boosted by streaks and speed, is compared against your saved best.",
    losing:
      "You lose if you run out of lives. Each wrong answer or timeout removes one life and resets your streak, so three misses in a row end the run with a game over.",
    tips: [
      "Answer quickly for the speed bonus, but never rush into a guess you are unsure of.",
      "Use the streak multiplier as motivation — a long run multiplies every later point.",
      "Eliminate obviously wrong options first to improve your odds on tough questions.",
      "Stay calm under the timer; a confident wrong answer costs a life just like a panicked one.",
      "Mix categories keep coming, so rely on general reasoning when a topic is unfamiliar.",
      "Protect your lives early; a small early mistake can snowball once the streak resets.",
    ],
  },
  faqs: [
    {
      q: "How do you play TriviaNut?",
      a: "Read each multiple-choice question and pick one of four answers before the timer runs out. Correct answers build a streak that multiplies your score, while wrong answers or timeouts cost a life and reset the streak.",
    },
    {
      q: "What categories are in TriviaNut?",
      a: "Questions rotate across categories such as science, history, geography, sports, entertainment, and general knowledge, so every round feels fresh and tests a wide range of facts.",
    },
    {
      q: "How does the streak bonus work?",
      a: "Each consecutive correct answer increases your streak multiplier. The longer your run without a miss, the more points every subsequent correct answer is worth, rewarding sustained accuracy.",
    },
    {
      q: "What is the time pressure?",
      a: "Every question has a countdown bar. Answering before it empties scores a speed bonus on top of your base points, and letting it hit zero counts as a wrong answer and costs a life.",
    },
    {
      q: "How many lives do I get?",
      a: "You start with three lives. A wrong answer or a timeout removes one. Lose all three and the round ends in a game over.",
    },
    {
      q: "How do I win TriviaNut?",
      a: "You win by clearing the full set of questions with at least one life remaining. Your score reflects accuracy, streak length, and how quickly you answered throughout the round.",
    },
    {
      q: "How is the score calculated?",
      a: "Each correct answer earns a base value multiplied by your current streak, plus a speed bonus based on how much time was left. Wrong answers add nothing and reset the multiplier.",
    },
    {
      q: "Can I skip a question?",
      a: "There is no skip; every question must be answered or it will time out. A timeout is treated like a wrong answer, so it costs a life and breaks your streak.",
    },
    {
      q: "Are the questions repeated?",
      a: "The question bank is shuffled for each round and drawn without immediate repeats, so you rarely see the same sequence twice. The mix of categories keeps each game varied.",
    },
    {
      q: "Is TriviaNut good for learning?",
      a: "Yes. Regular play reinforces general knowledge across topics and rewards paying attention to why an answer is correct. It is a fun, low-pressure way to build trivia recall.",
    },
    {
      q: "Can I play on mobile?",
      a: "Yes. The board is fully responsive and touch-optimized. Large answer buttons and a clear countdown make it easy to play on a phone without precise taps.",
    },
    {
      q: "Does my best score save?",
      a: "Yes. Your highest score is stored locally in your browser, so it persists between visits. Clearing your browser data resets it because the score lives on your device.",
    },
    {
      q: "What happens when I run out of time?",
      a: "The current question is marked wrong, you lose a life, and your streak resets to zero before the next question loads. Manage the clock carefully to protect your lives.",
    },
    {
      q: "Is there a difficulty curve?",
      a: "Questions are drawn from a broad mix, so difficulty varies question to question rather than ramping smoothly. The real challenge is maintaining accuracy under the timer.",
    },
    {
      q: "How can I improve my score?",
      a: "Prioritize fast, confident correct answers to grow your streak, use elimination on hard questions, and don't waste time once you know the answer. Protecting lives early lets streaks run long.",
    },
    {
      q: "Is TriviaNut free to play?",
      a: "Yes. It runs entirely in your browser with no account or download. Open the page and start answering questions immediately.",
    },
    {
      q: "Can two people play together?",
      a: "The single-player version tracks your personal best, but you can easily pass the device and compete with friends for the highest round score or longest streak.",
    },
  ],
  blog: [
    {
      title: "TriviaNut — How to Play and Score Big",
      excerpt:
        "A clear walkthrough of TriviaNut's rules, scoring, and the streak system that rewards fast, accurate play.",
      headings: [
        "The Core Loop",
        "Streaks Explained",
        "The Speed Bonus",
        "Lives and Game Over",
        "Chasing a High Score",
      ],
      body: [
        "TriviaNut drops you into a rapid-fire quiz where each question offers four answers and a countdown bar. Pick the right one to score, and the next question loads automatically. Wrong picks or timeouts cost a life and reset your streak.",
        "The streak is the heart of the scoring. Each consecutive correct answer raises your multiplier, so a run of ten correct answers is worth far more than ten isolated ones. Protecting the streak is more valuable than any single question.",
        "Speed matters too. The faster you answer, the larger the speed bonus added on top of your base points. Skilled players read the question, commit, and move on before the clock eats into their bonus.",
        "You begin with three lives. Because a timeout counts as a miss, the timer is both a scoring tool and a threat. Manage it by answering decisively and never letting a hard question drain your lives one by one.",
        "Your best score is saved locally, so every round is a chance to beat yourself. Focus on long streaks, quick confident answers, and life preservation, and your personal record will climb steadily over time.",
      ],
    },
    {
      title: "Trivia Strategies That Actually Work",
      excerpt:
        "Practical techniques for eliminating wrong answers, reading questions, and keeping your streak alive under pressure.",
      headings: [
        "Eliminate First",
        "Read the Whole Question",
        "Trust Pattern Recognition",
        "Stay Calm Under the Clock",
        "Know When to Guess",
      ],
      body: [
        "When a question stumps you, eliminate the answers you know are wrong before thinking about the rest. Narrowing four choices to two roughly doubles your odds and often reveals the correct pick by process of elimination.",
        "Read the entire question, including qualifiers like 'not' or 'except'. Many misses come from skimming and answering the question you assumed rather than the one actually asked, especially under time pressure.",
        "Trivia often rewards loose association. If an answer feels familiar or thematically connected to the clue, trust that instinct after elimination, but verify it against the other options before locking in.",
        "The countdown is meant to add tension, not panic. Keep a steady rhythm: read, eliminate, decide. A calm player answers more accurately and preserves lives better than one who rushes at the last second.",
        "When truly stuck, guess rather than let the clock expire, because a timeout costs a life either way. A calculated guess at least keeps the possibility of a correct, streak-saving answer alive.",
      ],
    },
    {
      title: "Why Quick Recall Games Sharpen Your Mind",
      excerpt:
        "The cognitive benefits of timed trivia and how a daily round can boost memory, focus, and general knowledge.",
      headings: [
        "Fast Retrieval Practice",
        "Working Under Pressure",
        "Broad Knowledge Gains",
        "A Fun Learning Loop",
        "Make It a Habit",
      ],
      body: [
        "Trivia trains fast retrieval, the ability to pull a fact from memory quickly. Repeatedly practicing this under a timer strengthens the neural pathways that make knowledge feel effortless in real life.",
        "Playing against the clock builds comfort with pressure. Learning to think clearly while a timer ticks is a transferable skill useful for exams, presentations, and quick decision making.",
        "Because questions span science, history, geography, and more, regular play passively broadens your general knowledge. Even misses teach you something new when you see the correct answer.",
        "The streak-and-bonus loop turns learning into a game, which is exactly why it sticks. Dopamine from a long streak reinforces the habit of recalling facts, making study feel like play rather than work.",
        "A short daily round beats occasional marathons. Consistent, bite-sized practice compounds into sharper recall and a higher personal best, all while feeling like a quick, enjoyable break.",
      ],
    },
  ],
};
