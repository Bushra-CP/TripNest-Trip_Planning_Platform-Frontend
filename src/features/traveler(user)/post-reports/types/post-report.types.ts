// REPORT REASON
export type PostReportReason =
  | "SPAM"
  | "INAPPROPRIATE_CONTENT"
  | "HARASSMENT"
  | "HATE_SPEECH"
  | "FALSE_INFORMATION"
  | "COPYRIGHT_VIOLATION"
  | "OTHER";

// REPORT STATUS
export type PostReportStatus = "PENDING" | "REVIEWED" | "RESOLVED" | "REJECTED";

// CREATE POST REPORT
export interface CreatePostReportPayload {
  reason: PostReportReason;
  description?: string;
}

// POST INFORMATION
// Used when postId is populated
export interface ReportedPost {
  _id: string;
  title?: string;
  destination?: string;
  media?: {
    key: string;
    url: string;
    type: "image" | "video";
  }[];
}

// POST REPORT RESPONSE
export interface PostReportResponse {
  _id: string;
  postId: string | ReportedPost;
  reporterId: string;
  reason: PostReportReason;
  description?: string;
  status: PostReportStatus;
  reviewedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// GET MY REPORTS QUERY
export interface MyReportsQuery {
  page?: number;
  limit?: number;
  status?: PostReportStatus;
  reason?: PostReportReason;
  search?: string;
  sort?: "newest" | "oldest";
}

// MY REPORTS PAGINATION
export interface MyReportsPagination {
  currentPage: number;
  totalPages: number;
  totalReports: number;
  limit: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// GET MY REPORTS RESPONSE
export interface MyReportsResponse {
  reports: PostReportResponse[];
  pagination: MyReportsPagination;
}

// API RESPONSE TYPES
export interface CreatePostReportApiResponse {
  success: boolean;
  message: string;
  data: PostReportResponse;
}

export interface MyReportsApiResponse {
  success: boolean;
  message: string;
  data: MyReportsResponse;
}

export interface PostReportApiResponse {
  success: boolean;
  message: string;
  data: PostReportResponse;
}
