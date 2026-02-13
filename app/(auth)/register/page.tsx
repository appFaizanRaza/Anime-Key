"use client";

import Image from "next/image";
import { COMMON } from "@/app/common/logo";
import RegisterForm from "@/app/features/register/RegisterForm";
import { REGISTER_IMAGES } from "@/app/constants/register.images";
import { AUTH_TEXT } from "@/app/constants/label";
import { LANGUAGES } from "@/app/constants/languages";
import { useState, useEffect, useRef } from "react";

export default function RegisterPage() {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);
  const langDropdownRef = useRef<HTMLDivElement>(null);

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
    <div className="relative w-full min-h-screen flex">
      {/* HEADER */}
      <header className="absolute top-0 left-0 z-20 w-full h-16 flex items-center justify-between px-6">
        <Image
          src={COMMON.LOGO.src}
          alt={COMMON.LOGO.alt}
          width={64}
          height={64}
        />

        {/* Language Selector */}
        <div className="relative" ref={langDropdownRef}>
          <button
            onClick={() => setIsLangOpen((p) => !p)}
            className="
              flex items-center gap-2
              text-white text-sm
              bg-transparent
              border border-white/30
              rounded-md
              px-3 py-2
              cursor-pointer
              hover:bg-white/5
              transition-all
              min-w-30
            "
          >
            <Image 
              src="/globe.svg" 
              alt="language" 
              width={20} 
              height={20}
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

          {/* Dropdown Menu */}
          {isLangOpen && (
            <div
              className="
                absolute top-full right-0 mt-2
                min-w-30 w-full
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
      </header>

      {/* LEFT IMAGE SECTION (desktop only) */}
      <div className="hidden md:block w-1/2 relative">
        <Image
          src={REGISTER_IMAGES.LEFT.src}
          alt={REGISTER_IMAGES.LEFT.alt}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* RIGHT FORM SECTION */}
      <div className="w-full md:w-1/2 flex mt-24 justify-center bg-black text-white">
        <div className="w-full max-w-3xl">
          <h1 className="text-[34px] mb-6 font-semibold">
            {AUTH_TEXT.register.title}
          </h1>

          <RegisterForm />
        </div>
      </div>
    </div>
  );
}