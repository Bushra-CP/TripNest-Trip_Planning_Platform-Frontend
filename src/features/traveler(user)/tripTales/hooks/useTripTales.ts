import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/app/store";
import { createPostThunk, fetchPostsThunk } from "../redux/trip-tales.thunk";
import type { CreatePostData } from "../types/trip-tales.types";
import { clearNewPostsAvailable } from "../redux/trip-tales.slice";
import { tripTalesApi } from "../api/trip-tales.api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useTripTales = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { posts, loading, error, newPostsAvailable } = useSelector(
    (state: RootState) => state.tripTales,
  );

  const fetchPosts = () => {
    return dispatch(fetchPostsThunk());
  };

  const createPost = (
    postData: CreatePostData,
    onSubmitted?: () => void,
  ): void => {
    // Show the notification immediately.
    toast.success("Your post has been submitted! It will be visible soon.");

    // Close the modal immediately after submission begins.
    onSubmitted?.();

    // Continue the API request without blocking the UI.
    void dispatch(createPostThunk(postData))
      .unwrap()
      .catch((error: unknown) => {
        toast.error(
          typeof error === "string"
            ? error
            : "Failed to submit your post. Please try again.",
        );
      });
  };

  const fetchPostById = (postId: string) => {
    return tripTalesApi.getPostById(postId);
  };

  const refreshPosts = () => {
    dispatch(fetchPostsThunk());
  };

  const clearNewPosts = () => {
    dispatch(clearNewPostsAvailable());
  };

  const handlePostClick = (postId: string) => {
    navigate(`/trip-tales/posts/${postId}`);
  };

  return {
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
  };
};
