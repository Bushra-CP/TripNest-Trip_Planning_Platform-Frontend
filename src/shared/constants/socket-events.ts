export const SOCKET_EVENTS = {
  CONNECTION: "connection",

  DISCONNECT: "disconnect",

  JOIN_ROOM: "join-room",

  LEAVE_ROOM: "leave-room",

  USER_JOINED: "user-joined",

  USER_LEFT: "user-left",

  ROOM_USERS: "room-users",

  SEND_MESSAGE: "send-message",

  RECEIVE_MESSAGE: "receive-message",

  TYPING_START: "typing-start",

  TYPING_STOP: "typing-stop",

  SOCKET_ERROR: "socket-error",
} as const;
