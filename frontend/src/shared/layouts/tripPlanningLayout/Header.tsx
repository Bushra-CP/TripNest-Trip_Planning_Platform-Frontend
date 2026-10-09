import { useEffect, useState } from "react";

import Logo from "../userLayout/Logo";

import { Moon, Plus, Sun } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import {
  selectMode,
  selectRoomId,
} from "@/features/traveler(user)/trip-planning/redux/trip-planning/trip-planning.selectors";

import type { AppDispatch, RootState } from "@/app/store";

import { selectUser } from "@/features/traveler(user)/auth/redux/authSelectors";

import { toast } from "sonner";

import { useNavigate } from "react-router-dom";

import UserHeaderActions from "../userLayout/UserHeaderActions";
import GuestHeaderActions from "../userLayout/GuestHeaderActions";

import {
  clearAIPlanning,
  setThreadId,
} from "@/features/traveler(user)/trip-planning/redux/ai-planning/ai-planning.slice";

import {
  convertToGroupTripThunk,
  getTripByThreadIdThunk,
} from "@/features/traveler(user)/trip-planning/redux/trip-planning/trip-planning.thunk";

import {
  clearTripPlanning,
  setTripState,
} from "@/features/traveler(user)/trip-planning/redux/trip-planning/trip-planning.slice";

