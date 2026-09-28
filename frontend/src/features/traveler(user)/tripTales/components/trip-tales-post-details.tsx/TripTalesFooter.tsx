import React from "react";
import { Compass } from "lucide-react";

const TripTalesFooter: React.FC = () => {
  return (
    <footer className="border-t border-[#E2E8F0] bg-white mt-16 py-10 text-xs text-slate-500 font-medium">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#15803D] flex items-center justify-center text-white font-black text-xs">
            <Compass className="w-4 h-4 text-white" />
          </div>

          <span className="font-extrabold text-slate-900 tracking-tight text-sm">
            TripNest
          </span>

          <span className="text-slate-300 mx-2">|</span>

          <span>© 2026 TripNest. All rights reserved.</span>
        </div>

        <div className="flex flex-wrap items-center gap-6 font-semibold text-slate-600">
          <button
            type="button"
            className="hover:text-[#15803D] transition-colors"
          >
            Privacy Policy
          </button>

          <button
            type="button"
            className="hover:text-[#15803D] transition-colors"
          >
            Help Center
          </button>

          <button
            type="button"
            className="hover:text-[#15803D] transition-colors"
          >
            Terms of Service
          </button>

          <button
            type="button"
            className="hover:text-[#15803D] transition-colors"
          >
            Community Guidelines
          </button>
        </div>
      </div>
    </footer>
  );
};

export default TripTalesFooter;
