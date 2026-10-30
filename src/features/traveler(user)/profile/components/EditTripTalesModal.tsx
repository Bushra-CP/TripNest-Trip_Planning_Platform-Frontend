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

import type {
  MyPostResponse,
  UpdateMyPostData,
} from "../../tripTales/types/trip-tales.types";

interface Props {
  post: MyPostResponse;
  onSave: (updatedPost: UpdateMyPostData) => Promise<void>;
  onClose: () => void;
  isSaving?: boolean;
}

interface NewMediaItem {
  id: string;
  url: string;
  type: "image" | "video";
  file: File;
}

const MAX_MEDIA_COUNT = 10;

const EditTripTalesModal = ({
  post,
  onSave,
  onClose,
  isSaving = false,
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const createdUrlsRef = useRef<Set<string>>(new Set());

  // Form states
  const [title, setTitle] = useState(post.title);
  const [destination, setDestination] = useState(post.destination);
  const [content, setContent] = useState(post.content);
  const [tags, setTags] = useState<string[]>([...post.tags]);
  const [newTag, setNewTag] = useState("");

  // Existing and newly added media
  const [existingMedia, setExistingMedia] = useState(post.media);
  const [newMedia, setNewMedia] = useState<NewMediaItem[]>([]);

  const [isDragging, setIsDragging] = useState(false);
  const [mediaError, setMediaError] = useState("");
  const [tagError, setTagError] = useState("");

  // TipTap editor
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
    content: post.content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "tiptap-editor w-full min-h-[220px] p-5 outline-none text-sm text-slate-700 leading-relaxed",
      },
    },
  });

  // Word count
  const plainTextContent = editor?.getText() ?? "";
  const wordsCount = plainTextContent.trim()
    ? plainTextContent.trim().split(/\s+/).length
    : 0;

  const estimatedReadTime =
    wordsCount > 0 ? Math.max(1, Math.ceil(wordsCount / 200)) : 1;

  // Cleanup blob URLs when the component unmounts
  useEffect(() => {
    return () => {
      createdUrlsRef.current.forEach((url) => {
        URL.revokeObjectURL(url);
      });

      createdUrlsRef.current.clear();
    };
  }, []);

  // Add new media files
  const handleAddMedia = (files: File[]) => {
    setMediaError("");

    const remainingSlots =
      MAX_MEDIA_COUNT - existingMedia.length - newMedia.length;

    if (remainingSlots <= 0) {
      setMediaError(
        `You can upload a maximum of ${MAX_MEDIA_COUNT} media files.`,
      );
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

    const mediaItems: NewMediaItem[] = filesToAdd.map((file) => {
      const url = URL.createObjectURL(file);

      createdUrlsRef.current.add(url);

      return {
        id: crypto.randomUUID(),
        url,
        type: file.type.startsWith("image/") ? "image" : "video",
        file,
      };
    });

    setNewMedia((previous) => [...previous, ...mediaItems]);

    if (validFiles.length > remainingSlots) {
      setMediaError(
        `Only ${remainingSlots} file(s) could be added. Maximum ${MAX_MEDIA_COUNT} media files allowed.`,
      );
    }
  };

  // File input
  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);

    if (files.length > 0) {
      handleAddMedia(files);
    }

    event.target.value = "";
  };

  // Drag and drop
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

    const files = Array.from(event.dataTransfer.files);

    if (files.length > 0) {
      handleAddMedia(files);
    }
  };

  // Remove an existing media item
  const handleRemoveExistingMedia = (mediaKey: string) => {
    setExistingMedia((previous) =>
      previous.filter((media) => media.key !== mediaKey),
    );
  };

  // Remove a newly added media item
  const handleRemoveNewMedia = (mediaId: string) => {
    setNewMedia((previous) => {
      const item = previous.find((media) => media.id === mediaId);

      if (item) {
        URL.revokeObjectURL(item.url);
        createdUrlsRef.current.delete(item.url);
      }

      return previous.filter((media) => media.id !== mediaId);
    });
  };

  // Add tag
  const handleAddTag = () => {
    const cleanedTag = newTag.trim().replace(/^#/, "");

    if (!cleanedTag) {
      return;
    }

    const formattedTag = `#${cleanedTag}`;

    if (tags.some((tag) => tag.toLowerCase() === formattedTag.toLowerCase())) {
      setTagError("This tag has already been added.");
      return;
    }

    setTags((previous) => [...previous, formattedTag]);
    setNewTag("");
    setTagError("");
  };

  // Remove tag
  const handleRemoveTag = (tagToRemove: string) => {
    setTags((previous) => previous.filter((tag) => tag !== tagToRemove));
    setTagError("");
  };

  // Submit updated post
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedDestination = destination.trim();
    const updatedContent = editor?.getHTML() ?? content;

    if (!trimmedTitle || !trimmedDestination) {
      return;
    }

    const updatedPost: UpdateMyPostData = {
      title: trimmedTitle,
      destination: trimmedDestination,
      content: updatedContent,
      tags,
      keepMediaKeys: existingMedia.map((media) => media.key),
      media: newMedia.map((media) => media.file),
    };

    await onSave(updatedPost);
  };

  // Link editor
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

  const totalMediaCount = existingMedia.length + newMedia.length;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-post-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSaving) {
          onClose();
        }
      }}
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-slate-950/75 p-4 backdrop-blur-sm"
    >
      <div className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <header className="flex shrink-0 items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2
              id="edit-post-title"
              className="text-lg font-black text-slate-900"
            >
              Edit Your TripTale
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Update your travel story and media.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            aria-label="Close edit modal"
            className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-5">
              {/* Title */}
              <div className="space-y-2">
                <label
                  htmlFor="edit-post-title-input"
                  className="text-xs font-bold text-slate-600"
                >
                  Story Title
                </label>

                <input
                  id="edit-post-title-input"
                  type="text"
                  required
                  maxLength={150}
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  disabled={isSaving}
                  className={inputClass}
                />
              </div>

              {/* Destination */}
              <div className="space-y-2">
                <label
                  htmlFor="edit-post-destination"
                  className="text-xs font-bold text-slate-600"
                >
                  Destination
                </label>

                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-600" />

                  <input
                    id="edit-post-destination"
                    type="text"
                    required
                    value={destination}
                    onChange={(event) => setDestination(event.target.value)}
                    disabled={isSaving}
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>

              {/* Content Editor */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600">
                  Story Content
                </label>

                <div className="overflow-hidden rounded-2xl border border-slate-200">
                  {/* Toolbar */}
                  <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-slate-50 px-4 py-3">
                    <ToolbarButton
                      active={editor?.isActive("bold") ?? false}
                      title="Bold"
                      onClick={() => editor?.chain().focus().toggleBold().run()}
                      disabled={isSaving}
                    >
                      <Bold className="h-4 w-4" />
                    </ToolbarButton>

                    <ToolbarButton
                      active={editor?.isActive("italic") ?? false}
                      title="Italic"
                      onClick={() =>
                        editor?.chain().focus().toggleItalic().run()
                      }
                      disabled={isSaving}
                    >
                      <Italic className="h-4 w-4" />
                    </ToolbarButton>

                    <ToolbarButton
                      active={editor?.isActive("underline") ?? false}
                      title="Underline"
                      onClick={() =>
                        editor?.chain().focus().toggleUnderline().run()
                      }
                      disabled={isSaving}
                    >
                      <Underline className="h-4 w-4" />
                    </ToolbarButton>

                    <span className="mx-1 h-5 w-px bg-slate-300" />

                    <ToolbarButton
                      active={editor?.isActive("bulletList") ?? false}
                      title="Bullet List"
                      onClick={() =>
                        editor?.chain().focus().toggleBulletList().run()
                      }
                      disabled={isSaving}
                    >
                      <List className="h-4 w-4" />
                    </ToolbarButton>

                    <ToolbarButton
                      active={editor?.isActive("blockquote") ?? false}
                      title="Quote"
                      onClick={() =>
                        editor?.chain().focus().toggleBlockquote().run()
                      }
                      disabled={isSaving}
                    >
                      <Quote className="h-4 w-4" />
                    </ToolbarButton>

                    <ToolbarButton
                      active={editor?.isActive("link") ?? false}
                      title="Link"
                      onClick={handleSetLink}
                      disabled={isSaving}
                    >
                      <Link2 className="h-4 w-4" />
                    </ToolbarButton>

                    <div className="ml-auto text-[10px] text-slate-400">
                      {wordsCount} words · {estimatedReadTime} min read
                    </div>
                  </div>

                  {/* Editor */}
                  <div
                    onClick={() => editor?.commands.focus()}
                    className={isSaving ? "pointer-events-none opacity-60" : ""}
                  >
                    <EditorContent editor={editor} />
                  </div>
                </div>
              </div>

              {/* Existing Media */}
              <div className="space-y-3 rounded-2xl border border-slate-200 p-5">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Existing Media
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">
                    Remove any media you no longer want in this post.
                  </p>
                </div>

                {existingMedia.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {existingMedia.map((media, index) => (
                      <div
                        key={media.key}
                        className="group relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
                      >
                        {media.type === "video" ? (
                          <video
                            src={media.url}
                            className="h-full w-full object-cover"
                            muted
                            playsInline
                          />
                        ) : (
                          <img
                            src={media.url}
                            alt={`Existing media ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                        )}

                        {media.type === "video" && (
                          <span className="absolute bottom-2 left-2 flex items-center gap-1 rounded bg-black/70 px-2 py-1 text-[9px] font-bold text-white">
                            <Play className="h-3 w-3 fill-white" />
                            Video
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => handleRemoveExistingMedia(media.key)}
                          disabled={isSaving}
                          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white transition-colors hover:bg-rose-600 disabled:opacity-50"
                          title="Remove media"
                          aria-label={`Remove existing media ${index + 1}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="rounded-xl bg-slate-50 py-6 text-center text-xs text-slate-400">
                    No existing media attached.
                  </p>
                )}
              </div>

              {/* Add New Media */}
              <div className="space-y-4 rounded-2xl border border-slate-200 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Add Photos & Videos
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                      Select multiple images or videos.
                    </p>
                  </div>

                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500">
                    {totalMediaCount}/{MAX_MEDIA_COUNT} items
                  </span>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  className="hidden"
                  onChange={handleFileInput}
                  disabled={isSaving}
                />

                {/* Drop Zone */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => {
                    if (!isSaving && totalMediaCount < MAX_MEDIA_COUNT) {
                      fileInputRef.current?.click();
                    }
                  }}
                  className={`rounded-2xl border-2 border-dashed p-7 text-center transition-all ${
                    isDragging
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-emerald-200 bg-emerald-50/20 hover:border-emerald-500 hover:bg-emerald-50/40"
                  } ${
                    isSaving || totalMediaCount >= MAX_MEDIA_COUNT
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer"
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
                    Maximum {MAX_MEDIA_COUNT} media files in total.
                  </p>
                </div>

                {mediaError && (
                  <p className="text-xs font-medium text-rose-500">
                    {mediaError}
                  </p>
                )}

                {/* New Media Preview */}
                {newMedia.length > 0 && (
                  <div className="space-y-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Newly Added Media
                    </p>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {newMedia.map((media, index) => (
                        <div
                          key={media.id}
                          className="group relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
                        >
                          {media.type === "image" ? (
                            <img
                              src={media.url}
                              alt={`New media ${index + 1}`}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <video
                              src={media.url}
                              controls
                              className="h-full w-full object-cover"
                            />
                          )}

                          {media.type === "video" && (
                            <span className="absolute bottom-2 left-2 rounded bg-black/70 px-2 py-1 text-[9px] font-bold text-white">
                              Video
                            </span>
                          )}

                          <button
                            type="button"
                            onClick={() => handleRemoveNewMedia(media.id)}
                            disabled={isSaving}
                            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white transition-colors hover:bg-rose-600 disabled:opacity-50"
                            title="Remove new media"
                            aria-label={`Remove new media ${index + 1}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-600">
                  Topic Tags
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
                        disabled={isSaving}
                        aria-label={`Remove ${tag}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
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
                      disabled={isSaving}
                      className="h-9 w-36 rounded-full border border-dashed border-slate-300 px-3 text-xs outline-none focus:border-emerald-500"
                    />

                    <button
                      type="button"
                      onClick={handleAddTag}
                      disabled={isSaving}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-dashed border-slate-300 hover:border-emerald-500 hover:text-emerald-600"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {tagError && (
                  <p className="text-xs text-rose-500">{tagError}</p>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="flex shrink-0 items-center justify-end gap-3 border-t border-slate-200 bg-white px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 rounded-xl bg-[#15803D] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-[#15803D]/25 hover:bg-[#166534] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send className="h-3.5 w-3.5" />
              {isSaving ? "Saving Changes..." : "Save Changes"}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

// Shared input styling
const inputClass =
  "h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition-all focus:border-emerald-500 focus:bg-white disabled:opacity-60";

// Toolbar button
interface ToolbarButtonProps {
  children: React.ReactNode;
  active: boolean;
  title: string;
  onClick: () => void;
  disabled?: boolean;
}

const ToolbarButton = ({
  children,
  active,
  title,
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

export default EditTripTalesModal;
