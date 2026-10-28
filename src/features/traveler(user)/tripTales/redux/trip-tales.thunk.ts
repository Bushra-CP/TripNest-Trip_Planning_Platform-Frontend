import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import type {
  CreatePostData,
  CreatePostResponse,
} from "../types/trip-tales.types";
import { tripTalesApi } from "../api/trip-tales.api";

interface ApiError {
  message: string;
}

//////////// create post ////////////
export const createPostThunk = createAsyncThunk<
  CreatePostResponse,
  CreatePostData,
  { rejectValue: string }
>(
  "tripTales/createPost",

  async (postData, { rejectWithValue }) => {
    try {
      return await tripTalesApi.createPost(postData);
    } catch (error) {
      const err = error as AxiosError<ApiError>;

      return rejectWithValue(
        err.response?.data?.message ?? "Failed to create post",
      );
    }
  },
);

//////////// fetch posts ////////////
export const fetchPostsThunk = createAsyncThunk<
  CreatePostResponse[],
  void,
  { rejectValue: string }
>(
  "tripTales/fetchPosts",

  async (_, { rejectWithValue }) => {
    try {
      return await tripTalesApi.getPosts();
    } catch (error) {
      const err = error as AxiosError<ApiError>;

      return rejectWithValue(
        err.response?.data?.message ?? "Failed to fetch posts",
      );
    }
  },
);
