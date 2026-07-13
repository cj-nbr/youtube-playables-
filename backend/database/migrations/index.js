// Schema for YOUTUBE PLAYABLES is managed by Supabase (see
// database/migrations/001_init.sql, applied via `supabase db push` or the SQL
// editor). The server no longer runs raw SQL migrations at runtime.

import logger from "../../utilities/logger.js";

export function runMigrations() {
  logger.info("Schema migrations are managed by Supabase — nothing to run here.");
}

export default runMigrations;
