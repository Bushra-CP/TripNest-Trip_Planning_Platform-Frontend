import { Navigation } from "lucide-react";

interface RouteInfoProps {
  isDarkMode: boolean;
  theme: {
    primaryText: string;
  };
}

const RouteInfo = ({ isDarkMode, theme }: RouteInfoProps) => {
  return (
    <div className="absolute top-[78px] left-3 right-3 sm:left-5 sm:right-auto z-10">
      <div
        className={`w-full sm:w-auto backdrop-blur-xl border rounded-xl p-2.5 sm:p-3 shadow-2xl flex items-center gap-2 sm:gap-3 ${
          isDarkMode
            ? "bg-[#101B2D]/95 border-[#243650]"
            : "bg-white/95 border-slate-200"
        }`}
      >
        <div className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 bg-[#3B82F6]/10 rounded-lg flex items-center justify-center text-[#60A5FA]">
          <Navigation size={17} />
        </div>

        <div className="min-w-0">
          <h2
            className={`text-[11px] sm:text-xs font-black truncate ${theme.primaryText}`}
          >
            Mumbai to South Goa
          </h2>

          <p className="text-[8px] sm:text-[9px] text-slate-500 font-bold uppercase tracking-wide truncate">
            8h 45m • 452 km total distance
          </p>
        </div>

        <div className="hidden sm:flex gap-2 ml-1">
          <span className="px-2 py-1 bg-[#3B82F6]/10 text-[#60A5FA] text-[8px] font-black rounded-md border border-[#3B82F6]/25 uppercase whitespace-nowrap">
            Fastest Route
          </span>

          <span
            className={`px-2 py-1 text-[8px] font-black rounded-md border uppercase ${
              isDarkMode
                ? "bg-[#60A5FA]/10 text-[#93C5FD] border-[#60A5FA]/20"
                : "bg-blue-50 text-[#2563EB] border-blue-100"
            }`}
          >
            Scenic
          </span>
        </div>
      </div>
    </div>
  );
};

export default RouteInfo;