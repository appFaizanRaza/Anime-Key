"use client";

import Image from "next/image";
import Link from "next/link";
import { COMMON } from "../common/logo";
import { useState, useEffect, useRef } from "react";
import { NAV_LINKS } from "../constants/navigation";
import { ICONS } from "../assets/icons";
import { LANGUAGES } from "../constants/languages";
import { usePathname } from "next/navigation";
import SearchIcon from "../icons/searchicon";
import { HEADER_IMAGE } from "../assets/header.images";
import { AUTH_TEXT } from "../constants/label";
import { ROUTES } from "../shared/routes/app.route";
import UserMenu from "./userMenu";

export default function Header() {
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);

  const langDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target as Node)
      ) {
        setIsLangOpen(false);
      }
    };

    if (isLangOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isLangOpen]);

  const handleLanguageSelect = (lang: (typeof LANGUAGES)[0]) => {
    setSelectedLanguage(lang);
    setIsLangOpen(false);
  };

  const isLoggedIn = true; // replace with real auth state

  return (
    <header
      className={`
    fixed top-0 z-50 w-full
    h-14 md:h-header
    px-4 sm:px-6 lg:px-10
    transition-all duration-300
        ${
          isScrolled
            ? "bg-accent-green/20 shadow-lg"
            : "bg-gradient-to-b from-black/70 via-black/40 to-transparent"
        }
      `}
    >
      <div className="flex items-center justify-between h-full mx-auto">
        <div className="flex items-center">
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Open menu"
          >
            {ICONS.menu}
          </button>
          <Link href="/" className="flex shrink-0">
            <Image
              src={COMMON.LOGO.src}
              alt={COMMON.LOGO.alt}
              width={60}
              height={60}
              className="w-7 h-7 md:w-15 md:h-15"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-6 ml-8">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = pathname === href;

              return (
                <Link
                  key={href}
                  href={href}
                  className={`
                    font-nav text-base md:text-lg
                    transition-colors duration-150
                    ${
                      isActive
                        ? "text-text-green font-black"
                        : "text-nav-link hover:text-text-primary"
                    }
                  `}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center md:space-x-2">
          {isLoggedIn ? (
            <UserMenu name="Faizan" avatarUrl="/avatar.jpg" />
          ) : (
            <div className="flex gap-4 text-white">
              <button>Login</button>
              <button>Register</button>
            </div>
          )}
          <div className="flex items-center">
            <button
              aria-label="Search"
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <SearchIcon className="w-6 h-6 text-white" />
            </button>
            <div className="" ref={langDropdownRef}>
              <button
                onClick={() => setIsLangOpen((p) => !p)}
                aria-label="Select language"
                className="
  flex items-center justify-center md:justify-start
  gap-1 md:gap-2
  h-[36px]
  px-3 md:px-3
  rounded-sm
  border border-white  
  text-white text-sm font-medium
  transition-colors
  cursor-pointer
  min-w-[48px] md:min-w-[120px]
"
              >
                <Image
                  src={HEADER_IMAGE.LOGO.src}
                  alt={HEADER_IMAGE.LOGO.alt}
                  width={20}
                  height={20}
                />

                <span className="hidden md:block flex-1 text-left">
                  {selectedLanguage.label}
                </span>

                <Image
                  src={HEADER_IMAGE.ICONS.dropdown.src}
                  alt={HEADER_IMAGE.ICONS.dropdown.alt}
                  width={20}
                  height={20}
                  className={`transition-transform duration-200 ${
                    isLangOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`
                  absolute right-0 top-full w-36
                  bg-[#1a1a1a]
                  border border-white/10
                  rounded-md shadow-2xl
                  overflow-hidden z-50
                  transition-all duration-200 ease-out
                  ${
                    isLangOpen
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
                  }
                `}
              >
                <div className="py-1">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageSelect(lang)}
                      className={`
                        w-full text-left px-2 py-2.5
                        text-sm text-white
                        hover:bg-white/10
                        transition-colors
                        flex items-center gap-2
                        ${
                          selectedLanguage.code === lang.code
                            ? "bg-white/5"
                            : ""
                        }
                      `}
                    >
                      {lang.label}

                      {selectedLanguage.code === lang.code && (
                        <Image
                          src={HEADER_IMAGE.ICONS.tick.src}
                          alt={HEADER_IMAGE.ICONS.tick.alt}
                          width={16}
                          height={16}
                          className="ml-auto"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
