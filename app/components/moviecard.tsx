"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import HoverPopup from "./HoverPopUp";
import { getImage, FALLBACK_IMG } from "../data/apiData";
import { MovieCardProps } from "../types/components/moviecard";

export default function MovieCard({
  item,
  horizontal = false,
}: MovieCardProps) {
  const [rect, setRect] = useState<DOMRect | null>(null);

  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const verticalPoster = getImage(item.thumbnails, "VERTICAL") || FALLBACK_IMG;

  const horizontalPoster =
    getImage(item.thumbnails, "HORIZONTAL") || verticalPoster;

  const poster = horizontal ? horizontalPoster : verticalPoster;

  const showPopup = () => {
    hoverTimeout.current = setTimeout(() => {
      if (cardRef.current) {
        setRect(cardRef.current.getBoundingClientRect());
      }
    }, 500);
  };

  const hidePopup = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }

    hoverTimeout.current = setTimeout(() => {
      setRect(null);
    }, 150);
  };

  useEffect(() => {
    const handleScroll = () => {
      setRect(null);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative flex-none ${
        horizontal
          ? "w-[160px] sm:w-[260px] md:w-[280px] lg:w-[290px]"
          : "w-[160px] sm:w-[200px] md:w-[200px] lg:w-[220px] xl:w-[224px]"
      }`}
    >
      <div onMouseEnter={showPopup} onMouseLeave={hidePopup}>
        <div
          className={`relative w-full ${
            horizontal ? "aspect-[16/10]" : "aspect-[2/3]"
          } rounded-xl overflow-hidden cursor-pointer`}
        >
          <Image
            src={verticalPoster}
            alt={item.title}
            fill
            className="object-cover"
          />
        </div>
      </div>

      <p className="mt-3 text-center text-lg font-bold text-white truncate px-1">
        {item.title}
      </p>

      <HoverPopup
        rect={rect}
        item={item}
        horizontalPoster={horizontal ? horizontalPoster : horizontalPoster}
        onMouseEnter={() => {
          if (hoverTimeout.current) {
            clearTimeout(hoverTimeout.current);
            hoverTimeout.current = null;
          }
        }}
        onMouseLeave={hidePopup}
      />
    </div>
  );
}
