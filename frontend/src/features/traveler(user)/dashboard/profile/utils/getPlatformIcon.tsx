import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";
import { Globe } from "lucide-react";

export const SocialPlatform = {
  INSTAGRAM: "INSTAGRAM",
  FACEBOOK: "FACEBOOK",
  LINKEDIN: "LINKEDIN",
  GITHUB: "GITHUB",
  X: "X",
  YOUTUBE: "YOUTUBE",
  WEBSITE: "WEBSITE",
} as const;

export type SocialPlatform =
  (typeof SocialPlatform)[keyof typeof SocialPlatform];

export function getPlatformIcon(platform: SocialPlatform) {
  switch (platform) {
    case SocialPlatform.GITHUB:
      return <FaGithub size={18} className="text-gray-700" />;

    case SocialPlatform.LINKEDIN:
      return <FaLinkedin size={18} className="text-[#0A66C2]" />;

    case SocialPlatform.INSTAGRAM:
      return <FaInstagram size={18} className="text-pink-500" />;

    case SocialPlatform.FACEBOOK:
      return <FaFacebook size={18} className="text-blue-600" />;

    case SocialPlatform.YOUTUBE:
      return <FaYoutube size={18} className="text-red-600" />;

    case SocialPlatform.X:
      return <FaXTwitter size={18} className="text-black" />;

    default:
      return <Globe size={18} className="text-gray-500" />;
  }
}
