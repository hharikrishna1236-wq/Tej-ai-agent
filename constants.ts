import {
  Bot,
  Briefcase,
  Bug,
  FileSearch,
  Globe,
  Lightbulb,
  Search,
  Sparkles,
  Terminal,
  Users,
  Workflow,
} from "lucide-react";
import type { Agent, ModelOption, SuggestedPrompt, ToolInfo } from "./types";

export const MAX_MESSAGE_LENGTH = 4000;
export const MAX_ATTACHMENTS = 5;
export const MAX_FILE_BYTES = 10 * 1024 * 1024;

export const AGENTS: Agent[] = [
  { id: "general", name: "TEJ AI", description: "General personal assistant for everyday work.", icon: Sparkles },
  { id: "research", name: "Business Research", description: "Market, competitor and idea research.", icon: Search },
  { id: "coding", name: "Coding Assistant", description: "Write, review and debug code.", icon: Terminal },
  { id: "website", name: "Website Assistant", description: "Plan and build client websites.", icon: Globe },
];

export const SUGGESTED_PROMPTS: SuggestedPrompt[] = [
  { label: "Build a website", text: "Build a website for ", icon: Globe },
  { label: "Research a business idea", text: "Research this business idea: ", icon: Lightbulb },
  { label: "Fix my code", text: "Fix my code. Here is the code and the error:\n", icon: Bug },
  { label: "Find potential clients", text: "Help me find potential clients for web development in ", icon: Users },
  { label: "Explain a technical concept", text: "Explain this technical concept simply: ", icon: Briefcase },
];

export const MODELS: ModelOption[] = [
  { id: "fast", label: "Fast", description: "Quick answers" },
  { id: "balanced", label: "Balanced", description: "Default quality and speed" },
  { id: "deep", label: "Deep reasoning", description: "Harder problems" },
];

export const TOOLS: ToolInfo[] = [
  { name: "Web search", description: "Look up current information online.", icon: Search, availability: "Planned" },
  { name: "File analysis", description: "Read and summarize uploaded files.", icon: FileSearch, availability: "Planned" },
  { name: "Task automation", description: "Run multi-step tasks with your approval.", icon: Workflow, availability: "Planned" },
  { name: "Customer support agent", description: "Chatbot for tejwebstudio.online.", icon: Bot, availability: "Planned" },
];

export const QUICK_PROMPTS: { label: string; text: string }[] = [
  { label: "Website brief", text: "Write a website brief for a client. Business type: " },
  { label: "Code review", text: "Review this code for bugs and improvements:\n" },
  { label: "Competitor research", text: "Compare competitors for this business: " },
];

export const DEMO_USER = "Show me how a code reply will look.";
export const DEMO_REPLY = [
  "UI sample only. This text is static and was not written by an AI.",
  "",
  "```tsx",
  "export function Hello({ name }: { name: string }) {",
  "  return <h1>Hello, {name}</h1>;",
  "}",
  "```",
].join("\n");
