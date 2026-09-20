import { axiosInstance } from "@/shared/api/axios";
import type { ChatMessage } from "../interfaces/ai-planning.interfaces";
import type { TripRequirements } from "../interfaces/trip.interfaces";
import type { RoutePlanningResult } from "../interfaces/route.interfaces";

export interface AIChatResponse {
  threadId: string;
  reply: string;
  requirements: TripRequirements;
  missingFields: string[];
  isComplete: boolean;
  canGenerateDraft: boolean;
  route: RoutePlanningResult | null;
}

interface SendMessageResponse {
  success: boolean;

  data: {
    threadId: string;
    reply: string;
    tripRequirements: TripRequirements;
    missingFields: string[];
    isComplete: boolean;
    canGenerateDraft: boolean;
    route: RoutePlanningResult | null;
  };
}

export const sendMessage = async (
  messages: ChatMessage[],
  threadId:string|null,
): Promise<AIChatResponse> => {
  const latestMessage = messages[messages.length - 1];

  if (!latestMessage) {
    throw new Error("No message to send");
  }

  const response = await axiosInstance.post<SendMessageResponse>(
    "trip-planning/message",
    {
      message: latestMessage.content,
      ...(threadId?{threadId}:{}),
    },
  );

  return {
    threadId: response.data.data.threadId,
    reply: response.data.data.reply,
    requirements: response.data.data.tripRequirements,
    missingFields: response.data.data.missingFields,
    isComplete: response.data.data.isComplete,
    canGenerateDraft: response.data.data.canGenerateDraft,
    route: response.data.data.route,
  };
};
