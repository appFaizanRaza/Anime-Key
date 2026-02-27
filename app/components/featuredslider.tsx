"use client";
import { useRef } from "react";
import MovieCard from "./moviecard";
import { FeaturedSliderProps } from "../types/components/featuredslider";
import { AUTH_TEXT } from "../constants/label";
import Image from "next/image";
import { HOMEPAGE } from "../assets/homepage";
import { Button } from "./button";

export default function FeaturedSlider({
  title,
  items,
  showSeeAll = false,
  horizontal = false, // 👈 add this
}: FeaturedSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const showArrows =
    (title === "Featured" || title === "Children") && items.length > 7;

  const scrollByAmount = () => (window.innerWidth < 768 ? 260 : 800);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({
      left: -scrollByAmount(),
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: scrollByAmount(), behavior: "smooth" });
  };

  return (
    <section className="relative px-4 md:px-8 lg:px-12 my-8 w-full">
      <div className="relative z-20 flex items-center justify-between mb-6">
        <h2 className="text-[25px] font-extrabold text-white flex items-center gap-3">
          <span className="h-5 w-1 bg-accent-green rounded" />
          {title}
        </h2>

        {showSeeAll && (
          <p
            className="
    text-white text-[15px]
    underline
    cursor-pointer
    font-bold
    transition-all duration-200 ease-out
    hover:text-text-green
    hover:scale-110
   "
          >
            {AUTH_TEXT.homepage.seeall}
          </p>
        )}
      </div>

      {/* Slider wrapper */}
      <div className="relative">
        {/* Left Arrow */}
        {showArrows && (
          <Button
            variant="ghost"
            size="none"
            onClick={scrollLeft}
            className="
    hidden md:flex
    absolute top-1/2 -translate-y-1/2
    left-2 md:left-[-30px]
    cursor-pointer
  "
          >
            <Image
              src={HOMEPAGE.leftarrow.src}
              alt={HOMEPAGE.leftarrow.alt}
              width={24}
              height={24} /* Ensure the arrow is visible */
            />
          </Button>
        )}

        <div
          ref={sliderRef}
          onWheel={(e) => {
            if (window.innerWidth >= 768) e.preventDefault();
          }}
          className="
    flex
    gap-3 sm:gap-4 md:gap-5 lg:gap-6
    overflow-x-auto md:overflow-x-hidden
    scroll-smooth scrollbar-hide
    px-2 md:px-4
    py-16 -my-16
  "
        >
          {items.map((item, index) => (
            <MovieCard
              key={item.id}
              item={item}
              horizontal={horizontal} // 👈 pass this down
            />
          ))}
        </div>

        {/* Right Arrow */}
        {showArrows && (
          <Button
            variant="ghost"
            size="none"
            onClick={scrollRight}
            className="
    !hidden md:!flex
    absolute top-1/2 -translate-y-1/2
    right-2 right-[-30px]
    cursor-pointer
  "
          >
            <Image
              src={HOMEPAGE.rightarrow.src}
              alt={HOMEPAGE.rightarrow.alt}
              width={24}
              height={24}
            />
          </Button>
        )}
      </div>
    </section>
  );
}
