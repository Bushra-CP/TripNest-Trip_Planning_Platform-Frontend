import React from "react";
import { ChevronRight, Heart, Play, Sparkles } from "lucide-react";

import type { CreatePostResponse } from "../../types/trip-tales.types";

interface RelatedPostsProps {
  posts: CreatePostResponse[];
  destination: string;
  currentPostId: string;
  onPostClick: (postId: string) => void;
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({
  posts,
  destination,
  currentPostId,
  onPostClick,
}) => {
  const relatedPosts = posts
    .filter(
      (post) =>
        post.id !== currentPostId &&
        post.destination.toLowerCase().includes(destination.toLowerCase()),
    )
    .slice(0, 3);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="pt-8 border-t border-[#E2E8F0] space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-[#15803D] font-bold">
            <Sparkles className="w-3.5 h-3.5" />

            <span>More Inspiration</span>
          </div>

          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            More Posts from {destination}
          </h2>
        </div>

        <button
          type="button"
          className="text-xs font-bold text-[#15803D] hover:underline inline-flex items-center gap-1"
        >
          <span>View All</span>

          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedPosts.map((post) => {
          const firstMedia = post.media?.[0];

          return (
            <button
              type="button"
              key={post.id}
              onClick={() => onPostClick(post.id)}
              className="text-left bg-white rounded-3xl border border-[#E2E8F0] overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
            >
              {firstMedia ? (
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  {firstMedia.type === "image" ? (
                    <img
                      src={firstMedia.url}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <>
                      <video
                        src={firstMedia.url}
                        muted
                        preload="metadata"
                        className="w-full h-full object-cover"
                      />

                      <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#EA580C] text-white text-[10px] font-bold flex items-center gap-1">
                        <Play className="w-3 h-3 fill-white" />
                        Video
                      </span>
                    </>
                  )}
                </div>
              ) : (
                <div className="aspect-[16/10] bg-slate-100 flex items-center justify-center text-xs text-slate-400">
                  No media
                </div>
              )}

              <div className="p-5 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {post.destination}
                </span>

                <h4 className="text-sm font-extrabold text-slate-900 leading-snug group-hover:text-[#15803D] transition-colors">
                  {post.title}
                </h4>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {post.content.replace(/<[^>]*>/g, " ")}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-400">
                  <span className="font-semibold text-slate-700">
                    {post.user.fullName}
                  </span>

                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5" />0
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default RelatedPosts;
