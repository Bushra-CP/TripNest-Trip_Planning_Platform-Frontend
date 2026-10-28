import { useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from "@/app/store";

import {
  addMessage,
  setLoading,
  setThreadId,
} from "../redux/ai-planning/ai-planning.slice";

import type { ChatMessage } from "../interfaces/ai-planning.interfaces";

import { useEffect, useRef } from "react";
import {
  restorePlanningStateThunk,
  sendMessageThunk,
} from "../redux/ai-planning/ai-planning.thunk";
import { fetchTripVehicleCostsThunk } from "../redux/trip-cost/trip-cost.thunk";
import { selectTripVehicles } from "../redux/trip-vehicle/trip-vehicle.selectors";

export const useAIPlanning = () => {
  const dispatch = useDispatch<AppDispatch>();

  const hasRestoredRef = useRef(false);

  const {
    messages,
    loading,
    threadId,
    tripRequirements,
    missingFields,
    isComplete,
    canGenerateDraft,
    routeChanged,
    route,
  } = useSelector((state: RootState) => state.aiPlanning);

  const tripVehicles = useSelector(selectTripVehicles);

  useEffect(() => {
    if (!threadId || hasRestoredRef.current) {
      return;
    }

    hasRestoredRef.current = true;

    console.log("Restoring AI planning state:", threadId);

    dispatch(restorePlanningStateThunk(threadId));
  }, [threadId, dispatch]);

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

      const data = await dispatch(
        sendMessageThunk({
          messages: updatedMessages,
          threadId,
        }),
      ).unwrap();

      console.log("AI response data:", data);
      console.log("RAG sources:", data.ragSources);

      dispatch(setThreadId(data.threadId));

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.reply,
        ragSources: data.ragSources,
      };

      dispatch(addMessage(assistantMessage));

      /**
       * Route changed
       * Fetch latest vehicle costs.
       */
      if (data.routeChanged && tripVehicles.length > 0) {
        try {
          await dispatch(fetchTripVehicleCostsThunk(data.tripId)).unwrap();
        } catch (error) {
          console.error("Failed to refresh trip costs:", error);
        }
      }
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
    routeChanged,
    route,
    handleSend,
  };
};
