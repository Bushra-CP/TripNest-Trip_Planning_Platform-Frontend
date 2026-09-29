import React from "react";
import {
  Users,
  UserCheck,
  ChevronRight,
  AlertCircle,
  RefreshCw,
  Loader2,
  Search,
} from "lucide-react";
import type { TripItem, ViewState } from "../hooks/useMyTrips";

interface TripListProps {
  trips: TripItem[];
  viewState: ViewState;
  searchQuery: string;

  onSelectTrip: (trip: TripItem) => void;

  onResetFilter: () => void;

  onRetry: () => void;

  onCreateTrip: () => void;

  onResetDemoData: () => void;
}

const TripList: React.FC<TripListProps> = ({
  trips,
  viewState,
  searchQuery,
  onSelectTrip,
  onResetFilter,
  onRetry,
}) => {
  /* -------------------- CONTENT STATE -------------------- */

  if (viewState === "content") {
    return (
      <div className="space-y-3">
        {trips.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-3xl border border-[#E2E8F0] p-8 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <Search className="w-6 h-6" />
            </div>

            <h3 className="text-base font-extrabold text-slate-900">
              No matching trips
            </h3>

            <p className="text-xs text-slate-500 max-w-sm mx-auto font-medium">
              No trips match your search &ldquo;
              {searchQuery}
              &rdquo;. Try another title keyword or reset the filter.
            </p>

            <button
              type="button"
              onClick={onResetFilter}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3 w-full">
            {trips.map((trip) => {
              const isGroup = trip.type === "Group";

              return (
                <div
                  key={trip.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => onSelectTrip(trip)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      onSelectTrip(trip);
                    }
                  }}
                  className="group relative w-full p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#E2E8F0] hover:border-[#15803D] shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 outline-none focus:ring-2 focus:ring-[#15803D]/30 active:scale-[0.99]"
                >
                  {/* Accent Stripe */}
                  <div
                    className={`absolute left-0 inset-y-4 w-1.5 rounded-r-full transition-all ${
                      isGroup
                        ? "bg-emerald-600 group-hover:w-2"
                        : "bg-teal-600 group-hover:w-2"
                    }`}
                  />

                  {/* Trip Information */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 pl-3 min-w-0 flex-1">
                    {/* Trip Type */}
                    <div className="shrink-0">
                      {isGroup ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-50 text-[#15803D] border border-emerald-200">
                          <Users className="w-3.5 h-3.5 stroke-[2.5]" />

                          <span>Group Trip</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                          <UserCheck className="w-3.5 h-3.5 stroke-[2.5]" />

                          <span>Solo Trip</span>
                        </span>
                      )}
                    </div>

                    {/* Trip Title */}
                    <h2 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-[#15803D] transition-colors tracking-tight truncate">
                      {trip.title}
                    </h2>
                  </div>

                  {/* Open Button */}
                  <div className="shrink-0 flex items-center gap-3">
                    <span className="hidden sm:inline text-xs font-bold text-slate-400 group-hover:text-[#15803D] transition-colors">
                      Open Planning
                    </span>

                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-slate-50 group-hover:bg-[#DCFCE7] text-slate-400 group-hover:text-[#15803D] flex items-center justify-center transition-all group-hover:translate-x-1 shadow-sm">
                      <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  /* -------------------- LOADING STATE -------------------- */

  if (viewState === "loading") {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-2 py-3 text-xs font-bold text-slate-500">
          <Loader2 className="w-4 h-4 text-[#15803D] animate-spin" />

          <span>Loading your saved trip plans...</span>
        </div>

        <div className="flex flex-col gap-3 w-full">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#E2E8F0] shadow-sm animate-pulse flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="w-24 h-6 rounded-full bg-slate-200" />

                <div className="w-1/2 h-6 rounded-xl bg-slate-200" />
              </div>

              <div className="w-8 h-8 rounded-full bg-slate-200" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* -------------------- ERROR STATE -------------------- */

  if (viewState === "error") {
    return (
      <div className="py-16 px-6 text-center bg-white rounded-3xl border border-rose-200 shadow-sm max-w-xl mx-auto space-y-5">
        <div className="w-16 h-16 rounded-3xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-sm">
          <AlertCircle className="w-8 h-8 stroke-[1.8]" />
        </div>

        <div className="space-y-1.5">
          <h3 className="text-xl font-black text-slate-900 tracking-tight">
            Unable to Load Your Trips
          </h3>

          <p className="text-xs text-slate-500 leading-relaxed font-medium max-w-md mx-auto">
            We ran into an issue connecting to the TripNest trip database.
            Please check your network connection or try reloading.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold shadow-md shadow-[#15803D]/25 transition-all active:scale-95"
          >
            <RefreshCw className="w-3.5 h-3.5" />

            <span>Retry Again</span>
          </button>

          <button
            type="button"
            onClick={onRetry}
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  /* -------------------- EMPTY STATE -------------------- */

return (
  <div className="flex flex-col gap-3 w-full">
    <div className="relative w-full min-h-22 p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-center">
      
      {/* Accent Stripe */}
      <div className="absolute left-0 inset-y-4 w-1.5 rounded-r-full bg-emerald-600" />

      {/* Centered Text */}
      <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
        No Trips
      </h2>

    </div>
  </div>
);
};

export default TripList;
