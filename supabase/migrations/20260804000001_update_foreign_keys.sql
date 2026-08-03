-- Auto-generated migration
-- 20260804000001 - Update foreign keys to users.id
-- 
ALTER TABLE profiles DROP COLUMN auth_user_id;
ALTER TABLE profiles ADD COLUMN user_id UUID REFERENCES users(id);

ALTER TABLE game_progress DROP COLUMN auth_user_id;
ALTER TABLE game_progress ADD COLUMN user_id UUID REFERENCES users(id);

ALTER TABLE achievements DROP COLUMN auth_user_id;
ALTER TABLE achievements ADD COLUMN user_id UUID REFERENCES users(id);

ALTER TABLE user_achievements DROP COLUMN auth_user_id;
ALTER TABLE user_achievements ADD COLUMN user_id UUID REFERENCES users(id);

ALTER TABLE notifications DROP COLUMN auth_user_id;
ALTER TABLE notifications ADD COLUMN user_id UUID REFERENCES users(id);