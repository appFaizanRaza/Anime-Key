"use client";

import { useState, useEffect } from "react";

interface MovieDescriptionProps {
  text: string;
  clampLines?: number;
}

export default function MovieDescription({
  text,
  clampLines = 3,
}: MovieDescriptionProps) {
  const [open, setOpen] = useState(false);

  // 🔒 Lock background scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Short description */}
      <p
        className={`
          text-desc-color text-sm leading-relaxed
          ${!open ? `line-clamp-${clampLines}` : ""}
        `}
      >
        {text}
      </p>

      {/* See more */}
      <button
        onClick={() => setOpen(true)}
        className="mt-2 text-accent-green text-sm font-semibold hover:underline"
      >
        See more
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setOpen(false)}
          />

          {/* Modal content */}
          <div className="relative z-10 max-w-2xl w-full mx-6 rounded-xl bg-surface-dark p-6">
            <h3 className="text-lg font-semibold mb-4 text-white">
              About this movie
            </h3>

            <p className="text-desc-color text-sm leading-relaxed whitespace-pre-line">
              {text}
            </p>

            <button
              onClick={() => setOpen(false)}
              className="mt-6 px-4 py-2 rounded-md bg-accent-green text-black font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
