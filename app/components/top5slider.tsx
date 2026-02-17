"use client";

import Image from "next/image";
import { ContentItem, getImage, FALLBACK_IMG } from "../data/apiData";

interface TopFiveSliderProps {
  title: string;
  items: ContentItem[];
}

export default function TopFiveSlider({ title, items }: TopFiveSliderProps) {
  return (
    <>
      <section className="mt-12 px-4 sm:px-6 md:px-10 overflow-hidden">
        {/* Title */}
        <h2 className="text-2xl font-extrabold text-white flex items-center gap-3">
          <span className="h-5 w-1 bg-accent-green rounded" />
          {title}
        </h2>

        {/* Static Top Five Row */}
        <div className="flex gap-10 overflow-x-auto md:overflow-visible">
          {items.slice(0, 5).map((item, index) => {
            const poster =
              getImage(item.thumbnails, "VERTICAL") ||
              getImage(item.thumbnails, "HORIZONTAL") ||
              FALLBACK_IMG

            return (
              <div key={item.id} className="relative mt-8 flex shrink-0">
                <span className="text-[96px] sm:text-[120px] md:text-[160px] font-extrabold text-white leading-none drop-shadow-[0_0_10px_rgba(120,255,0,0.8)]">
                  {index + 1}
                </span>

                <div className="relative w-30 h-45 sm:w-40 sm:h-60 md:w-50 md:h-80 rounded-xl overflow-hidden">
                  <Image
                    src={poster}
                    alt={item.title}
                    fill
                    className="object-cover object-top"
                  />
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
