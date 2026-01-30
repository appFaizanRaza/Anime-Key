import { useState, useRef, useEffect } from "react";
import { COUNTRY_CODES } from "@/app/constants/countrycode";

export default function CountryCodeDropdown({
  value,
  onChange,
}: {
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

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="
          bg-transparent
          text-black
          text-md
          border-b-2
          border-lime-500
          pr-5
          cursor-pointer
          outline-none
        "
      >
        {value}
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute
            top-full
            left-0
            mt-2
            w-24
            max-h-60
            overflow-y-auto
            rounded-md
            bg-[#2b2b2b]
            shadow-lg
            z-50
            custom-scroll
          "
        >
          {COUNTRY_CODES.map((item) => (
            <div
              key={item.code}
              onClick={() => {
                onChange(item.code);
                setOpen(false);
              }}
              className="
                px-4
                py-2
                text-sm
                text-gray-400
                hover:bg-[#3a3a3a]
                cursor-pointer
              "
            >
              {item.code}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
