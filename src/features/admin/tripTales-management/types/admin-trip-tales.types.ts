export type AdminPostStatus = "PUBLISHED" | "BLOCKED";

export type AdminPostSortOrder = "newest" | "oldest";

export interface AdminTripTalesMedia {
  key: string;
  url: string;
  type: "image" | "video";
}

export interface AdminTripTalesAuthor {
  id: string;
  fullName: string;
  profileImageUrl?: string;
}

export interface AdminTripTalesPost {
  id: string;
  user: AdminTripTalesAuthor;
  title: string;
  destination: string;
  content: string;
  tags: string[];
  media: AdminTripTalesMedia[];
  status: AdminPostStatus;
  createdAt: string;
  updatedAt: string;
}

export interface AdminTripTalesStats {
  total: number;
  published: number;
  blocked: number;
}

export interface AdminTripTalesQuery {
  page: number;
  limit: number;
  search: string;
  status?: AdminPostStatus;
  sort: AdminPostSortOrder;
}

export interface AdminTripTalesPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface AdminTripTalesListResponse {
  posts: AdminTripTalesPost[];
  pagination: AdminTripTalesPagination;
}

export interface AdminTripTalesStatsResponse {
  totalPosts: number;
  publishedPosts: number;
  blockedPosts: number;
}

export interface AdminTripTalesApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface AdminTripTalesError {
  message: string;
}

export interface AdminModerationTarget {
  post: AdminTripTalesPost;
  action: "block" | "unblock";
}

export interface ToastMessage {
  title: string;
  description: string;
  type: "success" | "warning" | "error";
}
