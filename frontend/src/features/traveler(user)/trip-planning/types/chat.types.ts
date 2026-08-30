export interface MessageRequest {
  roomId: string;
  senderId: string;
  message: string;
}

export interface MessageResponse {
  _id:string;
  roomId: string;
  senderId: string;
  senderName: string;
  senderPic: string;
  message: string;
  createdAt: Date;
}

export interface CreateRoomResponse {
  roomId: string;
}

export interface RoomResponse {
  roomId: string;
}
