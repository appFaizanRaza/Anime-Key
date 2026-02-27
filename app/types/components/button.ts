import React from "react";
import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/app/components/button/button.variants"

export type ButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    icon?: React.ReactNode;
  };