-- Supabase schema for YouTube Playables
-- Run this in the Supabase SQL Editor (Dashboard -> SQL Editor -> New query)

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles (extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  display_name text,
  email text unique not null,
  avatar_url text,
  created_at timestamptz default now() not null,
  last_login timestamptz,
  preferences jsonb default '{}'::jsonb not null,
  statistics jsonb default '{}'::jsonb not null
);

-- Game progress per user per game
create table public.game_progress (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users on delete cascade not null,
  game_id text not null,
  current_level integer default 1 not null,
  highest_level integer default 1 not null,
  coins integer default 0 not null,
  score integer default 0 not null,
  high_score integer default 0 not null,
  stars integer default 0 not null,
  unlocks text[] default '{}' not null,
  achievements text[] default '{}' not null,
  lives integer default 0 not null,
  inventory jsonb default '{}'::jsonb not null,
  settings jsonb default '{}'::jsonb not null,
  checkpoints jsonb default '{}'::jsonb not null,
  progress_percentage integer default 0 not null,
  last_played timestamptz,
  time_played integer default 0 not null,
  completion_status text default 'in_progress' not null,
  save_slot text default 'default' not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  unique(user_id, game_id, save_slot)
);

-- User statistics
create table public.user_stats (
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

-- Game save slots (arbitrary save data)
create table public.game_saves (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users on delete cascade not null,
  game_id text not null,
  slot text default 'default' not null,
  data jsonb default '{}'::jsonb not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  unique(user_id, game_id, slot)
);

-- Indexes for performance
create index idx_profiles_username on public.profiles(username);
create index idx_profiles_email on public.profiles(email);
create index idx_game_progress_user_game on public.game_progress(user_id, game_id);
create index idx_game_progress_user on public.game_progress(user_id);
create index idx_user_stats_user on public.user_stats(user_id);
create index idx_game_saves_user_game on public.game_saves(user_id, game_id);

-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.game_progress enable row level security;
alter table public.user_stats enable row level security;
alter table public.game_saves enable row level security;

-- RLS Policies

-- Profiles: users can read all, edit own
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Game progress: users can only access their own
create policy "Users can view their own game progress"
  on public.game_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert their own game progress"
  on public.game_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own game progress"
  on public.game_progress for update
  using (auth.uid() = user_id);

create policy "Users can delete their own game progress"
  on public.game_progress for delete
  using (auth.uid() = user_id);

-- User stats: users can only access their own
create policy "Users can view their own stats"
  on public.user_stats for select
  using (auth.uid() = user_id);

create policy "Users can insert their own stats"
  on public.user_stats for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own stats"
  on public.user_stats for update
  using (auth.uid() = user_id);

-- Game saves: users can only access their own
create policy "Users can view their own saves"
  on public.game_saves for select
  using (auth.uid() = user_id);

create policy "Users can insert their own saves"
  on public.game_saves for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own saves"
  on public.game_saves for update
  using (auth.uid() = user_id);

create policy "Users can delete their own saves"
  on public.game_saves for delete
  using (auth.uid() = user_id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, display_name, email, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'display_name', coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1))),
    new.email,
    null
  );
  insert into public.user_stats (user_id) values (new.id);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
