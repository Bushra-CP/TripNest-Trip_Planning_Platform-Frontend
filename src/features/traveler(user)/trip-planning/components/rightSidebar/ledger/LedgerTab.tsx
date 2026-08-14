import {
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Navigation,
  PlusCircle,
  Send,
  TrendingUp,
  Wallet,
} from "lucide-react";

interface ThemeProps {
  surface: string;
  border: string;
  divider: string;
  primaryText: string;
  secondaryText: string;
  mutedText: string;
  input: string;
}

interface LedgerTabProps {
  mobile?: boolean;
  isDarkMode: boolean;
  theme: ThemeProps;
}

const recentExpenses = [
  {
    id: 1,
    title: "Fuel Refill - NH66",
    meta: "Paid by Rahul • Split equally",
    amount: "₹3,200",
    icon: <Wallet size={18} />,
    status: "verified",
  },
  {
    id: 2,
    title: "Beach Resort Booking",
    meta: "Paid by Priya • Split 4 ways",
    amount: "₹18,500",
    icon: <Wallet size={18} />,
    status: "pending",
  },
  {
    id: 3,
    title: "Dinner at Fisherman's",
    meta: "Paid by Arjun • Split equally",
    amount: "₹3,100",
    icon: <Wallet size={18} />,
    status: "verified",
  },
];

const LedgerTab = ({
  mobile = false,
  isDarkMode,
  theme,
}: LedgerTabProps) => {
  return (
    <>
      <div
        className={`flex-1 overflow-y-auto hide-scrollbar p-6 space-y-8 ${
          mobile ? "max-h-[calc(80vh-180px)]" : ""
        }`}
      >
        <div className="flex items-center justify-between">
          <h3
            className={`text-xs font-black uppercase tracking-[0.2em] ${theme.mutedText}`}
          >
            Group Split Ledger
          </h3>

          <button className="flex items-center gap-1.5 text-[#10b981] hover:text-[#059669] text-[10px] font-bold uppercase tracking-widest transition-colors">
            <PlusCircle size={14} />
            Add Expense
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div
            className={`rounded-2xl p-5 border ${
              isDarkMode
                ? "bg-white/5 border-white/10"
                : "bg-slate-50 border-slate-200"
            }`}
          >
            <p className={`text-[9px] font-black mb-1 ${theme.mutedText}`}>
              TOTAL POOL
            </p>

            <h4 className={`text-2xl font-black ${theme.primaryText}`}>
              ₹24,800
            </h4>
          </div>

          <div
            className={`rounded-2xl p-5 border ${
              isDarkMode
                ? "bg-[#10b981]/5 border-[#10b981]/10"
                : "bg-emerald-50 border-emerald-100"
            }`}
          >
            <p className="text-[9px] font-black text-[#10b981] mb-1">
              YOUR BALANCE
            </p>

            <p className={`text-[10px] ${theme.secondaryText}`}>
              You owe Sneha
            </p>

            <h4 className={`text-2xl font-black ${theme.primaryText}`}>
              ₹1,000
            </h4>
          </div>
        </div>

        <div>
          <p className={`text-[10px] font-black mb-4 ${theme.mutedText}`}>
            RECENT EXPENSES
          </p>

          <div className="space-y-4">
            {recentExpenses.map((expense) => (
              <div
                key={expense.id}
                className={`rounded-2xl p-4 border flex items-center gap-4 transition-colors ${
                  isDarkMode
                    ? "bg-white/5 border-white/10 hover:bg-white/[0.08]"
                    : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-[#10b981] ${
                    isDarkMode ? "bg-white/5" : "bg-white"
                  }`}
                >
                  {expense.icon}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p
                      className={`text-sm font-bold ${theme.primaryText}`}
                    >
                      {expense.title}
                    </p>

                    {expense.status === "verified" && (
                      <CheckCircle2
                        size={12}
                        className="text-[#10b981]"
                      />
                    )}

                    {expense.status === "pending" && (
                      <AlertCircle
                        size={12}
                        className="text-amber-500"
                      />
                    )}
                  </div>

                  <p className={`text-[10px] ${theme.secondaryText}`}>
                    {expense.meta}
                  </p>
                </div>

                <p className={`text-sm font-black ${theme.primaryText}`}>
                  {expense.amount}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className={`pt-6 border-t ${theme.divider}`}>
          <button className="w-full py-4 bg-[#10b981] hover:bg-[#059669] text-white text-xs font-black rounded-2xl uppercase tracking-widest flex items-center justify-center gap-2 transition-colors">
            <Navigation size={16} />
            View Budget Breakdown
          </button>

          <div
            className={`mt-4 rounded-2xl p-4 border flex items-center justify-between ${
              isDarkMode
                ? "bg-[#10b981]/5 border-[#10b981]/10"
                : "bg-emerald-50 border-emerald-100"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#10b981]/20 flex items-center justify-center text-[#10b981]">
                <TrendingUp size={16} />
              </div>

              <div>
                <p className={`text-[10px] font-black ${theme.primaryText}`}>
                  Spending is 12% below budget
                </p>
              </div>
            </div>

            <ChevronRight
              size={16}
              className={theme.mutedText}
            />
          </div>
        </div>
      </div>

      <div className={`p-6 border-t ${theme.divider}`}>
        <div
          className={`rounded-[28px] p-2 flex items-center gap-3 border ${theme.input}`}
        >
          <input
            type="text"
            placeholder="Message group..."
            className={`flex-1 bg-transparent border-none outline-none text-sm px-4 ${theme.primaryText}`}
          />

          <button
            className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${theme.surface}`}
          >
            <Send size={18} className={theme.mutedText} />
          </button>
        </div>
      </div>
    </>
  );
};

export default LedgerTab;