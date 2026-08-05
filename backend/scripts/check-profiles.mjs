import pg from "pg";
import dotenv from "dotenv";
import path from "node:path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const connectionString = process.env.SUPABASE_DB_URL;
const client = new pg.Client({ connectionString });

try {
  await client.connect();
  
  const columns = await client.query(`
    SELECT column_name, data_type, is_nullable
    FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'profiles'
    ORDER BY ordinal_position;
  `);
  console.log("profiles columns:", columns.rows.map(r => `${r.column_name} (${r.data_type}, nullable=${r.is_nullable})`).join(", "));
  
} catch (err) {
  console.error("Query failed:", err);
} finally {
  await client.end();
}
