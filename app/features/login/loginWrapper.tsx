"use client";

import Image from "next/image";
import { LOGIN_IMAGES } from "@/app/assets/login.images";
import LoginForm from "@/app/features/login/LoginForm";
import { AUTH_TEXT } from "@/app/constants/label";

export default function LoginWrapper() {
  return (
    <div className="relative w-full min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 flex flex-col bg-background px-4 sm:px-6 md:px-10 pt-24 md:pt-0 pb-8">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md md:max-w-xl space-y-6 md:space-y-5">
            <h1 className="font-semibold font-heading text-3xl md:text-hero leading-tight">
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
