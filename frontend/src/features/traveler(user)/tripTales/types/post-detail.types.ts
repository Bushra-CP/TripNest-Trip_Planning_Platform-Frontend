import type { CreatePostResponse } from "./trip-tales.types";

export interface CommentItem {
  id: string;
  author: string;
  avatar: string;
  timeAgo: string;
  text: string;
  likes: number;
  isLiked?: boolean;
}

export interface PostDetailProps {
  post: CreatePostResponse;
}

export interface PostEngagementProps {
  likesCount: number;
  isLiked: boolean;
  isSaved: boolean;
  commentsCount: number;

  onToggleLike: () => void;
  onToggleSave: () => void;
  onShare: () => void;
}

export interface PostCommentsProps {
  comments: CommentItem[];
  newComment: string;

  onCommentChange: (value: string) => void;
  onAddComment: (event: React.FormEvent) => void;
  onCommentLike: (id: string) => void;
}