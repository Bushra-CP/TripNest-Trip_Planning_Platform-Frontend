import { Car, Clock, CreditCard, MessageSquare, Users } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import type { TabType } from "./RightSidebar";

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

interface SidebarTabsProps {
  activeTab: TabType;
  setActiveTab: Dispatch<SetStateAction<TabType>>;
  isDarkMode: boolean;
  theme: ThemeProps;
}

const tabs = [
  {
    id: "CHAT" as const,
    label: "CHAT",
    icon: MessageSquare,
  },
  {
    id: "PEOPLE" as const,
    label: "PEOPLE",
    icon: Users,
  },
  {
    id: "VEHICLES" as const,
    label: "VEHICLES",
    icon: Car,
  },
  {
    id: "ITINERARY" as const,
    label: "ITINERARY",
    icon: Clock,
  },
  {
    id: "LEDGER" as const,
    label: "LEDGER",
    icon: CreditCard,
  },
];

const SidebarTabs = ({
  activeTab,
  setActiveTab,
  isDarkMode,
  theme,
}: SidebarTabsProps) => {
  return (
    <div className={`h-[80px] border-b ${theme.surface} ${theme.border}`}>
      <div className="flex h-full">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative
                flex-1
                flex
                flex-col
                items-center
                justify-center
                gap-3
                transition-all
                duration-300
                group
                ${
                  isActive
                    ? "text-[#3B82F6]"
                    : isDarkMode
                      ? "text-slate-500 hover:text-slate-300"
                      : "text-slate-400 hover:text-slate-700"
                }
              `}
            >
              <div
                className={`
                  transition-transform
                  duration-300
                  ${isActive ? "scale-110" : "group-hover:scale-105"}
                `}
              >
                <Icon size={22} strokeWidth={1.8} />
              </div>

              <span className="text-[10px] font-black uppercase tracking-wider">
                {tab.label}
              </span>

              {isActive && (
                <div className="absolute bottom-0 left-0 h-[2px] w-full bg-[#3B82F6]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarTabs;