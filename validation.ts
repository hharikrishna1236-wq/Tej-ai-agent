import { z } from "zod";

export const emailSchema = z.string().trim().toLowerCase().email("Enter a valid email address.").max(254);
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .max(72, "Password must be at most 72 characters.")
  .regex(/[A-Za-z]/, "Password must include a letter.")
  .regex(/[0-9]/, "Password must include a number.");
export const fullNameSchema = z.string().trim().min(1, "Name is required.").max(80, "Name is too long.");

export const uuidSchema = z.string().uuid();
export const agentTypeSchema = z.enum(["general", "research", "coding", "website"]);
export const contentSchema = z.string().trim().min(1, "Message is empty.").max(4000, "Message is too long (max 4000).");
export const titleSchema = z.string().trim().min(1, "Title is required.").max(80, "Title is too long (max 80).");

export const createConversationSchema = z.object({ firstMessage: contentSchema, agentType: agentTypeSchema });
export const renameConversationSchema = z.object({ title: titleSchema });
export const createMessageSchema = z.object({ content: contentSchema });
export const updateProfileSchema = z.object({ fullName: fullNameSchema });
export const updateSettingsSchema = z
  .object({ theme: z.enum(["dark", "light"]).optional(), preferredModel: z.enum(["fast", "balanced", "deep"]).optional() })
  .refine((v) => v.theme !== undefined || v.preferredModel !== undefined, "Nothing to update.");

export const signUpSchema = z.object({ fullName: fullNameSchema, email: emailSchema, password: passwordSchema });
export const signInSchema = z.object({ email: emailSchema, password: z.string().min(1, "Enter your password.").max(72) });
export const forgotSchema = z.object({ email: emailSchema });
export const resetSchema = z.object({ password: passwordSchema });

export function deriveTitle(text: string): string {
  const oneLine = text.replace(/\s+/g, " ").trim();
  return oneLine.length <= 48 ? oneLine : `${oneLine.slice(0, 47)}…`;
}

/** Only allow same-site relative redirects. */
export function safeNext(next: string | null | undefined, fallback = "/chat"): string {
  if (!next || !next.startsWith("/") || next.startsWith("//") || next.includes("\\")) return fallback;
  return next;
}
