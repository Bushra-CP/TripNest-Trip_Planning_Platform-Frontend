import { Clock, MapPin, Route } from "lucide-react";

import type { RoutePlanningResult } from "@/features/traveler(user)/trip-planning/interfaces/route.interfaces";

interface RouteSummaryProps {
  route: RoutePlanningResult | null;
  isDarkMode: boolean;
  theme: {
    primaryText?: string;
    secondaryText?: string;
    mutedText?: string;
    divider?: string;
  };
}

const formatDistance = (distanceMeters: number): string => {
  return `${(distanceMeters / 1000).toFixed(1)} km`;
};

const formatDuration = (durationSeconds: number): string => {
  const totalMinutes = Math.round(durationSeconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) {
    return `${minutes} min`;
  }

  if (minutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${minutes}m`;
};

const RouteSummary = ({ route, isDarkMode, theme }: RouteSummaryProps) => {
  if (!route) {
    return null;
  }

  return (
    <div
      className={`rounded-2xl border p-4 ${
        isDarkMode
          ? "bg-[#101B2D] border-[#243650]"
          : "bg-white border-slate-200"
      }`}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-[#3B82F6]">
          <Route size={16} />
        </div>

        <div>
          <p
            className={`text-[10px] font-black uppercase tracking-widest ${theme.mutedText}`}
          >
            Trip Route
          </p>

          <p className={`text-xs font-bold ${theme.primaryText}`}>
            {route.locations.map((location) => location.name).join(" → ")}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div
          className={`rounded-xl border p-3 ${
            isDarkMode
              ? "bg-white/5 border-white/10"
              : "bg-slate-50 border-slate-100"
          }`}
        >
          <div className="flex items-center gap-2">
            <MapPin size={13} className="text-[#3B82F6]" />

            <span
              className={`text-[9px] font-bold uppercase tracking-wider ${theme.mutedText}`}
            >
              Distance
            </span>
          </div>

          <p className={`mt-1 text-sm font-black ${theme.primaryText}`}>
            {formatDistance(route.distanceMeters)}
          </p>
        </div>

        <div
          className={`rounded-xl border p-3 ${
            isDarkMode
              ? "bg-white/5 border-white/10"
              : "bg-slate-50 border-slate-100"
          }`}
        >
          <div className="flex items-center gap-2">
            <Clock size={13} className="text-[#3B82F6]" />

            <span
              className={`text-[9px] font-bold uppercase tracking-wider ${theme.mutedText}`}
            >
              Duration
            </span>
          </div>

          <p className={`mt-1 text-sm font-black ${theme.primaryText}`}>
            {formatDuration(route.durationSeconds)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RouteSummary;
