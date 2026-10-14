export interface ItineraryStop {
  name: string;
  description: string;
  location?: string;
  startTime?: string;
  durationMinutes?: number;
}

export interface ItineraryDay {
  dayNumber: number;
  title: string;
  description: string;
  stops: ItineraryStop[];
}

export interface GeneratedItinerary {
  title: string;
  days: ItineraryDay[];
}
