import { createSlice } from "@reduxjs/toolkit";

import {
  createPostThunk,
  fetchPostsThunk,
  fetchMyProfileThunk,
  fetchMyPostsThunk,
  fetchMyPostByIdThunk,
  updateMyPostThunk,
  deleteMyPostThunk,
} from "./trip-tales.thunk";

import type {
  CreatePostResponse,
  MyPostResponse,
  MyPostsPagination,
  MyProfileResponse,
} from "../types/trip-tales.types";

interface TripTalesState {
  // Public TripTales feed
  posts: CreatePostResponse[];
  loading: boolean;
  error: string | null;
  newPostsAvailable: boolean;

  // My profile
  myProfile: MyProfileResponse | null;
  profileLoading: boolean;
  profileError: string | null;

  // My posts
  myPosts: MyPostResponse[];
  myPostsPagination: MyPostsPagination | null;
  myPostsLoading: boolean;
  myPostsError: string | null;

  // Individual post
  selectedMyPost: MyPostResponse | null;
  myPostLoading: boolean;
  myPostError: string | null;

  // Update
  updatePostLoading: boolean;
  updatePostError: string | null;

  // Delete
  deletePostLoading: boolean;
  deletePostError: string | null;
}

const initialState: TripTalesState = {
  posts: [],
  loading: false,
  error: null,
  newPostsAvailable: false,

  myProfile: null,
  profileLoading: false,
  profileError: null,

  myPosts: [],
  myPostsPagination: null,
  myPostsLoading: false,
  myPostsError: null,

  selectedMyPost: null,
  myPostLoading: false,
  myPostError: null,

  updatePostLoading: false,
  updatePostError: null,

  deletePostLoading: false,
  deletePostError: null,
};

const tripTalesSlice = createSlice({
  name: "tripTales",
  initialState,

  reducers: {
    setNewPostsAvailable: (state) => {
      state.newPostsAvailable = true;
    },

    clearNewPostsAvailable: (state) => {
      state.newPostsAvailable = false;
    },

    clearSelectedMyPost: (state) => {
      state.selectedMyPost = null;
      state.myPostError = null;
    },

    clearMyPostsError: (state) => {
      state.myPostsError = null;
    },

    clearUpdatePostError: (state) => {
      state.updatePostError = null;
    },

    clearDeletePostError: (state) => {
      state.deletePostError = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ==========================================
      // CREATE PUBLIC POST
      // ==========================================

      .addCase(createPostThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createPostThunk.fulfilled, (state) => {
        state.loading = false;
        state.newPostsAvailable = true;
      })

      .addCase(createPostThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to create post";
      })

      // ==========================================
      // FETCH PUBLIC POSTS
      // ==========================================

      .addCase(fetchPostsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchPostsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.newPostsAvailable = false;
      })

      .addCase(fetchPostsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch posts";
      })

      // ==========================================
      // FETCH MY PROFILE
      // ==========================================

      .addCase(fetchMyProfileThunk.pending, (state) => {
        state.profileLoading = true;
        state.profileError = null;
      })

      .addCase(fetchMyProfileThunk.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.myProfile = action.payload;
      })

      .addCase(fetchMyProfileThunk.rejected, (state, action) => {
        state.profileLoading = false;
        state.profileError = action.payload ?? "Failed to fetch your profile";
      })

      // ==========================================
      // FETCH MY POSTS
      // ==========================================

      .addCase(fetchMyPostsThunk.pending, (state) => {
        state.myPostsLoading = true;
        state.myPostsError = null;
      })

      .addCase(fetchMyPostsThunk.fulfilled, (state, action) => {
        state.myPostsLoading = false;
        state.myPosts = action.payload.posts;
        state.myPostsPagination = action.payload.pagination;
      })

      .addCase(fetchMyPostsThunk.rejected, (state, action) => {
        state.myPostsLoading = false;
        state.myPostsError = action.payload ?? "Failed to fetch your posts";
      })

      // ==========================================
      // FETCH MY POST BY ID
      // ==========================================

      .addCase(fetchMyPostByIdThunk.pending, (state) => {
        state.myPostLoading = true;
        state.myPostError = null;
        state.selectedMyPost = null;
      })

      .addCase(fetchMyPostByIdThunk.fulfilled, (state, action) => {
        state.myPostLoading = false;
        state.selectedMyPost = action.payload;
      })

      .addCase(fetchMyPostByIdThunk.rejected, (state, action) => {
        state.myPostLoading = false;
        state.myPostError = action.payload ?? "Failed to fetch post details";
      })

      // ==========================================
      // UPDATE MY POST
      // ==========================================

      .addCase(updateMyPostThunk.pending, (state) => {
        state.updatePostLoading = true;
        state.updatePostError = null;
      })

      .addCase(updateMyPostThunk.fulfilled, (state, action) => {
        state.updatePostLoading = false;

        const updatedPost = action.payload;

        const index = state.myPosts.findIndex(
          (post) => post.id === updatedPost.id,
        );

        if (index !== -1) {
          state.myPosts[index] = updatedPost;
        }

        if (state.selectedMyPost?.id === updatedPost.id) {
          state.selectedMyPost = updatedPost;
        }
      })

      .addCase(updateMyPostThunk.rejected, (state, action) => {
        state.updatePostLoading = false;
        state.updatePostError = action.payload ?? "Failed to update post";
      })

      // ==========================================
      // DELETE MY POST
      // ==========================================

      .addCase(deleteMyPostThunk.pending, (state) => {
        state.deletePostLoading = true;
        state.deletePostError = null;
      })

      .addCase(deleteMyPostThunk.fulfilled, (state, action) => {
        state.deletePostLoading = false;

        const deletedPostId = action.payload;

        state.myPosts = state.myPosts.filter(
          (post) => post.id !== deletedPostId,
        );

        if (state.selectedMyPost?.id === deletedPostId) {
          state.selectedMyPost = null;
        }

        if (state.myPostsPagination) {
          state.myPostsPagination.totalPosts = Math.max(
            0,
            state.myPostsPagination.totalPosts - 1,
          );

          state.myPostsPagination.totalPages = Math.ceil(
            state.myPostsPagination.totalPosts / state.myPostsPagination.limit,
          );

          if (
            state.myPostsPagination.currentPage >
              state.myPostsPagination.totalPages &&
            state.myPostsPagination.totalPages > 0
          ) {
            state.myPostsPagination.currentPage =
              state.myPostsPagination.totalPages;
          }
        }

        if (state.myProfile) {
          state.myProfile.stats.posts = Math.max(
            0,
            state.myProfile.stats.posts - 1,
          );
        }
      })

      .addCase(deleteMyPostThunk.rejected, (state, action) => {
        state.deletePostLoading = false;
        state.deletePostError = action.payload ?? "Failed to delete post";
      });
  },
});

export const {
  setNewPostsAvailable,
  clearNewPostsAvailable,
  clearSelectedMyPost,
  clearMyPostsError,
  clearUpdatePostError,
  clearDeletePostError,
} = tripTalesSlice.actions;

export default tripTalesSlice.reducer;
