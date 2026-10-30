import { useState } from "react";
import {
  X,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Edit3,
  Trash2,
  Heart,
  MessageCircle,
  Bookmark,
  Image as ImageIcon,
} from "lucide-react";
import type { PostItem } from "../types/my-trip-tales.types";

interface Props {
  post: PostItem;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const TripTalesDetailsModal = ({ post, onClose, onEdit, onDelete }: Props) => {
  const [mediaIndex, setMediaIndex] = useState(0);
  const activeMedia = post.media[mediaIndex];

  const previous = () =>
    setMediaIndex(
      (index) => (index - 1 + post.media.length) % post.media.length,
    );
  const next = () => setMediaIndex((index) => (index + 1) % post.media.length);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="post-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/70 p-3 backdrop-blur-sm sm:p-6"
    >
      <div className="flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        <header className="flex shrink-0 items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <h2 className="font-black text-slate-900">TripTales Details</h2>
            <p className="mt-0.5 text-xs text-slate-400">Post ID: {post.id}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onEdit}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold text-slate-700 hover:bg-emerald-50 hover:text-[#15803D]"
            >
              <Edit3 className="h-4 w-4" /> Edit
            </button>
            <button
              onClick={onDelete}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50"
            >
              <Trash2 className="h-4 w-4" /> Delete
            </button>
            <button
              onClick={onClose}
              aria-label="Close details"
              className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </header>

        <div className="grid min-h-0 flex-1 grid-cols-1 overflow-y-auto lg:grid-cols-2">
          <div className="relative flex min-h-[280px] items-center justify-center bg-slate-950 lg:min-h-[560px]">
            {activeMedia ? (
              activeMedia.type === "video" ? (
                <video
                  key={activeMedia.id}
                  src={activeMedia.url}
                  controls
                  className="max-h-[560px] w-full"
                />
              ) : (
                <img
                  src={activeMedia.url}
                  alt={activeMedia.caption || post.title}
                  className="max-h-[560px] w-full object-contain"
                />
              )
            ) : (
              <div className="text-center text-slate-400">
                <ImageIcon className="mx-auto mb-2 h-10 w-10" />
                Text-only TripTale
              </div>
            )}
            {post.media.length > 1 && (
              <>
                <button
                  onClick={previous}
                  aria-label="Previous media"
                  className="absolute left-3 top-1/2 rounded-full bg-black/60 p-2 text-white"
                >
                  <ChevronLeft />
                </button>
                <button
                  onClick={next}
                  aria-label="Next media"
                  className="absolute right-3 top-1/2 rounded-full bg-black/60 p-2 text-white"
                >
                  <ChevronRight />
                </button>
                <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
                  {mediaIndex + 1} / {post.media.length}
                </span>
              </>
            )}
          </div>

          <div className="flex flex-col">
            <div className="flex-1 space-y-5 overflow-y-auto p-5 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-[#15803D]">
                  <MapPin className="h-3.5 w-3.5" />
                  {post.destination}
                </span>
                <span className="text-xs text-slate-400">
                  {post.createdDate} · {post.readTime}
                </span>
              </div>
              <h1
                id="post-title"
                className="text-xl font-black leading-tight text-slate-900 sm:text-2xl"
              >
                {post.title}
              </h1>
              <p className="font-medium leading-relaxed text-slate-800">
                {post.richContent.leadParagraph}
              </p>
              {post.richContent.quote && (
                <blockquote className="rounded-r-xl border-l-4 border-[#15803D] bg-emerald-50 p-4 italic text-slate-700">
                  {post.richContent.quote}
                </blockquote>
              )}
              {post.richContent.bodyParagraphs.map((paragraph, index) => (
                <p key={index} className="text-sm leading-7 text-slate-600">
                  {paragraph}
                </p>
              ))}
              {post.richContent.trailNotes && (
                <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
                  <h3 className="font-bold text-[#15803D]">
                    Essential Trail Notes
                  </h3>
                  <p>
                    <strong>Permits:</strong>{" "}
                    {post.richContent.trailNotes.permits}
                  </p>
                  <p>
                    <strong>Gear:</strong> {post.richContent.trailNotes.gear}
                  </p>
                  <p>
                    <strong>Leech Defense:</strong>{" "}
                    {post.richContent.trailNotes.leechDefense}
                  </p>
                </div>
              )}
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
            </div>
            <footer className="flex shrink-0 items-center gap-4 border-t border-slate-100 bg-slate-50 px-5 py-4 text-xs font-bold text-slate-600">
              <span className="flex items-center gap-1">
                <Heart className="h-4 w-4 text-rose-500" />
                {post.stats.likes}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                {post.stats.comments}
              </span>
              <span className="flex items-center gap-1">
                <Bookmark className="h-4 w-4" />
                {post.stats.saves}
              </span>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripTalesDetailsModal;
