import { createSlice } from "@reduxjs/toolkit";

import {
  createPostReportThunk,
  fetchMyReportsThunk,
  fetchMyReportByIdThunk,
  cancelMyReportThunk,
} from "./post-report.thunk";

import type {
  PostReportResponse,
  MyReportsPagination,
} from "../types/post-report.types";

interface PostReportState {
  // Create report
  createLoading: boolean;
  createError: string | null;
  createdReport: PostReportResponse | null;

  // Get my reports
  reports: PostReportResponse[];
  pagination: MyReportsPagination | null;
  reportsLoading: boolean;
  reportsError: string | null;

  // Get report by ID
  selectedReport: PostReportResponse | null;
  reportDetailsLoading: boolean;
  reportDetailsError: string | null;

  // Cancel report
  cancelLoading: boolean;
  cancelError: string | null;
}

const initialState: PostReportState = {
  createLoading: false,
  createError: null,
  createdReport: null,

  reports: [],
  pagination: null,
  reportsLoading: false,
  reportsError: null,

  selectedReport: null,
  reportDetailsLoading: false,
  reportDetailsError: null,

  cancelLoading: false,
  cancelError: null,
};

const postReportSlice = createSlice({
  name: "postReport",
  initialState,

  reducers: {
    clearCreatedReport: (state) => {
      state.createdReport = null;
      state.createError = null;
    },

    clearReports: (state) => {
      state.reports = [];
      state.pagination = null;
      state.reportsError = null;
    },

    clearSelectedReport: (state) => {
      state.selectedReport = null;
      state.reportDetailsError = null;
    },

    clearPostReportErrors: (state) => {
      state.createError = null;
      state.reportsError = null;
      state.reportDetailsError = null;
      state.cancelError = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // CREATE POST REPORT
      .addCase(createPostReportThunk.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
        state.createdReport = null;
      })

      .addCase(createPostReportThunk.fulfilled, (state, action) => {
        state.createLoading = false;
        state.createdReport = action.payload;
      })

      .addCase(createPostReportThunk.rejected, (state, action) => {
        state.createLoading = false;
        state.createError = action.payload ?? "Failed to submit report";
      })

      // GET MY REPORTS
      .addCase(fetchMyReportsThunk.pending, (state) => {
        state.reportsLoading = true;
        state.reportsError = null;
      })

      .addCase(fetchMyReportsThunk.fulfilled, (state, action) => {
        state.reportsLoading = false;
        state.reports = action.payload.reports;
        state.pagination = action.payload.pagination;
      })

      .addCase(fetchMyReportsThunk.rejected, (state, action) => {
        state.reportsLoading = false;
        state.reportsError = action.payload ?? "Failed to fetch reports";
      })

      // GET MY REPORT BY ID
      .addCase(fetchMyReportByIdThunk.pending, (state) => {
        state.reportDetailsLoading = true;
        state.reportDetailsError = null;
        state.selectedReport = null;
      })

      .addCase(fetchMyReportByIdThunk.fulfilled, (state, action) => {
        state.reportDetailsLoading = false;
        state.selectedReport = action.payload;
      })

      .addCase(fetchMyReportByIdThunk.rejected, (state, action) => {
        state.reportDetailsLoading = false;
        state.reportDetailsError =
          action.payload ?? "Failed to fetch report details";
      })

      // CANCEL MY REPORT
      .addCase(cancelMyReportThunk.pending, (state) => {
        state.cancelLoading = true;
        state.cancelError = null;
      })

      .addCase(cancelMyReportThunk.fulfilled, (state, action) => {
        state.cancelLoading = false;

        const cancelledReportId = action.payload;

        state.reports = state.reports.filter(
          (report) => report._id !== cancelledReportId,
        );

        if (state.selectedReport?._id === cancelledReportId) {
          state.selectedReport = null;
        }

        if (state.pagination) {
          state.pagination.totalReports = Math.max(
            0,
            state.pagination.totalReports - 1,
          );

          state.pagination.totalPages = Math.ceil(
            state.pagination.totalReports / state.pagination.limit,
          );

          if (
            state.pagination.currentPage > state.pagination.totalPages &&
            state.pagination.totalPages > 0
          ) {
            state.pagination.currentPage = state.pagination.totalPages;
          }
        }
      })

      .addCase(cancelMyReportThunk.rejected, (state, action) => {
        state.cancelLoading = false;
        state.cancelError = action.payload ?? "Failed to cancel report";
      });
  },
});

export const {
  clearCreatedReport,
  clearReports,
  clearSelectedReport,
  clearPostReportErrors,
} = postReportSlice.actions;

export default postReportSlice.reducer;
