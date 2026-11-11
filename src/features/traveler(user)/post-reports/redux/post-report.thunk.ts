import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

import { postReportApi } from "../api/post-report.api";

import type {
  CreatePostReportPayload,
  MyReportsQuery,
  MyReportsResponse,
  PostReportResponse,
} from "../types/post-report.types";

interface ApiError {
  message: string;
}

// CREATE POST REPORT
export interface CreatePostReportThunkPayload {
  postId: string;
  payload: CreatePostReportPayload;
}

export const createPostReportThunk = createAsyncThunk<
  PostReportResponse,
  CreatePostReportThunkPayload,
  { rejectValue: string }
>(
  "postReport/createReport",
  async ({ postId, payload }, { rejectWithValue }) => {
    try {
      return await postReportApi.createReport(postId, payload);
    } catch (error) {
      const err = error as AxiosError<ApiError>;

      return rejectWithValue(
        err.response?.data?.message ?? "Failed to submit report",
      );
    }
  },
);

// GET MY REPORTS
export const fetchMyReportsThunk = createAsyncThunk<
  MyReportsResponse,
  MyReportsQuery | undefined,
  { rejectValue: string }
>("postReport/fetchMyReports", async (query, { rejectWithValue }) => {
  try {
    return await postReportApi.getMyReports(query);
  } catch (error) {
    const err = error as AxiosError<ApiError>;

    return rejectWithValue(
      err.response?.data?.message ?? "Failed to fetch your reports",
    );
  }
});

// GET MY REPORT BY ID
export const fetchMyReportByIdThunk = createAsyncThunk<
  PostReportResponse,
  string,
  { rejectValue: string }
>("postReport/fetchMyReportById", async (reportId, { rejectWithValue }) => {
  try {
    return await postReportApi.getMyReportById(reportId);
  } catch (error) {
    const err = error as AxiosError<ApiError>;

    return rejectWithValue(
      err.response?.data?.message ?? "Failed to fetch report details",
    );
  }
});

// CANCEL MY REPORT
export const cancelMyReportThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("postReport/cancelMyReport", async (reportId, { rejectWithValue }) => {
  try {
    await postReportApi.cancelMyReport(reportId);

    return reportId;
  } catch (error) {
    const err = error as AxiosError<ApiError>;

    return rejectWithValue(
      err.response?.data?.message ?? "Failed to cancel report",
    );
  }
});
