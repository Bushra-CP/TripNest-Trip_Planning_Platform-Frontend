import type { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import RouteSummary from "./RouteSummary";
import { CalendarDays, Clock3, MapPin, Sparkles, Timer } from "lucide-react";

interface ThemeProps {
  surface?: string;
  border?: string;
  input?: string;
  iconButton?: string;
  divider?: string;
  primaryText?: string;
  secondaryText?: string;
  mutedText?: string;
}

interface ItineraryTabProps {
  mobile?: boolean;
  isDarkMode: boolean;
  theme: ThemeProps;
}

const ItineraryTab = ({
  mobile = false,
  isDarkMode,
  theme,
}: ItineraryTabProps) => {
  const itinerary = useSelector(
    (state: RootState) => state.aiPlanning.generatedItinerary,
  );

  const route = useSelector((state: RootState) => state.aiPlanning.route);

  
  return (
    <>
      <div
        className={`flex-1 overflow-y-auto hide-scrollbar p-6 space-y-8 ${
          mobile ? "max-h-[calc(80vh-180px)]" : ""
        }`}
      >
        <div className="flex items-center justify-between">
          <h3
            className={`text-xs font-black uppercase tracking-[0.2em] ${theme.mutedText}`}
          >
            Mission Itinerary
          </h3>

         
        </div>

        <RouteSummary route={route} isDarkMode={isDarkMode} theme={theme} />

       <div className="space-y-6 pb-8">
  {!itinerary ? (
    // Empty state
    <div
      className={`rounded-2xl border border-dashed p-8 text-center ${
        isDarkMode
          ? "border-white/10 bg-white/[0.02]"
          : "border-slate-200 bg-slate-50"
      }`}
    >
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10">
        <CalendarDays size={26} className="text-emerald-500" />
      </div>

      <h3 className={`text-base font-bold ${theme.primaryText}`}>
        Your itinerary is waiting
      </h3>

      <p
        className={`mx-auto mt-2 max-w-xs text-sm leading-6 ${
          theme.secondaryText
        }`}
      >
        Generate your personalized trip itinerary to explore your day-wise
        travel plan and discover places to visit.
      </p>
    </div>
  ) : (
    <>
      {/* Itinerary overview */}
      <div
        className={`overflow-hidden rounded-2xl border ${
          isDarkMode
            ? "border-white/10 bg-slate-900"
            : "border-slate-200 bg-white shadow-sm"
        }`}
      >
        <div className="bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-transparent p-5">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-white">
              <Sparkles size={18} />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-emerald-500">
              Your travel plan
            </span>
          </div>

          <h2
            className={`text-xl font-extrabold leading-snug ${
              theme.primaryText
            }`}
          >
            {itinerary.title}
          </h2>

          
        </div>

        <div
          className={`grid grid-cols-2 gap-3 border-t p-4 ${
            isDarkMode ? "border-white/10" : "border-slate-100"
          }`}
        >
          <div
            className={`flex items-center gap-3 rounded-xl p-3 ${
              isDarkMode ? "bg-white/5" : "bg-slate-50"
            }`}
          >
            <CalendarDays size={20} className="shrink-0 text-emerald-500" />

            <div>
              <p className={`text-lg font-bold ${theme.primaryText}`}>
                {itinerary.days.length}
              </p>

              <p className={`text-xs ${theme.secondaryText}`}>
                Travel days
              </p>
            </div>
          </div>

          <div
            className={`flex items-center gap-3 rounded-xl p-3 ${
              isDarkMode ? "bg-white/5" : "bg-slate-50"
            }`}
          >
            <MapPin size={20} className="shrink-0 text-emerald-500" />

            <div>
              <p className={`text-lg font-bold ${theme.primaryText}`}>
                {itinerary.days.reduce(
                  (total, day) => total + day.stops.length,
                  0,
                )}
              </p>

              <p className={`text-xs ${theme.secondaryText}`}>
                Places to visit
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Day-wise itinerary */}
      <div className="space-y-5">
        {itinerary.days.map((day) => (
          <article
            key={day.dayNumber}
            className={`overflow-hidden rounded-2xl border ${
              isDarkMode
                ? "border-white/10 bg-slate-900/80"
                : "border-slate-200 bg-white shadow-sm"
            }`}
          >
            {/* Day heading */}
            <div
              className={`flex items-start gap-3 p-4 sm:p-5 ${
                isDarkMode ? "bg-white/[0.03]" : "bg-slate-50"
              }`}
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500 font-extrabold text-white shadow-sm">
                {String(day.dayNumber).padStart(2, "0")}
              </div>

              <div className="min-w-0 flex-1">
                <p className="mb-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-emerald-500">
                  Day {day.dayNumber}
                </p>

                <h3
                  className={`text-sm font-bold leading-6 sm:text-base ${
                    theme.primaryText
                  }`}
                >
                  {day.title}
                </h3>
              </div>
            </div>

            {/* Day description */}
            {day.description && (
              <div className="px-4 pt-4 sm:px-5">
                <p
                  className={`text-sm leading-6 ${
                    theme.secondaryText
                  }`}
                >
                  {day.description}
                </p>
              </div>
            )}

            {/* Stops */}
            <div className="space-y-3 p-4 sm:p-5">
              <div className="mb-3 flex items-center gap-2">
                <MapPin size={15} className="text-emerald-500" />

                <span
                  className={`text-xs font-bold uppercase tracking-wider ${
                    theme.mutedText
                  }`}
                >
                  Places to explore
                </span>

                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    isDarkMode
                      ? "bg-white/10 text-slate-300"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {day.stops.length}
                </span>
              </div>

              {day.stops.length === 0 ? (
                <p className={`text-sm ${theme.secondaryText}`}>
                  No stops added for this day yet.
                </p>
              ) : (
                day.stops.map((stop, index) => (
                  <div
                    key={`${day.dayNumber}-${index}`}
                    className={`flex gap-3 rounded-xl border p-3 sm:p-4 ${
                      isDarkMode
                        ? "border-white/10 bg-white/[0.03]"
                        : "border-slate-100 bg-white"
                    }`}
                  >
                    {/* Stop number */}
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-extrabold text-emerald-500">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    {/* Stop details */}
                    <div className="min-w-0 flex-1">
                      <h4
                        className={`text-sm font-bold leading-5 ${
                          theme.primaryText
                        }`}
                      >
                        {stop.name}
                      </h4>

                      {stop.description && (
                        <p
                          className={`mt-2 text-xs leading-5 ${
                            theme.secondaryText
                          }`}
                        >
                          {stop.description}
                        </p>
                      )}

                      {/* Location, time and duration */}
                      {(stop.location ||
                        stop.startTime ||
                        stop.durationMinutes !== undefined) && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {stop.location && (
                            <span
                              className={`inline-flex max-w-full items-center gap-1.5 rounded-lg px-2 py-1 text-[10px] ${
                                isDarkMode
                                  ? "bg-white/5 text-slate-300"
                                  : "bg-slate-50 text-slate-600"
                              }`}
                            >
                              <MapPin
                                size={12}
                                className="shrink-0 text-emerald-500"
                              />

                              <span className="break-words">
                                {stop.location}
                              </span>
                            </span>
                          )}

                          {stop.startTime && (
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-[10px] ${
                                isDarkMode
                                  ? "bg-white/5 text-slate-300"
                                  : "bg-slate-50 text-slate-600"
                              }`}
                            >
                              <Clock3
                                size={12}
                                className="text-emerald-500"
                              />

                              {stop.startTime}
                            </span>
                          )}

                          {stop.durationMinutes !== undefined && (
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-[10px] ${
                                isDarkMode
                                  ? "bg-white/5 text-slate-300"
                                  : "bg-slate-50 text-slate-600"
                              }`}
                            >
                              <Timer
                                size={12}
                                className="text-emerald-500"
                              />

                              {stop.durationMinutes} min
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </article>
        ))}
      </div>
    </>
  )}
</div>
      </div>
    </>
  );
};

export default ItineraryTab;
