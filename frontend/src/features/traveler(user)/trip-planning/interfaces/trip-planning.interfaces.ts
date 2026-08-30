export type TripPlanningMode = "solo" | "joining" | "group";

export type TripUserRole = "admin" | "member" | "guest" | null;

export interface TripPlanningState {
  mode: TripPlanningMode;
  roomId: string | null;
  isRoomLoading: boolean;
}
