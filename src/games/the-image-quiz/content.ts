import type { GameContent } from "../../shared/types";

export const content: GameContent = {
  guide: [
    {
      heading: "Goal",
      body: "Each round shows a zoomed-in or cropped view of an object and asks you to identify it from four choices. Score points for every correct guess and build a streak for fast, confident answers across 10 rounds.",
    },
    {
      heading: "How to play",
      body: "A large, close-up illustration appears with a short clue beneath it. Four answer buttons sit below. Tap or click the label you think matches the image. A correct pick plays a success tone and adds points; a wrong pick reveals the right answer before the next round.",
    },
    {
      heading: "Strategy",
      body: "The close-up hides the whole object, so read the clue and reason from colour, shape, and texture. Use elimination on the four choices, and trust the most distinctive feature you can see — a pattern or colour is often the fastest tell.",
    },
    {
      heading: "Example",
      body: "A zoomed red circle with a small stem appears and the clue reads 'A crisp fruit often paired with peanut butter.' The options are Apple, Tomato, Peach, and Cherry. You tap Apple, the card turns green, and your score climbs with a speed bonus.",
    },
  ],
  instructions: {
    objective:
      "Correctly identify the object behind each zoomed-in or cropped image across 10 rounds and finish with the highest possible score.",
    desktop:
      "Use your mouse to click the answer button you think matches the close-up image. Each round shows a magnified illustration with a clue and four choices. A correct answer scores points plus a speed bonus; a wrong answer reveals the right one. The quiz auto-advances to the next round.",
    mobile:
      "Tap the answer button you believe is correct. Large touch targets make it easy to play with one thumb. The round timer keeps ticking, so tap confidently. The layout is fully responsive and works in any mobile browser.",
    winning:
      "There is no single fail state — every round counts toward your total. You 'win' the quiz by finishing all 10 rounds with a strong score, and your best total is saved locally so you can chase a new personal record.",
    losing:
      "You cannot truly lose, but wrong answers cost you points and the round timer punishes slow guesses. Run out of time on a question and it counts as incorrect. The challenge is maximising your score, not simply surviving.",
    tips: [
      "Identify the dominant colour first — it often narrows the options fast.",
      "Look for a unique texture or pattern in the cropped view.",
      "Read the clue before locking in an answer; it usually rules out two options.",
      "Answer quickly to bank the shrinking speed bonus.",
      "Build a streak: consecutive correct answers multiply your points.",
      "Trust the most distinctive visible feature over a vague guess.",
    ],
  },
  faqs: [
    {
      q: "How do you play The Image Quiz?",
      a: "Each round shows a zoomed-in or cropped illustration of an object with a short clue and four answer choices. Click or tap the label you think is correct. Right answers score points and a speed bonus; wrong answers reveal the right one. After 10 rounds your total is shown and your best is saved.",
    },
    {
      q: "What kinds of images are in The Image Quiz?",
      a: "The quiz uses bold, close-up illustrations of everyday objects, animals, and foods — fruit, flowers, insects, sea life, and more. Each is shown magnified or cropped so you identify it from detail rather than the whole picture.",
    },
    {
      q: "How is the score calculated?",
      a: "You earn base points for each correct answer plus a speed bonus that shrinks as the round timer counts down. A correct-streak multiplier rewards consecutive right answers, so fast, accurate play scores the most.",
    },
    {
      q: "Is there a time limit?",
      a: "Yes. Each round has a short countdown. Answering before it runs out grants a speed bonus, while letting it expire marks the round incorrect. The timer keeps the quiz snappy and rewards quick recognition.",
    },
    {
      q: "How many rounds are there?",
      a: "Each quiz is 10 rounds long. Questions are drawn from a large pool and shuffled, so no two playthroughs feel identical. You can replay as many times as you like to improve your best score.",
    },
    {
      q: "Does The Image Quiz track a best score?",
      a: "Yes. Your highest total score is stored locally in your browser and shown at the start of every quiz. Clearing your browser data or switching devices resets it, since the record lives on your device.",
    },
    {
      q: "Is The Image Quiz good for observation skills?",
      a: "Absolutely. Identifying cropped and zoomed images trains visual discrimination and detail spotting. The clues add context, and repeated play sharpens both observation and recall of everyday objects.",
    },
    {
      q: "Can kids play The Image Quiz?",
      a: "Yes. The illustrations are friendly, the controls are simple taps, and there is no violence or complex reading. It is a fun family or classroom quiz that quietly builds attention to detail.",
    },
    {
      q: "Is The Image Quiz free?",
      a: "Yes. It runs in the browser with no cost, no account, and no download. Open the page and start the quiz immediately. Your score and best record stay private on your device.",
    },
    {
      q: "Can I play The Image Quiz on mobile?",
      a: "Yes. The layout is fully responsive with large touch targets, so it plays naturally on phones and tablets. No app install is required — just open the page in any modern mobile browser.",
    },
    {
      q: "What happens if I answer wrong?",
      a: "A wrong answer plays an error tone, marks the round incorrect, and reveals the correct label so you learn from it. You then move on to the next round. Wrong answers lower your total and break your streak.",
    },
    {
      q: "What is the speed bonus?",
      a: "The speed bonus is extra points for answering quickly. It starts high when the round opens and ticks down with the timer. Fast, confident guesses therefore score far more than slow ones.",
    },
    {
      q: "How do I build a streak?",
      a: "Answer consecutive rounds correctly without a miss. Each consecutive correct answer raises a multiplier that boosts your points. A single wrong answer or timeout resets the streak back to its base value.",
    },
    {
      q: "Are the images real photographs?",
      a: "The close-ups are stylised, self-contained illustrations rather than photographs, so the quiz loads instantly and works offline. The recognition challenge — identifying an object from a cropped detail — is the same as with a photo.",
    },
    {
      q: "Why does the quiz reveal the answer after a miss?",
      a: "Revealing the correct label turns every mistake into a learning moment. Immediate feedback right after a wrong guess is one of the most effective ways to lock the fact into memory for next time.",
    },
    {
      q: "How can I improve my score quickly?",
      a: "Focus on speed and accuracy: spot the dominant colour and unique feature first, then commit. Practice common objects, and replay daily. Over a week your streaks will lengthen and your best score will climb.",
    },
    {
      q: "Does the game need an internet connection for images?",
      a: "No external image files are loaded. The zoomed illustrations are drawn with lightweight, self-contained graphics, so the quiz works offline once the page is open and never stalls on a slow network.",
    },
  ],
  blog: [
    {
      title: "The Image Quiz — Complete Guide",
      excerpt:
        "Learn how to play The Image Quiz, master its zoomed-in recognition rounds, and chase your best score.",
      headings: [
        "What Is The Image Quiz",
        "How the Rounds Work",
        "Scoring and the Speed Bonus",
        "Tips for New Players",
        "Why It Sharpens Observation",
      ],
      body: [
        "The Image Quiz is a fast, browser-native recognition game where every round shows a zoomed-in or cropped illustration of an everyday object and asks you to name it from four choices. Ten rounds make up a quiz, and your total score is the goal to beat.",
        "The rules are simple. A card displays a magnified image and a hint, then four buttons offer possible labels. Click or tap your choice: a correct answer scores points and a speed bonus, while a wrong answer reveals the right label so you learn from it. The quiz then advances automatically to the next round.",
        "Scoring rewards both knowledge and quickness. Each correct answer grants base points plus a speed bonus that shrinks with the timer, and a consecutive-correct streak applies a multiplier. Your best total is saved locally, giving you a personal record to chase on every replay.",
        "New players improve fast with a few habits. Spot the dominant colour and unique texture first, eliminate obvious wrong options, then commit. Answer confidently and quickly to bank the speed bonus, and protect your streak by avoiding careless misses.",
        "Because every round forces you to read visual detail, The Image Quiz trains observation and discrimination. Repeated play strengthens recall of everyday objects and patterns, and the reveal-after-miss feedback turns errors into durable learning. A few minutes a day noticeably sharpens your eye.",
      ],
    },
    {
      title: "Read the Detail: Visual Clues That Win",
      excerpt:
        "How to identify a cropped object from colour, shape, and texture alone.",
      headings: [
        "Lead With Colour",
        "Spot the Unique Texture",
        "Use the Clue Wisely",
        "Eliminate With Confidence",
        "Practice Common Categories",
      ],
      body: [
        "Colour is the fastest filter. A vivid red, a sunny yellow, or a deep green immediately rules out whole categories of answers. Lead with the dominant hue before reasoning about anything else in the cropped view.",
        "Texture and pattern are the next tell. Stripes, spots, fuzz, or smoothness distinguish look-alike objects that share a colour. Train your eye to notice the surface detail a zoom inevitably reveals.",
        "The clue is a gift — read it first. A well-written hint usually eliminates two of the four options before you even study the image. Combine the clue with the visible feature and the right answer often becomes obvious.",
        "When unsure, eliminate hard. Cross out the options you know are wrong, then choose the most plausible remaining label. Even a 50/50 guess beats freezing, and the reveal afterward still teaches you the correct fact.",
        "Practice by category — fruit, animals, flowers, sea life. Focused batches build a mental library of distinctive features, so the next time a cropped strawberry or penguin appears you recognise it in a heartbeat.",
      ],
    },
    {
      title: "Train Your Eye in Two Minutes a Day",
      excerpt:
        "How a quick daily quiz builds real-world observation skills.",
      headings: [
        "Two Minutes a Day",
        "Detail Over Guesswork",
        "Learn From Your Misses",
        "Track a Visible Streak",
        "Make It a Family Game",
      ],
      body: [
        "You do not need long sessions to get better at visual recognition. A two-minute quiz like The Image Quiz, played daily, delivers the spaced repetition ideal for long-term memory. Short and frequent wins over occasional marathons.",
        "The cropped format forces detail over guesswork. Instead of recognising a whole object, you must read a fragment — exactly the skill that transfers to real tasks like spotting a ripe fruit or identifying a leaf on a walk.",
        "The reveal-after-miss design is the secret. When you get one wrong, the correct label appears immediately in context, which is when your brain is primed to absorb it. Misses become the most valuable moments of the quiz.",
        "Watching your best score and streak climb is motivating in a way abstract 'learning' is not. A visible number turns practice into a game you want to win, and that drive keeps you coming back without external pressure.",
        "Play with family or a classroom and the quiz becomes social. Comparing streaks and debating a tricky crop sparks curiosity and conversation. It is a low-effort, high-reward habit that quietly makes everyone more observant.",
      ],
    },
  ],
};
