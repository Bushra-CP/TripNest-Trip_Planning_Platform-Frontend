import { useCallback, useEffect, useState } from "react";

import type {
  AdminModerationTarget,
  AdminPostStatus,
  AdminPostSortOrder,
  AdminTripTalesPost,
  AdminTripTalesStats,
  ToastMessage,
} from "../types/admin-trip-tales.types";

import { adminTripTalesApi } from "../api/admin-trip-tales.api";

import TripTalesPageHeader from "../components/TripTalesPageHeader";
import TripTalesStats from "../components/TripTalesStats";
import TripTalesFilters from "../components/TripTalesFilters";
import TripTalesTable from "../components/TripTalesTable";
import TripTalesModals from "../components/TripTalesModals";

const PAGE_SIZE = 10;

export const AdminTripTalesManagement = () => {
  const [posts, setPosts] = useState<AdminTripTalesPost[]>([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<"All" | AdminPostStatus>(
    "All",
  );
  const [sortOrder, setSortOrder] = useState<AdminPostSortOrder>("newest");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  const [stats, setStats] = useState<AdminTripTalesStats>({
    total: 0,
    published: 0,
    blocked: 0,
  });

  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const [viewingPost, setViewingPost] = useState<AdminTripTalesPost | null>(
    null,
  );

  const [moderationTarget, setModerationTarget] =
    useState<AdminModerationTarget | null>(null);

  const [toastMessage, setToastMessage] = useState<ToastMessage | null>(null);

  // Increment to refresh posts and statistics after moderation.
  const [refreshKey, setRefreshKey] = useState(0);

  const showToast = useCallback(
    (
      title: string,
      description: string,
      type: ToastMessage["type"] = "success",
    ) => {
      setToastMessage({ title, description, type });
    },
    [],
  );

  // Fetch posts whenever pagination, filters, or refreshKey changes.
  useEffect(() => {
    let cancelled = false;

    const loadPosts = async () => {
      setLoading(true);

      try {
        const result = await adminTripTalesApi.getPosts({
          page: currentPage,
          limit: PAGE_SIZE,
          search: searchQuery.trim(),
          status: selectedStatus === "All" ? undefined : selectedStatus,
          sort: sortOrder,
        });

        if (cancelled) return;

        setPosts(result.posts);
        setTotalPosts(result.pagination.total);
        setTotalPages(result.pagination.totalPages);
        setHasNextPage(currentPage < result.pagination.totalPages);
        setHasPreviousPage(currentPage > 1);
      } catch {
        if (!cancelled) {
          showToast(
            "Unable to load posts",
            "Please try again. Check the admin TripTales API if the problem continues.",
            "error",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadPosts();

    return () => {
      cancelled = true;
    };
  }, [
    currentPage,
    searchQuery,
    selectedStatus,
    sortOrder,
    refreshKey,
    showToast,
  ]);

  // Fetch dashboard statistics.
  useEffect(() => {
    let cancelled = false;

    const loadStats = async () => {
      try {
        const result = await adminTripTalesApi.getStats();

        if (cancelled) return;

        setStats({
          total: result.total,
          published: result.published,
          blocked: result.blocked,
        });
      } catch {
        if (!cancelled) {
          showToast(
            "Unable to load statistics",
            "The TripTales statistics could not be fetched.",
            "error",
          );
        }
      }
    };

    void loadStats();

    return () => {
      cancelled = true;
    };
  }, [refreshKey, showToast]);

  // Filter handlers also reset pagination.
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: "All" | AdminPostStatus) => {
    setSelectedStatus(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: AdminPostSortOrder) => {
    setSortOrder(value);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedStatus("All");
    setSortOrder("newest");
    setCurrentPage(1);
  };

  // Block or unblock a post.
  const handleConfirmModeration = async () => {
    if (!moderationTarget || isProcessing) return;

    const { post, action } = moderationTarget;

    setIsProcessing(true);

    try {
      if (action === "block") {
        await adminTripTalesApi.blockPost(post.id);
      } else {
        await adminTripTalesApi.unblockPost(post.id);
      }

      setModerationTarget(null);

      showToast(
        action === "block" ? "Post Blocked" : "Post Unblocked",
        action === "block"
          ? `"${post.title}" has been blocked.`
          : `"${post.title}" has been published again.`,
      );

      // Refresh the posts and statistics through their effects.
      setRefreshKey((previous) => previous + 1);
    } catch {
      showToast(
        "Action failed",
        `The post could not be ${
          action === "block" ? "blocked" : "unblocked"
        }. Please try again.`,
        "error",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // Export the posts currently displayed in the table.
  const handleExport = () => {
    if (posts.length === 0) {
      showToast(
        "Nothing to export",
        "There are no posts on this page.",
        "warning",
      );
      return;
    }

    const escapeCsv = (value: string | number) =>
      `"${String(value).replace(/"/g, '""')}"`;

    const rows = [
      ["ID", "Title", "Author", "Destination", "Status", "Created At"],
      ...posts.map((post) => [
        post.id,
        post.title,
        post.user.fullName,
        post.destination,
        post.status,
        new Date(post.createdAt).toISOString(),
      ]),
    ];

    const csv = rows.map((row) => row.map(escapeCsv).join(",")).join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "triptales-moderation.csv";

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);

    showToast(
      "Export Complete",
      `Exported ${posts.length} posts from the current page.`,
    );
  };

  return (
    <div className="w-full min-w-0 text-[#0F172A] font-['Plus_Jakarta_Sans',sans-serif] antialiased">
      <main className="w-full min-w-0 space-y-6">
        <TripTalesPageHeader onExport={handleExport} />

        <TripTalesStats stats={stats} />

        <TripTalesFilters
          searchQuery={searchQuery}
          setSearchQuery={handleSearchChange}
          selectedStatus={selectedStatus}
          setSelectedStatus={handleStatusChange}
          sortOrder={sortOrder}
          setSortOrder={handleSortChange}
          onClear={handleClearFilters}
        />

        <TripTalesTable
          posts={posts}
          loading={loading}
          currentPage={currentPage}
          totalPages={totalPages}
          totalPosts={totalPosts}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          onViewPost={setViewingPost}
          onModeration={setModerationTarget}
          onPageChange={setCurrentPage}
          onClearFilters={handleClearFilters}
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
