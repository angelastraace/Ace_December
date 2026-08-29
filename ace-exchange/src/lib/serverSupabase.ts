// src/lib/serverSupabase.ts
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!SUPABASE_URL) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL in environment");
}
if (!SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY in environment");
}

/**
 * createServerSupabaseClient
 * - Returns a Supabase client configured for server-side use (service role key).
 * - Use this only in server code (API routes, server components).
 */
export function createServerSupabaseClient(): SupabaseClient {
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      // server-side: do not persist browser session cookies here
    },
  });
}

/**
 * getServerSupabase
 * - Alias for legacy code that expected a different name.
 */
export const getServerSupabase = createServerSupabaseClient;
