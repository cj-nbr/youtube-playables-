import type { GameContent } from "../../../shared/types";

export const content: GameContent = {
  guide: [
    {
      heading: "Goal",
      body: "Read a short passage quickly, then answer comprehension questions before each timer expires. Correct answers earn points, and answering fast earns bonus points. Keep your lives intact by staying accurate — the goal is to build the highest score you can across passages.",
    },
    {
      heading: "How to play",
      body: "A passage appears with a reading countdown. Read it, then press Start questions when ready or let the timer advance you. Each question shows four options and its own countdown. Pick the correct answer before time runs out to score and move on.",
    },
    {
      heading: "Strategy",
      body: "Read for the main idea first, then note key details like names, numbers, and cause-and-effect. Do not reread every sentence; skim purposefully. When answering, eliminate clearly wrong options fast so you can commit before the timer drains and grab the speed bonus.",
    },
    {
      heading: "Example",
      body: "A passage explains why bees waggle-dance. A question asks what the dance communicates. You recall it points hive-mates toward food, eliminate the distractors about temperature and predators, and select the food-location answer quickly for full points plus a time bonus.",
    },
  ],
  instructions: {
    objective:
      "Read each passage and answer its comprehension questions correctly before the timers run out, scoring as many points as possible without losing all your lives.",
    desktop:
      "Read the passage, then click Start questions. For each question, click the answer you believe is correct before the countdown ends. Correct answers score points and a speed bonus; wrong answers or timeouts cost a life.",
    mobile:
      "Read the passage, then tap Start questions. Tap the option you think is correct before the timer expires. Faster correct answers earn bigger bonuses. The layout is fully touch-friendly for reading and tapping on any device.",
    winning:
      "There is no fixed ending — you keep advancing through passages to grow your score. Your highest total is saved as your best score, so every run is a chance to set a new record.",
    losing:
      "You start with three lives. Each wrong answer or timed-out question costs one life. When all three lives are gone, the run ends and your final score is recorded.",
    tips: [
      "Read for the main idea before hunting for tiny details.",
      "Note names, numbers, and cause-and-effect while reading.",
      "Eliminate obviously wrong options to answer faster.",
      "Answer quickly when confident to maximize the speed bonus.",
      "Do not panic on a hard question — a considered guess beats a rushed blank.",
      "Use the reading time fully, but start questions early if you already understand the passage.",
    ],
  },
  faqs: [
    {
      q: "How do you play Speed Read?",
      a: "Read a short passage during its reading countdown, then answer multiple-choice comprehension questions, each with its own timer. Correct answers earn points plus a speed bonus, while wrong answers or timeouts cost a life. Keep going to build the highest score you can.",
    },
    {
      q: "What are the rules of Speed Read?",
      a: "You start with three lives. Each question has four options and a countdown. A correct answer scores points and a time bonus; a wrong answer or a timeout costs a life. When all lives are gone the run ends and your score is saved if it is a new best.",
    },
    {
      q: "How does scoring work?",
      a: "Each correct answer awards a base number of points plus a bonus based on how much time was left when you answered. Answering quickly and accurately maximizes your score, so speed and comprehension both matter for climbing the leaderboard against yourself.",
    },
    {
      q: "How many lives do I get?",
      a: "You begin each run with three lives. Every incorrect answer or expired question timer removes one life. The run continues through as many passages as you can handle until your lives reach zero, so accuracy directly determines how long you last.",
    },
    {
      q: "Is there a reading timer?",
      a: "Yes. Each passage has a reading countdown sized to its length. You can read for the full time or press Start questions early once you feel ready. If the reading time runs out, the game moves you to the questions automatically.",
    },
    {
      q: "Can I re-read the passage during questions?",
      a: "No. Once the questions begin, the passage is hidden to test genuine comprehension and recall. This is why it pays to read for the main idea and note key details during the reading phase rather than skimming passively.",
    },
    {
      q: "What kinds of questions are asked?",
      a: "Questions test comprehension of the passage: main ideas, specific facts, cause and effect, and simple inferences. Each has four answer choices with exactly one correct option. The distractors are plausible, so careful reading is rewarded.",
    },
    {
      q: "Does my best score save?",
      a: "Yes. Your highest total is stored locally in your browser and shown so you can try to beat it. Clearing your browser data or switching devices resets it, because the record is kept on your device rather than on a server.",
    },
    {
      q: "What is the best strategy for a high score?",
      a: "Read for the main idea first, then lock in key details like names and numbers. During questions, eliminate wrong options quickly and answer as soon as you are confident to earn the speed bonus. Protect your lives by never guessing carelessly.",
    },
    {
      q: "Can I play Speed Read on mobile?",
      a: "Absolutely. Passages and answer buttons are sized for comfortable reading and tapping. It runs in any modern mobile browser with no download or account, and it adapts to both portrait and landscape orientations.",
    },
    {
      q: "How can I read faster without losing comprehension?",
      a: "Practice reading in meaningful chunks rather than word by word, avoid silently pronouncing every word, and let your eyes glide across lines. Focus on nouns and verbs that carry meaning. Speed Read is great practice for building these habits gradually.",
    },
    {
      q: "What if I run out of time on a question?",
      a: "A timed-out question counts as a wrong answer and costs a life, just like choosing an incorrect option. That is why committing to a confident answer quickly is important — hesitation can drain both your time bonus and, eventually, your lives.",
    },
    {
      q: "Are the passages always the same?",
      a: "The game draws from a pool of passages and presents them in varied order, so runs feel fresh. The real skill is comprehension and speed, which transfer across any passage, rather than memorizing specific answers.",
    },
    {
      q: "What skills does Speed Read build?",
      a: "It develops reading speed, comprehension, focus, and quick decision-making. Regular play trains you to extract key information rapidly and answer under time pressure, skills that help with studying, tests, and everyday reading alike.",
    },
    {
      q: "Is Speed Read good for students?",
      a: "Yes. It is excellent practice for reading comprehension and timed testing. Students can build the habit of identifying main ideas and details quickly, while the scoring and lives add a motivating, game-like layer to what is normally dry practice.",
    },
    {
      q: "Is Speed Read suitable for kids?",
      a: "Yes. The passages are clean and educational, and the format encourages careful reading. Younger readers can take their time in the reading phase, while the timers and scoring give older students a fun challenge that sharpens comprehension.",
    },
    {
      q: "What games or tools are similar?",
      a: "Speed Read is comparable to reading-comprehension quizzes, speed-reading trainers, and timed test-prep apps. If you enjoy trivia, comprehension exercises, or apps that measure reading speed, you will find Speed Read both familiar and useful.",
    },
    {
      q: "Is Speed Read free to play?",
      a: "Yes. It runs entirely in your browser at no cost, with no account and no installation. Open the page and start reading immediately, and your best score stays private on your own device.",
    },
  ],
  blog: [
    {
      title: "Speed Read — Complete Guide",
      excerpt:
        "Learn the format, the scoring, and how to survive as long as possible while your score climbs.",
      headings: [
        "What Is Speed Read",
        "The Reading Phase",
        "The Question Phase",
        "Scoring and Lives",
        "Your First Long Run",
      ],
      body: [
        "Speed Read is a comprehension challenge that rewards both fast reading and accurate recall. Each round shows a short passage, gives you time to read it, then hides it and asks multiple-choice questions. It turns the quiet skill of reading into an energetic, score-driven game.",
        "The reading phase is where the game is won or lost. A countdown appears alongside the passage, sized to its length. You can use the full time or press Start questions the moment you feel ready. Reading for the main idea and noting key details now pays off later.",
        "In the question phase, the passage disappears and each question presents four options with its own timer. You must rely on what you understood and remembered. Choosing correctly before the timer ends earns points and a speed bonus, so decisiveness matters as much as accuracy.",
        "Scoring combines a base value for each correct answer with a bonus for the time you had remaining, while lives keep the pressure on. You start with three; every wrong answer or timeout costs one. The run continues through passages until your lives are gone.",
        "For your first long run, resist the urge to reread every sentence. Skim for the main idea, note names and numbers, and answer confidently. Protect your lives by never guessing carelessly, and you will find your score climbing passage after passage.",
      ],
    },
    {
      title: "How to Read Faster and Remember More",
      excerpt:
        "Practical speed-reading and comprehension techniques you can apply immediately.",
      headings: [
        "Read in Chunks",
        "Stop Subvocalizing",
        "Hunt for Key Information",
        "Preview and Predict",
        "Practice Deliberately",
      ],
      body: [
        "The first upgrade to your reading speed is chunking. Instead of processing one word at a time, train your eyes to take in groups of two or three words at once. This reduces the number of stops your eyes make per line and dramatically increases your pace.",
        "Many readers silently pronounce every word in their head, a habit called subvocalization that caps your speed at talking pace. Consciously letting go of that inner voice, especially for simple passages, frees you to read as fast as you can comprehend.",
        "Comprehension improves when you read with purpose. Actively hunt for the main idea and the key facts — names, numbers, and cause-and-effect relationships — rather than treating every word as equally important. This focus makes the later questions much easier to answer.",
        "Previewing helps too. A quick glance at the shape of a passage primes your brain for what is coming, and predicting where the text is heading keeps you engaged. Both techniques make your reading more active, which is the foundation of strong recall.",
        "Finally, these skills grow through deliberate practice. Speed Read is an ideal training ground because it forces you to read quickly and then immediately tests whether you understood. Short, regular sessions will steadily raise both your speed and your comprehension.",
      ],
    },
    {
      title: "Why Comprehension Games Boost Learning",
      excerpt:
        "The science-backed reasons timed reading challenges make you a sharper, faster learner.",
      headings: [
        "Active Recall in Action",
        "The Testing Effect",
        "Focus Under Time Pressure",
        "Motivation Through Scoring",
        "Building a Reading Habit",
      ],
      body: [
        "Comprehension games like Speed Read harness active recall, one of the most effective learning techniques known. By hiding the passage and asking you to retrieve information from memory, the game strengthens the very pathways that make knowledge stick.",
        "This connects to the testing effect, a well-documented finding that being tested on material improves long-term retention more than simply rereading it. Every question you answer is a mini-test, quietly reinforcing what you read far better than passive review would.",
        "Answering under a timer also trains focus. The gentle pressure teaches you to concentrate, filter distractions, and make decisions efficiently. These attention skills carry over to studying and work, where the ability to read and decide quickly is invaluable.",
        "The scoring and lives add motivation that pure practice often lacks. Chasing a higher score turns reading drills into a game you want to play, which means you practice more. Consistent practice, in turn, is what actually produces lasting improvement.",
        "Perhaps most importantly, Speed Read helps build a reading habit. A few quick runs a day keep your comprehension sharp and make reading feel rewarding rather than tedious, gradually turning a game into a genuine learning routine that compounds over time.",
      ],
    },
  ],
};
