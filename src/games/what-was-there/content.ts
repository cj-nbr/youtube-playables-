import type { GameContent } from "../../shared/types";

export const content: GameContent = {
  guide: [
    {
      heading: "Goal",
      body: "Study a grid of colored shapes for a few seconds, then answer questions about exactly what you saw. Each round tests a different detail — counts, positions, and colors — to stretch your visual memory.",
    },
    {
      heading: "How to play",
      body: "When the scene appears, memorize it while the timer counts down. When it vanishes, multiple-choice questions appear one at a time. Pick the answer you remember, and you will get instant feedback before the next question.",
    },
    {
      heading: "What you are tested on",
      body: "Questions ask how many of a given color and shape appeared, what color a specific tile was, or which shape sat in a particular row and column. Reading each question carefully helps you recall the right part of the image.",
    },
    {
      heading: "Winning the challenge",
      body: "You face several rounds of study-and-quiz. Answering most questions correctly earns a win; scoring below the threshold ends the run. Your best score is saved locally so you can train your memory over time.",
    },
  ],
  instructions: {
    objective:
      "Watch a brief scene of colored shapes, then correctly answer questions about its details — counts, positions, and colors — across several rounds.",
    desktop:
      "Read and memorize the grid while it is on screen. When the quiz begins, click the answer you believe is correct. You receive instant feedback, then the next question loads automatically. Work through every round to finish.",
    mobile:
      "Tap the grid to study it, then tap your chosen answer during the quiz. The layout is touch-friendly and sized for phones, with large tappable options and a clear study timer.",
    winning:
      "You win if your total correct answers reach the score threshold by the end of all rounds. A higher correct count means a better rating against your saved best.",
    losing:
      "You lose if you finish below the required number of correct answers. There is no life bar; the challenge is purely about how much visual detail you retained.",
    tips: [
      "Scan the whole grid in a fixed order so no region is forgotten.",
      "Pay attention to color-and-shape combinations, since counts are common questions.",
      "Mentally note one standout tile — its row and column — to anchor your recall.",
      "During the quiz, reconstruct the image in your mind before reading options.",
      "Focus first on the question type; count questions need totals, position questions need a specific cell.",
      "Practice regularly; visual memory improves quickly with short, repeated sessions.",
    ],
  },
  faqs: [
    {
      q: "How do you play What Was There?",
      a: "A grid of colored shapes appears for a few seconds. Memorize it, then answer multiple-choice questions about what you saw — such as counts, colors, and positions — when the image disappears.",
    },
    {
      q: "What kinds of questions are asked?",
      a: "Questions cover how many of a particular color and shape appeared, what color a specific tile was, and which shape occupied a given row and column. Each round mixes these question types.",
    },
    {
      q: "How long do I get to study?",
      a: "Each scene is shown for a few seconds with a visible countdown. The time is short on purpose, to train quick visual encoding rather than leisurely inspection.",
    },
    {
      q: "How is the score calculated?",
      a: "You earn one point for each correctly answered question. Your final score is the total correct across all rounds, compared against your saved best result.",
    },
    {
      q: "What is the win threshold?",
      a: "You win by reaching the required number of correct answers by the end of the game. Falling below that threshold ends the run without a win, encouraging sharper recall next time.",
    },
    {
      q: "Is there a time limit during the quiz?",
      a: "The quiz itself is untimed so you can recall at your own pace, but the study phase is strictly timed. The challenge is retention, not racing the clock while answering.",
    },
    {
      q: "How many rounds are there?",
      a: "The game presents several study-and-quiz rounds, each with its own scene and set of questions, so you get repeated practice encoding and retrieving visual detail.",
    },
    {
      q: "Can I replay a scene?",
      a: "No. Each scene appears only once to keep the memory challenge honest. The brief exposure is what makes the recall questions meaningful and worth practicing.",
    },
    {
      q: "Does my best score save?",
      a: "Yes. Your best score is stored in your browser's local storage and persists between visits. Clearing your browser data resets it because the score lives on your device.",
    },
    {
      q: "Is this game good for memory training?",
      a: "Yes. It specifically trains visual working memory and recall under time pressure, skills that support everyday tasks like remembering faces, layouts, and details.",
    },
    {
      q: "Can I play on mobile?",
      a: "Yes. The grid and answer buttons are fully responsive and touch-optimized, making it easy to study and answer with taps on a phone or tablet.",
    },
    {
      q: "What shapes and colors are used?",
      a: "Scenes combine a small palette of distinct colors with simple shapes such as circles, squares, and triangles, so each tile is easy to perceive but varied enough to test recall.",
    },
    {
      q: "How can I improve my score?",
      a: "Use a consistent scan order, notice color-and-shape combinations, and anchor your memory on a standout tile. Regular short sessions build visual memory faster than occasional long ones.",
    },
    {
      q: "Is there a fail state mid-game?",
      a: "No. You continue through all rounds regardless of earlier mistakes; only the final total determines win or loss. This keeps the focus on practice rather than pressure.",
    },
    {
      q: "Why is the study time so short?",
      a: "Brief exposure forces your brain to encode efficiently, which is exactly the skill visual-memory training builds. Longer study would make the recall questions trivial.",
    },
    {
      q: "Is What Was There free to play?",
      a: "Yes. It runs in your browser with no account, no download, and no cost. Open the page and start training your visual memory immediately.",
    },
    {
      q: "Can two people play together?",
      a: "The single-player version tracks your best score, but you can pass the device and compete with a friend to see who recalls the scene more accurately.",
    },
  ],
  blog: [
    {
      title: "What Was There — Train Your Visual Memory",
      excerpt:
        "How a few seconds of观察 and a handful of questions can sharpen the memory you use every day.",
      headings: [
        "The Basic Idea",
        "What the Quiz Tests",
        "Why Short Exposure Works",
        "Reading the Questions",
        "Building the Habit",
      ],
      body: [
        "What Was There shows you a grid of colored shapes for just a few seconds, then quizzes you on what you saw. It is a pure exercise in visual encoding and recall, the same skills you use to remember a face or a room layout.",
        "The quiz mixes three question types: counts of a color-and-shape combination, the color of a specific tile, and the shape in a particular row and column. Together they force you to remember both the big picture and precise details.",
        "The study time is deliberately short. Brief exposure compels your brain to encode efficiently instead of leisurely inspecting, which is exactly the muscle visual-memory training strengthens. Longer looks would make the recall trivial.",
        "Success comes from reading each question before guessing. Count questions need a mental tally, while position questions need you to reconstruct a single cell. Deciding the question type first focuses your recall where it matters.",
        "Like any memory skill, it compounds with repetition. A few short rounds most days produces noticeable gains, and your saved best score gives you a clear target to beat as your visual recall sharpens.",
      ],
    },
    {
      title: "Visual Memory Techniques That Transfer",
      excerpt:
        "Practical tricks for encoding scenes faster and recalling them more accurately under pressure.",
      headings: [
        "Scan in a Fixed Order",
        "Chunk the Grid",
        "Anchor on a Standout Tile",
        "Reconstruct Before Answering",
        "Use Associations",
      ],
      body: [
        "Always scan the grid the same way, such as left to right, top to bottom. A fixed path means you are less likely to skip regions and more likely to notice repeats, which helps with count questions.",
        "Break the image into quadrants and memorize one chunk at a time. Holding four small groups is easier than holding sixteen loose tiles, and each chunk becomes a retrievable unit during the quiz.",
        "Pick one visually distinct tile and lock in its row and column. That anchor gives you a reference point to rebuild the rest of the grid around when the questions start arriving.",
        "Before reading the answer options, close your eyes and reconstruct the scene. Actively generating the image cements it far better than passively hoping it surfaces when you see the choices.",
        "Attach a tiny story or association to a color-and-shape pair, like 'the red circle is the sun'. Lightweight associations make abstract details stick and speed up correct answers.",
      ],
    },
    {
      title: "The Science of Seeing and Remembering",
      excerpt:
        "Why visual memory is its own system, and how quick-recall games make it stronger.",
      headings: [
        "A Separate Memory System",
        "Encoding Under Pressure",
        "Detail vs. Gist",
        "Low-Stakes Practice",
        "Everyday Payoffs",
      ],
      body: [
        "Visual memory is partly distinct from verbal memory. Remembering a scene relies on the same networks you use for navigation and face recognition, which is why image-based practice feels different from studying words.",
        "Encoding under a time limit forces prioritization. Your brain learns to grab the most informative features first, a skill that helps in real situations where you glimpse something important and must remember it.",
        "The game trains both gist and detail: counts tap the gist of the whole grid, while position questions demand precise detail. Balancing the two builds a more complete visual memory.",
        "Because there is no harsh fail state mid-game, the practice stays low-stakes and enjoyable. Safe-to-fail repetition is exactly what helps memory circuits strengthen without anxiety getting in the way.",
        "Sharper visual memory pays off daily — recognizing people, remembering where you put things, and reading busy interfaces all become easier. A few minutes of focused recall practice compounds into real-world benefits.",
      ],
    },
  ],
};
