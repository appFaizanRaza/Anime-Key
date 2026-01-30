import React from "react";
import { cn } from "@/app/lib/utils";

type InputProps = {
  label?: string;
  error?: string;
  leftAddon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      className,
      leftAddon,
      rightIcon,
      onRightIconClick,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-1 block text-sm text-gray-300">{label}</label>
        )}

        {/* INPUT WRAPPER */}
        <div
          className={cn(
            "flex h-14 items-center rounded-md border bg-white transition",
            error
              ? "border-red-500"
              : "border-gray-300 focus-within:border-primary-lime",
          )}
        >
          {/* LEFT ADDON (STD CODE) */}
          {leftAddon && (
            <div className="flex items-center px-3 text-black">{leftAddon}</div>
          )}

          {/* INPUT */}
          <input
            ref={ref}
            {...props}
            className={cn(
              "flex-1 h-full bg-transparent px-4 text-sm text-black outline-none",
              className,
            )}
          />

          {/* RIGHT ICON */}
          {rightIcon && (
            <button
              type="button"
              onClick={onRightIconClick}
              className="px-3 text-gray-600 hover:text-black"
            >
              {rightIcon}
            </button>
          )}
        </div>

        {error && (
          <p className="mt-1 text-xs font-semibold text-red-500">{error}</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;
