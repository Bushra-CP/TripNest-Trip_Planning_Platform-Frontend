import TripTalesContent from "./TripTalesContent";
import {
  Search,
  RotateCcw,
  CheckCircle2,
  Ban,
  Eye,
  Image as ImageIcon,
} from "lucide-react";

import type {
  AdminTripTalesPost,
  AdminPostStatus,
} from "../types/admin-trip-tales.types";

interface Props {
  posts: AdminTripTalesPost[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onViewPost: (post: AdminTripTalesPost) => void;
  onModeration: (target: {
    post: AdminTripTalesPost;
    action: "block" | "unblock";
  }) => void;
  onPageChange: (page: number) => void;
  onClearFilters: () => void;
}

export default function TripTalesTable({
  posts,
  loading,
  currentPage,
  totalPages,
  totalPosts,
  hasNextPage,
  hasPreviousPage,
  onViewPost,
  onModeration,
  onPageChange,
  onClearFilters,
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
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs overflow-hidden">
      {loading ? (
        <div className="py-20 text-center text-sm font-semibold text-slate-500">
          Loading TripTales...
        </div>
      ) : posts.length === 0 ? (
        <div className="py-20 px-6 text-center flex flex-col items-center justify-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
            <Search className="w-7 h-7" />
          </div>

          <h3 className="text-base font-extrabold text-slate-900">
            No matching TripTales stories
          </h3>

          <p className="text-xs text-slate-500 max-w-sm">
            Try another search term or clear your filters.
          </p>

          <button
            type="button"
            onClick={onClearFilters}
            className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E2E8F0] bg-slate-50/70 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-6 min-w-[320px]">Content</th>
                <th className="py-3.5 px-6 min-w-[190px]">Author</th>
                <th className="py-3.5 px-6">Destination</th>
                <th className="py-3.5 px-6">Submitted On</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E2E8F0] text-xs">
              {posts.map((post) => {
                const isBlocked = post.status === "BLOCKED";
                const authorName = post.user.fullName || "Unknown user";
                const firstMedia = post.media?.[0];

                return (
                  <tr
                    key={post.id}
                    className={`hover:bg-slate-50/70 transition-colors group ${
                      isBlocked ? "bg-rose-50/20" : ""
                    }`}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-start gap-3.5">
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center">
                          {firstMedia?.type === "image" ? (
                            <img
                              src={firstMedia.url}
                              alt={post.title}
                              className="w-full h-full object-cover"
                            />
                          ) : firstMedia?.type === "video" ? (
                            <video
                              src={firstMedia.url}
                              className="w-full h-full object-cover"
                              muted
                            />
                          ) : (
                            <ImageIcon className="w-6 h-6 text-slate-300" />
                          )}
                        </div>

                        <div className="min-w-0 flex-1 space-y-1">
                          <button
                            type="button"
                            onClick={() => onViewPost(post)}
                            className="block max-w-sm truncate text-left font-extrabold text-slate-900 group-hover:text-[#15803D] transition-colors"
                          >
                            {post.title}
                          </button>

                          <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                            <TripTalesContent
                              content={post.content}
                              className="line-clamp-2 text-sm text-slate-500"
                            />
                          </p>

                          {post.tags.length > 0 && (
                            <p className="text-[10px] text-slate-400 truncate">
                              {post.tags.map((tag) => `#${tag}`).join(" ")}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2.5">
                        {post.user.profileImageUrl ? (
                          <img
                            src={post.user.profileImageUrl}
                            alt={authorName}
                            className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-extrabold flex items-center justify-center shrink-0 border border-slate-200">
                            {authorName.charAt(0).toUpperCase()}
                          </div>
                        )}

                        <div className="min-w-0">
                          <p className="font-extrabold text-slate-900 truncate">
                            {authorName}
                          </p>
                          <p className="text-[11px] text-slate-400 truncate">
                            {post.user.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-slate-600 font-semibold">
                      {post.destination || "—"}
                    </td>

                    <td className="py-4 px-6 text-slate-600 font-semibold text-[11px] whitespace-nowrap">
                      {formatDate(post.createdAt)}
                    </td>

                    <td className="py-4 px-6">
                      <StatusBadge status={post.status} />
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => onViewPost(post)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all"
                        >
                          <Eye className="w-3.5 h-3.5 text-slate-400" />
                          View
                        </button>

                        {isBlocked ? (
                          <button
                            type="button"
                            onClick={() =>
                              onModeration({ post, action: "unblock" })
                            }
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            Unblock
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              onModeration({ post, action: "block" })
                            }
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-rose-200 bg-white hover:bg-rose-50 text-rose-700 text-xs font-bold"
                          >
                            <Ban className="w-3.5 h-3.5 text-rose-500" />
                            Block
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {!loading && posts.length > 0 && (
        <div className="px-6 py-4 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
          <p>
            Showing{" "}
            <strong className="text-slate-800">
              {(currentPage - 1) * 10 + 1} to{" "}
              {Math.min(
                currentPage * 10,
                Number.isFinite(totalPosts) ? totalPosts : posts.length,
              )}
            </strong>{" "}
            of{" "}
            <strong className="text-slate-800">
              {Number.isFinite(totalPosts) ? totalPosts : posts.length}
            </strong>{" "}
            posts
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={!hasPreviousPage}
              onClick={() => onPageChange(currentPage - 1)}
              className="px-3 py-2 rounded-xl border border-[#E2E8F0] hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed font-bold"
            >
              Previous
            </button>

            <span className="px-3 py-2 rounded-xl bg-[#15803D] text-white font-black">
              {currentPage} /{" "}
              {Math.max(Number.isFinite(totalPages) ? totalPages : 1, 1)}
            </span>

            <button
              type="button"
              disabled={!hasNextPage}
              onClick={() => onPageChange(currentPage + 1)}
              className="px-3 py-2 rounded-xl border border-[#E2E8F0] hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed font-bold"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export const StatusBadge = ({ status }: { status: AdminPostStatus }) => {
  if (status === "BLOCKED") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[11px] font-bold">
        <Ban className="w-3.5 h-3.5 text-rose-600" />
        Blocked
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold">
      <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D]" />
      Published
    </span>
  );
};
