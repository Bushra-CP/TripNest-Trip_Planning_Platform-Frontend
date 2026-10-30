import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoaderCircle, RefreshCw } from "lucide-react";
import { toast } from "sonner";

import MyTripTalesHeader from "../components/MyTripTalesHeader";
import MyTripTalesGrid from "../components/MyTripTalesGrid";
import TripTalesDetailsModal from "../components/TripTalesDetailsModal";
import EditTripTalesModal from "../components/EditTripTalesModal";
import DeleteTripTalesDialog from "../components/DeleteTripTalesDialog";

import { useTripTales } from "../../tripTales/hooks/useTripTales";

import type {
  MyPostResponse,
  MyPostsQuery,
  UpdateMyPostData,
} from "../../tripTales/types/trip-tales.types";
import CreatePostModal from "../../tripTales/components/trip-tales/CreatePostModal";

const INITIAL_QUERY: MyPostsQuery = {
  page: 1,
  limit: 10,
  sort: "newest",
};

const MyTripTalesProfile = () => {
  const navigate = useNavigate();

  const {
    myProfile,
    profileLoading,
    profileError,
    fetchMyProfile,

    myPosts,
    myPostsPagination,
    myPostsLoading,
    myPostsError,
    fetchMyPosts,

    updateMyPost,
    updatePostLoading,

    deleteMyPost,
    deletePostLoading,
  } = useTripTales();

  const [selectedPost, setSelectedPost] = useState<MyPostResponse | null>(null);

  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [query, setQuery] = useState<MyPostsQuery>(INITIAL_QUERY);

  // Fetch profile and initial posts.
  useEffect(() => {
    void fetchMyProfile();
    void fetchMyPosts(INITIAL_QUERY);

    // Initial page load only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Apply search, sorting, status and pagination changes.
  const handleQueryChange = (nextQuery: MyPostsQuery) => {
    setQuery(nextQuery);
    void fetchMyPosts(nextQuery);
  };

  // Open post details.
  const handleOpenDetails = (post: MyPostResponse) => {
    setSelectedPost(post);
  };

  // Close all post-related modals.
  const handleClosePostModals = () => {
    setSelectedPost(null);
    setIsEditModalOpen(false);
    setIsDeleteDialogOpen(false);
  };

  // Called only after successful post creation.
  const handlePostCreated = async () => {
    const nextQuery = { ...INITIAL_QUERY };

    setQuery(nextQuery);

    await Promise.all([fetchMyPosts(nextQuery), fetchMyProfile()]);

    toast.success("Your TripTales profile has been refreshed.");
  };

  // Update post through the API.
  const handleSaveEdit = async (postData: UpdateMyPostData) => {
    if (!selectedPost) return;

    const success = await updateMyPost(selectedPost.id, postData);

    if (success) {
      handleClosePostModals();

      await Promise.all([fetchMyPosts(query), fetchMyProfile()]);
    }
  };

  // Delete post through the API.
  const handleConfirmDelete = async () => {
    if (!selectedPost) return;

    const success = await deleteMyPost(selectedPost.id);

    if (success) {
      handleClosePostModals();

      await Promise.all([fetchMyPosts(query), fetchMyProfile()]);
    }
  };

  // Share profile link.
  const handleShareProfile = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Profile link copied.");
    } catch {
      toast.error("Unable to copy profile link.");
    }
  };

  // Retry failed requests.
  const handleRetry = () => {
    void fetchMyProfile();
    void fetchMyPosts(query);
  };

  const isInitialLoading =
    (profileLoading && !myProfile) || (myPostsLoading && myPosts.length === 0);

  if (isInitialLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-slate-500">
          <LoaderCircle className="h-8 w-8 animate-spin text-[#15803D]" />
          <p className="text-sm font-semibold">Loading your TripTales...</p>
        </div>
      </div>
    );
  }

  if (profileError && !myProfile) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <h2 className="text-lg font-black text-slate-900">
          Unable to load your profile
        </h2>

        <p className="max-w-md text-sm text-slate-500">{profileError}</p>

        <button
          type="button"
          onClick={handleRetry}
          className="inline-flex items-center gap-2 rounded-xl bg-[#15803D] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#166534]"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>
      </div>
    );
  }

  if (!myProfile) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-['Plus_Jakarta_Sans',sans-serif] text-[#0F172A] antialiased">
      <main className="mx-auto max-w-6xl space-y-6 px-4 pb-8 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <MyTripTalesHeader
          profile={myProfile.profile}
          stats={myProfile.stats}
          onCreatePost={() => setIsCreatePostOpen(true)}
          onEditProfile={() => navigate("/edit-profile")}
          onShareProfile={handleShareProfile}
        />

        {/* Posts Error */}
        {myPostsError && (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm text-red-700">{myPostsError}</p>

            <button
              type="button"
              onClick={() => void fetchMyPosts(query)}
              className="text-xs font-bold text-red-700 underline"
            >
              Retry
            </button>
          </div>
        )}

        {/* Posts Grid */}
        <MyTripTalesGrid
          posts={myPosts}
          pagination={myPostsPagination}
          loading={myPostsLoading}
          query={query}
          onQueryChange={handleQueryChange}
          onPostClick={handleOpenDetails}
        />
      </main>

      {/* Create Post Modal */}
      {isCreatePostOpen && (
        <CreatePostModal
          onClose={() => setIsCreatePostOpen(false)}
          onPostCreated={handlePostCreated}
        />
      )}

      {/* Post Details Modal */}
      {selectedPost && !isEditModalOpen && !isDeleteDialogOpen && (
        <TripTalesDetailsModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onEdit={() => setIsEditModalOpen(true)}
          onDelete={() => setIsDeleteDialogOpen(true)}
        />
      )}

      {/* Edit Post Modal */}
      {selectedPost && isEditModalOpen && (
        <EditTripTalesModal
          post={selectedPost}
          onSave={handleSaveEdit}
          onClose={() => setIsEditModalOpen(false)}
          isSaving={updatePostLoading}
        />
      )}

      {/* Delete Confirmation Dialog */}
      {selectedPost && isDeleteDialogOpen && (
        <DeleteTripTalesDialog
          post={selectedPost}
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsDeleteDialogOpen(false)}
          isDeleting={deletePostLoading}
        />
      )}
    </div>
  );
};

export default MyTripTalesProfile;
