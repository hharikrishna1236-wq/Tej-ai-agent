import { createClient } from "@/lib/supabase/server";

/** Verifies the session with Supabase on every request. Never trust the client for identity. */
export async function getAuthed() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;
  return { supabase, user: data.user };
}
