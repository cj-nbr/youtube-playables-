import type { GameContent } from "../../../shared/types";

export const content: GameContent = {
  guide: [
    {
      heading: "Goal",
      body: "Select a themed card set, flip cards two at a time, and match every pair using the fewest moves possible. Each theme presents a 4×4 grid of sixteen unique faces, from animals and fruits to sports and space. Beat your best score by improving your memory.",
    },
    {
      heading: "How to play",
      body: "Pick a card theme from the lobby screen. The 4×4 grid shuffles every time you start a new game. Flip two cards to see their faces. If they match, they stay revealed. If they do not, they flip back after a short pause so you can memorize them.",
    },
    {
      heading: "Multiple themes",
      body: "Each card set uses a consistent visual style with familiar icons. Animals features creatures like lions and pandas; fruits shows oranges, grapes, and kiwis; sports highlights balls and equipment; space includes planets and rockets. Choose a theme you enjoy to keep sessions fresh.",
    },
    {
      heading: "Example",
      body: "You pick the Animals theme and flip a panda on card (0, 0). On your second flip you see a cat at card (0, 1) — no match, they flip back. Next turn you glimpse a second panda at card (3, 3). You now know both panda locations and can match them deliberately to save two moves.",
    },
  ],
  instructions: {
    objective:
      "Match all eight card pairs on the 4×4 board in the fewest moves. Choose any theme and chase your personal best move count.",
    desktop:
      "Click any face-down card to reveal it. Click a second card to reveal it as well. Matching pairs stay revealed; mismatches flip back after a moment. Use your memory to find all eight pairs. Click New Game to reshuffle and start a fresh challenge.",
    mobile:
      "Tap any face-down card to flip it. Tap a second card to reveal it. If the faces match they stay open; if not, they flip back automatically. The touch targets are extra large for comfortable play on phones and tablets.",
    winning:
      "You win when all sixteen cards are matched and revealed. Your move count is recorded and compared against your best score. A perfect game is eight moves, one for each pair with zero wasted flips.",
    losing:
      "Not applicable. There is no timer, no lives, and no fail state. Mastercards is a relaxed memory game where the only metric is how efficiently you clear the board.",
    tips: [
      "Pick a theme you find visually pleasant so the faces are easier to recall.",
      "Flip unknowns in a consistent order, such as left to right, top to bottom.",
      "Memorize in small chunks — three or four cards per scan — rather than trying to see everything.",
      "Immediately flip a known match the moment you see one of its partners.",
      "Use New Game to reshuffle if you feel stuck; a fresh arrangement often jog your memory.",
      "Track your best score and use it as motivation to reduce wasted flips.",
    ],
  },
  faqs: [
    {
      q: "How do you play Mastercards?",
      a: "Choose a theme, then flip two face-down cards at a time. If the faces match, they stay revealed. If not, they flip back after a short pause. Keep flipping pairs until all eight pairs are revealed. The game tracks your total moves and saves your best score.",
    },
    {
      q: "What card themes are available?",
      a: "Four themes are included: Animals, Fruits, Sports, and Space. Each theme presents its own 16-card 4×4 grid with visually distinct icons. Switching themes between games keeps the experience fresh and lets players pick visuals they prefer.",
    },
    {
      q: "How many pairs are in Mastercards?",
      a: "Each game has exactly eight pairs, totaling sixteen cards on a 4×4 grid. Every face appears exactly twice and only twice.",
    },
    {
      q: "Is there a timer in Mastercards?",
      a: "No timer is imposed. The board stays open as long as you need, so you can study faces and plan matches without pressure. The only limit is your own move efficiency, measured for the best-score tracker.",
    },
    {
      q: "How does best scoring work?",
      a: "Best score records your fewest moves to clear a board. A perfect run is eight moves — one per match with no wasted flips. The score is saved locally in your browser and shown on every game so you can try to beat it.",
    },
    {
      q: "Can I play Mastercards on mobile?",
      a: "Yes. Cards are large and easy to tap, and the layout fits all modern phone and tablet screens. No app download is required — just open the page and start matching.",
    },
    {
      q: "Is Mastercards free to play?",
      a: "Yes. Mastercards runs entirely in the browser. No account, no download, and no in-app purchases are needed. Open the page, choose a theme, and start matching.",
    },
    {
      q: "How do I switch themes?",
      a: "On the theme lobby screen, tap or click any available set. Each new theme shuffles a fresh 4×4 board, so every switch is a completely new memory challenge.",
    },
    {
      q: "What memory techniques help in Mastercards?",
      a: "Chunking, the method of loci, and consistent scanning all help. Group cards by region, assign each icon a simple story, and rehearse immediately after every mismatch to reinforce locations. New players often improve by sweeping the board row by row rather than randomly.",
    },
    {
      q: "Can two people play Mastercards?",
      a: "Yes. Pass the device to a friend and alternate turns, or compete for the lowest move count. The game works equally well in single-player training mode or head-to-head on the same screen.",
    },
    {
      q: "What are the brain benefits of Mastercards?",
      a: "It trains working memory, visual recall, and concentration. Regular short sessions improve focus and pattern recognition without the stress of a countdown. It is a gentle brain workout that also works as a calming break.",
    },
    {
      q: "What is a perfect game in Mastercards?",
      a: "A perfect game reveals all eight pairs in exactly eight moves, meaning every flip is a correct match. This is difficult but achievable with a good memory and steady rhythm. Perfect runs are tracked and celebrated with sounds.",
    },
    {
      q: "Why do mismatched cards flip back?",
      a: "Flipping back hides cards so you must rely on memory rather than repeated guesswork. Each mismatch teaches you two locations and two faces, turning every turn into a study opportunity. The brief pause lets you register what you saw before the cards close.",
    },
    {
      q: "Does my best score persist between sessions?",
      a: "Yes. Best scores are saved in your browser's local storage, so they remain when you return. Clearing browser data or switching devices will reset them because scores are stored on-device rather than on a server.",
    },
    {
      q: "Are there difficulty levels?",
      a: "The core grid is always 4×4, so the challenge is consistent. Harder difficulty comes from managing multiple themes and beating your own streak. If you want more, a future update may add 6×6 grids or custom image uploads.",
    },
    {
      q: "Is Mastercards suitable for kids?",
      a: "Yes. The colorful, friendly icons, simple tap controls, and lack of time pressure make it ideal for children. Matching games are proven to help young players develop memory, focus, and early pattern recognition skills.",
    },
  ],
  blog: [
    {
      title: "Mastercards — The All-Themed Memory Game",
      excerpt:
        "Explore card themes, memory strategies, and brain benefits in this detailed Mastercards overview.",
      headings: [
        "Multiple Themes, One Game",
        "Cognitive Benefits of Matching",
        "How Memory Trains the Brain",
        "Mastering Multiple Themes",
        "Building a Play Routine",
      ],
      body: [
        "Mastercards is a memory card matching game built around a 4×4 grid of sixteen face-down cards. What sets it apart is its collection of themed card sets — Animals, Fruits, Sports, and Space — each offering its own distinctive visual style. Pick the theme you enjoy, flip pairs, and chase the fewest possible moves.",
        "Cognitive psychologists call this type of activity paired-associate learning. Every mismatch teaches you two disconnected facts: a face and a location. Every match reinforces the link between them. Doing this repeatedly improves working memory, visual recall, and the ability to ignore distractions.",
        "The method of loci works beautifully here. Anchor each card you reveal to a fixed position in your mind, then revisit that mental map on every turn. Players who mentally rehearse after each mismatch consistently move faster than players who rely on vague feeling.",
        "Switching themes keeps the game fresh because each face set forces your brain to construct a new mental catalog. Starting a new theme is a great warm-up. Then, within that theme, build fluency by replaying the same board mentally after a reshuffle. You will begin to recognize shuffle patterns and adapt faster.",
        "Build a simple routine: one short session in the morning, one before bed. Track your best move count per theme and try to beat it at least twice per week. Even five minutes a day is enough to sharpen recall, and the low-stress format makes the routine genuinely enjoyable.",
      ],
    },
    {
      title: "Memory Techniques That Actually Work",
      excerpt:
        "From chunking to active recall, scientifically-backed methods you can use in Mastercards today.",
      headings: [
        "Chunking",
        "Active Rehearsal",
        "Consistent Scan Order",
        "Theme Switching for Novelty",
        "Measuring Improvement",
      ],
      body: [
        "Chunking means grouping cards into logical chunks instead of remembering all sixteen at once. In Mastercards, scan two rows together, or divide the grid into four 2×2 quadrants. Your working memory can hold four to six items comfortably; chunk to that size and you will recall far more.",
        "Active rehearsal is the habit of repeating a fact to yourself immediately after seeing it. After every flip, especially a mismatch, say the face name silently and state its coordinates. This single practice increases retention by two-thirds compared to passive viewing, because you are committing the memory to long-term storage.",
        "A consistent scan order removes randomness and gives your brain a predictable structure. Left to right, top to bottom, is the most natural. Once your eyes know where to go, they are free to process faces instead of searching for the next card.",
        "Theme switching introduces novelty, which boosts alertness. Playing only one theme can feel routine. Switching between animals, fruits, sports, and space every few games resets your attention and keeps each session feeling like a fresh puzzle rather than a chore.",
        "Track improvement by writing down your move count after each session and plotting it on a simple chart. You will see dips and peaks, but the trend line over a month tells the truth: your memory is getting faster and more accurate. That data is its own reward and keeps motivation high.",
      ],
    },
    {
      title: " Family Game Night with Mastercards",
      excerpt:
        "Why Mastercards is the perfect low-pressure game for family bonding, learning, and healthy competition.",
      headings: [
        "Low Stakes, High Fun",
        "Learning Together",
        "Competitive Edges",
        "Adapting for All Ages",
        "Turning Play Into Habit",
      ],
      body: [
        "Mastercards is ideal for families because it needs no setup, no rules lawyer, and no screen-fighting multiplayer lobby. Everyone can play on the same device in turns, with scores quietly tracked in the background. Parents and children can compete or cooperate, and the game never penalizes slower players.",
        "Learning together happens naturally. Younger children practice color and shape recognition with the themed icons while older players practice speed and advanced memory techniques. Parents can model chunking and verbal rehearsal, teaching skill without lecturing.",
        "The competitive edge is friendly. Challenges such as can you beat your parent in under fifteen moves? turn memory practice into gamified family time. Because the game records best scores, kids and adults can race against their own records rather than each other, reducing frustration.",
        "For very young players, stick to one or two themes with bright, friendly icons. For older family members, introduce the Sports or Space sets for added challenge. The universal simplicity of flip-two-and-match means the rules never need explaining, even to first-time guests.",
        "Turn play into a habit by scheduling one Mastercards session after dinner a few times a week. The mood is relaxed, the stakes are low, and the shared language of who found which pair takes shape naturally. It is a small, regular ritual that strengthens family bonds through quiet competition.",
      ],
    },
  ],
};
