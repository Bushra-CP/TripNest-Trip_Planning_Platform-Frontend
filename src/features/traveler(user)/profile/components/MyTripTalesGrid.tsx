import { useState, type FormEvent } from "react";
import {
  Grid,
  Image as ImageIcon,
  Layers,
  Search,
  ChevronLeft,
  ChevronRight,
  LoaderCircle,
  Video,
} from "lucide-react";

import type {
  MyPostResponse,
  MyPostsPagination,
  MyPostsQuery,
} from "../../tripTales/types/trip-tales.types";

interface Props {
  posts: MyPostResponse[];
  pagination: MyPostsPagination | null;
  loading: boolean;
  query: MyPostsQuery;
  onQueryChange: (query: MyPostsQuery) => void;
  onPostClick: (post: MyPostResponse) => void;
}

type StatusFilter = "ALL" | "PUBLISHED" | "BLOCKED";

const MyTripTalesGrid = ({
  posts,
  pagination,
  loading,
  query,
  onQueryChange,
  onPostClick,
}: Props) => {
  const [search, setSearch] = useState(query.search ?? "");
  const [status, setStatus] = useState<StatusFilter>(query.status ?? "ALL");

  // Search posts
  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextQuery: MyPostsQuery = {
      page: 1,
      limit: query.limit ?? 10,
      sort: query.sort ?? "newest",
      ...(search.trim() ? { search: search.trim() } : {}),
      ...(status !== "ALL" ? { status } : {}),
    };

    onQueryChange(nextQuery);
  };

  // Filter posts by status
  const handleStatusChange = (nextStatus: StatusFilter) => {
    setStatus(nextStatus);

    const nextQuery: MyPostsQuery = {
      page: 1,
      limit: query.limit ?? 10,
      sort: query.sort ?? "newest",
      ...(search.trim() ? { search: search.trim() } : {}),
      ...(nextStatus !== "ALL" ? { status: nextStatus } : {}),
    };

    onQueryChange(nextQuery);
  };

  // Sort posts
  const handleSortChange = (sort: "newest" | "oldest") => {
    onQueryChange({
      ...query,
      page: 1,
      sort,
    });
  };

  // Pagination
  const handlePageChange = (page: number) => {
    if (!pagination) return;

    if (page < 1 || page > pagination.totalPages) return;

    onQueryChange({
      ...query,
      page,
    });
  };

  const tabs: {
    id: StatusFilter;
    label: string;
  }[] = [
    { id: "ALL", label: "All Posts" },
    { id: "PUBLISHED", label: "Published" },
    { id: "BLOCKED", label: "Blocked" },
  ];

  const getCoverImage = (post: MyPostResponse) => {
    return post.media[0]?.url;
  };

  const getStatusStyles = (postStatus: MyPostResponse["status"]) => {
    return postStatus === "PUBLISHED"
      ? "bg-emerald-500 text-white"
      : "bg-red-600 text-white";
  };

  return (
    <section>
      {/* Filters and Search */}
      <div className="mb-5 space-y-4 border-b border-[#E2E8F0] pb-4">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          {/* Status Tabs */}
          <div className="flex gap-4 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleStatusChange(tab.id)}
                className={`flex shrink-0 items-center gap-2 border-b-2 py-3 text-xs font-bold transition-colors ${
                  status === tab.id
                    ? "border-[#15803D] text-[#15803D]"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                {tab.id === "ALL" ? (
                  <Grid className="h-4 w-4" />
                ) : (
                  <ImageIcon className="h-4 w-4" />
                )}

                {tab.label}
              </button>
            ))}
          </div>

          {/* Sorting */}
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            Sort:
            <select
              value={query.sort ?? "newest"}
              onChange={(event) =>
                handleSortChange(event.target.value as "newest" | "oldest")
              }
              className="rounded-lg bg-transparent font-bold text-slate-700 outline-none"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </label>
        </div>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="flex flex-col gap-2 sm:flex-row"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by title or destination..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#15803D]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-[#15803D] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#166534] disabled:opacity-50"
          >
            Search
          </button>
        </form>
      </div>

      {/* Results Count */}
      {pagination && (
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs font-semibold text-slate-500">
            {pagination.totalPosts} posts found
          </p>

          <p className="text-xs text-slate-400">
            Page {pagination.currentPage} of {pagination.totalPages}
          </p>
        </div>
      )}

      {/* Loading, Empty State and Posts */}
      {loading ? (
        <div className="flex min-h-64 items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-slate-500">
            <LoaderCircle className="h-8 w-8 animate-spin text-[#15803D]" />
            <p className="text-sm font-semibold">Loading your posts...</p>
          </div>
        </div>
      ) : posts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
          <ImageIcon className="mx-auto mb-3 h-10 w-10 text-slate-300" />

          <h3 className="font-bold text-slate-800">No posts found</h3>

          <p className="mt-1 text-sm text-slate-500">
            Your travel stories will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const coverImage = getCoverImage(post);

            return (
              <button
                key={post.id}
                type="button"
                onClick={() => onPostClick(post)}
                className="group relative aspect-square overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 text-left shadow-sm"
              >
                {/* Cover Image or Video */}
                {coverImage ? (
                  post.media[0]?.type === "video" ? (
                    <video
                      src={coverImage}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      muted
                      playsInline
                    />
                  ) : (
                    <img
                      src={coverImage}
                      alt={post.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-emerald-50">
                    <ImageIcon className="h-12 w-12 text-emerald-200" />
                  </div>
                )}

                {/* Status and Media Count */}
                <div className="absolute inset-x-3 top-3 z-10 flex justify-between">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase backdrop-blur ${getStatusStyles(post.status)}`}
                  >
                    {post.status}
                  </span>

                  {post.media.length > 0 && (
                    <span className="flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-[10px] font-bold text-white">
                      <Layers className="h-3 w-3" />
                      {post.media.length}
                    </span>
                  )}
                </div>

                {/* Hover Content */}
                <div className="absolute inset-0 flex flex-col justify-end bg-slate-950/75 p-5 text-white opacity-0 transition-opacity group-hover:opacity-100">
                  <p className="mb-2 text-right text-[10px] font-bold text-emerald-200">
                    {post.destination}
                  </p>

                  <h3 className="line-clamp-3 text-sm font-black">
                    {post.title}
                  </h3>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/15 px-2 py-1 text-[10px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Video Indicator */}
                {post.media[0]?.type === "video" && (
                  <span className="absolute bottom-3 right-3 rounded-full bg-black/60 p-2 text-white">
                    <Video className="h-4 w-4" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="mt-7 flex items-center justify-center gap-4">
          <button
            type="button"
            disabled={!pagination.hasPreviousPage || loading}
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </button>

          <span className="text-xs font-bold text-slate-600">
            {pagination.currentPage} / {pagination.totalPages}
          </span>

          <button
            type="button"
            disabled={!pagination.hasNextPage || loading}
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </section>
  );
};

export default MyTripTalesGrid;
