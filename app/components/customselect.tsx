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

  // close on outside click
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
    <div ref={ref} className="relative sm:w-54">
      {/* Trigger */}
      <div
        onClick={() => setOpen(!open)}
        className="
          h-12
          p-8
          
          text-center
          flex
          items-center
          justify-between
          rounded-[8.65px]
          bg-white
          border
          border-[#D9D9D9]
          cursor-pointer
        "
      >
        <span className="text-black text-md">
          {selected ? selected.label : placeholder}
        </span>

        {/* Arrow */}
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 1L6 6L11 1" stroke="#000" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Dropdown */}
      {open && (
        <div
          className="
            text-center
            absolute
            mt-2
            w-full
            max-h-56
            overflow-y-auto
            rounded-[8.65px]
            bg-[#E5E5E5]
            shadow-lg
            z-50
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
                px-3
                py-2
                text-md
                text-black
                hover:bg-[#D1D1D1]
                cursor-pointer
                text-center
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
