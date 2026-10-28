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
  TripTalesItem,
  ModerationTarget,
  ToastMessage,
} from "../types/types";
import { StatusBadge } from "./TripTalesTable";

interface Props {
  viewingPost: TripTalesItem | null;
  setViewingPost: (post: TripTalesItem | null) => void;
  moderationTarget: ModerationTarget | null;
  setModerationTarget: (target: ModerationTarget | null) => void;
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
  return (
    <>
      {/* -------------------- 6. VIEW POST MODAL -------------------- */}
      {viewingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-slate-100 flex flex-col animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <header className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
                    viewingPost.type === "Blog"
                      ? "bg-indigo-50 text-indigo-700"
                      : "bg-emerald-50 text-[#15803D]"
                  }`}
                >
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 tracking-tight">
                    TripTales Inspection &bull; {viewingPost.type}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-medium">
                    Story ID:{" "}
                    <span className="font-mono text-slate-600">
                      {viewingPost.id}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <StatusBadge status={viewingPost.status} />
                <button
                  type="button"
                  onClick={() => setViewingPost(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-700 hover:bg-slate-200 flex items-center justify-center transition-colors ml-2"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </header>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Author Overview Banner */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  {viewingPost.author.avatar ? (
                    <img
                      src={viewingPost.author.avatar}
                      alt={viewingPost.author.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-[#DCFCE7] border border-[#15803D]/20 shadow-xs"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-sm">
                      {viewingPost.author.initials || "TB"}
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-extrabold text-slate-900">
                        {viewingPost.author.name}
                      </h4>
                      {viewingPost.author.isVerified && (
                        <span className="text-[10px] font-bold text-[#15803D] bg-[#DCFCE7] px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-[#15803D]" />
                          Verified Explorer
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 font-medium">
                      {viewingPost.author.username} &bull; Joined{" "}
                      {viewingPost.author.joinedDate || "Oct 2023"}
                    </p>
                  </div>
                </div>

                <div className="text-right text-xs">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">
                    Submitted On
                  </span>
                  <span className="font-bold text-slate-800">
                    {viewingPost.submittedOn}
                  </span>
                </div>
              </div>

              {/* Story Title & Destination */}
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

              {/* Article Content Display */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Complete Content Text
                </p>
                <div className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal whitespace-pre-line">
                  {viewingPost.fullContent}
                </div>
              </div>

              {/* Media Attachments Gallery */}
              {viewingPost.media.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">
                      Attached Media ({viewingPost.media.length})
                    </h4>
                    <span className="text-[11px] text-slate-400 font-medium">
                      High-resolution photographic attachments
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {viewingPost.media.map((img, idx) => (
                      <div
                        key={idx}
                        className="group relative rounded-2xl overflow-hidden aspect-4/3 bg-slate-100 border border-slate-200 shadow-2xs"
                      >
                        <img
                          src={img.url}
                          alt={img.caption || `Media ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {img.caption && (
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2 opacity-90">
                            <span className="text-white text-[10px] font-bold line-clamp-1">
                              {img.caption}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Blocked Notice */}
              {viewingPost.status === "Blocked" && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-0.5">
                    <p className="font-extrabold text-rose-900">
                      Story Currently Blocked
                    </p>
                    <p className="text-rose-700 leading-relaxed font-medium">
                      Reason:{" "}
                      {viewingPost.blockReason ||
                        "Violated community spam or safety guidelines."}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Actions Footer */}
            <footer className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setViewingPost(null)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-white transition-colors"
              >
                Close Inspection
              </button>

              <div className="flex items-center gap-2">
                {viewingPost.status === "Blocked" ? (
                  <button
                    type="button"
                    onClick={() => {
                      setModerationTarget({
                        post: viewingPost,
                        action: "unblock",
                      });
                    }}
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold shadow-md shadow-[#15803D]/25 transition-all active:scale-95"
                  >
                    <RotateCcw className="w-4 h-4 stroke-[2.5]" />
                    <span>Unblock Post</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setModerationTarget({
                        post: viewingPost,
                        action: "block",
                      });
                    }}
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-600/20 transition-all active:scale-95"
                  >
                    <Ban className="w-4 h-4 stroke-[2.5]" />
                    <span>Block Post</span>
                  </button>
                )}
              </div>
            </footer>
          </div>
        </div>
      )}

      {/* -------------------- 7. CONFIRMATION DIALOG -------------------- */}
      {moderationTarget && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-150">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto shadow-sm ${
                moderationTarget.action === "block"
                  ? "bg-rose-50 text-rose-600 border border-rose-100"
                  : "bg-emerald-50 text-[#15803D] border border-emerald-100"
              }`}
            >
              {moderationTarget.action === "block" ? (
                <AlertTriangle className="w-6 h-6 stroke-[2]" />
              ) : (
                <CheckCircle2 className="w-6 h-6 stroke-[2]" />
              )}
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="text-lg font-black text-slate-900 tracking-tight">
                {moderationTarget.action === "block"
                  ? "Block this TripTales story?"
                  : "Restore and Unblock story?"}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                {moderationTarget.action === "block"
                  ? "This story will be immediately hidden from the public feed, search results, and traveler recommendations. This action is completely reversible."
                  : "This story will be reinstated and made visible again to all travelers across TripNest feeds and AI itinerary references."}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
              <p className="font-extrabold text-slate-900 truncate">
                {moderationTarget.post.title}
              </p>
              <p className="text-[11px] text-slate-400 font-medium">
                By {moderationTarget.post.author.name} (
                {moderationTarget.post.author.username}) &bull;{" "}
                {moderationTarget.post.type}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                type="button"
                disabled={isProcessing}
                onClick={() => setModerationTarget(null)}
                className="py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isProcessing}
                onClick={onConfirmModeration}
                className={`py-2.5 rounded-xl text-white text-xs font-bold shadow-md transition-all active:scale-95 disabled:opacity-50 ${
                  moderationTarget.action === "block"
                    ? "bg-rose-600 hover:bg-rose-700 shadow-rose-600/25"
                    : "bg-[#15803D] hover:bg-[#166534] shadow-[#15803D]/25"
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

      {/* -------------------- 8. TOAST NOTIFICATION -------------------- */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-70 bg-slate-900 text-white px-5 py-4 rounded-2xl shadow-2xl border border-slate-800 flex items-start gap-3.5 animate-in slide-in-from-bottom-5 duration-300 max-w-sm">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
              toastMessage.type === "warning"
                ? "bg-rose-500/20 text-rose-400"
                : "bg-emerald-500/20 text-emerald-400"
            }`}
          >
            {toastMessage.type === "warning" ? (
              <AlertCircle className="w-4 h-4" />
            ) : (
              <Check className="w-4 h-4" />
            )}
          </div>
          <div className="text-xs space-y-0.5">
            <p className="font-extrabold text-white">{toastMessage.title}</p>
            <p className="text-slate-300 font-medium leading-relaxed">
              {toastMessage.description}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-slate-500 hover:text-white ml-auto"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </>
  );
}
