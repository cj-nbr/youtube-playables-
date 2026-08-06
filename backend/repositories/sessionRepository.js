import { supabase } from "../database/connection.js";
import { AppError } from "../errors/index.js";

export const sessionRepository = {
 async findByToken(token) {
  const { data, error } = await supabase
   .from("sessions")
   .select("*")
   .eq("token", token)
   .maybeSingle();
  if (error) throw AppError.internal(error.message);
  return data || null;
 },

 async create(userId, token) {
  const { data, error } = await supabase
   .from("sessions")
   .insert({ user_id: userId, token, expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() })
   .select("*")
   .single();
  if (error) throw AppError.internal(error.message);
  return data;
 },

 async revoke(token) {
  const { error } = await supabase
   .from("sessions")
   .update({ is_active: false, revoked_at: new Date().toISOString() })
   .eq("token", token);
  if (error) throw AppError.internal(error.message);
 },

 async revokeAllForUser(userId) {
  const { error } = await supabase
   .from("sessions")
   .update({ is_active: false, revoked_at: new Date().toISOString() })
   .eq("user_id", userId);
  if (error) throw AppError.internal(error.message);
 },

 async cleanupExpired() {
  const { error } = await supabase
   .from("sessions")
   .delete()
   .lt("expires_at", new Date().toISOString())
   .eq("is_active", true);
  if (error) throw AppError.internal(error.message);
 },
};

export default sessionRepository;
