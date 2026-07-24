import { createSlice } from "@reduxjs/toolkit";
import {
  registerThunk,
  resendOtpThunk,
  verifyRegistrationThunk,
} from "./registerThunk";

interface AuthState {
  registerLoading: boolean;
  verifyLoading: boolean;
  resendOtpLoading: boolean;

  error: string | null;
}

const initialState: AuthState = {
  registerLoading: false,
  verifyLoading: false,
  resendOtpLoading: false,

  error: null,
};

const registerSlice = createSlice({
  name: "register",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      //REGISTER
      .addCase(registerThunk.pending, (state) => {
        state.registerLoading = true;
        state.error = null;
      })

      .addCase(registerThunk.fulfilled, (state) => {
        state.registerLoading = false;
      })

      .addCase(registerThunk.rejected, (state, action) => {
        state.registerLoading = false;
        state.error = action.payload as string;
      })

      //VERIFY REGISTRATION
      .addCase(verifyRegistrationThunk.pending, (state) => {
        state.verifyLoading = true;
        state.error = null;
      })

      .addCase(verifyRegistrationThunk.fulfilled, (state) => {
        state.verifyLoading = false;
      })

      .addCase(verifyRegistrationThunk.rejected, (state, action) => {
        state.verifyLoading = false;
        state.error = action.payload as string;
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
        state.error = action.payload as string;
      });
  },
});

export default registerSlice.reducer;
