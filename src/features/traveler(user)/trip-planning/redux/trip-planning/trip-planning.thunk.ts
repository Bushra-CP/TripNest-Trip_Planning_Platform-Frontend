import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import type { TripResponse } from "../../types/chat.types";
import { tripApi } from "../../api/trip.api";

// ERROR OBJECT INTERFACE
interface ApiError {
  message: string;
}

/*-----------------------
  CONVERT TO GROUP TRIP - CREATE ROOM THUNK
------------------------*/
export const convertToGroupTripThunk = createAsyncThunk(
  "/tripPlanning/convertToGroupTrip",

  async (threadId: string | undefined, { rejectWithValue }) => {
    try {
      const response = await tripApi.convertToGroupTrip(threadId);

      console.log(response);

      return response.data;
    } catch (error) {
      const err = error as AxiosError<ApiError>;

      return rejectWithValue(
        err.response?.data?.message ?? "Failed to convert trip to group",
      );
    }
  },
);

export const getTripByThreadIdThunk = createAsyncThunk<
  TripResponse,
  string,
  { rejectValue: string }
>(
  "/tripPlanning/getTripByThreadId",

  async (threadId, { rejectWithValue }) => {
    try {
      const response = await tripApi.getTripByThreadId(threadId);

      return response.data;
    } catch (error) {
      const err = error as AxiosError<ApiError>;

      return rejectWithValue(
        err.response?.data?.message ?? "Failed to get trip",
      );
    }
  },
);
