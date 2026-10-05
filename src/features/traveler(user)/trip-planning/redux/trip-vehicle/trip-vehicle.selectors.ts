import type { RootState } from "@/app/store";

export const selectTripVehicles = (state: RootState) =>
  state.tripVehicle.tripVehicles;

export const selectFinalVehicle = (state: RootState) =>
  state.tripVehicle.finalVehicle;

export const selectTripVehicleLoading = (state: RootState) =>
  state.tripVehicle.isLoading;

export const selectTripVehicleError = (state: RootState) =>
  state.tripVehicle.error;
