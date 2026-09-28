import { Navigation } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const handleSourceClick = (postId: string) => {
    navigate(`/trip-tales/posts/${postId}`);
  };

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
              <div
                className={`max-w-[205px] rounded-xl rounded-tr-sm px-3 py-2.5 ${theme.card}`}
              >
                <p className={`text-xs leading-relaxed ${theme.primaryText}`}>
                  {message.content}
                </p>
              </div>
            ) : (
              <>
                <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#3B82F6]">
                  <Navigation size={14} className="text-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="border-l-2 border-[#3B82F6] pl-3">
                    <div
                      className={`text-xs leading-relaxed ${theme.secondaryText}`}
                    >
                      <ReactMarkdown
                        components={{
                          strong: ({ children }) => (
                            <strong className="font-bold">{children}</strong>
                          ),

                          em: ({ children }) => (
                            <em className="italic">{children}</em>
                          ),

                          ul: ({ children }) => (
                            <ul className="my-2 list-disc space-y-1 pl-4">
                              {children}
                            </ul>
                          ),

                          ol: ({ children }) => (
                            <ol className="my-2 list-decimal space-y-1 pl-4">
                              {children}
                            </ol>
                          ),

                          li: ({ children }) => (
                            <li className="pl-1">{children}</li>
                          ),

                          p: ({ children }) => (
                            <p className="mb-2 last:mb-0">{children}</p>
                          ),
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  </div>

                  {message.ragSources && message.ragSources.length > 0 && (
                    <div className="mt-3 space-y-2 pl-3">
                      <p
                        className={`text-[10px] font-semibold ${theme.primaryText}`}
                      >
                        Sources
                      </p>

                      {message.ragSources.map((source) => (
                        <button
                          key={source.postId}
                          type="button"
                          onClick={() => handleSourceClick(source.postId)}
                          className={`block w-full cursor-pointer rounded-lg border p-2 text-left transition hover:border-[#3B82F6] hover:shadow-sm ${theme.card}`}
                        >
                          <p
                            className={`text-[10px] font-semibold ${theme.primaryText}`}
                          >
                            {source.title}
                          </p>

                          <p
                            className={`mt-0.5 text-[9px] ${theme.secondaryText}`}
                          >
                            {source.destination}
                          </p>

                          {source.media.length > 0 && (
                            <div className="mt-2 flex gap-1.5 overflow-x-auto">
                              {source.media.map((media, index) => (
                                <div
                                  key={`${media.url}-${index}`}
                                  className="h-12 w-12 shrink-0 overflow-hidden rounded-md"
                                >
                                  {media.type === "image" ? (
                                    <img
                                      src={media.url}
                                      alt={source.title}
                                      className="h-full w-full object-cover"
                                    />
                                  ) : (
                                    <video
                                      src={media.url}
                                      className="h-full w-full object-cover"
                                      muted
                                    />
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
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