// ==========================================
// REPORT ENUMS
// ==========================================
export type AdminPostReportReason =
  | "SPAM"
  | "INAPPROPRIATE_CONTENT"
  | "HARASSMENT"
  | "HATE_SPEECH"
  | "FALSE_INFORMATION"
  | "COPYRIGHT_VIOLATION"
  | "OTHER";

export type AdminPostReportStatus =
  | "PENDING"
  | "REVIEWED"
  | "RESOLVED"
  | "REJECTED";

export type AdminPostReportSortOrder = "newest" | "oldest";

// ==========================================
// REPORTER INFORMATION
// ==========================================
export interface AdminPostReportUser {
  _id: string;
  fullName?: string;
  profileImageUrl?: string;
}

// ==========================================
// REPORTED POST AUTHOR
// ==========================================
export interface AdminReportedPostAuthor {
  _id: string;
  fullName?: string;
  profileImageUrl?: string;
}

// ==========================================
// REPORTED POST MEDIA
// ==========================================
export interface AdminReportedPostMedia {
  key: string;
  url: string;
  type: "image" | "video";
}

// ==========================================
// REPORTED POST
// ==========================================
export interface AdminReportedPost {
  _id: string;
  title: string;
  destination?: string;
  content: string;
  media: AdminReportedPostMedia[];
  status: "PUBLISHED" | "BLOCKED";
  author: AdminReportedPostAuthor | null;
}

// ==========================================
// COMPLETE REPORT
// ==========================================
export interface AdminPostReport {
  _id: string;
  reason: AdminPostReportReason;
  description?: string;
  status: AdminPostReportStatus;
  reviewedAt?: string;
  createdAt: string;
  updatedAt: string;

  reporter: AdminPostReportUser | null;
  post: AdminReportedPost | null;
}

// ==========================================
// REPORT QUERY
// ==========================================
export interface AdminPostReportsQuery {
  page: number;
  limit: number;
  search: string;
  status?: AdminPostReportStatus;
  reason?: AdminPostReportReason;
  sort: AdminPostReportSortOrder;
}

// ==========================================
// PAGINATION
// ==========================================
export interface AdminPostReportsPagination {
  currentPage: number;
  limit: number;
  totalReports: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// ==========================================
// REPORT LIST RESPONSE
// ==========================================
export interface AdminPostReportsListResponse {
  reports: AdminPostReport[];
  pagination: AdminPostReportsPagination;
}

// ==========================================
// REPORT STATISTICS
// ==========================================
export interface AdminPostReportsStats {
  total: number;
  pending: number;
  reviewed: number;
  resolved: number;
  rejected: number;
}

// ==========================================
// API RESPONSE
// ==========================================
export interface AdminPostReportsApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// ==========================================
// API ERROR
// ==========================================
export interface AdminPostReportsError {
  message: string;
}

// ==========================================
// STATUS UPDATE
// ==========================================
export interface AdminPostReportStatusUpdate {
  report_id: string;
  status: AdminPostReportStatus;
}

// ==========================================
// TOAST MESSAGE
// ==========================================
export interface ToastMessage {
  title: string;
  description: string;
  type: "success" | "warning" | "error";
}
