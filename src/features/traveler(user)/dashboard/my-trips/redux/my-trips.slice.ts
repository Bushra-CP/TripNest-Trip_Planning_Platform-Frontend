import { createSlice } from "@reduxjs/toolkit";
import { deleteMyTripThunk, fetchMyTripsThunk } from "./my-trips.thunk";
import type { MyTrip } from "../types/trip.types";

interface MyTripsState {
  trips: MyTrip[];
  isLoading: boolean;
  isDeleting: boolean;
  error: string | null;
}

const initialState: MyTripsState = {
  trips: [],
  isLoading: false,
  isDeleting: false,
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

      //FETCH TRIPS
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
      })

      // DELETE TRIP
      .addCase(deleteMyTripThunk.pending, (state) => {
        state.isDeleting = true;
        state.error = null;
      })

      .addCase(deleteMyTripThunk.fulfilled, (state, action) => {
        state.isDeleting = false;

        state.trips = state.trips.filter((trip) => trip._id !== action.payload);
      })

      .addCase(deleteMyTripThunk.rejected, (state, action) => {
        state.isDeleting = false;
        state.error = action.payload ?? "Failed to delete trip";
      });
  },
});

export const { clearMyTrips } = myTripsSlice.actions;

export default myTripsSlice.reducer;
