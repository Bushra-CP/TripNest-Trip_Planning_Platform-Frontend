import React from "react";
import {
  Users,
  UserCheck,
  ChevronRight,
  AlertCircle,
  RefreshCw,
  Loader2,
  Search,
  Trash2,
} from "lucide-react";

import type { TripItem, ViewState } from "../hooks/useMyTrips";
import { toast } from "sonner";

interface TripListProps {
  trips: TripItem[];
  viewState: ViewState;
  searchQuery: string;

  onSelectTrip: (trip: TripItem) => void;
  onDeleteTrip: (trip: TripItem) => void;

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
  onDeleteTrip,
  onResetFilter,
  onRetry,
}) => {
  /* -------------------- CONTENT STATE -------------------- */

  if (viewState === "content") {
    return (
      <div className="space-y-3">
        {trips.length === 0 ? (
          <div className="space-y-3 rounded-3xl border border-[#E2E8F0] bg-white p-8 py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <Search className="h-6 w-6" />
            </div>

            <h3 className="text-base font-extrabold text-slate-900">
              No matching trips
            </h3>

            <p className="mx-auto max-w-sm text-xs font-medium text-slate-500">
              No trips match your search &ldquo;
              {searchQuery}
              &rdquo;. Try another title keyword or reset the filter.
            </p>

            <button
              type="button"
              onClick={onResetFilter}
              className="rounded-xl bg-slate-100 px-4 py-2 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-200"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="flex w-full flex-col gap-3">
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
                  className="group relative flex w-full cursor-pointer items-center justify-between gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm outline-none transition-all duration-200 hover:border-[#15803D] hover:shadow-md focus:ring-2 focus:ring-[#15803D]/30 active:scale-[0.99] sm:rounded-3xl sm:p-6"
                >
                  {/* Accent Stripe */}
                  <div
                    className={`absolute inset-y-4 left-0 w-1.5 rounded-r-full transition-all ${
                      isGroup
                        ? "bg-emerald-600 group-hover:w-2"
                        : "bg-teal-600 group-hover:w-2"
                    }`}
                  />

                  {/* Trip Information */}
                  <div className="flex min-w-0 flex-1 flex-col gap-3 pl-3 sm:flex-row sm:items-center sm:gap-5">
                    {/* Trip Type */}
                    <div className="shrink-0">
                      {isGroup ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-[#15803D]">
                          <Users className="h-3.5 w-3.5 stroke-[2.5]" />
                          <span>Group Trip</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-slate-700">
                          <UserCheck className="h-3.5 w-3.5 stroke-[2.5]" />
                          <span>Solo Trip</span>
                        </span>
                      )}
                    </div>

                    {/* Trip Title */}
                    <h2 className="truncate text-base font-extrabold tracking-tight text-slate-900 transition-colors group-hover:text-[#15803D] sm:text-lg">
                      {trip.title}
                    </h2>
                  </div>

                  {/* Actions */}
                  <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                    {/* Delete Button */}
                    {/* Delete Button */}
                    <button
                      type="button"
                      aria-label={`Delete ${trip.title}`}
                      title="Delete trip"
                      onClick={(event) => {
                        event.stopPropagation();

                        toast.custom(
                          (toastId) => (
                            <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-4 shadow-lg">
                              <h3 className="text-sm font-bold text-slate-900">
                                Delete this trip?
                              </h3>

                              <p className="mt-1 text-xs text-slate-500">
                                Are you sure you want to delete "{trip.title}"?
                                This action cannot be undone.
                              </p>

                              <div className="mt-4 flex justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={() => toast.dismiss(toastId)}
                                  className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50"
                                >
                                  Cancel
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    toast.dismiss(toastId);
                                    onDeleteTrip(trip);
                                  }}
                                  className="rounded-lg bg-rose-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-rose-700"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          ),
                          {
                            duration: Infinity,
                            position: "top-center",
                          },
                        );
                      }}
                      onKeyDown={(event) => event.stopPropagation()}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-rose-200 bg-rose-50 text-rose-600 transition-colors hover:border-rose-300 hover:bg-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-500/30 sm:h-10 sm:w-10 sm:rounded-2xl"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>

                    {/* Open Planning Button */}
                    <div className="flex items-center gap-3">
                      <span className="hidden text-xs font-bold text-slate-400 transition-colors group-hover:text-[#15803D] sm:inline">
                        Open Planning
                      </span>

                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-400 shadow-sm transition-all group-hover:translate-x-1 group-hover:bg-[#DCFCE7] group-hover:text-[#15803D] sm:h-10 sm:w-10 sm:rounded-2xl">
                        <ChevronRight className="h-5 w-5 stroke-[2.5]" />
                      </div>
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
          <Loader2 className="h-4 w-4 animate-spin text-[#15803D]" />

          <span>Loading your saved trip plans...</span>
        </div>

        <div className="flex w-full flex-col gap-3">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm animate-pulse sm:rounded-3xl sm:p-6"
            >
              <div className="flex flex-1 items-center gap-4">
                <div className="h-6 w-24 rounded-full bg-slate-200" />
                <div className="h-6 w-1/2 rounded-xl bg-slate-200" />
              </div>

              <div className="h-8 w-8 rounded-full bg-slate-200" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* -------------------- ERROR STATE -------------------- */

  if (viewState === "error") {
    return (
      <div className="mx-auto max-w-xl space-y-5 rounded-3xl border border-rose-200 bg-white px-6 py-16 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl border border-rose-100 bg-rose-50 text-rose-600 shadow-sm">
          <AlertCircle className="h-8 w-8 stroke-[1.8]" />
        </div>

        <div className="space-y-1.5">
          <h3 className="text-xl font-black tracking-tight text-slate-900">
            Unable to Load Your Trips
          </h3>

          <p className="mx-auto max-w-md text-xs font-medium leading-relaxed text-slate-500">
            We ran into an issue connecting to the TripNest trip database.
            Please check your network connection or try reloading.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-2 rounded-xl bg-[#15803D] px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-[#15803D]/25 transition-all hover:bg-[#166534] active:scale-95"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Retry Again</span>
          </button>

          <button
            type="button"
            onClick={onRetry}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-bold text-slate-600 transition-colors hover:bg-slate-50"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  /* -------------------- EMPTY STATE -------------------- */

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="relative flex min-h-22 w-full items-center justify-center rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm sm:rounded-3xl sm:p-6">
        {/* Accent Stripe */}
        <div className="absolute inset-y-4 left-0 w-1.5 rounded-r-full bg-emerald-600" />

        {/* Empty State Text */}
        <h2 className="text-base font-extrabold tracking-tight text-slate-900 sm:text-lg">
          No Trips
        </h2>
      </div>
    </div>
  );
};

export default TripList;
