import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import type { RootState, AppDispatch } from "@/app/store";

import {
  createPostThunk,
  fetchPostsThunk,
  fetchMyProfileThunk,
  fetchMyPostsThunk,
  fetchMyPostByIdThunk,
  updateMyPostThunk,
  deleteMyPostThunk,
} from "../redux/trip-tales.thunk";

import {
  clearNewPostsAvailable,
  clearSelectedMyPost,
} from "../redux/trip-tales.slice";

import { tripTalesApi } from "../api/trip-tales.api";

import type {
  CreatePostData,
  MyPostsQuery,
  UpdateMyPostData,
} from "../types/trip-tales.types";

export const useTripTales = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const tripTalesState = useSelector((state: RootState) => state.tripTales);

  const {
    posts,
    loading,
    error,
    newPostsAvailable,

    myProfile,
    profileLoading,
    profileError,

    myPosts,
    myPostsPagination,
    myPostsLoading,
    myPostsError,

    selectedMyPost,
    myPostLoading,
    myPostError,

    updatePostLoading,
    updatePostError,

    deletePostLoading,
    deletePostError,
  } = tripTalesState;

  // ==========================================
  // PUBLIC TRIPTALES
  // ==========================================

  const fetchPosts = useCallback(() => {
    return dispatch(fetchPostsThunk());
  }, [dispatch]);

  const createPost = useCallback(
    async (
      postData: CreatePostData,
      onSubmitted?: () => void,
    ): Promise<void> => {
      try {
        await dispatch(createPostThunk(postData)).unwrap();

        toast.success("Your post has been submitted! It will be visible soon.");

        onSubmitted?.();
      } catch (error) {
        toast.error(
          typeof error === "string"
            ? error
            : "Failed to submit your post. Please try again.",
        );
      }
    },
    [dispatch],
  );

  const fetchPostById = useCallback((postId: string) => {
    return tripTalesApi.getPostById(postId);
  }, []);

  const refreshPosts = useCallback(() => {
    return dispatch(fetchPostsThunk());
  }, [dispatch]);

  const clearNewPosts = useCallback(() => {
    dispatch(clearNewPostsAvailable());
  }, [dispatch]);

  const handlePostClick = useCallback(
    (postId: string) => {
      navigate(`/trip-tales/posts/${postId}`);
    },
    [navigate],
  );

  // ==========================================
  // MY PROFILE
  // ==========================================

  const fetchMyProfile = useCallback(() => {
    return dispatch(fetchMyProfileThunk());
  }, [dispatch]);

  // ==========================================
  // MY POSTS
  // ==========================================

  const fetchMyPosts = useCallback(
    (query?: MyPostsQuery) => {
      return dispatch(fetchMyPostsThunk(query));
    },
    [dispatch],
  );

  const fetchMyPostById = useCallback(
    (postId: string) => {
      return dispatch(fetchMyPostByIdThunk(postId));
    },
    [dispatch],
  );

  // ==========================================
  // UPDATE MY POST
  // ==========================================

  const updateMyPost = useCallback(
    async (postId: string, postData: UpdateMyPostData): Promise<boolean> => {
      try {
        await dispatch(
          updateMyPostThunk({
            postId,
            postData,
          }),
        ).unwrap();

        toast.success("Your TripTale has been updated successfully.");

        return true;
      } catch (error) {
        toast.error(
          typeof error === "string" ? error : "Failed to update your TripTale.",
        );

        return false;
      }
    },
    [dispatch],
  );

  // ==========================================
  // DELETE MY POST
  // ==========================================

  const deleteMyPost = useCallback(
    async (postId: string): Promise<boolean> => {
      try {
        await dispatch(deleteMyPostThunk(postId)).unwrap();

        toast.success("Your TripTale has been deleted successfully.");

        return true;
      } catch (error) {
        toast.error(
          typeof error === "string" ? error : "Failed to delete your TripTale.",
        );

        return false;
      }
    },
    [dispatch],
  );

  // ==========================================
  // CLEAR SELECTED POST
  // ==========================================

  const clearSelectedPost = useCallback(() => {
    dispatch(clearSelectedMyPost());
  }, [dispatch]);

  return {
    // Public TripTales
    posts,
    loading,
    error,
    newPostsAvailable,
    fetchPosts,
    createPost,
    fetchPostById,
    refreshPosts,
    clearNewPosts,
    handlePostClick,

    // My profile
    myProfile,
    profileLoading,
    profileError,
    fetchMyProfile,

    // My posts
    myPosts,
    myPostsPagination,
    myPostsLoading,
    myPostsError,
    fetchMyPosts,

    // Individual post
    selectedMyPost,
    myPostLoading,
    myPostError,
    fetchMyPostById,
    clearSelectedPost,

    // Update
    updateMyPost,
    updatePostLoading,
    updatePostError,

    // Delete
    deleteMyPost,
    deletePostLoading,
    deletePostError,
  };
};
