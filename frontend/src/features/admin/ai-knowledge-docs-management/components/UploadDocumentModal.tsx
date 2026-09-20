import {
  FileText,
  Upload,
  X,
} from "lucide-react";
import {
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import type {
  KnowledgeDocumentFileType,
} from "../types/knowledge-document.types";

interface UploadDocumentModalProps {
  open: boolean;
  onClose: () => void;
  onUpload: (data: UploadDocumentFormData) => void;
  loading?: boolean;
}

export interface UploadDocumentFormData {
  title: string;
  description: string;
  destination: string;
  category: string;
  file: File;
  fileType: KnowledgeDocumentFileType;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_FILE_TYPES = {
  pdf: "PDF",
  docx: "DOCX",
  txt: "TXT",
} as const;

const UploadDocumentModal = ({
  open,
  onClose,
  onUpload,
  loading = false,
}: UploadDocumentModalProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [destination, setDestination] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  if (!open) {
    return null;
  }

  const getFileType = (
    selectedFile: File,
  ): KnowledgeDocumentFileType | null => {
    const extension = selectedFile.name
      .split(".")
      .pop()
      ?.toLowerCase();

    if (!extension) {
      return null;
    }

    return (
      ALLOWED_FILE_TYPES[
        extension as keyof typeof ALLOWED_FILE_TYPES
      ] ?? null
    );
  };

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    setError("");

    if (selectedFile.size > MAX_FILE_SIZE) {
      setFile(null);
      setError("File size must not exceed 10 MB.");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      return;
    }

    const fileType = getFileType(selectedFile);

    if (!fileType) {
      setFile(null);
      setError("Only PDF, DOCX, and TXT files are supported.");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      return;
    }

    setFile(selectedFile);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    if (!category.trim()) {
      setError("Category is required.");
      return;
    }

    if (!file) {
      setError("Please select a document.");
      return;
    }

    const fileType = getFileType(file);

    if (!fileType) {
      setError("Only PDF, DOCX, and TXT files are supported.");
      return;
    }

    onUpload({
      title: title.trim(),
      description: description.trim(),
      destination: destination.trim(),
      category: category.trim(),
      file,
      fileType,
    });
  };

  const handleClose = () => {
    if (loading) {
      return;
    }

    setTitle("");
    setDescription("");
    setDestination("");
    setCategory("");
    setFile(null);
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Upload Document
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Add a document to the AI knowledge base.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="max-h-[70vh] overflow-y-auto px-6 py-6">
            <div className="space-y-5">
              {/* Title */}
              <div>
                <label
                  htmlFor="document-title"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Title <span className="text-red-500">*</span>
                </label>

                <input
                  id="document-title"
                  type="text"
                  value={title}
                  onChange={(event) =>
                    setTitle(event.target.value)
                  }
                  placeholder="Example: Kerala Travel Guide"
                  className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="document-description"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Description
                </label>

                <textarea
                  id="document-description"
                  value={description}
                  onChange={(event) =>
                    setDescription(event.target.value)
                  }
                  placeholder="Brief description about this document..."
                  rows={3}
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                />
              </div>

              {/* Destination + Category */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Destination */}
                <div>
                  <label
                    htmlFor="document-destination"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Destination
                  </label>

                  <input
                    id="document-destination"
                    type="text"
                    value={destination}
                    onChange={(event) =>
                      setDestination(event.target.value)
                    }
                    placeholder="Example: Kerala"
                    className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                  />
                </div>

                {/* Category */}
                <div>
                  <label
                    htmlFor="document-category"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Category <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="document-category"
                    type="text"
                    value={category}
                    onChange={(event) =>
                      setCategory(event.target.value)
                    }
                    placeholder="Example: Travel Guide"
                    className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                  />
                </div>
              </div>

              {/* File Upload */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Document <span className="text-red-500">*</span>
                </label>

                {!file ? (
                  <button
                    type="button"
                    onClick={() =>
                      fileInputRef.current?.click()
                    }
                    className="flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 px-6 py-8 transition hover:border-slate-400 hover:bg-slate-50"
                  >
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-slate-100">
                      <Upload
                        size={20}
                        className="text-slate-500"
                      />
                    </div>

                    <p className="text-sm font-medium text-slate-700">
                      Click to upload a document
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      PDF, DOCX or TXT · Maximum 10 MB
                    </p>
                  </button>
                ) : (
                  <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white">
                        <FileText
                          size={19}
                          className="text-slate-600"
                        />
                      </div>

                      <div className="min-w-0">
                        <p
                          className="truncate text-sm font-medium text-slate-700"
                          title={file.name}
                        >
                          {file.name}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      disabled={loading}
                      className="ml-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white hover:text-red-500 disabled:cursor-not-allowed"
                    >
                      <X size={17} />
                    </button>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="h-10 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex h-10 items-center gap-2 rounded-lg bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Uploading..." : "Upload Document"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadDocumentModal;