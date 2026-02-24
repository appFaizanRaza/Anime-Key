import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 transition-all font-medium focus:outline-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-text-green text-white rounded-lg hover:shadow-[0px_5px_15px_rgba(113,199,4,1)]",

        secondary:
          "bg-white text-black rounded-lg hover:bg-gray-200",

        outline:
          "bg-transparent border border-white/30 text-white rounded-md hover:bg-white/5",

        ghost:
          "bg-transparent text-white hover:bg-white/10 rounded-full",

        menu:
          "w-full text-left text-white hover:bg-white/10 rounded-none",

        danger:
          "text-red-400 hover:bg-zinc-800 w-full text-left",

        underline:
          "bg-transparent text-black border-b-2 border-lime-500 pr-5 rounded-none hover:bg-transparent"
      },

      size: {
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-5 py-3 text-base",
        icon: "p-2 w-11 h-11",
        none: "",
      },

      fullWidth: {
        true: "w-full",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    icon?: React.ReactNode;
  };

export function Button({
  variant,
  size,
  fullWidth,
  className,
  icon,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        buttonVariants({ variant, size, fullWidth }),
        className
      )}
      {...props}
    >
      {icon && icon}
      {children}
    </button>
  );
}