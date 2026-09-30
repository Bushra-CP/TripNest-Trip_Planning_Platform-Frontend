import { axiosInstance } from "@/shared/api/axios";
import { SERVER_ROUTES } from "@/shared/constants/routes.constants";

import type {
  CreateVehicleData,
  UpdateVehicleData,
  VehicleApiResponse,
  VehicleResponse,
  VehiclesApiResponse,
} from "../types/vehicle.types";

export const vehicleApi = {
  async createVehicle(
    vehicleData: CreateVehicleData,
  ): Promise<VehicleResponse> {
    const response = await axiosInstance.post<VehicleApiResponse>(
      SERVER_ROUTES.CREATE_VEHICLE,
      vehicleData,
    );

    return response.data.data;
  },

  async getVehicles(): Promise<VehicleResponse[]> {
    const response = await axiosInstance.get<VehiclesApiResponse>(
      SERVER_ROUTES.GET_VEHICLES,
    );

    return response.data.data;
  },

  async getVehicleById(vehicleId: string): Promise<VehicleResponse> {
    const response = await axiosInstance.get<VehicleApiResponse>(
      SERVER_ROUTES.GET_VEHICLE_BY_ID.replace(":vehicleId", vehicleId),
    );

    return response.data.data;
  },

  async updateVehicle(
    vehicleId: string,
    vehicleData: UpdateVehicleData,
  ): Promise<VehicleResponse> {
    const response = await axiosInstance.patch<VehicleApiResponse>(
      SERVER_ROUTES.UPDATE_VEHICLE.replace(":vehicleId", vehicleId),
      vehicleData,
    );

    return response.data.data;
  },

  async deleteVehicle(vehicleId: string): Promise<VehicleResponse> {
    const response = await axiosInstance.delete<VehicleApiResponse>(
      SERVER_ROUTES.DELETE_VEHICLE.replace(":vehicleId", vehicleId),
    );

    return response.data.data;
  },
};
