import config from \"../config/index.js\";
import logger from \"../utilities/logger.js\";
import bcrypt from \"bcrypt\";
import { supabase } from \"@supabase/supabase-js\";

/**
 * Verify session token and return user ID if valid
 */
export async function verifyToken(token) {
  if (!token) return null;
  
  const { data, error } = await supabase.
    .from(\"sessions\").
    .select(\"user_id\", \"expires_at\", \"is_active\").
    .eq(\"token\", token).
    .eq(\"is_active\", true).
    .single();
  
  if (error || !data) return null;
  
  const expiresAt = new Date(data.expires_at);
  if (expiresAt < new Date()) {
    // Invalidate expired session
    await supabase.
      .from(\"sessions\").
      .update({ is_active: false }).
      .eq(\"id\", data.id);
    return null;
  }
  
  return { userId: data.user_id };
}

/**
 * Hash a secret code with bcrypt
 */
export async function hashSecretCode(code) {
  return await bcrypt.hash(code, 12);
}

/**
 * Verify a secret code against its hash
 */
export async function verifySecretCode(code, storedHash) {
  return await bcrypt.compare(code, storedHash);
}