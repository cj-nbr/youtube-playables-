import { Client } from 'pg';

const url = process.env.SUPABASE_DB_URL;
if (!url) {
  console.error('Missing SUPABASE_DB_URL');
  process.exit(1);
}

const client = new Client({ connectionString: url, ssl: { rejectUnauthorized: false } });

await client.connect();
const result = await client.query(`
  UPDATE public.profiles
  SET username = COALESCE(
    NULLIF(TRIM(username), ''),
    CASE WHEN email IS NOT NULL THEN split_part(email, '@', 1) ELSE 'user_' || substr(id::text, 1, 8) END
  )
  WHERE username IS NULL OR TRIM(username) = '';
`);

console.log('Fixed', result.rowCount, 'profiles with null username');
await client.end();
