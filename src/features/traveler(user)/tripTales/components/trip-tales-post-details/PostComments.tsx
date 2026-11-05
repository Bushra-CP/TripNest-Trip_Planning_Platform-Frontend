import React, { useState } from "react";
import { Send, ChevronLeft, ChevronRight, MessageSquare } from "lucide-react";

import CommentItem from "./CommentItem";

import type {
  CommentResponse,
  CommentsPagination,
} from "../../types/trip-tales.types";

interface PostCommentsProps {
  comments: CommentResponse[];

  pagination: CommentsPagination;

  currentUserId?: string;
  currentUserImage?: string;

  loading: boolean;
  submitting: boolean;
  editing: boolean;
  deletingCommentId: string | null;

  error: string | null;

  showAddComment?: boolean;
  allowReplies?: boolean;

  onAddComment: (content: string) => Promise<void>;

  onReply: (commentId: string, content: string) => Promise<void>;

  onEditComment: (commentId: string, content: string) => Promise<void>;

  onDeleteComment: (commentId: string) => Promise<void>;

  onPageChange: (page: number) => Promise<void>;
}

const PostComments: React.FC<PostCommentsProps> = ({
  comments,
  pagination,
  currentUserId,
  currentUserImage,
  loading,
  submitting,
  editing,
  deletingCommentId,
  error,
  showAddComment = true,
  allowReplies = true,
  onAddComment,
  onReply,
  onEditComment,
  onDeleteComment,
  onPageChange,
}) => {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!newComment.trim() || submitting) return;

    try {
      await onAddComment(newComment);
      setNewComment("");
    } catch {
      // Error is displayed through toast.
    }
  };

  return (
    <section className="space-y-6 rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm sm:p-8">
      {/* HEADER */}

      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-lg font-black tracking-tight text-slate-900">
          Comments ({pagination.totalComments})
        </h3>

        <span className="text-[11px] font-bold text-slate-400">
          Newest first
        </span>
      </div>

      {/* ADD COMMENT */}

      {showAddComment && (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex items-start gap-3">
            {currentUserImage ? (
              <img
                src={currentUserImage}
                alt="Your profile"
                className="h-9 w-9 shrink-0 rounded-full border border-slate-200 object-cover"
              />
            ) : (
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#DCFCE7] font-black text-[#15803D]">
                {currentUserId ? "Y" : "?"}
              </div>
            )}

            <div className="flex-1">
              <textarea
                rows={3}
                maxLength={1000}
                value={newComment}
                onChange={(event) => setNewComment(event.target.value)}
                disabled={!currentUserId || submitting}
                placeholder={
                  currentUserId
                    ? "Write a comment or ask the traveler for route tips..."
                    : "Please log in to comment."
                }
                className="w-full resize-none rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-3.5 text-xs outline-none transition-all placeholder:text-slate-400 focus:border-[#15803D] focus:bg-white disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pl-12">
            <span className="text-[10px] font-medium text-slate-400">
              {newComment.length}/1000
            </span>

            <button
              type="submit"
              disabled={!currentUserId || !newComment.trim() || submitting}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#15803D] px-4 py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-[#166534] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Send className="h-3 w-3" />
              {submitting ? "Posting..." : "Post Comment"}
            </button>
          </div>
        </form>
      )}

      {/* COMMENTS LIST */}

      <div className="space-y-4 border-t border-slate-100 pt-5">
        {loading ? (
          <div className="py-8 text-center text-xs text-slate-400">
            Loading comments...
          </div>
        ) : error ? (
          <div className="space-y-3 py-6 text-center">
            <p className="text-xs text-rose-500">{error}</p>

            <button
              type="button"
              onClick={() => void onPageChange(pagination.currentPage || 1)}
              className="rounded-lg bg-slate-100 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200"
            >
              Try again
            </button>
          </div>
        ) : comments.length === 0 ? (
          <div className="py-8 text-center">
            <MessageSquare className="mx-auto mb-2 h-8 w-8 text-slate-300" />

            <p className="text-xs text-slate-400">
              No comments yet. Be the first to comment!
            </p>
          </div>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              currentUserId={currentUserId}
              allowReplies={allowReplies}
              onEdit={onEditComment}
              onDelete={onDeleteComment}
              onReply={onReply}
              editing={editing}
              deletingCommentId={deletingCommentId}
            />
          ))
        )}
      </div>

      {/* PAGINATION */}

      {pagination.totalPages > 1 && !loading && (
        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <button
            type="button"
            disabled={!pagination.hasPreviousPage}
            onClick={() => void onPageChange(pagination.currentPage - 1)}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </button>

          <span className="text-xs font-semibold text-slate-400">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>

          <button
            type="button"
            disabled={!pagination.hasNextPage}
            onClick={() => void onPageChange(pagination.currentPage + 1)}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </section>
  );
};

export default PostComments;
