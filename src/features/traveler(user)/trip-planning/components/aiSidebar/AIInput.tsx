import { Send } from "lucide-react";

interface AIInputProps {
  theme: {
    divider: string;
    input: string;
    primaryText: string;
  };
}

const AIInput = ({ theme }: AIInputProps) => {
  return (
    <div className={`border-t p-3 ${theme.divider}`}>
      <div
        className={`flex h-10 items-center gap-2 rounded-lg border px-3 ${theme.input}`}
      >
        <input
          type="text"
          placeholder="Ask AI to plan, split, or find..."
          className={`flex-1 min-w-0 border-none bg-transparent text-[10px] outline-none placeholder:text-slate-500 ${theme.primaryText}`}
        />

        <button
          type="button"
          className="text-[#60A5FA] transition-colors hover:text-[#3B82F6]"
        >
          <Send size={15} />
        </button>
      </div>
    </div>
  );
};

export default AIInput;
