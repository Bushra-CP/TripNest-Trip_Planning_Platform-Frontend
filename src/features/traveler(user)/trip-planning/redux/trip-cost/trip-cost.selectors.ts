import type { RootState } from "@/app/store";

export const selectTripCostData = (state: RootState) => state.tripCost.data;

export const selectTripVehicleCosts = (state: RootState) =>
  state.tripCost.data?.vehicles ?? [];

export const selectTripCostDistance = (state: RootState) =>
  state.tripCost.data?.distanceKm ?? null;

export const selectTripCostLoading = (state: RootState) =>
  state.tripCost.isLoading;

export const selectTripCostError = (state: RootState) => state.tripCost.error;
