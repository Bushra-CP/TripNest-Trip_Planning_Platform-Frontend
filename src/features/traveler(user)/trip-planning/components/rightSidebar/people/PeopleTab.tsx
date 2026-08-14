import { useState } from "react";
import { Plus, Send, Settings, UserPlus } from "lucide-react";

interface ThemeProps {
  surface: string;
  border: string;
  input: string;
  iconButton: string;
}

interface PeopleTabProps {
  mobile?: boolean;
  isDarkMode: boolean;
  theme: ThemeProps;
}

interface Participant {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: "online" | "idle";
  canRemove?: boolean;
  isInvite?: boolean;
}

const participants: Participant[] = [
  {
    id: "rahul-s",
    name: "Rahul S.",
    role: "Admin • Active",
    avatar: "https://i.pravatar.cc/100?u=rahul",
    status: "online",
  },
  {
    id: "priya-k",
    name: "Priya K.",
    role: "Contributor • Active",
    avatar: "https://i.pravatar.cc/100?u=priya",
    status: "online",
    canRemove: true,
  },
  {
    id: "amit-m",
    name: "Amit M.",
    role: "Member • Available",
    avatar: "https://i.pravatar.cc/100?u=amit",
    status: "idle",
    isInvite: true,
  },
];

const PeopleTab = ({ mobile = false, isDarkMode, theme }: PeopleTabProps) => {
  const [roomId] = useState("TRP-9081-NX");

  return (
    <div className="flex h-full flex-col">
      <div
        className={`flex-1 overflow-y-auto hide-scrollbar p-6 space-y-8 ${
          mobile ? "max-h-[calc(80vh-180px)]" : ""
        }`}
      >
        <div className="flex items-center justify-between">
          <h3
            className={`text-xs font-black uppercase tracking-[0.2em] ${
              isDarkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Participants (4)
          </h3>

          <button className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#10b981]">
            <Plus size={14} />
            Add Member
          </button>
        </div>

        <div className="space-y-3">
          {participants.map((person) => (
            <div
              key={person.id}
              className={`group flex items-center gap-4 rounded-2xl border p-4 transition-all ${
                isDarkMode
                  ? "border-white/5 bg-white/5 hover:bg-white/[0.07]"
                  : "border-slate-200 bg-white hover:bg-slate-50"
              }`}
            >
              <div className="relative">
                <div
                  className={`h-12 w-12 overflow-hidden rounded-xl border ${
                    isDarkMode ? "border-white/10" : "border-slate-200"
                  }`}
                >
                  <img
                    src={person.avatar}
                    alt={person.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div
                  className={`absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 ${
                    isDarkMode ? "border-[#131b2e]" : "border-white"
                  } ${
                    person.status === "online" ? "bg-[#10b981]" : "bg-slate-500"
                  }`}
                />
              </div>

              <div className="flex-1">
                <p
                  className={`text-sm font-bold ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  {person.name}
                </p>

                <p
                  className={`text-[10px] font-bold uppercase tracking-wider ${
                    isDarkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  {person.role}
                </p>
              </div>

              {person.isInvite ? (
                <button className="rounded-lg border border-[#10b981]/20 bg-[#10b981]/10 px-4 py-1.5 text-[10px] font-bold text-[#10b981] transition-all hover:bg-[#10b981] hover:text-white">
                  Add to Trip
                </button>
              ) : (
                person.canRemove && (
                  <button className="text-[10px] font-bold uppercase tracking-widest text-slate-500 opacity-0 transition-all group-hover:opacity-100 hover:text-red-500">
                    Remove
                  </button>
                )
              )}

              {person.role.includes("Admin") && (
                <Settings
                  size={14}
                  className={isDarkMode ? "text-slate-600" : "text-slate-400"}
                />
              )}
            </div>
          ))}
        </div>

        <div
          className={`rounded-2xl border p-5 ${
            isDarkMode
              ? "border-[#10b981]/10 bg-[#10b981]/5"
              : "border-[#10b981]/20 bg-green-50"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#10b981]/20 text-[#10b981]">
              <UserPlus size={20} />
            </div>

            <div>
              <p
                className={`text-xs font-black uppercase ${
                  isDarkMode ? "text-white" : "text-slate-900"
                }`}
              >
                Share Trip Room
              </p>

              <p
                className={`text-[10px] ${
                  isDarkMode ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Room ID: {roomId}
              </p>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button className="flex-1 rounded-xl bg-[#10b981] py-2.5 text-[10px] font-black uppercase tracking-widest text-white transition-all hover:bg-[#059669]">
              Copy Link
            </button>

            <button
              className={`rounded-xl border p-2.5 ${
                isDarkMode
                  ? "border-white/10 bg-white/5 text-slate-400 hover:bg-white/10"
                  : "border-slate-200 bg-white text-slate-500 hover:bg-slate-100"
              }`}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>

      <div
        className={`border-t p-4 ${
          isDarkMode
            ? "border-white/5 bg-[#0b1326]/50"
            : "border-slate-200 bg-white"
        }`}
      >
        <div className={`rounded-[28px] border p-3 ${theme.input}`}>
          <input
            type="text"
            placeholder="Message group..."
            className={`w-full bg-transparent outline-none ${
              isDarkMode
                ? "text-white placeholder:text-slate-600"
                : "text-slate-900 placeholder:text-slate-400"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default PeopleTab;
