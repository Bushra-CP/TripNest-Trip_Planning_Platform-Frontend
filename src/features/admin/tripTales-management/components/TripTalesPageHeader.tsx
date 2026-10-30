import { Download } from "lucide-react";

interface Props {
  onExport: () => void;
}

export default function TripTalesPageHeader({ onExport }: Props) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            TripTales Management
          </h1>

          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
            MODERATION ENGINE
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
          Review and manage travel stories shared by the community.
        </p>
      </div>

      <button
        type="button"
        onClick={onExport}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#E2E8F0] bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-xs active:scale-95"
      >
        <Download className="w-4 h-4 text-slate-400" />
        <span>Export Current Page</span>
      </button>
    </div>
  );
}
