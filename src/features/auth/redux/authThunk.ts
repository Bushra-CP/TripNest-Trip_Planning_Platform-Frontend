import { createAsyncThunk } from "@reduxjs/toolkit";
import { authRepository } from "../repository/auth.repository";
import type { AxiosError } from "axios";
import type { LoginRequestDto } from "../dto/login-request.dto";

//ERROR OBJECT INTERFACE
interface ApiError {
  message: string;
}

//LOGIN THUNK
export const loginThunk = createAsyncThunk(
  "auth/login",

  async (payload: LoginRequestDto, { rejectWithValue }) => {
    try {
      return await authRepository.login(payload);
    } catch (error) {
      const err = error as AxiosError<ApiError>;

      return rejectWithValue(err.response?.data?.message ?? "Login failed");
    }
  },
);

//LOGOUT THUNK
export const logoutThunk = createAsyncThunk(
  "auth/logout",

  async () => {
    await authRepository.logout();
  },
);
