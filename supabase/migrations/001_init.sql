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

-- Owner-scoped tables. Postgres policies take a single command type each, and
-- WITH CHECK is only valid for INSERT/UPDATE, so we create one policy per
-- command (select / insert / update / delete), each scoped to the row owner.

-- profiles (id)
drop policy if exists profiles_select on public.profiles;
create policy profiles_select on public.profiles for select using (auth.uid() = id);
drop policy if exists profiles_insert on public.profiles;
create policy profiles_insert on public.profiles for insert with check (auth.uid() = id);
drop policy if exists profiles_update on public.profiles;
create policy profiles_update on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
drop policy if exists profiles_delete on public.profiles;
create policy profiles_delete on public.profiles for delete using (auth.uid() = id);

-- profile_data (user_id)
drop policy if exists profile_data_select on public.profile_data;
create policy profile_data_select on public.profile_data for select using (auth.uid() = user_id);
drop policy if exists profile_data_insert on public.profile_data;
create policy profile_data_insert on public.profile_data for insert with check (auth.uid() = user_id);
drop policy if exists profile_data_update on public.profile_data;
create policy profile_data_update on public.profile_data for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists profile_data_delete on public.profile_data;
create policy profile_data_delete on public.profile_data for delete using (auth.uid() = user_id);

-- game_progress (user_id)
drop policy if exists progress_select on public.game_progress;
create policy progress_select on public.game_progress for select using (auth.uid() = user_id);
drop policy if exists progress_insert on public.game_progress;
create policy progress_insert on public.game_progress for insert with check (auth.uid() = user_id);
drop policy if exists progress_update on public.game_progress;
create policy progress_update on public.game_progress for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists progress_delete on public.game_progress;
create policy progress_delete on public.game_progress for delete using (auth.uid() = user_id);

-- game_save_data (user_id)
drop policy if exists saves_select on public.game_save_data;
create policy saves_select on public.game_save_data for select using (auth.uid() = user_id);
drop policy if exists saves_insert on public.game_save_data;
create policy saves_insert on public.game_save_data for insert with check (auth.uid() = user_id);
drop policy if exists saves_update on public.game_save_data;
create policy saves_update on public.game_save_data for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists saves_delete on public.game_save_data;
create policy saves_delete on public.game_save_data for delete using (auth.uid() = user_id);

-- game_statistics (user_id)
drop policy if exists stats_select on public.game_statistics;
create policy stats_select on public.game_statistics for select using (auth.uid() = user_id);
drop policy if exists stats_insert on public.game_statistics;
create policy stats_insert on public.game_statistics for insert with check (auth.uid() = user_id);
drop policy if exists stats_update on public.game_statistics;
create policy stats_update on public.game_statistics for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists stats_delete on public.game_statistics;
create policy stats_delete on public.game_statistics for delete using (auth.uid() = user_id);

-- Achievements catalog is readable by any authenticated user.
drop policy if exists achievements_read on public.achievements;
create policy achievements_read on public.achievements for select using (auth.role() = 'authenticated');

-- user_achievements (user_id)
drop policy if exists user_achievements_select on public.user_achievements;
create policy user_achievements_select on public.user_achievements for select using (auth.uid() = user_id);
drop policy if exists user_achievements_insert on public.user_achievements;
create policy user_achievements_insert on public.user_achievements for insert with check (auth.uid() = user_id);
drop policy if exists user_achievements_update on public.user_achievements;
create policy user_achievements_update on public.user_achievements for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists user_achievements_delete on public.user_achievements;
create policy user_achievements_delete on public.user_achievements for delete using (auth.uid() = user_id);

-- saved_settings (user_id)
drop policy if exists settings_select on public.saved_settings;
create policy settings_select on public.saved_settings for select using (auth.uid() = user_id);
drop policy if exists settings_insert on public.saved_settings;
create policy settings_insert on public.saved_settings for insert with check (auth.uid() = user_id);
drop policy if exists settings_update on public.saved_settings;
create policy settings_update on public.saved_settings for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists settings_delete on public.saved_settings;
create policy settings_delete on public.saved_settings for delete using (auth.uid() = user_id);

-- saved_preferences (user_id)
drop policy if exists preferences_select on public.saved_preferences;
create policy preferences_select on public.saved_preferences for select using (auth.uid() = user_id);
drop policy if exists preferences_insert on public.saved_preferences;
create policy preferences_insert on public.saved_preferences for insert with check (auth.uid() = user_id);
drop policy if exists preferences_update on public.saved_preferences;
create policy preferences_update on public.saved_preferences for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists preferences_delete on public.saved_preferences;
create policy preferences_delete on public.saved_preferences for delete using (auth.uid() = user_id);

-- Audit log: readable by the owner (writes happen server-side via service role).
drop policy if exists audit_owner_select on public.audit_log;
create policy audit_owner_select on public.audit_log for select using (auth.uid() = user_id);

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
