import { useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from "@/app/store";

import type {
  AdminPostSortOrder,
  AdminPostStatus,
} from "../types/admin-trip-tales.types";

import {
  blockAdminTripTalesPostThunk,
  fetchAdminTripTalesPostByIdThunk,
  fetchAdminTripTalesStatsThunk,
  fetchAdminTripTalesThunk,
  unblockAdminTripTalesPostThunk,
} from "../redux/admin-trip-tales.thunk";

export const useAdminTripTales = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    posts,
    selectedPost,
    stats,
    pagination,
    loading,
    statsLoading,
    detailLoading,
    moderationLoading,
    error,
  } = useSelector((state: RootState) => state.adminTripTales);

  const fetchPosts = (params: {
    page: number;
    limit: number;
    search: string;
    status?: AdminPostStatus;
    sort: AdminPostSortOrder;
  }) => dispatch(fetchAdminTripTalesThunk(params)).unwrap();

  const fetchStats = () => dispatch(fetchAdminTripTalesStatsThunk()).unwrap();

  const fetchPostById = (postId: string) =>
    dispatch(fetchAdminTripTalesPostByIdThunk(postId)).unwrap();

  const blockPost = (postId: string) =>
    dispatch(blockAdminTripTalesPostThunk(postId)).unwrap();

  const unblockPost = (postId: string) =>
    dispatch(unblockAdminTripTalesPostThunk(postId)).unwrap();

  return {
    posts,
    selectedPost,
    stats,
    pagination,

    loading,
    statsLoading,
    detailLoading,
    moderationLoading,
    error,

    fetchPosts,
    fetchStats,
    fetchPostById,
    blockPost,
    unblockPost,
  };
};
