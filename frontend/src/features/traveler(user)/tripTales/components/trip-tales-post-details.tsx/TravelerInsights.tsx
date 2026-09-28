import React from "react";
import { Compass } from "lucide-react";

const TravelerInsights: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 shadow-sm space-y-3">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <Compass className="w-4 h-4 text-[#15803D]" />

        <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
          Traveler Insights
        </h4>
      </div>

      <p className="text-xs text-slate-500 leading-relaxed">
        Travel information related to this post can be shown here once the
        relevant destination and knowledge data are available.
      </p>
    </div>
  );
};

export default TravelerInsights;
