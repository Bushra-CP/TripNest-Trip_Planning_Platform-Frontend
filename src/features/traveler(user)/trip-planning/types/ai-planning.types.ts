import type { RoutePlanningResult } from "../interfaces/route.interfaces";
import type { TripRequirements } from "../interfaces/trip.interfaces";



export interface RagSourceMedia {
  type: "image" | "video";
  url: string;
}

export interface RagSource {
  documentId: string;
  postId: string;
  title: string;
  destination: string;
  media: RagSourceMedia[];
}



export interface AIChatResponse {
  threadId: string;
  reply: string;
  requirements: TripRequirements;
  missingFields: string[];
  isComplete: boolean;
  canGenerateDraft: boolean;
  route: RoutePlanningResult | null;
  ragSources: RagSource[];
}

export interface SendMessageResponse {
  success: boolean;

  data: AIChatResponse
}

