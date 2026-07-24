import { createSlice } from "@reduxjs/toolkit";
import {
  forgotPasswordThunk,
  resetPasswordThunk,
  verifyResetOtpThunk,
  resendResetOtpThunk,
} from "./forgot-password.thunk";

interface ForgotPasswordState {
  isForgotPasswordLoading: boolean;
  isVerifyOtpLoading: boolean;
  isResetPasswordLoading: boolean;
  isResendOtpLoading: boolean;
  error: string | null;
}

const initialState: ForgotPasswordState = {
  isForgotPasswordLoading: false,
  isVerifyOtpLoading: false,
  isResetPasswordLoading: false,
  isResendOtpLoading: false,
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

      ////////////VERIFY RESET OTP////////////
      .addCase(verifyResetOtpThunk.pending, (state) => {
        state.isVerifyOtpLoading = true;
        state.error = null;
      })
      .addCase(verifyResetOtpThunk.fulfilled, (state) => {
        state.isVerifyOtpLoading = false;
      })
      .addCase(verifyResetOtpThunk.rejected, (state, action) => {
        state.isVerifyOtpLoading = false;
        state.error = (action.payload as string) ?? "OTP verification failed";
      })

      ////////////Resend Reset OTP////////////
      .addCase(resendResetOtpThunk.pending, (state) => {
        state.isResendOtpLoading = true;
        state.error = null;
      })
      .addCase(resendResetOtpThunk.fulfilled, (state) => {
        state.isResendOtpLoading = false;
      })
      .addCase(resendResetOtpThunk.rejected, (state, action) => {
        state.isResendOtpLoading = false;
        state.error = (action.payload as string) ?? "Unable to resend OTP";
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
