import { NextResponse } from "next/server";
import type { ZodType } from "zod";

export function json<T>(data: T, status = 200) {
  return NextResponse.json(data, { status, headers: { "Cache-Control": "no-store" } });
}

export function fail(message: string, status = 400) {
  return json({ error: message }, status);
}

export function serverError(err: unknown) {
  console.error("[api]", err);
  return fail("Something went wrong. Please try again.", 500);
}

/** Requires application/json (which also blocks simple cross-site form posts) and validates with zod. */
export async function parseBody<T>(req: Request, schema: ZodType<T>): Promise<{ data: T } | { response: NextResponse }> {
  const type = req.headers.get("content-type") ?? "";
  if (!type.includes("application/json")) return { response: fail("Content-Type must be application/json.", 415) };
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return { response: fail("Invalid JSON body.") };
  }
  const parsed = schema.safeParse(raw);
  if (!parsed.success) return { response: fail(parsed.error.issues[0]?.message ?? "Invalid input.", 422) };
  return { data: parsed.data };
}
