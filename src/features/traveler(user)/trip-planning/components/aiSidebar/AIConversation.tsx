import { Navigation } from "lucide-react";

interface AIConversationProps {
  theme: {
    card: string;
    primaryText: string;
    secondaryText: string;
    secondaryButton: string;
  };
  mobile?: boolean;
}

const AIConversation = ({ theme, mobile = false }: AIConversationProps) => {
  return (
    <div
      className={`overflow-y-auto px-4 py-5 space-y-5 ${
        mobile ? "max-h-[55vh]" : "h-[calc(100vh-64px-54px-64px)]"
      }`}
    >
      <div className="flex flex-col items-end">
        <div
          className={`max-w-[205px] rounded-xl rounded-tr-sm px-3 py-2.5 ${theme.card}`}
        >
          <p className={`text-xs leading-relaxed ${theme.primaryText}`}>
            AI, change our route to avoid highways and update the group ledger.
          </p>
        </div>

        <span className="mt-1.5 mr-1 text-[8px] text-slate-500">
          Priya • 10:42 AM
        </span>
      </div>

      <div className="flex gap-3">
        <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#3B82F6]">
          <Navigation size={14} className="text-white" />
        </div>

        <div className="flex-1">
          <div className="border-l-2 border-[#3B82F6] pl-3">
            <p
              className={`text-xs italic leading-relaxed ${theme.secondaryText}`}
            >
              Route updated to avoid NH66. Distance increased by 42 km, but toll
              costs reduced by ₹400. Group balances recalculated.
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              <button className="rounded-lg bg-[#3B82F6] px-3 py-1.5 text-[9px] font-bold text-white">
                Yes, update
              </button>

              <button
                className={`rounded-lg px-3 py-1.5 text-[9px] font-bold ${theme.secondaryButton}`}
              >
                Not now
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-md border border-[#3B82F6]/25 bg-[#3B82F6]/10 px-2 py-1 text-[7px] font-bold uppercase tracking-wide text-[#60A5FA]">
              Map Updated
            </span>

            <span className="rounded-md border border-[#3B82F6]/25 bg-[#3B82F6]/10 px-2 py-1 text-[7px] font-bold uppercase tracking-wide text-[#60A5FA]">
              Ledger Synced
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIConversation;
