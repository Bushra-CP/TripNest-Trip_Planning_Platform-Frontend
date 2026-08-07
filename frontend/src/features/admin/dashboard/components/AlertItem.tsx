import type { LucideIcon } from "lucide-react";

interface AlertItemProps {
  icon: LucideIcon;
  title: string;
  desc: string;
  time: string;
  type: "critical" | "warning";
}

const AlertItem = ({ icon: Icon, title, desc, time, type }: AlertItemProps) => {
  return (
    <div className="flex gap-4">
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
          type === "critical"
            ? "bg-red-50 text-red-500"
            : "bg-amber-50 text-amber-600"
        }`}
      >
        <Icon size={18} />
      </div>

      <div>
        <h4 className="text-sm font-bold">{title}</h4>

        <p className="text-xs text-slate-500 mt-1">{desc}</p>

        <p className="text-[10px] uppercase tracking-wider text-slate-400 mt-2">
          {time}
        </p>
      </div>
    </div>
  );
};

export default AlertItem;
