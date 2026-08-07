import type { LucideIcon } from "lucide-react";

interface QuickActionProps {
  icon: LucideIcon;
  label: string;
  color: string;
}

const QuickAction = ({
  icon: Icon,
  label,
  color,
}: QuickActionProps) => {
  return (
    <button className="flex flex-col items-center justify-center gap-3 p-6 bg-white border border-slate-100 rounded-xl hover:bg-slate-50 hover:border-[#2e7d32]/30 transition-all active:scale-95 group">

      <div
        className={`w-12 h-12 rounded-full ${color} text-white flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}
      >
        <Icon size={20} />
      </div>

      <span className="text-[11px] font-black uppercase tracking-wider text-slate-600 text-center leading-tight">
        {label}
      </span>
    </button>
  );
};

export default QuickAction;