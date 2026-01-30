import { COMMON } from "@/app/common/logo";
import RegisterForm from "../../features/register/RegisterForm";
import Image from "next/image";
import { REGISTER_IMAGES } from "@/app/constants/register.images";
import { AUTH_TEXT } from "@/app/constants/label";

export default function RegisterPage() {
  return (
    <>
      <div className="w-1/2 flex flex-col relative bg-black">
        <div className="flex items-center justify-between z-10">
          <Image
            src={COMMON.LOGO.src}
            alt={COMMON.LOGO.alt}
            width={64}
            height={64}
            className="object-contain"
          />
        </div>
        <div>
          <Image
            src={REGISTER_IMAGES.LEFT.src}
            alt={REGISTER_IMAGES.LEFT.alt}
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className="w-1/2 relative bg-black text-white p-24 space-y-5">
        <select className="absolute top-2 right-6 z-5 flex items-center text-white text-sm bg-black/50 px-4 py-2 border border-white">
          <option value="">🌐 English</option>
        </select>
        <h1 className="text-4xl font-semibold">{AUTH_TEXT.register.title}</h1>
        <RegisterForm />
      </div>
    </>
  );
}
