export type InputProps = {
  label?: string;
  error?: string;
  leftAddon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
} & React.InputHTMLAttributes<HTMLInputElement>;