export interface SocialPresenceRequestDto {
  url: string;
}

export interface UpdateTravelerProfileRequestDto {
  fullName: string;

  phone: string;

  country?: string;

  state?: string;

  city?: string;

  bio?: string;

  socialPresence?: SocialPresenceRequestDto[];
}

export interface UpdateTravelerProfileResponseDto {
  data: {
    message: string;
  };
}
