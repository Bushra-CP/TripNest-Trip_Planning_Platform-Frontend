import { createSlice } from "@reduxjs/toolkit";
import { googleAuthThunk, loginThunk, logoutThunk } from "./authThunk";
import type { UserResponse } from "../../register/types/user.response";
import { verifyRegistrationThunk } from "../../register/redux/register.thunk";
import { UpdateProfilePictureThunk } from "../../dashboard/profile/redux/profile.thunk";

interface AuthState {
  user: UserResponse | null;
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

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },

    clearAuth(state) {
      state.user = null;
      state.accessToken = null;
      state.error = null;
      state.isLoading = false;
    },

    clearError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      ////////////LOGIN////////////
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data.user;
        state.accessToken = action.payload.data.accessToken;
        state.isAuthenticated = true;
      })

      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) ?? "Login failed";
      })

      ////////////VERIFY REGISTRATION////////////
      .addCase(verifyRegistrationThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(verifyRegistrationThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data.user;
        state.accessToken = action.payload.data.accessToken;
        state.isAuthenticated = true;
      })

      .addCase(verifyRegistrationThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      ////////////GOOGLE AUTH////////////
      .addCase(googleAuthThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(googleAuthThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data.user;
        state.accessToken = action.payload.data.accessToken;
        state.isAuthenticated = true;
      })

      .addCase(googleAuthThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) ?? "Google auth failed";
      })

      ////////////LOGOUT////////////
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.isAuthenticated = false;
        state.error = null;
      })

      //UPDATE PROFILE IMAGE
      .addCase(UpdateProfilePictureThunk.fulfilled, (state, action) => {
        if (state.user) {
          state.user.profileImage = action.payload.profileImage;
        }
      });
  },
});

export const { setAccessToken, clearAuth, clearError } = authSlice.actions;

export default authSlice.reducer;
