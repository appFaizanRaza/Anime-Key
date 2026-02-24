"use client";

import Image from "next/image";
import { LOGIN_IMAGES } from "@/app/assets/login.images";
import { COMMON } from "@/app/common/logo";
import LoginForm from "@/app/features/login/LoginForm";
import { AUTH_TEXT } from "@/app/constants/label";
import { LANGUAGES } from "@/app/constants/languages";
import { useState, useEffect, useRef } from "react";
import { HEADER_IMAGE } from "@/app/assets/header.images";
import { Button } from "@/app/components/button";

export default function LoginPage() {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Close language dropdown when clicking outside
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

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLangOpen]);

  const handleLanguageSelect = (lang: (typeof LANGUAGES)[0]) => {
    setSelectedLanguage(lang);
    setIsLangOpen(false);
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col md:flex-row">
      <header className="absolute z-20 w-full h-16 flex items-center justify-between px-6 sm:px-6 md:px-8 pt-safe">
        <Image
          src={COMMON.LOGO.src}
          alt={COMMON.LOGO.alt}
          width={64}
          height={64}
        />

        {/* Language Selector */}
        <div className="relative" ref={langDropdownRef}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsLangOpen((p) => !p)}
          >
            <Image
              src={HEADER_IMAGE.LOGO.src}
              alt={HEADER_IMAGE.LOGO.alt}
              width={20}
              height={20}
            />
            <span className="flex-1 text-left">{selectedLanguage.label}</span>
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

          {/* Dropdown Menu */}
          {isLangOpen && (
            <div
              className="
                absolute top-full right-0 mt-2
                min-w-[120px] w-full
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
                  <Button
                    key={lang.code}
                    variant="menu"
                    size="sm"
                    onClick={() => handleLanguageSelect(lang)}
                    className={`${selectedLanguage.code === lang.code ? "bg-white/5" : ""}`}
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
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      <div
        className="w-full md:w-1/2 flex flex-col bg-background px-4 sm:px-6 md:px-10
    pt-24 md:pt-0
    pb-8"
      >
        {/* CONTENT */}
        <div className="flex flex-1 items-center justify-center">
          <div
            className="
    w-full max-w-md md:max-w-xl
    space-y-6 md:space-y-5
  "
          >
            <h1
              className="
    font-semibold font-heading
    text-3xl md:text-hero
    leading-tight
  "
            >
              {" "}
              {AUTH_TEXT.login.title}
            </h1>

            <LoginForm />
          </div>
        </div>
      </div>

      {/* RIGHT SECTION (Hidden on mobile) */}
      <div className="hidden md:block w-1/2 relative">
        <Image
          src={LOGIN_IMAGES.LOGIN_BG.src}
          alt={LOGIN_IMAGES.LOGIN_BG.alt}
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
