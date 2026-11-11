import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "@/app/store";

import type {
  CreatePostReportPayload,
  MyReportsQuery,
} from "../types/post-report.types";

import {
  createPostReportThunk,
  fetchMyReportsThunk,
  fetchMyReportByIdThunk,
  cancelMyReportThunk,
} from "../redux/post-report.thunk";

import {
  clearCreatedReport,
  clearReports,
  clearSelectedReport,
  clearPostReportErrors,
} from "../redux/post-report.slice";

export const usePostReports = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    createLoading,
    createError,
    createdReport,

    reports,
    pagination,
    reportsLoading,
    reportsError,

    selectedReport,
    reportDetailsLoading,
    reportDetailsError,

    cancelLoading,
    cancelError,
  } = useSelector((state: RootState) => state.postReport);

  // Create a new report
  const createReport = useCallback(
    async (postId: string, payload: CreatePostReportPayload) => {
      return dispatch(createPostReportThunk({ postId, payload })).unwrap();
    },
    [dispatch],
  );

  // Fetch the logged-in user's reports
  const fetchMyReports = useCallback(
    async (query: MyReportsQuery = {}) => {
      return dispatch(fetchMyReportsThunk(query)).unwrap();
    },
    [dispatch],
  );

  // Fetch one report's details
  const fetchMyReportById = useCallback(
    async (reportId: string) => {
      return dispatch(fetchMyReportByIdThunk(reportId)).unwrap();
    },
    [dispatch],
  );

  // Cancel a pending report
  const cancelMyReport = useCallback(
    async (reportId: string) => {
      return dispatch(cancelMyReportThunk(reportId)).unwrap();
    },
    [dispatch],
  );

  // Reset functions
  const resetCreatedReport = useCallback(() => {
    dispatch(clearCreatedReport());
  }, [dispatch]);

  const resetReports = useCallback(() => {
    dispatch(clearReports());
  }, [dispatch]);

  const resetSelectedReport = useCallback(() => {
    dispatch(clearSelectedReport());
  }, [dispatch]);

  const clearErrors = useCallback(() => {
    dispatch(clearPostReportErrors());
  }, [dispatch]);

  return {
    // Create report
    createReport,
    createLoading,
    createError,
    createdReport,

    // My reports
    fetchMyReports,
    reports,
    pagination,
    reportsLoading,
    reportsError,

    // Report details
    fetchMyReportById,
    selectedReport,
    reportDetailsLoading,
    reportDetailsError,

    // Cancel report
    cancelMyReport,
    cancelLoading,
    cancelError,

    // Reset functions
    resetCreatedReport,
    resetReports,
    resetSelectedReport,
    clearErrors,
  };
};
