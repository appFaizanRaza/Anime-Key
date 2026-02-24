"use client";
import { createPortal } from "react-dom";
import Image from "next/image";
import ReadMore from "./readmore";
import { HoverPopupProps } from "../types/components/hoverPopUp";
import { HOVER_POPUP_IMAGES } from "../assets/hoverPopUp.images";
import { AUTH_TEXT } from "../constants/label";
import { Button } from "./button";

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
            <Button variant="primary" size="md" className="flex-1 py-2.5">
              <Image
                src={HOVER_POPUP_IMAGES.PLAY.src}
                alt={HOVER_POPUP_IMAGES.PLAY.alt}
                width={20}
                height={20}
              />
              {AUTH_TEXT.hoverpopup.watchNow}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Add to Watchlist"
              className="w-11 h-11 rounded-lg bg-text-green/20 hover:bg-black/20"
            >
              <Image
                src={HOVER_POPUP_IMAGES.WATCHLIST.src}
                alt={HOVER_POPUP_IMAGES.WATCHLIST.alt}
                width={24}
                height={24}
              />
            </Button>
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
