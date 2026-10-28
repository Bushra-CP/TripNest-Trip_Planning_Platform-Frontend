import { createSlice } from "@reduxjs/toolkit";

import type { TripMember } from "../../types/member.types";

import {
  deleteMemberThunk,
  getTripMembersThunk,
  joinGroupThunk,
  updateMemberThunk,
} from "./member.thunk";

interface MemberState {
  members: TripMember[];
  joinedMember: TripMember | null;

  isJoining: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  isLoadingMembers: boolean;

  error: string | null;
}

const initialState: MemberState = {
  members: [],
  joinedMember: null,

  isJoining: false,
  isUpdating: false,
  isDeleting: false,
  isLoadingMembers: false,

  error: null,
};

const memberSlice = createSlice({
  name: "member",

  initialState,

  reducers: {
    clearMemberState: (state) => {
      state.members = [];
      state.joinedMember = null;

      state.isJoining = false;
      state.isUpdating = false;
      state.isDeleting = false;
      state.isLoadingMembers = false;

      state.error = null;
    },

    clearMemberError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    // JOIN GROUP
    builder
      .addCase(joinGroupThunk.pending, (state) => {
        state.isJoining = true;
        state.error = null;
      })

      .addCase(joinGroupThunk.fulfilled, (state, action) => {
        state.isJoining = false;

        state.joinedMember = action.payload.member;

        const alreadyExists = state.members.some(
          (member) => member._id === action.payload.member._id,
        );

        if (!alreadyExists) {
          state.members.push(action.payload.member);
        }
      })

      .addCase(joinGroupThunk.rejected, (state, action) => {
        state.isJoining = false;

        state.error = action.payload ?? "Failed to join group";
      });

    // UPDATE OWN MEMBER ROLE
    builder
      .addCase(updateMemberThunk.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })

      .addCase(updateMemberThunk.fulfilled, (state, action) => {
        state.isUpdating = false;

        const index = state.members.findIndex(
          (member) => member._id === action.payload._id,
        );

        if (index !== -1) {
          state.members[index] = action.payload;
        }

        if (state.joinedMember?._id === action.payload._id) {
          state.joinedMember = action.payload;
        }
      })

      .addCase(updateMemberThunk.rejected, (state, action) => {
        state.isUpdating = false;

        state.error = action.payload ?? "Failed to update member";
      });

    // DELETE / LEAVE GROUP
    builder
      .addCase(deleteMemberThunk.pending, (state) => {
        state.isDeleting = true;
        state.error = null;
      })

      .addCase(deleteMemberThunk.fulfilled, (state) => {
        state.isDeleting = false;

        state.joinedMember = null;
      })

      .addCase(deleteMemberThunk.rejected, (state, action) => {
        state.isDeleting = false;

        state.error = action.payload ?? "Failed to leave group";
      });

    // GET ALL MEMBERS
    builder
      .addCase(getTripMembersThunk.pending, (state) => {
        state.isLoadingMembers = true;
        state.error = null;
      })

      .addCase(getTripMembersThunk.fulfilled, (state, action) => {
        state.isLoadingMembers = false;

        state.members = action.payload;
      })

      .addCase(getTripMembersThunk.rejected, (state, action) => {
        state.isLoadingMembers = false;

        state.error = action.payload ?? "Failed to fetch trip members";
      });
  },
});

export const { clearMemberState, clearMemberError } = memberSlice.actions;

export default memberSlice.reducer;
