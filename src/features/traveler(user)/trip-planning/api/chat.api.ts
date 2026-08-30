import { axiosInstance } from "@/shared/api/axios";
import { SERVER_ROUTES } from "@/shared/constants/routes.constants";
import type { CreateRoomResponse, MessageResponse } from "../types/chat.types";

export const chatApi = {
  // Create a room
  async createRoom(): Promise<CreateRoomResponse> {
    const response = await axiosInstance.post<CreateRoomResponse>(
      SERVER_ROUTES.CREATE_ROOM,
    );

    return response.data;
  },

  // Get room information
  async getRoom(roomId: string) {
    const response = await axiosInstance.get(
      SERVER_ROUTES.JOIN_ROOM.replace(":roomId", roomId),
    );

    return response.data;
  },

  // Get previous messages
  async getMessages(roomId: string): Promise<MessageResponse[]> {
    const response = await axiosInstance.get<MessageResponse[]>(
      SERVER_ROUTES.GET_MESSAGES.replace(":roomId", roomId),
    );

    return response.data;
  },
};
