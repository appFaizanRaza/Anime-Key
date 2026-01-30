import Image from "next/image";
import { LOGIN_IMAGES } from "@/app/assets/login.images";
import { COMMON } from "@/app/common/logo";
import LoginForm from "@/app/features/login/LoginForm";
import { AUTH_TEXT } from "@/app/constants/label";

export default function LoginPage() {
  return (
    <div className="relative w-full min-h-screen flex">
      <header className="absolute top-0 left-0 z-20 w-full flex items-center justify-between px-6 py-5">
        <Image
          src={COMMON.LOGO.src}
          alt={COMMON.LOGO.alt}
          width={64}
          height={64}
        />

        <select className="text-white text-sm bg-black/50 px-4 py-2 border border-white">
          <option value="">🌐 {AUTH_TEXT.login.english}</option>
        </select>
      </header>

      <div className="w-full md:w-1/2 flex flex-col bg-black">
        {/* CONTENT */}
        <div className="flex flex-1 items-center justify-center">
          <div className="pl-40 w-full space-y-5">
            <h1 className="font-semibold text-white text-3xl">
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
