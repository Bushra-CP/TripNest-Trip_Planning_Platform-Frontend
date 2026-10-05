import React from "react";
import { Car, Bike, Gauge, CheckCircle2, Users } from "lucide-react";

import type { VehicleResponse } from "@/features/traveler(user)/trip-planning/types/vehicle.types";

interface VehicleListProps {
  vehicles: VehicleResponse[];
  selectedVehicleId: string;
  onSelectVehicle: (vehicleId: string) => void;
}

const VehicleList: React.FC<VehicleListProps> = ({
  vehicles,
  selectedVehicleId,
  onSelectVehicle,
}) => {
  return (
    <section className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">
            My Vehicles
          </h3>

          <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
            {vehicles.length} Saved
          </span>
        </div>

        <p className="text-[11px] text-slate-400 font-medium">
          Select one to add to this trip
        </p>
      </div>

      {/* Empty State */}
      {vehicles.length === 0 ? (
        <div className="py-12 px-6 text-center bg-white rounded-2xl border border-dashed border-slate-300 space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 text-[#15803D] flex items-center justify-center mx-auto shadow-sm">
            <Car className="w-7 h-7 stroke-[1.8]" />
          </div>

          <div className="space-y-1">
            <h4 className="text-sm font-extrabold text-slate-900">
              No vehicles added yet
            </h4>

            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed font-medium">
              Add your vehicle details above to use it for trip planning and
              cost estimation.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-1">
          {vehicles.map((vehicle) => {
            const isSelected = selectedVehicleId === vehicle._id;

            return (
              <div
                key={vehicle._id}
                onClick={() => onSelectVehicle(vehicle._id)}
                className={`group relative p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 outline-none ${
                  isSelected
                    ? "bg-[#F0FDF4] border-emerald-300 shadow-sm ring-1 ring-[#15803D]/20"
                    : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60"
                }`}
              >
                {/* Vehicle Info */}
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  {/* Vehicle Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl border shrink-0 relative flex items-center justify-center transition-colors ${
                      isSelected
                        ? "bg-emerald-100 border-emerald-200 text-[#15803D]"
                        : "bg-slate-100 border-slate-200 text-slate-400"
                    }`}
                  >
                    {vehicle.type === "BIKE" ? (
                      <Bike className="w-7 h-7 stroke-[1.8]" />
                    ) : (
                      <Car className="w-7 h-7 stroke-[1.8]" />
                    )}

                    {/* Vehicle Type Indicator */}
                    <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-slate-900/80 text-white flex items-center justify-center">
                      {vehicle.type === "BIKE" ? (
                        <Bike className="w-2.5 h-2.5" />
                      ) : (
                        <Car className="w-2.5 h-2.5" />
                      )}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="min-w-0 flex-1 space-y-1.5">
                    {/* Name */}
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-extrabold text-slate-900 truncate">
                        {vehicle.name}
                      </h4>

                      {isSelected && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#15803D] bg-emerald-100/70 px-2 py-0.5 rounded-full shrink-0">
                          Selected
                        </span>
                      )}
                    </div>

                    {/* Vehicle Tags */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold">
                        {vehicle.type}
                      </span>

                      <span className="px-2 py-0.5 rounded-md bg-orange-50 text-orange-700 text-[10px] font-bold">
                        {vehicle.fuelType}
                      </span>

                      <span className="flex items-center gap-1 text-slate-600 text-[11px] font-bold ml-1">
                        <Gauge className="w-3 h-3 text-slate-400" />
                        {vehicle.fuelEfficiency}{" "}
                        {vehicle.fuelType === "ELECTRIC"
                          ? "km/kWh"
                          : vehicle.fuelType === "CNG"
                            ? "km/kg"
                            : "km/l"}
                      </span>

                      <span className="flex items-center gap-1 text-slate-600 text-[11px] font-bold ml-1">
                        <Users className="w-3 h-3 text-slate-400" />
                        {vehicle.seatingCapacity}{" "}
                        {vehicle.seatingCapacity === 1 ? "person" : "people"}
                      </span>
                    </div>

                    {/* Additional Details */}
                    {vehicle.additionalDetails && (
                      <p className="text-[10px] text-slate-500 font-medium truncate max-w-[420px]">
                        {vehicle.additionalDetails}
                      </p>
                    )}
                  </div>
                </div>

                {/* Select Button */}
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onSelectVehicle(vehicle._id);
                  }}
                  className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 shrink-0 ${
                    isSelected
                      ? "bg-[#15803D] text-white shadow-sm shadow-[#15803D]/25"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {isSelected ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Selected</span>
                    </>
                  ) : (
                    <span>Select</span>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default VehicleList;
