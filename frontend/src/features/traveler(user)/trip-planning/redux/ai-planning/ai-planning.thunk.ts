import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import type {
  AIChatResponse,
  RestoreAIPlanningResponse,
} from "../../types/ai-planning.types";
import { getPlanningState, sendMessage } from "../../api/ai-planning.api";
import type { ChatMessage } from "../../interfaces/ai-planning.interfaces";

interface ApiError {
  message: string;
}

interface SendMessagePayload {
  messages: ChatMessage[];
  threadId: string | null;
}

export const sendMessageThunk = createAsyncThunk<
  AIChatResponse,
  SendMessagePayload,
  { rejectValue: string }
>(
  "aiPlanning/sendMessage",
  async ({ messages, threadId }, { rejectWithValue }) => {
    try {
      const res = await sendMessage(messages, threadId);
      console.log(res);
      return res;
    } catch (error) {
      const err = error as AxiosError<ApiError>;

      return rejectWithValue(
        err.response?.data?.message ?? "Failed to send message",
      );
    }
  },
);

export const restorePlanningStateThunk = createAsyncThunk<
  RestoreAIPlanningResponse,
  string,
  { rejectValue: string }
>("aiPlanning/restorePlanningState", async (threadId, { rejectWithValue }) => {
  try {
    return await getPlanningState(threadId);
  } catch (error) {
    const err = error as AxiosError<ApiError>;

    return rejectWithValue(
      err.response?.data?.message ?? "Failed to restore trip planning state",
    );
  }
});
