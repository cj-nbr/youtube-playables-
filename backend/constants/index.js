// Application-wide constants. Kept dependency-free so they can be imported
// anywhere (repositories, services, middleware) without cycles.

export const USER_ROLES = {
  GUEST: "guest",
  USER: "user",
  MODERATOR: "moderator",
  ADMIN: "admin",
};

export const ACCOUNT_STATUS = {
  ACTIVE: "active",
  SUSPENDED: "suspended",
  DELETED: "deleted",
};

// Generic game-progress column names that are queryable / indexed. Anything
// else is stored inside the `data` JSON blob so future games need no schema
// change.
export const PROGRESS_FIELDS = [
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
];

export const SAVE_SLOT_DEFAULT = "default";

export const ACHIEVEMENT_DEFAULTS = [
  { code: "first_win", name: "First Win", description: "Win your first game." },
  { code: "score_1000", name: "Point Maker", description: "Score 1,000 points in a game." },
  { code: "half_library", name: "Explorer", description: "Play 25 different games." },
  { code: "full_library", name: "Completionist", description: "Play every game at least once." },
  { code: "streak_7", name: "Week Streak", description: "Play 7 days in a row." },
];

export const DEFAULT_SETTINGS = {
  theme: "system",
  sound: true,
  music: false,
  notifications: true,
  reduced_motion: false,
  language: "en",
};

export const DEFAULT_PREFERENCES = {
  difficulty: "normal",
  controls: "auto",
  boardStyle: "default",
};
