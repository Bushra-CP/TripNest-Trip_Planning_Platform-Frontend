import type { RootState } from "@/app/store";

export const selectMembers = (state: RootState) => state.member.members;

export const selectJoinedMember = (state: RootState) =>
  state.member.joinedMember;

export const selectMemberJoining = (state: RootState) => state.member.isJoining;

export const selectMemberUpdating = (state: RootState) =>
  state.member.isUpdating;

export const selectMemberDeleting = (state: RootState) =>
  state.member.isDeleting;

export const selectMembersLoading = (state: RootState) =>
  state.member.isLoadingMembers;

export const selectMemberError = (state: RootState) => state.member.error;
