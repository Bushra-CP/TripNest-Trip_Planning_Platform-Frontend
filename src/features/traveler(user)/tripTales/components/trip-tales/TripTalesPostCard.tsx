import React, { useEffect, useState } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  CheckCircle2,
  MapPin,
} from "lucide-react";
import { toast } from "sonner";

import type { CreatePostResponse } from "../../types/trip-tales.types";
import { useTripTalesLikes } from "../../hooks/useTripTalesLikes";
import LikesModal from "./LikesModal";

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
  const [isLikesOpen, setIsLikesOpen] = useState(false);

  const {
    postLikes,
    initializeLikes,
    toggleLike,
    likes,
    pagination,
    likesLoading,
    error,
    openLikes,
    changeLikesPage,
    closeLikes,
    toggleLoading,
  } = useTripTalesLikes();

  const currentLike = postLikes[post.id];

  const likesCount = currentLike?.likesCount ?? post.likesCount ?? 0;

  const isLiked =
    currentLike?.isLikedByCurrentUser ?? post.isLikedByCurrentUser ?? false;

  useEffect(() => {
    initializeLikes(
      post.id,
      post.likesCount ?? 0,
      post.isLikedByCurrentUser ?? false,
    );
  }, [post.id, post.likesCount, post.isLikedByCurrentUser, initializeLikes]);

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

  const handlePostClick = () => onPostClick(post.id);

  const handleLike = async () => {
    if (toggleLoading) return;

    try {
      await toggleLike(post.id, isLiked);
      onLike(post.id);
    } catch (error) {
      toast.error(typeof error === "string" ? error : "Unable to update like.");
    }
  };

  const handleOpenLikes = async () => {
    setIsLikesOpen(true);
    await openLikes(post.id, 1);
  };

  const handleCloseLikes = () => {
    setIsLikesOpen(false);
    closeLikes();
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/trip-tales/posts/${post.id}`,
      );
      toast.success("Post link copied!");
    } catch {
      toast.error("Unable to copy post link.");
    }
  };

  return (
    <>
      <article className="space-y-5 overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
        {/* AUTHOR */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {profileImageUrl ? (
              <img
                src={profileImageUrl}
                alt={userName}
                className="h-10 w-10 rounded-full border border-slate-200 object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                {userName.charAt(0).toUpperCase()}
              </div>
            )}

            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-extrabold">{userName}</h4>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#DCFCE7] px-2 py-0.5 text-[10px] font-bold text-[#15803D]">
                  <CheckCircle2 className="h-3 w-3" />
                  Traveler
                </span>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                {formattedDate && <span>{formattedDate}</span>}
                {formattedDate && post.destination && <span>•</span>}
                {post.destination && (
                  <span className="inline-flex items-center gap-0.5 text-slate-500">
                    <MapPin className="h-3 w-3 text-[#EA580C]" />
                    {post.destination}
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={(event) => event.stopPropagation()}
            className="p-1 text-slate-400 hover:text-slate-600"
            aria-label="More post options"
          >
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="cursor-pointer space-y-1" onClick={handlePostClick}>
          {post.title && (
            <h2 className="text-lg font-black text-slate-900">{post.title}</h2>
          )}

          {!isExpanded ? (
            <p className="text-sm leading-relaxed text-slate-600">
              {previewContent}
              {shouldShowMore && (
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    setIsExpanded(true);
                  }}
                  className="ml-1 font-bold text-[#15803D] hover:text-[#166534]"
                >
                  More
                </button>
              )}
            </p>
          ) : (
            <div className="text-sm leading-relaxed text-slate-600">
              <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content || "" }}
              />
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setIsExpanded(false);
                }}
                className="mt-1 font-bold text-[#15803D] hover:text-[#166534]"
              >
                Less
              </button>
            </div>
          )}
        </div>

        {/* TAGS */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-[#DCFCE7] bg-[#F0FDF4] px-2.5 py-0.5 text-[11px] font-bold text-[#15803D]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* MEDIA */}
        {media.length > 0 && (
          <div onClick={handlePostClick} className="cursor-pointer">
            {media.length === 1 && firstMedia && (
              <div className="relative overflow-hidden rounded-2xl bg-slate-900">
                {firstMedia.type === "video" ? (
                  <video
                    src={firstMedia.url}
                    controls
                    onClick={(event) => event.stopPropagation()}
                    className="max-h-[500px] w-full object-cover"
                  />
                ) : (
                  <img
                    src={firstMedia.url}
                    alt={post.title || "Travel"}
                    className="max-h-[500px] w-full object-cover"
                  />
                )}
              </div>
            )}

            {media.length > 1 && (
              <div className="grid grid-cols-2 gap-2 overflow-hidden rounded-2xl">
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
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <img
                        src={item.url}
                        alt={`Travel media ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    )}

                    {index === 3 && media.length > 4 && (
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/50">
                        <span className="text-lg font-black text-white">
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

        {/* ACTIONS */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-3">
          <div className="flex items-center gap-6">
            <div className="inline-flex items-center gap-1.5">
              <button
                type="button"
                disabled={toggleLoading}
                onClick={(event) => {
                  event.stopPropagation();
                  void handleLike();
                }}
                aria-label={isLiked ? "Unlike post" : "Like post"}
                className={`inline-flex items-center gap-1.5 text-xs font-bold transition-colors disabled:opacity-50 ${
                  isLiked
                    ? "text-rose-600"
                    : "text-slate-500 hover:text-rose-600"
                }`}
              >
                <Heart
                  className={`h-4 w-4 ${
                    isLiked ? "fill-rose-600 stroke-rose-600" : ""
                  }`}
                />
              </button>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  void handleOpenLikes();
                }}
                className="text-xs font-bold text-slate-500 hover:text-rose-600"
              >
                {likesCount.toLocaleString()}
              </button>
            </div>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                handlePostClick();
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#15803D]"
            >
              <MessageCircle className="h-4 w-4" />
              Comments
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                void handleShare();
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onSave(post.id);
            }}
            aria-label="Save post"
            className="p-1.5 text-slate-400 hover:text-[#15803D]"
          >
            <Bookmark className="h-4 w-4" />
          </button>
        </div>
      </article>

      <LikesModal
        isOpen={isLikesOpen}
        likes={likes}
        pagination={pagination}
        loading={likesLoading}
        error={error}
        onClose={handleCloseLikes}
        onPageChange={(page) => void changeLikesPage(post.id, page)}
      />
    </>
  );
};

export default TripTalesPostCard;
