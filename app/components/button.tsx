import { cn } from "../lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  variant?: "primary";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  className,
  variant = "primary",
  icon,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed",
        variant === "primary" &&
          "bg-lime-500 text-white hover:brightness-70 hover:text-white cursor-pointer",
        className,
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
