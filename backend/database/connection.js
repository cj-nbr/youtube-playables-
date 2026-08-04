import { createClient } from "@supabase/supabase-js";
import config from "../config/index.js";
import bcrypt from "bcrypt";

export const supabase = createClient(
  config.supabase.url,
  config.supabase.serviceRoleKey || config.supabase.anonKey,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  }
);

export async function initDb() {
  // Supabase client is initialized at module load time.
}

export function closeDb() {
  // No persistent connection to close for Supabase client.
}

export async function verifyToken(token) {
  if (!token) return null;

  const { data, error } = await supabase
    .from("sessions")
    .select("user_id", "expires_at", "is_active")
    .eq("token", token)
    .eq("is_active", true)
    .single();

  if (error || !data) return null;

  const expiresAt = new Date(data.expires_at);
  if (expiresAt < new Date()) {
    await supabase
      .from("sessions")
      .update({ is_active: false })
      .eq("id", data.id);
    return null;
  }

  return { userId: data.user_id };
}

export async function hashSecretCode(code) {
  return await bcrypt.hash(code, 12);
}

export async function verifySecretCode(code, storedHash) {
  return await bcrypt.compare(code, storedHash);
}
