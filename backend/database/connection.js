import { createClient } from "@supabase/supabase-js";
import config from "../config/index.js";
import logger from "../utilities/logger.js";

// Supabase is the single backend for auth, database, and user/game progress.
// The service-role client bypasses Row Level Security and is used for all
// trusted server-side operations. The anon client validates user-issued JWTs.

const { url, anonKey, serviceRoleKey } = config.supabase;

const configured = Boolean(url && anonKey && serviceRoleKey);

if (!configured) {
  logger.warn(
    "Supabase credentials missing (SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY). " +
      "Auth and persistence will fail until they are configured."
  );
}

const authOptions = {
  auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
};

// Fallback values keep the client constructible during local dev before env is set.
export const supabase = createClient(
  url || "http://localhost:54321",
  serviceRoleKey || "service-role-key",
  authOptions
);

export const supabaseAnon = createClient(
  url || "http://localhost:54321",
  anonKey || "anon-key",
  authOptions
);

/**
 * Validate a Supabase access token (JWT) and return the authenticated user,
 * or null when the token is missing, malformed, or expired.
 */
export async function verifyToken(token) {
  if (!token) return null;
  const { data, error } = await supabaseAnon.auth.getUser(token);
  if (error || !data?.user) return null;
  return data.user;
}

/** Establish connectivity. No-op teardown keeps call sites stable. */
export async function initDb() {
  if (!configured) return;
  const { error } = await supabase.from("profiles").select("id").limit(1);
  if (error && error.code !== "PGRST116") {
    logger.warn("Supabase connectivity check returned an error", { error: error.message });
  } else {
    logger.info("Supabase client initialised");
  }
}

export function closeDb() {
  // Supabase JS keeps no persistent server connection to close.
}

export default supabase;
