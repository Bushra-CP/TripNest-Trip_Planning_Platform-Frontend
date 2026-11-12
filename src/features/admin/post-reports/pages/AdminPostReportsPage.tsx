import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import AdminPostReportsPageHeader from "../components/AdminPostReportsPageHeader";
import AdminPostReportsStats from "../components/AdminPostReportsStats";
import AdminPostReportsFilters from "../components/AdminPostReportsFilters";
import AdminPostReportsTable from "../components/AdminPostReportsTable";
import AdminPostReportsModals from "../components/AdminPostReportsModals";

import { useAdminPostReports } from "../hooks/useAdminPostReports";

import type {
  AdminPostReportReason,
  AdminPostReportSortOrder,
  AdminPostReportStatus,
} from "../types/admin-post-reports.types";

const AdminPostReportsPage = () => {
  // ==========================================
  // CUSTOM HOOK
  // ==========================================

  const {
    reports,
    selectedReport,
    stats,
    pagination,

    isLoading,
    isStatsLoading,
    isDetailLoading,
    isUpdatingStatus,

    fetchReports,
    fetchStats,
    fetchReportById,
    updateReportStatus,
    clearReport,
  } = useAdminPostReports();

  // ==========================================
  // FILTER STATES
  // ==========================================

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState<AdminPostReportStatus | "">("");

  const [reason, setReason] = useState<AdminPostReportReason | "">("");

  const [sort, setSort] = useState<AdminPostReportSortOrder>("newest");

  const [currentPage, setCurrentPage] = useState(1);

  // ==========================================
  // MODAL STATE
  // ==========================================

  const [isModalOpen, setIsModalOpen] = useState(false);

  // ==========================================
  // FETCH REPORTS
  // ==========================================

  const loadReports = useCallback(() => {
    return fetchReports({
      page: currentPage,
      limit: 10,
      search,
      status: status || undefined,
      reason: reason || undefined,
      sort,
    });
  }, [fetchReports, currentPage, search, status, reason, sort]);

  // ==========================================
  // INITIAL DATA FETCH
  // ==========================================

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // ==========================================
  // FETCH REPORTS WHEN FILTERS CHANGE
  // ==========================================

  useEffect(() => {
    const timer = setTimeout(() => {
      loadReports();
    }, 400);

    return () => clearTimeout(timer);
  }, [loadReports]);

  // ==========================================
  // SEARCH HANDLER
  // ==========================================

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  // ==========================================
  // STATUS FILTER HANDLER
  // ==========================================

  const handleStatusChange = (value: AdminPostReportStatus | "") => {
    setStatus(value);
    setCurrentPage(1);
  };

  // ==========================================
  // REASON FILTER HANDLER
  // ==========================================

  const handleReasonChange = (value: AdminPostReportReason | "") => {
    setReason(value);
    setCurrentPage(1);
  };

  // ==========================================
  // SORT HANDLER
  // ==========================================

  const handleSortChange = (value: AdminPostReportSortOrder) => {
    setSort(value);
    setCurrentPage(1);
  };

  // ==========================================
  // CLEAR FILTERS
  // ==========================================

  const handleClearFilters = () => {
    setSearch("");
    setStatus("");
    setReason("");
    setSort("newest");
    setCurrentPage(1);
  };

  // ==========================================
  // PAGINATION HANDLER
  // ==========================================

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // ==========================================
  // VIEW REPORT DETAILS
  // ==========================================

  const handleViewReport = async (reportId: string) => {
    setIsModalOpen(true);

    try {
      await fetchReportById(reportId);
    } catch (error) {
      setIsModalOpen(false);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to load report details",
      );
    }
  };

  // ==========================================
  // CLOSE REPORT MODAL
  // ==========================================

  const handleCloseModal = () => {
    setIsModalOpen(false);
    clearReport();
  };

  // ==========================================
  // UPDATE REPORT STATUS
  // ==========================================

  const handleUpdateStatus = async (
    reportId: string,
    newStatus: AdminPostReportStatus,
  ) => {
    try {
      await updateReportStatus(reportId, newStatus);

      toast.success(`Report status updated to ${newStatus.toLowerCase()}`);

      // Refresh the report list after updating its status.
      await loadReports();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update report status",
      );
    }
  };

  // ==========================================
  // EXPORT CURRENT PAGE
  // ==========================================

  const handleExport = () => {
    if (reports.length === 0) {
      toast.error("No reports available to export");
      return;
    }

    const headers = [
      "Report ID",
      "Reporter",
      "Post Title",
      "Destination",
      "Reason",
      "Description",
      "Status",
      "Submitted On",
    ];

    const rows = reports.map((report) => [
      report._id,
      report.reporter?.fullName || "Unknown Reporter",
      report.post?.title || "Post Unavailable",
      report.post?.destination || "",
      report.reason,
      report.description || "",
      report.status,
      report.createdAt,
    ]);

    // Escape CSV values to handle commas and quotation marks.
    const escapeCSV = (value: string) =>
      `"${String(value).replace(/"/g, '""')}"`;

    const csvContent = [
      headers.map(escapeCSV).join(","),
      ...rows.map((row) =>
        row.map((value) => escapeCSV(String(value))).join(","),
      ),
    ].join("\n");

    // Create and download the CSV file.
    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "admin-post-reports.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    toast.success("Reports exported successfully");
  };

  // ==========================================
  // RENDER PAGE
  // ==========================================

  return (
    <div className="space-y-6">
      {/* PAGE HEADER */}

      <AdminPostReportsPageHeader onExport={handleExport} />

      {/* STATISTICS */}

      <AdminPostReportsStats stats={stats} isLoading={isStatsLoading} />

      {/* FILTERS */}

      <AdminPostReportsFilters
        search={search}
        status={status}
        reason={reason}
        sort={sort}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        onReasonChange={handleReasonChange}
        onSortChange={handleSortChange}
        onClearFilters={handleClearFilters}
      />

      {/* ERROR MESSAGE */}

      {/* REPORTS TABLE */}

      <AdminPostReportsTable
        reports={reports}
        pagination={pagination}
        isLoading={isLoading}
        onView={handleViewReport}
        onPageChange={handlePageChange}
      />

      {/* REPORT DETAILS MODAL */}

      {isModalOpen && (
        <AdminPostReportsModals
          report={selectedReport}
          isLoading={isDetailLoading}
          isUpdatingStatus={isUpdatingStatus}
          onClose={handleCloseModal}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </div>
  );
};

export default AdminPostReportsPage;
