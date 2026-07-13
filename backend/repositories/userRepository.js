import { supabase } from "../database/connection.js";
import { AppError } from "../errors/index.js";

// User accounts live in Supabase Auth; the `profiles` table mirrors the
// account + public profile fields keyed by the auth user id (uuid).

export const userRepository = {
  async findById(id) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error && error.code !== "PGRST116") throw AppError.internal(error.message);
    return data || null;
  },

  async findByEmail(email) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("email", email)
      .maybeSingle();
    if (error) throw AppError.internal(error.message);
    return data || null;
  },

  async findByUsername(username) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("username", username)
      .maybeSingle();
    if (error) throw AppError.internal(error.message);
    return data || null;
  },

  async findByLogin(login) {
    return (await this.findByEmail(login)) || (await this.findByUsername(login));
  },

  async emailExists(email) {
    const { count, error } = await supabase
      .from("profiles")
      .select("id", { count: "exact", head: true })
      .eq("email", email);
    if (error) throw AppError.internal(error.message);
    return (count || 0) > 0;
  },

  async usernameExists(username) {
    const { count, error } = await supabase
      .from("profiles")
      .select("id", { count: "exact", head: true })
      .eq("username", username);
    if (error) throw AppError.internal(error.message);
    return (count || 0) > 0;
  },

  async create({ id, username, email, role = "user", status = "active", email_verified = false }) {
    const { data, error } = await supabase
      .from("profiles")
      .insert({ id, username, email, role, status, email_verified })
      .select("*")
      .single();
    if (error) throw AppError.conflict(error.message);
    return data;
  },

  async updateLastLogin(id) {
    await supabase
      .from("profiles")
      .update({ last_login: new Date().toISOString(), updated_at: new Date().toISOString() })
      .eq("id", id);
  },

  async updateLastPlayed(id) {
    await supabase
      .from("profiles")
      .update({ last_played: new Date().toISOString() })
      .eq("id", id);
  },

  async setStatus(id, status) {
    await supabase
      .from("profiles")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id);
  },
};

export default userRepository;
