//keep the Like / Comment / Save / Share UI

import React from "react";
import { Bookmark, Heart, MessageSquare, Share2 } from "lucide-react";

import type { PostEngagementProps } from "../../types/post-detail.types";

const PostEngagement: React.FC<PostEngagementProps> = ({
  likesCount,
  isLiked,
  isSaved,
  commentsCount,
  onToggleLike,
  onToggleSave,
  onShare,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-6 text-xs font-bold text-slate-600">
        <button
          type="button"
          onClick={onToggleLike}
          className={`inline-flex items-center gap-2 transition-colors ${
            isLiked ? "text-rose-600" : "hover:text-rose-600"
          }`}
        >
          <Heart
            className={`w-5 h-5 ${
              isLiked ? "fill-rose-600 stroke-rose-600" : ""
            }`}
          />

          <span>{likesCount.toLocaleString()}</span>
        </button>

        <div className="inline-flex items-center gap-2 text-slate-600">
          <MessageSquare className="w-5 h-5 text-slate-400" />

          <span>{commentsCount} comments</span>
        </div>
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
        <button
          type="button"
          onClick={onToggleSave}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95 ${
            isSaved
              ? "bg-[#15803D] text-white shadow-md shadow-[#15803D]/25"
              : "border border-slate-200 text-slate-700 hover:bg-slate-50"
          }`}
        >
          <Bookmark className={`w-4 h-4 ${isSaved ? "fill-white" : ""}`} />

          <span>{isSaved ? "Saved to My Trips" : "Save to My Trips"}</span>
        </button>

        <button
          type="button"
          onClick={onShare}
          className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default PostEngagement;
