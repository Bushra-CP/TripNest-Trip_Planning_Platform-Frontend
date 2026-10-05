import React from "react";
import { Car, X, Sparkles, Check, ChevronRight } from "lucide-react";

import AddVehicleForm from "./AddVehicleForm";
import VehicleList from "./VehicleList";
import useVehicleManagement from "../../../../hooks/useVehicleManagement";

interface VehicleManagementModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSelectVehicle?: (vehicleId: string) => void | Promise<void>;
  confirmLabel?: string;
}

const VehicleManagementModal: React.FC<VehicleManagementModalProps> = ({
  isOpen = true,
  onClose,
  onSelectVehicle,
  confirmLabel = "Use Selected Vehicle",
}) => {
  const {
    register,
    handleSubmit,
    watch,
    errors,
    onAddVehicleSubmit,

    // Vehicles from Redux
    vehicles,

    // Selection
    selectedVehicleId,
    handleSelectVehicle,

    // Loading
    loading,
  } = useVehicleManagement();

  // --------------------------------
  // Selected Vehicle
  // --------------------------------

  const selectedVehicle = vehicles.find(
    (vehicle) => vehicle._id === selectedVehicleId,
  );

  // --------------------------------
  // Confirm Selected Vehicle
  // --------------------------------

const handleConfirm = async () => {
  if (!selectedVehicle) return;

  try {
    await onSelectVehicle?.(selectedVehicle._id);
    onClose?.();
  } catch (error) {
    console.error("Failed to add vehicle to trip:", error);
  }
};

  if (!isOpen) return null;

  return (
    <div className="fixed top-16 right-0 bottom-0 left-0 z-[60] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden max-h-[calc(100vh-5rem)]">
        {/* Header */}
        <header className="px-6 py-5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100/70 border border-emerald-200 text-[#15803D] flex items-center justify-center shadow-sm">
              <Car className="w-5 h-5 stroke-[2.2]" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-slate-900 tracking-tight">
                  Vehicle Management
                </h2>

                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-[#15803D] border border-emerald-200">
                  TripNest Fleet
                </span>
              </div>

              <p className="text-xs text-slate-500 font-medium">
                Add and select your vehicle for route cost optimization and fuel
                calculation.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-700 hover:bg-slate-200 flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </header>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-7">
          {/* Add Vehicle */}
          <AddVehicleForm
            register={register}
            handleSubmit={handleSubmit}
            watch={watch}
            errors={errors}
            onAddVehicleSubmit={onAddVehicleSubmit}
          />

          {/* Vehicle List */}
          {loading && vehicles.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-xs text-slate-500 font-medium">
                Loading your vehicles...
              </p>
            </div>
          ) : (
            <VehicleList
              vehicles={vehicles}
              selectedVehicleId={selectedVehicleId}
              onSelectVehicle={handleSelectVehicle}
            />
          )}

          {/* Integration Info */}
          <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-3">
            <div className="w-7 h-7 rounded-xl bg-white border border-emerald-200 flex items-center justify-center text-[#15803D] shrink-0 font-bold mt-0.5">
              <Sparkles className="w-3.5 h-3.5 text-[#15803D]" />
            </div>

            <div className="text-xs space-y-0.5">
              <p className="font-extrabold text-slate-900">
                Live Routing Integration
              </p>

              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                Using{" "}
                <strong className="text-emerald-800 font-bold">
                  {selectedVehicle?.name || "No vehicle"}
                </strong>{" "}
                for calculations — AI will calculate total trip fuel expenses
                based on{" "}
                <strong className="text-slate-800">
                  {selectedVehicle?.fuelEfficiency || 0}{" "}
                  {selectedVehicle?.fuelType === "ELECTRIC" ? "km/kWh" : "km/l"}
                </strong>{" "}
                and a capacity of{" "}
                <strong className="text-slate-800">
                  {selectedVehicle?.seatingCapacity || 0} people
                </strong>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
            <span>Selected vehicle:</span>

            {selectedVehicle ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                <Check className="w-3 h-3 stroke-[3]" />

                {selectedVehicle.name}
              </span>
            ) : (
              <span className="text-slate-400">None</span>
            )}
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-white transition-colors"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleConfirm}
              disabled={!selectedVehicle}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#15803D] hover:bg-[#166534] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold shadow-md shadow-[#15803D]/25 transition-all active:scale-95"
            >
              <span>{confirmLabel}</span>

              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default VehicleManagementModal;
