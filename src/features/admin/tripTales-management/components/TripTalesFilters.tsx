import { Search, ChevronDown, ArrowUpDown, RotateCcw } from "lucide-react";

interface Props {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedType: "All" | "Blog" | "Post";
  setSelectedType: (value: "All" | "Blog" | "Post") => void;
  selectedStatus: "All" | "Active" | "Blocked" | "Pending Review";
  setSelectedStatus: (
    value: "All" | "Active" | "Blocked" | "Pending Review",
  ) => void;
  sortOrder: "newest" | "oldest";
  setSortOrder: (value: "newest" | "oldest") => void;
  onClear: () => void;
}

export default function TripTalesFilters(props: Props) {
  const {
    searchQuery,
    setSearchQuery,
    selectedType,
    setSelectedType,
    selectedStatus,
    setSelectedStatus,
    sortOrder,
    setSortOrder,
    onClear,
  } = props;
  return (
    <>
      {/* -------------------- 4. SEARCH, FILTERS & SORTING TOOLBAR -------------------- */}
      <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, content, or author..."
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#15803D] focus:bg-white text-xs text-slate-900 outline-none transition-all placeholder:text-slate-400 font-medium"
          />
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Type Filter */}
          <div className="relative">
            <select
              value={selectedType}
              onChange={(e) =>
                setSelectedType(e.target.value as "All" | "Blog" | "Post")
              }
              className="h-10 pl-3 pr-8 rounded-xl bg-white border border-[#E2E8F0] text-xs font-semibold text-slate-700 outline-none focus:border-[#15803D] cursor-pointer appearance-none shadow-2xs"
            >
              <option value="All">All Types</option>
              <option value="Blog">Blogs</option>
              <option value="Post">Posts</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) =>
                setSelectedStatus(
                  e.target.value as
                    | "All"
                    | "Active"
                    | "Blocked"
                    | "Pending Review",
                )
              }
              className="h-10 pl-3 pr-8 rounded-xl bg-white border border-[#E2E8F0] text-xs font-semibold text-slate-700 outline-none focus:border-[#15803D] cursor-pointer appearance-none shadow-2xs"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Blocked">Blocked</option>
              <option value="Pending Review">Pending Review</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Sorting Filter */}
          <div className="relative">
            <select
              value={sortOrder}
              onChange={(e) =>
                setSortOrder(e.target.value as "newest" | "oldest")
              }
              className="h-10 pl-3 pr-8 rounded-xl bg-white border border-[#E2E8F0] text-xs font-semibold text-slate-700 outline-none focus:border-[#15803D] cursor-pointer appearance-none shadow-2xs"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Clear Filters Action */}
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
    </>
  );
}
