import { createSlice } from "@reduxjs/toolkit";
import {
  forgotPasswordThunk,
  resetPasswordThunk,
} from "./forgot-password.thunk";

interface ForgotPasswordState {
  isForgotPasswordLoading: boolean;
  isResetPasswordLoading: boolean;
  error: string | null;
}

const initialState: ForgotPasswordState = {
  isForgotPasswordLoading: false,
  isResetPasswordLoading: false,
  error: null,
};

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      ////////////FORGOT PASSWORD////////////
      .addCase(forgotPasswordThunk.pending, (state) => {
        state.isForgotPasswordLoading = true;
        state.error = null;
      })
      .addCase(forgotPasswordThunk.fulfilled, (state) => {
        state.isForgotPasswordLoading = false;
      })
      .addCase(forgotPasswordThunk.rejected, (state, action) => {
        state.isForgotPasswordLoading = false;
        state.error = (action.payload as string) ?? "Unable to send reset OTP";
      })

      ////////////RESET PASSWORD////////////
      .addCase(resetPasswordThunk.pending, (state) => {
        state.isResetPasswordLoading = true;
        state.error = null;
      })
      .addCase(resetPasswordThunk.fulfilled, (state) => {
        state.isResetPasswordLoading = false;
      })
      .addCase(resetPasswordThunk.rejected, (state, action) => {
        state.isResetPasswordLoading = false;
        state.error = (action.payload as string) ?? "Password reset failed";
      });
  },
});

export default forgotPasswordSlice.reducer;
