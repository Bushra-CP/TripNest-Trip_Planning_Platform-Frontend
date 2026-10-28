import type { RootState } from "@/app/store";

export const selectVehicles = (state: RootState) => state.vehicle.vehicles;

export const selectSelectedVehicle = (state: RootState) =>
  state.vehicle.selectedVehicle;

export const selectVehicleLoading = (state: RootState) => state.vehicle.loading;

export const selectVehicleError = (state: RootState) => state.vehicle.error;
