import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
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
  GripVertical,
  Play,
  Send,
  Plus,
  Crop,
} from "lucide-react";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import UnderlineExtension from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";

import { useTripTales } from "../../hooks/useTripTales";

/* ============================================================
   TYPES
============================================================ */

interface MediaItem {
  id: string;
  url: string;
  type: "image" | "video";
  duration?: string;
  caption?: string;
  file: File;
}

interface CreatePostModalProps {
  onClose: () => void;
}

interface CreatePostFormData {
  title: string;
  destination: string;
  content: string;
  tags: string[];
}

/* ============================================================
   COMPONENT
============================================================ */

const CreatePostModal: React.FC<CreatePostModalProps> = ({ onClose }) => {
  const { createPost } = useTripTales();

  /* ==========================================================
     FILE INPUT REF
  ========================================================== */

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /* ==========================================================
     REACT HOOK FORM
  ========================================================== */

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreatePostFormData>({
    defaultValues: {
      title: "",
      destination: "",
      content: "",
      tags: [],
    },
    mode: "onSubmit",
  });

  /* ==========================================================
     WATCH FORM VALUES
  ========================================================== */

  const title = watch("title");
  const tags = watch("tags");

  /* ==========================================================
     LOCAL STATES
  ========================================================== */

  const [newTagInput, setNewTagInput] = useState("");

  const [mediaList, setMediaList] = useState<MediaItem[]>([]);

  const [isDragging, setIsDragging] = useState(false);

  const [cropImage, setCropImage] = useState<MediaItem | null>(null);

  const [, setEditorState] = useState(0);

  /* ==========================================================
     TIPTAP EDITOR
  ========================================================== */

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

    onUpdate: ({ editor }) => {
      const html = editor.getHTML();

      setValue("content", html, {
        shouldDirty: true,
        shouldValidate: true,
        shouldTouch: true,
      });

      setEditorState((previous) => previous + 1);
    },

    onSelectionUpdate: () => {
      setEditorState((previous) => previous + 1);
    },

    editorProps: {
      attributes: {
        class:
          "tiptap-editor w-full min-h-[220px] p-5 outline-none text-sm text-slate-700 leading-relaxed",
      },
    },
  });

  /* ==========================================================
     WORD COUNT
  ========================================================== */

  const plainTextContent = editor?.getText() ?? "";

  const wordsCount = plainTextContent.trim()
    ? plainTextContent.trim().split(/\s+/).length
    : 0;

  const estimatedReadTime =
    wordsCount > 0 ? Math.max(1, Math.ceil(wordsCount / 200)) : 1;

  /* ==========================================================
     ADD MEDIA
  ========================================================== */

  const addMediaFiles = (files: File[]) => {
    const newMedia: MediaItem[] = files
      .filter(
        (file) =>
          file.type.startsWith("image/") || file.type.startsWith("video/"),
      )
      .map((file) => ({
        id: crypto.randomUUID(),
        url: URL.createObjectURL(file),
        type: file.type.startsWith("image/") ? "image" : "video",
        file,
      }));

    setMediaList((previous) => [...previous, ...newMedia]);
  };

  /* ==========================================================
     FILE INPUT
  ========================================================== */

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);

    if (files.length > 0) {
      addMediaFiles(files);
    }

    event.target.value = "";
  };

  /* ==========================================================
     DRAG & DROP
  ========================================================== */

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
      addMediaFiles(files);
    }
  };

  /* ==========================================================
     REMOVE MEDIA
  ========================================================== */

  const handleRemoveMedia = (id: string) => {
    setMediaList((previous) => {
      const item = previous.find((media) => media.id === id);

      if (item && item.url.startsWith("blob:")) {
        URL.revokeObjectURL(item.url);
      }

      return previous.filter((media) => media.id !== id);
    });
  };

  /* ==========================================================
     CLEANUP MEDIA URLS
  ========================================================== */

  useEffect(() => {
    return () => {
      mediaList.forEach((item) => {
        if (item.url.startsWith("blob:")) {
          URL.revokeObjectURL(item.url);
        }
      });
    };
  }, [mediaList]);

  /* ==========================================================
     ADD TAG
  ========================================================== */

  const handleAddTag = () => {
    const value = newTagInput.trim();

    if (!value) {
      return;
    }

    const formatted = value.startsWith("#") ? value : `#${value}`;

    const currentTags = watch("tags");

    if (!currentTags.includes(formatted)) {
      setValue("tags", [...currentTags, formatted], {
        shouldDirty: true,
        shouldValidate: true,
        shouldTouch: true,
      });
    }

    setNewTagInput("");
  };

  /* ==========================================================
     REMOVE TAG
  ========================================================== */

  const handleRemoveTag = (tag: string) => {
    const currentTags = watch("tags");

    setValue(
      "tags",
      currentTags.filter((item) => item !== tag),
      {
        shouldDirty: true,
        shouldValidate: true,
        shouldTouch: true,
      },
    );
  };

  /* ==========================================================
     CROP
  ========================================================== */

  const handleCrop = (item: MediaItem) => {
    setCropImage(item);
  };

  /* ==========================================================
     CLOSE CROP
  ========================================================== */

  const handleCloseCrop = () => {
    setCropImage(null);
  };

  /* ==========================================================
     PUBLISH POST
  ========================================================== */

  const handlePublish = async (data: CreatePostFormData) => {
    try {
      const files = mediaList.map((media) => media.file);

      const createdPost = await createPost({
        title: data.title,
        destination: data.destination,
        content: data.content,
        tags: data.tags,
        media: files,
      });

      console.log("=================================");
      console.log("POST CREATED SUCCESSFULLY");
      console.log("=================================");
      console.log("Created Post:", createdPost);

      alert("Post published successfully!");

      onClose();
    } catch (error) {
      console.error("Failed to create post:", error);

      alert("Failed to publish post. Please try again.");
    }
  };

  /* ==========================================================
     SAVE DRAFT
  ========================================================== */

  const handleSaveDraft = () => {
    const data = watch();

    const draftData = {
      title: data.title,
      destination: data.destination,
      content: data.content,
      tags: data.tags,

      media: mediaList.map((media) => ({
        id: media.id,
        type: media.type,
        fileName: media.file.name,
        fileType: media.file.type,
        fileSize: media.file.size,
        previewUrl: media.url,
        file: media.file,
      })),
    };

    console.log("=================================");
    console.log("DRAFT DATA");
    console.log("=================================");
    console.log(draftData);
    console.log("=================================");

    alert("Draft data logged successfully.");
  };

  /* ==========================================================
     RESET FORM
  ========================================================== */

  const handleResetForm = () => {
    reset({
      title: "",
      destination: "",
      content: "",
      tags: [],
    });

    setNewTagInput("");

    mediaList.forEach((item) => {
      if (item.url.startsWith("blob:")) {
        URL.revokeObjectURL(item.url);
      }
    });

    setMediaList([]);

    editor?.commands.clearContent();
  };

  /* ==========================================================
     CLOSE MODAL
  ========================================================== */

  const handleClose = () => {
    mediaList.forEach((item) => {
      if (item.url.startsWith("blob:")) {
        URL.revokeObjectURL(item.url);
      }
    });

    onClose();
  };

  return (
    <>
      {/* ======================================================
          MODAL BACKDROP
      ====================================================== */}

      <div
        className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            handleClose();
          }
        }}
      >
        {/* ====================================================
            MODAL
        ==================================================== */}

        <div className="w-full max-w-6xl max-h-[92vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
          {/* HEADER */}

          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 shrink-0">
            <div>
              <h2 className="text-lg font-black text-slate-900">Create Post</h2>

              <p className="text-xs text-slate-500 mt-1">
                Share your travel experience
              </p>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="w-9 h-9 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* FORM */}

          <form
            onSubmit={handleSubmit(handlePublish)}
            className="flex flex-col flex-1 min-h-0"
          >
            {/* SCROLLABLE BODY */}

            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-5">
                {/* TITLE */}

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="post-title"
                      className="text-xs font-bold text-slate-600"
                    >
                      Post Title
                      <span className="ml-1 text-slate-400 font-normal">
                        (Optional)
                      </span>
                    </label>

                    <span className="text-[10px] text-slate-400">
                      {title.length}/90
                    </span>
                  </div>

                  <input
                    id="post-title"
                    type="text"
                    maxLength={90}
                    placeholder="Give your post a title..."
                    {...register("title", {
                      maxLength: {
                        value: 90,
                        message: "Title cannot exceed 90 characters.",
                      },
                    })}
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-500 outline-none text-sm font-semibold transition-all"
                  />

                  {errors.title && (
                    <p className="text-xs text-rose-500">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                {/* DESTINATION */}

                <div className="space-y-2">
                  <label
                    htmlFor="destination"
                    className="text-xs font-bold text-slate-600"
                  >
                    Destination
                    <span className="ml-1 text-slate-400 font-normal">
                      (Optional)
                    </span>
                  </label>

                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-600" />

                    <input
                      id="destination"
                      type="text"
                      placeholder="Where was this?"
                      {...register("destination")}
                      className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-500 outline-none text-sm"
                    />
                  </div>
                </div>

                {/* CONTENT */}

                <div className="border border-slate-200 rounded-2xl overflow-hidden">
                  {/* TOOLBAR */}

                  <div className="flex items-center gap-1 px-4 py-3 border-b border-slate-200 bg-slate-50">
                    <button
                      type="button"
                      onClick={() => {
                        editor?.chain().focus().toggleBold().run();
                      }}
                      className={`p-2 rounded-lg transition-colors ${
                        editor?.isActive("bold")
                          ? "bg-emerald-100 text-emerald-700"
                          : "text-slate-700 hover:bg-slate-200"
                      }`}
                      title="Bold"
                    >
                      <Bold className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        editor?.chain().focus().toggleItalic().run();
                      }}
                      className={`p-2 rounded-lg transition-colors ${
                        editor?.isActive("italic")
                          ? "bg-emerald-100 text-emerald-700"
                          : "text-slate-700 hover:bg-slate-200"
                      }`}
                      title="Italic"
                    >
                      <Italic className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        editor?.chain().focus().toggleUnderline().run();
                      }}
                      className={`p-2 rounded-lg transition-colors ${
                        editor?.isActive("underline")
                          ? "bg-emerald-100 text-emerald-700"
                          : "text-slate-700 hover:bg-slate-200"
                      }`}
                      title="Underline"
                    >
                      <Underline className="w-4 h-4" />
                    </button>

                    <span className="w-px h-5 bg-slate-300 mx-1" />

                    <button
                      type="button"
                      onClick={() => {
                        editor?.chain().focus().toggleBulletList().run();
                      }}
                      className={`p-2 rounded-lg transition-colors ${
                        editor?.isActive("bulletList")
                          ? "bg-emerald-100 text-emerald-700"
                          : "text-slate-700 hover:bg-slate-200"
                      }`}
                      title="Bullet List"
                    >
                      <List className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        editor?.chain().focus().toggleBlockquote().run();
                      }}
                      className={`p-2 rounded-lg transition-colors ${
                        editor?.isActive("blockquote")
                          ? "bg-emerald-100 text-emerald-700"
                          : "text-slate-700 hover:bg-slate-200"
                      }`}
                      title="Quote"
                    >
                      <Quote className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (!editor) {
                          return;
                        }

                        const previousUrl = editor.getAttributes("link").href;

                        const url = window.prompt(
                          "Enter URL:",
                          previousUrl || "",
                        );

                        if (url === null) {
                          return;
                        }

                        if (url.trim() === "") {
                          editor.chain().focus().unsetLink().run();

                          return;
                        }

                        editor
                          .chain()
                          .focus()
                          .setLink({
                            href: url,
                            target: "_blank",
                          })
                          .run();
                      }}
                      className={`p-2 rounded-lg transition-colors ${
                        editor?.isActive("link")
                          ? "bg-emerald-100 text-emerald-700"
                          : "text-slate-700 hover:bg-slate-200"
                      }`}
                      title="Link"
                    >
                      <Link2 className="w-4 h-4" />
                    </button>

                    <div className="ml-auto text-[10px] text-slate-400">
                      {wordsCount} words
                      {" • "}
                      {estimatedReadTime} min read
                    </div>
                  </div>

                  {/* TIPTAP */}

                  <Controller
                    name="content"
                    control={control}
                    rules={{
                      validate: () => {
                        const text = editor?.getText().trim() ?? "";

                        return (
                          text.length > 0 ||
                          "Please enter some content for your post."
                        );
                      },
                    }}
                    render={({ field }) => (
                      <div
                        onClick={() => {
                          editor?.commands.focus();
                        }}
                      >
                        <EditorContent editor={editor} />

                        <input type="hidden" value={field.value} readOnly />
                      </div>
                    )}
                  />
                </div>

                {/* CONTENT ERROR */}

                {errors.content && (
                  <p className="text-xs text-rose-500 -mt-3">
                    {errors.content.message}
                  </p>
                )}

                {/* MEDIA */}

                <div className="border border-slate-200 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        Photos & Videos
                      </h3>

                      <p className="text-xs text-slate-400 mt-1">
                        Add multiple photos and videos to your post
                      </p>
                    </div>

                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-500">
                      {mediaList.length} items
                    </span>
                  </div>

                  {/* FILE INPUT */}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    className="hidden"
                    onChange={handleFileInput}
                  />

                  {/* DROP ZONE */}

                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                      isDragging
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-emerald-200 bg-emerald-50/20 hover:border-emerald-500 hover:bg-emerald-50/40"
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3">
                      <UploadCloud className="w-6 h-6" />
                    </div>

                    <p className="text-sm font-bold text-slate-800">
                      Drag & drop photos or videos here
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      or{" "}
                      <span className="text-emerald-700 font-bold">
                        browse files
                      </span>
                    </p>

                    <p className="text-[10px] text-slate-400 mt-2">
                      Images and videos are supported
                    </p>
                  </div>

                  {/* MEDIA PREVIEW */}

                  {mediaList.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Uploaded Media
                        </p>

                        <p className="text-[10px] text-slate-400 flex items-center gap-1">
                          <GripVertical className="w-3 h-3" />
                          Drag to reorder
                        </p>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {mediaList.map((item, index) => (
                          <div
                            key={item.id}
                            draggable
                            className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-200 group cursor-grab"
                          >
                            {item.type === "image" ? (
                              <img
                                src={item.url}
                                alt={item.caption || `Media ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <video
                                src={item.url}
                                controls
                                className="w-full h-full object-cover"
                              />
                            )}

                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors pointer-events-none" />

                            <span className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded">
                              #{index + 1}
                            </span>

                            {item.type === "video" && (
                              <div className="absolute bottom-2 left-2 pointer-events-none">
                                <span className="inline-flex items-center gap-1 bg-black/70 text-white text-[9px] font-bold px-2 py-1 rounded">
                                  <Play className="w-2.5 h-2.5 fill-white" />
                                  Video
                                </span>
                              </div>
                            )}

                            {item.type === "image" && (
                              <button
                                type="button"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  handleCrop(item);
                                }}
                                className="absolute bottom-2 left-2 w-7 h-7 rounded-full bg-white/90 text-slate-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Crop image"
                              >
                                <Crop className="w-3.5 h-3.5" />
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={(event) => {
                                event.stopPropagation();

                                handleRemoveMedia(item.id);
                              }}
                              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 hover:bg-rose-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              title="Remove"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>

                            <div className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center pointer-events-none">
                              <GripVertical className="w-3.5 h-3.5" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* TAGS */}

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600">
                    Tags
                    <span className="ml-1 text-slate-400 font-normal">
                      (Optional)
                    </span>
                  </label>

                  <div className="flex flex-wrap items-center gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-xs font-bold text-emerald-700"
                      >
                        {tag}

                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}

                    <input
                      value={newTagInput}
                      onChange={(event) => setNewTagInput(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          handleAddTag();
                        }
                      }}
                      placeholder="Add tag..."
                      className="h-8 px-3 rounded-full border border-dashed border-slate-300 outline-none text-xs"
                    />

                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="w-8 h-8 rounded-full border border-dashed border-slate-300 flex items-center justify-center hover:border-emerald-500 hover:text-emerald-600"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* FOOTER */}

            <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-slate-200 bg-white shrink-0">
              <p className="hidden sm:block text-[10px] text-slate-400">
                Your published post can be used by the TripNest AI planner.
              </p>

              <div className="flex items-center gap-3 ml-auto">
                <button
                  type="button"
                  onClick={() => {
                    handleResetForm();
                    onClose();
                  }}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Save Draft
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#15803D] hover:bg-[#166534] disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs font-bold shadow-md shadow-[#15803D]/25"
                >
                  <Send className="w-3.5 h-3.5" />

                  {isSubmitting ? "Publishing..." : "Publish Post"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* ========================================================
          CROP MODAL
      ======================================================== */}

      {cropImage && (
        <div className="fixed inset-0 z-[120] bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <div>
                <h3 className="text-sm font-bold">Crop Image</h3>

                <p className="text-xs text-slate-400 mt-1">
                  Adjust your image before publishing
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseCrop}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5">
              <div className="bg-slate-950 rounded-xl overflow-hidden flex items-center justify-center min-h-[350px]">
                <img
                  src={cropImage.url}
                  alt="Crop preview"
                  className="max-h-[500px] max-w-full object-contain"
                />
              </div>

              <p className="text-xs text-slate-400 mt-3">
                Crop controls can be connected here using an image cropping
                library.
              </p>
            </div>

            <div className="flex justify-end gap-3 px-5 py-4 border-t">
              <button
                type="button"
                onClick={handleCloseCrop}
                className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-bold"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleCloseCrop}
                className="px-4 py-2 rounded-lg bg-[#15803D] text-white text-xs font-bold"
              >
                Apply Crop
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePostModal;
