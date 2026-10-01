import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { memberApi } from "../../api/member.api";
import type {
  JoinGroupResponse,
  TripMember,
  UpdateMemberRequest,
} from "../../types/member.types";

interface ApiError {
  message: string;
}

// JOIN GROUP
export const joinGroupThunk = createAsyncThunk<
  JoinGroupResponse,
  string,
  { rejectValue: string }
>("member/joinGroup", async (roomId, { rejectWithValue }) => {
  try {
    const response = await memberApi.joinGroup({
      roomId,
    });

    return response.data;
  } catch (error) {
    const err = error as AxiosError<ApiError>;

    return rejectWithValue(
      err.response?.data?.message ?? "Failed to join group",
    );
  }
});

// UPDATE MEMBER ROLE
export const updateMemberThunk = createAsyncThunk<
  TripMember,
  UpdateMemberRequest,
  { rejectValue: string }
>("member/updateMember", async (data, { rejectWithValue }) => {
  try {
    const response = await memberApi.updateMember(data);

    return response.data;
  } catch (error) {
    const err = error as AxiosError<ApiError>;

    return rejectWithValue(
      err.response?.data?.message ?? "Failed to update member",
    );
  }
});

// DELETE / LEAVE GROUP
export const deleteMemberThunk = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>("member/deleteMember", async (threadId, { rejectWithValue }) => {
  try {
    await memberApi.deleteMember({
      threadId,
    });
  } catch (error) {
    const err = error as AxiosError<ApiError>;

    return rejectWithValue(
      err.response?.data?.message ?? "Failed to leave group",
    );
  }
});

// GET ALL MEMBERS
export const getTripMembersThunk = createAsyncThunk<
  TripMember[],
  string,
  { rejectValue: string }
>("member/getTripMembers", async (threadId, { rejectWithValue }) => {
  try {
    const response = await memberApi.getTripMembers(threadId);

    console.log('Members:',response.data);
    

    return response.data;
  } catch (error) {
    const err = error as AxiosError<ApiError>;

    return rejectWithValue(
      err.response?.data?.message ?? "Failed to fetch trip members",
    );
  }
});
