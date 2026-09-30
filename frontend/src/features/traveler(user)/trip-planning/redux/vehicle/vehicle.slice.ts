import { createSlice } from "@reduxjs/toolkit";
import {
  createVehicleThunk,
  deleteVehicleThunk,
  fetchVehicleByIdThunk,
  fetchVehiclesThunk,
  updateVehicleThunk,
} from "./vehicle.thunk";
import type { VehicleResponse } from "../../types/vehicle.types";

interface VehicleState {
  vehicles: VehicleResponse[];
  selectedVehicle: VehicleResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: VehicleState = {
  vehicles: [],
  selectedVehicle: null,
  loading: false,
  error: null,
};

const vehicleSlice = createSlice({
  name: "vehicle",

  initialState,

  reducers: {
    setSelectedVehicle: (
      state,
      action: {
        payload: VehicleResponse | null;
      },
    ) => {
      state.selectedVehicle = action.payload;
    },

    clearSelectedVehicle: (state) => {
      state.selectedVehicle = null;
    },

    clearVehicleError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    // --------------------------------
    // Create Vehicle
    // --------------------------------

    builder
      .addCase(createVehicleThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createVehicleThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.vehicles.unshift(action.payload);

        state.selectedVehicle = action.payload;
      })

      .addCase(createVehicleThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload ?? "Failed to create vehicle";
      });

    // --------------------------------
    // Fetch Vehicles
    // --------------------------------

    builder
      .addCase(fetchVehiclesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchVehiclesThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.vehicles = action.payload;
      })

      .addCase(fetchVehiclesThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload ?? "Failed to fetch vehicles";
      });

    // --------------------------------
    // Fetch Vehicle By ID
    // --------------------------------

    builder
      .addCase(fetchVehicleByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchVehicleByIdThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.selectedVehicle = action.payload;
      })

      .addCase(fetchVehicleByIdThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload ?? "Failed to fetch vehicle";
      });

    // --------------------------------
    // Update Vehicle
    // --------------------------------

    builder
      .addCase(updateVehicleThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateVehicleThunk.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.vehicles.findIndex(
          (vehicle) => vehicle._id === action.payload._id,
        );

        if (index !== -1) {
          state.vehicles[index] = action.payload;
        }

        state.selectedVehicle = action.payload;
      })

      .addCase(updateVehicleThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload ?? "Failed to update vehicle";
      });

    // --------------------------------
    // Delete Vehicle
    // --------------------------------

    builder
      .addCase(deleteVehicleThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteVehicleThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.vehicles = state.vehicles.filter(
          (vehicle) => vehicle._id !== action.payload._id,
        );

        if (state.selectedVehicle?._id === action.payload._id) {
          state.selectedVehicle = null;
        }
      })

      .addCase(deleteVehicleThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload ?? "Failed to delete vehicle";
      });
  },
});

export const { setSelectedVehicle, clearSelectedVehicle, clearVehicleError } =
  vehicleSlice.actions;

export default vehicleSlice.reducer;
