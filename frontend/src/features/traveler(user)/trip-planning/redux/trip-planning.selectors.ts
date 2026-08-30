import type { RootState } from "@/app/store";

export const selectMode = (state: RootState) => state.tripPlanning.mode;

export const selectRoomId = (state: RootState) => state.tripPlanning.roomId;

export const selectRoomLoading = (state: RootState) =>
  state.tripPlanning.isRoomLoading;
