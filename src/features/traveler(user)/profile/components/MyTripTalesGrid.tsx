import { useMemo, useState } from "react";
import {
  BookOpen,
  Grid,
  Heart,
  Image as ImageIcon,
  Layers,
  MessageCircle,
  Bookmark,
} from "lucide-react";
import type { PostItem, ProfileTab } from "../types/my-trip-tales.types";

interface Props {
  posts: PostItem[];
  onPostClick: (post: PostItem) => void;
}

const MyTripTalesGrid = ({ posts, onPostClick }: Props) => {
  const [activeTab, setActiveTab] = useState<ProfileTab>("all");
  const [sortOrder, setSortOrder] = useState("recent");

  const filteredPosts = useMemo(() => {
    let result = posts.filter((post) => {
      if (activeTab === "guides") return post.category === "Guide";
      if (activeTab === "stories")
        return post.category === "Story" || post.category === "Reel";
      if (activeTab === "drafts") return Boolean(post.isDraft);
      return !post.isDraft;
    });

    if (sortOrder === "title")
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    return result;
  }, [posts, activeTab, sortOrder]);

  const tabs: { id: ProfileTab; label: string; icon: typeof Grid }[] = [
    { id: "all", label: "All Posts", icon: Grid },
    { id: "guides", label: "Blogs & Guides", icon: BookOpen },
    { id: "stories", label: "Photo Stories", icon: ImageIcon },
    { id: "drafts", label: "Drafts", icon: Bookmark },
  ];

  return (
    <section>
      <div className="mb-5 flex flex-col justify-between gap-3 border-b border-[#E2E8F0] sm:flex-row sm:items-center">
        <div className="flex gap-4 overflow-x-auto">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex shrink-0 items-center gap-2 border-b-2 py-3 text-xs font-bold transition-colors ${activeTab === id ? "border-[#15803D] text-[#15803D]" : "border-transparent text-slate-500 hover:text-slate-800"}`}
            >
              <Icon className="h-4 w-4" /> {label}
              <span className="text-[10px]">
                (
                {id === "all"
                  ? posts.filter((p) => !p.isDraft).length
                  : id === "guides"
                    ? posts.filter((p) => p.category === "Guide").length
                    : id === "stories"
                      ? posts.filter(
                          (p) =>
                            p.category === "Story" || p.category === "Reel",
                        ).length
                      : posts.filter((p) => p.isDraft).length}
                )
              </span>
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 pb-3 text-xs font-semibold text-slate-500 sm:pb-0">
          Sort:
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="bg-transparent font-bold text-slate-700 outline-none"
          >
            <option value="recent">Recent first</option>
            <option value="title">Title</option>
          </select>
        </label>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
          <ImageIcon className="mx-auto mb-3 h-10 w-10 text-slate-300" />
          <h3 className="font-bold text-slate-800">No posts here yet</h3>
          <p className="mt-1 text-sm text-slate-500">
            Your travel stories will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <button
              key={post.id}
              type="button"
              onClick={() => onPostClick(post)}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 text-left shadow-sm"
            >
              <img
                src={post.coverImage}
                alt={post.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-x-3 top-3 z-10 flex justify-between">
                <span className="rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-black uppercase text-white backdrop-blur">
                  {post.category}
                </span>
                {post.media.length > 1 && (
                  <span className="flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-[10px] font-bold text-white">
                    <Layers className="h-3 w-3" />
                    {post.media.length}
                  </span>
                )}
              </div>
              <div className="absolute inset-0 flex flex-col justify-between bg-slate-950/65 p-5 text-white opacity-0 transition-opacity group-hover:opacity-100">
                <p className="text-right text-[10px] font-bold">
                  {post.destination}
                </p>
                <div className="flex items-center justify-center gap-6">
                  <span className="flex items-center gap-1.5 text-sm font-black">
                    <Heart className="h-5 w-5 fill-white" />
                    {post.stats.likes}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm font-black">
                    <MessageCircle className="h-5 w-5" />
                    {post.stats.comments}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm font-black">
                    <Bookmark className="h-5 w-5" />
                    {post.stats.saves}
                  </span>
                </div>
                <h3 className="line-clamp-2 text-xs font-black">
                  {post.title}
                </h3>
              </div>
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyTripTalesGrid;
