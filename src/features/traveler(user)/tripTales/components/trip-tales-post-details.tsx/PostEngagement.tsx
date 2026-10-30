import React from "react";
import { Bookmark, Heart, MessageSquare, Share2 } from "lucide-react";

interface PostEngagementProps {
  likesCount: number;
  isLiked: boolean;
  isSaved: boolean;
  commentsCount: number;
  onToggleLike: () => void;
  onToggleSave: () => void;
  onShare: () => void;
  onShowLikes: () => void;
  isLikeLoading?: boolean;
}

const PostEngagement: React.FC<PostEngagementProps> = ({
  likesCount,
  isLiked,
  isSaved,
  commentsCount,
  onToggleLike,
  onToggleSave,
  onShare,
  onShowLikes,
  isLikeLoading = false,
}) => {
  return (
    <div className="flex flex-col items-center justify-between gap-4 rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm sm:flex-row">
      <div className="flex items-center gap-6 text-xs font-bold text-slate-600">
        <div className="inline-flex items-center gap-2">
          <button
            type="button"
            disabled={isLikeLoading}
            onClick={onToggleLike}
            aria-label={isLiked ? "Unlike post" : "Like post"}
            className={`transition-colors disabled:opacity-50 ${
              isLiked ? "text-rose-600" : "hover:text-rose-600"
            }`}
          >
            <Heart
              className={`h-5 w-5 ${
                isLiked ? "fill-rose-600 stroke-rose-600" : ""
              }`}
            />
          </button>

          <button
            type="button"
            onClick={onShowLikes}
            className="hover:text-rose-600"
          >
            {likesCount.toLocaleString()}
          </button>
        </div>

        <div className="inline-flex items-center gap-2 text-slate-600">
          <MessageSquare className="h-5 w-5 text-slate-400" />
          <span>{commentsCount} comments</span>
        </div>
      </div>

      <div className="flex w-full items-center justify-end gap-3 sm:w-auto">
        <button
          type="button"
          onClick={onToggleSave}
          className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition-all active:scale-95 ${
            isSaved
              ? "bg-[#15803D] text-white shadow-md shadow-[#15803D]/25"
              : "border border-slate-200 text-slate-700 hover:bg-slate-50"
          }`}
        >
          <Bookmark className={`h-4 w-4 ${isSaved ? "fill-white" : ""}`} />
          <span>{isSaved ? "Saved to My Trips" : "Save to My Trips"}</span>
        </button>

        <button
          type="button"
          onClick={onShare}
          aria-label="Share post"
          className="rounded-xl border border-slate-200 p-2.5 text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
        >
          <Share2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default PostEngagement;
