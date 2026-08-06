-- Add phone column to profiles and populate it from auth.users on signup

alter table public.profiles add column if not exists phone text;

create or replace function public.handle_new_user()
returns trigger as $$
begin
 insert into public.profiles (id, username, display_name, email, phone, avatar_url)
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
  new.phone,
  null
 )
 on conflict (id) do update set
  phone = coalesce(excluded.phone, public.profiles.phone),
  updated_at = now();

 insert into public.user_stats (user_id) values (new.id)
 on conflict (user_id) do nothing;

 return new;
end;
$$ language plpgsql security definer;

