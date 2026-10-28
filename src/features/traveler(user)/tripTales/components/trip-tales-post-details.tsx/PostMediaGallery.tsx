import React from "react";
import { Maximize2, Play } from "lucide-react";

import type { CreatePostResponse } from "../../types/trip-tales.types";

interface PostMediaGalleryProps {
  post: CreatePostResponse;
}

const PostMediaGallery: React.FC<PostMediaGalleryProps> = ({
  post,
}) => {
  if (!post.media || post.media.length === 0) {
    return null;
  }

  const handleOpenMedia = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
          Media
        </h3>

        <span className="text-[11px] font-bold text-slate-400">
          {post.media.length}{" "}
          {post.media.length === 1 ? "item" : "items"}
        </span>
      </div>

      <div
        className={`grid gap-3 ${
          post.media.length === 1
            ? "grid-cols-1"
            : "grid-cols-2 sm:grid-cols-3"
        }`}
      >
        {post.media.map((media) => (
          <div
            key={media.key}
            onClick={() => handleOpenMedia(media.url)}
            className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 cursor-pointer"
          >
            {media.type === "image" ? (
              <img
                src={media.url}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <>
                <video
                  src={media.url}
                  className="w-full h-full object-cover"
                  muted
                  preload="metadata"
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                    <Play className="w-5 h-5 fill-slate-900 text-slate-900 ml-0.5" />
                  </div>
                </div>
              </>
            )}

            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Maximize2 className="w-5 h-5 text-white" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PostMediaGallery;