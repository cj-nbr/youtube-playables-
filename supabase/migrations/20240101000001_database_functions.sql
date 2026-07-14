-- Fixed database functions for YouTube Playables

-- Increment a numeric field in user_stats using dynamic SQL
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

-- Update or insert game progress
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

-- Get or create user stats
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

-- Batch update game progress fields
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
