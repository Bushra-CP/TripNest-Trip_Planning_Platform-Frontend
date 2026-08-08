import type { RootState } from "@/app/store";

export const selectUserManagement = (state: RootState) => state.user;

export const selectUsers = (state: RootState) => state.user.users;

export const selectUserPagination = (state: RootState) => state.user.pagination;

export const selectUserLoading = (state: RootState) => state.user.isLoading;

export const selectUserError = (state: RootState) => state.user.error;
