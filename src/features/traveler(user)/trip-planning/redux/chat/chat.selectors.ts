import type { RootState } from "@/app/store";

export const selectMessages = (state: RootState) => state.chat.messages;

export const selectMessagesLoading = (state: RootState) =>
  state.chat.isMessagesLoading;
