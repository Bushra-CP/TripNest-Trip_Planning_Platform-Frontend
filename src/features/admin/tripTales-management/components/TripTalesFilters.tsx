import { Search, ChevronDown, ArrowUpDown, RotateCcw } from "lucide-react";
import type { AdminPostStatus } from "../types/admin-trip-tales.types";

interface Props {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedStatus: "All" | AdminPostStatus;
  setSelectedStatus: (value: "All" | AdminPostStatus) => void;
  sortOrder: "newest" | "oldest";
  setSortOrder: (value: "newest" | "oldest") => void;
  onClear: () => void;
}

export default function TripTalesFilters({
  searchQuery,
  setSearchQuery,
  selectedStatus,
  setSelectedStatus,
  sortOrder,
  setSortOrder,
  onClear,
}: Props) {
  return (
    <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
      <div className="relative flex-1">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search by title, content, destination, or author..."
          className="w-full h-10 pl-10 pr-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#15803D] focus:bg-white text-xs text-slate-900 outline-none transition-all placeholder:text-slate-400 font-medium"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <div className="relative">
          <select
            value={selectedStatus}
            onChange={(event) =>
              setSelectedStatus(event.target.value as "All" | AdminPostStatus)
            }
            className="h-10 pl-3 pr-8 rounded-xl bg-white border border-[#E2E8F0] text-xs font-semibold text-slate-700 outline-none focus:border-[#15803D] cursor-pointer appearance-none shadow-2xs"
          >
            <option value="All">All Statuses</option>
            <option value="PUBLISHED">Published</option>
            <option value="BLOCKED">Blocked</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={sortOrder}
            onChange={(event) =>
              setSortOrder(event.target.value as "newest" | "oldest")
            }
            className="h-10 pl-3 pr-8 rounded-xl bg-white border border-[#E2E8F0] text-xs font-semibold text-slate-700 outline-none focus:border-[#15803D] cursor-pointer appearance-none shadow-2xs"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <button
          type="button"
          onClick={onClear}
          className="h-10 px-3.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear</span>
        </button>
      </div>
    </div>
  );
}
