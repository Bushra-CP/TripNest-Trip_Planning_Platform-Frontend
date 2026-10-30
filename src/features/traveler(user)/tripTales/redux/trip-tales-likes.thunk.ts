import { createAsyncThunk } from "@reduxjs/toolkit";
import { type AxiosError } from "axios";

import type {
  PostLikesResponse,
  TogglePostLikeResponse,
} from "../types/trip-tales.types";
import { tripTalesApi } from "../api/trip-tales.api";

interface ApiError {
  message: string;
}

interface ToggleLikePayload {
  postId: string;
  currentlyLiked: boolean;
}

interface FetchPostLikesPayload {
  postId: string;
  page?: number;
  limit?: number;
}

// LIKE - DISLIKE POST
export const togglePostLikeThunk = createAsyncThunk<
  TogglePostLikeResponse,
  ToggleLikePayload,
  { rejectValue: string }
>(
  "tripTalesLikes/togglePostLike",
  async ({ postId, currentlyLiked }, { rejectWithValue }) => {
    try {
      return currentlyLiked
        ? await tripTalesApi.unlikePost(postId)
        : await tripTalesApi.likePost(postId);
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;

      return rejectWithValue(
        axiosError.response?.data?.message ??
          "Unable to update like. Please try again.",
      );
    }
  },
);

// GET POST LIKES
export const fetchPostLikesThunk = createAsyncThunk<
  PostLikesResponse & { postId: string },
  FetchPostLikesPayload,
  { rejectValue: string }
>(
  "tripTalesLikes/fetchPostLikes",
  async ({ postId, page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await tripTalesApi.getPostLikes(postId, page, limit);

      return {
        ...response,
        postId,
      };
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;

      return rejectWithValue(
        axiosError.response?.data?.message ??
          "Unable to load users who liked this post.",
      );
    }
  },
);
