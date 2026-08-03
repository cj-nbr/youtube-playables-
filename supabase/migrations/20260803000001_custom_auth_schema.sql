-- ============================================================================
-- Custom Authentication Schema for YOUTUBE PLAYABLES
-- Replaces Supabase Auth with a fully custom authentication system.
-- Users are stored in public.users; sessions are managed via public.sessions.
-- Passwords are hashed with Argon2id (via the hash_secret_code function).
-- ============================================================================

create extension if not exists "pgcrypto";
create extension if not exists "uuid-ossp";

-- ---------------------------------------------------------------------------
-- Users table (replaces auth.users for custom auth)
-- ---------------------------------------------------------------------------
create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text unique,
  phone text unique,
  secret_code_hash text not null,
  avatar_url text,
  avatar_color text not null default '#0070f3',
  games_played integer not null default 0,
  total_play_time integer not null default 0,
  highest_score integer not null default 0,
  achievements_count integer not null default 0,
  player_rank text not null default 'Bronze',
  current_level integer not null default 1,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  last_login timestamptz,
  constraint email_or_phone check (email is not null or phone is not null),
  constraint secret_code_length check (secret_code_hash is not null)
);

create index if not exists idx_users_email on public.users (email);
create index if not exists idx_users_phone on public.users (phone);
create index if not exists idx_users_status on public.users (status);

-- ---------------------------------------------------------------------------
-- Sessions table (custom session management)
-- ---------------------------------------------------------------------------
create table if not exists public.sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  token text not null unique,
  ip_address text,
  user_agent text,
  is_active boolean not null default true,
  expires_at timestamptz not null,
  created_at timestamptz not null default now(),
  revoked_at timestamptz
);

create index if not exists idx_sessions_user on public.sessions (user_id);
create index if not exists idx_sessions_token on public.sessions (token);
create index if not exists idx_sessions_active on public.sessions (user_id, is_active);

-- ---------------------------------------------------------------------------
-- Notifications / Message Center
-- ---------------------------------------------------------------------------
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  title text not null,
  body text not null,
  type text not null default 'info',
  is_read boolean not null default false,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now(),
  read_at timestamptz
);

create index if not exists idx_notifications_user on public.notifications (user_id);
create index if not exists idx_notifications_unread on public.notifications (user_id, is_read);

-- ---------------------------------------------------------------------------
-- Achievements catalog (expanded per-game achievements)
-- ---------------------------------------------------------------------------
create table if not exists public.achievements (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  game_id text not null,
  name text not null,
  description text,
  tier text not null default 'Beginner',
  reward text,
  created_at timestamptz not null default now()
);

create index if not exists idx_achievements_game on public.achievements (game_id);
create index if not exists idx_achievements_tier on public.achievements (tier);

-- ---------------------------------------------------------------------------
-- User achievement progress
-- ---------------------------------------------------------------------------
create table if not exists public.user_achievements (
  user_id uuid not null references public.users (id) on delete cascade,
  achievement_id uuid not null references public.achievements (id) on delete cascade,
  unlocked_at timestamptz,
  progress integer not null default 0,
  primary key (user_id, achievement_id)
);

create index if not exists idx_user_ach_user on public.user_achievements (user_id);

