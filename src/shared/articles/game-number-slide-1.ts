import type { BlogPost } from "../blog-types";

export const posts: BlogPost[] = [
  {
    slug: "number-slide-complete-beginner-guide",
    title: "Number Slide Complete Beginner Guide: How to Play the 15-Puzzle Without the Frustration",
    description:
      "A complete beginner guide to Number Slide, the classic 15-puzzle. Learn the rules, the board, the one move that matters, and a calm first-session plan that works.",
    date: "2026-07-13",
    updatedAt: "2026-07-13",
    category: "Brain & Logic",
    tags: [
      "how to play number slide",
      "15 puzzle for beginners",
      "number slide rules",
      "sliding puzzle tutorial",
      "classic browser puzzle game",
      "logic puzzle getting started",
      "number slide tips",
    ],
    authorId: "mira",
    cover: "/images/games/number-slide/cover.webp",
    primaryKeyword: "how to play number slide",
    secondaryKeywords: [
      "15 puzzle rules explained",
      "number slide beginner tutorial",
      "sliding tile puzzle how to play",
      "number slide first session",
    ],
    lsiKeywords: [
      "sliding puzzle",
      "tile arrangement",
      "blank space",
      "goal state",
      "solvability",
      "logic game",
      "grid puzzle",
    ],
    gameId: "number-slide",
    excerpt:
      "New to Number Slide? This beginner guide walks through the board, the single rule that matters, the most common beginner mistakes, and a first-session plan that keeps the puzzle calm instead of maddening.",
    content: `
<h2>Why Number Slide Still Has A Hold On People</h2>
<p>There is a reason the sliding number puzzle has outlasted almost every fad that came after it. It is quiet. It asks nothing of you but patience and a little planning, and it fits in the gap between two meetings or the last five minutes before sleep. You open <a href="/number-slide">Number Slide</a>, the tiles are scrambled, and a small part of your brain immediately wants them ordered. That itch is the whole game, and it is a clean one.</p>
<p>This guide is for the person who has never solved one on purpose. Maybe you tapped at it as a kid and gave up. Maybe you just found it on this site and want to know what you are looking at. Either way, the goal here is simple: by the end you should be able to sit down with a scrambled board and know exactly what to do first, what to avoid, and how to finish without the panic that sends most beginners into random sliding.</p>
<p>We will keep the theory light and the practice heavy. The 15-puzzle is one of those things that looks like it needs math and mostly needs attention. A few minutes of the right explanation saves an hour of the wrong kind of trying.</p>

<h2>What Number Slide Actually Is</h2>
<p>Number Slide is a sliding tile puzzle built on a four-by-four grid that holds fifteen numbered tiles and one empty square. The tiles are out of order. Your job is to slide them around using the empty square until the numbers read 1 through 15 in rows from top left to bottom right, with the blank sitting in the corner where it belongs. The version you meet online is almost always the classic 4x4, but the idea scales down to 3x3 and up to larger boards.</p>
<p>The puzzle has a real history. The 15-puzzle, as this layout is called, swept through the United States in the late 1870s as a physical wooden toy, and it has been reused in one form or another ever since, from plastic pocket versions to the one now sitting in your browser. The mechanics have not changed because they did not need to. A grid, fifteen numbers, one gap, one goal.</p>
<p>If you have played other logic games, the closest relatives are the ones that reward placement over speed. <a href="/sudoku">Sudoku</a> trains you to see where a number must go. <a href="/jigsaw">Jigsaw</a> trains you to fit pieces by shape and region. Number Slide sits between them: it is placement, but the placement is physical and the space you move into is always the empty one.</p>

<h2>The Board And The Blank Square</h2>
<p>Before any move, get comfortable with the board. There are sixteen cells. Fifteen hold tiles numbered 1 to 15. One cell is empty, and that empty cell is the only thing that moves. Every slide is a tile stepping sideways or up or down into the blank, which then takes the tile's old place. Nothing is lifted, swapped, or teleported. The blank is the hand that rearranges everything, and learning to drive the blank is the entire skill.</p>
<p>Beginners tend to watch the numbers. Better players watch the gap. When you think in terms of where the empty square needs to go next, the puzzle stops feeling like chaos and starts feeling like a path you are carving. We will come back to this, because it is the single habit that separates someone who finishes from someone who flails.</p>

<h2>The One Rule That Matters</h2>
<p>Here is the whole rule set, and there is only one rule that is not obvious: you may move any tile that sits directly next to the blank, and only by sliding it into the blank. That is it. A tile two squares away cannot jump. A tile on the far side of the board cannot be pulled toward you. Only the four neighbors of the empty square are ever available, and only one of them moves at a time.</p>
<p>Everything else people tell you about the puzzle, patterns, sequences, corners first, is strategy built on top of that one rule. Internalize the rule and the strategies become obvious instead of mysterious. Forget the rule and no strategy will save you, because you will keep reaching for moves the board does not allow.</p>

<h2>Puzzle Sizes At A Glance</h2>
<p>Not every Number Slide is a 4x4. The size changes the feel more than you would expect, mostly because the number of possible scrambles grows fast. Here is how the common sizes compare.</p>
<table>
<thead>
<tr><th>Grid</th><th>Tiles</th><th>Feel</th><th>Good for</th></tr>
</thead>
<tr><td>3x3</td><td>8</td><td>Quick, gentle</td><td>Learning the blank-square habit</td></tr>
<tr><td>4x4</td><td>15</td><td>The classic challenge</td><td>Most players and daily practice</td></tr>
<tr><td>5x5</td><td>24</td><td>Long, patient</td><td>People who want a project</td></tr>
<tr><td>Larger</td><td>35+</td><td>Demanding</td><td>Seasoned solvers only</td></tr>
</table>
<p>If this is your first real attempt, start on the 3x3 if the game offers it, or just accept that the 4x4 will take a while. The structure you learn on a smaller board transfers directly, so do not feel you are wasting time on the easy version.</p>

<h2>Reading The Goal State</h2>
<p>The finish line is not a mystery, and saying it out loud helps. Row one reads 1, 2, 3, 4. Row two reads 5, 6, 7, 8. Row three reads 9, 10, 11, 12. Row four reads 13, 14, 15, and the blank sits in the bottom-right corner. When the board matches that exactly, you are done. Keep a clear picture of that target in your head, because every move should be measured against it, not against whatever looks tidy in the moment.</p>
<p>A useful beginner trick is to name the tile you are currently hunting. Do not think "I want to fix the board." Think "I want tile 1 in the top-left corner, and then I will worry about tile 2." Small, named goals beat a vague wish to be finished, and they keep you from sliding the same tile back and forth.</p>

<figure>
<img src="/images/games/number-slide/cover.webp" alt="A scrambled Number Slide board showing numbered tiles around an empty square" />
<figcaption>A scrambled 4x4 board. The empty square is the only thing that moves, and every solve begins by deciding where it should go next.</figcaption>
</figure>

<h2>Your First Five-Minute Session</h2>
<p>Open <a href="/number-slide">Number Slide</a> and resist the urge to scramble wildly. Give yourself a plan that fits the time you have. The shape of a good first session is the same whether the board is 3x3 or 4x4.</p>
<ol>
<li>Look at the goal state in your head: numbers left to right, top to bottom, blank in the corner.</li>
<li>Find tile 1. Slide the blank toward it and walk it into the top-left corner without disturbing anything already placed.</li>
<li>Do the same for tile 2, then tile 3, then tile 4, completing the top row before touching the rows below.</li>
<li>If a move would knock a placed tile out, pause and route the blank around the edge instead of through your work.</li>
<li>When the top row is locked, move to the left column the same way, then keep peeling the board from the outside in.</li>
</ol>
<p>That outside-in approach is the spine of every beginner solve. Lock the top row, then the left column, then the next row, then the next column, until only a small 2x2 or 3x2 pocket remains. It is slower than guessing, and it is the difference between finishing and staring.</p>

<h2>The Mistakes Beginners Make</h2>
<p>Most first attempts fail the same few ways, and naming them up front saves you the embarrassment of repeating them. The first is random sliding, tapping tiles hoping order appears. It never does, because every random move has a decent chance of undoing the only good thing you did. The second is disturbing finished work, sliding a tile you already placed because the blank happened to be there. The third is chasing the blank instead of driving it, reacting to where the gap is rather than sending it where it needs to be.</p>
<p>The fix for all three is the same: slow down and decide. Before each move, say where the blank should end up after this slide. If you cannot say it, do not move. A paused player beats a busy player every time on this puzzle, because the puzzle rewards foresight, not activity.</p>

<h2>How It Sits Among Other Logic Games</h2>
<p>Number Slide is not the only quiet brain game worth a daily visit, and knowing where it fits helps you pick the right one for the mood you are in. <a href="/sudoku">Sudoku</a> is pure deduction with no movement, good when you want to think in constraints. <a href="/jigsaw">Jigsaw</a> is spatial fitting without numbering, good when you want to relax into shapes. <a href="/reversi">Reversi</a> adds an opponent and turns, good when you want a contest. <a href="/lettermaze">Lettermaze</a> is about routing a path, good when you want a different kind of spatial problem.</p>
<p>What Number Slide offers that the others do not is the physical sliding constraint. You cannot place a tile anywhere you like. You can only move what touches the gap. That single limitation is what makes the puzzle feel fair and maddening at once, and it is why a solved board feels earned in a way a filled sudoku grid sometimes does not.</p>

<div class="callout">
<p>If you have tried Number Slide before and quit, the odds are you were driving the numbers instead of the blank. Next time, watch the empty square. The puzzle gets quieter the moment you do.</p>
</div>

<div class="cta-box">
<h3>Start with a calm board.</h3>
<p>Open Number Slide, lock the top row first, and feel the difference a plan makes over random sliding.</p>
<a class="btn btn-primary h-11 px-8 text-sm" href="/number-slide">Play Now</a>
</div>

<h2>A Short Word On Solvability</h2>
<p>One thing worth knowing before you bruise your knuckles: not every scramble of the 15-puzzle can be solved. The physical toy was famous in the 1880s for a version where two tiles had been swapped at the factory, leaving a puzzle with no solution that fooled thousands of people into trying. Modern digital versions like <a href="/number-slide">Number Slide</a> scramble by making legal moves from the solved state, which guarantees the board you get can always be finished. That is a relief, and it means any failure to solve is yours, not the board's.</p>
<p>The practical takeaway is that you should never blame an unsolvable puzzle here. If you cannot finish, it is a planning problem, not a broken board, and the planning is learnable.</p>

<h2>Building It Into A Habit</h2>
<p>The people who get good at this are not the ones who grind one board for an hour. They are the ones who open it for a few minutes most days. A short, regular solve trains the spatial planning part of your mind the way a few stretches train a muscle, through repetition rather than heroics. Treat the first board of the day as a warm-up, not a test, and the skill compounds.</p>
<p>If you want a light structure, alternate games so the habit does not go stale. A round of <a href="/number-slide">Number Slide</a> on Monday, a <a href="/sudoku">Sudoku</a> on Tuesday, a <a href="/jigsaw">Jigsaw</a> on Wednesday, and so on, keeps the same underlying planning muscle working without the boredom of doing one thing forever.</p>

<blockquote>
<p>The puzzle is not won by the fastest hands. It is won by the player who decides where the blank goes next and then makes the board agree.</p>
</blockquote>

<span class="tip">TIP</span>
<p>When a tile will not move where you want, stop trying to push it. Move the blank around to the other side of the tile and pull it the direction you actually need.</p>

<div class="summary-box">
<p>Summary: Number Slide is a sliding tile puzzle where only the blank square moves. Learn to drive the blank rather than chase the numbers, lock the board from the outside in, and avoid random sliding. Start small, plan each move, and build a few-minutes-most-days habit rather than a single long grind.</p>
</div>

<h2>Frequently Asked Questions</h2>
<h3>What is Number Slide?</h3>
<p>Number Slide is a sliding tile puzzle, usually a 4x4 grid holding fifteen numbered tiles and one empty square. You slide tiles into the blank until the numbers run 1 to 15 in order with the gap in the corner.</p>
<h3>How do you play the 15-puzzle?</h3>
<p>You move any tile adjacent to the empty square into that square, one at a time. By repeatedly sliding, you rearrange the tiles into numerical order from top left to bottom right.</p>
<h3>Can every Number Slide board be solved?</h3>
<p>Modern digital versions scramble by making legal moves from the solved state, so the board you are given is always solvable. Older physical toys sometimes shipped in an unsolvable state by accident.</p>
<h3>What is the easiest way to start solving?</h3>
<p>Lock the top row first, left to right, then the left column, then continue peeling the board from the outside in. Named, small goals beat a vague wish to finish.</p>
<h3>Why do beginners get stuck?</h3>
<p>They slide randomly, disturb tiles they already placed, or react to where the blank is instead of sending it where it needs to be. Slowing down and planning each move fixes most of it.</p>
<h3>Should I watch the numbers or the blank?</h3>
<p>Watch the blank. The empty square is the only thing that moves, so learning to drive it is the core skill. Thinking in terms of where the gap should go next makes the board feel ordered.</p>
<h3>Is the 3x3 version good for learning?</h3>
<p>Yes. The 3x3, eight-tile version teaches the blank-square habit with far less complexity, and the skill transfers directly to the classic 4x4 board.</p>
<h3>How is Number Slide different from Sudoku?</h3>
<p>Sudoku is pure deduction with no movement, placing numbers by constraint. Number Slide adds a physical sliding limit, so you can only move tiles that touch the empty square.</p>
<h3>How long does a 4x4 solve take?</h3>
<p>For a beginner, somewhere between five and twenty minutes depending on scramble and method. With practice, a clean solve drops well under five minutes.</p>
<h3>What other games are like Number Slide?</h3>
<p>Sudoku, jigsaw, reversi, and lettermaze all exercise planning and spatial thinking, though each uses a different mechanic. Number Slide's signature is the single moving blank square.</p>
<h3>Can I get better without grinding?</h3>
<p>Yes. A few short solves most days builds the planning skill faster than one long frustrated session, because the improvement comes from repetition, not from duration.</p>

<h2>Sources &amp; References</h2>
<ul>
<li>Wikipedia, "15 puzzle" - history and mechanics of the sliding number puzzle, including the famous unsolvable factory scramble of the 1880s.</li>
<li>Wikipedia, "Sliding puzzle" - the broader family of tile-sliding games and why the empty square defines the moves.</li>
<li>Wikipedia, "Combination puzzle" - context on puzzles solved by rearranging pieces into a goal state, including the 15-puzzle.</li>
</ul>
`,
    faqs: [
      {
        q: "What is Number Slide?",
        a: "Number Slide is a sliding tile puzzle, usually a 4x4 grid holding fifteen numbered tiles and one empty square. You slide tiles into the blank until the numbers run 1 to 15 in order with the gap in the corner.",
      },
      {
        q: "How do you play the 15-puzzle?",
        a: "You move any tile adjacent to the empty square into that square, one at a time. By repeatedly sliding, you rearrange the tiles into numerical order from top left to bottom right.",
      },
      {
        q: "Can every Number Slide board be solved?",
        a: "Modern digital versions scramble by making legal moves from the solved state, so the board you are given is always solvable. Older physical toys sometimes shipped in an unsolvable state by accident.",
      },
      {
        q: "What is the easiest way to start solving?",
        a: "Lock the top row first, left to right, then the left column, then continue peeling the board from the outside in. Named, small goals beat a vague wish to finish.",
      },
      {
        q: "Why do beginners get stuck?",
        a: "They slide randomly, disturb tiles they already placed, or react to where the blank is instead of sending it where it needs to be. Slowing down and planning each move fixes most of it.",
      },
      {
        q: "Should I watch the numbers or the blank?",
        a: "Watch the blank. The empty square is the only thing that moves, so learning to drive it is the core skill. Thinking in terms of where the gap should go next makes the board feel ordered.",
      },
      {
        q: "Is the 3x3 version good for learning?",
        a: "Yes. The 3x3, eight-tile version teaches the blank-square habit with far less complexity, and the skill transfers directly to the classic 4x4 board.",
      },
      {
        q: "How is Number Slide different from Sudoku?",
        a: "Sudoku is pure deduction with no movement, placing numbers by constraint. Number Slide adds a physical sliding limit, so you can only move tiles that touch the empty square.",
      },
      {
        q: "How long does a 4x4 solve take?",
        a: "For a beginner, somewhere between five and twenty minutes depending on scramble and method. With practice, a clean solve drops well under five minutes.",
      },
      {
        q: "What other games are like Number Slide?",
        a: "Sudoku, jigsaw, reversi, and lettermaze all exercise planning and spatial thinking, though each uses a different mechanic. Number Slide's signature is the single moving blank square.",
      },
      {
        q: "Can I get better without grinding?",
        a: "Yes. A few short solves most days builds the planning skill faster than one long frustrated session, because the improvement comes from repetition, not from duration.",
      },
    ],
  },
  {
    slug: "number-slide-how-to-solve-15-puzzle",
    title: "How to Solve the 15-Puzzle: A Row-by-Row Method That Actually Finishes the Board",
    description:
      "A clear step-by-step method for solving the 15-puzzle on Number Slide. Solve it row by row and corner by corner, with the tricks that keep placed tiles from sliding out.",
    date: "2026-07-13",
    updatedAt: "2026-07-13",
    category: "Brain & Logic",
    tags: [
      "how to solve the 15 puzzle",
      "15 puzzle step by step",
      "row by row sliding puzzle",
      "number slide solving method",
      "15 puzzle algorithm",
      "solve sliding tile puzzle",
      "number slide strategy",
    ],
    authorId: "mira",
    cover: "/images/games/number-slide/cover.webp",
    primaryKeyword: "how to solve the 15 puzzle",
    secondaryKeywords: [
      "15 puzzle row by row method",
      "step by step 15 puzzle solve",
      "number slide solve tutorial",
      "sliding puzzle solving strategy",
    ],
    lsiKeywords: [
      "top row",
      "left column",
      "corner tiles",
      "blank square routing",
      "last two rows",
      "tile placement",
      "goal configuration",
    ],
    gameId: "number-slide",
    excerpt:
      "Stuck on the 15-puzzle? This step-by-step row-by-row method shows you how to solve Number Slide without disturbing the tiles you already placed, from the first corner to the final two rows.",
    content: `
<h2>The Problem With Guessing Your Way Through</h2>
<p>If you have ever solved the 15-puzzle by accident, you know the feeling: relief, then no idea how you did it. That is the trap. A method you cannot repeat is not a method, it is luck wearing a costume. This article is the repeatable version. It is a row-by-row solve you can run on any <a href="/number-slide">Number Slide</a> board, and once you have done it three times, the shape of it stays with you.</p>
<p>The method has a boring name and a reliable result. You build the board from the top down and the left in, locking each finished strip so it cannot be disturbed, until only a small pocket remains that resolves on its own. No memorized algorithms, no parity math, just a consistent order of operations and the discipline to protect your work.</p>
<p>If you have not read the beginner guide, the one idea to carry in is this: only the blank moves. Everything below is about routing that blank where you want it without knocking your placed tiles loose.</p>

<h2>The Method In One Breath</h2>
<p>Solve row one left to right. Solve column one top to bottom. Repeat on the smaller board that remains. When you are down to the last two rows, switch to solving the last two rows together as pairs. Finish the final 2x2 or 3x2 pocket by rotating it into place. That is the whole plan. The rest of this article is just the mechanics of each step and the small tricks that keep it from falling apart.</p>

<h2>Step 1: Lock The Top Row</h2>
<p>Start with tile 1. Slide the blank next to it and walk it into the top-left corner. Tile 2 goes to its right, then 3, then 4. The trick that beginners miss is the corner. To place tile 1 in the top-left, you usually bring it down the left column and in from the left, then tuck the blank beneath or beside it and close the corner so the tile cannot slide back out. Once tile 1 is cornered, ignore that cell forever.</p>
<p>For tiles 2, 3, and 4, slide each into its slot along the top. If a tile would have to pass through an already-placed cell, route it around the bottom of the board instead. The top row is fragile until all four are in, so move the blank along the second row to shuffle tiles sideways without lifting them out of the top.</p>
<p>When 1 through 4 sit in the top row in order, the row is locked. Do not slide any of those four again for the rest of the solve unless something has gone badly wrong.</p>

<h2>Step 2: Lock The Left Column</h2>
<p>With the top row done, place tile 5 directly under tile 1, then 9 under that, then 13 in the bottom-left corner. The logic is identical to the top row, just rotated: corner tile 5 into place, then shuffle downward. Keep the blank in the columns to the right of your working area so you never drag a finished top-row tile back down.</p>
<p>This step is where people first feel the board tighten. You now have an L of solved tiles along the top and left. That L is your anchor for everything after, and protecting it is the difference between a clean solve and a restart.</p>

<h2>Step 3: Repeat On The Smaller Board</h2>
<p>Strip away the solved top row and left column in your mind. What remains is a 3x3 board in the bottom-right, and the same method applies. Solve its top row, which is row two of the full board, placing 6, 7, 8 left to right. Then solve its left column, which is column two of the full board, placing 10 then 14.</p>
<p>By now you have solved the outer ring completely. Rows one and two, columns one and two, all locked. The only unsolved tiles are the four in the bottom-right 2x2: 11, 12, 15, and the blank. This is the moment the puzzle gets honest, because the last corner behaves differently from the rest.</p>

<h2>Step 4: The Last Two Rows Together</h2>
<p>You cannot solve the bottom two rows one strip at a time the way you did the top, because there is no third row left to route the blank through. Instead you solve them as pairs. Place 11 and 12 together in the third row, then 15 into the bottom row, leaving the blank to rotate with the final tiles.</p>
<p>The standard move here is to position 11 and 12 in their target cells, then bring 15 around the bottom edge into place. The blank will usually end up in one of the two remaining cells, and the last two tiles rotate into the final configuration. If 15 resists, cycle the blank around the 2x2 pocket until the tiles fall into line. This rotation is the only part of the method that feels like turning a dial rather than laying a brick, and it is normal for it to take a few cycles.</p>

<table>
<thead>
<tr><th>Step</th><th>Tiles placed</th><th>Board left</th></tr>
</thead>
<tr><td>1. Top row</td><td>1, 2, 3, 4</td><td>Locked top edge</td></tr>
<tr><td>2. Left column</td><td>5, 9, 13</td><td>Locked L shape</td></tr>
<tr><td>3. Inner board</td><td>6, 7, 8, 10, 14</td><td>Last 2x2 pocket</td></tr>
<tr><td>4. Last rows</td><td>11, 12, 15</td><td>Solved</td></tr>
</table>
<p>The table is the method compressed. If you can glance at a scrambled board and name which step you are on, you are already solving it on purpose instead of by feel.</p>

<h2>Step 5: Rotating The Final Pocket</h2>
<p>The endgame is the 2x2 of remaining cells. With three tiles and the blank, there are only a handful of arrangements, and the blank cycling through the four cells walks the tiles through all of them. Slide the blank around the pocket until 11, 12, 15, and the gap land in the goal state. No tile leaves the pocket during this phase, so it cannot disturb your solved work.</p>
<p>If the pocket will not resolve, the cause is almost always that an earlier tile was placed one cell off. Back up one step, lift the offending tile out by routing the blank through the solved region carefully, and replace it correctly. This is rare if you locked each strip as you went, which is the entire point of the row-by-row discipline.</p>

<figure>
<img src="/images/games/number-slide/cover.webp" alt="The final two rows of a Number Slide board being solved as a rotating 2x2 pocket" />
<figcaption>The last stage is a 2x2 pocket. Cycle the blank around it until the remaining tiles rotate into the goal state. Nothing outside the pocket moves.</figcaption>
</figure>

<h2>Routing The Blank Without Breaking Things</h2>
<p>The skill underneath every step is blank routing. To move a tile without disturbing locked strips, send the blank on a detour around your solved region. The blank travels along the unsolved cells, approaches the target tile from the correct side, and pulls it into place. Thinking of the blank as a little cursor you steer, rather than as a gap you react to, is what makes the method fast.</p>
<p>A concrete example: to place tile 7 in the middle of row two, bring the blank up from below, nudge 7 left into its slot, then immediately close the corner so it cannot slide back. The closing move is the part beginners skip, and skipping it is why tiles keep escaping. Lock, then move on.</p>

<h2>Where This Method Beats Free Sliding</h2>
<p>Compared with just sliding until it looks right, the row-by-row method has one overwhelming advantage: it never loses progress. Random sliding has maybe a one-in-three chance of helping and a two-in-three chance of undoing you. The method trades that gambling for a slow, certain walk to the finish. It is less exciting and far more satisfying, because you always know you are closer than you were a minute ago.</p>
<p>It also scales. The same steps solve a 5x5 or larger board, you just repeat step three on progressively smaller inner boards. Learn it once on <a href="/number-slide">Number Slide</a> and you own it for every size the game throws at you.</p>

<h2>How It Compares To Other Solvable Puzzles</h2>
<p>The 15-puzzle is solvable by construction when scrambled legally, which puts it in good company with other deterministic logic games. <a href="/sudoku">Sudoku</a> is always solvable by deduction from a valid start. <a href="/jigsaw">Jigsaw</a> is solvable because every piece has one correct place. <a href="/reversi">Reversi</a> is different, it is a contest against an opponent rather than a fixed solution. <a href="/lettermaze">Lettermaze</a> usually has one or more valid paths you must find. Number Slide's charm is that the solution path is not unique, but the end state is, and the row-by-row method is the reliable way to reach it.</p>

<div class="callout">
<p>When a tile will not go where you want, ask which side the blank is on. You can only pull a tile toward the blank, never push it away from it. Approach from the right side and the move becomes possible.</p>
</div>

<h2>Common Failure Points</h2>
<p>Most stalled solves die at the same spots. The first is placing tile 1 but leaving the corner open, so it slides back out the moment you move on. Close every corner. The second is treating the last two rows like the first two, trying to lay row three alone and finding no room to maneuver; solve them as pairs instead. The third is panic-cycling the final pocket without checking that the earlier tiles are exactly right, which just spins the same wrong arrangement forever.</p>
<p>None of these are hard to fix once you expect them. The method is forgiving precisely because each strip is locked before you touch the next, so a mistake is local and recoverable rather than global.</p>

<blockquote>
<p>A solved strip is a promise to yourself. The moment you place a tile correctly and lock it, agree not to move it again, and the board stops fighting you.</p>
</blockquote>

<span class="tip">TIP</span>
<p>Count your locked tiles out loud as you go: four, then three more, then five more. Knowing exactly how much is solved keeps you from disturbing finished work when the board gets tight.</p>

<div class="cta-box">
<h3>Put the method to work.</h3>
<p>Open Number Slide and solve it row by row, locking each strip before the next. The first clean solve is the one that makes the method yours.</p>
<a class="btn btn-primary h-11 px-8 text-sm" href="/number-slide">Play Now</a>
</div>

<div class="summary-box">
<p>Summary: Solve the 15-puzzle by locking the top row, then the left column, then repeating on the inner board, then solving the last two rows as pairs, then rotating the final 2x2 pocket. Route the blank around solved strips, close every corner, and never move a locked tile. The method scales to any board size.</p>
</div>

<h2>Frequently Asked Questions</h2>
<h3>What is the easiest method to solve the 15-puzzle?</h3>
<p>The row-by-row method: lock the top row left to right, then the left column top to bottom, repeat on the smaller inner board, solve the last two rows as pairs, and rotate the final 2x2 pocket into place.</p>
<h3>Why solve row by row instead of freely?</h3>
<p>Free sliding often undoes your progress. Locking each strip before moving on means a mistake is local and recoverable, and you always know you are closer to solved than before.</p>
<h3>How do I keep placed tiles from sliding out?</h3>
<p>Close each corner so the tile cannot move back, and route the blank through unsolved cells only. Once a strip is locked, treat those cells as off-limits for the rest of the solve.</p>
<h3>Why can't I solve the last two rows one at a time?</h3>
<p>There is no row below them to route the blank through, so you solve the bottom two rows together as pairs and rotate the final pocket, rather than laying a single strip.</p>
<h3>What do I do with the final 2x2 pocket?</h3>
<p>Cycle the blank around the four cells. The three remaining tiles rotate through their arrangements until they land in the goal state. Nothing outside the pocket should move.</p>
<h3>My solve is stuck on the last tiles. What went wrong?</h3>
<p>Usually an earlier tile is one cell off. Back up one step, carefully lift the offending tile using the blank, and replace it correctly, then redo the pocket.</p>
<h3>Does this method work on bigger boards?</h3>
<p>Yes. On a 5x5 or larger board you repeat the inner-board step on progressively smaller regions. The row-by-row logic is identical at every size.</p>
<h3>How is this different from solving Sudoku?</h3>
<p>Sudoku is deduction with no movement, placing numbers by constraint. The 15-puzzle adds the sliding constraint, so you route a single blank to pull tiles into place physically.</p>
<h3>How long should a first method-based solve take?</h3>
<p>Plan for ten to twenty minutes the first time as you learn the blank routing. With a few repetitions, a clean 4x4 solve drops to under five minutes.</p>
<h3>Can the 15-puzzle be impossible to finish?</h3>
<p>Only if it was scrambled into an unsolvable state, which legal digital scrambles like those on Number Slide never do. A legal scramble is always solvable by this method.</p>
<h3>Should I memorize an algorithm instead?</h3>
<p>Not needed. The row-by-row method uses no memorized sequences, just a consistent order of operations and careful blank routing, which is easier to keep and to repeat.</p>

<h2>Sources &amp; References</h2>
<ul>
<li>Wikipedia, "15 puzzle" - the sliding puzzle's solve structure, including the row-by-row placement approach and the solvable-scramble property.</li>
<li>Wikipedia, "Sliding puzzle" - how the single empty square constrains movement and shapes solving strategy.</li>
<li>Wikipedia, "Combination puzzle" - the family of rearrange-to-goal puzzles that includes the 15-puzzle and its solving methods.</li>
</ul>
`,
    faqs: [
      {
        q: "What is the easiest method to solve the 15-puzzle?",
        a: "The row-by-row method: lock the top row left to right, then the left column top to bottom, repeat on the smaller inner board, solve the last two rows as pairs, and rotate the final 2x2 pocket into place.",
      },
      {
        q: "Why solve row by row instead of freely?",
        a: "Free sliding often undoes your progress. Locking each strip before moving on means a mistake is local and recoverable, and you always know you are closer to solved than before.",
      },
      {
        q: "How do I keep placed tiles from sliding out?",
        a: "Close each corner so the tile cannot move back, and route the blank through unsolved cells only. Once a strip is locked, treat those cells as off-limits for the rest of the solve.",
      },
      {
        q: "Why can't I solve the last two rows one at a time?",
        a: "There is no row below them to route the blank through, so you solve the bottom two rows together as pairs and rotate the final pocket, rather than laying a single strip.",
      },
      {
        q: "What do I do with the final 2x2 pocket?",
        a: "Cycle the blank around the four cells. The three remaining tiles rotate through their arrangements until they land in the goal state. Nothing outside the pocket should move.",
      },
      {
        q: "My solve is stuck on the last tiles. What went wrong?",
        a: "Usually an earlier tile is one cell off. Back up one step, carefully lift the offending tile using the blank, and replace it correctly, then redo the pocket.",
      },
      {
        q: "Does this method work on bigger boards?",
        a: "Yes. On a 5x5 or larger board you repeat the inner-board step on progressively smaller regions. The row-by-row logic is identical at every size.",
      },
      {
        q: "How is this different from solving Sudoku?",
        a: "Sudoku is deduction with no movement, placing numbers by constraint. The 15-puzzle adds the sliding constraint, so you route a single blank to pull tiles into place physically.",
      },
      {
        q: "How long should a first method-based solve take?",
        a: "Plan for ten to twenty minutes the first time as you learn the blank routing. With a few repetitions, a clean 4x4 solve drops to under five minutes.",
      },
      {
        q: "Can the 15-puzzle be impossible to finish?",
        a: "Only if it was scrambled into an unsolvable state, which legal digital scrambles like those on Number Slide never do. A legal scramble is always solvable by this method.",
      },
      {
        q: "Should I memorize an algorithm instead?",
        a: "Not needed. The row-by-row method uses no memorized sequences, just a consistent order of operations and careful blank routing, which is easier to keep and to repeat.",
      },
    ],
  },
];
