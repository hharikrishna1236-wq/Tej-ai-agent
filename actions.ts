"use server";

import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { forgotSchema, resetSchema, signInSchema, signUpSchema } from "@/lib/validation";

export type ActionResult = { ok: true; message?: string } | { ok: false; error: string };

async function siteUrl(): Promise<string> {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  const h = await headers();
  return h.get("origin") ?? "http://localhost:3000";
}

const firstIssue = (e: { issues: { message: string }[] }) => e.issues[0]?.message ?? "Invalid input.";

export async function signUpAction(input: { fullName: string; email: string; password: string }): Promise<ActionResult> {
  const parsed = signUpSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: firstIssue(parsed.error) };
  const { fullName, email, password } = parsed.data;

  const allowed = (process.env.TEJ_ALLOWED_EMAILS ?? "").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
  if (allowed.length > 0 && !allowed.includes(email)) return { ok: false, error: "Sign up is not open for this email." };

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName }, emailRedirectTo: `${await siteUrl()}/auth/callback?next=/chat` },
  });
  if (error) return { ok: false, error: "Could not create the account. Try a different email or password." };
  if (!data.session) return { ok: true, message: "Check your email to confirm your account, then log in." };
  return { ok: true };
}

export async function signInAction(input: { email: string; password: string }): Promise<ActionResult> {
  const parsed = signInSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: firstIssue(parsed.error) };
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) {
    if (/confirm/i.test(error.message)) return { ok: false, error: "Please confirm your email first, then log in." };
    return { ok: false, error: "Invalid email or password." };
  }
  return { ok: true };
}

export async function signOutAction(): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) return { ok: false, error: "Could not sign out. Please try again." };
  return { ok: true };
}

export async function forgotPasswordAction(input: { email: string }): Promise<ActionResult> {
  const parsed = forgotSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: firstIssue(parsed.error) };
  const supabase = await createClient();
  await supabase.auth.resetPasswordForEmail(parsed.data.email, { redirectTo: `${await siteUrl()}/auth/callback?next=/reset-password` });
  // Same answer whether or not the email exists (prevents account enumeration).
  return { ok: true, message: "If an account exists for that email, a reset link is on its way." };
}

export async function resetPasswordAction(input: { password: string }): Promise<ActionResult> {
  const parsed = resetSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: firstIssue(parsed.error) };
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) return { ok: false, error: "Your reset link expired. Request a new one." };
  const { error } = await supabase.auth.updateUser({ password: parsed.data.password });
  if (error) return { ok: false, error: "Could not update the password. Try a different one." };
  return { ok: true, message: "Password updated." };
}
