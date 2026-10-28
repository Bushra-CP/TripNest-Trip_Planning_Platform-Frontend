import type { RagSource } from "../types/ai-planning.types";

export type MessageRole = "user" | "assistant";

export interface ChatMessage {
  id: string;

  role: MessageRole;

  content: string;

  ragSources?: RagSource[];
}
