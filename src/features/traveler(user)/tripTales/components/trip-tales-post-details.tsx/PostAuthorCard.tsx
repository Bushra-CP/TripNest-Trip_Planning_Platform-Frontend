import React from "react";

import type { CreatePostResponse } from "../../types/trip-tales.types";

interface PostAuthorCardProps {
  post: CreatePostResponse;
}

const PostAuthorCard: React.FC<PostAuthorCardProps> = ({ post }) => {
  return (
    <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 shadow-sm space-y-4">
      <div className="flex items-center gap-3">
        {post.user.profileImageUrl ? (
          <img
            src={post.user.profileImageUrl}
            alt={post.user.fullName}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-[#DCFCE7] border border-[#15803D]/20 shadow-sm"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-[#DCFCE7] text-[#15803D] flex items-center justify-center font-black">
            {post.user.fullName.charAt(0).toUpperCase()}
          </div>
        )}

        <div>
          <h4 className="text-sm font-extrabold text-slate-900">
            {post.user.fullName}
          </h4>

          <p className="text-[11px] text-slate-400">TripTales Traveler</p>
        </div>
      </div>

      <div className="border-t border-slate-100 pt-4">
        <p className="text-xs text-slate-500 leading-relaxed">
          Explore more stories and travel experiences shared by this traveler.
        </p>
      </div>
    </div>
  );
};

export default PostAuthorCard;
