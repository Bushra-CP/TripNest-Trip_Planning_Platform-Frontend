import { useState } from "react";

import SidebarTabs from "./SidebarTabs";
import ChatTab from "./chat/ChatTab";
import PeopleTab from "./people/PeopleTab";
import VehiclesTab from "./vehicles/VehiclesTab";
import LedgerTab from "./ledger/LedgerTab";
import ItineraryTab from "./itinerary/ItineraryTab";

export type TabType = "CHAT" | "PEOPLE" | "VEHICLES" | "LEDGER" | "ITINERARY";

interface RightSidebarProps {
  mobile?: boolean;
  isDarkMode: boolean;
  theme: {
    surface?: string;
    border?: string;
    input?: string;
    iconButton?: string;
    divider?: string;
    primaryText?: string;
    secondaryText?: string;
    mutedText?: string;
  };
}

const RightSidebar = ({
  mobile = false,
  isDarkMode,
  theme,
}: RightSidebarProps) => {
  const [activeTab, setActiveTab] = useState<TabType>("CHAT");

  const renderContent = () => {
    switch (activeTab) {
      case "CHAT":
        return (
          <ChatTab mobile={mobile} isDarkMode={isDarkMode} theme={theme} />
        );

      case "PEOPLE":
        return (
          <PeopleTab mobile={mobile} isDarkMode={isDarkMode} theme={theme} />
        );

      case "VEHICLES":
        return (
          <VehiclesTab mobile={mobile} isDarkMode={isDarkMode} theme={theme} />
        );

      case "LEDGER":
        return (
          <LedgerTab mobile={mobile} isDarkMode={isDarkMode} theme={theme} />
        );

      case "ITINERARY":
        return (
          <ItineraryTab mobile={mobile} isDarkMode={isDarkMode} theme={theme} />
        );

      default:
        return (
          <ChatTab mobile={mobile} isDarkMode={isDarkMode} theme={theme} />
        );
    }
  };

  return (
    <div className="flex flex-col h-full min-h-0">
      <SidebarTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDarkMode={isDarkMode}
        theme={theme}
      />

      <div
        className={`flex flex-col h-full min-h-0 ${
          mobile ? "max-h-[calc(80vh-60px)]" : "h-[calc(100vh-64px)]"
        }`}
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default RightSidebar;