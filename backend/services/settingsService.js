import { supabase } from "../database/connection.js";
import { AppError } from "../errors/index.js";

const EMPTY = {};

export const settingsService = {
  async get(userId) {
    const { data, error } = await supabase
      .from("saved_settings")
      .select("settings")
      .eq("user_id", userId)
      .maybeSingle();
    if (error) throw AppError.internal(error.message);
    return data?.settings ?? EMPTY;
  },

  async patch(userId, patch) {
    const current = await this.get(userId);
    const merged = { ...current, ...patch };
    const { error } = await supabase
      .from("saved_settings")
      .upsert(
        { user_id: userId, settings: merged, updated_at: new Date().toISOString() },
        { onConflict: "user_id" }
      );
    if (error) throw AppError.internal(error.message);
    return merged;
  },
};

export default settingsService;
