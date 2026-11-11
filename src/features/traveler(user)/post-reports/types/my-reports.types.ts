import type {
  PostReportReason,
  PostReportStatus,
  PostReportResponse,
  ReportedPost,
} from "./post-report.types";

// REPORT TYPES

export type ReportStatus = PostReportStatus;
export type ReportReason = PostReportReason;

export type ReportItem = PostReportResponse;
export type ReportPost = ReportedPost;

// REPORT METRICS

export interface ReportMetrics {
  total: number;
  pending: number;
  resolved: number;
  rejected: number;
}

// REPORT REASON LABELS

export const REPORT_REASON_LABELS: Record<ReportReason, string> = {
  SPAM: "Spam",
  INAPPROPRIATE_CONTENT: "Inappropriate Content",
  HARASSMENT: "Harassment",
  HATE_SPEECH: "Hate Speech",
  FALSE_INFORMATION: "False Information",
  COPYRIGHT_VIOLATION: "Copyright Violation",
  OTHER: "Other",
};

// DATE FORMATTER

export const formatReportDate = (value?: string) => {
  if (!value) return "—";

  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? "—"
    : date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
};

// GET POPULATED POST

export const getPost = (report: ReportItem): ReportPost | null =>
  typeof report.postId === "string" ? null : report.postId;

// DISPLAY REPORT ID

export const getReportDisplayId = (report: ReportItem) =>
  `#${report._id.slice(-6).toUpperCase()}`;
