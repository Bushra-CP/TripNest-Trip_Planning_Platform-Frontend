export type TripPlanningMode = "solo" | "joining" | "group";

export type TripUserRole = "admin" | "member" | "guest" | null;

export interface TripPlanningState {
  mode: TripPlanningMode;
  tripId: string | null;
  roomId: string | null;
  isTripLoading: boolean;
}
