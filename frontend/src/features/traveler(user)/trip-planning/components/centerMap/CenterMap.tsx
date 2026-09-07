import type { RoutePlanningResult } from "../../interfaces/route.interfaces";
import GoogleMapView from "./GoogleMapView";
import ZoomControls from "./ZoomControls";

interface ThemeProps {
  primaryText: string;
}

interface CenterMapProps {
  isDarkMode: boolean;
  theme: ThemeProps;
  route: RoutePlanningResult | null;
}

const CenterMap = ({ isDarkMode, route }: CenterMapProps) => {
  return (
    <main
      className={`relative flex-1 min-w-0 overflow-hidden pt-[64px] pb-[60px] lg:pb-0 transition-colors duration-300 ${
        isDarkMode ? "bg-[#0A1222]" : "bg-slate-100"
      }`}
    >
      <GoogleMapView isDarkMode={isDarkMode} route={route} />

      <ZoomControls isDarkMode={isDarkMode} />
    </main>
  );
};

export default CenterMap;
