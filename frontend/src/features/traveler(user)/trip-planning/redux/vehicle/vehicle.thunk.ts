import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import type {
  CreateVehicleData,
  UpdateVehicleData,
  VehicleResponse,
} from "../../types/vehicle.types";
import { vehicleApi } from "../../api/vehicle.api";

interface ApiError {
  message: string;
}

//CREATE VEHICLE
export const createVehicleThunk = createAsyncThunk<
  VehicleResponse,
  CreateVehicleData,
  { rejectValue: string }
>("vehicle/createVehicle", async (vehicleData, { rejectWithValue }) => {
  try {
    return await vehicleApi.createVehicle(vehicleData);
  } catch (error) {
    const err = error as AxiosError<ApiError>;

    return rejectWithValue(
      err.response?.data?.message ?? "Failed to create vehicle",
    );
  }
});

//FETCH VEHICLES
export const fetchVehiclesThunk = createAsyncThunk<
  VehicleResponse[],
  void,
  { rejectValue: string }
>("vehicle/fetchVehicles", async (_, { rejectWithValue }) => {
  try {
    return await vehicleApi.getVehicles();
  } catch (error) {
    const err = error as AxiosError<ApiError>;

    return rejectWithValue(
      err.response?.data?.message ?? "Failed to fetch vehicles",
    );
  }
});

//FETCH VEHICLE BY ID
export const fetchVehicleByIdThunk = createAsyncThunk<
  VehicleResponse,
  string,
  { rejectValue: string }
>("vehicle/fetchVehicleById", async (vehicleId, { rejectWithValue }) => {
  try {
    return await vehicleApi.getVehicleById(vehicleId);
  } catch (error) {
    const err = error as AxiosError<ApiError>;

    return rejectWithValue(
      err.response?.data?.message ?? "Failed to fetch vehicle",
    );
  }
});

//UPDATE VEHICLE
export const updateVehicleThunk = createAsyncThunk<
  VehicleResponse,
  {
    vehicleId: string;
    vehicleData: UpdateVehicleData;
  },
  { rejectValue: string }
>(
  "vehicle/updateVehicle",
  async ({ vehicleId, vehicleData }, { rejectWithValue }) => {
    try {
      return await vehicleApi.updateVehicle(vehicleId, vehicleData);
    } catch (error) {
      const err = error as AxiosError<ApiError>;

      return rejectWithValue(
        err.response?.data?.message ?? "Failed to update vehicle",
      );
    }
  },
);

//UPDATE VEHICLE
export const deleteVehicleThunk = createAsyncThunk<
  VehicleResponse,
  string,
  { rejectValue: string }
>("vehicle/deleteVehicle", async (vehicleId, { rejectWithValue }) => {
  try {
    const res = await vehicleApi.deleteVehicle(vehicleId);
    // console.log(res);
    return res;
  } catch (error) {
    const err = error as AxiosError<ApiError>;

    return rejectWithValue(
      err.response?.data?.message ?? "Failed to delete vehicle",
    );
  }
});
