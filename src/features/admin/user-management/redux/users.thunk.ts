import { createAsyncThunk } from "@reduxjs/toolkit";
import type { GetUsersQuery } from "../types/user.types";
import { usersApi } from "../api/users.api";
import type { AxiosError } from "axios";

interface ApiError {
  message: string;
}

/////////////////////////////////////////////////////////////
//GET USERS
export const getUsersThunk = createAsyncThunk(
  "admin/users",

  async (params: GetUsersQuery, { rejectWithValue }) => {
    try {
      const res = await usersApi.getUsers(params);

      return res;
    } catch (error) {
      const err = error as AxiosError<ApiError>;

      return rejectWithValue(
        err.response?.data?.message ?? "Failed to fetch users.",
      );
    }
  },
);

export const updateUserStatusThunk = createAsyncThunk(
  "users/updateStatus",

  async (
    {
      userId,
      isActive,
    }: {
      userId: string;
      isActive: boolean;
    },
    { rejectWithValue },
  ) => {
    try {
      console.log("Block User:", isActive);

      const response = await usersApi.updateUserStatus(userId, isActive);

      return response;
    } catch (error) {
      const err = error as AxiosError<ApiError>;

      return rejectWithValue(
        err.response?.data?.message ?? "Failed to update user status.",
      );
    }
  },
);

export const getUserDetailsThunk = createAsyncThunk(
  "users/getUserDetails",

  async (
    {
      userId,
    }: {
      userId: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await usersApi.getUserDetails(userId);

      return response.data;
    } catch (error) {
      const err = error as AxiosError<ApiError>;

      return rejectWithValue(
        err.response?.data?.message ?? "Failed to fetch user details.",
      );
    }
  },
);
