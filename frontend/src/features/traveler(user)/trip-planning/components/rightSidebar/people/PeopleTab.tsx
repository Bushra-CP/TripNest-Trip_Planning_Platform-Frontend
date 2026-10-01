import { Send, Settings, UserPlus } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import type { AppDispatch, RootState } from "@/app/store";

import { selectUser } from "@/features/traveler(user)/auth/redux/authSelectors";

import {
  selectMembers,
  selectMembersLoading,
  selectMemberUpdating,
} from "@/features/traveler(user)/trip-planning/redux/member/member.selectors";

import { updateMemberThunk } from "@/features/traveler(user)/trip-planning/redux/member/member.thunk";

import { selectRoomId } from "@/features/traveler(user)/trip-planning/redux/trip-planning/trip-planning.selectors";

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

interface PeopleTabProps {
  mobile?: boolean;
  isDarkMode: boolean;
  theme: ThemeProps;
}

const PeopleTab = ({ mobile = false, isDarkMode, theme }: PeopleTabProps) => {
  const dispatch = useDispatch<AppDispatch>();

  // =====================================================
  // REDUX STATE
  // =====================================================

  const members = useSelector(selectMembers);

  const roomId = useSelector(selectRoomId);

  const isLoadingMembers = useSelector(selectMembersLoading);

  const isUpdatingMember = useSelector(selectMemberUpdating);

  const user = useSelector(selectUser);

  const { threadId } = useSelector((state: RootState) => state.aiPlanning);

  // =====================================================
  // UPDATE OWN ROLE
  // =====================================================

  const handleRoleChange = async (currentRole: "MEMBER" | "GUEST") => {
    if (!threadId) {
      toast.error("Trip thread not found");
      return;
    }

    const newRole = currentRole === "GUEST" ? "MEMBER" : "GUEST";

    try {
      await dispatch(
        updateMemberThunk({
          threadId,
          role: newRole,
        }),
      ).unwrap();

      toast.success(
        newRole === "MEMBER" ? "You are now a member" : "You are now a guest",
      );
    } catch (error) {
      toast.error(
        typeof error === "string" ? error : "Failed to update your role",
      );
    }
  };

  // =====================================================
  // COPY ROOM ID
  // =====================================================

  const handleCopyRoomId = async () => {
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

  return (
    <div className="flex h-full flex-col">
      {/* =================================================
          CONTENT
      ================================================= */}

      <div
        className={`flex-1 overflow-y-auto hide-scrollbar p-6 space-y-8 ${
          mobile ? "max-h-[calc(80vh-180px)]" : ""
        }`}
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex items-center justify-between">
          <h3
            className={`text-xs font-black uppercase tracking-[0.2em] ${
              isDarkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Participants ({members.length})
          </h3>
        </div>

        {/* =================================================
            MEMBERS
        ================================================= */}

        <div className="space-y-3">
          {isLoadingMembers ? (
            <div
              className={`rounded-2xl border p-6 text-center text-xs ${
                isDarkMode
                  ? "border-white/5 bg-white/5 text-slate-400"
                  : "border-slate-200 bg-white text-slate-500"
              }`}
            >
              Loading members...
            </div>
          ) : members.length === 0 ? (
            <div
              className={`rounded-2xl border p-6 text-center text-xs ${
                isDarkMode
                  ? "border-white/5 bg-white/5 text-slate-400"
                  : "border-slate-200 bg-white text-slate-500"
              }`}
            >
              No members found.
            </div>
          ) : (
            members.map((member) => {
              const isOwner = member.role === "OWNER";

              const isGuest = member.role === "GUEST";

              const isMember = member.role === "MEMBER";

              // -----------------------------------------
              // CHECK CURRENT USER
              // -----------------------------------------

              const isCurrentUser = member.user._id === user?.userId;

              return (
                <div
                  key={member._id}
                  className={`group flex items-center gap-4 rounded-2xl border p-4 transition-all ${
                    isDarkMode
                      ? "border-white/5 bg-white/5 hover:bg-white/[0.07]"
                      : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  {/* =================================================
                      AVATAR
                  ================================================= */}

                  <div className="relative shrink-0">
                    <div
                      className={`flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border ${
                        isDarkMode
                          ? "border-white/10 bg-white/5"
                          : "border-slate-200 bg-slate-50"
                      }`}
                    >
                      {member.user.profilePic ? (
                        <img
                          src={member.user.profilePic}
                          alt={member.user.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span
                          className={`text-sm font-black ${
                            isDarkMode ? "text-slate-300" : "text-slate-600"
                          }`}
                        >
                          {member.user.name?.slice(0, 2).toUpperCase()}
                        </span>
                      )}
                    </div>

                    {/* ONLINE INDICATOR */}

                    <div
                      className={`absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 ${
                        isDarkMode ? "border-[#131b2e]" : "border-white"
                      } bg-[#10b981]`}
                    />
                  </div>

                  {/* =================================================
                      MEMBER DETAILS
                  ================================================= */}

                  <div className="min-w-0 flex-1">
                    <p
                      className={`truncate text-sm font-bold ${
                        isDarkMode ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {member.user.name}

                      {isCurrentUser && (
                        <span
                          className={`ml-2 text-[9px] font-semibold ${
                            isDarkMode ? "text-slate-500" : "text-slate-400"
                          }`}
                        >
                          You
                        </span>
                      )}
                    </p>

                    <p
                      className={`text-[10px] font-bold uppercase tracking-wider ${
                        isDarkMode ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      {isOwner
                        ? "Admin • Owner"
                        : isMember
                          ? "Member • Active"
                          : "Guest • Joined"}
                    </p>
                  </div>

                  {/* =================================================
                      ROLE ACTION
                  ================================================= */}

                  {isOwner ? (
                    <Settings
                      size={14}
                      className={
                        isDarkMode ? "text-slate-600" : "text-slate-400"
                      }
                    />
                  ) : isCurrentUser && isGuest ? (
                    /* GUEST → MEMBER */
                    <button
                      type="button"
                      disabled={isUpdatingMember}
                      onClick={() => handleRoleChange("GUEST")}
                      className="rounded-lg border border-[#10b981]/20 bg-[#10b981]/10 px-4 py-1.5 text-[10px] font-bold text-[#10b981] transition-all hover:bg-[#10b981] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isUpdatingMember ? "Updating..." : "Join to Trip"}
                    </button>
                  ) : isCurrentUser && isMember ? (
                    /* MEMBER → GUEST */
                    <button
                      type="button"
                      disabled={isUpdatingMember}
                      onClick={() => handleRoleChange("MEMBER")}
                      className="text-[10px] font-bold uppercase tracking-widest text-slate-500 opacity-0 transition-all group-hover:opacity-100 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isUpdatingMember ? "Updating..." : "Leave Trip"}
                    </button>
                  ) : null}
                </div>
              );
            })
          )}
        </div>

        {/* =================================================
            SHARE ROOM
        ================================================= */}

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
                Room ID: {roomId ?? "N/A"}
              </p>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={handleCopyRoomId}
              disabled={!roomId}
              className="flex-1 rounded-xl bg-[#10b981] py-2.5 text-[10px] font-black uppercase tracking-widest text-white transition-all hover:bg-[#059669] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Copy Room ID
            </button>

            <button
              type="button"
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

      {/* =================================================
          MESSAGE INPUT
      ================================================= */}

      <div
        className={`border-t p-4 ${
          isDarkMode
            ? "border-white/5 bg-[#0b1326]/50"
            : "border-slate-200 bg-white"
        }`}
      >
        <div className={`rounded-[28px] border p-3 ${theme.input ?? ""}`}>
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
