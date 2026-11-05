import { useState } from "react";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  X,
  Check,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Send,
} from "lucide-react";

import type { CommentResponse } from "../../types/trip-tales.types";

interface CommentItemProps {
  comment: CommentResponse;
  currentUserId?: string;

  allowReplies?: boolean;

  onEdit: (commentId: string, content: string) => Promise<void>;
  onDelete: (commentId: string) => Promise<void>;
  onReply: (commentId: string, content: string) => Promise<void>;

  editing: boolean;
  deletingCommentId: string | null;
}

const CommentItem = ({
  comment,
  currentUserId,
  allowReplies = true,
  onEdit,
  onDelete,
  onReply,
  editing,
  deletingCommentId,
}: CommentItemProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [showReplies, setShowReplies] = useState(false);

  const isOwner = currentUserId === comment.user.id;
  const deleting = deletingCommentId === comment.id;

  const formattedDate = new Date(comment.createdAt).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  );

  // EDIT COMMENT
  const handleEdit = async () => {
    if (!editedContent.trim()) return;

    try {
      await onEdit(comment.id, editedContent);

      setIsEditing(false);
      setMenuOpen(false);
    } catch {
      // Error notification is handled by the hook.
    }
  };

  // DELETE COMMENT
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this comment and all its replies?",
    );

    if (!confirmed) return;

    try {
      await onDelete(comment.id);
      setMenuOpen(false);
    } catch {
      // Error notification is handled by the hook.
    }
  };

  // CREATE REPLY
  const handleReply = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!replyContent.trim()) return;

    try {
      await onReply(comment.id, replyContent);

      setReplyContent("");
      setShowReplyForm(false);
      setShowReplies(true);
    } catch {
      // Error notification is handled by the hook.
    }
  };

  return (
    <div className="space-y-3">
      {/* COMMENT CARD */}

      <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
        {/* USER DETAILS */}

        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            {comment.user.profileImageUrl ? (
              <img
                src={comment.user.profileImageUrl}
                alt={comment.user.fullName}
                className="h-9 w-9 shrink-0 rounded-full border border-slate-200 object-cover"
              />
            ) : (
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#DCFCE7] text-sm font-black text-[#15803D]">
                {comment.user.fullName.charAt(0).toUpperCase()}
              </div>
            )}

            <div className="min-w-0">
              <h4 className="truncate text-xs font-bold text-slate-900">
                {comment.user.fullName}

                {isOwner && (
                  <span className="ml-2 text-[10px] font-medium text-[#15803D]">
                    You
                  </span>
                )}
              </h4>

              <span className="text-[10px] font-medium text-slate-400">
                {formattedDate}
                {comment.updatedAt !== comment.createdAt && " · Edited"}
              </span>
            </div>
          </div>

          {/* COMMENT OPTIONS */}

          {isOwner && (
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setMenuOpen((previous) => !previous)}
                aria-label="Comment options"
                className="rounded-full p-2 text-slate-400 transition hover:bg-slate-200 hover:text-slate-700"
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-full z-20 mt-1 w-36 overflow-hidden rounded-xl border border-slate-100 bg-white py-1 shadow-xl">
                  <button
                    type="button"
                    onClick={() => {
                      setEditedContent(comment.content);
                      setIsEditing(true);
                      setMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => void handleDelete()}
                    disabled={deleting}
                    className="flex w-full items-center gap-2 px-3 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 disabled:opacity-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* EDIT FORM */}

        {isEditing ? (
          <div className="mt-3 space-y-3 pl-11">
            <textarea
              rows={3}
              maxLength={1000}
              value={editedContent}
              onChange={(event) => setEditedContent(event.target.value)}
              className="w-full resize-none rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-700 outline-none transition focus:border-[#15803D]"
            />

            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-400">
                {editedContent.length}/1000
              </span>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setEditedContent(comment.content);
                  }}
                  className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-100"
                >
                  <X className="h-3.5 w-3.5" />
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() => void handleEdit()}
                  disabled={editing || !editedContent.trim()}
                  className="inline-flex items-center gap-1 rounded-lg bg-[#15803D] px-3 py-2 text-xs font-bold text-white hover:bg-[#166534] disabled:opacity-50"
                >
                  <Check className="h-3.5 w-3.5" />
                  {editing ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="mt-3 whitespace-pre-wrap break-words pl-11 text-xs leading-relaxed text-slate-700">
            {comment.content}
          </p>
        )}

        {/* COMMENT ACTIONS */}

        {!isEditing && (
          <div className="mt-3 flex items-center gap-4 pl-11">
            {allowReplies && currentUserId && (
              <button
                type="button"
                onClick={() => setShowReplyForm((previous) => !previous)}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 transition hover:text-[#15803D]"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                Reply
              </button>
            )}

            {comment.repliesCount > 0 && (
              <button
                type="button"
                onClick={() => setShowReplies((previous) => !previous)}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#15803D] transition hover:text-[#166534]"
              >
                {showReplies ? (
                  <ChevronUp className="h-3.5 w-3.5" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5" />
                )}
                {showReplies ? "Hide" : "View"} {comment.repliesCount}{" "}
                {comment.repliesCount === 1 ? "reply" : "replies"}
              </button>
            )}
          </div>
        )}
      </div>

      {/* REPLY FORM */}

      {allowReplies && showReplyForm && currentUserId && (
        <form onSubmit={handleReply} className="ml-8 flex items-start gap-2">
          <div className="flex-1">
            <textarea
              rows={2}
              maxLength={1000}
              value={replyContent}
              onChange={(event) => setReplyContent(event.target.value)}
              placeholder={`Reply to ${comment.user.fullName}...`}
              className="w-full resize-none rounded-xl border border-slate-200 bg-white p-3 text-xs outline-none transition focus:border-[#15803D]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <button
              type="submit"
              disabled={!replyContent.trim()}
              className="rounded-lg bg-[#15803D] p-2 text-white transition hover:bg-[#166534] disabled:opacity-40"
              aria-label="Send reply"
            >
              <Send className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                setShowReplyForm(false);
                setReplyContent("");
              }}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              aria-label="Cancel reply"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </form>
      )}

      {/* NESTED REPLIES */}

      {showReplies && comment.replies.length > 0 && (
        <div className="ml-5 space-y-3 border-l-2 border-[#DCFCE7] pl-3 sm:ml-8 sm:pl-4">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              currentUserId={currentUserId}
              allowReplies={allowReplies}
              onEdit={onEdit}
              onDelete={onDelete}
              onReply={onReply}
              editing={editing}
              deletingCommentId={deletingCommentId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
