import type { RootState } from "@/app/store";

export const selectForgotPasswordLoading = (state: RootState) =>
  state.forgotPassword.isForgotPasswordLoading;

export const selectVerifyResetOtpLoading = (state: RootState) =>
  state.forgotPassword.isVerifyOtpLoading;

export const selectResendResetOtpLoading = (state: RootState) =>
  state.forgotPassword.isResendOtpLoading;

export const selectResetPasswordLoading = (state: RootState) =>
  state.forgotPassword.isResetPasswordLoading;
