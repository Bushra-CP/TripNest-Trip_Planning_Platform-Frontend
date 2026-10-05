import {
  Car,
  CheckCircle2,
  Plus,
  ThumbsUp,
  Crown,
  Bike,
  Bus,
  Truck,
  CircleHelp,
} from "lucide-react";
import { useSelector } from "react-redux";

import useVehicleManagement from "../../../hooks/useVehicleManagement";
import useTripVehicleManagement from "../../../hooks/useTripVehicleManagement";

import VehicleManagementModal from "./vehicle-management-modal/VehicleManagementModal";

import type { RootState } from "@/app/store";
import { selectUser } from "@/features/traveler(user)/auth/redux/authSelectors";
import { toast } from "sonner";

interface ThemeProps {
  surface?: string;
  border?: string;
  input?: string;
  iconButton?: string;
  divider?: string;
  primaryText?: string;
  secondaryText?: string;
  mutedText?: string;
}

interface VehiclesTabProps {
  mobile?: boolean;
  isDarkMode: boolean;
  theme: ThemeProps;
}

interface VehicleCardProps {
  vehicle: {
    _id: string;
    name: string;
    fuelEfficiency: number;
    fuelType: string;
    type: string;
    seatingCapacity: number;
    additionalDetails?: string;
  };

  tripVehicleId: string;
  voteCount: number;
  isVoted: boolean;
  isFinal: boolean;

  isGroupTrip: boolean;
  canVote: boolean;
  canRemove: boolean;
  canFinalize: boolean;
  hasFinalVehicle: boolean;

  isDarkMode: boolean;

  onVote: () => void;
  onRemoveVote: () => void;
  onRemove: () => void;
  onFinalize: () => void;
  onUnfinalize: () => void;
}

/* Vehicle type → Lucide icon */
const vehicleIcons = {
  CAR: Car,
  BIKE: Bike,
  SUV: Car,
  BUS: Bus,
  VAN: Truck,
  TRAVELLER: Bus,
  TAXI: Car,
  AUTO: Car,
  OTHER: CircleHelp,
};

