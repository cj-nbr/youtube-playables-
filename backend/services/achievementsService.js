import { supabase } from "../database/connection.js";
import { AppError } from "../errors/index.js";
import { ACHIEVEMENT_DEFAULTS } from "../constants/index.js";

export const achievementsService = {
  async list(userId) {
    const { data, error } = await supabase
      .from("achievements")
      .select(
        `id, code, name, description,
         user_achievements!left ( unlocked_at, progress )`
      )
      .order("id");
    if (error) throw AppError.internal(error.message);

    let achievements = data || [];
    if (achievements.length === 0) {
      const { error: seedError } = await supabase
        .from("achievements")
        .upsert(
          ACHIEVEMENT_DEFAULTS.map((a) => ({ code: a.code, name: a.name, description: a.description })),
          { onConflict: "code" }
        );
      if (seedError) throw AppError.internal(seedError.message);
      return this.list(userId);
    }

    // Merge the current user's unlock state onto each achievement.
    return achievements.map((a) => {
      const link = Array.isArray(a.user_achievements) ? a.user_achievements[0] : a.user_achievements;
      const unlocked = link?.unlocked_at || null;
      return {
        id: a.id,
        code: a.code,
        name: a.name,
        description: a.description,
        unlocked_at: unlocked,
        progress: link?.progress ?? 0,
      };
    });
  },

  async unlock(userId, achievementId) {
    const { data: existing } = await supabase
      .from("user_achievements")
      .select("*")
      .eq("user_id", userId)
      .eq("achievement_id", achievementId)
      .maybeSingle();
    if (existing) throw AppError.conflict("Achievement already unlocked");

    const { data: ach, error: achError } = await supabase
      .from("achievements")
      .select("*")
      .eq("id", achievementId)
      .maybeSingle();
    if (achError) throw AppError.internal(achError.message);
    if (!ach) throw AppError.notFound("Achievement not found");

    const { error } = await supabase
      .from("user_achievements")
      .insert({ user_id: userId, achievement_id: achievementId });
    if (error) throw AppError.internal(error.message);

    return {
      id: ach.id,
      code: ach.code,
      name: ach.name,
      description: ach.description,
      unlocked_at: new Date().toISOString(),
      progress: 0,
    };
  },
};

export default achievementsService;
