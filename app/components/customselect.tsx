"use client";

import { useState, useRef, useEffect } from "react";

type Option = {
  label: string;
  value: string;
};

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
      {" "}
      {/* Parent remains relative */}
      {/* Trigger */}
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

        {/* Arrow - Rotates when open */}
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M1 1L6 6L11 1" stroke="#000" strokeWidth="1.5" />
        </svg>
      </div>
      {/* Dropdown - CHANGED TO ABSOLUTE */}
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
