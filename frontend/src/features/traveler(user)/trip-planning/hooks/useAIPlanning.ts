import { useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from "@/app/store";

import {
  addMessage,
  setLoading,
  setTripRequirements,
  setMissingFields,
  setIsComplete,
  setCanGenerateDraft,
  setRoute,
  setThreadId,
} from "../redux/ai-planning/ai-planning.slice";

import type { ChatMessage } from "../interfaces/ai-planning.interfaces";

import { sendMessage } from "../api/ai-planning.api";

export const useAIPlanning = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    messages,
    loading,
    threadId,
    tripRequirements,
    missingFields,
    isComplete,
    canGenerateDraft,
    route,
  } = useSelector((state: RootState) => state.aiPlanning);

  const handleSend = async (message: string): Promise<void> => {
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: message,
    };

    dispatch(addMessage(userMessage));
    dispatch(setLoading(true));

    try {
      /*
       * Send the complete conversation to the backend.
       * The backend currently only uses the latest message,
       * but keeping the frontend conversation here makes
       * the architecture ready for future conversation memory.
       */
      const updatedMessages = [...messages, userMessage];

      const data = await sendMessage(updatedMessages,threadId);

      dispatch(setThreadId(data.threadId))

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.reply,
      };

      dispatch(addMessage(assistantMessage));

      dispatch(setTripRequirements(data.requirements));
      dispatch(setMissingFields(data.missingFields));
      dispatch(setIsComplete(data.isComplete));
      dispatch(setCanGenerateDraft(data.canGenerateDraft));
      dispatch(setRoute(data.route));
    } catch (error) {
      console.error("Failed to send AI message:", error);

      const errorMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Sorry, I couldn't process your request. Please try again.",
      };

      dispatch(addMessage(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    messages,
    loading,
    threadId,
    tripRequirements,
    missingFields,
    isComplete,
    canGenerateDraft,
    route,
    handleSend,
  };
};
