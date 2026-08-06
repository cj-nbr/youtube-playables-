import { supabase } from "../database/connection.js";
import { AppError } from "../errors/index.js";

export const notificationService = {
 async create(userId, { title, body, type = "info", metadata = {} }) {
  const { data, error } = await supabase
   .from("notifications")
   .insert({ user_id: userId, title, body, type, metadata })
   .select("*")
   .single();
  if (error) throw AppError.internal(error.message);
  return data;
 },

 async getUserNotifications(userId, { limit = 20, unreadOnly = false } = {}) {
  let query = supabase
   .from("notifications")
   .select("*")
   .eq("user_id", userId)
   .order("created_at", { ascending: false })
   .limit(limit);
  if (unreadOnly) query = query.eq("is_read", false);
  const { data, error } = await query;
  if (error) throw AppError.internal(error.message);
  return data || [];
 },

 async markAsRead(notificationId, userId) {
  const { data, error } = await supabase
   .from("notifications")
   .update({ is_read: true, read_at: new Date().toISOString() })
   .eq("id", notificationId)
   .eq("user_id", userId)
   .select("*")
   .single();
  if (error) throw AppError.internal(error.message);
  return data;
 },

 async markAllAsRead(userId) {
  const { error } = await supabase
   .from("notifications")
   .update({ is_read: true, read_at: new Date().toISOString() })
   .eq("user_id", userId)
   .eq("is_read", false);
  if (error) throw AppError.internal(error.message);
  return { success: true };
 },

 async deleteNotification(notificationId, userId) {
  const { error } = await supabase
   .from("notifications")
   .delete()
   .eq("id", notificationId)
   .eq("user_id", userId);
  if (error) throw AppError.internal(error.message);
  return { success: true };
 },
};

export default notificationService;
