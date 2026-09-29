import { createSlice } from "@reduxjs/toolkit";
import { fetchMyTripsThunk } from "./my-trips.thunk";
import type { MyTrip } from "../types/trip.types";

interface MyTripsState {
  trips: MyTrip[];
  isLoading: boolean;
  error: string | null;
}

const initialState: MyTripsState = {
  trips: [],
  isLoading: false,
  error: null,
};

const myTripsSlice = createSlice({
  name: "myTrips",

  initialState,

  reducers: {
    clearMyTrips: (state) => {
      state.trips = [];
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchMyTripsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchMyTripsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.trips = action.payload;
      })

      .addCase(fetchMyTripsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Failed to fetch trips";
      });
  },
});

export const { clearMyTrips } = myTripsSlice.actions;

export default myTripsSlice.reducer;
