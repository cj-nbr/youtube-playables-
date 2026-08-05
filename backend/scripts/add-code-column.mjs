import pg from "pg";
import dotenv from "dotenv";
import path from "node:path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const connectionString = process.env.SUPABASE_DB_URL;
const client = new pg.Client({ connectionString });

try {
  await client.connect();
  console.log("Adding code column to profiles table...");
  
  await client.query(`alter table public.profiles add column if not exists code text`);
  console.log("OK: added code column to profiles");
  
  await client.end();
} catch (err) {
  console.error("Migration failed:", err);
  process.exit(1);
}
