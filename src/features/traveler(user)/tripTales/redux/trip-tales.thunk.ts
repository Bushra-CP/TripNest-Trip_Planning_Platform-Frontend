import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import type {
  CreatePostData,
  CreatePostResponse,
  MyPostResponse,
  MyPostsQuery,
  MyPostsResponse,
  MyProfileResponse,
  UpdateMyPostData,
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

// FETCH MY PROFILE
export const fetchMyProfileThunk = createAsyncThunk<
  MyProfileResponse,
  void,
  { rejectValue: string }
>("tripTales/fetchMyProfile", async (_, { rejectWithValue }) => {
  try {
    return await tripTalesApi.getMyProfile();
  } catch (error) {
    const err = error as AxiosError<ApiError>;

    return rejectWithValue(
      err.response?.data?.message ?? "Failed to fetch posts",
    );
  }
});

// FETCH MY POSTS
export const fetchMyPostsThunk = createAsyncThunk<
  MyPostsResponse,
  MyPostsQuery | undefined,
  { rejectValue: string }
>("tripTales/fetchMyPosts", async (query, { rejectWithValue }) => {
  try {
    return await tripTalesApi.getMyPosts(query);
  } catch (error) {
    const err = error as AxiosError<ApiError>;

    return rejectWithValue(
      err.response?.data?.message ?? "Failed to fetch posts",
    );
  }
});

// FETCH MY POST BY ID
export const fetchMyPostByIdThunk = createAsyncThunk<
  MyPostResponse,
  string,
  { rejectValue: string }
>("tripTales/fetchMyPostById", async (postId, { rejectWithValue }) => {
  try {
    return await tripTalesApi.getMyPostById(postId);
  } catch (error) {
    const err = error as AxiosError<ApiError>;

    return rejectWithValue(
      err.response?.data?.message ?? "Failed to fetch posts",
    );
  }
});

// UPDATE MY POST
export interface UpdateMyPostThunkPayload {
  postId: string;
  postData: UpdateMyPostData;
}

export const updateMyPostThunk = createAsyncThunk<
  MyPostResponse,
  UpdateMyPostThunkPayload,
  { rejectValue: string }
>(
  "tripTales/updateMyPost",
  async ({ postId, postData }, { rejectWithValue }) => {
    try {
      return await tripTalesApi.updateMyPost(postId, postData);
    } catch (error) {
      const err = error as AxiosError<ApiError>;

      return rejectWithValue(
        err.response?.data?.message ?? "Failed to fetch posts",
      );
    }
  },
);

// DELETE MY POST
export const deleteMyPostThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("tripTales/deleteMyPost", async (postId, { rejectWithValue }) => {
  try {
    return await tripTalesApi.deleteMyPost(postId);
  } catch (error) {
    const err = error as AxiosError<ApiError>;

    return rejectWithValue(
      err.response?.data?.message ?? "Failed to fetch posts",
    );
  }
});
