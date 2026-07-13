import type { GameContent } from "../../../shared/types";

export const content: GameContent = {
  guide: [
    {
      heading: "Goal",
      body: "Drag the colored shape tiles to their matching target zones before the countdown reaches zero. You earn points for both accuracy and speed, so a well-placed quick drag beats a slow hesitant one.",
    },
    {
      heading: "How to play",
      body: "A palette of colored shapes appears at the bottom of the board, and several target zones are placed above. Click and drag a shape onto the zone whose color and shape match it. A correct drop scores points and removes the shape; a wrong drop bounces it back and costs a small penalty.",
    },
    {
      heading: "Scoring",
      body: "Every correct match gives you a base score plus a time bonus that shrinks as the round progresses. Consecutive correct drops build a combo multiplier up to 4x. Wrong drops break your combo and deduct points, so accuracy matters as much as speed.",
    },
    {
      heading: "Example",
      body: "You see a red circle and a target zone that is also a red circle. Dragging it there immediately awards 100 points plus a 30-point time bonus. If you do this five times in a row without missing, your combo rises to 2x, then 3x, then 4x, turning each drop into 400 points.",
    },
  ],
  instructions: {
    objective:
      "Match as many colored shapes to their target zones as possible within the time limit, maximizing combo and time bonuses.",
    desktop:
      "Click and hold any shape tile in the palette, drag it to the matching target zone, and release to drop. The cursor changes when hovering over a valid target. Wrong drops are rejected automatically.",
    mobile:
      "Touch and drag a shape tile from the palette to the matching target zone, then lift your finger to drop. Touch targets are large enough for comfortable play on any modern phone screen.",
    winning:
      "There is no hard win state, but you achieve a personal best when your total score beats your previous high score. Try to push past 5,000 points in a single round for a star rating.",
    losing:
      "The round ends when the timer reaches zero. At that point the board locks, your final score is recorded, and a new game can be started. You cannot run out of lives.",
    tips: [
      "Scan all targets first and pick the easiest match before anything else.",
      "Build your combo deliberately; one wrong drop can reset a 4x multiplier.",
      "Use the time bonus by matching quickly rather than hunting for perfect placements.",
      "Ignore shapes that have no matching target and focus on the available pairs.",
      "Keep your eyes on the timer and slow down only if it is about to expire.",
      "Practice the drag motion so your finger or cursor stays precise under pressure.",
    ],
  },
  faqs: [
    {
      q: "How do you play Match the Feel?",
      a: "Drag colored shape tiles from the bottom palette to matching target zones at the top. Each correct match scores points and a time bonus, while wrong drops cost you a small penalty and break your combo. The round ends when the timer runs out.",
    },
    {
      q: "What are the rules of Match the Feel?",
      a: "You have ninety seconds to match as many shapes as possible. Correct drops award points plus a shrinking time bonus. Consecutive correct matches build a combo up to 4x. Wrong drops break the combo and deduct points. There are no lives or game-over states within the timer.",
    },
    {
      q: "How does the combo system work?",
      a: "Every correct match increases your combo by one level, up to a maximum of 4x. One wrong drop resets the combo back to 1x. The combo multiplier is applied to the base score of each correct drop, so a 4x combo turns a 100-point match into 400 points.",
    },
    {
      q: "What happens when I drop a shape on the wrong target?",
      a: "The shape bounces back to the palette, your combo resets to 1x, and a small point penalty is applied. The target zone remains available for the correct shape, so try again immediately.",
    },
    {
      q: "Is there a timer in Match the Feel?",
      a: "Yes. Each round lasts ninety seconds. A visible countdown tracks your remaining time, and the time bonus awarded for each match shrinks as the clock winds down. Plan your final moves carefully when only a few seconds remain.",
    },
    {
      q: "What is a good score in Match the Feel?",
      a: "Beginners often score between 1,000 and 2,500. Reaching 5,000 points in a single round earns a star rating and qualifies as a strong run. Above 10,000 is exceptional and requires consistent 4x combos.",
    },
    {
      q: "Can I play Match the Feel on mobile?",
      a: "Yes. The game is optimized for touch with large drag targets and responsive layout. Touch and drag a shape to its matching target zone, then lift to drop. It runs smoothly on iOS and Android browsers.",
    },
    {
      q: "Does Match the Feel require an internet connection?",
      a: "No. Once the page has loaded, the game runs entirely in your browser. Scores are saved locally on your device and do not require a server connection.",
    },
    {
      q: "What is the time bonus?",
      a: "The time bonus is an extra number of points awarded on top of the base score for a correct match. It starts at 50 points when the round begins and gradually decreases to zero as the timer counts down. Faster matches earn higher bonuses.",
    },
    {
      q: "Are the shapes randomized each round?",
      a: "Yes. Every new round generates a fresh set of shapes and target zones, so no two rounds are the same. The palette size and target count scale slightly as your average score improves.",
    },
    {
      q: "What happens if there is no matching target for a shape?",
      a: "Some shapes appear without a matching target to test your decision-making. If you drag an unmatched shape to any target, it will bounce back and deduct a small penalty. Ignore unmatched shapes and focus only on valid pairs.",
    },
    {
      q: "Is Match the Feel free to play?",
      a: "Yes. It runs in any modern browser with no download, no account, and no cost. Open the page and start dragging shapes immediately.",
    },
    {
      q: "How can I improve my Match the Feel score?",
      a: "Focus on building long combos, match the easiest pairs first, and avoid dragging unmatched shapes. Practice the drag motion so your hand stays precise, and always check the timer before attempting a risky drop.",
    },
    {
      q: "Does the game get harder over time?",
      a: "The core mechanics stay the same, but the palette grows busier and the timer counts down faster in later rounds if you consistently score above 5,000 points. This adaptive difficulty keeps the challenge fresh.",
    },
    {
      q: "What devices are supported?",
      a: "Any device with a modern browser and either a mouse or touchscreen. Desktop, laptop, tablet, and phone screens are all supported. The layout automatically adjusts to fit the available space.",
    },
    {
      q: "Why is it called Match the Feel?",
      a: "The name refers to the satisfying tactile feedback of dragging shapes into place. Correct drops feel snappy and responsive, while wrong drops produce a visible bounce that guides you toward the right choice without frustration.",
    },
  ],
  blog: [
    {
      title: "How to Build Long Combos in Match the Feel",
      excerpt:
        "Master the combo system, avoid costly mistakes, and push your score well past 5,000 points.",
      headings: [
        "Understand the Combo Counter",
        "Pick Easy Matches First",
        "Avoid Unmatched Shapes",
        "Time Your Final Drops",
        "Track Your Best Score",
      ],
      body: [
        "The combo counter is the single most important mechanic in Match the Feel. Every correct match increases your multiplier by one level, capping at 4x. A single wrong drop snaps it back to 1x, so protecting your combo is always worth more than chasing a risky high-point target.",
        "Start each round by scanning the entire board for the easiest pair. Dragging a red circle to its red circle target within the first five seconds builds a combo early and sets the tone for the rest of the round. Early momentum is harder to lose than late momentum.",
        "Unmatched shapes are deliberate traps. If you drag one to any target, it bounces back, resets your combo, and deducts points. Train yourself to ignore shapes that have no obvious match and only interact with confirmed pairs.",
        "As the timer drops below twenty seconds, the time bonus shrinks to almost nothing. Prioritize correct matches over speed, because a late wrong drop is far more expensive than a slow correct one. Stay calm and match deliberately in the final moments.",
        "Your best score is saved automatically and shown at the start of each round. Use it as a benchmark: if you are at 3,000 points with thirty seconds left, you know you need a combo-driven finish to beat it. The score tracker turns every round into a personal challenge.",
      ],
    },
    {
      title: "Match the Feel vs. Other Color Matching Games",
      excerpt:
        "See what makes Match the Feel different from classic color matching games and why its drag mechanic stands out.",
      headings: [
        "Drag, Not Click",
        "Combo and Time Bonus",
        "Unmatched Shapes as Obstacles",
        "Adaptive Difficulty",
        "Browser-Native and Free",
      ],
      body: [
        "Most color matching games rely on clicking or tapping two items to pair them. Match the Feel replaces that with a physical drag mechanic that feels more direct and satisfying. Grabbing a shape, pulling it across the board, and releasing it onto the right target creates a sense of agency that simple taps lack.",
        "The scoring formula in Match the Feel is unique because it rewards two behaviors at once: accuracy and speed. A correct drop gives a base score, a time bonus, and a combo multiplier, which means the best players are both fast and precise. Many other games only reward one of those traits.",
        "Unmatched shapes are rare in the genre but central to Match the Feel. They force you to read the board actively instead of clicking everything. This small twist turns a simple drag game into a pattern-recognition challenge that rewards observation over reflexes alone.",
        "Adaptive difficulty keeps the game interesting without making it unfair. The palette grows slightly busier and the timer tightens only when your score proves you can handle it. This means beginners stay comfortable while advanced players face a genuine challenge.",
        "Match the Feel is built for the browser with no downloads, no accounts, and no paywalls. It loads fast, runs on any device, and saves your best score locally. If you want a quick, satisfying puzzle that respects your time, it is one of the best free options available.",
      ],
    },
    {
      title: "The Science Behind Color and Shape Matching",
      excerpt:
        "Learn why matching colored shapes exercises your brain and how short daily sessions can sharpen cognition.",
      headings: [
        "Visual Attention and Search",
        "Working Memory Under Pressure",
        "Motor Precision",
        "Stress Relief Through Flow",
        "Daily Practice Benefits",
      ],
      body: [
        "Color matching games train visual search, the process by which your brain scans a scene for a specific item. When you look for a red circle among many shapes, your visual system learns to filter distractions and lock onto relevant features faster over time. This skill transfers to real tasks like reading charts or finding items in a crowded room.",
        "Building a long combo requires working memory: you must hold the positions of several shapes in mind while planning the next few drops. Under the ninety-second timer, your brain practices holding and updating information quickly, which strengthens the same circuits used in problem-solving and planning.",
        "Dragging shapes onto targets improves motor precision, especially on touch devices where finger tracking is less exact than a mouse. Repeated drags train fine motor control and hand-eye coordination in a low-stakes setting that feels like play rather than practice.",
        "When you enter a state of smooth, uninterrupted matching, you experience flow: a psychological state where challenge and skill are perfectly balanced. Flow lowers stress and increases enjoyment, making Match the Feel not just a brain workout but also a genuine mental break.",
        "A five-minute daily session is enough to see measurable gains in speed and accuracy. Consistent, brief practice outperforms occasional long marathons because it reinforces neural pathways without causing fatigue. Over a month of daily play, most players notice faster recognition of matching pairs and longer natural combos.",
      ],
    },
  ],
};
