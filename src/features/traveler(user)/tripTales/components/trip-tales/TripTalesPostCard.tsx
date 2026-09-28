import React, { useState } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Play,
  MoreHorizontal,
  CheckCircle2,
  MapPin,
} from "lucide-react";

import type { CreatePostResponse } from "../../types/trip-tales.types";

interface TripTalesPostCardProps {
  post: CreatePostResponse;
  onLike: (id: string) => void;
  onSave: (id: string) => void;
  onPostClick: (id: string) => void;
}

const TripTalesPostCard: React.FC<TripTalesPostCardProps> = ({
  post,
  onLike,
  onSave,
  onPostClick,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const plainTextContent = post.content?.replace(/<[^>]*>/g, "").trim() ?? "";

  const previewLength = 500;

  const shouldShowMore = plainTextContent.length > previewLength;

  const previewContent = shouldShowMore
    ? plainTextContent.slice(0, previewLength).trimEnd() + "..."
    : plainTextContent;

  const user = post.user;

  const media = post.media ?? [];

  const tags = post.tags ?? [];

  const firstMedia = media[0];

  const userName = user?.fullName || "Traveler";

  const profileImageUrl = user?.profileImageUrl || "";

  const formattedDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  const handlePostClick = () => {
    onPostClick(post.id);
  };

  return (
    <article className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow overflow-hidden p-6 space-y-5">
      {/* ==================================================
          AUTHOR
      ================================================== */}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* PROFILE IMAGE */}

          {profileImageUrl ? (
            <img
              src={profileImageUrl}
              alt={userName}
              className="w-10 h-10 rounded-full object-cover border border-slate-200"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
              {userName.charAt(0).toUpperCase()}
            </div>
          )}

          {/* USER DETAILS */}

          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-extrabold">{userName}</h4>

              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#15803D] bg-[#DCFCE7] px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3" />
                Traveler
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              {formattedDate && <span>{formattedDate}</span>}

              {formattedDate && post.destination && <span>•</span>}

              {post.destination && (
                <span className="inline-flex items-center gap-0.5 text-slate-500">
                  <MapPin className="w-3 h-3 text-[#EA580C]" />

                  {post.destination}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* MORE */}

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
          }}
          className="text-slate-400 hover:text-slate-600 p-1"
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* ==================================================
          CONTENT
      ================================================== */}

      <div className="space-y-1 cursor-pointer" onClick={handlePostClick}>
        {post.title && (
          <h2 className="text-lg font-black text-slate-900">{post.title}</h2>
        )}

        {!isExpanded ? (
          <p className="text-sm text-slate-600 leading-relaxed">
            {previewContent}

            {shouldShowMore && (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setIsExpanded(true);
                }}
                className="font-bold text-[#15803D] hover:text-[#166534] ml-1"
              >
                More
              </button>
            )}
          </p>
        ) : (
          <div className="text-sm text-slate-600 leading-relaxed">
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{
                __html: post.content || "",
              }}
            />

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setIsExpanded(false);
              }}
              className="font-bold text-[#15803D] hover:text-[#166534] mt-1"
            >
              Less
            </button>
          </div>
        )}
      </div>

      {/* ==================================================
          TAGS
      ================================================== */}

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-bold text-[#15803D] bg-[#F0FDF4] border border-[#DCFCE7] px-2.5 py-0.5 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* ==================================================
          MEDIA
      ================================================== */}

      {media.length > 0 && (
        <div onClick={handlePostClick} className="cursor-pointer">
          {/* ==================================================
              ONE MEDIA
          ================================================== */}

          {media.length === 1 && firstMedia && (
            <div className="relative rounded-2xl overflow-hidden bg-slate-900">
              {firstMedia.type === "video" ? (
                <>
                  <video
                    src={firstMedia.url}
                    controls
                    onClick={(event) => event.stopPropagation()}
                    className="w-full max-h-[500px] object-cover"
                  />

                  <div className="absolute top-3 left-3 pointer-events-none">
                    <span className="inline-flex items-center gap-1 bg-black/70 text-white text-[9px] font-bold px-2 py-1 rounded">
                      <Play className="w-2.5 h-2.5 fill-white" />
                      Video
                    </span>
                  </div>
                </>
              ) : (
                <img
                  src={firstMedia.url}
                  alt={post.title || "Travel"}
                  className="w-full max-h-[500px] object-cover"
                />
              )}
            </div>
          )}

          {/* ==================================================
              TWO MEDIA
          ================================================== */}

          {media.length === 2 && (
            <div className="grid grid-cols-2 gap-2 rounded-2xl overflow-hidden">
              {media.map((item) => (
                <div
                  key={item.key}
                  className="relative h-72 overflow-hidden rounded-xl bg-slate-100"
                >
                  {item.type === "video" ? (
                    <video
                      src={item.url}
                      controls
                      onClick={(event) => event.stopPropagation()}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={item.url}
                      alt="Travel"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ==================================================
              THREE MEDIA
          ================================================== */}

          {media.length === 3 && (
            <div className="grid grid-cols-2 gap-2 rounded-2xl overflow-hidden">
              <div className="row-span-2 h-[380px] rounded-xl overflow-hidden bg-slate-100">
                {media[0].type === "video" ? (
                  <video
                    src={media[0].url}
                    controls
                    onClick={(event) => event.stopPropagation()}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={media[0].url}
                    alt="Travel"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {media.slice(1).map((item) => (
                <div
                  key={item.key}
                  className="h-[188px] rounded-xl overflow-hidden bg-slate-100"
                >
                  {item.type === "video" ? (
                    <video
                      src={item.url}
                      controls
                      onClick={(event) => event.stopPropagation()}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={item.url}
                      alt="Travel"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ==================================================
              FOUR OR MORE MEDIA
          ================================================== */}

          {media.length >= 4 && (
            <div className="grid grid-cols-2 gap-2 rounded-2xl overflow-hidden">
              {media.slice(0, 4).map((item, index) => (
                <div
                  key={item.key}
                  className="relative h-52 overflow-hidden rounded-xl bg-slate-100"
                >
                  {item.type === "video" ? (
                    <video
                      src={item.url}
                      controls
                      onClick={(event) => event.stopPropagation()}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={item.url}
                      alt={`Travel media ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  )}

                  {index === 3 && media.length > 4 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center pointer-events-none">
                      <span className="text-white text-lg font-black">
                        +{media.length - 4}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ==================================================
          ACTIONS
      ================================================== */}

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-6">
          {/* LIKE */}

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onLike(post.id);
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-rose-600"
          >
            <Heart className="w-4 h-4" />0
          </button>

          {/* COMMENTS */}

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();

              alert(`Opening comments for ${post.title || userName}`);
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#15803D]"
          >
            <MessageCircle className="w-4 h-4" />0
          </button>

          {/* SHARE */}

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();

              alert("Sharing link copied to clipboard!");
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* SAVE */}

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onSave(post.id);
          }}
          className="p-1.5 text-slate-400 hover:text-[#15803D]"
        >
          <Bookmark className="w-4 h-4" />
        </button>
      </div>
    </article>
  );
};

export default TripTalesPostCard;
