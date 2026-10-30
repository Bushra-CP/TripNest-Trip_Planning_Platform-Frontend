import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "@/app/store";

import {
  initializePostLikes,
  setSelectedPostId,
  clearPostLikes,
} from "../redux/trip-tales-likes.slice";

import {
  togglePostLikeThunk,
  fetchPostLikesThunk,
} from "../redux/trip-tales-likes.thunk";

export const useTripTalesLikes = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    postLikes,
    selectedPostId,
    likes,
    pagination,
    toggleLoading,
    likesLoading,
    error,
  } = useSelector((state: RootState) => state.tripTalesLikes);

  // ==========================================
  // INITIALIZE POST LIKES
  // ==========================================

  const initializeLikes = useCallback(
    (postId: string, likesCount: number, isLikedByCurrentUser: boolean) => {
      dispatch(
        initializePostLikes({
          postId,
          likesCount,
          isLikedByCurrentUser,
        }),
      );
    },
    [dispatch],
  );

  // ==========================================
  // TOGGLE LIKE / UNLIKE
  // ==========================================

  const toggleLike = useCallback(
    async (postId: string, currentlyLiked: boolean) => {
      return dispatch(
        togglePostLikeThunk({
          postId,
          currentlyLiked,
        }),
      ).unwrap();
    },
    [dispatch],
  );

  // ==========================================
  // OPEN LIKES LIST
  // ==========================================

  const openLikes = useCallback(
    async (postId: string, page = 1) => {
      dispatch(setSelectedPostId(postId));

      return dispatch(
        fetchPostLikesThunk({
          postId,
          page,
          limit: 10,
        }),
      ).unwrap();
    },
    [dispatch],
  );

  // ==========================================
  // CHANGE LIKES PAGE
  // ==========================================

  const changeLikesPage = useCallback(
    async (postId: string, page: number) => {
      return dispatch(
        fetchPostLikesThunk({
          postId,
          page,
          limit: 10,
        }),
      ).unwrap();
    },
    [dispatch],
  );

  // ==========================================
  // CLOSE LIKES MODAL
  // ==========================================

  const closeLikes = useCallback(() => {
    dispatch(clearPostLikes());
  }, [dispatch]);

  return {
    postLikes,
    selectedPostId,
    likes,
    pagination,
    toggleLoading,
    likesLoading,
    error,

    initializeLikes,
    toggleLike,
    openLikes,
    changeLikesPage,
    closeLikes,
  };
};
