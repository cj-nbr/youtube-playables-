-- ============================================================================
-- YOUTUBE PLAYABLES — Supabase schema
-- Auth, database, and user/game progress storage.
--
-- Apply with the Supabase CLI (`supabase db push`) or paste into the
-- Supabase SQL editor. Run once per project.
--
-- User identity lives in Supabase Auth (`auth.users`). Application tables key
-- off `auth.users.id` (uuid). Row Level Security scopes every row to its owner
-- via `auth.uid()`, and the server uses the service-role key (bypasses RLS).
-- ============================================================================

create extension if not exists "pgcrypto";

-- --------------------------------------------------------------------- Profiles
-- Extends the auth user with the public account + profile fields.
create table if not exists public.profiles (
  id              uuid primary key references auth.users (id) on delete cascade,
  username        text not null unique,
  email           text,
  display_name    text,
  avatar_color    text not null default '#0070f3',
  bio             text,
  location        text,
  role            text not null default 'user',
  status          text not null default 'active',
  email_verified  boolean not null default false,
  games_played    integer not null default 0,
  levels_completed integer not null default 0,
  total_score     integer not null default 0,
  achievements_count integer not null default 0,
  last_login      timestamptz,
  last_played     timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- -------------------------------------------------------------- Profile data (KV)
create table if not exists public.profile_data (
  user_id    uuid not null references auth.users (id) on delete cascade,
  key        text not null,
  value      jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, key)
);

-- ------------------------------------------------------------- Game progress
-- Generic progress model — future games need no schema change.
create table if not exists public.game_progress (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references auth.users (id) on delete cascade,
  game_id         text not null,
  current_level   integer not null default 1,
  unlocked_levels integer not null default 1,
  coins           integer not null default 0,
  stars           integer not null default 0,
  xp              integer not null default 0,
  score           integer not null default 0,
  lives           integer not null default 0,
  inventory       jsonb not null default '[]',
  power_ups       jsonb not null default '[]',
  character       text,
  skin            text,
  difficulty      text,
  game_settings   jsonb not null default '{}',
  checkpoints     jsonb not null default '{}',
  mission_progress jsonb not null default '{}',
  custom_data     jsonb not null default '{}',
  time_played     integer not null default 0,
  highest_score   integer not null default 0,
  best_time       integer,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  unique (user_id, game_id)
);
create index if not exists idx_progress_user on public.game_progress (user_id);
create index if not exists idx_progress_game on public.game_progress (game_id);

-- ------------------------------------------------------------- Game save data
create table if not exists public.game_save_data (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  game_id     text not null,
  slot        text not null default 'default',
  data        jsonb not null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique (user_id, game_id, slot)
);
create index if not exists idx_saves_user_game on public.game_save_data (user_id, game_id);

-- ------------------------------------------------------------ Game statistics
create table if not exists public.game_statistics (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  game_id     text not null,
  plays       integer not null default 0,
  wins        integer not null default 0,
  losses      integer not null default 0,
  best_score  integer not null default 0,
  total_score integer not null default 0,
  best_time   integer,
  total_time  integer not null default 0,
  last_played timestamptz,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique (user_id, game_id)
);
create index if not exists idx_stats_user on public.game_statistics (user_id);
create index if not exists idx_stats_game on public.game_statistics (game_id);

-- --------------------------------------------------------------- Achievements
create table if not exists public.achievements (
  id          uuid primary key default gen_random_uuid(),
  code        text not null unique,
  name        text not null,
  description text,
  created_at  timestamptz not null default now()
);

create table if not exists public.user_achievements (
  user_id        uuid not null references auth.users (id) on delete cascade,
  achievement_id uuid not null references public.achievements (id) on delete cascade,
  unlocked_at    timestamptz not null default now(),
  progress       integer not null default 0,
  primary key (user_id, achievement_id)
);
create index if not exists idx_user_ach_user on public.user_achievements (user_id);

-- ------------------------------------------------------------ Saved settings
create table if not exists public.saved_settings (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  settings   jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------- Saved preferences
create table if not exists public.saved_preferences (
  user_id     uuid primary key references auth.users (id) on delete cascade,
  preferences jsonb not null default '{}',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ------------------------------------------------------------------ Audit log
create table if not exists public.audit_log (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references auth.users (id) on delete set null,
  action     text not null,
  detail     text,
  ip         text,
  created_at timestamptz not null default now()
);
create index if not exists idx_audit_action on public.audit_log (action);
create index if not exists idx_audit_user on public.audit_log (user_id);

-- ============================================================================
-- Row Level Security — every table scoped to its owner.
-- ============================================================================
alter table public.profiles          enable row level security;
alter table public.profile_data      enable row level security;
alter table public.game_progress     enable row level security;
alter table public.game_save_data    enable row level security;
alter table public.game_statistics   enable row level security;
alter table public.achievements      enable row level security;
alter table public.user_achievements enable row level security;
alter table public.saved_settings    enable row level security;
alter table public.saved_preferences enable row level security;
alter table public.audit_log         enable row level security;

-- Profiles: owners manage their own row; everyone may read usernames/emails
-- for display purposes is intentionally restricted to the owner.
drop policy if exists profiles_owner on public.profiles;
create policy profiles_owner on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists profile_data_owner on public.profile_data;
create policy profile_data_owner on public.profile_data
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists progress_owner on public.game_progress;
create policy progress_owner on public.game_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists saves_owner on public.game_save_data;
create policy saves_owner on public.game_save_data
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists stats_owner on public.game_statistics;
create policy stats_owner on public.game_statistics
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Achievements catalog is readable by any authenticated user.
drop policy if exists achievements_read on public.achievements;
create policy achievements_read on public.achievements
  for select using (auth.role() = 'authenticated');

drop policy if exists user_achievements_owner on public.user_achievements;
create policy user_achievements_owner on public.user_achievements
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists settings_owner on public.saved_settings;
create policy settings_owner on public.saved_settings
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists preferences_owner on public.saved_preferences;
create policy preferences_owner on public.saved_preferences
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists audit_owner on public.audit_log;
create policy audit_owner on public.audit_log
  for select using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ============================================================================
-- Seed — default achievements (idempotent).
-- ============================================================================
insert into public.achievements (code, name, description) values
  ('first_win',     'First Win',      'Win your first game.'),
  ('score_1000',    'Point Maker',    'Score 1,000 points in a game.'),
  ('half_library',  'Explorer',       'Play 25 different games.'),
  ('full_library',  'Completionist',  'Play every game at least once.'),
  ('streak_7',      'Week Streak',    'Play 7 days in a row.')
on conflict (code) do nothing;
