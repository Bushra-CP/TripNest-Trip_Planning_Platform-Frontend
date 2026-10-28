import { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/app/store";
import { setNewPostsAvailable } from "../redux/trip-tales.slice";
import socket from "../../trip-planning/socket/chat.socket";

export const useTripTalesSocket = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const handleNewPostAvailable = (data: {
      postId: string;
    }) => {
      console.log("New post notification received:", data.postId);

      dispatch(setNewPostsAvailable());
    };

    socket.on(
      "post:new-available",
      handleNewPostAvailable,
    );

    return () => {
      socket.off(
        "post:new-available",
        handleNewPostAvailable,
      );
    };
  }, [dispatch]);
};