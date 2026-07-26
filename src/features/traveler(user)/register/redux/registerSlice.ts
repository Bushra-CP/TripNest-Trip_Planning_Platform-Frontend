import { createSlice } from "@reduxjs/toolkit";
import { registerThunk } from "./registerThunk";

interface AuthState {
  registerLoading: boolean;

  error: string | null;
}

const initialState: AuthState = {
  registerLoading: false,

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
      });
  },
});

export default registerSlice.reducer;
