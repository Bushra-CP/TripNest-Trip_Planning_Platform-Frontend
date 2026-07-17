import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RegisterRequestDto } from "../dto/register.request.dto";
import { registerRepository } from "../repository/register.repository";
import type { AxiosError } from "axios";
import type { VerifyRegistrationRequestDto } from "../dto/verify-registration-request.dto";
import type { ResendOtpRequestDto } from "../dto/resend-otp-request.dto";

//ERROR OBJECT INTERFACE
interface ApiError {
  message: string;
}

//REGISTER THUNK
export const registerThunk = createAsyncThunk(
  "/register",

  async (payload: RegisterRequestDto, { rejectWithValue }) => {
    try {
      const response = await registerRepository.register(payload);

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

//VERIFY REGISTRATION
export const verifyRegistrationThunk = createAsyncThunk(
  "/verifyRegistration",

  async (payload: VerifyRegistrationRequestDto, { rejectWithValue }) => {
    try {
      const response = await registerRepository.verifyRegistration(payload);

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

export const resendOtpThunk = createAsyncThunk(
  "/resendOtp",

  async (payload: ResendOtpRequestDto, { rejectWithValue }) => {
    try {
      const response = await registerRepository.resendOtp(payload);

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
