import { getAuthed } from "@/lib/api/auth";
import { fail, json, parseBody, serverError } from "@/lib/api/http";
import { toProfile } from "@/lib/api/mappers";
import { updateProfileSchema } from "@/lib/validation";

const COLUMNS = "id,email,full_name,avatar_url,role";

export async function GET() {
  const auth = await getAuthed();
  if (!auth) return fail("Not signed in.", 401);
  const { data, error } = await auth.supabase.from("profiles").select(COLUMNS).eq("id", auth.user.id).maybeSingle();
  if (error) return serverError(error);
  return json({ profile: toProfile(data, auth.user) });
}

export async function PATCH(req: Request) {
  const auth = await getAuthed();
  if (!auth) return fail("Not signed in.", 401);
  const body = await parseBody(req, updateProfileSchema);
  if ("response" in body) return body.response;

  const { data, error } = await auth.supabase
    .from("profiles")
    .update({ full_name: body.data.fullName })
    .eq("id", auth.user.id)
    .select(COLUMNS)
    .maybeSingle();
  if (error) return serverError(error);
  if (!data) return fail("Profile not found. Did you run the SQL migration?", 404);
  return json({ profile: toProfile(data, auth.user) });
}
