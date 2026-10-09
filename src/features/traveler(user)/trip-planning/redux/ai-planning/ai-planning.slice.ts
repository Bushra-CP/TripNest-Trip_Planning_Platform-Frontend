import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { ChatMessage } from "../../interfaces/ai-planning.interfaces";
import type { TripRequirements } from "../../interfaces/trip.interfaces";
import type { RoutePlanningResult } from "../../interfaces/route.interfaces";

import {
  restorePlanningStateThunk,
  sendMessageThunk,
} from "./ai-planning.thunk";

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

  tripId: string | null;

  tripRequirements: TripRequirements | null;
  missingFields: string[];

  isComplete: boolean;
  canGenerateDraft: boolean;
  routeChanged: boolean;

  route: RoutePlanningResult | null;

  error: string | null;
}

const initialState: AIPlanningState = {
  messages: [defaultAIMessage],

  loading: false,

  threadId: null,
  tripId: null,

  tripRequirements: null,
  missingFields: [],

  isComplete: false,
  canGenerateDraft: false,
  routeChanged: false,

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

    clearAIPlanning: () => {
      return initialState;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(sendMessageThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(sendMessageThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.error = null;

        state.threadId = action.payload.threadId;

        state.tripId = action.payload.tripId;

        state.tripRequirements = action.payload.requirements;

        state.missingFields = action.payload.missingFields;

        state.isComplete = action.payload.isComplete;

        state.canGenerateDraft = action.payload.canGenerateDraft;

        state.routeChanged = action.payload.routeChanged;

        state.route = action.payload.route;
      })

      .addCase(sendMessageThunk.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload ?? "Failed to send message to AI assistant";
      })

      .addCase(restorePlanningStateThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(restorePlanningStateThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.threadId = action.payload.threadId;

        state.tripId = action.payload.tripId;

        const conversationHistory = action.payload.conversationHistory ?? [];

        state.messages = [defaultAIMessage, ...conversationHistory];

        state.tripRequirements = action.payload.requirements;

        state.missingFields = action.payload.missingFields;

        state.isComplete = action.payload.isComplete;

        state.canGenerateDraft = action.payload.canGenerateDraft;

        state.routeChanged = action.payload.routeChanged;

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
  clearAIPlanning,
} = aiPlanningSlice.actions;

export default aiPlanningSlice.reducer;
