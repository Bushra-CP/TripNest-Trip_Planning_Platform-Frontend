import React, { useEffect, useMemo, useState } from "react";

import CreatePostModal from "../components/trip-tales/CreatePostModal";
import TripTalesHeader from "../components/trip-tales/TripTalesHeader";
import TripTalesPostCard from "../components/trip-tales/TripTalesPostCard";
import TripTalesSidebar from "../components/trip-tales/TripTalesSidebar";

import { useTripTales } from "../hooks/useTripTales";
import { useTripTalesSocket } from "../hooks/useTripTalesSocket";

type FeedFilter = "All" | "Recent" | "Popular" | "Photos" | "Videos";

/* ============================================================
   DUMMY SIDEBAR DATA
============================================================ */

const TRENDING_PLACES = [
  {
    rank: "01",
    name: "#Wayanad",
    stories: "2.8k active stories",
  },
  {
    rank: "02",
    name: "#Varkala",
    stories: "1.9k active stories",
  },
  {
    rank: "03",
    name: "#FortKochi",
    stories: "1.4k active stories",
  },
  {
    rank: "04",
    name: "#Munnar",
    stories: "1.1k active stories",
  },
  {
    rank: "05",
    name: "#Hampi",
    stories: "980 active stories",
  },
];

const TOP_STORYTELLERS = [
  {
    name: "Divya Rao",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    stats: "34 itineraries • 42k saves",
  },
  {
    name: "Kabir Das",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
    stats: "28 itineraries • 31k saves",
  },
  {
    name: "Meera Sen",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
    stats: "19 itineraries • 18k saves",
  },
];
/* ============================================================*/

