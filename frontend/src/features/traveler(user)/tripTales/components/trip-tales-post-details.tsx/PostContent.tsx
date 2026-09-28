import React from "react";

import type { CreatePostResponse } from "../../types/trip-tales.types";

interface PostContentProps {
  post: CreatePostResponse;
}

const PostContent: React.FC<PostContentProps> = ({ post }) => {
  return (
    <article className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-sm">
      <div
        className="
          text-sm
          text-slate-700
          leading-relaxed
          prose
          prose-slate
          max-w-none
          prose-headings:text-slate-900
          prose-headings:font-black
          prose-a:text-[#15803D]
          prose-strong:text-slate-900
          prose-img:rounded-2xl
        "
        dangerouslySetInnerHTML={{
          __html: post.content,
        }}
      />
    </article>
  );
};

export default PostContent;