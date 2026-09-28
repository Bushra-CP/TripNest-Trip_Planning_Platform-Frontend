export interface CreatePostData {
  title: string;

  destination: string;

  content: string;

  tags: string[];

  media: File[];
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

  media: {
    key: string;
    url: string;
    type: "image" | "video";
  }[];

  createdAt: string;
}

export interface CreatePostApiResponse {
  success: boolean;

  message: string;

  data: CreatePostResponse;
}
