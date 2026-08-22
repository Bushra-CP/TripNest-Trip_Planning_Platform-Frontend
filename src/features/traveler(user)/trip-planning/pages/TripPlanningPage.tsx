import React, { useState } from "react";
import { Navigation, Users, X, Map } from "lucide-react";

import Header from "@/shared/layouts/tripPlanningLayout/Header";
import useTheme from "@/shared/hooks/useTheme";
import RightSidebar from "../components/rightSidebar/RightSidebar";
import AISidebar from "../components/aiSidebar/AISidebar";
import CenterMap from "../components/centerMap/CenterMap";

const TripPlanningPage: React.FC = () => {
  const { isDarkMode, toggleTheme, theme } = useTheme();

  const [mobileSheet, setMobileSheet] = useState<"ai" | "group" | null>(null);

  const closeMobileSheet = () => {
    setMobileSheet(null);
  };

  const toggleMobileSheet = (sheet: "ai" | "group") => {
    setMobileSheet((current) => (current === sheet ? null : sheet));
  };

  return (
    <div
      className={`relative flex h-screen w-full overflow-hidden font-['Inter',sans-serif] transition-colors duration-300 ${theme.page}`}
    >
      {/* =========================================================
          TOP NAVIGATION
      ========================================================= */}

      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} theme={theme} />

      {/* =========================================================
          DESKTOP LEFT AI SIDEBAR
      ========================================================= */}

      <aside
        className={`hidden lg:flex w-[300px] xl:w-[350px] shrink-0 flex-col z-50 pt-[64px] border-r transition-colors duration-300 ${theme.surface} ${theme.border}`}
      >
        <AISidebar theme={theme} isDarkMode={isDarkMode} />
      </aside>

      {/* =========================================================
          CENTER MAP
      ========================================================= */}

      <CenterMap isDarkMode={isDarkMode} theme={theme} />

      {/* =========================================================
          DESKTOP RIGHT SIDEBAR
      ========================================================= */}

      <aside
        className={`hidden lg:flex w-[300px] xl:w-[350px] shrink-0 flex-col z-50 pt-[64px] border-l transition-colors duration-300 ${theme.surface} ${theme.border}`}
      >
        <RightSidebar isDarkMode={isDarkMode} theme={theme} />
      </aside>

      {/* =========================================================
          MOBILE AI BOTTOM SHEET
      ========================================================= */}

      {mobileSheet === "ai" && (
        <div className="lg:hidden fixed inset-0 z-[200]">
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close AI assistant"
            onClick={closeMobileSheet}
            className="absolute inset-0 bg-black/50"
          />

          {/* Sheet */}
          <div
            className={`absolute bottom-[60px] left-0 right-0 max-h-[75vh] rounded-t-2xl overflow-hidden shadow-2xl border-t ${theme.surface} ${theme.border}`}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-inherit">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center">
                  <Navigation size={15} className="text-[#60A5FA]" />
                </div>

                <span className={`text-sm font-bold ${theme.primaryText}`}>
                  AI Assistant
                </span>
              </div>

              <button
                type="button"
                onClick={closeMobileSheet}
                className={theme.iconButton}
                aria-label="Close AI assistant"
              >
                <X size={19} />
              </button>
            </div>

            <div className="max-h-[calc(75vh-60px)] overflow-y-auto">
              <AISidebar theme={theme} isDarkMode={isDarkMode} mobile />
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          MOBILE GROUP BOTTOM SHEET
      ========================================================= */}

      {mobileSheet === "group" && (
        <div className="lg:hidden fixed inset-0 z-[200]">
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close group activity"
            onClick={closeMobileSheet}
            className="absolute inset-0 bg-black/50"
          />

          {/* Sheet */}
          <div
            className={`absolute bottom-[60px] left-0 right-0 max-h-[80vh] rounded-t-2xl overflow-hidden shadow-2xl border-t ${theme.surface} ${theme.border}`}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-inherit">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center">
                  <Users size={15} className="text-[#60A5FA]" />
                </div>

                <span className={`text-sm font-bold ${theme.primaryText}`}>
                  Group Activity
                </span>
              </div>

              <button
                type="button"
                onClick={closeMobileSheet}
                className={theme.iconButton}
                aria-label="Close group activity"
              >
                <X size={19} />
              </button>
            </div>

            <div className="hide-scrollbar max-h-[calc(80vh-60px)] overflow-y-auto">
              <RightSidebar mobile isDarkMode={isDarkMode} theme={theme} />
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          MOBILE BOTTOM NAVIGATION
      ========================================================= */}

      <nav
        className={`lg:hidden fixed bottom-0 left-0 right-0 h-[60px] z-[150] border-t flex items-center ${
          theme.surface
        } ${theme.border}`}
      >
        {/* Map */}
        <button
          type="button"
          onClick={closeMobileSheet}
          className={`flex-1 h-full flex flex-col items-center justify-center gap-1 ${
            mobileSheet === null ? "text-[#3B82F6]" : theme.mutedText
          }`}
        >
          <Map size={18} />

          <span className="text-[8px] font-black uppercase">Map</span>
        </button>

        {/* AI */}
        <button
          type="button"
          onClick={() => toggleMobileSheet("ai")}
          className={`flex-1 h-full flex flex-col items-center justify-center gap-1 ${
            mobileSheet === "ai" ? "text-[#3B82F6]" : theme.mutedText
          }`}
        >
          <Navigation size={18} />

          <span className="text-[8px] font-black uppercase">AI</span>
        </button>

        {/* Group */}
        <button
          type="button"
          onClick={() => toggleMobileSheet("group")}
          className={`flex-1 h-full flex flex-col items-center justify-center gap-1 ${
            mobileSheet === "group" ? "text-[#3B82F6]" : theme.mutedText
          }`}
        >
          <Users size={18} />

          <span className="text-[8px] font-black uppercase">Group</span>
        </button>
      </nav>
    </div>
  );
};

export default TripPlanningPage;