import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "sonner";

import { useTripTales } from "../hooks/useTripTales";
import { useTripTalesLikes } from "../hooks/useTripTalesLikes";
import { useTripTalesComments } from "../hooks/useTripTalesComments";

import { selectUser } from "@/features/traveler(user)/auth/redux/authSelectors";

import TripTalesPostDetailHeader from "../components/trip-tales-post-details/TripTalesPostDetailHeader";
import PostAuthorHeader from "../components/trip-tales-post-details/PostAuthorHeader";
import PostContent from "../components/trip-tales-post-details/PostContent";
import PostMediaGallery from "../components/trip-tales-post-details/PostMediaGallery";
import PostEngagement from "../components/trip-tales-post-details/PostEngagement";
import PostComments from "../components/trip-tales-post-details/PostComments";
import PostDetailSidebar from "../components/trip-tales-post-details/PostDetailSidebar";
import RelatedPosts from "../components/trip-tales-post-details/RelatedPosts";
import LikesModal from "../components/trip-tales/LikesModal";

import type { CreatePostResponse } from "../types/trip-tales.types";

const PostDetailPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

  const location = useLocation();

  const shouldScrollToComments = (
    location.state as { scrollToComments?: boolean } | null
  )?.scrollToComments;

  const currentUser = useSelector(selectUser);

  // ==========================================
  // TRIPTALES
  // ==========================================

  const { posts, fetchPostById, fetchPosts } = useTripTales();

  // ==========================================
  // LIKES
  // ==========================================

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

  // ==========================================
  // COMMENTS
  // ==========================================

  const {
    comments,
    pagination: commentsPagination,
    loading: commentsLoading,
    submitting: commentSubmitting,
    editing: commentEditing,
    deletingCommentId,
    error: commentsError,
    addComment,
    replyToComment,
    editComment,
    removeComment,
    changePage,
  } = useTripTalesComments(postId ?? "");

  const safeCommentsPagination = commentsPagination ?? {
    currentPage: 1,
    totalPages: 1,
    totalComments: 0,
    limit: 10,
    hasNextPage: false,
    hasPreviousPage: false,
  };

  // ==========================================
  // POST STATE
  // ==========================================

  const [post, setPost] = useState<CreatePostResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ==========================================
  // UI STATE
  // ==========================================

  const [isSaved, setIsSaved] = useState(false);
  const [isLikesOpen, setIsLikesOpen] = useState(false);

  // Comments section reference
  const commentsSectionRef = useRef<HTMLElement>(null);

  const handleShowComments = () => {
    commentsSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const currentLike = postId ? postLikes[postId] : undefined;

  const likesCount = currentLike?.likesCount ?? post?.likesCount ?? 0;

  const isLiked =
    currentLike?.isLikedByCurrentUser ?? post?.isLikedByCurrentUser ?? false;

  // ==========================================
  // FETCH POST
  // ==========================================

  useEffect(() => {
    if (!postId) return;

    let isActive = true;

    const loadPost = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchPostById(postId);

        if (!isActive) return;

        setPost(data);

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

  // ==========================================
  // SCROLL TO COMMENTS
  // ==========================================

  useEffect(() => {
    if (!shouldScrollToComments || loading || !post) return;

    const timer = setTimeout(() => {
      commentsSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Clear navigation state so it doesn't scroll again
      navigate(location.pathname, {
        replace: true,
        state: null,
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [shouldScrollToComments, loading, post, navigate, location.pathname]);

  // ==========================================
  // FETCH RELATED POSTS
  // ==========================================

  useEffect(() => {
    if (posts.length === 0) {
      void fetchPosts();
    }
  }, [posts.length, fetchPosts]);

  // ==========================================
  // TOGGLE LIKE
  // ==========================================

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

  // ==========================================
  // OPEN LIKES
  // ==========================================

  const handleShowLikes = async () => {
    if (!post) return;

    setIsLikesOpen(true);

    try {
      await openLikes(post.id, 1);
    } catch {
      // Error is displayed inside LikesModal.
    }
  };

  // ==========================================
  // CLOSE LIKES
  // ==========================================

  const handleCloseLikes = () => {
    setIsLikesOpen(false);
    closeLikes();
  };

  // ==========================================
  // SAVE
  // ==========================================

  const handleToggleSave = () => {
    setIsSaved((previous) => !previous);
  };

  // ==========================================
  // SHARE
  // ==========================================

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);

      toast.success("Post link copied!");
    } catch (error) {
      console.error("Failed to copy post link:", error);

      toast.error("Unable to copy post link.");
    }
  };

  // ==========================================
  // INVALID POST ID
  // ==========================================

  if (!postId) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8FAFC] px-6">
        {" "}
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

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        {" "}
        <div className="text-sm text-slate-500">Loading post...</div>{" "}
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error || !post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8FAFC] px-6">
        {" "}
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

  // ==========================================
  // MAIN UI
  // ==========================================

  return (
    <div className="min-h-screen bg-[#F4FAFF]">
      {" "}
      <TripTalesPostDetailHeader
        isSaved={isSaved}
        onToggleSave={handleToggleSave}
        onShare={handleShare}
      />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <section className="mb-10 lg:mb-12">
          <PostAuthorHeader post={post} />
        </section>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10 xl:gap-12">
          <article className="min-w-0 space-y-8 lg:space-y-10">
            <section>
              <PostContent post={post} />
            </section>

            <section>
              <PostMediaGallery post={post} />
            </section>

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

            {/* ENGAGEMENT */}

            <section>
              <PostEngagement
                likesCount={likesCount}
                isLiked={isLiked}
                isSaved={isSaved}
                commentsCount={post.commentsCount ?? 0}
                onToggleLike={handleToggleLike}
                onToggleSave={handleToggleSave}
                onShare={handleShare}
                onShowLikes={handleShowLikes}
                onShowComments={handleShowComments}
                isLikeLoading={toggleLoading}
              />
            </section>

            {/* COMMENTS */}

            <section
              ref={commentsSectionRef}
              id="comments"
              className="scroll-mt-24"
            >
              <PostComments
                comments={comments}
                pagination={safeCommentsPagination}
                currentUserId={currentUser?.userId}
                currentUserImage={currentUser?.profileImage}
                loading={commentsLoading}
                submitting={commentSubmitting}
                editing={commentEditing}
                deletingCommentId={deletingCommentId}
                error={commentsError}
                onAddComment={addComment}
                onReply={replyToComment}
                onEditComment={editComment}
                onDeleteComment={removeComment}
                onPageChange={changePage}
              />
            </section>
          </article>

          {/* SIDEBAR */}

          <aside className="min-w-0 lg:sticky lg:top-24">
            <div className="space-y-6">
              <PostDetailSidebar post={post} />
            </div>
          </aside>
        </div>

        {/* RELATED POSTS */}

        <section className="mt-12 border-t border-[#E2E8F0] pt-10 lg:mt-16 lg:pt-12">
          <RelatedPosts
            posts={posts}
            destination={post.destination}
            currentPostId={post.id}
            onPostClick={(id) => navigate(`/trip-tales/posts/${id}`)}
          />
        </section>
      </main>
      {/* LIKES MODAL */}
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
