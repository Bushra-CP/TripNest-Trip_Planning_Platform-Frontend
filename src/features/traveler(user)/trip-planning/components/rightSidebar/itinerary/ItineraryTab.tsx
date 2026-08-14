import { Clock, Navigation, Plus, Send } from "lucide-react";

interface ThemeProps {
  surface: string;
  border: string;
  divider: string;
  primaryText: string;
  secondaryText: string;
  mutedText: string;
  input: string;
}

interface ItineraryTabProps {
  mobile?: boolean;
  isDarkMode: boolean;
  theme: ThemeProps;
}

const itineraryItems = [
  {
    id: 1,
    time: "06:00 AM",
    type: "START",
    title: "Departure Point",
    location: "Sion Circle, Mumbai. Group assembly and luggage check.",
    distance: "0 km",
    status: "completed",
  },
  {
    id: 2,
    time: "10:30 AM",
    type: "STOP 1",
    title: "Fueling Stop",
    location: "HP Petrol Pump, NH66. Quick refuel and tire pressure check.",
    meta: "15 mins stop",
    distance: "+180 km",
    status: "active",
  },
  {
    id: 3,
    time: "01:30 PM",
    type: "STOP 2",
    title: "Lunch Break",
    location: "Hotel Opal, Kolhapur. Authentic Maharashtrian thali.",
    distance: "+140 km",
    status: "upcoming",
  },
  {
    id: 4,
    time: "07:00 PM",
    type: "END",
    title: "Arrival at Destination",
    location: "Colva Beach, South Goa. Check-in at Sea Breeze Resort.",
    distance: "+132 km",
    status: "upcoming",
  },
];

const ItineraryTab = ({
  mobile = false,
  isDarkMode,
  theme,
}: ItineraryTabProps) => {
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

          <button className="flex items-center gap-1.5 text-[#10b981] hover:text-[#059669] text-[10px] font-bold uppercase tracking-widest transition-colors">
            <Plus size={14} />
            Add Stop
          </button>
        </div>

        <div className="relative space-y-12 pb-10">
          <div
            className={`absolute left-[39px] top-2 bottom-8 w-0.5 ${
              isDarkMode ? "bg-white/5" : "bg-slate-200"
            }`}
          />

          {itineraryItems.map((item) => (
            <div key={item.id} className="relative flex gap-6">
              <div className="w-20 pt-1 text-right">
                <p className={`text-[10px] font-black ${theme.mutedText}`}>
                  {item.time}
                </p>

                <p className="text-[9px] font-bold text-slate-500 mt-1">
                  {item.distance}
                </p>
              </div>

              <div className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-3 h-3 rounded-full ring-4 ${
                    isDarkMode
                      ? "ring-[#0f172a]"
                      : "ring-white border border-slate-200"
                  } ${
                    item.status === "completed"
                      ? "bg-[#10b981]"
                      : item.status === "active"
                        ? "bg-[#10b981] animate-pulse"
                        : "bg-slate-400"
                  }`}
                />
              </div>

              <div className="flex-1">
                <div className="mb-2">
                  <span
                    className={`text-[9px] font-black px-2 py-1 rounded border uppercase tracking-widest ${
                      item.status === "completed"
                        ? "bg-[#10b981]/10 text-[#10b981] border-[#10b981]/20"
                        : isDarkMode
                          ? "bg-slate-700/20 text-slate-400 border-slate-700"
                          : "bg-slate-100 text-slate-600 border-slate-200"
                    }`}
                  >
                    {item.type}
                  </span>
                </div>

                <h4 className={`text-sm font-bold mb-1 ${theme.primaryText}`}>
                  {item.title}
                </h4>

                <p className={`text-xs leading-relaxed ${theme.secondaryText}`}>
                  {item.location}
                </p>

                {item.meta && (
                  <div
                    className={`mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-lg border ${
                      isDarkMode
                        ? "bg-white/5 border-white/10"
                        : "bg-slate-100 border-slate-200"
                    }`}
                  >
                    <Clock size={12} className={theme.mutedText} />

                    <span
                      className={`text-[10px] font-bold uppercase tracking-widest ${theme.secondaryText}`}
                    >
                      {item.meta}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className={`pt-6 border-t ${theme.divider}`}>
          <div
            className={`rounded-2xl p-5 border ${
              isDarkMode
                ? "bg-[#10b981]/5 border-[#10b981]/10"
                : "bg-emerald-50 border-emerald-100"
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#10b981]/20 flex items-center justify-center text-[#10b981]">
                <Navigation size={20} />
              </div>

              <div>
                <p
                  className={`text-xs font-black uppercase ${theme.primaryText}`}
                >
                  Active Navigation
                </p>

                <p className={`text-[10px] ${theme.secondaryText}`}>
                  Synced with Group Leader
                </p>
              </div>
            </div>

            <button className="w-full py-3 bg-[#10b981] hover:bg-[#059669] text-white text-[10px] font-black rounded-xl uppercase tracking-widest transition-colors">
              Sync Live Route
            </button>
          </div>
        </div>
      </div>

      <div className={`p-6 border-t ${theme.divider}`}>
        <div
          className={`rounded-[28px] p-2 flex items-center gap-3 border ${theme.input}`}
        >
          <input
            type="text"
            placeholder="Message group..."
            className={`flex-1 bg-transparent border-none outline-none text-sm px-4 ${theme.primaryText}`}
          />

          <button
            className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${theme.surface}`}
          >
            <Send size={18} className={theme.mutedText} />
          </button>
        </div>
      </div>
    </>
  );
};

export default ItineraryTab;
