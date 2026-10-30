import { useState } from "react";
import {
  X,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Edit3,
  Trash2,
  Image as ImageIcon,
  CalendarDays,
  Heart,
} from "lucide-react";

import type { MyPostResponse } from "../../tripTales/types/trip-tales.types";

import TripTalesContent from "@/features/admin/tripTales-management/components/TripTalesContent";

import { useTripTalesLikes } from "../../tripTales/hooks/useTripTalesLikes";
import LikesModal from "../../tripTales/components/trip-tales/LikesModal";

interface Props {
  post: MyPostResponse;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const TripTalesDetailsModal = ({ post, onClose, onEdit, onDelete }: Props) => {
  const [mediaIndex, setMediaIndex] = useState(0);
  const [isLikesOpen, setIsLikesOpen] = useState(false);

  // ==========================================
  // LIKES
  // ==========================================

  const {
    likes,
    pagination,
    likesLoading,
    error: likesError,
    openLikes,
    changeLikesPage,
    closeLikes,
  } = useTripTalesLikes();

  const handleShowLikes = async () => {
    setIsLikesOpen(true);

    try {
      await openLikes(post.id, 1);
    } catch {
      // The error is displayed inside LikesModal.
    }
  };

  const handleCloseLikes = () => {
    setIsLikesOpen(false);
    closeLikes();
  };

  // ==========================================
  // MEDIA
  // ==========================================

  const activeMedia = post.media[mediaIndex];

  const previous = () => {
    setMediaIndex(
      (index) => (index - 1 + post.media.length) % post.media.length,
    );
  };

  const next = () => {
    setMediaIndex((index) => (index + 1) % post.media.length);
  };

  // ==========================================
  // DATE
  // ==========================================

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="post-title"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
        className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/70 p-3 backdrop-blur-sm sm:p-6"
      >
        <div className="flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
          {/* ================================== */}
          {/* HEADER */}
          {/* ================================== */}

          <header className="flex shrink-0 items-center justify-between border-b border-slate-100 px-5 py-4">
            <div>
              <h2 className="font-black text-slate-900">TripTales Details</h2>

              <p className="mt-0.5 text-xs text-slate-400">
                Post ID: {post.id}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onEdit}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold text-slate-700 hover:bg-emerald-50 hover:text-[#15803D]"
              >
                <Edit3 className="h-4 w-4" />
                Edit
              </button>

              <button
                type="button"
                onClick={onDelete}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close details"
                className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </header>

          {/* ================================== */}
          {/* CONTENT */}
          {/* ================================== */}

          <div className="grid min-h-0 flex-1 grid-cols-1 overflow-y-auto lg:grid-cols-2">
            {/* ================================== */}
            {/* MEDIA SECTION */}
            {/* ================================== */}

            <div className="relative flex min-h-[280px] items-center justify-center bg-slate-950 lg:min-h-[560px]">
              {activeMedia ? (
                activeMedia.type === "video" ? (
                  <video
                    key={activeMedia.key}
                    src={activeMedia.url}
                    controls
                    playsInline
                    className="max-h-[560px] w-full"
                  />
                ) : (
                  <img
                    src={activeMedia.url}
                    alt={post.title}
                    className="max-h-[560px] w-full object-contain"
                  />
                )
              ) : (
                <div className="text-center text-slate-400">
                  <ImageIcon className="mx-auto mb-2 h-10 w-10" />
                  Text-only TripTale
                </div>
              )}

              {/* MEDIA NAVIGATION */}

              {post.media.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={previous}
                    aria-label="Previous media"
                    className="absolute left-3 top-1/2 rounded-full bg-black/60 p-2 text-white hover:bg-black/80"
                  >
                    <ChevronLeft />
                  </button>

                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next media"
                    className="absolute right-3 top-1/2 rounded-full bg-black/60 p-2 text-white hover:bg-black/80"
                  >
                    <ChevronRight />
                  </button>

                  <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
                    {mediaIndex + 1} / {post.media.length}
                  </span>
                </>
              )}
            </div>

            {/* ================================== */}
            {/* POST INFORMATION */}
            {/* ================================== */}

            <div className="flex min-h-0 flex-col">
              <div className="flex-1 space-y-5 overflow-y-auto p-5 sm:p-7">
                {/* DESTINATION AND STATUS */}

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-[#15803D]">
                    <MapPin className="h-3.5 w-3.5" />
                    {post.destination}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                      post.status === "PUBLISHED"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    {post.status}
                  </span>
                </div>

                {/* AUTHOR */}

                <div className="flex items-center gap-3">
                  {post.user.profileImageUrl ? (
                    <img
                      src={post.user.profileImageUrl}
                      alt={post.user.fullName}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700">
                      {post.user.fullName.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      {post.user.fullName}
                    </p>

                    <p className="flex items-center gap-1 text-xs text-slate-400">
                      <CalendarDays className="h-3 w-3" />
                      {formattedDate}
                    </p>
                  </div>
                </div>

                {/* TITLE */}

                <h1
                  id="post-title"
                  className="text-xl font-black leading-tight text-slate-900 sm:text-2xl"
                >
                  {post.title}
                </h1>

                {/* POST CONTENT */}

                <div className="text-sm leading-7 text-slate-600">
                  <TripTalesContent content={post.content} />
                </div>

                {/* TAGS */}

                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* ================================== */}
                {/* LIKES COUNT - CLICK TO VIEW USERS */}
                {/* ================================== */}

                <button
                  type="button"
                  onClick={handleShowLikes}
                  className="flex w-full items-center gap-3 border-t border-slate-100 pt-4 text-left transition hover:bg-rose-50/50"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-50">
                    <Heart className="h-5 w-5 fill-rose-500 text-rose-500" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-slate-800">
                      {post.likesCount}{" "}
                      {post.likesCount === 1 ? "Like" : "Likes"}
                    </p>
                  </div>

                  <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />
                </button>

                {/* MEDIA INFORMATION */}

                {post.media.length > 0 && (
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <ImageIcon className="h-4 w-4" />
                    {post.media.length} media attachment(s)
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================================== */}
      {/* LIKES USERS MODAL */}
      {/* ================================== */}

      <LikesModal
        isOpen={isLikesOpen}
        likes={likes}
        pagination={pagination}
        loading={likesLoading}
        error={likesError}
        onClose={handleCloseLikes}
        onPageChange={(page) => {
          void changeLikesPage(post.id, page);
        }}
      />
    </>
  );
};

export default TripTalesDetailsModal;
