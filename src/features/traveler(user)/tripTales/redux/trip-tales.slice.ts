import { createSlice } from "@reduxjs/toolkit";
import { createPostThunk, fetchPostsThunk } from "./trip-tales.thunk";
import type { CreatePostResponse } from "../types/trip-tales.types";

interface TripTalesState {
  posts: CreatePostResponse[];
  loading: boolean;
  error: string | null;
  newPostsAvailable: boolean;
}

const initialState: TripTalesState = {
  posts: [],
  loading: false,
  error: null,
  newPostsAvailable: false,
};

const tripTalesSlice = createSlice({
  name: "tripTales",

  initialState,

  reducers: {
    setNewPostsAvailable: (state, action) => {
      state.newPostsAvailable = action.payload;
    },

    clearNewPostsAvailable: (state) => {
      state.newPostsAvailable = false;
    },
  },

  extraReducers: (builder) => {
    builder

      // Create post
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

      // FETCH POSTS
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
      });
  },
});

export const { setNewPostsAvailable, clearNewPostsAvailable } =
  tripTalesSlice.actions;

export default tripTalesSlice.reducer;
