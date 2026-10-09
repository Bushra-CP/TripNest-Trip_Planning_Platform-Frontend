import type { RootState } from "@/app/store";

export const selectAIMessages = (state: RootState) => state.aiPlanning.messages;

export const selectAILoading = (state: RootState) => state.aiPlanning.loading;

export const selectThreadId = (state: RootState) => state.aiPlanning.threadId;

export const selectAITridId = (state: RootState) => state.aiPlanning.tripId;

export const selectTripRequirements = (state: RootState) =>
  state.aiPlanning.tripRequirements;

export const selectIsComplete = (state: RootState) =>
  state.aiPlanning.isComplete;

export const selectCanGenerateDraft = (state: RootState) =>
  state.aiPlanning.canGenerateDraft;

export const selectRouteChanged = (state: RootState) =>
  state.aiPlanning.routeChanged;

export const selectRoute = (state: RootState) => state.aiPlanning.route;

export const selectError = (state: RootState) => state.aiPlanning.error;
