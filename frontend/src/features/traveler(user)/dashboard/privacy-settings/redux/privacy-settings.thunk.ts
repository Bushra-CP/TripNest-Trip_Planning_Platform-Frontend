import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ChangePasswordRequest } from "../types/change-password.req-res";
import { privacySettingsApi } from "../api/privacy-settings.api";
import type { ChangeEmailRequest } from "../types/change-email.req-res";
import type { AxiosError } from "axios";
import type { VerifyChangeEmailOtpRequest } from "../types/verify-change-email-otp.req-res";
import type { ResendChangeEmailOtpRequest } from "../types/resend-change-email-otp.req-res";

//ERROR OBJECT INTERFACE
interface ApiError {
  message: string;
}

/////////////////////////////////////////////////////////////
//CHANGE PASSWORD
export const changePasswordThunk = createAsyncThunk(
  "traveler/changePassword",

  async (payload: ChangePasswordRequest, { rejectWithValue }) => {
    try {
      const res = await privacySettingsApi.changePassword(payload);

      return res.data;
    } catch (error) {
      const err = error as AxiosError<ApiError>;

      return rejectWithValue(err.response?.data?.message);
    }
  },
);

/////////////////////////////////////////////////////////////
//CHANGE EMAIL
export const changeEmailThunk = createAsyncThunk(
  "traveler/changeEmail",

  async (payload: ChangeEmailRequest, { rejectWithValue }) => {
    try {
      const response = await privacySettingsApi.changeEmail(payload);

      // console.log(response.data);

      sessionStorage.setItem(
        "pendingChangeEmail",
        JSON.stringify({
          userId: response.data.userId,
          email: payload.newEmail,
          expiresAt: Date.now() + 60 * 1000,
        }),
      );

      return response.data;
    } catch (error) {
      const err = error as AxiosError<ApiError>;

      return rejectWithValue(err.response?.data?.message);
    }
  },
);

/////////////////////////////////////////////////////////////
//VERIFY CHANGE EMAIL OTP
export const verifyChangeEmailOtpThunk = createAsyncThunk(
  "traveler/verifyChangeEmailOtp",

  async (payload: VerifyChangeEmailOtpRequest, { rejectWithValue }) => {
    try {
      const response = await privacySettingsApi.verifyChangeEmailOtp(payload);

      sessionStorage.removeItem("pendingChangeEmail");

      return response.data;
    } catch (error) {
      const err = error as AxiosError<ApiError>;

      return rejectWithValue(
        err.response?.data?.message ?? "OTP verification failed",
      );
    }
  },
);

/////////////////////////////////////////////////////////////
//RESEND CHANGE EMAIL OTP
export const resendChangeEmailOtpThunk = createAsyncThunk(
  "traveler/resendChangeEmailOtp",

  async (payload: ResendChangeEmailOtpRequest, { rejectWithValue }) => {
    try {
      const response = await privacySettingsApi.resendChangeEmailOtp(payload);

      const pendingChangeEmail = sessionStorage.getItem("pendingChangeEmail");

      if (pendingChangeEmail) {
        const changeEmail = JSON.parse(pendingChangeEmail);

        changeEmail.expiresAt = Date.now() + 60 * 1000;

        sessionStorage.setItem(
          "pendingChangeEmail",
          JSON.stringify(changeEmail),
        );
      }

      // console.log(response.data);

      return response.data;
    } catch (error) {
      const err = error as AxiosError<ApiError>;

      return rejectWithValue(
        err.response?.data?.message ?? "Unable to resend OTP",
      );
    }
  },
);
