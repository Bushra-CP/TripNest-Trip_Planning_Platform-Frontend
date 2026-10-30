import { createSlice } from "@reduxjs/toolkit";

import type {
  AdminTripTalesPagination,
  AdminTripTalesPost,
} from "../types/admin-trip-tales.types";

import {
  blockAdminTripTalesPostThunk,
  fetchAdminTripTalesPostByIdThunk,
  fetchAdminTripTalesStatsThunk,
  fetchAdminTripTalesThunk,
  unblockAdminTripTalesPostThunk,
} from "./admin-trip-tales.thunk";

interface AdminTripTalesState {
  posts: AdminTripTalesPost[];

  selectedPost: AdminTripTalesPost | null;

  stats: {
    total: number;
    published: number;
    blocked: number;
  };

  pagination: AdminTripTalesPagination;

  loading: boolean;
  statsLoading: boolean;
  detailLoading: boolean;
  moderationLoading: boolean;

  error: string | null;
}

const initialState: AdminTripTalesState = {
  posts: [],

  selectedPost: null,

  stats: {
    total: 0,
    published: 0,
    blocked: 0,
  },

  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },

  loading: false,
  statsLoading: false,
  detailLoading: false,
  moderationLoading: false,

  error: null,
};

const adminTripTalesSlice = createSlice({
  name: "adminTripTales",

  initialState,

  reducers: {
    clearAdminTripTalesError(state) {
      state.error = null;
    },

    clearSelectedAdminPost(state) {
      state.selectedPost = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // FETCH POSTS

      .addCase(fetchAdminTripTalesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAdminTripTalesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts;
        state.pagination = action.payload.pagination;
      })

      .addCase(fetchAdminTripTalesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch posts";
      })

      // FETCH STATISTICS

      .addCase(fetchAdminTripTalesStatsThunk.pending, (state) => {
        state.statsLoading = true;
      })

      .addCase(fetchAdminTripTalesStatsThunk.fulfilled, (state, action) => {
        state.statsLoading = false;
        state.stats = action.payload;
      })

      .addCase(fetchAdminTripTalesStatsThunk.rejected, (state, action) => {
        state.statsLoading = false;
        state.error = action.payload ?? "Failed to fetch statistics";
      })

      // FETCH POST DETAILS

      .addCase(fetchAdminTripTalesPostByIdThunk.pending, (state) => {
        state.detailLoading = true;
        state.error = null;
      })

      .addCase(fetchAdminTripTalesPostByIdThunk.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.selectedPost = action.payload;
      })

      .addCase(fetchAdminTripTalesPostByIdThunk.rejected, (state, action) => {
        state.detailLoading = false;
        state.error = action.payload ?? "Failed to fetch post details";
      })

      // BLOCK POST

      .addCase(blockAdminTripTalesPostThunk.pending, (state) => {
        state.moderationLoading = true;
        state.error = null;
      })

      .addCase(blockAdminTripTalesPostThunk.fulfilled, (state, action) => {
        state.moderationLoading = false;

        const updatedPost = action.payload;

        state.posts = state.posts.map((post) =>
          post.id === updatedPost.id ? updatedPost : post,
        );

        if (state.selectedPost?.id === updatedPost.id) {
          state.selectedPost = updatedPost;
        }
      })

      .addCase(blockAdminTripTalesPostThunk.rejected, (state, action) => {
        state.moderationLoading = false;
        state.error = action.payload ?? "Failed to block post";
      })

      // UNBLOCK POST

      .addCase(unblockAdminTripTalesPostThunk.pending, (state) => {
        state.moderationLoading = true;
        state.error = null;
      })

      .addCase(unblockAdminTripTalesPostThunk.fulfilled, (state, action) => {
        state.moderationLoading = false;

        const updatedPost = action.payload;

        state.posts = state.posts.map((post) =>
          post.id === updatedPost.id ? updatedPost : post,
        );

        if (state.selectedPost?.id === updatedPost.id) {
          state.selectedPost = updatedPost;
        }
      })

      .addCase(unblockAdminTripTalesPostThunk.rejected, (state, action) => {
        state.moderationLoading = false;
        state.error = action.payload ?? "Failed to unblock post";
      });
  },
});

export const { clearAdminTripTalesError, clearSelectedAdminPost } =
  adminTripTalesSlice.actions;

export default adminTripTalesSlice.reducer;
