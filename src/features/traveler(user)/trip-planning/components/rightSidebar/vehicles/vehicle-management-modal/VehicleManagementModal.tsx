import React from "react";

import { Car, X, Sparkles, Check, ChevronRight } from "lucide-react";

import AddVehicleForm from "./AddVehicleForm";
import VehicleList from "./VehicleList";
import EditVehicleModal from "./EditVehicleModal";

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
    // Vehicles
    vehicles,
    loading,

    // Selection
    selectedVehicleId,
    selectedVehicle,
    handleSelectVehicle,
    handleConfirm,

    // Add form
    register,
    handleSubmit,
    watch,
    errors,
    onAddVehicleSubmit,

    // Edit
    editingVehicle,
    isEditModalOpen,
    handleEditVehicle,
    handleCloseEditModal,
    handleUpdateVehicle,

    // Delete
    handleDeleteVehicle,
    vehicleToDelete,
    confirmDeleteVehicle,
    cancelDeleteVehicle,
  } = useVehicleManagement({
    onSelectVehicle,
    onClose,
  });

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* ================================================= */}
      {/* VEHICLE MANAGEMENT MODAL */}
      {/* ================================================= */}

      <div className="fixed top-16 right-0 bottom-0 left-0 z-[60] flex items-center justify-center overflow-y-auto bg-slate-900/60 p-4 backdrop-blur-sm sm:p-6">
        <div className="relative flex max-h-[calc(100vh-5rem)] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-2xl">
          {/* ================================================= */}
          {/* HEADER */}
          {/* ================================================= */}

          <header className="flex shrink-0 items-center justify-between border-b border-slate-100 bg-white px-6 py-5">
            <div className="flex items-center gap-3.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-100/70 text-[#15803D] shadow-sm">
                <Car className="h-5 w-5 stroke-[2.2]" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-black tracking-tight text-slate-900">
                    Vehicle Management
                  </h2>

                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#15803D]">
                    TripNest Fleet
                  </span>
                </div>

                <p className="text-xs font-medium text-slate-500">
                  Add and select your vehicle for route cost optimization and
                  fuel calculation.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-700"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>
          </header>

          {/* ================================================= */}
          {/* BODY */}
          {/* ================================================= */}

          <div className="flex-1 space-y-7 overflow-y-auto p-6">
            {/* ADD VEHICLE */}

            <AddVehicleForm
              register={register}
              handleSubmit={handleSubmit}
              watch={watch}
              errors={errors}
              onAddVehicleSubmit={onAddVehicleSubmit}
            />

            {/* VEHICLE LIST */}

            {loading && vehicles.length === 0 ? (
              <div className="py-10 text-center">
                <p className="text-xs font-medium text-slate-500">
                  Loading your vehicles...
                </p>
              </div>
            ) : (
              <VehicleList
                vehicles={vehicles}
                selectedVehicleId={selectedVehicleId}
                onSelectVehicle={handleSelectVehicle}
                onEditVehicle={handleEditVehicle}
                onDeleteVehicle={handleDeleteVehicle}
              />
            )}

            {/* ================================================= */}
            {/* INTEGRATION INFO */}
            {/* ================================================= */}

            <div className="flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-3.5">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl border border-emerald-200 bg-white">
                <Sparkles className="h-3.5 w-3.5 text-[#15803D]" />
              </div>

              <div className="space-y-0.5 text-xs">
                <p className="font-extrabold text-slate-900">
                  Live Routing Integration
                </p>

                <p className="text-[11px] font-medium leading-relaxed text-slate-600">
                  Using{" "}
                  <strong className="font-bold text-emerald-800">
                    {selectedVehicle?.name ?? "No vehicle"}
                  </strong>{" "}
                  for calculations — AI will calculate total trip fuel expenses
                  based on{" "}
                  <strong className="text-slate-800">
                    {selectedVehicle?.fuelEfficiency ?? 0}{" "}
                    {selectedVehicle?.fuelType === "ELECTRIC"
                      ? "km/kWh"
                      : "km/l"}
                  </strong>{" "}
                  and a capacity of{" "}
                  <strong className="text-slate-800">
                    {selectedVehicle?.seatingCapacity ?? 0} people
                  </strong>
                  .
                </p>
              </div>
            </div>
          </div>

          {/* ================================================= */}
          {/* FOOTER */}
          {/* ================================================= */}

          <footer className="flex shrink-0 flex-col items-center justify-between gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4 sm:flex-row">
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <span>Selected vehicle:</span>

              {selectedVehicle ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                  <Check className="h-3 w-3 stroke-[3]" />

                  {selectedVehicle.name}
                </span>
              ) : (
                <span className="text-slate-400">None</span>
              )}
            </div>

            <div className="flex w-full items-center justify-end gap-2.5 sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-bold text-slate-600 transition-colors hover:bg-white"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirm}
                disabled={!selectedVehicle}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#15803D] px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-[#15803D]/25 transition-all hover:bg-[#166534] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span>{confirmLabel}</span>

                <ChevronRight className="h-4 w-4 stroke-[2.5]" />
              </button>
            </div>
          </footer>
        </div>
      </div>

      {/* ================================================= */}
      {/* DELETE CONFIRMATION */}
      {/* ================================================= */}
      {vehicleToDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
          <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold">Delete Vehicle?</h3>

            <p className="mt-2 text-sm text-gray-500">
              Are you sure you want to delete this vehicle?
            </p>

            <div className="mt-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={cancelDeleteVehicle}
                className="rounded-md border px-4 py-2"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={confirmDeleteVehicle}
                className="rounded-md bg-red-600 px-4 py-2 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================================================= */}
      {/* EDIT VEHICLE MODAL */}
      {/* ================================================= */}

      <EditVehicleModal
        isOpen={isEditModalOpen}
        vehicle={editingVehicle}
        onClose={handleCloseEditModal}
        onSave={handleUpdateVehicle}
      />
    </>
  );
};

export default VehicleManagementModal;
