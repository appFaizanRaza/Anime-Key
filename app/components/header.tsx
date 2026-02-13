"use client";

import Image from "next/image";
import Link from "next/link";
import { COMMON } from "../common/logo";
import { useState, useEffect, useRef } from "react";
import { NAV_LINKS } from "../constants/navigation";
import { ICONS } from "../assets/icons";
import { HEADER_IMAGE } from "../assets/header.images";
import { LANGUAGES } from "../constants/languages";
import { usePathname } from "next/navigation";
import  SearchIcon  from "../icons/searchicon"

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };

    if (isLangOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLangOpen]);

  const handleLanguageSelect = (lang: typeof LANGUAGES[0]) => {
    setSelectedLanguage(lang);
    setIsLangOpen(false);
  };

  return (
<header
  className={`
    fixed top-0 z-50 h-14 md:h-header w-full
    transition-all duration-300
    ${isScrolled
      ? "bg-accent-green/20 shadow-lg"
      : "bg-gradient-to-b from-black/70 via-black/40 to-transparent"}
  `}
>



      <div className="h-full flex items-center flex-auto md:gap-4 md:px-6">
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Open-menu"
        >
          {ICONS.menu}
        </button>

        <Link href="/" className="flex shrink-0 left-2">
          <Image
            src={COMMON.LOGO.src}
            alt={COMMON.LOGO.alt}
            width={64}
            height={64}
          />
        </Link>

        <nav className="hidden md:flex items-center flex-1 gap-6">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                className={`
                  font-nav
                  text-base md:text-lg
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

        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-black/95 flex flex-col gap-6 px-6 py-8 md:hidden z-50">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsMenuOpen(false)}
                className="text-white text-lg font-nav"
              >
                {label}
              </Link>
            ))}
          </div>
        )}

        {/* RIGHT: Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/register"
            className="
              font-black
              text-base md:text-lg
              text-text-green
              py-2
              whitespace-nowrap
              transition-colors
              duration-150
            "
          >
            Register
          </Link>

          <span className="text-text-primary">|</span>

          <Link
            href="/login"
            className="
              font-black
              text-base md:text-lg
              text-text-green
              py-2
              whitespace-nowrap
              transition-colors
              duration-150
            "
          >
            Login
          </Link>

          <button
            aria-label="Search"
            className="
              p-2 rounded-full transition
            "
          >
            <SearchIcon className="w-6 h-6 text-white"/>
          </button>

          {/* Language Selector */}
          <div className="relative" ref={langDropdownRef}>
            {/* Mobile Language Selector */}
            <button
              onClick={() => setIsLangOpen((p) => !p)}
              className="md:hidden flex items-center gap-1 p-2 border rounded-md"
              aria-label="Select language"
            >
              <Image src={HEADER_IMAGE.LOGO.src} alt={HEADER_IMAGE.LOGO.alt} width={16} height={16} />
              {ICONS.globe}
            </button>

            {isLangOpen && (
              <div className="md:hidden absolute right-0 mt-2 w-32 bg-black/95 border border-white rounded-lg overflow-hidden z-50">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageSelect(lang)}
                    className={`
                      w-full px-4 py-2 text-left text-white 
                      hover:bg-white transition-colors
                      ${selectedLanguage.code === lang.code ? 'bg-white' : ''}
                    `}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}

            {/* Desktop Language Selector */}
            <div className="hidden md:block">
              <button
                onClick={() => setIsLangOpen((p) => !p)}
                className="
                  flex items-center gap-2
                  text-white text-sm
                  bg-transparent
                  border border-white/30
                  rounded-md
                  px-3 py-1.5
                  cursor-pointer
                  hover:bg-white/5
                  transition-all
                  min-w-25
                "
              >
                <Image
                  src={HEADER_IMAGE.LOGO.src}
                  alt={HEADER_IMAGE.LOGO.alt}
                  width={16}
                  height={16}
                  className="shrink-0"
                />
                <span className="flex-1 text-left">{selectedLanguage.label}</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Desktop Dropdown Menu */}
              {isLangOpen && (
                <div
                  className="
                    absolute top-full right-0 mt-2
                    min-w-25 w-full
                    bg-[#1a1a1a]
                    border border-white/10
                    rounded-md
                    shadow-2xl
                    overflow-hidden
                    z-50
                    animate-fadeIn
                  "
                >
                  <div className="py-1">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageSelect(lang)}
                        className={`
                          w-full text-left px-4 py-2.5
                          text-sm text-white
                          hover:bg-white/10
                          transition-colors
                          flex items-center gap-2
                          ${selectedLanguage.code === lang.code ? 'bg-white/5' : ''}
                        `}
                      >
                        {lang.label}
                        {selectedLanguage.code === lang.code && (
                          <svg
                            className="w-4 h-4 ml-auto text-green-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}