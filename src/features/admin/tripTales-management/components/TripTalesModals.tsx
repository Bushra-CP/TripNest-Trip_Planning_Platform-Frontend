import TripTalesContent from "./TripTalesContent";
import {
  CheckCircle2,
  AlertCircle,
  Ban,
  RotateCcw,
  X,
  FileText,
  MapPin,
  AlertTriangle,
  Check,
} from "lucide-react";

import type {
  AdminTripTalesPost,
  AdminModerationTarget,
  ToastMessage,
} from "../types/admin-trip-tales.types";

import { StatusBadge } from "./TripTalesTable";

interface Props {
  viewingPost: AdminTripTalesPost | null;
  setViewingPost: (post: AdminTripTalesPost | null) => void;
  moderationTarget: AdminModerationTarget | null;
  setModerationTarget: (target: AdminModerationTarget | null) => void;
  isProcessing: boolean;
  onConfirmModeration: () => void;
  toastMessage: ToastMessage | null;
  setToastMessage: (message: ToastMessage | null) => void;
}

export default function TripTalesModals({
  viewingPost,
  setViewingPost,
  moderationTarget,
  setModerationTarget,
  isProcessing,
  onConfirmModeration,
  toastMessage,
  setToastMessage,
}: Props) {
  const formatDate = (date: Date | string) => {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "—";

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      {/* View Post Modal */}
      {viewingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-slate-100 flex flex-col">
            <header className="px-6 py-4 border-b border-slate-100 flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-emerald-50 text-[#15803D] shrink-0">
                  <FileText className="w-4 h-4" />
                </div>

                <div className="min-w-0">
                  <h3 className="text-base font-black text-slate-900 tracking-tight">
                    TripTales Inspection
                  </h3>
                  <p className="text-[11px] text-slate-400 font-medium truncate">
                    Post ID:{" "}
                    <span className="font-mono text-slate-600">
                      {viewingPost.id}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <StatusBadge status={viewingPost.status} />
                <button
                  type="button"
                  onClick={() => setViewingPost(null)}
                  aria-label="Close post"
                  className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-700 hover:bg-slate-200 flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Author */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3.5">
                {viewingPost.user.profileImageUrl ? (
                  <img
                    src={viewingPost.user.profileImageUrl}
                    alt={viewingPost.user.fullName}
                    className="w-12 h-12 rounded-full object-cover border border-slate-200"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center">
                    {viewingPost.user.fullName?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}

                <div className="min-w-0">
                  <h4 className="text-sm font-extrabold text-slate-900">
                    {viewingPost.user.fullName || "Unknown user"}
                  </h4>
                  <p className="text-xs text-slate-500">
                    Submitted on {formatDate(viewingPost.createdAt)}
                  </p>
                </div>
              </div>

              {/* Title and Destination */}
              <div className="space-y-2">
                {viewingPost.destination && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0FDF4] border border-[#DCFCE7] text-[#15803D] text-[11px] font-black uppercase tracking-wider">
                    <MapPin className="w-3.5 h-3.5" />
                    {viewingPost.destination}
                  </span>
                )}

                <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-snug">
                  {viewingPost.title}
                </h2>
              </div>

              {/* Content */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 space-y-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Content
                </p>

                <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line break-words">
                  <TripTalesContent
                    content={viewingPost.content}
                    className="text-sm text-slate-700"
                  />
                </div>
              </div>

              {/* Tags */}
              {viewingPost.tags.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">
                    Tags
                  </h4>

                  <div className="flex flex-wrap gap-2">
                    {viewingPost.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Media */}
              {viewingPost.media.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">
                    Attached Media ({viewingPost.media.length})
                  </h4>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {viewingPost.media.map((media) => (
                      <div
                        key={media.key}
                        className="rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 border border-slate-200"
                      >
                        {media.type === "video" ? (
                          <video
                            src={media.url}
                            controls
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img
                            src={media.url}
                            alt={viewingPost.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Blocked Notice */}
              {viewingPost.status === "BLOCKED" && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-0.5">
                    <p className="font-extrabold text-rose-900">
                      This post is blocked
                    </p>
                    <p className="text-rose-700 leading-relaxed">
                      This post is currently hidden from the public feed.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <footer className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setViewingPost(null)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-white"
              >
                Close
              </button>

              {viewingPost.status === "BLOCKED" ? (
                <button
                  type="button"
                  onClick={() =>
                    setModerationTarget({
                      post: viewingPost,
                      action: "unblock",
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold"
                >
                  <RotateCcw className="w-4 h-4" />
                  Unblock Post
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    setModerationTarget({
                      post: viewingPost,
                      action: "block",
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
                >
                  <Ban className="w-4 h-4" />
                  Block Post
                </button>
              )}
            </footer>
          </div>
        </div>
      )}

      {/* Block / Unblock Confirmation */}
      {moderationTarget && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-slate-100">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto ${
                moderationTarget.action === "block"
                  ? "bg-rose-50 text-rose-600 border border-rose-100"
                  : "bg-emerald-50 text-[#15803D] border border-emerald-100"
              }`}
            >
              {moderationTarget.action === "block" ? (
                <AlertTriangle className="w-6 h-6" />
              ) : (
                <CheckCircle2 className="w-6 h-6" />
              )}
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="text-lg font-black text-slate-900 tracking-tight">
                {moderationTarget.action === "block"
                  ? "Block this TripTales post?"
                  : "Unblock this TripTales post?"}
              </h3>

              <p className="text-xs text-slate-500 leading-relaxed">
                {moderationTarget.action === "block"
                  ? "This post will be hidden from the public feed."
                  : "This post will become visible to travelers again."}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
              <p className="font-extrabold text-slate-900 break-words">
                {moderationTarget.post.title}
              </p>
              <p className="text-[11px] text-slate-500">
                By {moderationTarget.post.user.fullName || "Unknown user"}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                type="button"
                disabled={isProcessing}
                onClick={() => setModerationTarget(null)}
                className="py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isProcessing}
                onClick={onConfirmModeration}
                className={`py-2.5 rounded-xl text-white text-xs font-bold disabled:opacity-50 ${
                  moderationTarget.action === "block"
                    ? "bg-rose-600 hover:bg-rose-700"
                    : "bg-[#15803D] hover:bg-[#166534]"
                }`}
              >
                {isProcessing
                  ? "Updating..."
                  : moderationTarget.action === "block"
                    ? "Confirm Block"
                    : "Confirm Unblock"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[70] bg-slate-900 text-white px-5 py-4 rounded-2xl shadow-2xl border border-slate-800 flex items-start gap-3.5 max-w-sm">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
              toastMessage.type === "error"
                ? "bg-rose-500/20 text-rose-400"
                : toastMessage.type === "warning"
                  ? "bg-amber-500/20 text-amber-400"
                  : "bg-emerald-500/20 text-emerald-400"
            }`}
          >
            {toastMessage.type === "error" ||
            toastMessage.type === "warning" ? (
              <AlertCircle className="w-4 h-4" />
            ) : (
              <Check className="w-4 h-4" />
            )}
          </div>

          <div className="text-xs space-y-0.5">
            <p className="font-extrabold text-white">{toastMessage.title}</p>
            <p className="text-slate-300 leading-relaxed">
              {toastMessage.description}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setToastMessage(null)}
            aria-label="Close notification"
            className="text-slate-500 hover:text-white ml-auto"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </>
  );
}
