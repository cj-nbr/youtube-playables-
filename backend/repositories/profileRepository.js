import { supabase } from "../database/connection.js";
import { AppError } from "../errors/index.js";
import { profileRepository } from "./profileRepository.js"; // Reuse existing profile repo

export const profileRepository = {
  ...profileRepository,
  
  // Update to use the new users table structure
  async findByUserId(user_id) {
    // The profile is now stored in the users table directly via relationships
    // but we'll use postgresql's profile_data table for persistent storage
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user_id)
      .maybeSingle();
    if (error) throw AppError.internal(error.message);
    return data || null;
  },

  async upsert(user_id, fields) {
    // Use the profile table as planned
    const { data, error } = await supabase
      .from("profiles")
      .upsert({ id: user_id, ...fields, updated_at: new Date().toISOString() }, {
        onConflict: "id",
      })
      .select("*")
      .single();
    if (error) throw AppError.internal(error.message);
    return data;
  }
};

export default profileRepository;