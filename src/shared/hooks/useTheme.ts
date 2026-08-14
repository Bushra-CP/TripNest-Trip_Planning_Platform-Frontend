import { useMemo, useState } from "react";

const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const theme = useMemo(
    () => ({
      page: isDarkMode
        ? "bg-[#0A1222] text-slate-50"
        : "bg-slate-50 text-slate-900",

      surface: isDarkMode ? "bg-[#101B2D]" : "bg-white",

      surfaceSecondary: isDarkMode ? "bg-[#0D1728]" : "bg-slate-50",

      card: isDarkMode ? "bg-[#1A2940]" : "bg-slate-100",

      border: isDarkMode ? "border-[#243650]" : "border-slate-200",

      divider: isDarkMode ? "border-[#1B2A40]" : "border-slate-200",

      primaryText: isDarkMode ? "text-slate-50" : "text-slate-900",

      secondaryText: isDarkMode ? "text-slate-300" : "text-slate-600",

      mutedText: isDarkMode ? "text-slate-400" : "text-slate-500",

      input: isDarkMode
        ? "bg-[#0D1728] border-[#243650]"
        : "bg-slate-50 border-slate-200",

      secondaryButton: isDarkMode
        ? "bg-[#1A2940] hover:bg-[#243650] text-slate-200"
        : "bg-slate-100 hover:bg-slate-200 text-slate-700",

      iconButton: isDarkMode
        ? "text-slate-400 hover:text-[#60A5FA] hover:bg-[#3B82F6]/10"
        : "text-slate-500 hover:text-[#2563EB] hover:bg-blue-50",
    }),
    [isDarkMode],
  );

  return {
    isDarkMode,
    toggleTheme,
    theme,
  };
};

export default useTheme;
