import { supabase } from "../supabase/client.js";

export async function getUserStats(userId: string) {
  const { data, error } = await supabase
    .from("user_stats")
    .select("*")
    .eq("user_id", userId)
    .single();
  if (error && error.code !== "PGRST116") throw error;
  return data;
}

export async function updateUserStats(userId: string, updates: Record<string, any>) {
  const { data, error } = await supabase
    .from("user_stats")
    .upsert({
      user_id: userId,
      ...updates,
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id" })
    .select("*")
    .single();
  if (error) throw error;
  return data;
}

export async function incrementUserStat(userId: string, field: string, amount = 1) {
  const { data, error } = await supabase.rpc("increment_stat", {
    p_user_id: userId,
    p_field: field,
    p_amount: amount,
  });
  if (error) throw error;
  return data;
}
