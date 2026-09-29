import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import { myTripsApi } from "../api/my-trips.api";
import type { MyTrip } from "../types/trip.types";

interface ApiError {
  message: string;
}

export interface FetchMyTripsParams {
  search?: string;
  tripMode?: "solo" | "group";
}

export const fetchMyTripsThunk = createAsyncThunk<
  MyTrip[],
  FetchMyTripsParams,
  { rejectValue: string }
>(
  "myTrips/fetchMyTrips",

  async ({ search, tripMode }, { rejectWithValue }) => {
    try {
      return await myTripsApi.getTrips(search, tripMode);
    } catch (error) {
      const err = error as AxiosError<ApiError>;

      return rejectWithValue(
        err.response?.data?.message ?? "Failed to fetch trips",
      );
    }
  },
);
