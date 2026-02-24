"use client";

import { useState } from "react";
import Image from "next/image";
import { ContentItem, getImage } from "../data/apiData";
import { HeroSectionProps } from "../types/components/herosection";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ReadMore from "./readmore";
import { HERO_IMAGES } from "../assets/hero.image";
import { Button } from "./button";

export default function HeroSection({ items }: HeroSectionProps) {
  const [activeModal, setActiveModal] = useState<ContentItem | null>(null);

  return (
    <section className="relative w-full">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation={!activeModal}
        pagination={{ clickable: true }}
        loop
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
              <div className="relative h-[75vh] sm:h-[60vh] md:h-[85vh] lg:h-screen w-full overflow-hidden">
                <Image
                  src={bgUrl}
                  alt={hero.title}
                  fill
                  priority
                  className="object-cover object-[80%_center] md:object-right"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-56 bg-gradient-to-t from-black via-black/70 to-transparent" />

                <div className="relative z-50 pt-56 md:pt-72 px-6 md:px-12 max-w-2xl flex flex-col gap-4">
                  {titleImageUrl && (
                    <div className="relative w-[200px] sm:w-[260px] md:w-full md:max-w-[480px] aspect-[480/180]">
                      <Image
                        src={titleImageUrl}
                        alt={hero.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}

                  <p className="text-white text-lg md:text-xl font-bold">
                    {hero.type}
                  </p>

                  <div className="flex items-center gap-2 text-white text-lg">
                    <span>{hero.imdb}</span>
                    <Image
                      src={HERO_IMAGES.STAR.src}
                      alt={HERO_IMAGES.STAR.alt}
                      width={120}
                      height={120}
                    />
                  </div>

                  <div className="hidden md:block">
                    <ReadMore
                      text={hero.description}
                      onOpen={() => setActiveModal(hero)}
                      textClassName="text-xl text-white leading-relaxed"
                      linkClassName="text-[#66FF00] text-md font-bold cursor-pointer"
                    />
                  </div>

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

      {activeModal && (
        <div className="fixed inset-0 z-[99999] bg-black/60 flex items-center justify-center">
          <div className="relative w-[90%] md:w-[650px] max-h-[85vh] bg-zinc-900 rounded-2xl p-6 shadow-2xl overflow-y-auto">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setActiveModal(null)}
              aria-label="Close modal"
              className="absolute top-4 right-4 text-gray-400 text-xl"
            >
              ✕
            </Button>
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">
                {activeModal.title}
              </h2>

              <hr />

              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                {activeModal.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
