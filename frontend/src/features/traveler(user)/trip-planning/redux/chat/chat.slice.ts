import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getMessagesThunk } from "./chat.thunk";
import type { MessageResponse } from "../../types/chat.types";

interface ChatState {
  messages: MessageResponse[];
  isMessagesLoading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  messages: [],
  isMessagesLoading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",

  initialState,

  reducers: {
    // Add a new message
    addMessage: (state, action: PayloadAction<MessageResponse>) => {
      state.messages.push(action.payload);
    },

    // Clear error
    clearChatError: (state) => {
      state.error = null;
    },

    // Clear complete chat state
    clearChat: (state) => {
      state.messages = [];
      state.isMessagesLoading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    /*-----------------------
      GET MESSAGES
    ------------------------*/
    builder
      .addCase(getMessagesThunk.pending, (state) => {
        state.isMessagesLoading = true;
        state.error = null;
      })

      .addCase(getMessagesThunk.fulfilled, (state, action) => {
        state.isMessagesLoading = false;
        state.messages = action.payload;
      })

      .addCase(getMessagesThunk.rejected, (state, action) => {
        state.isMessagesLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addMessage, clearChatError, clearChat } = chatSlice.actions;

export default chatSlice.reducer;
