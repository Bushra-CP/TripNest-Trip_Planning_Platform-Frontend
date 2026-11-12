import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { adminPostReportsApi } from "../api/admin-post-reports.api";

import type {
  AdminPostReport,
  AdminPostReportsListResponse,
  AdminPostReportsQuery,
  AdminPostReportsStats,
  AdminPostReportStatus,
} from "../types/admin-post-reports.types";

// FETCH ALL REPORTS
export const fetchAdminPostReports = createAsyncThunk<
  AdminPostReportsListResponse,
  AdminPostReportsQuery,
  { rejectValue: string }
>("adminPostReports/fetchReports", async (query, { rejectWithValue }) => {
  try {
    console.log("2. Redux thunk called", query);

    return await adminPostReportsApi.getReports(query);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch post reports",
      );
    }

    return rejectWithValue("Something went wrong while fetching reports");
  }
});

// FETCH REPORT STATISTICS
export const fetchAdminPostReportsStats = createAsyncThunk<
  AdminPostReportsStats,
  void,
  { rejectValue: string }
>("adminPostReports/fetchStats", async (_, { rejectWithValue }) => {
  try {
    return await adminPostReportsApi.getStats();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch report statistics",
      );
    }

    return rejectWithValue("Something went wrong while fetching statistics");
  }
});

// FETCH SINGLE REPORT
export const fetchAdminPostReportById = createAsyncThunk<
  AdminPostReport,
  string,
  { rejectValue: string }
>("adminPostReports/fetchReportById", async (reportId, { rejectWithValue }) => {
  try {
    return await adminPostReportsApi.getReportById(reportId);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch report details",
      );
    }

    return rejectWithValue(
      "Something went wrong while fetching report details",
    );
  }
});

// ==========================================
// UPDATE REPORT STATUS
// ==========================================

export interface UpdateAdminPostReportStatusPayload {
  reportId: string;
  status: AdminPostReportStatus;
}

export const updateAdminPostReportStatus = createAsyncThunk<
  AdminPostReport,
  UpdateAdminPostReportStatusPayload,
  { rejectValue: string }
>(
  "adminPostReports/updateReportStatus",
  async ({ reportId, status }, { rejectWithValue }) => {
    try {
      return await adminPostReportsApi.updateReportStatus(reportId, status);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Failed to update report status",
        );
      }

      return rejectWithValue(
        "Something went wrong while updating report status",
      );
    }
  },
);
