export type TripPlanningMode = "solo" | "joining" | "group";

export type TripUserRole = "admin" | "member" | null;

export interface TripPlanningState {
  mode: TripPlanningMode;

  roomId: string | null;

  role: TripUserRole;
}