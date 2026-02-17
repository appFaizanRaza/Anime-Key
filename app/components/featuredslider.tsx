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
    sliderRef.current?.scrollBy({ left: -scrollByAmount(), behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: scrollByAmount(), behavior: "smooth" });
  };

  return (
    <section className="relative mx-12 my-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-extrabold text-white flex items-center gap-3">
          <span className="h-5 w-1 bg-accent-green rounded" />
          {title}
        </h2>

        {showSeeAll && (
          <button className="text-white/80 hover:text-white text-sm">
            See All
          </button>
        )}
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
              z-50 w-16 h-16
              items-center justify-center
              text-white text-[56px]
              -left-[48px]
              rounded-full cursor-pointer transition
            "
          >
            ‹
          </button>
        )}

        {/*
          overflow-x-auto  → enables horizontal scrolling
          overflow-y-visible → lets hover cards escape vertically without clipping
          scrollbar-hide   → hides the scrollbar track
          py-16 -my-16     → creates a vertical "escape hatch" tall enough for the
                             hover card (which pops up ~55% above the card centre)
                             without shifting surrounding layout
        */}
        <div
          ref={sliderRef}
          className="
            flex gap-6
            overflow-x-auto overflow-y-visible
            scroll-smooth scrollbar-hide
            px-1 py-16 -my-16
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
              z-50 w-16 h-16
              -right-[48px]
              items-center justify-center
              text-white text-[56px]
              rounded-full cursor-pointer transition
            "
          >
            ›
          </button>
        )}
      </div>
    </section>
  );
}