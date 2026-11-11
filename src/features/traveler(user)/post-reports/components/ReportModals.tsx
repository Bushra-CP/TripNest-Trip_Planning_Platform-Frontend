import {
  X,
  ShieldCheck,
  AlertCircle,
  Loader2,
  CalendarDays,
  MapPin,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import type { ReportItem } from "../types/my-reports.types";

import {
  REPORT_REASON_LABELS,
  formatReportDate,
  getPost,
  getReportDisplayId,
} from "../types/my-reports.types";

interface Props {
  isDetailsOpen: boolean;
  selectedReport: ReportItem | null;

  detailsLoading: boolean;
  detailsError: string | null;

  onCloseDetails: () => void;

  reportToCancel: ReportItem | null;
  onCloseCancel: () => void;
  onConfirmCancel: () => void;

  onCancelFromDetails: (report: ReportItem) => void;

  cancelLoading: boolean;
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

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
};

const ReportModals = ({
  isDetailsOpen,
  selectedReport,
  detailsLoading,
  detailsError,
  onCloseDetails,
  reportToCancel,
  onCloseCancel,
  onConfirmCancel,
  onCancelFromDetails,
  cancelLoading,
}: Props) => {
  const post = selectedReport ? getPost(selectedReport) : null;

  return (
    <>
      {/* Report details modal */}
      {isDetailsOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={onCloseDetails}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl dark:bg-slate-900"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-800">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Report Details
                </h2>

                {selectedReport && (
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {getReportDisplayId(selectedReport)}
                  </p>
                )}
              </div>

              <button
                onClick={onCloseDetails}
                disabled={cancelLoading}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 disabled:opacity-50 dark:hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Loading */}
            {detailsLoading && (
              <div className="flex min-h-[300px] flex-col items-center justify-center gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Loading report details...
                </p>
              </div>
            )}

            {/* Error */}
            {!detailsLoading && detailsError && (
              <div className="flex min-h-[250px] flex-col items-center justify-center gap-3 px-6 text-center">
                <AlertCircle className="h-10 w-10 text-red-500" />

                <p className="text-sm text-red-600 dark:text-red-400">
                  {detailsError}
                </p>

                <button
                  onClick={onCloseDetails}
                  className="mt-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  Close
                </button>
              </div>
            )}

            {/* Report details */}
            {!detailsLoading && !detailsError && selectedReport && (
              <div className="space-y-6 p-6">
                {/* Status and date */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <StatusBadge status={selectedReport.status} />

                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <CalendarDays className="h-4 w-4" />

                    {formatReportDate(selectedReport.createdAt)}
                  </div>
                </div>

                {/* Report information */}
                <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                  <h3 className="mb-4 font-semibold text-slate-900 dark:text-white">
                    Report Information
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <FileText className="mt-0.5 h-5 w-5 text-slate-400" />

                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Reason
                        </p>

                        <p className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-200">
                          {REPORT_REASON_LABELS[selectedReport.reason]}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="mt-0.5 h-5 w-5 text-slate-400" />

                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Submitted on
                        </p>

                        <p className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-200">
                          {formatReportDate(selectedReport.createdAt)}
                        </p>
                      </div>
                    </div>

                    {selectedReport.reviewedAt && (
                      <div className="flex items-start gap-3">
                        <ShieldCheck className="mt-0.5 h-5 w-5 text-slate-400" />

                        <div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Reviewed on
                          </p>

                          <p className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-200">
                            {formatReportDate(selectedReport.reviewedAt)}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                {selectedReport.description && (
                  <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                    <h3 className="mb-2 font-semibold text-slate-900 dark:text-white">
                      Additional Description
                    </h3>

                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {selectedReport.description}
                    </p>
                  </div>
                )}

                {/* Reported post */}
                <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                  <h3 className="mb-4 font-semibold text-slate-900 dark:text-white">
                    Reported Post
                  </h3>

                  {post ? (
                    <div className="flex flex-col gap-4 sm:flex-row">
                      {post.media?.[0]?.type === "image" && (
                        <img
                          src={post.media[0].url}
                          alt={post.title || "Reported post"}
                          className="h-36 w-full rounded-lg object-cover sm:w-40"
                        />
                      )}

                      {post.media?.[0]?.type === "video" && (
                        <video
                          src={post.media[0].url}
                          controls
                          className="h-36 w-full rounded-lg object-cover sm:w-40"
                        />
                      )}

                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-slate-900 dark:text-white">
                          {post.title || "Untitled post"}
                        </h4>

                        {post.destination && (
                          <div className="mt-2 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                            <MapPin className="h-4 w-4 shrink-0" />

                            {post.destination}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      The reported post is no longer available.
                    </p>
                  )}
                </div>

                {/* Report status information */}
                <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
                  <h3 className="mb-3 font-semibold text-slate-900 dark:text-white">
                    Report Progress
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />

                      <span className="text-sm text-slate-700 dark:text-slate-300">
                        Report submitted
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {selectedReport.status === "PENDING" ? (
                        <Clock className="h-5 w-5 text-amber-500" />
                      ) : (
                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      )}

                      <span className="text-sm text-slate-700 dark:text-slate-300">
                        {selectedReport.status === "PENDING"
                          ? "Awaiting review"
                          : "Report reviewed"}
                      </span>
                    </div>

                    {(selectedReport.status === "RESOLVED" ||
                      selectedReport.status === "REJECTED") && (
                      <div className="flex items-center gap-3">
                        {selectedReport.status === "RESOLVED" ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}

                        <span className="text-sm text-slate-700 dark:text-slate-300">
                          {selectedReport.status === "RESOLVED"
                            ? "Report resolved"
                            : "Report rejected"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer actions */}
                <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
                  {selectedReport.status === "PENDING" && (
                    <button
                      onClick={() => onCancelFromDetails(selectedReport)}
                      disabled={cancelLoading}
                      className="rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-500/30 dark:hover:bg-red-500/10"
                    >
                      Cancel Report
                    </button>
                  )}

                  <button
                    onClick={onCloseDetails}
                    disabled={cancelLoading}
                    className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:opacity-50 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Cancel confirmation modal */}
      {reportToCancel && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={() => {
            if (!cancelLoading) onCloseCancel();
          }}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-red-100 p-3 dark:bg-red-500/10">
                <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Cancel Report?
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  Are you sure you want to cancel this report? This action
                  cannot be undone. You can submit a new report later if needed.
                </p>

                <p className="mt-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Report ID: {getReportDisplayId(reportToCancel)}
                </p>
              </div>
            </div>

            <div className="mt-7 flex justify-end gap-3">
              <button
                onClick={onCloseCancel}
                disabled={cancelLoading}
                className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Keep Report
              </button>

              <button
                onClick={onConfirmCancel}
                disabled={cancelLoading}
                className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {cancelLoading && <Loader2 className="h-4 w-4 animate-spin" />}

                {cancelLoading ? "Cancelling..." : "Yes, Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReportModals;
