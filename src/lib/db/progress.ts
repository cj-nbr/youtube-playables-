import { supabase } from "../supabase/client.js";

export async function getGameProgress(userId: string, gameId: string, slot = "default") {
  const { data, error } = await supabase
    .from("game_progress")
    .select("*")
    .eq("user_id", userId)
    .eq("game_id", gameId)
    .eq("save_slot", slot)
    .single();
  if (error && error.code !== "PGRST116") throw error;
  return data;
}

export async function upsertGameProgress(userId: string, gameId: string, updates: Record<string, any>, slot = "default") {
  const { data, error } = await supabase
    .from("game_progress")
    .upsert({
      user_id: userId,
      game_id: gameId,
      save_slot: slot,
      ...updates,
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id,game_id,save_slot" })
    .select("*")
    .single();
  if (error) throw error;
  return data;
}

export async function deleteGameProgress(userId: string, gameId: string, slot = "default") {
  const { error } = await supabase
    .from("game_progress")
    .delete()
    .eq("user_id", userId)
    .eq("game_id", gameId)
    .eq("save_slot", slot);
  if (error) throw error;
}

export async function getAllGameProgress(userId: string) {
  const { data, error } = await supabase
    .from("game_progress")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return data;
}
