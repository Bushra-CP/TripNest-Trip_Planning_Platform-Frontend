import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import type { RestoreAIPlanningResponse } from "../../types/ai-planning.types";
import { getPlanningState } from "../../api/ai-planning.api";

interface ApiError {
  message: string;
}

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
