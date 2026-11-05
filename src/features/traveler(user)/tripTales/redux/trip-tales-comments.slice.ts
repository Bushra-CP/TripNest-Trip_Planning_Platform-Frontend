import { createSlice } from "@reduxjs/toolkit";

import {
  fetchPostCommentsThunk,
  createCommentThunk,
  createReplyThunk,
  updateCommentThunk,
  deleteCommentThunk,
} from "./trip-tales-comments.thunk";

import type {
  CommentResponse,
  CommentsPagination,
} from "../types/trip-tales.types";

// STATE INTERFACE
interface TripTalesCommentsState {
  selectedPostId: string | null;

  comments: CommentResponse[];

  pagination: CommentsPagination | null;

  // Fetch comments
  commentsLoading: boolean;
  commentsError: string | null;

  // Create comment or reply
  createLoading: boolean;
  createError: string | null;

  // Update comment
  updateLoading: boolean;
  updateError: string | null;

  // Delete comment
  deletingCommentId: string | null;
  deleteError: string | null;
}

// INITIAL STATE
const initialState: TripTalesCommentsState = {
  selectedPostId: null,

  comments: [],

  pagination: null,

  commentsLoading: false,
  commentsError: null,

  createLoading: false,
  createError: null,

  updateLoading: false,
  updateError: null,

  deletingCommentId: null,
  deleteError: null,
};

// ==========================================
// HELPER FUNCTIONS
// ==========================================

// Add a reply under its parent comment
const addReplyToTree = (
  comments: CommentResponse[],
  newReply: CommentResponse,
): boolean => {
  for (const comment of comments) {
    if (comment.id === newReply.parentCommentId) {
      comment.replies.push(newReply);
      comment.repliesCount++;

      return true;
    }

    // Search inside nested replies
    const added = addReplyToTree(comment.replies, newReply);

    if (added) {
      return true;
    }
  }

  return false;
};

// Update a comment or reply at any nesting level
const updateCommentInTree = (
  comments: CommentResponse[],
  updatedComment: CommentResponse,
): boolean => {
  for (let index = 0; index < comments.length; index++) {
    if (comments[index].id === updatedComment.id) {
      // Preserve existing nested replies
      comments[index] = {
        ...updatedComment,
        replies: comments[index].replies,
        repliesCount: comments[index].repliesCount,
      };

      return true;
    }

    // Search inside nested replies
    const updated = updateCommentInTree(
      comments[index].replies,
      updatedComment,
    );

    if (updated) {
      return true;
    }
  }

  return false;
};

// Delete a comment or reply from any nesting level
const removeCommentFromTree = (
  comments: CommentResponse[],
  commentId: string,
  isRootLevel = true,
): { found: boolean; rootDeleted: boolean } => {
  const index = comments.findIndex((comment) => comment.id === commentId);

  // If the comment exists at this level
  if (index !== -1) {
    comments.splice(index, 1);

    return {
      found: true,
      rootDeleted: isRootLevel,
    };
  }

  // Search inside nested replies
  for (const comment of comments) {
    const result = removeCommentFromTree(comment.replies, commentId, false);

    if (result.found) {
      // Only the direct parent loses one reply
      comment.repliesCount = Math.max(0, comment.repliesCount - 1);

      return result;
    }
  }

  return {
    found: false,
    rootDeleted: false,
  };
};

