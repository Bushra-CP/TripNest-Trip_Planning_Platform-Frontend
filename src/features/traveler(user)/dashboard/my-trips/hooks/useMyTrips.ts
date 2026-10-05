import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import type { AppDispatch, RootState } from "@/app/store";

import { fetchMyTripsThunk } from "../redux/my-trips.thunk";
import { restorePlanningStateThunk } from "@/features/traveler(user)/trip-planning/redux/ai-planning/ai-planning.thunk";
import { clearAIPlanning } from "@/features/traveler(user)/trip-planning/redux/ai-planning/ai-planning.slice";
import { clearChat } from "@/features/traveler(user)/trip-planning/redux/chat/chat.slice";
import { clearTripVehicles } from "@/features/traveler(user)/trip-planning/redux/trip-vehicle/trip-vehicle.slice";
import { clearTripPlanning } from "@/features/traveler(user)/trip-planning/redux/trip-planning/trip-planning.slice";

export type TripType = "Solo" | "Group";

export type ViewState = "content" | "loading" | "error" | "empty";

export interface TripItem {
  id: string;
  title: string;
  type: TripType;
  threadId: string;
  updatedAt?: string;
  collaboratorsCount?: number;
}

export const useMyTrips = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { trips, isLoading, error } = useSelector(
    (state: RootState) => state.myTrips,
  );

  const [filterType, setFilterType] = useState<"ALL" | "Solo" | "Group">("ALL");

  const [searchQuery, setSearchQuery] = useState("");

  /*
   * Fetch trips whenever search/filter changes.
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(
        fetchMyTripsThunk({
          search: searchQuery,
          tripMode:
            filterType === "ALL"
              ? undefined
              : filterType === "Solo"
                ? "solo"
                : "group",
        }),
      );
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, searchQuery, filterType]);

  /*
   * Convert backend trips into the format
   * expected by the existing UI components.
   */
  const tripItems: TripItem[] = trips.map((trip) => ({
    id: trip._id,
    title: trip.title || "Untitled Trip",
    type: trip.tripMode === "solo" ? "Solo" : "Group",
    threadId: trip.threadId,
    updatedAt: trip.updatedAt,
  }));

  /*
   * Current page state.
   */
  let viewState: ViewState = "content";

  if (isLoading) {
    viewState = "loading";
  } else if (error) {
    viewState = "error";
  } else if (trips.length === 0) {
    viewState = "empty";
  }

  /*
   * Open a saved trip.
   *
   * The threadId is passed through the URL.
   * useAIPlanning will read this threadId and
   * dispatch restorePlanningStateThunk().
   */
  const handleSelectTrip = async (trip: TripItem) => {
    dispatch(clearChat());

    dispatch(clearAIPlanning());

    dispatch(clearTripVehicles());

    dispatch(clearTripPlanning());

    const result = await dispatch(restorePlanningStateThunk(trip.threadId));

    if (restorePlanningStateThunk.fulfilled.match(result)) {
      navigate("/trip-plan");
    }
  };

  /*
   * Create a new trip.
   */
  const handleCreateNewTrip = () => {
    dispatch(clearChat());
    dispatch(clearAIPlanning());
    dispatch(clearTripVehicles());
    dispatch(clearTripPlanning());
    
    navigate("/trip-plan");
  };

  /*
   * Reset search and filter.
   */
  const handleResetFilter = () => {
    setFilterType("ALL");
    setSearchQuery("");
  };

  /*
   * Retry fetching trips.
   */
  const handleRetry = () => {
    dispatch(
      fetchMyTripsThunk({
        search: searchQuery,
        tripMode:
          filterType === "ALL"
            ? undefined
            : filterType === "Solo"
              ? "solo"
              : "group",
      }),
    );
  };

  return {
    trips: tripItems,

    filterType,
    setFilterType,

    searchQuery,
    setSearchQuery,

    viewState,

    error,

    handleSelectTrip,
    handleCreateNewTrip,
    handleResetFilter,
    handleRetry,
  };
};
