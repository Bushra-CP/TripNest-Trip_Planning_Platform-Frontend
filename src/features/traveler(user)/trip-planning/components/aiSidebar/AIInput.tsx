import { useState } from "react";
import { Send } from "lucide-react";

interface AIInputProps {
  theme: {
    divider: string;
    input: string;
    primaryText: string;
  };

  onSend: (message: string) => void;
  disabled?: boolean;
}

const AIInput = ({ theme, onSend, disabled = false }: AIInputProps) => {
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || disabled) {
      return;
    }

    onSend(trimmedMessage);

    setMessage("");
  }

  return (
    <div className={`border-t p-3 ${theme.divider}`}>
      <form
        onSubmit={handleSubmit}
        className={`flex h-10 items-center gap-2 rounded-lg border px-3 ${theme.input}`}
      >
        <input
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Ask AI to plan, split, or find..."
          disabled={disabled}
          className={`min-w-0 flex-1 border-none bg-transparent text-[10px] outline-none placeholder:text-slate-500 ${theme.primaryText}`}
        />

        <button
          type="submit"
          disabled={disabled || !message.trim()}
          className="text-[#60A5FA] transition-colors hover:text-[#3B82F6] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Send size={15} />
        </button>
      </form>
    </div>
  );
};

export default AIInput;