-- ---------------------------------------------------------------------------
-- Avatars (reference for avatar selection)
-- ---------------------------------------------------------------------------
create table if not exists public.avatars (
  id uuid primary key default gen_random_uuid(),
  filename text not null unique,
  category text not null default 'default',
  is_premium boolean not null default false,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.users enable row level security;
alter table public.sessions enable row level security;
alter table public.notifications enable row level security;
alter table public.achievements enable row level security;
alter table public.user_achievements enable row level security;
alter table public.avatars enable row level security;

-- Users: users can read their own row, update their own row
drop policy if exists users_select on public.users;
create policy users_select on public.users for select using (auth.uid() = id);
drop policy if exists users_update on public.users;
create policy users_update on public.users for update using (auth.uid() = id);

-- Sessions: users can read their own sessions
drop policy if exists sessions_select on public.sessions;
create policy sessions_select on public.sessions for select using (auth.uid() = user_id);
drop policy if exists sessions_delete on public.sessions;
create policy sessions_delete on public.sessions for delete using (auth.uid() = user_id);

-- Notifications: users can read/write their own notifications
drop policy if exists notifications_select on public.notifications;
create policy notifications_select on public.notifications for select using (auth.uid() = user_id);
drop policy if exists notifications_insert on public.notifications;
create policy notifications_insert on public.notifications for insert with check (auth.uid() = user_id);
drop policy if exists notifications_update on public.notifications;
create policy notifications_update on public.notifications for update using (auth.uid() = user_id);

-- Achievements catalog: readable by all authenticated users
drop policy if exists achievements_read on public.achievements;
create policy achievements_read on public.achievements for select using (auth.role() = 'authenticated');

-- User achievements: users can read/write their own
drop policy if exists user_achievements_select on public.user_achievements;
create policy user_achievements_select on public.user_achievements for select using (auth.uid() = user_id);
drop policy if exists user_achievements_upsert on public.user_achievements;
create policy user_achievements_upsert on public.user_achievements for insert with check (auth.uid() = user_id);
drop policy if exists user_achievements_update on public.user_achievements;
create policy user_achievements_update on public.user_achievements for update using (auth.uid() = user_id);

-- Avatars: readable by all
drop policy if exists avatars_read on public.avatars;
create policy avatars_read on public.avatars for select using (true);

-- ---------------------------------------------------------------------------
-- Helper functions
-- ---------------------------------------------------------------------------

-- Hash a 6-character secret code using pgcrypto
create or replace function public.hash_secret_code(code text)
returns text
language plpgsql
security definer
as $$
begin
  if length(code) != 6 then
    raise exception 'Secret code must be exactly 6 characters';
  end if;
  return crypt(code, gen_salt('bf', 12));
end;
$$;

-- Verify a secret code against its hash
create or replace function public.verify_secret_code(code text, hash text)
returns boolean
language plpgsql
security definer
as $$
begin
  if length(code) != 6 then
    return false;
  end if;
  return crypt(code, hash) = hash;
end;
$$;

-- Check if a secret code is unique across all users
create or replace function public.is_secret_code_unique(code text)
returns boolean
language plpgsql
security definer
as $$
declare
  cnt integer;
begin
  if length(code) != 6 then
    return false;
  end if;
  select count(*) into cnt from public.users where secret_code_hash = public.hash_secret_code(code);
  return cnt = 0;
end;
$$;

-- Get the current rank based on total score
create or replace function public.get_player_rank(total_score integer)
returns text
language plpgsql
immutable
as $$
begin
  if total_score >= 100000 then return 'Grandmaster';
  elsif total_score >= 50000 then return 'Legend';
  elsif total_score >= 25000 then return 'Champion';
  elsif total_score >= 10000 then return 'Elite';
  elsif total_score >= 5000 then return 'Master';
  elsif total_score >= 2000 then return 'Expert';
  elsif total_score >= 1000 then return 'Skilled';
  elsif total_score >= 500 then return 'Explorer';
  elsif total_score >= 200 then return 'Rookie';
  else return 'Beginner';
  end if;
end;
$$;

-- ---------------------------------------------------------------------------
-- Seed achievements for each game (idempotent)
-- ---------------------------------------------------------------------------
insert into public.achievements (code, game_id, name, description, tier, reward) values
-- Tic Tac Toe / arrow-game
('arrow_first_win', 'arrow-game', 'First Victory', 'Win your first game of Tic Tac Toe.', 'Beginner', '10 coins'),
('arrow_five_wins', 'arrow-game', 'Tic Tac Toe Pro', 'Win 5 games of Tic Tac Toe.', 'Rookie', '25 coins'),
('arrow_ten_wins', 'arrow-game', 'Tic Tac Toe Master', 'Win 10 games of Tic Tac Toe.', 'Expert', '50 coins'),
('arrow_fifty_wins', 'arrow-game', 'Tic Tac Toe Legend', 'Win 50 games of Tic Tac Toe.', 'Legend', '100 coins'),
('arrow_streak_5', 'arrow-game', 'Unstoppable', 'Win 5 games in a row.', 'Skilled', '30 coins'),
('arrow_score_500', 'arrow-game', 'Point Master', 'Score 500 points in a single game.', 'Skilled', '20 coins'),
-- Stack Tower
('stack_first_win', 'stack-tower', 'First Tower', 'Complete your first Stack Tower game.', 'Beginner', '10 coins'),
('stack_high_20', 'stack-tower', 'Tower Builder', 'Reach level 20 in Stack Tower.', 'Rookie', '25 coins'),
('stack_high_50', 'stack-tower', 'Sky Scraper', 'Reach level 50 in Stack Tower.', 'Expert', '50 coins'),
('stack_score_1000', 'stack-tower', 'Tower Scorer', 'Score 1000 points in Stack Tower.', 'Skilled', '20 coins'),
('stack_streak_3', 'stack-tower', 'Steady Hands', 'Win 3 Stack Tower games in a row.', 'Rookie', '15 coins'),
-- Color Match
('color_first_win', 'color-match', 'Color Keen', 'Win your first Color Match game.', 'Beginner', '10 coins'),
('color_streak_5', 'color-match', 'Chromatic Streak', 'Win 5 Color Match games in a row.', 'Skilled', '30 coins'),
('color_score_500', 'color-match', 'Color Pro', 'Score 500 points in Color Match.', 'Skilled', '20 coins'),
-- Block Blast
('blast_first_win', 'block-blast', 'Blaster', 'Win your first Block Blast game.', 'Beginner', '10 coins'),
('blast_score_1000', 'block-blast', 'Big Clearer', 'Score 1000 points in Block Blast.', 'Rookie', '25 coins'),
('blast_streak_5', 'block-blast', 'Combo King', 'Win 5 Block Blast games in a row.', 'Expert', '50 coins'),
-- 2048
('2048_first_win', '2048', 'Tile Starter', 'Complete your first 2048 game.', 'Beginner', '10 coins'),
('2048_score_2048', '2048', 'Two Thousand Forty-Eight', 'Reach the 2048 tile.', 'Rookie', '30 coins'),
('2048_score_8192', '2048', 'Eight Thousand One Hundred Ninety-Two', 'Reach the 8192 tile.', 'Expert', '75 coins'),
('2048_streak_3', '2048', 'Consistent', 'Win 3 2048 games in a row.', 'Skilled', '20 coins'),
-- Chess
('chess_first_win', 'chess', 'Checkmate Novice', 'Win your first Chess game.', 'Beginner', '10 coins'),
('chess_five_wins', 'chess', 'Chess Enthusiast', 'Win 5 Chess games.', 'Rookie', '25 coins'),
('chess_twenty_wins', 'chess', 'Chess Veteran', 'Win 20 Chess games.', 'Master', '60 coins'),
('chess_fifty_wins', 'chess', 'Grand Chess Player', 'Win 50 Chess games.', 'Legend', '120 coins'),
('chess_streak_5', 'chess', 'Unbreakable', 'Win 5 Chess games in a row.', 'Elite', '40 coins'),
-- Memory Flip
('memory_first_win', 'memory-flip', 'Memory Starter', 'Complete your first Memory Flip game.', 'Beginner', '10 coins'),
('memory_streak_5', 'memory-flip', 'Elephant Memory', 'Win 5 Memory Flip games in a row.', 'Skilled', '30 coins'),
('memory_score_500', 'memory-flip', 'Recall Master', 'Score 500 points in Memory Flip.', 'Expert', '50 coins'),
-- Minesweeper
('mine_first_win', 'minesweeper', 'Mine Sweeper', 'Complete your first Minesweeper game.', 'Beginner', '10 coins'),
('mine_expert_clear', 'minesweeper', 'Expert Sweeper', 'Complete Minesweeper on Expert difficulty.', 'Master', '60 coins'),
('mine_streak_3', 'minesweeper', 'Mine Free', 'Win 3 Minesweeper games in a row.', 'Rookie', '15 coins'),
-- Sudoku
('sudoku_first_win', 'sudoku', 'Sudoku Starter', 'Complete your first Sudoku puzzle.', 'Beginner', '10 coins'),
('sudoku_five_wins', 'sudoku', 'Number Cruncher', 'Complete 5 Sudoku puzzles.', 'Rookie', '25 coins'),
('sudoku_expert_clear', 'sudoku', 'Sudoku Master', 'Complete a Sudoku puzzle on Expert difficulty.', 'Master', '60 coins'),
('sudoku_streak_5', 'sudoku', 'Sudoku Streak', 'Complete 5 Sudoku puzzles in a row.', 'Elite', '40 coins'),
-- Jigsaw
('jigsaw_first_win', 'jigsaw', 'Puzzle Piece', 'Complete your first Jigsaw puzzle.', 'Beginner', '10 coins'),
('jigsaw_five_wins', 'jigsaw', 'Puzzle Solver', 'Complete 5 Jigsaw puzzles.', 'Rookie', '25 coins'),
('jigsaw_hard_clear', 'jigsaw', 'Hard Puzzle', 'Complete a Hard difficulty Jigsaw puzzle.', 'Expert', '50 coins'),
('jigsaw_streak_3', 'jigsaw', 'Puzzle Streak', 'Complete 3 Jigsaw puzzles in a row.', 'Skilled', '20 coins'),
-- Word Wipe
('wipe_first_win', 'word-wipe', 'Word Wipe Starter', 'Complete your first Word Wipe game.', 'Beginner', '10 coins'),
('wipe_score_500', 'word-wipe', 'Word Wipe Pro', 'Score 500 points in Word Wipe.', 'Skilled', '25 coins'),
('wipe_streak_5', 'word-wipe', 'Word Wipe Champion', 'Win 5 Word Wipe games in a row.', 'Expert', '50 coins'),
-- Solitaire
('solitaire_first_win', 'solitaire', 'Solitaire Starter', 'Complete your first Solitaire game.', 'Beginner', '10 coins'),
('solitaire_five_wins', 'solitaire', 'Card Player', 'Complete 5 Solitaire games.', 'Rookie', '25 coins'),
('solitaire_master', 'solitaire', 'Solitaire Master', 'Win 20 Solitaire games.', 'Master', '60 coins'),
('solitaire_streak_5', 'solitaire', 'Unstoppable Cards', 'Win 5 Solitaire games in a row.', 'Elite', '40 coins'),
-- Crossword
('crossword_first_win', 'crossword', 'Crossword Starter', 'Complete your first Crossword puzzle.', 'Beginner', '10 coins'),
('crossword_five_wins', 'crossword', 'Word Master', 'Complete 5 Crossword puzzles.', 'Rookie', '25 coins'),
('crossword_hard', 'crossword', 'Hard Crossword', 'Complete a Hard Crossword puzzle.', 'Expert', '50 coins'),
('crossword_streak_3', 'crossword', 'Crossword Streak', 'Complete 3 Crosswords in a row.', 'Skilled', '20 coins'),
-- Speed Type
('speed_first_win', 'speedtype', 'Speed Type Starter', 'Complete your first Speed Type game.', 'Beginner', '10 coins'),
('speed_score_500', 'speedtype', 'Fast Typer', 'Score 500 points in Speed Type.', 'Rookie', '25 coins'),
('speed_streak_5', 'speedtype', 'Speed Demon', 'Win 5 Speed Type games in a row.', 'Expert', '50 coins'),
-- Speed Read
('read_first_win', 'speedread', 'Speed Read Starter', 'Complete your first Speed Read game.', 'Beginner', '10 coins'),
('read_score_500', 'speedread', 'Quick Reader', 'Score 500 points in Speed Read.', 'Rookie', '25 coins'),
('read_streak_3', 'speedread', 'Reading Streak', 'Win 3 Speed Read games in a row.', 'Skilled', '20 coins'),
-- General achievements (any game)
('any_first_game', 'all', 'First Steps', 'Play your first game.', 'Beginner', '5 coins'),
('any_five_games', 'all', 'Getting Started', 'Play 5 different games.', 'Rookie', '15 coins'),
('any_twenty_games', 'all', 'Game Explorer', 'Play 20 different games.', 'Explorer', '40 coins'),
('any_fifty_games', 'all', 'Dedicated Player', 'Play 50 different games.', 'Completionist', '100 coins'),
('any_hundred_games', 'all', 'Gaming Legend', 'Play 100 games total.', 'Legend', '200 coins'),
('any_1000_score', 'all', 'High Scorer', 'Accumulate 1000 total points.', 'Skilled', '25 coins'),
('any_10000_score', 'all', 'Point Collector', 'Accumulate 10000 total points.', 'Expert', '75 coins'),
('any_50000_score', 'all', 'Score Master', 'Accumulate 50000 total points.', 'Master', '150 coins'),
('any_100000_score', 'all', 'Score Grandmaster', 'Accumulate 100000 total points.', 'Grandmaster', '500 coins'),
('any_10_hours', 'all', 'Time Investor', 'Play for 10 hours total.', 'Skilled', '30 coins'),
('any_100_hours', 'all', 'Dedicated Gamer', 'Play for 100 hours total.', 'Master', '100 coins'),
('any_500_hours', 'all', 'Gaming Veteran', 'Play for 500 hours total.', 'Legend', '250 coins'),
('any_level_10', 'all', 'Level 10', 'Reach level 10.', 'Rookie', '20 coins'),
('any_level_25', 'all', 'Level 25', 'Reach level 25.', 'Expert', '50 coins'),
('any_level_50', 'all', 'Level 50', 'Reach level 50.', 'Master', '100 coins'),
('any_level_100', 'all', 'Max Level', 'Reach level 100.', 'Grandmaster', '300 coins');