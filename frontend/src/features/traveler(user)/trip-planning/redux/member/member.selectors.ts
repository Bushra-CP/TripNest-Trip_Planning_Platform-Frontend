import type { RootState } from "@/app/store";
import { selectUser } from "@/features/traveler(user)/auth/redux/authSelectors";

export const selectMembers = (state: RootState) => state.member.members;

export const selectJoinedMember = (state: RootState) => {
  const members = state.member.members;
  const user = selectUser(state);

  if (!user?.userId) {
    return null;
  }

  return members.find((member) => member.user._id === user.userId) ?? null;
};

export const selectMemberJoining = (state: RootState) => state.member.isJoining;

export const selectMemberUpdating = (state: RootState) =>
  state.member.isUpdating;

export const selectMemberDeleting = (state: RootState) =>
  state.member.isDeleting;

export const selectMembersLoading = (state: RootState) =>
  state.member.isLoadingMembers;

export const selectMemberError = (state: RootState) => state.member.error;
