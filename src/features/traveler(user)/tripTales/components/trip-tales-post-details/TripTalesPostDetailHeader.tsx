import React from "react";
import { ArrowLeft, Bookmark, Share2 } from "lucide-react";

/*
This is the top bar from the original UI with:

Back to TripTales
Share
Bookmark
 */
interface TripTalesPostDetailHeaderProps {
  isSaved: boolean;
  onToggleSave: () => void;
  onShare: () => void;
}

const TripTalesPostDetailHeader: React.FC<TripTalesPostDetailHeaderProps> = ({
  isSaved,
  onToggleSave,
  onShare,
}) => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="border-b border-[#E2E8F0] bg-white/60 backdrop-blur-sm sticky top-16 z-30">
      <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between text-xs">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-1.5 font-bold text-slate-600 hover:text-[#15803D] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />

          <span>Back to TripTales</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onShare}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
            title="Share Story"
          >
            <Share2 className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onToggleSave}
            className={`p-2 rounded-full hover:bg-slate-100 transition-colors ${
              isSaved ? "text-[#15803D]" : "text-slate-500 hover:text-slate-900"
            }`}
            title="Bookmark Post"
          >
            <Bookmark
              className={`w-4 h-4 ${isSaved ? "fill-[#15803D]" : ""}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripTalesPostDetailHeader;
