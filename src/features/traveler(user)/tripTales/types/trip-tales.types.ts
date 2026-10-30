export interface CreatePostData {
  title: string;
  destination: string;
  content: string;
  tags: string[];
  media: File[];
}

export interface PostMedia {
  key: string;
  url: string;
  type: "image" | "video";
}

export interface CreatePostResponse {
  id: string;
  user: {
    id: string;
    fullName: string;
    profileImageUrl: string;
  };
  title: string;
  destination: string;
  content: string;
  tags: string[];
  media: PostMedia[];
  createdAt: string;

  // Likes
  likesCount: number;
  isLikedByCurrentUser: boolean;
}

export interface MyPostResponse extends CreatePostResponse {
  status: "PUBLISHED" | "BLOCKED";
  updatedAt: string;
}

export interface CreatePostApiResponse {
  success: boolean;
  message: string;
  data: CreatePostResponse;
}

export interface MyProfile {
  userId: string;
  fullName: string;
  profileImageUrl: string;
  bio: string;
  country: string;
  state: string;
  city: string;
}

export interface MyProfileStats {
  posts: number;
  followers: number;
  following: number;
}

export interface MyProfileResponse {
  profile: MyProfile;
  stats: MyProfileStats;
}

export interface MyProfileApiResponse {
  success: boolean;
  message: string;
  data: MyProfileResponse;
}

export interface MyPostsPagination {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  limit: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface MyPostsResponse {
  posts: MyPostResponse[];
  pagination: MyPostsPagination;
}

export interface MyPostsApiResponse {
  success: boolean;
  message: string;
  data: MyPostsResponse;
}

export interface MyPostApiResponse {
  success: boolean;
  message: string;
  data: MyPostResponse;
}

export interface MyPostsQuery {
  page?: number;
  limit?: number;
  search?: string;
  sort?: "newest" | "oldest";
  status?: "PUBLISHED" | "BLOCKED";
}

export interface UpdateMyPostData {
  title: string;
  destination: string;
  content: string;
  tags: string[];
  keepMediaKeys: string[];
  media: File[];
}

export interface UpdateMyPostApiResponse {
  success: boolean;
  message: string;
  data: MyPostResponse;
}

export interface DeleteMyPostApiResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
  };
}

//LIKE-DISLIKE RELATED
export interface PostLikeUser {
  userId: string;
  fullName: string;
  profileImageUrl: string;
  likedAt: string;
}

export interface PostLikesPagination {
  currentPage: number;
  totalPages: number;
  totalLikes: number;
  limit: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PostLikesResponse {
  likes: PostLikeUser[];
  pagination: PostLikesPagination;
}

export interface PostLikesApiResponse {
  success: boolean;
  message: string;
  data: PostLikesResponse;
}

export interface TogglePostLikeResponse {
  postId: string;
  likesCount: number;
  isLikedByCurrentUser: boolean;
}

export interface TogglePostLikeApiResponse {
  success: boolean;
  message: string;
  data: TogglePostLikeResponse;
}
