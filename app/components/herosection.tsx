"use client";

import Image from "next/image";
import { ContentItem, getImage } from "../data/apiData";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface HeroSectionProps {
  items: ContentItem[];
}

export default function HeroSection({ items }: HeroSectionProps) {
  return (
    <section className="relative w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        loop
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        className="text-theme"
      >
        {items.map((hero) => {
          const bgUrl =
            getImage(hero.banners, "HORIZONTAL") ||
            getImage(hero.thumbnails, "HORIZONTAL") ||
            "";

          const titleImageUrl =
            hero.titleImages?.find((img) => img.type === "HORIZONTAL")?.path ||
            "";

          return (
            <SwiperSlide key={hero.id}>
              {/* HERO WRAPPER */}
              <div className="relative h-[65vh] md:h-screen w-full overflow-hidden">
                {/* ================= BACKGROUND IMAGE ================= */}
                <Image
                  src={bgUrl}
                  alt={hero.title}
                  fill
                  priority
                  className="object-cover object-right"
                />

                {/* ================= LEFT GRADIENT (TEXT READABILITY) ================= */}
                <div
                  className="
                    absolute inset-0
                    bg-gradient-to-r
                    from-black/95
                    via-black/70
                    to-transparent
                  "
                />

                {/* ================= BOTTOM GRADIENT (FADE OUT) ================= */}
                <div
                  className="
                    absolute bottom-0 left-0
                    w-full h-56
                    bg-gradient-to-t
                    from-black
                    via-black/70
                    to-transparent
                  "
                />

                {/* ================= CONTENT ================= */}
                <div
                  className="
                    relative z-50
                    pt-28 md:pt-72
                    px-6 md:px-12
                    max-w-xl
                    flex flex-col gap-6
                  "
                >
                  {titleImageUrl && (
                    <Image
                      src={titleImageUrl}
                      alt={hero.title}
                      width={480}
                      height={180}
                      className="w-auto max-h-[160px]"
                    />
                  )}

                  <p className="text-white text-lg md:text-xl font-bold">
                    {hero.type}
                  </p>

                  <div className="flex items-center gap-2 text-white text-lg">
                    <span>{hero.imdb}</span>
                    <Image
                      src="/star.png"
                      alt="Star"
                      width={120}
                      height={120}
                    />
                  </div>

                  <p className="text-gray-300 hidden md:block leading-relaxed">
                    {hero.description}
                  </p>

                  <p className="text-white font-extrabold text-xl hidden md:block">
                    {hero.genres.map((g) => g.name).join(" • ")} •{" "}
                    {hero.discretion}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
