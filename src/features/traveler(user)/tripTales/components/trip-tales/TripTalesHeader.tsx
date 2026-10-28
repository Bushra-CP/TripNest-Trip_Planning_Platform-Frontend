import React from "react";
import { Search, Plus } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../../auth/redux/authSelectors";
import { toast } from "sonner";

type FeedFilter = "All" | "Recent" | "Popular" | "Photos" | "Videos";

interface TripTalesHeaderProps {
  activeFilter: FeedFilter;
  searchQuery: string;
  onFilterChange: (filter: FeedFilter) => void;
  onSearchChange: (value: string) => void;
  onCreatePost: () => void;
}

const TripTalesHeader: React.FC<TripTalesHeaderProps> = ({
  activeFilter,
  searchQuery,
  onFilterChange,
  onSearchChange,
  onCreatePost,
}) => {
  const navigate = useNavigate();

  const user = useSelector(selectUser);

  const filters: FeedFilter[] = [
    "All",
    "Recent",
    "Popular",
    "Photos",
    "Videos",
  ];

  const handleCreatePost = () => {
    if (!user) {
      toast.error("Please login to create post!");

      navigate("/login");

      return;
    }

    onCreatePost();
  };

  return (
    <section className="bg-white border-b border-[#E2E8F0] py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* ==================================================
            HERO
        ================================================== */}

        <div className="flex flex-row items-center justify-between gap-3 sm:gap-6">
          {/* TITLE */}

          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-black text-[#15803D] truncate">
              TripTales
            </h1>

            <p className="text-[10px] sm:text-xs text-slate-500 mt-1 truncate">
              Real journeys. Real stories.
            </p>
          </div>

          {/* CREATE POST */}

          <button
            type="button"
            onClick={handleCreatePost}
            className="inline-flex shrink-0 items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#15803D] hover:bg-[#166534] text-white text-[10px] sm:text-xs font-bold shadow-md shadow-[#15803D]/25 transition-all active:scale-95 whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />

            <span>Create Post</span>
          </button>
        </div>

        {/* ==================================================
            SEARCH + FILTER
        ================================================== */}

        <div className="mt-6 sm:mt-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pt-5 sm:pt-6 border-t border-slate-100">
          {/* SEARCH */}

          <div className="relative w-full lg:w-80">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />

            <input
              type="text"
              placeholder="Search posts, destinations, or topics..."
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              className="w-full h-9 pl-9 pr-3 rounded-full bg-[#F1F5F9] border border-transparent focus:border-[#15803D] focus:bg-white text-xs outline-none"
            />
          </div>

          {/* FILTERS */}

          <div className="flex flex-wrap items-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => onFilterChange(filter)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeFilter === filter
                    ? "bg-[#0F172A] text-white shadow-sm"
                    : "bg-white text-slate-600 border border-[#E2E8F0] hover:bg-slate-50"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TripTalesHeader;
