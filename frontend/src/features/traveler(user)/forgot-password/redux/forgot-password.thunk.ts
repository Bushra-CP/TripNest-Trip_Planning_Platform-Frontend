import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ForgotPasswordRequest } from "../types/forgot-password.request";
import type { AxiosError } from "axios";
import type { VerifyResetOtpRequest } from "../types/verify-reset-otp.request";
import type { ResetPasswordRequest } from "../types/reset-password.request";
import { forgotPasswordApi } from "../api/forgot-password.api";

//ERROR OBJECT INTERFACE
interface ApiError {
  message: string;
}

////////////forgot password////////////
export const forgotPasswordThunk = createAsyncThunk(
  "auth/forgotPassword",

  async (payload: ForgotPasswordRequest, { rejectWithValue }) => {
    try {
      const response = await forgotPasswordApi.forgotPassword(payload);

      console.log(response.data.userId);

      sessionStorage.setItem(
        "pendingPasswordReset",
        JSON.stringify({
          userId: response.data.userId,
          email: payload.email,
          expiresAt: Date.now() + 60 * 1000,
        }),
      );

      return response;
    } catch (error) {
      const err = error as AxiosError<ApiError>;

      return rejectWithValue(
        err.response?.data?.message ?? "Unable to send reset OTP",
      );
    }
  },
);

////////////verify reset otp////////////
export const verifyResetOtpThunk = createAsyncThunk(
  "auth/verifyResetOtp",

  async (payload: VerifyResetOtpRequest, { rejectWithValue }) => {
    try {
      const response = await forgotPasswordApi.verifyResetOtp(payload);

      sessionStorage.removeItem("pendingPasswordReset");

      return response;
    } catch (error) {
      const err = error as AxiosError<ApiError>;

      return rejectWithValue(
        err.response?.data?.message ?? "OTP verification failed",
      );
    }
  },
);

////////////reset password////////////
export const resetPasswordThunk = createAsyncThunk(
  "auth/resetPassword",

  async (payload: ResetPasswordRequest, { rejectWithValue }) => {
    try {
      const response = await forgotPasswordApi.resetPassword(payload);

      return response;
    } catch (error) {
      const err = error as AxiosError<ApiError>;

      return rejectWithValue(
        err.response?.data?.message ?? "Password reset failed",
      );
    }
  },
);

/*-----------------------
 RESEND RESET OTP THUNK
------------------------*/
export const resendResetOtpThunk = createAsyncThunk(
  "/resendResetOtp",

  async (payload: ForgotPasswordRequest, { rejectWithValue }) => {
    try {
      const response = await forgotPasswordApi.resendResetOtp(payload);

      const pendingPasswordReset = sessionStorage.getItem(
        "pendingPasswordReset",
      );

      if (pendingPasswordReset) {
        const reset = JSON.parse(pendingPasswordReset);

        reset.expiresAt = Date.now() + 60 * 1000;

        sessionStorage.setItem("pendingPasswordReset", JSON.stringify(reset));
      }

      return response;
    } catch (error) {
      const err = error as AxiosError<ApiError>;

      return rejectWithValue(
        err.response?.data?.message ?? "OTP resend failed",
      );
    }
  },
);
