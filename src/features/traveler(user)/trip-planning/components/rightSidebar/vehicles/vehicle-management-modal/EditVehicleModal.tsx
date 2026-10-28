import React, { useEffect } from "react";

import { X, Save, AlertCircle } from "lucide-react";

import { useForm, type SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import type { VehicleResponse } from "@/features/traveler(user)/trip-planning/types/vehicle.types";

import {
  vehicleSchema,
  type VehicleFormValues,
} from "@/features/traveler(user)/trip-planning/validation/vehicle.schema";

interface EditVehicleModalProps {
  isOpen: boolean;

  vehicle: VehicleResponse | null;

  onClose: () => void;

  onSave: (vehicleId: string, data: VehicleFormValues) => void | Promise<void>;
}

const EditVehicleModal: React.FC<EditVehicleModalProps> = ({
  isOpen,
  vehicle,
  onClose,
  onSave,
}) => {
  // =====================================================
  // FORM
  // =====================================================

  const {
    register,
    handleSubmit,
    watch,
    reset,

    formState: { errors, isSubmitting },
  } = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleSchema),
    mode: "all",
  });

  // =====================================================
  // LOAD VEHICLE DATA
  // =====================================================

  useEffect(() => {
    if (!vehicle) {
      return;
    }

    reset({
      name: vehicle.name,

      type: vehicle.type as VehicleFormValues["type"],

      fuelType: vehicle.fuelType as VehicleFormValues["fuelType"],

      fuelEfficiency: vehicle.fuelEfficiency,

      seatingCapacity: vehicle.seatingCapacity,

      additionalDetails: vehicle.additionalDetails ?? "",
    });
  }, [vehicle, reset]);

  // =====================================================
  // DON'T RENDER
  // =====================================================

  if (!isOpen || !vehicle) {
    return null;
  }

  // =====================================================
  // FUEL UNIT
  // =====================================================

  const getFuelEfficiencyUnit = () => {
    switch (watch("fuelType")) {
      case "ELECTRIC":
        return "km/kWh";

      case "CNG":
        return "km/kg";

      default:
        return "km/l";
    }
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const onSubmit: SubmitHandler<VehicleFormValues> = async (data) => {
    await onSave(vehicle._id, data);
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#15803D]" />

              <h2 className="text-base font-extrabold tracking-tight text-slate-900">
                Edit Vehicle
              </h2>
            </div>

            <p className="mt-1 text-[11px] font-medium text-slate-400">
              Update your vehicle details
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ================================================= */}
        {/* FORM */}
        {/* ================================================= */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-h-[75vh] space-y-5 overflow-y-auto p-5"
        >
          {/* FIRST ROW */}

          <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-2">
            {/* NAME */}

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span>Vehicle Model</span>

                <span className="text-[10px] font-normal text-slate-400">
                  e.g. Creta
                </span>
              </div>

              <input
                type="text"
                {...register("name")}
                placeholder="e.g. Maruti Swift"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-semibold text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-[#15803D] focus:ring-2 focus:ring-[#15803D]/20"
              />

              {errors.name && (
                <p className="ml-1 text-[10px] font-semibold text-rose-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* TYPE */}

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Type
              </label>

              <select
                {...register("type")}
                className="h-11 w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-semibold text-slate-900 outline-none transition-all focus:border-[#15803D] focus:ring-2 focus:ring-[#15803D]/20"
              >
                <option value="CAR">Car</option>

                <option value="BIKE">Bike</option>

                <option value="SUV">SUV</option>

                <option value="BUS">Bus</option>

                <option value="VAN">Van</option>

                <option value="TRAVELLER">Traveller</option>

                <option value="TAXI">Taxi</option>

                <option value="AUTO">Auto Rickshaw</option>

                <option value="OTHER">Other</option>
              </select>

              {errors.type && (
                <p className="ml-1 text-[10px] font-semibold text-rose-600">
                  {errors.type.message}
                </p>
              )}
            </div>
          </div>

          {/* SECOND ROW */}

          <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-3">
            {/* FUEL */}

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Fuel
              </label>

              <select
                {...register("fuelType")}
                className="h-11 w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-semibold text-slate-900 outline-none transition-all focus:border-[#15803D] focus:ring-2 focus:ring-[#15803D]/20"
              >
                <option value="PETROL">Petrol</option>

                <option value="DIESEL">Diesel</option>

                <option value="ELECTRIC">Electric</option>

                <option value="OTHER">Other</option>
              </select>

              {errors.fuelType && (
                <p className="ml-1 text-[10px] font-semibold text-rose-600">
                  {errors.fuelType.message}
                </p>
              )}
            </div>

            {/* FUEL EFFICIENCY */}

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Est. Fuel Efficiency / Mileage
              </label>

              <div className="relative flex items-center">
                <input
                  type="number"
                  step="0.5"
                  min="1"
                  max="150"
                  {...register("fuelEfficiency", {
                    valueAsNumber: true,
                  })}
                  placeholder="e.g. 18"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-3 pr-16 text-xs font-semibold text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-[#15803D] focus:ring-2 focus:ring-[#15803D]/20"
                />

                <span className="pointer-events-none absolute right-2.5 text-[11px] font-bold text-slate-400">
                  {getFuelEfficiencyUnit()}
                </span>
              </div>

              {errors.fuelEfficiency && (
                <p className="ml-1 text-[10px] font-semibold text-rose-600">
                  {errors.fuelEfficiency.message}
                </p>
              )}
            </div>

            {/* CAPACITY */}

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Capacity
              </label>

              <div className="relative flex items-center">
                <input
                  type="number"
                  min="1"
                  max="100"
                  {...register("seatingCapacity", {
                    valueAsNumber: true,
                  })}
                  placeholder="e.g. 5"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-3 pr-14 text-xs font-semibold text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-[#15803D] focus:ring-2 focus:ring-[#15803D]/20"
                />

                <span className="pointer-events-none absolute right-2.5 text-[11px] font-bold text-slate-400">
                  people
                </span>
              </div>

              {errors.seatingCapacity && (
                <p className="ml-1 text-[10px] font-semibold text-rose-600">
                  {errors.seatingCapacity.message}
                </p>
              )}
            </div>
          </div>

          {/* ADDITIONAL DETAILS */}

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">
                Additional Details
              </label>

              <span className="text-[10px] font-normal text-slate-400">
                Optional
              </span>
            </div>

            <textarea
              {...register("additionalDetails")}
              rows={4}
              maxLength={300}
              placeholder="e.g. Large boot space, recently serviced, suitable for long trips..."
              className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-[#15803D] focus:ring-2 focus:ring-[#15803D]/20"
            />

            {errors.additionalDetails && (
              <p className="ml-1 text-[10px] font-semibold text-rose-600">
                {errors.additionalDetails.message}
              </p>
            )}
          </div>

          {/* GENERAL ERROR */}

          {Object.keys(errors).length > 0 && (
            <div className="flex items-center gap-1.5 pt-1 text-xs font-semibold text-rose-600">
              <AlertCircle className="h-3.5 w-3.5" />

              <span>Please correct the highlighted fields.</span>
            </div>
          )}

          {/* ACTIONS */}

          <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl px-5 py-2.5 text-xs font-bold text-slate-600 transition-all hover:bg-slate-100 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#15803D] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-[#15803D]/25 transition-all hover:bg-[#166534] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save className="h-4 w-4 stroke-[2.5]" />

              <span>{isSubmitting ? "Saving..." : "Save Changes"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVehicleModal;
