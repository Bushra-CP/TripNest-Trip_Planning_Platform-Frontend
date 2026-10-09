import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/app/store";
import {
  selectMode,
  selectTripId,
} from "../redux/trip-planning/trip-planning.selectors";
import {
  selectTripVehicles,
  selectFinalVehicle,
  selectTripVehicleLoading,
  selectTripVehicleError,
} from "../redux/trip-vehicle/trip-vehicle.selectors";
import {
  addVehicleToTripThunk,
  removeVehicleFromTripThunk,
  voteForVehicleThunk,
  removeVoteThunk,
  finalizeVehicleThunk,
  getTripVehiclesThunk,
  getFinalSelectedVehicleThunk,
  unfinalizeVehicleThunk,
} from "../redux/trip-vehicle/trip-vehicle.thunk";
import { selectJoinedMember } from "../redux/member/member.selectors";
import { toast } from "sonner";
import { fetchTripVehicleCostsThunk } from "../redux/trip-cost/trip-cost.thunk";
import { clearTripCosts } from "../redux/trip-cost/trip-cost.slice";
import {
  selectTripCostLoading,
  selectTripVehicleCosts,
} from "../redux/trip-cost/trip-cost.selectors";
import { selectRoute } from "../redux/ai-planning/ai-planning.selectors";

