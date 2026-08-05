import { Client } from 'pg';

const url = process.env.SUPABASE_DB_URL;
if (!url) {
  console.error('Missing SUPABASE_DB_URL');
  process.exit(1);
}

const client = new Client({ connectionString: url, ssl: { rejectUnauthorized: false } });
await client.connect();

const result = await client.query(`
  SELECT id, username, email, display_name, phone
  FROM public.profiles
  WHERE username IS NULL OR TRIM(username) = ''
`);
console.log('Profiles with null/empty username:', result.rowCount);
result.rows.forEach(r => {
  console.log(`  id=${r.id}, username=${r.username}, email=${r.email}, phone=${r.phone}, display_name=${r.display_name}`);
});

await client.end();
