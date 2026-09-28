import React, { useState } from "react";
import { CheckCircle2, MapPin, UserPlus } from "lucide-react";

import type { CreatePostResponse } from "../../types/trip-tales.types";

interface PostAuthorHeaderProps {
  post: CreatePostResponse;
}

const PostAuthorHeader: React.FC<PostAuthorHeaderProps> = ({
  post,
}) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const formattedDate = new Date(
    post.createdAt,
  ).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0FDF4] border border-[#DCFCE7] text-[#15803D] text-[11px] font-black uppercase tracking-wider">
          <MapPin className="w-3.5 h-3.5" />

          {post.destination}
        </span>

        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
          • TripTales
        </span>
      </div>

      <h1 className="text-4xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
        {post.title}
      </h1>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-slate-100">
        <div className="flex items-center gap-3">
          {post.user.profileImageUrl ? (
            <img
              src={post.user.profileImageUrl}
              alt={post.user.fullName}
              className="w-11 h-11 rounded-full object-cover ring-2 ring-[#DCFCE7] border border-[#15803D]/20 shadow-sm"
            />
          ) : (
            <div className="w-11 h-11 rounded-full bg-[#DCFCE7] text-[#15803D] flex items-center justify-center font-black">
              {post.user.fullName.charAt(0).toUpperCase()}
            </div>
          )}

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-extrabold text-slate-900">
                {post.user.fullName}
              </h3>

              <span className="text-[10px] font-bold text-[#15803D] bg-[#DCFCE7] px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-[#15803D]" />

                Traveler
              </span>
            </div>

            <p className="text-[11px] text-slate-400 font-medium">
              {formattedDate}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsFollowing((previous) => !previous)}
          className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm active:scale-95 ${
            isFollowing
              ? "bg-slate-100 text-slate-700 border border-slate-200"
              : "bg-[#15803D] hover:bg-[#166534] text-white shadow-[#15803D]/20"
          }`}
        >
          <UserPlus className="w-3.5 h-3.5" />

          <span>
            {isFollowing ? "Following" : "Follow"}
          </span>
        </button>
      </div>
    </section>
  );
};

export default PostAuthorHeader;