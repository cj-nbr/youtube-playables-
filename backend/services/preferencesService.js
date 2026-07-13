import { supabase } from "../database/connection.js";
import { AppError } from "../errors/index.js";

const EMPTY = {};

export const preferencesService = {
  async get(userId) {
    const { data, error } = await supabase
      .from("saved_preferences")
      .select("preferences")
      .eq("user_id", userId)
      .maybeSingle();
    if (error) throw AppError.internal(error.message);
    return data?.preferences ?? EMPTY;
  },

  async patch(userId, patch) {
    const current = await this.get(userId);
    const merged = { ...current, ...patch };
    const { error } = await supabase
      .from("saved_preferences")
      .upsert(
        { user_id: userId, preferences: merged, updated_at: new Date().toISOString() },
        { onConflict: "user_id" }
      );
    if (error) throw AppError.internal(error.message);
    return merged;
  },
};

export default preferencesService;
