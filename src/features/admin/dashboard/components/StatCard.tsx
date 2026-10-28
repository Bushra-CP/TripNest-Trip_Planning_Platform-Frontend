import { type LucideIcon, TrendingDown, TrendingUp } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend: string;
  trendType: "up" | "down";
  color: string;
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendType,
  color,
}: StatCardProps) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
            {title}
          </p>

          <h3 className="text-3xl font-black tracking-tight text-slate-900 group-hover:text-[#2e7d32] transition-colors">
            {value}
          </h3>
        </div>

        <div
          className={`p-3 rounded-lg ${color} text-white shadow-lg`}
        >
          <Icon size={20} />
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <div
          className={`flex items-center gap-1 text-xs font-bold ${
            trendType === "up"
              ? "text-[#2e7d32]"
              : "text-red-500"
          }`}
        >
          {trendType === "up" ? (
            <TrendingUp size={14} />
          ) : (
            <TrendingDown size={14} />
          )}

          {trend}
        </div>

        <span className="text-[10px] uppercase font-bold text-slate-400">
          from last month
        </span>
      </div>
    </div>
  );
};

export default StatCard;