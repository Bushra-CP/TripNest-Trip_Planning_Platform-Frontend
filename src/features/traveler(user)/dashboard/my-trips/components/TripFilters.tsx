import React from "react";
import { Search, Users, UserCheck } from "lucide-react";

import type { TripItem } from "../hooks/useMyTrips";

interface TripFiltersProps {
  trips: TripItem[];
  filterType: "ALL" | "Solo" | "Group";
  searchQuery: string;

  onFilterChange: (
    type: "ALL" | "Solo" | "Group",
  ) => void;

  onSearchChange: (value: string) => void;
}

const TripFilters: React.FC<TripFiltersProps> = ({
  filterType,
  searchQuery,
  onFilterChange,
  onSearchChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm">
      {/* Filter Tabs */}

      <div className="flex items-center gap-2 w-full sm:w-auto">
        {/* All */}

        <button
          type="button"
          onClick={() => onFilterChange("ALL")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            filterType === "ALL"
              ? "bg-slate-900 text-white shadow-sm"
              : "bg-slate-50 text-slate-600 hover:bg-slate-100"
          }`}
        >
          All Trips
        </button>

        {/* Solo */}

        <button
          type="button"
          onClick={() => onFilterChange("Solo")}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
            filterType === "Solo"
              ? "bg-[#15803D] text-white shadow-sm shadow-[#15803D]/20"
              : "bg-slate-50 text-slate-600 hover:bg-slate-100"
          }`}
        >
          <UserCheck className="w-3.5 h-3.5" />

          <span>Solo</span>
        </button>

        {/* Group */}

        <button
          type="button"
          onClick={() => onFilterChange("Group")}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
            filterType === "Group"
              ? "bg-emerald-800 text-white shadow-sm"
              : "bg-slate-50 text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Users className="w-3.5 h-3.5" />

          <span>Group</span>
        </button>
      </div>

      {/* Search */}

      <div className="relative w-full sm:w-72">
        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />

        <input
          type="text"
          value={searchQuery}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          placeholder="Filter trips by title..."
          className="w-full h-10 pl-9 pr-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#15803D] focus:bg-white text-xs outline-none transition-all placeholder:text-slate-400 font-medium"
        />
      </div>
    </div>
  );
};

export default TripFilters;