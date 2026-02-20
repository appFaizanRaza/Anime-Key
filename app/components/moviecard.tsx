"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { ContentItem, getImage, FALLBACK_IMG } from "../data/apiData";
import ReadMore from "./readmore";
import { MovieCardProps } from "../types/components/moviecard";

export default function MovieCard({ item, isFirst, isLast }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  const verticalPoster = getImage(item.thumbnails, "VERTICAL") || FALLBACK_IMG;
  const horizontalPoster =
    getImage(item.thumbnails, "HORIZONTAL") || verticalPoster;

  const handleMouseEnter = () => {
    hoverTimeout.current = setTimeout(() => {
      setIsHovered(true);
    }, 1000);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setIsHovered(false);
  };

  return (
    <div className="relative shrink-0 w-[207px] overflow-visible">
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={`relative w-full aspect-2/3 rounded-xl overflow-hidden transition-all duration-500 cursor-pointer ${
            isHovered ? "scale-95 opacity-0" : "scale-100 opacity-100"
          }`}
        >
          <Image
            src={verticalPoster}
            alt={item.title}
            fill
            className="object-cover object-top transition-transform duration-700"
          />
        </div>

        <div
          className={`
            hidden md:block
            absolute top-[179] z-50 w-[380px] rounded-2xl overflow-hidden
            bg-zinc-900
            border border-zinc-700
            shadow-2xl
            transition-all duration-300 ease-out
            ${
              isHovered
                ? "opacity-100 -translate-y-[55%]"
                : "opacity-0 -translate-y-[45%] pointer-events-none"
            }
            ${
              isFirst
                ? "left-0"
                : isLast
                  ? "right-0"
                  : "left-1/2 -translate-x-1/2"
            }
          `}
        >
          <div className="relative h-48 rounded-2xl overflow-hidden">
            <Image
              src={horizontalPoster}
              alt={item.title}
              fill
              className="object-cover object-center transition-transform duration-700"
            />
          </div>

          <div className="px-4 mt-6 space-y-3 text-white">
            <div
              className={`flex gap-2 transition-all duration-500${
                isHovered
                  ? "opacity-100 translate-y-0 delay-150"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <button
                className="flex items-center justify-center gap-2 flex-1 bg-text-green text-white py-2.5 rounded-lg font-semibold transition text-sm cursor-pointer 
  hover:shadow-[0_10px_25px_rgba(102,255,0,0.35)]"
              >
                {/* Play Icon SVG (same as MUI) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch Now
              </button>
              <button
                aria-label="Add to Playlist"
                className="w-10 h-10 bg-text-green/20 rounded-lg flex items-center justify-center hover:bg-black/30 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-8 h-8 text-white"
                >
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z" />
                </svg>
              </button>
            </div>
            <p className="text-md text-white font-bold tracking-wide">
              {item.genres
                ?.slice(0, 2)
                .map((g) => g.name)
                .join(" • ")}
              {item.discretion && ` • ${item.discretion}`}
            </p>
            <ReadMore
              text={item.description}
              href={`/movies/${item.id}`}
              textClassName="text-[17px] text-[#979797] leading-normal font-light"
              linkClassName="text-[#66FF00] text-[15px]"
            />
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-lg font-bold text-white truncate px-1">
        {item.title}
      </p>
    </div>
  );
}
