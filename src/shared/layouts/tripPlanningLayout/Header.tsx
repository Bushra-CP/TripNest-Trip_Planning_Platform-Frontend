import { useState } from "react";
import Logo from "../userLayout/Logo";
import { Bell, Moon, Settings, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMode,
  selectRoomId,
} from "@/features/traveler(user)/trip-planning/redux/trip-planning.selectors";
import {
  createRoomThunk,
  getRoomThunk,
} from "@/features/traveler(user)/trip-planning/redux/chat/chat.thunk";
import type { AppDispatch } from "@/app/store";
import { selectUser } from "@/features/traveler(user)/auth/redux/authSelectors";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;

  theme: {
    surface: string;
    border: string;
    input: string;
    iconButton: string;
  };
}

export default function Header({
  isDarkMode,
  toggleTheme,
  theme,
}: HeaderProps) {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const [groupIdInput, setGroupIdInput] = useState("");

  const user = useSelector(selectUser);

  const tripMode = useSelector(selectMode);

  const roomId = useSelector(selectRoomId);

  // ---------------------------------------------
  // CREATE GROUP
  // ---------------------------------------------

  const handleCreateGroup = async () => {
    try {
      if (!user) {
        toast.error("Please login first to create group!");
        navigate("/login");
      }
      const result = await dispatch(createRoomThunk()).unwrap();

      console.log("Group created:", result);
    } catch (error) {
      console.error("Failed to create group:", error);
    }
  };

  // ---------------------------------------------
  // JOIN GROUP
  // ---------------------------------------------

  const handleJoinGroup = async () => {
    const trimmedGroupId = groupIdInput.trim().toUpperCase();

    if (!trimmedGroupId) {
      return;
    }

    try {
      const result = await dispatch(getRoomThunk(trimmedGroupId)).unwrap();

      console.log("Joined group:", result);

      setGroupIdInput("");
    } catch (error) {
      console.error("Failed to join group:", error);
    }
  };

  // ---------------------------------------------
  // COPY GROUP ID
  // ---------------------------------------------

  const handleCopyGroupId = async () => {
    if (!roomId) {
      return;
    }

    await navigator.clipboard.writeText(roomId);
  };

  return (
    <header
      className={`absolute top-0 left-0 right-0 h-16 flex items-center px-3 sm:px-5 z-100 border-b transition-colors duration-300 ${theme.surface} ${theme.border}`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 w-auto lg:w-36.25 shrink-0">
        <Logo />
      </div>

      {/* Trip Mode */}
      <div className="hidden sm:flex items-center gap-2 lg:ml-4">
        {/* -----------------------------------------
            GROUP TRIP
        ------------------------------------------ */}

        {tripMode === "group" && (
          <div
            className={`flex h-9 px-3 items-center gap-3 rounded-lg border transition-colors ${theme.input}`}
          >
            <span className="text-[8px] text-slate-500 uppercase tracking-widest">
              Room ID
            </span>

            <span className="text-[10px] font-bold text-[#3B82F6]">
              {roomId}
            </span>

            {roomId && (
              <button
                type="button"
                onClick={handleCopyGroupId}
                className={theme.iconButton}
                aria-label="Copy group ID"
              >
                <CopyIcon />
              </button>
            )}
          </div>
        )}

        {/* -----------------------------------------
            SOLO TRIP
        ------------------------------------------ */}

        {tripMode === "solo" && (
          <>
            {/* CREATE GROUP */}

            <button
              type="button"
              onClick={handleCreateGroup}
              className="h-9 px-3 rounded-lg bg-[#3B82F6] text-white text-[10px] font-semibold hover:bg-[#2563EB] transition-colors"
            >
              Convert to Group Trip
            </button>

            {/* JOIN GROUP */}

            <div
              className={`flex h-9 items-center rounded-lg border transition-colors ${theme.input}`}
            >
              <input
                type="text"
                value={groupIdInput}
                onChange={(event) => setGroupIdInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleJoinGroup();
                  }
                }}
                placeholder="Enter Group ID"
                className="w-32 h-full px-3 bg-transparent outline-none text-[10px]"
              />

              <button
                type="button"
                onClick={handleJoinGroup}
                disabled={!groupIdInput.trim()}
                className="h-full px-3 text-[10px] font-semibold text-[#3B82F6] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Join Group
              </button>
            </div>
          </>
        )}
      </div>

      {/* Right Navigation */}
      <div className="ml-auto flex items-center gap-2 sm:gap-4 lg:gap-5">
        {/* Members */}
        <div className="hidden md:flex items-center -space-x-2">
          <img
            src="https://i.pravatar.cc/100?u=arjun"
            alt="Arjun"
            className={`w-7 h-7 rounded-full border-2 object-cover ${
              isDarkMode ? "border-[#101B2D]" : "border-white"
            }`}
          />

          <img
            src="https://i.pravatar.cc/100?u=rohan"
            alt="Rohan"
            className={`w-7 h-7 rounded-full border-2 object-cover ${
              isDarkMode ? "border-[#101B2D]" : "border-white"
            }`}
          />

          <img
            src="https://i.pravatar.cc/100?u=priya"
            alt="Priya"
            className={`w-7 h-7 rounded-full border-2 object-cover ${
              isDarkMode ? "border-[#101B2D]" : "border-white"
            }`}
          />

          <div
            className={`w-7 h-7 rounded-full border-2 flex items-center justify-center ${
              isDarkMode
                ? "border-[#101B2D] bg-[#1A2940]"
                : "border-white bg-slate-200"
            }`}
          >
            <span
              className={`text-[8px] font-bold ${
                isDarkMode ? "text-slate-200" : "text-slate-700"
              }`}
            >
              +2
            </span>
          </div>
        </div>

        {/* Theme */}
        <button
          type="button"
          onClick={toggleTheme}
          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center transition-colors ${theme.iconButton}`}
          aria-label={
            isDarkMode ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {isDarkMode ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        {/* Notification */}
        <button
          type="button"
          className={`transition-colors ${theme.iconButton}`}
          aria-label="Notifications"
        >
          <Bell size={18} />
        </button>

        {/* Settings */}
        <button
          type="button"
          className={`hidden sm:block transition-colors ${theme.iconButton}`}
          aria-label="Settings"
        >
          <Settings size={18} />
        </button>
      </div>
    </header>
  );
}

/* =========================================================
   COPY ICON
========================================================= */

const CopyIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="13" height="13" x="9" y="9" rx="2" />

    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);
