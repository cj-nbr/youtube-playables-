import type { GameContent } from "../../shared/types";

export const content: GameContent = {
  guide: [
    {
      heading: "Goal",
      body: "Words drop from the top of the screen. Type each word exactly as it falls and press Enter to freeze and destroy it before it reaches the bottom. Clear as many as you can before you run out of lives.",
    },
    {
      heading: "How to play",
      body: "A text box sits at the bottom. As a word falls, type its letters into the box. When your typed text matches a falling word, that word turns blue. Press Enter to shatter it for points. Miss one and it hits the floor, costing you a life.",
    },
    {
      heading: "Strategy",
      body: "Prioritise the lowest words first — they are closest to the floor. Keep your eyes on the bottom edge and clear dangerous words before they land. Longer words are worth more, so don't ignore a big word just because a short one is handy.",
    },
    {
      heading: "Example",
      body: "The word 'GLACIER' is falling and is halfway down. You type g-l-a-c-i-e-r and the word highlights. You press Enter, it shatters with a success chime, and your score jumps by 70 points. Meanwhile a shorter word reaches the floor and you lose a life.",
    },
  ],
  instructions: {
    objective:
      "Type falling words correctly and destroy them before they reach the bottom, surviving as long as possible to maximise your score.",
    desktop:
      "Click the input box at the bottom so your keyboard is focused. Type the letters of a falling word; it highlights blue once your text matches it. Press Enter to freeze and eliminate it. Three words reaching the floor ends the game. Use the New game button to restart.",
    mobile:
      "Tap the input field to bring up the on-screen keyboard, then type a falling word and tap the Enter key. Matching words shatter instantly. The board is responsive, and the larger on-screen keys make typing comfortable on a phone.",
    winning:
      "Spellice is an endless survival game — there is no final level to 'win'. Your goal is a high score: clear words continuously, build long streaks, and beat your saved best before the words overwhelm you.",
    losing:
      "You lose when three words reach the bottom of the play area. Each landed word costs one of your three lives. When the last life is gone, the game ends and your score is recorded against your best.",
    tips: [
      "Always clear the lowest word first — it is the one about to cost you a life.",
      "Don't delete and retype; just keep the matching word highlighted and hit Enter.",
      "Longer words score more, so value them when you have time to spare.",
      "Keep your keyboard focused so you can react the instant a word appears.",
      "Watch the edges — words spawn at random horizontal positions.",
      "Build a streak by clearing words back-to-back for a score multiplier.",
    ],
  },
  faqs: [
    {
      q: "How do you play Spellice?",
      a: "Words fall from the top of the screen. Type a word into the box at the bottom; when your text matches a falling word it highlights, and pressing Enter shatters it for points. If three words reach the floor you lose. The game is endless, so the aim is a high score.",
    },
    {
      q: "Do I have to type capital letters?",
      a: "No. The game matches your input case-insensitively, so typing in upper or lower case works the same. Just spell the word correctly and press Enter to clear it.",
    },
    {
      q: "How does scoring work in Spellice?",
      a: "Each letter you clear is worth points, so longer words are worth more. Consecutive clears without a miss build a streak multiplier that boosts your score. Every landed word costs a life but does not reduce your accumulated points.",
    },
    {
      q: "How many lives do I have?",
      a: "You start with three lives. Each word that reaches the bottom of the play area costs one life. When all three are gone the game ends and your final score is shown.",
    },
    {
      q: "What happens when a word reaches the bottom?",
      a: "The word is destroyed and you lose one life. An error tone plays and the remaining lives are updated in the status line. Lose your third life and the game over screen appears.",
    },
    {
      q: "Is there a time limit?",
      a: "There is no countdown clock, but the falling words create constant time pressure. The longer you survive, the faster new words spawn and the quicker they fall, so the difficulty ramps up naturally.",
    },
    {
      q: "Does Spellice track a best score?",
      a: "Yes. Your highest score is saved locally in your browser and displayed at the start of each game. Clearing your browser data or switching devices resets it, since the record is stored on your device.",
    },
    {
      q: "What is the streak multiplier?",
      a: "Clearing words one after another without any word landing builds a streak. Each streak step increases a multiplier applied to the points you earn, so sustained accurate typing pays off far more than sporadic clears.",
    },
    {
      q: "Can I pause Spellice?",
      a: "Yes. Press the Pause button to freeze the falling words and the spawn timer. Press Resume to continue exactly where you left off. Pausing is perfect for a quick break without losing progress.",
    },
    {
      q: "Is Spellice good for typing practice?",
      a: "Very. It trains quick, accurate typing under mild pressure and builds vocabulary recall. Because you must spell words correctly to clear them, it reinforces spelling far more actively than passive reading.",
    },
    {
      q: "Can kids play Spellice?",
      a: "Yes. The words are common, the controls are just typing, and there is no inappropriate content. It is a friendly way for children to practise spelling and keyboard skills while playing.",
    },
    {
      q: "Is Spellice free to play?",
      a: "Yes. It runs in the browser with no cost, no account, and no download. Open the page and start typing immediately. Your score and best record stay private on your device.",
    },
    {
      q: "Can I play Spellice on mobile?",
      a: "Yes. Tapping the input opens the on-screen keyboard, and the responsive layout fits phones and tablets. Typing on touch is fully supported, so you can play anywhere.",
    },
    {
      q: "Why did my typed word not clear?",
      a: "A word only clears when your box text exactly matches a whole falling word and you press Enter. A partial prefix highlights the word but does not destroy it. Check spelling and finish typing before hitting Enter.",
    },
    {
      q: "How do I get a high score quickly?",
      a: "Focus on the lowest, most urgent words, keep your streak alive, and don't waste time deleting. Target longer words when safe, and use pause if you need to regroup. Consistent clears beat occasional big ones.",
    },
    {
      q: "Does the game speed up over time?",
      a: "Yes. As your score climbs, words spawn more frequently and fall a little faster. This gradual ramp keeps the challenge fresh and rewards both speed and accuracy as you improve.",
    },
    {
      q: "What word list does Spellice use?",
      a: "Spellice draws from a curated list of common English words of varying lengths. The mix of short and long words keeps rounds dynamic and gives you frequent chances to bank points.",
    },
  ],
  blog: [
    {
      title: "Spellice — Complete Guide",
      excerpt:
        "Learn how to play Spellice, master its falling-word typing action, and chase your best score.",
      headings: [
        "What Is Spellice",
        "How the Game Works",
        "Scoring and Streaks",
        "Tips for New Players",
        "Why It Sharpens Typing",
      ],
      body: [
        "Spellice is a fast, browser-native typing game where words fall from the top of the screen and you must type them correctly before they hit the floor. You have three lives, and every word that lands costs one. The longer you survive, the higher your score climbs.",
        "Each round, words drop at random horizontal positions and a steady pace. Type a word into the box at the bottom; once your text matches a falling word it highlights blue, and pressing Enter shatters it. Miss too many and the game ends. The spawn rate and speed ramp up the longer you last.",
        "Scoring rewards both length and consistency. Longer words are worth more points per letter, and clearing words back-to-back builds a streak multiplier. Your best total is saved locally, giving you a record to beat on every replay.",
        "New players improve fast by clearing the lowest word first, since it is the one about to cost a life. Keep your keyboard focused, don't waste time deleting, and value longer words when you have a moment. Use pause if you need to reset your concentration.",
        "Because success depends on accurate spelling under mild pressure, Spellice is a genuine typing trainer. Regular play builds speed, accuracy, and vocabulary recall. A few minutes a day noticeably improves both your game score and your real-world keyboard skills.",
      ],
    },
    {
      title: "Typing Under Pressure: Drills That Work",
      excerpt:
        "Simple habits that turn frantic typing into calm, accurate clearing.",
      headings: [
        "Focus on the Lowest Threat",
        "Keep the Keyboard Focused",
        "Let the Highlight Guide You",
        "Build Streaks Deliberately",
        "Use Pause as a Reset",
      ],
      body: [
        "The single best habit is to always attack the lowest falling word first. It is the one closest to costing you a life, so clearing it removes the most immediate danger. Scan bottom-up rather than left-to-right.",
        "Keep your text cursor active so you can react the instant a word appears. A lost focus means a fumble at exactly the wrong moment. Click the box once at the start and it stays ready for the whole round.",
        "Trust the blue highlight. When your typed text matches a word it lights up, confirming you are on the right track. You do not need to second-guess — once highlighted, just press Enter to shatter it.",
        "Streaks multiply your points, so treat back-to-back clears as the real goal. Avoid risky long words when a short one is about to land; bank the safe clear to keep the multiplier alive, then go for the big score when calm.",
        "When the screen gets busy, hit Pause. A two-second reset of your attention prevents the cascade of misses that ends runs. Pausing is free and keeps your best score intact, so use it whenever your focus slips.",
      ],
    },
    {
      title: "From Game to Real Typing Speed",
      excerpt:
        "How a playful word-dropper builds skills that help in school and work.",
      headings: [
        "Accuracy Before Speed",
        "Spelling Through Play",
        "Vocabulary Recall",
        "Low-Stakes Practice",
        "A Daily Five-Minute Habit",
      ],
      body: [
        "Spellice teaches the core typing truth: accuracy beats raw speed. Because wrong spelling fails to clear a word, you learn to type deliberately, and that precision carries over to essays, emails, and chats.",
        "Spelling is reinforced by doing, not memorising. Each word you successfully type cements its letter order in memory. Over weeks, commonly misspelled words stop tripping you up because you have typed them correctly dozens of times.",
        "The varied word list stretches your vocabulary recall. You must retrieve word shapes quickly under time pressure, which strengthens the mental dictionary you rely on for reading and writing alike.",
        "As a game, Spellice offers low-stakes practice. There is no grade and no audience, so mistakes feel safe. That relaxed context is exactly where the brain learns fastest, turning drill into play.",
        "Commit to five minutes a day. Short, frequent sessions build durable typing gains far better than occasional long ones. Track your best score, watch your streak lengths grow, and you will soon notice the speed everywhere you type.",
      ],
    },
  ],
};
