"use client";
import Image from "next/image";
import { GOBLIN_IMAGES } from "../assets/goblin.image";

export default function Goblin() {
  return (
    <section className="hidden md:block relative w-full h-[75vh] lg:h-screen mt-16 overflow-hidden">
      {/* Background Image */}
      <Image
        src={GOBLIN_IMAGES.BACKGROUND.src}
        alt={GOBLIN_IMAGES.BACKGROUND.alt}
        fill
        priority
        className="object-cover object-center"
      />

      {/* Title Image */}
      <div className="absolute inset-0 flex items-center justify-end pr-6">
        <div className="flex justify-end w-full pr-6">
          <Image
            src={GOBLIN_IMAGES.TEXT.src}
            alt={GOBLIN_IMAGES.TEXT.alt}
            width={600}
            height={200}
            className="w-[250px] md:w-[400px] lg:w-[500px] object-contain object-right"
          />
        </div>
      </div>
    </section>
  );
}
