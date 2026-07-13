import { supabase } from "../database/connection.js";
import { AppError } from "../errors/index.js";

const DEFAULT_STATS = {
  plays: 0,
  wins: 0,
  losses: 0,
  best_score: 0,
  total_score: 0,
  best_time: null,
  total_time: 0,
  last_played: null,
};

export const statsService = {
  async get(userId, gameId) {
    const { data, error } = await supabase
      .from("game_statistics")
      .select("*")
      .eq("user_id", userId)
      .eq("game_id", gameId)
      .maybeSingle();
    if (error) throw AppError.internal(error.message);
    if (!data) return { user_id: userId, game_id: gameId, ...DEFAULT_STATS };
    return data;
  },

  async patch(userId, gameId, patch) {
    const { data, error } = await supabase
      .from("game_statistics")
      .upsert(
        { user_id: userId, game_id: gameId, ...patch, last_played: new Date().toISOString() },
        { onConflict: "user_id,game_id" }
      )
      .select("*")
      .single();
    if (error) throw AppError.internal(error.message);
    return data;
  },
};

export default statsService;
