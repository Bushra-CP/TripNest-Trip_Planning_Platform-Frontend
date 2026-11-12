import { axiosInstance } from "@/shared/api/axios";

import { SERVER_ROUTES } from "@/shared/constants/routes.constants";

import type {
  AdminPostReport,
  AdminPostReportsApiResponse,
  AdminPostReportsListResponse,
  AdminPostReportsQuery,
  AdminPostReportsStats,
  AdminPostReportStatus,
} from "../types/admin-post-reports.types";

export const adminPostReportsApi = {
  // GET ALL REPORTS
  async getReports(
    query: AdminPostReportsQuery,
  ): Promise<AdminPostReportsListResponse> {
    console.log("calling api");

    const response = await axiosInstance.get<
      AdminPostReportsApiResponse<AdminPostReportsListResponse>
    >(SERVER_ROUTES.ADMIN_POST_REPORTS, {
      params: {
        page: query.page,
        limit: query.limit,
        search: query.search || undefined,
        status: query.status,
        reason: query.reason,
        sort: query.sort,
      },
    });

    return response.data.data;
  },

  // GET REPORT STATISTICS
  async getStats(): Promise<AdminPostReportsStats> {
    const response = await axiosInstance.get<
      AdminPostReportsApiResponse<AdminPostReportsStats>
    >(SERVER_ROUTES.ADMIN_POST_REPORTS_STATS);

    return response.data.data;
  },

  // GET SINGLE REPORT
  async getReportById(reportId: string): Promise<AdminPostReport> {
    const url = SERVER_ROUTES.ADMIN_POST_REPORT_BY_ID.replace(
      ":reportId",
      encodeURIComponent(reportId),
    );

    const response =
      await axiosInstance.get<AdminPostReportsApiResponse<AdminPostReport>>(
        url,
      );

    return response.data.data;
  },

  // UPDATE REPORT STATUS
  async updateReportStatus(
    reportId: string,
    status: AdminPostReportStatus,
  ): Promise<AdminPostReport> {
    const url = SERVER_ROUTES.UPDATE_ADMIN_POST_REPORT_STATUS.replace(
      ":reportId",
      encodeURIComponent(reportId),
    );

    const response = await axiosInstance.patch<
      AdminPostReportsApiResponse<AdminPostReport>
    >(url, { status });

    return response.data.data;
  },
};
