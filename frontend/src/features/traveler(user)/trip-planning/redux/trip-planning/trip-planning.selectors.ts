import type { RootState } from "@/app/store";

export const selectMode = (state: RootState) => state.tripPlanning.mode;

export const selectTripId = (state: RootState) => state.tripPlanning.tripId;

export const selectRoomId = (state: RootState) => state.tripPlanning.roomId;

export const selectTripLoading = (state: RootState) =>
  state.tripPlanning.isTripLoading;
