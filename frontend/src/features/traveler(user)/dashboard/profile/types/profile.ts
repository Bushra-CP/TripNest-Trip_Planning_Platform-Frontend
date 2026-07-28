export interface SocialLink {
  platform: string;
  url: string;
}

export interface ProfileType {
  fullName: string;
  phone: string;
  location: string;
  bio: string;
  socialPresence: SocialLink[];
}
