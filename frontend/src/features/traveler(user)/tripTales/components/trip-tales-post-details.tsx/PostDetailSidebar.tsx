import React from "react";

import type { CreatePostResponse } from "../../types/trip-tales.types";

import PostAuthorCard from "./PostAuthorCard";
import TravelerInsights from "./TravelerInsights";

interface PostDetailSidebarProps {
  post: CreatePostResponse;
}

const PostDetailSidebar: React.FC<PostDetailSidebarProps> = ({ post }) => {
  return (
    <aside className="lg:col-span-4 space-y-6">
      <PostAuthorCard post={post} />

      <TravelerInsights />
    </aside>
  );
};

export default PostDetailSidebar;
