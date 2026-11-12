import DOMPurify from "dompurify";

import {
  X,
  User,
  Calendar,
  MapPin,
  Flag,
  CheckCircle,
  XCircle,
  Eye,
  Clock,
  FileWarning,
  Image as ImageIcon,
} from "lucide-react";

import type {
  AdminPostReport,
  AdminPostReportStatus,
} from "../types/admin-post-reports.types";

interface AdminPostReportsModalsProps {
  report: AdminPostReport | null;
  isLoading: boolean;
  isUpdatingStatus: boolean;

  onClose: () => void;

  onUpdateStatus: (reportId: string, status: AdminPostReportStatus) => void;
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

const formatDate = (date?: string): string => {
  if (!date) return "Not available";

  return new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// ==========================================
// STATUS BADGE
// ==========================================

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    PENDING: "bg-amber-50 text-amber-700 border-amber-200",
    REVIEWED: "bg-blue-50 text-blue-700 border-blue-200",
    RESOLVED: "bg-green-50 text-green-700 border-green-200",
    REJECTED: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
        styles[status] || "bg-gray-50 text-gray-600 border-gray-200"
      }`}
    >
      {status}
    </span>
  );
};

// ==========================================
// AVAILABLE STATUS ACTIONS
// ==========================================

const getAvailableActions = (
  status: AdminPostReportStatus,
): AdminPostReportStatus[] => {
  switch (status) {
    case "PENDING":
      return ["REVIEWED", "RESOLVED", "REJECTED"];

    case "REVIEWED":
      return ["RESOLVED", "REJECTED"];

    case "RESOLVED":
    case "REJECTED":
      return [];

    default:
      return [];
  }
};

// ==========================================
// MAIN MODAL COMPONENT
// ==========================================

const AdminPostReportsModals = ({
  report,
  isLoading,
  isUpdatingStatus,
  onClose,
  onUpdateStatus,
}: AdminPostReportsModalsProps) => {
  // Loading state
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-xl">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

          <p className="mt-4 text-sm text-gray-500">
            Loading report details...
          </p>
        </div>
      </div>
    );
  }

  // Do not render when there is no report.
  if (!report) return null;

  const availableActions = getAvailableActions(report.status);

  // Sanitize post content before rendering HTML.
  const sanitizedContent = DOMPurify.sanitize(report.post?.content || "");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        {/* ================================== */}
        {/* MODAL HEADER */}
        {/* ================================== */}

        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
          <div>
            <div className="flex items-center gap-2">
              <FileWarning size={20} className="text-red-500" />

              <h2 className="text-lg font-bold text-gray-900">
                Report Details
              </h2>
            </div>

            <p className="mt-1 text-xs text-gray-500">
              Review the reported post and take appropriate action.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isUpdatingStatus}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* ================================== */}
        {/* MODAL BODY */}
        {/* ================================== */}

        <div className="flex-1 space-y-6 overflow-y-auto p-6">
          {/* REPORT INFORMATION */}

          <section className="rounded-xl border border-red-100 bg-red-50/50 p-5">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <Flag size={17} className="text-red-500" />

                <h3 className="font-semibold text-gray-800">
                  Report Information
                </h3>
              </div>

              <StatusBadge status={report.status} />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium text-gray-500">Report ID</p>

                <p className="mt-1 break-all text-sm font-medium text-gray-800">
                  {report._id}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500">
                  Submitted On
                </p>

                <div className="mt-1 flex items-center gap-2 text-sm text-gray-800">
                  <Calendar size={15} className="text-gray-400" />

                  {formatDate(report.createdAt)}
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500">
                  Report Reason
                </p>

                <p className="mt-1 text-sm font-semibold text-red-600">
                  {formatReason(report.reason)}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500">
                  Last Updated
                </p>

                <p className="mt-1 text-sm text-gray-800">
                  {formatDate(report.reviewedAt)}
                </p>
              </div>
            </div>

            {report.description && (
              <div className="mt-5 border-t border-red-100 pt-4">
                <p className="text-xs font-medium text-gray-500">
                  Report Description
                </p>

                <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-gray-700">
                  {report.description}
                </p>
              </div>
            )}
          </section>

          {/* REPORTER INFORMATION */}

          <section>
            <div className="mb-4 flex items-center gap-2">
              <User size={18} className="text-gray-500" />

              <h3 className="font-semibold text-gray-800">
                Reporter Information
              </h3>
            </div>

            {report.reporter ? (
              <div className="flex items-center gap-4 rounded-xl border border-gray-200 p-4">
                {report.reporter.profileImageUrl ? (
                  <img
                    src={report.reporter.profileImageUrl}
                    alt={report.reporter.fullName || "Reporter"}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-lg font-semibold text-gray-500">
                    {report.reporter.fullName?.charAt(0).toUpperCase() || "?"}
                  </div>
                )}

                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {report.reporter.fullName || "Unknown Reporter"}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    ID: {report.reporter._id}
                  </p>
                </div>
              </div>
            ) : (
              <p className="rounded-lg bg-gray-50 p-4 text-sm text-gray-500">
                Reporter information is unavailable.
              </p>
            )}
          </section>

          {/* REPORTED POST INFORMATION */}

          <section>
            <div className="mb-4 flex items-center gap-2">
              <ImageIcon size={18} className="text-gray-500" />

              <h3 className="font-semibold text-gray-800">Reported Post</h3>
            </div>

            {report.post ? (
              <div className="space-y-5 rounded-xl border border-gray-200 p-5">
                {/* POST TITLE */}

                <div>
                  <h4 className="text-lg font-bold text-gray-900">
                    {report.post.title}
                  </h4>

                  {report.post.destination && (
                    <div className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
                      <MapPin size={15} />

                      {report.post.destination}
                    </div>
                  )}
                </div>

                {/* POST AUTHOR */}

                <div className="flex items-center gap-3 border-y border-gray-100 py-4">
                  {report.post.author?.profileImageUrl ? (
                    <img
                      src={report.post.author.profileImageUrl}
                      alt={report.post.author.fullName || "Post author"}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                      <User size={18} className="text-gray-500" />
                    </div>
                  )}

                  <div>
                    <p className="text-xs text-gray-400">Posted by</p>

                    <p className="text-sm font-semibold text-gray-800">
                      {report.post.author?.fullName || "Unknown Author"}
                    </p>
                  </div>

                  <div className="ml-auto">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        report.post.status === "BLOCKED"
                          ? "bg-red-50 text-red-600"
                          : "bg-green-50 text-green-600"
                      }`}
                    >
                      {report.post.status}
                    </span>
                  </div>
                </div>

                {/* POST CONTENT */}

                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Post Content
                  </p>

                  <div
                    className="prose prose-sm max-w-none break-words text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html: sanitizedContent,
                    }}
                  />
                </div>

                {/* POST MEDIA */}

                {report.post.media?.length > 0 && (
                  <div>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Post Media
                    </p>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {report.post.media.map((media) => (
                        <div
                          key={media.key}
                          className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50"
                        >
                          {media.type === "video" ? (
                            <video
                              src={media.url}
                              controls
                              className="max-h-64 w-full object-contain"
                            />
                          ) : (
                            <img
                              src={media.url}
                              alt="Reported post media"
                              className="max-h-64 w-full object-contain"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
                <p className="text-sm font-medium text-amber-700">
                  The reported post is unavailable.
                </p>

                <p className="mt-1 text-xs text-amber-600">
                  The original post may have been deleted.
                </p>
              </div>
            )}
          </section>

          {/* REVIEW INFORMATION */}

          <section className="rounded-xl border border-gray-200 p-5">
            <div className="mb-4 flex items-center gap-2">
              <Eye size={18} className="text-gray-500" />

              <h3 className="font-semibold text-gray-800">Report Review</h3>
            </div>

            <p className="mb-4 text-sm text-gray-500">
              Choose an appropriate action based on your review of this report.
            </p>

            {availableActions.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {availableActions.includes("REVIEWED") && (
                  <button
                    type="button"
                    disabled={isUpdatingStatus}
                    onClick={() => onUpdateStatus(report._id, "REVIEWED")}
                    className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-700 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Eye size={16} />
                    Mark as Reviewed
                  </button>
                )}

                {availableActions.includes("RESOLVED") && (
                  <button
                    type="button"
                    disabled={isUpdatingStatus}
                    onClick={() => onUpdateStatus(report._id, "RESOLVED")}
                    className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <CheckCircle size={16} />
                    Resolve Report
                  </button>
                )}

                {availableActions.includes("REJECTED") && (
                  <button
                    type="button"
                    disabled={isUpdatingStatus}
                    onClick={() => onUpdateStatus(report._id, "REJECTED")}
                    className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <XCircle size={16} />
                    Reject Report
                  </button>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 rounded-lg bg-gray-50 p-3 text-sm text-gray-500">
                <CheckCircle size={17} />
                This report has already been {report.status.toLowerCase()}. No
                further status changes are allowed.
              </div>
            )}

            {isUpdatingStatus && (
              <div className="mt-4 flex items-center gap-2 text-sm text-blue-600">
                <Clock size={15} className="animate-pulse" />
                Updating report status...
              </div>
            )}
          </section>
        </div>

        {/* ================================== */}
        {/* MODAL FOOTER */}
        {/* ================================== */}

        <div className="flex justify-end border-t border-gray-200 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isUpdatingStatus}
            className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPostReportsModals;
