-- Completion migration: creates only the objects missing from the
-- partially-applied initial schema (profiles + game_progress already exist).
-- Safe to run multiple times (everything is IF NOT EXISTS / CREATE OR REPLACE).

create extension if not exists "uuid-ossp";

-- User statistics (missing)
create table if not exists public.user_stats (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users on delete cascade unique not null,
  total_games_played integer default 0 not null,
  wins integer default 0 not null,
  losses integer default 0 not null,
  total_time_played integer default 0 not null,
  highest_scores jsonb default '{}'::jsonb not null,
  overall_progress integer default 0 not null,
  achievements text[] default '{}' not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Game save slots (missing)
create table if not exists public.game_saves (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users on delete cascade not null,
  game_id text not null,
  slot text default 'default' not null,
  data jsonb default '{}'::jsonb not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  unique(user_id, game_id, slot)
);

-- Indexes (idempotent)
create index if not exists idx_profiles_username on public.profiles(username);
create index if not exists idx_profiles_email on public.profiles(email);
create index if not exists idx_game_progress_user_game on public.game_progress(user_id, game_id);
create index if not exists idx_game_progress_user on public.game_progress(user_id);
create index if not exists idx_user_stats_user on public.user_stats(user_id);
create index if not exists idx_game_saves_user_game on public.game_saves(user_id, game_id);

-- Enable RLS (idempotent)
alter table public.profiles enable row level security;
alter table public.game_progress enable row level security;
alter table public.user_stats enable row level security;
alter table public.game_saves enable row level security;

-- RLS policies (drop + recreate to stay idempotent)
drop policy if exists "Public profiles are viewable by everyone" on public.profiles;
create policy "Public profiles are viewable by everyone"
  on public.profiles for select using (true);

drop policy if exists "Users can insert their own profile" on public.profiles;
create policy "Users can insert their own profile"
  on public.profiles for insert with check (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

drop policy if exists "Users can view their own game progress" on public.game_progress;
create policy "Users can view their own game progress"
  on public.game_progress for select using (auth.uid() = user_id);

drop policy if exists "Users can insert their own game progress" on public.game_progress;
create policy "Users can insert their own game progress"
  on public.game_progress for insert with check (auth.uid() = user_id);

drop policy if exists "Users can update their own game progress" on public.game_progress;
create policy "Users can update their own game progress"
  on public.game_progress for update using (auth.uid() = user_id);

drop policy if exists "Users can delete their own game progress" on public.game_progress;
create policy "Users can delete their own game progress"
  on public.game_progress for delete using (auth.uid() = user_id);

drop policy if exists "Users can view their own stats" on public.user_stats;
create policy "Users can view their own stats"
  on public.user_stats for select using (auth.uid() = user_id);

drop policy if exists "Users can insert their own stats" on public.user_stats;
create policy "Users can insert their own stats"
  on public.user_stats for insert with check (auth.uid() = user_id);

drop policy if exists "Users can update their own stats" on public.user_stats;
create policy "Users can update their own stats"
  on public.user_stats for update using (auth.uid() = user_id);

drop policy if exists "Users can view their own saves" on public.game_saves;
create policy "Users can view their own saves"
  on public.game_saves for select using (auth.uid() = user_id);

drop policy if exists "Users can insert their own saves" on public.game_saves;
create policy "Users can insert their own saves"
  on public.game_saves for insert with check (auth.uid() = user_id);

drop policy if exists "Users can update their own saves" on public.game_saves;
create policy "Users can update their own saves"
  on public.game_saves for update using (auth.uid() = user_id);

drop policy if exists "Users can delete their own saves" on public.game_saves;
create policy "Users can delete their own saves"
  on public.game_saves for delete using (auth.uid() = user_id);

-- Auto-create profile + stats on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, display_name, email, avatar_url)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data->>'username',
      case when new.email is not null then split_part(new.email, '@', 1) else 'user_' || substr(new.id::text, 1, 8) end
    ),
    coalesce(
      new.raw_user_meta_data->>'display_name',
      case when new.email is not null then split_part(new.email, '@', 1) else 'user_' || substr(new.id::text, 1, 8) end
    ),
    new.email,
    null
  )
  on conflict (id) do nothing;

  insert into public.user_stats (user_id) values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Database helper functions
create or replace function public.increment_stat(
  p_user_id uuid,
  p_field text,
  p_amount integer
)
returns void as $$
begin
  execute format('update public.user_stats set %I = coalesce(%I::integer, 0) + $1, updated_at = now() where user_id = $2', p_field, p_field)
    using p_amount, p_user_id;
end;
$$ language plpgsql security definer;

create or replace function public.upsert_game_progress(
  p_user_id uuid,
  p_game_id text,
  p_slot text default 'default'
)
returns json as $$
declare
  result json;
begin
  insert into public.game_progress (user_id, game_id, save_slot)
  values (p_user_id, p_game_id, p_slot)
  on conflict (user_id, game_id, save_slot) do nothing;

  select row_to_json(gp.*) into result
  from public.game_progress gp
  where gp.user_id = p_user_id
    and gp.game_id = p_game_id
    and gp.save_slot = p_slot;

  return result;
end;
$$ language plpgsql security definer;

create or replace function public.get_or_create_user_stats(
  p_user_id uuid
)
returns json as $$
declare
  result json;
begin
  insert into public.user_stats (user_id)
  values (p_user_id)
  on conflict (user_id) do nothing;

  select row_to_json(us.*) into result
  from public.user_stats us
  where us.user_id = p_user_id;

  return result;
end;
$$ language plpgsql security definer;

create or replace function public.batch_update_progress(
  p_user_id uuid,
  p_game_id text,
  p_updates jsonb,
  p_slot text default 'default'
)
returns json as $$
declare
  result json;
  current record;
begin
  select * into current
  from public.game_progress
  where user_id = p_user_id
    and game_id = p_game_id
    and save_slot = p_slot;

  if not found then
    insert into public.game_progress (user_id, game_id, save_slot)
    values (p_user_id, p_game_id, p_slot)
    returning * into current;
  end if;

  update public.game_progress
  set
    current_level = coalesce((p_updates->>'current_level')::integer, current_level),
    highest_level = coalesce((p_updates->>'highest_level')::integer, highest_level),
    coins = coalesce((p_updates->>'coins')::integer, coins),
    score = coalesce((p_updates->>'score')::integer, score),
    high_score = coalesce((p_updates->>'high_score')::integer, high_score),
    stars = coalesce((p_updates->>'stars')::integer, stars),
    unlocks = coalesce((p_updates->>'unlocks')::text[], unlocks),
    achievements = coalesce((p_updates->>'achievements')::text[], achievements),
    lives = coalesce((p_updates->>'lives')::integer, lives),
    inventory = coalesce(p_updates->'inventory', inventory),
    settings = coalesce(p_updates->'settings', settings),
    checkpoints = coalesce(p_updates->'checkpoints', checkpoints),
    progress_percentage = coalesce((p_updates->>'progress_percentage')::integer, progress_percentage),
    time_played = coalesce((p_updates->>'time_played')::integer, time_played),
    completion_status = coalesce(p_updates->>'completion_status', completion_status),
    last_played = now(),
    updated_at = now()
  where user_id = p_user_id
    and game_id = p_game_id
    and save_slot = p_slot;

  select row_to_json(gp.*) into result
  from public.game_progress gp
  where gp.user_id = p_user_id
    and gp.game_id = p_game_id
    and gp.save_slot = p_slot;

  return result;
end;
$$ language plpgsql security definer;
