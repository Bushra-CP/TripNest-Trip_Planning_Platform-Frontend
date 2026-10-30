import { createSlice } from "@reduxjs/toolkit";

import {
  togglePostLikeThunk,
  fetchPostLikesThunk,
} from "./trip-tales-likes.thunk";

import type {
  PostLikeUser,
  PostLikesPagination,
} from "../types/trip-tales.types";

interface PostLikesState {
  postLikes: Record<
    string,
    {
      likesCount: number;
      isLikedByCurrentUser: boolean;
    }
  >;

  // Likes modal data
  selectedPostId: string | null;
  likes: PostLikeUser[];
  pagination: PostLikesPagination | null;

  toggleLoading: boolean;
  likesLoading: boolean;
  error: string | null;
}

const initialState: PostLikesState = {
  postLikes: {},
  selectedPostId: null,
  likes: [],
  pagination: null,
  toggleLoading: false,
  likesLoading: false,
  error: null,
};

const tripTalesLikesSlice = createSlice({
  name: "tripTalesLikes",
  initialState,
  reducers: {
    initializePostLikes: (state, action) => {
      const { postId, likesCount, isLikedByCurrentUser } = action.payload;

      state.postLikes[postId] = {
        likesCount,
        isLikedByCurrentUser,
      };
    },

    setSelectedPostId: (state, action) => {
      state.selectedPostId = action.payload;
      state.likes = [];
      state.pagination = null;
      state.error = null;
    },

    clearPostLikes: (state) => {
      state.selectedPostId = null;
      state.likes = [];
      state.pagination = null;
      state.error = null;
    },

    clearLikesError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // Toggle like
      .addCase(togglePostLikeThunk.pending, (state) => {
        state.toggleLoading = true;
        state.error = null;
      })
      .addCase(togglePostLikeThunk.fulfilled, (state, action) => {
        state.toggleLoading = false;

        const { postId, likesCount, isLikedByCurrentUser } = action.payload;

        state.postLikes[postId] = {
          likesCount,
          isLikedByCurrentUser,
        };
      })
      .addCase(togglePostLikeThunk.rejected, (state, action) => {
        state.toggleLoading = false;
        state.error = action.payload ?? "Unable to update like.";
      })

      // Fetch likes
      .addCase(fetchPostLikesThunk.pending, (state) => {
        state.likesLoading = true;
        state.error = null;
      })
      .addCase(fetchPostLikesThunk.fulfilled, (state, action) => {
        state.likesLoading = false;

        state.selectedPostId = action.payload.postId;
        state.likes = action.payload.likes;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchPostLikesThunk.rejected, (state, action) => {
        state.likesLoading = false;
        state.error = action.payload ?? "Unable to load likes.";
      });
  },
});

export const {
  initializePostLikes,
  setSelectedPostId,
  clearPostLikes,
  clearLikesError,
} = tripTalesLikesSlice.actions;

export default tripTalesLikesSlice.reducer;
