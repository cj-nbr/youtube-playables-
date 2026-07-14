import { supabase } from "../supabase/client.js";

export async function getGameSave(userId: string, gameId: string, slot = "default") {
  const { data, error } = await supabase
    .from("game_saves")
    .select("*")
    .eq("user_id", userId)
    .eq("game_id", gameId)
    .eq("slot", slot)
    .single();
  if (error && error.code !== "PGRST116") throw error;
  return data;
}

export async function saveGameData(userId: string, gameId: string, data: Record<string, any>, slot = "default") {
  const { data: result, error } = await supabase
    .from("game_saves")
    .upsert({
      user_id: userId,
      game_id: gameId,
      slot,
      data,
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id,game_id,slot" })
    .select("*")
    .single();
  if (error) throw error;
  return result;
}

export async function deleteGameSave(userId: string, gameId: string, slot = "default") {
  const { error } = await supabase
    .from("game_saves")
    .delete()
    .eq("user_id", userId)
    .eq("game_id", gameId)
    .eq("slot", slot);
  if (error) throw error;
}

export async function getAllGameSaves(userId: string, gameId: string) {
  const { data, error } = await supabase
    .from("game_saves")
    .select("*")
    .eq("user_id", userId)
    .eq("game_id", gameId)
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return data;
}
