import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import { chatApi } from "../../api/chat.api";
import type { MessageResponse } from "../../types/chat.types";

// ERROR OBJECT INTERFACE
interface ApiError {
  message: string;
}

/*-----------------------
  CREATE ROOM THUNK
------------------------*/
export const createRoomThunk = createAsyncThunk(
  "/chat/createRoom",

  async (_, { rejectWithValue }) => {
    try {
      const response = await chatApi.createRoom();

      console.log(response);

      return response;
    } catch (error) {
      const err = error as AxiosError<ApiError>;

      return rejectWithValue(
        err.response?.data?.message ?? "Failed to create room",
      );
    }
  },
);

/*-----------------------
  GET ROOM THUNK - JOIN ROOM
------------------------*/
export const getRoomThunk = createAsyncThunk(
  "/chat/getRoom",

  async (roomId: string, { rejectWithValue }) => {
    try {
      const response = await chatApi.getRoom(roomId);

      return response;
    } catch (error) {
      const err = error as AxiosError<ApiError>;

      return rejectWithValue(
        err.response?.data?.message ?? "Failed to get room",
      );
    }
  },
);

/*-----------------------
  GET MESSAGES THUNK
------------------------*/

export const getMessagesThunk = createAsyncThunk<
  MessageResponse[],
  string,
  { rejectValue: string }
>(
  "/chat/getMessages",

  async (roomId, { rejectWithValue }) => {
    try {
      const response = await chatApi.getMessages(roomId);

      return response;
    } catch (error) {
      const err = error as AxiosError<ApiError>;

      return rejectWithValue(
        err.response?.data?.message ?? "Failed to get messages",
      );
    }
  },
);
