import React from "react";

import {
  Car,
  Bike,
  Gauge,
  CheckCircle2,
  Users,
  Pencil,
  Trash2,
} from "lucide-react";

import type { VehicleResponse } from "@/features/traveler(user)/trip-planning/types/vehicle.types";

interface VehicleListProps {
  vehicles: VehicleResponse[];
  selectedVehicleId: string;

  onSelectVehicle: (vehicleId: string) => void;

  onEditVehicle: (vehicle: VehicleResponse) => void;

  onDeleteVehicle: (vehicleId: string) => void;
}

const VehicleList: React.FC<VehicleListProps> = ({
  vehicles,
  selectedVehicleId,
  onSelectVehicle,
  onEditVehicle,
  onDeleteVehicle,
}) => {
  return (
    <section className="space-y-3">
      {/* HEADER */}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-extrabold tracking-tight text-slate-900">
            My Vehicles
          </h3>

          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-extrabold text-slate-600">
            {vehicles.length} Saved
          </span>
        </div>

        <p className="text-[11px] font-medium text-slate-400">
          Select one to add to this trip
        </p>
      </div>

      {/* EMPTY STATE */}

      {vehicles.length === 0 ? (
        <div className="space-y-3 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-[#15803D] shadow-sm">
            <Car className="h-7 w-7 stroke-[1.8]" />
          </div>

          <div className="space-y-1">
            <h4 className="text-sm font-extrabold text-slate-900">
              No vehicles added yet
            </h4>

            <p className="mx-auto max-w-sm text-xs font-medium leading-relaxed text-slate-500">
              Add your vehicle details above to use it for trip planning and
              cost estimation.
            </p>
          </div>
        </div>
      ) : (
        <div className="max-h-[350px] space-y-2.5 overflow-y-auto pr-1">
          {vehicles.map((vehicle) => {
            const isSelected = selectedVehicleId === vehicle._id;

            return (
              <div
                key={vehicle._id}
                onClick={() => onSelectVehicle(vehicle._id)}
                className={`group relative flex cursor-pointer items-center justify-between gap-4 rounded-2xl border p-3.5 outline-none transition-all duration-200 ${
                  isSelected
                    ? "border-emerald-300 bg-[#F0FDF4] shadow-sm ring-1 ring-[#15803D]/20"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60"
                }`}
              >
                {/* VEHICLE INFO */}

                <div className="flex min-w-0 flex-1 items-center gap-3.5">
                  {/* ICON */}

                  <div
                    className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                      isSelected
                        ? "border-emerald-200 bg-emerald-100 text-[#15803D]"
                        : "border-slate-200 bg-slate-100 text-slate-400"
                    }`}
                  >
                    {vehicle.type === "BIKE" ? (
                      <Bike className="h-7 w-7 stroke-[1.8]" />
                    ) : (
                      <Car className="h-7 w-7 stroke-[1.8]" />
                    )}

                    <div className="absolute bottom-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-slate-900/80 text-white">
                      {vehicle.type === "BIKE" ? (
                        <Bike className="h-2.5 w-2.5" />
                      ) : (
                        <Car className="h-2.5 w-2.5" />
                      )}
                    </div>
                  </div>

                  {/* DETAILS */}

                  <div className="min-w-0 flex-1 space-y-1.5">
                    {/* NAME */}

                    <div className="flex items-center gap-2">
                      <h4 className="truncate text-sm font-extrabold text-slate-900">
                        {vehicle.name}
                      </h4>

                      {isSelected && (
                        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-100/70 px-2 py-0.5 text-[10px] font-bold text-[#15803D]">
                          Selected
                        </span>
                      )}
                    </div>

                    {/* TAGS */}

                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                        {vehicle.type}
                      </span>

                      <span className="rounded-md bg-orange-50 px-2 py-0.5 text-[10px] font-bold text-orange-700">
                        {vehicle.fuelType}
                      </span>

                      <span className="ml-1 flex items-center gap-1 text-[11px] font-bold text-slate-600">
                        <Gauge className="h-3 w-3 text-slate-400" />
                        {vehicle.fuelEfficiency}{" "}
                        {vehicle.fuelType === "ELECTRIC"
                          ? "km/kWh"
                          : vehicle.fuelType === "CNG"
                            ? "km/kg"
                            : "km/l"}
                      </span>

                      <span className="ml-1 flex items-center gap-1 text-[11px] font-bold text-slate-600">
                        <Users className="h-3 w-3 text-slate-400" />
                        {vehicle.seatingCapacity}{" "}
                        {vehicle.seatingCapacity === 1 ? "person" : "people"}
                      </span>
                    </div>

                    {/* ADDITIONAL DETAILS */}

                    {vehicle.additionalDetails && (
                      <p className="max-w-[420px] truncate text-[10px] font-medium text-slate-500">
                        {vehicle.additionalDetails}
                      </p>
                    )}
                  </div>
                </div>

                {/* ACTIONS */}

                <div className="flex shrink-0 items-center gap-1.5">
                  {/* EDIT */}

                  <button
                    type="button"
                    title="Edit vehicle"
                    onClick={(event) => {
                      event.stopPropagation();

                      onEditVehicle(vehicle);
                    }}
                    className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition-all hover:bg-emerald-50 hover:text-[#15803D] active:scale-95"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>

                  {/* DELETE */}

                  <button
                    type="button"
                    title="Delete vehicle"
                    onClick={(event) => {
                      event.stopPropagation();

                      onDeleteVehicle(vehicle._id);
                    }}
                    className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition-all hover:bg-red-50 hover:text-red-500 active:scale-95"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                  {/* SELECT */}

                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();

                      onSelectVehicle(vehicle._id);
                    }}
                    className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all active:scale-95 ${
                      isSelected
                        ? "bg-[#15803D] text-white shadow-sm shadow-[#15803D]/25"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5 stroke-[2.5]" />

                        <span>Selected</span>
                      </>
                    ) : (
                      <span>Select</span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default VehicleList;
