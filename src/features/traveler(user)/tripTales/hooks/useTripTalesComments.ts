import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import {
  setSelectedCommentPost,
  clearPostComments,
} from "../redux/trip-tales-comments.slice";

import {
  fetchPostCommentsThunk,
  createCommentThunk,
  createReplyThunk,
  updateCommentThunk,
  deleteCommentThunk,
} from "../redux/trip-tales-comments.thunk";
import type { AppDispatch, RootState } from "@/app/store";

export const useTripTalesComments = (postId: string) => {
  const dispatch = useDispatch<AppDispatch>();

  // ==========================================
  // REDUX STATE
  // ==========================================

  const {
    selectedPostId,
    comments,
    pagination,

    commentsLoading,
    commentsError,

    createLoading,
    createError,

    updateLoading,
    updateError,

    deletingCommentId,
    deleteError,
  } = useSelector((state: RootState) => state.tripTalesComments);

  const COMMENTS_LIMIT = 10;

  // FETCH COMMENTS
  const fetchComments = useCallback(
    async (page = 1): Promise<void> => {
      if (!postId) return;

      try {
        await dispatch(
          fetchPostCommentsThunk({
            postId,
            page,
            limit: COMMENTS_LIMIT,
          }),
        ).unwrap();
      } catch (error) {
        console.error("Failed to fetch comments:", error);
        throw error;
      }
    },
    [dispatch, postId],
  );

  // INITIAL FETCH
  useEffect(() => {
    if (!postId) return;

    dispatch(setSelectedCommentPost(postId));

    void dispatch(
      fetchPostCommentsThunk({
        postId,
        page: 1,
        limit: 10,
      }),
    );

    return () => {
      dispatch(clearPostComments());
    };
  }, [dispatch, postId]);

  // CREATE COMMENT
  const addComment = async (content: string): Promise<void> => {
    const trimmedContent = content.trim();

    if (!trimmedContent) {
      toast.error("Comment cannot be empty");
      return;
    }

    try {
      await dispatch(
        createCommentThunk({
          postId,
          content: trimmedContent,
        }),
      ).unwrap();

      toast.success("Comment added successfully");
    } catch (error) {
      toast.error(typeof error === "string" ? error : "Failed to add comment");

      throw error;
    }
  };

  // CREATE REPLY
  const replyToComment = async (
    commentId: string,
    content: string,
  ): Promise<void> => {
    const trimmedContent = content.trim();

    if (!trimmedContent) {
      toast.error("Reply cannot be empty");
      return;
    }

    try {
      await dispatch(
        createReplyThunk({
          commentId,
          content: trimmedContent,
        }),
      ).unwrap();

      toast.success("Reply added successfully");
    } catch (error) {
      toast.error(typeof error === "string" ? error : "Failed to add reply");

      throw error;
    }
  };

  // UPDATE COMMENT
  const editComment = async (
    commentId: string,
    content: string,
  ): Promise<void> => {
    const trimmedContent = content.trim();

    if (!trimmedContent) {
      toast.error("Comment cannot be empty");
      return;
    }

    try {
      await dispatch(
        updateCommentThunk({
          commentId,
          content: trimmedContent,
        }),
      ).unwrap();

      toast.success("Comment updated successfully");
    } catch (error) {
      toast.error(
        typeof error === "string" ? error : "Failed to update comment",
      );

      throw error;
    }
  };

  // DELETE COMMENT
  const removeComment = async (commentId: string): Promise<void> => {
    try {
      await dispatch(deleteCommentThunk(commentId)).unwrap();

      toast.success("Comment deleted successfully");
    } catch (error) {
      toast.error(
        typeof error === "string" ? error : "Failed to delete comment",
      );

      throw error;
    }
  };

  // CHANGE PAGE
  const changePage = async (page: number): Promise<void> => {
    if (
      !pagination ||
      page < 1 ||
      page > pagination.totalPages ||
      page === pagination.currentPage
    ) {
      return;
    }

    await fetchComments(page);
  };

  return {
    comments,
    pagination,

    loading: selectedPostId === postId && commentsLoading,
    submitting: createLoading,
    editing: updateLoading,
    deletingCommentId,

    error: commentsError,
    createError,
    updateError,
    deleteError,

    addComment,
    replyToComment,
    editComment,
    removeComment,

    changePage,
    refreshComments: fetchComments,
  };
};
