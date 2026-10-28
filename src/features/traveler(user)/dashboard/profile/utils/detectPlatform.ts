import { SocialPlatform } from "./getPlatformIcon";

export function detectPlatform(url: string): SocialPlatform {
  try {
    const hostname = new URL(url).hostname.toLowerCase();

    if (hostname.includes("instagram")) return SocialPlatform.INSTAGRAM;

    if (hostname.includes("linkedin")) return SocialPlatform.LINKEDIN;

    if (hostname.includes("github")) return SocialPlatform.GITHUB;

    if (hostname.includes("facebook")) return SocialPlatform.FACEBOOK;

    if (hostname.includes("twitter") || hostname.includes("x.com"))
      return SocialPlatform.X;

    if (hostname.includes("youtube") || hostname.includes("youtu.be"))
      return SocialPlatform.YOUTUBE;

    return SocialPlatform.WEBSITE;
  } catch {
    return SocialPlatform.WEBSITE;
  }
}
