"use client";

import { useState, useRef, useEffect } from "react";
import { UserMenuProps } from "@/app/types/components/usermenu";
import { AUTH_TEXT } from "../constants/label";
import { Button } from "./button";

export default function UserMenu({
  name = "User",
  avatarUrl,
  onLogout,
}: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

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
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(!open)}
        className="
    border-text-green
    rounded-2xl
    px-2
    hover:bg-text-green/30
  "
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
        <span className="text-white text-sm">▾</span>
      </Button>
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
          <Button variant="menu" size="sm">
            {AUTH_TEXT.usermenu.profile}
          </Button>

          <Button variant="menu" size="sm">
            {AUTH_TEXT.usermenu.watchlist}
          </Button>

          <Button variant="menu" size="sm">
            {AUTH_TEXT.usermenu.settings}
          </Button>

          <hr className="my-2 border-zinc-700" />

          <Button variant="danger" size="sm" onClick={onLogout}>
            {AUTH_TEXT.usermenu.logout}
          </Button>
        </div>
      )}
    </div>
  );
}
