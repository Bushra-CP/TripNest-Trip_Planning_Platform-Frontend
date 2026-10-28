import React, { useState, useMemo } from "react";
import type {
  TripTalesItem,
  ModerationStatus,
  ModerationTarget,
  ToastMessage,
} from "../types/types";
import TripTalesPageHeader from "../components/TripTalesPageHeader";
import TripTalesStats from "../components/TripTalesStats";
import TripTalesFilters from "../components/TripTalesFilters";
import TripTalesTable from "../components/TripTalesTable";
import TripTalesModals from "../components/TripTalesModals";

// Initial realistic dataset matching SCREEN_10
const INITIAL_POSTS: TripTalesItem[] = [
  {
    id: "tt-101",
    title: "My 3 Days in Wayanad: Mist, Treks & Monsoons",
    excerpt:
      "Exploring ancient caves, spice trails, and bamboo journeys along the wild Kabini river.",
    fullContent: `Wayanad in the monsoon turns into a dream of misty valleys and emerald tea plantations. We spent our first morning trekking near the Chembra Peak foothills before descending to a quiet family-run bamboo cottage.\n\n"Wayanad isn't merely a weekend retreat; it's a sensory immersion into rolling monsoon-nourished hills where every pine-scented turn whispers folk stories and aroma of fresh roasted pepper."\n\nClimbing to Edakkal Caves felt like walking straight into 6,000 BCE stone carvings. On day two, we drifted silently along Pozhuthana on bamboo rafts with hornbills flying overhead. The trip concluded at Muthanga sanctuary with an elephant herd grazing peacefully at sunrise.`,
    type: "Blog",
    status: "Active",
    destination: "Wayanad, Kerala",
    submittedOn: "Oct 24, 2024",
    submittedTimestamp: 1729774800000,
    author: {
      name: "Ananya Iyer",
      username: "@ananya_travels",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
      isVerified: true,
      joinedDate: "Oct 2023",
    },
    engagement: {
      likes: 1420,
      comments: 142,
    },
    media: [
      {
        url: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=800&auto=format&fit=crop",
        caption: "Chembra Peak & Tea Gardens",
      },
      {
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop",
        caption: "Meppadi Ridge Overlook",
      },
      {
        url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop",
        caption: "Bamboo Rafting on Kabini",
      },
    ],
  },
  {
    id: "tt-102",
    title: "Secret Waterfalls of Munnar You Must Visit",
    excerpt:
      "Escape the tourist circuit to unmapped turquoise mountain streams and pure silence.",
    fullContent: `Last weekend I took a 4x4 from Chinnakanal towards an unmapped stream near Kolukkumalai. The path crosses fresh cardamom plantations before hitting a secluded 40-foot waterfall. Leech socks are essential during rains, but swimming in pure mountain water with zero commercial stalls around is worth every step.`,
    type: "Blog",
    status: "Active",
    destination: "Munnar, Kerala",
    submittedOn: "Oct 23, 2024",
    submittedTimestamp: 1729688400000,
    author: {
      name: "Arjun Malhotra",
      username: "@arjun_m",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      isVerified: true,
      joinedDate: "Nov 2023",
    },
    engagement: {
      likes: 890,
      comments: 84,
    },
    media: [
      {
        url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop",
        caption: "Hidden Idukki Waterfall Pool",
      },
    ],
  },
  {
    id: "tt-103",
    title: "Suspicious Cheap Taxi Service Promo - Call 9876543210",
    excerpt:
      'Flagged: "Call 9876543210 for unmetered cab bypass rates across Kochi & Alleppey..."',
    fullContent: `BEST CHEAP TAXI IN KOCHI & MUNNAR! Don't pay TripNest platform rates, message our agency directly at +91 9876543210 or visit suspicious-travel-deals.xyz. Cash only, bypass company commission!`,
    type: "Post",
    status: "Blocked",
    destination: "Kochi, Kerala",
    submittedOn: "Oct 22, 2024",
    submittedTimestamp: 1729602000000,
    author: {
      name: "TouristSpamBot",
      username: "@user_9812",
      initials: "TB",
      isVerified: false,
      joinedDate: "Oct 2024",
    },
    engagement: {
      likes: 2,
      comments: 0,
      reports: 18,
    },
    media: [],
    blockReason:
      "Commercial solicitation, unverified off-platform transactions, and platform bypass violations.",
  },
  {
    id: "tt-104",
    title: "Backwaters Sunset Reel at Alleppey",
    excerpt:
      "Golden reflections and fresh toddy shacks along the quiet palm-fringed canals of Vembanad.",
    fullContent: `Nothing compares to hearing the evening temple bells echo across the canal waters in Alappuzha. Rented a local canoe for two hours instead of a large noisy houseboat and witnessed the most serene twilight of my life. Highly recommend asking for local boatman Babu at Jetty No. 4!`,
    type: "Post",
    status: "Active",
    destination: "Alleppey, Kerala",
    submittedOn: "Oct 22, 2024",
    submittedTimestamp: 1729598400000,
    author: {
      name: "Priya Sharma",
      username: "@priya_kerala",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
      isVerified: true,
      joinedDate: "Jan 2024",
    },
    engagement: {
      likes: 520,
      comments: 31,
    },
    media: [
      {
        url: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop",
        caption: "Sunset Canoe on Vembanad",
      },
    ],
  },
  {
    id: "tt-105",
    title: "Spiti Winter Survival Gear Checklist",
    excerpt:
      "Sub-zero thermal layers, high altitude medicine, anti-gel diesel, and battery warming bags.",
    fullContent: `Heading to Spiti between November and March requires military-grade planning. 1) Carry anti-gel diesel additives if driving. 2) Merino wool base layer + down jacket rated to -20°C. 3) Diamox for AMS acclimation. Full breakdown of road clearances and reliable homestays with Bukhari wood stoves.`,
    type: "Blog",
    status: "Pending Review",
    destination: "Spiti Valley, Himachal",
    submittedOn: "Oct 21, 2024",
    submittedTimestamp: 1729515600000,
    author: {
      name: "Kabir Das",
      username: "@kabir_himalayas",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
      isVerified: false,
      joinedDate: "Dec 2023",
    },
    engagement: {
      likes: 310,
      comments: 14,
    },
    media: [
      {
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop",
        caption: "Key Monastery in Snow",
      },
    ],
  },
  {
    id: "tt-106",
    title: "Offbeat Camping in Varkala North Cliff",
    excerpt:
      "Listening to Arabian Sea waves crash against red laterite cliffs under a star-filled sky.",
    fullContent: `Everyone flocks to the busy cafe row on South Cliff, but heading 3km north leads you to peaceful black sand pockets and quiet campsites where the locals roast freshly caught mackerel with spicy green chili chutney. Clean, eco-friendly, leave-no-trace travel always!`,
    type: "Post",
    status: "Active",
    destination: "Varkala, Kerala",
    submittedOn: "Oct 20, 2024",
    submittedTimestamp: 1729429200000,
    author: {
      name: "Sneha Nair",
      username: "@sneha_nair",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
      isVerified: true,
      joinedDate: "Feb 2024",
    },
    engagement: {
      likes: 740,
      comments: 52,
    },
    media: [
      {
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
        caption: "Varkala Cliff Edge",
      },
    ],
  },
];

