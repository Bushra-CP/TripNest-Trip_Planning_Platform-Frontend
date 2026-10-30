export type PostCategory = "Story" | "Guide" | "Reel" | "Draft";
export type ProfileTab = "all" | "guides" | "stories" | "drafts";

export interface MediaAsset {
  id: string;
  url: string;
  type: "image" | "video";
  caption?: string;
  duration?: string;
}

export interface PostItem {
  id: string;
  title: string;
  destination: string;
  createdDate: string;
  readTime: string;
  category: PostCategory;
  coverImage: string;
  media: MediaAsset[];
  excerpt: string;
  richContent: {
    leadParagraph: string;
    quote?: string;
    bodyParagraphs: string[];
    trailNotes?: {
      permits: string;
      gear: string;
      leechDefense: string;
    };
  };
  tags: string[];
  stats: {
    likes: number;
    comments: number;
    saves: number;
  };
  isDraft?: boolean;
}

export interface HighlightItem {
  id: string;
  title: string;
  emoji: string;
  coverImage: string;
}

export interface ProfileData {
  fullName: string;
  username: string;
  avatarUrl: string;
  bio: string;
  location: string;
  postCount: number;
  followers: number;
  following: number;
}
