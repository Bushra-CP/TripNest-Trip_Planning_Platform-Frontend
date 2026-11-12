import { createSlice } from "@reduxjs/toolkit";

import type {
  AdminPostReport,
  AdminPostReportsPagination,
  AdminPostReportsStats,
} from "../types/admin-post-reports.types";

import {
  fetchAdminPostReports,
  fetchAdminPostReportsStats,
  fetchAdminPostReportById,
  updateAdminPostReportStatus,
} from "./admin-post-reports.thunk";

interface AdminPostReportsState {
  reports: AdminPostReport[];
  selectedReport: AdminPostReport | null;
  stats: AdminPostReportsStats;
  pagination: AdminPostReportsPagination | null;

  isLoading: boolean;
  isStatsLoading: boolean;
  isDetailLoading: boolean;
  isUpdatingStatus: boolean;

  error: string | null;
}

const initialState: AdminPostReportsState = {
  reports: [],
  selectedReport: null,

  stats: {
    total: 0,
    pending: 0,
    reviewed: 0,
    resolved: 0,
    rejected: 0,
  },

  pagination: null,

  isLoading: false,
  isStatsLoading: false,
  isDetailLoading: false,
  isUpdatingStatus: false,

  error: null,
};

const adminPostReportsSlice = createSlice({
  name: "adminPostReports",

  initialState,

  reducers: {
    // Clear the selected report.
    clearSelectedReport: (state) => {
      state.selectedReport = null;
    },

    // Clear the error message.
    clearAdminPostReportsError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    // FETCH ALL REPORTS
    builder
      .addCase(fetchAdminPostReports.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchAdminPostReports.fulfilled, (state, action) => {
        state.isLoading = false;

        state.reports = action.payload.reports;
        state.pagination = action.payload.pagination;
      })

      .addCase(fetchAdminPostReports.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch post reports";
      });

    // FETCH REPORT STATISTICS
    builder
      .addCase(fetchAdminPostReportsStats.pending, (state) => {
        state.isStatsLoading = true;
      })

      .addCase(fetchAdminPostReportsStats.fulfilled, (state, action) => {
        state.isStatsLoading = false;
        state.stats = action.payload;
      })

      .addCase(fetchAdminPostReportsStats.rejected, (state, action) => {
        state.isStatsLoading = false;
        state.error = action.payload || "Failed to fetch report statistics";
      });

    // FETCH SINGLE REPORT
    builder
      .addCase(fetchAdminPostReportById.pending, (state) => {
        state.isDetailLoading = true;
        state.selectedReport = null;
      })

      .addCase(fetchAdminPostReportById.fulfilled, (state, action) => {
        state.isDetailLoading = false;
        state.selectedReport = action.payload;
      })

      .addCase(fetchAdminPostReportById.rejected, (state, action) => {
        state.isDetailLoading = false;
        state.error = action.payload || "Failed to fetch report details";
      });

    // UPDATE REPORT STATUS
    builder
      .addCase(updateAdminPostReportStatus.pending, (state) => {
        state.isUpdatingStatus = true;
        state.error = null;
      })

      .addCase(updateAdminPostReportStatus.fulfilled, (state, action) => {
        state.isUpdatingStatus = false;

        const updatedReport = action.payload;

        // Update the report in the reports list.
        state.reports = state.reports.map((report) =>
          report._id === updatedReport._id ? updatedReport : report,
        );

        // Update the selected report if it is currently open.
        if (state.selectedReport?._id === updatedReport._id) {
          state.selectedReport = updatedReport;
        }

        // Update statistics based on the latest status.
        // Statistics are refreshed separately through the stats thunk.
      })

      .addCase(updateAdminPostReportStatus.rejected, (state, action) => {
        state.isUpdatingStatus = false;
        state.error = action.payload || "Failed to update report status";
      });
  },
});

export const { clearSelectedReport, clearAdminPostReportsError } =
  adminPostReportsSlice.actions;

export default adminPostReportsSlice.reducer;
