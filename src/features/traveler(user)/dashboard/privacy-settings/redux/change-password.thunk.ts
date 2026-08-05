import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ChangePasswordRequest } from "../types/change-password.req-res";
import { privacySettingsApi } from "../api/change-password.api";

/////////////////////////////////////////////////////////////
//CHANGE PASSWORD
export const changePasswordThunk = createAsyncThunk(
  "traveler/changePassword",

  async (payload: ChangePasswordRequest, { rejectWithValue }) => {
    try {
      const res = await privacySettingsApi.changePassword(payload);

      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
