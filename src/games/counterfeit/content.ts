import type { GameContent } from "../../../shared/types";

export const content: GameContent = {
  guide: [
    {
      heading: "Goal",
      body: "Identify the single counterfeit banknote among a row of genuine bills. Each round shows bills that look almost identical, but the fake differs by one tiny detail such as watermark, serial number, texture, or color tint. Scan carefully and click the fake before time runs out.",
    },
    {
      heading: "How to play",
      body: "A set of banknotes appears on screen. Hover or tap each bill to inspect it closely. Look for mismatched watermarks, wrong serial patterns, blurred portraits, or ink smudges. Click the counterfeit to score points. A wrong click costs a life. Clear enough rounds to unlock higher denominations and tougher fakes.",
    },
    {
      heading: "Strategy",
      body: "Scan from left to right systematically so you do not skip a bill. Focus on security features that are easiest to compare: watermark brightness, serial number font, and portrait alignment. As difficulty rises, fakes hide their differences in smaller details like microprinting or UV-reactive ink.",
    },
    {
      heading: "Example",
      body: "A $20 bill with a slightly darker green tint or a watermark portrait with blurred eyes is likely counterfeit. A genuine bill always has consistent ink density, crisp edges, and a centered serial number. When two bills look identical, click neither and recheck before guessing.",
    },
  ],
  instructions: {
    objective:
      "Spot the fake banknote among real ones using visual inspection. Click the counterfeit to score points and advance.",
    desktop:
      "Hover over each banknote to zoom in slightly. Click the one you believe is counterfeit. The cursor changes to a magnifying glass for better detail. Keyboard shortcuts let you select bills by number for faster rounds.",
    mobile:
      "Tap a banknote to inspect it closely. Tap again to mark it as fake. The interface is designed for thumbs, so bills are large enough to tap accurately. Swipe between rounds to keep momentum.",
    winning:
      "You win each round by correctly identifying the fake. Survive enough rounds to increase the denomination level and reach the highest bank tier. Your score is saved as a best streak.",
    losing:
      "You lose a life for every wrong click. When all lives are gone, the game ends and shows your final score and the round where the streak broke.",
    tips: [
      "Check the watermark first; it is the fastest way to spot a fake.",
      "Compare serial numbers side by side; fakes often use a different font.",
      "Watch ink density. Counterfeits tend to look slightly faded or uneven.",
      "Do not rush. A wrong guess costs more than an extra second of looking.",
      "Use the zoom feature to examine microprinting if it is available.",
      "Trust your instinct if two bills look identical; the odd detail is usually subtle but present.",
    ],
  },
  faqs: [
    {
      q: "How do you play Counterfeit?",
      a: "A row of banknotes appears. Inspect each bill and click the one that is counterfeit. Correct clicks score points; wrong clicks cost a life. Survive as many rounds as possible.",
    },
    {
      q: "What visual clues indicate a counterfeit?",
      a: "Common clues include mismatched watermarks, blurry portraits, off-center serial numbers, inconsistent ink density, and missing microprinting. The game teaches these differences gradually as difficulty increases.",
    },
    {
      q: "Is Counterfeit based on real money security features?",
      a: "Yes. The fakes are designed around real-world counterfeiting mistakes, so the visual skills you practice transfer to general money awareness. No actual currency images are used.",
    },
    {
      q: "Does the game get harder over time?",
      a: "Yes. Early rounds use obvious differences. Later rounds make the fake harder to spot by shrinking the detail or adding more bills to compare. Higher denominations unlock advanced security feature checks.",
    },
    {
      q: "Can I play Counterfeit on mobile?",
      a: "Yes. Bills are sized for touch inspection, and tapping twice selects and confirms a choice. The layout fits any screen size without horizontal scrolling.",
    },
    {
      q: "What happens when I guess wrong?",
      a: "You lose one life. The counterfeit is highlighted so you can learn from the mistake. Three wrong guesses end the game and show your final score.",
    },
    {
      q: "Is there a high score in Counterfeit?",
      a: "Yes. Your best streak of consecutive correct identifications is saved locally. Try to beat your record each session.",
    },
    {
      q: "Are the banknotes real currency images?",
      a: "No. The bills are stylized representations meant to teach visual discrimination without reproducing actual currency. They show generic portraits, patterns, and serial formats.",
    },
    {
      q: "What skills does Counterfeit train?",
      a: "It trains attention to detail, visual scanning, pattern recognition, and impulse control. Players learn to spot inconsistencies quickly, a skill useful in everyday life.",
    },
    {
      q: "Can kids play Counterfeit?",
      a: "Yes. The game has no violent or financial themes beyond basic visual comparison. It is suitable for ages eight and up and works well as a classroom attention exercise.",
    },
    {
      q: "Why do some fakes look almost identical?",
      a: "Real counterfeiters rely on tricking the eye with near-perfect copies. The game mirrors this by making later fakes almost identical to genuine bills, forcing you to rely on trained observation rather than guesswork.",
    },
    {
      q: "Are there sound effects in Counterfeit?",
      a: "Yes. Click sounds, success chimes, and error buzzes accompany every action. Sound is optional and can be toggled from the game controls.",
    },
    {
      q: "Can I pause Counterfeit?",
      a: "Yes. The Pause button freezes the timer and hides the bills. Resume when you are ready to continue inspecting. Pausing does not affect your score.",
    },
    {
      q: "What are the game modes in Counterfeit?",
      a: "The main mode is an endless cascade of rounds with increasing difficulty. A daily challenge mode offers a curated set of tricky bills for players who want a consistent test.",
    },
    {
      q: "Is Counterfeit free to play?",
      a: "Yes. It runs in the browser with no downloads, no accounts, and no cost. Open the page and start spotting fakes immediately.",
    },
  ],
  blog: [
    {
      title: "How to Spot a Counterfeit Like a Pro",
      excerpt:
        "Learn the visual inspection skills that turn casual players into expert counterfeit detectors.",
      headings: [
        "Check the Watermark",
        "Inspect the Serial Number",
        "Feel the Texture in Your Mind",
        "Look for Microprinting",
        "Practice With Games",
      ],
      body: [
        "The watermark is the fastest security feature to check. Hold the bill up to light or use the in-game zoom to see whether the portrait inside the watermark matches the main portrait and whether it is sharp or blurred. Counterfeit watermarks often look dark, pale, or out of alignment.",
        "Serial numbers on genuine bills use a unique font and consistent spacing. Counterfeits frequently use a slightly different font or uneven spacing. Compare two bills side by side and focus on the first two letters and the number shape.",
        "Real currency uses special ink that feels slightly raised or textured. In the game, this is represented by crisp edges and even shading. Blurry ink or smudged borders are warning signs that the bill was printed on ordinary paper.",
        "Microprinting appears as tiny text on important parts of the bill. Counterfeits often skip this detail or use ordinary ink that blurs when zoomed. Train your eyes to look for tiny repeated words near the borders and portraits.",
        "Browser games like Counterfeit let you practice these observations without financial risk. Repetition builds pattern recognition, so after a few rounds you will naturally start noticing the smallest inconsistencies.",
      ],
    },
    {
      title: "Why Attention to Detail Matters",
      excerpt:
        "Training your eye to spot tiny differences has benefits far beyond counterfeit detection.",
      headings: [
        "Pattern Recognition",
        "Critical Thinking",
        "Everyday Applications",
        "Memory and Focus",
        "Fun With Purpose",
      ],
      body: [
        "Attention to detail is a core component of pattern recognition. When you regularly compare complex images and hunt for discrepancies, your brain becomes better at spotting anomalies in all kinds of data, from spreadsheets to artwork.",
        "Counterfeit detection also builds critical thinking. Instead of accepting first impressions, you learn to question them and seek evidence. That habit of pausing and verifying is valuable in academic, professional, and personal decision-making.",
        "The same skills used in this game apply to reading contracts, identifying phishing emails, spotting errors in code, and even noticing when a friend is upset. Training observation makes you more aware of your surroundings.",
        "Focused visual tasks improve sustained attention. In a world full of distractions, practicing deep focus for thirty seconds at a time can strengthen your ability to concentrate on longer tasks such as studying or writing.",
        "Most importantly, learning should be fun. Counterfeit turns a serious skill into a lighthearted game, which means you are more likely to practice regularly and improve without feeling like you are working.",
      ],
    },
    {
      title: "The History of Counterfeit Detection",
      excerpt:
        "From watermarks to digital security threads, trace how nations fought forgery through design.",
      headings: [
        "Early Paper Money",
        "Watermarks and Security Threads",
        "Holograms and Color-Shifting Ink",
        "Digital Era Defenses",
        "Why Training Matters",
      ],
      body: [
        "Paper money emerged in China during the Tang dynasty, but early banknotes were easy to forge because they relied mainly on paper quality. Forgery was so common that some banks issued detailed engraved certificates to prove authenticity.",
        "In the 19th century, governments added watermarks to paper so that holding a bill up to light would reveal a hidden portrait. This simple invention dramatically reduced forgery and remains a primary visual check today.",
        "Modern banknotes layer multiple defenses: holograms, color-shifting ink, raised printing, microprinting, and UV-reactive features. The more layers present, the harder the bill is to copy convincingly.",
        "Today, digital payment methods reduce cash use, but the need for observation skills remains. Understanding how fakes work helps you evaluate digital content such as images, videos, and messages, where manipulation is increasingly common.",
        "Training with games like Counterfeit keeps your observation sharp. Whether you are checking a photo source or comparing product listings, the habit of looking for small differences is a powerful tool.",
      ],
    },
  ],
};
