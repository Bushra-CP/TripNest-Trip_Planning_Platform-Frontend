import { axiosInstance } from "@/shared/api/axios";
import { SERVER_ROUTES } from "@/shared/constants/routes.constants";
import type { MessageResponseApiResponse } from "../types/chat.types";

export const chatApi = {
  // Get room information
  async getRoom(roomId: string) {
    const response = await axiosInstance.get(
      SERVER_ROUTES.JOIN_ROOM.replace(":roomId", roomId),
    );

    return response.data;
  },

  // Get previous messages
  async getMessages(roomId: string): Promise<MessageResponseApiResponse> {
    const response = await axiosInstance.get<MessageResponseApiResponse>(
      SERVER_ROUTES.GET_MESSAGES.replace(":roomId", roomId),
    );

    return response.data;
  },
};
