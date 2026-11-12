import { Search, SlidersHorizontal, X } from "lucide-react";

import type {
  AdminPostReportReason,
  AdminPostReportStatus,
  AdminPostReportSortOrder,
} from "../types/admin-post-reports.types";

interface AdminPostReportsFiltersProps {
  search: string;
  status: AdminPostReportStatus | "";
  reason: AdminPostReportReason | "";
  sort: AdminPostReportSortOrder;

  onSearchChange: (value: string) => void;
  onStatusChange: (value: AdminPostReportStatus | "") => void;
  onReasonChange: (value: AdminPostReportReason | "") => void;
  onSortChange: (value: AdminPostReportSortOrder) => void;
  onClearFilters: () => void;
}

const AdminPostReportsFilters = ({
  search,
  status,
  reason,
  sort,
  onSearchChange,
  onStatusChange,
  onReasonChange,
  onSortChange,
  onClearFilters,
}: AdminPostReportsFiltersProps) => {
  const hasActiveFilters = Boolean(
    search || status || reason || sort !== "newest",
  );

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <SlidersHorizontal size={18} className="text-gray-500" />

        <h3 className="text-sm font-semibold text-gray-800">Filter Reports</h3>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {/* Search */}
        <div className="relative">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search reports..."
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Status Filter */}
        <select
          value={status}
          onChange={(event) =>
            onStatusChange(event.target.value as AdminPostReportStatus | "")
          }
          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        >
          <option value="">All Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="REVIEWED">Reviewed</option>
          <option value="RESOLVED">Resolved</option>
          <option value="REJECTED">Rejected</option>
        </select>

        {/* Reason Filter */}
        <select
          value={reason}
          onChange={(event) =>
            onReasonChange(event.target.value as AdminPostReportReason | "")
          }
          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        >
          <option value="">All Reasons</option>
          <option value="SPAM">Spam</option>
          <option value="INAPPROPRIATE_CONTENT">Inappropriate Content</option>
          <option value="HARASSMENT">Harassment</option>
          <option value="HATE_SPEECH">Hate Speech</option>
          <option value="FALSE_INFORMATION">False Information</option>
          <option value="COPYRIGHT_VIOLATION">Copyright Violation</option>
          <option value="OTHER">Other</option>
        </select>

        {/* Sort */}
        <select
          value={sort}
          onChange={(event) =>
            onSortChange(event.target.value as AdminPostReportSortOrder)
          }
          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={onClearFilters}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition hover:text-red-600"
          >
            <X size={15} />
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminPostReportsFilters;
