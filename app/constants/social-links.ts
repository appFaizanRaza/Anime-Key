import {
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaLinkedin,
  FaSnapchat,
  FaTiktok,
} from "react-icons/fa6";

export const SOCIAL_LINKS = [
  { icon: FaFacebook, href: "/facebook" },
  { icon: FaInstagram, href: "/instagram" },
  { icon: FaXTwitter, href: "/twitter" },
  { icon: FaLinkedin, href: "/linkedin" },
  { icon: FaSnapchat, href: "/snapchat" },
  { icon: FaTiktok, href: "/tiktok" },
] as const;
