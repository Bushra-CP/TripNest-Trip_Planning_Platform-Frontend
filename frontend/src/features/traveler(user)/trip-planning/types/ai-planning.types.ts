import type { RoutePlanningResult } from "../interfaces/route.interfaces";
import type {
  ChatMessage,
  TripRequirements,
} from "../interfaces/trip.interfaces";

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
  tripId: string;
  reply: string;
  requirements: TripRequirements;
  missingFields: string[];
  isComplete: boolean;
  canGenerateDraft: boolean;
  routeChanged:boolean;
  route: RoutePlanningResult | null;
  ragSources: RagSource[];
}

export interface RestoreAIPlanningResponse {
  threadId: string;
  tripId: string;
  title: string | null;
  conversationHistory: ChatMessage[];
  requirements: TripRequirements;
  missingFields: string[];
  isComplete: boolean;
  canGenerateDraft: boolean;
  routeChanged:boolean;
  route: RoutePlanningResult | null;
}

export interface SendMessageResponse {
  success: boolean;

  data: AIChatResponse;
}
