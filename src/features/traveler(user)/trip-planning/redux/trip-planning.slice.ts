import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type {
  TripPlanningMode,
  TripPlanningState,
} from "../interfaces/trip-planning.interfaces";
import { createRoomThunk, getRoomThunk } from "./chat/chat.thunk";

const initialState: TripPlanningState = {
  mode: "solo",
  roomId: null,
  isRoomLoading: false,
};

const tripPlanningSlice = createSlice({
  name: "TripPlanning",

  initialState,

  reducers: {
    setMode: (state, action: PayloadAction<TripPlanningMode>) => {
      state.mode = action.payload;
    },

    leaveGroup: (state) => {
      state.mode = "solo";
      state.roomId = null;
    },
  },

  extraReducers: (builder) => {
    /*-----------------------
      CREATE ROOM
    ------------------------*/
    builder
      .addCase(createRoomThunk.pending, (state) => {
        state.isRoomLoading = true;
      })

      .addCase(createRoomThunk.fulfilled, (state, action) => {
        state.mode = "group";
        state.roomId = action.payload.roomId;
        state.isRoomLoading = false;
      })

      .addCase(createRoomThunk.rejected, (state) => {
        state.isRoomLoading = false;
      });

    /*-----------------------
      GET ROOM
    ------------------------*/
    builder
      .addCase(getRoomThunk.pending, (state) => {
        state.isRoomLoading = true;
      })

      .addCase(getRoomThunk.fulfilled, (state, action) => {
        state.mode = "group";
        state.roomId = action.payload.roomId;
        state.isRoomLoading = false;
      })

      .addCase(getRoomThunk.rejected, (state) => {
        state.isRoomLoading = false;
      });
  },
});

export const { setMode, leaveGroup } = tripPlanningSlice.actions;

export default tripPlanningSlice.reducer;
