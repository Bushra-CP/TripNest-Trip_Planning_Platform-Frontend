import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  AddVehicleToTripPayload,
  FinalizeVehiclePayload,
  RemoveVehicleFromTripPayload,
  RemoveVotePayload,
  TripVehicleRawResponse,
  TripVehicleResponse,
  UnfinalizeVehiclePayload,
  VoteForVehiclePayload,
} from "../../types/trip-vehicle.types";
import { tripVehicleApi } from "../../api/trip-vehicle.api";
import type { AxiosError } from "axios";

interface ApiError {
  message: string;
}

//Get Trip Vehicles thunk
export const getTripVehiclesThunk = createAsyncThunk<
  TripVehicleResponse[],
  string,
  { rejectValue: string }
>("tripVehicle/getTripVehicles", async (tripId, { rejectWithValue }) => {
  try {
    const response = await tripVehicleApi.getTripVehicles(tripId);

    return response.data;
  } catch (error) {
    const err = error as AxiosError<ApiError>;
    return rejectWithValue(
      err.response?.data?.message ?? "Failed to fetch trip vehicles",
    );
  }
});

//Add Vehicle thunk
export const addVehicleToTripThunk = createAsyncThunk<
  TripVehicleResponse,
  AddVehicleToTripPayload,
  { rejectValue: string }
>("tripVehicle/addVehicleToTrip", async (payload, { rejectWithValue }) => {
  try {
    const response = await tripVehicleApi.addVehicleToTrip(payload);

    return response.data;
  } catch (error) {
    const err = error as AxiosError<ApiError>;
    return rejectWithValue(
      err.response?.data?.message ?? "Failed to add vehicle to trip",
    );
  }
});

//Remove Vehicle thunk
export const removeVehicleFromTripThunk = createAsyncThunk<
  TripVehicleRawResponse,
  RemoveVehicleFromTripPayload,
  { rejectValue: string }
>("tripVehicle/removeVehicleFromTrip", async (payload, { rejectWithValue }) => {
  try {
    const response = await tripVehicleApi.removeVehicleFromTrip(payload);

    return response.data;
  } catch (error) {
    const err = error as AxiosError<ApiError>;

    return rejectWithValue(
      err.response?.data?.message ?? "Failed to remove vehicle from trip",
    );
  }
});

//Vote thunk
export const voteForVehicleThunk = createAsyncThunk<
  TripVehicleResponse,
  VoteForVehiclePayload,
  { rejectValue: string }
>("tripVehicle/voteForVehicle", async (payload, { rejectWithValue }) => {
  try {
    const response = await tripVehicleApi.voteForVehicle(payload);

    return response.data;
  } catch (error) {
    const err = error as AxiosError<ApiError>;
    return rejectWithValue(
      err.response?.data?.message ?? "Failed to vote for vehicle",
    );
  }
});

//Remove Vote thunk
export const removeVoteThunk = createAsyncThunk<
  TripVehicleResponse,
  RemoveVotePayload,
  { rejectValue: string }
>("tripVehicle/removeVote", async (payload, { rejectWithValue }) => {
  try {
    const response = await tripVehicleApi.removeVote(payload);

    return response.data;
  } catch (error) {
    const err = error as AxiosError<ApiError>;
    return rejectWithValue(
      err.response?.data?.message ?? "Failed to remove vote",
    );
  }
});

//Finalize Vehicle thunk
export const finalizeVehicleThunk = createAsyncThunk<
  TripVehicleResponse,
  FinalizeVehiclePayload,
  { rejectValue: string }
>("tripVehicle/finalizeVehicle", async (payload, { rejectWithValue }) => {
  try {
    const response = await tripVehicleApi.finalizeVehicle(payload);

    return response.data;
  } catch (error) {
    const err = error as AxiosError<ApiError>;
    return rejectWithValue(
      err.response?.data?.message ?? "Failed to finalize vehicle",
    );
  }
});

//Get final vehicle thunk
export const getFinalSelectedVehicleThunk = createAsyncThunk<
  TripVehicleResponse | null,
  string,
  { rejectValue: string }
>(
  "tripVehicle/getFinalSelectedVehicle",
  async (tripId, { rejectWithValue }) => {
    try {
      const response = await tripVehicleApi.getFinalSelectedVehicle(tripId);

      return response.data;
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      return rejectWithValue(
        err.response?.data?.message ?? "Failed to fetch final vehicle",
      );
    }
  },
);

//Unfinalize vehicle thunk
export const unfinalizeVehicleThunk = createAsyncThunk<
  TripVehicleResponse,
  UnfinalizeVehiclePayload,
  { rejectValue: string }
>("tripVehicle/unfinalizeVehicle", async (payload, { rejectWithValue }) => {
  try {
    const response = await tripVehicleApi.unfinalizeVehicle(payload);

    return response.data;
  } catch (error) {
    const err = error as AxiosError<ApiError>;

    return rejectWithValue(
      err.response?.data?.message ?? "Failed to unfinalize vehicle",
    );
  }
});
