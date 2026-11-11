import React from "react";
import { CheckCircle2, Clock3, FileText, XCircle } from "lucide-react";
import type { ReportMetrics } from "../types/my-reports.types";

interface Props {
  metrics: ReportMetrics;
}

const ReportsOverview: React.FC<Props> = ({ metrics }) => {
  const cards = [
    {
      label: "Total Reports",
      value: metrics.total,
      note: "Your submitted reports",
      icon: FileText,
      color: "slate",
    },
    {
      label: "Pending",
      value: metrics.pending,
      note: "Awaiting moderator review",
      icon: Clock3,
      color: "amber",
    },
    {
      label: "Resolved",
      value: metrics.resolved,
      note: "Review completed",
      icon: CheckCircle2,
      color: "emerald",
    },
    {
      label: "Rejected",
      value: metrics.rejected,
      note: "No violation confirmed",
      icon: XCircle,
      color: "rose",
    },
  ];

  const colorClasses: Record<string, string> = {
    slate: "bg-slate-50 text-slate-600 border-slate-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
    rose: "bg-rose-50 text-rose-700 border-rose-200",
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-black tracking-tight text-slate-900">
              My Reports
            </h1>
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-700">
              Trust &amp; Safety
            </span>
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">
            Track the moderation status of the posts you have reported to help
            keep the TripNest community safe.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map(({ label, value, note, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                {label}
              </span>
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-xl border ${colorClasses[color]}`}
              >
                <Icon className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-4 text-3xl font-black tracking-tight text-slate-900">
              {value}
            </p>
            <p className="mt-1 text-[11px] font-medium text-slate-500">
              {note}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReportsOverview;
