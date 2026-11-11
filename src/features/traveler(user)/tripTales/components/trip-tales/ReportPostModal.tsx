import React, { useEffect, useState } from "react";
import { AlertTriangle, X, Loader2 } from "lucide-react";

import type {
  CreatePostReportPayload,
  PostReportReason,
} from "@/features/traveler(user)/post-reports/types/post-report.types";

interface ReportPostModalProps {
  isOpen: boolean;
  postTitle?: string;
  authorName: string;
  isSubmitting?: boolean;
  onClose: () => void;
  onSubmit: (payload: CreatePostReportPayload) => Promise<void>;
}

const REPORT_REASONS: {
  value: PostReportReason;
  label: string;
  description: string;
}[] = [
  {
    value: "SPAM",
    label: "Spam",
    description: "Promotional or repetitive unwanted content.",
  },
  {
    value: "INAPPROPRIATE_CONTENT",
    label: "Inappropriate Content",
    description: "Content that is inappropriate for the community.",
  },
  {
    value: "HARASSMENT",
    label: "Harassment",
    description: "Bullying, threats, or targeted harassment.",
  },
  {
    value: "HATE_SPEECH",
    label: "Hate Speech",
    description: "Content that attacks or discriminates against others.",
  },
  {
    value: "FALSE_INFORMATION",
    label: "False Information",
    description: "Misleading or potentially harmful information.",
  },
  {
    value: "COPYRIGHT_VIOLATION",
    label: "Copyright Violation",
    description: "Content that may violate someone else's copyright.",
  },
  {
    value: "OTHER",
    label: "Other",
    description: "Something else that violates community guidelines.",
  },
];

const ReportPostModal: React.FC<ReportPostModalProps> = ({
  isOpen,
  postTitle,
  authorName,
  isSubmitting,
  onClose,
  onSubmit,
}) => {
  const [reason, setReason] = useState<PostReportReason | "">("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setReason("");
      setDescription("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSubmitting) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, isSubmitting, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!reason || isSubmitting) return;

    try {
      await onSubmit({
        reason,
        description: description.trim() || undefined,
      });

      onClose();
    } catch {
      // Parent component handles the error toast.
      // Keep the modal open so the user can retry.
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSubmitting) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* HEADER */}
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>

            <div>
              <h2 className="text-lg font-extrabold text-slate-900">
                Report Post
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Help us keep TripTales safe for everyone.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
            aria-label="Close report modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-5 px-6 py-5">
            {/* POST INFORMATION */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Reporting post by
              </p>

              <p className="text-sm font-bold text-slate-800">{authorName}</p>

              {postTitle && (
                <p className="mt-1 line-clamp-2 text-xs text-slate-500">
                  {postTitle}
                </p>
              )}
            </div>

            {/* REASON */}
            <div>
              <label
                htmlFor="report-reason"
                className="mb-2 block text-sm font-bold text-slate-800"
              >
                Why are you reporting this post?
                <span className="ml-1 text-red-500">*</span>
              </label>

              <select
                id="report-reason"
                value={reason}
                onChange={(event) =>
                  setReason(event.target.value as PostReportReason | "")
                }
                disabled={isSubmitting}
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 disabled:bg-slate-100"
              >
                <option value="" disabled>
                  Select a reason
                </option>

                {REPORT_REASONS.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>

              {reason && (
                <p className="mt-2 text-xs text-slate-500">
                  {
                    REPORT_REASONS.find((item) => item.value === reason)
                      ?.description
                  }
                </p>
              )}
            </div>

            {/* DESCRIPTION */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="report-description"
                  className="text-sm font-bold text-slate-800"
                >
                  Additional details
                  <span className="ml-1 font-normal text-slate-400">
                    (Optional)
                  </span>
                </label>

                <span className="text-[11px] text-slate-400">
                  {description.length}/500
                </span>
              </div>

              <textarea
                id="report-description"
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value.slice(0, 500))
                }
                disabled={isSubmitting}
                rows={4}
                maxLength={500}
                placeholder="Please provide additional information about the issue..."
                className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 disabled:bg-slate-100"
              />
            </div>

            {/* INFORMATION */}
            <div className="rounded-lg bg-amber-50 px-4 py-3">
              <p className="text-xs leading-relaxed text-amber-800">
                Reports are reviewed by our moderation team. Please submit
                genuine reports to help maintain a respectful travel community.
              </p>
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-100 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!reason || isSubmitting}
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}

              {isSubmitting ? "Submitting..." : "Submit Report"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportPostModal;