export const AdminTripTalesManagement: React.FC = () => {
  const [posts, setPosts] = useState<TripTalesItem[]>(INITIAL_POSTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<"All" | "Blog" | "Post">(
    "All",
  );
  const [selectedStatus, setSelectedStatus] = useState<
    "All" | "Active" | "Blocked" | "Pending Review"
  >("All");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [viewingPost, setViewingPost] = useState<TripTalesItem | null>(null);
  const [moderationTarget, setModerationTarget] =
    useState<ModerationTarget | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [toastMessage, setToastMessage] = useState<ToastMessage | null>(null);

  const showToast = (
    title: string,
    description: string,
    type: ToastMessage["type"] = "success",
  ) => {
    setToastMessage({ title, description, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const stats = useMemo(
    () => ({ total: 1428, active: 1382, blocked: 18, pending: 28 }),
    [],
  );

  const filteredPosts = useMemo(() => {
    const result = posts.filter((post) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.fullContent.toLowerCase().includes(query) ||
        post.author.name.toLowerCase().includes(query) ||
        post.author.username.toLowerCase().includes(query) ||
        Boolean(post.destination?.toLowerCase().includes(query));
      const matchesType = selectedType === "All" || post.type === selectedType;
      const matchesStatus =
        selectedStatus === "All" || post.status === selectedStatus;
      return matchesSearch && matchesType && matchesStatus;
    });
    result.sort((a, b) =>
      sortOrder === "newest"
        ? b.submittedTimestamp - a.submittedTimestamp
        : a.submittedTimestamp - b.submittedTimestamp,
    );
    return result;
  }, [posts, searchQuery, selectedType, selectedStatus, sortOrder]);

  const handleConfirmModeration = () => {
    if (!moderationTarget) return;
    const { post, action } = moderationTarget;
    setIsProcessing(true);
    setTimeout(() => {
      const newStatus: ModerationStatus =
        action === "block" ? "Blocked" : "Active";
      setPosts((previous) =>
        previous.map((item) =>
          item.id === post.id
            ? {
                ...item,
                status: newStatus,
                blockReason:
                  action === "block"
                    ? "Flagged for violation of community standards (commercial spam or off-platform bypass attempt)."
                    : undefined,
              }
            : item,
        ),
      );
      if (viewingPost?.id === post.id)
        setViewingPost((previous: TripTalesItem | null) =>
          previous ? { ...previous, status: newStatus } : null,
        );
      setIsProcessing(false);
      setModerationTarget(null);
      if (action === "block")
        showToast(
          "Story Blocked",
          `"${post.title.substring(0, 32)}..." has been hidden from public streams.`,
          "warning",
        );
      else
        showToast(
          "Story Restored",
          `"${post.title.substring(0, 32)}..." is now unblocked and active on TripNest.`,
          "success",
        );
    }, 500);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedType("All");
    setSelectedStatus("All");
    setSortOrder("newest");
  };

  return (
    <div className="w-full min-w-0 text-[#0F172A] font-['Plus_Jakarta_Sans',sans-serif] antialiased">
      <main className="w-full min-w-0 space-y-6">
        <TripTalesPageHeader
          onExport={() =>
            showToast(
              "Export Complete",
              "Exported TripTales moderation audit log as CSV.",
            )
          }
        />
        <TripTalesStats stats={stats} />
        <TripTalesFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          onClear={handleClearFilters}
        />
        <TripTalesTable
          filteredPosts={filteredPosts}
          totalPosts={stats.total}
          onViewPost={setViewingPost}
          onModeration={setModerationTarget}
          onClearFilters={handleClearFilters}
          onToast={showToast}
        />
      </main>
      <TripTalesModals
        viewingPost={viewingPost}
        setViewingPost={setViewingPost}
        moderationTarget={moderationTarget}
        setModerationTarget={setModerationTarget}
        isProcessing={isProcessing}
        onConfirmModeration={handleConfirmModeration}
        toastMessage={toastMessage}
        setToastMessage={setToastMessage}
      />
    </div>
  );
};

export default AdminTripTalesManagement;
