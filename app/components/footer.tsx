import Image from "next/image";
import Link from "next/link";
import { COMMON } from "../common/logo";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaSnapchat,
  FaTiktok,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const FOOTER_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Help", href: "/help" },
];

const SOCIAL_LINKS = [
  { icon: FaFacebook, href: "/facebook" },
  { icon: FaInstagram, href: "/instagram" },
  { icon: FaXTwitter, href: "/twitter" },
  { icon: FaLinkedin, href: "/linkedin" },
  { icon: FaSnapchat, href: "/snapchat" },
  { icon: FaTiktok, href: "/tiktok" },
];

export default function Footer() {
  return (
    <footer className="w-full p-4 bg-black mt-8 hidden justify-between md:block md:flex">
      {/* Logo + Links (UNCHANGED) */}
      <div className="flex items-center gap-6">
        <Image
          src={COMMON.LOGO.src}
          alt={COMMON.LOGO.alt}
          width={64}
          height={64}
        />

        <div className="flex flex-col gap-2">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="
                font-semibold
                text-[16px]
                text-white
                hover:text-accent-green
                transition
              "
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* ⭐ ACCOUNT SOCIAL SECTION */}
      <div className="flex flex-row gap-12">
      <div className="mt-4">
        {/* Title */}
        <h3 className="text-white text-xl font-bold mb-4">Account</h3>

        {/* Icons Row */}
        <div className="flex items-center gap-6">
          {SOCIAL_LINKS.map(({ icon: Icon, href }) => (
            <a
              key={href}
              href={href}
              className="
                text-white
                hover:text-accent-green
                transition
              "
              aria-label={href}
            >
              <Icon size={26} />
            </a>
          ))}
        </div>
      </div>
      <div className="mt-4">
        {/* Title */}
        <h3 className="text-white text-xl font-bold mb-4">
          Download our App
        </h3>

        {/* Icons Row */}
        <div className="flex flex-col">
          <Image
            src="/pngegg.png"
            alt="Google Store"
            width={200}
            height={200}
          />
        </div>
      </div>
      </div>
    </footer>
  );
}
