import React from "react";
import { cn } from "@/app/lib/utils";
import { InputProps } from "../types/components/input";
import { Button } from "./button";

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
        <div
          className={cn(
            "flex h-14 items-center rounded-md border bg-white transition",
            error
              ? "border-red-500"
              : "border-gray-300 focus-within:border-primary-lime",
          )}
        >
          {leftAddon && (
            <div className="flex items-center px-3 text-black">{leftAddon}</div>
          )}
          <input
            ref={ref}
            {...props}
            className={cn(
              "flex-1 h-full bg-transparent px-4 text-sm text-black outline-none",
              className,
            )}
          />
          {rightIcon && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onRightIconClick}
              className="px-3 text-gray-600 hover:text-black rounded-none"
            >
              {rightIcon}
            </Button>
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
