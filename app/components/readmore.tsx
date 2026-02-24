"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ReadMoreProps } from "../types/components/readmore";
import { AUTH_TEXT } from "../constants/label";

export default function ReadMore({
  text,
  onOpen,
  href,
  textClassName = "",
  linkClassName = "",
  lines = 4,
}: ReadMoreProps) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  // Tailwind-safe clamp classes
  const clampClass =
    lines === 1
      ? "line-clamp-1"
      : lines === 2
        ? "line-clamp-2"
        : lines === 3
          ? "line-clamp-3"
          : "line-clamp-4";

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const checkOverflow = () => {
      setIsOverflowing(el.scrollHeight > el.clientHeight);
    };

    requestAnimationFrame(checkOverflow);

    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [text, lines]);

  return (
    <div>
      <p ref={textRef} className={`${clampClass} ${textClassName}`}>
        {text}
      </p>

      {isOverflowing && (
        <>
          {href ? (
            <Link href={href} className={linkClassName}>
             {AUTH_TEXT.readmore.readMore}
            </Link>
          ) : (
            <span onClick={onOpen} className={linkClassName}>
              {AUTH_TEXT.readmore.readMore}
            </span>
          )}
        </>
      )}
    </div>
  );
}
