import { Send } from "lucide-react";

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

interface Message {
  id: number;
  sender: string;
  avatar: string;
  message: string;
  time: string;
  isCurrentUser?: boolean;
}

const messages: Message[] = [
  {
    id: 1,
    sender: "Rahul",
    avatar: "https://i.pravatar.cc/100?u=rahul",
    message: "Let's take my sedan. It has much better fuel efficiency.",
    time: "10:42 AM",
  },
  {
    id: 2,
    sender: "Priya",
    avatar: "https://i.pravatar.cc/100?u=priya",
    message: "I agree. It will reduce the total trip cost.",
    time: "10:44 AM",
  },
  {
    id: 3,
    sender: "You",
    avatar: "https://i.pravatar.cc/100?u=you",
    message: "Let's vote and finalize the vehicle.",
    time: "10:45 AM",
    isCurrentUser: true,
  },
];

const ChatTab = ({ mobile = false, isDarkMode, theme }: ChatTabProps) => {
  return (
    <div className="flex h-full flex-col">
      <div
        className={`hide-scrollbar flex-1 overflow-y-auto p-6 space-y-6 ${
          mobile ? "max-h-[calc(80vh-180px)]" : ""
        }`}
      >
        <div className="flex items-center justify-between">
          <h2
            className={`text-lg font-bold ${
              isDarkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Group Chat
          </h2>

          <span className="text-[10px] font-bold uppercase tracking-widest text-[#10b981]">
            4 Members Online
          </span>
        </div>

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${
              message.isCurrentUser ? "flex-row-reverse" : ""
            }`}
          >
            <img
              src={message.avatar}
              alt={message.sender}
              className="h-10 w-10 rounded-xl object-cover"
            />

            <div
              className={`flex flex-col max-w-[80%] ${
                message.isCurrentUser ? "items-end" : "items-start"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`text-xs font-bold ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  {message.sender}
                </span>

                <span className="text-[10px] text-slate-500">
                  {message.time}
                </span>
              </div>

              <div
                className={`rounded-2xl border p-4 ${
                  message.isCurrentUser
                    ? "bg-[#10b981] border-[#10b981]"
                    : isDarkMode
                      ? "bg-slate-800 border-slate-700"
                      : "bg-slate-100 border-slate-200"
                }`}
              >
                <p
                  className={`text-sm leading-relaxed ${
                    message.isCurrentUser
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
        ))}
      </div>

      <div className={`p-6 border-t ${theme.border} ${theme.surface}`}>
        <div className={`rounded-[28px] border p-3 ${theme.input}`}>
          <div className="flex items-center gap-3">
            <textarea
              rows={1}
              placeholder="Message group..."
              className={`flex-1 resize-none bg-transparent outline-none text-sm ${
                isDarkMode
                  ? "text-white placeholder:text-slate-500"
                  : "text-slate-900 placeholder:text-slate-400"
              }`}
            />

            <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#10b981] text-white transition hover:bg-[#059669]">
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatTab;
