import {
  ExternalLink,
  FileText,
  X,
} from "lucide-react";

import type {
  KnowledgeDocument,
} from "../types/knowledge-document.types";

interface ViewDocumentModalProps {
  document: KnowledgeDocument | null;
  onClose: () => void;
}

const ViewDocumentModal = ({
  document,
  onClose,
}: ViewDocumentModalProps) => {
  if (!document) {
    return null;
  }

  const formatDate = (date: string): string => {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "-";
    }

    return parsedDate.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusLabel = (): string => {
    switch (document.status) {
      case "PENDING":
        return "Uploaded";

      case "PROCESSING":
        return "Processing";

      case "READY":
        return "Ready";

      case "FAILED":
        return "Failed";

      default:
        return document.status;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100">
              <FileText
                size={19}
                className="text-slate-600"
              />
            </div>

            <div className="min-w-0">
              <h2
                className="truncate text-lg font-semibold text-slate-800"
                title={document.title}
              >
                {document.title}
              </h2>

              <p className="text-xs text-slate-400">
                {document.fileType} document
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-5 px-6 py-6">
          {/* Description */}
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Description
            </p>

            <p className="text-sm text-slate-600">
              {document.description || "No description provided."}
            </p>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs text-slate-400">
                Destination
              </p>

              <p className="mt-1 text-sm font-medium text-slate-700">
                {document.destination || "-"}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs text-slate-400">
                Category
              </p>

              <p className="mt-1 text-sm font-medium text-slate-700">
                {document.category}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs text-slate-400">
                File Type
              </p>

              <p className="mt-1 text-sm font-medium text-slate-700">
                {document.fileType}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs text-slate-400">
                Status
              </p>

              <p className="mt-1 text-sm font-medium text-slate-700">
                {getStatusLabel()}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs text-slate-400">
                Chunks
              </p>

              <p className="mt-1 text-sm font-medium text-slate-700">
                {document.chunkCount}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs text-slate-400">
                Uploaded On
              </p>

              <p className="mt-1 text-sm font-medium text-slate-700">
                {formatDate(document.uploadedAt)}
              </p>
            </div>
          </div>

          {/* Open document */}
          {document.fileUrl && (
            <a
              href={document.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <ExternalLink size={17} />
              Open Document
            </a>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-slate-200 bg-slate-50 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-lg bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewDocumentModal;