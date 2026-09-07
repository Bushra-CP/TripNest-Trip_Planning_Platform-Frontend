import type { RoutePlanningResult } from "./route.interfaces";

export type ChatMessageRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: ChatMessageRole;
  content: string;
}

export interface TripStop {
  name: string;
  days: number | null;
}

export interface TripRequirements {
  source: string | null;
  destinations: TripStop[];
  startDate: string | null;
  totalDays: number | null;
  numberOfTravelers: number | null;
  budget: number | null;
  travelMode: string | null;
  tripType: string | null;
  preferences: string[];
  additionalDetails: string[];
}

export interface AIChatResponse {
  reply: string;
  tripRequirements: TripRequirements;
  missingFields: string[];
  isComplete: boolean;
  canGenerateDraft: boolean;
  route: RoutePlanningResult | null;
}
