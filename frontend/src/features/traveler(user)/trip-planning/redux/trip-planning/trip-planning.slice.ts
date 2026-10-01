import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  TripPlanningMode,
  TripPlanningState,
} from "../../interfaces/trip-planning.interfaces";
import {
  convertToGroupTripThunk,
  getTripByThreadIdThunk,
} from "./trip-planning.thunk";
import { getRoomThunk } from "../chat/chat.thunk";

const initialState: TripPlanningState = {
  mode: "solo",
  tripId: null,
  roomId: null,
  isTripLoading: false,
};

const tripPlanningSlice = createSlice({
  name: "TripPlanning",

  initialState,

  reducers: {
    setMode: (state, action: PayloadAction<TripPlanningMode>) => {
      state.mode = action.payload;
    },

    setTripState: (
      state,
      action: PayloadAction<{
        tripId: string;
        roomId: string;
        mode: TripPlanningMode;
      }>,
    ) => {
      state.tripId = action.payload.tripId;
      state.roomId = action.payload.roomId;
      state.mode = action.payload.mode;
    },

    leaveGroup: (state) => {
      state.mode = "solo";
      state.roomId = null;
    },

    clearTripPlanning: (state) => {
      state.mode = "solo";
      state.tripId = null;
      state.roomId = null;
      state.isTripLoading = false;
    },
  },

  extraReducers: (builder) => {
    /*-----------------------
      CONVERT / CREATE GROUP TRIP
    ------------------------*/
    builder
      .addCase(convertToGroupTripThunk.pending, (state) => {
        state.isTripLoading = true;
      })

      .addCase(convertToGroupTripThunk.fulfilled, (state, action) => {
        state.isTripLoading = false;

        state.mode = action.payload.tripMode;

        state.tripId = action.payload._id;

        state.roomId = action.payload.roomId;
      })

      .addCase(convertToGroupTripThunk.rejected, (state) => {
        state.isTripLoading = false;
      });

    /*-----------------------
      GET ROOM
    ------------------------*/
    builder
      .addCase(getRoomThunk.pending, (state) => {
        state.isTripLoading = true;
      })

      .addCase(getRoomThunk.fulfilled, (state, action) => {
        state.isTripLoading = false;

        state.mode = "group";

        state.roomId = action.payload.roomId;
      })

      .addCase(getRoomThunk.rejected, (state) => {
        state.isTripLoading = false;
      })

      /*-----------------------
      GET TRIP BY THREAD ID
    ------------------------*/
      .addCase(getTripByThreadIdThunk.pending, (state) => {
        state.isTripLoading = true;
      })

      .addCase(getTripByThreadIdThunk.fulfilled, (state, action) => {
        state.isTripLoading = false;

        state.tripId = action.payload._id;
        state.mode = action.payload.tripMode;
        state.roomId = action.payload.roomId;
      })

      .addCase(getTripByThreadIdThunk.rejected, (state) => {
        state.isTripLoading = false;
      });
  },
});

export const { setMode, setTripState, leaveGroup, clearTripPlanning } =
  tripPlanningSlice.actions;

export default tripPlanningSlice.reducer;
