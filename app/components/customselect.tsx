"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Option } from "../types/components/customselect";
import { HEADER_IMAGE } from "../assets/header.images";

export default function CustomSelect({
  placeholder,
  options,
  value,
  onChange,
}: {
  placeholder: string;
  options: Option[];
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative w-full">
      <div
        onClick={() => setOpen(!open)}
        className="
          h-12
          px-4
          flex
          items-center
          justify-between
          rounded-[8.65px]
          bg-white
          border
          border-[#D9D9D9]
          cursor-pointer
          transition-all
        "
      >
        <span className="text-black text-md">
          {selected ? selected.label : placeholder}
        </span>
        <div
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <Image
            src={HEADER_IMAGE.ICONS.blackdropdown.src}
            alt={HEADER_IMAGE.ICONS.blackdropdown.alt}
            width={18}
            height={18}
          />
        </div>
      </div>
      {open && (
        <div
          className="
            absolute
            top-full
            left-0
            mt-1
            w-full
            max-h-60
            overflow-y-auto
            rounded-[8.65px]
            bg-[#E5E5E5]
            shadow-2xl
            z-100
            /* Custom Scrollbar */
            scrollbar-thin 
            scrollbar-thumb-primary 
            scrollbar-track-transparent
          "
        >
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className="
                px-4
                py-3
                text-md
                text-black
                hover:bg-primary
                hover:text-black
                cursor-pointer
                text-center
                border-b border-gray-300 last:border-0
              "
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
