import React from "react";
import { Heart, MoreHorizontal, Send } from "lucide-react";

import type {
  CommentItem,
  PostCommentsProps,
} from "../../types/post-detail.types";

const PostComments: React.FC<PostCommentsProps> = ({
  comments,
  newComment,
  onCommentChange,
  onAddComment,
  onCommentLike,
}) => {
  return (
    <section className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-lg font-black text-slate-900 tracking-tight">
          Comments ({comments.length})
        </h3>

        <span className="text-[11px] font-bold text-slate-400">
          Sorted by Most Helpful
        </span>
      </div>

      <form onSubmit={onAddComment} className="space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-[#DCFCE7] text-[#15803D] flex items-center justify-center font-black shrink-0">
            B
          </div>

          <div className="flex-1">
            <textarea
              rows={3}
              value={newComment}
              onChange={(event) => onCommentChange(event.target.value)}
              placeholder="Write a comment or ask the traveler for route tips..."
              className="w-full p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#15803D] focus:bg-white text-xs outline-none transition-all placeholder:text-slate-400 resize-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pl-12">
          <span className="text-[10px] text-slate-400 font-medium">
            Share your travel experience respectfully.
          </span>

          <button
            type="submit"
            disabled={!newComment.trim()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#15803D] hover:bg-[#166534] disabled:opacity-40 text-white text-xs font-bold transition-all shadow-sm active:scale-95"
          >
            <Send className="w-3 h-3" />

            <span>Post Comment</span>
          </button>
        </div>
      </form>

      <div className="space-y-4 pt-4 border-t border-slate-100">
        {comments.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-6">
            No comments yet. Be the first to comment.
          </p>
        ) : (
          comments.map((comment: CommentItem) => (
            <div
              key={comment.id}
              className="p-4 rounded-2xl bg-slate-50/60 border border-slate-100 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  {comment.avatar ? (
                    <img
                      src={comment.avatar}
                      alt={comment.author}
                      className="w-7 h-7 rounded-full object-cover border border-slate-200"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-[#DCFCE7] text-[#15803D] flex items-center justify-center text-[10px] font-black">
                      {comment.author.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div>
                    <h4 className="text-xs font-bold text-slate-900">
                      {comment.author}
                    </h4>

                    <span className="text-[10px] text-slate-400 font-medium">
                      {comment.timeAgo}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="text-slate-400 hover:text-slate-600"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed font-normal pl-9">
                {comment.text}
              </p>

              <div className="flex items-center gap-4 pl-9 pt-1 text-[11px] font-bold text-slate-400">
                <button
                  type="button"
                  onClick={() => onCommentLike(comment.id)}
                  className={`inline-flex items-center gap-1 hover:text-rose-600 transition-colors ${
                    comment.isLiked ? "text-rose-600" : ""
                  }`}
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      comment.isLiked ? "fill-rose-600" : ""
                    }`}
                  />

                  <span>{comment.likes}</span>
                </button>

                <button
                  type="button"
                  onClick={() => alert(`Replying to ${comment.author}...`)}
                  className="hover:text-slate-800 transition-colors"
                >
                  Reply
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default PostComments;
