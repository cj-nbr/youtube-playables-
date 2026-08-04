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
};

export default profileRepository;
