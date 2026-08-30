import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { selectRoomId } from "../../../redux/trip-planning.selectors";
import { selectMessages } from "../../../redux/chat/chat.selectors";
import { addMessage } from "../../../redux/chat/chat.slice";
import { getMessagesThunk } from "../../../redux/chat/chat.thunk";

import socket from "../../../socket/chat.socket";

import type { MessageResponse } from "../../../types/chat.types";
import type { AppDispatch } from "@/app/store";

import { selectUser } from "@/features/traveler(user)/auth/redux/authSelectors";

interface ThemeProps {
  surface?: string;
  border?: string;
  input?: string;
  iconButton?: string;
  divider?: string;
  primaryText?: string;
  secondaryText?: string;
  mutedText?: string;
}

interface ChatTabProps {
  mobile?: boolean;
  isDarkMode: boolean;
  theme: ThemeProps;
}

const ChatTab = ({ mobile = false, isDarkMode, theme }: ChatTabProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector(selectUser);

  const roomId = useSelector(selectRoomId);

  const messages = useSelector(selectMessages);

  const [messageInput, setMessageInput] = useState("");

  /*
   * Reference to the messages container
   */
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  /*
   * Fetch existing messages whenever room changes
   * and join the corresponding Socket.IO room.
   */
  useEffect(() => {
    if (!roomId) {
      return;
    }

    /*
     * Fetch existing messages from backend
     */
    dispatch(getMessagesThunk(roomId));

    /*
     * Join Socket.IO room
     */
    const joinRoom = () => {
      console.log("Joining socket room:", roomId);

      socket.emit("joinRoom", roomId);
    };

    /*
     * If socket is already connected, join immediately.
     * Otherwise wait until connection is established.
     */
    if (socket.connected) {
      joinRoom();
    } else {
      socket.once("connect", joinRoom);
    }

    /*
     * Cleanup
     */
    return () => {
      socket.off("connect", joinRoom);
    };
  }, [dispatch, roomId]);

  /*
   * Listen for new messages from Socket.IO
   */
  useEffect(() => {
    const handleReceiveMessage = (message: MessageResponse) => {
      dispatch(addMessage(message));
    };

    socket.on("receiveMessage", handleReceiveMessage);

    /*
     * Cleanup listener
     */
    return () => {
      console.log("Removing receiveMessage listener");

      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [dispatch]);

  /*
   * Automatically scroll to the latest message
   *
   * This runs whenever the messages array changes.
   *
   * It handles both:
   * 1. Existing messages loaded from API
   * 2. New messages received through Socket.IO
   */
  useEffect(() => {
    const container = messagesContainerRef.current;

    if (!container) {
      return;
    }

    /*
     * Small timeout ensures the DOM has rendered
     * the newly added messages before scrolling.
     */
    const timeoutId = setTimeout(() => {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [messages]);

  /*
   * Send message
   */
  const handleSendMessage = () => {
    if (!roomId || !user?.userId || !messageInput.trim()) {
      return;
    }

    if (!socket.connected) {
      console.error("Socket is disconnected");

      return;
    }

    const data = {
      roomId,
      senderId: user.userId,
      message: messageInput.trim(),
    };

    socket.emit("sendMessage", data);

    /*
     * Clear input after sending
     */
    setMessageInput("");
  };

  /*
   * Send message when Enter is pressed
   */
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    /*
     * Enter = send
     * Shift + Enter = new line
     */
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      handleSendMessage();
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* =====================================================
          MESSAGES
      ====================================================== */}

      <div
        ref={messagesContainerRef}
        className={`hide-scrollbar flex-1 overflow-y-auto p-6 space-y-6 ${
          mobile ? "max-h-[calc(80vh-180px)]" : ""
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2
            className={`text-lg font-bold ${
              isDarkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Group Chat
          </h2>

          <span className="text-[10px] font-bold uppercase tracking-widest text-[#10b981]">
            {messages.length > 0 ? "Online" : "No Messages"}
          </span>
        </div>

        {/* =====================================================
            NO MESSAGES
        ====================================================== */}

        {messages.length === 0 && (
          <div className="flex h-full items-center justify-center">
            <p
              className={`text-sm ${
                isDarkMode ? "text-slate-500" : "text-slate-400"
              }`}
            >
              No messages yet. Start the conversation.
            </p>
          </div>
        )}

        {/* =====================================================
            MESSAGES
        ====================================================== */}

        {messages.map((message) => {
          const isCurrentUser = message.senderId === user?.userId;

          return (
            <div
              key={message._id}
              className={`flex gap-3 ${
                isCurrentUser ? "flex-row-reverse" : ""
              }`}
            >
              {/* Avatar */}
              <img
                src={message.senderPic}
                alt={message.senderName?.[0]?.toUpperCase() || "U"}
                className="h-10 w-10 rounded-xl object-cover"
              />

              {/* Message Content */}
              <div
                className={`flex flex-col max-w-[80%] ${
                  isCurrentUser ? "items-end" : "items-start"
                }`}
              >
                {/* Sender + Time */}
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`text-xs font-bold ${
                      isDarkMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {isCurrentUser ? "You" : message.senderName}
                  </span>

                  <span className="text-[10px] text-slate-500">
                    {new Date(message.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                {/* Message Bubble */}
                <div
                  className={`rounded-2xl border p-4 ${
                    isCurrentUser
                      ? "bg-[#10b981] border-[#10b981]"
                      : isDarkMode
                        ? "bg-slate-800 border-slate-700"
                        : "bg-slate-100 border-slate-200"
                  }`}
                >
                  <p
                    className={`text-sm leading-relaxed ${
                      isCurrentUser
                        ? "text-white"
                        : isDarkMode
                          ? "text-slate-300"
                          : "text-slate-700"
                    }`}
                  >
                    {message.message}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* =====================================================
          MESSAGE INPUT
      ====================================================== */}

      <div className={`p-6 border-t ${theme.border} ${theme.surface}`}>
        <div className={`rounded-[28px] border p-3 ${theme.input}`}>
          <div className="flex items-center gap-3">
            <textarea
              rows={1}
              value={messageInput}
              onChange={(event) => setMessageInput(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message group..."
              className={`flex-1 resize-none bg-transparent outline-none text-sm ${
                isDarkMode
                  ? "text-white placeholder:text-slate-500"
                  : "text-slate-900 placeholder:text-slate-400"
              }`}
            />

            <button
              type="button"
              onClick={handleSendMessage}
              disabled={!messageInput.trim() || !roomId || !user?.userId}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#10b981] text-white transition hover:bg-[#059669] disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatTab;
