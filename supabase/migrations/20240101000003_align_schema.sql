-- Align the live (partially-created) schema with the application's expected schema.
-- Adds only the columns/constraints the app code relies on. Safe to re-run.

-- profiles: add columns the trigger + app expect
alter table public.profiles add column if not exists avatar_url text;
alter table public.profiles add column if not exists preferences jsonb default '{}'::jsonb not null;
alter table public.profiles add column if not exists statistics jsonb default '{}'::jsonb not null;
alter table public.profiles add column if not exists created_at timestamptz default now() not null;

-- game_progress: add the columns the app upserts/reads
alter table public.game_progress add column if not exists high_score integer default 0 not null;
alter table public.game_progress add column if not exists highest_level integer default 1 not null;
alter table public.game_progress add column if not exists unlocks text[] default '{}' not null;
alter table public.game_progress add column if not exists achievements text[] default '{}' not null;
alter table public.game_progress add column if not exists completion_status text default 'in_progress' not null;
alter table public.game_progress add column if not exists progress_percentage integer default 0 not null;
alter table public.game_progress add column if not exists save_slot text default 'default' not null;

-- unique constraint used by upsert onConflict(user_id, game_id, save_slot)
do $$
begin
 if not exists (
  select 1 from pg_constraint
  where conname = 'game_progress_user_game_slot_key'
 ) then
  alter table public.game_progress
   add constraint game_progress_user_game_slot_key unique (user_id, game_id, save_slot);
 end if;
end $$;

