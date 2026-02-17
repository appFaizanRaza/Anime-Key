"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { ContentItem, getImage, FALLBACK_IMG } from "../data/apiData";
import Link from "next/link";

interface MovieCardProps {
  item: ContentItem;
  isFirst?: boolean;
  isLast?: boolean;
}

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
          className={`relative w-full aspect-2/3 rounded-xl overflow-hidden transition-all duration-500 ${
            isHovered ? "scale-95 opacity-0" : "scale-100 opacity-100"
          }`}
        >
          <Image
            src={verticalPoster}
            alt={item.title}
            fill
            className="object-cover object-top transition-transform duration-700 hover:scale-110"
          />
        </div>

        <div
          className={`
            hidden md:block
            absolute top-1/2 z-50 w-[380px]
            rounded-2xl bg-zinc-900
            border border-zinc-700
            shadow-2xl
            transition-all duration-300 ease-out
            ${
              isHovered
                ? "opacity-100 scale-100 -translate-y-[55%]"
                : "opacity-0 scale-95 -translate-y-[45%] pointer-events-none"
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
         
          <div className="relative h-46 rounded-2xl overflow-hidden">
            <Image
              src={horizontalPoster}
              alt={item.title}
              fill
              className={`object-cover object-center transition-transform duration-700 ${
                isHovered ? "scale-110" : "scale-100"
              }`}
            />
          
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-transparent to-transparent" />
          </div>

          <div className="p-5 space-y-3 text-white">
            <div
              className={`flex gap-2 transition-all duration-500 ${
                isHovered
                  ? "opacity-100 translate-y-0 delay-150"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <button className="flex-1 bg-[#9EFF00] text-black py-2.5 rounded-lg font-semibold hover:scale-105 transition text-sm">
                ▶ Watch Now
              </button>
              <button className="w-10 h-10 bg-zinc-800 rounded-lg text-xl flex items-center justify-center hover:bg-zinc-700 transition">
                +
              </button>
            </div>
            <p className="text-xs text-white/70 font-medium tracking-wide">
              {item.genres?.slice(0, 2).map((g) => g.name).join(" • ")}
              {item.discretion && ` • ${item.discretion}`}
            </p>
            <p className="text-sm text-gray-300 leading-relaxed line-clamp-4">
              {item.description}
              <Link
              href="/read"
              className="ml-1 text-[#9EFF00] cursor-pointer">
                Read More
              </Link>
            </p>
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-[17px] font-bold text-white truncate px-1">
        {item.title}
      </p>
    </div>
  );
}