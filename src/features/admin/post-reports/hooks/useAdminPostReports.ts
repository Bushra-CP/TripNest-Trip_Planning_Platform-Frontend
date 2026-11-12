import { useCallback } from "react";
import {
  fetchAdminPostReports,
  fetchAdminPostReportsStats,
  fetchAdminPostReportById,
  updateAdminPostReportStatus,
} from "../redux/admin-post-reports.thunk";

import {
  clearSelectedReport,
  clearAdminPostReportsError,
} from "../redux/admin-post-reports.slice";

import type {
  AdminPostReportsQuery,
  AdminPostReportStatus,
} from "../types/admin-post-reports.types";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store";

export const useAdminPostReports = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Get the post reports state from Redux.
  const {
    reports,
    selectedReport,
    stats,
    pagination,
    isLoading,
    isStatsLoading,
    isDetailLoading,
    isUpdatingStatus,
    error,
  } = useSelector((state: RootState) => state.adminPostReports);

  // Fetch reports with filters and pagination.
  const fetchReports = useCallback(
    async (query: AdminPostReportsQuery) => {
      console.log("1. Custom hook called", query);

      return dispatch(fetchAdminPostReports(query)).unwrap();
    },
    [dispatch],
  );

  // Fetch report statistics.
  const fetchStats = useCallback(async () => {
    return dispatch(fetchAdminPostReportsStats()).unwrap();
  }, [dispatch]);

  // Fetch a single report.
  const fetchReportById = useCallback(
    async (reportId: string) => {
      return dispatch(fetchAdminPostReportById(reportId)).unwrap();
    },
    [dispatch],
  );

  // Update report status.
  const updateReportStatus = useCallback(
    async (reportId: string, status: AdminPostReportStatus) => {
      const updatedReport = await dispatch(
        updateAdminPostReportStatus({ reportId, status }),
      ).unwrap();

      // Refresh statistics after a successful status update.
      await dispatch(fetchAdminPostReportsStats());

      return updatedReport;
    },
    [dispatch],
  );

  // Clear selected report.
  const clearReport = useCallback(() => {
    dispatch(clearSelectedReport());
  }, [dispatch]);

  // Clear errors.
  const clearError = useCallback(() => {
    dispatch(clearAdminPostReportsError());
  }, [dispatch]);

  return {
    reports,
    selectedReport,
    stats,
    pagination,

    isLoading,
    isStatsLoading,
    isDetailLoading,
    isUpdatingStatus,

    error,

    fetchReports,
    fetchStats,
    fetchReportById,
    updateReportStatus,

    clearReport,
    clearError,
  };
};
