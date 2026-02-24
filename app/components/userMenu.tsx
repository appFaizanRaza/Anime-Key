"use client";

import { useState, useRef, useEffect } from "react";
import { UserMenuProps } from "@/app/types/components/usermenu"


export default function UserMenu({
  name = "User",
  avatarUrl,
  onLogout,
}: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const initial = name.charAt(0).toUpperCase();

  return (
    <div ref={menuRef} className="relative mr-8">
      {/* Avatar Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 border border-text-green rounded-2xl px-2 cursor-pointer transition-all duration-200 hover:bg-text-green/30"
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="User avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-text-green flex items-center justify-center text-black font-bold">
            {initial}
          </div>
        )}

        {/* Caret */}
        <span className="text-white text-sm">▾</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute right-0 mt-3 w-48
            bg-zinc-900 border border-zinc-700
            rounded-xl shadow-xl
            py-2
            z-50
          "
        >
          <button className="w-full text-left px-4 py-2 hover:bg-zinc-800 text-white">
            Profile
          </button>

          <button className="w-full text-left px-4 py-2 hover:bg-zinc-800 text-white">
            Watchlist
          </button>

          <button className="w-full text-left px-4 py-2 hover:bg-zinc-800 text-white">
            Settings
          </button>

          <hr className="my-2 border-zinc-700" />

          <button
            onClick={onLogout}
            className="w-full text-left px-4 py-2 hover:bg-zinc-800 text-red-400"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
