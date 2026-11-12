import { Eye, ChevronLeft, ChevronRight, FileWarning } from "lucide-react";

import type {
  AdminPostReport,
  AdminPostReportsPagination,
} from "../types/admin-post-reports.types";

interface AdminPostReportsTableProps {
  reports: AdminPostReport[];
  pagination: AdminPostReportsPagination | null;
  isLoading: boolean;
  onView: (reportId: string) => void;
  onPageChange: (page: number) => void;
}

// ==========================================
// FORMAT REPORT REASON
// ==========================================

const formatReason = (reason: string): string => {
  const reasonLabels: Record<string, string> = {
    SPAM: "Spam",
    INAPPROPRIATE_CONTENT: "Inappropriate Content",
    HARASSMENT: "Harassment",
    HATE_SPEECH: "Hate Speech",
    FALSE_INFORMATION: "False Information",
    COPYRIGHT_VIOLATION: "Copyright Violation",
    OTHER: "Other",
  };

  return reasonLabels[reason] || reason;
};

// ==========================================
// FORMAT DATE
// ==========================================

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// ==========================================
// STATUS BADGE
// ==========================================

const StatusBadge = ({ status }: { status: string }) => {
  const statusStyles: Record<string, string> = {
    PENDING: "bg-amber-50 text-amber-700 border-amber-200",
    REVIEWED: "bg-blue-50 text-blue-700 border-blue-200",
    RESOLVED: "bg-green-50 text-green-700 border-green-200",
    REJECTED: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${
        statusStyles[status] || "bg-gray-50 text-gray-600 border-gray-200"
      }`}
    >
      {status}
    </span>
  );
};

// ==========================================
// MAIN TABLE COMPONENT
// ==========================================

const AdminPostReportsTable = ({
  reports,
  pagination,
  isLoading,
  onView,
  onPageChange,
}: AdminPostReportsTableProps) => {
  // Loading state
  if (isLoading) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

        <p className="mt-3 text-sm text-gray-500">Loading post reports...</p>
      </div>
    );
  }

  // Empty state
  if (reports.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
          <FileWarning size={26} className="text-gray-400" />
        </div>

        <h3 className="mt-4 text-base font-semibold text-gray-800">
          No Reports Found
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          There are no post reports matching your current filters.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Reporter
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Reported Post
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Reason
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Submitted On
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Status
              </th>

              <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {reports.map((report) => (
              <tr key={report._id} className="transition hover:bg-gray-50">
                {/* Reporter */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {report.reporter?.profileImageUrl ? (
                      <img
                        src={report.reporter.profileImageUrl}
                        alt={report.reporter.fullName || "Reporter"}
                        className="h-9 w-9 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-500">
                        {report.reporter?.fullName?.charAt(0).toUpperCase() ||
                          "?"}
                      </div>
                    )}

                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {report.reporter?.fullName || "Unknown Reporter"}
                      </p>

                      <p className="text-xs text-gray-400">
                        ID: {report.reporter?._id?.slice(-6) || "N/A"}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Reported Post */}
                <td className="max-w-[220px] px-6 py-4">
                  {report.post ? (
                    <>
                      <p className="truncate text-sm font-medium text-gray-800">
                        {report.post.title}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        {report.post.destination || "No destination"}
                      </p>
                    </>
                  ) : (
                    <span className="text-sm italic text-gray-400">
                      Post unavailable
                    </span>
                  )}
                </td>

                {/* Reason */}
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-gray-700">
                    {formatReason(report.reason)}
                  </span>
                </td>

                {/* Submitted Date */}
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">
                    {formatDate(report.createdAt)}
                  </span>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <StatusBadge status={report.status} />
                </td>

                {/* Action */}
                <td className="px-6 py-4 text-center">
                  <button
                    type="button"
                    onClick={() => onView(report._id)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                  >
                    <Eye size={15} />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 0 && (
        <div className="flex flex-col gap-3 border-t border-gray-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-medium text-gray-700">
              {(pagination.currentPage - 1) * pagination.limit + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium text-gray-700">
              {Math.min(
                pagination.currentPage * pagination.limit,
                pagination.totalReports,
              )}
            </span>{" "}
            of{" "}
            <span className="font-medium text-gray-700">
              {pagination.totalReports}
            </span>{" "}
            reports
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={!pagination.hasPreviousPage}
              onClick={() => onPageChange(pagination.currentPage - 1)}
              className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={16} />
              Previous
            </button>

            <span className="px-2 text-sm font-medium text-gray-700">
              {pagination.currentPage} / {pagination.totalPages}
            </span>

            <button
              type="button"
              disabled={!pagination.hasNextPage}
              onClick={() => onPageChange(pagination.currentPage + 1)}
              className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPostReportsTable;