// SLICE
const tripTalesCommentsSlice = createSlice({
  name: "tripTalesComments",

  initialState,

  reducers: {
    // Set the currently selected post
    setSelectedCommentPost: (state, action) => {
      state.selectedPostId = action.payload;

      state.comments = [];
      state.pagination = null;

      state.commentsError = null;
      state.createError = null;
      state.updateError = null;
      state.deleteError = null;
    },

    // Clear comments when leaving the post
    clearPostComments: (state) => {
      state.selectedPostId = null;

      state.comments = [];
      state.pagination = null;

      state.commentsError = null;
      state.createError = null;
      state.updateError = null;
      state.deleteError = null;
    },

    // Clear errors
    clearCommentsError: (state) => {
      state.commentsError = null;
    },

    clearCreateCommentError: (state) => {
      state.createError = null;
    },

    clearUpdateCommentError: (state) => {
      state.updateError = null;
    },

    clearDeleteCommentError: (state) => {
      state.deleteError = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // FETCH COMMENTS
      .addCase(fetchPostCommentsThunk.pending, (state) => {
        state.commentsLoading = true;
        state.commentsError = null;
      })

      .addCase(fetchPostCommentsThunk.fulfilled, (state, action) => {
        state.commentsLoading = false;

        // Ignore responses belonging to another selected post
        if (state.selectedPostId !== action.payload.postId) {
          return;
        }

        state.comments = action.payload.comments;
        state.pagination = action.payload.pagination;
      })

      .addCase(fetchPostCommentsThunk.rejected, (state, action) => {
        state.commentsLoading = false;

        state.commentsError = action.payload ?? "Failed to fetch comments";
      })

      // CREATE COMMENT
      .addCase(createCommentThunk.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })

      .addCase(createCommentThunk.fulfilled, (state, action) => {
        state.createLoading = false;

        const createdComment = action.payload;

        if (state.selectedPostId !== createdComment.postId) {
          return;
        }

        if (!state.pagination) {
          return;
        }

        // New top-level comments appear on the first page
        if (state.pagination.currentPage === 1) {
          state.comments.unshift(createdComment);

          // Maintain the current page limit
          state.comments = state.comments.slice(0, state.pagination.limit);
        }

        // Update pagination count
        const totalComments = state.pagination.totalComments + 1;

        const totalPages = Math.ceil(totalComments / state.pagination.limit);

        state.pagination.totalComments = totalComments;
        state.pagination.totalPages = totalPages;

        state.pagination.hasNextPage =
          state.pagination.currentPage < totalPages;
      })

      .addCase(createCommentThunk.rejected, (state, action) => {
        state.createLoading = false;

        state.createError = action.payload ?? "Failed to create comment";
      })

      // CREATE REPLY
      .addCase(createReplyThunk.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })

      .addCase(createReplyThunk.fulfilled, (state, action) => {
        state.createLoading = false;

        const newReply = action.payload;

        if (state.selectedPostId !== newReply.postId) {
          return;
        }

        // Find its parent and insert the reply
        addReplyToTree(state.comments, newReply);
      })

      .addCase(createReplyThunk.rejected, (state, action) => {
        state.createLoading = false;

        state.createError = action.payload ?? "Failed to create reply";
      })

      // UPDATE COMMENT
      .addCase(updateCommentThunk.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })

      .addCase(updateCommentThunk.fulfilled, (state, action) => {
        state.updateLoading = false;

        const updatedComment = action.payload;

        if (state.selectedPostId !== updatedComment.postId) {
          return;
        }

        // Update the comment wherever it exists in the tree
        updateCommentInTree(state.comments, updatedComment);
      })

      .addCase(updateCommentThunk.rejected, (state, action) => {
        state.updateLoading = false;

        state.updateError = action.payload ?? "Failed to update comment";
      })

      // DELETE COMMENT
      .addCase(deleteCommentThunk.pending, (state, action) => {
        state.deletingCommentId = action.meta.arg;
        state.deleteError = null;
      })

      .addCase(deleteCommentThunk.fulfilled, (state, action) => {
        state.deletingCommentId = null;

        const deletedCommentId = action.payload;

        const result = removeCommentFromTree(state.comments, deletedCommentId);

        // Only top-level comments affect pagination
        if (result.rootDeleted && state.pagination) {
          const totalComments = Math.max(0, state.pagination.totalComments - 1);

          const totalPages = Math.ceil(totalComments / state.pagination.limit);

          state.pagination.totalComments = totalComments;
          state.pagination.totalPages = totalPages;

          state.pagination.hasNextPage =
            state.pagination.currentPage < totalPages;

          state.pagination.hasPreviousPage = state.pagination.currentPage > 1;
        }
      })

      .addCase(deleteCommentThunk.rejected, (state, action) => {
        state.deletingCommentId = null;

        state.deleteError = action.payload ?? "Failed to delete comment";
      });
  },
});

export const {
  setSelectedCommentPost,
  clearPostComments,
  clearCommentsError,
  clearCreateCommentError,
  clearUpdateCommentError,
  clearDeleteCommentError,
} = tripTalesCommentsSlice.actions;

export default tripTalesCommentsSlice.reducer;
