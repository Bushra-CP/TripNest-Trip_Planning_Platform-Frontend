import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/app/store";
import { createPostThunk, fetchPostsThunk } from "../redux/trip-tales.thunk";
import type { CreatePostData } from "../types/trip-tales.types";
import { clearNewPostsAvailable } from "../redux/trip-tales.slice";
import { tripTalesApi } from "../api/trip-tales.api";
import { useNavigate } from "react-router-dom";

export const useTripTales = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { posts, loading, error, newPostsAvailable } = useSelector(
    (state: RootState) => state.tripTales,
  );

  const fetchPosts = () => {
    return dispatch(fetchPostsThunk());
  };

  const createPost = async (postData: CreatePostData) => {
    return dispatch(createPostThunk(postData)).unwrap();
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
