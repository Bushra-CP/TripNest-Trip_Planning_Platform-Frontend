import React from "react";
import { Plus } from "lucide-react";

interface MyTripsHeaderProps {
  onCreateNewTrip: () => void;
}

const MyTripsHeader: React.FC<MyTripsHeaderProps> = ({
  onCreateNewTrip,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-1">
          <span>TripNest</span>

          <span>&rsaquo;</span>

          <span className="text-slate-800 font-bold">
            My Trips
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          My Trips
        </h1>

        <p className="text-xs text-slate-500 mt-1 font-medium max-w-xl">
          Select any trip plan to open its interactive planning
          workspace, itinerary timeline, and group controls.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onCreateNewTrip}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold shadow-md shadow-[#15803D]/25 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[3]" />

          <span>New Trip</span>
        </button>
      </div>
    </div>
  );
};

export default MyTripsHeader;