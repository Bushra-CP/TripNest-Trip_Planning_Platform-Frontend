import {
  AlertTriangle,
  Trash2,
  X,
} from "lucide-react";

import type {
  KnowledgeDocument,
} from "../types/knowledge-document.types";

interface DeleteDocumentModalProps {
  document: KnowledgeDocument | null;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

const DeleteDocumentModal = ({
  document,
  onClose,
  onConfirm,
  loading = false,
}: DeleteDocumentModalProps) => {
  if (!document) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-slate-800">
            Delete Document
          </h2>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50">
              <AlertTriangle
                size={21}
                className="text-red-500"
              />
            </div>

            <div>
              <p className="text-sm font-medium text-slate-700">
                Are you sure you want to delete this document?
              </p>

              <p className="mt-2 text-sm text-slate-500">
                <span className="font-semibold text-slate-700">
                  {document.title}
                </span>{" "}
                will be removed from the knowledge base.
              </p>

              <p className="mt-2 text-xs text-slate-400">
                This action cannot be undone.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="h-10 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="flex h-10 items-center gap-2 rounded-lg bg-red-600 px-5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Trash2 size={16} />

            {loading ? "Deleting..." : "Delete Document"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteDocumentModal;