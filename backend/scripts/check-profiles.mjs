import { Client } from 'pg';

const url = process.env.SUPABASE_DB_URL;
if (!url) {
  console.error('Missing SUPABASE_DB_URL');
  process.exit(1);
}

const client = new Client({ connectionString: url, ssl: { rejectUnauthorized: false } });

await client.connect();

// Check profiles table schema
const schemaResult = await client.query(`
  SELECT column_name, is_nullable, column_default
  FROM information_schema.columns
  WHERE table_schema = 'public' AND table_name = 'profiles'
  ORDER BY ordinal_position;
`);
console.log('Profiles table schema:');
schemaResult.rows.forEach(row => {
  console.log(`  ${row.column_name}: nullable=${row.is_nullable}, default=${row.column_default}`);
});

// Check for profiles with null username
const nullUsernameResult = await client.query(`
  SELECT id, username, email, display_name
  FROM public.profiles
  WHERE username IS NULL OR TRIM(username) = '';
`);
console.log('\nProfiles with null/empty username:', nullUsernameResult.rowCount);
nullUsernameResult.rows.forEach(row => {
  console.log(`  id=${row.id}, username=${row.username}, email=${row.email}, display_name=${row.display_name}`);
});

// Check auth.users for phone-only users
const phoneUsersResult = await client.query(`
  SELECT id, email, phone, raw_user_meta_data
  FROM auth.users
  WHERE phone IS NOT NULL AND phone != ''
  LIMIT 5;
`);
console.log('\nPhone users in auth.users:', phoneUsersResult.rowCount);
phoneUsersResult.rows.forEach(row => {
  console.log(`  id=${row.id}, email=${row.email}, phone=${row.phone}`);
});

await client.end();
