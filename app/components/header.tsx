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
    transition-all duration-300 px-6
    ${isScrolled
      ? "bg-accent-green/20 shadow-lg"
      : "bg-gradient-to-b from-black/70 via-black/40 to-transparent"}
  `}
>
  <div className="flex items-center justify-between h-full">

    {/* LEFT SIDE */}
    <div className="flex items-center">

      {/* Mobile Menu Button */}
      <button
        className="md:hidden"
        onClick={() => setIsMenuOpen((prev) => !prev)}
        aria-label="Open-menu"
      >
        {ICONS.menu}
      </button>

      {/* Logo */}
      <Link href="/" className="flex shrink-0">
        <Image
          src={COMMON.LOGO.src}
          alt={COMMON.LOGO.alt}
          width={60}
          height={60}
          className="w-8 h-8 md:w-14 md:h-14"
        />
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-4 ml-8">
        {NAV_LINKS.map(({ label, href }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={`
                font-nav text-base md:text-lg transition-colors duration-150
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

    {/* RIGHT SIDE */}
    <div className="flex items-center gap-2 ml-8">

      <Link
        href="/register"
        className="font-black text-sm md:text-base lg:text-lg text-text-green whitespace-nowrap"
      >
        Register
      </Link>

      <span className="text-text-primary">|</span>

      <Link
        href="/login"
        className="font-black text-sm md:text-base lg:text-lg text-text-green whitespace-nowrap"
      >
        Login
      </Link>
      
      <div className="flex ml-6 gap-2">
        {/* Search */}
      <button aria-label="Search" className="rounded-full">
        <SearchIcon className="w-6 h-6 text-white" />
      </button>

      {/* Language Selector */}
      <div className="relative" ref={langDropdownRef}>

  {/* Trigger Button */}
  <button
    onClick={() => setIsLangOpen((p) => !p)}
    className="
  flex items-center gap-1 md:gap-2
  text-white text-xs md:text-sm
  border border-white/30
  rounded-md
  px-2 md:px-3
  py-1
  hover:bg-white/5
  transition-all
"

    aria-label="Select language"
  >
    <Image
      src={HEADER_IMAGE.LOGO.src}
      alt={HEADER_IMAGE.LOGO.alt}
      width={16}
      height={16}
      className="shrink-0"
    />

    <span className="hidden md:block">
      {selectedLanguage.label}
    </span>

    <svg
      className={`w-4 h-4 transition-transform duration-200 ${
        isLangOpen ? "rotate-180" : ""
      }`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </button>
  </div>
      

  {/* Dropdown */}
  <div
    className={`
      absolute right-0 mt-2 w-36
      bg-[#1a1a1a]
      border border-white/10
      rounded-md
      shadow-2xl
      overflow-hidden
      z-50
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
            w-full text-left px-4 py-2.5
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
            <svg
              className="w-4 h-4 ml-auto text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </button>
      ))}
    </div>
  </div>

</div>

    </div>

  </div>
</header>

  );
}