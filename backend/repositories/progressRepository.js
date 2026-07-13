import { supabase } from "../database/connection.js";
import { AppError } from "../errors/index.js";

// JSON columns are stored as jsonb, so Supabase returns them already parsed.
export const progressRepository = {
  async get(user_id, game_id) {
    const { data, error } = await supabase
      .from("game_progress")
      .select("*")
      .eq("user_id", user_id)
      .eq("game_id", game_id)
      .maybeSingle();
    if (error) throw AppError.internal(error.message);
    return data || null;
  },

  async getAllForUser(user_id) {
    const { data, error } = await supabase
      .from("game_progress")
      .select("*")
      .eq("user_id", user_id);
    if (error) throw AppError.internal(error.message);
    return data || [];
  },

  async upsert(user_id, game_id, fields = {}) {
    const { data, error } = await supabase
      .from("game_progress")
      .upsert(
        { user_id, game_id, ...fields, updated_at: new Date().toISOString() },
        { onConflict: "user_id,game_id" }
      )
      .select("*")
      .single();
    if (error) throw AppError.internal(error.message);
    return data;
  },

  async touchPlayed(user_id, game_id) {
    await supabase
      .from("game_progress")
      .update({ updated_at: new Date().toISOString() })
      .eq("user_id", user_id)
      .eq("game_id", game_id);
  },

  async delete(user_id, game_id) {
    const { error } = await supabase
      .from("game_progress")
      .delete()
      .eq("user_id", user_id)
      .eq("game_id", game_id);
    if (error) throw AppError.internal(error.message);
  },
};

export default progressRepository;
