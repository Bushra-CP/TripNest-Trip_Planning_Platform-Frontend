import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RegisterRequest } from "../types/register.request";
import type { AxiosError } from "axios";
import type { VerifyRegistrationRequest } from "../types/verify-registration-request";
import type { ResendOtpRequest } from "../types/resend-otp-request";
import { registerApi } from "../api/register.api";

//ERROR OBJECT INTERFACE
interface ApiError {
  message: string;
}

/*-----------------------
  REGISTER THUNK
------------------------*/
export const registerThunk = createAsyncThunk(
  "/register",

  async (payload: RegisterRequest, { rejectWithValue }) => {
    try {
      const response = await registerApi.register(payload);

      // console.log(response);

      sessionStorage.setItem(
        "pendingRegistration",
        JSON.stringify({
          userId: response.userId,
          email: response.email,
          expiresAt: Date.now() + 60 * 1000,
        }),
      );

      return response;
    } catch (error) {
      const err = error as AxiosError<ApiError>;

      return rejectWithValue(
        err.response?.data?.message ?? "Registration failed",
      );
    }
  },
);

/*-----------------------
  VERIFY REGISTRATION
------------------------*/
export const verifyRegistrationThunk = createAsyncThunk(
  "/verifyRegistration",

  async (payload: VerifyRegistrationRequest, { rejectWithValue }) => {
    try {
      const response = await registerApi.verifyRegistration(payload);

      console.log(response);
      

      sessionStorage.removeItem("pendingRegistration");

      return response;
    } catch (error) {
      const err = error as AxiosError<ApiError>;

      return rejectWithValue(
        err.response?.data?.message ?? "Verification failed",
      );
    }
  },
);

/*-----------------------
  RESEND OTP THUNK
------------------------*/
export const resendOtpThunk = createAsyncThunk(
  "/resendOtp",

  async (payload: ResendOtpRequest, { rejectWithValue }) => {
    try {
      const response = await registerApi.resendOtp(payload);

      const pendingRegistration = sessionStorage.getItem("pendingRegistration");

      if (pendingRegistration) {
        const registration = JSON.parse(pendingRegistration);

        registration.expiresAt = Date.now() + 60 * 1000;

        sessionStorage.setItem(
          "pendingRegistration",
          JSON.stringify(registration),
        );

        return response;
      }
    } catch (error) {
      const err = error as AxiosError<ApiError>;

      return rejectWithValue(
        err.response?.data?.message ?? "Otp resend failed",
      );
    }
  },
);
