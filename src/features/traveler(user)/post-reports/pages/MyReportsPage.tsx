import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { usePostReports } from "../hooks/usePostReports";

import ReportsOverview from "../components/ReportsOverview";
import ReportsFilters from "../components/ReportsFilters";
import ReportsList from "../components/ReportsList";
import ReportModals from "../components/ReportModals";

import type {
  ReportItem,
  ReportMetrics,
  ReportReason,
  ReportStatus,
} from "../types/my-reports.types";

const PAGE_SIZE = 5;

const MyReportsPage = () => {
  const {
    fetchMyReports,
    reports,
    pagination,
    reportsLoading,
    reportsError,

    fetchMyReportById,
    selectedReport,
    reportDetailsLoading,
    reportDetailsError,

    cancelMyReport,
    cancelLoading,

    resetSelectedReport,
    clearErrors,
  } = usePostReports();

  // Filters
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"ALL" | ReportStatus>("ALL");
  const [reason, setReason] = useState<"ALL" | ReportReason>("ALL");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Modal states
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [reportToCancel, setReportToCancel] = useState<ReportItem | null>(null);

  // Fetch reports from backend
  const loadReports = useCallback(
    async (page: number) => {
      try {
        await fetchMyReports({
          page,
          limit: PAGE_SIZE,
          status: status === "ALL" ? undefined : status,
          reason: reason === "ALL" ? undefined : reason,
          search: search.trim() || undefined,
          sort,
        });
      } catch (error) {
        console.error("Failed to fetch reports:", error);
      }
    },
    [fetchMyReports, status, reason, search, sort],
  );

  // Fetch reports when filters or pagination change
  // Debounce search requests
  useEffect(() => {
    const timer = setTimeout(
      () => {
        loadReports(currentPage);
      },
      search.trim() ? 400 : 0,
    );

    return () => clearTimeout(timer);
  }, [loadReports, currentPage, search]);

  // Display fetch error
  useEffect(() => {
    if (reportsError) {
      toast.error(reportsError);
    }
  }, [reportsError]);

  // Metrics
  const metrics: ReportMetrics = useMemo(
    () => ({
      total: pagination?.totalReports ?? 0,

      pending: reports.filter((report) => report.status === "PENDING").length,

      resolved: reports.filter((report) => report.status === "RESOLVED").length,

      rejected: reports.filter((report) => report.status === "REJECTED").length,
    }),
    [reports, pagination],
  );

  // View report details
  const handleViewReport = async (report: ReportItem) => {
    setIsDetailsOpen(true);

    resetSelectedReport();
    clearErrors();

    try {
      await fetchMyReportById(report._id);
    } catch (error) {
      console.error("Failed to fetch report details:", error);
    }
  };

  // Close details modal
  const handleCloseDetails = () => {
    if (cancelLoading) return;

    setIsDetailsOpen(false);
    resetSelectedReport();
  };

  // Open cancellation confirmation
  const handleCancelClick = (report: ReportItem) => {
    if (report.status !== "PENDING") {
      toast.error("Only pending reports can be cancelled.");
      return;
    }

    setReportToCancel(report);
  };

  // Cancel report
  const handleConfirmCancel = async () => {
    if (!reportToCancel) return;

    try {
      await cancelMyReport(reportToCancel._id);

      toast.success("Report cancelled successfully.");

      setReportToCancel(null);

      // Refresh reports after cancellation
      const result = await fetchMyReports({
        page: currentPage,
        limit: PAGE_SIZE,
        status: status === "ALL" ? undefined : status,
        reason: reason === "ALL" ? undefined : reason,
        search: search.trim() || undefined,
        sort,
      });

      // Move to the last available page if the current page is now invalid
      const lastPage = Math.max(result.pagination.totalPages, 1);

      if (currentPage > lastPage) {
        setCurrentPage(lastPage);
      }
    } catch (error) {
      console.error("Failed to cancel report:", error);
      toast.error("Unable to cancel the report. Please try again.");
    }
  };

  // Pagination
  const handlePageChange = (page: number) => {
    if (page < 1) return;

    if (pagination && page > pagination.totalPages) return;

    setCurrentPage(page);
  };

  // Search change
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  // Status filter change
  const handleStatusChange = (value: "ALL" | ReportStatus) => {
    setStatus(value);
    setCurrentPage(1);
  };

  // Reason filter change
  const handleReasonChange = (value: "ALL" | ReportReason) => {
    setReason(value);
    setCurrentPage(1);
  };

  // Sort change
  const handleSortChange = (value: "newest" | "oldest") => {
    setSort(value);
    setCurrentPage(1);
  };

  // Reset filters
  const resetFilters = () => {
    setSearch("");
    setStatus("ALL");
    setReason("ALL");
    setSort("newest");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    Boolean(search.trim()) || status !== "ALL" || reason !== "ALL";

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-['Plus_Jakarta_Sans',sans-serif] text-slate-900 antialiased">
      <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <ReportsOverview metrics={metrics} />

        <ReportsFilters
          search={search}
          status={status}
          reason={reason}
          sort={sort}
          onSearchChange={handleSearchChange}
          onStatusChange={handleStatusChange}
          onReasonChange={handleReasonChange}
          onSortChange={handleSortChange}
          onReset={resetFilters}
        />

        <ReportsList
          reports={reports}
          totalReports={pagination?.totalReports ?? 0}
          currentPage={pagination?.currentPage ?? currentPage}
          totalPages={pagination?.totalPages ?? 0}
          pageSize={PAGE_SIZE}
          loading={reportsLoading}
          hasAnyReports={hasActiveFilters}
          onView={handleViewReport}
          onCancel={handleCancelClick}
          onPageChange={handlePageChange}
          onResetFilters={resetFilters}
        />
      </main>

      <ReportModals
        isDetailsOpen={isDetailsOpen}
        selectedReport={selectedReport}
        detailsLoading={reportDetailsLoading}
        detailsError={reportDetailsError}
        onCloseDetails={handleCloseDetails}
        reportToCancel={reportToCancel}
        onCloseCancel={() => {
          if (!cancelLoading) {
            setReportToCancel(null);
          }
        }}
        onConfirmCancel={handleConfirmCancel}
        onCancelFromDetails={handleCancelClick}
        cancelLoading={cancelLoading}
      />
    </div>
  );
};

export default MyReportsPage;
