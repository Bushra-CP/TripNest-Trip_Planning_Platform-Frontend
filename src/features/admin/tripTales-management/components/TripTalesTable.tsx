import {
  MessageSquare,
  Search,
  RotateCcw,
  CheckCircle2,
  Ban,
  Clock,
  Eye,
  Heart,
  Image as ImageIcon,
  AlertTriangle,
  Flag,
} from "lucide-react";
import type { TripTalesItem, ModerationStatus } from "../types/types";

interface Props {
  filteredPosts: TripTalesItem[];
  totalPosts: number;
  onViewPost: (post: TripTalesItem) => void;
  onModeration: (target: {
    post: TripTalesItem;
    action: "block" | "unblock";
  }) => void;
  onClearFilters: () => void;
  onToast: (
    title: string,
    description: string,
    type?: "success" | "warning" | "error",
  ) => void;
}

export default function TripTalesTable({
  filteredPosts,
  totalPosts,
  onViewPost,
  onModeration,
  onClearFilters,
  onToast,
}: Props) {
  return (
    <>
      {/* -------------------- 5. POSTS & BLOGS DIRECTORY TABLE -------------------- */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs overflow-hidden">
        {filteredPosts.length === 0 ? (
          /* Empty State */
          <div className="py-20 px-6 text-center flex flex-col items-center justify-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 shadow-inner">
              <Search className="w-7 h-7 stroke-[1.8]" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
              No matching TripTales stories
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto font-medium leading-relaxed">
              No stories match your search query or active filter tags. Reset
              filters or try searching for another author or keyword.
            </p>
            <button
              type="button"
              onClick={onClearFilters}
              className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E2E8F0] bg-slate-50/70 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-6 min-w-[340px]">Content</th>
                  <th className="py-3.5 px-6 min-w-[200px]">Author</th>
                  <th className="py-3.5 px-6">Type</th>
                  <th className="py-3.5 px-6">Submitted On</th>
                  <th className="py-3.5 px-6">Engagement</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right min-w-[150px]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] text-xs">
                {filteredPosts.map((post) => {
                  const isBlocked = post.status === "Blocked";

                  return (
                    <tr
                      key={post.id}
                      className={`hover:bg-slate-50/70 transition-colors group ${
                        isBlocked ? "bg-rose-50/20" : ""
                      }`}
                    >
                      {/* 1. Content: Thumbnail + Title + Preview */}
                      <td className="py-4 px-6">
                        <div className="flex items-start gap-3.5">
                          {/* Thumbnail preview with image icon fallback */}
                          <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 relative flex items-center justify-center">
                            {post.media.length > 0 ? (
                              <img
                                src={post.media[0].url}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                  (e.target as HTMLElement).style.display =
                                    "none";
                                }}
                              />
                            ) : post.id === "tt-103" ? (
                              <div className="w-full h-full bg-amber-50 flex items-center justify-center text-amber-600">
                                <AlertTriangle className="w-6 h-6 stroke-[1.8]" />
                              </div>
                            ) : (
                              <ImageIcon className="w-6 h-6 text-slate-300" />
                            )}
                          </div>

                          <div className="min-w-0 flex-1 space-y-1">
                            <h4
                              onClick={() => onViewPost(post)}
                              className="font-extrabold text-slate-900 group-hover:text-[#15803D] cursor-pointer transition-colors truncate max-w-sm tracking-tight"
                            >
                              {post.title}
                            </h4>
                            <p className="text-[11px] text-slate-500 line-clamp-1 leading-relaxed font-normal">
                              {post.excerpt}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* 2. Author */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2.5">
                          {post.author.avatar ? (
                            <img
                              src={post.author.avatar}
                              alt={post.author.name}
                              className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-extrabold flex items-center justify-center text-xs shrink-0 border border-slate-200">
                              {post.author.initials || "TB"}
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="font-extrabold text-slate-900 truncate flex items-center gap-1">
                              <span>{post.author.name}</span>
                              {post.author.isVerified && (
                                <CheckCircle2 className="w-3 h-3 text-[#15803D] shrink-0" />
                              )}
                            </p>
                            <p className="text-[11px] text-slate-400 font-medium truncate">
                              {post.author.username}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* 3. Type Badge */}
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            post.type === "Blog"
                              ? "bg-indigo-50 text-indigo-700"
                              : "bg-emerald-50 text-emerald-800"
                          }`}
                        >
                          {post.type}
                        </span>
                      </td>

                      {/* 4. Submitted On */}
                      <td className="py-4 px-6 text-slate-600 font-semibold text-[11px]">
                        {post.submittedOn}
                      </td>

                      {/* 5. Engagement Counts */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3 text-slate-600 text-xs font-semibold">
                          <span className="inline-flex items-center gap-1">
                            <Heart className="w-3.5 h-3.5 text-slate-400" />
                            <span>
                              {post.engagement.likes >= 1000
                                ? `${(post.engagement.likes / 1000).toFixed(1)}k`
                                : post.engagement.likes}
                            </span>
                          </span>
                          {post.engagement.reports ? (
                            <span className="inline-flex items-center gap-1 text-rose-600 font-bold">
                              <Flag className="w-3.5 h-3.5" />
                              <span>{post.engagement.reports} reports</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-slate-500">
                              <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                              <span>{post.engagement.comments}</span>
                            </span>
                          )}
                        </div>
                      </td>

                      {/* 6. Moderation Status Badge */}
                      <td className="py-4 px-6">
                        <StatusBadge status={post.status} />
                      </td>

                      {/* 7. Action Buttons */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* View Action */}
                          <button
                            type="button"
                            onClick={() => onViewPost(post)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-2xs active:scale-95"
                          >
                            <Eye className="w-3.5 h-3.5 text-slate-400" />
                            <span>View</span>
                          </button>

                          {/* Block / Unblock Action */}
                          {isBlocked ? (
                            <button
                              type="button"
                              onClick={() =>
                                onModeration({
                                  post,
                                  action: "unblock",
                                })
                              }
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-all shadow-2xs active:scale-95"
                            >
                              <RotateCcw className="w-3.5 h-3.5 text-emerald-700" />
                              <span>Unblock</span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() =>
                                onModeration({
                                  post,
                                  action: "block",
                                })
                              }
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-rose-200 bg-white hover:bg-rose-50 text-rose-700 text-xs font-bold transition-all shadow-2xs active:scale-95"
                            >
                              <Ban className="w-3.5 h-3.5 text-rose-500" />
                              <span>Block</span>
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

        {/* Pagination Controls Footer */}
        {filteredPosts.length > 0 && (
          <div className="px-6 py-4 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
            <p>
              Showing{" "}
              <strong className="text-slate-800 font-bold">
                1 to {filteredPosts.length}
              </strong>{" "}
              of{" "}
              <strong className="text-slate-800 font-bold">
                {totalPosts.toLocaleString()}
              </strong>{" "}
              entries
            </p>

            <div className="flex items-center gap-1.5">
              <button
                disabled
                className="px-3 py-1.5 rounded-xl border border-[#E2E8F0] hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold text-slate-600 transition-colors"
              >
                Previous
              </button>

              <button className="w-8 h-8 rounded-xl bg-[#15803D] text-white font-black text-xs shadow-xs">
                1
              </button>
              <button
                onClick={() =>
                  onToast("Pagination", "Page 2 loaded (demo mock).", "success")
                }
                className="w-8 h-8 rounded-xl hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors"
              >
                2
              </button>
              <button
                onClick={() =>
                  onToast("Pagination", "Page 3 loaded (demo mock).", "success")
                }
                className="w-8 h-8 rounded-xl hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors"
              >
                3
              </button>
              <span className="px-1 text-slate-400">...</span>
              <button
                onClick={() =>
                  onToast("Pagination", "End of directory reached.", "warning")
                }
                className="w-10 h-8 rounded-xl hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors"
              >
                238
              </button>

              <button
                onClick={() =>
                  onToast("Pagination", "Next page loaded.", "success")
                }
                className="px-3 py-1.5 rounded-xl border border-[#E2E8F0] hover:bg-slate-50 text-xs font-bold text-slate-600 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export const StatusBadge = ({ status }: { status: ModerationStatus }) => {
  switch (status) {
    case "Active":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D]" />
          <span>Active</span>
        </span>
      );
    case "Blocked":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[11px] font-bold">
          <Ban className="w-3.5 h-3.5 text-rose-600" />
          <span>Blocked</span>
        </span>
      );
    case "Pending Review":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[11px] font-bold">
          <Clock className="w-3.5 h-3.5 text-amber-600" />
          <span>Pending Review</span>
        </span>
      );
  }
};