const useTripVehicleManagement = () => {
  const dispatch = useDispatch<AppDispatch>();

  const tripId = useSelector(selectTripId);
  const tripMode = useSelector(selectMode);
  const joinedMember = useSelector(selectJoinedMember);

  const tripVehicles = useSelector(selectTripVehicles);
  const finalVehicle = useSelector(selectFinalVehicle);

  const isLoading = useSelector(selectTripVehicleLoading);
  const error = useSelector(selectTripVehicleError);

  const tripVehicleCosts = useSelector(selectTripVehicleCosts);

  const tripCostLoading = useSelector(selectTripCostLoading);

  const route = useSelector(selectRoute);

  const isGroupTrip = tripMode === "group";

  console.log("joinedMember?.role:", joinedMember?.role);

  const isOwner = joinedMember?.role === "OWNER";

  const isMember =
    joinedMember?.role === "OWNER" || joinedMember?.role === "MEMBER";

  // Solo trip → vehicle can be added without TripMember role
  // Group trip → only OWNER/MEMBER can add vehicle
  const canAddVehicle = isGroupTrip ? isMember : true;

  // Voting is only available in group trips
  const canVote = isGroupTrip && isMember;

  // Only OWNER can finalize in group trips
  const canFinalize = isGroupTrip && isOwner;

  /**
   * Fetch vehicles proposed for the current trip
   */
  const fetchTripVehicles = useCallback(() => {
    if (!tripId) return;

    dispatch(getTripVehiclesThunk(tripId));
  }, [dispatch, tripId]);

  /**
   * Fetch final vehicle for the current trip
   */
  const fetchFinalVehicle = useCallback(() => {
    if (!tripId) return;

    dispatch(getFinalSelectedVehicleThunk(tripId));
  }, [dispatch, tripId]);

  /**
   * Fetch trip vehicle costs
   */
  const fetchTripCosts = useCallback(async () => {
    if (!tripId) return;

    // Don't call cost API if there are no vehicles
    if (tripVehicles.length === 0) return;

    try {
      await dispatch(fetchTripVehicleCostsThunk(tripId)).unwrap();
    } catch (error) {
      console.error("Failed to fetch trip costs:", error);
    }
  }, [dispatch, tripId, tripVehicles.length]);

  /**
   * Load trip vehicles when trip changes
   */
  useEffect(() => {
    if (!tripId) return;

    fetchTripVehicles();
    fetchFinalVehicle();
  }, [tripId, fetchTripVehicles, fetchFinalVehicle]);

  /**
   * Fetch costs whenever vehicles exist
   * This is mainly useful when the trip vehicle list changes.
   */
  useEffect(() => {
    if (!tripId) return;

    if (tripVehicles.length === 0) {
      dispatch(clearTripCosts());
      return;
    }

    if (!route) return;

    fetchTripCosts();
  }, [
    tripId,
    tripVehicles.length,
    route,
    route?.distanceMeters,
    fetchTripCosts,
    dispatch,
  ]);

  const hasFinalVehicle = isGroupTrip && !!finalVehicle;

  /**
   * Add vehicle to trip
   */
  const handleAddVehicleToTrip = useCallback(
    async (vehicleId: string) => {
      if (hasFinalVehicle) {
        toast.error("A vehicle has already been finalized");
        return;
      }

      if (!tripId || !canAddVehicle) {
        toast.error("You are not allowed to add a vehicle");
        return;
      }

      await dispatch(
        addVehicleToTripThunk({
          tripId,
          vehicleId,
        }),
      ).unwrap();

      // Refresh trip vehicles
      await dispatch(getTripVehiclesThunk(tripId)).unwrap();

      // Refresh final vehicle for solo trips
      if (!isGroupTrip) {
        await dispatch(getFinalSelectedVehicleThunk(tripId)).unwrap();
      }
    },
    [dispatch, tripId, canAddVehicle, isGroupTrip, hasFinalVehicle],
  );

  /**
   * Remove vehicle from trip
   */
  const handleRemoveVehicle = useCallback(
    async (vehicleId: string) => {
      if (!tripId || !canAddVehicle) return;

      await dispatch(
        removeVehicleFromTripThunk({
          tripId,
          vehicleId,
        }),
      ).unwrap();

      // If the removed vehicle was final, refresh final vehicle.
      await dispatch(getFinalSelectedVehicleThunk(tripId));
    },
    [dispatch, tripId, canAddVehicle],
  );

  /**
   * Vote for a vehicle
   */
  const handleVote = useCallback(
    async (tripVehicleId: string) => {
      if (!tripId || !canVote) return;

      await dispatch(
        voteForVehicleThunk({
          tripId,
          tripVehicleId,
        }),
      ).unwrap();
    },
    [dispatch, tripId, canVote],
  );

  /**
   * Remove vote from a vehicle
   */
  const handleRemoveVote = useCallback(
    async (tripVehicleId: string) => {
      if (!tripId || !canVote) return;

      await dispatch(
        removeVoteThunk({
          tripId,
          tripVehicleId,
        }),
      ).unwrap();
    },
    [dispatch, tripId, canVote],
  );

  /**
   * Finalize a vehicle
   *
   * Only OWNER can perform this action.
   */
  const handleFinalize = useCallback(
    async (tripVehicleId: string) => {
      if (!tripId || !canFinalize) return;

      await dispatch(
        finalizeVehicleThunk({
          tripId,
          tripVehicleId,
        }),
      ).unwrap();
    },
    [dispatch, tripId, canFinalize],
  );

  /*
   * Unfinalize vehicle
   */
  const handleUnfinalize = useCallback(
    async (tripVehicleId: string) => {
      if (!tripId || !canFinalize) return;

      await dispatch(
        unfinalizeVehicleThunk({
          tripId,
          tripVehicleId,
        }),
      ).unwrap();

      // Refresh trip vehicles
      await dispatch(getTripVehiclesThunk(tripId)).unwrap();

      // Refresh final vehicle
      await dispatch(getFinalSelectedVehicleThunk(tripId)).unwrap();
    },
    [dispatch, tripId, canFinalize],
  );

  /**
   * Check whether current user voted for a vehicle
   */
  const hasVoted = useCallback((tripVehicle: (typeof tripVehicles)[number]) => {
    // We don't have the authenticated user ID directly here,
    // so the component can use voters when needed.
    return tripVehicle.voters.length > 0;
  }, []);

  return {
    // Trip information
    tripId,
    tripMode,
    isGroupTrip,
    joinedMember,
    isOwner,
    isMember,
    hasFinalVehicle,

    // Permissions
    canAddVehicle,
    canVote,
    canFinalize,

    // Trip vehicles
    tripVehicles,
    finalVehicle,

    //Trip vehicles costs
    tripVehicleCosts,
    tripCostLoading,

    // State
    isLoading,
    error,

    // Actions
    fetchTripVehicles,
    fetchFinalVehicle,
    fetchTripCosts,
    handleAddVehicleToTrip,
    handleRemoveVehicle,
    handleVote,
    handleRemoveVote,
    handleFinalize,
    handleUnfinalize,

    // Helper
    hasVoted,
  };
};

export default useTripVehicleManagement;