const PostsFeedPage: React.FC = () => {
  /* ==========================================================
     TRIP TALES
  ========================================================== */

  const {
    posts,
    loading,
    error,
    newPostsAvailable,
    fetchPosts,
    refreshPosts,
    clearNewPosts,
    handlePostClick,
  } = useTripTales();

  useTripTalesSocket();

  /* ==========================================================
     FILTER
  ========================================================== */

  const [activeFilter, setActiveFilter] = useState<FeedFilter>("All");

  /* ==========================================================
     SEARCH
  ========================================================== */

  const [searchQuery, setSearchQuery] = useState("");

  /* ==========================================================
     CREATE POST MODAL
  ========================================================== */

  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  /* ==========================================================
     FETCH POSTS
  ========================================================== */

  useEffect(() => {
    void fetchPosts();

    // Fetch posts when the page is opened.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ==========================================================
     REFRESH NEW POSTS
  ========================================================== */

  const handleRefreshPosts = async () => {
    setSearchQuery("");
    setActiveFilter("All");
    refreshPosts();
    clearNewPosts();
  };

  /* ==========================================================
     LIKE
     
     Backend feature will be implemented later.
  ========================================================== */

  const handleLike = (id: string) => {
    console.log("Like post:", id);
  };

  /* ==========================================================
     SAVE
     
     Backend feature will be implemented later.
  ========================================================== */

  const handleSave = (id: string) => {
    console.log("Save post:", id);
  };

  /* ==========================================================
     FILTER + SEARCH
  ========================================================== */

  const filteredPosts = useMemo(() => {
    let result = [...posts];

    /* ========================================================
       FILTER
    ======================================================== */

    if (activeFilter === "Recent") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    }

    if (activeFilter === "Photos") {
      result = result.filter((post) =>
        post.media?.some((media) => media.type === "image"),
      );
    }

    if (activeFilter === "Videos") {
      result = result.filter((post) =>
        post.media?.some((media) => media.type === "video"),
      );
    }

    /*
      Popular cannot be calculated yet because
      the current backend response does not contain
      likes/comments/popularity data.

      So it currently shows all posts instead of
      inventing popularity numbers.
    */

    /* ========================================================
       SEARCH
    ======================================================== */

    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return result;
    }

    return result.filter((post) => {
      const searchableText = [
        post.title ?? "",
        post.content ?? "",
        post.destination ?? "",
        post.user?.fullName ?? "",
        ...(post.tags ?? []),
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [posts, activeFilter, searchQuery]);

  /* ==========================================================
     RETURN
  ========================================================== */

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-['Plus_Jakarta_Sans',sans-serif] antialiased">
      {/* ======================================================
          HEADER
      ====================================================== */}

      <TripTalesHeader
        activeFilter={activeFilter}
        searchQuery={searchQuery}
        onFilterChange={setActiveFilter}
        onSearchChange={setSearchQuery}
        onCreatePost={() => setIsCreatePostOpen(true)}
      />

      {/* ======================================================
    NEW POSTS NOTIFICATION
====================================================== */}
      {newPostsAvailable && (
        <div className="sticky top-4 z-40 flex justify-center px-4 pt-3">
          <div
            role="button"
            tabIndex={0}
            onClick={handleRefreshPosts}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleRefreshPosts();
              }
            }}
            className="flex w-full max-w-md cursor-pointer items-center gap-3
                 rounded-xl border border-gray-200 bg-white px-4 py-3
                 shadow-lg transition-all duration-200
                 hover:-translate-y-0.5 hover:shadow-xl"
          >
            {/* Notification Icon */}
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              {/* Unread indicator */}
              <span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500" />
            </div>

            {/* Notification Content */}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-900">
                New posts are available!
              </p>

              <p className="mt-0.5 text-xs text-gray-500">
                Tap to see the latest travel stories.
              </p>
            </div>

            {/* Arrow */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 shrink-0 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      )}

      {/* ======================================================
          MAIN
      ====================================================== */}

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ==================================================
              POSTS
          ================================================== */}

          <div className="lg:col-span-8 space-y-6">
            {/* LOADING */}

            {loading && posts.length === 0 && (
              <div className="bg-white rounded-3xl border border-[#E2E8F0] p-10 text-center">
                <p className="text-sm font-bold text-slate-700">
                  Loading posts...
                </p>
              </div>
            )}

            {/* ERROR */}

            {!loading && error && (
              <div className="bg-white rounded-3xl border border-rose-200 p-10 text-center">
                <h3 className="text-sm font-bold text-rose-600">
                  Failed to load posts
                </h3>

                <p className="text-xs text-slate-400 mt-2">{error}</p>

                <button
                  type="button"
                  onClick={() => {
                    void refreshPosts();
                  }}
                  className="mt-4 px-4 py-2 rounded-full bg-[#15803D] text-white text-xs font-bold"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* POSTS */}

            {!loading &&
              !error &&
              filteredPosts.map((post) => (
                <TripTalesPostCard
                  key={post.id}
                  post={post}
                  onLike={handleLike}
                  onSave={handleSave}
                  onPostClick={handlePostClick}
                />
              ))}

            {/* NO POSTS */}

            {!loading && !error && filteredPosts.length === 0 && (
              <div className="bg-white rounded-3xl border border-[#E2E8F0] p-10 text-center">
                <h3 className="text-sm font-bold text-slate-800">
                  No posts found
                </h3>

                <p className="text-xs text-slate-400 mt-2">
                  {posts.length === 0
                    ? "There are no TripTales posts yet."
                    : "Try searching for another destination or topic."}
                </p>
              </div>
            )}
          </div>

          {/* ==================================================
              SIDEBAR
          ================================================== */}

          <TripTalesSidebar
            trendingPlaces={TRENDING_PLACES}
            topStorytellers={TOP_STORYTELLERS}
            followingMap={{}}
            onToggleFollow={() => {}}
          />
        </div>
      </main>

      {/* ======================================================
          CREATE POST MODAL
      ====================================================== */}

      {isCreatePostOpen && (
        <CreatePostModal onClose={() => setIsCreatePostOpen(false)} />
      )}
    </div>
  );
};

export default PostsFeedPage;
