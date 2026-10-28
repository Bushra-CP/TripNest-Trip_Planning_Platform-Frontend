import { BookOpen, CheckCircle2, Ban, Clock } from "lucide-react";

interface Props {
  stats: { total: number; active: number; blocked: number; pending: number };
}

export default function TripTalesStats({ stats }: Props) {
  return (
    <>
      {/* -------------------- 3. TELEMETRY SUMMARY CARDS -------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Total Posts */}
        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <p className="text-[10px] font-black text-slate-400 tracking-wider uppercase">
              TOTAL POSTS
            </p>
            <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              {stats.total.toLocaleString()}
            </h3>
            <p className="text-[11px] font-semibold text-slate-500 mt-1 flex items-center gap-1">
              <span className="text-slate-700 font-bold">~ +24 this week</span>
            </p>
          </div>
        </div>

        {/* 2. Active Posts */}
        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <p className="text-[10px] font-black text-slate-400 tracking-wider uppercase">
              ACTIVE POSTS
            </p>
            <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              {stats.active.toLocaleString()}
            </h3>
            <p className="text-[11px] font-semibold text-emerald-700 mt-1 flex items-center gap-1">
              <strong>96.8% Live</strong>
              <span className="text-slate-500 font-normal">in stream</span>
            </p>
          </div>
        </div>

        {/* 3. Blocked Posts */}
        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <p className="text-[10px] font-black text-slate-400 tracking-wider uppercase">
              BLOCKED POSTS
            </p>
            <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-rose-500">
              <Ban className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              {stats.blocked}
            </h3>
            <div className="text-[11px] font-semibold text-rose-600 mt-1 flex items-center justify-between">
              <span>Action Taken</span>
              <span className="text-slate-400 font-normal">
                0.01% violation
              </span>
            </div>
          </div>
        </div>

        {/* 4. Pending Review */}
        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <p className="text-[10px] font-black text-slate-400 tracking-wider uppercase">
              PENDING REVIEW
            </p>
            <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-amber-500">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              {stats.pending}
            </h3>
            <div className="text-[11px] font-semibold text-amber-700 mt-1 flex items-center justify-between">
              <span>Needs Moderation</span>
              <span className="text-slate-400 font-normal">SLA: 2.1h</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
