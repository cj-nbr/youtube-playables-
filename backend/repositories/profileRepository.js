import { supabase } from "../database/connection.js";
import { AppError } from "../errors/index.js";
import { userRepository } from "./userRepository.js";

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
  const existing = await this.findByUserId(user_id);
  if (!existing) {
   const user = userRepository.findById(user_id);
   const username =
    fields.username ||
    user?.email?.split("@")[0] ||
    "user_" + String(user_id).slice(0, 8);
   const displayName =
    fields.display_name || user?.full_name || user?.username || username;

   const { data, error } = await supabase
    .from("profiles")
    .insert({
     id: user_id,
     username,
     display_name: displayName,
     email: user?.email || null,
     phone: user?.phone || null,
     ...fields,
     created_at: new Date().toISOString(),
     updated_at: new Date().toISOString(),
    })
    .select("*")
    .single();

   if (error) throw AppError.internal(error.message);
   return data;
  }

  const username =
   fields.username ||
   existing.username ||
   "user_" + String(user_id).slice(0, 8);
  const displayName =
   fields.display_name || existing.display_name || username;

  const { data, error } = await supabase
   .from("profiles")
   .upsert({
    id: user_id,
    username,
    display_name: displayName,
    ...fields,
    updated_at: new Date().toISOString(),
   }, {
    onConflict: "id",
   })
   .select("*")
   .single();
  if (error) throw AppError.internal(error.message);
  return data;
 },
};

export default profileRepository;

