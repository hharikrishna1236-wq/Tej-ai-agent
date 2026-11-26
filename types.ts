import type { LucideIcon } from "lucide-react";

export type Role = "user" | "assistant" | "system";
export type ThemeMode = "dark" | "light";
export type ViewId = "chat" | "agents" | "tools" | "settings";
export type AgentId = "general" | "research" | "coding" | "website";
export type ModelId = "fast" | "balanced" | "deep";

export interface Attachment {
  id: string;
  name: string;
  size: number;
}

export interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  createdAt: number;
  attachments?: Attachment[];
  /** True for static UI samples. These are never AI generated. */
  demo?: boolean;
}

/** Conversation list item. Messages are loaded separately when a chat is opened. */
export interface Conversation {
  id: string;
  title: string;
  agentId: AgentId;
  updatedAt: number;
  demo?: boolean;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string | null;
  role: "owner" | "admin" | "user";
}

export interface UserSettings {
  theme: ThemeMode;
  preferredModel: ModelId;
}

export interface Agent {
  id: AgentId;
  name: string;
  description: string;
  icon: LucideIcon;
}

export interface SuggestedPrompt {
  label: string;
  text: string;
  icon: LucideIcon;
}

export interface ToolInfo {
  name: string;
  description: string;
  icon: LucideIcon;
  availability: string;
}

export interface ModelOption {
  id: ModelId;
  label: string;
  description: string;
}
