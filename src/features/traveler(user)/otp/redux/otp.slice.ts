import { createSlice } from "@reduxjs/toolkit";
import {
  resendOtpThunk,
  verifyRegistrationThunk,
} from "../../register/redux/register.thunk";
import {
  resendResetOtpThunk,
  verifyResetOtpThunk,
} from "../../forgot-password/redux/forgot-password.thunk";
import {
  resendChangeEmailOtpThunk,
  verifyChangeEmailOtpThunk,
} from "../../dashboard/privacy-settings/redux/privacy-settings.thunk";

interface OtpState {
  verifyOtpLoading: boolean;
  resendOtpLoading: boolean;
  error: string | null;
}

const initialState: OtpState = {
  verifyOtpLoading: false,
  resendOtpLoading: false,
  error: null,
};

const otpSlice = createSlice({
  name: "otp",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      //VERIFY REGISTRATION
      .addCase(verifyRegistrationThunk.pending, (state) => {
        state.verifyOtpLoading = true;
        state.error = null;
      })

      .addCase(verifyRegistrationThunk.fulfilled, (state) => {
        state.verifyOtpLoading = false;
      })

      .addCase(verifyRegistrationThunk.rejected, (state, action) => {
        state.verifyOtpLoading = false;
        state.error = (action.payload as string) ?? "OTP verification failed";
      })

      //RESEND OTP
      .addCase(resendOtpThunk.pending, (state) => {
        state.resendOtpLoading = true;
      })

      .addCase(resendOtpThunk.fulfilled, (state) => {
        state.resendOtpLoading = false;
      })

      .addCase(resendOtpThunk.rejected, (state, action) => {
        state.resendOtpLoading = false;
        state.error = (action.payload as string) ?? "Unable to resend OTP";
      })

      //VERIFY RESET OTP
      .addCase(verifyResetOtpThunk.pending, (state) => {
        state.verifyOtpLoading = true;
        state.error = null;
      })
      .addCase(verifyResetOtpThunk.fulfilled, (state) => {
        state.verifyOtpLoading = false;
      })
      .addCase(verifyResetOtpThunk.rejected, (state, action) => {
        state.verifyOtpLoading = false;
        state.error = (action.payload as string) ?? "OTP verification failed";
      })

      //Resend Reset OTP
      .addCase(resendResetOtpThunk.pending, (state) => {
        state.resendOtpLoading = true;
        state.error = null;
      })
      .addCase(resendResetOtpThunk.fulfilled, (state) => {
        state.resendOtpLoading = false;
      })
      .addCase(resendResetOtpThunk.rejected, (state, action) => {
        state.resendOtpLoading = false;
        state.error = (action.payload as string) ?? "Unable to resend OTP";
      })

      // VERIFY CHANGE EMAIL OTP

      .addCase(verifyChangeEmailOtpThunk.pending, (state) => {
        state.verifyOtpLoading = true;
        state.error = null;
      })
      .addCase(verifyChangeEmailOtpThunk.fulfilled, (state) => {
        state.verifyOtpLoading = false;
      })
      .addCase(verifyChangeEmailOtpThunk.rejected, (state, action) => {
        state.verifyOtpLoading = false;
        state.error = (action.payload as string) ?? "OTP verification failed";
      })

      // RESEND CHANGE EMAIL OTP

      .addCase(resendChangeEmailOtpThunk.pending, (state) => {
        state.resendOtpLoading = true;
        state.error = null;
      })
      .addCase(resendChangeEmailOtpThunk.fulfilled, (state) => {
        state.resendOtpLoading = false;
      })
      .addCase(resendChangeEmailOtpThunk.rejected, (state, action) => {
        state.resendOtpLoading = false;
        state.error = (action.payload as string) ?? "Unable to resend OTP";
      });
  },
});

export default otpSlice.reducer;
