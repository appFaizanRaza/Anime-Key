import Image from "next/image";
import { COMMON } from "@/app/common/logo";
import RegisterForm from "@/app/features/register/RegisterForm";
import { REGISTER_IMAGES } from "@/app/constants/register.images";
import { AUTH_TEXT } from "@/app/constants/label";

export default function RegisterPage() {
  return (
    <div className="relative w-full min-h-screen flex">
      {/* HEADER */}
      <header className="absolute top-0 left-0 z-20 w-full flex items-center justify-between px-6 py-5">
        <Image
          src={COMMON.LOGO.src}
          alt={COMMON.LOGO.alt}
          width={64}
          height={64}
        />

        <select className="text-white text-sm bg-black/50 px-4 py-2 border border-white">
          <option value="">🌐 English</option>
        </select>
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
      <div className="w-full md:w-1/2 flex items-center justify-center md:px-24 bg-black text-white">
        <div className="w-full space-y-5">
          <h1 className="text-4xl font-semibold">{AUTH_TEXT.register.title}</h1>

          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
