import type { RootState } from "@/app/store";

export const selectUser = (state: RootState) => state.register.user;

export const selectAccessToken = (state: RootState) =>
  state.register.accessToken;

export const selectRegisterLoading = (state: RootState) =>
  state.register.registerLoading;

export const selectVerifyLoading = (state: RootState) =>
  state.register.verifyLoading;

export const selectResendOtpLoading = (state: RootState) =>
  state.register.resendOtpLoading;

export const selectRegisterError = (state: RootState) => state.register.error;

export const selectIsAuthenticated = (state: RootState) =>
  state.register.isAuthenticated;
