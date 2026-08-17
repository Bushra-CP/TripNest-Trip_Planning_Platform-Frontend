import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type {
  TripPlanningMode,
  TripPlanningState,
} from "../types/trip-planning.types";

const initialState: TripPlanningState = {
  mode: "solo",
  roomId: null,
  role: null,
};

const tripPlanningSlice = createSlice({
  name: "TripPlanning",

  initialState,

  reducers: {
    setMode: (state, action: PayloadAction<TripPlanningMode>) => {
      state.mode = action.payload;
    },

    createGroup: (state, action: PayloadAction<string>) => {
      state.mode = "group";

      state.role = "admin";

      state.roomId = action.payload;
    },

    joinGroup: (state, action: PayloadAction<string>) => {
      state.mode = "group";

      state.role = "member";

      state.roomId = action.payload;
    },

    leaveGroup: (state) => {
      state.mode = "solo";

      state.role = null;

      state.roomId = null;
    },
  },
});

export const { setMode, createGroup, joinGroup, leaveGroup } =
  tripPlanningSlice.actions;

export default tripPlanningSlice.reducer;
