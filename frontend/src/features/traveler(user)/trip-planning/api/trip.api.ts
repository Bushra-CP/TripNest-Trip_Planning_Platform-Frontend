import { axiosInstance } from "@/shared/api/axios";
import { SERVER_ROUTES } from "@/shared/constants/routes.constants";
import type { TripApiResponse } from "../types/chat.types";

export const tripApi = {
  async getTripByThreadId(threadId: string): Promise<TripApiResponse> {
    const response = await axiosInstance.get<TripApiResponse>(
      SERVER_ROUTES.GET_TRIP_BY_THREAD_ID.replace(":threadId", threadId),
    );

    return response.data;
  },

  // Create a room - convert to group trip
  async convertToGroupTrip(threadId?: string): Promise<TripApiResponse> {
    const response = await axiosInstance.post<TripApiResponse>(
      SERVER_ROUTES.CONVERT_TO_GROUP_TRIP,
      threadId ? { threadId } : {},
    );

    return response.data;
  },
};
