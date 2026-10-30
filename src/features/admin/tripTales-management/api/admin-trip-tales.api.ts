import { axiosInstance } from "@/shared/api/axios";
import { SERVER_ROUTES } from "@/shared/constants/routes.constants";

import type {
  AdminTripTalesApiResponse,
  AdminTripTalesListResponse,
  AdminTripTalesPagination,
  AdminTripTalesPost,
  AdminTripTalesQuery,
  AdminTripTalesStatsResponse,
} from "../types/admin-trip-tales.types";

export interface AdminTripTalesListResult {
  posts: AdminTripTalesPost[];
  pagination: AdminTripTalesPagination;
}

export interface AdminTripTalesStatsResult {
  total: number;
  published: number;
  blocked: number;
}

export const adminTripTalesApi = {
  /**
   * Fetch posts with server-side search, filtering, sorting and pagination.
   */
  async getPosts(
    query: AdminTripTalesQuery,
  ): Promise<AdminTripTalesListResult> {
    const response = await axiosInstance.get<
      AdminTripTalesApiResponse<AdminTripTalesListResponse>
    >(SERVER_ROUTES.ADMIN_TRIPTALES, {
      params: {
        page: query.page,
        limit: query.limit,
        search: query.search || undefined,
        status: query.status,
        sort: query.sort,
      },
    });
    console.log(response.data);
    return response.data.data;
  },

  /**
   * Fetch dashboard statistics.
   */
  async getStats(): Promise<AdminTripTalesStatsResult> {
    const response = await axiosInstance.get<
      AdminTripTalesApiResponse<AdminTripTalesStatsResponse>
    >(SERVER_ROUTES.ADMIN_TRIPTALES_STATS);

    const data = response.data.data;

    return {
      total: data.totalPosts,
      published: data.publishedPosts,
      blocked: data.blockedPosts,
    };
  },

  /**
   * Fetch a single post.
   */
  async getPostById(postId: string): Promise<AdminTripTalesPost> {
    const url = SERVER_ROUTES.ADMIN_TRIPTALES_BY_ID.replace(
      ":postId",
      encodeURIComponent(postId),
    );

    const response =
      await axiosInstance.get<AdminTripTalesApiResponse<AdminTripTalesPost>>(
        url,
      );

    return response.data.data;
  },

  /**
   * Block a published post.
   */
  async blockPost(postId: string): Promise<AdminTripTalesPost> {
    const url = SERVER_ROUTES.BLOCK_TRIPTALES_POST.replace(
      ":postId",
      encodeURIComponent(postId),
    );

    const response =
      await axiosInstance.patch<AdminTripTalesApiResponse<AdminTripTalesPost>>(
        url,
      );

    return response.data.data;
  },

  /**
   * Unblock a blocked post.
   */
  async unblockPost(postId: string): Promise<AdminTripTalesPost> {
    const url = SERVER_ROUTES.UNBLOCK_TRIPTALES_POST.replace(
      ":postId",
      encodeURIComponent(postId),
    );

    const response =
      await axiosInstance.patch<AdminTripTalesApiResponse<AdminTripTalesPost>>(
        url,
      );

    return response.data.data;
  },
};
