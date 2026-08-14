import MapBackground from "./MapBackground";
import RouteInfo from "./RouteInfo";
import RoutePath from "./RoutePath";
import ZoomControls from "./ZoomControls";

interface ThemeProps {
  primaryText: string;
}

interface CenterMapProps {
  isDarkMode: boolean;
  theme: ThemeProps;
}

const CenterMap = ({ isDarkMode, theme }: CenterMapProps) => {
  return (
    <main
      className={`relative flex-1 min-w-0 overflow-hidden pt-[64px] pb-[60px] lg:pb-0 transition-colors duration-300 ${
        isDarkMode ? "bg-[#0A1222]" : "bg-slate-100"
      }`}
    >
      <MapBackground isDarkMode={isDarkMode} />

      <RouteInfo isDarkMode={isDarkMode} theme={theme} />

      <RoutePath />

      <ZoomControls isDarkMode={isDarkMode} />
    </main>
  );
};

export default CenterMap;