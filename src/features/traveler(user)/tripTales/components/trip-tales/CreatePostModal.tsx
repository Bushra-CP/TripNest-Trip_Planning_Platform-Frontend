import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  X,
  Bold,
  Italic,
  Underline,
  List,
  Quote,
  Link2,
  MapPin,
  UploadCloud,
  Plus,
  Trash2,
  Play,
  Send,
} from "lucide-react";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import UnderlineExtension from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { useTripTales } from "../../hooks/useTripTales";
import { toast } from "sonner";
import type { CreatePostData } from "../../types/trip-tales.types";

interface Props {
  onClose: () => void;
  onPostCreated?: () => void | Promise<void>;
}

interface MediaItem {
  id: string;
  url: string;
  type: "image" | "video";
  file: File;
}

const MAX_MEDIA_COUNT = 10;

const CreatePostModal = ({ onClose, onPostCreated }: Props) => {
  const { createPost } = useTripTales();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const createdUrlsRef = useRef<Set<string>>(new Set());

  const [title, setTitle] = useState("");
  const [destination, setDestination] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [mediaError, setMediaError] = useState("");
  const [tagError, setTagError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      UnderlineExtension,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "tiptap-editor w-full min-h-[220px] p-5 outline-none text-sm text-slate-700 leading-relaxed",
      },
    },
  });

  const plainTextContent = editor?.getText() ?? "";

  const wordsCount = plainTextContent.trim()
    ? plainTextContent.trim().split(/\s+/).length
    : 0;

  const estimatedReadTime =
    wordsCount > 0 ? Math.max(1, Math.ceil(wordsCount / 200)) : 1;

  // Revoke all remaining preview URLs when the modal unmounts.
  useEffect(() => {
    return () => {
      createdUrlsRef.current.forEach((url) => {
        URL.revokeObjectURL(url);
      });

      createdUrlsRef.current.clear();
    };
  }, []);

  // Add media files.
  const addMediaFiles = (files: File[]) => {
    setMediaError("");

    const remainingSlots = MAX_MEDIA_COUNT - mediaList.length;

    if (remainingSlots <= 0) {
      setMediaError(`Maximum ${MAX_MEDIA_COUNT} media files allowed.`);
      return;
    }

    const validFiles = files.filter(
      (file) =>
        file.type.startsWith("image/") || file.type.startsWith("video/"),
    );

    if (validFiles.length === 0) {
      setMediaError("Please select valid image or video files.");
      return;
    }

    const filesToAdd = validFiles.slice(0, remainingSlots);

    const newMedia: MediaItem[] = filesToAdd.map((file) => {
      const url = URL.createObjectURL(file);

      createdUrlsRef.current.add(url);

      return {
        id: crypto.randomUUID(),
        url,
        type: file.type.startsWith("image/") ? "image" : "video",
        file,
      };
    });

    setMediaList((previous) => [...previous, ...newMedia]);

    if (validFiles.length > remainingSlots) {
      setMediaError(
        `Only ${remainingSlots} file(s) could be added. Maximum ${MAX_MEDIA_COUNT} allowed.`,
      );
    }
  };

  // File input.
  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);

    if (files.length > 0) {
      addMediaFiles(files);
    }

    event.target.value = "";
  };

  // Drag and drop.
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    addMediaFiles(Array.from(event.dataTransfer.files));
  };

  // Remove media.
  const handleRemoveMedia = (mediaId: string) => {
    setMediaList((previous) => {
      const item = previous.find((media) => media.id === mediaId);

      if (item) {
        URL.revokeObjectURL(item.url);
        createdUrlsRef.current.delete(item.url);
      }

      return previous.filter((media) => media.id !== mediaId);
    });
  };

  // Add tag.
  const handleAddTag = () => {
    const cleaned = newTag.trim().replace(/^#/, "");

    if (!cleaned) return;

    const formatted = `#${cleaned}`;

    if (tags.some((tag) => tag.toLowerCase() === formatted.toLowerCase())) {
      setTagError("This tag has already been added.");
      return;
    }

    setTags((previous) => [...previous, formatted]);
    setNewTag("");
    setTagError("");
  };

  // Remove tag.
  const handleRemoveTag = (tagToRemove: string) => {
    setTags((previous) => previous.filter((tag) => tag !== tagToRemove));
  };

  // Add or remove a link.
  const handleSetLink = () => {
    if (!editor) return;

    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL:", previousUrl || "");

    if (url === null) return;

    if (!url.trim()) {
      editor.chain().focus().unsetLink().run();
      return;
    }

    editor
      .chain()
      .focus()
      .setLink({
        href: url.trim(),
        target: "_blank",
      })
      .run();
  };

  // Publish post.
  const handlePublish = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    const content = editor?.getHTML() ?? "";
    const plainText = editor?.getText().trim() ?? "";

    if (!plainText) {
      toast.error("Please enter some content for your post.");
      return;
    }

    const postData: CreatePostData = {
      title: title.trim(),
      destination: destination.trim(),
      content,
      tags,
      media: mediaList.map((item) => item.file),
    };

    setIsSubmitting(true);

    try {
      await createPost(postData, async () => {
        await onPostCreated?.();
        onClose();
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-post-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSubmitting) {
          onClose();
        }
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
    >
      <div className="flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <header className="flex shrink-0 items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2
              id="create-post-title"
              className="text-lg font-black text-slate-900"
            >
              Create Post
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Share your travel experience
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Close modal"
            className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {/* Form */}
        <form onSubmit={handlePublish} className="flex min-h-0 flex-1 flex-col">
          <div className="flex-1 space-y-5 overflow-y-auto p-6">
            {/* Title */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="create-post-title-input"
                  className="text-xs font-bold text-slate-600"
                >
                  Post Title
                  <span className="ml-1 font-normal text-slate-400">
                    (Optional)
                  </span>
                </label>

                <span className="text-[10px] text-slate-400">
                  {title.length}/90
                </span>
              </div>

              <input
                id="create-post-title-input"
                type="text"
                maxLength={90}
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Give your post a title..."
                disabled={isSubmitting}
                className={inputClass}
              />
            </div>

            {/* Destination */}
            <div className="space-y-2">
              <label
                htmlFor="create-post-destination"
                className="text-xs font-bold text-slate-600"
              >
                Destination
                <span className="ml-1 font-normal text-slate-400">
                  (Optional)
                </span>
              </label>

              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-600" />

                <input
                  id="create-post-destination"
                  type="text"
                  value={destination}
                  onChange={(event) => setDestination(event.target.value)}
                  placeholder="Where was this?"
                  disabled={isSubmitting}
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>

            {/* Content editor */}
            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-slate-50 px-4 py-3">
                <ToolbarButton
                  title="Bold"
                  active={editor?.isActive("bold") ?? false}
                  onClick={() => editor?.chain().focus().toggleBold().run()}
                  disabled={isSubmitting}
                >
                  <Bold className="h-4 w-4" />
                </ToolbarButton>

                <ToolbarButton
                  title="Italic"
                  active={editor?.isActive("italic") ?? false}
                  onClick={() => editor?.chain().focus().toggleItalic().run()}
                  disabled={isSubmitting}
                >
                  <Italic className="h-4 w-4" />
                </ToolbarButton>

                <ToolbarButton
                  title="Underline"
                  active={editor?.isActive("underline") ?? false}
                  onClick={() =>
                    editor?.chain().focus().toggleUnderline().run()
                  }
                  disabled={isSubmitting}
                >
                  <Underline className="h-4 w-4" />
                </ToolbarButton>

                <span className="mx-1 h-5 w-px bg-slate-300" />

                <ToolbarButton
                  title="Bullet List"
                  active={editor?.isActive("bulletList") ?? false}
                  onClick={() =>
                    editor?.chain().focus().toggleBulletList().run()
                  }
                  disabled={isSubmitting}
                >
                  <List className="h-4 w-4" />
                </ToolbarButton>

                <ToolbarButton
                  title="Quote"
                  active={editor?.isActive("blockquote") ?? false}
                  onClick={() =>
                    editor?.chain().focus().toggleBlockquote().run()
                  }
                  disabled={isSubmitting}
                >
                  <Quote className="h-4 w-4" />
                </ToolbarButton>

                <ToolbarButton
                  title="Link"
                  active={editor?.isActive("link") ?? false}
                  onClick={handleSetLink}
                  disabled={isSubmitting}
                >
                  <Link2 className="h-4 w-4" />
                </ToolbarButton>

                <div className="ml-auto text-[10px] text-slate-400">
                  {wordsCount} words · {estimatedReadTime} min read
                </div>
              </div>

              <div
                onClick={() => editor?.commands.focus()}
                className={isSubmitting ? "pointer-events-none opacity-60" : ""}
              >
                <EditorContent editor={editor} />
              </div>
            </div>

            {/* Media */}
            <div className="space-y-4 rounded-2xl border border-slate-200 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Photos & Videos
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">
                    Add multiple photos and videos to your post.
                  </p>
                </div>

                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500">
                  {mediaList.length}/{MAX_MEDIA_COUNT} items
                </span>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                multiple
                className="hidden"
                onChange={handleFileInput}
                disabled={isSubmitting}
              />

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => {
                  if (!isSubmitting && mediaList.length < MAX_MEDIA_COUNT) {
                    fileInputRef.current?.click();
                  }
                }}
                className={`cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all ${
                  isDragging
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-emerald-200 bg-emerald-50/20 hover:border-emerald-500 hover:bg-emerald-50/40"
                } ${
                  isSubmitting || mediaList.length >= MAX_MEDIA_COUNT
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
              >
                <UploadCloud className="mx-auto mb-3 h-8 w-8 text-emerald-600" />

                <p className="text-sm font-bold text-slate-800">
                  Drag & drop photos or videos here
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  or{" "}
                  <span className="font-bold text-emerald-700">
                    browse files
                  </span>
                </p>

                <p className="mt-2 text-[10px] text-slate-400">
                  Maximum {MAX_MEDIA_COUNT} files.
                </p>
              </div>

              {mediaError && (
                <p className="text-xs text-rose-500">{mediaError}</p>
              )}

              {mediaList.length > 0 && (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {mediaList.map((item, index) => (
                    <div
                      key={item.id}
                      className="group relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
                    >
                      {item.type === "image" ? (
                        <img
                          src={item.url}
                          alt={`Media ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <video
                          src={item.url}
                          controls
                          className="h-full w-full object-cover"
                        />
                      )}

                      {item.type === "video" && (
                        <span className="absolute bottom-2 left-2 flex items-center gap-1 rounded bg-black/70 px-2 py-1 text-[9px] font-bold text-white">
                          <Play className="h-3 w-3 fill-white" />
                          Video
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() => handleRemoveMedia(item.id)}
                        disabled={isSubmitting}
                        aria-label={`Remove media ${index + 1}`}
                        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white hover:bg-rose-600 disabled:opacity-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-600">
                Tags
                <span className="ml-1 font-normal text-slate-400">
                  (Optional)
                </span>
              </label>

              <div className="flex flex-wrap items-center gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700"
                  >
                    {tag}

                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      disabled={isSubmitting}
                      aria-label={`Remove ${tag}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}

                <input
                  value={newTag}
                  onChange={(event) => {
                    setNewTag(event.target.value);
                    setTagError("");
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      handleAddTag();
                    }
                  }}
                  placeholder="Add tag..."
                  disabled={isSubmitting}
                  className="h-9 w-36 rounded-full border border-dashed border-slate-300 px-3 text-xs outline-none focus:border-emerald-500"
                />

                <button
                  type="button"
                  onClick={handleAddTag}
                  disabled={isSubmitting}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-dashed border-slate-300 hover:border-emerald-500 hover:text-emerald-600"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              {tagError && <p className="text-xs text-rose-500">{tagError}</p>}
            </div>
          </div>

          {/* Footer */}
          <footer className="flex shrink-0 items-center justify-end gap-3 border-t border-slate-200 bg-white px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-xl bg-[#15803D] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-[#15803D]/25 hover:bg-[#166534] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send className="h-3.5 w-3.5" />
              {isSubmitting ? "Publishing..." : "Publish Post"}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

const inputClass =
  "h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition-all focus:border-emerald-500 focus:bg-white disabled:opacity-60";

interface ToolbarButtonProps {
  children: React.ReactNode;
  title: string;
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const ToolbarButton = ({
  children,
  title,
  active,
  onClick,
  disabled = false,
}: ToolbarButtonProps) => (
  <button
    type="button"
    title={title}
    onClick={onClick}
    disabled={disabled}
    className={`rounded-lg p-2 transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
      active
        ? "bg-emerald-100 text-emerald-700"
        : "text-slate-700 hover:bg-slate-200"
    }`}
  >
    {children}
  </button>
);

export default CreatePostModal;
