export type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  variant?: "primary";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;