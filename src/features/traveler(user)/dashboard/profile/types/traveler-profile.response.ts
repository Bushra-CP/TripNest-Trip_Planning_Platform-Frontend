export interface ISocialPresence {
  url: string;
}

export interface TravelerProfileResponse {
  data: {
    fullName: string;

    phone: string;

    country: string;

    state:string;

    city: string;

    bio: string;

    socialPresence: ISocialPresence[];

    referenceId: string;
  };
}
