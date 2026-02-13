"use client"; 
import Image from "next/image"; 
import { ContentItem, getImage, FALLBACK_IMG } from "../data/apiData"; 
interface MovieCardProps {
  item: ContentItem;
  isFirst?: boolean;
  isLast?: boolean;
}



export default function MovieCard({ item, isFirst, isLast }: MovieCardProps) {
  const verticalPoster =
    getImage(item.thumbnails, "VERTICAL") || FALLBACK_IMG;

  const horizontalPoster =
    getImage(item.thumbnails, "HORIZONTAL") ||
    getImage(item.thumbnails, "VERTICAL") ||
    FALLBACK_IMG;

  return (
    /* slick-slide */
    <div className="relative shrink-0 w-[230px]">
      {/* Card container */}
      <div className="relative group overflow-visible">
        {/* Base vertical poster */}
        <div className="relative w-full h-[380px] rounded-xl overflow-hidden">
          <Image
            src={verticalPoster}
            alt={item.title}
            fill
            className="object-cover object-top"
          />

          {item.isPremium && (
            <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded z-10">
              <Image src="/Vector.png" alt="Premium" width={16} height={16} />
            </div>
          )}
        </div>

        {/* Hover overlay card */}
        <div
  className={`
    hidden md:block
    absolute top-0
    z-50
    w-[420px]
    rounded-2xl
    bg-zinc-900
    border border-zinc-700
    shadow-2xl
    opacity-0 scale-95
    pointer-events-none
    transition-all duration-500 ease-in-out
    group-hover:opacity-100
    group-hover:scale-100
    group-hover:pointer-events-auto
    group-hover:delay-700
    ${isFirst ? "left-0" : isLast ? "right-0" : "left-1/2 -translate-x-1/2"}
  `}
>


          {/* Hover horizontal image */}
          <div className="relative h-56 overflow-hidden rounded-t-2xl">
            <Image
              src={horizontalPoster}
              alt={item.title}
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-linear-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
          </div>

          {/* Hover content */}
          <div className="p-6 space-y-3 text-white">
            <div className="flex gap-2">
              <button className="flex-1 bg-[#9EFF00] text-black py-2.5 rounded-lg font-semibold">
                ▶ Watch Now
              </button>
              <button className="w-10 h-10 bg-zinc-800 rounded-lg text-xl flex items-center justify-center">
                +
              </button>
            </div>

            <p className="text-xs text-white/90 font-medium">
              {item.genres?.slice(0, 2).map(g => g.name).join(" • ")}
              {item.discretion && ` • ${item.discretion}`}
            </p>

            <p className="text-sm text-gray-300 leading-relaxed line-clamp-3">
              {item.description}
              <span className="ml-1 text-[#9EFF00] cursor-pointer hover:underline">
                Read More
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Title */}
     <p className="m-0 flex justify-center font-inter text-[18px] font-bold leading-[1.43] text-white">
  {item.title}
</p>

    </div>
  );
}
