import { axiosInstance } from "@/shared/api/axios";
import type { GetMyTripsResponse, MyTrip } from "../types/trip.types";

export const myTripsApi = {
  async getTrips(
    search?: string,
    tripMode?: "solo" | "group",
  ): Promise<MyTrip[]> {
    const response = await axiosInstance.get<GetMyTripsResponse>(
      "/trip-planning/trips",
      {
        params: {
          ...(search?.trim() ? { search: search.trim() } : {}),

          ...(tripMode ? { tripMode } : {}),
        },
      },
    );

    return response.data.data;
  },
};
