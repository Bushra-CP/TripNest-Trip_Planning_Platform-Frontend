import { createAsyncThunk } from "@reduxjs/toolkit";
import type { LoginRequestDto } from "../dto/register.request.dto";
import { authRepository } from "../repository/auth.repository";
import type { AxiosError } from "axios";
import type { RegisterRequestDto } from "../dto/login.request.dto";

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

//REGISTER THUNK
export const registerThunk = createAsyncThunk(
  "auth/register",

  async (payload: RegisterRequestDto, { rejectWithValue }) => {
    try {
      return await authRepository.register(payload);
    } catch (error) {
      const err = error as AxiosError<ApiError>;

      return rejectWithValue(
        err.response?.data?.message ?? "Registration failed",
      );
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
