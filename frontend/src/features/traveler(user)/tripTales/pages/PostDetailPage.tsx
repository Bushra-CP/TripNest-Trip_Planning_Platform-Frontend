import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useTripTales } from "../hooks/useTripTales";

import TripTalesPostDetailHeader from "../components/trip-tales-post-details.tsx/TripTalesPostDetailHeader";
import PostAuthorHeader from "../components/trip-tales-post-details.tsx/PostAuthorHeader";
import PostContent from "../components/trip-tales-post-details.tsx/PostContent";
import PostMediaGallery from "../components/trip-tales-post-details.tsx/PostMediaGallery";
import PostEngagement from "../components/trip-tales-post-details.tsx/PostEngagement";
import PostComments from "../components/trip-tales-post-details.tsx/PostComments";
import PostDetailSidebar from "../components/trip-tales-post-details.tsx/PostDetailSidebar";
import RelatedPosts from "../components/trip-tales-post-details.tsx/RelatedPosts";

import type { CreatePostResponse } from "../types/trip-tales.types";

import type { CommentItem } from "../types/post-detail.types";

const PostDetailPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();

  const navigate = useNavigate();

  const { posts, fetchPostById, fetchPosts } = useTripTales();

  const [post, setPost] = useState<CreatePostResponse | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [likesCount, setLikesCount] = useState(0);

  const [isLiked, setIsLiked] = useState(false);

  const [isSaved, setIsSaved] = useState(false);

  const [newComment, setNewComment] = useState("");

  const [comments, setComments] = useState<CommentItem[]>([]);

  // --------------------------------
  // Fetch Post By ID
  // --------------------------------

  useEffect(() => {
    if (!postId) {
      return;
    }

    const loadPost = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchPostById(postId);

        setPost(data);
      } catch (error) {
        console.error("Failed to fetch post:", error);

        setPost(null);
        setError("Failed to load this post. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    void loadPost();
  }, [postId]);

  // --------------------------------
  // Fetch posts for Related Posts
  // --------------------------------

  useEffect(() => {
    if (posts.length === 0) {
      void fetchPosts();
    }
  }, []);

  // --------------------------------
  // Like
  // --------------------------------

  const handleToggleLike = () => {
    setIsLiked((previous) => {
      if (previous) {
        setLikesCount((count) => Math.max(0, count - 1));
      } else {
        setLikesCount((count) => count + 1);
      }

      return !previous;
    });
  };

  // --------------------------------
  // Save
  // --------------------------------

  const handleToggleSave = () => {
    setIsSaved((previous) => !previous);
  };

  // --------------------------------
  // Share
  // --------------------------------

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);

      alert("Post link copied!");
    } catch (error) {
      console.error("Failed to copy post link:", error);
    }
  };

  // --------------------------------
  // Add Comment
  // --------------------------------

  const handleAddComment = (event: React.FormEvent) => {
    event.preventDefault();

    const text = newComment.trim();

    if (!text) {
      return;
    }

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

  // --------------------------------
  // Comment Like
  // --------------------------------

  const handleCommentLike = (commentId: string) => {
    setComments((previous) =>
      previous.map((comment) => {
        if (comment.id !== commentId) {
          return comment;
        }

        const isLiked = !comment.isLiked;

        return {
          ...comment,
          isLiked,
          likes: isLiked ? comment.likes + 1 : Math.max(0, comment.likes - 1),
        };
      }),
    );
  };

  // --------------------------------
  // Loading
  // --------------------------------

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-sm text-slate-500">Loading post...</div>
      </div>
    );
  }

  // --------------------------------
  // Error
  // --------------------------------

  if (error || !post) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center px-6">
        <h2 className="text-xl font-black text-slate-900">Post not found</h2>

        <p className="text-sm text-slate-500 mt-2 text-center">
          {error ?? "The post you are looking for does not exist."}
        </p>

        <button
          type="button"
          onClick={() => navigate("/trip-tales")}
          className="mt-5 px-5 py-2.5 rounded-full bg-[#15803D] text-white text-sm font-bold hover:bg-[#166534]"
        >
          Back to TripTales
        </button>
      </div>
    );
  }

return (
  <div className="min-h-screen bg-[#F4FAFF]">
    {/* Page Header */}
    <TripTalesPostDetailHeader
      isSaved={isSaved}
      onToggleSave={handleToggleSave}
      onShare={handleShare}
    />

    {/* Main Page */}
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
      
      {/* Post Header */}
      <section className="mb-10 lg:mb-12">
        <PostAuthorHeader post={post} />
      </section>

      {/* Main Content + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-8 lg:gap-10 xl:gap-12 items-start">

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
                    className="px-3 py-1.5 rounded-full bg-green-50 text-[#15803D] text-xs font-semibold border border-green-100"
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
      <section className="mt-12 lg:mt-16 pt-10 lg:pt-12 border-t border-[#E2E8F0]">
        <RelatedPosts
          posts={posts}
          destination={post.destination}
          currentPostId={post.id}
          onPostClick={(id) =>
            navigate(`/trip-tales/posts/${id}`)
          }
        />
      </section>

    </main>
  </div>
);
};

export default PostDetailPage;
