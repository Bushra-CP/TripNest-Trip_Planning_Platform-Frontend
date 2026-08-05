import type { RootState } from "@/app/store";

export const selectVerifyOtpLoading = (state: RootState) =>
  state.otp.verifyOtpLoading;

export const selectResendOtpLoading = (state: RootState) =>
  state.otp.resendOtpLoading;

export const selectOtpError = (state: RootState) => state.otp.error;
