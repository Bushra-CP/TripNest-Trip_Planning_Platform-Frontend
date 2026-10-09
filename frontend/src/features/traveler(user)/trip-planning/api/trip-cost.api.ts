import { axiosInstance } from "@/shared/api/axios";

import type { TripCostResponse } from "../types/trip-cost.types";

export const tripCostApi = {
  getTripVehicleCosts: async (tripId: string): Promise<TripCostResponse> => {
    const response = await axiosInstance.get<{
      success: boolean;
      message: string;
      data: TripCostResponse;
    }>(`/trip-planning/trip-vehicles/${tripId}/costs`);

    return response.data.data;
  },
};
