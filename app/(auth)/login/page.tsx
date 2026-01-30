import Image from "next/image";
import { LOGIN_IMAGES } from "@/app/assets/login.images";
import { COMMON } from "@/app/common/logo";
import LoginForm from "@/app/features/login/LoginForm";
import { AUTH_TEXT } from "@/app/constants/label";

export default function LoginPage() {
  return (
    <>
      {/* LEFT SECTION */}
      <div className="w-1/2 flex flex-col relative bg-black">
        {/* TOP BAR */}
        <div className="flex items-center justify-between left-5 top-5">
          <Image
            src={COMMON.LOGO.src}
            alt={COMMON.LOGO.alt}
            width={64}
            height={64}
          />
        </div>
        <div className="p-36 space-y-5">
          <h1 className="text-white font-semibold  text-4xl font-poppins">
            {AUTH_TEXT.login.title}
          </h1>
          {/* FORM AREA */}
          <div className="flex-1 flex items-center">
            <LoginForm />
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="w-1/2 relative">
        {/* TOP RIGHT LANGUAGE BUTTON */}
        <select className="absolute top-2 right-6 z-5 flex items-center text-white text-sm bg-black/50 px-4 py-2 border border-white">
          <option value="">🌐 English</option>
        </select>

        {/* BACKGROUND IMAGE */}
        <Image
          src={LOGIN_IMAGES.LOGIN_BG.src}
          alt={LOGIN_IMAGES.LOGIN_BG.alt}
          fill
          className="object-cover"
          priority
        />
      </div>
    </>
  );
}
