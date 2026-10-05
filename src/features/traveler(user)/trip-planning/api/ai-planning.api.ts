import { axiosInstance } from "@/shared/api/axios";
import type { ChatMessage } from "../interfaces/ai-planning.interfaces";
import type {
  AIChatResponse,
  RestoreAIPlanningResponse,
  SendMessageResponse,
} from "../types/ai-planning.types";

export const sendMessage = async (
  messages: ChatMessage[],
  threadId: string | null,
): Promise<AIChatResponse> => {
  const latestMessage = messages[messages.length - 1];

  if (!latestMessage) {
    throw new Error("No message to send");
  }

  const response = await axiosInstance.post<SendMessageResponse>(
    "trip-planning/message",
    {
      message: latestMessage.content,
      ...(threadId ? { threadId } : {}),
    },
  );

  return response.data.data;
};

export const getPlanningState = async (
  threadId: string,
): Promise<RestoreAIPlanningResponse> => {
  const response = await axiosInstance.get<{
    success: boolean;
    message: string;
    data: RestoreAIPlanningResponse;
  }>(`trip-planning/trip/${threadId}`);

  return response.data.data;
};
