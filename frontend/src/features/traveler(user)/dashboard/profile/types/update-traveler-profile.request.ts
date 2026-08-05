export interface SocialPresenceRequest {
  url: string;
}

export interface UpdateTravelerProfileRequest {
  fullName: string;

  phone: string;

  country?: string;

  state?: string;

  city?: string;

  bio?: string;

  socialPresence?: SocialPresenceRequest[];
}

export interface UpdateTravelerProfileResponse {
  data: {
    message: string;
  };
}
