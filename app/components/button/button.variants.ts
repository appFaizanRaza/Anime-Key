import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center gap-2 justify-center transition-all font-medium focus:outline-none disabled:opacity-50 cursor-pointer",
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
          "bg-transparent text-black border-b-2 border-lime-500 pr-5 rounded-none hover:bg-transparent",

        watchlist:
          "rounded-lg bg-text-green/20 hover:bg-black/20",
      },

      size: {
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-5 py-3 text-base",
        icon: "p-2",
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
