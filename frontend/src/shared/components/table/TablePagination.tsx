import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PaginationProps } from "./types";

const TablePagination = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: PaginationProps) => {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;

  const endItem = Math.min(currentPage * pageSize, totalItems);

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-4">
      <p className="text-sm text-slate-500">
        Showing{" "}
        <span className="font-semibold text-slate-700">{startItem}</span> to{" "}
        <span className="font-semibold text-slate-700">{endItem}</span> of{" "}
        <span className="font-semibold text-slate-700">{totalItems}</span>{" "}
        entries
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeft size={16} />
          Previous
        </button>

        <div className="flex items-center gap-1">
          {pages.map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`h-9 w-9 rounded-lg text-sm font-medium transition-colors ${
                page === currentPage
                  ? "bg-slate-900 text-white"
                  : "hover:bg-slate-200"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default TablePagination;
