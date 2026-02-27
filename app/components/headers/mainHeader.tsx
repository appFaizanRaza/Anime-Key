"use client";

import Image from "next/image";
import Link from "next/link";
import { COMMON } from "../../common/logo";
import { useState, useEffect, useRef } from "react";
import { NAV_LINKS } from "../../constants/navigation";
import { ICONS } from "../../assets/icons";
import { LANGUAGES } from "../../constants/languages";
import { usePathname } from "next/navigation";
import SearchIcon from "../../icons/searchicon";
import { HEADER_IMAGE } from "../../assets/header.images";
import UserMenu from "../userMenu";
import { Button } from "../button";

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

  const isLoggedIn = true;

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
            <Button variant="ghost" size="icon" aria-label="Search">
              <SearchIcon className="w-6 h-6 text-white" />
            </Button>
            <div className="" ref={langDropdownRef}>
              <Button
                variant="outline"
                size="sm"
                aria-label="Select language"
                onClick={() => setIsLangOpen((p) => !p)}
                className="h-[36px] !min-w-[48px] md:!min-w-[120px] gap-1 md:gap-2"
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
              </Button>
              <div
                className={`
                  absolute w-36
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
                    <Button
                      key={lang.code}
                      variant="menu"
                      size="sm"
                      onClick={() => handleLanguageSelect(lang)}
                      className={
                        selectedLanguage.code === lang.code ? "bg-white/5" : ""
                      }
                    >
                      {lang.label}

                      {selectedLanguage.code === lang.code && (
                        <Image
                          src={HEADER_IMAGE.ICONS.tick.src}
                          alt={HEADER_IMAGE.ICONS.tick.alt}
                          width={16}
                          height={16}
                        />
                      )}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`
          fixed inset-0 z-40 md:hidden
          transition-all duration-300 ease-in-out
          ${
            isMenuOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible pointer-events-none"
          }
        `}
      >
        <div
          className="absolute z-50 bg-black"
          onClick={() => setIsMenuOpen(false)}
        />
        <div
          className={`
    fixed top-16 left-0 w-full
    h-[calc(100vh-8rem)]
    bg-black
    z-50
    transform transition-transform duration-300 ease-in-out
    ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
  `}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <Link
                href="/"
                className="flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Image
                  src={COMMON.LOGO.src}
                  alt={COMMON.LOGO.alt}
                  width={40}
                  height={40}
                  className="w-8 h-8"
                />
              </Link>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-white hover:text-text-green transition-colors"
                aria-label="Close menu"
              >
                <Image
                  src={HEADER_IMAGE.ICONS.cross.src}
                  alt={HEADER_IMAGE.ICONS.cross.alt}
                  width={24}
                  height={24}
                />
              </button>
            </div>
            <nav className="flex-1 p-4">
              <div className="space-y-2">
                {NAV_LINKS.map(({ label, href }) => {
                  const isActive = pathname === href;

                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`
                        block px-4 py-3 rounded-lg text-lg font-medium
                        transition-all duration-200
                        ${
                          isActive
                            ? "bg-accent-green/20 text-text-green border-l-4 border-accent-green"
                            : "text-white hover:bg-white/10 hover:text-text-green"
                        }
                      `}
                    >
                      {label}
                    </Link>
                  );
                })}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
