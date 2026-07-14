// Public Supabase credentials. These are safe to embed in the client bundle
// (the anon key is designed to be public). They are read from build-time env
// vars (PUBLIC_SUPABASE_URL / PUBLIC_SUPABASE_ANON_KEY) when present, with
// these fallbacks so a deploy works even if the host has no env vars set.
export const SUPABASE_URL =
  import.meta.env.PUBLIC_SUPABASE_URL ||
  "https://irugvngzaxdpqvktfgfv.supabase.co";

export const SUPABASE_ANON_KEY =
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlydWd2bmd6YXhkcHF2a3RmZ2Z2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM5NjA3ODgsImV4cCI6MjA5OTUzNjc4OH0.ZeVpJOw6SaxpW3R6XKw03xKbyCZ3dMH5htWiIXQVhzg";
