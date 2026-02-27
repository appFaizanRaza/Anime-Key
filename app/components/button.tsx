
import clsx from "clsx";
import { buttonVariants } from "@/app/components/button/button.variants";
import { ButtonProps } from "@/app/types/components/button";

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
      {icon}
      {children}
    </button>
  );
}