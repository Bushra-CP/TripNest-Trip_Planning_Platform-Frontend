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

const useTripVehicleManagement = () => {
  const dispatch = useDispatch<AppDispatch>();

  const tripId = useSelector(selectTripId);
  const tripMode = useSelector(selectMode);
  const joinedMember = useSelector(selectJoinedMember);

  const tripVehicles = useSelector(selectTripVehicles);
  const finalVehicle = useSelector(selectFinalVehicle);

  const isLoading = useSelector(selectTripVehicleLoading);
  const error = useSelector(selectTripVehicleError);

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
   * Load trip vehicles when trip changes
   */
  useEffect(() => {
    if (!tripId) return;

    fetchTripVehicles();
    fetchFinalVehicle();
  }, [tripId, fetchTripVehicles, fetchFinalVehicle]);

  const hasFinalVehicle = !!finalVehicle;

  /**
   * Add vehicle to trip
   *
   * In solo mode this also becomes the final vehicle
   * through the backend logic.
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

    // State
    isLoading,
    error,

    // Actions
    fetchTripVehicles,
    fetchFinalVehicle,
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
