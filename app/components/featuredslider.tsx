"use client";
import { useRef } from "react";
import MovieCard from "./moviecard";
import { ContentItem } from "../data/apiData";

interface FeaturedSliderProps {
  title: string;
  items: ContentItem[];
  showSeeAll?: boolean;
}

export default function FeaturedSlider({
  title,
  items,
  showSeeAll = false,
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
    sliderRef.current?.scrollBy({
      left: scrollByAmount(),
      behavior: "smooth",
    });
  };

  return (
    <section className="relative m-12">
      {/* Header */}
      <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-extrabold text-white flex items-center gap-3">
          <span className="h-5 w-1 bg-accent-green rounded" />
          {title}
        </h2>

        {showSeeAll && (
          <button className="text-white/80 hover:text-white">
            See All
          </button>
        )}
      </div>
      </div>

      {/* Slider wrapper */}
     <div className="relative">

        {/* Left Arrow */}
        {showArrows && (
  <button
  onClick={scrollLeft}
  className="
    hidden md:flex
    absolute top-1/2 -translate-y-1/2
    z-50
    w-16 h-16
    items-center justify-center
    text-white text-[56px]
    -left-[48px]
    rounded-full
    cursor-pointer
    transition
  "
>
  ‹
</button>

)}


        {/* Track */}
        <div
          ref={sliderRef}
          className="
            flex gap-4 md:gap-6
            overflow-x-auto
            overflow-y-visible
            scroll-smooth
            scrollbar-hide
          "
        >
          {items.map((item, index) => (
  <MovieCard
    key={item.id}
    item={item}
    isFirst={index === 0}
    isLast={index === items.length - 1}
  />
))}

        </div>

        {/* Right Arrow */}
        {showArrows && (
  <button
  onClick={scrollRight}
  className="
    hidden md:flex
    absolute top-1/2 -translate-y-1/2
    z-50
    w-16 h-16
    -right-[48px]
    items-center justify-center
    text-white text-[56px]
    rounded-full
    cursor-pointer
    transition
  "
>
  ›
</button>


)}

      </div>
    </section>
  );
}
