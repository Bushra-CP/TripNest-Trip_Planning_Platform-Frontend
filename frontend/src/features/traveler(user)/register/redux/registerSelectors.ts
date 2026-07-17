import type { RootState } from "../../../../app/store";

export const selectUser = (state: RootState) => state.register.user;

export const selectAccessToken = (state: RootState) => state.register.accessToken;

export const selectIsLoading = (state: RootState) => state.register.isLoading;

export const selectRegisterError = (state: RootState) => state.register.error;

export const selectIsAuthenticated = (state: RootState) =>
  state.register.isAuthenticated;
