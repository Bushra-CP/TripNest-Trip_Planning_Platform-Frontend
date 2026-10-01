export type TripMemberRole = "OWNER" | "MEMBER" | "GUEST";

export interface TripMemberUser {
  _id: string;
  name: string;
  profilePic?: string;
}

export interface TripMember {
  _id: string;
  tripId: string;
  user: TripMemberUser;
  role: TripMemberRole;
  joinedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface JoinGroupResponse {
  member: TripMember;
  tripId: string;
  roomId: string;
  threadId: string;
  tripMode: "group";
}

export interface CreateMemberRequest {
  roomId: string;
}

export interface UpdateMemberRequest {
  threadId: string;
  role: "MEMBER" | "GUEST";
}

export interface DeleteMemberRequest {
  threadId: string;
}

export interface JoinGroupApiResponse {
  success: boolean;
  message: string;
  data: JoinGroupResponse;
}

export interface TripMemberApiResponse {
  success: boolean;
  message: string;
  data: TripMember;
}

export interface TripMembersApiResponse {
  success: boolean;
  message: string;
  data: TripMember[];
}
