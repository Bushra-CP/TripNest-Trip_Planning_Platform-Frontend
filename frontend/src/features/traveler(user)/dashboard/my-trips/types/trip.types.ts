export interface MyTrip {
  _id: string;
  title: string;
  tripMode: "solo" | "group";
  status: "planning" | "ready" | "completed" | "cancelled";
  threadId: string;
  roomId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface GetMyTripsResponse {
  success: boolean;
  message: string;
  data: MyTrip[];
}
