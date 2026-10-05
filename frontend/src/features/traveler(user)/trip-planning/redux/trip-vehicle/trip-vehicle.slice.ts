import { createSlice } from "@reduxjs/toolkit";
import type { TripVehicleResponse } from "../../types/trip-vehicle.types";
import {
  addVehicleToTripThunk,
  finalizeVehicleThunk,
  getFinalSelectedVehicleThunk,
  getTripVehiclesThunk,
  removeVehicleFromTripThunk,
  removeVoteThunk,
  unfinalizeVehicleThunk,
  voteForVehicleThunk,
} from "./trip-vehicle.thunk";

interface TripVehicleState {
  tripVehicles: TripVehicleResponse[];
  finalVehicle: TripVehicleResponse | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: TripVehicleState = {
  tripVehicles: [],
  finalVehicle: null,
  isLoading: false,
  error: null,
};

const tripVehicleSlice = createSlice({
  name: "tripVehicle",
  initialState,
  reducers: {
    clearTripVehicles: (state) => {
      state.tripVehicles = [];
      state.finalVehicle = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // GET TRIP VEHICLES
      .addCase(getTripVehiclesThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTripVehiclesThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tripVehicles = action.payload;
      })
      .addCase(getTripVehiclesThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Failed to fetch vehicles";
      })

      // ADD VEHICLE
      .addCase(addVehicleToTripThunk.fulfilled, (state, action) => {
        state.tripVehicles.push(action.payload);
      })

      // REMOVE VEHICLE
      .addCase(removeVehicleFromTripThunk.fulfilled, (state, action) => {
        state.tripVehicles = state.tripVehicles.filter(
          (vehicle) => vehicle._id !== action.payload._id,
        );
      })

      // VOTE
      .addCase(voteForVehicleThunk.fulfilled, (state, action) => {
        const index = state.tripVehicles.findIndex(
          (vehicle) => vehicle._id === action.payload._id,
        );

        if (index !== -1) {
          state.tripVehicles[index] = action.payload;
        }
      })

      // REMOVE VOTE
      .addCase(removeVoteThunk.fulfilled, (state, action) => {
        const index = state.tripVehicles.findIndex(
          (vehicle) => vehicle._id === action.payload._id,
        );

        if (index !== -1) {
          state.tripVehicles[index] = action.payload;
        }
      })

      // FINALIZE
      .addCase(finalizeVehicleThunk.fulfilled, (state, action) => {
        state.tripVehicles = state.tripVehicles.map((vehicle) => ({
          ...vehicle,
          finalSelected: vehicle._id === action.payload._id,
        }));

        state.finalVehicle = action.payload;
      })

      // UNFINALIZE VEHICLE
      .addCase(unfinalizeVehicleThunk.fulfilled, (state, action) => {
        state.tripVehicles = state.tripVehicles.map((vehicle) => ({
          ...vehicle,
          finalSelected:
            vehicle._id === action.payload._id ? false : vehicle.finalSelected,
        }));

        state.finalVehicle = null;
      })

      // GET FINAL VEHICLE
      .addCase(getFinalSelectedVehicleThunk.fulfilled, (state, action) => {
        state.finalVehicle = action.payload;
      });
  },
});

export const { clearTripVehicles } = tripVehicleSlice.actions;

export default tripVehicleSlice.reducer;
