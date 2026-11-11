import { axiosInstance } from "@/shared/api/axios";
import { SERVER_ROUTES } from "@/shared/constants/routes.constants";

import type {
  CreatePostReportApiResponse,
  CreatePostReportPayload,
  MyReportsApiResponse,
  MyReportsQuery,
  MyReportsResponse,
  PostReportApiResponse,
  PostReportResponse,
} from "../types/post-report.types";

export const postReportApi = {
  // CREATE POST REPORT
  async createReport(
    postId: string,
    payload: CreatePostReportPayload,
  ): Promise<PostReportResponse> {
    const response = await axiosInstance.post<CreatePostReportApiResponse>(
      SERVER_ROUTES.CREATE_POST_REPORT.replace(":postId", postId),
      payload,
    );

    return response.data.data;
  },

  // GET MY REPORTS
  async getMyReports(query: MyReportsQuery = {}): Promise<MyReportsResponse> {
    const response = await axiosInstance.get<MyReportsApiResponse>(
      SERVER_ROUTES.GET_MY_REPORTS,
      {
        params: query,
      },
    );

    return response.data.data;
  },

  // GET REPORT BY ID
  async getMyReportById(reportId: string): Promise<PostReportResponse> {
    const response = await axiosInstance.get<PostReportApiResponse>(
      SERVER_ROUTES.GET_MY_REPORT_BY_ID.replace(":reportId", reportId),
    );

    return response.data.data;
  },

  // CANCEL MY REPORT
  async cancelMyReport(reportId: string): Promise<void> {
    await axiosInstance.delete(
      SERVER_ROUTES.CANCEL_MY_REPORT.replace(":reportId", reportId),
    );
  },
};
