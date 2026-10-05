import { axiosInstance } from "@/shared/api/axios";
import type {
  AddVehicleToTripPayload,
  FinalizeVehiclePayload,
  RemoveVotePayload,
  RemoveVehicleFromTripPayload,
  TripVehicleApiResponse,
  TripVehiclesApiResponse,
  VoteForVehiclePayload,
  FinalTripVehicleApiResponse,
  RemoveVehicleApiResponse,
  UnfinalizeVehiclePayload,
} from "../types/trip-vehicle.types";

export const tripVehicleApi = {
  addVehicleToTrip: async (
    payload: AddVehicleToTripPayload,
  ): Promise<TripVehicleApiResponse> => {
    const response = await axiosInstance.post<TripVehicleApiResponse>(
      "/trip-planning/trip-vehicles",
      payload,
    );

    return response.data;
  },

  getTripVehicles: async (tripId: string): Promise<TripVehiclesApiResponse> => {
    const response = await axiosInstance.get<TripVehiclesApiResponse>(
      `/trip-planning/trip-vehicles/${tripId}`,
    );

    return response.data;
  },

  getFinalSelectedVehicle: async (
    tripId: string,
  ): Promise<FinalTripVehicleApiResponse> => {
    const response = await axiosInstance.get<FinalTripVehicleApiResponse>(
      `/trip-planning/trip-vehicles/${tripId}/final`,
    );

    return response.data;
  },

  removeVehicleFromTrip: async (
    payload: RemoveVehicleFromTripPayload,
  ): Promise<RemoveVehicleApiResponse> => {
    const response = await axiosInstance.delete<RemoveVehicleApiResponse>(
      "/trip-planning/trip-vehicles",
      {
        data: payload,
      },
    );

    return response.data;
  },

  voteForVehicle: async (
    payload: VoteForVehiclePayload,
  ): Promise<TripVehicleApiResponse> => {
    const response = await axiosInstance.post<TripVehicleApiResponse>(
      "/trip-planning/trip-vehicles/vote",
      payload,
    );

    return response.data;
  },

  removeVote: async (
    payload: RemoveVotePayload,
  ): Promise<TripVehicleApiResponse> => {
    const response = await axiosInstance.delete<TripVehicleApiResponse>(
      "/trip-planning/trip-vehicles/vote",
      {
        data: payload,
      },
    );

    return response.data;
  },

  finalizeVehicle: async (
    payload: FinalizeVehiclePayload,
  ): Promise<TripVehicleApiResponse> => {
    const response = await axiosInstance.patch<TripVehicleApiResponse>(
      "/trip-planning/trip-vehicles/finalize",
      payload,
    );

    return response.data;
  },

  async unfinalizeVehicle(
    payload: UnfinalizeVehiclePayload,
  ): Promise<TripVehicleApiResponse> {
    const response = await axiosInstance.patch<TripVehicleApiResponse>(
      "/trip-planning/trip-vehicles/unfinalize",
      payload,
    );

    return response.data;
  },
};
