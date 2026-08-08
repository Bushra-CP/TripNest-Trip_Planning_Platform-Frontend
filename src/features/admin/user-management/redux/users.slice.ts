import { createSlice } from "@reduxjs/toolkit";

import type { Pagination, User } from "../types/user.types";
import { getUsersThunk, updateUserStatusThunk } from "./users.thunk";

interface UserState {
  users: User[];
  pagination: Pagination;

  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],

  pagination: {
    page: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 1,
  },

  isLoading: false,

  error: null,
};

const userSlice = createSlice({
  name: "users",

  initialState,

  reducers: {
    clearUsers(state) {
      state.users = [];

      state.pagination = initialState.pagination;

      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(getUsersThunk.pending, (state) => {
        state.isLoading = true;

        state.error = null;
      })

      .addCase(getUsersThunk.fulfilled, (state, action) => {
        state.isLoading = false;

        state.users = action.payload.data.data;

        state.pagination = action.payload.data.pagination;
      })

      .addCase(getUsersThunk.rejected, (state, action) => {
        state.isLoading = false;

        state.error = (action.payload as string) ?? "Failed to fetch users.";
      })

      .addCase(updateUserStatusThunk.fulfilled, (state, action) => {
        const user = state.users.find(
          (u) => u.id === action.payload.data.userId,
        );

        if (user) {
          user.status = action.payload.data.isActive ? "Active" : "Blocked";
        }
      });
  },
});

export const { clearUsers } = userSlice.actions;

export default userSlice.reducer;
