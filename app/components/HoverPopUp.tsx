"use client";
import { createPortal } from "react-dom";
import Image from "next/image";
import ReadMore from "./readmore";
import { ContentItem } from "../data/apiData";

interface HoverPopupProps {
  rect: DOMRect | null;
  item: ContentItem;
  horizontalPoster: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function HoverPopup({
  rect,
  item,
  horizontalPoster,
  onMouseEnter,
  onMouseLeave,
}: HoverPopupProps) {
  if (!rect) return null;

  const popupWidth = 380;

  let left = rect.left + rect.width / 2 - popupWidth / 2;

  if (left < 8) left = 8;
  if (left + popupWidth > window.innerWidth - 8)
    left = window.innerWidth - popupWidth - 8;

  const top = rect.top + rect.height / 2 - 220;

  return createPortal(
    <div
      className="hidden md:block fixed z-[9999] pointer-events-none
      transition-all duration-300 ease-in-out
      opacity-100 scale-105
      animate-popupIn"
      style={{ top, left, width: popupWidth }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className="
        rounded-2xl overflow-hidden
        bg-zinc-900 border border-zinc-700 shadow-2xl
        pointer-events-auto
      "
      >
        <div className="relative h-48">
          <Image
            src={horizontalPoster}
            alt={item.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="px-4 mt-6 space-y-4 text-white pb-4">
          <div className="flex gap-2">
            <button
              className="
    flex items-center justify-center gap-2
    flex-1
    bg-text-green text-white
    py-2.5 rounded-lg font-semibold
    transition-shadow duration-[400ms] ease-in-out
    hover:shadow-[0px_5px_15px_rgba(113,199,4,1)]
    cursor-pointer
  "
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#FFFFFF">
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch Now
            </button>

            <button
              aria-label="Add to Watchlist"
              className="
              w-11 h-11
              rounded-lg
              bg-white/10
              flex items-center justify-center
              transition
              hover:bg-white/20
              cursor-pointer
            "
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#FFFFFF">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z" />
              </svg>
            </button>
          </div>

          <p className="text-md font-bold">
            {item.genres
              ?.slice(0, 2)
              .map((g) => g.name)
              .join(" • ")}
          </p>

          <ReadMore
            text={item.description}
            href={`/movies/${item.id}`}
            textClassName="text-[#979797]"
            linkClassName="text-[#66FF00]"
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}
