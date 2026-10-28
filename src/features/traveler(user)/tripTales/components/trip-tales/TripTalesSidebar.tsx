import React from "react";

import {
  TrendingUp,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

interface TrendingPlace {
  rank: string;
  name: string;
  stories: string;
}

interface TopStoryteller {
  name: string;
  avatar: string;
  stats: string;
}

interface TripTalesSidebarProps {
  trendingPlaces: TrendingPlace[];

  topStorytellers: TopStoryteller[];

  followingMap: Record<string, boolean>;

  onToggleFollow: (name: string) => void;
}

const TripTalesSidebar: React.FC<TripTalesSidebarProps> = ({
  trendingPlaces,
  topStorytellers,
  followingMap,
  onToggleFollow,
}) => {
  return (
    <aside className="lg:col-span-4 space-y-6">
      {/* ==================================================
          TRENDING PLACES
      ================================================== */}

      <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 shadow-sm">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <TrendingUp className="w-4 h-4 text-[#15803D]" />

          <h3 className="text-xs font-black uppercase">Trending Places</h3>
        </div>

        <div className="space-y-3 mt-4">
          {trendingPlaces.length > 0 ? (
            trendingPlaces.map((item) => (
              <div
                key={item.rank}
                className="flex items-center justify-between py-1 px-2 rounded-xl hover:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-black text-slate-400">
                    {item.rank}
                  </span>

                  <div>
                    <p className="text-xs font-bold">{item.name}</p>

                    <p className="text-[10px] text-slate-400">{item.stories}</p>
                  </div>
                </div>

                <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-400 py-2">
              No trending places yet.
            </p>
          )}
        </div>
      </div>

      {/* ==================================================
          TOP STORYTELLERS
      ================================================== */}

      <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#15803D]" />

            <h3 className="text-xs font-black uppercase">Top Storytellers</h3>
          </div>
        </div>

        <div className="space-y-4 mt-4">
          {topStorytellers.length > 0 ? (
            topStorytellers.map((storyteller) => {
              const isFollowing = followingMap[storyteller.name];

              return (
                <div
                  key={storyteller.name}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={storyteller.avatar}
                      alt={storyteller.name}
                      className="w-9 h-9 rounded-full object-cover"
                    />

                    <div>
                      <p className="text-xs font-extrabold flex items-center gap-1">
                        {storyteller.name}

                        <CheckCircle2 className="w-3 h-3 text-[#15803D]" />
                      </p>

                      <p className="text-[10px] text-slate-400">
                        {storyteller.stats}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onToggleFollow(storyteller.name)}
                    className={`text-xs font-bold px-3 py-1 rounded-full border ${
                      isFollowing
                        ? "bg-slate-100 text-slate-700 border-slate-300"
                        : "border-[#15803D] text-[#15803D]"
                    }`}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </button>
                </div>
              );
            })
          ) : (
            <p className="text-xs text-slate-400 py-2">
              No storytellers available yet.
            </p>
          )}
        </div>
      </div>

      {/* ==================================================
          COMMUNITY GUIDELINES
      ================================================== */}

      <div className="bg-[#F0FDF4] border border-[#DCFCE7] rounded-3xl p-6">
        <div className="flex items-center gap-2 text-[#15803D]">
          <ShieldCheck className="w-5 h-5" />

          <h4 className="text-xs font-black uppercase">Community Guidelines</h4>
        </div>

        <p className="text-xs text-slate-600 mt-3 leading-relaxed">
          We value respectful sharing, authentic local recommendations, and
          responsible travel.
        </p>
      </div>
    </aside>
  );
};

export default TripTalesSidebar;
