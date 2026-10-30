import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

import { adminTripTalesApi } from "../api/admin-trip-tales.api";

import type {
  AdminTripTalesError,
  AdminTripTalesPost,
  AdminTripTalesQuery,
} from "../types/admin-trip-tales.types";

/**
 * Fetch paginated posts.
 */
export const fetchAdminTripTalesThunk = createAsyncThunk<
  Awaited<ReturnType<typeof adminTripTalesApi.getPosts>>,
  AdminTripTalesQuery,
  { rejectValue: string }
>("adminTripTales/fetchPosts", async (query, { rejectWithValue }) => {
  try {
    return await adminTripTalesApi.getPosts(query);
  } catch (error) {
    const err = error as AxiosError<AdminTripTalesError>;

    return rejectWithValue(
      err.response?.data?.message ?? "Failed to fetch TripTales posts",
    );
  }
});

/**
 * Fetch statistics.
 */
export const fetchAdminTripTalesStatsThunk = createAsyncThunk<
  Awaited<ReturnType<typeof adminTripTalesApi.getStats>>,
  void,
  { rejectValue: string }
>("adminTripTales/fetchStats", async (_, { rejectWithValue }) => {
  try {
    return await adminTripTalesApi.getStats();
  } catch (error) {
    const err = error as AxiosError<AdminTripTalesError>;

    return rejectWithValue(
      err.response?.data?.message ?? "Failed to fetch TripTales statistics",
    );
  }
});

/**
 * Fetch an individual post.
 */
export const fetchAdminTripTalesPostByIdThunk = createAsyncThunk<
  AdminTripTalesPost,
  string,
  { rejectValue: string }
>("adminTripTales/fetchPostById", async (postId, { rejectWithValue }) => {
  try {
    return await adminTripTalesApi.getPostById(postId);
  } catch (error) {
    const err = error as AxiosError<AdminTripTalesError>;

    return rejectWithValue(
      err.response?.data?.message ?? "Failed to fetch post details",
    );
  }
});

/**
 * Block a post.
 */
export const blockAdminTripTalesPostThunk = createAsyncThunk<
  AdminTripTalesPost,
  string,
  { rejectValue: string }
>("adminTripTales/blockPost", async (postId, { rejectWithValue }) => {
  try {
    return await adminTripTalesApi.blockPost(postId);
  } catch (error) {
    const err = error as AxiosError<AdminTripTalesError>;

    return rejectWithValue(
      err.response?.data?.message ?? "Failed to block the post",
    );
  }
});

/**
 * Unblock a post.
 */
export const unblockAdminTripTalesPostThunk = createAsyncThunk<
  AdminTripTalesPost,
  string,
  { rejectValue: string }
>("adminTripTales/unblockPost", async (postId, { rejectWithValue }) => {
  try {
    return await adminTripTalesApi.unblockPost(postId);
  } catch (error) {
    const err = error as AxiosError<AdminTripTalesError>;

    return rejectWithValue(
      err.response?.data?.message ?? "Failed to unblock the post",
    );
  }
});
