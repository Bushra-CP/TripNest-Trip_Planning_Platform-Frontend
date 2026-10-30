import { BookOpen, CheckCircle2, Ban } from "lucide-react";

interface Props {
  stats: {
    total: number;
    published: number;
    blocked: number;
  };
}

export default function TripTalesStats({ stats }: Props) {
  const cards = [
    {
      label: "TOTAL POSTS",
      value: stats.total,
      icon: BookOpen,
      iconClass: "text-slate-500",
      description: "All community stories",
    },
    {
      label: "PUBLISHED POSTS",
      value: stats.published,
      icon: CheckCircle2,
      iconClass: "text-emerald-600",
      description: "Visible to travelers",
    },
    {
      label: "BLOCKED POSTS",
      value: stats.blocked,
      icon: Ban,
      iconClass: "text-rose-500",
      description: "Hidden from the public",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.label}
            className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs"
          >
            <div className="flex items-start justify-between">
              <p className="text-[10px] font-black text-slate-400 tracking-wider uppercase">
                {card.label}
              </p>

              <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center">
                <Icon className={`w-4 h-4 ${card.iconClass}`} />
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                {card.value.toLocaleString()}
              </h3>
              <p className="text-[11px] font-semibold text-slate-500 mt-1">
                {card.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
