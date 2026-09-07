import { Navigation } from "lucide-react";
import type { ChatMessage } from "../../interfaces/ai-planning.interfaces";

interface AIConversationProps {
  theme: {
    card: string;
    primaryText: string;
    secondaryText: string;
  };

  messages: ChatMessage[];
  mobile?: boolean;
}

const AIConversation = ({
  theme,
  messages,
  mobile = false,
}: AIConversationProps) => {
  return (
    <div
      className={`overflow-y-auto px-4 py-5 space-y-5 ${
        mobile ? "max-h-[55vh]" : "h-[calc(100vh-64px-54px-64px)]"
      }`}
    >
      {messages.map((message) => {
        const isUser = message.role === "user";

        return (
          <div
            key={message.id}
            className={isUser ? "flex flex-col items-end" : "flex gap-3"}
          >
            {isUser ? (
              <>
                <div
                  className={`max-w-[205px] rounded-xl rounded-tr-sm px-3 py-2.5 ${theme.card}`}
                >
                  <p className={`text-xs leading-relaxed ${theme.primaryText}`}>
                    {message.content}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#3B82F6]">
                  <Navigation size={14} className="text-white" />
                </div>

                <div className="flex-1">
                  <div className="border-l-2 border-[#3B82F6] pl-3">
                    <p
                      className={`text-xs leading-relaxed ${theme.secondaryText}`}
                    >
                      {message.content}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AIConversation;
