import type { GameContent } from "../../../shared/types";

export const content: GameContent = {
  guide: [
    {
      heading: "Objective",
      body: "Build the tallest, most stable tower you can before it topples. In Stack Tower every perfectly aligned drop adds another block and pushes your score higher, so the real goal is simple: place as many blocks as possible without letting a dropped block miss the one below it.",
    },
    {
      heading: "How to play",
      body: "A block slides left and right across the top of the screen. Click or tap once to drop it instantly. The block locks onto the stack beneath it, and anything that overhangs the edge is sliced away and falls off. The width of your new block is exactly the width of the overlap with the block below, so a careless drop permanently shrinks the tower.",
    },
    {
      heading: "Strategy",
      body: "Time your drops so each block lands as close to center as possible. The wider your overlap, the more room you have for the next drop and the longer you will survive. Speed ramps up with every level, so watch the rhythm and react early rather than chasing the perfect line on a fast-moving block.",
    },
    {
      heading: "Example",
      body: "Suppose the current stack is 200px wide and the moving block is 200px wide. You drop it slightly off-center and the overlap is 180px. The next block spawns at 180px wide. Drop it well and you keep 170px, then 160px, and so on. It ends the moment a block lands with zero overlap against the one below.",
    },
  ],
  instructions: {
    objective:
      "Stack falling blocks to build the tallest tower possible. Each block must overlap the one below it; the more centered your drops, the wider your tower stays and the higher your score climbs.",
    desktop:
      "A block moves left and right at the top of the play area. Press the left mouse button anywhere, or click the screen, to drop the block exactly where it is. Click again for each new block as the tower grows.",
    mobile:
      "A block slides left and right at the top of the screen. Tap anywhere on the screen to drop it instantly. Tap again for every new block. No dragging is needed, just a single tap to lock each piece into place.",
    winning:
      "Stack Tower is an endless game with no final level, so there is no single win condition. Your goal is to survive as long as possible and beat your own high score. Every block you place increases the count, and the longer you last as speed climbs, the better your score.",
    losing:
      "The game ends the instant a dropped block has no overlap with the block beneath it. Because the new block's width is set by the overlap, a total miss means nothing is left to stack on, and the tower run is over.",
    tips: [
      "Wait for the block to reach the center of the stack before dropping for the widest overlap.",
      "Anticipate the swing rather than reacting late, especially as the speed increases each level.",
      "Small overlaps keep you alive but shrink the next block, so protect your width early.",
      "Use a steady rhythm: tap on the beat of the block's movement to build consistency.",
      "On mobile, tap with your thumb near the bottom so your view of the stack stays clear.",
      "If a block is already narrow, play safer and accept a good overlap instead of chasing perfect.",
    ],
  },
  faqs: [
    {
      q: "How do you play Stack Tower?",
      a: "A block slides left and right at the top of the screen. Click or tap once to drop it. It lands on the stack below, any overhang is cut off, and the new block keeps only the overlapped width. Place as many as you can before an overlap of zero ends the run.",
    },
    {
      q: "What are the controls on a computer?",
      a: "Use a mouse. A block moves across the top automatically. Click the left mouse button anywhere on the screen to drop the block instantly. Each new block is dropped the same way with a single click.",
    },
    {
      q: "How do I play on a phone or tablet?",
      a: "Stack Tower is touch friendly. A block slides at the top and you simply tap anywhere on the screen to drop it. No dragging or holding is required, just one tap per block as the tower rises.",
    },
    {
      q: "How does scoring work?",
      a: "Your score is the number of blocks you successfully place on the tower. There are no bonus points or combos, so the only way to raise your score is to keep stacking. A higher block count means a higher score.",
    },
    {
      q: "How do I get a high score?",
      a: "Drop each block as close to the center of the stack as possible to keep overlaps wide. Center drops preserve width for future blocks, so you survive longer and place more blocks, which directly increases your final score.",
    },
    {
      q: "Why do the blocks get narrower?",
      a: "The width of every new block equals the overlap with the block beneath it. If you drop off-center, the overhanging part is removed and the next block is smaller. Perfectly centered drops keep the width unchanged.",
    },
    {
      q: "Does the game get faster?",
      a: "Yes. With each new level the block moves faster across the top, giving you less time to judge the drop. The rising speed is the main challenge, so timing and anticipation become more important as you climb.",
    },
    {
      q: "What is the best strategy?",
      a: "Aim for the center every time and tap on a steady rhythm rather than chasing last-second perfect drops. Protect your tower width early, because a slightly narrow block is far easier to recover from than a tiny one later.",
    },
    {
      q: "How do I center my drops?",
      a: "Watch the moving block and wait until it lines up with the middle of the stack below before clicking or tapping. Practicing with the slower early blocks builds the timing you need when the speed increases.",
    },
    {
      q: "What happens when overlap reaches zero?",
      a: "If a dropped block misses the block below entirely, there is no overlap and nothing to stack on next. The run ends immediately and your final score is the number of blocks you placed before that miss.",
    },
    {
      q: "Is Stack Tower endless?",
      a: "Yes, there is no final level or win state. The tower can keep growing as long as you land overlapping blocks. The challenge is simply to survive the increasing speed and beat your previous best score.",
    },
    {
      q: "Any tips for mobile players?",
      a: "Tap low on the screen so your thumb does not cover the stack, and use a calm, steady rhythm instead of fast repeated taps. Because the game only needs one tap per block, focus on timing rather than speed of input.",
    },
    {
      q: "How difficult is the game?",
      a: "The first few blocks move slowly and are easy to place. Difficulty comes from the speed, which rises each level. New players can usually reach a decent height, while mastering a high score takes practice and good timing.",
    },
    {
      q: "What age is Stack Tower suitable for?",
      a: "Stack Tower is family friendly and suitable for all ages. It has no violence, text, or complex rules, so young children can enjoy it while older players chase high scores. It is a good quick game for any age.",
    },
    {
      q: "What games are similar to Stack Tower?",
      a: "Stack Tower belongs to the tower stacking and timing genre. Similar titles include classic block stacking games, the popular Stack app, tower builder games, and timing games like Helix Jump where precise placement matters.",
    },
    {
      q: "Where did stacker games come from?",
      a: "Tower stacking games grew from early arcade timing challenges and physics stacking toys. The modern one-tap stacking style became popular on mobile with minimalist games that reward precise timing and clean visual feedback.",
    },
    {
      q: "Why does my tower look uneven?",
      a: "Each off-center drop trims the overhang, so the stack shifts toward wherever you tend to drop. Centering your taps keeps the tower straight. A slight shift is normal and does not end the game unless the overlap hits zero.",
    },
    {
      q: "How can I improve performance on older devices?",
      a: "Stack Tower is lightweight, but closing other browser tabs and using a recent browser helps. On mobile, lower screen brightness and disable extra animations in your device settings can keep the movement smooth as speed increases.",
    },
  ],
  blog: [
    {
      title: "Stack Tower — Complete Guide",
      excerpt:
        "Everything you need to know about Stack Tower: how it plays, how scoring works, and the habits that turn a short run into a towering high score.",
      headings: [
        "What is Stack Tower",
        "How the game works",
        "Scoring and endless play",
        "Building good habits",
        "Common mistakes to avoid",
      ],
      body: [
        "Stack Tower is a one-tap timing game where you drop moving blocks onto a growing tower. A block slides left and right at the top of the screen and you click or tap to drop it. The block locks onto the stack below, any overhanging portion is sliced off, and the next block takes the width of that overlap.",
        "The core mechanic is overlap. Because each new block is only as wide as the part that landed on the block beneath it, a careless drop permanently shrinks your tower. A perfectly centered drop keeps the width the same, while an off-center drop narrows it and makes the next placement harder.",
        "There is no final level. Your score is simply the number of blocks you place, so the goal is to survive as long as possible and beat your own high score. The challenge grows because the block speed increases with every level, leaving you less time to judge each drop.",
        "The best habit is to wait for the block to reach the center of the stack before dropping, and to tap on a calm, steady rhythm instead of reacting at the last second. Protecting your width early pays off later when blocks are narrow and the speed is high.",
        "The most common mistake is chasing a perfect drop on a fast block and missing entirely. A small overlap keeps you alive, so when the tower is already narrow, accept a safe landing rather than gambling on perfection. Missing completely ends the run at zero overlap.",
      ],
    },
    {
      title: "Beginner Tips for a Towering Score",
      excerpt:
        "New to Stack Tower? These simple, practical tips will help you place more blocks, keep your tower wide, and build a score you can be proud of.",
      headings: [
        "Start slow and learn the rhythm",
        "Aim for the center",
        "Protect your width",
        "Stay calm as speed rises",
      ],
      body: [
        "When you first open Stack Tower, the blocks move slowly, which is the perfect time to learn their rhythm. Watch a few swings without dropping and notice how the block travels across the top. Understanding the timing now makes the faster levels much easier later.",
        "Always try to drop the block when it lines up with the center of the stack below. Centered drops keep the block width unchanged, so your tower stays wide and forgiving. Off-center drops shrink the next block and quietly make the game harder.",
        "Think of your tower width as your health bar. Every narrow overlap costs you room for the next drop, so protect it early. A slightly imperfect but wide landing is almost always better than a risky attempt at perfection that could miss.",
        "As the speed climbs, resist the urge to tap faster. Keep a steady rhythm and anticipate the swing instead of reacting late. Staying calm is the difference between a short run and a towering score, because timing matters far more than how quickly you tap.",
      ],
    },
    {
      title: "Advanced Stacking Strategy & Mistakes",
      excerpt:
        "Once you can place a dozen blocks, it is time to refine. Learn the advanced timing tricks and the subtle mistakes that quietly end high-score runs.",
      headings: [
        "Reading the swing",
        "Trading width for safety",
        "The zero-overlap trap",
        "Practicing for consistency",
      ],
      body: [
        "Advanced play is about reading the swing before the block reaches the stack. Experienced players judge the midpoint of the movement and pre-commit to a tap, rather than waiting for the visual lineup. This removes reaction delay, which is critical when speed is high.",
        "There is a real tradeoff between a perfect drop and a safe one. A perfectly centered block keeps full width, but if you misjudge, you lose everything. When your tower is already narrow, deliberately accept a good overlap instead of gambling on a flush landing.",
        "The zero-overlap trap ends most runs. Because a miss leaves nothing to stack on, one late or early tap finishes the game. Treat every drop as a must-keep-overlap event, and when in doubt, drop a touch early where a wider base still catches the block.",
        "Consistency beats occasional brilliance. Practice short sessions to build reliable timing, and focus on repeating safe centered drops rather than chasing records. Over time your average run length, and therefore your high score, will climb steadily.",
      ],
    },
  ],
};
