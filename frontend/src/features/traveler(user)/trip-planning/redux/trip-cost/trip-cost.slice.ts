import { createSlice } from "@reduxjs/toolkit";

import type { TripCostResponse } from "../../types/trip-cost.types";

import { fetchTripVehicleCostsThunk } from "./trip-cost.thunk";

interface TripCostState {
  data: TripCostResponse | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: TripCostState = {
  data: null,
  isLoading: false,
  error: null,
};

const tripCostSlice = createSlice({
  name: "tripCost",

  initialState,

  reducers: {
    clearTripCosts: (state) => {
      state.data = null;
      state.isLoading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // FETCH COSTS
      .addCase(fetchTripVehicleCostsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchTripVehicleCostsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })

      .addCase(fetchTripVehicleCostsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Failed to fetch trip vehicle costs";
      });
  },
});

export const { clearTripCosts } = tripCostSlice.actions;

export default tripCostSlice.reducer;
