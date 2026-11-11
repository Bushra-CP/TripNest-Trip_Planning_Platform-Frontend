import React from "react";
import { ArrowUpDown, RotateCcw, Search, X } from "lucide-react";
import type { ReportReason, ReportStatus } from "../types/my-reports.types";
import { REPORT_REASON_LABELS } from "../types/my-reports.types";

interface Props {
  search: string;
  status: "ALL" | ReportStatus;
  reason: "ALL" | ReportReason;
  sort: "newest" | "oldest";
  onSearchChange: (value: string) => void;
  onStatusChange: (value: "ALL" | ReportStatus) => void;
  onReasonChange: (value: "ALL" | ReportReason) => void;
  onSortChange: (value: "newest" | "oldest") => void;
  onReset: () => void;
}

const ReportsFilters: React.FC<Props> = ({
  search,
  status,
  reason,
  sort,
  onSearchChange,
  onStatusChange,
  onReasonChange,
  onSortChange,
  onReset,
}) => (
  <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="relative min-w-0 flex-1">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by post title or destination..."
          className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-9 text-xs font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white"
        />
        {search && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <label className="relative">
          <span className="sr-only">Filter by status</span>
          <select
            value={status}
            onChange={(e) =>
              onStatusChange(e.target.value as "ALL" | ReportStatus)
            }
            className="h-10 appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-3 pr-8 text-xs font-bold text-slate-700 outline-none focus:border-emerald-600"
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="REVIEWED">Reviewed</option>
            <option value="RESOLVED">Resolved</option>
            <option value="REJECTED">Rejected</option>
          </select>
          <ArrowUpDown className="pointer-events-none absolute right-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-400" />
        </label>
        <label className="relative">
          <span className="sr-only">Filter by reason</span>
          <select
            value={reason}
            onChange={(e) =>
              onReasonChange(e.target.value as "ALL" | ReportReason)
            }
            className="h-10 max-w-[190px] appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-3 pr-8 text-xs font-bold text-slate-700 outline-none focus:border-emerald-600"
          >
            <option value="ALL">All Reasons</option>
            {Object.entries(REPORT_REASON_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <ArrowUpDown className="pointer-events-none absolute right-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-400" />
        </label>
        <label className="relative">
          <span className="sr-only">Sort reports</span>
          <select
            value={sort}
            onChange={(e) =>
              onSortChange(e.target.value as "newest" | "oldest")
            }
            className="h-10 appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-3 pr-8 text-xs font-bold text-slate-700 outline-none focus:border-emerald-600"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
          <ArrowUpDown className="pointer-events-none absolute right-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-400" />
        </label>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-slate-200 px-3.5 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>
    </div>
    <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3 text-[11px] font-medium text-slate-400">
      <span>Active filters:</span>
      <span className="rounded-md bg-slate-100 px-2 py-1 font-bold text-slate-700">
        Sort: {sort === "newest" ? "Newest First" : "Oldest First"}
      </span>
      {status !== "ALL" && (
        <span className="rounded-md bg-emerald-50 px-2 py-1 font-bold text-emerald-700">
          Status: {status}
        </span>
      )}
      {reason !== "ALL" && (
        <span className="rounded-md bg-slate-100 px-2 py-1 font-bold text-slate-700">
          Reason: {REPORT_REASON_LABELS[reason]}
        </span>
      )}
    </div>
  </section>
);

export default ReportsFilters;
