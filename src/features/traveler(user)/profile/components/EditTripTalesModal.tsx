import { useState, type FormEvent, type ReactNode } from "react";
import { X, MapPin, Plus, Check } from "lucide-react";
import type { PostItem } from "../types/my-trip-tales.types";

interface Props {
  post: PostItem;
  onSave: (updatedPost: PostItem) => void;
  onClose: () => void;
}

const EditTripTalesModal = ({ post, onSave, onClose }: Props) => {
  const [title, setTitle] = useState(post.title);
  const [destination, setDestination] = useState(post.destination);
  const [leadParagraph, setLeadParagraph] = useState(
    post.richContent.leadParagraph,
  );
  const [tags, setTags] = useState<string[]>([...post.tags]);
  const [newTag, setNewTag] = useState("");

  // Add a new hashtag.
  const addTag = () => {
    const cleaned = newTag.trim().replace(/^#/, "");

    if (cleaned && !tags.includes(`#${cleaned}`)) {
      setTags((current) => [...current, `#${cleaned}`]);
    }

    setNewTag("");
  };

  // Remove a hashtag.
  const removeTag = (tagToRemove: string) => {
    setTags((current) => current.filter((tag) => tag !== tagToRemove));
  };

  // Submit updated post.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedPost: PostItem = {
      ...post,
      title: title.trim(),
      destination: destination.trim(),
      excerpt: leadParagraph.trim(),
      tags,
      richContent: {
        ...post.richContent,
        leadParagraph: leadParagraph.trim(),
      },
    };

    onSave(updatedPost);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-post-title"
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-slate-950/75 p-4 backdrop-blur-sm"
    >
      <div className="max-h-[92vh] w-full max-w-2xl space-y-5 overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2
              id="edit-post-title"
              className="text-lg font-black text-slate-900"
            >
              Edit Your TripTale
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Update your story details.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close edit modal"
            className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <Field label="Story Title">
            <input
              type="text"
              required
              maxLength={150}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputClass}
            />
          </Field>

          {/* Destination */}
          <Field label="Destination">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-600" />

              <input
                type="text"
                required
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className={`${inputClass} pl-10`}
              />
            </div>
          </Field>

          {/* Content */}
          <Field label="Story Summary / Lead Paragraph">
            <textarea
              rows={5}
              value={leadParagraph}
              onChange={(e) => setLeadParagraph(e.target.value)}
              className={`${inputClass} h-auto resize-y py-3`}
            />
          </Field>

          {/* Existing Media */}
          {post.media.length > 0 && (
            <Field label={`Attached Media (${post.media.length})`}>
              <div className="grid grid-cols-4 gap-2">
                {post.media.map((media) => (
                  <div
                    key={media.id}
                    className="aspect-square overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
                  >
                    {media.type === "video" ? (
                      <video
                        src={media.url}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <img
                        src={media.url}
                        alt={media.caption || "Post media"}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>

              <p className="mt-2 text-[11px] text-slate-400">
                Media removal and uploads will be connected to your existing
                media API.
              </p>
            </Field>
          )}

          {/* Hashtags */}
          <Field label="Topic Hashtags">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-bold text-[#15803D]"
                >
                  {tag}

                  <button
                    type="button"
                    aria-label={`Remove ${tag}`}
                    onClick={() => removeTag(tag)}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="mt-2 flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
                placeholder="Add a tag"
                className={inputClass}
              />

              <button
                type="button"
                onClick={addTag}
                className="rounded-xl border border-slate-200 px-3 text-slate-600 hover:bg-slate-50"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </Field>

          {/* Actions */}
          <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-[#15803D] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#166534]"
            >
              <Check className="h-4 w-4" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#15803D] focus:bg-white";

const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="space-y-2">
    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
      {label}
    </label>
    {children}
  </div>
);

export default EditTripTalesModal;
