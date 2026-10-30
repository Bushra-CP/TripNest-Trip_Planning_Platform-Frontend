import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import MyTripTalesHeader from "../components/MyTripTalesHeader";
import MyTripTalesGrid from "../components/MyTripTalesGrid";
import TripTalesDetailsModal from "../components/TripTalesDetailsModal";
import EditTripTalesModal from "../components/EditTripTalesModal";
import DeleteTripTalesDialog from "../components/DeleteTripTalesDialog";
import {
  INITIAL_HIGHLIGHTS,
  INITIAL_POSTS,
  MOCK_PROFILE,
} from "../data/mockTripTalesData";
import type { HighlightItem, PostItem } from "../types/my-trip-tales.types";
import { useNavigate } from "react-router";

const MyTripTalesProfile = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<PostItem[]>(INITIAL_POSTS);
  const [selectedPost, setSelectedPost] = useState<PostItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 3000);
  };

  const handleOpenDetails = (post: PostItem) => setSelectedPost(post);

  const handleSaveEdit = (updatedPost: PostItem) => {
    setPosts((current) =>
      current.map((post) => (post.id === updatedPost.id ? updatedPost : post)),
    );
    setSelectedPost(updatedPost);
    setIsEditModalOpen(false);
    showToast("Your TripTale was updated successfully.");
  };

  const handleConfirmDelete = () => {
    if (!selectedPost) return;
    setPosts((current) =>
      current.filter((post) => post.id !== selectedPost.id),
    );
    setSelectedPost(null);
    setIsDeleteDialogOpen(false);
    showToast("TripTale deleted from your profile.");
  };

  const handleShareProfile = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast("Profile link copied.");
    } catch {
      showToast("Unable to copy profile link.");
    }
  };

  const handleHighlightClick = (highlight: HighlightItem) => {
    showToast(`${highlight.title} collection selected.`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-['Plus_Jakarta_Sans',sans-serif] text-[#0F172A] antialiased">
      <main className="mx-auto max-w-6xl space-y-6 px-4 pb-8 sm:px-6 lg:px-8">
        <MyTripTalesHeader
          profile={MOCK_PROFILE}
          highlights={INITIAL_HIGHLIGHTS}
          postCount={posts.filter((post) => !post.isDraft).length}
          onCreatePost={() =>
            showToast("Connect this button to your existing Create Post flow.")
          }
          onEditProfile={() => navigate("/edit-profile")}
          onShareProfile={handleShareProfile}
          onHighlightClick={handleHighlightClick}
        />

        <MyTripTalesGrid posts={posts} onPostClick={handleOpenDetails} />
      </main>

      {selectedPost && !isEditModalOpen && !isDeleteDialogOpen && (
        <TripTalesDetailsModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onEdit={() => setIsEditModalOpen(true)}
          onDelete={() => setIsDeleteDialogOpen(true)}
        />
      )}

      {selectedPost && isEditModalOpen && (
        <EditTripTalesModal
          post={selectedPost}
          onSave={handleSaveEdit}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}

      {selectedPost && isDeleteDialogOpen && (
        <DeleteTripTalesDialog
          post={selectedPost}
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsDeleteDialogOpen(false)}
        />
      )}

      {toast && (
        <div
          role="status"
          className="fixed bottom-6 right-6 z-[80] flex items-center gap-3 rounded-2xl bg-slate-900 px-5 py-3.5 text-xs font-bold text-white shadow-xl"
        >
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          {toast}
        </div>
      )}
    </div>
  );
};

export default MyTripTalesProfile;
