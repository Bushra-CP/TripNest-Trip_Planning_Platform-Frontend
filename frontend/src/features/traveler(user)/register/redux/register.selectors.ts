import type { RootState } from "@/app/store";

export const selectRegisterLoading = (state: RootState) =>
  state.register.registerLoading;

export const selectVerifyLoading = (state: RootState) =>
  state.register.verifyLoading;

export const selectResendOtpLoading = (state: RootState) =>
  state.register.resendOtpLoading;

export const selectRegisterError = (state: RootState) => state.register.error;
