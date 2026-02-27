import Image from "next/image";

import RegisterForm from "@/app/features/register/RegisterForm";
import { REGISTER_IMAGES } from "@/app/constants/register.images";
import { AUTH_TEXT } from "@/app/constants/label";
export default function RegisterWrapper() {
  return (
    <div className="relative w-full min-h-screen flex flex-col md:flex-row">
      <div className="hidden md:block w-1/2 relative">
        <Image
          src={REGISTER_IMAGES.LEFT.src}
          alt={REGISTER_IMAGES.LEFT.alt}
          fill
          className="object-cover"
          priority
        />
      </div>
      <div
        className="
    w-full md:w-1/2 flex flex-col
    justify-center
    bg-black text-white
    px-4 sm:px-6 md:px-10
    pt-24 md:pt-0
    pb-10
  "
      >
        <div className="w-full max-w-md md:max-w-3xl mx-auto">
          <h1
            className="
    text-3xl md:text-[34px]
    mb-6 md:mb-8
    font-semibold
    leading-tight
  "
          >
            {AUTH_TEXT.register.title}
          </h1>

          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
