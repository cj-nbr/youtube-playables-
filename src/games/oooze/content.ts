import type { GameContent } from "../../../shared/types";

export const content: GameContent = {
  guide: [
    {
      heading: "Objective",
      body: "You are a small blob in a busy arena. Drift over tiny food particles to grow, and engulf any enemy cell that is smaller than you. Avoid the bigger cells — if one touches you, it swallows you whole. Grow large enough to dominate the arena to win.",
    },
    {
      heading: "How to play",
      body: "Move your blob by pointing with the mouse or dragging on touch; it always drifts toward your cursor. Roll over dots to gain mass and over smaller enemy cells to absorb them. Steer clear of any cell larger than yours. Your size is shown in the status bar.",
    },
    {
      heading: "Strategy",
      body: "Hunt the small and flee the large. Early on, graze food to build a safe size, then pick off enemy cells just below you. Never chase a cell that is even slightly bigger — one touch ends the run. Use the arena edges to corner smaller prey.",
    },
    {
      heading: "Example",
      body: "If a red cell is smaller than you, ram it to absorb its mass and jump in size. If a blue cell is larger, peel away early and circle back once you have eaten enough food to outweigh it. Reaching the target size means you have dominated the field.",
    },
  ],
  instructions: {
    objective:
      "Grow your blob by absorbing smaller particles and cells, avoid larger ones, and reach the target size to dominate the arena.",
    desktop:
      "Move your blob by moving the mouse — it drifts toward the cursor. Roll over food dots to grow and over smaller enemy cells to absorb them. Keep away from any cell larger than you, and reach the target size to win.",
    mobile:
      "Touch and drag anywhere to steer your blob toward your finger; it follows your touch. Absorb food and smaller cells, dodge larger ones, and reach the target size. Fully touch-friendly.",
    winning:
      "You win the moment your blob reaches the target size, proving you have dominated the arena. Your score is based on your final mass and enemies absorbed.",
    losing:
      "You lose the instant a larger enemy cell touches you — it engulfs your blob and ends the run. There is no health bar; size is the only defense, so never let a bigger cell catch you.",
    tips: [
      "Graze food early to build a safe size before hunting.",
      "Only chase cells clearly smaller than you.",
      "Flee larger cells the moment you spot them.",
      "Use the arena edges to trap smaller prey.",
      "Bigger blobs move slower — use agility when small.",
      "Keep moving; a stationary blob is easy prey.",
    ],
  },
  faqs: [
    {
      q: "How do you play Oooze?",
      a: "You control a blob that drifts toward your cursor or finger. Roll over food particles to grow and over enemy cells smaller than you to absorb them. Avoid any cell larger than yours. Reach the target size to win.",
    },
    {
      q: "What are the rules of Oooze?",
      a: "Move continuously toward your pointer. Eating food and smaller cells increases your size; touching a larger cell ends the run. The game ends in a win when you hit the target size or a loss when a bigger cell swallows you.",
    },
    {
      q: "How do I make my blob grow?",
      a: "Absorb the small food dots scattered around the arena for steady growth, and engulf enemy cells that are smaller than you for a big mass boost. The more you eat, the larger and more dominant you become.",
    },
    {
      q: "What happens if a bigger cell touches me?",
      a: "You are swallowed and the run ends immediately. There is no health or respawn — size is your only protection, so always keep a safe distance from cells larger than your own.",
    },
    {
      q: "How is Oooze scored?",
      a: "Your score reflects your final mass and the number of enemy cells you absorbed. Your best score is saved locally in your browser so you can try to beat it on the next run.",
    },
    {
      q: "What is the target size to win?",
      a: "There is a target mass shown when you play; once your blob reaches it, you have dominated the arena and win. It is several times your starting size, so you must eat steadily to get there.",
    },
    {
      q: "Do bigger blobs move slower?",
      a: "Yes. Like the genre it draws from, larger blobs are heavier and drift more slowly. This trades raw size for agility, so small blobs can outmaneuver large ones until they, too, grow.",
    },
    {
      q: "Can I play Oooze on mobile?",
      a: "Yes. Touch and drag anywhere on the arena to steer your blob toward your finger. The controls mirror the desktop version; just drag instead of moving a mouse.",
    },
    {
      q: "Is Oooze timed?",
      a: "No, there is no countdown clock. The pressure comes from the other cells hunting you, not from time. You can take a breath and plan your next move as you drift.",
    },
    {
      q: "What is the best strategy for Oooze?",
      a: "Graze food to build a safe size, then pick off enemy cells just below you while avoiding larger ones. Use edges to corner prey and never chase a cell that is even slightly bigger than you.",
    },
    {
      q: "How do enemy cells behave?",
      a: "Enemy cells wander on their own. Smaller ones tend to drift, while larger ones may chase you if you are smaller and flee if you are bigger. Reading their movement helps you hunt safely.",
    },
    {
      q: "Is Oooze good for kids?",
      a: "Yes, in a gentle way. There is no violence or scary content — cells simply merge. It teaches spatial awareness and risk assessment. Younger kids may need a moment to learn to avoid bigger cells.",
    },
    {
      q: "Does my best score save between sessions?",
      a: "Yes. Your best mass score is stored locally in your browser, so it persists when you return. Clearing browser data or switching devices resets it, since the score lives on your device.",
    },
    {
      q: "Is there a pause feature in Oooze?",
      a: "Yes. Use the Pause button to freeze the arena and plan your next drift, then Resume. Pausing is useful when a larger cell is closing in and you want a calm moment to decide.",
    },
    {
      q: "What skills does Oooze improve?",
      a: "It sharpens hand-eye coordination, spatial judgment, and quick risk assessment under pressure. Short sessions make a fun, low-stress reaction exercise.",
    },
    {
      q: "Is Oooze free to play?",
      a: "Yes. It runs in your browser with no cost, no account, and no download. Open the page and start absorbing immediately. Your best score stays private on your device.",
    },
  ],
  blog: [
    {
      title: "The Complete Oooze Guide",
      excerpt:
        "Learn to grow your blob, absorb smaller cells, and dominate the arena without getting eaten.",
      headings: [
        "What Is Oooze",
        "Core Rules and Movement",
        "Eating and Growing",
        "Scoring and Winning",
        "Getting Better Over Time",
      ],
      body: [
        "Oooze is a bio-style arena game. You are a soft blob drifting through a field of food and rival cells. Your only goal is to grow by absorbing anything smaller than you while avoiding anything larger. Reach the target size and you dominate.",
        "Movement is simple but constant. Your blob always drifts toward your cursor or finger, so you steer by pointing where you want to go. There is no stop button — you are always in motion, which keeps the arena lively and the threats real.",
        "Growth comes from eating. Tiny food dots give small, steady mass, while engulfing a smaller enemy cell gives a big jump. The key rule is size comparison: if your radius exceeds theirs, you win the collision; if theirs exceeds yours, you are swallowed.",
        "Scoring rewards both survival and appetite. Your final mass and the enemies you absorbed combine into a score, and your best is saved locally. Winning by reaching the target size is the ultimate proof of dominance and earns the highest result.",
        "Improvement is about patience and reading the field. New players lunge at any cell; veterans graze food first, then pick off prey just below them and flee the rest. With practice you learn to use edges, momentum, and size gaps to stay alive and grow fast.",
      ],
    },
    {
      title: "Beginner Strategies for Oooze",
      excerpt:
        "Simple survival habits that help new blobs grow without getting swallowed.",
      headings: [
        "Graze Before You Hunt",
        "Only Chase the Smaller",
        "Flee Early, Not Late",
        "Use the Edges",
        "Keep Moving",
      ],
      body: [
        "New blobs die by attacking the first cell they see. Instead, spend your opening moments rolling over food dots. Building a modest size buffer makes you safe to challenge the smallest enemies and less likely to be an easy snack.",
        "Only chase cells that are clearly smaller than you. If there is any doubt about size, assume the cell is dangerous and avoid it. A single touch from a bigger cell ends everything, so the risk is never worth a marginal meal.",
        "When a larger cell appears, peel away immediately. Waiting until it is close forces a panicked turn that bigger, slower blobs can still cut off. Early, calm evasion keeps you alive far longer than brave last-second dodges.",
        "The arena edges are your friend. Smaller prey often gets pinned against a wall where you can absorb it safely, and a wall at your back limits the angles a larger hunter can use to reach you.",
        "Never sit still. A stationary blob is the easiest target in the arena, and drifting lets you react to threats the moment they appear. Keep a gentle motion even when no enemy is near.",
      ],
    },
    {
      title: "Advanced Tactics and Common Mistakes in Oooze",
      excerpt:
        "Dominate the arena and avoid the errors that end long, promising runs.",
      headings: [
        "Reading Cell Behavior",
        "The Size-Gap Trap",
        "Common Mistakes to Avoid",
        "Momentum and Agility",
        "Chasing a New Best",
      ],
      body: [
        "Experienced players read rival behavior. Larger cells often drift toward smaller prey, including you, while smaller ones scatter. Use that to predict where a hunter will go and either avoid its path or set up an ambush on a cornered smaller cell.",
        "Beware the size-gap trap: a cell only slightly smaller than you is tempting but dangerous, because a near-equal collision is ambiguous and a moment of growth on its side flips the advantage. Absorb cells you clearly outweigh and ignore the close calls.",
        "Even confident players die by overcommitting to a chase. The fix is discipline: if your target starts growing or a bigger cell enters the area, abandon the hunt instantly. One swallowed cell is a small loss; a bigger predator is total game over.",
        "Momentum matters because bigger blobs move slower. When you are small, use your agility to weave around large cells and snatch food they cannot reach. As you grow, plan turns earlier since your heavier blob cannot change direction quickly.",
        "Chasing a new best rewards controlled aggression. Once you know your record, balance safe grazing with calculated hunts on clearly smaller cells. A long, steady growth curve beats a flashy early kill that ends in a predator's mouth.",
      ],
    },
  ],
};
