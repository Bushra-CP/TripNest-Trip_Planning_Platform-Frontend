import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ChatMessage } from "../../interfaces/ai-planning.interfaces";
import type { TripRequirements } from "../../interfaces/trip.interfaces";
import type { RoutePlanningResult } from "../../interfaces/route.interfaces";


interface AIPlanningState {
  messages: ChatMessage[];
  loading: boolean;

  threadId: string | null;

  tripRequirements: TripRequirements | null;
  missingFields: string[];

  isComplete: boolean;
  canGenerateDraft: boolean;

  route: RoutePlanningResult | null;
}

const initialState: AIPlanningState = {
  messages: [
    {
      id: crypto.randomUUID(),
      role: "assistant",
      content:
        "Hi! 👋 I'm your AI Trip Planner. Tell me where you'd like to travel, and I'll help you plan your trip.",
    },
  ],

  loading: false,

  threadId: null,

  tripRequirements: null,
  missingFields: [],

  isComplete: false,
  canGenerateDraft: false,

  route: null,
};

const aiPlanningSlice = createSlice({
  name: "aiPlanning",

  initialState,

  reducers: {
    addMessage: (
      state,
      action: PayloadAction<ChatMessage>,
    ) => {
      state.messages.push(action.payload);
    },

    setLoading: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.loading = action.payload;
    },

      setThreadId: (
    state,
    action: PayloadAction<string>,
  ) => {
    state.threadId = action.payload;
  },

    setTripRequirements: (
      state,
      action: PayloadAction<TripRequirements>,
    ) => {
      state.tripRequirements = action.payload;
    },

    setMissingFields: (
      state,
      action: PayloadAction<string[]>,
    ) => {
      state.missingFields = action.payload;
    },

    setIsComplete: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.isComplete = action.payload;
    },

    setCanGenerateDraft: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.canGenerateDraft = action.payload;
    },

    setRoute: (
      state,
      action: PayloadAction<RoutePlanningResult | null>,
    ) => {
      state.route = action.payload;
    },

    clearAIPlanning: () => {
      return initialState;
    },
  },
});

export const {
  addMessage,
  setLoading,
  setThreadId,
  setTripRequirements,
  setMissingFields,
  setIsComplete,
  setCanGenerateDraft,
  setRoute,
  clearAIPlanning,
} = aiPlanningSlice.actions;

export default aiPlanningSlice.reducer;