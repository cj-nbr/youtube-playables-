import { supabase } from "../database/connection.js";
import { AppError } from "../errors/index.js";

export const profileRepository = {
  async findByUserId(user_id) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user_id)
      .maybeSingle();
    if (error) throw AppError.internal(error.message);
    return data || null;
  },

  async upsert(user_id, fields) {
    const { data, error } = await supabase
      .from("profiles")
      .upsert({ id: user_id, ...fields, updated_at: new Date().toISOString() }, {
        onConflict: "id",
      })
      .select("*")
      .single();
    if (error) throw AppError.internal(error.message);
    return data;
  },

  // Note: low-contention read-modify-write. Supabase/PostgREST has no atomic
  // increment helper, so we fetch then update.
  async increment(user_id, field, by = 1) {
    const current = await this.findByUserId(user_id);
    const val = (current?.[field] || 0) + by;
    await supabase
      .from("profiles")
      .update({ [field]: val, updated_at: new Date().toISOString() })
      .eq("id", user_id);
    return val;
  },

  async setData(user_id, key, value) {
    const { error } = await supabase
      .from("profile_data")
      .upsert(
        { user_id, key, value, updated_at: new Date().toISOString() },
        { onConflict: "user_id,key" }
      );
    if (error) throw AppError.internal(error.message);
  },

  async getData(user_id, key) {
    const { data, error } = await supabase
      .from("profile_data")
      .select("value")
      .eq("user_id", user_id)
      .eq("key", key)
      .maybeSingle();
    if (error) throw AppError.internal(error.message);
    return data ? data.value : null;
  },

  async allData(user_id) {
    const { data, error } = await supabase
      .from("profile_data")
      .select("key, value")
      .eq("user_id", user_id);
    if (error) throw AppError.internal(error.message);
    const out = {};
    for (const r of data || []) out[r.key] = r.value;
    return out;
  },
};

export default profileRepository;
