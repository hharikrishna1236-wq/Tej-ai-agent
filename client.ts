import { createBrowserClient } from "@supabase/ssr";

/** Browser client. Uses only the public key; data access is limited by RLS. */
export function createClient() {
  // process.env.NEXT_PUBLIC_* must be referenced literally so Next.js can inline them.
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) throw new Error("Supabase environment variables are missing.");
  return createBrowserClient(url, anonKey);
}
