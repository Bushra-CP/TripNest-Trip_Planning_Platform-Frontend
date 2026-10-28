import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import { tripCostApi } from "../../api/trip-cost.api";
import type { TripCostResponse } from "../../types/trip-cost.types";

interface ApiError {
  message: string;
}

export const fetchTripVehicleCostsThunk = createAsyncThunk<
  TripCostResponse,
  string,
  { rejectValue: string }
>("tripCost/fetchTripVehicleCosts", async (tripId, { rejectWithValue }) => {
  try {
    return await tripCostApi.getTripVehicleCosts(tripId);
  } catch (error) {
    const err = error as AxiosError<ApiError>;

    return rejectWithValue(
      err.response?.data?.message ?? "Failed to fetch trip vehicle costs",
    );
  }
});
