import React from "react";
import {
  Heart,
  X,
  ChevronLeft,
  ChevronRight,
  LoaderCircle,
} from "lucide-react";

import type {
  PostLikeUser,
  PostLikesPagination,
} from "../../types/trip-tales.types";

interface LikesModalProps {
  isOpen: boolean;
  likes: PostLikeUser[];
  pagination: PostLikesPagination | null;
  loading: boolean;
  error: string | null;
  onClose: () => void;
  onPageChange: (page: number) => void;
}

const LikesModal: React.FC<LikesModalProps> = ({
  isOpen,
  likes,
  pagination,
  loading,
  error,
  onClose,
  onPageChange,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="likes-modal-title"
        className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <header className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 fill-rose-500 text-rose-500" />

            <h2
              id="likes-modal-title"
              className="font-extrabold text-slate-900"
            >
              People who liked this post
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close likes"
            className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="max-h-[420px] min-h-40 overflow-y-auto p-4">
          {loading ? (
            <div className="flex min-h-40 items-center justify-center">
              <LoaderCircle className="h-7 w-7 animate-spin text-[#15803D]" />
            </div>
          ) : error ? (
            <div className="py-8 text-center text-sm text-rose-600">
              {error}
            </div>
          ) : likes.length === 0 ? (
            <div className="py-10 text-center">
              <Heart className="mx-auto mb-3 h-9 w-9 text-slate-300" />
              <p className="text-sm font-semibold text-slate-600">
                No likes yet.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {likes.map((user) => (
                <div key={user.userId} className="flex items-center gap-3">
                  {user.profileImageUrl ? (
                    <img
                      src={user.profileImageUrl}
                      alt={user.fullName}
                      className="h-10 w-10 rounded-full border border-slate-200 object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700">
                      {user.fullName?.charAt(0)?.toUpperCase() ?? "T"}
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-slate-800">
                      {user.fullName}
                    </p>

                    <p className="text-xs text-slate-400">
                      {new Date(user.likedAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  <Heart className="h-4 w-4 shrink-0 fill-rose-500 text-rose-500" />
                </div>
              ))}
            </div>
          )}
        </div>

        {pagination && pagination.totalPages > 1 && (
          <footer className="flex items-center justify-between border-t border-slate-100 px-5 py-3">
            <button
              type="button"
              disabled={!pagination.hasPreviousPage || loading}
              onClick={() => onPageChange(pagination.currentPage - 1)}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>

            <span className="text-xs font-semibold text-slate-500">
              {pagination.currentPage} / {pagination.totalPages}
            </span>

            <button
              type="button"
              disabled={!pagination.hasNextPage || loading}
              onClick={() => onPageChange(pagination.currentPage + 1)}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 disabled:opacity-40"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};

export default LikesModal;
