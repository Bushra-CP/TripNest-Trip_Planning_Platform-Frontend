import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { ChatMessage } from "../../interfaces/ai-planning.interfaces";
import type { TripRequirements } from "../../interfaces/trip.interfaces";
import type { RoutePlanningResult } from "../../interfaces/route.interfaces";

import { restorePlanningStateThunk } from "./ai-planning.thunk";

const defaultAIMessage: ChatMessage = {
  id: crypto.randomUUID(),
  role: "assistant",
  content:
    "Hi! 👋 I'm your AI Trip Planner. Tell me where you'd like to travel, and I'll help you plan your trip.",
};

interface AIPlanningState {
  messages: ChatMessage[];
  loading: boolean;

  threadId: string | null;

  tripRequirements: TripRequirements | null;
  missingFields: string[];

  isComplete: boolean;
  canGenerateDraft: boolean;

  route: RoutePlanningResult | null;

  error: string | null;
}

const initialState: AIPlanningState = {
  messages: [defaultAIMessage],

  loading: false,

  threadId: null,

  tripRequirements: null,
  missingFields: [],

  isComplete: false,
  canGenerateDraft: false,

  route: null,

  error: null,
};

const aiPlanningSlice = createSlice({
  name: "aiPlanning",

  initialState,

  reducers: {
    addMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.messages.push(action.payload);
    },

    setMessages: (state, action: PayloadAction<ChatMessage[]>) => {
      state.messages = action.payload;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setThreadId: (state, action: PayloadAction<string>) => {
      state.threadId = action.payload;
    },

    setTripRequirements: (state, action: PayloadAction<TripRequirements>) => {
      state.tripRequirements = action.payload;
    },

    setMissingFields: (state, action: PayloadAction<string[]>) => {
      state.missingFields = action.payload;
    },

    setIsComplete: (state, action: PayloadAction<boolean>) => {
      state.isComplete = action.payload;
    },

    setCanGenerateDraft: (state, action: PayloadAction<boolean>) => {
      state.canGenerateDraft = action.payload;
    },

    setRoute: (state, action: PayloadAction<RoutePlanningResult | null>) => {
      state.route = action.payload;
    },

    clearAIPlanning: () => {
      return initialState;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(restorePlanningStateThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(restorePlanningStateThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.threadId = action.payload.threadId;

        const conversationHistory = action.payload.conversationHistory ?? [];

        state.messages = [defaultAIMessage, ...conversationHistory];

        state.tripRequirements = action.payload.requirements;

        state.missingFields = action.payload.missingFields;

        state.isComplete = action.payload.isComplete;

        state.canGenerateDraft = action.payload.canGenerateDraft;

        state.route = action.payload.route;
      })

      .addCase(restorePlanningStateThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload ?? "Failed to restore trip planning state";
      });
  },
});

export const {
  addMessage,
  setMessages,
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
