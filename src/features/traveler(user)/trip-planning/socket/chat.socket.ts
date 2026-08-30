import { io, Socket } from "socket.io-client";
import type { MessageResponse } from "../types/chat.types";

interface ServerToClientEvents {
  receiveMessage: (message: MessageResponse) => void;

  roomJoined: (roomId: string) => void;

  roomError: (message: string) => void;
}

interface ClientToServerEvents {
  joinRoom: (roomId: string) => void;

  sendMessage: (data: {
    roomId: string;
    senderId: string;
    message: string;
  }) => void;
}

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  import.meta.env.VITE_API_BASE_URL,
  {
    transports: ["websocket"],
    reconnection: true,
  },
);

socket.on("connect", () => {
  console.log("SOCKET CONNECTED:", socket.id);
});

socket.on("connect_error", (error) => {
  console.error("SOCKET CONNECTION ERROR:", error);
});

socket.on("disconnect", (reason) => {
  console.log("SOCKET DISCONNECTED:", reason);
});

export default socket;
