// One-off runner that applies the Supabase SQL migrations using a direct
// Postgres connection (SUPABASE_DB_URL). Supabase's JS client cannot run DDL,
// so we use `pg` here only for schema setup. Migrations are idempotent
// (IF NOT EXISTS / ON CONFLICT DO NOTHING) and run in filename order.
//
// Usage: SUPABASE_DB_URL=<postgres uri> node scripts/apply-migration.mjs
// Get the URI from Supabase Dashboard → Project Settings → Database →
// Connection string (use the DIRECT connection, port 5432, not the pooler).

import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "dotenv";
import { Client } from "pg";

config();

const url = process.env.SUPABASE_DB_URL;
if (!url) {
  console.error("Missing SUPABASE_DB_URL. Add it to backend/.env (direct Postgres URI, port 5432).");
  process.exit(1);
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const migrationsDir = path.resolve(__dirname, "..", "database", "migrations");

const files = readdirSync(migrationsDir)
  .filter((f) => f.endsWith(".sql"))
  .sort();

if (files.length === 0) {
  console.error("No SQL migration files found in", migrationsDir);
  process.exit(1);
}

const client = new Client({ connectionString: url, ssl: { rejectUnauthorized: false } });

try {
  await client.connect();
  for (const file of files) {
    const sql = readFileSync(path.join(migrationsDir, file), "utf8");
    console.log(`Applying ${file} ...`);
    await client.query(sql);
  }
  console.log("Migrations applied successfully.");
} catch (err) {
  console.error("Migration failed:", err.message);
  process.exit(1);
} finally {
  await client.end();
}
