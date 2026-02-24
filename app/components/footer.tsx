import Image from "next/image";
import Link from "next/link";
import { COMMON } from "../common/logo";
import { SOCIAL_LINKS } from "../constants/social-links";
import { FOOTER_LINKS } from "../constants/footer";
import { FOOTER_IMAGES } from "../assets/footer.images";
import { AUTH_TEXT } from "../constants/label";

{
  FOOTER_LINKS.map((link) => (
    <Link key={link.href} href={link.href}>
      {link.label}
    </Link>
  ));
}

{
  SOCIAL_LINKS.map(({ icon: Icon, href }) => (
    <Link key={href} href={href}>
      <Icon />
    </Link>
  ));
}

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
         
          <h3 className="text-white text-xl font-bold mb-4">{AUTH_TEXT.footer.title}</h3>

       
          <div className="flex items-center gap-6">
            {SOCIAL_LINKS.map(({ icon: Icon, href }) => (
              <a
                key={href}
                href={href}
                className="
                text-white
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

          <h3 className="text-white text-xl font-bold mb-4">
            {AUTH_TEXT.footer.download}
          </h3>

          <div className="flex flex-col space-y-2 ml-6">
            <Image
              src="/appstore.svg"
              alt={FOOTER_IMAGES.ICON.alt}
              width={120}
              height={48}
            />
            <Image
              src="/googleplay.svg"
              alt={FOOTER_IMAGES.ICON.alt}
              width={120}
              height={48}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
