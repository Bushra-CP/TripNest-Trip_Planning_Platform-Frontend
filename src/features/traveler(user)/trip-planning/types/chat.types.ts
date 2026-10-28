export interface MessageRequest {
  roomId: string;
  senderId: string;
  message: string;
}

export interface MessageResponse {
  _id: string;
  roomId: string;
  senderId: string;
  senderName: string;
  senderPic: string;
  message: string;
  createdAt: string;
}

export interface MessageResponseApiResponse {
  success: boolean;
  message: string;
  data: MessageResponse[];
}

export interface TripResponse {
  _id: string;
  ownerId: string;
  title: string | null;
  tripMode: "solo" | "group";
  status: "planning" | "ready" | "completed" | "cancelled";
  threadId: string;
  roomId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TripApiResponse {
  success: boolean;
  message: string;
  data: TripResponse;
}

export interface RoomResponse {
  roomId: string;
}