import {
  getTripMembersThunk,
  joinGroupThunk,
} from "@/features/traveler(user)/trip-planning/redux/member/member.thunk";
import { clearTripVehicles } from "@/features/traveler(user)/trip-planning/redux/trip-vehicle/trip-vehicle.slice";

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

  // =====================================================
  // REDUX STATE
  // =====================================================

  const { threadId } = useSelector((state: RootState) => state.aiPlanning);

  const user = useSelector(selectUser);

  const tripMode = useSelector(selectMode);

  const roomId = useSelector(selectRoomId);

  // =====================================================
  // LOCAL STATE
  // =====================================================

  const [groupIdInput, setGroupIdInput] = useState("");

  // =====================================================
  // RESTORE TRIP
  // =====================================================

  useEffect(() => {
    if (!threadId) {
      return;
    }

    dispatch(getTripByThreadIdThunk(threadId));
  }, [dispatch, threadId]);

  // =====================================================
  // FETCH MEMBERS
  // =====================================================

  useEffect(() => {
    if (!threadId) {
      return;
    }

    dispatch(getTripMembersThunk(threadId));
  }, [dispatch, threadId]);

  // =====================================================
  // CREATE NEW TRIP
  // =====================================================

  const handleCreateNewTrip = () => {
    dispatch(clearAIPlanning());

    dispatch(clearTripPlanning());

    dispatch(clearTripVehicles());

    navigate("/trip-plan");
  };

  // =====================================================
  // CREATE GROUP
  // =====================================================

  const handleCreateGroup = async () => {
    try {
      if (!user) {
        toast.error("Please login first to create group!");

        navigate("/login");

        return;
      }

      const result = await dispatch(
        convertToGroupTripThunk(threadId ?? undefined),
      ).unwrap();

      console.log("Group created:", result);

      dispatch(
        setTripState({
          tripId: result._id,
          roomId: result.roomId ?? "",
          mode: result.tripMode,
        }),
      );

      dispatch(setThreadId(result.threadId));

      // Fetch members after creating group
      await dispatch(getTripMembersThunk(result.threadId));
    } catch (error) {
      console.error("Failed to create group:", error);

      toast.error(typeof error === "string" ? error : "Failed to create group");
    }
  };

  // =====================================================
  // JOIN GROUP
  // =====================================================

  const handleJoinGroup = async () => {
    const trimmedRoomId = groupIdInput.trim().toUpperCase();

    if (!trimmedRoomId) {
      return;
    }

    try {
      const result = await dispatch(joinGroupThunk(trimmedRoomId)).unwrap();

      console.log("Joined group:", result);

      // -----------------------------------------------
      // SET TRIP STATE
      // -----------------------------------------------

      dispatch(
        setTripState({
          tripId: result.tripId,
          roomId: result.roomId,
          mode: result.tripMode,
        }),
      );

      // -----------------------------------------------
      // SET THREAD ID
      // -----------------------------------------------

      dispatch(setThreadId(result.threadId));

      // -----------------------------------------------
      // FETCH MEMBERS
      // -----------------------------------------------

      await dispatch(getTripMembersThunk(result.threadId));

      // -----------------------------------------------
      // CLEAR INPUT
      // -----------------------------------------------

      setGroupIdInput("");

      toast.success("Joined group successfully");
    } catch (error) {
      toast.error(typeof error === "string" ? error : "Failed to join group");
    }
  };

  // =====================================================
  // COPY GROUP ID
  // =====================================================

  const handleCopyGroupId = async () => {
    if (!roomId) {
      return;
    }

    try {
      await navigator.clipboard.writeText(roomId);

      toast.success("Room ID copied");
    } catch {
      toast.error("Failed to copy Room ID");
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <header
      className={`absolute top-0 left-0 right-0 z-100 flex h-16 items-center border-b px-3 transition-colors duration-300 sm:px-5 ${theme.surface} ${theme.border}`}
    >
      {/* =================================================
          LOGO
      ================================================= */}

      <div className="flex w-auto shrink-0 items-center gap-2 lg:w-36.25">
        <Logo />
      </div>

      {/* =================================================
          TRIP MODE
      ================================================= */}

      <div className="hidden items-center gap-2 sm:flex lg:ml-4">
        {/* =================================================
            GROUP TRIP
        ================================================= */}

        {tripMode === "group" && (
          <div
            className={`flex h-9 items-center gap-3 rounded-lg border px-3 transition-colors ${theme.input}`}
          >
            <span className="text-[8px] uppercase tracking-widest text-slate-500">
              Room ID
            </span>

            <span className="text-[10px] font-bold text-[#3B82F6]">
              {roomId ?? "N/A"}
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

        {/* =================================================
            SOLO TRIP
        ================================================= */}

        {tripMode === "solo" && (
          <>
            {/* CREATE GROUP */}

            <button
              type="button"
              onClick={handleCreateGroup}
              className="h-9 rounded-lg bg-[#3B82F6] px-3 text-[10px] font-semibold text-white transition-colors hover:bg-[#2563EB]"
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
                className="h-full w-32 bg-transparent px-3 text-[10px] outline-none"
              />

              <button
                type="button"
                onClick={handleJoinGroup}
                disabled={!groupIdInput.trim()}
                className="h-full px-3 text-[10px] font-semibold text-[#3B82F6] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Join Group
              </button>
            </div>
          </>
        )}
      </div>

      {/* =================================================
          RIGHT NAVIGATION
      ================================================= */}

      <div className="ml-auto flex items-center gap-2 sm:gap-4 lg:gap-5">
        {/* =================================================
            CREATE NEW TRIP
        ================================================= */}

        <button
          type="button"
          aria-label="Create New Trip"
          title="Create New Trip"
          onClick={handleCreateNewTrip}
          className="flex h-9 items-center justify-center rounded-lg bg-[#3B82F6] px-3 text-[10px] font-semibold text-white transition-colors hover:bg-[#2563EB]"
        >
          <Plus size={20} />
        </button>

        {/* =================================================
            MEMBERS
        ================================================= */}

        {/* =================================================
            THEME
        ================================================= */}

        <button
          type="button"
          onClick={toggleTheme}
          className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors sm:h-9 sm:w-9 ${theme.iconButton}`}
          aria-label={
            isDarkMode ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {isDarkMode ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        {/* =================================================
            USER ACTIONS
        ================================================= */}

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-5">
            {user ? <UserHeaderActions /> : <GuestHeaderActions />}
          </div>
        </div>
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
