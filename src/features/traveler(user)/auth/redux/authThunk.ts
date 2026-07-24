import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import type { LoginRequest } from "../types/login-request";
import { authApi } from "../api/auth.api";
import type { GoogleAuthRequest } from "../types/google.request";

//ERROR OBJECT INTERFACE
interface ApiError {
  message: string;
}

////////////login thunk////////////
export const loginThunk = createAsyncThunk(
  "auth/login",

  async (payload: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await authApi.login(payload);
      console.log(response);
      console.log(response.data.user);
      return response;
    } catch (error) {
      const err = error as AxiosError<ApiError>;

      return rejectWithValue(err.response?.data?.message ?? "Login failed");
    }
  },
);

////////////google login thunk////////////
export const googleAuthThunk = createAsyncThunk(
  "auth/goole",

  async (payload: GoogleAuthRequest, { rejectWithValue }) => {
    try {
      return await authApi.googleAuth(payload);
    } catch (error) {
      const err = error as AxiosError<ApiError>;

      return rejectWithValue(err.response?.data?.message ?? "Login failed");
    }
  },
);

////////////logout thunk////////////
export const logoutThunk = createAsyncThunk(
  "auth/logout",

  async () => {
    await authApi.logout();
  },
);
