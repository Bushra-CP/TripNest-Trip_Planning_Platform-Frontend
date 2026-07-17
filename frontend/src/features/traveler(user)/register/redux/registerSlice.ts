import { createSlice } from "@reduxjs/toolkit";
import type { UserResponseDto } from "../dto/user.response.dto";
import {
  registerThunk,
  resendOtpThunk,
  verifyRegistrationThunk,
} from "./registerThunk";

interface AuthState {
  user: UserResponseDto | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,
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
        state.isLoading = true;
        state.error = null;
      })

      .addCase(registerThunk.fulfilled, (state) => {
        state.isLoading = false;
      })

      .addCase(registerThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      //VERIFY REGISTRATION
      .addCase(verifyRegistrationThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(verifyRegistrationThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
      })

      .addCase(verifyRegistrationThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      //RESEND OTP
      .addCase(resendOtpThunk.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(resendOtpThunk.fulfilled, (state) => {
        state.isLoading = false;
      })

      .addCase(resendOtpThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default registerSlice.reducer;
