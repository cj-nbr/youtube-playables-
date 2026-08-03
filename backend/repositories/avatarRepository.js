import { supabase } from "../database/connection.js";
import { AppError } from "../errors/index.js";

export const avatarRepository = {
  async getAllAvatars() {
    const { data, error } = await supabase
      .from("avatars")
      .select("*")
      .order("category");
    if (error) throw AppError.internal(error.message);
    return data || [];
  },

  async getAvatarByFilename(filename) {
    const { data, error } = await supabase
      .from("avatars")
      .select("*")
      .eq("filename", filename)
      .maybeSingle();
    if (error) throw AppError.internal(error.message);
    return data || null;
  },

  async getFreeAvatars() {
    const { data, error } = await supabase
      .from("avatars")
      .select("*")
      .eq("is_premium", false)
      .order("category");
    if (error) throw AppError.internal(error.message);
    return data || [];
  },

  async seedAvatars() {
    const avatars = [
      { filename: "avatar-blue.svg", category: "default", is_premium: false },
      { filename: "avatar-purple.svg", category: "default", is_premium: false },
      { filename: "avatar-red.svg", category: "default", is_premium: false },
      { filename: "avatar-orange.svg", category: "default", is_premium: false },
      { filename: "avatar-teal.svg", category: "default", is_premium: false },
      { filename: "avatar-green.svg", category: "default", is_premium: false },
      { filename: "avatar-yellow.svg", category: "default", is_premium: false },
      { filename: "avatar-lime.svg", category: "default", is_premium: false },
      { filename: "avatar-magenta.svg", category: "default", is_premium: false },
      { filename: "avatar-emerald.svg", category: "default", is_premium: false },
      { filename: "avatar-navy.svg", category: "default", is_premium: false },
      { filename: "avatar-crimson.svg", category: "default", is_premium: false },
      { filename: "avatar-olive.svg", category: "default", is_premium: false },
      { filename: "avatar-gold.svg", category: "default", is_premium: false },
      { filename: "avatar-sky.svg", category: "default", is_premium: false },
      { filename: "avatar-violet.svg", category: "default", is_premium: false },
      { filename: "avatar-pink.svg", category: "default", is_premium: false },
      { filename: "avatar-cyan.svg", category: "default", is_premium: false },
      { filename: "avatar-lightblue.svg", category: "default", is_premium: false },
      { filename: "avatar-maroon.svg", category: "default", is_premium: false },
    ];

    const { error } = await supabase
      .from("avatars")
      .upsert(avatars, { onConflict: "filename" });
    if (error) throw AppError.internal(error.message);
    return { success: true };
  },
};

export default avatarRepository;