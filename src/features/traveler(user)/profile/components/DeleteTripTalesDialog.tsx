import { AlertTriangle } from "lucide-react";
import type { PostItem } from "../types/my-trip-tales.types";

interface Props {
  post: PostItem;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting?: boolean;
}

const DeleteTripTalesDialog = ({
  post,
  onConfirm,
  onCancel,
  isDeleting = false,
}: Props) => (
  <div
    role="alertdialog"
    aria-modal="true"
    aria-labelledby="delete-post-title"
    className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm"
  >
    <div className="w-full max-w-md space-y-5 rounded-3xl border border-rose-100 bg-white p-6 shadow-2xl">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-rose-100 bg-rose-50 text-rose-600">
        <AlertTriangle className="h-6 w-6" />
      </div>
      <div className="space-y-2 text-center">
        <h2
          id="delete-post-title"
          className="text-lg font-black text-slate-900"
        >
          Delete this TripTale?
        </h2>
        <p className="text-sm leading-relaxed text-slate-500">
          Are you sure you want to permanently delete{" "}
          <strong className="text-slate-800">"{post.title}"</strong>? This
          action cannot be undone.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          disabled={isDeleting}
          onClick={onCancel}
          className="rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="button"
          disabled={isDeleting}
          onClick={onConfirm}
          className="rounded-xl bg-rose-600 py-2.5 text-xs font-bold text-white hover:bg-rose-700 disabled:opacity-50"
        >
          {isDeleting ? "Deleting..." : "Delete Post"}
        </button>
      </div>
    </div>
  </div>
);

export default DeleteTripTalesDialog;
