import { Flag, Clock, Eye, CheckCircle, XCircle } from "lucide-react";

import type { AdminPostReportsStats as StatsType } from "../types/admin-post-reports.types";

interface AdminPostReportsStatsProps {
  stats: StatsType;
  isLoading: boolean;
}

const AdminPostReportsStats = ({
  stats,
  isLoading,
}: AdminPostReportsStatsProps) => {
  const statCards = [
    {
      title: "Total Reports",
      value: stats.total,
      icon: Flag,
      iconStyle: "bg-blue-50 text-blue-600",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: Clock,
      iconStyle: "bg-amber-50 text-amber-600",
    },
    {
      title: "Reviewed",
      value: stats.reviewed,
      icon: Eye,
      iconStyle: "bg-purple-50 text-purple-600",
    },
    {
      title: "Resolved",
      value: stats.resolved,
      icon: CheckCircle,
      iconStyle: "bg-green-50 text-green-600",
    },
    {
      title: "Rejected",
      value: stats.rejected,
      icon: XCircle,
      iconStyle: "bg-red-50 text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {statCards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">{card.title}</p>

              <div className={`rounded-lg p-2 ${card.iconStyle}`}>
                <Icon size={18} />
              </div>
            </div>

            <div className="mt-4">
              {isLoading ? (
                <div className="h-8 w-16 animate-pulse rounded bg-gray-200" />
              ) : (
                <h3 className="text-2xl font-bold text-gray-900">
                  {card.value.toLocaleString()}
                </h3>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminPostReportsStats;
