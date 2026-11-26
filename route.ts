import { getAuthed } from "@/lib/api/auth";
import { fail, json, parseBody, serverError } from "@/lib/api/http";
import { toConversation, toMessage } from "@/lib/api/mappers";
import { createConversationSchema, deriveTitle } from "@/lib/validation";

export async function GET() {
  const auth = await getAuthed();
  if (!auth) return fail("Not signed in.", 401);
  const { data, error } = await auth.supabase
    .from("conversations")
    .select("id,title,agent_type,updated_at")
    .order("updated_at", { ascending: false })
    .limit(100);
  if (error) return serverError(error);
  return json({ conversations: (data ?? []).map(toConversation) });
}

/** Creates a conversation together with its first user message. Rolls back the conversation if the message fails. */
export async function POST(req: Request) {
  const auth = await getAuthed();
  if (!auth) return fail("Not signed in.", 401);
  const body = await parseBody(req, createConversationSchema);
  if ("response" in body) return body.response;

  const { supabase, user } = auth;
  const { data: conv, error: convError } = await supabase
    .from("conversations")
    .insert({ user_id: user.id, title: deriveTitle(body.data.firstMessage), agent_type: body.data.agentType })
    .select("id,title,agent_type,updated_at")
    .single();
  if (convError || !conv) return serverError(convError);

  const { data: msg, error: msgError } = await supabase
    .from("messages")
    .insert({ conversation_id: conv.id, user_id: user.id, role: "user", content: body.data.firstMessage })
    .select("id,role,content,created_at")
    .single();
  if (msgError || !msg) {
    await supabase.from("conversations").delete().eq("id", conv.id);
    return serverError(msgError);
  }
  return json({ conversation: toConversation(conv), message: toMessage(msg) }, 201);
}
