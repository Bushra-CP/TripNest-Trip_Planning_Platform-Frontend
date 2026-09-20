import { Eye, FileText, Trash2 } from "lucide-react";

import type {
  KnowledgeDocument,
  KnowledgeDocumentStatus,
} from "../types/knowledge-document.types";
import { DataTable, type TableColumn } from "@/shared/components/table";

interface KnowledgeBaseTableProps {
  documents: KnowledgeDocument[];
  loading?: boolean;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onView: (document: KnowledgeDocument) => void;
  onDelete: (document: KnowledgeDocument) => void;
}

const KnowledgeBaseTable = ({
  documents,
  loading = false,
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onView,
  onDelete,
}: KnowledgeBaseTableProps) => {
  const getStatusLabel = (status: KnowledgeDocumentStatus): string => {
    switch (status) {
      case "PENDING":
        return "Uploaded";

      case "PROCESSING":
        return "Processing";

      case "READY":
        return "Ready";

      case "FAILED":
        return "Failed";

      default:
        return status;
    }
  };

  const getStatusClassName = (status: KnowledgeDocumentStatus): string => {
    switch (status) {
      case "PENDING":
        return "bg-blue-50 text-blue-700";

      case "PROCESSING":
        return "bg-amber-50 text-amber-700";

      case "READY":
        return "bg-emerald-50 text-emerald-700";

      case "FAILED":
        return "bg-red-50 text-red-700";

      default:
        return "bg-slate-50 text-slate-700";
    }
  };

  const formatUploadedDate = (date: string): string => {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "-";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const columns: TableColumn<KnowledgeDocument>[] = [
    {
      key: "document",
      title: "Document",
      width: "28%",
      render: (document) => (
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100">
            <FileText size={19} className="text-slate-600" />
          </div>

          <div className="min-w-0">
            <p
              className="truncate text-sm font-semibold text-slate-800"
              title={document.title}
            >
              {document.title}
            </p>
          </div>
        </div>
      ),
    },

    {
      key: "destination",
      title: "Destination",
      width: "15%",
      render: (document) => (
        <span className="text-sm text-slate-600">
          {document.destination || "-"}
        </span>
      ),
    },

    {
      key: "category",
      title: "Category",
      width: "14%",
      render: (document) => (
        <span className="text-sm text-slate-600">{document.category}</span>
      ),
    },

    {
      key: "fileType",
      title: "File Type",
      width: "10%",
      align: "center",
      render: (document) => (
        <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
          {document.fileType}
        </span>
      ),
    },

    {
      key: "status",
      title: "Status",
      width: "12%",
      align: "center",
      render: (document) => (
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClassName(
            document.status,
          )}`}
        >
          {getStatusLabel(document.status)}
        </span>
      ),
    },

    {
      key: "uploadedAt",
      title: "Uploaded On",
      width: "13%",
      render: (document) => (
        <span className="text-sm text-slate-500">
          {formatUploadedDate(document.uploadedAt)}
        </span>
      ),
    },

    {
      key: "actions",
      title: "Actions",
      width: "10%",
      align: "center",
      render: (document) => (
        <div className="flex items-center justify-center gap-2">
          {/* View */}
          <button
            type="button"
            onClick={() => onView(document)}
            title="View document"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
          >
            <Eye size={17} />
          </button>

          {/* Delete */}
          <button
            type="button"
            onClick={() => onDelete(document)}
            title="Delete document"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={17} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={documents ?? []}
      loading={loading}
      emptyMessage="No knowledge documents found."
      pagination={{
        currentPage,
        totalPages,
        totalItems,
        pageSize,
        onPageChange,
      }}
    />
  );
};

export default KnowledgeBaseTable;
