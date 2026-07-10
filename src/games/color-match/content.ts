import type { GameContent } from "../../../shared/types";

export const content: GameContent = {
  guide: [
    {
      heading: "Goal",
      body: "Match the target color as closely as possible within the time limit. A target swatch is shown at the top; reproduce it in your mixing area to earn accuracy points.",
    },
    {
      heading: "How to play",
      body: "A target color appears at the top of the screen. Use the R, G, and B sliders to rebuild that color in the 'your mix' swatch. Click Submit when you think it matches, or Skip to move on.",
    },
    {
      heading: "Strategy",
      body: "Start with the dominant channel (the value furthest from the others), then fine-tune the rest. Small adjustments matter because the score uses Euclidean distance in RGB space, so tiny errors cost points.",
    },
    {
      heading: "Example",
      body: "Target is #8A4FFF (R=138, G=79, B=255). Set the sliders near those values, submit within 3 seconds for the time bonus, and an exact match earns the full 1000 points.",
    },
  ],

  instructions: {
    objective:
      "Reproduce the target color in your mixing area as accurately as possible across 10 rounds, maximizing your cumulative score from accuracy and speed bonuses.",
    desktop:
      "A target swatch appears at the top. Below it, drag the R, G, and B sliders (0-255 each) to mix your own color in the 'your mix' panel. Watch the live hex readout and the swatch preview. When ready, click Submit to lock in your guess, or click Skip to abandon the round. Each round lasts 30 seconds.",
    mobile:
      "Tap and drag the R, G, and B sliders to adjust your mix. The target and your mix swatches stay side by side so you can compare on a small screen. Tap Submit to confirm your color or tap Skip to pass. The timer counts down from 30 seconds at the top.",
    winning:
      "There is no single win or loss screen — your goal is the highest cumulative score after 10 rounds. The closer each match and the faster each submit, the better your final total.",
    losing:
      "A round ends when the 30-second timer hits 0 (auto-submitting your current mix) or when you click Submit or Skip. You cannot replay a finished round, so play each one deliberately.",
    tips: [
      "Identify the dominant channel first — the value that is highest or furthest from the others — and rough it in before touching the smaller channels.",
      "Use the live hex readout to compare your mix against the target's hex value; matching digits one channel at a time is the fastest path to accuracy.",
      "Watch the timer closely: submitting within the first few seconds grants a time bonus, so once you are close, commit early.",
      "Small slider nudges matter. Because scoring uses Euclidean RGB distance, shaving a few units off the error is worth real points.",
      "If a color looks impossible to nail, hit Skip — a skipped round costs less than a wildly off guess and keeps your average high.",
      "Train your eye by memorizing common hex pairs; over many rounds you will learn to estimate R, G, and B values quickly without pixel-peeping the readout.",
    ],
  },

  faqs: [
    {
      q: "How do you play Color Match?",
      a: "A target color appears at the top. Drag the R, G, and B sliders to rebuild it in your mix panel, then click Submit. You get 30 seconds per round across 10 rounds, aiming for the highest total score.",
    },
    {
      q: "What do R, G, and B mean?",
      a: "They are the red, green, and blue channels of a digital color, each ranging from 0 to 255. Combining them in different amounts produces every color your screen can display, including the target swatch.",
    },
    {
      q: "How does scoring work?",
      a: "Your score per round is based on color accuracy — the smaller the Euclidean RGB distance between your mix and the target, the higher the points — plus a time bonus for submitting quickly.",
    },
    {
      q: "How do I get 1000 points?",
      a: "A perfect, exact match submitted fast awards the maximum 1000 points for that round. Match all three channels exactly and submit within the time-bonus window to hit the cap.",
    },
    {
      q: "What is the time bonus?",
      a: "Submitting earlier in the 30-second round earns extra points on top of your accuracy score. The faster you lock in an accurate color, the larger the speed bonus you collect.",
    },
    {
      q: "What does the Skip button do?",
      a: "Skip ends the current round without scoring a guess from your mix, letting you move to the next target. It is useful when a color is too hard to match before the timer runs out.",
    },
    {
      q: "How many rounds are there?",
      a: "There are 10 rounds in a full game. Each round shows a new target color and gives you 30 seconds to match it, so a complete session is fast but mentally engaging.",
    },
    {
      q: "Is Color Match accessible for color blindness?",
      a: "Yes — the game provides numeric RGB and hex readouts alongside the swatches, so players who cannot distinguish certain hues can still match by the exact values rather than by sight.",
    },
    {
      q: "What is the best strategy?",
      a: "Lead with the dominant channel, match the hex digits channel by channel using the readout, then submit quickly for the time bonus. Small, precise adjustments beat large sweeping guesses.",
    },
    {
      q: "What is the difference between hex and RGB?",
      a: "Hex is just RGB written as a six-digit base-16 code, like #8A4FFF for R=138, G=79, B=255. They describe the same color; hex is compact, RGB is easier to read and adjust per channel.",
    },
    {
      q: "Why do small changes matter so much?",
      a: "Scoring uses Euclidean distance across three channels, so a tiny offset in one or more channels still reduces accuracy points. Nudging sliders by single units can recover meaningful score.",
    },
    {
      q: "Can I play Color Match on mobile?",
      a: "Yes. The layout stacks the target and your mix swatches and uses touch-friendly sliders. Tap and drag to adjust, then tap Submit or Skip. The 30-second timer works the same as on desktop.",
    },
    {
      q: "Is there a difficulty setting?",
      a: "Difficulty comes from the variety of target colors and the tight 30-second timer rather than selectable levels. Some hues are easier to estimate than others, keeping every round fresh.",
    },
    {
      q: "Are there similar puzzle games?",
      a: "Color Match belongs to the quick perceptual-puzzle family alongside memory, spot-the-difference, and reaction games. It uniquely blends visual estimation with numeric color reasoning.",
    },
    {
      q: "What educational value does it have?",
      a: "It teaches the RGB color model, hex notation, and how additive color mixing works. Players build intuition for how channel values combine into the colors they see every day on screens.",
    },
    {
      q: "Does the timer auto-submit my mix?",
      a: "Yes. If the 30-second timer reaches zero, the round ends and your current mix is scored automatically. Submitting or skipping early ends the round on your terms instead.",
    },
    {
      q: "Can I see my running total score?",
      a: "Your cumulative score updates as you finish each round, so you can track progress toward your best total across the 10 rounds and compare against previous sessions.",
    },
    {
      q: "Why is my mix preview helpful?",
      a: "The live preview swatch and hex readout update with every slider move, giving immediate feedback so you can converge on the target color before committing with Submit.",
    },
  ],

  blog: [
    {
      title: "Color Match — Complete Guide",
      excerpt:
        "Everything you need to master Color Match: rules, scoring math, time bonuses, and the strategies top players use to hit 1000 points per round.",
      headings: [
        "How Color Match works",
        "Understanding the scoring system",
        "Mastering the time bonus",
        "Core strategies for high scores",
        "Common mistakes to avoid",
      ],
      body: [
        "Color Match is a fast, satisfying puzzle where you reproduce a target color using three sliders for red, green, and blue. A target swatch sits at the top, and your mixing area below updates live as you drag the controls. Each of the 10 rounds gives you 30 seconds to get as close as possible before submitting.",
        "Scoring combines two factors. Accuracy is measured by the Euclidean distance between your mixed RGB values and the target's RGB values — the smaller the gap across all three channels, the more points you earn. A perfect match is worth the full accuracy reward, which tops out near 1000 points for an exact submission.",
        "Speed is the second pillar. Submitting early in the round grants a time bonus layered on top of your accuracy. Because the timer is short, learning to estimate channel values quickly is the difference between a good run and a great one. Aim to be accurate and fast rather than accurate and slow.",
        "The strongest strategy is to lock in the dominant channel first. Find the value that stands out from the others, nudge it close, then balance the remaining two. Use the hex readout to check digits channel by channel instead of relying only on your eyes, which can be fooled by adjacent hues.",
        "Avoid the classic errors: over-correcting with big slider jumps, ignoring the timer until it is too late, and chasing perfection on an especially tricky color. When a target feels unreachable, Skip to protect your average. Small, deliberate adjustments and early submissions will push your cumulative score to the top.",
      ],
    },
    {
      title: "Beginner's Guide to Mixing Colors",
      excerpt:
        "New to Color Match? Learn the RGB color model from scratch, read hex codes with confidence, and make your first accurate matches in minutes.",
      headings: [
        "The RGB color model explained",
        "Reading hex codes made simple",
        "Your first few matches",
        "Building color intuition",
      ],
      body: [
        "Every color on your screen is built from three lights — red, green, and blue — mixed in different amounts. Each channel runs from 0 (off) to 255 (fully on). Set all three to 255 and you get white; set them all to 0 and you get black. Color Match simply asks you to reverse-engineer that mix.",
        "Hex codes are a shorthand for those three numbers. The six characters after the # are two digits each for red, green, and blue in base 16. So #8A4FFF means red 8A, green 4F, blue FF. Once you can read these pairs, matching becomes a numbers game instead of a guessing game.",
        "Start by glancing at the target and picking the channel that looks strongest, then drag that slider most of the way there. Fine-tune the other two while watching the live preview swatch. Don't rush the first rounds — accuracy matters more than speed until you build confidence.",
        "With practice, your eye learns to estimate values quickly. Play a few sessions and you will start recognizing that a purplish blue means low green, or that a warm orange means high red and green with low blue. That intuition is what turns beginners into high scorers.",
      ],
    },
    {
      title: "Advanced Color Theory & Strategy",
      excerpt:
        "Go beyond guessing. Apply real color theory, channel priority, and timer management to consistently reach near-perfect matches in Color Match.",
      headings: [
        "Channel priority and perceptual weighting",
        "Subtracting to find the gap",
        "Timer management for maximum bonus",
        "Training your eye like a pro",
        "When to skip versus guess",
      ],
      body: [
        "Advanced play starts with channel priority. Human vision is less sensitive to small blue shifts than to red and green, so a few units of blue error hurts your score less than the same error in red. Spend your precision budget where the eyes — and the scoring — care most.",
        "A powerful technique is subtraction. Read the target hex, read your mix hex, and compute the gap per channel. Close the largest gap first, then the next. Because scoring is Euclidean, the biggest channel error dominates the penalty, so attacking it early pays off fastest.",
        "Timer management is the other lever. The time bonus decays as the clock runs, so once you are within a few units on every channel, submit. Chasing the last single digit often costs more in lost bonus than it gains in accuracy — know when close enough is optimal.",
        "Train by deliberately memorizing anchor colors: pure primaries, secondaries, and a handful of grays. When a target is near a known anchor, you can snap to it instantly and adjust. Over time these anchors let you estimate any color within a handful of units at a glance.",
        "Finally, learn the skip economy. A skipped round scores zero, but a wildly wrong guess can drag your average down just as much with no time saved. If the timer is under ten seconds and you are still far off, Skip and preserve your momentum into the next round.",
      ],
    },
  ],
};
