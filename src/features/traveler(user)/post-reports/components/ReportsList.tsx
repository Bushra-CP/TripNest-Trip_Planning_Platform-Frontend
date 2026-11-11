import {
  Eye,
  XCircle,
  ChevronLeft,
  ChevronRight,
  FileText,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";

import type { ReportItem } from "../types/my-reports.types";

import {
  REPORT_REASON_LABELS,
  formatReportDate,
  getPost,
  getReportDisplayId,
} from "../types/my-reports.types";

interface Props {
  reports: ReportItem[];
  totalReports: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  loading: boolean;
  hasAnyReports: boolean;

  onView: (report: ReportItem) => void;
  onCancel: (report: ReportItem) => void;
  onPageChange: (page: number) => void;
  onResetFilters: () => void;
}

const StatusBadge = ({ status }: { status: ReportItem["status"] }) => {
  const styles: Record<ReportItem["status"], string> = {
    PENDING:
      "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",

    REVIEWED:
      "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",

    RESOLVED:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",

    REJECTED: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
  };

  const labels: Record<ReportItem["status"], string> = {
    PENDING: "Pending",
    REVIEWED: "Reviewed",
    RESOLVED: "Resolved",
    REJECTED: "Rejected",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
};

const ReportsList = ({
  reports,
  totalReports,
  currentPage,
  totalPages,
  pageSize,
  loading,
  hasAnyReports,
  onView,
  onCancel,
  onPageChange,
  onResetFilters,
}: Props) => {
  const startIndex = totalReports === 0 ? 0 : (currentPage - 1) * pageSize + 1;

  const endIndex = Math.min(currentPage * pageSize, totalReports);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Submitted Reports
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              View the reports you have submitted.
            </p>
          </div>

          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {totalReports} reports
          </span>
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex min-h-[280px] flex-col items-center justify-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Loading your reports...
          </p>
        </div>
      ) : reports.length === 0 ? (
        /* Empty state */
        <div className="flex min-h-[280px] flex-col items-center justify-center px-6 text-center">
          <div className="mb-4 rounded-full bg-slate-100 p-4 dark:bg-slate-800">
            <FileText className="h-8 w-8 text-slate-400" />
          </div>

          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            {hasAnyReports
              ? "No matching reports found"
              : "You haven't submitted any reports yet"}
          </h3>

          <p className="mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
            {hasAnyReports
              ? "Try changing your filters or search term."
              : "Reports you submit on TripTales will appear here."}
          </p>

          {hasAnyReports && (
            <button
              onClick={onResetFilters}
              className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Reset Filters
            </button>
          )}
        </div>
      ) : (
        /* Reports table */
        <>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:bg-slate-800/50 dark:text-slate-400">
                  <th className="px-6 py-4">Report ID</th>
                  <th className="px-6 py-4">Reported Post</th>
                  <th className="px-6 py-4">Reason</th>
                  <th className="px-6 py-4">Date Submitted</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {reports.map((report) => {
                  const post = getPost(report);
                  const thumbnail = post?.media?.[0]?.url;

                  return (
                    <tr
                      key={report._id}
                      className="transition hover:bg-slate-50 dark:hover:bg-slate-800/40"
                    >
                      {/* Report ID */}
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm font-semibold text-slate-700 dark:text-slate-200">
                          {getReportDisplayId(report)}
                        </span>
                      </td>

                      {/* Post */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
                            {thumbnail ? (
                              <img
                                src={thumbnail}
                                alt={post?.title || "Reported post"}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center">
                                <ImageIcon className="h-5 w-5 text-slate-400" />
                              </div>
                            )}
                          </div>

                          <div className="min-w-0">
                            <p className="max-w-[220px] truncate text-sm font-semibold text-slate-900 dark:text-white">
                              {post?.title || "Post unavailable"}
                            </p>

                            {post?.destination && (
                              <p className="mt-1 max-w-[220px] truncate text-xs text-slate-500 dark:text-slate-400">
                                {post.destination}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Reason */}
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-700 dark:text-slate-300">
                          {REPORT_REASON_LABELS[report.reason]}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                          {formatReportDate(report.createdAt)}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <StatusBadge status={report.status} />
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => onView(report)}
                            title="View report"
                            className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-500/10"
                          >
                            <Eye className="h-4 w-4" />
                          </button>

                          {report.status === "PENDING" && (
                            <button
                              onClick={() => onCancel(report)}
                              title="Cancel report"
                              className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10"
                            >
                              <XCircle className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalReports > 0 && (
            <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 px-6 py-4 dark:border-slate-800 sm:flex-row">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Showing{" "}
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {startIndex}-{endIndex}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {totalReports}
                </span>{" "}
                reports
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <span className="px-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                  Page {currentPage} of {Math.max(totalPages, 1)}
                </span>

                <button
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ReportsList;
