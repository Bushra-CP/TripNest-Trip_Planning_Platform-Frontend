import type { RootState } from "@/app/store";

export const selectTripPlanning = (state: RootState) => state.tripPlanning;

export const selectMode = (state: RootState) => state.tripPlanning.mode;

export const selectRoomId = (state: RootState) => state.tripPlanning.roomId;

export const selectRole = (state: RootState) => state.tripPlanning.role;

export const selectIsGroupPlan = (state: RootState) =>
  state.tripPlanning.isGroupPlan;

export const selectMembers = (state: RootState) => state.tripPlanning.members;

export const selectOnlineUserIds = (state: RootState) =>
  state.tripPlanning.onlineUserIds;

export const selectMessages = (state: RootState) => state.tripPlanning.messages;

export const selectTypingUserIds = (state: RootState) =>
  state.tripPlanning.typingUserIds;

export const selectSocketConnected = (state: RootState) =>
  state.tripPlanning.isConnected;

export const selectIsLoading = (state: RootState) =>
  state.tripPlanning.isLoading;

export const selectIsJoining = (state: RootState) =>
  state.tripPlanning.isJoining;

export const selectIsParticipating = (state: RootState) =>
  state.tripPlanning.isParticipating;

export const selectTripPlanningError = (state: RootState) =>
  state.tripPlanning.error;
