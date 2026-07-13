import { supabase } from "../connection.js";
import { ACHIEVEMENT_DEFAULTS } from "../../constants/index.js";
import logger from "../../utilities/logger.js";

// Idempotently seed the achievements catalog into Supabase. Runs on startup so
// the catalogue exists even on a fresh project.
export async function runSeeds() {
  if (!supabase) return;

  const rows = ACHIEVEMENT_DEFAULTS.map((a) => ({
    code: a.code,
    name: a.name,
    description: a.description,
  }));

  const { error } = await supabase.from("achievements").upsert(rows, { onConflict: "code" });
  if (error) {
    logger.warn("Failed to seed achievements", { error: error.message });
    return;
  }
  logger.info(`Seeded ${rows.length} achievements`);
}

export default runSeeds;
