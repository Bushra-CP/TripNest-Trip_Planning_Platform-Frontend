export type ContentType = "Blog" | "Post";
export type ModerationStatus = "Active" | "Blocked" | "Pending Review";

export interface TripTalesItem {
  id: string;
  title: string;
  excerpt: string;
  fullContent: string;
  type: ContentType;
  status: ModerationStatus;
  destination?: string;
  submittedOn: string;
  submittedTimestamp: number;
  author: {
    name: string;
    username: string;
    avatar?: string;
    initials?: string;
    isVerified?: boolean;
    joinedDate?: string;
  };
  engagement: { likes: number; comments: number; reports?: number };
  media: { url: string; caption?: string }[];
  blockReason?: string;
}

export interface ModerationTarget {
  post: TripTalesItem;
  action: "block" | "unblock";
}

export interface ToastMessage {
  title: string;
  description: string;
  type: "success" | "warning" | "error";
}
