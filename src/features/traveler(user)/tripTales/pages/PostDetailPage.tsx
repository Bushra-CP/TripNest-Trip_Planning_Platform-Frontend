import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import { useTripTales } from "../hooks/useTripTales";
import { useTripTalesLikes } from "../hooks/useTripTalesLikes";

import TripTalesPostDetailHeader from "../components/trip-tales-post-details.tsx/TripTalesPostDetailHeader";
import PostAuthorHeader from "../components/trip-tales-post-details.tsx/PostAuthorHeader";
import PostContent from "../components/trip-tales-post-details.tsx/PostContent";
import PostMediaGallery from "../components/trip-tales-post-details.tsx/PostMediaGallery";
import PostEngagement from "../components/trip-tales-post-details.tsx/PostEngagement";
import PostComments from "../components/trip-tales-post-details.tsx/PostComments";
import PostDetailSidebar from "../components/trip-tales-post-details.tsx/PostDetailSidebar";
import RelatedPosts from "../components/trip-tales-post-details.tsx/RelatedPosts";
import LikesModal from "../components/trip-tales/LikesModal";

import type { CreatePostResponse } from "../types/trip-tales.types";
import type { CommentItem } from "../types/post-detail.types";

const PostDetailPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

  // TripTales
  const { posts, fetchPostById, fetchPosts } = useTripTales();

  // Likes
  const {
    postLikes,
    initializeLikes,
    toggleLike,
    likes,
    pagination,
    likesLoading,
    error: likesError,
    toggleLoading,
    openLikes,
    changeLikesPage,
    closeLikes,
  } = useTripTalesLikes();

  // Post state
  const [post, setPost] = useState<CreatePostResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // UI state
  const [isSaved, setIsSaved] = useState(false);
  const [isLikesOpen, setIsLikesOpen] = useState(false);

  // Comments state
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<CommentItem[]>([]);

  // Current post likes from Redux
  const currentLike = postId ? postLikes[postId] : undefined;

  const likesCount = currentLike?.likesCount ?? post?.likesCount ?? 0;

  const isLiked =
    currentLike?.isLikedByCurrentUser ?? post?.isLikedByCurrentUser ?? false;

  // --------------------------------------------------
  // Fetch Post By ID
  // --------------------------------------------------

  useEffect(() => {
    // Invalid post ID is handled during rendering.
    if (!postId) return;

    let isActive = true;

    const loadPost = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchPostById(postId);

        if (!isActive) return;

        setPost(data);

        // Initialize the likes state from the backend.
        initializeLikes(
          data.id,
          data.likesCount ?? 0,
          data.isLikedByCurrentUser ?? false,
        );
      } catch (error) {
        console.error("Failed to fetch post:", error);

        if (!isActive) return;

        setPost(null);
        setError("Failed to load this post. Please try again.");
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    void loadPost();

    return () => {
      isActive = false;
    };
  }, [postId, fetchPostById, initializeLikes]);

  // --------------------------------------------------
  // Fetch Posts For Related Posts
  // --------------------------------------------------

  useEffect(() => {
    if (posts.length === 0) {
      void fetchPosts();
    }
  }, [posts.length, fetchPosts]);

  // --------------------------------------------------
  // Toggle Like
  // --------------------------------------------------

  const handleToggleLike = async () => {
    if (!post || toggleLoading) return;

    try {
      await toggleLike(post.id, isLiked);
    } catch (error) {
      toast.error(
        typeof error === "string"
          ? error
          : "Unable to update like. Please try again.",
      );
    }
  };

  // --------------------------------------------------
  // Open Likes List
  // --------------------------------------------------

  const handleShowLikes = async () => {
    if (!post) return;

    setIsLikesOpen(true);

    try {
      await openLikes(post.id, 1);
    } catch {
      // Error is displayed inside LikesModal.
    }
  };

  // --------------------------------------------------
  // Close Likes Modal
  // --------------------------------------------------

  const handleCloseLikes = () => {
    setIsLikesOpen(false);
    closeLikes();
  };

  // --------------------------------------------------
  // Save
  // --------------------------------------------------

  const handleToggleSave = () => {
    setIsSaved((previous) => !previous);
  };

  // --------------------------------------------------
  // Share
  // --------------------------------------------------

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);

      toast.success("Post link copied!");
    } catch (error) {
      console.error("Failed to copy post link:", error);

      toast.error("Unable to copy post link.");
    }
  };

  // --------------------------------------------------
  // Add Comment
  // --------------------------------------------------

  const handleAddComment = (event: React.FormEvent) => {
    event.preventDefault();

    const text = newComment.trim();

    if (!text) return;

    const comment: CommentItem = {
      id: crypto.randomUUID(),
      author: "You",
      avatar: "",
      timeAgo: "Just now",
      text,
      likes: 0,
      isLiked: false,
    };

    setComments((previous) => [...previous, comment]);

    setNewComment("");
  };

  // --------------------------------------------------
  // Comment Like
  // --------------------------------------------------

  const handleCommentLike = (commentId: string) => {
    setComments((previous) =>
      previous.map((comment) => {
        if (comment.id !== commentId) return comment;

        const nextIsLiked = !comment.isLiked;

        return {
          ...comment,
          isLiked: nextIsLiked,
          likes: nextIsLiked
            ? comment.likes + 1
            : Math.max(0, comment.likes - 1),
        };
      }),
    );
  };

  // --------------------------------------------------
  // Invalid Post ID
  // --------------------------------------------------

  if (!postId) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8FAFC] px-6">
        <h2 className="text-xl font-black text-slate-900">Invalid Post</h2>

        <p className="mt-2 text-center text-sm text-slate-500">
          The requested post ID is invalid.
        </p>

        <button
          type="button"
          onClick={() => navigate("/trip-tales")}
          className="mt-5 rounded-full bg-[#15803D] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#166534]"
        >
          Back to TripTales
        </button>
      </div>
    );
  }

  // --------------------------------------------------
  // Loading
  // --------------------------------------------------

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="text-sm text-slate-500">Loading post...</div>
      </div>
    );
  }

  // --------------------------------------------------
  // Error
  // --------------------------------------------------

  if (error || !post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8FAFC] px-6">
        <h2 className="text-xl font-black text-slate-900">Post not found</h2>

        <p className="mt-2 text-center text-sm text-slate-500">
          {error ?? "The post you are looking for does not exist."}
        </p>

        <button
          type="button"
          onClick={() => navigate("/trip-tales")}
          className="mt-5 rounded-full bg-[#15803D] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#166534]"
        >
          Back to TripTales
        </button>
      </div>
    );
  }

  // --------------------------------------------------
  // Main UI
  // --------------------------------------------------

  return (
    <div className="min-h-screen bg-[#F4FAFF]">
      {/* Page Header */}

      <TripTalesPostDetailHeader
        isSaved={isSaved}
        onToggleSave={handleToggleSave}
        onShare={handleShare}
      />

      {/* Main Content */}

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        {/* Post Author Header */}

        <section className="mb-10 lg:mb-12">
          <PostAuthorHeader post={post} />
        </section>

        {/* Article + Sidebar */}

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10 xl:gap-12">
          {/* Main Article */}

          <article className="min-w-0 space-y-8 lg:space-y-10">
            {/* Post Content */}

            <section>
              <PostContent post={post} />
            </section>

            {/* Media */}

            <section>
              <PostMediaGallery post={post} />
            </section>

            {/* Tags */}

            {post.tags.length > 0 && (
              <section>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-green-100 bg-green-50 px-3 py-1.5 text-xs font-semibold text-[#15803D]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Engagement */}

            <section>
              <PostEngagement
                likesCount={likesCount}
                isLiked={isLiked}
                isSaved={isSaved}
                commentsCount={comments.length}
                onToggleLike={handleToggleLike}
                onToggleSave={handleToggleSave}
                onShare={handleShare}
                onShowLikes={handleShowLikes}
                isLikeLoading={toggleLoading}
              />
            </section>

            {/* Comments */}

            <section>
              <PostComments
                comments={comments}
                newComment={newComment}
                onCommentChange={setNewComment}
                onAddComment={handleAddComment}
                onCommentLike={handleCommentLike}
              />
            </section>
          </article>

          {/* Sidebar */}

          <aside className="min-w-0 lg:sticky lg:top-24">
            <div className="space-y-6">
              <PostDetailSidebar post={post} />
            </div>
          </aside>
        </div>

        {/* Related Posts */}

        <section className="mt-12 border-t border-[#E2E8F0] pt-10 lg:mt-16 lg:pt-12">
          <RelatedPosts
            posts={posts}
            destination={post.destination}
            currentPostId={post.id}
            onPostClick={(id) => navigate(`/trip-tales/posts/${id}`)}
          />
        </section>
      </main>

      {/* Likes Modal */}

      <LikesModal
        isOpen={isLikesOpen}
        likes={likes}
        pagination={pagination}
        loading={likesLoading}
        error={likesError}
        onClose={handleCloseLikes}
        onPageChange={(page) => void changeLikesPage(post.id, page)}
      />
    </div>
  );
};

export default PostDetailPage;
