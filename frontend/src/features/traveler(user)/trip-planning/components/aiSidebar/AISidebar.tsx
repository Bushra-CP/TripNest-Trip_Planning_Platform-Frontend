import { MoreHorizontal, Navigation } from "lucide-react";

import AIConversation from "./AIConversation";
import AIInput from "./AIInput";


interface AIContentProps {
  theme: {
    page: string;
    surface: string;
    surfaceSecondary: string;
    card: string;
    border: string;
    divider: string;
    primaryText: string;
    secondaryText: string;
    mutedText: string;
    input: string;
    secondaryButton: string;
    iconButton: string;
  };
  isDarkMode: boolean;
  mobile?: boolean;
}


const AISidebar = ({ theme, mobile = false }: AIContentProps) => {
  return (
    <div className="flex min-h-0 flex-col">
      {!mobile && (
        <div
          className={`flex h-[54px] items-center justify-between border-b px-4 ${theme.divider}`}
        >
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#3B82F6]/10">
              <Navigation size={15} className="text-[#60A5FA]" />
            </div>

            <span className={`text-xs font-bold ${theme.primaryText}`}>
              AI Assistant
            </span>
          </div>

          <button
            type="button"
            className={theme.iconButton}
            aria-label="AI assistant options"
          >
            <MoreHorizontal size={18} />
          </button>
        </div>
      )}

      <AIConversation theme={theme} mobile={mobile} />

      <AIInput theme={theme} />
    </div>
  );
};

export default AISidebar;
