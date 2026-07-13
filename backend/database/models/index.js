// Plain-object model shapes. Repositories return these; services may enrich
// them. No ORM is used — SQL stays explicit and reviewable.

export const userModel = {
  id: 0,
  username: "",
  email: "",
  role: "user",
  status: "active",
  email_verified: 0,
  created_at: "",
  updated_at: "",
  last_login: null,
  last_played: null,
};

export const profileModel = {
  user_id: 0,
  display_name: null,
  avatar_color: "#0070f3",
  bio: null,
  location: null,
  games_played: 0,
  levels_completed: 0,
  total_score: 0,
  achievements_count: 0,
};

// Column lists reused by repositories to avoid SELECT *.
export const USER_COLUMNS = [
  "id",
  "username",
  "email",
  "password_hash",
  "role",
  "status",
  "email_verified",
  "created_at",
  "updated_at",
  "last_login",
  "last_played",
];

export const PROGRESS_COLUMNS = [
  "id",
  "user_id",
  "game_id",
  "current_level",
  "unlocked_levels",
  "coins",
  "stars",
  "xp",
  "score",
  "lives",
  "inventory",
  "power_ups",
  "character",
  "skin",
  "difficulty",
  "game_settings",
  "checkpoints",
  "mission_progress",
  "custom_data",
  "time_played",
  "highest_score",
  "best_time",
  "created_at",
  "updated_at",
];
