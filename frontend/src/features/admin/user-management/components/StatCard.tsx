import { Clock3, UserCheck, Users, UserX } from "lucide-react";
import { type ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string;
  trend: string;
  icon: ReactNode;
  color: string;
}

export default function StatCard() {
  return (
    <>
<section className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6 mb-6 md:mb-10">
            <StatCards
          label="Total Users"
          value="124,592"
          trend="+2.4%"
          icon={<Users size={20} />}
          color="#2e7d32"
        />

        <StatCards
          label="Active Users"
          value="118,204"
          trend="+1.1%"
          icon={<UserCheck size={20} />}
          color="#2e7d32"
        />

        <StatCards
          label="Blocked Users"
          value="1,452"
          trend="~1.2% total"
          icon={<UserX size={20} />}
          color="#ef4444"
        />

        <StatCards
          label="Pending Approval"
          value="4,936"
          trend="+12.4% vs last week"
          icon={<Clock3 size={20} />}
          color="#f59e0b"
        />
      </section>
    </>
  );
}

// Reusable Stat Card Component
const StatCards = ({
  label,
  value,
  trend,
  icon,
  color,
}: StatCardProps) => {
  const trendColor = trend.startsWith("+")
    ? "#2e7d32"
    : trend.startsWith("~")
    ? "#64748b"
    : "#ef4444";

  return (
    <div className="bg-white p-2 sm:p-3 md:p-5 lg:p-6 rounded-xl md:rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-2 md:mb-4">
        <div
          className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center bg-slate-50"
          style={{ color }}
        >
          <div className="scale-75 md:scale-100">{icon}</div>
        </div>
      </div>

      <p className="text-[8px] sm:text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-wide md:tracking-widest">
        {label}
      </p>

      <h3 className="mt-1 text-sm sm:text-lg md:text-2xl lg:text-3xl font-black tracking-tight text-slate-900">
        {value}
      </h3>

      <div className="mt-1 md:mt-3 flex flex-col md:flex-row md:items-center gap-0 md:gap-1.5">
        <span
          className="text-[8px] sm:text-[9px] md:text-[11px] font-bold"
          style={{ color: trendColor }}
        >
          {trend}
        </span>

        <span className="hidden md:inline text-[10px] text-slate-400 font-bold uppercase tracking-tight">
          this month
        </span>
      </div>

      <div className="absolute top-0 right-0 w-16 h-16 md:w-24 md:h-24 bg-slate-50 rounded-full -mr-8 -mt-8 md:-mr-12 md:-mt-12 opacity-50" />
    </div>
  );
};
