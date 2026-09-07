export interface RouteLocation {
  name: string;
  latitude: number;
  longitude: number;
}

export interface RouteLeg {
  distanceMeters: number;
  durationSeconds: number;
  startLocation: RouteLocation;
  endLocation: RouteLocation;
}

export interface RoutePlanningResult {
  distanceMeters: number;
  durationSeconds: number;
  encodedPolyline: string | null;
  locations: RouteLocation[];
  legs: RouteLeg[];
}