const VehicleCard = ({
  vehicle,
  voteCount,
  isVoted,
  isFinal,
  isGroupTrip,
  canVote,
  canRemove,
  canFinalize,
  hasFinalVehicle,
  isDarkMode,
  onVote,
  onRemoveVote,
  onRemove,
  onFinalize,
  onUnfinalize,
}: VehicleCardProps) => {
  /*
   * Select the icon before the JSX is rendered.
   * vehicleIcons is defined outside the component,
   * so no component is created during render.
   */
  const VehicleIcon =
    vehicleIcons[vehicle.type as keyof typeof vehicleIcons] || CircleHelp;

  return (
    <div
      className={`w-full overflow-hidden rounded-2xl border transition-all duration-300 ${
        isFinal
          ? "border-[#10b981] shadow-lg shadow-[#10b981]/10"
          : isDarkMode
            ? "border-white/10"
            : "border-slate-200"
      }`}
    >
      {/* Vehicle Icon */}

      <div
        className={`flex h-20 items-center justify-center ${
          isDarkMode ? "bg-white/5" : "bg-slate-50"
        }`}
      >
        <VehicleIcon size={72} strokeWidth={1.3} className="text-[#10b981]" />
      </div>

      {/* Vehicle Details */}

      <div className={`p-4 ${isDarkMode ? "bg-white/5" : "bg-white"}`}>
        <div className="flex items-center justify-between">
          <h4
            className={`font-bold ${
              isDarkMode ? "text-white" : "text-slate-900"
            }`}
          >
            {vehicle.name}
          </h4>

          {isFinal && (
            <div className="flex items-center gap-1 text-[#10b981]">
              <CheckCircle2 size={18} />

              <span className="text-[9px] font-black uppercase tracking-wider">
                Final
              </span>
            </div>
          )}
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          <span className="rounded-full bg-[#10b981]/10 px-2 py-1 text-xs font-bold text-[#10b981]">
            {vehicle.fuelEfficiency} km/l
          </span>

          <span className="rounded-full bg-[#3B82F6]/10 px-2 py-1 text-xs font-bold text-[#3B82F6]">
            {vehicle.fuelType}
          </span>

          <span
            className={`rounded-full px-2 py-1 text-xs font-bold ${
              isDarkMode
                ? "bg-white/10 text-slate-300"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            {vehicle.seatingCapacity} seats
          </span>
        </div>

        {vehicle.additionalDetails && (
          <p
            className={`mt-3 text-sm ${
              isDarkMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
            {vehicle.additionalDetails}
          </p>
        )}

        {/* GROUP ONLY */}

        {isGroupTrip && (
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <ThumbsUp size={14} className="text-[#10b981]" />

              <span
                className={`text-xs font-bold ${
                  isDarkMode ? "text-slate-300" : "text-slate-600"
                }`}
              >
                {voteCount} {voteCount === 1 ? "Vote" : "Votes"}
              </span>
            </div>

            {canVote && (
              <button
                type="button"
                onClick={isVoted ? onRemoveVote : onVote}
                className={`rounded-xl px-3 py-2 text-[10px] font-black uppercase tracking-wider transition-all ${
                  isVoted
                    ? "bg-[#10b981] text-white"
                    : isDarkMode
                      ? "bg-white/10 text-slate-300 hover:bg-white/20"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {isVoted ? "Voted ✓" : "Vote"}
              </button>
            )}
          </div>
        )}

        {/* OWNER ONLY */}

        {isGroupTrip && canFinalize && (
          <>
            {isFinal ? (
              <button
                type="button"
                onClick={() => {
                  toast("Change finalized vehicle?", {
                    description:
                      "This will reopen vehicle selection and voting.",
                    action: {
                      label: "Change",
                      onClick: onUnfinalize,
                    },
                    cancel: {
                      label: "Cancel",
                      onClick: () => {},
                    },
                  });
                }}
                className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl border py-3 text-[10px] font-black uppercase tracking-widest transition-all ${
                  isDarkMode
                    ? "border-white/10 text-slate-300 hover:bg-white/10"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Crown size={14} />
                Change Vehicle
              </button>
            ) : (
              !hasFinalVehicle && (
                <button
                  type="button"
                  onClick={onFinalize}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#10b981] py-3 text-[10px] font-black uppercase tracking-widest text-white transition-all hover:bg-[#059669]"
                >
                  <Crown size={14} />
                  Finalize Vehicle
                </button>
              )
            )}
          </>
        )}

        {/* REMOVE */}

        {canRemove && !isFinal && (
          <button
            type="button"
            onClick={onRemove}
            className={`mt-3 w-full text-[10px] font-bold uppercase tracking-wider ${
              isDarkMode
                ? "text-slate-500 hover:text-red-400"
                : "text-slate-400 hover:text-red-500"
            }`}
          >
            Remove Vehicle
          </button>
        )}
      </div>
    </div>
  );
};

const VehiclesTab = ({
  mobile = false,
  isDarkMode,
  theme,
}: VehiclesTabProps) => {
  const { isVehicleModalOpen, openVehicleModal, closeVehicleModal } =
    useVehicleManagement();

  const {
    tripId,
    isGroupTrip,
    canAddVehicle,
    canVote,
    canFinalize,
    tripVehicles,
    finalVehicle,
    hasFinalVehicle,
    handleAddVehicleToTrip,
    handleRemoveVehicle,
    handleVote,
    handleRemoveVote,
    handleFinalize,
    handleUnfinalize,
  } = useTripVehicleManagement();

  const user = useSelector(selectUser);

  const { threadId } = useSelector((state: RootState) => state.aiPlanning);

  const currentUserId = user?.userId;

  /**
   * When a vehicle is selected from the personal vehicle modal,
   * add it to the current trip.
   */
  const handleVehicleSelection = async (vehicleId: string) => {
    if (!tripId || !canAddVehicle) {
      console.log("Cannot add vehicle:", {
        tripId,
        canAddVehicle,
      });

      return;
    }

    try {
      await handleAddVehicleToTrip(vehicleId);

      closeVehicleModal();
    } catch (error) {
      console.log(error);
      toast.error(error as string);
    }
  };

  return (
    <>
      <div className="flex h-full flex-col">
        <div
          className={`flex-1 space-y-8 overflow-y-auto hide-scrollbar p-6 ${
            mobile ? "max-h-[calc(80vh-180px)]" : ""
          }`}
        >
          {/* HEADER */}

          <div className="flex items-center justify-between">
            <h3
              className={`text-xs font-black uppercase tracking-[0.2em] ${
                isDarkMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              {isGroupTrip ? "Vehicle Showdown" : "My Vehicle"}
            </h3>

            {canAddVehicle && (
              <button
                type="button"
                onClick={openVehicleModal}
                disabled={!threadId}
                className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest ${
                  threadId
                    ? "text-[#10b981]"
                    : "cursor-not-allowed text-slate-400"
                }`}
              >
                <Plus size={14} />
                Add Vehicle
              </button>
            )}
          </div>

          {/* VEHICLES */}

          <div className="space-y-4">
            {tripVehicles.length === 0 ? (
              <div
                className={`rounded-2xl border p-6 text-center ${
                  isDarkMode
                    ? "border-white/10 bg-white/5"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <Car size={24} className="mx-auto mb-3 text-[#10b981]" />

                <p
                  className={`text-sm font-semibold ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  No vehicle selected yet
                </p>

                <p
                  className={`mt-1 text-xs ${
                    isDarkMode ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  Add a vehicle to this trip to continue.
                </p>
              </div>
            ) : (
              tripVehicles.map((tripVehicle) => {
                const isVoted = currentUserId
                  ? tripVehicle.voters.includes(currentUserId)
                  : false;

                const canRemove =
                  canAddVehicle && tripVehicle.addedBy === currentUserId;

                return (
                  <VehicleCard
                    key={tripVehicle._id}
                    vehicle={tripVehicle.vehicle}
                    tripVehicleId={tripVehicle._id}
                    voteCount={tripVehicle.voters.length}
                    isVoted={isVoted}
                    isFinal={tripVehicle.finalSelected}
                    isGroupTrip={isGroupTrip}
                    canVote={canVote}
                    canRemove={canRemove}
                    canFinalize={canFinalize}
                    hasFinalVehicle={hasFinalVehicle}
                    isDarkMode={isDarkMode}
                    onVote={() => handleVote(tripVehicle._id)}
                    onRemoveVote={() => handleRemoveVote(tripVehicle._id)}
                    onRemove={() =>
                      handleRemoveVehicle(tripVehicle.vehicle._id)
                    }
                    onFinalize={() => handleFinalize(tripVehicle._id)}
                    onUnfinalize={() => handleUnfinalize(tripVehicle._id)}
                  />
                );
              })
            )}
          </div>

          {/* GROUP LEADING VEHICLE */}

          {isGroupTrip &&
            tripVehicles.length > 0 &&
            (() => {
              const highestVoteCount = Math.max(
                ...tripVehicles.map((vehicle) => vehicle.voters.length),
              );

              const leadingVehicles = tripVehicles.filter(
                (vehicle) => vehicle.voters.length === highestVoteCount,
              );

              const hasVotes = highestVoteCount > 0;

              const hasSingleLeader = hasVotes && leadingVehicles.length === 1;

              const leadingVehicle = hasSingleLeader
                ? leadingVehicles[0]
                : null;

              return (
                <div
                  className={`rounded-2xl border p-4 ${
                    isDarkMode
                      ? "border-white/10 bg-white/5"
                      : "border-slate-200 bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#10b981]/10">
                        <Car size={16} className="text-[#10b981]" />
                      </div>

                      <div>
                        <p
                          className={`text-[10px] font-black uppercase tracking-widest ${
                            isDarkMode ? "text-slate-400" : "text-slate-500"
                          }`}
                        >
                          {finalVehicle
                            ? "Final Vehicle"
                            : leadingVehicle
                              ? "Leading Vehicle"
                              : "No Leader"}
                        </p>

                        <p
                          className={`text-sm font-bold ${
                            isDarkMode ? "text-white" : "text-slate-900"
                          }`}
                        >
                          {finalVehicle
                            ? finalVehicle.vehicle.name
                            : leadingVehicle
                              ? leadingVehicle.vehicle.name
                              : hasVotes
                                ? "Tie between vehicles"
                                : "No votes yet"}
                        </p>
                      </div>
                    </div>

                    {finalVehicle && (
                      <CheckCircle2 size={20} className="text-[#10b981]" />
                    )}
                  </div>

                  {!finalVehicle && (
                    <p
                      className={`mt-3 text-[10px] ${
                        isDarkMode ? "text-slate-500" : "text-slate-400"
                      }`}
                    >
                      {leadingVehicle
                        ? "This vehicle currently has the highest votes. The trip owner can finalize the vehicle."
                        : hasVotes
                          ? "There is currently a tie between vehicles. The trip owner can finalize a vehicle after the tie is resolved."
                          : "No vehicle has received a vote yet. Vote for a vehicle to establish a leader."}
                    </p>
                  )}
                </div>
              );
            })()}

          {/* SOLO SELECTED VEHICLE */}

          {!isGroupTrip && tripVehicles.length > 0 && (
            <div
              className={`rounded-2xl border p-4 ${
                isDarkMode
                  ? "border-white/10 bg-white/5"
                  : "border-slate-200 bg-slate-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#10b981]/10">
                    <Car size={16} className="text-[#10b981]" />
                  </div>

                  <p
                    className={`text-[10px] font-black uppercase tracking-widest ${
                      isDarkMode ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    Selected Vehicle
                  </p>
                </div>

                <p
                  className={`text-sm font-bold ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  {finalVehicle?.vehicle.name ??
                    tripVehicles[0]?.vehicle.name ??
                    "None"}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* MESSAGE INPUT */}

        <div
          className={`border-t p-4 ${
            isDarkMode
              ? "border-white/5 bg-[#0b1326]/50"
              : "border-slate-200 bg-white"
          }`}
        >
          <div className={`rounded-[28px] border p-3 ${theme.input ?? ""}`}>
            <input
              type="text"
              placeholder={isGroupTrip ? "Message group..." : "Message..."}
              className={`w-full bg-transparent outline-none ${
                isDarkMode
                  ? "text-white placeholder:text-slate-600"
                  : "text-slate-900 placeholder:text-slate-400"
              }`}
            />
          </div>
        </div>
      </div>

      {/* VEHICLE MANAGEMENT MODAL */}

      <VehicleManagementModal
        isOpen={isVehicleModalOpen}
        onClose={closeVehicleModal}
        onSelectVehicle={handleVehicleSelection}
        confirmLabel={
          isGroupTrip ? "Add Vehicle to Trip" : "Use Vehicle for Trip"
        }
      />
    </>
  );
};

export default VehiclesTab;
