import type { AgentId, ChatMessage, Conversation, ModelId, ThemeMode, UserProfile, UserSettings } from "@/lib/dashboard/types";

export interface ConversationRow { id: string; title: string; agent_type: string; updated_at: string }
export interface MessageRow { id: string; role: string; content: string; created_at: string }
export interface ProfileRow { id: string; email: string | null; full_name: string | null; avatar_url: string | null; role: string }
export interface SettingsRow { theme: string; preferred_model: string }

export const toConversation = (r: ConversationRow): Conversation => ({
  id: r.id,
  title: r.title,
  agentId: r.agent_type as AgentId,
  updatedAt: Date.parse(r.updated_at),
});

export const toMessage = (r: MessageRow): ChatMessage => ({
  id: r.id,
  role: r.role as ChatMessage["role"],
  content: r.content,
  createdAt: Date.parse(r.created_at),
});

export const toProfile = (r: ProfileRow | null, fallback: { id: string; email?: string | null }): UserProfile => ({
  id: r?.id ?? fallback.id,
  email: r?.email ?? fallback.email ?? "",
  fullName: r?.full_name ?? (fallback.email ? fallback.email.split("@")[0] : "User"),
  avatarUrl: r?.avatar_url ?? null,
  role: (r?.role as UserProfile["role"]) ?? "user",
});

export const toSettings = (r: SettingsRow | null): UserSettings => ({
  theme: (r?.theme === "light" ? "light" : "dark") as ThemeMode,
  preferredModel: (["fast", "balanced", "deep"].includes(r?.preferred_model ?? "") ? r!.preferred_model : "balanced") as ModelId,
});
