import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function bool(value, fallback = false) {
  if (value === undefined) return fallback;
  return ["1", "true", "yes", "on"].includes(String(value).toLowerCase());
}

function num(value, fallback) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

export const config = {
  env: process.env.NODE_ENV || "development",
  isProduction: (process.env.NODE_ENV || "development") === "production",
  port: num(process.env.PORT, 4000),
  corsOrigin: (process.env.CORS_ORIGIN || "http://localhost:4321")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
  session: {
    secret: process.env.SESSION_SECRET || "dev-session-secret",
    ttlHours: num(process.env.SESSION_TTL_HOURS, 24),
    rememberMeTtlDays: num(process.env.REMEMBER_ME_TTL_DAYS, 30),
  },
  rateLimit: {
    windowMs: num(process.env.RATE_LIMIT_WINDOW_MS, 15 * 60 * 1000),
    max: num(process.env.RATE_LIMIT_MAX, 100),
    authMax: num(process.env.AUTH_RATE_LIMIT_MAX, 10),
  },
  supabase: {
    url: process.env.SUPABASE_URL || "",
    anonKey: process.env.SUPABASE_ANON_KEY || "",
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  },
  publicApiUrl: process.env.PUBLIC_API_URL || "http://localhost:4000",
};

export default config;
