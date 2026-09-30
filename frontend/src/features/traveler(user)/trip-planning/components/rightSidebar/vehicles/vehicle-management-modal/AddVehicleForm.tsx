import React from "react";
import { Plus, AlertCircle } from "lucide-react";

import type {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

import type { VehicleFormValues } from "@/features/traveler(user)/trip-planning/validation/vehicle.schema";

interface AddVehicleFormProps {
  register: UseFormRegister<VehicleFormValues>;
  handleSubmit: UseFormHandleSubmit<VehicleFormValues>;
  errors: FieldErrors<VehicleFormValues>;
  onAddVehicleSubmit: (data: VehicleFormValues) => void;
}

const AddVehicleForm: React.FC<AddVehicleFormProps> = ({
  register,
  handleSubmit,
  errors,
  onAddVehicleSubmit,
}) => {
  return (
    <section className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#15803D]" />

          <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">
            Add a Vehicle
          </h3>
        </div>

        <span className="text-[11px] text-slate-400 font-medium">
          Quick AI Auto-specs
        </span>
      </div>

      <form onSubmit={handleSubmit(onAddVehicleSubmit)} className="space-y-5">
        {/* ================================================== */}
        {/* FIRST ROW - VEHICLE MODEL & TYPE */}
        {/* ================================================== */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
          {/* Vehicle Model */}
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
              className="w-full h-11 px-3.5 rounded-xl bg-white border border-slate-200 focus:border-[#15803D] focus:ring-2 focus:ring-[#15803D]/20 text-xs font-semibold text-slate-900 outline-none transition-all placeholder:text-slate-400"
            />

            {errors.name && (
              <p className="text-[10px] text-rose-600 font-semibold ml-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              Type
            </label>

            <select
              {...register("type")}
              className="w-full h-11 px-3.5 rounded-xl bg-white border border-slate-200 focus:border-[#15803D] focus:ring-2 focus:ring-[#15803D]/20 text-xs font-semibold text-slate-900 outline-none transition-all cursor-pointer"
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
              <p className="text-[10px] text-rose-600 font-semibold ml-1">
                {errors.type.message}
              </p>
            )}
          </div>
        </div>

        {/* ================================================== */}
        {/* SECOND ROW - FUEL, MILEAGE & CAPACITY */}
        {/* ================================================== */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-start">
          {/* Fuel */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              Fuel
            </label>

            <select
              {...register("fuelType")}
              className="w-full h-11 px-3.5 rounded-xl bg-white border border-slate-200 focus:border-[#15803D] focus:ring-2 focus:ring-[#15803D]/20 text-xs font-semibold text-slate-900 outline-none transition-all cursor-pointer"
            >
              <option value="PETROL">Petrol</option>
              <option value="DIESEL">Diesel</option>
              <option value="ELECTRIC">Electric</option>
              <option value="CNG">CNG</option>
              <option value="OTHER">Other</option>
            </select>

            {errors.fuelType && (
              <p className="text-[10px] text-rose-600 font-semibold ml-1">
                {errors.fuelType.message}
              </p>
            )}
          </div>

          {/* Mileage */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              Est. Mileage
            </label>

            <div className="relative flex items-center">
              <input
                type="number"
                step="0.5"
                min="1"
                max="150"
                {...register("mileage", {
                  valueAsNumber: true,
                })}
                placeholder="e.g. 18"
                className="w-full h-11 pl-3 pr-14 rounded-xl bg-white border border-slate-200 focus:border-[#15803D] focus:ring-2 focus:ring-[#15803D]/20 text-xs font-semibold text-slate-900 outline-none transition-all placeholder:text-slate-400"
              />

              <span className="absolute right-2.5 text-[11px] font-bold text-slate-400 pointer-events-none">
                km/l
              </span>
            </div>

            {errors.mileage && (
              <p className="text-[10px] text-rose-600 font-semibold ml-1">
                {errors.mileage.message}
              </p>
            )}
          </div>

          {/* Seating Capacity */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
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
                className="w-full h-11 pl-3 pr-14 rounded-xl bg-white border border-slate-200 focus:border-[#15803D] focus:ring-2 focus:ring-[#15803D]/20 text-xs font-semibold text-slate-900 outline-none transition-all placeholder:text-slate-400"
              />

              <span className="absolute right-2.5 text-[11px] font-bold text-slate-400 pointer-events-none">
                people
              </span>
            </div>

            {errors.seatingCapacity && (
              <p className="text-[10px] text-rose-600 font-semibold ml-1">
                {errors.seatingCapacity.message}
              </p>
            )}
          </div>
        </div>

        {/* ================================================== */}
        {/* THIRD ROW - ADDITIONAL DETAILS */}
        {/* ================================================== */}

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
            rows={3}
            maxLength={300}
            placeholder="e.g. Large boot space, recently serviced, suitable for long trips..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-[#15803D] focus:ring-2 focus:ring-[#15803D]/20 text-xs font-semibold text-slate-900 outline-none transition-all placeholder:text-slate-400 resize-none"
          />

          {errors.additionalDetails && (
            <p className="text-[10px] text-rose-600 font-semibold ml-1">
              {errors.additionalDetails.message}
            </p>
          )}
        </div>

        {/* ================================================== */}
        {/* GENERAL ERROR */}
        {/* ================================================== */}

        {Object.keys(errors).length > 0 && (
          <div className="flex items-center gap-1.5 text-xs text-rose-600 font-semibold pt-1">
            <AlertCircle className="w-3.5 h-3.5" />

            <span>Please correct the highlighted fields.</span>
          </div>
        )}

        {/* ================================================== */}
        {/* SUBMIT */}
        {/* ================================================== */}

        <div className="pt-1 flex items-center justify-end">
          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold shadow-md shadow-[#15803D]/25 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[3]" />

            <span>Add Vehicle</span>
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddVehicleForm;
