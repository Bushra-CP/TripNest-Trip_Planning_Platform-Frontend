import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

import { tripTalesApi } from "../api/trip-tales.api";

import type {
  CommentResponse,
  CommentsResponse,
} from "../types/trip-tales.types";

interface ApiError {
  message: string;
}

// FETCH POST COMMENTS
interface FetchCommentsPayload {
  postId: string;
  page?: number;
  limit?: number;
}

export const fetchPostCommentsThunk = createAsyncThunk<
  CommentsResponse & { postId: string },
  FetchCommentsPayload,
  { rejectValue: string }
>(
  "tripTalesComments/fetchPostComments",

  async ({ postId, page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await tripTalesApi.getPostComments(postId, page, limit);

      return {
        ...response,
        postId,
      };
    } catch (error) {
      const err = error as AxiosError<ApiError>;

      return rejectWithValue(
        err.response?.data?.message ?? "Failed to fetch comments",
      );
    }
  },
);

// CREATE COMMENT
interface CreateCommentPayload {
  postId: string;
  content: string;
}

export const createCommentThunk = createAsyncThunk<
  CommentResponse,
  CreateCommentPayload,
  { rejectValue: string }
>(
  "tripTalesComments/createComment",

  async ({ postId, content }, { rejectWithValue }) => {
    try {
      return await tripTalesApi.createComment(postId, content);
    } catch (error) {
      const err = error as AxiosError<ApiError>;

      return rejectWithValue(
        err.response?.data?.message ?? "Failed to create comment",
      );
    }
  },
);

// CREATE REPLY
interface CreateReplyPayload {
  commentId: string;
  content: string;
}

export const createReplyThunk = createAsyncThunk<
  CommentResponse,
  CreateReplyPayload,
  { rejectValue: string }
>(
  "tripTalesComments/createReply",

  async ({ commentId, content }, { rejectWithValue }) => {
    try {
      return await tripTalesApi.createReply(commentId, content);
    } catch (error) {
      const err = error as AxiosError<ApiError>;

      return rejectWithValue(
        err.response?.data?.message ?? "Failed to create reply",
      );
    }
  },
);

// UPDATE COMMENT
interface UpdateCommentPayload {
  commentId: string;
  content: string;
}

export const updateCommentThunk = createAsyncThunk<
  CommentResponse,
  UpdateCommentPayload,
  { rejectValue: string }
>(
  "tripTalesComments/updateComment",

  async ({ commentId, content }, { rejectWithValue }) => {
    try {
      return await tripTalesApi.updateComment(commentId, content);
    } catch (error) {
      const err = error as AxiosError<ApiError>;

      return rejectWithValue(
        err.response?.data?.message ?? "Failed to update comment",
      );
    }
  },
);

// DELETE COMMENT
export const deleteCommentThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  "tripTalesComments/deleteComment",

  async (commentId, { rejectWithValue }) => {
    try {
      await tripTalesApi.deleteComment(commentId);

      return commentId;
    } catch (error) {
      const err = error as AxiosError<ApiError>;

      return rejectWithValue(
        err.response?.data?.message ?? "Failed to delete comment",
      );
    }
  },
);
